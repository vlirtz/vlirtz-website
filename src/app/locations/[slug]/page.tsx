import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug, locations } from "@/lib/locations";
import {
  createPageMetadata,
  getLocationFaqJsonLd,
  getLocationServiceJsonLd,
} from "@/lib/seo";
import { LocationFaq } from "@/components/location/LocationFaq";
import { LocationHero } from "@/components/location/LocationHero";
import { LocationMarketNote } from "@/components/location/LocationMarketNote";
import { LocationServices } from "@/components/location/LocationServices";
import { JsonLd } from "@/components/seo/JsonLd";

type LocationPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Builds static paths for every market page.
 */
export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

/**
 * Builds metadata for an individual market page.
 */
export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) {
    return {};
  }

  return createPageMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
    keywords: location.keywords,
  });
}

/**
 * Market/location landing page: hero, market context, services, and FAQ.
 */
export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return (
    <>
      <JsonLd data={getLocationServiceJsonLd(location)} />
      <JsonLd data={getLocationFaqJsonLd(location)} />
      <LocationHero location={location} />
      <LocationMarketNote location={location} />
      <LocationServices location={location} />
      <LocationFaq location={location} />
    </>
  );
}
