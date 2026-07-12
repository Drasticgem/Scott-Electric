import type { MetadataRoute } from "next";
import { DISCVAULT } from "@/lib/constants";
import { getAllDiscRoutes } from "@/lib/catalog/queries";

// Discs get added to Supabase independently of a deploy, so this needs to
// refresh on its own rather than freezing at build time — hourly is plenty
// for a catalog that doesn't change minute to minute.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getAllDiscRoutes();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: DISCVAULT.siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${DISCVAULT.siteUrl}/catalog`, changeFrequency: "daily", priority: 0.8 },
  ];

  const discEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${DISCVAULT.siteUrl}/discs/${route.brandSlug}/${route.moldSlug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...discEntries];
}
