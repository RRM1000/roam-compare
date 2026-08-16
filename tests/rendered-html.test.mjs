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
  assert.match(html, /Compare my options/);
  assert.match(html, /Klook/);
  assert.match(html, /Affiliate partner/);
  assert.match(html, /activity\/128551-turkey-esim/);
  assert.match(html, /<option value="45">/);
  assert.match(html, /<option value="60">/);
  assert.match(html, /<option value="90">/);
  assert.match(html, /Check whether your phone supports eSIM/);
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
  assert.match(html, /Live APIs/);
  assert.match(html, /Are these live prices\?/);
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
