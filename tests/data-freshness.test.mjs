import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

/**
 * These cover the freshness command's own logic, not whether today's data
 * happens to be fresh. That question moved to the scheduled data-freshness
 * workflow, which runs `npm run data:check` against the real review windows.
 *
 * Keeping it out of `npm test` matters: the review windows expire on a seven-day
 * timer, so gating the unit suite on them turned CI red on a calendar schedule
 * rather than in response to a code change.
 *
 * Every date below is far enough outside the real windows that the expected
 * outcome does not change when prices are refreshed.
 */
function runFreshness(date) {
  return spawnSync(process.execPath, ["--experimental-strip-types", "scripts/check-data-freshness.mjs", `--date=${date}`], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
}

test("reports every source as overdue at a date past all review windows", () => {
  const result = runFreshness("2099-01-01");
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /need review/);
  assert.match(result.stdout, /UK roaming snapshot needs review/);
  assert.match(result.stdout, /DUE\s{2}\S+ · (Airalo|Klook|Nomad|Saily)/);
  assert.match(result.stdout, /no fresh priced plan is available/);
});

test("rejects a checkedAt that postdates the day being checked", () => {
  const result = runFreshness("2000-01-01");
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /checkedAt is in the future/);
});

test("checks every plan record and names the source domains it accepts", () => {
  const result = runFreshness("2099-01-01");
  assert.match(result.stdout, /\d+ eSIM plan records across \d+ source groups checked/);
  assert.match(result.stdout, /official roaming sources checked/);
  assert.match(result.stdout, /compatibility sources checked/);
});

test("rejects calendar dates that merely match the date pattern", () => {
  const result = runFreshness("2026-02-31");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /not a valid date/);
});
