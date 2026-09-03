import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * A 404 must not be indexable, and it must not inherit the homepage title
 * either, which is what happened before this export existed: every unknown
 * URL rendered as "AI Software Agency in Stockholm | VLIRTZ".
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "That URL is not on this site.",
  robots: { index: false, follow: true },
};

/** Useful destinations, so a 404 recovers the visit instead of ending it. */
const suggestions = [
  { href: "/services/ai-agent-development", label: "AI agent development" },
  { href: "/pricing", label: "Pricing" },
  { href: "/locations", label: "Where we work" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/**
 * Fallback page for unknown routes.
 */
export default function NotFound() {
  return (
    <section className="bg-white py-24">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-navy">Page not found</h1>
        <p className="mt-4 text-muted">
          That URL is not on this site. One of these is probably what you were
          looking for.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex rounded-full bg-fog px-4 py-2 text-sm text-navy ring-1 ring-line hover:text-indigo"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button href="/">Back to the homepage</Button>
        </div>
      </Container>
    </section>
  );
}
