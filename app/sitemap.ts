import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";
import { getGuide } from "@/lib/guides";
import { getSiteOrigin } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getSiteOrigin();
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...destinations.map((destination) => {
      const guide = getGuide(destination.id);
      return {
        url: `${siteUrl}/destinations/${destination.id}`,
        changeFrequency: "weekly" as const,
        // A written guide is the page search engines should reach first.
        priority: guide ? 0.9 : 0.8,
        ...(guide ? { lastModified: guide.updatedAt } : {}),
      };
    }),
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
