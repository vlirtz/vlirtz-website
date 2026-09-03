import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug, locations } from "@/lib/locations";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getLocationServiceJsonLd,
} from "@/lib/seo";
import { LocationFaq } from "@/components/location/LocationFaq";
import { LocationHero } from "@/components/location/LocationHero";
import { LocationMarketNote } from "@/components/location/LocationMarketNote";
import { LocationNotForYou } from "@/components/location/LocationNotForYou";
import { LocationOtherMarkets } from "@/components/location/LocationOtherMarkets";
import { LocationRegulators } from "@/components/location/LocationRegulators";
import { LocationSections } from "@/components/location/LocationSections";
import { LocationServices } from "@/components/location/LocationServices";
import { PricingBands } from "@/components/pricing/PricingBands";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

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
    dateModified: location.dateModified,
  });
}

/**
 * Market landing page, targeting "AI software agency {city}".
 *
 * Section order follows how buyers actually read these pages: what we are,
 * the market context, the substance, the services, the compliance answer,
 * the price, who we are wrong for, then the FAQ. The companion page at
 * /services/ai-agent-development/{city} answers the narrower
 * "how do you build agents" question, so the two do not compete.
 */
export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations" },
    { name: location.city },
  ];

  return (
    <>
      <JsonLd data={getLocationServiceJsonLd(location)} />
      <JsonLd data={getFaqJsonLd(location.faq)} />
      <JsonLd data={getBreadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <LocationHero location={location} />
      <LocationMarketNote location={location} />
      <LocationSections sections={location.sections} />
      <LocationServices location={location} />
      <LocationRegulators
        city={location.city}
        regulators={location.localRegulators}
      />
      <PricingBands
        title={`What an AI project costs in ${location.city}`}
        currency={location.currency}
        bands={location.pricingBands}
      />
      <LocationNotForYou city={location.city} reasons={location.notForYouIf} />
      <LocationFaq location={location} />
      <LocationOtherMarkets slug={location.slug} />
    </>
  );
}
