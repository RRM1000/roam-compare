"use client";

import { useMemo, useRef, useState } from "react";
import DeviceCompatibilityChecker from "@/app/components/DeviceCompatibilityChecker";
import {
  DATA_CHECKED_AT,
  DATA_REVIEW_AFTER,
  FX_EVIDENCE,
  formatCheckedDate,
  gbpRates,
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
import { getPlanMatch, money, nativeMoney, partitionDominated, withProviderHandoffs } from "@/lib/comparison";
import { getFaq } from "@/lib/faq";
import { destinationById, destinations, getProviderSourceUrl, getProviderUrl, hasNomadTracking, isTrackedUrl, type Destination, type DestinationId } from "@/lib/destinations";
import { getEsimDevice, getEsimReadiness, type LockStatus } from "@/lib/esim-devices";
import { getRoamingResult, getScenarioOptions, networkNames, pricedRoamingCoverage, ROAMING_CHECKED_AT, ROAMING_REVIEW_AFTER, type Network } from "@/lib/roaming";

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
  /** A shared link named a roaming tariff that does not apply to its destination. */
  scenarioDropped?: boolean;
  sortMode: SortMode;
  unlimitedOnly: boolean;
  fiveGOnly: boolean;
  tetheringOnly: boolean;
  compared: boolean;
};

type PlanMatch = ReturnType<typeof getPlanMatch>;
type SavedComparison = { label: string; url: string; savedAt: string };

/** Rows drawn per provider before the "show more" toggle. */
const PROVIDER_ROW_CAP = 4;

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
    name: `${destination.name} See their options`,
    validity: days,
    price: null,
    speed: "Options vary",
    speedCap: "Depends which one you pick",
    network: "Shown on their site",
    tethering: "check-plan",
    tetheringNote: "Check hotspot support on the one you pick",
    fairUse: "How much you get, and what happens when it runs out, varies by plan",
    activation: "Check when it starts counting down before you install it",
    note: "Sizes, lengths and prices are shown on their own site",
    callingSupport: "check-plan",
    sourceUrl: getProviderSourceUrl(provider, destination),
    checkedAt: DATA_CHECKED_AT,
    reviewAfter: "9999-12-31",
    catalogueOnly: true,
  };
}

function planDataLabel(plan: PlanMatch) {
  if (plan.catalogueOnly) return "Pick your allowance on the provider's site";
  // Multiple packs are almost always driven by data, not by trip length, so name
  // the reason rather than leaving "2 packs" to look like a validity problem.
  if (plan.unlimited) return "Unlimited — daily limits apply";
  if (plan.dailyDataGb) return `${plan.dailyDataGb}GB at full speed each day`;
  return `${plan.suppliedData}GB for your trip`;
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
  return "Calls & texts: check the plan";
}

function getPlanUrl(plan: Plan, destination: Destination) {
  if (plan.provider === "Klook") return getProviderUrl("Klook", destination);
  // Nomad plans carry a catalogue sourceUrl, which would otherwise win over a
  // configured tracking link and send the click through unattributed.
  if (plan.provider === "Nomad" && hasNomadTracking(destination.id)) return getProviderUrl("Nomad", destination);
  return plan.checkoutUrl ?? plan.sourceUrl ?? getProviderUrl(plan.provider, destination);
}

/**
 * Live provider plans replace the manual snapshots for the same provider and
 * destination. Snapshots stay in place for any destination the live feed does not
 * cover, so a failed fetch degrades to the previous dated behaviour.
 */
function mergePlans(livePlans: Plan[] | undefined) {
  if (!livePlans || livePlans.length === 0) return plans;
  const replaced = new Set(livePlans.map((plan) => `${plan.provider}|${plan.destination}`));
  return [...plans.filter((plan) => !replaced.has(`${plan.provider}|${plan.destination}`)), ...livePlans];
}

export default function CompareExperience({ initial = defaultComparison, destinationLanding = false, livePlans }: { initial?: InitialComparison; destinationLanding?: boolean; livePlans?: Plan[] }) {
  const [destination, setDestination] = useState<DestinationId>(initial.destination);
  const [days, setDays] = useState(initial.days);
  const [roamingDays, setRoamingDays] = useState(initial.roamingDays);
  // Roaming is all-or-nothing for almost everyone: the UK SIM stays connected
  // unless you turn it off, and the networks bill by day used rather than by a
  // number you pick up front. The exact-days picker stays hidden unless the
  // answer really is partial, which also keeps a 91-option select off the page.
  const [showPartialDays, setShowPartialDays] = useState(
    initial.roamingDays !== 0 && initial.roamingDays !== initial.days,
  );
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
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [allowanceNeedsChecking, setAllowanceNeedsChecking] = useState(false);
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const compareHeadingRef = useRef<HTMLHeadingElement>(null);
  const savedToggleRef = useRef<HTMLButtonElement>(null);
  const shortlistRef = useRef<HTMLDivElement>(null);

  const activeDestination = destinationById[destination];
  // Nomad becomes an affiliate the moment a valid tracking link is configured,
  // so the badge and rel="sponsored" can never claim a relationship we don't have.
  /**
   * Disclose a link when either test says to: the URL is one we earn on, or we
   * hold a relationship with that provider at all. Erring towards disclosure is
   * the safe direction, and reading the URL catches the case a flag misses —
   * Nomad's Impact feed began returning click URLs the moment the programme was
   * approved, and those shipped undisclosed while the flag still said false.
   */
  const isSponsoredLink = (provider: Provider, url: string) =>
    isTrackedUrl(url) || providerDetails[provider].affiliate;

  const dataReviewDue = isReviewDateDue(DATA_REVIEW_AFTER);
  const roamingReviewDue = isReviewDateDue(ROAMING_REVIEW_AFTER);
  const fxReviewDue = isReviewDateDue(FX_EVIDENCE.reviewAfter);
  const destinationsByRegion = useMemo(() => {
    const grouped = new Map<string, typeof destinations>();
    for (const place of [...destinations].sort((a, b) => a.name.localeCompare(b.name))) {
      grouped.set(place.region, [...(grouped.get(place.region) ?? []), place]);
    }
    return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, []);
  const tripLengthGroups = useMemo(() => ([
    ["Up to a week", tripLengths.filter((length) => length <= 7)],
    ["One to two weeks", tripLengths.filter((length) => length > 7 && length <= 14)],
    ["Two to four weeks", tripLengths.filter((length) => length > 14 && length <= 30)],
    ["Longer trips", tripLengths.filter((length) => length > 30)],
  ] as const), []);
  const availablePlans = useMemo(() => mergePlans(livePlans), [livePlans]);
  const liveDestinationCount = useMemo(() => new Set((livePlans ?? []).map((plan) => plan.destination)).size, [livePlans]);
  // Derived from the plans actually in hand, so the claims on the page stay true
  // whether the live feed answered or the manual snapshots are carrying it.
  const pricedDestinationIdSet = useMemo(
    () => new Set(availablePlans.filter((plan) => plan.price !== null).map((plan) => plan.destination)),
    [availablePlans],
  );
  const pricedDestination = pricedDestinationIdSet.has(destination);
  const pricedCount = pricedDestinationIdSet.size;
  const destinationHasLivePrices = useMemo(() => (livePlans ?? []).some((plan) => plan.destination === destination), [livePlans, destination]);
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
    ? "we need a price to compare"
    : !roaming.comparable
      ? "we can't confirm this covers your data"
      : roamingDays !== days
        ? "covers your data, but only for the roaming days you chose"
        : callsNeed === "yes" && roaming.callsTexts !== "included"
          ? "covers your data, but calls and texts aren't confirmed"
          : unlimitedOnly && !roaming.unlimitedData
            ? "covers your data, but roaming isn't confirmed unlimited"
            : fiveGOnly
              ? "covers your data, but 5G roaming isn't confirmed"
              : tetheringOnly && roaming.tethering !== "allowed"
                ? "covers your data, but hotspot use isn't confirmed"
                : "covers everything you asked for";
  const selectedDevice = getEsimDevice(selectedDeviceId);
  const compatibility = getEsimReadiness(selectedDevice, lockStatus);
  const selectedDeviceName = selectedDevice ? `${selectedDevice.manufacturer} ${selectedDevice.model}` : "";

  const comparisonPlans = useMemo(() => {
    const destinationPlans = availablePlans
      .filter((plan) => plan.destination === destination)
      // One purchase, or it does not belong in the comparison.
      .filter((plan) => plan.catalogueOnly || getPlanMatch(plan, days, neededData).packs <= 1);
    return withProviderHandoffs(destinationPlans, Object.keys(providerDetails) as Provider[], (provider) =>
      cataloguePlan(provider, activeDestination, days),
    );
  }, [activeDestination, availablePlans, days, destination, neededData]);

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
      const { shown, dominated } = partitionDominated(matches);
      // Providers with a deep catalogue (Airalo lists ten plans for a single week)
      // would otherwise bury the others. Counts and the best-value pick below read
      // the full list, so the cap only affects how many rows are drawn.
      const visible = showAllPlans ? matches : shown.slice(0, PROVIDER_ROW_CAP);
      return { provider, matches: visible, allMatches: matches, hiddenCount: matches.length - visible.length, dominatedCount: dominated.length, dominatedIds: new Set(dominated.map((plan) => plan.id)), bestPrice: Math.min(...rankable.map((plan) => plan.gbpTotal!), Infinity) };
    }).filter((group) => group.matches.length > 0).sort((a, b) => a.bestPrice - b.bestPrice || a.provider.localeCompare(b.provider));
  }, [callsNeed, comparisonPlans, days, fiveGOnly, neededData, showAllPlans, sortMode, tetheringOnly, unlimitedOnly]);

  const dominatedCount = groupedPlans.reduce((total, group) => total + group.dominatedCount, 0);
  const hiddenCount = groupedPlans.reduce((total, group) => total + group.hiddenCount, 0);

  // Reads every match, not just the visible ones, so the row cap can never change
  // which plan is recommended or how many the toolbar reports.
  const allMatches = groupedPlans.flatMap((group) => group.allMatches.map((plan) => ({ provider: group.provider, plan })));
  const suggestionCount = allMatches.length;
  const pricedPlanCount = allMatches.filter(({ plan }) => !plan.catalogueOnly).length;
  const handoffCount = suggestionCount - pricedPlanCount;
  const requirementMatchCount = callsNeed === "yes" ? allMatches.filter(({ plan }) => plan.callingSupport === "calls-texts").length : suggestionCount;
  const bestPricedPlan = [...allMatches]
    .filter(({ plan }) => plan.gbpTotal !== null && !plan.catalogueOnly && !isPlanStale(plan) && (callsNeed !== "yes" || plan.callingSupport === "calls-texts"))
    .sort((a, b) => a.plan.gbpTotal! - b.plan.gbpTotal!)[0];
  const allDestinationMatches = comparisonPlans.map((plan) => ({ provider: plan.provider, plan: getPlanMatch(plan, days, neededData) }));
  const pinnedPlans = pinnedIds.map((id) => allDestinationMatches.find(({ plan }) => plan.id === id)).filter(Boolean) as Array<{ provider: Provider; plan: PlanMatch }>;

  const currentSources = useMemo(() => {
    const entries = availablePlans.filter((plan) => plan.destination === destination).map((plan) => [plan.sourceUrl, plan] as const);
    return [...new Map(entries).values()];
  }, [availablePlans, destination]);

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
    // Tariffs are destination-specific, so they genuinely have to go. The
    // allowance describes the reader's own contract, so it stays — flagged,
    // because some plans meter different zones differently.
    setScenario("");
    setCustomCost("");
    setAllowanceNeedsChecking(roamingAllowance.trim() !== "");
    setPinnedIds([]);
    setPinStatus("");
    setShowAllPlans(false);
  }

  function compare() {
    // The eSIM side needs only destination, length and usage. Roaming is an
    // optional overlay, so it must never gate the results.
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

  // The phone check moved into the results, so the prompt must point at it by
  // action rather than by position — "above"/"below" breaks whenever the layout
  // changes and means nothing to a screen-reader user.
  function openCompatibilityCheck() {
    setShowCompatibility(true);
    window.setTimeout(() => {
      const trigger = document.getElementById("compatibility-trigger");
      trigger?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (trigger instanceof HTMLButtonElement) trigger.focus({ preventScroll: true });
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
        <div className="nav-actions"><span className="nav-note">Built for UK travellers</span><a className="nav-data" href="#methodology">Our data</a><a href="#faq">FAQ</a><a className="nav-about" href="/about">About</a><a className="nav-cta" href="#compare">Compare</a></div>
      </nav></header>

      <main className="home-page" id="main-content">
        <div className="hero-stage">
          <section className="hero" id="top">
            <div className="hero-copy">
              <p className="eyebrow">UK → {activeDestination.name} · roaming vs eSIM</p>
              <h1>{destinationLanding ? `Compare eSIMs for ${activeDestination.name}.` : "Know the roaming cost before take-off."}</h1>
              <p className="hero-lede">{destinationLanding ? `Compare what your UK network charges to roam in ${activeDestination.name} with travel eSIMs sized for your trip.` : "Compare a UK-network roaming estimate with travel eSIMs that fit your trip."} See the hotspot rules, speed caps and fair-use limits before opening checkout.</p>
              <div className="route-signature" aria-hidden="true"><span>United Kingdom</span><i /><span>→</span><i /><span>{activeDestination.flag} {activeDestination.name}</span></div>
              <div className="trust-row" aria-label="Service benefits"><span>{destinations.length} destinations</span><span>{pricedCount} with eSIM prices</span><span>Roaming priced, never guessed</span><span>No account needed</span></div>
            </div>

            <form className="compare-card" id="compare" aria-labelledby="compare-title" onSubmit={(event) => { event.preventDefault(); compare(); }}>
              <div className="card-heading"><span className="step-pill">Takes under a minute</span><h2 id="compare-title" ref={compareHeadingRef} tabIndex={-1}>What does your trip look like?</h2></div>
              <div className="field-grid">
                <label className="field field-wide"><span>Where are you going?</span><select value={destination} onChange={(event) => updateDestination(event.target.value as DestinationId)} aria-label="Destination">{destinationsByRegion.map(([region, places]) => <optgroup label={region} key={region}>{places.map((place) => <option value={place.id} key={place.id}>{place.name}</option>)}</optgroup>)}</select><small className={`field-status ${pricedDestination ? "priced" : "catalogue"}`}><i aria-hidden="true" />{destinationHasLivePrices ? "Full comparison with live eSIM prices" : pricedDestination ? "Full comparison with dated price snapshots" : "No stored prices — we’ll send you to the provider"}</small></label>
                <label className="field"><span>How long is your trip?</span><select value={days} onChange={(event) => updateDays(Number(event.target.value))} aria-label="Trip length">{tripLengthGroups.map(([label, lengths]) => <optgroup label={label} key={label}>{lengths.map((length) => <option value={length} key={length}>{length} {length === 1 ? "day" : "days"}</option>)}</optgroup>)}</select></label>
                
              </div>

              <fieldset className="usage-field"><legend>How will you use your phone?</legend><div className="usage-options">{([ ["light", "Light", "Maps & messages"], ["everyday", "Everyday", "Social & browsing"], ["heavy", "Heavy", "Video & hotspot"] ] as const).map(([value, title, detail]) => <label key={value}><input aria-label={`${title}: ${detail}`} type="radio" name="usage" value={value} checked={usage === value} onChange={() => setUsage(value)} /><span><strong>{title}</strong><small>{detail}</small></span></label>)}</div></fieldset>

              <fieldset className="calls-need"><legend>Do you need normal calls or SMS?</legend><div>{([ ["no", "No", "App calls are fine"], ["yes", "Yes", "I need a phone number"], ["unsure", "Not sure", "Show me the difference"] ] as const).map(([value, title, detail]) => <label key={value}><input aria-label={`${title}: ${detail}`} type="radio" name="calls" value={value} checked={callsNeed === value} onChange={() => setCallsNeed(value)} /><span><strong>{title}</strong><small>{detail}</small></span></label>)}</div></fieldset>

              <button className="primary-button" type="submit">{hasCompared ? "Update comparison" : "Compare my trip"} <span aria-hidden="true">→</span></button>
              <p className="affiliate-note">Free to use. We earn a commission if you buy through some of the provider links, never from all of them. Commission never changes the order. <a href="/about">Who we earn from</a>.</p>
            </form>
          </section>
          <div className="destination-rail" aria-label="Popular destinations"><span>Popular now</span><div>{(showAllDestinations ? destinations : destinations.slice(0, 8)).map((place) => <button className={destination === place.id ? "is-active" : ""} type="button" key={place.id} aria-pressed={destination === place.id} onClick={() => updateDestination(place.id)}>{place.flag} {place.name}</button>)}</div><button className="rail-more" type="button" aria-expanded={showAllDestinations} onClick={() => setShowAllDestinations((shown) => !shown)}>{showAllDestinations ? "Show fewer" : `+${destinations.length - 8} more`}</button></div>
        </div>

        <section className="proof-strip" aria-label="What RoamCompare checks"><article><span>01</span><strong>Honest savings only</strong><p>We show a saving only when roaming would genuinely cover your whole trip.</p></article><article><span>02</span><strong>The catches, up front</strong><p>Hotspot rules, speed caps and fair-use limits beside every plan.</p></article><article><span>03</span><strong>Every price has a source</strong><p>See where each number came from and when we checked it.</p></article></section>

        <p className="sr-only" aria-live="polite">{hasCompared ? `${suggestionCount} comparison options loaded for ${activeDestination.name}` : ""}</p>
        <section className={`results-section ${hasCompared ? "is-visible" : ""}`} id="results" aria-hidden={!hasCompared}>
          <div className="section-heading"><div><p className="eyebrow">Your comparison</p><h2 ref={resultsHeadingRef} tabIndex={-1}>{days} {days === 1 ? "day" : "days"} in {activeDestination.name} · plan for about {neededData}GB</h2></div><div className="result-actions"><button className="text-button" type="button" onClick={shareComparison}>Share comparison ↗</button><button className="text-button" type="button" onClick={saveComparison}>Save on this device</button><button className="text-button" type="button" ref={savedToggleRef} onClick={loadSavedComparisons} aria-expanded={showSaved} aria-controls="saved-comparisons">Saved comparisons</button>{pinnedPlans.length > 0 && <button className="text-button" type="button" onClick={viewShortlist} aria-controls="pinned-comparison">View shortlist ({pinnedPlans.length})</button>}<button className="text-button" type="button" onClick={focusComparisonForm}>Change trip details ↑</button>{shareStatus && <span role="status">{shareStatus}</span>}</div></div>

          {showSaved && <aside className="saved-comparisons" id="saved-comparisons"><div><strong>Saved on this device</strong><button type="button" onClick={closeSavedComparisons} aria-label="Close saved comparisons">×</button></div>{savedComparisons.length === 0 ? <p>No saved comparisons yet.</p> : <ul>{savedComparisons.map((item) => <li key={`${item.savedAt}-${item.url}`}><a href={item.url}>{item.label}</a><button type="button" onClick={() => removeSaved(item.url)} aria-label={`Remove ${item.label}`}>Remove</button></li>)}</ul>}<small>Stored only in this browser. Custom costs and phone details are not saved.</small></aside>}
          <p className="sr-only" role="status" aria-live="polite">{pinStatus}</p>

          <div className={`results-compatibility ${compatibility}`}><span aria-hidden="true">{compatibility === "ready" ? "✓" : compatibility === "blocked" ? "!" : compatibility === "check" ? "i" : "?"}</span><div><strong>{compatibility === "ready" ? `${selectedDeviceName} looks eSIM-ready` : compatibility === "check" ? "Check this phone’s exact version" : compatibility === "blocked" ? "Pause before purchasing" : "Phone compatibility not checked"}</strong><p>{compatibility === "ready" ? "Model and network-lock checks look good; confirm the regional version at checkout." : compatibility === "blocked" ? "A travel eSIM may not work on this phone or while it is network locked." : "Check your exact model, and make sure the phone isn’t locked to a UK network, before buying."}{compatibility !== "ready" && <button className="inline-link-button" type="button" onClick={openCompatibilityCheck}>Check my phone</button>}</p></div></div>


          <div className="roaming-panel" id="roaming-panel">
            <div className="roaming-panel-head"><div><strong>Compare with your own network</strong><p>{initial.scenarioDropped && !scenario ? `This link’s roaming tariff doesn’t apply to ${activeDestination.name}, so we couldn’t restore it — pick the one that fits and the comparison will update.` : "Optional. Tell us who you’re with and we’ll work out what roaming would cost for this trip."}</p><p className="roaming-caution">Not sure whether roaming costs extra on your plan? <strong>Assume it does.</strong> Check your network’s app before you fly — or keep data roaming switched off and use an eSIM, and there’s nothing to be surprised by.</p></div>{roaming && <span className="roaming-panel-done">Added</span>}</div>
            <div className="field-grid"><label className="field"><span>Your UK network</span><select value={network} onChange={(event) => updateNetwork(event.target.value as Network | "")} aria-label="UK mobile network"><option value="" disabled>Choose your network</option>{Object.entries(networkNames).map(([key, name]) => <option value={key} key={key}>{name}</option>)}</select><small className="field-help">We won’t guess — roaming costs differ far too much between networks.</small></label>
                  {network && <fieldset className="roaming-days-field"><legend>Will you use paid roaming on your UK network?</legend><div className="roaming-days-options"><label><input type="radio" name="roaming-days" checked={roamingDays === days} onChange={() => updateRoamingDays(days)} aria-label={`Yes, for all ${days} days`} /><span><strong>Yes, for the trip</strong><small>All {days} {days === 1 ? "day" : "days"}</small></span></label><label><input type="radio" name="roaming-days" checked={roamingDays === 0} onChange={() => updateRoamingDays(0)} aria-label="No, eSIM or Wi-Fi only" /><span><strong>No</strong><small>eSIM or Wi-Fi only</small></span></label></div>{days > 1 && (showPartialDays ? <label className="roaming-days-exact"><span>Paid roaming on how many days?</span><select value={roamingDays} onChange={(event) => updateRoamingDays(Number(event.target.value))} aria-label="UK roaming days">{Array.from({ length: days + 1 }, (_, index) => index).map((length) => <option value={length} key={length}>{length === 0 ? "0 — eSIM/Wi-Fi only" : `${length} ${length === 1 ? "day" : "days"}`}</option>)}</select></label> : <button type="button" className="roaming-days-partial" onClick={() => setShowPartialDays(true)}>Only some days?</button>)}<small className="field-help">Most people leave roaming on for the whole trip, or turn it off and use an eSIM.</small></fieldset>}
                  {network && <label className="field"><span>How does your plan charge for roaming here?</span><select value={scenario} onChange={(event) => updateScenario(event.target.value)} aria-label="Roaming plan situation" disabled={!network}><option value="" disabled>{network ? "Choose how you're charged" : "Choose a network first"}</option>{network && getScenarioOptions(network, destination).map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select><small className="field-help">Networks charge in different ways — a fee for each day you use it, a pass you buy up front, a per-megabyte rate, or nothing because your plan already covers it. Pick the one that matches yours; your network’s app will say which. When you took out the plan can change it, so the options name the date where it matters.</small></label>}
                  {scenario === "custom" && <label className="field"><span>Total roaming cost for this trip (£)</span><input inputMode="decimal" min="0" step="0.01" type="number" value={customCost} onChange={(event) => setCustomCost(event.target.value)} placeholder="For example, 35" required /></label>}
                  {network && <label className="field"><span>How much data does your plan give you abroad? (GB)</span><input inputMode="decimal" min="0" step="0.1" type="number" value={roamingAllowance} onChange={(event) => { setRoamingAllowance(event.target.value); setAllowanceNeedsChecking(false); }} placeholder="For example, 12" /><small className={`field-help${allowanceNeedsChecking ? " needs-checking" : ""}`}>{allowanceNeedsChecking ? `Still using ${roamingAllowance}GB — check that applies in ${activeDestination.name}.` : "Only needed for passes that use your normal UK data. Leave blank if you’re not sure."}</small></label>}
                </div>
          </div>
          <button className={`compatibility-trigger ${compatibility}`} id="compatibility-trigger" type="button" aria-expanded={showCompatibility} aria-controls="compatibility-panel" onClick={() => setShowCompatibility((shown) => !shown)}><span><i aria-hidden="true" />{compatibility === "ready" ? `${selectedDeviceName} looks eSIM-ready` : compatibility === "check" ? "Check this phone’s exact version" : compatibility === "blocked" ? "Compatibility needs attention" : "Will an eSIM work on your phone?"}</span><b aria-hidden="true">{showCompatibility ? "−" : "+"}</b></button>
          {showCompatibility && <DeviceCompatibilityChecker selectedDeviceId={selectedDeviceId} lockStatus={lockStatus} readiness={compatibility} onDeviceChange={setSelectedDeviceId} onLockStatusChange={setLockStatus} />}

          {roaming && <div className={`roaming-banner ${roaming.cost === null || !roaming.comparable ? "needs-input" : ""}`}>
            <div className="network-badge">{networkNames[network as Network].slice(0, 2).toUpperCase()}</div>
            <div><span className="overline">Your current network</span><h3>{roaming.title}</h3><p>{roaming.detail} {roaming.caveat}</p><div className="roaming-facts"><span>Data: {roaming.unlimitedData ? "Unlimited" : roaming.dataAllowanceGb === null ? "Not confirmed" : `${roaming.dataAllowanceGb}GB`}</span><span>Speed cap: {roaming.speedCap ?? "Check plan"}</span><span>Hotspot: {roaming.tethering === "allowed" ? "Allowed" : roaming.tethering === "not-allowed" ? "Not allowed" : "Check plan"}</span><span>Calls/SMS: {roaming.callsTexts === "included" ? "Included — check what's covered" : roaming.callsTexts === "not-included" ? "Not included" : roaming.callsTexts === "extra" ? "Extra" : "Check plan"}</span></div><strong className={`match-note ${roaming.matched === false ? "no-match" : roaming.matched === true ? "matched" : "unknown"}`}>{roaming.matchReason}</strong><a className="roaming-source" href={roaming.evidence.url} target="_blank" rel="noopener noreferrer">Official {roaming.evidence.label} · checked {formatCheckedDate(roaming.evidence.checkedAt)} · review by {formatCheckedDate(roaming.evidence.reviewAfter)} ↗</a></div>
            <div className="roaming-price"><strong>{roaming.cost === null ? "Check plan" : money.format(roaming.cost)}</strong><span>{roamingComparisonStatus}</span></div>
          </div>}

          {bestPricedPlan && <div className="decision-card"><div><span className="decision-label">Best value for this trip</span><h3>{bestPricedPlan.provider} · {bestPricedPlan.plan.name} <span className="plan-duration">· {bestPricedPlan.plan.validity} days</span></h3><p>{callsNeed === "yes" ? "This one includes normal calls and texts — check how many are included before you buy." : "Enough data for your whole trip at the lowest total we found. Check the limits below; the price at checkout can differ."}</p></div><div className="decision-price"><small>Estimated trip total</small><strong>≈ {money.format(bestPricedPlan.plan.gbpTotal!)}</strong>{canCompareSavings && roaming?.cost !== null && roaming.cost - bestPricedPlan.plan.gbpTotal! > 0.5 && <span>About {money.format(roaming.cost - bestPricedPlan.plan.gbpTotal!)} less than roaming that meets everything you asked for</span>}</div>{compatibility === "blocked" ? <span className="decision-blocked">Resolve compatibility first</span> : <a href={getPlanUrl(bestPricedPlan.plan, activeDestination)} target="_blank" rel={isSponsoredLink(bestPricedPlan.provider, getPlanUrl(bestPricedPlan.plan, activeDestination)) ? "sponsored noopener noreferrer" : "noopener noreferrer"}>See this plan <span aria-hidden="true">↗</span></a>}</div>}

          {callsNeed === "yes" && !bestPricedPlan && <aside className="need-warning"><strong>None of the plans we can price include normal calls and texts.</strong><p>Data-only eSIMs can still run WhatsApp, FaceTime and similar apps. Do not treat them as a replacement for a mobile number.</p></aside>}
          <div className="plan-controls" aria-label="Sort and filter plans"><label>Sort by <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}><option value="price">Estimated total</option><option value="data">Data allowance</option><option value="validity">How long it lasts</option></select></label><div><label><input type="checkbox" checked={unlimitedOnly} onChange={(event) => setUnlimitedOnly(event.target.checked)} /> Unlimited only</label><label><input type="checkbox" checked={fiveGOnly} onChange={(event) => setFiveGOnly(event.target.checked)} /> 5G listed</label><label><input type="checkbox" checked={tetheringOnly} onChange={(event) => setTetheringOnly(event.target.checked)} /> Hotspot allowed</label></div>{(hiddenCount > 0 || showAllPlans) && <button className="show-all-toggle" type="button" aria-pressed={showAllPlans} onClick={() => setShowAllPlans((shown) => !shown)}>{showAllPlans ? "Show fewer plans" : hiddenCount === dominatedCount ? `Show ${dominatedCount} more that cost more for the same data` : `Show ${hiddenCount} more ${hiddenCount === 1 ? "plan" : "plans"}`}</button>}</div>
          <div className="results-toolbar"><p><strong>{pricedPlanCount === 0 ? `No single eSIM covers a ${days}-day trip` : callsNeed === "yes" ? `${requirementMatchCount} meet your calls/SMS requirement · ${pricedPlanCount} big enough for this trip` : `${pricedPlanCount} ${pricedPlanCount === 1 ? "plan" : "plans"} big enough for this trip`}</strong>{handoffCount > 0 ? ` · ${handoffCount} ${handoffCount === 1 ? "provider prices" : "providers price"} only on their own site` : ""} across {groupedPlans.length} providers{hiddenCount > 0 && !showAllPlans ? `, with ${hiddenCount} hidden` : ""}</p><span>{pricedDestination ? "Ranked by estimated trip total. Plans without a current price can’t be ranked and appear last. Commission never changes the order." : "No stored prices — we’ll send you to the provider"}</span></div>

          {pinnedPlans.length > 0 && <section className="pinned-comparison" id="pinned-comparison" aria-labelledby="pinned-title">
            <div><h3 id="pinned-title">Side-by-side shortlist</h3><span>{pinnedPlans.length}/3 pinned</span></div>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- The horizontally scrolling comparison table must be keyboard-focusable. */}
            <div className="comparison-table-wrap" role="region" aria-labelledby="pinned-title" tabIndex={0} ref={shortlistRef}>
              <table>
                <caption className="sr-only">Comparison of pinned eSIM plans</caption>
                <thead><tr><th scope="col">Feature</th>{pinnedPlans.map(({ plan }) => <th scope="col" key={plan.id}>{plan.provider}<small>{plan.name}</small><button className="table-unpin" type="button" onClick={() => removePinFromShortlist(plan.id)} aria-label={`Remove ${plan.provider} ${plan.name} from shortlist`}>Remove</button></th>)}</tr></thead>
                <tbody>
                  <tr><th scope="row">Estimated total</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.gbpTotal === null ? "At provider" : `≈ ${money.format(plan.gbpTotal)}`}</td>)}</tr>
                  <tr><th scope="row">Data</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{planDataLabel(plan)}</td>)}</tr>
                  <tr><th scope="row">How long it lasts</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.validity} days once it starts</td>)}</tr>
                  <tr><th scope="row">Network speed</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.speed}</td>)}</tr>
                  <tr><th scope="row">Speed limit</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.speedCap}</td>)}</tr>
                  <tr><th scope="row">Hotspot</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{plan.tetheringNote}</td>)}</tr>
                  <tr><th scope="row">Calls & texts</th>{pinnedPlans.map(({ plan }) => <td key={plan.id}>{callsLabel(plan)}</td>)}</tr>
                </tbody>
              </table>
            </div>
          </section>}

          <div className="provider-list">{groupedPlans.map(({ provider, matches, dominatedIds }) => {
            const details = providerDetails[provider];
            return <article className={`provider-card ${bestPricedPlan?.provider === provider ? "top-pick" : ""}`} key={provider}><header className="provider-header"><div className="provider-main"><div className="provider-logo" style={{ background: details.accent }}>{details.initials}</div><div><div className="provider-name-row"><h3>{provider}</h3></div><p>{details.summary}</p></div></div></header><div className="plan-list">{matches.map((plan, planIndex) => {
              const stale = !plan.catalogueOnly && isPlanStale(plan);
              const outclassed = dominatedIds.has(plan.id);
              const pinned = pinnedIds.includes(plan.id);
              const requirementMismatch = callsNeed === "yes" && plan.callingSupport === "data-only";
              const callsUnverified = callsNeed === "yes" && plan.callingSupport === "check-plan";
              const showFitBadge = planIndex === 0 || requirementMismatch || callsUnverified || stale;
              const fitLabel = requirementMismatch
                ? "No calls or texts — you said you need them"
                : callsUnverified
                  ? "We couldn’t confirm calls and texts"
                  : stale
                    ? "Price needs rechecking"
                    : plan.catalogueOnly || plan.price === null
                      ? "Price shown on their site"
                      : "Matches what you asked for";
              const delta = canCompareSavings && !requirementMismatch && !callsUnverified && roaming?.cost !== null && plan.gbpTotal !== null ? roaming.cost - plan.gbpTotal : null;
              return <div className={`plan-row ${stale ? "is-stale" : ""} ${outclassed ? "is-outclassed" : ""}`} key={plan.id}><div className="plan-copy"><div><h4>{plan.name}{!plan.catalogueOnly && <span className="plan-duration"> · {plan.validity} days</span>}</h4>{outclassed && <span className="outclassed-badge">Costs more for the same data</span>}{showFitBadge && <span className={`fit-badge ${requirementMismatch ? "requirement-miss" : callsUnverified ? "not-verified" : stale ? "price-warning" : ""}`}>{fitLabel}</span>}<span className={`freshness-badge ${stale ? "stale" : "fresh"}`}>{plan.catalogueOnly || plan.price === null ? "Price on their site" : plan.live ? "Live price" : stale ? "Needs rechecking" : `Checked ${formatCheckedDate(plan.checkedAt)}`}</span></div><p>{planDataLabel(plan)} · {plan.speed}</p><div className="plan-facts"><span>{tetheringLabel(plan)}</span><span>{plan.speedCap}</span></div><div className={`calls-texts-status ${plan.callingSupport}`} data-status={plan.callingSupport}><strong>{callsLabel(plan)}</strong><span>{plan.callingSupport === "data-only" ? "WhatsApp and FaceTime work fine. Normal phone calls and texts do not." : plan.callingSupport === "calls-texts" ? "Comes with a phone number. Check how many minutes and texts are included." : "Some plans on this provider include calls, some don’t. Check before buying."}</span></div><details className="plan-limits"><summary>Hotspot, speed & other limits</summary><dl><div><dt>Hotspot</dt><dd>{plan.tetheringNote}</dd></div><div><dt>Speed limit</dt><dd>{plan.speedCap}</dd></div><div><dt>When the data runs out</dt><dd>{plan.fairUse}</dd></div><div><dt>Activation</dt><dd>{plan.activation}</dd></div><div><dt>Network</dt><dd>{plan.network}</dd></div></dl><a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer">Open source checked {formatCheckedDate(plan.checkedAt)} ↗</a></details></div><div className="plan-decision"><button className="pin-button" id={`pin-${plan.id}`} type="button" aria-pressed={pinned} onClick={() => togglePin(plan.id)} disabled={!pinned && pinnedIds.length >= 3}>{pinned ? "Pinned ✓" : "Pin to compare"}</button>{pinned && <button className="text-button shortlist-jump" type="button" onClick={viewShortlist} aria-controls="pinned-comparison">{pinnedPlans.length > 1 ? `Compare pinned (${pinnedPlans.length}) ↑` : "View shortlist ↑"}</button>}<div className="price-block"><span>{plan.nativeTotal === null ? "Price shown on their site" : `${nativeMoney(plan.price!, plan.currency!)} ${plan.live ? `live from ${provider}` : "listed when we checked"}`}</span><strong>{plan.gbpTotal === null ? "Check price" : `≈ ${money.format(plan.gbpTotal)}`}</strong>{stale && <small className="negative">Snapshot needs rechecking</small>}{delta !== null && delta > 0.5 && !stale && <small className="versus-roaming" title={`About ${money.format(delta)} less than roaming that meets everything you asked for`}><span>vs roaming</span> −{money.format(delta)}</small>}{delta !== null && delta < -0.5 && !stale && <small className="negative">Roaming may cost {money.format(Math.abs(delta))} less</small>}</div>{compatibility === "blocked" ? <span className="deal-button disabled">Resolve compatibility</span> : <a className="deal-button" href={getPlanUrl(plan, activeDestination)} target="_blank" rel={isSponsoredLink(provider, getPlanUrl(plan, activeDestination)) ? "sponsored noopener noreferrer" : "noopener noreferrer"}>See this plan <span aria-hidden="true">↗</span></a>}</div></div>;
            })}</div></article>;
          })}</div>

          {pricedPlanCount === 0 && suggestionCount > 0 && <div className="empty-results"><h3>No single eSIM covers a {days}-day trip.</h3><p>Most travel eSIMs run to 30 days at most. We only show plans one purchase covers, so for a trip this long these providers are worth checking directly — several sell longer plans or let you top up as you go.</p></div>}
          {suggestionCount === 0 && <div className="empty-results"><h3>No plan matches every selected filter.</h3><p>Remove a filter or lower the data target to see more options.</p></div>}
          <div className="post-results-guidance"><aside className="travel-alert"><span aria-hidden="true">!</span><div><strong>Buy and install before you fly</strong><p>{destination === "turkey" || destination === "united-arab-emirates" ? `You may not be able to reach the provider’s website once you are in ${activeDestination.name}. Buy, install on reliable Wi-Fi and save the QR or manual setup details before departure.` : `Install your ${activeDestination.name} eSIM on reliable Wi-Fi before departure and save its QR code or manual setup details.`}</p></div></aside><aside className={`calling-guide ${callsNeed === "yes" ? "check-plan" : "data-only"}`}><span aria-hidden="true">☎</span><div><small>Calls and texts</small><strong>{callsNeed === "yes" ? "Normal calls and SMS are part of your requirement" : "Most travel plans here are data-only"}</strong><p>App calls use mobile data. “Data only” means no phone number, calls or SMS are included; a separate UK line or a verified voice plan is needed. <a href="#methodology">Sources checked {formatCheckedDate(DATA_CHECKED_AT)}</a>.</p></div></aside></div>
          <p className="results-disclaimer">Plans marked “Live price” come straight from the provider’s own feed. Saily’s are real pounds; Nomad’s are US dollars we convert. Hand-checked prices were last confirmed on {formatCheckedDate(DATA_CHECKED_AT)} in the currency shown, and stop being ranked after seven days. Where we convert a price we use rounded rates (€1 ≈ £{gbpRates.EUR}, $1 ≈ £{gbpRates.USD}), so treat those totals as close estimates rather than the figure you will pay. Klook prices are never scraped or guessed. Commission never changes the order. We only show a saving when roaming covers your whole trip and everything else you ticked. We can’t confirm 5G roaming on any network, so ticking “5G listed” hides savings entirely. Always confirm coverage, price, hotspot rules, speed caps, fair use, calls/texts and activation at checkout.</p>
        </section>

        <section className="methodology-section" id="methodology"><div className="methodology-intro"><p className="eyebrow">Where the numbers come from</p><h2>How we work this out.</h2><p>{liveDestinationCount > 0 ? `On EE we price roaming for all ${destinations.length} destinations. Across the other nine networks we price ${pricedRoamingCoverage().others} more network-and-destination combinations from published charges; everywhere else we send you to your network's own checker instead of guessing. Saily and Nomad send us their prices directly, covering ${liveDestinationCount} destinations. Airalo prices are checked by hand for ${pricedDestinationIds.length} of them and stop being ranked a week after we last looked. Klook never shows a price here — we send you to their own page instead of guessing one.` : `On EE we price roaming for all ${destinations.length} destinations. Across the other nine networks we price ${pricedRoamingCoverage().others} more network-and-destination combinations from published charges, and send you to your network's own checker elsewhere. ${pricedDestinationIds.length} destinations have prices we checked by hand; for the other ${destinations.length - pricedDestinationIds.length} we send you to the provider rather than show a number we cannot stand behind.`}</p><div className="data-status"><span><i className={roamingReviewDue ? "stale" : "fresh"} />UK roaming rules <strong>{formatCheckedDate(ROAMING_CHECKED_AT)} · {roamingReviewDue ? "review overdue" : `review by ${formatCheckedDate(ROAMING_REVIEW_AFTER)}`}</strong></span><span><i className={dataReviewDue ? "stale" : "fresh"} />Hand-checked prices &amp; calls/texts labels <strong>{formatCheckedDate(DATA_CHECKED_AT)} · {dataReviewDue ? "review overdue" : `review by ${formatCheckedDate(DATA_REVIEW_AFTER)}`}</strong></span><span><i className={fxReviewDue ? "stale" : "fresh"} />Exchange rates (rounded) <strong>{formatCheckedDate(FX_EVIDENCE.checkedAt)} · {fxReviewDue ? "review overdue" : `review by ${formatCheckedDate(FX_EVIDENCE.reviewAfter)}`}</strong></span><span><i className="manual" />Price refresh rule <strong>7 days, then removed from ranking</strong></span><span><i className={liveDestinationCount > 0 ? "fresh" : "manual"} />Live prices from Saily and Nomad <strong>{liveDestinationCount > 0 ? `working · ${liveDestinationCount} destinations` : "not answering — showing hand-checked prices"}</strong></span></div></div><details className="source-register"><summary>Sources for {activeDestination.name} <span>Every price’s paper trail</span></summary><div className="source-grid">{currentSources.length > 0 ? currentSources.map((plan) => <a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer" key={plan.sourceUrl}><span>Where we checked</span><strong>{plan.provider} {activeDestination.name}</strong><small>{plan.note} · checked {formatCheckedDate(plan.checkedAt)} · review by {formatCheckedDate(plan.reviewAfter)}</small></a>) : (Object.keys(providerDetails) as Provider[]).map((provider) => <a href={getProviderSourceUrl(provider, activeDestination)} target="_blank" rel="noopener noreferrer" key={provider}><span>Where to check</span><strong>{provider} {activeDestination.name}</strong><small>Price and exact limits are shown on their site</small></a>)}{roaming && <a href={roaming.evidence.url} target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>{roaming.evidence.label}</strong><small>Checked {formatCheckedDate(roaming.evidence.checkedAt)} · review by {formatCheckedDate(roaming.evidence.reviewAfter)}</small></a>}<a href={FX_EVIDENCE.url} target="_blank" rel="noopener noreferrer"><span>Currency method</span><strong>{FX_EVIDENCE.label}</strong><small>Rounded comparison assumptions · checked {formatCheckedDate(FX_EVIDENCE.checkedAt)} · review by {formatCheckedDate(FX_EVIDENCE.reviewAfter)}</small></a></div></details></section>

        <section className="how-section" id="how-it-works"><div><p className="eyebrow">Setting up before you fly</p><h2>Keep your UK number. Turn off its data.</h2></div><ol className="steps"><li><span>01</span><strong>Install at home</strong><p>Buy before departure, install on Wi-Fi and keep the new line switched off until arrival.</p></li><li><span>02</span><strong>Choose the data line</strong><p>Set the travel eSIM as Mobile Data and disable data switching so your UK SIM cannot take over.</p></li><li><span>03</span><strong>Keep texts available</strong><p>Leave the UK line on for banking texts if needed, but turn off its data roaming and avoid chargeable calls.</p></li></ol></section>

        <section className="faq-section" id="faq"><div><p className="eyebrow">Common questions</p><h2>Things worth checking first.</h2></div><div className="faq-list">{getFaq().map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      </main>
      <footer><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">RC</span><span>RoamCompare</span></a><p>Independent comparisons for UK travellers · prices checked {formatCheckedDate(DATA_CHECKED_AT)}</p><div className="footer-links"><a href="/about">About & disclosure</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></footer>
    </>
  );
}
