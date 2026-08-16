"use client";

import { useMemo, useRef, useState } from "react";
import DeviceCompatibilityChecker from "@/app/components/DeviceCompatibilityChecker";
import {
  CALLS_CHECKED,
  DATA_CHECKED,
  DATA_REVIEW_AFTER,
  FX_EVIDENCE,
  formatCheckedDate,
  hasPricedPlans,
  isPlanStale,
  isReviewDateDue,
  plans,
  pricedDestinationIds,
  providerDetails,
  tripLengths,
  usagePerDay,
  type Plan,
  type Provider,
  type Usage,
} from "@/lib/catalog";
import { getPlanMatch, money, nativeMoney } from "@/lib/comparison";
import { destinationById, destinations, getProviderUrl, type Destination, type DestinationId } from "@/lib/destinations";
import { getEsimDevice, getEsimReadiness, type LockStatus } from "@/lib/esim-devices";
import { getRoamingResult, getScenarioOptions, networkNames, ROAMING_CHECKED, ROAMING_REVIEW_AFTER, type Network } from "@/lib/roaming";

export type CallsNeed = "no" | "yes" | "unsure";
export type SortMode = "price" | "data" | "validity";
export type InitialComparison = {
  destination: DestinationId;
  days: number;
  roamingDays: number;
  network: Network | "";
  scenario: string;
  usage: Usage;
  callsNeed: CallsNeed;
  roamingAllowance: string;
  sortMode: SortMode;
  unlimitedOnly: boolean;
  fiveGOnly: boolean;
  tetheringOnly: boolean;
  compared: boolean;
};

type PlanMatch = ReturnType<typeof getPlanMatch>;
type SavedComparison = { label: string; url: string; savedAt: string };

const defaultComparison: InitialComparison = {
  destination: "turkey",
  days: 7,
  roamingDays: 7,
  network: "",
  scenario: "",
  usage: "everyday",
  callsNeed: "no",
  roamingAllowance: "",
  sortMode: "price",
  unlimitedOnly: false,
  fiveGOnly: false,
  tetheringOnly: false,
  compared: false,
};

function cataloguePlan(provider: Provider, destination: Destination, days: number): Plan {
  return {
    id: `${destination.id}-${provider.toLowerCase()}-catalogue`,
    destination: destination.id,
    provider,
    name: `${destination.name} eSIM catalogue`,
    validity: days,
    price: null,
    speed: "Options vary",
    speedCap: "Check the exact package",
    network: "See the live provider catalogue",
    tethering: "check-plan",
    tetheringNote: "Check hotspot support on the exact package",
    fairUse: "Allowance, throttle and fair-use rules vary by package",
    activation: "Check when validity starts before installing",
    note: "Live allowances, validity and prices shown by provider",
    callingSupport: "check-plan",
    sourceUrl: getProviderUrl(provider, destination),
    checkedAt: "2026-08-16",
    reviewAfter: "9999-12-31",
    catalogueOnly: true,
  };
}

function planDataLabel(plan: PlanMatch) {
  if (plan.catalogueOnly) return "Choose allowance live";
  const packs = plan.packs > 1 ? ` across ${plan.packs} estimated packs` : "";
  if (plan.unlimited) return `Unlimited label${packs}`;
  if (plan.dailyDataGb) return `${plan.dailyDataGb}GB high-speed each day${packs}`;
  return `${plan.suppliedData}GB supplied${packs}`;
}

function readSavedComparisons() {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem("roamcompare:saved") ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.flatMap((item): SavedComparison[] => {
      if (!item || typeof item !== "object") return [];
      const candidate = item as Partial<SavedComparison>;
      if (typeof candidate.label !== "string" || typeof candidate.url !== "string" || typeof candidate.savedAt !== "string") return [];
      try {
        const url = new URL(candidate.url);
        if (url.origin !== window.location.origin || (url.protocol !== "http:" && url.protocol !== "https:")) return [];
        return [{ label: candidate.label.slice(0, 120), url: url.toString(), savedAt: candidate.savedAt }];
      } catch { return []; }
    }).slice(0, 5);
  } catch { return []; }
}

function tetheringLabel(plan: Pick<Plan, "tethering">) {
  if (plan.tethering === "allowed") return "Hotspot allowed";
  if (plan.tethering === "restricted") return "Hotspot limited";
  if (plan.tethering === "not-allowed") return "No hotspot";
  return "Check hotspot";
}

function callsLabel(plan: Pick<Plan, "callingSupport">) {
  if (plan.callingSupport === "calls-texts") return "Calls & texts included";
  if (plan.callingSupport === "data-only") return "Data only";
  return "Calls & texts: check plan";
}

function getPlanUrl(plan: Plan, destination: Destination) {
  if (plan.provider === "Klook") return getProviderUrl("Klook", destination);
  return plan.checkoutUrl ?? plan.sourceUrl ?? getProviderUrl(plan.provider, destination);
}

export default function CompareExperience({ initial = defaultComparison, destinationLanding = false }: { initial?: InitialComparison; destinationLanding?: boolean }) {
  const [destination, setDestination] = useState<DestinationId>(initial.destination);
  const [days, setDays] = useState(initial.days);
  const [roamingDays, setRoamingDays] = useState(initial.roamingDays);
  const [network, setNetwork] = useState<Network | "">(initial.network);
  const [scenario, setScenario] = useState(initial.scenario);
  const [customCost, setCustomCost] = useState("");
  const [roamingAllowance, setRoamingAllowance] = useState(initial.roamingAllowance);
  const [usage, setUsage] = useState<Usage>(initial.usage);
  const [callsNeed, setCallsNeed] = useState<CallsNeed>(initial.callsNeed);
  const [hasCompared, setHasCompared] = useState(initial.compared);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [lockStatus, setLockStatus] = useState<LockStatus>("unknown");
  const [shareStatus, setShareStatus] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>(initial.sortMode);
  const [unlimitedOnly, setUnlimitedOnly] = useState(initial.unlimitedOnly);
  const [fiveGOnly, setFiveGOnly] = useState(initial.fiveGOnly);
  const [tetheringOnly, setTetheringOnly] = useState(initial.tetheringOnly);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [pinStatus, setPinStatus] = useState("");
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const compareHeadingRef = useRef<HTMLHeadingElement>(null);
  const savedToggleRef = useRef<HTMLButtonElement>(null);
  const shortlistRef = useRef<HTMLDivElement>(null);

  const activeDestination = destinationById[destination];
  const dataReviewDue = isReviewDateDue(DATA_REVIEW_AFTER);
  const roamingReviewDue = isReviewDateDue(ROAMING_REVIEW_AFTER);
  const fxReviewDue = isReviewDateDue(FX_EVIDENCE.reviewAfter);
  const pricedDestination = hasPricedPlans(destination);
  const neededData = Math.max(1, Math.ceil(days * usagePerDay[usage]));
  const neededRoamingData = roamingDays * usagePerDay[usage];
  const roaming = network && scenario ? getRoamingResult(network, scenario, roamingDays, customCost, neededRoamingData, destination, roamingAllowance) : null;
  const canCompareSavings = Boolean(
    roaming?.comparable
    && roamingDays === days
    && (callsNeed !== "yes" || roaming.callsTexts === "included")
    && (!unlimitedOnly || roaming.unlimitedData)
    && !fiveGOnly
    && (!tetheringOnly || roaming.tethering === "allowed"),
  );
  const roamingComparisonStatus = !roaming || roaming.cost === null
    ? "enter a live quote"
    : !roaming.comparable
      ? "data allowance match not confirmed"
      : roamingDays !== days
        ? "data matched for selected roaming days only"
        : callsNeed === "yes" && roaming.callsTexts !== "included"
          ? "data matched; calls/SMS not confirmed"
          : unlimitedOnly && !roaming.unlimitedData
            ? "data matched; unlimited roaming not confirmed"
            : fiveGOnly
              ? "data matched; roaming 5G not confirmed"
              : tetheringOnly && roaming.tethering !== "allowed"
                ? "data matched; hotspot not confirmed"
                : "selected requirements matched";
  const selectedDevice = getEsimDevice(selectedDeviceId);
  const compatibility = getEsimReadiness(selectedDevice, lockStatus);
  const selectedDeviceName = selectedDevice ? `${selectedDevice.manufacturer} ${selectedDevice.model}` : "";

  const comparisonPlans = useMemo(() => {
    const destinationPlans = plans.filter((plan) => plan.destination === destination);
    return destinationPlans.length > 0
      ? destinationPlans
      : (Object.keys(providerDetails) as Provider[]).map((provider) => cataloguePlan(provider, activeDestination, days));
  }, [activeDestination, days, destination]);

  const groupedPlans = useMemo(() => {
    const compareMatches = (a: PlanMatch, b: PlanMatch) => {
      const callsTier = (plan: PlanMatch) => callsNeed !== "yes" || plan.callingSupport === "calls-texts" ? 0 : plan.callingSupport === "check-plan" ? 1 : 2;
      const aCallsTier = callsTier(a);
      const bCallsTier = callsTier(b);
      if (aCallsTier !== bCallsTier) return aCallsTier - bCallsTier;
      const aRankable = !a.catalogueOnly && a.gbpTotal !== null && !isPlanStale(a);
      const bRankable = !b.catalogueOnly && b.gbpTotal !== null && !isPlanStale(b);
      if (aRankable !== bRankable) return aRankable ? -1 : 1;
      const aPrice = aRankable ? a.gbpTotal! : Infinity;
      const bPrice = bRankable ? b.gbpTotal! : Infinity;
      const aData = Number.isFinite(a.suppliedData) ? a.suppliedData : Number.MAX_SAFE_INTEGER;
      const bData = Number.isFinite(b.suppliedData) ? b.suppliedData : Number.MAX_SAFE_INTEGER;
      if (sortMode === "data") return bData - aData || aPrice - bPrice;
      if (sortMode === "validity") return b.validity - a.validity || aPrice - bPrice;
      return aPrice - bPrice || aData - bData;
    };

    return (Object.keys(providerDetails) as Provider[]).map((provider) => {
      const matches = comparisonPlans
        .filter((plan) => plan.provider === provider)
        .map((plan) => getPlanMatch(plan, days, neededData))
        .filter((plan) => plan.suppliedData >= neededData)
        .filter((plan) => !unlimitedOnly || plan.unlimited)
        .filter((plan) => !fiveGOnly || /5G/i.test(plan.speed))
        .filter((plan) => !tetheringOnly || plan.tethering === "allowed")
        .sort(compareMatches);
      const rankable = matches.filter((plan) => plan.gbpTotal !== null && !plan.catalogueOnly && !isPlanStale(plan) && (callsNeed !== "yes" || plan.callingSupport === "calls-texts"));
      return { provider, matches, bestPrice: Math.min(...rankable.map((plan) => plan.gbpTotal!), Infinity) };
    }).filter((group) => group.matches.length > 0).sort((a, b) => a.bestPrice - b.bestPrice || a.provider.localeCompare(b.provider));
  }, [callsNeed, comparisonPlans, days, fiveGOnly, neededData, sortMode, tetheringOnly, unlimitedOnly]);

  const allMatches = groupedPlans.flatMap((group) => group.matches.map((plan) => ({ provider: group.provider, plan })));
  const suggestionCount = allMatches.length;
  const requirementMatchCount = callsNeed === "yes" ? allMatches.filter(({ plan }) => plan.callingSupport === "calls-texts").length : suggestionCount;
  const bestPricedPlan = [...allMatches]
    .filter(({ plan }) => plan.gbpTotal !== null && !plan.catalogueOnly && !isPlanStale(plan) && (callsNeed !== "yes" || plan.callingSupport === "calls-texts"))
    .sort((a, b) => a.plan.gbpTotal! - b.plan.gbpTotal!)[0];
  const allDestinationMatches = comparisonPlans.map((plan) => ({ provider: plan.provider, plan: getPlanMatch(plan, days, neededData) }));
  const pinnedPlans = pinnedIds.map((id) => allDestinationMatches.find(({ plan }) => plan.id === id)).filter(Boolean) as Array<{ provider: Provider; plan: PlanMatch }>;

  const currentSources = useMemo(() => {
    const entries = plans.filter((plan) => plan.destination === destination).map((plan) => [plan.sourceUrl, plan] as const);
    return [...new Map(entries).values()];
  }, [destination]);

  function updateDays(nextDays: number) {
    setDays(nextDays);
    setRoamingDays((current) => current === days || current > nextDays ? nextDays : current);
    if (scenario === "custom") setCustomCost("");
  }

  function updateRoamingDays(nextDays: number) {
    setRoamingDays(nextDays);
    if (scenario === "custom") setCustomCost("");
  }

  function updateScenario(nextScenario: string) {
    setScenario(nextScenario);
    setCustomCost("");
  }

  function updateNetwork(nextNetwork: Network | "") {
    setNetwork(nextNetwork);
    setScenario("");
    setCustomCost("");
    setRoamingAllowance("");
  }

  function updateDestination(nextDestination: DestinationId) {
    setDestination(nextDestination);
    setScenario("");
    setCustomCost("");
    setRoamingAllowance("");
    setPinnedIds([]);
    setPinStatus("");
  }

  function compare() {
    if (!network || !scenario) return;
    setHasCompared(true);
    setShareStatus("");
    window.setTimeout(() => {
      resultsHeadingRef.current?.focus({ preventScroll: true });
      document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function comparisonUrl() {
    const url = new URL("/", window.location.origin);
    const params = new URLSearchParams({ compare: "1", destination, days: String(days), roamingDays: String(roamingDays), network, scenario, usage, calls: callsNeed, sort: sortMode });
    if (roamingAllowance) params.set("allowance", roamingAllowance);
    if (unlimitedOnly) params.set("unlimited", "1");
    if (fiveGOnly) params.set("fiveG", "1");
    if (tetheringOnly) params.set("tethering", "1");
    url.search = params.toString();
    return url;
  }

  async function shareComparison() {
    const url = comparisonUrl();
    const customNote = scenario === "custom" ? " The private custom cost is not included; the recipient must enter it." : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: `${days} days in ${activeDestination.name} — RoamCompare`, text: `My roaming and eSIM comparison.${customNote}`, url: url.toString() });
        setShareStatus(`Share opened.${customNote}`);
        return;
      }
      await navigator.clipboard.writeText(url.toString());
      setShareStatus(`Comparison link copied.${customNote}`);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setShareStatus("Sharing cancelled");
        return;
      }
      window.history.replaceState({}, "", url);
      setShareStatus(`Shareable link added to the address bar.${customNote}`);
    }
  }

  function loadSavedComparisons() {
    setShowSaved((shown) => !shown);
    setSavedComparisons(readSavedComparisons());
  }

  function closeSavedComparisons() {
    setShowSaved(false);
    window.setTimeout(() => savedToggleRef.current?.focus(), 0);
  }

  function saveComparison() {
    const next: SavedComparison = { label: `${days} days · ${activeDestination.name} · ${neededData}GB target`, url: comparisonUrl().toString(), savedAt: new Date().toISOString() };
    const previous = readSavedComparisons();
    const updated = [next, ...previous.filter((item) => item.url !== next.url)].slice(0, 5);
    window.localStorage.setItem("roamcompare:saved", JSON.stringify(updated));
    setSavedComparisons(updated);
    setShowSaved(true);
    setShareStatus("Saved on this device only");
  }

  function removeSaved(url: string) {
    const updated = savedComparisons.filter((item) => item.url !== url);
    window.localStorage.setItem("roamcompare:saved", JSON.stringify(updated));
    setSavedComparisons(updated);
    window.setTimeout(() => savedToggleRef.current?.focus(), 0);
  }

  function togglePin(id: string) {
    const candidate = allDestinationMatches.find(({ plan }) => plan.id === id);
    if (pinnedIds.includes(id)) {
      setPinnedIds(pinnedIds.filter((item) => item !== id));
      setPinStatus(`${candidate?.plan.provider ?? "Plan"} ${candidate?.plan.name ?? ""} removed from the shortlist.`);
      return;
    }
    if (pinnedIds.length < 3) {
      setPinnedIds([...pinnedIds, id]);
      setPinStatus(`${candidate?.plan.provider ?? "Plan"} ${candidate?.plan.name ?? ""} added. Use View shortlist to compare it.`);
    }
  }

  function removePinFromShortlist(id: string) {
    const candidate = allDestinationMatches.find(({ plan }) => plan.id === id);
    const remaining = pinnedIds.filter((item) => item !== id);
    setPinnedIds(remaining);
    setPinStatus(`${candidate?.plan.provider ?? "Plan"} ${candidate?.plan.name ?? ""} removed from the shortlist.`);
    window.setTimeout(() => {
      const planButton = document.getElementById(`pin-${id}`);
      if (planButton instanceof HTMLButtonElement) planButton.focus();
      else if (remaining.length > 0) shortlistRef.current?.focus();
      else resultsHeadingRef.current?.focus();
    }, 0);
  }

  function focusComparisonForm() {
    compareHeadingRef.current?.focus({ preventScroll: true });
    document.querySelector("#compare")?.scrollIntoView({ behavior: "smooth" });
  }

  function viewShortlist() {
    shortlistRef.current?.focus({ preventScroll: true });
    document.querySelector("#pinned-comparison")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <a className="skip-link" href="#compare">Skip to comparison</a>
      <header className="site-header"><nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="RoamCompare home"><span className="brand-mark" aria-hidden="true">RC</span><span>RoamCompare</span></a>
        <div className="nav-actions"><span className="nav-note">Built for UK travellers</span><a className="nav-data" href="#methodology">Our data</a><a href="#faq">FAQ</a><a className="nav-about" href="/about">About</a><a className="nav-cta" href="#compare">Compare now</a></div>
      </nav></header>

      <main className="home-page" id="main-content">
        <div className="hero-stage">
          <section className="hero" id="top">
            <div className="hero-copy">
              <p className="eyebrow">UK → {activeDestination.name} · roaming vs eSIM</p>
              <h1>{destinationLanding ? `Compare eSIMs for ${activeDestination.name}.` : "Know the roaming cost before take-off."}</h1>
              <p className="hero-lede">{destinationLanding ? `Size a ${activeDestination.name} eSIM for your trip, then compare its dated plan limits with your UK network’s roaming route.` : "Compare a UK-network roaming estimate with travel eSIMs that fit your trip."} See the hotspot rules, speed caps and fair-use limits before opening checkout.</p>
              <div className="route-signature" aria-hidden="true"><span>United Kingdom</span><i /><span>→</span><i /><span>{activeDestination.flag} {activeDestination.name}</span></div>
              <div className="trust-row" aria-label="Service benefits"><span>{destinations.length} destinations</span><span>{pricedDestinationIds.length} priced destinations</span><span>No account needed</span></div>
            </div>

            <form className="compare-card" id="compare" aria-labelledby="compare-title" onSubmit={(event) => { event.preventDefault(); compare(); }}>
              <div className="card-heading"><span className="step-pill">Takes under a minute</span><h2 id="compare-title" ref={compareHeadingRef} tabIndex={-1}>What does your trip look like?</h2></div>
              <div className="field-grid">
                <label className="field field-wide"><span>Where are you going?</span><select value={destination} onChange={(event) => updateDestination(event.target.value as DestinationId)} aria-label="Destination">{destinations.map((place) => <option value={place.id} key={place.id}>{place.flag} {place.name}</option>)}</select><small className={`field-status ${pricedDestination ? "priced" : "catalogue"}`}><i />{pricedDestination ? "Full comparison with dated price snapshots" : "Provider finder — live prices at source"}</small></label>
                <label className="field"><span>Trip length</span><select value={days} onChange={(event) => updateDays(Number(event.target.value))} aria-label="Trip length">{tripLengths.map((length) => <option value={length} key={length}>{length} {length === 1 ? "day" : "days"}</option>)}</select></label>
                <label className="field"><span>Your UK network</span><select value={network} onChange={(event) => updateNetwork(event.target.value as Network | "")} aria-label="UK mobile network" required><option value="" disabled>Choose your network</option>{Object.entries(networkNames).map(([key, name]) => <option value={key} key={key}>{name}</option>)}</select><small className="field-help">We will not assume a network for you.</small></label>
              </div>

              <fieldset className="usage-field"><legend>How will you use your phone?</legend><div className="usage-options">{([ ["light", "Light", "Maps & messages"], ["everyday", "Everyday", "Social & browsing"], ["heavy", "Heavy", "Video & hotspot"] ] as const).map(([value, title, detail]) => <label key={value}><input aria-label={`${title}: ${detail}`} type="radio" name="usage" value={value} checked={usage === value} onChange={() => setUsage(value)} /><span><strong>{title}</strong><small>{detail}</small></span></label>)}</div></fieldset>

              <fieldset className="calls-need"><legend>Do you need normal calls or SMS?</legend><div>{([ ["no", "No", "App calls are fine"], ["yes", "Yes", "I need a phone number"], ["unsure", "Not sure", "Show me the difference"] ] as const).map(([value, title, detail]) => <label key={value}><input aria-label={`${title}: ${detail}`} type="radio" name="calls" value={value} checked={callsNeed === value} onChange={() => setCallsNeed(value)} /><span><strong>{title}</strong><small>{detail}</small></span></label>)}</div></fieldset>

              <details className="advanced-controls" open={Boolean(network) || undefined}>
                <summary>Choose your roaming tariff <span>then fine-tune allowance and days</span></summary>
                <div className="field-grid">
                  <label className="field"><span>On how many trip days will you use paid UK-network roaming?</span><select value={roamingDays} onChange={(event) => updateRoamingDays(Number(event.target.value))} aria-label="UK roaming days">{Array.from({ length: days + 1 }, (_, index) => index).map((length) => <option value={length} key={length}>{length === 0 ? "0 — eSIM/Wi-Fi only" : `${length} ${length === 1 ? "day" : "days"}`}</option>)}</select><small className="field-help">Usually your full trip. Choose 0 if data, calls and texts will use only eSIM, Wi-Fi or another line.</small></label>
                  <label className="field"><span>Which tariff or roaming option applies?</span><select value={scenario} onChange={(event) => updateScenario(event.target.value)} aria-label="Roaming plan situation" disabled={!network} required><option value="" disabled>{network ? "Choose your tariff or entitlement" : "Choose a network first"}</option>{network && getScenarioOptions(network, destination).map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select><small className="field-help">Plan dates and included benefits change the answer. Choose the closest verified option.</small></label>
                  {scenario === "custom" && <label className="field"><span>Total roaming cost for this trip (£)</span><input inputMode="decimal" min="0" step="0.01" type="number" value={customCost} onChange={(event) => setCustomCost(event.target.value)} placeholder="For example, 35" required /></label>}
                  <label className="field"><span>Data available through your UK plan abroad (GB)</span><input inputMode="decimal" min="0" step="0.1" type="number" value={roamingAllowance} onChange={(event) => setRoamingAllowance(event.target.value)} placeholder="For example, 12" /><small className="field-help">Needed for passes that use your UK allowance. Leave blank if unknown.</small></label>
                </div>
              </details>

              <button className={`compatibility-trigger ${compatibility}`} type="button" aria-expanded={showCompatibility} aria-controls="compatibility-panel" onClick={() => setShowCompatibility((shown) => !shown)}><span><i aria-hidden="true" />{compatibility === "ready" ? `${selectedDeviceName} looks eSIM-ready` : compatibility === "check" ? "Check this phone’s exact version" : compatibility === "blocked" ? "Compatibility needs attention" : "Will an eSIM work on your phone?"}</span><b aria-hidden="true">{showCompatibility ? "−" : "+"}</b></button>
              {showCompatibility && <DeviceCompatibilityChecker selectedDeviceId={selectedDeviceId} lockStatus={lockStatus} readiness={compatibility} onDeviceChange={setSelectedDeviceId} onLockStatusChange={setLockStatus} />}
              <button className="primary-button" type="submit">{hasCompared ? "Update comparison" : pricedDestination ? "Compare priced options" : "Find provider options"} <span aria-hidden="true">→</span></button>
              <p className="affiliate-note">Results update after your first comparison. Free to use; marked affiliate links may earn us commission without changing the order.</p>
            </form>
          </section>
          <div className="destination-rail" aria-label="Popular destinations"><span>Popular now</span><div>{destinations.slice(0, 8).map((place) => <button className={destination === place.id ? "is-active" : ""} type="button" key={place.id} aria-pressed={destination === place.id} onClick={() => updateDestination(place.id)}>{place.flag} {place.name}</button>)}</div><strong>+{destinations.length - 8} more</strong></div>
        </div>

        <section className="proof-strip" aria-label="What RoamCompare checks"><article><span>01</span><strong>Requirements-matched cost</strong><p>Savings appear only when roaming covers the trip’s data target and selected needs.</p></article><article><span>02</span><strong>Real plan limits</strong><p>Hotspot rules, speed caps, throttling and fair use.</p></article><article><span>03</span><strong>Dated evidence</strong><p>Provider currency, source and check date stay visible.</p></article></section>

        <p className="sr-only" aria-live="polite">{hasCompared ? `${suggestionCount} comparison options loaded for ${activeDestination.name}` : ""}</p>
        <section className={`results-section ${hasCompared ? "is-visible" : ""}`} id="results" aria-hidden={!hasCompared}>
          <div className="section-heading"><div><p className="eyebrow">Your comparison</p><h2 ref={resultsHeadingRef} tabIndex={-1}>{days} {days === 1 ? "day" : "days"} in {activeDestination.name} · plan for about {neededData}GB</h2></div><div className="result-actions"><button className="text-button" type="button" onClick={shareComparison}>Share comparison ↗</button><button className="text-button" type="button" onClick={saveComparison}>Save on this device</button><button className="text-button" type="button" ref={savedToggleRef} onClick={loadSavedComparisons} aria-expanded={showSaved} aria-controls="saved-comparisons">Saved comparisons</button>{pinnedPlans.length > 0 && <button className="text-button" type="button" onClick={viewShortlist} aria-controls="pinned-comparison">View shortlist ({pinnedPlans.length})</button>}<button className="text-button" type="button" onClick={focusComparisonForm}>Change trip details ↑</button>{shareStatus && <span role="status">{shareStatus}</span>}</div></div>

          {showSaved && <aside className="saved-comparisons" id="saved-comparisons"><div><strong>Saved on this device</strong><button type="button" onClick={closeSavedComparisons} aria-label="Close saved comparisons">×</button></div>{savedComparisons.length === 0 ? <p>No saved comparisons yet.</p> : <ul>{savedComparisons.map((item) => <li key={`${item.savedAt}-${item.url}`}><a href={item.url}>{item.label}</a><button type="button" onClick={() => removeSaved(item.url)} aria-label={`Remove ${item.label}`}>Remove</button></li>)}</ul>}<small>Stored only in this browser. Custom costs and phone details are not saved.</small></aside>}
          <p className="sr-only" role="status" aria-live="polite">{pinStatus}</p>

          <div className={`results-compatibility ${compatibility}`}><span aria-hidden="true">{compatibility === "ready" ? "✓" : compatibility === "blocked" ? "!" : compatibility === "check" ? "i" : "?"}</span><div><strong>{compatibility === "ready" ? `${selectedDeviceName} looks eSIM-ready` : compatibility === "check" ? "Check this phone’s exact version" : compatibility === "blocked" ? "Pause before purchasing" : "Phone compatibility not checked"}</strong><p>{compatibility === "ready" ? "Model and network-lock checks look good; confirm the regional version at checkout." : compatibility === "blocked" ? "A travel eSIM may not work on this phone or while it is network locked." : "Search the exact model above and confirm the phone is network-unlocked before buying."}</p></div></div>

          {roaming && <div className={`roaming-banner ${roaming.cost === null || !roaming.comparable ? "needs-input" : ""}`}>
            <div className="network-badge">{networkNames[network as Network].slice(0, 2).toUpperCase()}</div>
            <div><span className="overline">Your current network</span><h3>{roaming.title}</h3><p>{roaming.detail} {roaming.caveat}</p><div className="roaming-facts"><span>Data: {roaming.unlimitedData ? "Unlimited" : roaming.dataAllowanceGb === null ? "Not confirmed" : `${roaming.dataAllowanceGb}GB`}</span><span>Speed cap: {roaming.speedCap ?? "Check plan"}</span><span>Hotspot: {roaming.tethering === "allowed" ? "Allowed" : roaming.tethering === "not-allowed" ? "Not allowed" : "Check plan"}</span><span>Calls/SMS: {roaming.callsTexts === "included" ? "Included — check scope" : roaming.callsTexts === "not-included" ? "Not included" : roaming.callsTexts === "extra" ? "Extra" : "Check plan"}</span></div><strong className={`match-note ${roaming.matched === false ? "no-match" : roaming.matched === true ? "matched" : "unknown"}`}>{roaming.matchReason}</strong><a className="roaming-source" href={roaming.evidence.url} target="_blank" rel="noopener noreferrer">Official {roaming.evidence.label} · checked {formatCheckedDate(roaming.evidence.checkedAt)} · review by {formatCheckedDate(roaming.evidence.reviewAfter)} ↗</a></div>
            <div className="roaming-price"><strong>{roaming.cost === null ? "Check plan" : money.format(roaming.cost)}</strong><span>{roamingComparisonStatus}</span></div>
          </div>}

          {bestPricedPlan && <div className="decision-card"><div><span className="decision-label">Lowest estimated total that meets your selected requirements</span><h3>{bestPricedPlan.provider} · {bestPricedPlan.plan.name}</h3><p>{callsNeed === "yes" ? "This option also declares normal calls and SMS. Confirm the included allowance live." : "Enough data for this trip from a fresh manual snapshot. Limits remain visible below and the checkout price can change."}{bestPricedPlan.plan.packs > 1 ? ` This total estimates ${bestPricedPlan.plan.packs} packages; confirm they can be activated sequentially before buying.` : ""}</p></div><div className="decision-price"><small>Approximate snapshot</small><strong>≈ {money.format(bestPricedPlan.plan.gbpTotal!)}</strong>{canCompareSavings && roaming?.cost !== null && roaming.cost - bestPricedPlan.plan.gbpTotal! > 0.5 && <span>About {money.format(roaming.cost - bestPricedPlan.plan.gbpTotal!)} less than requirements-matched roaming</span>}</div>{compatibility === "blocked" ? <span className="decision-blocked">Resolve compatibility first</span> : <a href={getPlanUrl(bestPricedPlan.plan, activeDestination)} target="_blank" rel={providerDetails[bestPricedPlan.provider].affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}>Check live price <span aria-hidden="true">↗</span></a>}</div>}

          {callsNeed === "yes" && !bestPricedPlan && <aside className="need-warning"><strong>No fresh priced plan shown meets your normal calls/SMS requirement.</strong><p>Data-only eSIMs can still run WhatsApp, FaceTime and similar apps. Do not treat them as a replacement for a mobile number.</p></aside>}
          <div className="plan-controls" aria-label="Sort and filter plans"><label>Sort by <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}><option value="price">Estimated total</option><option value="data">Data allowance</option><option value="validity">Validity</option></select></label><div><label><input type="checkbox" checked={unlimitedOnly} onChange={(event) => setUnlimitedOnly(event.target.checked)} /> Unlimited only</label><label><input type="checkbox" checked={fiveGOnly} onChange={(event) => setFiveGOnly(event.target.checked)} /> 5G listed</label><label><input type="checkbox" checked={tetheringOnly} onChange={(event) => setTetheringOnly(event.target.checked)} /> Hotspot allowed</label></div></div>
          <div className="results-toolbar"><p><strong>{callsNeed === "yes" ? `${requirementMatchCount} meet your calls/SMS requirement · ${suggestionCount} data-fit options shown` : `${suggestionCount} ${pricedDestination ? "data-fit plan options" : "provider catalogues"}`}</strong> across {groupedPlans.length} providers</p><span>{pricedDestination ? "Requirements first; fresh prices rank before stale or live-price-only options within each group" : "No stored prices; nothing is guessed"}</span></div>

          {pinnedPlans.length > 0 && <section className="pinned-comparison" id="pinned-comparison" aria-labelledby="pinned-title">
            <div><h3 id="pinned-title">Side-by-side shortlist</h3><span>{pinnedPlans.length}/3 pinned</span></div>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- The horizontally scrolling comparison table must be keyboard-focusable. */}
            <div className="comparison-table-wrap" role="region" aria-labelledby="pinned-title" tabIndex={0} ref={shortlistRef}>
              <table>
                <caption className="sr-only">Comparison of pinned eSIM plans</caption>
                <thead><tr><th scope="col">Feature</th>{pinnedPlans.map(({ plan }) => <th scope="col" key={plan.id}>{plan.provider}<small>{plan.name}</small><button className="table-unpin" type="button" onClick={() => removePinFromShortlist(plan.id)} aria-label={`Remove ${plan.provider} ${plan.name} from shortlist`}>Remove</button></th>)}</tr></thead>
                <tbody>
                  <tr><th scope="row">Estimated total</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.gbpTotal === null ? "Live price" : `≈ ${money.format(plan.gbpTotal)}`}</td>)}</tr>
                  <tr><th scope="row">Data</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{planDataLabel(plan)}</td>)}</tr>
                  <tr><th scope="row">Validity</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.validity} days per package</td>)}</tr>
                  <tr><th scope="row">Network speed</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.speed}</td>)}</tr>
                  <tr><th scope="row">Speed cap / throttle</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.speedCap}</td>)}</tr>
                  <tr><th scope="row">Hotspot</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.tetheringNote}</td>)}</tr>
                  <tr><th scope="row">Calls & SMS</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{callsLabel(plan)}</td>)}</tr>
                </tbody>
              </table>
            </div>
          </section>}

          <div className="provider-list">{groupedPlans.map(({ provider, matches }) => {
            const details = providerDetails[provider];
            return <article className={`provider-card ${bestPricedPlan?.provider === provider ? "top-pick" : ""}`} key={provider}><header className="provider-header"><div className="provider-main"><div className="provider-logo" style={{ background: details.accent }}>{details.initials}</div><div><div className="provider-name-row"><h3>{provider}</h3>{details.affiliate && <span className="affiliate-badge">Affiliate relationship</span>}</div><p>{details.summary}</p></div></div></header><div className="plan-list">{matches.map((plan, planIndex) => {
              const stale = !plan.catalogueOnly && isPlanStale(plan);
              const pinned = pinnedIds.includes(plan.id);
              const requirementMismatch = callsNeed === "yes" && plan.callingSupport === "data-only";
              const callsUnverified = callsNeed === "yes" && plan.callingSupport === "check-plan";
              const showFitBadge = planIndex === 0 || requirementMismatch || callsUnverified || stale;
              const fitLabel = requirementMismatch
                ? "Doesn’t meet calls/SMS requirement"
                : callsUnverified
                  ? "Calls/SMS not verified"
                  : stale
                    ? "Price recheck required"
                    : plan.catalogueOnly || plan.price === null
                      ? "Live price required"
                      : "Meets selected requirements";
              const delta = canCompareSavings && !requirementMismatch && !callsUnverified && roaming?.cost !== null && plan.gbpTotal !== null ? roaming.cost - plan.gbpTotal : null;
              return <div className={`plan-row ${stale ? "is-stale" : ""}`} key={plan.id}><div className="plan-copy"><div><h4>{plan.name}</h4>{showFitBadge && <span className={`fit-badge ${requirementMismatch ? "requirement-miss" : callsUnverified ? "not-verified" : stale ? "price-warning" : ""}`}>{fitLabel}</span>}<span className={`freshness-badge ${stale ? "stale" : "fresh"}`}>{plan.catalogueOnly ? "Live catalogue" : stale ? "Recheck due" : `Checked ${formatCheckedDate(plan.checkedAt)}`}</span></div><p>{planDataLabel(plan)} · {plan.speed}</p><div className="plan-facts"><span>{tetheringLabel(plan)}</span><span>{plan.speedCap}</span><span>{plan.validity}-day per-package validity</span></div><div className={`calls-texts-status ${plan.callingSupport}`} data-status={plan.callingSupport}><strong>{callsLabel(plan)}</strong><span>{plan.callingSupport === "data-only" ? "App calls work over data; no standard mobile calls or SMS." : plan.callingSupport === "calls-texts" ? "Phone number service is included; confirm its allowance." : "Plan types vary in the live catalogue."}</span></div><details className="plan-limits"><summary>Hotspot, speed & other limits</summary><dl><div><dt>Hotspot / tethering</dt><dd>{plan.tetheringNote}</dd></div><div><dt>Speed cap / throttle</dt><dd>{plan.speedCap}</dd></div><div><dt>Fair use / exhaustion</dt><dd>{plan.fairUse}</dd></div><div><dt>Activation</dt><dd>{plan.activation}{plan.packs > 1 ? ` Confirm that ${plan.packs} packages can be activated in sequence.` : ""}</dd></div><div><dt>Network</dt><dd>{plan.network}</dd></div></dl><a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer">Open source checked {formatCheckedDate(plan.checkedAt)} ↗</a></details></div><div className="plan-decision"><button className="pin-button" id={`pin-${plan.id}`} type="button" aria-pressed={pinned} onClick={() => togglePin(plan.id)} disabled={!pinned && pinnedIds.length >= 3}>{pinned ? "Pinned ✓" : "Pin to compare"}</button><div className="price-block"><span>{plan.nativeTotal === null ? "Live price only" : `${plan.packs > 1 ? `${plan.packs} × ` : ""}${nativeMoney(plan.price!, plan.currency!)} provider-currency snapshot`}</span><strong>{plan.gbpTotal === null ? "Check price" : `≈ ${money.format(plan.gbpTotal)}`}</strong>{stale && <small className="negative">Snapshot needs rechecking</small>}{delta !== null && delta > 0.5 && !stale && <small>About {money.format(delta)} less than requirements-matched roaming</small>}{delta !== null && delta < -0.5 && !stale && <small className="negative">Roaming may cost {money.format(Math.abs(delta))} less</small>}</div>{compatibility === "blocked" ? <span className="deal-button disabled">Resolve compatibility</span> : <a className="deal-button" href={getPlanUrl(plan, activeDestination)} target="_blank" rel={details.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}>Check live <span aria-hidden="true">↗</span></a>}</div></div>;
            })}</div></article>;
          })}</div>

          {suggestionCount === 0 && <div className="empty-results"><h3>No plan matches every selected filter.</h3><p>Remove a filter or lower the data target to see more options.</p></div>}
          <div className="post-results-guidance"><aside className="travel-alert"><span aria-hidden="true">!</span><div><strong>Buy and install before you fly</strong><p>{destination === "turkey" || destination === "united-arab-emirates" ? `Provider access can be restricted after arrival in ${activeDestination.name}. Buy, install on reliable Wi-Fi and save the QR or manual setup details before departure.` : `Install your ${activeDestination.name} eSIM on reliable Wi-Fi before departure and save its QR code or manual setup details.`}</p></div></aside><aside className={`calling-guide ${callsNeed === "yes" ? "check-plan" : "data-only"}`}><span aria-hidden="true">☎</span><div><small>Calls and texts</small><strong>{callsNeed === "yes" ? "Normal calls and SMS are part of your requirement" : "Most travel plans here are data-only"}</strong><p>App calls use mobile data. A data-only badge means no normal phone number, calls or SMS are included; a separate UK line or a verified voice plan is needed. <a href="#methodology">Sources checked {CALLS_CHECKED}</a>.</p></div></aside></div>
          <p className="results-disclaimer">Manual prices were checked on {DATA_CHECKED} in the provider currency shown and expire from ranking after seven days. GBP figures use rounded reference rates (€1 ≈ £0.85 and $1 ≈ £0.75), so they are estimates rather than checkout prices. Klook prices are never scraped or guessed. Commission does not change the order. Savings appear only when UK roaming covers the full trip and data target, plus any selected calls/SMS, unlimited-data, 5G or hotspot requirement. Always confirm coverage, price, hotspot rules, speed caps, fair use, calls/texts and activation at checkout.</p>
        </section>

        <section className="methodology-section" id="methodology"><div className="methodology-intro"><p className="eyebrow">Receipts, not guesses</p><h2>Every number shows its assumptions.</h2><p>{pricedDestinationIds.length} destinations have short-lived manual price snapshots. The other {destinations.length - pricedDestinationIds.length} are clearly labelled provider finders until an approved feed is connected.</p><div className="data-status"><span><i className={roamingReviewDue ? "stale" : "fresh"} />UK roaming rules <strong>{ROAMING_CHECKED} · {roamingReviewDue ? "review overdue" : `review by ${formatCheckedDate(ROAMING_REVIEW_AFTER)}`}</strong></span><span><i className={dataReviewDue ? "stale" : "fresh"} />eSIM catalogue snapshots <strong>{DATA_CHECKED} · {dataReviewDue ? "review overdue" : `review by ${formatCheckedDate(DATA_REVIEW_AFTER)}`}</strong></span><span><i className={dataReviewDue ? "stale" : "fresh"} />Calls and texts labels <strong>{CALLS_CHECKED} · {dataReviewDue ? "review overdue" : `review by ${formatCheckedDate(DATA_REVIEW_AFTER)}`}</strong></span><span><i className={fxReviewDue ? "stale" : "fresh"} />Rounded GBP reference rates <strong>{fxReviewDue ? "review overdue" : `review by ${formatCheckedDate(FX_EVIDENCE.reviewAfter)}`}</strong></span><span><i className="manual" />Price refresh rule <strong>7 days, then removed from ranking</strong></span><span><i className="manual" />Live APIs <strong>not connected</strong></span></div></div><details className="source-register"><summary>Sources for {activeDestination.name} <span>eSIM, roaming & FX receipts</span></summary><div className="source-grid">{currentSources.length > 0 ? currentSources.map((plan) => <a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer" key={plan.sourceUrl}><span>eSIM catalogue</span><strong>{plan.provider} {activeDestination.name}</strong><small>{plan.note} · checked {formatCheckedDate(plan.checkedAt)} · review by {formatCheckedDate(plan.reviewAfter)}</small></a>) : (Object.keys(providerDetails) as Provider[]).map((provider) => <a href={getProviderUrl(provider, activeDestination)} target="_blank" rel="noopener noreferrer" key={provider}><span>Live catalogue</span><strong>{provider} {activeDestination.name}</strong><small>Price and exact limits must be checked live</small></a>)}{roaming && <a href={roaming.evidence.url} target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>{roaming.evidence.label}</strong><small>Checked {formatCheckedDate(roaming.evidence.checkedAt)} · review by {formatCheckedDate(roaming.evidence.reviewAfter)}</small></a>}<a href={FX_EVIDENCE.url} target="_blank" rel="noopener noreferrer"><span>Currency method</span><strong>{FX_EVIDENCE.label}</strong><small>Rounded comparison assumptions · checked {formatCheckedDate(FX_EVIDENCE.checkedAt)} · review by {formatCheckedDate(FX_EVIDENCE.reviewAfter)}</small></a></div></details></section>

        <section className="how-section" id="how-it-works"><div><p className="eyebrow">A safer setup</p><h2>Keep your UK number. Stop its data roaming.</h2></div><ol className="steps"><li><span>01</span><strong>Install at home</strong><p>Buy before departure, install on Wi-Fi and keep the new line switched off until arrival.</p></li><li><span>02</span><strong>Choose the data line</strong><p>Set the travel eSIM as Mobile Data and disable data switching so your UK SIM cannot take over.</p></li><li><span>03</span><strong>Keep texts available</strong><p>Leave the UK line on for banking texts if needed, but turn off its data roaming and avoid chargeable calls.</p></li></ol></section>

        <section className="faq-section" id="faq"><div><p className="eyebrow">Common questions</p><h2>Before you pick a plan.</h2></div><div className="faq-list"><details><summary>Do you calculate the roaming charge?</summary><p>Yes, for the five priced destinations. Choose the tariff or entitlement that applies and RoamCompare calculates published day fees, pass combinations or per-megabyte charges. It shows a savings figure only when the roaming data allowance covers the same trip target and selected needs; uncertain account-only pricing stays unranked.</p></details><details><summary>Are these live prices?</summary><p>Turkey, the United States, Spain, Japan and the UAE have dated manual snapshots. They stop ranking after seven days. Other destinations and Klook package prices open the live provider catalogue and show no guessed price.</p></details><details><summary>Can one provider show several suggestions?</summary><p>Yes. Suitable allowances and durations can appear together, then be filtered, sorted and pinned into a side-by-side shortlist.</p></details><details><summary>Where are tethering and speed limits?</summary><p>Every plan has a “Hotspot, speed & other limits” panel covering hotspot permission, speed caps or throttling, fair-use/exhaustion rules, activation and network. “Check plan” means the source did not support a safe general claim.</p></details><details><summary>Can I make calls with these eSIMs?</summary><p>Most shown plans are data-only: app calls work, but normal calls and SMS do not. Select “Yes” in the form and only a verified phone-number plan can become the top recommendation.</p></details><details><summary>How does phone compatibility work?</summary><p>Search your exact model against a dated manufacturer-guidance snapshot, then confirm the regional version and that the phone is network-unlocked.</p></details></div></section>
      </main>
      <footer><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">RC</span><span>RoamCompare</span></a><p>Independent comparisons for UK travellers · snapshots checked {DATA_CHECKED}</p><div className="footer-links"><a href="/about">About & disclosure</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></footer>
    </>
  );
}
