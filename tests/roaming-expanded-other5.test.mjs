import assert from "node:assert/strict";
import test from "node:test";

import { getRoamingResult, getScenarioOptions } from "../lib/roaming.ts";

const result = (network, scenario, days, dataGb, destination, allowance = null) =>
  getRoamingResult(network, scenario, days, "", dataGb, destination, allowance);

test("the remaining five networks expose destination-specific, qualified scenarios", () => {
  const expected = [
    ["spain", "sky-mobile", "sky-passport"],
    ["spain", "giffgaff", "giffgaff-europe"],
    ["spain", "smarty", "smarty-europe"],
    ["spain", "voxi", "voxi-europe"],
    ["spain", "tesco-mobile", "tesco-europe"],
    ["united-states", "giffgaff", "giffgaff-check"],
    ["united-states", "smarty", "smarty-metered-us"],
    ["united-states", "voxi", "voxi-global"],
    ["united-states", "tesco-mobile", "tesco-metered-us"],
    ["japan", "sky-mobile", "plan-check"],
    ["japan", "smarty", "smarty-metered-world"],
    ["united-arab-emirates", "voxi", "voxi-metered"],
    ["united-arab-emirates", "tesco-mobile", "tesco-metered-world"],
  ];

  for (const [destination, network, scenario] of expected) {
    assert.equal(getScenarioOptions(network, destination)[0].value, scenario, `${network}/${destination}`);
  }
});

test("Spain inclusive routes apply published caps before declaring a match", () => {
  const sky = result("sky-mobile", "sky-passport", 7, 30, "spain", 40);
  assert.equal(sky.cost, 14);
  assert.equal(sky.dataAllowanceGb, 25);
  assert.equal(sky.matched, false);
  assert.equal(sky.comparable, false);
  assert.equal(sky.tethering, "allowed");
  assert.equal(sky.callsTexts, "included");

  const giffgaff = result("giffgaff", "giffgaff-europe", 7, 4, "spain", 10);
  assert.equal(giffgaff.cost, 0);
  assert.equal(giffgaff.dataAllowanceGb, 5);
  assert.equal(giffgaff.matched, true);
  assert.equal(giffgaff.tethering, "allowed");

  const smarty = result("smarty", "smarty-europe", 7, 12.1, "spain", 100);
  assert.equal(smarty.dataAllowanceGb, 12);
  assert.equal(smarty.matched, false);
  assert.equal(smarty.callsTexts, "check-plan");

  const tesco = result("tesco-mobile", "tesco-europe", 7, 6, "spain", 8);
  assert.equal(tesco.cost, 0);
  assert.equal(tesco.dataAllowanceGb, 8);
  assert.equal(tesco.comparable, true);
});

test("VOXI pass estimates cover duration and disclose their finite data", () => {
  const europe = result("voxi", "voxi-europe", 10, 8, "spain", 12);
  assert.equal(europe.cost, 19.8);
  assert.equal(europe.dataAllowanceGb, 12);
  assert.equal(europe.matched, true);
  assert.match(europe.detail, /8-day/);
  assert.match(europe.detail, /2-day/);

  const global = result("voxi", "voxi-global", 10, 3, "united-states");
  assert.equal(global.cost, 26.6);
  assert.equal(global.dataAllowanceGb, 4);
  assert.equal(global.matched, true);
  assert.equal(global.callsTexts, "included");

  const heavy = result("voxi", "voxi-global", 10, 5, "japan");
  assert.equal(heavy.dataAllowanceGb, 4);
  assert.equal(heavy.matched, false);
  assert.equal(heavy.comparable, false);
});

test("giffgaff EU overage charges only data above the entered inclusive allowance", () => {
  const unknown = result("giffgaff", "giffgaff-europe-overage", 7, 6, "spain");
  assert.equal(unknown.cost, null);
  assert.equal(unknown.matched, null);
  assert.equal(unknown.comparable, false);

  const capped = result("giffgaff", "giffgaff-europe-overage", 7, 6, "spain", 10);
  assert.equal(capped.cost, 102.4);
  assert.equal(capped.dataAllowanceGb, 6);
  assert.equal(capped.matched, true);
  assert.equal(capped.callsTexts, "included");
  assert.match(capped.detail, /6GB target − 5GB included = 1GB/);
});

test("published metered rates price the complete selected data target", () => {
  const cases = [
    ["tesco-mobile", "tesco-metered-us", "united-states", 10.24, false],
    ["giffgaff", "giffgaff-metered", "japan", 204.8, true],
    ["smarty", "smarty-metered-world", "japan", 1024, false],
    ["voxi", "voxi-metered", "united-arab-emirates", 122.88, true],
    ["tesco-mobile", "tesco-metered-world", "united-arab-emirates", 5120, false],
  ];

  for (const [network, scenario, destination, cost, comparable] of cases) {
    const actual = result(network, scenario, 1, 1, destination);
    assert.equal(actual.cost, cost, `${network}/${destination}`);
    assert.equal(actual.allowanceSource, "metered");
    assert.equal(actual.matched, comparable);
    assert.equal(actual.comparable, comparable);
    assert.equal(actual.callsTexts, "extra");
    assert.match(actual.evidence.url, /^https:\/\//);
    assert.equal(actual.evidence.checkedAt, "2026-08-16");
    assert.equal(actual.evidence.reviewAfter, "2026-08-23");
  }
});

test("unpublished roaming remains unpriced and links to official guidance", () => {
  const skyJapan = result("sky-mobile", "plan-check", 7, 5, "japan", 20);
  assert.equal(skyJapan.cost, null);
  assert.equal(skyJapan.comparable, false);
  assert.match(`${skyJapan.detail} ${skyJapan.caveat}`, /does not currently list Japan/i);
  assert.equal(skyJapan.evidence.url, "https://www.sky.com/help/articles/sky-mobile-roaming");

  const giffgaffUs = result("giffgaff", "giffgaff-check", 7, 5, "united-states");
  assert.equal(giffgaffUs.cost, null);
  assert.equal(giffgaffUs.matched, null);
  assert.match(giffgaffUs.evidence.url, /giffgaff\.com/);
});
