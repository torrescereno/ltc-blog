"use client";

import { ArticleList } from "@/components/article-list";
import { Header } from "@/components/header";
import { PostFilters } from "@/components/post-filters";
import { ScrollToTop } from "@/components/scroll-to-top";
import { useLanguage } from "@/contexts/language-context";
import { Category, Post } from "@/types";
import { useMemo, useState } from "react";

interface HomePageContentProps {
  esPosts: Post[];
  enPosts: Post[];
}

export function HomePageContent({ esPosts, enPosts }: HomePageContentProps) {
  const { language } = useLanguage();
  const posts = language === "en" ? enPosts : esPosts;
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by category
    if (activeCategory !== "Todos") {
      result = result.filter((post) => post.category === activeCategory);
    }

    // Filter by search query
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
