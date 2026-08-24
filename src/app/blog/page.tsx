import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blog: AI software, agents and lead generation",
  description:
    "Notes from VLIRTZ on AI software agencies in Stockholm, choosing a software partner, AI agents, consulting, and AI lead generation.",
  path: "/blog",
  keywords: [
    "AI software agency Stockholm",
    "software agency Stockholm",
    "AI agent development",
  ],
});

/**
 * Blog index listing every Markdown post, newest first.
 */
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="reveal-load">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo">
            Blog
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-navy sm:text-5xl">
            Practical writing on AI software in Stockholm
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Longer pages for people searching for an AI software agency, a
            software partner, or a first AI agent.
          </p>
        </div>
        <div className="mt-12 grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              data-reveal
              className="overflow-hidden rounded-3xl border border-line bg-fog md:grid md:grid-cols-[260px_1fr]"
            >
              {post.image ? (
                <Image
                  src={post.image}
                  alt=""
                  width={520}
                  height={360}
                  className="h-48 w-full object-cover md:h-full"
                />
              ) : null}
              <div className="p-8">
                <p className="text-sm text-muted">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-navy">
                  <Link href={`/blog/${post.slug}`} className="hover:text-indigo">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-block text-sm font-medium text-indigo"
                >
                  Read the article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
