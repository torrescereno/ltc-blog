"use client";

import { useLanguage } from "@/contexts/language-context";
import { translations } from "@/i18n/translations";
import { Category } from "@/types";
import { ChevronDown, Search } from "lucide-react";

interface PostFiltersProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categoryKeys: Category[] = [
  "Todos",
  "Desarrollo",
  "Diseño",
  "IA",
  "Ciberseguridad",
  "Nube",
  "Startups",
];

export function PostFilters({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: PostFiltersProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-16">
      {/* Category Selector */}
      <div className="relative w-full sm:w-auto">
        <select
          value={activeCategory}
          onChange={(e) => onSelectCategory(e.target.value as Category)}
          className="w-full sm:w-auto appearance-none pl-4 pr-10 py-2 bg-muted border border-border hover:border-border/80 rounded-lg text-sm font-semibold text-foreground focus:ring-2 focus:ring-ring focus:outline-none cursor-pointer transition-all shadow-sm"
        >
          {categoryKeys.map((key) => (
            <option
              key={key}
              value={key}
              className="bg-card text-card-foreground"
            >
              {t.categories[key]}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
        />
      </div>

      {/* Search Input */}
      <div className="relative grow">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.filters.searchPlaceholder}
          className="w-full pl-9 pr-4 py-2 text-sm bg-muted border-none rounded-lg focus:ring-1 focus:ring-ring text-foreground placeholder-muted-foreground shadow-sm"
        />
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
}
