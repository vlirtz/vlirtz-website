import Link from "next/link";
import type { LocationFaqItem } from "@/lib/locations";
import { getPostBySlug } from "@/lib/posts";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type AgentFaqProps = {
  /** Heading text, normally naming the market. */
  title: string;
  items: LocationFaqItem[];
  relatedPostSlugs?: string[];
  /** ISO date of the last content review, shown as a freshness signal. */
  dateModified: string;
};

/**
 * FAQ block for the agent-development pages, paired with FAQPage JSON-LD.
 *
 * The visible "last reviewed" line matters: competitors ranking for these
 * queries publish one, and a real review date is a freshness signal that
 * costs nothing to keep honest.
 */
export function AgentFaq({
  title,
  items,
  relatedPostSlugs = [],
  dateModified,
}: AgentFaqProps) {
  const relatedPosts = relatedPostSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => post !== null);

  return (
    <section className="bg-white py-20">
      <Container className="max-w-3xl">
        <div data-reveal>
          <SectionHeading eyebrow="FAQ" title={title} />
        </div>
        <dl className="mt-10 space-y-6">
          {items.map((item, index) => (
            <div
              key={item.question}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-fog p-6 ring-1 ring-line"
            >
              <dt className="text-lg font-semibold text-navy">{item.question}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>

        {relatedPosts.length > 0 ? (
          <div className="mt-10">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-indigo">
              Related reading
            </p>
            <ul className="mt-3 space-y-2">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-indigo underline underline-offset-2"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/contact">Talk about a workflow</Button>
          <Button href="/pricing" variant="secondary">
            See pricing
          </Button>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          This page was last reviewed on{" "}
          <time dateTime={dateModified}>
            {new Date(dateModified).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          .
        </p>
      </Container>
    </section>
  );
}
