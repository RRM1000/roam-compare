import assert from "node:assert/strict";
import test from "node:test";

import { providerDetails } from "../lib/catalog.ts";
import { destinationById } from "../lib/destinations.ts";
import { getGuideFaqJsonLd, guides } from "../lib/guides/index.ts";
import { getRoamingEvidence, getRoamingResult, getScenarioOptions, networkNames } from "../lib/roaming.ts";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const entries = Object.entries(guides);

test("at least one guide is registered", () => {
  assert.ok(entries.length >= 1);
});

for (const [id, guide] of entries) {
  test(`${id}: guide is registered under its own destination`, () => {
    assert.equal(guide.destination, id);
    assert.ok(destinationById[id], `${id} is not a destination`);
    for (const related of guide.related) assert.ok(destinationById[related], `${id}: related destination ${related} does not exist`);
    assert.ok(!guide.related.includes(id), "a guide must not link to itself");
  });

  test(`${id}: written and updated dates are valid ISO format`, () => {
    assert.match(guide.writtenAt, isoDate);
    assert.match(guide.updatedAt, isoDate);
    assert.ok(guide.updatedAt >= guide.writtenAt);
    if (guide.sources) {
      const ids = new Set();
      for (const source of guide.sources) {
        assert.ok(!ids.has(source.id), `${id}: duplicate source id ${source.id}`);
        ids.add(source.id);
        const url = new URL(source.url);
        assert.equal(url.protocol, "https:", `${id}: ${source.id} must be HTTPS`);
        assert.match(source.checkedAt, isoDate, `${id}: ${source.id} checkedAt`);
        assert.match(source.reviewAfter, isoDate, `${id}: ${source.id} reviewAfter`);
        assert.ok(source.reviewAfter > source.checkedAt, `${id}: ${source.id} review date precedes check date`);
        assert.ok(source.checkedAt <= guide.updatedAt, `${id}: ${source.id} was checked after the guide was last updated`);
        assert.ok(["official", "operator", "provider", "press"].includes(source.kind));
      }
    }
  });

  if (guide.sources && guide.sources.length > 0) {
    test(`${id}: every citation points at a registered source, and every source is cited`, () => {
      const known = new Set(guide.sources.map((source) => source.id));
      const cited = new Set();
      const check = (where, sourceIds) => {
        for (const sourceId of sourceIds || []) {
          assert.ok(known.has(sourceId), `${id}: ${where} cites unknown source ${sourceId}`);
          cited.add(sourceId);
        }
      };
      check("verdict", guide.verdict.sourceIds);
      for (const fact of guide.facts) check(`fact ${fact.label}`, fact.sourceIds);
      for (const row of guide.networks.rows) check(`network ${row.network}`, row.sourceIds);
      for (const note of guide.providers.notes) check(`provider ${note.provider}`, note.sourceIds);
      for (const section of guide.sections) {
        check(`section ${section.id}`, section.sourceIds);
        assert.ok((section.sourceIds || []).length > 0, `${id}: section ${section.id} has no source`);
      }
      for (const faq of guide.faq) {
        check(`faq ${faq.question}`, faq.sourceIds);
        assert.ok((faq.sourceIds || []).length > 0, `${id}: FAQ "${faq.question}" has no source`);
      }
      for (const sourceId of known) assert.ok(cited.has(sourceId), `${id}: source ${sourceId} is listed but never cited`);
    });
  }

  test(`${id}: network rows cover every UK network once and name real scenarios`, () => {
    const seen = new Set();
    for (const row of guide.networks.rows) {
      assert.ok(networkNames[row.network], `${id}: unknown network ${row.network}`);
      assert.ok(!seen.has(row.network), `${id}: ${row.network} appears twice`);
      seen.add(row.network);
      if (row.scenario === null) {
        // A hand-off row must at least link to that network's own roaming page.
        assert.ok(getRoamingEvidence(row.network, "").url.startsWith("https://"));
        continue;
      }
      const options = getScenarioOptions(row.network, id).map((option) => option.value);
      assert.ok(options.includes(row.scenario), `${id}: ${row.network} scenario ${row.scenario} is not offered for this destination (${options.join(", ")})`);
      const result = getRoamingResult(row.network, row.scenario, 7, "", 6, id, "20");
      assert.notEqual(result.cost, null, `${id}: ${row.network}/${row.scenario} is listed as priced but returns no cost`);
    }
    assert.equal(seen.size, Object.keys(networkNames).length, `${id}: every UK network needs a row`);
  });

  test(`${id}: provider notes cover every compared provider once`, () => {
    const providers = guide.providers.notes.map((note) => note.provider);
    assert.deepEqual([...providers].sort(), Object.keys(providerDetails).sort());
  });

  test(`${id}: FAQ structured data is built from the visible questions`, () => {
    const jsonLd = getGuideFaqJsonLd(guide);
    assert.equal(jsonLd["@type"], "FAQPage");
    assert.equal(jsonLd.mainEntity.length, guide.faq.length);
    for (const [index, entry] of guide.faq.entries()) {
      assert.equal(jsonLd.mainEntity[index].name, entry.question);
      assert.equal(jsonLd.mainEntity[index].acceptedAnswer.text, entry.answer);
      assert.match(entry.question, /\?$/, `${id}: "${entry.question}" should be a question`);
    }
    assert.ok(guide.faq.length >= 5, `${id}: a guide needs at least five questions to be worth FAQ markup`);
  });

  test(`${id}: metadata is sized for a search result`, () => {
    assert.ok(guide.title.length <= 70, `${id}: title is ${guide.title.length} characters`);
    assert.ok(guide.description.length >= 80 && guide.description.length <= 320, `${id}: description is ${guide.description.length} characters`);
    assert.ok(guide.title.includes(guide.keyword), `${id}: title should contain the keyword "${guide.keyword}"`);
  });
}

test("Three prices Turkey from its Go Roam Extra page, cheapest mix of passes and days", () => {
  const week = getRoamingResult("three", "three-extra-pass-turkey", 7, "", 6, "turkey", "20");
  assert.equal(week.cost, 42);
  assert.equal(week.tethering, "not-allowed");
  assert.equal(week.dataAllowanceGb, 12);
  assert.match(week.evidence.url, /country=Turkey/);
  assert.equal(getRoamingResult("three", "three-extra-pass-turkey", 1, "", 1, "turkey", "20").cost, 7);
  assert.equal(getRoamingResult("three", "three-extra-pass-turkey", 3, "", 2, "turkey", "20").cost, 17.5);
  // A fortnight is cheaper as a 5-day plus three 3-days than as the 14-day pass.
  assert.equal(getRoamingResult("three", "three-extra-pass-turkey", 14, "", 12, "turkey", "20").cost, 82.25);
  // The 12GB ceiling still applies.
  assert.equal(getRoamingResult("three", "three-extra-pass-turkey", 14, "", 13, "turkey", "20").matched, false);
});
