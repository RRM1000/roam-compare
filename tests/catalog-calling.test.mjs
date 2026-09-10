import assert from "node:assert/strict";
import test from "node:test";

import { DATA_CHECKED_AT, formatCheckedDate, hasPricedPlans, isPlanStale, plans, pricedDestinationIds } from "../lib/catalog.ts";

test("every catalogue record declares calls, hotspot, limits and provenance", () => {
  // One date format across the whole site, from one source.
  // Derived from the constant so a price refresh does not break the formatter test.
  // en-GB abbreviates September as "Sept", which a refresh in August never exercised.
  const [year, month, day] = DATA_CHECKED_AT.split("-").map(Number);
  const expected = `${day} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"][month - 1]} ${year}`;
  assert.equal(formatCheckedDate(DATA_CHECKED_AT), expected);
  assert.ok(plans.length > 45);
  assert.equal(new Set(plans.map((plan) => plan.id)).size, plans.length);

  for (const plan of plans) {
    assert.ok(["data-only", "calls-texts", "check-plan"].includes(plan.callingSupport));
    assert.ok(["allowed", "restricted", "not-allowed", "check-plan"].includes(plan.tethering));
    assert.ok(plan.tetheringNote.length > 5);
    assert.ok(plan.speedCap.length > 5);
    assert.ok(plan.fairUse.length > 5);
    assert.ok(plan.activation.length > 5);
    assert.match(plan.sourceUrl, /^https:\/\//);
    assert.match(plan.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(plan.reviewAfter, /^\d{4}-\d{2}-\d{2}$/);
  }

  assert.ok(plans.some((plan) => plan.callingSupport === "calls-texts"));
  assert.ok(plans.some((plan) => plan.provider === "Klook" && plan.price === null));
});

test("Klook uses verified destination products and never invents package prices", () => {
  const klookPlans = plans.filter((plan) => plan.provider === "Klook");
  assert.match(klookPlans.find((plan) => plan.destination === "turkey")?.sourceUrl ?? "", /activity\/128551-/);
  assert.match(klookPlans.find((plan) => plan.destination === "united-states")?.sourceUrl ?? "", /activity\/108033-/);
  assert.match(klookPlans.find((plan) => plan.destination === "spain")?.sourceUrl ?? "", /activity\/163606-/);
  assert.match(klookPlans.find((plan) => plan.destination === "japan")?.sourceUrl ?? "", /activity\/109393-/);
  assert.match(klookPlans.find((plan) => plan.destination === "united-arab-emirates")?.sourceUrl ?? "", /activity\/123940-/);
  assert.ok(klookPlans.every((plan) => plan.price === null));
});

test("five destinations have manual prices and stale snapshots cannot rank", () => {
  assert.deepEqual([...pricedDestinationIds], ["turkey", "united-states", "spain", "japan", "united-arab-emirates"]);
  assert.ok(pricedDestinationIds.every((destination) => hasPricedPlans(destination)));
  const plan = plans.find((candidate) => candidate.price !== null);
  assert.ok(plan);
  // Anchored to the plan's own window rather than fixed dates, which drift on refresh.
  const lastFreshDay = new Date(`${plan.reviewAfter}T12:00:00Z`);
  const firstStaleDay = new Date(`${plan.reviewAfter}T12:00:00Z`);
  firstStaleDay.setUTCDate(firstStaleDay.getUTCDate() + 1);
  assert.equal(isPlanStale(plan, lastFreshDay), false);
  assert.equal(isPlanStale(plan, firstStaleDay), true);
});
