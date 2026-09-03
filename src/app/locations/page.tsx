import Link from "next/link";
import { hasAgentMarket } from "@/lib/agent-development";
import { locations } from "@/lib/locations";
import { createPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

const LAST_REVIEWED = "2026-09-03";

export const metadata = createPageMetadata({
  title: "Where we work: AI software agency across Europe and the Middle East",
  description:
    "VLIRTZ works with companies in Stockholm, Copenhagen, Zurich, Amsterdam, Dubai and across Europe. AI agent development, AI consulting and AI lead generation, priced in local currency.",
  path: "/locations",
  keywords: [
    "AI software agency Europe",
    "European AI agency",
    "AI consulting Europe",
    "AI agent development Europe",
  ],
  dateModified: LAST_REVIEWED,
});

/**
 * Hub page linking to every market page, for crawlability and for visitors
 * comparing markets before picking their own.
 *
 * Each card also deep-links the market's agent-development page where one
 * exists, so the hub feeds both page families rather than only the market
 * pages.
 */
export default function LocationsPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Locations" }];

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="bg-white py-16 lg:py-20">
        <Container className="reveal-load mx-auto max-w-2xl text-center">
          <p className="mx-auto inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
            Where we work
          </p>
          <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
            An AI software agency for Europe and the Middle East
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Headquartered in Stockholms lan. Working with companies across
            these markets, remotely by default and on-site when a project
            needs it. Each page covers that market&apos;s regulators, the
            sectors we see most, and pricing in local currency.
          </p>
        </Container>

        <Container className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <article
              key={location.slug}
              data-reveal
              data-delay={String(index % 3)}
              className="flex flex-col rounded-3xl bg-fog p-8 ring-1 ring-line"
            >
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-indigo">
                {location.kind === "region" ? "Region" : location.country}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-navy">
                <Link
                  href={`/locations/${location.slug}`}
                  className="hover:text-indigo"
                >
                  {location.city}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                {location.heroDescription}
              </p>
              <div className="mt-5 flex flex-col gap-2 text-sm">
                <Link
                  href={`/locations/${location.slug}`}
                  className="font-medium text-indigo underline underline-offset-4"
                >
                  {location.metaTitle}
                </Link>
                {hasAgentMarket(location.slug) ? (
                  <Link
                    href={`/services/ai-agent-development/${location.slug}`}
                    className="font-medium text-indigo underline underline-offset-4"
                  >
                    AI agent development in {location.city}
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
