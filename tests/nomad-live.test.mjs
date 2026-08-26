import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import { mapNomadItems } from "../lib/nomad-live.ts";

// Captured from Impact catalog 29881 (Nomad eSIM) on 2026-08-25, trimmed to the
// fields the mapper reads. Chosen to cover the awkward name shapes the real
// catalogue contains, not just the tidy majority.
const fixture = JSON.parse(readFileSync(new URL("./fixtures/nomad-catalog.json", import.meta.url), "utf8"));

test("reads the destination from the tracking URL, not the product name", () => {
  const mapped = mapNomadItems(fixture, "2026-08-25");

  // Jersey and Anguilla are real Nomad products but not RoamCompare destinations,
  // and the regional SG-MY-TH bundle has no single destination — all dropped.
  assert.deepEqual(
    mapped.map((plan) => `${plan.destination}:${plan.name}:${plan.price}`),
    ["france:3GB:6", "turkey:Unlimited:28"],
  );

  for (const plan of mapped) {
    assert.equal(plan.provider, "Nomad");
    assert.equal(plan.currency, "USD");
    assert.equal(plan.live, true);
    assert.equal(plan.callingSupport, "data-only");
    assert.equal(plan.checkedAt, "2026-08-25");
    assert.match(plan.sourceUrl, /^https:\/\/www\.nomadesim\.com\/[a-z-]+-eSIM$/);
    assert.match(plan.checkoutUrl, /^https:\/\/lotusflareinc\.pxf\.io\//);
  }
});

test("parses allowance and validity from every name shape the catalogue uses", () => {
  const shapes = [
    ["Local France - 30 Days - 3 GB", { dataGb: 3, validity: 30, unlimited: undefined }],
    ["Local France - 3 GB - 30 Days", { dataGb: 3, validity: 30, unlimited: undefined }],
    ["France_10GB_30Day", { dataGb: 10, validity: 30, unlimited: undefined }],
    ["France 5 GB 30 Days", { dataGb: 5, validity: 30, unlimited: undefined }],
    ["Nomad - France- 7 Days - 1 GB", { dataGb: 1, validity: 7, unlimited: undefined }],
    ["Local France - 10 Days -Unlimited", { dataGb: undefined, validity: 10, unlimited: true }],
    ["Local France - 7 Days - 200 MB", { dataGb: 200 / 1024, validity: 7, unlimited: undefined }],
  ];
  const url = fixture.find((item) => item.Name.includes("France")).Url;

  for (const [name, expected] of shapes) {
    const [plan] = mapNomadItems([{ CatalogItemId: "x", Name: name, Url: url, CurrentPrice: "9.00", Currency: "USD" }], "2026-08-25");
    assert.ok(plan, `failed to map: ${name}`);
    assert.equal(plan.validity, expected.validity, name);
    assert.equal(plan.unlimited, expected.unlimited, name);
    if (expected.dataGb === undefined) assert.equal(plan.dataGb, undefined, name);
    else assert.ok(Math.abs(plan.dataGb - expected.dataGb) < 0.001, `${name}: got ${plan.dataGb}`);
  }
});

test("rejects records it cannot price or place", () => {
  const good = fixture.find((item) => item.Name === "Local France - 30 Days - 3 GB");
  const cases = [
    { ...good, Currency: "GBP" },              // catalogue is USD only; anything else means the shape changed
    { ...good, CurrentPrice: "0" },
    { ...good, CurrentPrice: "not a number" },
    { ...good, CatalogItemId: "" },
    { ...good, StockAvailability: "OutOfStock" },
    { ...good, Name: "Local France - 3 GB" },  // no validity
    { ...good, Url: "https://lotusflareinc.pxf.io/c/1/2/3" }, // no landing page to read
  ];
  for (const item of cases) {
    assert.deepEqual(mapNomadItems([item], "2026-08-25"), [], `expected rejection of ${JSON.stringify(item).slice(0, 70)}`);
  }
  assert.deepEqual(mapNomadItems(null, "2026-08-25"), []);
  assert.deepEqual(mapNomadItems([null, undefined, 42], "2026-08-25"), []);
});

test("drops a checkout URL that is not an HTTPS Impact click link", () => {
  const good = fixture.find((item) => item.Name === "Local France - 30 Days - 3 GB");
  const landing = encodeURIComponent("https://www.nomadesim.com/france-eSIM");

  for (const host of ["http://lotusflareinc.pxf.io", "https://pxf.io.evil.test", "https://evil.test", "https://user:pass@lotusflareinc.pxf.io"]) {
    const [plan] = mapNomadItems([{ ...good, Url: `${host}/c/1/2/3?u=${landing}` }], "2026-08-25");
    assert.equal(plan.checkoutUrl, undefined, `expected ${host} to be rejected`);
    // The plan still renders, falling back to Nomad's own page.
    assert.equal(plan.sourceUrl, "https://www.nomadesim.com/france-eSIM");
  }

  // Impact also issues per-account click domains.
  const [ok] = mapNomadItems([{ ...good, Url: `https://imp.i1111111.net/c/1/2/3?u=${landing}` }], "2026-08-25");
  assert.match(ok.checkoutUrl, /^https:\/\/imp\.i1111111\.net\//);
});
