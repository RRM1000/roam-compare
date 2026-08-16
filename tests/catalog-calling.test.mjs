import assert from "node:assert/strict";
import test from "node:test";

import { CALLS_CHECKED, plans } from "../lib/catalog.ts";

test("every priced catalogue plan declares its calls and texts support", () => {
  assert.equal(CALLS_CHECKED, "16 August 2026");
  assert.ok(plans.length > 20);
  assert.equal(new Set(plans.map((plan) => plan.id)).size, plans.length);

  for (const plan of plans) {
    assert.ok(["data-only", "calls-texts", "check-plan"].includes(plan.callingSupport));
  }

  assert.ok(plans.every((plan) => plan.callingSupport === "data-only"));
});
