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
): { fullPath: string; extension: string } | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(mdxPath)) return { fullPath: mdxPath, extension: "mdx" };
  if (fs.existsSync(mdPath)) return { fullPath: mdPath, extension: "md" };
  return null;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const slugs = fileNames
    .filter(
      (fileName) =>
        (fileName.endsWith(".md") || fileName.endsWith(".mdx")) &&
        !fileName.includes(".en."),
    )
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ""));

  return slugs
    .map((slug) => {
      const fileInfo = getPostFile(slug);
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
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fileInfo = getPostFile(slug);
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