"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, SearchX } from "lucide-react";
import { Post } from "@/types";
import Link from "next/link";

interface ArticleListProps {
  posts: Post[];
}

export function ArticleList({ posts }: ArticleListProps) {
  const [hoveredPost, setHoveredPost] = useState<Post | null>(null);
  const [mounted, setMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update tooltip position based on current mouse position
  const updateTooltipPosition = () => {
    if (!tooltipRef.current) return;

    const { x, y } = mousePositionRef.current;
    const tooltip = tooltipRef.current;
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;

    // Default: position below and to the right of cursor
    let left = x + 20;
    let top = y + 20;

    // Adjust if it goes off right edge
    if (left + tooltipWidth > window.innerWidth) {
      left = x - tooltipWidth - 20;
    }

    // If too close to bottom, show above cursor instead
    if (top + tooltipHeight > window.innerHeight) {
      top = y - tooltipHeight - 20;
    }

    tooltip.style.transform = `translate(${left}px, ${top}px)`;
  };

  // Handle mouse movement for the floating tooltip
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      updateTooltipPosition();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update position immediately when hoveredPost changes (fixes size change offset)
  useEffect(() => {
    if (hoveredPost) {
      // Use requestAnimationFrame to ensure DOM has updated with new content
      requestAnimationFrame(updateTooltipPosition);
    }
  }, [hoveredPost]);

  // Recalculate position when tooltip resizes (content changes)
  useEffect(() => {
    if (!tooltipRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateTooltipPosition();
    });

    resizeObserver.observe(tooltipRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Group posts by date
  const groupedPosts = posts.reduce(
    (acc, post) => {
      const date = post.date || "Recent";
      if (!acc[date]) acc[date] = [];
      acc[date].push(post);
      return acc;
    },
    {} as Record<string, Post[]>,
  );

  const sortedDates = Object.keys(groupedPosts).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] w-full text-center px-4 mx-auto">
        <div className="bg-muted p-8 rounded-full mb-6 text-muted-foreground transition-transform duration-300 hover:scale-105">
          <SearchX size={64} strokeWidth={1} />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          No se encontraron posts
        </h3>
        <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
          No pudimos encontrar ningún post que coincida con tus filtros o
          criterios de búsqueda actuales.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Floating Preview Card (Desktop Only) - Rendered via Portal */}
      {mounted &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`fixed top-0 left-0 z-9999 pointer-events-none transition-opacity duration-200 ease-out hidden md:block w-80 bg-card border border-border shadow-2xl rounded-lg overflow-hidden ${
              hoveredPost ? "opacity-100" : "opacity-0"
            }`}
          >
            {hoveredPost && (
              <div className="flex flex-col">
                <div className="p-4 bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                      {hoveredPost.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {hoveredPost.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-card-foreground leading-tight mb-2 text-sm">
                    {hoveredPost.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-4">
                    {hoveredPost.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {hoveredPost.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>,
          document.body,
        )}

      {/* Article List */}
      <div className="space-y-10 md:space-y-16 max-w-3xl mx-auto w-full">
        {sortedDates.map((date) => (
          <section key={date} className="animate-fade-in w-full">
            <h3 className="text-sm font-bold text-muted-foreground mb-6 uppercase tracking-wider pl-2 border-l-2 border-blue-500">
              {new Date(date).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>

            <div className="space-y-1">
              {groupedPosts[date].map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="group block w-full"
                  onMouseEnter={() => setHoveredPost(post)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className="flex items-baseline gap-4 py-3 px-2 rounded-md hover:bg-muted transition-colors cursor-pointer w-full">
                    <span className="text-xs font-mono text-muted-foreground w-16 shrink-0 text-right">
                      {post.category.slice(0, 3).toUpperCase()}
                    </span>

                    <div className="grow min-w-0">
                      <h4 className="text-base md:text-lg font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {post.title}
                      </h4>
                    </div>

                    <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <ExternalLink
                        size={14}
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
