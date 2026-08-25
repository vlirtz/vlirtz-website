import type { Metadata } from "next";
import type { Location } from "./locations";
import { formatAddressLine, site } from "./site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

/**
 * Builds consistent page metadata, Open Graph tags, and a canonical URL.
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageSeo): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle =
    title === site.name ? title : `${title} | ${site.name}`;

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
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og.jpg"],
    },
  };
}

/**
 * Returns Organization + LocalBusiness JSON-LD for the homepage and contact page.
 */
export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/images/logo-horizontal.png`,
    description: site.description,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Stockholm" },
      { "@type": "Country", name: "Sweden" },
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "Middle East" },
    ],
    sameAs: [site.social.linkedin, site.social.instagram, site.social.youtube],
    openingHours: "Mo-Fr 09:00-17:00",
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.role,
    },
  };
}

/**
 * Returns WebSite JSON-LD used in the root layout.
 */
export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

/**
 * Human-readable address used in visible page copy so it matches Google Business.
 */
export function getVisibleAddress(): string {
  return formatAddressLine();
}

/**
 * Service JSON-LD for a market/location page, scoped to that area with
 * areaServed so it stays distinct from the sitewide LocalBusiness entry.
 */
export function getLocationServiceJsonLd(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI software development and consulting",
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.countryCode,
      },
    },
    areaServed: {
      "@type": location.kind === "region" ? "Place" : "City",
      name: location.city,
    },
    description: location.metaDescription,
    url: `${site.url}/locations/${location.slug}`,
  };
}

/**
 * FAQPage JSON-LD for a market/location page's Q&A block.
 */
export function getLocationFaqJsonLd(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
