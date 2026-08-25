import { airaloPlans } from "./airalo-snapshot.ts";
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
  /** Set on plans fetched live from a provider API rather than a manual snapshot. */
  live?: boolean;
};

export const DATA_CHECKED_AT = "2026-08-25";
export const DATA_REVIEW_AFTER = "2026-09-01";
export const FX_CHECKED_AT = "2026-08-25";
export const FX_REVIEW_AFTER = "2026-09-01";
export const FX_EVIDENCE = {
  label: "Bank of England daily spot exchange rates",
  url: "https://www.bankofengland.co.uk/statistics/exchange-rates",
  checkedAt: FX_CHECKED_AT,
  reviewAfter: FX_REVIEW_AFTER,
} as const;
export const usagePerDay: Record<Usage, number> = { light: 0.35, everyday: 0.8, heavy: 2 };
export const tripLengths = [...Array.from({ length: 30 }, (_, index) => index + 1), 45, 60, 90];
// Bank of England daily spot rates published 21 August 2026, the most recent
// available when checked on the 25th: £1 = 1.3625 USD, £1 = 1.1672 EUR.
export const gbpRates: Record<Currency, number> = { GBP: 1, EUR: 0.86, USD: 0.73 };

export const providerDetails: Record<Provider, { accent: string; initials: string; affiliate: boolean; summary: string }> = {
  Airalo: { accent: "#a82350", initials: "AI", affiliate: false, summary: "Plans for one country, a region, or worldwide" },
  Klook: { accent: "#b33b27", initials: "KL", affiliate: true, summary: "Travel eSIM options alongside activities" },
  Nomad: { accent: "#2943aa", initials: "NO", affiliate: false, summary: "Set data amounts, plus unlimited plans" },
  Saily: { accent: "#4b28ae", initials: "SA", affiliate: true, summary: "Travel data plans with security features" },
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

const nomadDefaults = {
  speed: "4G / 5G", speedCap: "No speed limit stated for this plan", network: "Avea",
  tethering: "allowed" as const, tetheringNote: "Hotspot works, as long as your phone and the local network allow it",
  fairUse: "When the data runs out you'll need to top up or buy again", activation: "Activation timing varies by plan; confirm at checkout", note: "Hotspot works",
};
const sailyDefaults = {
  speed: "3G / 4G / 5G", speedCap: "No speed limit stated for this plan", network: "Partner networks",
  tethering: "allowed" as const, tetheringNote: "Saily says there are no hotspot restrictions, though your phone or the local network may still impose some",
  fairUse: "When the data runs out you can add more", activation: "Check when the plan starts counting down before you install it", note: "No hotspot restrictions",
};

const turkeyPlans: Plan[] = [
  turkeyPlan({ id: "turkey-klook-1gb-daily", provider: "Klook", name: "1GB per day", dailyDataGb: 1, validity: 30, price: null, speed: "5G / 4G", speedCap: "Full speed up to the daily amount, then slower", network: "Türk Telekom", tethering: "allowed", tetheringNote: "Hotspot sharing should work", fairUse: "1GB at full speed each day, then slower", activation: "Pick 1–30 days. Check when the countdown starts on the voucher", note: "Choose 1–30 days on Klook" }),
  turkeyPlan({ id: "turkey-klook-2gb-daily", provider: "Klook", name: "2GB per day", dailyDataGb: 2, validity: 30, price: null, speed: "5G / 4G", speedCap: "Full speed up to the daily amount, then slower", network: "Türk Telekom", tethering: "allowed", tetheringNote: "Hotspot sharing should work", fairUse: "2GB at full speed each day, then slower", activation: "Pick 1–30 days. Check when the countdown starts on the voucher", note: "A set amount at full speed each day" }),
  turkeyPlan({ id: "turkey-klook-unlimited", provider: "Klook", name: "Unlimited daily data", unlimited: true, validity: 30, price: null, speed: "5G / 4G", speedCap: "1Mbps once you've used 15GB in a day", network: "Türk Telekom", tethering: "allowed", tetheringNote: "Hotspot sharing should work", fairUse: "15GB at full speed a day, then 1Mbps until it resets", activation: "Pick 1–30 days. Check when the countdown starts on the voucher", note: "Slows down after a daily limit" }),
  turkeyPlan({ id: "turkey-nomad-1", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-3", provider: "Nomad", name: "3GB", dataGb: 3, validity: 30, price: 6, currency: "USD", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-5", provider: "Nomad", name: "5GB", dataGb: 5, validity: 30, price: 9, currency: "USD", ...nomadDefaults, note: "On sale when we checked" }),
  turkeyPlan({ id: "turkey-nomad-10", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 13, currency: "USD", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-20", provider: "Nomad", name: "20GB", dataGb: 20, validity: 30, price: 20, currency: "USD", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-50", provider: "Nomad", name: "50GB", dataGb: 50, validity: 30, price: 31, currency: "USD", ...nomadDefaults }),
  turkeyPlan({ id: "turkey-nomad-unlimited-5", provider: "Nomad", name: "Unlimited", unlimited: true, validity: 5, price: 17, currency: "USD", ...nomadDefaults, speedCap: "512kbps once the day's full-speed data is used", fairUse: "The full-speed amount resets each day; after it, you stay online at up to 512kbps", note: "Full speed up to a daily limit, then slower" }),
  turkeyPlan({ id: "turkey-nomad-unlimited-10", provider: "Nomad", name: "Unlimited", unlimited: true, validity: 10, price: 28, currency: "USD", ...nomadDefaults, speedCap: "512kbps once the day's full-speed data is used", fairUse: "The full-speed amount resets each day; after it, you stay online at up to 512kbps", note: "Full speed up to a daily limit, then slower" }),
  turkeyPlan({ id: "turkey-saily-1", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 2.99, currency: "GBP", ...sailyDefaults }),
  turkeyPlan({ id: "turkey-saily-3", provider: "Saily", name: "3GB", dataGb: 3, validity: 30, price: 5.49, currency: "GBP", ...sailyDefaults }),
  turkeyPlan({ id: "turkey-saily-5", provider: "Saily", name: "5GB", dataGb: 5, validity: 30, price: 7.49, currency: "GBP", ...sailyDefaults }),
  turkeyPlan({ id: "turkey-saily-10", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 12.49, currency: "GBP", ...sailyDefaults }),
  turkeyPlan({ id: "turkey-saily-20", provider: "Saily", name: "20GB", dataGb: 20, validity: 30, price: 17.49, currency: "GBP", ...sailyDefaults }),
];

type DatedPlanSeed = Omit<Plan, "checkedAt" | "reviewAfter">;
const datedPlan = (seed: DatedPlanSeed): Plan => ({ ...seed, checkedAt: CHECKED_AT, reviewAfter: REVIEW_AFTER });

const fixedNomad = {
  speed: "4G / 5G where available",
  speedCap: "No speed limit mentioned until your data runs out",
  tethering: "allowed" as const,
  tetheringNote: "Hotspot works, though it can occasionally be unreliable",
  fairUse: "When the data runs out, buy an add-on or another plan",
  activation: "Check when the plan starts counting down",
  note: "A set amount of data",
  callingSupport: "data-only" as const,
};
const fixedSaily = {
  speed: "3G / 4G / LTE / 5G where available",
  speedCap: "No speed limit mentioned until your data runs out",
  network: "Local partner networks",
  tethering: "allowed" as const,
  tetheringNote: "Saily advertises hotspot sharing with no restrictions",
  fairUse: "When the data runs out you can top up",
  activation: "Check when the plan starts counting down before you install it",
  note: "A set amount of data",
  callingSupport: "data-only" as const,
};

const expandedPlans: Plan[] = [
  // United States
  datedPlan({ id: "united-states-nomad-1", destination: "united-states", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 5, currency: "USD", network: "T-Mobile", sourceUrl: "https://www.nomadesim.com/united-states-eSIM", ...fixedNomad }),
  datedPlan({ id: "united-states-nomad-10", destination: "united-states", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 25, currency: "USD", network: "T-Mobile", sourceUrl: "https://www.nomadesim.com/united-states-eSIM", ...fixedNomad }),
  datedPlan({ id: "united-states-saily-1", destination: "united-states", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 2.99, currency: "GBP", sourceUrl: "https://saily.com/esim-united-states/", ...fixedSaily }),
  datedPlan({ id: "united-states-saily-10", destination: "united-states", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 17.49, currency: "GBP", sourceUrl: "https://saily.com/esim-united-states/", ...fixedSaily }),
  datedPlan({ id: "united-states-klook", destination: "united-states", provider: "Klook", name: "Choose your own size", validity: 30, price: null, speed: "AT&T / Verizon 5G options", speedCap: "Depends which package you choose", network: "AT&T + Verizon options", tethering: "allowed", tetheringNote: "Hotspot should work", fairUse: "Unlimited options give 15GB a day at full speed, then 1Mbps", activation: "Pick your allowance and 1–30 days on the provider's site", note: "Price is shown on the provider's own site", callingSupport: "data-only", sourceUrl: "https://www.klook.com/activity/108033-usa-esim-travel/", catalogueOnly: true }),

  // Spain
  datedPlan({ id: "spain-nomad-1", destination: "spain", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", network: "Orange + Movistar", sourceUrl: "https://www.nomadesim.com/spain-eSIM", ...fixedNomad }),
  datedPlan({ id: "spain-nomad-10", destination: "spain", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 14, currency: "USD", network: "Orange + Movistar", sourceUrl: "https://www.nomadesim.com/spain-eSIM", ...fixedNomad }),
  datedPlan({ id: "spain-saily-1", destination: "spain", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 2.99, currency: "GBP", sourceUrl: "https://saily.com/esim-spain/", ...fixedSaily }),
  datedPlan({ id: "spain-saily-10", destination: "spain", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 12.49, currency: "GBP", sourceUrl: "https://saily.com/esim-spain/", ...fixedSaily }),
  datedPlan({ id: "spain-klook", destination: "spain", provider: "Klook", name: "Choose your own size", validity: 30, price: null, speed: "Movistar 5G / Vodafone 4G LTE", speedCap: "Depends which package you choose", network: "Movistar + Vodafone ES options", tethering: "allowed", tetheringNote: "Hotspot should work", fairUse: "Unlimited options give 15GB a day at full speed, then 1Mbps", activation: "Pick your allowance and 1–30 days on the provider's site", note: "Price is shown on the provider's own site", callingSupport: "data-only", sourceUrl: "https://www.klook.com/activity/163606-5g-esim-spain-vodafone-orange-movistar-yoigo/", catalogueOnly: true }),

  // Japan
  datedPlan({ id: "japan-nomad-1", destination: "japan", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", network: "KDDI au + SoftBank", sourceUrl: "https://www.nomadesim.com/japan-eSIM", ...fixedNomad }),
  datedPlan({ id: "japan-nomad-10", destination: "japan", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 16, currency: "USD", network: "KDDI au + SoftBank", sourceUrl: "https://www.nomadesim.com/japan-eSIM", ...fixedNomad }),
  datedPlan({ id: "japan-saily-1", destination: "japan", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 2.99, currency: "GBP", sourceUrl: "https://saily.com/esim-japan/", ...fixedSaily }),
  datedPlan({ id: "japan-saily-10", destination: "japan", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 13.99, currency: "GBP", sourceUrl: "https://saily.com/esim-japan/", ...fixedSaily }),
  datedPlan({ id: "japan-klook", destination: "japan", provider: "Klook", name: "Choose your own size", validity: 30, price: null, speed: "SoftBank 5G / Docomo 4G LTE options", speedCap: "Depends which package you choose", network: "SoftBank + Docomo options", tethering: "allowed", tetheringNote: "Hotspot should work", fairUse: "Unlimited options give 10GB a day at full speed, then 128kbps", activation: "Pick your allowance and 1–30 days on the provider's site", note: "Price is shown on the provider's own site", callingSupport: "data-only", sourceUrl: "https://www.klook.com/en-GB/activity/109393-japan-esim-high-speed-internet-qr-code-voucher/", catalogueOnly: true }),

  // United Arab Emirates
  datedPlan({ id: "united-arab-emirates-nomad-1", destination: "united-arab-emirates", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", network: "du", sourceUrl: "https://www.nomadesim.com/united-arab-emirates-eSIM/10gb-30day", ...fixedNomad }),
  datedPlan({ id: "united-arab-emirates-nomad-10", destination: "united-arab-emirates", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 18.5, currency: "USD", network: "du", sourceUrl: "https://www.nomadesim.com/united-arab-emirates-eSIM/10gb-30day", ...fixedNomad }),
  datedPlan({ id: "united-arab-emirates-saily-1", destination: "united-arab-emirates", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 2.99, currency: "GBP", sourceUrl: "https://saily.com/esim-united-arab-emirates/", ...fixedSaily, activation: "Buy and install this before you arrive in the UAE" }),
  datedPlan({ id: "united-arab-emirates-saily-10", destination: "united-arab-emirates", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 15.49, currency: "GBP", sourceUrl: "https://saily.com/esim-united-arab-emirates/", ...fixedSaily, activation: "Buy and install this before you arrive in the UAE" }),
  datedPlan({ id: "united-arab-emirates-klook", destination: "united-arab-emirates", provider: "Klook", name: "Choose your own size", validity: 30, price: null, speed: "Etisalat 5G options", speedCap: "Depends which package you choose", network: "Etisalat", tethering: "allowed", tetheringNote: "Hotspot should work", fairUse: "Unlimited options give 15GB a day at full speed, then 1Mbps", activation: "Pick your allowance and 1–30 days on the provider's site", note: "Price is shown on the provider's own site", callingSupport: "data-only", sourceUrl: "https://www.klook.com/en-GB/activity/123940-uae-esim-high-speed-internet-qr-code-voucher/", catalogueOnly: true }),
];

export const plans: Plan[] = [...turkeyPlans, ...expandedPlans, ...airaloPlans];
export const pricedDestinationIds = ["turkey", "united-states", "spain", "japan", "united-arab-emirates"] as const satisfies readonly DestinationId[];

export function hasPricedPlans(destination: DestinationId) {
  return plans.some((plan) => plan.destination === destination && plan.price !== null);
}

export function isPlanStale(plan: Plan, now = new Date()) {
  // Live API plans are fetched per request, so the manual review window does not apply.
  if (plan.live) return false;
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
