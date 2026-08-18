import assert from "node:assert/strict";
import test from "node:test";

import { destinations } from "../lib/destinations.ts";
import { getRoamingResult, getScenarioOptions } from "../lib/roaming.ts";

/**
 * Zones transcribed from the EE mobile plan price guide (4 August 2026),
 * "Countries included in ROW", page 14 — the same PDF cited as EE's evidence in
 * lib/roaming.ts. EU/EEA/Switzerland destinations need no ROW pass, which the
 * guide states directly: "To use data whilst roaming abroad outside of the
 * EU/EEA/Switzerland you will need to purchase a pass."
 */
const eeZones = {
  // EU / EEA — no ROW pass required
  spain: "eu", france: "eu", italy: "eu", greece: "eu", portugal: "eu",
  germany: "eu", netherlands: "eu", ireland: "eu", cyprus: "eu",
  // ROW Zone 1
  australia: "row1", canada: "row1", indonesia: "row1", mexico: "row1",
  thailand: "row1", turkey: "row1", "united-arab-emirates": "row1", "united-states": "row1",
  // ROW Zone 2
  egypt: "row2", morocco: "row2",
  // ROW Zone 3
  japan: "row3",
};

const expectedTitle = {
  eu: "EE Europe roaming estimate",
  row1: "EE RoW Zone 1 pass estimate",
  row2: "EE RoW Zone 2 pass estimate",
  row3: "EE RoW Zone 3 pass estimate",
};

function eeResult(destination, days, neededGb = 6, allowance = "10") {
  const scenario = getScenarioOptions("ee", destination)
    .find((option) => !["custom", "included", "plan-check"].includes(option.value));
  assert.ok(scenario, `${destination} has no concrete EE scenario`);
  return getRoamingResult("ee", scenario.value, days, "", neededGb, destination, allowance);
}

test("every destination maps to the EE zone its price guide lists", () => {
  assert.equal(Object.keys(eeZones).length, destinations.length);

  for (const destination of destinations) {
    const zone = eeZones[destination.id];
    assert.ok(zone, `${destination.id} is not mapped to an EE zone`);
    const result = eeResult(destination.id, 7);
    assert.equal(result.title, expectedTitle[zone], `${destination.id} priced as the wrong EE zone`);
    assert.notEqual(result.cost, null, `${destination.id} produced no EE price`);
  }
});

test("EE pass prices match the published guide", () => {
  // Zone 1: 24-hour £6, 7-day £30, 15-day £50.
  assert.equal(eeResult("united-states", 1).cost, 6);
  assert.equal(eeResult("united-states", 7).cost, 30);
  assert.equal(eeResult("united-states", 15).cost, 50);

  // Zone 2: 24-hour £8, 7-day £40, 15-day £60.
  assert.equal(eeResult("egypt", 1).cost, 8);
  assert.equal(eeResult("egypt", 7).cost, 40);
  assert.equal(eeResult("egypt", 15).cost, 60);

  // Zone 3 sells only a 24-hour pass, so a week is seven of them.
  assert.equal(eeResult("japan", 1).cost, 8);
  assert.equal(eeResult("japan", 7).cost, 56);
});

test("Zone 1 and 2 use the UK allowance; Zone 3 supplies its own 500MB a day", () => {
  const zone1 = eeResult("thailand", 7, 6, "10");
  assert.equal(zone1.allowanceSource, "user-entered");
  assert.equal(zone1.matched, true, "10GB of UK allowance should cover a 6GB trip");

  const zone3 = eeResult("japan", 7, 6, "10");
  assert.equal(zone3.allowanceSource, "published");
  assert.equal(zone3.dataAllowanceGb, 3.5, "Zone 3 gives 500MB per day, not the UK allowance");
  assert.equal(zone3.matched, false, "3.5GB cannot cover a 6GB trip");
});

test("a UK allowance too small for the trip is reported as a mismatch", () => {
  const tight = eeResult("morocco", 7, 6, "2");
  assert.equal(tight.matched, false);
  assert.match(tight.matchReason, /2GB/);
  assert.match(tight.matchReason, /6GB/);
});
