import assert from "node:assert/strict";
import test from "node:test";

import { destinationById, getProviderUrl } from "../lib/destinations.ts";

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
