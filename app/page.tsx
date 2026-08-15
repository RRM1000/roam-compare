"use client";

import { useMemo, useState } from "react";

type Usage = "light" | "everyday" | "heavy";
type Network = "ee" | "o2" | "vodafone" | "three";
type Device = "unknown" | "iphone" | "samsung" | "pixel" | "other" | "unsupported";
type LockStatus = "unknown" | "unlocked" | "locked";
type Currency = "EUR" | "USD";
type Provider = "Airalo" | "Klook" | "Nomad" | "Saily";

type Plan = {
  id: string;
  provider: Provider;
  name: string;
  dataGb?: number;
  dailyDataGb?: number;
  unlimited?: boolean;
  validity: number;
  price: number | null;
  currency?: Currency;
  speed: string;
  network: string;
  note: string;
};

type RoamingResult = {
  cost: number | null;
  title: string;
  detail: string;
  caveat: string;
};

const networkNames: Record<Network, string> = {
  ee: "EE",
  o2: "O2",
  vodafone: "Vodafone",
  three: "Three",
};

const defaultScenario: Record<Network, string> = {
  ee: "ee-current",
  o2: "o2-travel",
  vodafone: "vodafone-check",
  three: "three-new",
};

const scenarioOptions: Record<Network, Array<{ value: string; label: string }>> = {
  ee: [
    { value: "ee-current", label: "Current EE RoW Zone 1 passes" },
    { value: "included", label: "Roaming is included in my plan" },
    { value: "custom", label: "Enter my own trip cost" },
  ],
  o2: [
    { value: "o2-travel", label: "O2 Travel — £7 on days used" },
    { value: "included", label: "O2 Travel is included in my plan" },
    { value: "custom", label: "Enter my own trip cost" },
  ],
  vodafone: [
    { value: "vodafone-check", label: "I need to check my Vodafone plan" },
    { value: "included", label: "Turkey is included in my plan" },
    { value: "custom", label: "Enter my Vodafone trip cost" },
  ],
  three: [
    { value: "three-new", label: "Joined/upgraded from 18 Dec 2025 — £8/day" },
    { value: "three-older", label: "Joined/upgraded 1 Oct 2021–17 Dec 2025 — £7/day" },
    { value: "included", label: "Go Roam is included in my plan" },
    { value: "custom", label: "Enter my own trip cost" },
  ],
};

const providerDetails: Record<Provider, { accent: string; initials: string; affiliate: boolean; url: string; summary: string }> = {
  Airalo: { accent: "#e63f78", initials: "AI", affiliate: false, url: "https://www.airalo.com/turkey-esim/merhaba-30days-20gb/", summary: "Fixed-data and unlimited Turkey plans" },
  Klook: { accent: "#ff5b47", initials: "KL", affiliate: true, url: process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL ?? "https://www.klook.com/en-GB/activity/128551-turkey-esim-high-speed-internet-qr-code-voucher/", summary: "Daily-data choices with flexible trip lengths" },
  Nomad: { accent: "#3455db", initials: "NO", affiliate: false, url: "https://www.nomadesim.com/turkey-eSIM", summary: "Fixed-data and unlimited Turkey plans" },
  Saily: { accent: "#6437e8", initials: "SA", affiliate: false, url: "https://saily.com/esim-turkey/", summary: "Fixed-data plans with unrestricted hotspot use" },
};

const plans: Plan[] = [
  { id: "airalo-1", provider: "Airalo", name: "1GB", dataGb: 1, validity: 7, price: 4, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Data only · top-ups available" },
  { id: "airalo-2", provider: "Airalo", name: "2GB", dataGb: 2, validity: 15, price: 5.5, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Data only · top-ups available" },
  { id: "airalo-3", provider: "Airalo", name: "3GB", dataGb: 3, validity: 30, price: 6.5, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Data only · top-ups available" },
  { id: "airalo-5", provider: "Airalo", name: "5GB", dataGb: 5, validity: 30, price: 10, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Data only · top-ups available" },
  { id: "airalo-10", provider: "Airalo", name: "10GB", dataGb: 10, validity: 30, price: 15.5, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Data only · top-ups available" },
  { id: "airalo-20", provider: "Airalo", name: "20GB", dataGb: 20, validity: 30, price: 22.5, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Data only · top-ups available" },
  { id: "airalo-unlimited", provider: "Airalo", name: "Unlimited", unlimited: true, validity: 10, price: 35, currency: "USD", speed: "4G / 5G", network: "Türk Telekom (Avea)", note: "Fair-use limits may apply" },
  { id: "klook-1gb-daily", provider: "Klook", name: "1GB per day", dailyDataGb: 1, validity: 30, price: null, speed: "5G / 4G", network: "Türk Telekom", note: "Choose 1–30 days on Klook" },
  { id: "klook-2gb-daily", provider: "Klook", name: "2GB per day", dailyDataGb: 2, validity: 30, price: null, speed: "5G / 4G", network: "Türk Telekom", note: "Better for video and hotspot use" },
  { id: "klook-unlimited", provider: "Klook", name: "Unlimited daily data", unlimited: true, validity: 30, price: null, speed: "5G / 4G", network: "Türk Telekom", note: "Fair-use speed limits may apply" },
  { id: "nomad-1", provider: "Nomad", name: "1GB", dataGb: 1, validity: 7, price: 3.46, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-3", provider: "Nomad", name: "3GB", dataGb: 3, validity: 30, price: 5.19, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-5", provider: "Nomad", name: "5GB", dataGb: 5, validity: 30, price: 7.79, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Sale price when checked" },
  { id: "nomad-10", provider: "Nomad", name: "10GB", dataGb: 10, validity: 30, price: 11.25, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-20", provider: "Nomad", name: "20GB", dataGb: 20, validity: 30, price: 17.31, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-50", provider: "Nomad", name: "50GB", dataGb: 50, validity: 30, price: 26.84, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "Hotspot supported" },
  { id: "nomad-unlimited-5", provider: "Nomad", name: "Unlimited", unlimited: true, validity: 5, price: 14.72, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "High-speed allowance resets daily" },
  { id: "nomad-unlimited-10", provider: "Nomad", name: "Unlimited", unlimited: true, validity: 10, price: 24.24, currency: "EUR", speed: "4G / 5G", network: "Avea", note: "High-speed allowance resets daily" },
  { id: "saily-1", provider: "Saily", name: "1GB", dataGb: 1, validity: 7, price: 3.49, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
  { id: "saily-3", provider: "Saily", name: "3GB", dataGb: 3, validity: 30, price: 5.99, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
  { id: "saily-5", provider: "Saily", name: "5GB", dataGb: 5, validity: 30, price: 8.99, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
  { id: "saily-10", provider: "Saily", name: "10GB", dataGb: 10, validity: 30, price: 13.99, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
  { id: "saily-20", provider: "Saily", name: "20GB", dataGb: 20, validity: 30, price: 20.49, currency: "EUR", speed: "3G / 4G / 5G", network: "Partner networks", note: "No hotspot restrictions" },
];

const usagePerDay: Record<Usage, number> = { light: 0.35, everyday: 0.8, heavy: 2 };
const tripLengths = [...Array.from({ length: 30 }, (_, index) => index + 1), 45, 60, 90];
const gbpRates: Record<Currency, number> = { EUR: 0.85, USD: 0.75 };
const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

function nativeMoney(value: number, currency: Currency) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
}

function getEePasses(days: number) {
  let best = { cost: Number.POSITIVE_INFINITY, daily: 0, weekly: 0, fortnight: 0, covered: 0 };
  for (let fortnight = 0; fortnight <= Math.ceil(days / 15); fortnight += 1) {
    for (let weekly = 0; weekly <= Math.ceil(days / 7); weekly += 1) {
      const daily = Math.max(0, days - fortnight * 15 - weekly * 7);
      const cost = fortnight * 50 + weekly * 30 + daily * 6;
      const covered = fortnight * 15 + weekly * 7 + daily;
      if (cost < best.cost || (cost === best.cost && covered < best.covered)) best = { cost, daily, weekly, fortnight, covered };
    }
  }
  const parts = [best.fortnight ? `${best.fortnight} × 15-day` : "", best.weekly ? `${best.weekly} × 7-day` : "", best.daily ? `${best.daily} × 24-hour` : ""].filter(Boolean);
  return { cost: best.cost, label: parts.join(" + ") };
}

function getRoamingResult(network: Network, scenario: string, roamingDays: number, customCost: string): RoamingResult {
  if (scenario === "included") return { cost: 0, title: "Roaming appears to be included", detail: "No extra roaming fee entered for this trip.", caveat: "Fair-use limits and excluded activities can still apply. Confirm in your network app." };
  if (scenario === "custom") {
    const parsed = Number(customCost);
    return { cost: customCost !== "" && Number.isFinite(parsed) && parsed >= 0 ? parsed : null, title: "Your own roaming estimate", detail: "Based on the total trip cost you entered.", caveat: "Confirm what data, calls and texts that price includes." };
  }
  if (scenario === "ee-current") {
    const passes = getEePasses(roamingDays);
    return { cost: passes.cost, title: "EE RoW Zone 1 pass estimate", detail: `${passes.label} covers ${roamingDays} consecutive roaming ${roamingDays === 1 ? "day" : "days"}.`, caveat: "Uses your UK allowance. EE lists Turkey in RoW Zone 1; pass timing is measured from purchase." };
  }
  if (scenario === "o2-travel") return { cost: roamingDays * 7, title: "O2 Travel estimate", detail: `£7 × ${roamingDays} ${roamingDays === 1 ? "day" : "days"} when you use calls, texts or data.`, caveat: "O2 states unlimited minutes, texts and data, with data speed capped at 2Mbps." };
  if (scenario === "three-new") return { cost: roamingDays * 8, title: "Three Go Roam Extra estimate", detail: `£8 × ${roamingDays} ${roamingDays === 1 ? "day" : "days"}.`, caveat: "For plans joined or upgraded from 18 December 2025. Up to 12GB; hotspot use is not allowed in Go Roam Extra destinations." };
  if (scenario === "three-older") return { cost: roamingDays * 7, title: "Three Go Roam Extra estimate", detail: `£7 × ${roamingDays} ${roamingDays === 1 ? "day" : "days"}.`, caveat: "For most plans joined or upgraded 1 October 2021–17 December 2025. Exceptions exist; check My3." };
  return { cost: null, title: "Check your Vodafone plan first", detail: "Vodafone personalises Turkey roaming by mobile number and plan.", caveat: "Turkey is in Vodafone’s Global Roam group, but it may be included or chargeable. Use Vodafone’s checker, then enter the total above." };
}

function getPlanMatch(plan: Plan, days: number, neededData: number) {
  const packsForTime = Math.ceil(days / plan.validity);
  const packsForData = plan.unlimited || plan.dailyDataGb ? 1 : Math.ceil(neededData / (plan.dataGb ?? 1));
  const packs = Math.max(packsForTime, packsForData);
  const suppliedData = plan.unlimited ? Number.POSITIVE_INFINITY : plan.dailyDataGb ? plan.dailyDataGb * days : (plan.dataGb ?? 0) * packs;
  const nativeTotal = plan.price === null ? null : plan.price * packs;
  const gbpTotal = nativeTotal === null || !plan.currency ? null : nativeTotal * gbpRates[plan.currency];
  return { ...plan, packs, suppliedData, nativeTotal, gbpTotal };
}

export default function Home() {
  const [days, setDays] = useState(7);
  const [roamingDays, setRoamingDays] = useState(7);
  const [network, setNetwork] = useState<Network>("ee");
  const [scenario, setScenario] = useState(defaultScenario.ee);
  const [customCost, setCustomCost] = useState("");
  const [usage, setUsage] = useState<Usage>("everyday");
  const [hasCompared, setHasCompared] = useState(false);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [device, setDevice] = useState<Device>("unknown");
  const [lockStatus, setLockStatus] = useState<LockStatus>("unknown");

  const neededData = Math.max(1, Math.ceil(days * usagePerDay[usage]));
  const roaming = getRoamingResult(network, scenario, roamingDays, customCost);
  const compatibility = device === "unsupported" || lockStatus === "locked" ? "blocked" : device !== "unknown" && lockStatus === "unlocked" ? "ready" : "unknown";

  const groupedPlans = useMemo(() => {
    return (Object.keys(providerDetails) as Provider[]).map((provider) => {
      const matches = plans.filter((plan) => plan.provider === provider).map((plan) => getPlanMatch(plan, days, neededData)).filter((plan) => plan.suppliedData >= neededData).sort((a, b) => (a.gbpTotal ?? Number.POSITIVE_INFINITY) - (b.gbpTotal ?? Number.POSITIVE_INFINITY) || a.suppliedData - b.suppliedData).slice(0, provider === "Klook" ? 3 : 2);
      return { provider, matches, bestPrice: matches[0]?.gbpTotal ?? Number.POSITIVE_INFINITY };
    }).filter((group) => group.matches.length > 0).sort((a, b) => a.bestPrice - b.bestPrice);
  }, [days, neededData]);

  const suggestionCount = groupedPlans.reduce((total, group) => total + group.matches.length, 0);

  function updateDays(nextDays: number) {
    setDays(nextDays);
    setRoamingDays(nextDays);
  }

  function updateNetwork(nextNetwork: Network) {
    setNetwork(nextNetwork);
    setScenario(defaultScenario[nextNetwork]);
    setCustomCost("");
  }

  function compare() {
    setHasCompared(true);
    window.setTimeout(() => document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <main>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="RoamCompare home"><span className="brand-mark">RC</span><span>RoamCompare</span></a>
        <div className="nav-actions"><span className="nav-note">Built for UK travellers</span><a href="#methodology">Our data</a><a href="#how-it-works">How it works</a></div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">UK → Turkey · roaming vs eSIM</p>
          <h1>Know the roaming cost before take-off.</h1>
          <p className="hero-lede">Compare your UK network’s Turkey roaming route with eSIM plans sized for your trip—using dated sources, transparent assumptions and no mystery prices.</p>
          <div className="trust-row" aria-label="Service benefits"><span>UK network rules</span><span>Approximate prices in GBP</span><span>No account needed</span></div>
        </div>

        <div className="compare-card" aria-labelledby="compare-title">
          <div className="card-heading"><span className="step-pill">Takes under a minute</span><h2 id="compare-title">What does your trip look like?</h2></div>
          <div className="field-grid">
            <label className="field field-wide"><span>Where are you going?</span><select defaultValue="turkey" aria-label="Destination"><option value="turkey">🇹🇷 Turkey</option></select></label>
            <label className="field"><span>Trip length</span><select value={days} onChange={(event) => updateDays(Number(event.target.value))} aria-label="Trip length">{tripLengths.map((length) => <option value={length} key={length}>{length} {length === 1 ? "day" : "days"}</option>)}</select></label>
            <label className="field"><span>Days using your UK SIM</span><select value={roamingDays} onChange={(event) => setRoamingDays(Number(event.target.value))} aria-label="Days using UK SIM">{Array.from({ length: days }, (_, index) => index + 1).map((length) => <option value={length} key={length}>{length} {length === 1 ? "day" : "days"}</option>)}</select></label>
            <label className="field"><span>Your UK network</span><select value={network} onChange={(event) => updateNetwork(event.target.value as Network)} aria-label="UK mobile network">{Object.entries(networkNames).map(([key, name]) => <option value={key} key={key}>{name}</option>)}</select></label>
            <label className="field"><span>Your roaming situation</span><select value={scenario} onChange={(event) => setScenario(event.target.value)} aria-label="Roaming plan situation">{scenarioOptions[network].map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>
            {scenario === "custom" && <label className="field field-wide"><span>Your total roaming cost for this trip (£)</span><input inputMode="decimal" min="0" step="0.01" type="number" value={customCost} onChange={(event) => setCustomCost(event.target.value)} placeholder="For example, 35" aria-label="Custom roaming cost for trip" /></label>}
          </div>

          <fieldset className="usage-field">
            <legend>How will you use your phone?</legend>
            <div className="usage-options">{([["light", "Light", "Maps & messages"], ["everyday", "Everyday", "Social & browsing"], ["heavy", "Heavy", "Video & hotspot"]] as const).map(([value, title, detail]) => (
              <label key={value}><input type="radio" name="usage" value={value} aria-label={`${title}: ${detail}`} checked={usage === value} onChange={() => setUsage(value)} /><span><strong>{title}</strong><small>{detail}</small></span></label>
            ))}</div>
          </fieldset>

          <button className={`compatibility-trigger ${compatibility}`} type="button" aria-expanded={showCompatibility} onClick={() => setShowCompatibility((shown) => !shown)}>
            <span><i aria-hidden="true" />{compatibility === "ready" ? "Likely eSIM-ready" : compatibility === "blocked" ? "Compatibility needs attention" : "Check whether your phone supports eSIM"}</span><b aria-hidden="true">{showCompatibility ? "−" : "+"}</b>
          </button>

          {showCompatibility && (
            <div className="compatibility-panel">
              <div className="compatibility-heading"><strong>Quick compatibility check</strong><small>We cannot inspect your phone, so confirm both items before buying.</small></div>
              <label className="field"><span>Your device</span><select value={device} onChange={(event) => setDevice(event.target.value as Device)} aria-label="Device compatibility group"><option value="unknown">I’m not sure</option><option value="iphone">iPhone XS, XR, SE (2nd gen) or newer</option><option value="samsung">Compatible Samsung Galaxy S, Z or A model</option><option value="pixel">Google Pixel 4 or newer</option><option value="other">Another device with “Add eSIM”</option><option value="unsupported">My phone does not have “Add eSIM”</option></select></label>
              <label className="field"><span>Is it unlocked?</span><select value={lockStatus} onChange={(event) => setLockStatus(event.target.value as LockStatus)} aria-label="Phone network lock status"><option value="unknown">I’m not sure</option><option value="unlocked">Yes, it is unlocked</option><option value="locked">No, it is network-locked</option></select></label>
              <div className={`compatibility-result ${compatibility}`}><strong>{compatibility === "ready" ? "Likely compatible" : compatibility === "blocked" ? "Do not buy an eSIM yet" : "Two checks still matter"}</strong><p>{compatibility === "ready" ? "Your answers suggest a travel eSIM should work. Regional device variants can differ, so verify with the manufacturer." : compatibility === "blocked" ? "Travel eSIMs need an eSIM-capable, unlocked phone. Ask your UK network about unlocking or use a physical travel SIM." : "Look for “Add eSIM” in your mobile settings and ask your UK network whether the handset is unlocked."}</p></div>
              <p className="manufacturer-links">Official checks: <a href="https://support.apple.com/en-gb/guide/iphone/iph9c5776d3c/ios" target="_blank" rel="noopener noreferrer">Apple</a> · <a href="https://www.samsung.com/uk/support/mobile-devices/galaxy-esim-and-supported-network-carriers/" target="_blank" rel="noopener noreferrer">Samsung</a> · <a href="https://support.google.com/pixelphone/answer/16115741?hl=en" target="_blank" rel="noopener noreferrer">Google Pixel</a></p>
            </div>
          )}

          <button className="primary-button" type="button" onClick={compare}>Compare my options <span aria-hidden="true">→</span></button>
          <p className="affiliate-note">Free to use. We may earn commission from marked links; price order is unaffected.</p>
        </div>
      </section>

      <section className={`results-section ${hasCompared ? "is-visible" : ""}`} id="results" aria-live="polite">
        <div className="section-heading"><div><p className="eyebrow">Your comparison</p><h2>{days} {days === 1 ? "day" : "days"} in Turkey · plan for about {neededData}GB</h2></div><button className="text-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Change trip details ↑</button></div>

        <div className={`results-compatibility ${compatibility}`}><span aria-hidden="true">{compatibility === "ready" ? "✓" : compatibility === "blocked" ? "!" : "?"}</span><div><strong>{compatibility === "ready" ? "Your phone looks eSIM-ready" : compatibility === "blocked" ? "Pause before purchasing" : "Compatibility not confirmed"}</strong><p>{compatibility === "ready" ? "Still verify the exact regional model before checkout." : compatibility === "blocked" ? "Your answers indicate an eSIM may not work on this phone." : "Use the compatibility check above before choosing a plan."}</p></div></div>

        <div className={`roaming-banner ${roaming.cost === null ? "needs-input" : ""}`}>
          <div className="network-badge">{networkNames[network].slice(0, 2).toUpperCase()}</div>
          <div><span className="overline">Your current network</span><h3>{roaming.title}</h3><p>{roaming.detail} {roaming.caveat}</p></div>
          <div className="roaming-price"><strong>{roaming.cost === null ? "Check plan" : money.format(roaming.cost)}</strong><span>{roaming.cost === null ? "before comparing" : "estimated trip cost"}</span></div>
        </div>

        <aside className="travel-alert"><span aria-hidden="true">!</span><div><strong>Buy and install before you fly</strong><p>Some provider websites and apps have limited access in Turkey. Airalo says purchases are currently unavailable there, while Saily warns its app may be restricted. Install on reliable Wi-Fi before departure and save the QR code.</p></div></aside>

        <div className="results-toolbar"><p><strong>{suggestionCount} suitable plan options</strong> across {groupedPlans.length} providers</p><span>Priced options ordered by approximate trip total</span></div>
        <div className="provider-list">
          {groupedPlans.map(({ provider, matches }) => {
            const details = providerDetails[provider];
            return (
              <article className="provider-card" key={provider}>
                <header className="provider-header">
                  <div className="provider-main"><div className="provider-logo" style={{ background: details.accent }}>{details.initials}</div><div><div className="provider-name-row"><h3>{provider}</h3>{details.affiliate && <span className="affiliate-badge">Affiliate partner</span>}</div><p>{details.summary}</p></div></div>
                  <a className="provider-link" href={details.url} target="_blank" rel={details.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}>Check live catalogue ↗</a>
                </header>
                <div className="plan-list">
                  {matches.map((plan, planIndex) => {
                    const delta = roaming.cost !== null && plan.gbpTotal !== null ? roaming.cost - plan.gbpTotal : null;
                    return (
                      <div className="plan-row" key={plan.id}>
                        <div className="plan-copy"><div><strong>{plan.name}</strong>{planIndex === 0 && <span className="fit-badge">Lowest suitable snapshot</span>}</div><p>{plan.unlimited ? "Unlimited data" : plan.dailyDataGb ? `${plan.dailyDataGb}GB high-speed data each day` : `${plan.suppliedData}GB supplied`} · {plan.speed}</p><small>{plan.packs > 1 ? `${plan.packs} packs estimated for ${days} days` : `${plan.validity}-day validity`} · {plan.network} · {plan.note}</small></div>
                        <div className="plan-decision"><div className="price-block"><span>{plan.nativeTotal === null ? "Price unavailable" : `${nativeMoney(plan.nativeTotal, plan.currency!)} snapshot`}</span><strong>{plan.gbpTotal === null ? "Check price" : `≈ ${money.format(plan.gbpTotal)}`}</strong>{delta !== null && delta > 0.5 && <small>About {money.format(delta)} less than roaming</small>}{delta !== null && delta < -0.5 && <small className="negative">Roaming may cost {money.format(Math.abs(delta))} less</small>}</div><a className="deal-button" href={details.url} target="_blank" rel={details.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"} aria-label={`Check ${provider} ${plan.name} live price (opens in a new tab)`}>Check live <span aria-hidden="true">↗</span></a></div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <p className="results-disclaimer">Provider snapshots were manually checked on 15 August 2026 in the currencies shown. GBP figures use rounded reference rates (€1 ≈ £0.85 and $1 ≈ £0.75), so card and checkout totals can differ. Klook’s live price is not scraped. Rankings use only the approximate total needed for your duration and data target; commission does not change the order. Always confirm price, validity, fair-use terms and activation at checkout.</p>
      </section>

      <section className="methodology-section" id="methodology">
        <div className="methodology-intro"><p className="eyebrow">Receipts, not guesses</p><h2>Every estimate shows its assumptions.</h2><p>Network rules and provider catalogues change. These are dated snapshots with direct source links, ready to be replaced by approved partner feeds when access arrives.</p></div>
        <div className="source-grid">
          <a href="https://ee.co.uk/content/dam/help/terms-and-conditions/price-plans/mobile/pay-monthly-price-plans/ee-mobile-plan-price-guide-04082026.pdf" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>EE price guide</strong><small>Turkey: RoW Zone 1 · checked 15 Aug 2026</small></a>
          <a href="https://www.o2.co.uk/international/o2-travel" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>O2 Travel</strong><small>£7/day Turkey bolt-on · checked 15 Aug 2026</small></a>
          <a href="https://www.vodafone.co.uk/mobile/global-roaming" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>Vodafone checker</strong><small>Plan-specific Turkey pricing · checked 15 Aug 2026</small></a>
          <a href="https://www.three.co.uk/support/roaming-and-calling-abroad/roaming-abroad/go-roam" target="_blank" rel="noopener noreferrer"><span>UK roaming</span><strong>Three Go Roam</strong><small>Turkey: Around the World Extra · checked 15 Aug 2026</small></a>
          <a href="https://www.airalo.com/turkey-esim/merhaba-30days-20gb/" target="_blank" rel="noopener noreferrer"><span>eSIM catalogue</span><strong>Airalo Turkey</strong><small>USD snapshot · checked 15 Aug 2026</small></a>
          <a href="https://www.nomadesim.com/turkey-eSIM" target="_blank" rel="noopener noreferrer"><span>eSIM catalogue</span><strong>Nomad Turkey</strong><small>EUR snapshot · checked 15 Aug 2026</small></a>
          <a href="https://saily.com/esim-turkey/" target="_blank" rel="noopener noreferrer"><span>eSIM catalogue</span><strong>Saily Turkey</strong><small>EUR snapshot · checked 15 Aug 2026</small></a>
          <a href="https://data.ecb.europa.eu/currency-converter" target="_blank" rel="noopener noreferrer"><span>Currency</span><strong>ECB reference rates</strong><small>Rounded for indicative GBP totals</small></a>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div><p className="eyebrow">A safer setup</p><h2>Keep your UK number. Stop its data roaming.</h2></div>
        <ol className="steps"><li><span>01</span><strong>Install at home</strong><p>Buy before departure, install on Wi-Fi and keep the new line switched off until arrival.</p></li><li><span>02</span><strong>Choose the data line</strong><p>Set the travel eSIM as Mobile Data and disable data switching so your UK SIM cannot take over.</p></li><li><span>03</span><strong>Keep texts available</strong><p>Leave the UK line on for banking texts if needed, but turn off its data roaming and avoid chargeable calls.</p></li></ol>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">RC</span><span>RoamCompare</span></a><p>Independent comparisons for UK travellers · prices checked 15 August 2026</p></footer>
    </main>
  );
}
