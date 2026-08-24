import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

/**
 * Generates the XML sitemap for marketing pages and blog posts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["", "/about", "/services", "/contact", "/blog", "/privacy", "/terms"];

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
    ...getAllPosts().map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
