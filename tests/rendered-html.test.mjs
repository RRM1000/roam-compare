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
  assert.match(text, /5 priced destinations/);
  assert.match(html, /<option value="" disabled="" selected="">Choose your network<\/option>/);
  assert.match(html, /aria-label="UK mobile network" required=""/);
  assert.match(text, /We will not assume a network for you\./);
  assert.match(text, /Do you need normal calls or SMS\?/);
  assert.match(text, /Fine-tune your roaming estimate/);
  assert.match(text, /How many days might you switch on UK roaming\?/);
  assert.match(text, /0 — eSIM\/Wi-Fi only/);
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
  assert.match(text, /Affiliate relationship/);
  assert.match(html, /activity\/128551-turkey-esim/);
  assert.match(html, /rel="sponsored noopener noreferrer"/);
  const rows = (html.match(/class="plan-row(?: [^"]*)?"/g) ?? []).length;
  assert.ok(rows > 8);
  assert.equal(rows, (html.match(/class="calls-texts-status data-only"/g) ?? []).length);
  assert.equal(rows, (html.match(/class="plan-limits"/g) ?? []).length);
  assert.match(text, /Klook prices are never scraped or guessed/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

for (const [path, title, marker] of [
  ["/about", "About and affiliate disclosure — RoamCompare", "Useful maths, visible assumptions."],
  ["/privacy", "Privacy — RoamCompare", "No account. No comparison profile."],
  ["/terms", "Terms — RoamCompare", "Compare, then verify."],
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

test("shared Japan comparison renders prices and an unguessed roaming handoff", async () => {
  const response = await render("/?compare=1&destination=japan&days=10&roamingDays=10&network=o2&scenario=plan-check&usage=light&calls=no");
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visible(html);
  assert.match(html, /<title>10 days in Japan — RoamCompare<\/title>/i);
  assert.match(text, /10 days in Japan · plan for about 4GB/);
  assert.match(text, /Check O2 for Japan/);
  assert.match(text, /A live roaming total is not stored/);
  assert.match(html, /results-section is-visible/);
  assert.match(html, /aria-hidden="false"/);
  assert.match(text, /Nomad/);
  assert.match(text, /10GB/);
  assert.match(text, /US\$16\.00 provider-currency snapshot/);
  assert.match(text, /SoftBank/);
  assert.match(text, /Hotspot supported/);
});

test("normal-call requirement can select the verified US voice plan", async () => {
  const response = await render("/?compare=1&destination=united-states&days=7&roamingDays=7&network=ee&scenario=plan-check&usage=light&calls=yes");
  assert.equal(response.status, 200);
  const text = visible(await response.text());
  assert.match(text, /Change\+ 5GB \+ 50 min\/SMS/);
  assert.match(text, /Calls &amp; texts included/);
  assert.match(text, /This option also declares normal calls and SMS/);
  assert.match(text, /Doesn’t meet calls\/SMS requirement/);
  assert.match(text, /meet your calls\/SMS requirement/);
});

test("shared filters and sorting are restored before recommendations are rendered", async () => {
  const response = await render("/?compare=1&destination=united-states&days=7&roamingDays=7&network=ee&scenario=plan-check&usage=light&calls=no&sort=data&unlimited=1&fiveG=1&tethering=1");
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visible(html);
  assert.match(html, /<option value="data" selected="">Data allowance<\/option>/);
  assert.match(html, /type="checkbox" checked=""\/> Unlimited only/);
  assert.match(html, /type="checkbox" checked=""\/> 5G listed/);
  assert.match(html, /type="checkbox" checked=""\/> Hotspot allowed/);
  assert.match(text, /Airalo/);
  assert.match(text, /Unlimited label/);
  assert.doesNotMatch(text, /Change\+ 5GB \+ 50 min\/SMS/);
});

test("unverified catalogue calls are not presented as a definite mismatch", async () => {
  const response = await render("/?compare=1&destination=france&days=7&roamingDays=7&network=o2&scenario=plan-check&usage=light&calls=yes");
  assert.equal(response.status, 200);
  const text = visible(await response.text());
  assert.match(text, /Calls\/SMS not verified/);
  assert.doesNotMatch(text, /Doesn’t meet calls\/SMS requirement/);
});

test("multi-package recommendations disclose package count before checkout", async () => {
  const response = await render("/?compare=1&destination=turkey&days=90&roamingDays=90&network=o2&scenario=o2-travel&usage=light&calls=no");
  assert.equal(response.status, 200);
  const text = visible(await response.text());
  assert.match(text, /This total estimates \d+ packages; confirm they can be activated sequentially before buying\./);
});

test("rejects inherited and malformed shared-link values without assuming EE", async () => {
  const response = await render("/?compare=1&destination=toString&days=999&roamingDays=-4&network=constructor&scenario=__proto__&usage=unknown");
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visible(html);
  assert.match(html, /<title>RoamCompare — UK roaming vs travel eSIMs<\/title>/i);
  assert.match(text, /Choose your network/);
  assert.match(html, /results-section " id="results" aria-hidden="true"/);
  assert.doesNotMatch(text, /Current EE RoW Zone 1 passes/);
  assert.doesNotMatch(text, /999 days in/);
});

test("priced destination pages have distinct canonical metadata", async () => {
  const response = await render("/destinations/spain");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Spain eSIM and UK roaming comparison — RoamCompare<\/title>/i);
  assert.match(html, /rel="canonical" href="http:\/\/localhost:3000\/destinations\/spain"/i);
  assert.match(visible(html), /UK → Spain · roaming vs eSIM/);
  assert.match(visible(html), /Compare eSIMs for Spain\./);
});

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
