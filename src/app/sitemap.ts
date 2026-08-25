import type { MetadataRoute } from "next";
import { locations } from "@/lib/locations";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

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
    ...getAllPosts().map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
