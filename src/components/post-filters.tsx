"use client";

import { Category } from "@/types";
import { ChevronDown, Search } from "lucide-react";

interface PostFiltersProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories: Category[] = [
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
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Category Selector */}
      <div className="relative">
        <select
          value={activeCategory}
          onChange={(e) => onSelectCategory(e.target.value as Category)}
          className="appearance-none pl-4 pr-10 py-2 bg-muted border border-border hover:border-border/80 rounded-lg text-sm font-semibold text-foreground focus:ring-2 focus:ring-ring focus:outline-none cursor-pointer transition-all shadow-sm"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              className="bg-card text-card-foreground"
            >
              {category === "Todos" ? "Todos los Temas" : category}
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
          placeholder="Filtrar por palabra clave o fecha..."
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
