import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getFounderJsonLd,
} from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const LAST_REVIEWED = "2026-09-03";

export const metadata = createPageMetadata({
  title: "Borja Javierre i Moyano",
  description:
    "Founder of VLIRTZ, an AI software agency in Stockholm. Software development and electrical engineering background, writing about AI agent development, AI consulting and AI lead generation.",
  path: "/authors/borja-javierre",
  keywords: [
    "Borja Javierre i Moyano",
    "VLIRTZ founder",
    "AI agent developer Stockholm",
    "AI consultant Stockholm",
  ],
  dateModified: LAST_REVIEWED,
  image: site.founder.image,
});

/**
 * Author and founder entity page.
 *
 * For consultancy and agency queries Google weighs a real, identifiable
 * expert heavily, and an author page carrying `Person` JSON-LD with
 * `worksFor`, `knowsAbout` and `sameAs` is how that association is made
 * explicit rather than left to be inferred from a byline string.
 *
 * It is also the target for the author link on every blog post, which turns
 * twelve orphaned bylines into twelve internal links to one expert entity.
 */
export default function AuthorPage() {
  const posts = getAllPosts().filter((post) => post.author === site.founder.name);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: site.founder.name },
  ];

  return (
    <>
      <JsonLd data={getFounderJsonLd()} />
      <JsonLd data={getBreadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="bg-white py-16 lg:py-20">
        <Container className="max-w-3xl">
          <div className="reveal-load flex flex-col gap-8 sm:flex-row sm:items-start">
            <Image
              src={site.founder.image}
              alt={site.founder.name}
              width={480}
              height={480}
              className="h-32 w-32 shrink-0 rounded-3xl object-cover"
              priority
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo">
                {site.founder.role}, {site.name}
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-navy sm:text-5xl">
                {site.founder.name}
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted">
                I run VLIRTZ, an AI software agency based in Stockholms lan. I
                build AI agents for one workflow at a time, advise on which
                workflow is worth the effort, and write most of what is on this
                site.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact">Get in touch</Button>
                <Button
                  href={site.social.linkedin}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer me"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white pb-20">
        <Container className="max-w-3xl">
          <div data-reveal className="space-y-14">
            <article>
              <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
                Background
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-muted">
                <p>
                  My background is software development and electrical
                  engineering. Before VLIRTZ I also spent time in business, sales
                  and marketing in other ventures, which is why the work here
                  sits between product, delivery and finding customers rather
                  than in only one of them.
                </p>
                <p>
                  I founded VLIRTZ in late 2025 to help companies that needed
                  software actually implemented: websites, workflows, portals,
                  dashboards, and now AI agents that do real work inside those
                  systems. The recurring pattern in that work is a process that
                  depends on one person&apos;s judgement and therefore does not
                  scale, which is the problem most of our agent builds address.
                </p>
                <p>
                  I work in English, Swedish and Spanish. The brand is based in
                  Stockholms lan and works with clients across Europe and the
                  Middle East.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
                What I write about
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-muted">
                <p>
                  Mostly the unglamorous half of AI agent work: measuring a
                  workflow before automating it, why retrieval quality matters
                  more than model choice, where a human should stay in the loop,
                  and how European data protection rules change the architecture
                  rather than just the paperwork.
                </p>
                <p>
                  I try not to write anything I have not actually run into. If a
                  post makes a claim about how long something takes or what it
                  costs, it is because I have done it, and where I am
                  extrapolating I say so.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {posts.length > 0 ? (
        <section className="bg-fog py-20">
          <Container className="max-w-3xl">
            <div data-reveal>
              <SectionHeading
                eyebrow="Writing"
                title={`Posts by ${site.founder.firstName}`}
              />
            </div>
            <ul className="mt-10 space-y-4">
              {posts.map((post, index) => (
                <li
                  key={post.slug}
                  data-reveal
                  data-delay={String(index % 3)}
                  className="rounded-3xl bg-white p-6 ring-1 ring-line"
                >
                  <Link href={`/blog/${post.slug}`} className="group">
                    <p className="text-xs text-muted">
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-navy group-hover:text-indigo">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {post.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
