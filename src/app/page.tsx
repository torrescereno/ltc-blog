import { getAllPosts } from '@/lib/posts';
import { HomePageContent } from '@/components/home-page-content';

export default async function Home() {
  const posts = getAllPosts();
  
  return <HomePageContent posts={posts} />;
}
