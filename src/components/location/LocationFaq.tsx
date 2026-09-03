import Link from "next/link";
import type { Location } from "@/lib/locations";
import { getPostBySlug } from "@/lib/posts";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LocationFaqProps = {
  location: Location;
};

/**
 * FAQ block, paired with FAQPage JSON-LD on the page itself.
 *
 * The heading uses the market's primary keyword phrasing rather than a
 * generic "Common questions", since this is often the section that surfaces
 * as a rich result. Answers stay honest about the remote delivery model for
 * every market other than Stockholm.
 */
export function LocationFaq({ location }: LocationFaqProps) {
  const relatedPosts = location.relatedPostSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => post !== null);

  return (
    <section className="bg-fog py-20">
      <Container className="max-w-3xl">
        <div data-reveal>
          <SectionHeading
            eyebrow="FAQ"
            title={`Questions we get about AI work in ${location.city}`}
          />
        </div>
        <dl className="mt-10 space-y-6">
          {location.faq.map((item, index) => (
            <div
              key={item.question}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-white p-6 ring-1 ring-line"
            >
              <dt className="text-lg font-semibold text-navy">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-muted">
                {item.answer}
              </dd>
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
          <Button href="/contact">Get in touch</Button>
          <Button href="/pricing" variant="secondary">
            See pricing
          </Button>
        </div>
        <p className="mt-8 text-center text-xs text-muted">
          This page was last reviewed on{" "}
          <time dateTime={location.dateModified}>
            {new Date(location.dateModified).toLocaleDateString("en-GB", {
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
