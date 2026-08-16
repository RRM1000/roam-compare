import assert from "node:assert/strict";
import test from "node:test";

import { getRoamingResult } from "../lib/roaming.ts";

const turkeyResult = (network, scenario, roamingDays, neededData, allowance = undefined, customCost = "") =>
  getRoamingResult(network, scenario, roamingDays, customCost, neededData, "turkey", allowance);

test("included roaming is comparable only after an adequate overseas allowance is entered", () => {
  const unknown = turkeyResult("ee", "included", 7, 5);
  assert.equal(unknown.cost, 0);
  assert.equal(unknown.matched, null);
  assert.equal(unknown.comparable, false);
  assert.equal(unknown.allowanceSource, "unknown");

  const enough = turkeyResult("ee", "included", 7, 5, "8");
  assert.equal(enough.dataAllowanceGb, 8);
  assert.equal(enough.allowanceSource, "user-entered");
  assert.equal(enough.matched, true);
  assert.equal(enough.comparable, true);

  const short = turkeyResult("ee", "included", 7, 5, 4.99);
  assert.equal(short.matched, false);
  assert.equal(short.comparable, false);
  assert.match(short.matchReason, /does not cover/);
});

test("custom cost alone never becomes a like-for-like comparison", () => {
  const noAllowance = turkeyResult("vodafone", "custom", 5, 3, undefined, "24.50");
  assert.equal(noAllowance.cost, 24.5);
  assert.equal(noAllowance.matched, null);
  assert.equal(noAllowance.comparable, false);

  const short = turkeyResult("vodafone", "custom", 5, 3, "2", "24.50");
  assert.equal(short.matched, false);
  assert.equal(short.comparable, false);

  const comparable = turkeyResult("vodafone", "custom", 5, 3, "3", "24.50");
  assert.equal(comparable.matched, true);
  assert.equal(comparable.comparable, true);

  const invalidCost = turkeyResult("vodafone", "custom", 5, 3, "3", "not a price");
  assert.equal(invalidCost.cost, null);
  assert.equal(invalidCost.matched, true);
  assert.equal(invalidCost.comparable, false);
});

test("EE and Sky use the user-entered UK allowance to decide equivalence", () => {
  const eeUnknown = turkeyResult("ee", "ee-current", 3, 2);
  assert.equal(eeUnknown.cost, 18);
  assert.equal(eeUnknown.comparable, false);

  const eeMatched = turkeyResult("ee", "ee-current", 3, 2, 2);
  assert.equal(eeMatched.cost, 18);
  assert.equal(eeMatched.matched, true);
  assert.equal(eeMatched.comparable, true);

  const skyShort = turkeyResult("sky-mobile", "sky-passport", 4, 4, 3);
  assert.equal(skyShort.cost, 8);
  assert.equal(skyShort.matched, false);
  assert.equal(skyShort.comparable, false);

  const skyMatched = turkeyResult("sky-mobile", "sky-passport", 4, 4, 4);
  assert.equal(skyMatched.comparable, true);
});

test("only selected UK-SIM days are charged and partial days round up", () => {
  const threeSelectedDays = turkeyResult("three", "three-new", 2, 1);
  assert.equal(threeSelectedDays.cost, 16);
  assert.match(threeSelectedDays.detail, /2 days/);

  const partialO2Day = turkeyResult("o2", "o2-travel", 1.2, 1);
  assert.equal(partialO2Day.cost, 14);
  assert.match(partialO2Day.detail, /2 days/);

  const noUkSimDays = turkeyResult("o2", "o2-travel", 0, 0);
  assert.equal(noUkSimDays.cost, 0);
  assert.equal(noUkSimDays.matched, null);
  assert.equal(noUkSimDays.comparable, false);
});

test("O2 and Three expose published limits and enforce Three's 12GB ceiling", () => {
  const o2 = turkeyResult("o2", "o2-travel", 7, 50);
  assert.equal(o2.unlimitedData, true);
  assert.equal(o2.speedCap, "2Mbps");
  assert.equal(o2.callsTexts, "included");
  assert.equal(o2.matched, true);
  assert.equal(o2.comparable, true);

  const exactThreeLimit = turkeyResult("three", "three-new", 7, 12);
  assert.equal(exactThreeLimit.dataAllowanceGb, 12);
  assert.equal(exactThreeLimit.tethering, "not-allowed");
  assert.equal(exactThreeLimit.matched, true);
  assert.equal(exactThreeLimit.comparable, true);

  const overThreeLimit = turkeyResult("three", "three-older", 7, 12.01);
  assert.equal(overThreeLimit.matched, false);
  assert.equal(overThreeLimit.comparable, false);
});

test("iD pass selection covers both roaming days and required data", () => {
  const dataHeavyDay = turkeyResult("id-mobile", "id-roam-beyond", 1, 5);
  assert.equal(dataHeavyDay.cost, 15);
  assert.equal(dataHeavyDay.dataAllowanceGb, 6);
  assert.equal(dataHeavyDay.callsTexts, "not-included");
  assert.equal(dataHeavyDay.matched, true);
  assert.equal(dataHeavyDay.comparable, true);

  const sixDays = turkeyResult("id-mobile", "id-roam-beyond", 6, 12);
  assert.equal(sixDays.cost, 25);
  assert.equal(sixDays.dataAllowanceGb, 12);
  assert.match(sixDays.detail, /5-day \/ 10GB/);
  assert.match(sixDays.detail, /1-day \/ 2GB/);
});

test("metered estimates price the selected data amount while unchecked destinations stay unknown", () => {
  const smarty = turkeyResult("smarty", "smarty-metered", 2, 1.5);
  assert.equal(smarty.cost, 153.6);
  assert.equal(smarty.dataAllowanceGb, 1.5);
  assert.equal(smarty.allowanceSource, "metered");
  assert.equal(smarty.callsTexts, "extra");
  assert.equal(smarty.comparable, true);

  const unchecked = getRoamingResult("ee", "plan-check", 7, "", 5, "spain", 20);
  assert.equal(unchecked.cost, null);
  assert.equal(unchecked.matched, null);
  assert.equal(unchecked.comparable, false);
});
