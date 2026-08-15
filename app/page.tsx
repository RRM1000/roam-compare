"use client";

import { useMemo, useState } from "react";

type Usage = "light" | "everyday" | "heavy";
type Network = "ee" | "o2" | "vodafone" | "three";
type Device = "unknown" | "iphone" | "samsung" | "pixel" | "other" | "unsupported";
type LockStatus = "unknown" | "unlocked" | "locked";

type Plan = {
  id: string;
  provider: "Klook" | "Nomad" | "Saily" | "Airalo";
  name: string;
  dataGb?: number;
  dailyDataGb?: number;
  validity: number;
  price: number | null;
  speed: string;
  network: string;
  note?: string;
};

const networks: Record<Network, { name: string; daily: number }> = {
  ee: { name: "EE", daily: 8 },
  o2: { name: "O2", daily: 7 },
  vodafone: { name: "Vodafone", daily: 8 },
  three: { name: "Three", daily: 7 },
};

const providerDetails = {
  Klook: { accent: "#ff5b47", initials: "KL", affiliate: true, url: process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL ?? "https://www.klook.com/en-GB/activity/128551-turkey-esim-high-speed-internet-qr-code-voucher/" },
  Nomad: { accent: "#3455db", initials: "NO", affiliate: false, url: "https://www.getnomad.app/turkey-eSIM" },
  Saily: { accent: "#6437e8", initials: "SA", affiliate: false, url: "https://saily.com/esim-turkey/" },
  Airalo: { accent: "#ee316d", initials: "AI", affiliate: false, url: "https://www.airalo.com/turkey-esim" },
} as const;

const plans: Plan[] = [
  { id: "klook-1gb-daily", provider: "Klook", name: "1GB per day", dailyDataGb: 1, validity: 30, price: null, speed: "5G / 4G", network: "Türk Telekom", note: "Choose 1–30 days on Klook" },
  { id: "klook-2gb-daily", provider: "Klook", name: "2GB per day", dailyDataGb: 2, validity: 30, price: null, speed: "5G / 4G", network: "Türk Telekom", note: "Better for video and hotspot use" },
  { id: "klook-unlimited", provider: "Klook", name: "Unlimited daily data", dailyDataGb: 15, validity: 30, price: null, speed: "5G / 4G", network: "Türk Telekom", note: "Fair-use speed limits may apply" },
  { id: "nomad-3", provider: "Nomad", name: "3GB plan", dataGb: 3, validity: 15, price: 7.5, speed: "4G / LTE", network: "Partner networks" },
  { id: "nomad-10", provider: "Nomad", name: "10GB plan", dataGb: 10, validity: 30, price: 14, speed: "4G / LTE", network: "Partner networks" },
  { id: "nomad-20", provider: "Nomad", name: "20GB plan", dataGb: 20, validity: 30, price: 22, speed: "4G / LTE", network: "Partner networks" },
  { id: "saily-3", provider: "Saily", name: "3GB plan", dataGb: 3, validity: 30, price: 7.99, speed: "4G / LTE", network: "Partner networks" },
  { id: "saily-10", provider: "Saily", name: "10GB plan", dataGb: 10, validity: 30, price: 13.99, speed: "4G / LTE", network: "Partner networks" },
  { id: "saily-20", provider: "Saily", name: "20GB plan", dataGb: 20, validity: 30, price: 23.99, speed: "4G / LTE", network: "Partner networks" },
  { id: "airalo-3", provider: "Airalo", name: "3GB plan", dataGb: 3, validity: 30, price: 8.5, speed: "4G / LTE", network: "Partner networks" },
  { id: "airalo-10", provider: "Airalo", name: "10GB plan", dataGb: 10, validity: 30, price: 14.5, speed: "4G / LTE", network: "Partner networks" },
  { id: "airalo-20", provider: "Airalo", name: "20GB plan", dataGb: 20, validity: 30, price: 25, speed: "4G / LTE", network: "Partner networks" },
];

const usagePerDay: Record<Usage, number> = { light: 0.35, everyday: 0.8, heavy: 2 };
const tripLengths = [...Array.from({ length: 30 }, (_, index) => index + 1), 45, 60, 90];
const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

function getPlanMatch(plan: Plan, days: number, neededData: number) {
  const packsForTime = Math.ceil(days / plan.validity);
  const packsForData = plan.dailyDataGb ? 1 : Math.ceil(neededData / (plan.dataGb ?? 1));
  const packs = plan.dailyDataGb ? packsForTime : Math.max(packsForTime, packsForData);
  const suppliedData = plan.dailyDataGb ? plan.dailyDataGb * days : (plan.dataGb ?? 0) * packs;
  return {
    ...plan,
    packs,
    suppliedData,
    totalPrice: plan.price === null ? null : plan.price * packs,
  };
}

export default function Home() {
  const [days, setDays] = useState(7);
  const [network, setNetwork] = useState<Network>("ee");
  const [usage, setUsage] = useState<Usage>("everyday");
  const [hasCompared, setHasCompared] = useState(false);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [device, setDevice] = useState<Device>("unknown");
  const [lockStatus, setLockStatus] = useState<LockStatus>("unknown");

  const neededData = Math.max(1, Math.ceil(days * usagePerDay[usage]));
  const roamingCost = networks[network].daily * days;
  const compatibility = device === "unsupported" || lockStatus === "locked"
    ? "blocked"
    : device !== "unknown" && lockStatus === "unlocked"
      ? "ready"
      : "unknown";

  const groupedPlans = useMemo(() => {
    return (Object.keys(providerDetails) as Array<keyof typeof providerDetails>).map((provider) => {
      const matches = plans
        .filter((plan) => plan.provider === provider)
        .map((plan) => getPlanMatch(plan, days, neededData))
        .filter((plan) => plan.suppliedData >= neededData)
        .sort((a, b) => {
          if (a.totalPrice === null && b.totalPrice === null) return a.suppliedData - b.suppliedData;
          if (a.totalPrice === null) return -1;
          if (b.totalPrice === null) return 1;
          return a.totalPrice - b.totalPrice;
        })
        .slice(0, provider === "Klook" ? 3 : 2);
      return { provider, matches };
    }).filter((group) => group.matches.length > 0);
  }, [days, neededData]);

  const suggestionCount = groupedPlans.reduce((total, group) => total + group.matches.length, 0);

  const compare = () => {
    setHasCompared(true);
    window.setTimeout(() => document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <main>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="RoamCompare home"><span className="brand-mark">RC</span><span>RoamCompare</span></a>
        <div className="nav-actions"><span className="nav-note">Built for UK travellers</span><a href="#how-it-works">How it works</a></div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">UK → Turkey · eSIM comparison</p>
          <h1>Land connected. Leave roaming shock at home.</h1>
          <p className="hero-lede">Compare a typical UK network roaming pass with travel eSIMs sized for your trip—priced in pounds, with the trade-offs in plain English.</p>
          <div className="trust-row" aria-label="Service benefits"><span>Independent order</span><span>Prices in GBP</span><span>No account needed</span></div>
        </div>

        <div className="compare-card" aria-labelledby="compare-title">
          <div className="card-heading"><span className="step-pill">Takes under a minute</span><h2 id="compare-title">What does your trip look like?</h2></div>
          <div className="field-grid">
            <label className="field field-wide"><span>Where are you going?</span><select defaultValue="turkey" aria-label="Destination"><option value="turkey">🇹🇷 Turkey</option></select></label>
            <label className="field"><span>Trip length</span><select value={days} onChange={(event) => setDays(Number(event.target.value))} aria-label="Trip length">{tripLengths.map((length) => <option value={length} key={length}>{length} {length === 1 ? "day" : "days"}</option>)}</select></label>
            <label className="field"><span>Your UK network</span><select value={network} onChange={(event) => setNetwork(event.target.value as Network)} aria-label="UK mobile network">{Object.entries(networks).map(([key, item]) => <option value={key} key={key}>{item.name}</option>)}</select></label>
          </div>

          <fieldset className="usage-field">
            <legend>How will you use your phone?</legend>
            <div className="usage-options">{([ ["light", "Light", "Maps & messages"], ["everyday", "Everyday", "Social & browsing"], ["heavy", "Heavy", "Video & hotspot"] ] as const).map(([value, title, detail]) => (
              <label key={value}><input type="radio" name="usage" value={value} aria-label={`${title}: ${detail}`} checked={usage === value} onChange={() => setUsage(value)} /><span><strong>{title}</strong><small>{detail}</small></span></label>
            ))}</div>
          </fieldset>

          <button className={`compatibility-trigger ${compatibility}`} type="button" aria-expanded={showCompatibility} onClick={() => setShowCompatibility((shown) => !shown)}>
            <span><i aria-hidden="true" />{compatibility === "ready" ? "Likely eSIM-ready" : compatibility === "blocked" ? "Compatibility needs attention" : "Check whether your phone supports eSIM"}</span><b aria-hidden="true">{showCompatibility ? "−" : "+"}</b>
          </button>

          {showCompatibility && (
            <div className="compatibility-panel">
              <div className="compatibility-heading"><strong>Quick compatibility check</strong><small>We cannot inspect your phone, so confirm both items before buying.</small></div>
              <label className="field"><span>Your device</span><select value={device} onChange={(event) => setDevice(event.target.value as Device)} aria-label="Device compatibility group">
                <option value="unknown">I’m not sure</option>
                <option value="iphone">iPhone XS, XR, SE (2nd gen) or newer</option>
                <option value="samsung">Compatible Samsung Galaxy S, Z or A model</option>
                <option value="pixel">Google Pixel 4 or newer</option>
                <option value="other">Another device with “Add eSIM”</option>
                <option value="unsupported">My phone does not have “Add eSIM”</option>
              </select></label>
              <label className="field"><span>Is it unlocked?</span><select value={lockStatus} onChange={(event) => setLockStatus(event.target.value as LockStatus)} aria-label="Phone network lock status"><option value="unknown">I’m not sure</option><option value="unlocked">Yes, it is unlocked</option><option value="locked">No, it is network-locked</option></select></label>
              <div className={`compatibility-result ${compatibility}`}>
                <strong>{compatibility === "ready" ? "Likely compatible" : compatibility === "blocked" ? "Do not buy an eSIM yet" : "Two checks still matter"}</strong>
                <p>{compatibility === "ready" ? "Your answers suggest a travel eSIM should work. Regional device variants can differ, so verify with the manufacturer." : compatibility === "blocked" ? "Travel eSIMs need an eSIM-capable, unlocked phone. Ask your UK network about unlocking or use a physical travel SIM." : "Look for “Add eSIM” in your mobile settings and ask your UK network whether the handset is unlocked."}</p>
              </div>
              <p className="manufacturer-links">Check official guidance: <a href="https://support.apple.com/en-gb/guide/iphone/iph9c5776d3c/ios" target="_blank" rel="noopener noreferrer">Apple</a> · <a href="https://www.samsung.com/uk/support/mobile-devices/galaxy-esim-and-supported-network-carriers/" target="_blank" rel="noopener noreferrer">Samsung</a> · <a href="https://support.google.com/pixelphone/answer/16115741?hl=en" target="_blank" rel="noopener noreferrer">Google Pixel</a></p>
            </div>
          )}

          <button className="primary-button" type="button" onClick={compare}>Compare my options <span aria-hidden="true">→</span></button>
          <p className="affiliate-note">Free to use. We may earn commission from marked links; rankings stay independent.</p>
        </div>
      </section>

      <section className={`results-section ${hasCompared ? "is-visible" : ""}`} id="results" aria-live="polite">
        <div className="section-heading"><div><p className="eyebrow">Your comparison</p><h2>{days} {days === 1 ? "day" : "days"} in Turkey · about {neededData}GB</h2></div><button className="text-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Change trip details ↑</button></div>

        <div className={`results-compatibility ${compatibility}`}><span aria-hidden="true">{compatibility === "ready" ? "✓" : compatibility === "blocked" ? "!" : "?"}</span><div><strong>{compatibility === "ready" ? "Your phone looks eSIM-ready" : compatibility === "blocked" ? "Pause before purchasing" : "Compatibility not confirmed"}</strong><p>{compatibility === "ready" ? "Still verify the exact regional model before checkout." : compatibility === "blocked" ? "Your answers indicate an eSIM may not work on this phone." : "Use the compatibility check above before choosing a plan."}</p></div></div>

        <div className="roaming-banner">
          <div className="network-badge">{networks[network].name.slice(0, 2).toUpperCase()}</div>
          <div><span className="overline">Your current network</span><h3>{networks[network].name} roaming could cost about {money.format(roamingCost)}</h3><p>Based on a typical {money.format(networks[network].daily)} daily travel pass used every day. Your plan may include roaming, so check before buying.</p></div>
          <div className="roaming-price"><strong>{money.format(roamingCost)}</strong><span>trip estimate</span></div>
        </div>

        <div className="results-toolbar"><p><strong>{suggestionCount} plan suggestions</strong> across {groupedPlans.length} providers</p><span>Best-fit plans shown first</span></div>
        <div className="provider-list">
          {groupedPlans.map(({ provider, matches }, providerIndex) => {
            const details = providerDetails[provider];
            return (
              <article className={`provider-card ${providerIndex === 0 ? "top-pick" : ""}`} key={provider}>
                {providerIndex === 0 && <span className="pick-ribbon">Most flexible options</span>}
                <header className="provider-header">
                  <div className="provider-main"><div className="provider-logo" style={{ background: details.accent }}>{details.initials}</div><div><div className="provider-name-row"><h3>{provider}</h3>{details.affiliate && <span className="affiliate-badge">Affiliate partner</span>}</div><p>{matches.length} suitable {matches.length === 1 ? "plan" : "plans"} for this trip</p></div></div>
                  <a className="provider-link" href={details.url} target="_blank" rel={details.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}>See all {provider} plans ↗</a>
                </header>
                <div className="plan-list">
                  {matches.map((plan, planIndex) => {
                    const saving = plan.totalPrice === null ? null : Math.max(0, roamingCost - plan.totalPrice);
                    return (
                      <div className="plan-row" key={plan.id}>
                        <div className="plan-copy"><div><strong>{plan.name}</strong>{planIndex === 0 && <span className="fit-badge">Best fit</span>}</div><p>{plan.dailyDataGb ? `${plan.dailyDataGb}GB high-speed data each day` : `${plan.suppliedData}GB total data`} · {plan.speed} · Hotspot</p><small>{plan.packs > 1 ? `${plan.packs} packs needed to cover ${days} days` : plan.note ?? `${plan.validity}-day validity`} · {plan.network}</small></div>
                        <div className="plan-decision"><div className="price-block"><span>{plan.totalPrice === null ? "Live price on provider" : plan.packs > 1 ? `${plan.packs} packs · example total` : "Example price"}</span><strong>{plan.totalPrice === null ? "Check price" : money.format(plan.totalPrice)}</strong>{saving !== null && <small>Save about {money.format(saving)} vs roaming</small>}</div><a className="deal-button" href={details.url} target="_blank" rel={details.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"} aria-label={`View ${provider} ${plan.name} (opens in a new tab)`}>View plan <span aria-hidden="true">↗</span></a></div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <p className="results-disclaimer">Klook prices are checked on its site rather than scraped. Other prototype prices are illustrative and can change with exchange rates, offers and plan choice. Always confirm the final price, allowance, device compatibility and activation rules on the provider’s site. For trips over 30 days, activate additional packs only when needed.</p>
      </section>

      <section className="how-section" id="how-it-works">
        <div><p className="eyebrow">A calmer way to compare</p><h2>Only the details that matter at the airport.</h2></div>
        <ol className="steps"><li><span>01</span><strong>Size your trip</strong><p>We turn duration and usage into a simple data estimate.</p></li><li><span>02</span><strong>Check your phone</strong><p>Confirm eSIM support and unlock status before buying.</p></li><li><span>03</span><strong>Compare plan choices</strong><p>See several suitable plans from each provider, not just one.</p></li></ol>
      </section>
      <footer><a className="brand" href="#top"><span className="brand-mark">RC</span><span>RoamCompare</span></a><p>Independent comparisons for UK travellers. Prices shown in GBP.</p></footer>
    </main>
  );
}
