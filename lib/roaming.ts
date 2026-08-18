import type { DestinationId } from "./destinations";

export type Network = "ee" | "o2" | "vodafone" | "three" | "id-mobile" | "sky-mobile" | "giffgaff" | "smarty" | "voxi" | "tesco-mobile";

export type RoamingTethering = "allowed" | "not-allowed" | "check-plan";
export type RoamingCallsTexts = "included" | "not-included" | "extra" | "check-plan";
export type RoamingAllowanceSource = "published" | "user-entered" | "metered" | "unknown" | "not-applicable";
export type RoamingEvidence = { label: string; url: string; checkedAt: string; reviewAfter: string };

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
  evidence: RoamingEvidence;
};

export const ROAMING_CHECKED_AT = "2026-08-16";
export const ROAMING_REVIEW_AFTER = "2026-08-23";

function evidence(label: string, url: string): RoamingEvidence {
  return { label, url, checkedAt: ROAMING_CHECKED_AT, reviewAfter: ROAMING_REVIEW_AFTER };
}

export const networkRoamingEvidence: Record<Network, RoamingEvidence> = {
  ee: evidence("EE mobile price guide", "https://ee.co.uk/content/dam/help/terms-and-conditions/price-plans/mobile/pay-monthly-price-plans/ee-mobile-plan-price-guide-04082026.pdf"),
  o2: evidence("O2 roaming guidance", "https://www.o2.co.uk/help/international-and-network/using-your-phone-abroad/roaming"),
  vodafone: evidence("Vodafone global roaming", "https://www.vodafone.co.uk/mobile/global-roaming"),
  three: evidence("Three Go Roam guidance", "https://www.three.co.uk/support/roaming-and-calling-abroad/roaming-abroad/go-roam"),
  "id-mobile": evidence("iD Mobile roaming guidance", "https://www.idmobile.co.uk/help-and-support/roaming"),
  "sky-mobile": evidence("Sky Mobile roaming guidance", "https://www.sky.com/help/articles/sky-mobile-roaming"),
  giffgaff: evidence("giffgaff roaming checker", "https://www.giffgaff.com/roaming"),
  smarty: evidence("SMARTY roaming guidance", "https://help.smarty.co.uk/en/articles/2090500-roaming-and-international"),
  voxi: evidence("VOXI roaming guidance", "https://www.voxi.co.uk/help/roaming-international/how-to-use-voxi-plan-abroad"),
  "tesco-mobile": evidence("Tesco Mobile roaming checker", "https://www.tescomobile.com/roaming"),
};

export const scenarioRoamingEvidence: Record<string, RoamingEvidence> = {
  "o2-travel": evidence("O2 Travel", "https://www.o2.co.uk/international/o2-travel"),
  "three-europe-pass": evidence("Three Go Roam passes", "https://www.three.co.uk/support/roaming-and-calling-abroad/roaming-abroad"),
  "three-world-pass": evidence("Three Go Roam passes", "https://www.three.co.uk/support/roaming-and-calling-abroad/roaming-abroad"),
  "three-extra-pass": evidence("Three Go Roam passes", "https://www.three.co.uk/support/roaming-and-calling-abroad/roaming-abroad"),
  "id-europe": evidence("iD Mobile EU fair-use policy", "https://www.idmobile.co.uk/help-and-support/eu-roaming/fair-usage-policy"),
  "id-roam-beyond": evidence("iD Mobile Roam Beyond", "https://www.idmobile.co.uk/help-and-support/roaming"),
  "giffgaff-europe": evidence("giffgaff EU roaming rules", "https://help.giffgaff.com/en/articles/229458-everything-you-need-to-know-about-roaming-in-the-eu"),
  "giffgaff-europe-overage": evidence("giffgaff EU roaming rules", "https://help.giffgaff.com/en/articles/229458-everything-you-need-to-know-about-roaming-in-the-eu"),
  "giffgaff-metered": evidence("giffgaff Zone A price sheet", "https://static.giffgaff.com/documents/roaming/row-zone-a/v1/roaming-row-zone-a.pdf"),
  "smarty-europe": evidence("SMARTY roaming in Spain", "https://smarty.co.uk/roaming/europe/spain/"),
  "smarty-metered-us": evidence("SMARTY roaming in the USA", "https://smarty.co.uk/roaming/international/united-states-of-america/"),
  "smarty-metered-world": evidence("SMARTY worldwide roaming guidance", "https://help.smarty.co.uk/en/articles/2090500-roaming-and-international"),
  "voxi-europe": evidence("VOXI European Roaming Pass", "https://www.voxi.co.uk/help/roaming-international/does-voxi-have-european-roaming"),
  "voxi-global": evidence("VOXI Global Roaming Extra", "https://www.voxi.co.uk/help/roaming-international/what-are-global-roaming-extras"),
  "voxi-metered": evidence("VOXI standard roaming charges", "https://www.voxi.co.uk/charges"),
  "tesco-europe": evidence("Tesco Mobile Home From Home", "https://www.tescomobile.com/why-tesco-mobile/awards-and-reviews/home-from-home"),
  "tesco-metered-us": evidence("Tesco Mobile roaming checker", "https://www.tescomobile.com/roaming"),
  "tesco-metered-world": evidence("Tesco Mobile roaming rates", "https://www.tescomobile.com/help/roaming-and-international/roaming-charges-for-pay-as-you-go"),
};

export function getRoamingEvidence(network: Network, scenario: string) {
  return scenarioRoamingEvidence[scenario] ?? networkRoamingEvidence[network];
}

export const networkNames: Record<Network, string> = {
  ee: "EE", o2: "O2", vodafone: "Vodafone", three: "Three", "id-mobile": "iD Mobile", "sky-mobile": "Sky Mobile", giffgaff: "giffgaff", smarty: "SMARTY", voxi: "VOXI", "tesco-mobile": "Tesco Mobile",
};

type ScenarioOption = { value: string; label: string };
const common: ScenarioOption[] = [{ value: "included", label: "Roaming is included in my plan" }, { value: "custom", label: "Enter my own trip cost" }];
export const scenarioOptions: Record<Network, Array<{ value: string; label: string }>> = {
  ee: [{ value: "ee-current", label: "EE RoW Zone 1 passes" }, ...common],
  o2: [{ value: "o2-travel", label: "O2 Travel — £7 on days used" }, { value: "included", label: "O2 Travel is included in my plan" }, { value: "custom", label: "Enter my own trip cost" }],
  vodafone: [{ value: "vodafone-check", label: "I need to check my Vodafone plan" }, { value: "included", label: "Turkey is included in my plan" }, { value: "custom", label: "Enter my own trip cost" }],
  three: [{ value: "three-new", label: "Joined/upgraded from 18 Dec 2025 — £8/day" }, { value: "three-older", label: "Joined/upgraded 1 Oct 2021–17 Dec 2025 — £7/day" }, ...common],
  "id-mobile": [{ value: "id-roam-beyond", label: "Roam Beyond data add-ons" }, ...common],
  "sky-mobile": [{ value: "sky-passport", label: "Roaming Passport Plus — £2/24 hours" }, ...common],
  giffgaff: [{ value: "giffgaff-check", label: "Check my Turkey travel add-on" }, { value: "giffgaff-metered", label: "Standard Zone A data — 20p/MB" }, ...common],
  smarty: [{ value: "smarty-metered", label: "Standard Band 1 data — 10p/MB" }, ...common],
  voxi: [{ value: "voxi-check", label: "Check Global Roaming Extra in My VOXI" }, ...common],
  "tesco-mobile": [{ value: "tesco-check", label: "Check whether I’m PAYG or pay-monthly" }, { value: "tesco-payg", label: "Pay as you go data — £5/MB" }, ...common],
};

const genericScenarioOptions: ScenarioOption[] = [
  { value: "plan-check", label: "Check my network’s current roaming price" },
  { value: "included", label: "Roaming is included in my plan" },
  { value: "custom", label: "Enter my own trip cost" },
];

const destinationScenarioOptions: Partial<Record<DestinationId, Partial<Record<Network, ScenarioOption[]>>>> = {
  // EE roaming zones, read from the EE mobile plan price guide (4 Aug 2026),
  // "Countries included in ROW", page 14. EU/EEA destinations need no ROW pass.
  // Other networks are not mapped for these destinations yet and still fall
  // through to the generic "check your network" option.
  "france": {
    ee: [{ value: "ee-europe-new", label: "EE Europe passes — joined from 7 Jul 2021" }, ...common],
  },
  "italy": {
    ee: [{ value: "ee-europe-new", label: "EE Europe passes — joined from 7 Jul 2021" }, ...common],
  },
  "greece": {
    ee: [{ value: "ee-europe-new", label: "EE Europe passes — joined from 7 Jul 2021" }, ...common],
  },
  "portugal": {
    ee: [{ value: "ee-europe-new", label: "EE Europe passes — joined from 7 Jul 2021" }, ...common],
  },
  "germany": {
    ee: [{ value: "ee-europe-new", label: "EE Europe passes — joined from 7 Jul 2021" }, ...common],
  },
  "netherlands": {
    ee: [{ value: "ee-europe-new", label: "EE Europe passes — joined from 7 Jul 2021" }, ...common],
  },
  "ireland": {
    ee: [{ value: "ee-europe-new", label: "EE Europe passes — joined from 7 Jul 2021" }, ...common],
  },
  "cyprus": {
    ee: [{ value: "ee-europe-new", label: "EE Europe passes — joined from 7 Jul 2021" }, ...common],
  },
  "thailand": {
    ee: [{ value: "ee-row1", label: "EE RoW Zone 1 passes" }, ...common],
  },
  "australia": {
    ee: [{ value: "ee-row1", label: "EE RoW Zone 1 passes" }, ...common],
  },
  "canada": {
    ee: [{ value: "ee-row1", label: "EE RoW Zone 1 passes" }, ...common],
  },
  "mexico": {
    ee: [{ value: "ee-row1", label: "EE RoW Zone 1 passes" }, ...common],
  },
  "indonesia": {
    ee: [{ value: "ee-row1", label: "EE RoW Zone 1 passes" }, ...common],
  },
  "morocco": {
    ee: [{ value: "ee-row2", label: "EE RoW Zone 2 passes" }, ...common],
  },
  "egypt": {
    ee: [{ value: "ee-row2", label: "EE RoW Zone 2 passes" }, ...common],
  },

  spain: {
    ee: [{ value: "ee-europe-new", label: "EE Europe passes — joined from 7 Jul 2021" }, ...common],
    o2: [{ value: "o2-europe", label: "O2 Europe Zone — included, up to 25GB" }, ...common],
    vodafone: [{ value: "vodafone-europe-pass", label: "Vodafone Europe pass — £16/8d or £21/15d" }, { value: "vodafone-europe-day", label: "Vodafone Zone B — £2.75/day" }, ...common],
    three: [{ value: "three-europe-new", label: "Three — joined/upgraded from 18 Dec 2025" }, { value: "three-europe-older", label: "Three — joined/upgraded Oct 2021–17 Dec 2025" }, { value: "three-europe-pass", label: "Three Go Roam pass — 3, 7 or 14 days" }, ...common],
    "id-mobile": [{ value: "id-europe", label: "iD Roam Free — up to 30GB" }, ...common],
    "sky-mobile": [{ value: "sky-passport", label: "Sky Passport Plus — £2/24h" }, ...common],
    giffgaff: [{ value: "giffgaff-europe", label: "Eligible giffgaff plan — up to 5GB" }, { value: "giffgaff-europe-overage", label: "Beyond allowance — 10p/MB" }, ...common],
    smarty: [{ value: "smarty-europe", label: "SMARTY EU roaming — up to 12GB" }, ...common],
    voxi: [{ value: "voxi-europe", label: "VOXI European pass — 1, 2, 8 or 15 days" }, ...common],
    "tesco-mobile": [{ value: "tesco-europe", label: "Tesco Home From Home — UK allowance" }, ...common],
  },
  "united-states": {
    ee: [{ value: "ee-row1", label: "EE RoW Zone 1 passes" }, ...common],
    o2: [{ value: "o2-travel", label: "O2 Travel — £7/24h" }, ...common],
    vodafone: [{ value: "vodafone-world-new", label: "Vodafone Zone C — newer plan, £8/day" }, { value: "vodafone-world-older", label: "Vodafone Zone C — eligible older plan, £6/day" }, ...common],
    three: [{ value: "three-world-new", label: "Three Go Roam World — newer plan, £8/day" }, { value: "three-world-older", label: "Three Go Roam World — Oct 2021–17 Dec 2025, £5/day" }, { value: "three-world-pass", label: "Three Go Roam World pass" }, ...common],
    "id-mobile": [{ value: "id-roam-beyond", label: "iD Roam Beyond data passes" }, ...common],
    "sky-mobile": [{ value: "sky-passport", label: "Sky Passport Plus — £2/24h" }, ...common],
    giffgaff: [{ value: "giffgaff-check", label: "Check giffgaff travel add-on in app" }, { value: "giffgaff-metered", label: "giffgaff Zone A — 20p/MB" }, ...common],
    smarty: [{ value: "smarty-metered-us", label: "SMARTY USA — 10p/MB" }, ...common],
    voxi: [{ value: "voxi-global", label: "VOXI Global Extra — 8 or 15 days" }, ...common],
    "tesco-mobile": [{ value: "tesco-metered-us", label: "Tesco USA — 1p/MB" }, ...common],
  },
  japan: {
    ee: [{ value: "ee-row3", label: "EE RoW Zone 3 — £8/24h, 500MB" }, ...common],
    o2: [{ value: "o2-travel", label: "O2 Travel — £7/24h" }, ...common],
    vodafone: [{ value: "plan-check", label: "Check Japan in Vodafone’s live checker" }, ...common],
    three: [{ value: "three-extra-new", label: "Three Go Roam Extra — newer plan, £8/day" }, { value: "three-extra-older", label: "Three Go Roam Extra — older plan, £7/day" }, { value: "three-extra-pass", label: "Three Go Roam Extra pass" }, ...common],
    "id-mobile": [{ value: "id-roam-beyond", label: "iD Roam Beyond data passes" }, ...common],
    "sky-mobile": [{ value: "plan-check", label: "Sky does not currently list Japan" }, ...common],
    giffgaff: [{ value: "giffgaff-check", label: "Check giffgaff travel add-on in app" }, { value: "giffgaff-metered", label: "giffgaff Zone A — 20p/MB" }, ...common],
    smarty: [{ value: "smarty-metered-world", label: "SMARTY Japan — £1/MB" }, ...common],
    voxi: [{ value: "voxi-global", label: "VOXI Global Extra — 8 or 15 days" }, ...common],
    "tesco-mobile": [{ value: "tesco-metered-world", label: "Tesco Japan — £5/MB" }, ...common],
  },
  "united-arab-emirates": {
    ee: [{ value: "ee-row1", label: "EE RoW Zone 1 passes" }, ...common],
    o2: [{ value: "o2-travel", label: "O2 Travel — £7/24h" }, ...common],
    vodafone: [{ value: "vodafone-world-new", label: "Vodafone Zone D — newer plan, £8/day" }, { value: "vodafone-world-older", label: "Vodafone Zone D — eligible older plan, £6/day" }, ...common],
    three: [{ value: "three-extra-new", label: "Three Go Roam Extra — newer plan, £8/day" }, { value: "three-extra-older", label: "Three Go Roam Extra — older plan, £7/day" }, { value: "three-extra-pass", label: "Three Go Roam Extra pass" }, ...common],
    "id-mobile": [{ value: "id-metered-world", label: "iD standard UAE data — £9.60/MB" }, ...common],
    "sky-mobile": [{ value: "sky-passport", label: "Sky Passport Plus — £2/24h" }, ...common],
    giffgaff: [{ value: "giffgaff-metered", label: "giffgaff Zone A — 20p/MB" }, ...common],
    smarty: [{ value: "smarty-metered-world", label: "SMARTY UAE — £1/MB" }, ...common],
    voxi: [{ value: "voxi-metered", label: "VOXI UAE — 12p/MB" }, ...common],
    "tesco-mobile": [{ value: "tesco-metered-world", label: "Tesco UAE — £5/MB" }, ...common],
  },
};

export function getScenarioOptions(network: Network, destination: DestinationId) {
  if (destination === "turkey") return scenarioOptions[network];
  return destinationScenarioOptions[destination]?.[network] ?? genericScenarioOptions;
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
    return { matched: true, matchReason: `${formatGb(allowanceGb)}GB covers the ${formatGb(neededDataGb)}GB you'll use on the days you're roaming.` } as const;
  }
  return { matched: false, matchReason: `${formatGb(allowanceGb)}GB isn't enough for the ${formatGb(neededDataGb)}GB you'll use on the days you're roaming.` } as const;
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
  const selectedEvidence = getRoamingEvidence(network, scenario);
  const finish = (input: Omit<RoamingResult, "comparable" | "evidence">) => result({ ...input, evidence: selectedEvidence });

  if (billableDays === 0) {
    return finish({
      cost: 0,
      title: "You're not using your UK line",
      detail: "You've said you'll use only an eSIM or Wi-Fi on this trip.",
      caveat: "Turn data roaming off on your UK line so nothing is charged by accident.",
      dataAllowanceGb: 0,
      unlimitedData: false,
      allowanceSource: "not-applicable",
      speedCap: null,
      tethering: "check-plan",
      callsTexts: "check-plan",
      matched: null,
      matchReason: "You've chosen not to use your UK line, so there's nothing to compare.",
    });
  }

  if (scenario === "included") {
    const match = allowanceMatch(enteredAllowanceGb, neededDataGb, "Tell us how much data your UK plan gives you abroad and we'll show what you'd save.");
    return finish({
      cost: 0,
      title: "Roaming appears to be included",
      detail: "You've told us roaming costs you nothing extra.",
      caveat: "Fair-use limits and excluded activities can still apply — check in your network's app.",
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
    const match = allowanceMatch(enteredAllowanceGb, neededDataGb, "Tell us how much data that price includes and we'll show what you'd save.");
    return finish({
      cost,
      title: "Your own roaming estimate",
      detail: "Based on the trip cost you entered yourself.",
      caveat: "Check exactly what data, calls and texts that price covers.",
      dataAllowanceGb: enteredAllowanceGb,
      unlimitedData: false,
      allowanceSource: enteredAllowanceGb === null ? "unknown" : "user-entered",
      speedCap: null,
      tethering: "check-plan",
      callsTexts: "check-plan",
      ...match,
    });
  }

  const ukAllowanceResult = ({
    cost,
    title,
    detail,
    caveat,
    capGb,
    tethering = "check-plan",
    callsTexts = "check-plan",
    speedCap = null,
  }: {
    cost: number;
    title: string;
    detail: string;
    caveat: string;
    capGb?: number;
    tethering?: RoamingTethering;
    callsTexts?: RoamingCallsTexts;
    speedCap?: string | null;
  }) => {
    const effectiveAllowance = enteredAllowanceGb === null ? null : capGb === undefined ? enteredAllowanceGb : Math.min(enteredAllowanceGb, capGb);
    const capCopy = capGb === undefined ? "" : ` The published roaming ceiling is ${formatGb(capGb)}GB.`;
    const match = allowanceMatch(effectiveAllowance, neededDataGb, `Tell us how much of your UK data you can use abroad and we’ll show what you’d save.${capCopy}`);
    return finish({
      cost,
      title,
      detail,
      caveat,
      dataAllowanceGb: effectiveAllowance,
      unlimitedData: false,
      allowanceSource: effectiveAllowance === null ? "unknown" : "user-entered",
      speedCap,
      tethering,
      callsTexts,
      ...match,
    });
  };

  const meteredResult = (ratePerMb: number, title: string, caveat: string, tethering: RoamingTethering = "check-plan", spendCap?: number, comparisonSafe = true): RoamingResult => {
    const cost = Math.round(neededDataGb * 1024 * ratePerMb * 100) / 100;
    const capWouldStopUsage = spendCap !== undefined && cost > spendCap;
    const matched = comparisonSafe && !capWouldStopUsage;
    return finish({
      cost,
      title,
      detail: `About ${formattedData}GB over your roaming days, at ${ratePerMb >= 1 ? `£${ratePerMb}` : `${ratePerMb * 100}p`}/MB.`,
      caveat,
      dataAllowanceGb: neededDataGb,
      unlimitedData: false,
      allowanceSource: "metered",
      speedCap: null,
      tethering,
      callsTexts: "extra",
      matched,
      matchReason: capWouldStopUsage
        ? `That would cost more than the £${spendCap} spend limit your network applies by default, so it may cut you off before you use ${formattedData}GB.`
        : !comparisonSafe
          ? "We can show the per-MB sum, but your network’s spending safeguards may stop the data before you use that much."
          : `The estimate prices all ${formattedData}GB you'll use on the days you're roaming. A network spend limit can still stop service.`,
    });
  };

  if (destination !== "turkey") {
    if (scenario === "ee-europe-new") {
      const pass = getPasses(billableDays, [{ days: 15, cost: 30, label: "15-day" }, { days: 7, cost: 16.5, label: "7-day" }, { days: 1, cost: 2.72, label: "calendar-day" }]);
      return ukAllowanceResult({ cost: pass.cost, title: "EE Europe roaming estimate", detail: `${pass.labels.join(" + ")} covers ${billableDays} roaming ${billableDays === 1 ? "day" : "days"}.`, caveat: "For plans taken out or upgraded from 7 July 2021. Uses your UK allowance, up to a 50GB fair-use ceiling.", capGb: 50, tethering: "allowed", callsTexts: "included", speedCap: "Your EE plan’s UK speed cap" });
    }
    if (scenario === "ee-row1") {
      const pass = getPasses(billableDays, [{ days: 15, cost: 50, label: "15-day" }, { days: 7, cost: 30, label: "7-day" }, { days: 1, cost: 6, label: "24-hour" }]);
      return ukAllowanceResult({ cost: pass.cost, title: "EE RoW Zone 1 pass estimate", detail: `${pass.labels.join(" + ")} covers ${billableDays} roaming ${billableDays === 1 ? "day" : "days"}.`, caveat: "Uses your UK allowance, up to a 50GB fair-use ceiling. Full Works and some older plans may already cover this zone.", capGb: 50, tethering: "allowed", callsTexts: "included", speedCap: "Your EE plan’s UK speed cap" });
    }
    if (scenario === "ee-row2") {
      const pass = getPasses(billableDays, [{ days: 15, cost: 60, label: "15-day" }, { days: 7, cost: 40, label: "7-day" }, { days: 1, cost: 8, label: "24-hour" }]);
      return ukAllowanceResult({ cost: pass.cost, title: "EE RoW Zone 2 pass estimate", detail: `${pass.labels.join(" + ")} covers ${billableDays} roaming ${billableDays === 1 ? "day" : "days"}.`, caveat: "Uses your UK allowance, up to a 50GB fair-use ceiling. Passes run from the moment you buy them, so roaming days spread apart may need a different combination.", capGb: 50, tethering: "allowed", callsTexts: "included", speedCap: "Your EE plan’s UK speed cap" });
    }
    if (scenario === "ee-row3") {
      const allowance = billableDays * 0.5;
      const match = allowanceMatch(allowance, neededDataGb, "");
      return finish({ cost: billableDays * 8, title: "EE RoW Zone 3 pass estimate", detail: `£8 × ${billableDays} 24-hour ${billableDays === 1 ? "period" : "periods"}, each including 500MB.`, caveat: "Includes unlimited minutes and texts. Data is 500MB per day, not one pot for the whole trip.", dataAllowanceGb: allowance, unlimitedData: false, allowanceSource: "published", speedCap: "Your EE plan’s UK speed cap", tethering: "allowed", callsTexts: "included", ...match });
    }
    if (scenario === "o2-europe") {
      return ukAllowanceResult({ cost: 0, title: "O2 Europe Zone estimate", detail: "Eligible Pay Monthly plans use your normal UK allowance, with nothing extra to pay.", caveat: "Data is capped at 25GB. Calls and texts within the Europe Zone and back to the UK are included.", capGb: 25, tethering: "allowed", callsTexts: "included" });
    }
    if (scenario === "o2-travel") {
      return finish({ cost: billableDays * 7, title: "O2 Travel estimate", detail: `£7 × ${billableDays} 24-hour ${billableDays === 1 ? "period" : "periods"} on each day you make a call, send a text or use data.`, caveat: "Unlimited data, minutes and texts, at speeds up to 2Mbps. Ultimate and some Plus/Volt plans may already cover this destination.", dataAllowanceGb: null, unlimitedData: true, allowanceSource: "published", speedCap: "2Mbps", tethering: "check-plan", callsTexts: "included", matched: true, matchReason: `Unlimited data covers the ${formattedData}GB you'll use on the days you're roaming.` });
    }
    if (scenario === "vodafone-europe-pass") {
      const pass = getPasses(billableDays, [{ days: 15, cost: 21, label: "15-day" }, { days: 8, cost: 16, label: "8-day" }]);
      return ukAllowanceResult({ cost: pass.cost, title: "Vodafone European pass estimate", detail: `${pass.labels.join(" + ")} covers at least ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: "Uses your UK allowance, capped at 25GB abroad. Check the pass is available on your plan before buying.", capGb: 25, tethering: "allowed", callsTexts: "included" });
    }
    if (scenario === "vodafone-europe-day") return ukAllowanceResult({ cost: billableDays * 2.75, title: "Vodafone Zone B daily estimate", detail: `£2.75 × ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: "For newer plans that don't include roaming. Uses your UK allowance, capped at 25GB abroad.", capGb: 25, tethering: "allowed", callsTexts: "included" });
    if (scenario === "vodafone-world-new" || scenario === "vodafone-world-older") {
      const dailyRate = scenario === "vodafone-world-new" ? 8 : 6;
      return ukAllowanceResult({ cost: billableDays * dailyRate, title: "Vodafone worldwide daily estimate", detail: `£${dailyRate} × ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: `${scenario === "vodafone-world-new" ? "For plans from 11 August 2021." : "For eligible older plans."} Uses your UK allowance, capped at 25GB abroad.`, capGb: 25, tethering: "allowed", callsTexts: "included" });
    }
    if (scenario === "three-europe-new" || scenario === "three-europe-older") {
      const dailyRate = scenario === "three-europe-new" ? 2.75 : 2;
      return ukAllowanceResult({ cost: billableDays * dailyRate, title: "Three Go Roam Europe estimate", detail: `£${dailyRate} × ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: `${scenario === "three-europe-new" ? "For plans joined or upgraded from 18 December 2025." : "For most plans joined or upgraded October 2021–17 December 2025."} Up to 12GB abroad.`, capGb: 12, tethering: "allowed", callsTexts: "included" });
    }
    if (scenario === "three-europe-pass") {
      const pass = getPasses(billableDays, [{ days: 14, cost: 24, label: "14-day" }, { days: 7, cost: 12, label: "7-day" }, { days: 3, cost: 5, label: "3-day" }]);
      return ukAllowanceResult({ cost: pass.cost, title: "Three Go Roam Europe pass estimate", detail: `${pass.labels.join(" + ")} covers at least ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: "Uses your UK allowance, with up to 12GB abroad. Check you're eligible in My3.", capGb: 12, tethering: "allowed", callsTexts: "included" });
    }
    if (["three-world-new", "three-world-older", "three-extra-new", "three-extra-older"].includes(scenario)) {
      const dailyRate = scenario.endsWith("new") ? 8 : scenario.includes("world") ? 5 : 7;
      const zone = scenario.includes("extra") ? "Around World Extra" : "Around World";
      return ukAllowanceResult({ cost: billableDays * dailyRate, title: `Three Go Roam ${zone} estimate`, detail: `£${dailyRate} × ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: `${scenario.endsWith("new") ? "For plans joined or upgraded from 18 December 2025." : "For most plans joined or upgraded October 2021–17 December 2025."} Up to 12GB; hotspot use is prohibited.`, capGb: 12, tethering: "not-allowed", callsTexts: "included" });
    }
    if (scenario === "three-world-pass" || scenario === "three-extra-pass") {
      const offers = scenario === "three-world-pass"
        ? [{ days: 14, cost: 60, label: "14-day" }, { days: 7, cost: 30, label: "7-day" }, { days: 3, cost: 12.5, label: "3-day" }]
        : [{ days: 14, cost: 84, label: "14-day" }, { days: 7, cost: 42, label: "7-day" }, { days: 5, cost: 29.75, label: "5-day" }, { days: 3, cost: 17.5, label: "3-day" }];
      const pass = getPasses(billableDays, offers);
      return ukAllowanceResult({ cost: pass.cost, title: `Three Go Roam ${scenario === "three-world-pass" ? "World" : "Extra"} pass estimate`, detail: `${pass.labels.join(" + ")} covers at least ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: "Uses your UK allowance, with up to 12GB abroad. Hotspot use isn't allowed.", capGb: 12, tethering: "not-allowed", callsTexts: "included" });
    }
    if (scenario === "id-europe") return ukAllowanceResult({ cost: 0, title: "iD Mobile Roam Free estimate", detail: "Uses your normal UK allowance at no extra charge on eligible contracts.", caveat: "We assume a cautious 30GB fair-use ceiling. iD sometimes offers more than this — check your account.", capGb: 30, tethering: "allowed", callsTexts: "included" });
    if (scenario === "id-roam-beyond") {
      const pass = getPasses(billableDays, [{ days: 10, cost: 35, label: "10-day / 20GB", dataGb: 20 }, { days: 5, cost: 20, label: "5-day / 10GB", dataGb: 10 }, { days: 1, cost: 5, label: "1-day / 2GB", dataGb: 2 }], neededDataGb);
      return finish({ cost: pass.cost, title: "iD Mobile Roam Beyond estimate", detail: `${pass.labels.join(" + ")} supplies ${formatGb(pass.dataGb)}GB and covers at least ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: "Data-only passes start straight away and won't renew themselves. Ordinary calls and texts cost extra.", dataAllowanceGb: pass.dataGb, unlimitedData: false, allowanceSource: "published", speedCap: "No published cap; 5G on selected networks", tethering: "allowed", callsTexts: "not-included", matched: true, matchReason: `${formatGb(pass.dataGb)}GB covers the ${formattedData}GB you'll use on the days you're roaming.` });
    }
    if (scenario === "id-metered-world") return meteredResult(9.6, "iD Mobile standard data estimate", "Data alone is £9.60/MB and a safety cap may stop service. Calls and texts are extra; use a travel eSIM or Wi-Fi instead.", "allowed", undefined, false);
    if (scenario === "sky-passport") return ukAllowanceResult({ cost: billableDays * 2, title: "Sky Roaming Passport Plus estimate", detail: `£2 × ${billableDays} activated 24-hour ${billableDays === 1 ? "period" : "periods"}.`, caveat: "Uses your UK allowance, capped at 25GB per billing period. Ordinary UK calls and texts come out of that allowance, and your phone may need to support VoLTE.", capGb: 25, tethering: "allowed", callsTexts: "included" });
    if (scenario === "giffgaff-europe") return ukAllowanceResult({ cost: 0, title: "giffgaff EU roaming estimate", detail: "An eligible plan works here at no extra charge.", caveat: "Uses up to 5GB or the smaller plan allowance. UK-residency and fair-use rules apply.", capGb: 5, tethering: "allowed", callsTexts: "included" });
    if (scenario === "giffgaff-europe-overage") {
      if (enteredAllowanceGb === null) return finish({ cost: null, title: "giffgaff EU data charges", detail: "Tell us how much EU data your plan includes so we can price anything above it.", caveat: "The included part stops at 5GB; anything beyond that costs 10p per MB.", ...unknownFacts, tethering: "allowed", callsTexts: "included", matchReason: "Tell us how much EU data your plan includes so we can price the rest." });
      const inclusiveGb = Math.min(enteredAllowanceGb, 5);
      const chargeableGb = Math.max(0, neededDataGb - inclusiveGb);
      const cost = Math.round(chargeableGb * 1024 * 0.1 * 100) / 100;
      return finish({ cost, title: "giffgaff EU data charge estimate", detail: `${formatGb(neededDataGb)}GB target − ${formatGb(inclusiveGb)}GB included = ${formatGb(chargeableGb)}GB charged at 10p per MB.`, caveat: "You'll need an active, eligible plan and credit to cover anything extra. UK-residency and fair-use rules apply.", dataAllowanceGb: neededDataGb, unlimitedData: false, allowanceSource: "metered", speedCap: null, tethering: "allowed", callsTexts: "included", matched: true, matchReason: `This adds the ${formatGb(inclusiveGb)}GB included in your plan to the cost of the remaining ${formatGb(chargeableGb)}GB.` });
    }
    if (scenario === "giffgaff-metered") return meteredResult(0.2, "giffgaff Zone A data estimate", "Data-only estimate; calls and texts cost extra. USA pricing excludes Alaska and Hawaii.", "allowed");
    if (scenario === "smarty-europe") return ukAllowanceResult({ cost: 0, title: "SMARTY EU roaming estimate", detail: "An active plan can use its normal UK allowance in the EU.", caveat: "Up to 12GB per plan month. Voice plans include calls and texts; data-only plans don't. You may need to set up an APN.", capGb: 12, tethering: "allowed", callsTexts: "check-plan" });
    if (scenario === "smarty-metered-us") return meteredResult(0.1, "SMARTY USA data estimate", "Requires an Out-of-plan add-on balance; calls and texts cost extra. The default worldwide spend limit is £45.", "allowed", 45);
    if (scenario === "smarty-metered-world") return meteredResult(1, "SMARTY worldwide data estimate", "Requires an Out-of-plan add-on balance; calls and texts cost extra. The default worldwide spend limit is £45.", "allowed", 45);
    if (scenario === "voxi-europe") {
      const pass = getPasses(billableDays, [{ days: 15, cost: 20, label: "15-day" }, { days: 8, cost: 15, label: "8-day" }, { days: 2, cost: 4.8, label: "2-day" }, { days: 1, cost: 2.6, label: "1-day" }]);
      return ukAllowanceResult({ cost: pass.cost, title: "VOXI European Roaming Pass estimate", detail: `${pass.labels.join(" + ")} covers at least ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: "The pass starts counting from the moment you buy it. You get whichever is smaller — your UK allowance or 20GB — and UK-only Endless benefits don't travel.", capGb: 20, callsTexts: "included" });
    }
    if (scenario === "voxi-global") {
      const pass = getPasses(billableDays, [{ days: 15, cost: 26.6, label: "15-day / 4GB", dataGb: 4 }, { days: 8, cost: 16, label: "8-day / 2GB", dataGb: 2 }]);
      const match = allowanceMatch(pass.dataGb, neededDataGb, "");
      return finish({ cost: pass.cost, title: "VOXI Global Roaming Extra estimate", detail: `${pass.labels.join(" + ")} supplies ${formatGb(pass.dataGb)}GB and covers at least ${billableDays} ${billableDays === 1 ? "day" : "days"}.`, caveat: "Includes some minutes and texts to the UK and the country you're in. Incoming calls come out of those minutes.", dataAllowanceGb: pass.dataGb, unlimitedData: false, allowanceSource: "published", speedCap: null, tethering: "check-plan", callsTexts: "included", ...match });
    }
    if (scenario === "voxi-metered") return meteredResult(0.12, "VOXI pay-as-you-roam data estimate", "The UAE is not in the current Global Roaming Extra list. Calls and texts use separate credit rates.");
    if (scenario === "tesco-europe") return ukAllowanceResult({ cost: 0, title: "Tesco Mobile Home From Home estimate", detail: "Uses your normal UK allowance at no extra charge, on both Pay Monthly and Pay As You Go.", caveat: "Enter your actual UK allowance — no separate data ceiling is published for this. Fair-use rules still apply.", callsTexts: "included" });
    if (scenario === "tesco-metered-us") return meteredResult(0.01, "Tesco Mobile USA data estimate", "Data is 1p/MB. Calls and SMS are charged separately and a safety buffer may stop service.", "check-plan", undefined, false);
    if (scenario === "tesco-metered-world") return meteredResult(5, "Tesco Mobile worldwide data estimate", "Data is £5/MB. Calls and SMS are charged separately and a safety buffer may stop service.", "check-plan", undefined, false);

    return finish({
      cost: null,
      title: `Check ${networkNames[network]} for ${formatDestinationName(destination)}`,
      detail: destination === "japan" && network === "sky-mobile" ? "Sky does not currently list Japan in its consumer roaming directory." : "This option depends on your individual account, so we can't price it for you.",
      caveat: "Look it up in your network's official checker, then enter the cost and the data it includes so we can compare like for like.",
      ...unknownFacts,
      matchReason: "Enter both the roaming cost and how much data it includes to compare them.",
    });
  }

  if (scenario === "ee-current") {
    const pass = getPasses(billableDays, [{ days: 15, cost: 50, label: "15-day" }, { days: 7, cost: 30, label: "7-day" }, { days: 1, cost: 6, label: "24-hour" }]);
    return ukAllowanceResult({ cost: pass.cost, title: "EE RoW Zone 1 pass estimate", detail: `${pass.labels.join(" + ")} covers ${billableDays} roaming ${billableDays === 1 ? "day" : "days"}.`, caveat: "Uses your UK allowance, up to a 50GB fair-use ceiling. Passes run from the moment you buy them, so roaming days spread apart may need a different combination.", capGb: 50, tethering: "allowed", callsTexts: "included", speedCap: "Your EE plan’s UK speed cap" });
  }

  if (scenario === "o2-travel") {
    return finish({
      cost: billableDays * 7,
      title: "O2 Travel estimate",
      detail: `£7 × ${billableDays} 24-hour ${billableDays === 1 ? "period" : "periods"} on each day you make a call, send a text or use data.`,
      caveat: "Unlimited data, minutes and texts, at speeds up to 2Mbps. Ultimate and some Plus/Volt plans may already cover this destination.",
      dataAllowanceGb: null,
      unlimitedData: true,
      allowanceSource: "published",
      speedCap: "2Mbps",
      tethering: "check-plan",
      callsTexts: "included",
      matched: true,
      matchReason: `Unlimited data covers the ${formattedData}GB you'll use on the days you're roaming.`,
    });
  }

  if (scenario === "three-new" || scenario === "three-older") {
    const isNewPlan = scenario === "three-new";
    const match = allowanceMatch(12, neededDataGb, "");
    return finish({
      cost: billableDays * (isNewPlan ? 8 : 7),
      title: "Three Go Roam Extra estimate",
      detail: `£${isNewPlan ? 8 : 7} × ${billableDays} ${billableDays === 1 ? "day" : "days"}.`,
      caveat: isNewPlan
        ? `For plans joined or upgraded from 18 December 2025. Up to 12GB; you'll use about ${formattedData}GB. Hotspot use is not allowed.`
        : `For most plans joined or upgraded 1 October 2021–17 December 2025. Up to 12GB; you'll use about ${formattedData}GB. Hotspot use is not allowed; check My3.`,
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
    return finish({
      cost: pass.cost,
      title: "iD Mobile Roam Beyond estimate",
      detail: `${pass.labels.join(" + ")} supplies ${formatGb(pass.dataGb)}GB and covers at least ${billableDays} ${billableDays === 1 ? "day" : "days"}.`,
      caveat: `These are data-only passes; you'll use about ${formattedData}GB. They activate immediately.`,
      dataAllowanceGb: pass.dataGb,
      unlimitedData: false,
      allowanceSource: "published",
      speedCap: null,
      tethering: "allowed",
      callsTexts: "not-included",
      matched: true,
      matchReason: `${formatGb(pass.dataGb)}GB covers the ${formattedData}GB you'll use on the days you're roaming.`,
    });
  }

  if (scenario === "sky-passport") {
    return ukAllowanceResult({ cost: billableDays * 2, title: "Sky Roaming Passport Plus estimate", detail: `£2 × ${billableDays} activated 24-hour ${billableDays === 1 ? "period" : "periods"}.`, caveat: "Uses your UK allowance, capped at 25GB per billing period. Ordinary UK calls and texts come out of that allowance, and your phone may need to support VoLTE.", capGb: 25, tethering: "allowed", callsTexts: "included" });
  }

  if (scenario === "giffgaff-metered") return meteredResult(0.2, "giffgaff standard data estimate", "Data-only estimate; calls and texts cost extra. Check whether a Turkey travel add-on is cheaper.");
  if (scenario === "smarty-metered") return meteredResult(0.1, "SMARTY standard data estimate", "Data-only estimate; calls and texts cost extra. Requires an out-of-plan add-on balance; the default worldwide spend limit is £45.", "allowed", 45);
  if (scenario === "tesco-payg") return meteredResult(5, "Tesco Mobile PAYG data estimate", "Illustrates the published PAYG Region 2 rate; a spend cap may stop usage. Do not rely on this for pay-monthly plans.", "check-plan", undefined, false);

  const checkCopy: Record<Network, [string, string]> = {
    vodafone: ["Check your Vodafone plan first", "Turkey pricing is personalised by mobile number and plan."],
    voxi: ["Check My VOXI first", "Turkey is listed for Global Roaming Extra, but the live pass price is account-specific."],
    giffgaff: ["Check your giffgaff add-on", "Turkey travel data add-ons vary by duration and allowance."],
    "tesco-mobile": ["Check your Tesco Mobile plan", "Pay-monthly roaming charges and safeguards depend on your tariff."],
    ee: ["Check your EE plan", "Your plan may include roaming."], o2: ["Check your O2 plan", "Your plan may include O2 Travel."], three: ["Check My3", "Your plan may include Go Roam."], "id-mobile": ["Check your iD plan", "Pass availability can change."], "sky-mobile": ["Check your Sky plan", "Pass availability can change."], smarty: ["Check your SMARTY account", "Charges can change."],
  };
  return finish({
    cost: null,
    title: checkCopy[network][0],
    detail: checkCopy[network][1],
    caveat: "Look it up in your network's own checker, then choose “Enter my own trip cost” and give us the cost and the data it includes.",
    ...unknownFacts,
    matchReason: "Enter both the roaming cost and how much data it includes to compare them.",
  });
}

export function isNetwork(value: string): value is Network { return Object.hasOwn(networkNames, value); }
