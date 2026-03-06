import { Post } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/posts");

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function getPostFile(
  slug: string,
  lang: "es" | "en" = "es",
): { fullPath: string; extension: string } | null {
  if (lang === "en") {
    const enMdxPath = path.join(postsDirectory, `${slug}.en.mdx`);
    const enMdPath = path.join(postsDirectory, `${slug}.en.md`);
    if (fs.existsSync(enMdxPath)) return { fullPath: enMdxPath, extension: "mdx" };
    if (fs.existsSync(enMdPath)) return { fullPath: enMdPath, extension: "md" };
    // Fall back to Spanish if no English file exists
  }

  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(mdxPath)) return { fullPath: mdxPath, extension: "mdx" };
  if (fs.existsSync(mdPath)) return { fullPath: mdPath, extension: "md" };
  return null;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(
      (fileName) =>
        (fileName.endsWith(".md") || fileName.endsWith(".mdx")) &&
        !fileName.includes(".en."),
    )
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: slug,
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        category: data.category as Post["category"],
        tags: (data.tags as string[]) || [],
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPosts;
}

export function getPostBySlug(slug: string, lang: "es" | "en" = "es"): Post | null {
  try {
    const fileInfo = getPostFile(slug, lang);
    if (!fileInfo) return null;

    const fileContents = fs.readFileSync(fileInfo.fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: slug,
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      category: data.category as Post["category"],
      tags: (data.tags as string[]) || [],
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(
      (fileName) =>
        (fileName.endsWith(".md") || fileName.endsWith(".mdx")) &&
        !fileName.includes(".en."),
    )
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ""));
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return ["Todos", ...Array.from(categories)];
}
