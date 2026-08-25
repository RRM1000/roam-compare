import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

function visible(html) {
  return html.replaceAll("<!-- -->", "");
}

test("server-renders the premium comparison and complete controls", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  const text = visible(html);

  assert.match(html, /<title>RoamCompare — UK roaming vs travel eSIMs<\/title>/i);
  assert.match(html, /<meta name="robots" content="[^"]*noindex[^"]*nofollow[^"]*">/i);
  assert.match(text, /Know the roaming cost before take-off\./);
  assert.match(text, /See the hotspot rules, speed caps and fair-use limits/);
  // Counted from the plans actually in hand: 5 without the live feed (as in CI), 20 with it.
  assert.match(text, /\d+ with eSIM prices/);
  assert.match(text, /Roaming priced, never guessed/);
  // Roaming coverage differs by network: EE prices all 20 destinations, the other
  // nine price 5. The page must not flatten that into a single blanket claim.
  assert.match(text, /On EE we price roaming for all 20 destinations/);
  assert.doesNotMatch(text, /calculated for all 20 destinations/);
  assert.doesNotMatch(text, /on all 10 UK networks/);
  assert.match(html, /<option value="" disabled="" selected="">Choose your network<\/option>/);
  // The network is no longer required: results must not wait on a roaming tariff.
  assert.doesNotMatch(html, /aria-label="UK mobile network"[^>]*required/);
  assert.match(text, /We won’t guess — roaming costs differ far too much between networks\./);
  assert.match(text, /Do you need normal calls or SMS\?/);
  assert.match(text, /Compare with your own network/);
  assert.match(text, /How does your plan charge for roaming here\?/);
  // The roaming question is a yes/no; the exact day count is behind a link.
  assert.match(text, /Will you use paid roaming on your UK network\?/);
  assert.match(text, /Only some days\?/);
  assert.match(text, /eSIM or Wi-Fi only/);
  assert.match(text, /Data available through your UK plan abroad \(GB\)/);
  assert.match(html, /<option value="45">/);
  assert.match(html, /<option value="60">/);
  assert.match(html, /<option value="90">/);
  assert.equal((html.match(/<option value="(?:turkey|united-states|spain|france|italy|greece|portugal|germany|netherlands|ireland|cyprus|united-arab-emirates|thailand|japan|australia|canada|mexico|morocco|egypt|indonesia)"/g) ?? []).length, 20);
  assert.match(text, /Will an eSIM work on your phone\?/);
  assert.match(text, /Hotspot, speed &amp; other limits/);
  assert.match(text, /Speed cap \/ throttle/);
  assert.match(text, /Fair use \/ exhaustion/);
  assert.match(text, /Pin to compare/);
  assert.match(text, /Sort by/);
  assert.match(text, /Save on this device/);
  assert.match(text, /Klook/);
  // The badge was removed by request; rel="sponsored" remains the machine-readable
  // disclosure and must not be dropped with it.
  assert.doesNotMatch(text, /Affiliate relationship/);
  assert.match(html, /rel="sponsored noopener noreferrer"/);
  assert.match(text, /We earn a commission if you buy through some of the provider links/);
  assert.match(html, /activity\/128551-turkey-esim/);
  assert.match(html, /rel="sponsored noopener noreferrer"/);
  const rows = (html.match(/class="plan-row(?: [^"]*)?"/g) ?? []).length;
  assert.ok(rows > 8);
  assert.equal(rows, (html.match(/class="calls-texts-status data-only"/g) ?? []).length);
  assert.equal(rows, (html.match(/class="plan-limits"/g) ?? []).length);
  assert.match(text, /Klook prices are never scraped or guessed/);
  assert.match(text, /Do you work out what my own network would charge\?/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

for (const [path, title, marker] of [
  ["/about", "About and affiliate disclosure — RoamCompare", "What RoamCompare does"],
  ["/privacy", "Privacy — RoamCompare", "We don’t ask who you are"],
  ["/terms", "Terms — RoamCompare", "Check before you buy"],
]) {
  test(`server-renders ${path}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title}</title>`, "i"));
    assert.match(html, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, /Skip to content/);
    assert.match(html, /<main id="main-content">/i);
  });
}

test("shared Japan comparison renders prices and a sourced roaming calculation", async () => {
  const response = await render("/?compare=1&destination=japan&days=10&roamingDays=10&network=o2&scenario=o2-travel&usage=light&calls=no");
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visible(html);
  assert.match(html, /<title>10 days in Japan — RoamCompare<\/title>/i);
  assert.match(text, /10 days in Japan · plan for about 4GB/);
  assert.match(text, /O2 Travel estimate/);
  assert.match(text, /£7 × 10 24-hour periods/);
  assert.match(text, /Official O2 Travel/);
  assert.match(text, /2Mbps/);
  assert.match(html, /results-section is-visible/);
  assert.match(html, /aria-hidden="false"/);
  assert.match(text, /Nomad/);
  assert.match(text, /10GB/);
  assert.match(text, /US\$16\.00 listed when we checked/);
  assert.match(text, /SoftBank/);
  assert.match(text, /Hotspot works/);
});

test("normal-call requirement can select a verified US voice plan", async () => {
  const response = await render("/?compare=1&destination=united-states&days=7&roamingDays=7&network=ee&scenario=ee-row1&usage=light&calls=yes&allowance=10");
  assert.equal(response.status, 200);
  const text = visible(await response.text());
  // Airalo sells a range of calls/texts plans; the cheapest that covers a light
  // 7-day trip should win. Matched by shape so a repricing does not break this.
  assert.match(text, /\dGB \+ \d+ min\/SMS/);
  assert.match(text, /Calls &amp; texts included/);
  assert.match(text, /This one includes normal calls and texts/);
  assert.match(text, /No calls or texts — you said you need them/);
  assert.match(text, /meet your calls\/SMS requirement/);
});

test("shared filters and sorting are restored before recommendations are rendered", async () => {
  const response = await render("/?compare=1&destination=united-states&days=7&roamingDays=7&network=ee&scenario=ee-row1&usage=light&calls=no&sort=data&unlimited=1&fiveG=1&tethering=1&allowance=10");
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visible(html);
  assert.match(html, /<option value="data" selected="">Data allowance<\/option>/);
  assert.match(html, /type="checkbox" checked=""\/> Unlimited only/);
  assert.match(html, /type="checkbox" checked=""\/> 5G listed/);
  assert.match(html, /type="checkbox" checked=""\/> Hotspot allowed/);
  assert.match(text, /Airalo/);
  assert.match(text, /Unlimited — daily limits apply/);
  assert.doesNotMatch(text, /5GB \+ 50 min\/SMS/);
});

test("unverified catalogue calls are not presented as a definite mismatch", async () => {
  const response = await render("/?compare=1&destination=france&days=7&roamingDays=7&network=o2&scenario=plan-check&usage=light&calls=yes");
  assert.equal(response.status, 200);
  const text = visible(await response.text());
  assert.match(text, /We couldn’t confirm calls and texts/);
  assert.doesNotMatch(text, /No calls or texts — you said you need them/);
});

test("no plan is ever recommended that needs buying more than once", async () => {
  // A 90-day trip is the hardest case: most plans top out at 30 days, so this is
  // where a multi-purchase total would have appeared if the rule ever regressed.
  const response = await render("/?compare=1&destination=turkey&days=90&roamingDays=90&network=o2&scenario=o2-travel&usage=light&calls=no");
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visible(html);

  assert.doesNotMatch(text, /assumes buying/);
  assert.doesNotMatch(text, /estimated packs/);
  assert.doesNotMatch(text, /activated in sequence/);
  assert.doesNotMatch(text, /\d+ × [£€$]/, "a total must never be built from several purchases");

  // Every provider stays on the page, falling back to its catalogue link when no
  // single purchase covers the trip.
  for (const provider of ["Airalo", "Klook", "Nomad", "Saily"]) {
    assert.match(html, new RegExp(`<h3>${provider}</h3>`), `${provider} disappeared from the comparison`);
  }
});

test("rejects inherited and malformed shared-link values without assuming EE", async () => {
  const response = await render("/?compare=1&destination=toString&days=999&roamingDays=-4&network=constructor&scenario=__proto__&usage=unknown");
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visible(html);
  // A compare link now shows the eSIM side on its own, so the guarantee is no
  // longer "nothing rendered" — it is that nothing was invented from bad input.
  assert.match(html, /<title>7 days in Turkey — RoamCompare<\/title>/i);
  assert.doesNotMatch(text, /999 days in/);
  assert.match(text, /Choose your network/);
  assert.doesNotMatch(text, /Current EE RoW Zone 1 passes/);
  // No network was validly supplied, so no roaming cost may be claimed.
  assert.doesNotMatch(html, /class="roaming-banner/);
  assert.doesNotMatch(text, /less than requirements-matched roaming/);
});

test("\"Live price\" means one thing, and an unpriced plan never claims a checked price", async () => {
  const response = await render("/?compare=1&destination=turkey&days=10&roamingDays=10&network=ee&scenario=ee-current&usage=everyday&calls=no");
  const html = await response.text();
  const text = visible(html);

  // The phrase must never be reused to mean the opposite — "we have no price".
  assert.doesNotMatch(text, /Live price only/);
  assert.doesNotMatch(text, /Live price required/);

  // Klook rows carry no price at all, so they must not show a freshness date
  // implying we verified one. Turkey's Klook plans are price: null but not
  // catalogueOnly, which is exactly the case that used to slip through.
  const klook = html.match(/<h3>Klook<\/h3>[\s\S]*?<\/article>/)?.[0] ?? "";
  assert.ok(klook, "Klook provider card should render");
  assert.match(klook, /Price at provider/);
  assert.doesNotMatch(klook, /Checked \d+ \w+ \d{4}/, "an unpriced plan must not claim a checked price");
  assert.doesNotMatch(klook, /Live price/);
});

test("every destination has a landing page, not only the manually priced ones", async () => {
  const { destinations } = await import("../lib/destinations.ts");
  assert.equal(destinations.length, 20);

  for (const destination of destinations) {
    const response = await render(`/destinations/${destination.id}`);
    assert.equal(response.status, 200, `/destinations/${destination.id} should not 404`);
  }

  const sitemap = await render("/sitemap.xml");
  const xml = await sitemap.text();
  for (const destination of destinations) {
    assert.match(xml, new RegExp(`/destinations/${destination.id}</loc>`), `${destination.id} missing from sitemap`);
  }

  const unknown = await render("/destinations/atlantis");
  assert.equal(unknown.status, 404, "unknown destinations must still 404");
});

test("the site serves its own icon", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /<link[^>]+rel="icon"[^>]*>/i, "no favicon link in the document head");
});

for (const [slug, name] of [["spain", "Spain"], ["japan", "Japan"]]) {
  test(`${name} destination page has distinct canonical and social metadata`, async () => {
    const response = await render(`/destinations/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${name} eSIM and UK roaming comparison — RoamCompare<\\/title>`, "i"));
    assert.match(html, new RegExp(`rel="canonical" href="http:\\/\\/localhost:3000\\/destinations\\/${slug}"`, "i"));
    assert.match(visible(html), new RegExp(`UK → ${name} · roaming vs eSIM`));
    assert.match(visible(html), new RegExp(`Compare eSIMs for ${name}\\.`));
    assert.doesNotMatch(html, /og-premium\.png|og\.png/);
  });
}

test("private launch controls block crawlers and expose launch-ready routes", async () => {
  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /User-Agent: \*\s+Disallow: \//i);

  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /\/destinations\/turkey<\/loc>/);
  assert.match(xml, /\/destinations\/united-states<\/loc>/);
  assert.match(xml, /\/destinations\/spain<\/loc>/);
  assert.match(xml, /\/destinations\/japan<\/loc>/);
  assert.match(xml, /\/destinations\/united-arab-emirates<\/loc>/);
});

test("the saving against roaming is stated once in prose, not on every row", async () => {
  const response = await render("/?compare=1&destination=turkey&days=7&roamingDays=7&network=ee&scenario=ee-current&usage=everyday&calls=no&allowance=10");
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visible(html);

  // The full clause belongs on the decision card and nowhere else; it used to
  // repeat on every priced row, which buried the rows' own numbers. Tags are
  // stripped first so the title attributes below are not counted as prose.
  const onScreen = text.replace(/<[^>]*>/g, " ");
  const prose = onScreen.match(/less than roaming that meets everything you asked for/g) ?? [];
  assert.equal(prose.length, 1, `expected one prose saving, found ${prose.length}`);

  // Rows carry the same figure in a compact labelled form instead.
  const figures = html.match(/class="versus-roaming"/g) ?? [];
  assert.ok(figures.length > 1, "expected the compact saving on several rows");
  assert.match(onScreen, /vs roaming/);

  // The long wording stays available as the title, so nothing is lost to
  // anyone reading the row on its own.
  assert.match(html, /title="About £[\d.,]+ less than roaming that meets everything you asked for"/);
});
