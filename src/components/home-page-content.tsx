"use client";

import { ArticleList } from "@/components/article-list";
import { Header } from "@/components/header";
import { PostFilters } from "@/components/post-filters";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Category, Post } from "@/types";
import { useMemo, useState } from "react";

interface HomePageContentProps {
  posts: Post[];
}

export function HomePageContent({ posts }: HomePageContentProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== "Todos") {
      result = result.filter((post) => post.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          post.date.includes(lowerQuery),
      );
    }

    return result;
  }, [posts, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 font-sans relative">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-8 pb-8">
        <PostFilters
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ArticleList posts={filteredPosts} />
      </main>

      <ScrollToTop />
    </div>
  );
}