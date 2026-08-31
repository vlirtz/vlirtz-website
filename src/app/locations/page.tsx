import Link from "next/link";
import { locations } from "@/lib/locations";
import { createPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

export const metadata = createPageMetadata({
  title: "Where we work: AI software agency across Europe and the Middle East",
  description:
    "VLIRTZ works with companies in Stockholm, Zurich, Amsterdam, Copenhagen, Dubai, and across Europe. AI agent development, AI consulting, and AI lead generation.",
  path: "/locations",
  keywords: [
    "AI software agency Europe",
    "AI consulting Europe",
    "AI lead generation Europe",
  ],
});

/**
 * Hub page linking to every market/location page, for crawlability and
 * for visitors comparing markets before picking their own page.
 */
export default function LocationsPage() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container className="reveal-load mx-auto max-w-2xl text-center">
        <p className="mx-auto inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
          Where we work
        </p>
        <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
          An AI software agency for Europe and the Middle East
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Headquartered in Stockholm. Working with companies across these
          markets, remotely by default and on-site when a project needs it.
        </p>
      </Container>

      <Container className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((location, index) => (
          <Link
            key={location.slug}
            href={`/locations/${location.slug}`}
            data-reveal
            data-delay={String(index % 3)}
            className="rounded-3xl bg-fog p-8 ring-1 ring-line transition-transform hover:-translate-y-0.5"
          >
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-indigo">
              {location.kind === "region" ? "Region" : location.country}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-navy">
              {location.city}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {location.heroDescription}
            </p>
          </Link>
        ))}
      </Container>
    </section>
  );
}
