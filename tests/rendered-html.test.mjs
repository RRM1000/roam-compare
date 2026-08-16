import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the RoamCompare experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>RoamCompare — UK roaming vs travel eSIMs<\/title>/i);
  assert.match(html, /Know the roaming cost before take-off\./);
  assert.match(html, /Compare priced options/);
  assert.match(html, /Klook/);
  assert.match(html, /Affiliate relationship/);
  assert.match(html, /activity\/128551-turkey-esim/);
  assert.match(html, /<option value="45">/);
  assert.match(html, /<option value="60">/);
  assert.match(html, /<option value="90">/);
  assert.match(html, /0 days — eSIM\/Wi-Fi only/);
  assert.match(html, /<option value="united-states">/);
  assert.match(html, /<option value="united-arab-emirates">/);
  assert.match(html, /<option value="japan">/);
  assert.match(html, /<option value="indonesia">/);
  assert.match(html, /United States/);
  assert.match(html, /United Arab Emirates/);
  assert.equal((html.match(/<option value="(?:turkey|united-states|spain|france|italy|greece|portugal|germany|netherlands|ireland|cyprus|united-arab-emirates|thailand|japan|australia|canada|mexico|morocco|egypt|indonesia)"/g) ?? []).length, 20);
  assert.match(html, /Will an eSIM work on your phone\?/);
  assert.match(html, /1GB per day/);
  assert.match(html, /2GB per day/);
  assert.match(html, /Current EE RoW Zone 1 passes/);
  assert.match(html, /O2 Travel/);
  assert.match(html, /Three Go Roam/);
  assert.match(html, /iD Mobile/);
  assert.match(html, /Sky Mobile/);
  assert.match(html, /giffgaff/);
  assert.match(html, /SMARTY/);
  assert.match(html, /VOXI/);
  assert.match(html, /Tesco Mobile/);
  assert.match(html, /Unlimited daily data/);
  assert.match(html, /Buy and install before you fly/);
  assert.match(html, /EE price guide/);
  assert.match(html, /Share comparison/);
  assert.match(html, /<form[^>]+id="compare"/i);
  assert.match(html, /Skip to comparison/);
  assert.match(html, /Savings are shown only when/);
  assert.match(html, /og-premium\.png/);
  assert.match(html, /Live APIs/);
  assert.match(html, /Are these live prices\?/);
  assert.match(html, /dated snapshot of manufacturer guidance/);
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
    assert.doesNotMatch(html, /Know the roaming cost before take-off\./);
    assert.match(html, /Skip to content/);
    assert.match(html, /<main id="main-content">/i);
  });
}

test("includes transparent affiliate and price caveats", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /rel="sponsored noopener noreferrer"/);
  assert.match(html, /Klook’s live price is not scraped/);
  assert.match(html, /manually checked on 15 August 2026/i);
  assert.match(html, /commission does not change the order/i);
  assert.doesNotMatch(html, /Example price|prototype prices are illustrative/i);
});

test("server-renders a validated shared comparison", async () => {
  const response = await render("/?compare=1&destination=japan&days=10&roamingDays=0&network=o2&scenario=plan-check&usage=light");
  assert.equal(response.status, 200);
  const html = await response.text();
  const visibleHtml = html.replaceAll("<!-- -->", "");

  assert.match(html, /<title>10 days in Japan — RoamCompare<\/title>/i);
  assert.match(visibleHtml, /10 days in Japan · plan for about 4GB/);
  assert.match(visibleHtml, /No UK-SIM roaming days/);
  assert.match(visibleHtml, /results-section is-visible/);
  assert.match(visibleHtml, /Live provider catalogues/);
  assert.match(html, /og-premium\.png/);
});

test("rejects inherited and malformed shared-link values", async () => {
  const response = await render("/?compare=1&destination=toString&days=999&roamingDays=-4&network=constructor&scenario=__proto__&usage=unknown");
  assert.equal(response.status, 200);
  const html = await response.text();
  const visibleHtml = html.replaceAll("<!-- -->", "");

  assert.match(html, /<title>7 days in Turkey — RoamCompare<\/title>/i);
  assert.match(visibleHtml, /7 days in Turkey · plan for about 6GB/);
  assert.match(visibleHtml, /Current EE RoW Zone 1 passes/);
  assert.doesNotMatch(visibleHtml, /999 days in/);
});
