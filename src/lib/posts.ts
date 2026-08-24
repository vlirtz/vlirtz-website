import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  keywords: string[];
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
};

/**
 * Reads every Markdown post and returns them newest first.
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => readPost(fileName.replace(/\.md$/, "")))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Reads one blog post by slug, or returns null if it does not exist.
 */
export function getPostBySlug(slug: string): Post | null {
  return readPost(slug);
}

/**
 * Parses a Markdown file and its frontmatter from disk.
 */
function readPost(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    slug,
    content,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    author: frontmatter.author,
    image: frontmatter.image,
    keywords: frontmatter.keywords ?? [],
  };
}
