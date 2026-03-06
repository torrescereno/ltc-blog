import { ArticleContent } from "@/components/article-content";
import { ArticleDetail } from "@/components/article-detail";
import { Header } from "@/components/header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} - Tech Blog`,
    description: post.description,
  };
}

export default async function EnPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 font-sans">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <ArticleDetail post={post}>
          <ArticleContent post={post} />
        </ArticleDetail>
      </main>

      <ScrollToTop />
    </div>
  );
}
