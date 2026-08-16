"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DATA_CHECKED, plans, providerDetails, tripLengths, usagePerDay, type Plan, type Provider, type Usage } from "@/lib/catalog";
import { getPlanMatch, money, nativeMoney } from "@/lib/comparison";
import { destinationById, destinations, getProviderUrl, type DestinationId } from "@/lib/destinations";
import { getDefaultScenario, getRoamingResult, getScenarioOptions, networkNames, ROAMING_CHECKED, type Network } from "@/lib/roaming";

type Device = "unknown" | "iphone" | "samsung" | "pixel" | "other" | "unsupported";
type LockStatus = "unknown" | "unlocked" | "locked";

export type InitialComparison = {
  destination: DestinationId;
  days: number;
  roamingDays: number;
  network: Network;
  scenario: string;
  usage: Usage;
  compared: boolean;
};

const defaultComparison: InitialComparison = { destination: "turkey", days: 7, roamingDays: 7, network: "ee", scenario: getDefaultScenario("ee", "turkey"), usage: "everyday", compared: false };

export default function CompareExperience({ initial = defaultComparison }: { initial?: InitialComparison }) {
  const [destination, setDestination] = useState<DestinationId>(initial.destination);
  const [days, setDays] = useState(initial.days);
  const [roamingDays, setRoamingDays] = useState(initial.roamingDays);
  const [network, setNetwork] = useState<Network>(initial.network);
  const [scenario, setScenario] = useState(initial.scenario);
  const [customCost, setCustomCost] = useState("");
  const [usage, setUsage] = useState<Usage>(initial.usage);
  const [hasCompared, setHasCompared] = useState(initial.compared);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [device, setDevice] = useState<Device>("unknown");
  const [lockStatus, setLockStatus] = useState<LockStatus>("unknown");
  const [shareStatus, setShareStatus] = useState("");
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);

  const activeDestination = destinationById[destination];
  const neededData = Math.max(1, Math.ceil(days * usagePerDay[usage]));
  const neededRoamingData = roamingDays * usagePerDay[usage];
  const roaming = getRoamingResult(network, scenario, roamingDays, customCost, neededRoamingData, destination);
  const canCompareSavings = roaming.comparable && roamingDays === days;
  const compatibility = device === "unsupported" || lockStatus === "locked" ? "blocked" : device !== "unknown" && lockStatus === "unlocked" ? "ready" : "unknown";

  const groupedPlans = useMemo(() => {
    const availablePlans: Plan[] = destination === "turkey" ? plans : (Object.keys(providerDetails) as Provider[]).map((provider) => ({ id: `${destination}-${provider.toLowerCase()}`, provider, name: `${activeDestination.name} eSIM catalogue`, validity: days, price: null, speed: "Options vary", network: "See live provider catalogue", note: "Live allowances, validity and prices shown by provider", catalogueOnly: true }));
    return (Object.keys(providerDetails) as Provider[]).map((provider) => {
      const matches = availablePlans.filter((plan) => plan.provider === provider).map((plan) => getPlanMatch(plan, days, neededData)).filter((plan) => plan.suppliedData >= neededData).sort((a, b) => (a.gbpTotal ?? Number.POSITIVE_INFINITY) - (b.gbpTotal ?? Number.POSITIVE_INFINITY) || a.suppliedData - b.suppliedData).slice(0, provider === "Klook" ? 3 : 2);
      return { provider, matches, bestPrice: matches[0]?.gbpTotal ?? Number.POSITIVE_INFINITY };
    }).filter((group) => group.matches.length > 0).sort((a, b) => a.bestPrice - b.bestPrice);
  }, [activeDestination.name, days, destination, neededData]);

  const suggestionCount = groupedPlans.reduce((total, group) => total + group.matches.length, 0);
  const bestPricedPlan = groupedPlans.flatMap((group) => group.matches.map((plan) => ({ provider: group.provider, plan }))).find(({ plan }) => plan.gbpTotal !== null);

  useEffect(() => {
    document.title = hasCompared
      ? `${days} ${days === 1 ? "day" : "days"} in ${activeDestination.name} — RoamCompare`
      : "RoamCompare — UK roaming vs travel eSIMs";
  }, [activeDestination.name, days, hasCompared]);

  function updateDays(nextDays: number) {
    setDays(nextDays);
    setRoamingDays(nextDays);
  }

  function updateNetwork(nextNetwork: Network) {
    setNetwork(nextNetwork);
    setScenario(getDefaultScenario(nextNetwork, destination));
    setCustomCost("");
  }

  function updateDestination(nextDestination: DestinationId) {
    setDestination(nextDestination);
    setScenario(getDefaultScenario(network, nextDestination));
    setCustomCost("");
    setHasCompared(false);
  }

  function compare() {
    setHasCompared(true);
    setShareStatus("");
    window.setTimeout(() => {
      resultsHeadingRef.current?.focus({ preventScroll: true });
      document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  async function shareComparison() {
    const url = new URL(window.location.href);
    const sharedScenario = scenario === "custom" ? getDefaultScenario(network, destination) : scenario;
    url.search = new URLSearchParams({ compare: "1", destination, days: String(days), roamingDays: String(roamingDays), network, scenario: sharedScenario, usage }).toString();
    try {
      await navigator.clipboard.writeText(url.toString());
      setShareStatus(scenario === "custom" ? "Link copied without your private custom cost" : "Comparison link copied");
    } catch {
      window.history.replaceState({}, "", url);
      setShareStatus(scenario === "custom" ? "Shareable link added without your private custom cost" : "Shareable link added to the address bar");
    }
  }

  return (
    <>
      <a className="skip-link" href="#compare">Skip to comparison</a>
      <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="RoamCompare home"><span className="brand-mark" aria-hidden="true">RC</span><span>RoamCompare</span></a>
        <div className="nav-actions"><span className="nav-note">Built for UK travellers</span><a className="nav-data" href="#methodology">Our data</a><a href="#faq">FAQ</a><a className="nav-about" href="/about">About</a><a className="nav-cta" href="#compare">Compare now</a></div>
      </nav>
      </header>

      <main className="home-page" id="main-content">
      <div className="hero-stage">

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">UK → {activeDestination.name} · roaming vs eSIM</p>
          <h1>Know the roaming cost before take-off.</h1>
          <p className="hero-lede">Compare your UK network’s {activeDestination.name} roaming route with eSIM options sized for your trip—using dated sources, transparent assumptions and no mystery prices.</p>
          <div className="route-signature" aria-hidden="true"><span>United Kingdom</span><i /><span>→</span><i /><span>{activeDestination.flag} {activeDestination.name}</span></div>
          <div className="trust-row" aria-label="Service benefits"><span>{destinations.length} destinations</span><span>10 UK networks</span><span>No account needed</span></div>
        </div>

        <form className="compare-card" id="compare" aria-labelledby="compare-title" onSubmit={(event) => { event.preventDefault(); compare(); }}>
          <div className="card-heading"><span className="step-pill">Takes under a minute</span><h2 id="compare-title">What does your trip look like?</h2></div>
          <div className="field-grid">
            <label className="field field-wide"><span>Where are you going?</span><select value={destination} onChange={(event) => updateDestination(event.target.value as DestinationId)} aria-label="Destination">{destinations.map((place) => <option value={place.id} key={place.id}>{place.flag} {place.name}</option>)}</select><small className={`field-status ${destination === "turkey" ? "priced" : "catalogue"}`}><i />{destination === "turkey" ? "Priced comparison with dated snapshots" : "Live provider catalogues — prices checked at source"}</small></label>
            <label className="field"><span>Trip length</span><select value={days} onChange={(event) => updateDays(Number(event.target.value))} aria-label="Trip length">{tripLengths.map((length) => <option value={length} key={length}>{length} {length === 1 ? "day" : "days"}</option>)}</select></label>
            <label className="field"><span>Days using your UK SIM</span><select value={roamingDays} onChange={(event) => setRoamingDays(Number(event.target.value))} aria-label="Days using UK SIM">{Array.from({ length: days + 1 }, (_, index) => index).map((length) => <option value={length} key={length}>{length === 0 ? "0 days — eSIM/Wi-Fi only" : `${length} ${length === 1 ? "day" : "days"}`}</option>)}</select></label>
            <label className="field"><span>Your UK network</span><select value={network} onChange={(event) => updateNetwork(event.target.value as Network)} aria-label="UK mobile network">{Object.entries(networkNames).map(([key, name]) => <option value={key} key={key}>{name}</option>)}</select></label>
            <label className="field"><span>Your roaming situation</span><select value={scenario} onChange={(event) => setScenario(event.target.value)} aria-label="Roaming plan situation">{getScenarioOptions(network, destination).map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>
            {scenario === "custom" && <label className="field field-wide"><span>Your total roaming cost for this trip (£)</span><input inputMode="decimal" min="0" step="0.01" type="number" value={customCost} onChange={(event) => setCustomCost(event.target.value)} placeholder="For example, 35" aria-label="Custom roaming cost for trip" required /></label>}
          </div>

          <fieldset className="usage-field">
            <legend>How will you use your phone?</legend>
            <div className="usage-options">{([["light", "Light", "Maps & messages"], ["everyday", "Everyday", "Social & browsing"], ["heavy", "Heavy", "Video & hotspot"]] as const).map(([value, title, detail]) => (
              <label key={value}><input type="radio" name="usage" value={value} aria-label={`${title}: ${detail}`} checked={usage === value} onChange={() => setUsage(value)} /><span><strong>{title}</strong><small>{detail}</small></span></label>
            ))}</div>
          </fieldset>

          <button className={`compatibility-trigger ${compatibility}`} type="button" aria-expanded={showCompatibility} aria-controls="compatibility-panel" onClick={() => setShowCompatibility((shown) => !shown)}>
            <span><i aria-hidden="true" />{compatibility === "ready" ? "Likely eSIM-ready" : compatibility === "blocked" ? "Compatibility needs attention" : "Check whether your phone supports eSIM"}</span><b aria-hidden="true">{showCompatibility ? "−" : "+"}</b>
          </button>

          {showCompatibility && (
            <div className="compatibility-panel" id="compatibility-panel">
              <div className="compatibility-heading"><strong>Quick compatibility check</strong><small>We cannot inspect your phone, so confirm both items before buying.</small></div>
              <label className="field"><span>Your device</span><select value={device} onChange={(event) => setDevice(event.target.value as Device)} aria-label="Device compatibility group"><option value="unknown">I’m not sure</option><option value="iphone">iPhone XS, XR, SE (2nd gen) or newer</option><option value="samsung">Compatible Samsung Galaxy S, Z or A model</option><option value="pixel">Google Pixel 4 or newer</option><option value="other">Another device with “Add eSIM”</option><option value="unsupported">My phone does not have “Add eSIM”</option></select></label>
              <label className="field"><span>Is it unlocked?</span><select value={lockStatus} onChange={(event) => setLockStatus(event.target.value as LockStatus)} aria-label="Phone network lock status"><option value="unknown">I’m not sure</option><option value="unlocked">Yes, it is unlocked</option><option value="locked">No, it is network-locked</option></select></label>
              <div className={`compatibility-result ${compatibility}`}><strong>{compatibility === "ready" ? "Likely compatible" : compatibility === "blocked" ? "Do not buy an eSIM yet" : "Two checks still matter"}</strong><p>{compatibility === "ready" ? "Your answers suggest a travel eSIM should work. Regional device variants can differ, so verify with the manufacturer." : compatibility === "blocked" ? "Travel eSIMs need an eSIM-capable, unlocked phone. Ask your UK network about unlocking or use a physical travel SIM." : "Look for “Add eSIM” in your mobile settings and ask your UK network whether the handset is unlocked."}</p></div>
              <p className="manufacturer-links">Official checks: <a href="https://support.apple.com/en-gb/guide/iphone/iph9c5776d3c/ios" target="_blank" rel="noopener noreferrer">Apple</a> · <a href="https://www.samsung.com/uk/support/mobile-devices/galaxy-esim-and-supported-network-carriers/" target="_blank" rel="noopener noreferrer">Samsung</a> · <a href="https://support.google.com/pixelphone/answer/16115741?hl=en" target="_blank" rel="noopener noreferrer">Google Pixel</a></p>
            </div>
          )}

          <button className="primary-button" type="submit">{destination === "turkey" ? "Compare priced options" : "Compare live catalogues"} <span aria-hidden="true">→</span></button>
          <p className="affiliate-note">Free to use. We may earn commission from marked links; price order is unaffected.</p>
        </form>
      </section>
      <div className="destination-rail" aria-label="Popular destinations"><span>Popular now</span><div>{destinations.slice(0, 8).map((place) => <button className={destination === place.id ? "is-active" : ""} type="button" key={place.id} aria-pressed={destination === place.id} onClick={() => updateDestination(place.id)}>{place.flag} {place.name}</button>)}</div><strong>+{destinations.length - 8} more</strong></div>
      </div>

      <section className="proof-strip" aria-label="What RoamCompare checks"><article><span>01</span><strong>Your network</strong><p>Current roaming routes and plan-specific caveats.</p></article><article><span>02</span><strong>Your data</strong><p>A practical allowance sized to trip length and usage.</p></article><article><span>03</span><strong>The fine print</strong><p>Validity, compatibility and affiliate status made visible.</p></article></section>

      <p className="sr-only" aria-live="polite">{hasCompared ? `${suggestionCount} comparison options loaded` : ""}</p>
      <section className={`results-section ${hasCompared ? "is-visible" : ""}`} id="results">
        <div className="section-heading"><div><p className="eyebrow">Your comparison</p><h2 ref={resultsHeadingRef} tabIndex={-1}>{days} {days === 1 ? "day" : "days"} in {activeDestination.name} · plan for about {neededData}GB</h2></div><div className="result-actions"><button className="text-button" type="button" onClick={shareComparison}>Share comparison ↗</button><button className="text-button" type="button" onClick={() => document.querySelector("#compare")?.scrollIntoView({ behavior: "smooth" })}>Change trip details ↑</button>{shareStatus && <span role="status">{shareStatus}</span>}</div></div>

        <div className={`results-compatibility ${compatibility}`}><span aria-hidden="true">{compatibility === "ready" ? "✓" : compatibility === "blocked" ? "!" : "?"}</span><div><strong>{compatibility === "ready" ? "Your phone looks eSIM-ready" : compatibility === "blocked" ? "Pause before purchasing" : "Compatibility not confirmed"}</strong><p>{compatibility === "ready" ? "Still verify the exact regional model before checkout." : compatibility === "blocked" ? "Your answers indicate an eSIM may not work on this phone." : "Use the compatibility check above before choosing a plan."}</p></div></div>

        <div className={`roaming-banner ${roaming.cost === null ? "needs-input" : ""}`}>
          <div className="network-badge">{networkNames[network].slice(0, 2).toUpperCase()}</div>
          <div><span className="overline">Your current network</span><h3>{roaming.title}</h3><p>{roaming.detail} {roaming.caveat}</p></div>
          <div className="roaming-price"><strong>{roaming.cost === null ? "Check plan" : money.format(roaming.cost)}</strong><span>{roaming.cost === null ? "before comparing" : roaming.comparable ? "estimated trip cost" : "price estimate · allowance check needed"}</span></div>
        </div>

        {bestPricedPlan && destination === "turkey" && <div className="decision-card"><div><span className="decision-label">Best priced fit</span><h3>{bestPricedPlan.provider} · {bestPricedPlan.plan.name}</h3><p>Enough data for this trip based on your selected usage. Compare the live checkout against your network total before buying.</p></div><div className="decision-price"><small>Snapshot total</small><strong>≈ {money.format(bestPricedPlan.plan.gbpTotal!)}</strong>{canCompareSavings && roaming.cost !== null && roaming.cost - bestPricedPlan.plan.gbpTotal! > 0.5 && <span>About {money.format(roaming.cost - bestPricedPlan.plan.gbpTotal!)} less than roaming</span>}</div><a href={getProviderUrl(bestPricedPlan.provider, activeDestination)} target="_blank" rel={providerDetails[bestPricedPlan.provider].affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}>Check live price <span aria-hidden="true">↗</span></a></div>}

        <aside className="travel-alert"><span aria-hidden="true">!</span><div><strong>Buy and install before you fly</strong><p>{destination === "turkey" ? "Some provider websites and apps have limited access in Turkey. Airalo says purchases are currently unavailable there, while Saily warns its app may be restricted. Install on reliable Wi-Fi before departure and save the QR code." : `Install your ${activeDestination.name} eSIM on reliable Wi-Fi before departure, keep it switched off until arrival and save any QR code or manual setup details.`}</p></div></aside>

        <div className="results-toolbar"><p><strong>{destination === "turkey" ? `${suggestionCount} suitable plan options` : `${groupedPlans.length} live catalogues`}</strong> across {groupedPlans.length} providers</p><span>{destination === "turkey" ? "Priced options ordered by approximate trip total" : "No stored prices for this destination yet"}</span></div>
        <div className="provider-list">
          {groupedPlans.map(({ provider, matches }) => {
            const details = providerDetails[provider];
            const providerUrl = getProviderUrl(provider, activeDestination);
            return (
              <article className={`provider-card ${bestPricedPlan?.provider === provider && destination === "turkey" ? "top-pick" : ""}`} key={provider}>
                <header className="provider-header">
                  <div className="provider-main"><div className="provider-logo" style={{ background: details.accent }}>{details.initials}</div><div><div className="provider-name-row"><h3>{provider}</h3>{details.affiliate && <span className="affiliate-badge">Affiliate relationship</span>}</div><p>{details.summary}</p></div></div>
                </header>
                <div className="plan-list">
                  {matches.map((plan, planIndex) => {
                    const delta = canCompareSavings && roaming.cost !== null && plan.gbpTotal !== null ? roaming.cost - plan.gbpTotal : null;
                    return (
                      <div className="plan-row" key={plan.id}>
                        <div className="plan-copy"><div><strong>{plan.name}</strong>{planIndex === 0 && <span className="fit-badge">{plan.catalogueOnly ? "Live provider search" : "Lowest suitable snapshot"}</span>}</div><p>{plan.catalogueOnly ? `Browse current ${activeDestination.name} allowances and durations` : `${plan.unlimited ? "Unlimited data" : plan.dailyDataGb ? `${plan.dailyDataGb}GB high-speed data each day` : `${plan.suppliedData}GB supplied`} · ${plan.speed}`}</p><small>{plan.catalogueOnly ? plan.note : `${plan.packs > 1 ? `${plan.packs} packs estimated for ${days} days` : `${plan.validity}-day validity`} · ${plan.network} · ${plan.note}`}</small></div>
                        <div className="plan-decision"><div className="price-block"><span>{plan.catalogueOnly ? "Live price only" : plan.nativeTotal === null ? "Price unavailable" : `${nativeMoney(plan.nativeTotal, plan.currency!)} snapshot`}</span><strong>{plan.gbpTotal === null ? "Check price" : `≈ ${money.format(plan.gbpTotal)}`}</strong>{delta !== null && delta > 0.5 && <small>About {money.format(delta)} less than roaming</small>}{delta !== null && delta < -0.5 && <small className="negative">Roaming may cost {money.format(Math.abs(delta))} less</small>}</div><a className="deal-button" href={providerUrl} target="_blank" rel={details.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"} aria-label={`Check ${provider} ${plan.name} live price (opens in a new tab)`}>Check live <span aria-hidden="true">↗</span></a></div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <p className="results-disclaimer">{destination === "turkey" ? "Provider snapshots were manually checked on 15 August 2026 in the currencies shown. GBP figures use rounded reference rates (€1 ≈ £0.85 and $1 ≈ £0.75), so card and checkout totals can differ. Klook’s live price is not scraped. Rankings use only the approximate total needed for your duration and data target; commission does not change the order." : `RoamCompare does not store eSIM prices for ${activeDestination.name} yet. These links open each provider’s live catalogue so no price is guessed. Enter your network’s current total above to keep the comparison useful while approved data feeds are pending.`} Savings are shown only when your UK-SIM days cover the full trip and the selected roaming route can meet the same data target. Always confirm price, coverage, validity, fair-use terms and activation at checkout.</p>
      </section>

      <section className="methodology-section" id="methodology">
        <div className="methodology-intro"><p className="eyebrow">Receipts, not guesses</p><h2>Every number shows its assumptions.</h2><p>Turkey has dated price snapshots and sourced UK roaming maths. The other destinations use live catalogue handoffs until approved feeds arrive, so missing prices are never guessed.</p><div className="data-status"><span><i className="fresh" />Turkey roaming rules checked <strong>{ROAMING_CHECKED}</strong></span><span><i />Turkey eSIM prices checked <strong>{DATA_CHECKED}</strong></span><span><i className="manual" />Other destinations <strong>live catalogue links</strong></span><span><i className="manual" />Live APIs <strong>not connected</strong></span></div></div>
        <details className="source-register"><summary>View the full source register <span>14 receipts</span></summary><div className="source-grid">
          <a href="https://ee.co.uk/content/dam/help/terms-and-conditions/price-plans/mobile/pay-monthly-price-plans/ee-mobile-plan-price-guide-04082026.pdf" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>EE price guide</strong><small>Turkey: RoW Zone 1 · checked 15 Aug 2026</small></a>
          <a href="https://www.o2.co.uk/international/o2-travel" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>O2 Travel</strong><small>£7/day Turkey bolt-on · checked 15 Aug 2026</small></a>
          <a href="https://www.vodafone.co.uk/mobile/global-roaming" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>Vodafone checker</strong><small>Plan-specific Turkey pricing · checked 15 Aug 2026</small></a>
          <a href="https://www.three.co.uk/support/roaming-and-calling-abroad/roaming-abroad/go-roam" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>Three Go Roam</strong><small>Turkey: Around the World Extra · checked 15 Aug 2026</small></a>
          <a href="https://www.idmobile.co.uk/help-and-support/roaming" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>iD Mobile Roam Beyond</strong><small>Turkey data add-ons · checked 16 Aug 2026</small></a>
          <a href="https://www.sky.com/help/articles/sky-mobile-roaming" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>Sky Passport Plus</strong><small>£2 per 24 hours · checked 16 Aug 2026</small></a>
          <a href="https://static.giffgaff.com/documents/roaming/row-zone-a/v1/roaming-row-zone-a.pdf" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>giffgaff Zone A</strong><small>Turkey data 20p/MB · checked 16 Aug 2026</small></a>
          <a href="https://cdn.smarty.co.uk/files/SMARTY-Price-Guide.pdf" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>SMARTY price guide</strong><small>Band 1 data 10p/MB · checked 16 Aug 2026</small></a>
          <a href="https://www.voxi.co.uk/help/roaming-international/how-to-use-voxi-plan-abroad" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>VOXI roaming guide</strong><small>Turkey: Global Roaming Extra · checked 16 Aug 2026</small></a>
          <a href="https://www.tescomobile.com/help/roaming-and-international/roaming-charges-for-pay-as-you-go" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>Tesco Mobile PAYG</strong><small>Turkey: Region 2 · checked 16 Aug 2026</small></a>
          <a href="https://www.airalo.com/turkey-esim/merhaba-30days-20gb/" target="_blank" rel="noopener noreferrer"><span>eSIM catalogue</span><strong>Airalo Turkey</strong><small>USD snapshot · checked 15 Aug 2026</small></a>
          <a href="https://www.nomadesim.com/turkey-eSIM" target="_blank" rel="noopener noreferrer"><span>eSIM catalogue</span><strong>Nomad Turkey</strong><small>EUR snapshot · checked 15 Aug 2026</small></a>
          <a href="https://saily.com/esim-turkey/" target="_blank" rel="noopener noreferrer"><span>eSIM catalogue</span><strong>Saily Turkey</strong><small>EUR snapshot · checked 15 Aug 2026</small></a>
          <a href="https://data.ecb.europa.eu/currency-converter" target="_blank" rel="noopener noreferrer"><span>Currency</span><strong>ECB reference rates</strong><small>Rounded for indicative GBP totals</small></a>
        </div></details>
      </section>

      <section className="how-section" id="how-it-works">
        <div><p className="eyebrow">A safer setup</p><h2>Keep your UK number. Stop its data roaming.</h2></div>
        <ol className="steps"><li><span>01</span><strong>Install at home</strong><p>Buy before departure, install on Wi-Fi and keep the new line switched off until arrival.</p></li><li><span>02</span><strong>Choose the data line</strong><p>Set the travel eSIM as Mobile Data and disable data switching so your UK SIM cannot take over.</p></li><li><span>03</span><strong>Keep texts available</strong><p>Leave the UK line on for banking texts if needed, but turn off its data roaming and avoid chargeable calls.</p></li></ol>
      </section>

      <section className="faq-section" id="faq">
        <div><p className="eyebrow">Common questions</p><h2>Before you pick a plan.</h2></div>
        <div className="faq-list">
          <details><summary>Are these live prices?</summary><p>Turkey has manually dated snapshots, while the other destinations link directly to provider catalogues and deliberately show no stored price. Klook is never assigned a guessed price. Approved provider APIs can replace both paths later.</p></details>
          <details><summary>Can one provider show several suggestions?</summary><p>Yes. The comparison can show multiple suitable plans from the same provider, including different data allowances, validity periods and daily-data options.</p></details>
          <details><summary>How does the eSIM compatibility check work?</summary><p>It is a self-check, not device detection. Your phone must support eSIM and be network-unlocked. Confirm the exact regional model with its manufacturer before buying.</p></details>
          <details><summary>Why can roaming be cheaper?</summary><p>Some contracts include Turkey, and Sky’s current daily pass can be competitive for short trips. The results show the difference instead of assuming an eSIM always wins.</p></details>
          <details><summary>Why should I install before travelling?</summary><p>Some travel-eSIM apps and websites can be restricted in Turkey. Buy, install and save any QR code while you still have reliable access in the UK.</p></details>
        </div>
      </section>

    </main>
      <footer><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">RC</span><span>RoamCompare</span></a><p>Independent comparisons for UK travellers · prices checked {DATA_CHECKED}</p><div className="footer-links"><a href="/about">About & disclosure</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></footer>
    </>
  );
}
