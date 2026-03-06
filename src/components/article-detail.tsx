"use client";

import { useLanguage } from "@/contexts/language-context";
import { translations } from "@/i18n/translations";
import { Post } from "@/types";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface ArticleDetailProps {
  post: Post;
  children: ReactNode;
}

export function ArticleDetail({ post, children }: ArticleDetailProps) {
  const { language } = useLanguage();
  const t = translations[language].articleDetail;

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Navigation */}
      <Link
        href="/"
        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <div className="p-1 rounded-full group-hover:bg-muted transition-colors">
          <ArrowLeft size={18} />
        </div>
        {t.backToFeed}
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-muted-foreground">
          <span className="font-bold text-[#fabd2f] uppercase tracking-wider">
            {post.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.readingTime} {t.readingTime}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* AI Summary Section */}
      <div className="bg-[#fabd2f]/10 border border-[#fabd2f]/30 rounded-xl p-4 md:p-6 mb-12">
        <div className="flex items-center gap-2 mb-3 text-[#fabd2f] font-bold text-sm uppercase tracking-wide">
          <Sparkles size={16} />
          {t.quickSummary}
        </div>
        <p className="text-lg text-foreground leading-relaxed font-medium">
          {post.description}
        </p>
      </div>

      {/* Content Section (server-rendered MDX passed as children) */}
      {children}

      {/* Footer Actions */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={14} />
            {t.publishedOn}{" "}
            {new Date(post.date).toLocaleDateString(t.dateLocale, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#fabd2f] hover:underline"
          >
            {t.backToAllPosts} <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
