import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";
import { getSiteOrigin } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getSiteOrigin();
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...destinations.map((destination) => ({
      url: `${siteUrl}/destinations/${destination.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
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
