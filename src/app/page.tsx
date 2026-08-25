import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { ServiceDetails } from "@/components/home/ServiceDetails";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, getLocalBusinessJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Expert Software Development Agency in Stockholm, Europe, Middle East",
  description:
    "VLIRTZ is an AI software agency in Stockholm. We build AI agents, advise on AI strategy, and run AI lead generation for companies in Europe and the Middle East.",
  path: "/",
  keywords: [
    "AI software agency Stockholm",
    "software agency Stockholm",
    "AI agent development",
    "AI consulting",
    "AI lead generation",
  ],
});

/**
 * Homepage: hero, services, about, projects, and contact. No testimonials.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={getLocalBusinessJsonLd()} />
      <Hero />
      <AboutPreview />
      <ServiceDetails />
      <Projects />
      <ContactSection />
    </>
  );
}
