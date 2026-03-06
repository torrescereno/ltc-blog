import { Post } from "@/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdx";

interface ArticleContentProps {
  post: Post;
}

export async function ArticleContent({ post }: ArticleContentProps) {
  return (
    <div className="prose md:prose-lg max-w-none text-[#a89984] prose-headings:text-[#ebdbb2] prose-p:text-[#a89984] prose-a:text-[#fabd2f] prose-strong:text-[#ebdbb2] prose-code:text-[#fabd2f] prose-code:border-0 prose-pre:bg-[#1d2021] prose-pre:text-[#a89984] prose-pre:border prose-pre:border-[#3c3836] prose-li:text-[#a89984]">
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeHighlight,
              [
                rehypeExternalLinks,
                { target: "_blank", rel: ["noopener", "noreferrer"] },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
