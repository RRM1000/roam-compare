import assert from "node:assert/strict";
import test from "node:test";

import { mapSailyPlans } from "../lib/saily-live.ts";

// Captured from https://web.saily.com/v3/partners/plans on 2026-08-18 with
// format_price=true and currencyCode=GBP. Trimmed to the fields the mapper reads.
const fixture = [
  {
    identifier: "09afe92c-27f0-4a5f-b1a0-069eab309fb0",
    name: "Turkey 1GB 7 days",
    category: "standard",
    covered_countries: ["TR"],
    destination_url: "https://go.saily.site/aff_c?offer_id=1&aff_id=99999&url=https%3A%2F%2Fsaily.com%2Fesim-turkey",
    pricing_slug: "esim-turkey",
    is_unlimited: false,
    duration: { amount: 7, unit: "day" },
    balances: [{ amount: 1, unit: "GB", type: "DATA", is_unlimited: false }],
    price: { amount_with_tax: 2.99, currency: "GBP" },
    merchant_plans: [{ metadata: {} }],
  },
  {
    identifier: "2ebba10e-d3f8-4a3e-b1e7-fcb04a7b2e88",
    name: "Turkey UNLIMITED 5 days",
    category: "standard",
    covered_countries: ["TR"],
    destination_url: "https://go.saily.site/aff_c?offer_id=1&aff_id=99999&url=https%3A%2F%2Fsaily.com%2Fesim-turkey",
    pricing_slug: "esim-turkey",
    is_unlimited: true,
    duration: { amount: 5, unit: "day" },
    balances: [{ amount: 999, unit: "GB", type: "DATA", is_unlimited: true }],
    price: { amount_with_tax: 14.49, currency: "GBP" },
    merchant_plans: [
      {
        metadata: {
          throttled_speed: { amount: 1024, unit: "KBPS" },
          unrestricted_data: { amount: 5, unit: "GB" },
          unrestricted_data_after: { interval: 1, unit: "DAY" },
        },
      },
    ],
  },
  {
    identifier: "7475b3f2-fdd8-4fd1-80a0-4eee30ae4f3b",
    name: "France 20GB 30 days",
    category: "standard",
    covered_countries: ["FR"],
    destination_url: "https://go.saily.site/aff_c?offer_id=1&aff_id=99999&url=https%3A%2F%2Fsaily.com%2Fesim-france",
    pricing_slug: "esim-france",
    is_unlimited: false,
    duration: { amount: 30, unit: "day" },
    balances: [{ amount: 20, unit: "GB", type: "DATA", is_unlimited: false }],
    price: { amount_with_tax: 24.49, currency: "GBP" },
    merchant_plans: [{ metadata: {} }],
  },
  {
    // Regional bundle covering 35 countries; not a like-for-like single-destination row.
    identifier: "ad9e2f7d-dd61-4f3e-a8e0-831aae9ab7f2",
    name: "Europe UNLIMITED 7 days",
    category: "standard",
    covered_countries: ["AT", "BE", "FR", "TR"],
    destination_url: "https://go.saily.site/aff_c?offer_id=1&aff_id=99999",
    pricing_slug: "esim-europe",
    is_unlimited: true,
    duration: { amount: 7, unit: "day" },
    balances: [{ amount: 999, unit: "GB", type: "DATA", is_unlimited: true }],
    price: { amount_with_tax: 22.49, currency: "GBP" },
    merchant_plans: [{ metadata: {} }],
  },
  {
    // Country Saily sells but RoamCompare does not list.
    identifier: "laos-plan",
    name: "Laos 1GB 7 days",
    category: "standard",
    covered_countries: ["LA"],
    destination_url: "https://go.saily.site/aff_c?offer_id=1&aff_id=99999",
    pricing_slug: "esim-laos",
    is_unlimited: false,
    duration: { amount: 7, unit: "day" },
    balances: [{ amount: 1, unit: "GB", type: "DATA", is_unlimited: false }],
    price: { amount_with_tax: 3.99, currency: "GBP" },
    merchant_plans: [{ metadata: {} }],
  },
];

test("maps single-destination Saily plans and skips regional and unlisted ones", () => {
  const mapped = mapSailyPlans(fixture, "2026-08-18");

  assert.deepEqual(
    mapped.map((plan) => `${plan.destination}:${plan.name}:${plan.price}`),
    ["france:20GB:24.49", "turkey:1GB:2.99", "turkey:Unlimited:14.49"],
  );

  for (const plan of mapped) {
    assert.equal(plan.provider, "Saily");
    assert.equal(plan.currency, "GBP");
    assert.equal(plan.live, true);
    assert.equal(plan.callingSupport, "data-only");
    assert.equal(plan.checkedAt, "2026-08-18");
    assert.match(plan.sourceUrl, /^https:\/\/saily\.com\/esim-[a-z-]+\/$/);
    assert.match(plan.checkoutUrl, /^https:\/\/go\.saily\.site\/aff_c\?/);
  }
});

test("unlimited plans carry the throttle and daily allowance, not the 999GB sentinel", () => {
  const unlimited = mapSailyPlans(fixture, "2026-08-18").find((plan) => plan.unlimited);

  assert.equal(unlimited.dataGb, undefined);
  assert.equal(unlimited.validity, 5);
  assert.equal(unlimited.speedCap, "1Mbps once you've used 5GB in a day");
  assert.equal(unlimited.fairUse, "5GB at full speed each day, then 1Mbps until it resets");
});

test("fixed plans record the allowance and make no throttle claim", () => {
  const fixed = mapSailyPlans(fixture, "2026-08-18").find((plan) => plan.destination === "france");

  assert.equal(fixed.dataGb, 20);
  assert.equal(fixed.unlimited, undefined);
  assert.equal(fixed.speedCap, "No speed limit mentioned until your data runs out");
});

test("rejects malformed, non-GBP and non-affiliate records", () => {
  const base = fixture[0];
  const cases = [
    { ...base, price: { amount_with_tax: 2.99, currency: "EUR" } },
    { ...base, price: { amount_with_tax: 0, currency: "GBP" } },
    { ...base, price: { amount_with_tax: "2.99", currency: "GBP" } },
    { ...base, duration: { amount: 7, unit: "month" } },
    { ...base, duration: { amount: 0, unit: "day" } },
    { ...base, identifier: "" },
    { ...base, covered_countries: [] },
    { ...base, balances: [] },
  ];

  for (const item of cases) {
    assert.deepEqual(mapSailyPlans([item], "2026-08-18"), [], `expected rejection of ${JSON.stringify(item).slice(0, 80)}`);
  }

  assert.deepEqual(mapSailyPlans(null, "2026-08-18"), []);
  assert.deepEqual(mapSailyPlans([null, undefined, 42], "2026-08-18"), []);
});

test("drops a checkout URL that is not an HTTPS Saily click link", () => {
  const unsafe = [
    "http://go.saily.site/aff_c?offer_id=1",
    "https://go.saily.site.example.test/aff_c",
    "https://evil.test/aff_c?offer_id=1",
    "https://user:password@go.saily.site/aff_c",
    "not a URL",
  ];

  for (const destinationUrl of unsafe) {
    const [plan] = mapSailyPlans([{ ...fixture[0], destination_url: destinationUrl }], "2026-08-18");
    assert.equal(plan.checkoutUrl, undefined, `expected ${destinationUrl} to be rejected`);
    // The plan still renders, falling back to the plain Saily source URL.
    assert.equal(plan.sourceUrl, "https://saily.com/esim-turkey/");
  }
});
