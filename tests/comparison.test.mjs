import assert from "node:assert/strict";
import test from "node:test";

import { plans } from "../lib/catalog.ts";
import { getPlanMatch } from "../lib/comparison.ts";

function plan(id) {
  const found = plans.find((candidate) => candidate.id === id);
  assert.ok(found, `Missing fixture plan ${id}`);
  return found;
}

test("fixed-data matching buys enough packs for both duration and data", () => {
  const match = getPlanMatch(plan("turkey-airalo-1"), 20, 5);
  assert.equal(match.packs, 5);
  assert.equal(match.suppliedData, 5);
  assert.equal(match.nativeTotal, 20);
  assert.equal(match.gbpTotal, 15);
});

test("daily and unlimited plans account for trips longer than one validity period", () => {
  const daily = getPlanMatch(plan("turkey-klook-1gb-daily"), 45, 40);
  assert.equal(daily.packs, 2);
  assert.equal(daily.suppliedData, 45);
  assert.equal(daily.gbpTotal, null);

  const unlimited = getPlanMatch(plan("japan-airalo-unlimited"), 21, 42);
  assert.equal(unlimited.packs, 3);
  assert.equal(unlimited.suppliedData, Number.POSITIVE_INFINITY);
  assert.equal(unlimited.nativeTotal, 103.5);
});

test("live catalogue handoffs never acquire an invented total", () => {
  const match = getPlanMatch(plan("spain-klook"), 14, 12);
  assert.equal(match.catalogueOnly, true);
  assert.equal(match.nativeTotal, null);
  assert.equal(match.gbpTotal, null);
  assert.equal(match.suppliedData, Number.POSITIVE_INFINITY);
});
