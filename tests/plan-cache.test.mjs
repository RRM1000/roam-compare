import assert from "node:assert/strict";
import test from "node:test";

import { readMappedPlans, writeMappedPlans } from "../lib/plan-cache.ts";

/**
 * The shared cache exists because rebuilding the provider catalogues in every
 * cold isolate exhausted the Worker's resources under a crawl, which Cloudflare
 * answered with 503s. These cover the contract the feed modules rely on: it
 * stores and returns plans, and it is a silent no-op everywhere else, so a
 * cache problem can never take the comparison down.
 */

const plan = { id: "saily-live-1", destination: "spain", provider: "Saily", price: 12.49 };

function stubCache() {
  const store = new Map();
  globalThis.caches = {
    default: {
      async match(request) {
        const hit = store.get(request.url);
        return hit ? hit.clone() : undefined;
      },
      async put(request, response) {
        store.set(request.url, response.clone());
      },
    },
  };
  return store;
}

async function withCache(siteUrl, run) {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const originalCaches = globalThis.caches;
  if (siteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = siteUrl;
  const store = stubCache();
  try {
    await run(store);
  } finally {
    if (originalSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    if (originalCaches === undefined) delete globalThis.caches;
    else globalThis.caches = originalCaches;
  }
}

test("plans written by one request are readable by the next", async () => {
  await withCache("https://roamcompare.co.uk", async (store) => {
    await writeMappedPlans("saily-plans", [plan], 10800);
    assert.deepEqual(await readMappedPlans("saily-plans"), [plan]);

    // The key sits on the site's own zone, which is what the Workers cache accepts.
    const [url] = [...store.keys()];
    assert.equal(url, "https://roamcompare.co.uk/__plan-cache/saily-plans");
    assert.equal(store.get(url).headers.get("cache-control"), "max-age=10800");
  });
});

test("each feed keeps its own entry", async () => {
  await withCache("https://roamcompare.co.uk", async () => {
    await writeMappedPlans("saily-plans", [plan], 10800);
    await writeMappedPlans("nomad-plans", [{ ...plan, id: "nomad-live-1", provider: "Nomad" }], 21600);
    assert.equal((await readMappedPlans("saily-plans"))[0].provider, "Saily");
    assert.equal((await readMappedPlans("nomad-plans"))[0].provider, "Nomad");
  });
});

test("nothing is stored or returned without a cache or an HTTPS site URL", async () => {
  await withCache(undefined, async (store) => {
    await writeMappedPlans("saily-plans", [plan], 10800);
    assert.equal(store.size, 0, "an unconfigured site URL must not produce a cache key");
    assert.equal(await readMappedPlans("saily-plans"), null);
  });

  await withCache("http://roamcompare.co.uk", async (store) => {
    await writeMappedPlans("saily-plans", [plan], 10800);
    assert.equal(store.size, 0, "plain HTTP must not be cached");
  });

  await withCache("not a url", async () => {
    assert.equal(await readMappedPlans("saily-plans"), null);
  });

  // Outside the Workers runtime there is no cache at all.
  const originalCaches = globalThis.caches;
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  delete globalThis.caches;
  process.env.NEXT_PUBLIC_SITE_URL = "https://roamcompare.co.uk";
  try {
    await writeMappedPlans("saily-plans", [plan], 10800);
    assert.equal(await readMappedPlans("saily-plans"), null);
  } finally {
    if (originalCaches === undefined) delete globalThis.caches;
    else globalThis.caches = originalCaches;
    if (originalSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
});

test("a stored entry that no longer looks like plan data is ignored", async () => {
  await withCache("https://roamcompare.co.uk", async () => {
    globalThis.caches.default.match = async () => new Response(JSON.stringify([{ nope: true }]), { headers: { "content-type": "application/json" } });
    assert.equal(await readMappedPlans("saily-plans"), null);

    globalThis.caches.default.match = async () => new Response("not json", { headers: { "content-type": "application/json" } });
    assert.equal(await readMappedPlans("saily-plans"), null);

    globalThis.caches.default.match = async () => new Response(JSON.stringify([]), { headers: { "content-type": "application/json" } });
    assert.equal(await readMappedPlans("saily-plans"), null);
  });
});

test("a cache that throws never breaks the caller", async () => {
  await withCache("https://roamcompare.co.uk", async () => {
    globalThis.caches.default.match = async () => { throw new Error("cache unavailable"); };
    globalThis.caches.default.put = async () => { throw new Error("cache unavailable"); };
    assert.equal(await readMappedPlans("saily-plans"), null);
    await writeMappedPlans("saily-plans", [plan], 10800);
  });
});
