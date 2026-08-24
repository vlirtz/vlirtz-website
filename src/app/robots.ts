import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Allows all crawlers and points them at the generated sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
