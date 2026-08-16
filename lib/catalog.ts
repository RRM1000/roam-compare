import type { DestinationId } from "./destinations";

export type Usage = "light" | "everyday" | "heavy";
export type Currency = "GBP" | "EUR" | "USD";
export type Provider = "Airalo" | "Klook" | "Nomad" | "Saily";
export type CallingSupport = "data-only" | "calls-texts" | "check-plan";
export type TetheringSupport = "allowed" | "restricted" | "not-allowed" | "check-plan";

export type Plan = {
  id: string;
  destination: DestinationId;
  provider: Provider;
  name: string;
  dataGb?: number;
  dailyDataGb?: number;
  unlimited?: boolean;
  validity: number;
  price: number | null;
  currency?: Currency;
  speed: string;
  speedCap: string;
  network: string;
  tethering: TetheringSupport;
  tetheringNote: string;
  fairUse: string;
  activation: string;
  note: string;
  callingSupport: CallingSupport;
  sourceUrl: string;
  checkoutUrl?: string;
  checkedAt: string;
  reviewAfter: string;
  catalogueOnly?: boolean;
};

export const DATA_CHECKED = "16 August 2026";
export const CALLS_CHECKED = "16 August 2026";
export const DATA_CHECKED_AT = "2026-08-16";
export const DATA_REVIEW_AFTER = "2026-08-23";
export const FX_CHECKED_AT = "2026-08-16";
export const FX_REVIEW_AFTER = "2026-08-23";
export const FX_EVIDENCE = {
  label: "Bank of England daily spot exchange rates",
  url: "https://www.bankofengland.co.uk/statistics/exchange-rates",
  checkedAt: FX_CHECKED_AT,
  reviewAfter: FX_REVIEW_AFTER,
} as const;
export const usagePerDay: Record<Usage, number> = { light: 0.35, everyday: 0.8, heavy: 2 };
export const tripLengths = [...Array.from({ length: 30 }, (_, index) => index + 1), 45, 60, 90];
export const gbpRates: Record<Currency, number> = { GBP: 1, EUR: 0.85, USD: 0.75 };

export const providerDetails: Record<Provider, { accent: string; initials: string; affiliate: boolean; summary: string }> = {
  Airalo: { accent: "#a82350", initials: "AI", affiliate: false, summary: "Local, regional and global eSIM catalogues" },
  Klook: { accent: "#b33b27", initials: "KL", affiliate: true, summary: "Travel eSIM options alongside activities" },
  Nomad: { accent: "#2943aa", initials: "NO", affiliate: false, summary: "Fixed-data and unlimited travel plans" },
  Saily: { accent: "#4b28ae", initials: "SA", affiliate: false, summary: "Travel data plans with security features" },
};

const CHECKED_AT = DATA_CHECKED_AT;
const REVIEW_AFTER = DATA_REVIEW_AFTER;
const turkeySources: Record<Provider, string> = {
  Airalo: "https://www.airalo.com/turkey-esim/merhaba-30days-20gb/",
  Klook: "https://www.klook.com/en-GB/activity/128551-turkey-esim-high-speed-internet-qr-code-voucher/",
  Nomad: "https://www.nomadesim.com/turkey-eSIM",
  Saily: "https://saily.com/esim-turkey/",
};

type PlanSeed = Omit<Plan, "destination" | "callingSupport" | "sourceUrl" | "checkedAt" | "reviewAfter">;

function turkeyPlan(seed: PlanSeed): Plan {
  return { ...seed, destination: "turkey", callingSupport: "data-only", sourceUrl: turkeySources[seed.provider], checkedAt: CHECKED_AT, reviewAfter: REVIEW_AFTER };
}

const airaloDefaults = {
  speed: "4G / 5G", speedCap: "No fixed cap stated for fixed-data plans", network: "Türk Telekom (Avea)",
  tethering: "check-plan" as const, tetheringNote: "Depends on the device, network and live plan terms",
  fairUse: "Fixed allowance; service stops or requires a top-up when used", activation: "Check the live plan's activation policy before installation", note: "Top-ups available",
};
const nomadDefaults = {
  speed: "4G / 5G", speedCap: "No fixed cap stated for fixed-data plans", network: "Avea",
  tethering: "allowed" as const, tetheringNote: "Hotspot supported; device and local network permitting",
  fairUse: "Fixed allowance; top-up or another plan may be needed when used", activation: "Activation timing varies by plan; confirm at checkout", note: "Hotspot supported",
};
const sailyDefaults = {
  speed: "3G / 4G / 5G", speedCap: "No fixed cap stated for fixed-data plans", network: "Partner networks",
  tethering: "allowed" as const, tetheringNote: "Saily states no hotspot restrictions; device/network limits can still apply",
  fairUse: "Fixed allowance; add more data if the plan is exhausted", activation: "Check the live plan's activation policy before installation", note: "No hotspot restrictions",
};

const turkeyPlans: Plan[] = [
  turkeyPlan({ id: "turkey-airalo-1", provider: "Airalo", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", ...airaloDefaults }),
  turkeyPlan({ id: "turkey-airalo-2", provider: "Airalo", name: "2GB", dataGb: 2, validity: 15, price: 5.5, currency: "USD", ...airaloDefaults }),
  turkeyPlan({ id: "turkey-airalo-3", provider: "Airalo", name: "3GB", dataGb: 3, validity: 30, price: 6.5, currency: "USD", ...airaloDefaults }),
  turkeyPlan({ id: "turkey-airalo-5", provider: "Airalo", name: "5GB", dataGb: 5, validity: 30, price: 10, currency: "USD", ...airaloDefaults }),
  turkeyPlan({ id: "turkey-airalo-10", provider: "Airalo", name: "10GB", dataGb: 10, validity: 30, price: 15.5, currency: "USD", ...airaloDefaults }),
  turkeyPlan({ id: "turkey-airalo-20", provider: "Airalo", name: "20GB", dataGb: 20, validity: 30, price: 22.5, currency: "USD", ...airaloDefaults }),
  turkeyPlan({ id: "turkey-airalo-unlimited", provider: "Airalo", name: "Unlimited", unlimited: true, validity: 10, price: 35, currency: "USD", ...airaloDefaults, speedCap: "High-speed data is subject to the live fair-use policy", fairUse: "Unlimited label; check the current daily high-speed allowance and throttle before buying", note: "Fair-use limits apply" }),
  turkeyPlan({ id: "turkey-klook-1gb-daily", provider: "Klook", name: "1GB per day", dailyDataGb: 1, validity: 30, price: null, speed: "5G / 4G", speedCap: "Full-speed daily allowance, then reduced speed", network: "Türk Telekom", tethering: "allowed", tetheringNote: "Hotspot sharing is listed as supported", fairUse: "1GB high-speed data each day; reduced speed after the daily allowance", activation: "Choose 1–30 days; check when validity begins on the voucher", note: "Choose 1–30 days on Klook" }),
  turkeyPlan({ id: "turkey-klook-2gb-daily", provider: "Klook", name: "2GB per day", dailyDataGb: 2, validity: 30, price: null, speed: "5G / 4G", speedCap: "Full-speed daily allowance, then reduced speed", network: "Türk Telekom", tethering: "allowed", tetheringNote: "Hotspot sharing is listed as supported", fairUse: "2GB high-speed data each day; reduced speed after the daily allowance", activation: "Choose 1–30 days; check when validity begins on the voucher", note: "Daily high-speed allowance" }),
  turkeyPlan({ id: "turkey-klook-unlimited", provider: "Klook", name: "Unlimited daily data", unlimited: true, validity: 30, price: null, speed: "5G / 4G", speedCap: "1Mbps after 15GB in a day", network: "Türk Telekom", tethering: "allowed", tetheringNote: "Hotspot sharing is listed as supported", fairUse: "15GB high-speed data per day, then 1Mbps until the daily reset", activation: "Choose 1–30 days; check when validity begins on the voucher", note: "Daily fair-use throttle" }),
  turkeyPlan({ id: "turkey-nomad-1", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 3.46, currency: "EUR", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-3", provider: "Nomad", name: "3GB", dataGb: 3, validity: 30, price: 5.19, currency: "EUR", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-5", provider: "Nomad", name: "5GB", dataGb: 5, validity: 30, price: 7.79, currency: "EUR", ...nomadDefaults, note: "Sale price when checked" }),
  turkeyPlan({ id: "turkey-nomad-10", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 11.25, currency: "EUR", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-20", provider: "Nomad", name: "20GB", dataGb: 20, validity: 30, price: 17.31, currency: "EUR", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-50", provider: "Nomad", name: "50GB", dataGb: 50, validity: 30, price: 26.84, currency: "EUR", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-unlimited-5", provider: "Nomad", name: "Unlimited", unlimited: true, validity: 5, price: 14.72, currency: "EUR", ...nomadDefaults, speedCap: "512kbps after the plan's daily high-speed allowance", fairUse: "High-speed allowance resets daily; then service continues at up to 512kbps", note: "Daily allowance and throttle apply" }),
  turkeyPlan({ id: "turkey-nomad-unlimited-10", provider: "Nomad", name: "Unlimited", unlimited: true, validity: 10, price: 24.24, currency: "EUR", ...nomadDefaults, speedCap: "512kbps after the plan's daily high-speed allowance", fairUse: "High-speed allowance resets daily; then service continues at up to 512kbps", note: "Daily allowance and throttle apply" }),
  turkeyPlan({ id: "turkey-saily-1", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 3.49, currency: "EUR", ...sailyDefaults }),
  turkeyPlan({ id: "turkey-saily-3", provider: "Saily", name: "3GB", dataGb: 3, validity: 30, price: 5.99, currency: "EUR", ...sailyDefaults }),
  turkeyPlan({ id: "turkey-saily-5", provider: "Saily", name: "5GB", dataGb: 5, validity: 30, price: 8.99, currency: "EUR", ...sailyDefaults }),
  turkeyPlan({ id: "turkey-saily-10", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 13.99, currency: "EUR", ...sailyDefaults }),
  turkeyPlan({ id: "turkey-saily-20", provider: "Saily", name: "20GB", dataGb: 20, validity: 30, price: 20.49, currency: "EUR", ...sailyDefaults }),
];

type DatedPlanSeed = Omit<Plan, "checkedAt" | "reviewAfter">;
const datedPlan = (seed: DatedPlanSeed): Plan => ({ ...seed, checkedAt: CHECKED_AT, reviewAfter: REVIEW_AFTER });

const fixedAiralo = {
  speed: "Network generation not confirmed on exact plan",
  speedCap: "No throttle disclosed before the fixed allowance is used",
  tethering: "allowed" as const,
  tetheringNote: "Hotspot supported when the phone and local network allow it",
  fairUse: "Service stops or needs a top-up after the fixed allowance",
  activation: "Check the exact plan's activation policy before installation",
  note: "Fixed-data plan",
  callingSupport: "data-only" as const,
};
const fixedNomad = {
  speed: "4G / 5G where available",
  speedCap: "No throttle disclosed before the fixed allowance is used",
  tethering: "allowed" as const,
  tetheringNote: "Hotspot supported; rare device or network limits can affect stability",
  fairUse: "Buy an add-on or another plan after the fixed allowance is used",
  activation: "Check activation timing on the exact plan",
  note: "Fixed-data plan",
  callingSupport: "data-only" as const,
};
const fixedSaily = {
  speed: "3G / 4G / LTE / 5G where available",
  speedCap: "No throttle disclosed before the fixed allowance is used",
  network: "Local partner networks",
  tethering: "allowed" as const,
  tetheringNote: "Saily advertises unrestricted hotspot sharing",
  fairUse: "Top up after the fixed allowance is used",
  activation: "Check the live plan's activation policy before installation",
  note: "Fixed-data plan",
  callingSupport: "data-only" as const,
};

const expandedPlans: Plan[] = [
  // United States
  datedPlan({ id: "united-states-airalo-1", destination: "united-states", provider: "Airalo", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", network: "T-Mobile + Verizon", sourceUrl: "https://www.airalo.com/united-states-esim", ...fixedAiralo }),
  datedPlan({ id: "united-states-airalo-10", destination: "united-states", provider: "Airalo", name: "10GB", dataGb: 10, validity: 30, price: 22.5, currency: "USD", network: "T-Mobile + Verizon", sourceUrl: "https://www.airalo.com/united-states-esim/change-in-30days-10gb", ...fixedAiralo }),
  datedPlan({ id: "united-states-airalo-unlimited", destination: "united-states", provider: "Airalo", name: "Unlimited", unlimited: true, validity: 10, price: 34, currency: "USD", speed: "Local 4G / 5G where available", speedCap: "1Mbps after 3GB high-speed data in 24 hours", network: "T-Mobile + Verizon", tethering: "allowed", tetheringNote: "No separate tethering-device limit stated", fairUse: "3GB high-speed per 24 hours, then 1Mbps until reset", activation: "Check the exact plan's activation policy", note: "Daily fair-use throttle", callingSupport: "data-only", sourceUrl: "https://www.airalo.com/united-states-esim" }),
  datedPlan({ id: "united-states-airalo-voice-5", destination: "united-states", provider: "Airalo", name: "Change+ 5GB + 50 min/SMS", dataGb: 5, validity: 30, price: 19, currency: "USD", speed: "Local network; generation varies", speedCap: "No throttle disclosed before the fixed allowance is used", network: "T-Mobile + Verizon", tethering: "allowed", tetheringNote: "Hotspot supported when the phone and local network allow it", fairUse: "Includes 50 minutes and 50 SMS; incoming calls use minutes and international calls are excluded", activation: "Check the exact plan's activation policy", note: "US number with limited voice and SMS", callingSupport: "calls-texts", sourceUrl: "https://www.airalo.com/united-states-esim/change-plus-30days-5gb" }),
  datedPlan({ id: "united-states-nomad-1", destination: "united-states", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 4.32, currency: "EUR", network: "T-Mobile", sourceUrl: "https://www.nomadesim.com/united-states-eSIM", ...fixedNomad }),
  datedPlan({ id: "united-states-nomad-10", destination: "united-states", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 17.29, currency: "EUR", network: "T-Mobile", sourceUrl: "https://www.nomadesim.com/united-states-eSIM", ...fixedNomad }),
  datedPlan({ id: "united-states-saily-1", destination: "united-states", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 3.49, currency: "EUR", sourceUrl: "https://saily.com/esim-united-states/", ...fixedSaily }),
  datedPlan({ id: "united-states-saily-10", destination: "united-states", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 20.49, currency: "EUR", sourceUrl: "https://saily.com/esim-united-states/", ...fixedSaily }),
  datedPlan({ id: "united-states-klook", destination: "united-states", provider: "Klook", name: "Flexible data catalogue", validity: 30, price: null, speed: "AT&T / Verizon 5G options", speedCap: "Varies by the selected package", network: "AT&T + Verizon options", tethering: "allowed", tetheringNote: "Hotspot listed as supported", fairUse: "Unlimited options list 15GB/day at full speed, then 1Mbps", activation: "Choose the exact allowance and 1–30 day validity live", note: "Exact package price must be checked live", callingSupport: "data-only", sourceUrl: "https://www.klook.com/activity/108033-usa-esim-travel/", catalogueOnly: true }),

  // Spain
  datedPlan({ id: "spain-airalo-1", destination: "spain", provider: "Airalo", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim", ...fixedAiralo }),
  datedPlan({ id: "spain-airalo-10", destination: "spain", provider: "Airalo", name: "10GB", dataGb: 10, validity: 30, price: 14, currency: "USD", network: "Orange", sourceUrl: "https://www.airalo.com/spain-esim", ...fixedAiralo, note: "Mainland Spain and Balearic Islands; verify Canary Islands" }),
  datedPlan({ id: "spain-nomad-1", destination: "spain", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 3.46, currency: "EUR", network: "Orange + Movistar", sourceUrl: "https://www.nomadesim.com/spain-eSIM", ...fixedNomad }),
  datedPlan({ id: "spain-nomad-10", destination: "spain", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 12.1, currency: "EUR", network: "Orange + Movistar", sourceUrl: "https://www.nomadesim.com/spain-eSIM", ...fixedNomad }),
  datedPlan({ id: "spain-saily-1", destination: "spain", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 3.49, currency: "EUR", sourceUrl: "https://saily.com/esim-spain/", ...fixedSaily }),
  datedPlan({ id: "spain-saily-10", destination: "spain", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 13.99, currency: "EUR", sourceUrl: "https://saily.com/esim-spain/", ...fixedSaily }),
  datedPlan({ id: "spain-klook", destination: "spain", provider: "Klook", name: "Flexible data catalogue", validity: 30, price: null, speed: "Movistar 5G / Vodafone 4G LTE", speedCap: "Varies by the selected package", network: "Movistar + Vodafone ES options", tethering: "allowed", tetheringNote: "Hotspot listed as supported", fairUse: "Unlimited options list 15GB/day at full speed, then 1Mbps", activation: "Choose the exact allowance and 1–30 day validity live", note: "Exact package price must be checked live", callingSupport: "data-only", sourceUrl: "https://www.klook.com/activity/163606-5g-esim-spain-vodafone-orange-movistar-yoigo/", catalogueOnly: true }),

  // Japan
  datedPlan({ id: "japan-airalo-20", destination: "japan", provider: "Airalo", name: "20GB", dataGb: 20, validity: 30, price: 25, currency: "USD", network: "SoftBank + KDDI", sourceUrl: "https://www.airalo.com/japan-esim/moshi-moshi-30days-20gb", ...fixedAiralo }),
  datedPlan({ id: "japan-airalo-unlimited", destination: "japan", provider: "Airalo", name: "Unlimited", unlimited: true, validity: 10, price: 34.5, currency: "USD", speed: "Network generation not confirmed on exact plan", speedCap: "1Mbps after 3GB high-speed data in 24 hours", network: "SoftBank + KDDI", tethering: "allowed", tetheringNote: "No separate tethering cap stated", fairUse: "3GB high-speed per 24 hours, then 1Mbps until reset", activation: "Check the exact plan's activation policy", note: "Daily fair-use throttle", callingSupport: "data-only", sourceUrl: "https://www.airalo.com/japan-esim/moshi-moshi-10days-unlimited" }),
  datedPlan({ id: "japan-nomad-1", destination: "japan", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", network: "KDDI au + SoftBank", sourceUrl: "https://www.nomadesim.com/japan-eSIM", ...fixedNomad }),
  datedPlan({ id: "japan-nomad-10", destination: "japan", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 16, currency: "USD", network: "KDDI au + SoftBank", sourceUrl: "https://www.nomadesim.com/japan-eSIM", ...fixedNomad }),
  datedPlan({ id: "japan-saily-1", destination: "japan", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 3.49, currency: "EUR", sourceUrl: "https://saily.com/esim-japan/", ...fixedSaily }),
  datedPlan({ id: "japan-saily-10", destination: "japan", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 15.99, currency: "EUR", sourceUrl: "https://saily.com/esim-japan/", ...fixedSaily }),
  datedPlan({ id: "japan-klook", destination: "japan", provider: "Klook", name: "Flexible data catalogue", validity: 30, price: null, speed: "SoftBank 5G / Docomo 4G LTE options", speedCap: "Varies by the selected package", network: "SoftBank + Docomo options", tethering: "allowed", tetheringNote: "Hotspot listed as supported", fairUse: "Unlimited options list 10GB/day at full speed, then 128kbps", activation: "Choose the exact allowance and 1–30 day validity live", note: "Exact package price must be checked live", callingSupport: "data-only", sourceUrl: "https://www.klook.com/en-GB/activity/109393-japan-esim-high-speed-internet-qr-code-voucher/", catalogueOnly: true }),

  // United Arab Emirates
  datedPlan({ id: "united-arab-emirates-airalo-20", destination: "united-arab-emirates", provider: "Airalo", name: "20GB", dataGb: 20, validity: 30, price: 34, currency: "USD", network: "Etisalat", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim/burj-mobile-30days-20gb", ...fixedAiralo }),
  datedPlan({ id: "united-arab-emirates-airalo-unlimited", destination: "united-arab-emirates", provider: "Airalo", name: "Unlimited", unlimited: true, validity: 10, price: 35, currency: "USD", speed: "Network generation not confirmed on exact plan", speedCap: "1Mbps after 3GB high-speed data in 24 hours", network: "Etisalat", tethering: "allowed", tetheringNote: "No separate tethering cap stated", fairUse: "3GB high-speed per 24 hours, then 1Mbps until reset", activation: "Check the exact plan's activation policy", note: "Daily fair-use throttle", callingSupport: "data-only", sourceUrl: "https://www.airalo.com/united-arab-emirates-esim/burj-mobile-10days-unlimited" }),
  datedPlan({ id: "united-arab-emirates-nomad-1", destination: "united-arab-emirates", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", network: "du", sourceUrl: "https://www.nomadesim.com/united-arab-emirates-eSIM/10gb-30day", ...fixedNomad }),
  datedPlan({ id: "united-arab-emirates-nomad-10", destination: "united-arab-emirates", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 18.5, currency: "USD", network: "du", sourceUrl: "https://www.nomadesim.com/united-arab-emirates-eSIM/10gb-30day", ...fixedNomad }),
  datedPlan({ id: "united-arab-emirates-saily-1", destination: "united-arab-emirates", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 7.99, currency: "EUR", sourceUrl: "https://saily.com/esim-united-arab-emirates/", ...fixedSaily, activation: "Buy and install before entering the UAE" }),
  datedPlan({ id: "united-arab-emirates-saily-10", destination: "united-arab-emirates", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 17.99, currency: "EUR", sourceUrl: "https://saily.com/esim-united-arab-emirates/", ...fixedSaily, activation: "Buy and install before entering the UAE" }),
  datedPlan({ id: "united-arab-emirates-klook", destination: "united-arab-emirates", provider: "Klook", name: "Flexible data catalogue", validity: 30, price: null, speed: "Etisalat 5G options", speedCap: "Varies by the selected package", network: "Etisalat", tethering: "allowed", tetheringNote: "Hotspot listed as supported", fairUse: "Unlimited options list 15GB/day at full speed, then 1Mbps", activation: "Choose the exact allowance and 1–30 day validity live", note: "Exact package price must be checked live", callingSupport: "data-only", sourceUrl: "https://www.klook.com/en-GB/activity/123940-uae-esim-high-speed-internet-qr-code-voucher/", catalogueOnly: true }),
];

export const plans: Plan[] = [...turkeyPlans, ...expandedPlans];
export const pricedDestinationIds = ["turkey", "united-states", "spain", "japan", "united-arab-emirates"] as const satisfies readonly DestinationId[];

export function hasPricedPlans(destination: DestinationId) {
  return plans.some((plan) => plan.destination === destination && plan.price !== null);
}

export function isPlanStale(plan: Plan, now = new Date()) {
  return isReviewDateDue(plan.reviewAfter, now);
}

export function isReviewDateDue(reviewAfter: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewAfter)) return true;
  const reviewDate = new Date(`${reviewAfter}T23:59:59Z`);
  if (Number.isNaN(reviewDate.getTime()) || reviewDate.toISOString().slice(0, 10) !== reviewAfter) return true;
  return now.getTime() > reviewDate.getTime();
}

export function formatCheckedDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${isoDate}T12:00:00Z`));
}
