import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Fully static output; safe and cheap to pre-render once at build time. */
export const dynamic = "force-static";

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
