/**
 * Edge caching for pages every visitor sees identically.
 *
 * Destination pages and the bare homepage render the same HTML for everyone,
 * but each render costs the Worker ~15–20ms of CPU. On a burst of visits (a
 * crawler walking the country pages, say) that overran Cloudflare's limits and
 * returned 1102 "Worker exceeded resource limits" 503s. Serving repeat visits
 * from the Cache API costs about a millisecond instead.
 *
 * Keys carry the build id, so HTML cached by one deploy is never served after
 * the next one, whose JavaScript and CSS files have different names.
 */

export const PAGE_CACHE_SECONDS = 300;

/** Headers vinext varies its response on; any of them means an RSC request, not a page. */
const RSC_REQUEST_HEADERS = [
  "rsc",
  "next-router-state-tree",
  "next-router-prefetch",
  "next-router-segment-prefetch",
  "next-url",
  "x-vinext-interception-context",
  "x-vinext-mounted-slots",
  "x-vinext-rsc-render-mode",
];

/**
 * The cache key for this request, or null when it must be rendered.
 *
 * Only full-page GETs for the homepage or a destination page, with no query
 * string, are cached: the homepage reads its query, and anything else (share
 * links, UTM tags) simply renders as before.
 */
export function pageCacheKey(request: Request, buildId: string | undefined): Request | null {
  if (!buildId || request.method !== "GET") return null;
  if (RSC_REQUEST_HEADERS.some((name) => request.headers.has(name))) return null;
  if (!(request.headers.get("accept") ?? "").includes("text/html")) return null;

  const url = new URL(request.url);
  if (url.protocol !== "https:" || url.search !== "") return null;
  if (url.pathname !== "/" && !/^\/destinations\/[a-z-]+$/.test(url.pathname)) return null;

  return new Request(`${url.origin}${url.pathname}?__page-cache=${encodeURIComponent(buildId)}`, { method: "GET" });
}

/** A copy of a rendered page to store, or null when the response must not be cached. */
export function cacheableCopy(response: Response): Response | null {
  if (response.status !== 200) return null;
  if (!(response.headers.get("content-type") ?? "").startsWith("text/html")) return null;
  if (response.headers.has("set-cookie")) return null;

  const headers = new Headers(response.headers);
  // The key already excludes RSC requests, and Cloudflare's cache would
  // otherwise refuse or fragment on these.
  headers.delete("vary");
  headers.set("cache-control", `public, max-age=${PAGE_CACHE_SECONDS}`);
  return new Response(response.clone().body, { status: 200, headers });
}

/** A cached page, prepared for the browser: no browser caching, and marked as a hit. */
export function servedFromCache(hit: Response): Response {
  const headers = new Headers(hit.headers);
  headers.delete("cache-control");
  headers.set("x-page-cache", "hit");
  return new Response(hit.body, { status: hit.status, headers });
}
