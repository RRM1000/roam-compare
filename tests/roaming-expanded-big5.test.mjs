import test from "node:test";
import assert from "node:assert/strict";

import {
  getRoamingResult,
  getScenarioOptions,
  networkRoamingEvidence,
  ROAMING_CHECKED_AT,
  ROAMING_REVIEW_AFTER,
  scenarioRoamingEvidence,
} from "../lib/roaming.ts";

const officialSources = {
  ee: "https://ee.co.uk/content/dam/help/terms-and-conditions/price-plans/mobile/pay-monthly-price-plans/ee-mobile-plan-price-guide-04082026.pdf",
  o2: "https://www.o2.co.uk/eu-roaming",
  o2Travel: "https://www.o2.co.uk/international/o2-travel",
  vodafone: "https://www.vodafone.co.uk/mobile/global-roaming",
  vodafoneExtras: "https://www.vodafone.co.uk/mobile/extras",
  three: "https://www.three.co.uk/support/roaming-and-calling-abroad/roaming-abroad/go-roam",
  threePasses: "https://www.three.co.uk/support/roaming-and-calling-abroad/roaming-abroad",
  id: "https://www.idmobile.co.uk/help-and-support/roaming",
  idEurope: "https://www.idmobile.co.uk/help-and-support/eu-roaming/fair-usage-policy",
};

function optionValues(network, destination) {
  return getScenarioOptions(network, destination).map(({ value }) => value);
}

function roaming(network, scenario, days, dataGb, destination, allowanceGb = null) {
  return getRoamingResult(network, scenario, days, "", dataGb, destination, allowanceGb);
}

function assertFacts(actual, expected, context) {
  for (const [field, value] of Object.entries(expected.fields)) {
    assert.deepEqual(actual[field], value, `${context}: ${field}`);
  }

  // Sources carry their own review windows, so assert the window is coherent
  // rather than pinning a date that every recheck would have to update.
  assert.match(actual.evidence.checkedAt, /^\d{4}-\d{2}-\d{2}$/, `${context}: evidence checkedAt`);
  assert.ok(actual.evidence.reviewAfter >= actual.evidence.checkedAt, `${context}: evidence window`);
  assert.equal(actual.evidence.url, expected.source, `${context}: official source`);
  assert.match(actual.evidence.url, /^https:\/\//, `${context}: HTTPS evidence URL`);

  if (expected.copy) {
    assert.match(`${actual.title} ${actual.detail} ${actual.caveat}`, expected.copy, `${context}: qualification copy`);
  }
}

test("the expanded Big Five options expose a conservative primary scenario for all four destinations", () => {
  const contract = [
    ["spain", "ee", "ee-europe-new", ["included", "custom"]],
    ["spain", "o2", "o2-europe", ["included", "custom"]],
    ["spain", "vodafone", "vodafone-europe-pass", ["vodafone-europe-day", "included", "custom"]],
    ["spain", "three", "three-europe-pass", ["included", "custom"]],
    ["spain", "id-mobile", "id-europe", ["included", "custom"]],

    ["united-states", "ee", "ee-row1", ["included", "custom"]],
    ["united-states", "o2", "o2-travel", ["included", "custom"]],
    ["united-states", "vodafone", "plan-check", ["included", "custom"]],
    ["united-states", "three", "three-world-pass", ["included", "custom"]],
    ["united-states", "id-mobile", "id-roam-beyond", ["included", "custom"]],

    ["japan", "ee", "ee-row3", ["included", "custom"]],
    ["japan", "o2", "o2-travel", ["included", "custom"]],
    ["japan", "vodafone", "plan-check", ["included", "custom"]],
    ["japan", "three", "three-extra-pass", ["included", "custom"]],
    ["japan", "id-mobile", "id-roam-beyond", ["included", "custom"]],

    ["united-arab-emirates", "ee", "ee-row1", ["included", "custom"]],
    ["united-arab-emirates", "o2", "o2-travel", ["included", "custom"]],
    ["united-arab-emirates", "vodafone", "plan-check", ["included", "custom"]],
    ["united-arab-emirates", "three", "three-extra-pass", ["included", "custom"]],
    ["united-arab-emirates", "id-mobile", "id-metered-world", ["included", "custom"]],
  ];

  for (const [destination, network, primary, alsoRequired] of contract) {
    const values = optionValues(network, destination);
    assert.equal(values[0], primary, `${network}/${destination}: primary scenario`);
    for (const scenario of alsoRequired) {
      assert.ok(values.includes(scenario), `${network}/${destination}: missing ${scenario}`);
    }
  }
});

test("scenario labels disclose the plan-date, zone, pass and metered-price distinctions that change the answer", () => {
  const label = (network, destination, scenario) =>
    getScenarioOptions(network, destination).find(({ value }) => value === scenario)?.label ?? "";

  assert.match(label("ee", "spain", "ee-europe-new"), /7 Jul 2021/i);
  assert.match(label("vodafone", "japan", "plan-check"), /live checker/i);
  assert.match(label("three", "spain", "three-europe-pass"), /3, 7 or 14 days/i);
  assert.match(label("three", "united-states", "three-world-pass"), /Go Roam World pass/i);
  assert.match(label("vodafone", "united-states", "plan-check"), /charge checker/i);
  assert.match(label("three", "japan", "three-extra-pass"), /Go Roam Extra pass/i);
  assert.match(label("id-mobile", "united-arab-emirates", "id-metered-world"), /£9\.60\/MB/i);
});

test("Spain results use the published Europe charges and fair-use limits", () => {
  const cases = [
    {
      context: "EE Spain 14 days",
      actual: roaming("ee", "ee-europe-new", 14, 5, "spain", 10),
      fields: { cost: 30, dataAllowanceGb: 10, allowanceSource: "user-entered", tethering: "allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.ee,
      copy: /7 July 2021|15-day|Europe/i,
    },
    {
      context: "O2 Spain",
      actual: roaming("o2", "o2-europe", 10, 20, "spain", 30),
      fields: { cost: 0, dataAllowanceGb: 25, unlimitedData: false, allowanceSource: "user-entered", tethering: "allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.o2,
      copy: /25GB|Europe Zone/i,
    },
    {
      context: "Vodafone Spain eight-day pass",
      actual: roaming("vodafone", "vodafone-europe-pass", 8, 5, "spain", 10),
      fields: { cost: 16, dataAllowanceGb: 10, allowanceSource: "user-entered", tethering: "allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.vodafoneExtras,
      copy: /Zone B|8-day|UK allowance/i,
    },
    {
      context: "Three Spain seven-day pass",
      actual: roaming("three", "three-europe-pass", 7, 5, "spain", 20),
      fields: { cost: 12, dataAllowanceGb: 12, allowanceSource: "user-entered", tethering: "allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.threePasses,
      copy: /12GB|7-day|Go Roam Europe/i,
    },
    {
      context: "iD Spain Roam Free",
      actual: roaming("id-mobile", "id-europe", 7, 5, "spain", 50),
      fields: { cost: 0, dataAllowanceGb: 30, unlimitedData: false, allowanceSource: "user-entered", tethering: "allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.idEurope,
      copy: /30GB|fair.?use|until further notice/i,
    },
  ];

  for (const { actual, context, ...expected } of cases) assertFacts(actual, expected, context);
});

test("United States results distinguish allowance passes, daily charges, speed caps and data-only products", () => {
  const cases = [
    {
      context: "EE US 15-day pass",
      actual: roaming("ee", "ee-row1", 15, 10, "united-states", 20),
      fields: { cost: 50, dataAllowanceGb: 20, allowanceSource: "user-entered", tethering: "allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.ee,
      copy: /RoW Zone 1|15-day|UK allowance/i,
    },
    {
      context: "O2 Travel US",
      actual: roaming("o2", "o2-travel", 5, 20, "united-states"),
      fields: { cost: 35, dataAllowanceGb: null, unlimitedData: true, allowanceSource: "published", speedCap: "2Mbps", tethering: "check-plan", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.o2Travel,
      copy: /£7|24 hours|2Mbps/i,
    },
    {
      // Vodafone stopped publishing a Zone C day rate, so this hands off
      // instead of quoting one.
      context: "Vodafone US, no published rate",
      actual: roaming("vodafone", "plan-check", 4, 5, "united-states", 10),
      fields: { cost: null, dataAllowanceGb: null, allowanceSource: "unknown", tethering: "check-plan", callsTexts: "check-plan", matched: null, comparable: false },
      source: officialSources.vodafone,
      copy: /check|checker|account/i,
    },
    {
      context: "Three US Go Roam World pass",
      actual: roaming("three", "three-world-pass", 3, 5, "united-states", 20),
      fields: { cost: 12.5, dataAllowanceGb: 12, allowanceSource: "user-entered", tethering: "not-allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.threePasses,
      copy: /Go Roam World|18 December 2025|£8/i,
    },
    {
      context: "iD US Roam Beyond",
      actual: roaming("id-mobile", "id-roam-beyond", 6, 12, "united-states"),
      fields: { cost: 25, dataAllowanceGb: 12, unlimitedData: false, allowanceSource: "published", speedCap: "No published cap; 5G on selected networks", callsTexts: "not-included", matched: true, comparable: true },
      source: officialSources.id,
      copy: /data-only|activate immediately|5-day.*1-day/i,
    },
  ];

  for (const { actual, context, ...expected } of cases) assertFacts(actual, expected, context);
});

test("Japan results keep Vodafone account-specific while safely pricing the other four networks", () => {
  const cases = [
    {
      context: "EE Japan Row 3",
      actual: roaming("ee", "ee-row3", 2, 1, "japan"),
      fields: { cost: 16, dataAllowanceGb: 1, unlimitedData: false, allowanceSource: "published", tethering: "allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.ee,
      copy: /RoW Zone 3|500MB|24-hour/i,
    },
    {
      context: "O2 Travel Japan",
      actual: roaming("o2", "o2-travel", 2, 5, "japan"),
      fields: { cost: 14, unlimitedData: true, speedCap: "2Mbps", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.o2Travel,
      copy: /£7|24 hours|2Mbps/i,
    },
    {
      context: "Vodafone Japan checker",
      actual: roaming("vodafone", "plan-check", 5, 5, "japan"),
      fields: { cost: null, comparable: false, dataAllowanceGb: null, allowanceSource: "unknown", tethering: "check-plan", callsTexts: "check-plan", matched: null },
      source: officialSources.vodafone,
      copy: /live (?:roaming )?checker|account|plan/i,
    },
    {
      context: "Three Japan five-day Extra pass",
      actual: roaming("three", "three-extra-pass", 5, 5, "japan", 20),
      fields: { cost: 29.75, dataAllowanceGb: 12, allowanceSource: "user-entered", tethering: "not-allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.threePasses,
      copy: /Go Roam Extra|5-day|12GB/i,
    },
    {
      context: "iD Japan Roam Beyond",
      actual: roaming("id-mobile", "id-roam-beyond", 5, 10, "japan"),
      fields: { cost: 20, dataAllowanceGb: 10, allowanceSource: "published", callsTexts: "not-included", matched: true, comparable: true },
      source: officialSources.id,
      copy: /data-only|activate immediately|5-day/i,
    },
  ];

  for (const { actual, context, ...expected } of cases) assertFacts(actual, expected, context);
});

test("UAE results use Zone 1, O2 Travel, Zone D, Go Roam Extra and iD metered rates respectively", () => {
  const cases = [
    {
      context: "EE UAE seven-day pass",
      actual: roaming("ee", "ee-row1", 7, 5, "united-arab-emirates", 10),
      fields: { cost: 30, dataAllowanceGb: 10, allowanceSource: "user-entered", tethering: "allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.ee,
      copy: /RoW Zone 1|7-day|UK allowance/i,
    },
    {
      context: "O2 Travel UAE",
      actual: roaming("o2", "o2-travel", 7, 5, "united-arab-emirates"),
      fields: { cost: 49, unlimitedData: true, speedCap: "2Mbps", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.o2Travel,
      copy: /£7|24 hours|2Mbps/i,
    },
    {
      context: "Vodafone UAE, no published rate",
      actual: roaming("vodafone", "plan-check", 2, 5, "united-arab-emirates", 10),
      fields: { cost: null, dataAllowanceGb: null, allowanceSource: "unknown", tethering: "check-plan", callsTexts: "check-plan", matched: null, comparable: false },
      source: officialSources.vodafone,
      copy: /check|checker|account/i,
    },
    {
      context: "Three UAE Around World Extra pass",
      actual: roaming("three", "three-extra-pass", 2, 5, "united-arab-emirates", 20),
      fields: { cost: 17.5, dataAllowanceGb: 12, allowanceSource: "user-entered", tethering: "not-allowed", callsTexts: "included", matched: true, comparable: true },
      source: officialSources.threePasses,
      copy: /Go Roam Extra|pass/i,
    },
    {
      context: "iD UAE metered data",
      actual: roaming("id-mobile", "id-metered-world", 1, 0.001, "united-arab-emirates"),
      fields: { cost: 9.83, dataAllowanceGb: 0.001, unlimitedData: false, allowanceSource: "metered", tethering: "allowed", callsTexts: "extra", matched: false, comparable: false },
      source: officialSources.id,
      copy: /£9\.60\/MB|metered|standard roaming/i,
    },
  ];

  for (const { actual, context, ...expected } of cases) assertFacts(actual, expected, context);
});

test("every result carries the review window of the source it links to", () => {
  const sources = [...Object.values(networkRoamingEvidence), ...Object.values(scenarioRoamingEvidence)];
  const byUrl = new Map(sources.map((source) => [`${source.label}|${source.url}`, source]));

  for (const [destination, network, scenario] of [
    ["spain", "ee", "ee-europe-new"],
    ["united-states", "o2", "o2-travel"],
    ["japan", "three", "three-extra-pass"],
    ["united-arab-emirates", "id-mobile", "id-metered-world"],
  ]) {
    const result = roaming(network, scenario, 1, 0.001, destination, 1);
    const source = byUrl.get(`${result.evidence.label}|${result.evidence.url}`);
    assert.ok(source, `${destination}/${scenario}: evidence is not a registered source`);
    assert.equal(result.evidence.checkedAt, source.checkedAt);
    assert.equal(result.evidence.reviewAfter, source.reviewAfter);
  }

  // The headline dates must report the least fresh source, so one unread
  // operator page cannot hide behind the ones that were rechecked.
  assert.equal(ROAMING_CHECKED_AT, sources.map((s) => s.checkedAt).sort()[0]);
  assert.equal(ROAMING_REVIEW_AFTER, sources.map((s) => s.reviewAfter).sort()[0]);
});
