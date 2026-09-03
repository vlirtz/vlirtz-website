import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import {
  createPageMetadata,
  FOUNDER_ID,
  getBreadcrumbJsonLd,
  ORGANIZATION_ID,
} from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Builds static paths for every blog post.
 */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/**
 * Builds metadata for an individual blog post.
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    dateModified: post.lastModified,
    image: post.image,
  });
}

/**
 * Renders a single Markdown blog post with BlogPosting and BreadcrumbList
 * JSON-LD.
 *
 * The author is emitted as a reference to the sitewide founder Person node
 * rather than as a bare name string, so the post is attributed to a real
 * entity with credentials instead of an anonymous byline. The visible byline
 * links to that entity's author page, which turns every post into an
 * internal link to the expert entity Google is asked to trust.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `${site.url}/blog/${post.slug}`;
  const isFounder = post.author === site.founder.name;
  const wasUpdated = post.lastModified !== post.date;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title },
  ];

  /** Formats an ISO date for visible copy. */
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.lastModified,
          author: isFounder
            ? { "@id": FOUNDER_ID }
            : { "@type": "Person", name: post.author },
          publisher: { "@id": ORGANIZATION_ID },
          mainEntityOfPage: url,
          image: post.image ? `${site.url}${post.image}` : undefined,
          keywords: post.keywords.join(", "),
        }}
      />
      <JsonLd data={getBreadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />

      <article className="bg-white py-16 lg:py-20">
        <Container className="max-w-3xl">
          <div className="reveal-load">
            <p className="text-sm text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
              {isFounder ? (
                <Link
                  href="/authors/borja-javierre"
                  rel="author"
                  className="font-medium text-indigo underline underline-offset-2"
                >
                  {post.author}
                </Link>
              ) : (
                post.author
              )}
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-navy sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {post.description}
            </p>
            {wasUpdated ? (
              <p className="mt-4 text-xs text-muted">
                Updated{" "}
                <time dateTime={post.lastModified}>
                  {formatDate(post.lastModified)}
                </time>
                .
              </p>
            ) : null}
          </div>

          {post.image ? (
            <Image
              src={post.image}
              alt=""
              width={1200}
              height={700}
              className="reveal-load-image reveal-load-delay-1 mt-8 h-auto w-full rounded-3xl object-cover"
              priority
            />
          ) : null}

          <div className="prose-blog mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-14 rounded-3xl bg-fog p-8 ring-1 ring-line">
            <h2 className="text-xl font-semibold text-navy">
              Thinking about a build like this?
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              We scope one workflow at a time, publish our price bands, and
              will tell you when an agent is the wrong answer.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/services/ai-agent-development">
                How we build agents
              </Button>
              <Button href="/pricing" variant="secondary">
                See pricing
              </Button>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
