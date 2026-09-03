import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /**
   * ISO date of the last substantive content review. When present it is
   * emitted as an `article:modified_time` Open Graph property, so freshness
   * signals reflect real edits instead of the build timestamp.
   */
  dateModified?: string;
  /** Per-page social image path. Falls back to the sitewide /og.jpg. */
  image?: string;
};

/**
 * Builds consistent page metadata, Open Graph tags, and a canonical URL.
 *
 * @param options - Page title, description, path and optional extras.
 * @returns A Next.js Metadata object with canonical, Open Graph and Twitter tags.
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  dateModified,
  image = "/og.jpg",
}: PageSeo): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = title === site.name ? title : `${title} | ${site.name}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(dateModified ? { modifiedTime: dateModified } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/**
 * Human-readable address used in visible page copy so it matches the
 * Google Business Profile listing byte for byte.
 */
export { formatAddressLine as getVisibleAddress } from "@/lib/site";
