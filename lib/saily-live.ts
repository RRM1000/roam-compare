import { destinations, type DestinationId } from "./destinations.ts";
import { readMappedPlans, writeMappedPlans } from "./plan-cache.ts";
import type { Plan } from "./catalog.ts";

/**
 * Live plan data from the Saily partners API.
 *
 * Passing our affiliate `aff_id` and `offer_id` makes the API return each plan's
 * `destination_url` as a ready-made Tune click URL, so affiliate deep links never
 * have to be assembled here. Spec: https://partners.saily.com
 *
 * Every failure path returns null. The caller then keeps the dated manual
 * snapshots in `lib/catalog.ts`, so a Saily outage degrades to the old behaviour
 * rather than emptying the comparison.
 */

const SAILY_API_URL = "https://web.saily.com/v3/partners/plans";
const SAILY_CLICK_HOST = "go.saily.site";
const CACHE_TTL_SECONDS = 3 * 60 * 60;
const REQUEST_TIMEOUT_MS = 4000;
const CACHE_NAME = "saily-plans";
// Plans read from the shared cache are already part-way through their life, so
// the isolate holds them briefly rather than for a full TTL of their own.
const MEMO_FROM_CACHE_MS = 30 * 60 * 1000;

// web.saily.com sits behind Cloudflare, which rejects requests without a
// browser-shaped User-Agent. Verified: default fetch UA returns 403.
const REQUEST_USER_AGENT =
  "Mozilla/5.0 (compatible; RoamCompare/1.0; +https://roamcompare.co.uk)";

type SailyAmount = { amount?: unknown; unit?: unknown };
type SailyMetadata = {
  throttled_speed?: SailyAmount;
  unrestricted_data?: SailyAmount;
  unrestricted_data_after?: { interval?: unknown; unit?: unknown };
};

export type SailyApiPlan = {
  identifier?: unknown;
  name?: unknown;
  category?: unknown;
  covered_countries?: unknown;
  destination_url?: unknown;
  pricing_slug?: unknown;
  is_unlimited?: unknown;
  duration?: { amount?: unknown; unit?: unknown };
  balances?: { amount?: unknown; unit?: unknown; type?: unknown; is_unlimited?: unknown }[];
  price?: { amount_with_tax?: unknown; currency?: unknown };
  merchant_plans?: { metadata?: SailyMetadata }[];
};

const destinationByCountryCode = new Map<string, DestinationId>(
  destinations.map((destination) => [destination.countryCode, destination.id]),
);

// Saily sells UAE plans that must be installed before arrival; the rest follow
// the provider's standard activation wording.
const activationOverrides: Partial<Record<DestinationId, string>> = {
  "united-arab-emirates": "Buy and install this before you arrive in the UAE",
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function formatSpeed(speed: SailyAmount | undefined) {
  if (!speed || !isFiniteNumber(speed.amount) || typeof speed.unit !== "string") return null;
  const unit = speed.unit.toUpperCase();
  if (unit === "MBPS") return `${speed.amount}Mbps`;
  if (unit !== "KBPS") return null;
  return speed.amount % 1024 === 0 ? `${speed.amount / 1024}Mbps` : `${speed.amount}kbps`;
}

function formatInterval(after: { interval?: unknown; unit?: unknown } | undefined) {
  if (!after || typeof after.unit !== "string") return null;
  const unit = after.unit.toLowerCase();
  const interval = isFiniteNumber(after.interval) ? after.interval : 1;
  return interval === 1 ? unit : `${interval} ${unit}s`;
}

/** Only accept the affiliate click URL the API built for us, on the expected host. */
function safeCheckoutUrl(value: unknown) {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    const isClickHost = url.hostname === SAILY_CLICK_HOST || url.hostname.endsWith(`.${SAILY_CLICK_HOST}`);
    if (url.protocol !== "https:" || !isClickHost || url.username || url.password) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function safeSourceUrl(pricingSlug: unknown, destination: DestinationId) {
  if (typeof pricingSlug !== "string" || !/^[a-z0-9-]+$/.test(pricingSlug)) {
    const fallback = destinations.find((entry) => entry.id === destination);
    return `https://saily.com/esim-${fallback?.sailySlug ?? destination}/`;
  }
  return `https://saily.com/${pricingSlug}/`;
}

/**
 * Maps a raw API response to `Plan` records. Exported separately from the fetch
 * so it can be tested against a captured fixture without network access.
 *
 * Regional and global bundles are skipped: this site compares single-destination
 * plans, and a 35-country Europe plan would not be a like-for-like row.
 */
export function mapSailyPlans(items: unknown, checkedAt: string): Plan[] {
  if (!Array.isArray(items)) return [];
  const mapped: Plan[] = [];

  for (const item of items as SailyApiPlan[]) {
    if (!item || typeof item !== "object") continue;

    const countries = item.covered_countries;
    if (!Array.isArray(countries) || countries.length !== 1) continue;
    const destination = destinationByCountryCode.get(String(countries[0]));
    if (!destination) continue;

    const identifier = item.identifier;
    if (typeof identifier !== "string" || !identifier) continue;

    const price = item.price?.amount_with_tax;
    const currency = item.price?.currency;
    // format_price=true returns major units; anything else means the query changed.
    if (!isFiniteNumber(price) || price <= 0 || currency !== "GBP") continue;

    const duration = item.duration;
    if (!duration || !isFiniteNumber(duration.amount) || duration.amount <= 0) continue;
    if (typeof duration.unit !== "string" || duration.unit.toLowerCase() !== "day") continue;

    const unlimited = item.is_unlimited === true;
    const balance = Array.isArray(item.balances)
      ? item.balances.find((entry) => entry && entry.type === "DATA" && entry.unit === "GB")
      : undefined;
    // `balances[0].amount` is a 999 sentinel on unlimited plans, so ignore it there.
    const dataGb = !unlimited && balance && isFiniteNumber(balance.amount) && balance.amount > 0 ? balance.amount : undefined;
    if (!unlimited && dataGb === undefined) continue;

    const metadata = item.merchant_plans?.find((entry) => entry?.metadata)?.metadata;
    const throttle = formatSpeed(metadata?.throttled_speed);
    const highSpeed = isFiniteNumber(metadata?.unrestricted_data?.amount) ? metadata.unrestricted_data.amount : null;
    const highSpeedUnit = typeof metadata?.unrestricted_data?.unit === "string" ? metadata.unrestricted_data.unit : "GB";
    const resetInterval = formatInterval(metadata?.unrestricted_data_after);

    const speedCap =
      unlimited && throttle && highSpeed !== null
        ? `${throttle} once you've used ${highSpeed}${highSpeedUnit}${resetInterval ? ` in a ${resetInterval}` : ""}`
        : unlimited
          ? "Called unlimited, but a daily fair-use limit applies"
          : "No speed limit mentioned until your data runs out";

    const fairUse =
      unlimited && throttle && highSpeed !== null
        ? `${highSpeed}${highSpeedUnit} at full speed${resetInterval ? ` each ${resetInterval}` : ""}, then ${throttle} until it resets`
        : unlimited
          ? "Called unlimited — check the full-speed amount and what happens after it"
          : "When the data runs out you can top up";

    mapped.push({
      id: `saily-live-${identifier}`,
      destination,
      provider: "Saily",
      name: unlimited ? "Unlimited" : `${dataGb}GB`,
      dataGb,
      unlimited: unlimited || undefined,
      validity: duration.amount,
      price,
      currency: "GBP",
      speed: "3G, 4G or 5G where available",
      speedCap,
      network: "Local partner networks",
      tethering: "allowed",
      tetheringNote: "Saily advertises hotspot sharing with no restrictions",
      fairUse,
      activation: activationOverrides[destination] ?? "Check when the plan starts counting down before you install it",
      note: unlimited ? "Full speed up to a daily limit, then slower" : "Live Saily price",
      callingSupport: "data-only",
      sourceUrl: safeSourceUrl(item.pricing_slug, destination),
      checkoutUrl: safeCheckoutUrl(item.destination_url),
      checkedAt,
      reviewAfter: checkedAt,
      live: true,
    });
  }

  return mapped.sort((a, b) => a.destination.localeCompare(b.destination) || (a.price ?? 0) - (b.price ?? 0));
}

function affiliateCredentials() {
  const affId = process.env.SAILY_AFF_ID?.trim();
  const offerId = process.env.SAILY_OFFER_ID?.trim();
  // The API requires both together; without them it omits the affiliate click URLs.
  if (!affId || !offerId || !/^\d+$/.test(affId) || !/^\d+$/.test(offerId)) return null;
  return { affId, offerId };
}

let cached: { plans: Plan[]; expiresAt: number } | null = null;
let inFlight: Promise<Plan[] | null> | null = null;

/**
 * Returns live Saily plans, or null when the API is unreachable, unconfigured or
 * returns nothing usable. Results are memoised per isolate, shared between
 * isolates through the mapped-plan cache, and the upstream response is cached at
 * the edge for the same TTL.
 */
export async function fetchSailyPlans(now = new Date()): Promise<Plan[] | null> {
  const credentials = affiliateCredentials();
  if (!credentials) return null;

  if (cached && cached.expiresAt > now.getTime()) return cached.plans;

  // One rebuild at a time per isolate. Without this, a burst of cold requests
  // each fetched and parsed the whole catalogue, which is what exhausted the
  // Worker's resources and returned 503s to crawlers.
  if (inFlight) return inFlight;
  inFlight = loadPlans(credentials, now).finally(() => { inFlight = null; });
  return inFlight;
}

async function loadPlans(credentials: { affId: string; offerId: string }, now: Date): Promise<Plan[] | null> {
  // Plans another request already mapped, which is far cheaper than rebuilding.
  const shared = await readMappedPlans(CACHE_NAME);
  if (shared) {
    cached = { plans: shared, expiresAt: now.getTime() + MEMO_FROM_CACHE_MS };
    return shared;
  }

  const url = new URL(SAILY_API_URL);
  url.searchParams.set("format_price", "true");
  url.searchParams.set("currencyCode", "GBP");
  url.searchParams.set("aff_id", credentials.affId);
  url.searchParams.set("offer_id", credentials.offerId);

  try {
    const response = await fetch(url, {
      headers: { accept: "application/json", "user-agent": REQUEST_USER_AGENT },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cf: { cacheTtl: CACHE_TTL_SECONDS, cacheEverything: true },
    } as RequestInit);

    if (!response.ok) return null;

    const payload: unknown = await response.json();
    const items = (payload as { items?: unknown } | null)?.items;
    const plans = mapSailyPlans(items, now.toISOString().slice(0, 10));
    if (plans.length === 0) return null;

    cached = { plans, expiresAt: now.getTime() + CACHE_TTL_SECONDS * 1000 };
    await writeMappedPlans(CACHE_NAME, plans, CACHE_TTL_SECONDS);
    return plans;
  } catch {
    return null;
  }
}
