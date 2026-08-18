import { gbpRates, type Currency, type Plan, type Provider } from "./catalog.ts";

export const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

export function nativeMoney(value: number, currency: Currency) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
}

/**
 * Keeps every provider on the page for a destination.
 *
 * A provider with no plans for this destination gets a labelled live-catalogue
 * handoff instead of disappearing. Without this, a destination covered by a
 * single provider's live feed would render as a one-provider page — and since
 * the feeds we have are affiliate ones, that would quietly turn the comparison
 * into an advert.
 */
export function withProviderHandoffs<T extends { provider: Provider }>(
  destinationPlans: T[],
  providers: Provider[],
  makeHandoff: (provider: Provider) => T,
): T[] {
  const covered = new Set(destinationPlans.map((plan) => plan.provider));
  return [...destinationPlans, ...providers.filter((provider) => !covered.has(provider)).map(makeHandoff)];
}

type Comparable = {
  id: string;
  gbpTotal: number | null;
  suppliedData: number;
  validity: number;
  catalogueOnly?: boolean;
  callingSupport: Plan["callingSupport"];
  tethering: Plan["tethering"];
  speed: string;
  speedCap: string;
  fairUse: string;
};

/**
 * True when `keeper` is at least as good as `candidate` on every axis a buyer
 * would weigh, and cheaper or larger on at least one.
 *
 * The qualitative terms must match exactly before price and size are compared.
 * Two plans with different throttles, hotspot rules or calls support are not
 * interchangeable, however the totals land — this is what stops a cheap
 * data-only plan from hiding the one plan that includes a phone number, or one
 * unlimited plan from hiding another with a larger daily high-speed allowance.
 */
function weaklyDominates(keeper: Comparable, candidate: Comparable) {
  if (keeper.catalogueOnly || candidate.catalogueOnly) return false;
  if (keeper.gbpTotal === null || candidate.gbpTotal === null) return false;
  if (keeper.callingSupport !== candidate.callingSupport) return false;
  if (keeper.tethering !== candidate.tethering) return false;
  if (keeper.speed !== candidate.speed) return false;
  if (keeper.speedCap !== candidate.speedCap) return false;
  if (keeper.fairUse !== candidate.fairUse) return false;
  // Validity counts even when both plans cover the trip: a longer plan can be
  // started late, or reused. Ignoring it let a cheap 5-day plan hide a 10-day one
  // and label it "costs more for the same data", which was simply untrue — and it
  // hid the very plan a reader who sorted by validity was looking for.
  if (keeper.validity < candidate.validity) return false;
  return keeper.gbpTotal <= candidate.gbpTotal && keeper.suppliedData >= candidate.suppliedData;
}

/**
 * Splits one provider's plans into the ones worth showing and the ones that
 * cost more for no more data. Order of the input is preserved in `shown`, so
 * the caller's chosen sort still applies; dominance itself is judged on a
 * cheapest-first pass so the survivor of any group is the cheapest one.
 */
export function partitionDominated<T extends Comparable>(matches: T[]): { shown: T[]; dominated: T[] } {
  const cheapestFirst = [...matches].sort((a, b) => (a.gbpTotal ?? Infinity) - (b.gbpTotal ?? Infinity));
  const keepers: T[] = [];
  const dominatedIds = new Set<string>();

  for (const candidate of cheapestFirst) {
    if (keepers.some((keeper) => weaklyDominates(keeper, candidate))) dominatedIds.add(candidate.id);
    else keepers.push(candidate);
  }

  return {
    shown: matches.filter((match) => !dominatedIds.has(match.id)),
    dominated: matches.filter((match) => dominatedIds.has(match.id)),
  };
}

export function getPlanMatch(plan: Plan, days: number, neededData: number) {
  if (plan.catalogueOnly) return { ...plan, packs: 1, suppliedData: Number.POSITIVE_INFINITY, nativeTotal: null, gbpTotal: null };
  const packsForTime = Math.ceil(days / plan.validity);
  const packsForData = plan.unlimited || plan.dailyDataGb ? 1 : Math.ceil(neededData / (plan.dataGb ?? 1));
  const packs = Math.max(packsForTime, packsForData);
  const suppliedData = plan.unlimited ? Number.POSITIVE_INFINITY : plan.dailyDataGb ? plan.dailyDataGb * days : (plan.dataGb ?? 0) * packs;
  const nativeTotal = plan.price === null ? null : plan.price * packs;
  const gbpTotal = nativeTotal === null || !plan.currency ? null : nativeTotal * gbpRates[plan.currency];
  return { ...plan, packs, suppliedData, nativeTotal, gbpTotal };
}
