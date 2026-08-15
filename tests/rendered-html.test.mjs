import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the RoamCompare experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>RoamCompare — Compare eSIMs for UK travellers<\/title>/i);
  assert.match(html, /Land connected\. Leave roaming shock at home\./);
  assert.match(html, /Compare my options/);
  assert.match(html, /Klook/);
  assert.match(html, /Affiliate partner/);
  assert.match(html, /activity\/128551-turkey-esim/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("includes transparent affiliate and price caveats", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /rel="sponsored noopener noreferrer"/);
  assert.match(html, /Prototype prices are illustrative/);
  assert.match(html, /rankings stay independent/i);
});
