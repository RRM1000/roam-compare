import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

function runFreshness(date) {
  return spawnSync(process.execPath, ["--experimental-strip-types", "scripts/check-data-freshness.mjs", `--date=${date}`], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
}

test("freshness command passes while snapshots are inside their review window", () => {
  const result = runFreshness("2026-08-23");
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /0 need review/);
  assert.match(result.stdout, /current through 2026-08-23/);
});

test("freshness command fails visibly once any manual snapshot is overdue", () => {
  const result = runFreshness("2026-08-24");
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stdout, /need review/);
  assert.match(result.stdout, /UK roaming snapshot needs review/);
  assert.match(result.stdout, /DUE\s{2}turkey · Airalo/);
});

test("freshness command rejects calendar dates that merely match the date pattern", () => {
  const result = runFreshness("2026-02-31");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /not a valid date/);
});
