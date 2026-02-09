export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  tags: string[];
  content: string;
}

export type Category =
  | "Todos"
  | "Desarrollo"
  | "Diseño"
  | "IA"
  | "Ciberseguridad"
  | "Nube"
  | "Startups";
