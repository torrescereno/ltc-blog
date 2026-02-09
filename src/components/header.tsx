import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="w-8 h-8 p-5 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg shrink-0"
          >
            LTC
          </a>

          {/* Actions */}
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
    </header>
  );
}
