import { DATA_CHECKED_AT, DATA_REVIEW_AFTER, FX_EVIDENCE, plans, pricedDestinationIds } from "../lib/catalog.ts";
import { esimSources } from "../lib/esim-devices.ts";
import { networkRoamingEvidence, ROAMING_CHECKED_AT, ROAMING_REVIEW_AFTER, scenarioRoamingEvidence } from "../lib/roaming.ts";

const providerDomains = {
  Airalo: "airalo.com",
  Klook: "klook.com",
  Nomad: "nomadesim.com",
  Saily: "saily.com",
};

const roamingDomains = ["ee.co.uk", "o2.co.uk", "vodafone.co.uk", "three.co.uk", "idmobile.co.uk", "sky.com", "giffgaff.com", "smarty.co.uk", "voxi.co.uk", "tescomobile.com"];
const compatibilityDomains = ["apple.com", "samsung.com", "google.com", "sony.co.uk"];

function parseDateArgument(args) {
  const value = args.find((argument) => argument.startsWith("--date="))?.slice("--date=".length);
  if (!value) return new Date();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("--date must use YYYY-MM-DD");
  const parsed = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) throw new Error("--date is not a valid date");
  return parsed;
}

function parseIsoDate(value, endOfDay = false) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return Number.NaN;
  const parsed = new Date(`${value}T${endOfDay ? "23:59:59" : "00:00:00"}Z`);
  return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value ? Number.NaN : parsed.getTime();
}

function reviewIsDue(reviewAfter, now) {
  const boundary = parseIsoDate(reviewAfter, true);
  return Number.isNaN(boundary) || now.getTime() > boundary;
}

function validateWindow(label, checkedAt, reviewAfter, now) {
  const checked = parseIsoDate(checkedAt);
  const review = parseIsoDate(reviewAfter, true);
  const errors = [];
  if (Number.isNaN(checked)) errors.push(`${label}: invalid checkedAt ${checkedAt}`);
  if (Number.isNaN(review)) errors.push(`${label}: invalid reviewAfter ${reviewAfter}`);
  if (!Number.isNaN(checked) && checked > now.getTime()) errors.push(`${label}: checkedAt is in the future (${checkedAt})`);
  if (!Number.isNaN(checked) && !Number.isNaN(review) && review < checked) errors.push(`${label}: reviewAfter precedes checkedAt`);
  return errors;
}

function sourceIntegrityErrors(groups, now) {
  const errors = [];
  for (const plan of groups) {
    const label = `${plan.destination} · ${plan.provider}`;
    errors.push(...validateWindow(label, plan.checkedAt, plan.reviewAfter, now));
    try {
      const url = new URL(plan.sourceUrl);
      const expected = providerDomains[plan.provider];
      if (url.protocol !== "https:") errors.push(`${label}: source URL must use HTTPS`);
      if (url.hostname !== expected && !url.hostname.endsWith(`.${expected}`)) errors.push(`${label}: unexpected source domain ${url.hostname}`);
    } catch {
      errors.push(`${label}: invalid source URL ${plan.sourceUrl}`);
    }
  }
  for (const source of Object.values(esimSources)) {
    errors.push(...validateWindow(`Compatibility · ${source.label}`, source.checkedAt, source.reviewAfter, now));
    try {
      const url = new URL(source.url);
      const knownHost = compatibilityDomains.some((domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`));
      if (url.protocol !== "https:" || !knownHost) errors.push(`Compatibility · ${source.label}: unexpected source URL ${source.url}`);
    } catch {
      errors.push(`Compatibility · ${source.label}: invalid source URL ${source.url}`);
    }
  }
  const roamingSources = [...new Map([...Object.values(networkRoamingEvidence), ...Object.values(scenarioRoamingEvidence)].map((source) => [source.url, source])).values()];
  for (const source of roamingSources) {
    errors.push(...validateWindow(`Roaming · ${source.label}`, source.checkedAt, source.reviewAfter, now));
    try {
      const url = new URL(source.url);
      const knownHost = roamingDomains.some((domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`));
      if (url.protocol !== "https:" || !knownHost) errors.push(`Roaming · ${source.label}: unexpected evidence URL ${source.url}`);
    } catch {
      errors.push(`Roaming · ${source.label}: invalid evidence URL ${source.url}`);
    }
  }
  errors.push(...validateWindow("eSIM catalogue constants", DATA_CHECKED_AT, DATA_REVIEW_AFTER, now));
  errors.push(...validateWindow("UK roaming", ROAMING_CHECKED_AT, ROAMING_REVIEW_AFTER, now));
  errors.push(...validateWindow("GBP conversion assumptions", FX_EVIDENCE.checkedAt, FX_EVIDENCE.reviewAfter, now));
  try {
    const fxUrl = new URL(FX_EVIDENCE.url);
    if (fxUrl.protocol !== "https:" || (fxUrl.hostname !== "bankofengland.co.uk" && !fxUrl.hostname.endsWith(".bankofengland.co.uk"))) {
      errors.push(`GBP conversion assumptions: unexpected evidence URL ${FX_EVIDENCE.url}`);
    }
  } catch {
    errors.push(`GBP conversion assumptions: invalid evidence URL ${FX_EVIDENCE.url}`);
  }
  for (const destination of pricedDestinationIds) {
    const hasFreshPricedPlan = plans.some((plan) => plan.destination === destination && plan.price !== null && !reviewIsDue(plan.reviewAfter, now));
    if (!hasFreshPricedPlan) errors.push(`${destination}: no fresh priced plan is available`);
  }
  return errors;
}

function sourceGroups() {
  const groups = new Map();
  for (const plan of plans) {
    const key = `${plan.destination}|${plan.provider}|${plan.sourceUrl}`;
    if (!groups.has(key)) groups.set(key, plan);
  }
  return [...groups.values()];
}

try {
  const now = parseDateArgument(process.argv.slice(2));
  const groups = sourceGroups();
  const duePlans = plans.filter((plan) => reviewIsDue(plan.reviewAfter, now));
  const due = [...new Map(duePlans.map((plan) => [`${plan.destination}|${plan.provider}|${plan.sourceUrl}|${plan.reviewAfter}`, plan])).values()];
  const roamingDue = reviewIsDue(ROAMING_REVIEW_AFTER, now);
  const compatibilityDue = Object.values(esimSources).filter((source) => reviewIsDue(source.reviewAfter, now));
  const fxDue = reviewIsDue(FX_EVIDENCE.reviewAfter, now);
  const integrityErrors = sourceIntegrityErrors(plans, now);

  console.log(`Data freshness check for ${now.toISOString().slice(0, 10)}`);
  console.log(`${plans.length} eSIM plan records across ${groups.length} source groups checked; ${duePlans.length} need review.`);
  console.log(`UK roaming snapshot ${roamingDue ? "needs review" : `is current through ${ROAMING_REVIEW_AFTER}`}.`);
  console.log(`${new Set([...Object.values(networkRoamingEvidence), ...Object.values(scenarioRoamingEvidence)].map((source) => source.url)).size} official roaming sources checked.`);
  console.log(`${Object.keys(esimSources).length} compatibility sources checked; ${compatibilityDue.length} need review.`);
  console.log(`GBP conversion assumptions ${fxDue ? "need review" : `are current through ${FX_EVIDENCE.reviewAfter}`}.`);

  for (const plan of due) {
    console.log(`DUE  ${plan.destination} · ${plan.provider} · review after ${plan.reviewAfter} · ${plan.sourceUrl}`);
  }
  for (const source of compatibilityDue) {
    console.log(`DUE  compatibility · ${source.label} · review after ${source.reviewAfter} · ${source.url}`);
  }
  for (const error of integrityErrors) console.log(`ERROR  ${error}`);

  if (duePlans.length > 0 || roamingDue || compatibilityDue.length > 0 || fxDue || integrityErrors.length > 0) process.exitCode = 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 2;
}
