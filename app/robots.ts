import type { MetadataRoute } from "next";
import { DISCVAULT } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${DISCVAULT.siteUrl}/sitemap.xml`,
  };
}
