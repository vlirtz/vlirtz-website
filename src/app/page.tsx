import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { ServiceDetails } from "@/components/home/ServiceDetails";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeFaq } from "@/lib/faq";
import { createPageMetadata, getFaqJsonLd, getLocalBusinessJsonLd } from "@/lib/seo";

/**
 * The homepage owns "ai software agency stockholm", the primary commercial
 * query, because it carries the most internal link equity on the site. The
 * previous title ("Expert Software Development Agency in Stockholm...") did
 * not contain the word "AI" at all, so the strongest page on the site was
 * not competing for the term the business most wants.
 *
 * Keyword ownership is deliberately split to avoid cannibalisation:
 *   /                                        -> ai software agency stockholm
 *   /locations/stockholm                     -> ai consulting stockholm
 *   /services/ai-agent-development           -> ai agent development
 *   /services/ai-agent-development/stockholm -> ai agent development stockholm
 * See `docs/seo-baseline.md` for the full map.
 */
export const metadata = createPageMetadata({
  title: "AI Software Agency in Stockholm",
  description:
    "VLIRTZ is an AI software agency in Stockholm. We build AI agents, advise on AI strategy, and run AI lead generation for companies across Europe and the Middle East.",
  path: "/",
  keywords: [
    "AI software agency Stockholm",
    "AI agency Stockholm",
    "software agency Stockholm",
    "AI agent development",
    "AI consulting Stockholm",
    "AI lead generation",
  ],
});

/**
 * Homepage: hero, services, about, projects, FAQ, and contact. No testimonials.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={getLocalBusinessJsonLd()} />
      <JsonLd data={getFaqJsonLd(homeFaq)} />
      <Hero />
      <AboutPreview />
      <ServiceDetails />
      <Projects />
      <Faq />
      <ContactSection />
    </>
  );
}
