import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-url";

/**
 * Public: every page may be crawled, and the sitemap is advertised so search
 * engines find the destination guides without waiting to discover links.
 * The sitemap URL uses the same configured origin as every canonical tag.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await getSiteOrigin();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
