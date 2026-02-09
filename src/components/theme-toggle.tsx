"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-muted-foreground hover:bg-muted rounded-md transition-colors relative"
      title="Cambiar Tema"
      aria-label="Cambiar tema"
    >
      <Sun
        size={18}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90"
      />
      <Moon
        size={18}
        className="scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0"
      />
    </button>
  );
}
