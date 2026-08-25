/**
 * Canonical business, contact, and navigation data for vlirtz.com.
 * Keep this file as the single source of truth for SEO and footer NAP.
 */
export const site = {
  name: "VLIRTZ",
  legalName: "Borja Javierre i Moyano",
  legalForm: "enskild firma",
  orgNumber: "19970113-8233",
  relatedCompany: "VIDIS SERVICES AB",
  url: "https://vlirtz.com",
  email: "info@vlirtz.com",
  phone: "+46 76 451 40 94",
  phoneHref: "tel:+46764514094",
  whatsapp: "+46 76 451 40 94",
  whatsappHref: "https://wa.me/46764514094",
  hours: "09:00-17:00 CET",
  founded: "2025",
  description:
    "Stockholm-based AI software agency building AI agents, advising on AI strategy, and running AI lead generation for companies in Europe and the Middle East.",
  tagline: "Your AI partner for building, advising and growing.",
  address: {
    street: "Kokillbacken 7 Lgh 1004",
    postalCode: "196 40",
    city: "Kungsängen",
    region: "Stockholms län",
    country: "Sweden",
    countryCode: "SE",
    /** Street only. Apartment numbers confuse Google Maps geocoding. */
    mapQuery: "Kokillbacken 7, 19640 Kungsängen, Sweden",
    latitude: 59.4815,
    longitude: 17.7397,
  },
  social: {
    linkedin: "https://www.linkedin.com/company/vlirtz/",
    instagram: "https://www.instagram.com/vlirtzcom/",
    youtube: "https://www.youtube.com/@vlirtz",
  },
  founder: {
    name: "Borja Javierre i Moyano",
    firstName: "Borja",
    role: "Founder",
    image: "/images/borja.jpg",
  },
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    short:
      "Building autonomous AI systems that reason and act on multi-step tasks.",
    summary:
      "We design and build AI agents that perceive context, plan across steps, and take action in your tools and workflows, with humans in control of the important decisions.",
    image: "/images/workspace-macbook.jpg",
    imageAlt: "MacBook on a desk showing a code editor",
  },
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    short: "Advising businesses on AI strategy and implementation.",
    summary:
      "We help you choose the right use cases, architecture, and rollout plan, from first experiment to something your team actually uses.",
    image: "/images/consulting-meeting.jpg",
    imageAlt: "Team in a consulting meeting around a desk",
  },
  {
    slug: "ai-lead-generation",
    title: "AI Lead Generation",
    short: "Using AI to find, score and engage highly interested customers.",
    summary:
      "We use AI to identify, score, and engage potential customers from public and first-party signals, so sales time goes to people who are actually interested.",
    image: "/images/developer-focus.jpg",
    imageAlt: "Developer reviewing work on a widescreen monitor",
  },
] as const;

/**
 * Formats the public street address as a single line.
 */
export function formatAddressLine(): string {
  const { street, postalCode, city, region, country } = site.address;
  return `${street}, ${postalCode} ${city}, ${region}, ${country}`;
}

/**
 * Formats the public street address across two lines for cards and schema.
 */
export function formatAddressBlock(): string[] {
  const { street, postalCode, city, region, country } = site.address;
  return [street, `${postalCode} ${city}`, `${region}, ${country}`];
}
