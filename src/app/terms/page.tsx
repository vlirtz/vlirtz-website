import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of use",
  description: `Terms for using the ${site.name} website.`,
  path: "/terms",
});

/**
 * Website terms of use.
 */
export default function TermsPage() {
  return (
    <section className="bg-white py-16">
      <Container className="prose-blog max-w-3xl">
        <h1 className="text-4xl font-semibold text-navy">Terms of use</h1>
        <p className="text-muted">Last updated 24 August 2026.</p>
        <p>
          This website is provided by {site.legalName} ({site.legalForm}),
          org.nr {site.orgNumber}, trading as {site.name}.
        </p>
        <h2>Using the site</h2>
        <p>
          The content on vlirtz.com is for general information. It is not a
          proposal, guarantee of results, or legal, tax, or investment advice.
          Project work is agreed separately in writing.
        </p>
        <h2>Intellectual property</h2>
        <p>
          The VLIRTZ name, logo, and site content belong to the operator unless
          otherwise stated. You may not copy them for commercial use without
          permission.
        </p>
        <h2>Liability</h2>
        <p>
          The site is provided as is. We are not liable for downtime, or for
          decisions you make based only on public pages or blog posts.
        </p>
        <h2>Governing law</h2>
        <p>
          These terms are governed by Swedish law. Courts of Sweden have
          jurisdiction, with Stockholm as the first venue where applicable.
        </p>
        <h2>Contact</h2>
        <p>
          Questions: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Container>
    </section>
  );
}
