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
  assert.match(short.matchReason, /isn.t enough for/);
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

  const eeOverFairUse = turkeyResult("ee", "ee-current", 7, 51, 100);
  assert.equal(eeOverFairUse.dataAllowanceGb, 50);
  assert.equal(eeOverFairUse.comparable, false);

  const skyOverFairUse = turkeyResult("sky-mobile", "sky-passport", 7, 26, 100);
  assert.equal(skyOverFairUse.dataAllowanceGb, 25);
  assert.equal(skyOverFairUse.comparable, false);
});

test("only selected UK-SIM days are charged and partial days round up", () => {
  const skySelectedDays = turkeyResult("sky-mobile", "sky-passport", 2, 1);
  assert.equal(skySelectedDays.cost, 4);
  assert.match(skySelectedDays.detail, /2 activated 24-hour periods/);

  // O2 Travel bills per 24-hour period, and both O2 branches now say so.
  const partialO2Day = turkeyResult("o2", "o2-travel", 1.2, 1);
  assert.equal(partialO2Day.cost, 14);
  assert.match(partialO2Day.detail, /2 24-hour periods/);

  const noUkSimDays = turkeyResult("o2", "o2-travel", 0, 0);
  assert.equal(noUkSimDays.cost, 0);
  assert.equal(noUkSimDays.matched, null);
  assert.equal(noUkSimDays.comparable, false);
});

test("O2 and Three expose published limits and enforce Three's 12GB ceiling", () => {
  // Three no longer publishes a per-day Go Roam rate, so its ceiling is now
  // exercised through a pass, on a destination where a pass is offered.
  const usResult = (scenario, roamingDays, neededData, allowance) =>
    getRoamingResult("three", scenario, roamingDays, "", neededData, "united-states", allowance);
  const o2 = turkeyResult("o2", "o2-travel", 7, 50);
  assert.equal(o2.unlimitedData, true);
  assert.equal(o2.speedCap, "2Mbps");
  assert.equal(o2.callsTexts, "included");
  assert.equal(o2.matched, true);
  assert.equal(o2.comparable, true);

  const exactThreeLimit = usResult("three-world-pass", 7, 12, "20");
  assert.equal(exactThreeLimit.dataAllowanceGb, 12);
  assert.equal(exactThreeLimit.tethering, "not-allowed");
  assert.equal(exactThreeLimit.matched, true);
  assert.equal(exactThreeLimit.comparable, true);

  const overThreeLimit = usResult("three-world-pass", 7, 12.01, "20");
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

test("metered estimates price the selected data amount but respect spend safeguards", () => {
  const smarty = turkeyResult("smarty", "smarty-metered", 2, 1.5);
  assert.equal(smarty.cost, 153.6);
  assert.equal(smarty.dataAllowanceGb, 1.5);
  assert.equal(smarty.allowanceSource, "metered");
  assert.equal(smarty.callsTexts, "extra");
  assert.equal(smarty.matched, false);
  assert.equal(smarty.comparable, false);
  assert.match(smarty.matchReason, /£45 spend limit/);

  const unchecked = getRoamingResult("ee", "plan-check", 7, "", 5, "spain", 20);
  assert.equal(unchecked.cost, null);
  assert.equal(unchecked.matched, null);
  assert.equal(unchecked.comparable, false);
});
