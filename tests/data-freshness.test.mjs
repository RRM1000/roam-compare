import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

import { FX_EVIDENCE, plans } from "../lib/catalog.ts";
import { esimSources } from "../lib/esim-devices.ts";
import { ROAMING_REVIEW_AFTER } from "../lib/roaming.ts";

function runFreshness(date) {
  return spawnSync(process.execPath, ["--experimental-strip-types", "scripts/check-data-freshness.mjs", `--date=${date}`], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
}

function shiftDays(iso, days) {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * Dates are derived from the data rather than written in, because every price
 * refresh moves the review windows. Hard-coded dates made these tests fail on
 * each refresh for reasons that had nothing to do with the freshness logic.
 */
const reviewAfterDates = [
  ...plans.map((plan) => plan.reviewAfter),
  ...Object.values(esimSources).map((source) => source.reviewAfter),
  ROAMING_REVIEW_AFTER,
  FX_EVIDENCE.reviewAfter,
].sort();
const checkedAtDates = [
  ...plans.map((plan) => plan.checkedAt),
  ...Object.values(esimSources).map((source) => source.checkedAt),
  FX_EVIDENCE.checkedAt,
].sort();

const earliestReview = reviewAfterDates[0];
const latestChecked = checkedAtDates[checkedAtDates.length - 1];

test("every source has a window that overlaps the others", () => {
  assert.ok(
    latestChecked <= earliestReview,
    `No date exists where every source is simultaneously fresh: the newest checkedAt is ${latestChecked}, ` +
      `but the earliest reviewAfter is ${earliestReview}. Refresh the sources that expired on ${earliestReview}.`,
  );
});

test("freshness command passes while snapshots are inside their review window", () => {
  const result = runFreshness(earliestReview);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /0 need review/);
});

test("freshness command fails visibly once any manual snapshot is overdue", () => {
  const result = runFreshness(shiftDays(earliestReview, 1));
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /need review/);
  assert.match(result.stdout, /DUE\s{2}/);
});

test("freshness command rejects calendar dates that merely match the date pattern", () => {
  const result = runFreshness("2026-02-31");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /not a valid date/);
});
