"use client";

import { useMemo, useState } from "react";

type Usage = "light" | "everyday" | "heavy";
type Network = "ee" | "o2" | "vodafone" | "three";

const networks: Record<Network, { name: string; daily: number }> = {
  ee: { name: "EE", daily: 8 },
  o2: { name: "O2", daily: 7 },
  vodafone: { name: "Vodafone", daily: 8 },
  three: { name: "Three", daily: 7 },
};

const usagePerDay: Record<Usage, number> = { light: 0.35, everyday: 0.8, heavy: 2 };

const klookUrl = process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL ??
  "https://www.klook.com/en-GB/activity/128551-turkey-esim-high-speed-internet-qr-code-voucher/";

const providers = [
  { name: "Klook", accent: "#ff5b47", initials: "KL", price: 7.45, data: 10, validity: 30, network: "Türk Telekom", speed: "5G / 4G", url: klookUrl, affiliate: true },
  { name: "Nomad", accent: "#3455db", initials: "NO", price: 9.5, data: 10, validity: 30, network: "Partner networks", speed: "4G / LTE", url: "https://www.getnomad.app/turkey-eSIM", affiliate: false },
  { name: "Saily", accent: "#6437e8", initials: "SA", price: 13.99, data: 10, validity: 30, network: "Partner networks", speed: "4G / LTE", url: "https://saily.com/esim-turkey/", affiliate: false },
  { name: "Airalo", accent: "#ee316d", initials: "AI", price: 14.5, data: 10, validity: 30, network: "Partner networks", speed: "4G / LTE", url: "https://www.airalo.com/turkey-esim", affiliate: false },
] as const;

const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

export default function Home() {
  const [days, setDays] = useState(7);
  const [network, setNetwork] = useState<Network>("ee");
  const [usage, setUsage] = useState<Usage>("everyday");
  const [hasCompared, setHasCompared] = useState(false);
  const neededData = Math.max(1, Math.ceil(days * usagePerDay[usage]));
  const roamingCost = networks[network].daily * days;
  const suitableProviders = useMemo(() => providers.filter((provider) => provider.data >= neededData), [neededData]);

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
            <label className="field"><span>Trip length</span><select value={days} onChange={(event) => setDays(Number(event.target.value))} aria-label="Trip length">{[3, 7, 10, 14, 30].map((length) => <option value={length} key={length}>{length} days</option>)}</select></label>
            <label className="field"><span>Your UK network</span><select value={network} onChange={(event) => setNetwork(event.target.value as Network)} aria-label="UK mobile network">{Object.entries(networks).map(([key, item]) => <option value={key} key={key}>{item.name}</option>)}</select></label>
          </div>
          <fieldset className="usage-field">
            <legend>How will you use your phone?</legend>
            <div className="usage-options">{([ ["light", "Light", "Maps & messages"], ["everyday", "Everyday", "Social & browsing"], ["heavy", "Heavy", "Video & hotspot"] ] as const).map(([value, title, detail]) => (
              <label key={value}><input type="radio" name="usage" value={value} aria-label={`${title}: ${detail}`} checked={usage === value} onChange={() => setUsage(value)} /><span><strong>{title}</strong><small>{detail}</small></span></label>
            ))}</div>
          </fieldset>
          <button className="primary-button" type="button" onClick={compare}>Compare my options <span aria-hidden="true">→</span></button>
          <p className="affiliate-note">Free to use. We may earn commission from marked links; rankings stay independent.</p>
        </div>
      </section>

      <section className={`results-section ${hasCompared ? "is-visible" : ""}`} id="results" aria-live="polite">
        <div className="section-heading"><div><p className="eyebrow">Your comparison</p><h2>{days} days in Turkey · about {neededData}GB</h2></div><button className="text-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Change trip details ↑</button></div>
        <div className="roaming-banner">
          <div className="network-badge">{networks[network].name.slice(0, 2).toUpperCase()}</div>
          <div><span className="overline">Your current network</span><h3>{networks[network].name} roaming could cost about {money.format(roamingCost)}</h3><p>Based on a typical {money.format(networks[network].daily)} daily travel pass used every day. Your plan may include roaming, so check before buying.</p></div>
          <div className="roaming-price"><strong>{money.format(roamingCost)}</strong><span>trip estimate</span></div>
        </div>
        <div className="results-toolbar"><p><strong>{suitableProviders.length} plans</strong> with enough data for your estimate</p><span>Ordered by example price</span></div>
        <div className="provider-list">
          {suitableProviders.map((provider, index) => {
            const saving = Math.max(0, roamingCost - provider.price);
            return <article className={`provider-card ${index === 0 ? "top-pick" : ""}`} key={provider.name}>
              {index === 0 && <span className="pick-ribbon">Best value in this snapshot</span>}
              <div className="provider-main"><div className="provider-logo" style={{ background: provider.accent }}>{provider.initials}</div><div><div className="provider-name-row"><h3>{provider.name}</h3>{provider.affiliate && <span className="affiliate-badge">Affiliate partner</span>}</div><p>{provider.data}GB · {provider.validity} days · Data only</p><div className="feature-row"><span>{provider.speed}</span><span>Hotspot included</span><span>{provider.network}</span></div></div></div>
              <div className="provider-decision"><div className="price-block"><span>Example price</span><strong>{money.format(provider.price)}</strong><small>Save about {money.format(saving)} vs roaming</small></div><a className="deal-button" href={provider.url} target="_blank" rel={provider.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"} aria-label={`View ${provider.name} eSIM deal (opens in a new tab)`}>View deal <span aria-hidden="true">↗</span></a></div>
            </article>;
          })}
        </div>
        {suitableProviders.length === 0 && <div className="empty-state"><h3>You may need an unlimited plan</h3><p>Your estimated usage is above the fixed-data plans in this prototype. Check each provider for current unlimited options.</p></div>}
        <p className="results-disclaimer">Prototype prices are illustrative and can change with exchange rates, offers and plan choice. Always confirm the final price, allowance, device compatibility and activation rules on the provider’s site. Affiliate relationships do not affect the order shown.</p>
      </section>

      <section className="how-section" id="how-it-works">
        <div><p className="eyebrow">A calmer way to compare</p><h2>Only the details that matter at the airport.</h2></div>
        <ol className="steps"><li><span>01</span><strong>Size your trip</strong><p>We turn duration and usage into a simple data estimate.</p></li><li><span>02</span><strong>Compare like with like</strong><p>See a full-trip eSIM price beside likely daily roaming costs.</p></li><li><span>03</span><strong>Check, buy, install</strong><p>Confirm the live terms, then install before you leave Wi-Fi.</p></li></ol>
      </section>
      <footer><a className="brand" href="#top"><span className="brand-mark">RC</span><span>RoamCompare</span></a><p>Independent comparisons for UK travellers. Prices shown in GBP.</p></footer>
    </main>
  );
}
