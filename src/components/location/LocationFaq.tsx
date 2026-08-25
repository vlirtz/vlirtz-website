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
 * FAQ block, paired with FAQPage JSON-LD on the page itself. Answers stay
 * honest about the remote delivery model for non-Stockholm markets.
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
            eyebrow="Common questions"
            title={`Working with VLIRTZ from ${location.city}`}
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
        <div className="mt-10 flex justify-center">
          <Button href="/contact">Get in touch</Button>
        </div>
      </Container>
    </section>
  );
}
