import type { DestinationId } from "./destinations";

export type Network = "ee" | "o2" | "vodafone" | "three" | "id-mobile" | "sky-mobile" | "giffgaff" | "smarty" | "voxi" | "tesco-mobile";

export type RoamingTethering = "allowed" | "not-allowed" | "check-plan";
export type RoamingCallsTexts = "included" | "not-included" | "extra" | "check-plan";
export type RoamingAllowanceSource = "published" | "user-entered" | "metered" | "unknown" | "not-applicable";

export type RoamingResult = {
  cost: number | null;
  title: string;
  detail: string;
  caveat: string;
  comparable: boolean;
  dataAllowanceGb: number | null;
  unlimitedData: boolean;
  allowanceSource: RoamingAllowanceSource;
  speedCap: string | null;
  tethering: RoamingTethering;
  callsTexts: RoamingCallsTexts;
  matched: boolean | null;
  matchReason: string;
};

export const ROAMING_CHECKED = "16 August 2026";

export const networkNames: Record<Network, string> = {
  ee: "EE", o2: "O2", vodafone: "Vodafone", three: "Three", "id-mobile": "iD Mobile", "sky-mobile": "Sky Mobile", giffgaff: "giffgaff", smarty: "SMARTY", voxi: "VOXI", "tesco-mobile": "Tesco Mobile",
};

export const defaultScenario: Record<Network, string> = {
  ee: "ee-current", o2: "o2-travel", vodafone: "vodafone-check", three: "three-new", "id-mobile": "id-roam-beyond", "sky-mobile": "sky-passport", giffgaff: "giffgaff-check", smarty: "smarty-metered", voxi: "voxi-check", "tesco-mobile": "tesco-check",
};

const common = [{ value: "included", label: "Roaming is included in my plan" }, { value: "custom", label: "Enter my own trip cost" }];
export const scenarioOptions: Record<Network, Array<{ value: string; label: string }>> = {
  ee: [{ value: "ee-current", label: "Current EE RoW Zone 1 passes" }, ...common],
  o2: [{ value: "o2-travel", label: "O2 Travel — £7 on days used" }, { value: "included", label: "O2 Travel is included in my plan" }, { value: "custom", label: "Enter my own trip cost" }],
  vodafone: [{ value: "vodafone-check", label: "I need to check my Vodafone plan" }, { value: "included", label: "Turkey is included in my plan" }, { value: "custom", label: "Enter my Vodafone trip cost" }],
  three: [{ value: "three-new", label: "Joined/upgraded from 18 Dec 2025 — £8/day" }, { value: "three-older", label: "Joined/upgraded 1 Oct 2021–17 Dec 2025 — £7/day" }, ...common],
  "id-mobile": [{ value: "id-roam-beyond", label: "Roam Beyond data add-ons" }, ...common],
  "sky-mobile": [{ value: "sky-passport", label: "Roaming Passport Plus — £2/24 hours" }, ...common],
  giffgaff: [{ value: "giffgaff-check", label: "Check my Turkey travel add-on" }, { value: "giffgaff-metered", label: "Standard Zone A data — 20p/MB" }, ...common],
  smarty: [{ value: "smarty-metered", label: "Standard Band 1 data — 10p/MB" }, ...common],
  voxi: [{ value: "voxi-check", label: "Check Global Roaming Extra in My VOXI" }, ...common],
  "tesco-mobile": [{ value: "tesco-check", label: "Check whether I’m PAYG or pay-monthly" }, { value: "tesco-payg", label: "Pay as you go data — £5/MB" }, ...common],
};

const genericScenarioOptions = [
  { value: "plan-check", label: "Check my network’s current roaming price" },
  { value: "included", label: "Roaming is included in my plan" },
  { value: "custom", label: "Enter my own trip cost" },
];

export function getScenarioOptions(network: Network, destination: DestinationId) {
  return destination === "turkey" ? scenarioOptions[network] : genericScenarioOptions;
}

export function getDefaultScenario(network: Network, destination: DestinationId) {
  return destination === "turkey" ? defaultScenario[network] : "plan-check";
}

type PassOffer = { days: number; cost: number; label: string; dataGb?: number };

function getPasses(days: number, offers: PassOffer[], neededDataGb = 0) {
  let best = { cost: Number.POSITIVE_INFINITY, labels: [] as string[], coveredDays: 0, dataGb: 0 };
  function visit(index: number, remainingDays: number, remainingDataGb: number, cost: number, labels: string[], coveredDays: number, dataGb: number) {
    if (cost > best.cost) return;
    if (index === offers.length) {
      const coversDays = remainingDays <= 0;
      const coversData = remainingDataGb <= 0;
      const overProvision = Math.max(0, coveredDays - days) + Math.max(0, dataGb - neededDataGb);
      const bestOverProvision = Math.max(0, best.coveredDays - days) + Math.max(0, best.dataGb - neededDataGb);
      if (coversDays && coversData && (cost < best.cost || (cost === best.cost && overProvision < bestOverProvision))) {
        best = { cost, labels, coveredDays, dataGb };
      }
      return;
    }
    const offer = offers[index];
    const maxForDays = Math.ceil(days / offer.days) + 1;
    const maxForData = offer.dataGb ? Math.ceil(neededDataGb / offer.dataGb) + 1 : 0;
    const maxForOffer = Math.max(maxForDays, maxForData);
    for (let count = 0; count <= maxForOffer; count += 1) {
      visit(
        index + 1,
        remainingDays - count * offer.days,
        remainingDataGb - count * (offer.dataGb ?? 0),
        cost + count * offer.cost,
        count ? [...labels, `${count} × ${offer.label}`] : labels,
        coveredDays + count * offer.days,
        dataGb + count * (offer.dataGb ?? 0),
      );
    }
  }
  visit(0, days, neededDataGb, 0, [], 0, 0);
  return best;
}

type RoamingResultInput = Omit<RoamingResult, "comparable">;

function result(input: RoamingResultInput): RoamingResult {
  return { ...input, comparable: input.cost !== null && input.matched === true };
}

function parseAllowance(value: string | number | null | undefined) {
  if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function formatGb(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function formatDestinationName(destination: DestinationId) {
  return destination.split("-").map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join(" ");
}

function allowanceMatch(allowanceGb: number | null, neededDataGb: number, missingReason: string) {
  if (allowanceGb === null) return { matched: null, matchReason: missingReason } as const;
  if (allowanceGb + Number.EPSILON >= neededDataGb) {
    return { matched: true, matchReason: `${formatGb(allowanceGb)}GB covers the ${formatGb(neededDataGb)}GB needed for the selected UK-SIM roaming days.` } as const;
  }
  return { matched: false, matchReason: `${formatGb(allowanceGb)}GB does not cover the ${formatGb(neededDataGb)}GB needed for the selected UK-SIM roaming days.` } as const;
}

const unknownFacts = {
  dataAllowanceGb: null,
  unlimitedData: false,
  allowanceSource: "unknown" as const,
  speedCap: null,
  tethering: "check-plan" as const,
  callsTexts: "check-plan" as const,
  matched: null,
};

export function getRoamingResult(
  network: Network,
  scenario: string,
  roamingDays: number,
  customCost: string,
  neededData: number,
  destination: DestinationId,
  ukRoamingAllowance?: string | number | null,
): RoamingResult {
  const billableDays = Number.isFinite(roamingDays) ? Math.max(0, Math.ceil(roamingDays)) : 0;
  const neededDataGb = Number.isFinite(neededData) ? Math.max(0, neededData) : 0;
  const formattedData = formatGb(neededDataGb);
  const enteredAllowanceGb = parseAllowance(ukRoamingAllowance);

  if (billableDays === 0) {
    return result({
      cost: 0,
      title: "No UK-SIM roaming days",
      detail: "You selected eSIM or Wi-Fi only for this trip.",
      caveat: "Keep data roaming disabled on your UK line to avoid accidental charges.",
      dataAllowanceGb: 0,
      unlimitedData: false,
      allowanceSource: "not-applicable",
      speedCap: null,
      tethering: "check-plan",
      callsTexts: "check-plan",
      matched: null,
      matchReason: "There is no UK-SIM roaming option to compare for the selected days.",
    });
  }

  if (scenario === "included") {
    const match = allowanceMatch(enteredAllowanceGb, neededDataGb, "Enter the data available abroad through your UK plan before showing savings against it.");
    return result({
      cost: 0,
      title: "Roaming appears to be included",
      detail: "No extra roaming fee entered for this trip.",
      caveat: "Fair-use limits and excluded activities can still apply. Confirm in your network app.",
      dataAllowanceGb: enteredAllowanceGb,
      unlimitedData: false,
      allowanceSource: enteredAllowanceGb === null ? "unknown" : "user-entered",
      speedCap: null,
      tethering: "check-plan",
      callsTexts: "check-plan",
      ...match,
    });
  }

  if (scenario === "custom") {
    const parsedCost = Number(customCost);
    const cost = customCost.trim() !== "" && Number.isFinite(parsedCost) && parsedCost >= 0 ? parsedCost : null;
    const match = allowanceMatch(enteredAllowanceGb, neededDataGb, "Enter how much data that roaming price includes before showing savings against it.");
    return result({
      cost,
      title: "Your own roaming estimate",
      detail: "Based on the total trip cost you entered.",
      caveat: "Confirm what data, calls and texts that price includes.",
      dataAllowanceGb: enteredAllowanceGb,
      unlimitedData: false,
      allowanceSource: enteredAllowanceGb === null ? "unknown" : "user-entered",
      speedCap: null,
      tethering: "check-plan",
      callsTexts: "check-plan",
      ...match,
    });
  }

  if (destination !== "turkey") {
    return result({
      cost: null,
      title: `Check ${networkNames[network]} for ${formatDestinationName(destination)}`,
      detail: "A live roaming total is not stored for this destination yet.",
      caveat: "Use your network’s current checker, then enter its cost and data allowance for an allowance-matched comparison.",
      ...unknownFacts,
      matchReason: "The roaming cost and overseas data allowance have not both been entered.",
    });
  }

  if (scenario === "ee-current") {
    const pass = getPasses(billableDays, [{ days: 15, cost: 50, label: "15-day" }, { days: 7, cost: 30, label: "7-day" }, { days: 1, cost: 6, label: "24-hour" }]);
    const match = allowanceMatch(enteredAllowanceGb, neededDataGb, "Enter the part of your UK allowance available in Turkey before showing savings against the EE pass.");
    return result({
      cost: pass.cost,
      title: "EE RoW Zone 1 pass estimate",
      detail: `${pass.labels.join(" + ")} covers ${billableDays} consecutive roaming ${billableDays === 1 ? "day" : "days"}.`,
      caveat: "Uses your UK allowance. Pass timing is measured from purchase, so separated roaming days can need a different pass mix.",
      dataAllowanceGb: enteredAllowanceGb,
      unlimitedData: false,
      allowanceSource: enteredAllowanceGb === null ? "unknown" : "user-entered",
      speedCap: null,
      tethering: "check-plan",
      callsTexts: "check-plan",
      ...match,
    });
  }

  if (scenario === "o2-travel") {
    return result({
      cost: billableDays * 7,
      title: "O2 Travel estimate",
      detail: `£7 × ${billableDays} ${billableDays === 1 ? "day" : "days"} when you use calls, texts or data.`,
      caveat: "O2 states unlimited minutes, texts and data, with data speed capped at 2Mbps.",
      dataAllowanceGb: null,
      unlimitedData: true,
      allowanceSource: "published",
      speedCap: "2Mbps",
      tethering: "check-plan",
      callsTexts: "included",
      matched: true,
      matchReason: `Published unlimited data covers the ${formattedData}GB needed for the selected UK-SIM roaming days.`,
    });
  }

  if (scenario === "three-new" || scenario === "three-older") {
    const isNewPlan = scenario === "three-new";
    const match = allowanceMatch(12, neededDataGb, "");
    return result({
      cost: billableDays * (isNewPlan ? 8 : 7),
      title: "Three Go Roam Extra estimate",
      detail: `£${isNewPlan ? 8 : 7} × ${billableDays} ${billableDays === 1 ? "day" : "days"}.`,
      caveat: isNewPlan
        ? `For plans joined or upgraded from 18 December 2025. Up to 12GB; your selected roaming-days target is about ${formattedData}GB. Hotspot use is not allowed.`
        : `For most plans joined or upgraded 1 October 2021–17 December 2025. Up to 12GB; your selected roaming-days target is about ${formattedData}GB. Hotspot use is not allowed; check My3.`,
      dataAllowanceGb: 12,
      unlimitedData: false,
      allowanceSource: "published",
      speedCap: null,
      tethering: "not-allowed",
      callsTexts: "check-plan",
      ...match,
    });
  }

  if (scenario === "id-roam-beyond") {
    const pass = getPasses(billableDays, [
      { days: 10, cost: 35, label: "10-day / 20GB", dataGb: 20 },
      { days: 5, cost: 20, label: "5-day / 10GB", dataGb: 10 },
      { days: 1, cost: 5, label: "1-day / 2GB", dataGb: 2 },
    ], neededDataGb);
    return result({
      cost: pass.cost,
      title: "iD Mobile Roam Beyond estimate",
      detail: `${pass.labels.join(" + ")} supplies ${formatGb(pass.dataGb)}GB and covers at least ${billableDays} ${billableDays === 1 ? "day" : "days"}.`,
      caveat: `These are data-only passes; your selected roaming-days target is about ${formattedData}GB. They activate immediately.`,
      dataAllowanceGb: pass.dataGb,
      unlimitedData: false,
      allowanceSource: "published",
      speedCap: null,
      tethering: "check-plan",
      callsTexts: "not-included",
      matched: true,
      matchReason: `${formatGb(pass.dataGb)}GB covers the ${formattedData}GB needed for the selected UK-SIM roaming days.`,
    });
  }

  if (scenario === "sky-passport") {
    const match = allowanceMatch(enteredAllowanceGb, neededDataGb, "Enter the part of your UK allowance available in Turkey before showing savings against Sky’s pass.");
    return result({
      cost: billableDays * 2,
      title: "Sky Roaming Passport Plus estimate",
      detail: `£2 × ${billableDays} 24-hour ${billableDays === 1 ? "period" : "periods"}.`,
      caveat: "Uses your UK allowance; Turkey is charged as its own Passport destination.",
      dataAllowanceGb: enteredAllowanceGb,
      unlimitedData: false,
      allowanceSource: enteredAllowanceGb === null ? "unknown" : "user-entered",
      speedCap: null,
      tethering: "check-plan",
      callsTexts: "check-plan",
      ...match,
    });
  }

  const meteredResult = (ratePerMb: number, title: string, caveat: string): RoamingResult => result({
    cost: Math.round(neededDataGb * 1024 * ratePerMb * 100) / 100,
    title,
    detail: `${formattedData}GB selected roaming-days target × 1,024MB × ${ratePerMb >= 1 ? `£${ratePerMb}` : `${ratePerMb * 100}p`}/MB.`,
    caveat,
    dataAllowanceGb: neededDataGb,
    unlimitedData: false,
    allowanceSource: "metered",
    speedCap: null,
    tethering: "check-plan",
    callsTexts: "extra",
    matched: true,
    matchReason: `The estimate prices all ${formattedData}GB needed for the selected UK-SIM roaming days.`,
  });

  if (scenario === "giffgaff-metered") return meteredResult(0.2, "giffgaff standard data estimate", "Data-only estimate; calls and texts cost extra. Check whether a Turkey travel add-on is cheaper.");
  if (scenario === "smarty-metered") return meteredResult(0.1, "SMARTY standard data estimate", "Data-only estimate; calls and texts cost extra. Requires an out-of-plan add-on balance.");
  if (scenario === "tesco-payg") return meteredResult(5, "Tesco Mobile PAYG data estimate", "Illustrates the published PAYG Region 2 rate; a spend cap may stop usage. Do not rely on this for pay-monthly plans.");

  const checkCopy: Record<Network, [string, string]> = {
    vodafone: ["Check your Vodafone plan first", "Turkey pricing is personalised by mobile number and plan."],
    voxi: ["Check My VOXI first", "Turkey is listed for Global Roaming Extra, but the live pass price is account-specific."],
    giffgaff: ["Check your giffgaff add-on", "Turkey travel data add-ons vary by duration and allowance."],
    "tesco-mobile": ["Check your Tesco Mobile plan", "Pay-monthly roaming charges and safeguards depend on your tariff."],
    ee: ["Check your EE plan", "Your plan may include roaming."], o2: ["Check your O2 plan", "Your plan may include O2 Travel."], three: ["Check My3", "Your plan may include Go Roam."], "id-mobile": ["Check your iD plan", "Pass availability can change."], "sky-mobile": ["Check your Sky plan", "Pass availability can change."], smarty: ["Check your SMARTY account", "Charges can change."],
  };
  return result({
    cost: null,
    title: checkCopy[network][0],
    detail: checkCopy[network][1],
    caveat: "Use the network’s current checker, then enter the total as a custom cost.",
    ...unknownFacts,
    matchReason: "The roaming cost and overseas data allowance have not both been entered.",
  });
}

export function isNetwork(value: string): value is Network { return Object.hasOwn(networkNames, value); }
