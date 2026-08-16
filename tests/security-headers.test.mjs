import assert from "node:assert/strict";
import test from "node:test";

async function fetchWorker(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function assertSecurityHeaders(response) {
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    response.headers.get("permissions-policy"),
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  );
}

test("application responses include the security headers", async () => {
  const response = await fetchWorker("/");
  assert.equal(response.status, 200);
  assertSecurityHeaders(response);
});

test("image-optimization responses include the security headers", async () => {
  const response = await fetchWorker("/_vinext/image");
  assert.equal(response.status, 400);
  assertSecurityHeaders(response);
});
