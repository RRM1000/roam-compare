/** Cloudflare Worker entry point for RoamCompare. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { cacheableCopy, pageCacheKey, servedFromCache } from "../lib/page-cache";

/** Replaced at build time (vite.config.ts), so each deploy gets its own page cache. */
declare const __ROAMCOMPARE_BUILD_ID__: string | undefined;
const BUILD_ID = typeof __ROAMCOMPARE_BUILD_ID__ === "string" ? __ROAMCOMPARE_BUILD_ID__ : undefined;

type EdgeCache = { match(request: Request): Promise<Response | undefined>; put(request: Request, response: Response): Promise<void> };
const edgeCache = () => (globalThis as { caches?: { default?: EdgeCache } }).caches?.default ?? null;

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const SECURITY_HEADERS = {
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
} as const;

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);

      return withSecurityHeaders(response);
    }

    const key = pageCacheKey(request, BUILD_ID);
    const cache = key ? edgeCache() : null;
    if (key && cache) {
      const hit = await cache.match(key).catch(() => undefined);
      if (hit) return withSecurityHeaders(servedFromCache(hit));
    }

    const response = await handler.fetch(request, env, ctx);
    if (key && cache) {
      const copy = cacheableCopy(response);
      if (copy) ctx.waitUntil(cache.put(key, copy).catch(() => undefined));
    }
    return withSecurityHeaders(response);
  },
};

export default worker;
