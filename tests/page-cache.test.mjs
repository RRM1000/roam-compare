import assert from "node:assert/strict";
import test from "node:test";

import { cacheableCopy, PAGE_CACHE_SECONDS, pageCacheKey, servedFromCache } from "../lib/page-cache.ts";

const page = (path, headers = {}) => new Request(`https://roamcompare.co.uk${path}`, { headers: { accept: "text/html,application/xhtml+xml", ...headers } });

test("only identical-for-everyone pages get a cache key", () => {
  assert.ok(pageCacheKey(page("/destinations/india"), "b1"));
  assert.ok(pageCacheKey(page("/"), "b1"));

  // The homepage reads its query; share links and tracking tags just render.
  assert.equal(pageCacheKey(page("/?compare=1&destination=japan"), "b1"), null);
  assert.equal(pageCacheKey(page("/destinations/india?utm_source=x"), "b1"), null);
  // Other routes, JSON and non-GET requests are never cached.
  assert.equal(pageCacheKey(page("/about"), "b1"), null);
  assert.equal(pageCacheKey(page("/api/live-plans/india"), "b1"), null);
  assert.equal(pageCacheKey(new Request("https://roamcompare.co.uk/destinations/india", { method: "POST", headers: { accept: "text/html" } }), "b1"), null);
  assert.equal(pageCacheKey(page("/destinations/india", { accept: "application/json" }), "b1"), null);
  // Local and test renders run over http and must never touch the cache.
  assert.equal(pageCacheKey(new Request("http://localhost/destinations/india", { headers: { accept: "text/html" } }), "b1"), null);
  // Without a build id there is no safe key at all.
  assert.equal(pageCacheKey(page("/destinations/india"), undefined), null);
});

test("client navigation payloads are never served from the page cache", () => {
  for (const header of ["rsc", "next-router-state-tree", "next-router-prefetch", "x-vinext-rsc-render-mode"]) {
    assert.equal(pageCacheKey(page("/destinations/india", { [header]: "1" }), "b1"), null, header);
  }
});

test("a new build never reads the previous build's pages", () => {
  const before = pageCacheKey(page("/destinations/india"), "build-a").url;
  const after = pageCacheKey(page("/destinations/india"), "build-b").url;
  assert.notEqual(before, after);
  assert.match(before, /\/destinations\/india\?__page-cache=build-a$/);
});

test("only a plain 200 HTML page is stored, stripped of Vary and given a TTL", async () => {
  const html = () => new Response("<html>ok</html>", { status: 200, headers: { "content-type": "text/html; charset=utf-8", vary: "RSC, Next-Url" } });

  const original = html();
  const copy = cacheableCopy(original);
  assert.ok(copy);
  assert.equal(copy.headers.get("vary"), null);
  assert.equal(copy.headers.get("cache-control"), `public, max-age=${PAGE_CACHE_SECONDS}`);
  assert.equal(await copy.text(), "<html>ok</html>");
  // The visitor's response is untouched and still readable.
  assert.equal(await original.text(), "<html>ok</html>");

  assert.equal(cacheableCopy(new Response("gone", { status: 404, headers: { "content-type": "text/html" } })), null);
  assert.equal(cacheableCopy(new Response("{}", { status: 200, headers: { "content-type": "application/json" } })), null);
  assert.equal(cacheableCopy(new Response("x", { status: 200, headers: { "content-type": "text/html", "set-cookie": "a=b" } })), null);
});

test("a cached page reaches the browser marked as a hit and not browser-cached", () => {
  const served = servedFromCache(new Response("x", { headers: { "content-type": "text/html", "cache-control": "public, max-age=300" } }));
  assert.equal(served.headers.get("x-page-cache"), "hit");
  assert.equal(served.headers.get("cache-control"), null);
});
