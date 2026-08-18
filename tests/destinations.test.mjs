import assert from "node:assert/strict";
import test from "node:test";

import { destinationById, getProviderUrl, hasKlookTracking, hasNomadTracking } from "../lib/destinations.ts";

const klookEnvironmentVariables = [
  "NEXT_PUBLIC_KLOOK_AFFILIATE_URL",
  "NEXT_PUBLIC_KLOOK_AFFILIATE_URL_UNITED_STATES",
  "NEXT_PUBLIC_KLOOK_AFFILIATE_URL_SPAIN",
  "NEXT_PUBLIC_KLOOK_AFFILIATE_URL_JAPAN",
  "NEXT_PUBLIC_KLOOK_AFFILIATE_URL_UAE",
];

test("Klook affiliate overrides accept only HTTPS Klook URLs", () => {
  const originalValues = Object.fromEntries(klookEnvironmentVariables.map((name) => [name, process.env[name]]));

  try {
    process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL = "https://affiliate.klook.com/turkey?aid=123";
    assert.equal(
      getProviderUrl("Klook", destinationById.turkey),
      "https://affiliate.klook.com/turkey?aid=123",
    );

    const unsafeOverrides = [
      "http://www.klook.com/activity/128551/",
      "https://klook.com.example.test/activity/128551/",
      "https://notklook.com/activity/128551/",
      "https://user:password@www.klook.com/activity/128551/",
      "not a URL",
    ];

    for (const unsafeOverride of unsafeOverrides) {
      process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL = unsafeOverride;
      assert.match(
        getProviderUrl("Klook", destinationById.turkey),
        /^https:\/\/www\.klook\.com\/en-GB\/activity\/128551-/,
      );
    }

    delete process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_URL_SPAIN;
    assert.match(
      getProviderUrl("Klook", destinationById.spain),
      /^https:\/\/www\.klook\.com\/activity\/163606-/,
    );
  } finally {
    for (const name of klookEnvironmentVariables) {
      const originalValue = originalValues[name];
      if (originalValue === undefined) delete process.env[name];
      else process.env[name] = originalValue;
    }
  }
});

test("Nomad stays dormant until a tracking link is configured", () => {
  const names = [
    "NEXT_PUBLIC_NOMAD_AFFILIATE_URL",
    "NEXT_PUBLIC_NOMAD_AFFILIATE_URL_SPAIN",
  ];
  const originals = Object.fromEntries(names.map((name) => [name, process.env[name]]));

  try {
    for (const name of names) delete process.env[name];

    // Pre-approval: public pages, and nothing claims an affiliate relationship.
    assert.equal(getProviderUrl("Nomad", destinationById.turkey), "https://www.nomadesim.com/turkey-eSIM");
    assert.equal(getProviderUrl("Nomad", destinationById.spain), "https://www.nomadesim.com/en/spain-eSIM");
    assert.equal(hasNomadTracking(), false);

    // A single link with no per-destination override applies everywhere.
    process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL = "https://www.nomadesim.com/turkey-eSIM?aff=123";
    assert.equal(getProviderUrl("Nomad", destinationById.japan), "https://www.nomadesim.com/turkey-eSIM?aff=123");
    assert.equal(hasNomadTracking(), true);

    // A per-destination link wins over the general one.
    process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL_SPAIN = "https://www.nomadesim.com/en/spain-eSIM?aff=456";
    assert.equal(getProviderUrl("Nomad", destinationById.spain), "https://www.nomadesim.com/en/spain-eSIM?aff=456");

    // Anything off-host, insecure or malformed falls back and stays unmarked.
    for (const unsafe of [
      "http://www.nomadesim.com/turkey-eSIM",
      "https://nomadesim.com.example.test/turkey",
      "https://notnomad.com/turkey-eSIM",
      "https://user:password@www.nomadesim.com/turkey-eSIM",
      "not a URL",
    ]) {
      process.env.NEXT_PUBLIC_NOMAD_AFFILIATE_URL = unsafe;
      assert.equal(getProviderUrl("Nomad", destinationById.turkey), "https://www.nomadesim.com/turkey-eSIM", `expected ${unsafe} to be rejected`);
      assert.equal(hasNomadTracking(), false, `expected ${unsafe} to leave Nomad unmarked`);
    }
  } finally {
    for (const name of names) {
      if (originals[name] === undefined) delete process.env[name];
      else process.env[name] = originals[name];
    }
  }
});

test("one Klook affiliate id tracks every destination", () => {
  const original = process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID;
  try {
    delete process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID;
    assert.equal(hasKlookTracking(), false);
    // Every destination has a real country product page, never a search fallback.
    for (const destination of Object.values(destinationById)) {
      const url = getProviderUrl("Klook", destination);
      assert.match(url, /^https:\/\/www\.klook\.com\/[a-zA-Z-]*\/?activity\//, `${destination.id} has no Klook product page`);
      assert.doesNotMatch(url, /aid=/, `${destination.id} must not be tracked before an id is set`);
    }

    process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID = "12345";
    assert.equal(hasKlookTracking(), true);
    for (const destination of Object.values(destinationById)) {
      assert.match(getProviderUrl("Klook", destination), /[?&]aid=12345(&|$)/, `${destination.id} is not tracked`);
    }

    // A non-numeric id is ignored rather than pasted into every outbound link.
    for (const bad of ["abc", "12345; DROP", "", " "]) {
      process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID = bad;
      assert.doesNotMatch(getProviderUrl("Klook", destinationById.france), /aid=/, `expected ${JSON.stringify(bad)} to be rejected`);
      assert.equal(hasKlookTracking(), false);
    }
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID;
    else process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID = original;
  }
});
