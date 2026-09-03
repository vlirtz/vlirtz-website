import { locations } from "@/lib/locations";
import { services, site } from "@/lib/site";

/** Stable @id values so schema nodes can reference each other across pages. */
export const ORGANIZATION_ID = `${site.url}/#organization`;
export const FOUNDER_ID = `${site.url}/#founder`;

/**
 * Postal address node, shared by every schema that needs it.
 */
function getPostalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.countryCode,
  };
}

/**
 * Every market we serve, as schema areaServed entries.
 *
 * Built from the locations registry rather than hard-coded, since the
 * previous version listed only Stockholm, Sweden, Europe and the Middle
 * East, so Copenhagen, Zurich and Amsterdam were absent from the schema
 * while having dedicated pages.
 */
function getAreaServed() {
  return [
    ...locations.map((location) => ({
      "@type": location.kind === "region" ? "Place" : "City",
      name: location.city,
    })),
    { "@type": "Country", name: "Sweden" },
    { "@type": "Place", name: "European Union" },
  ];
}

/**
 * Returns Organization + LocalBusiness JSON-LD for the homepage and contact page.
 *
 * `knowsAbout` and `hasOfferCatalog` are what let Google associate the entity
 * with the service topics rather than only with the address.
 */
export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/images/logo-horizontal.png`,
    description: site.description,
    foundingDate: site.founded,
    address: getPostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    areaServed: getAreaServed(),
    knowsAbout: [
      "AI agent development",
      "AI consulting",
      "AI lead generation",
      "Retrieval-augmented generation",
      "Workflow automation",
      "GDPR compliance for AI systems",
      "EU AI Act",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
        },
      })),
    },
    // TODO: add the Clutch profile URL here once the listing is live. A
    // Clutch profile is currently the third organic result for "ai software
    // agency stockholm", and claiming the entity association is worth more
    // than the link alone. See docs/seo-offpage-checklist.md.
    sameAs: [site.social.linkedin, site.social.instagram, site.social.youtube],
    openingHours: "Mo-Fr 09:00-17:00",
    priceRange: "$$",
    founder: { "@id": FOUNDER_ID },
  };
}

/**
 * Returns WebSite JSON-LD used in the root layout.
 */
export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Person JSON-LD for the founder.
 *
 * For consultancy queries Google weighs a real, identifiable expert heavily,
 * and a Person node linked to the Organization and to external profiles is
 * how that association is made explicit rather than inferred.
 */
export function getFounderJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: site.founder.name,
    givenName: site.founder.firstName,
    jobTitle: site.founder.role,
    image: `${site.url}${site.founder.image}`,
    url: `${site.url}/authors/borja-javierre`,
    email: site.email,
    telephone: site.phone,
    worksFor: { "@id": ORGANIZATION_ID },
    address: getPostalAddress(),
    knowsLanguage: ["en", "sv", "es", "ca"],
    knowsAbout: [
      "AI agent development",
      "Software development",
      "Electrical engineering",
      "AI strategy",
      "AI lead generation",
    ],
    sameAs: [site.social.linkedin],
  };
}
