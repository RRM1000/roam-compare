import { gbpRates, type Currency, type Plan } from "./catalog.ts";

export const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

export function nativeMoney(value: number, currency: Currency) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
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
