import type { Plan } from "./catalog.ts";

/**
 * A shared cache for plans already mapped from a provider feed.
 *
 * Why this exists: Cloudflare starts fresh isolates constantly, and the
 * per-isolate memo inside each feed module is empty in a new one. Rebuilding it
 * meant fetching and parsing about 4MB of catalogue JSON inside the request.
 * One request at a time coped; a burst of cold ones — exactly how a search
 * crawler arrives — pushed the Worker past its resource limits, which Cloudflare
 * answers with error 1102 and a 503. Googlebot met those 503s on 16 September
 * 2026 and refused to index the page it was crawling.
 *
 * Storing the mapped result, a few hundred kilobytes rather than four megabytes,
 * lets a cold isolate read that instead of rebuilding it. Every path here is best
 * effort: outside the Workers runtime, without a configured site URL, or on any
 * error at all, it is a no-op and the feed modules fetch exactly as before.
 */

/** Structural type, because `caches.default` is a Workers extension. */
type EdgeCache = {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
};

function edgeCache(): EdgeCache | null {
  const store = (globalThis as { caches?: { default?: EdgeCache } }).caches;
  return store?.default ?? null;
}

/**
 * Cache keys have to sit on the Worker's own zone, so they are built from the
 * configured site URL. `next/headers` is deliberately not used here: it would
 * make this module unimportable outside the framework, including in the tests.
 */
function cacheKey(name: string): Request | null {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return null;
  try {
    const url = new URL(configured);
    if (url.protocol !== "https:") return null;
    return new Request(`${url.origin}/__plan-cache/${encodeURIComponent(name)}`, { method: "GET" });
  } catch {
    return null;
  }
}

/** Mapped plans from a previous request, or null when there are none to reuse. */
export async function readMappedPlans(name: string): Promise<Plan[] | null> {
  const cache = edgeCache();
  const key = cacheKey(name);
  if (!cache || !key) return null;

  try {
    const hit = await cache.match(key);
    if (!hit) return null;
    const plans: unknown = await hit.json();
    if (!Array.isArray(plans) || plans.length === 0) return null;
    // A stored entry is only useful if it still looks like plan data; anything
    // else is discarded rather than rendered.
    return plans.every((plan) => plan && typeof plan === "object" && typeof (plan as Plan).id === "string") ? (plans as Plan[]) : null;
  } catch {
    return null;
  }
}

/** Stores mapped plans for the next cold isolate. Failures are ignored. */
export async function writeMappedPlans(name: string, plans: Plan[], ttlSeconds: number): Promise<void> {
  const cache = edgeCache();
  const key = cacheKey(name);
  if (!cache || !key || plans.length === 0) return;

  try {
    await cache.put(key, new Response(JSON.stringify(plans), {
      headers: { "content-type": "application/json", "cache-control": `max-age=${ttlSeconds}` },
    }));
  } catch {
    // The cache is an optimisation; a failed write just means the next cold
    // isolate rebuilds from the feed.
  }
}
