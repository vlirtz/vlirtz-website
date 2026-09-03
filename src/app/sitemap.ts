import type { MetadataRoute } from "next";
import { agentDevelopmentMarkets } from "@/lib/agent-development";
import { locations } from "@/lib/locations";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

/**
 * Forces this route to be pre-rendered once at build time (like the /blog
 * pages that also read from content/posts) instead of on every request.
 * Without this, calling `new Date()` in the function body can make Next
 * treat the route as dynamic, so it re-reads the filesystem inside the
 * deployed serverless function, where content/posts is not guaranteed to be
 * present the same way it is at build time. That mismatch is what caused
 * /sitemap.xml to 500 in production while working fine in local dev.
 */
export const dynamic = "force-static";

/**
 * Static routes with a real review date each.
 *
 * The previous version stamped every URL with `new Date()` at build time, so
 * the whole site claimed to have changed on every deploy. Google discounts a
 * sitemap that cries wolf, which wastes the one honest freshness signal we
 * have. These dates are updated by hand when a page's content actually
 * changes; market and blog dates come from their own content.
 */
const staticRoutes: { path: string; lastModified: string; priority: number }[] = [
  { path: "", lastModified: "2026-09-03", priority: 1 },
  { path: "/services", lastModified: "2026-08-31", priority: 0.9 },
  { path: "/services/ai-agent-development", lastModified: "2026-09-03", priority: 0.9 },
  { path: "/pricing", lastModified: "2026-09-03", priority: 0.9 },
  { path: "/how-we-work", lastModified: "2026-09-03", priority: 0.8 },
  { path: "/locations", lastModified: "2026-09-03", priority: 0.8 },
  { path: "/about", lastModified: "2026-08-31", priority: 0.7 },
  { path: "/contact", lastModified: "2026-08-31", priority: 0.7 },
  { path: "/blog", lastModified: "2026-09-03", priority: 0.7 },
  { path: "/authors/borja-javierre", lastModified: "2026-09-03", priority: 0.5 },
  { path: "/privacy", lastModified: "2026-08-24", priority: 0.3 },
  { path: "/terms", lastModified: "2026-08-24", priority: 0.3 },
];

/**
 * Generates the XML sitemap for marketing pages, service pages, market
 * pages, and blog posts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: new Date(route.lastModified),
      changeFrequency:
        route.path === "" || route.path === "/blog"
          ? ("weekly" as const)
          : ("monthly" as const),
      priority: route.priority,
    })),
    ...agentDevelopmentMarkets.map((market) => ({
      url: `${site.url}/services/ai-agent-development/${market.slug}`,
      lastModified: new Date(market.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...locations.map((location) => ({
      url: `${site.url}/locations/${location.slug}`,
      lastModified: new Date(location.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getBlogPostEntries(),
  ];
}

/**
 * Reads blog posts for the sitemap, never throwing: a content-read failure
 * should drop blog URLs from the sitemap rather than 500 the whole route.
 */
function getBlogPostEntries(): MetadataRoute.Sitemap {
  try {
    return getAllPosts().map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("[sitemap] Could not read blog posts:", error);
    return [];
  }
}
