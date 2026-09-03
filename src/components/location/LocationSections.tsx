import type { LocationSection } from "@/lib/locations";
import { Container } from "@/components/ui/Container";

type LocationSectionsProps = {
  sections: LocationSection[];
};

/**
 * Renders a market's long-form prose blocks.
 *
 * This is where most of a market page's word count and all of its genuinely
 * local substance lives. It is deliberately plain: headings and paragraphs,
 * no cards or columns, because the content is meant to be read rather than
 * scanned, and because Google needs it as flowing text rather than as
 * fragments scattered across UI chrome.
 */
export function LocationSections({ sections }: LocationSectionsProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="bg-white pb-20">
      <Container className="max-w-3xl">
        <div className="space-y-14">
          {sections.map((section, index) => (
            <article key={section.heading} data-reveal data-delay={String(index % 3)}>
              <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-base leading-7 text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
