import type { MetadataRoute } from "next";
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
 * Generates the XML sitemap for marketing pages, market pages, and blog posts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/locations",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified,
      changeFrequency:
        path === "" || path === "/blog"
          ? ("weekly" as const)
          : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...locations.map((location) => ({
      url: `${site.url}/locations/${location.slug}`,
      lastModified,
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
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("[sitemap] Could not read blog posts:", error);
    return [];
  }
}
