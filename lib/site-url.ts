import { headers } from "next/headers";

/**
 * The site's canonical origin, used by every canonical tag, social image and
 * sitemap entry so they can never disagree.
 *
 * `NEXT_PUBLIC_SITE_URL` wins when set. Preferring configuration over the
 * request's Host header matters once the site is public: a request carrying a
 * forged Host would otherwise mint canonicals and sitemap entries pointing at
 * someone else's domain. Falling back to the request host keeps local
 * development and preview deployments working without configuration.
 */
export async function getSiteOrigin(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    try {
      const url = new URL(configured);
      if (url.protocol === "https:" || url.protocol === "http:") return url.origin;
    } catch {
      // Fall through to the request host rather than emit a malformed origin.
    }
  }

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}
