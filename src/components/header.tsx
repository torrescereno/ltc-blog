/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useLanguage } from "@/contexts/language-context";
import { Github } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Sync language state with current URL
  useEffect(() => {
    if (pathname.startsWith("/en/")) {
      setLanguage("en");
    } else if (!pathname.startsWith("/en")) {
      setLanguage("es");
    }
  }, [pathname]);

  const handleToggle = () => {
    const isArticle = pathname !== "/" && !pathname.startsWith("/en/");
    const isEnArticle = pathname.startsWith("/en/");

    if (isEnArticle) {
      router.push(pathname.replace(/^\/en/, ""));
    } else if (isArticle) {
      router.push(`/en${pathname}`);
    } else {
      setLanguage(language === "es" ? "en" : "es");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="w-8 h-8 p-5 flex items-center justify-center font-bold text-lg shrink-0"
          >
            LTC
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggle}
              className="px-2 py-1 text-xs font-mono font-bold text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              aria-label="Toggle language"
            >
              {language === "es" ? "EN" : "ES"}
            </button>

            <a
              href="https://github.com/torrescereno"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              title="GitHub"
              aria-label="GitHub profile"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
