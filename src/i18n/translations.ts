export type Language = "es" | "en";

type CategoryKey =
  | "Todos"
  | "Desarrollo"
  | "Diseño"
  | "IA"
  | "Ciberseguridad"
  | "Nube"
  | "Startups";

interface Translations {
  categories: Record<CategoryKey, string>;
  filters: {
    searchPlaceholder: string;
  };
  articleList: {
    notFound: string;
    notFoundDesc: string;
  };
  articleDetail: {
    backToFeed: string;
    quickSummary: string;
    readingTime: string;
    publishedOn: string;
    backToAllPosts: string;
    dateLocale: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    categories: {
      Todos: "Todos los Temas",
      Desarrollo: "Desarrollo",
      Diseño: "Diseño",
      IA: "IA",
      Ciberseguridad: "Ciberseguridad",
      Nube: "Nube",
      Startups: "Startups",
    },
    filters: {
      searchPlaceholder: "Filtrar por palabra clave o fecha...",
    },
    articleList: {
      notFound: "No se encontraron posts",
      notFoundDesc:
        "No pudimos encontrar ningún post que coincida con tus filtros o criterios de búsqueda actuales.",
    },
    articleDetail: {
      backToFeed: "Volver al Feed",
      quickSummary: "Resumen Rápido",
      readingTime: "min de lectura",
      publishedOn: "Publicado el",
      backToAllPosts: "Volver a todos los posts",
      dateLocale: "es-ES",
    },
  },
  en: {
    categories: {
      Todos: "All Topics",
      Desarrollo: "Development",
      Diseño: "Design",
      IA: "AI",
      Ciberseguridad: "Cybersecurity",
      Nube: "Cloud",
      Startups: "Startups",
    },
    filters: {
      searchPlaceholder: "Filter by keyword or date...",
    },
    articleList: {
      notFound: "No posts found",
      notFoundDesc:
        "We couldn't find any posts matching your current filters or search criteria.",
    },
    articleDetail: {
      backToFeed: "Back to Feed",
      quickSummary: "Quick Summary",
      readingTime: "min read",
      publishedOn: "Published on",
      backToAllPosts: "Back to all posts",
      dateLocale: "en-US",
    },
  },
};
