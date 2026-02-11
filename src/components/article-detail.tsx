import { Post } from "@/types";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "./mdx";

interface ArticleDetailProps {
  post: Post;
}

export async function ArticleDetail({ post }: ArticleDetailProps) {
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
        Volver al Feed
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
          <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {post.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.date}
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
      <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 rounded-xl p-6 mb-12">
        <div className="flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-400 font-bold text-sm uppercase tracking-wide">
          <Sparkles size={16} />
          Resumen Rápido
        </div>
        <p className="text-lg text-foreground leading-relaxed font-medium">
          {post.description}
        </p>
      </div>

      {/* Content Section */}
      <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-foreground prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:border-0 prose-pre:bg-muted prose-pre:text-foreground prose-pre:border-0">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeHighlight,
                [
                  rehypeExternalLinks,
                  { target: "_blank", rel: ["noopener", "noreferrer"] },
                ],
              ],
            },
          }}
        />
      </div>

      {/* Footer Actions */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={14} />
            Publicado el{" "}
            {new Date(post.date).toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline"
          >
            Volver a todos los posts <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
