import type { Provider } from "./catalog";

export type DestinationId = "turkey" | "united-states" | "spain" | "france" | "italy" | "greece" | "portugal" | "germany" | "netherlands" | "ireland" | "cyprus" | "united-arab-emirates" | "thailand" | "japan" | "australia" | "canada" | "mexico" | "morocco" | "egypt" | "indonesia";

export type Destination = { id: DestinationId; name: string; flag: string; region: string; countryCode: string; airaloSlug: string; sailySlug: string };

export const destinations: Destination[] = [
  { id: "turkey", name: "Turkey", flag: "🇹🇷", region: "Europe & Asia", countryCode: "TR", airaloSlug: "turkey", sailySlug: "turkey" },
  { id: "united-states", name: "United States", flag: "🇺🇸", region: "North America", countryCode: "US", airaloSlug: "united-states", sailySlug: "united-states" },
  { id: "spain", name: "Spain", flag: "🇪🇸", region: "Europe", countryCode: "ES", airaloSlug: "spain", sailySlug: "spain" },
  { id: "france", name: "France", flag: "🇫🇷", region: "Europe", countryCode: "FR", airaloSlug: "france", sailySlug: "france" },
  { id: "italy", name: "Italy", flag: "🇮🇹", region: "Europe", countryCode: "IT", airaloSlug: "italy", sailySlug: "italy" },
  { id: "greece", name: "Greece", flag: "🇬🇷", region: "Europe", countryCode: "GR", airaloSlug: "greece", sailySlug: "greece" },
  { id: "portugal", name: "Portugal", flag: "🇵🇹", region: "Europe", countryCode: "PT", airaloSlug: "portugal", sailySlug: "portugal" },
  { id: "germany", name: "Germany", flag: "🇩🇪", region: "Europe", countryCode: "DE", airaloSlug: "germany", sailySlug: "germany" },
  { id: "netherlands", name: "Netherlands", flag: "🇳🇱", region: "Europe", countryCode: "NL", airaloSlug: "netherlands", sailySlug: "netherlands" },
  { id: "ireland", name: "Ireland", flag: "🇮🇪", region: "Europe", countryCode: "IE", airaloSlug: "ireland", sailySlug: "ireland" },
  { id: "cyprus", name: "Cyprus", flag: "🇨🇾", region: "Europe", countryCode: "CY", airaloSlug: "cyprus", sailySlug: "cyprus" },
  { id: "united-arab-emirates", name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East", countryCode: "AE", airaloSlug: "united-arab-emirates", sailySlug: "united-arab-emirates" },
  { id: "thailand", name: "Thailand", flag: "🇹🇭", region: "Asia", countryCode: "TH", airaloSlug: "thailand", sailySlug: "thailand" },
  { id: "japan", name: "Japan", flag: "🇯🇵", region: "Asia", countryCode: "JP", airaloSlug: "japan", sailySlug: "japan" },
  { id: "australia", name: "Australia", flag: "🇦🇺", region: "Oceania", countryCode: "AU", airaloSlug: "australia", sailySlug: "australia" },
  { id: "canada", name: "Canada", flag: "🇨🇦", region: "North America", countryCode: "CA", airaloSlug: "canada", sailySlug: "canada" },
  { id: "mexico", name: "Mexico", flag: "🇲🇽", region: "North America", countryCode: "MX", airaloSlug: "mexico", sailySlug: "mexico" },
  { id: "morocco", name: "Morocco", flag: "🇲🇦", region: "Africa", countryCode: "MA", airaloSlug: "morocco", sailySlug: "morocco" },
  { id: "egypt", name: "Egypt", flag: "🇪🇬", region: "Africa", countryCode: "EG", airaloSlug: "egypt", sailySlug: "egypt" },
  { id: "indonesia", name: "Indonesia", flag: "🇮🇩", region: "Asia", countryCode: "ID", airaloSlug: "indonesia", sailySlug: "indonesia" },
];

export const destinationById = Object.fromEntries(destinations.map((destination) => [destination.id, destination])) as Record<DestinationId, Destination>;

export function isDestination(value: string): value is DestinationId { return Object.hasOwn(destinationById, value); }

/**
 * Country-specific Klook eSIM products. Every URL was confirmed to return 200
 * with a matching country title on 18 August 2026; a search fallback remains for
 * any destination added later.
 */
const klookProductUrls: Record<DestinationId, string> = {
  turkey: "https://www.klook.com/en-GB/activity/128551-turkey-esim-high-speed-internet-qr-code-voucher/",
  "united-states": "https://www.klook.com/activity/108033-usa-esim-travel/",
  spain: "https://www.klook.com/activity/163606-5g-esim-spain-vodafone-orange-movistar-yoigo/",
  france: "https://www.klook.com/en-GB/activity/161040-5g-esim-france-orange-sfr/",
  italy: "https://www.klook.com/en-GB/activity/153169-5g-italy-unlimited-data-esim-vodafone-italy/",
  greece: "https://www.klook.com/en-GB/activity/203218-5g-esim-greece-nova-vodafone/",
  portugal: "https://www.klook.com/en-GB/activity/203028-5g-esim-portugal-meo/",
  germany: "https://www.klook.com/en-GB/activity/204745-5g-esim-germany-o2/",
  netherlands: "https://www.klook.com/en-GB/activity/205006-5g-esim-netherlands-vodafone-kpn/",
  ireland: "https://www.klook.com/en-GB/activity/216973-ireland-esim-travel/",
  cyprus: "https://www.klook.com/en-GB/activity/215152-5g-esim-cyprus-cyta-vodafone/",
  "united-arab-emirates": "https://www.klook.com/en-GB/activity/123940-uae-esim-high-speed-internet-qr-code-voucher/",
  thailand: "https://www.klook.com/en-GB/activity/110438-thailand-esim-high-speed-internet-qr-code-in-the-voucher/",
  japan: "https://www.klook.com/en-GB/activity/109393-japan-esim-high-speed-internet-qr-code-voucher/",
  australia: "https://www.klook.com/en-GB/activity/109206-australia-esim-high-speed-internet-qr-code-voucher/",
  canada: "https://www.klook.com/en-GB/activity/110812-canada-esim-high-speed-internet-qr-code-in-the-voucher/",
  mexico: "https://www.klook.com/en-GB/activity/121154-mexico-esim-high-speed-internet/",
  morocco: "https://www.klook.com/en-GB/activity/215157-5g-esim-morocco-orange/",
  egypt: "https://www.klook.com/en-GB/activity/177701-5g-esim-egypt-orange-egypt/",
  indonesia: "https://www.klook.com/en-GB/activity/109371-indonesia-esim-high-speed-internet-qr-code-voucher/",
};

/**
 * Klook's own affiliate programme tracks with an `aid` on any Klook URL, so one
 * id covers every destination rather than needing a link configured per country.
 * A per-destination override still wins when one is set.
 */
function klookAffiliateId() {
  const value = process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID?.trim();
  return value && /^\d+$/.test(value) ? value : undefined;
}

function trackedKlookUrl(destination: DestinationId) {
  const product = klookProductUrls[destination];
  if (!product) return undefined;
  const affiliateId = klookAffiliateId();
  if (!affiliateId) return product;
  const url = new URL(product);
  url.searchParams.set("aid", affiliateId);
  return url.toString();
}

/** True once a Klook affiliate id or an explicit tracking URL is configured. */
export function hasKlookTracking(destination: DestinationId = "turkey") {
  return Boolean(klookAffiliateId() || configuredKlookUrl(destination));
}

function configuredKlookUrl(destination: DestinationId) {
  const configured: Partial<Record<DestinationId, string | undefined>> = {
    turkey: process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL,
    "united-states": process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL_UNITED_STATES,
    spain: process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL_SPAIN,
    japan: process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL_JAPAN,
    "united-arab-emirates": process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL_UAE,
  };

  const value = configured[destination];
  if (!value) return undefined;

  try {
    const url = new URL(value);
    const isKlookHost = url.hostname === "klook.com" || url.hostname.endsWith(".klook.com");
    if (url.protocol !== "https:" || !isKlookHost || url.username || url.password) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

const nomadProductUrls: Partial<Record<DestinationId, string>> = {
  turkey: "https://www.nomadesim.com/turkey-eSIM",
};

function nomadProductUrl(destination: Destination) {
  return nomadProductUrls[destination.id] ?? `https://www.nomadesim.com/en/${destination.id}-eSIM`;
}

/**
 * Hosts a Nomad tracking link may legitimately live on.
 *
 * Nomad's own domain is here from the start. Affiliate networks send clicks
 * through their own click domain (Saily's, for example, is `go.saily.site`),
 * so when the approved link arrives, add its host here — one line, and every
 * Nomad link on the site becomes a tracking link.
 */
const NOMAD_TRACKING_HOSTS = [
  "nomadesim.com",
  // Nomad runs its programme through Impact, which issues click URLs on its
  // own domains rather than the advertiser's. These are Impact's standard
  // click hosts; add the one your dashboard actually issues if it differs.
  "pxf.io",
  "sjv.io",
  "ojrq.net",
  "7eer.net",
  "evyy.net",
];

/**
 * Returns the configured Nomad tracking URL, or undefined when none is set or
 * the value fails validation. Undefined is the pre-approval state: links fall
 * back to Nomad's public pages and nothing is marked as an affiliate link.
 */
export function getConfiguredNomadUrl(destination: DestinationId) {
  const configured: Partial<Record<DestinationId, string | undefined>> = {
    turkey: process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL,
    "united-states": process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL_UNITED_STATES,
    spain: process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL_SPAIN,
    japan: process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL_JAPAN,
    "united-arab-emirates": process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL_UAE,
  };

  // A single link with no per-destination override is the common starting point.
  const value = configured[destination] ?? process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL;
  if (!value) return undefined;

  try {
    const url = new URL(value);
    // Impact also issues per-account click domains of the form imp.i123456.net,
    // which no fixed list can enumerate.
    const allowedHost =
      NOMAD_TRACKING_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))
      || /^imp\.i\d+\.net$/.test(url.hostname);
    if (url.protocol !== "https:" || !allowedHost || url.username || url.password) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

/**
 * True once a valid Nomad tracking link applies to this destination. It must ask
 * the same question `getConfiguredNomadUrl` answers — checking only the base
 * variable meant a per-destination override produced a tracked link that was
 * never disclosed as sponsored.
 */
export function hasNomadTracking(destination: DestinationId = "turkey") {
  return Boolean(getConfiguredNomadUrl(destination));
}

/**
 * The provider's plain product page, with no affiliate tracking on it.
 *
 * Evidence links ("Open source checked …", "Live catalogue") cite where a number
 * came from. Monetising a citation would undermine the reason it is shown, so
 * these deliberately bypass the tracked URLs that `getProviderUrl` builds.
 */
/**
 * Whether a link we are about to emit is one we could earn on.
 *
 * Decided from the URL itself rather than from the provider, because a provider
 * can become an affiliate without anyone editing a flag here: Nomad's Impact
 * feed began returning ready-made click URLs the moment the programme was
 * approved, and those went out for a while marked only "noopener noreferrer".
 * Reading the URL means a tracking link cannot ship undisclosed again.
 */
const CLICK_HOSTS = ["go.saily.site", "pxf.io", "sjv.io", "ojrq.net", "7eer.net", "evyy.net"];

export function isTrackedUrl(value: string | undefined) {
  if (!value) return false;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    const onClickHost =
      CLICK_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`)) ||
      /^imp\.i\d+\.net$/.test(url.hostname);
    if (onClickHost) return true;
    // Klook attributes on a query parameter rather than a distinct host.
    const isKlook = url.hostname === "klook.com" || url.hostname.endsWith(".klook.com");
    return isKlook && url.searchParams.has("aid");
  } catch {
    return false;
  }
}

export function getProviderSourceUrl(provider: Provider, destination: Destination) {
  if (provider === "Klook") return klookProductUrls[destination.id] ?? `https://www.klook.com/en-GB/search/result/?query=${encodeURIComponent(`${destination.name} eSIM`)}`;
  if (provider === "Nomad") return nomadProductUrl(destination);
  if (provider === "Airalo") return `https://www.airalo.com/${destination.airaloSlug}-esim`;
  return `https://saily.com/esim-${destination.sailySlug}/`;
}

export function getProviderUrl(provider: Provider, destination: Destination) {
  if (provider === "Klook") return configuredKlookUrl(destination.id) ?? trackedKlookUrl(destination.id) ?? `https://www.klook.com/en-GB/search/result/?query=${encodeURIComponent(`${destination.name} eSIM`)}`;
  if (provider === "Nomad") return getConfiguredNomadUrl(destination.id) ?? nomadProductUrl(destination);
  if (provider === "Airalo") return `https://www.airalo.com/${destination.airaloSlug}-esim`;
  if (provider === "Saily") return `https://saily.com/esim-${destination.sailySlug}/`;
  return nomadProductUrl(destination);
}
