import { getAllPostsByLang } from "@/lib/posts";
import { HomePageContent } from "@/components/home-page-content";

export default async function Home() {
  const esPosts = getAllPostsByLang("es");
  const enPosts = getAllPostsByLang("en");

  return <HomePageContent esPosts={esPosts} enPosts={enPosts} />;
}
