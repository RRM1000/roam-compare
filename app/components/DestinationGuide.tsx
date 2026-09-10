import Link from "next/link";
import { formatCheckedDate, isPlanStale, plans, providerDetails, usagePerDay, type Plan, type Provider } from "@/lib/catalog";
import { getPlanMatch, money } from "@/lib/comparison";
import { destinationById, destinations, getPlanUrl, getProviderUrl, isTrackedUrl, type DestinationId } from "@/lib/destinations";
import type { DestinationGuide as Guide } from "@/lib/guides";
import { getRoamingEvidence, getRoamingResult, networkNames, type Network } from "@/lib/roaming";

type Props = { guide: Guide; livePlans?: Plan[] };

/** The trip the worked examples price: a week and a fortnight of everyday use. */
const EXAMPLE_TRIPS = [7, 14] as const;

function neededData(days: number) {
  return Math.max(1, Math.ceil(days * usagePerDay.everyday));
}

/**
 * Live plans replace the manual snapshot for the same provider, exactly as the
 * comparison does, so the guide's worked example and the calculator above it
 * name the same cheapest plan.
 */
function plansFor(destination: DestinationId, livePlans: Plan[] | undefined) {
  const live = (livePlans ?? []).filter((plan) => plan.destination === destination);
  const replaced = new Set(live.map((plan) => plan.provider));
  return [...plans.filter((plan) => plan.destination === destination && !replaced.has(plan.provider)), ...live];
}

function cheapestPerProvider(destination: DestinationId, livePlans: Plan[] | undefined, days: number) {
  const target = neededData(days);
  const best = new Map<Provider, ReturnType<typeof getPlanMatch>>();
  for (const plan of plansFor(destination, livePlans)) {
    if (plan.price === null || isPlanStale(plan)) continue;
    const match = getPlanMatch(plan, days, target);
    if (match.packs > 1 || match.suppliedData < target || match.gbpTotal === null) continue;
    const current = best.get(plan.provider);
    if (!current || match.gbpTotal < current.gbpTotal!) best.set(plan.provider, match);
  }
  return best;
}

export default function DestinationGuide({ guide, livePlans }: Props) {
  const destination = destinationById[guide.destination];
  const examples = EXAMPLE_TRIPS.map((days) => ({ days, target: neededData(days), esim: cheapestPerProvider(guide.destination, livePlans, days) }));
  const pricedNetworks = guide.networks.rows.filter((row) => row.scenario !== null);
  const liveProviders = new Set((livePlans ?? []).filter((plan) => plan.destination === guide.destination).map((plan) => plan.provider));

  return (
    <section className="guide-section" id="guide" aria-labelledby="guide-title">
      <header className="guide-header">
        <p className="eyebrow">The {destination.name} guide · updated {formatCheckedDate(guide.updatedAt)}</p>
        <h2 id="guide-title">{guide.verdict.heading}</h2>
        <p className="guide-lede">{guide.verdict.body}</p>
      </header>

      <dl className="guide-facts" aria-label={`${destination.name} connectivity facts`}>
        {guide.facts.map((fact) => (
          <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
        ))}
      </dl>

      <div className="guide-block" id="guide-networks">
        <h3>What your UK network charges in {destination.name}</h3>
        <p>{guide.networks.intro}</p>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- The horizontally scrolling table must be keyboard-focusable. */}
        <div className="guide-table-wrap" role="region" aria-label="UK network roaming charges" tabIndex={0}>
          <table className="guide-table">
            <caption className="sr-only">UK network roaming charges for {destination.name}</caption>
            <thead><tr><th scope="col">Network</th><th scope="col">How {destination.name} is charged</th><th scope="col">Worth knowing</th><th scope="col">Source</th></tr></thead>
            <tbody>
              {guide.networks.rows.map((row) => {
                const evidence = getRoamingEvidence(row.network, row.scenario ?? "");
                return (
                  <tr key={row.network}>
                    <th scope="row">{networkNames[row.network]}</th>
                    <td>{row.headline}</td>
                    <td>{row.detail}</td>
                    <td>
                      <a href={evidence.url} target="_blank" rel="noopener noreferrer">{evidence.label} ↗</a>
                      <small>checked {formatCheckedDate(evidence.checkedAt)}</small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="guide-block" id="guide-examples">
        <h3>Roaming versus an eSIM, priced for a real trip</h3>
        <p>Everyday use is about {usagePerDay.everyday}GB a day, so a week needs {neededData(7)}GB and a fortnight {neededData(14)}GB. Roaming figures come from the same published charges the calculator uses; eSIM figures are the cheapest single plan from each provider that covers the trip{liveProviders.size > 0 ? `, live from ${[...liveProviders].sort().join(" and ")}` : ""}. Klook is left out because it shows prices only on its own page.</p>
        <div className="guide-examples">
          {examples.map(({ days, target, esim }) => {
            const roamingRows = pricedNetworks
              .map((row) => ({ network: row.network, result: getRoamingResult(row.network, row.scenario!, days, "", target, guide.destination, "") }))
              .filter(({ result }) => result.cost !== null)
              .sort((a, b) => a.result.cost! - b.result.cost!);
            const esimRows = [...esim.entries()].sort((a, b) => a[1].gbpTotal! - b[1].gbpTotal!);
            return (
              <article key={days} className="guide-example">
                <h4>{days} days · plan for {target}GB</h4>
                <div className="guide-example-columns">
                  <div>
                    <strong>UK roaming</strong>
                    <ul>
                      {roamingRows.map(({ network, result }) => (
                        <li key={network}><span>{networkNames[network]}</span><b>{result.cost === 0 ? "Included" : money.format(result.cost!)}</b>{result.allowanceSource === "metered" ? <small>at the per-MB rate; a spend cap would stop this first</small> : result.speedCap === "2Mbps" ? <small>speed capped at 2Mbps</small> : result.dataAllowanceGb !== null && result.dataAllowanceGb < target ? <small>only {result.dataAllowanceGb}GB — not enough</small> : null}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Travel eSIM</strong>
                    {esimRows.length === 0 ? <p>{liveProviders.size === 0 ? "The live price feeds did not answer and our hand-checked prices are due a recheck, so we would rather show nothing than a stale figure. The comparison above still links to every provider." : "No priced plan currently covers this trip in one purchase."}</p> : (
                      <ul>
                        {esimRows.map(([provider, plan]) => {
                          const url = getPlanUrl(plan, destination);
                          const sponsored = isTrackedUrl(url) || providerDetails[provider].affiliate;
                          return (
                            <li key={provider}><span>{provider} · {plan.unlimited ? "Unlimited" : `${plan.dailyDataGb ? `${plan.dailyDataGb}GB a day` : `${plan.suppliedData}GB`}`} · {plan.validity} days</span><b>≈ {money.format(plan.gbpTotal!)}</b><small>{plan.live ? "live price" : `checked ${formatCheckedDate(plan.checkedAt)}`}{plan.currency && plan.currency !== "GBP" ? `, converted from ${plan.currency}` : ""} · <a href={url} target="_blank" rel={sponsored ? "sponsored noopener noreferrer" : "noopener noreferrer"}>see plan ↗</a></small></li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="guide-footnote">Roaming figures assume you roam every day of the trip and the pass or daily fee covers your data need; the calculator above lets you change both. Nomad prices are converted from US dollars at a rounded rate and marked as estimates.</p>
      </div>

      <div className="guide-block" id="guide-providers">
        <h3>The eSIM providers we compare for {destination.name}</h3>
        <p>{guide.providers.intro}</p>
        <div className="guide-providers">
          {guide.providers.notes.map((note) => {
            const url = getProviderUrl(note.provider, destination);
            const sponsored = isTrackedUrl(url) || providerDetails[note.provider].affiliate;
            return (
              <article key={note.provider} className="guide-provider">
                <div className="provider-logo" style={{ background: providerDetails[note.provider].accent }} aria-hidden="true">{providerDetails[note.provider].initials}</div>
                <div>
                  <h4>{note.provider} <small>on {note.localNetwork}</small></h4>
                  <p>{note.summary}</p>
                  {note.watchOut && <p className="guide-watch-out"><strong>Watch out:</strong> {note.watchOut}</p>}
                  <p className="guide-provider-links"><a href={url} target="_blank" rel={sponsored ? "sponsored noopener noreferrer" : "noopener noreferrer"}>{note.provider} {destination.name} plans ↗</a>{sponsored && <small>We may earn a commission on this link.</small>}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {guide.sections.map((section) => (
        <div className="guide-block guide-prose" id={`guide-${section.id}`} key={section.id}>
          <h3>{section.heading}</h3>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ))}

      <div className="guide-block" id="guide-setup">
        <h3>Setting up for {destination.name}</h3>
        <ol className="steps guide-steps">
          {guide.setup.map((step, index) => (
            <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.title}</strong><p>{step.body}</p></li>
          ))}
        </ol>
      </div>

      <div className="guide-block" id="guide-faq">
        <h3>{destination.name} questions, answered</h3>
        <div className="faq-list guide-faq">
          {guide.faq.map((entry) => (
            <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>
          ))}
        </div>
      </div>

      <div className="guide-block guide-related" id="guide-related">
        <h3>Other destinations from the UK</h3>
        <ul>
          {guide.related.map((id) => {
            const place = destinationById[id];
            return <li key={id}><a href={`/destinations/${id}`}>{place.flag} {place.name} eSIM and roaming</a></li>;
          })}
          <li><Link href="/">All {destinations.length} destinations</Link></li>
        </ul>
      </div>
    </section>
  );
}

export type { Network };
