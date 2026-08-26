import assert from "node:assert/strict";
import test from "node:test";

import { plans } from "../lib/catalog.ts";
import { getPlanMatch, partitionDominated, withProviderHandoffs } from "../lib/comparison.ts";

function plan(id) {
  const found = plans.find((candidate) => candidate.id === id);
  assert.ok(found, `Missing fixture plan ${id}`);
  return found;
}

test("fixed-data matching buys enough packs for both duration and data", () => {
  // Duration drives: 20 days needs seven 3-day packs, more than the five that 5GB needs.
  const byDuration = getPlanMatch(plan("turkey-airalo-1gb-3d"), 20, 5);
  assert.equal(byDuration.packs, 7);
  assert.equal(byDuration.suppliedData, 7);
  assert.equal(byDuration.nativeTotal, 24.5);
  // Airalo prices in GBP, so the total needs no conversion.
  assert.equal(byDuration.gbpTotal, 24.5);

  // Data drives: one 30-day pack covers the trip, but 12GB needs three of them.
  const byData = getPlanMatch(plan("turkey-airalo-5gb-30d"), 20, 12);
  assert.equal(byData.packs, 3);
  assert.equal(byData.suppliedData, 15);
  assert.equal(byData.nativeTotal, 24);
});

test("daily and unlimited plans account for trips longer than one validity period", () => {
  const daily = getPlanMatch(plan("turkey-klook-1gb-daily"), 45, 40);
  assert.equal(daily.packs, 2);
  assert.equal(daily.suppliedData, 45);
  assert.equal(daily.gbpTotal, null);

  const unlimited = getPlanMatch(plan("japan-airalo-unlimited-10d"), 21, 42);
  assert.equal(unlimited.packs, 3);
  assert.equal(unlimited.suppliedData, Number.POSITIVE_INFINITY);
  assert.equal(unlimited.nativeTotal, 79.5);
});

test("live catalogue handoffs never acquire an invented total", () => {
  const match = getPlanMatch(plan("spain-klook"), 14, 12);
  assert.equal(match.catalogueOnly, true);
  assert.equal(match.nativeTotal, null);
  assert.equal(match.gbpTotal, null);
  assert.equal(match.suppliedData, Number.POSITIVE_INFINITY);
});

test("a provider with no plans for a destination keeps a live-catalogue handoff", () => {
  const providers = ["Airalo", "Klook", "Nomad", "Saily"];
  const handoff = (provider) => ({ provider, catalogueOnly: true });

  // The shape a live Saily feed produces for a destination with no manual snapshots.
  const sailyOnly = [
    { provider: "Saily", id: "saily-live-a" },
    { provider: "Saily", id: "saily-live-b" },
  ];
  const composed = withProviderHandoffs(sailyOnly, providers, handoff);

  assert.deepEqual(
    composed.map((plan) => plan.provider),
    ["Saily", "Saily", "Airalo", "Klook", "Nomad"],
    "every provider must stay on the page, not just the one with a live feed",
  );
  assert.deepEqual(
    composed.filter((plan) => plan.catalogueOnly).map((plan) => plan.provider),
    ["Airalo", "Klook", "Nomad"],
  );

  // Fully covered destinations gain nothing; uncovered ones fall back to all four.
  const allCovered = providers.map((provider) => ({ provider, id: `${provider}-1` }));
  assert.equal(withProviderHandoffs(allCovered, providers, handoff).length, 4);
  assert.deepEqual(withProviderHandoffs([], providers, handoff).map((plan) => plan.provider), providers);
});

test("a plan is only hidden when nothing about it is better", () => {
  const base = {
    gbpTotal: 10, suppliedData: 10, validity: 30, callingSupport: "data-only",
    tethering: "allowed", speed: "4G / 5G", speedCap: "none stated", fairUse: "top up",
  };
  const keep = (over) => ({ ...base, ...over });

  // Plainly worse: costs more, no more data, no more validity.
  let { shown, dominated } = partitionDominated([keep({ id: "cheap" }), keep({ id: "dear", gbpTotal: 20 })]);
  assert.deepEqual(shown.map((p) => p.id), ["cheap"]);
  assert.deepEqual(dominated.map((p) => p.id), ["dear"]);

  // Costs more but lasts longer — that is a real trade-off, so it must stay.
  ({ shown, dominated } = partitionDominated([keep({ id: "short", validity: 5 }), keep({ id: "long", gbpTotal: 20, validity: 10 })]));
  assert.deepEqual(dominated, [], "a longer-lasting plan is not dominated by a cheaper short one");
  assert.deepEqual(shown.map((p) => p.id), ["short", "long"]);

  // Differing qualitative terms are never interchangeable, whatever the price.
  for (const difference of [
    { callingSupport: "calls-texts" }, { tethering: "not-allowed" },
    { speed: "3G only" }, { speedCap: "1Mbps after 5GB" }, { fairUse: "different" },
  ]) {
    const result = partitionDominated([keep({ id: "cheap" }), keep({ id: "other", gbpTotal: 20, ...difference })]);
    assert.deepEqual(result.dominated, [], `plans differing by ${Object.keys(difference)[0]} must both show`);
  }

  // Catalogue handoffs carry no price and must never be hidden or hide anything.
  ({ dominated } = partitionDominated([keep({ id: "cheap" }), keep({ id: "handoff", gbpTotal: null, catalogueOnly: true })]));
  assert.deepEqual(dominated, []);

  // The cheapest option always survives, so a provider can never be emptied.
  const many = [1, 2, 3, 4].map((n) => keep({ id: `p${n}`, gbpTotal: n * 5 }));
  assert.ok(partitionDominated(many).shown.length >= 1);
  assert.equal(partitionDominated(many).shown[0].id, "p1");
});

test("evidence links never carry affiliate tracking", async () => {
  const { getProviderSourceUrl, getProviderUrl, destinationById } = await import("../lib/destinations.ts");
  const original = process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID;
  try {
    process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID = "12345";
    for (const destination of Object.values(destinationById)) {
      // The buy link is tracked...
      assert.match(getProviderUrl("Klook", destination), /aid=12345/, `${destination.id} CTA should be tracked`);
      // ...but the citation beside it must not be.
      assert.doesNotMatch(getProviderSourceUrl("Klook", destination), /aid=/, `${destination.id} source link must stay untracked`);
    }
    for (const provider of ["Airalo", "Nomad", "Saily"]) {
      assert.doesNotMatch(getProviderSourceUrl(provider, destinationById.france), /aid=|aff=/);
    }
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID;
    else process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID = original;
  }
});
