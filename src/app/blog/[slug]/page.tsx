import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/seo";

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
  });
}

/**
 * Renders a single Markdown blog post with Article JSON-LD.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `${site.url}/blog/${post.slug}`;

  return (
    <article className="bg-white py-16 lg:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Person", name: post.author },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntityOfPage: url,
          image: post.image ? `${site.url}${post.image}` : undefined,
          keywords: post.keywords.join(", "),
        }}
      />
      <Container className="max-w-3xl">
        <div className="reveal-load">
          <Link href="/blog" className="text-sm font-medium text-indigo">
            ← Blog
          </Link>
          <p className="mt-6 text-sm text-muted">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.author}
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-navy sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">{post.description}</p>
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
      </Container>
    </article>
  );
}
