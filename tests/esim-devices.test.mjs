import assert from "node:assert/strict";
import test from "node:test";

import {
  ESIM_COMPATIBILITY_REVIEW_AFTER,
  esimDevices,
  esimSources,
  getEsimDevice,
  getEsimReadiness,
  searchEsimDevices,
} from "../lib/esim-devices.ts";

test("compatibility records are uniquely identified and traceable", () => {
  assert.ok(esimDevices.length >= 100);
  assert.equal(new Set(esimDevices.map((device) => device.id)).size, esimDevices.length);

  for (const device of esimDevices) {
    assert.match(device.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(["supported", "variant-dependent", "unsupported"].includes(device.support));
    assert.ok(device.caveat.length > 20);
    assert.ok(esimSources[device.sourceId]);
  }

  // Anchored to the module's own review constant rather than fixed dates, which
  // drift every time the manufacturer pages are rechecked.
  for (const source of Object.values(esimSources)) {
    assert.match(source.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(source.reviewAfter, ESIM_COMPATIBILITY_REVIEW_AFTER);
    assert.ok(source.reviewAfter > source.checkedAt, `${source.label}: review date precedes the check`);
    assert.match(source.url, /^https:\/\//);
    assert.ok(source.label.length > 10);
  }
});

test("gets a device by its stable id", () => {
  const pixel = getEsimDevice("google-pixel-8");
  assert.equal(pixel?.manufacturer, "Google");
  assert.equal(pixel?.support, "supported");
  assert.equal(getEsimDevice("constructor"), undefined);
});

test("search ranks exact models and recognises common aliases", () => {
  assert.equal(searchEsimDevices("iPhone 15 Pro")[0]?.id, "apple-iphone-15-pro");
  assert.equal(searchEsimDevices("SE 2020")[0]?.id, "apple-iphone-se-2nd-generation");
  assert.equal(searchEsimDevices("Samsung S24 Ultra")[0]?.id, "samsung-galaxy-s24-ultra");
  assert.equal(searchEsimDevices("XQ-FS54")[0]?.id, "sony-xperia-1-vii-xq-fs54");
  assert.equal(searchEsimDevices("s24 samsung")[0]?.id, "samsung-galaxy-s24");
});

test("search normalises punctuation, accents and whitespace", () => {
  assert.equal(searchEsimDevices("  Galaxy   S21+  ")[0]?.id, "samsung-galaxy-s21-plus");
  assert.equal(searchEsimDevices("Göogle Pixel 8")[0]?.id, "google-pixel-8");
  assert.deepEqual(searchEsimDevices(""), []);
  assert.deepEqual(searchEsimDevices("not a real handset"), []);
});

test("search never returns more than twelve records", () => {
  assert.equal(searchEsimDevices("iphone", 3).length, 3);
  assert.equal(searchEsimDevices("galaxy", 100).length, 12);
  assert.deepEqual(searchEsimDevices("pixel", 0), []);
});

test("readiness stays conservative about locks and regional variants", () => {
  const pixel = getEsimDevice("google-pixel-8");
  const galaxy = getEsimDevice("samsung-galaxy-s24");
  const oldIphone = getEsimDevice("apple-iphone-8");

  assert.equal(getEsimReadiness(pixel, "unlocked"), "ready");
  assert.equal(getEsimReadiness(pixel, "unknown"), "check");
  assert.equal(getEsimReadiness(galaxy, "unlocked"), "check");
  assert.equal(getEsimReadiness(oldIphone, "unlocked"), "blocked");
  assert.equal(getEsimReadiness(undefined, "unlocked"), "unknown");
  assert.equal(getEsimReadiness(undefined, "locked"), "blocked");
});
