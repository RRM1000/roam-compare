import { destinationById, type DestinationId } from "./destinations";

export type Network = "ee" | "o2" | "vodafone" | "three" | "id-mobile" | "sky-mobile" | "giffgaff" | "smarty" | "voxi" | "tesco-mobile";

export type RoamingResult = { cost: number | null; title: string; detail: string; caveat: string };

export const ROAMING_CHECKED = "16 August 2026";

export const networkNames: Record<Network, string> = {
  ee: "EE", o2: "O2", vodafone: "Vodafone", three: "Three", "id-mobile": "iD Mobile", "sky-mobile": "Sky Mobile", giffgaff: "giffgaff", smarty: "SMARTY", voxi: "VOXI", "tesco-mobile": "Tesco Mobile",
};

export const defaultScenario: Record<Network, string> = {
  ee: "ee-current", o2: "o2-travel", vodafone: "vodafone-check", three: "three-new", "id-mobile": "id-roam-beyond", "sky-mobile": "sky-passport", giffgaff: "giffgaff-metered", smarty: "smarty-metered", voxi: "voxi-check", "tesco-mobile": "tesco-payg",
};

const common = [{ value: "included", label: "Roaming is included in my plan" }, { value: "custom", label: "Enter my own trip cost" }];
export const scenarioOptions: Record<Network, Array<{ value: string; label: string }>> = {
  ee: [{ value: "ee-current", label: "Current EE RoW Zone 1 passes" }, ...common],
  o2: [{ value: "o2-travel", label: "O2 Travel — £7 on days used" }, { value: "included", label: "O2 Travel is included in my plan" }, { value: "custom", label: "Enter my own trip cost" }],
  vodafone: [{ value: "vodafone-check", label: "I need to check my Vodafone plan" }, { value: "included", label: "Turkey is included in my plan" }, { value: "custom", label: "Enter my Vodafone trip cost" }],
  three: [{ value: "three-new", label: "Joined/upgraded from 18 Dec 2025 — £8/day" }, { value: "three-older", label: "Joined/upgraded 1 Oct 2021–17 Dec 2025 — £7/day" }, ...common],
  "id-mobile": [{ value: "id-roam-beyond", label: "Roam Beyond data add-ons" }, ...common],
  "sky-mobile": [{ value: "sky-passport", label: "Roaming Passport Plus — £2/24 hours" }, ...common],
  giffgaff: [{ value: "giffgaff-metered", label: "Standard Zone A data — 20p/MB" }, { value: "giffgaff-check", label: "I have a Turkey travel add-on" }, ...common],
  smarty: [{ value: "smarty-metered", label: "Standard Band 1 data — 10p/MB" }, ...common],
  voxi: [{ value: "voxi-check", label: "Check Global Roaming Extra in My VOXI" }, ...common],
  "tesco-mobile": [{ value: "tesco-payg", label: "Pay as you go data — £5/MB" }, { value: "tesco-check", label: "Check my pay-monthly plan" }, ...common],
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

function getPasses(days: number, offers: Array<{ days: number; cost: number; label: string }>) {
  let best = { cost: Number.POSITIVE_INFINITY, labels: [] as string[], covered: 0 };
  function visit(index: number, remaining: number, cost: number, labels: string[], covered: number) {
    if (index === offers.length) {
      if (remaining <= 0 && (cost < best.cost || (cost === best.cost && covered < best.covered))) best = { cost, labels, covered };
      return;
    }
    const offer = offers[index];
    const maxForOffer = Math.ceil(days / offer.days) + 1;
    for (let count = 0; count <= maxForOffer; count += 1) visit(index + 1, remaining - count * offer.days, cost + count * offer.cost, count ? [...labels, `${count} × ${offer.label}`] : labels, covered + count * offer.days);
  }
  visit(0, days, 0, [], 0);
  return best;
}

export function getRoamingResult(network: Network, scenario: string, roamingDays: number, customCost: string, neededData: number, destination: DestinationId): RoamingResult {
  if (scenario === "included") return { cost: 0, title: "Roaming appears to be included", detail: "No extra roaming fee entered for this trip.", caveat: "Fair-use limits and excluded activities can still apply. Confirm in your network app." };
  if (scenario === "custom") {
    const parsed = Number(customCost);
    return { cost: customCost !== "" && Number.isFinite(parsed) && parsed >= 0 ? parsed : null, title: "Your own roaming estimate", detail: "Based on the total trip cost you entered.", caveat: "Confirm what data, calls and texts that price includes." };
  }
  if (destination !== "turkey") return { cost: null, title: `Check ${networkNames[network]} for ${destinationById[destination].name}`, detail: "A live roaming total is not stored for this destination yet.", caveat: "Use your network’s current checker, then select “Enter my own trip cost” for a like-for-like comparison." };
  if (scenario === "ee-current") {
    const pass = getPasses(roamingDays, [{ days: 15, cost: 50, label: "15-day" }, { days: 7, cost: 30, label: "7-day" }, { days: 1, cost: 6, label: "24-hour" }]);
    return { cost: pass.cost, title: "EE RoW Zone 1 pass estimate", detail: `${pass.labels.join(" + ")} covers ${roamingDays} consecutive roaming ${roamingDays === 1 ? "day" : "days"}.`, caveat: "Uses your UK allowance. Pass timing is measured from purchase." };
  }
  if (scenario === "o2-travel") return { cost: roamingDays * 7, title: "O2 Travel estimate", detail: `£7 × ${roamingDays} ${roamingDays === 1 ? "day" : "days"} when you use calls, texts or data.`, caveat: "O2 states unlimited minutes, texts and data, with data speed capped at 2Mbps." };
  if (scenario === "three-new") return { cost: roamingDays * 8, title: "Three Go Roam Extra estimate", detail: `£8 × ${roamingDays} ${roamingDays === 1 ? "day" : "days"}.`, caveat: "For plans joined or upgraded from 18 December 2025. Up to 12GB; hotspot use is not allowed." };
  if (scenario === "three-older") return { cost: roamingDays * 7, title: "Three Go Roam Extra estimate", detail: `£7 × ${roamingDays} ${roamingDays === 1 ? "day" : "days"}.`, caveat: "For most plans joined or upgraded 1 October 2021–17 December 2025. Check My3." };
  if (scenario === "id-roam-beyond") {
    const pass = getPasses(roamingDays, [{ days: 10, cost: 35, label: "10-day / 20GB" }, { days: 5, cost: 20, label: "5-day / 10GB" }, { days: 1, cost: 5, label: "1-day / 2GB" }]);
    return { cost: pass.cost, title: "iD Mobile Roam Beyond estimate", detail: pass.labels.join(" + "), caveat: `Data-only passes supply up to about ${pass.covered * 2}GB; your ${neededData}GB target fits if usage is spread across the trip. They activate immediately.` };
  }
  if (scenario === "sky-passport") return { cost: roamingDays * 2, title: "Sky Roaming Passport Plus estimate", detail: `£2 × ${roamingDays} 24-hour ${roamingDays === 1 ? "period" : "periods"}.`, caveat: "Uses your UK allowance; Turkey is charged as its own Passport destination." };
  if (scenario === "giffgaff-metered") return { cost: neededData * 1024 * 0.2, title: "giffgaff standard data estimate", detail: `${neededData}GB target × 1,024MB × 20p/MB.`, caveat: "Data-only estimate; calls and texts cost extra. Check whether a Turkey travel add-on is cheaper." };
  if (scenario === "smarty-metered") return { cost: neededData * 1024 * 0.1, title: "SMARTY standard data estimate", detail: `${neededData}GB target × 1,024MB × 10p/MB.`, caveat: "Data-only estimate; calls and texts cost extra. Requires an out-of-plan add-on balance." };
  if (scenario === "tesco-payg") return { cost: neededData * 1024 * 5, title: "Tesco Mobile PAYG data estimate", detail: `${neededData}GB target × 1,024MB × £5/MB.`, caveat: "Illustrates the published PAYG Region 2 rate; a spend cap may stop usage. Do not rely on this for pay-monthly plans." };

  const checkCopy: Record<Network, [string, string]> = {
    vodafone: ["Check your Vodafone plan first", "Turkey pricing is personalised by mobile number and plan."],
    voxi: ["Check My VOXI first", "Turkey is listed for Global Roaming Extra, but the live pass price is account-specific."],
    giffgaff: ["Check your giffgaff add-on", "Turkey travel data add-ons vary by duration and allowance."],
    "tesco-mobile": ["Check your Tesco Mobile plan", "Pay-monthly roaming charges and safeguards depend on your tariff."],
    ee: ["Check your EE plan", "Your plan may include roaming."], o2: ["Check your O2 plan", "Your plan may include O2 Travel."], three: ["Check My3", "Your plan may include Go Roam."], "id-mobile": ["Check your iD plan", "Pass availability can change."], "sky-mobile": ["Check your Sky plan", "Pass availability can change."], smarty: ["Check your SMARTY account", "Charges can change."],
  };
  return { cost: null, title: checkCopy[network][0], detail: checkCopy[network][1], caveat: "Use the network’s current checker, then enter the total as a custom cost." };
}

export function isNetwork(value: string): value is Network { return value in networkNames; }
