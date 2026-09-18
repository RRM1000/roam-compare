import { destinations, type DestinationId } from "./destinations.ts";
import { readMappedPlans, writeMappedPlans } from "./plan-cache.ts";
import type { Plan } from "./catalog.ts";

/**
 * Live Nomad plan data from the Impact partner Catalogs API.
 *
 * Nomad runs its affiliate programme through Impact, which publishes the whole
 * product catalogue with prices and a ready-made tracking URL per item — so
 * affiliate links are never assembled here, and Nomad needs no hand-checked
 * price snapshots.
 *
 * Every failure path returns null. The caller then keeps the dated snapshots in
 * `lib/catalog.ts`, so an Impact outage degrades to the previous behaviour
 * rather than emptying Nomad from the comparison.
 */

const IMPACT_API_HOST = "https://api.impact.com";
const NOMAD_CATALOG_ID = "29881";
const CACHE_TTL_SECONDS = 6 * 60 * 60;
const REQUEST_TIMEOUT_MS = 6000;
const PAGE_SIZE = 1000;
// The catalogue is ~1,400 items over two pages; the cap stops a malformed
// cursor turning into an unbounded fetch loop.
const MAX_PAGES = 4;
const CACHE_NAME = "nomad-plans";
// Plans read from the shared cache are already part-way through their life, so
// the isolate holds them briefly rather than for a full TTL of their own.
const MEMO_FROM_CACHE_MS = 30 * 60 * 1000;

export type ImpactCatalogItem = {
  CatalogItemId?: unknown;
  Name?: unknown;
  Url?: unknown;
  CurrentPrice?: unknown;
  Currency?: unknown;
  StockAvailability?: unknown;
};

const destinationBySlug = new Map<string, DestinationId>(
  destinations.flatMap((destination) => [
    [destination.id, destination.id] as const,
    // Nomad's own URL slugs mostly match ours; these are the ones that don't.
    ...(destination.id === "united-states" ? [["usa", destination.id] as const] : []),
  ]),
);

const activationOverrides: Partial<Record<DestinationId, string>> = {
  "united-arab-emirates": "Buy and install this before you arrive in the UAE",
};

/**
 * The destination, taken from the tracking URL rather than the product name.
 *
 * Names arrive in at least six shapes — "Local Turkey - 30 Days - 10 GB",
 * "Local Jersey - 3 GB - 30 Days" with the order swapped, "Anguilla_10GB_30Day",
 * "Gabon 3 GB 30 Days", "Nomad - Pakistan- 30 Days - 5 GB" — so parsing a
 * country out of them is fragile. Every tracking URL carries the real landing
 * page in its `u` parameter, which is consistent.
 */
function destinationFromUrl(url: string): DestinationId | undefined {
  const encoded = /[?&]u=([^&]+)/.exec(url);
  if (!encoded) return undefined;
  let landing: string;
  try {
    landing = decodeURIComponent(encoded[1]);
  } catch {
    return undefined;
  }
  const slug = /nomadesim\.com\/(?:[a-z]{2}\/)?([a-z0-9-]+?)-eSIM/i.exec(landing);
  return slug ? destinationBySlug.get(slug[1].toLowerCase()) : undefined;
}

/** Data allowance and validity, which only the product name carries. */
function allowanceFromName(name: string) {
  const text = name.replace(/_/g, " ");
  const unlimited = /\bunlimited\b/i.test(text);
  const gb = /(\d+(?:\.\d+)?)\s*GB\b/i.exec(text);
  const mb = /(\d+)\s*MB\b/i.exec(text);
  const days = /(\d+)\s*Days?\b/i.exec(text);
  const dataGb = unlimited ? undefined : gb ? Number(gb[1]) : mb ? Number(mb[1]) / 1024 : undefined;
  return { unlimited, dataGb, validity: days ? Number(days[1]) : undefined };
}

/** Only accept the Impact click URL the catalogue supplied, on an Impact host. */
function safeCheckoutUrl(value: unknown) {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    const impactHost =
      ["pxf.io", "sjv.io", "ojrq.net", "7eer.net", "evyy.net"].some(
        (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
      ) || /^imp\.i\d+\.net$/.test(url.hostname);
    if (url.protocol !== "https:" || !impactHost || url.username || url.password) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

/**
 * Maps Impact catalogue items to `Plan` records. Exported separately from the
 * fetch so it can be tested against a captured fixture without network access.
 *
 * Regional and global bundles are skipped: their tracking URLs point at a
 * multi-country landing page, so `destinationFromUrl` returns nothing and they
 * fall out here rather than being compared as single-destination plans.
 */
export function mapNomadItems(items: unknown, checkedAt: string): Plan[] {
  if (!Array.isArray(items)) return [];
  const mapped: Plan[] = [];

  for (const item of items as ImpactCatalogItem[]) {
    if (!item || typeof item !== "object") continue;
    if (typeof item.Url !== "string" || typeof item.Name !== "string") continue;
    if (typeof item.CatalogItemId !== "string" || !item.CatalogItemId) continue;
    if (item.StockAvailability === "OutOfStock") continue;

    const destination = destinationFromUrl(item.Url);
    if (!destination) continue;

    // Impact publishes this catalogue in USD only; Currency, CurrencyCode and
    // currency query parameters were all tested and ignored by the API.
    if (item.Currency !== "USD") continue;
    const price = Number(item.CurrentPrice);
    if (!Number.isFinite(price) || price <= 0) continue;

    const { unlimited, dataGb, validity } = allowanceFromName(item.Name);
    if (!validity || validity <= 0) continue;
    if (!unlimited && (dataGb === undefined || dataGb <= 0)) continue;

    mapped.push({
      id: `nomad-live-${item.CatalogItemId}`,
      destination,
      provider: "Nomad",
      name: unlimited ? "Unlimited" : `${Number.isInteger(dataGb!) ? dataGb : dataGb!.toFixed(1)}GB`,
      dataGb,
      unlimited: unlimited || undefined,
      validity,
      price,
      currency: "USD",
      speed: "4G or 5G where available",
      speedCap: unlimited
        ? "Called unlimited, but a daily fair-use limit applies"
        : "No speed limit mentioned until your data runs out",
      network: "Local partner networks",
      tethering: "allowed",
      tetheringNote: "Hotspot works, as long as your phone and the local network allow it",
      fairUse: unlimited
        ? "Called unlimited — check the daily full-speed amount and what happens after it"
        : "When the data runs out you'll need to top up or buy again",
      activation: activationOverrides[destination] ?? "Check when the plan starts counting down before you install it",
      note: unlimited ? "Full speed up to a daily limit, then slower" : "Live Nomad price",
      callingSupport: "data-only",
      sourceUrl: `https://www.nomadesim.com/${destination}-eSIM`,
      checkoutUrl: safeCheckoutUrl(item.Url),
      checkedAt,
      reviewAfter: checkedAt,
      live: true,
    });
  }

  return mapped.sort((a, b) => a.destination.localeCompare(b.destination) || (a.price ?? 0) - (b.price ?? 0));
}

function impactCredentials() {
  const accountSid = process.env.IMPACT_ACCOUNT_SID?.trim();
  const authToken = process.env.IMPACT_AUTH_TOKEN?.trim();
  if (!accountSid || !authToken || !/^[A-Za-z0-9]+$/.test(accountSid)) return null;
  return { accountSid, authToken };
}

let cached: { plans: Plan[]; expiresAt: number } | null = null;
let inFlight: Promise<Plan[] | null> | null = null;

/**
 * Returns live Nomad plans, or null when Impact is unreachable, unconfigured or
 * returns nothing usable. Results are memoised per isolate, shared between
 * isolates through the mapped-plan cache, and the upstream responses are cached
 * at the edge for the same TTL.
 */
export async function fetchNomadPlans(now = new Date()): Promise<Plan[] | null> {
  const credentials = impactCredentials();
  if (!credentials) return null;
  if (cached && cached.expiresAt > now.getTime()) return cached.plans;

  // One rebuild at a time per isolate. The catalogue runs to two pages of a
  // thousand items, and a burst of cold requests each parsing it is what pushed
  // the Worker past its resource limits and returned 503s to crawlers.
  if (inFlight) return inFlight;
  inFlight = loadPlans(credentials, now).finally(() => { inFlight = null; });
  return inFlight;
}

async function loadPlans(credentials: { accountSid: string; authToken: string }, now: Date): Promise<Plan[] | null> {
  // Plans another request already mapped, which is far cheaper than rebuilding.
  const shared = await readMappedPlans(CACHE_NAME);
  if (shared) {
    cached = { plans: shared, expiresAt: now.getTime() + MEMO_FROM_CACHE_MS };
    return shared;
  }

  const authorization = `Basic ${btoa(`${credentials.accountSid}:${credentials.authToken}`)}`;
  const base = `${IMPACT_API_HOST}/Mediapartners/${credentials.accountSid}/Catalogs/${NOMAD_CATALOG_ID}/Items`;
  const items: unknown[] = [];

  try {
    let next: string | null = `${base}?PageSize=${PAGE_SIZE}`;
    for (let page = 0; next && page < MAX_PAGES; page += 1) {
      const response: Response = await fetch(next, {
        headers: { accept: "application/json", authorization },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        cf: { cacheTtl: CACHE_TTL_SECONDS, cacheEverything: true },
      } as RequestInit);
      if (!response.ok) return null;

      const payload = (await response.json()) as { Items?: unknown; "@nextpageuri"?: unknown };
      if (Array.isArray(payload.Items)) items.push(...payload.Items);

      // The cursor is a relative path; only follow it back to Impact.
      const cursor = typeof payload["@nextpageuri"] === "string" ? payload["@nextpageuri"] : "";
      next = cursor.startsWith("/") ? `${IMPACT_API_HOST}${cursor}` : null;
    }

    const plans = mapNomadItems(items, now.toISOString().slice(0, 10));
    if (plans.length === 0) return null;

    cached = { plans, expiresAt: now.getTime() + CACHE_TTL_SECONDS * 1000 };
    await writeMappedPlans(CACHE_NAME, plans, CACHE_TTL_SECONDS);
    return plans;
  } catch {
    return null;
  }
}
