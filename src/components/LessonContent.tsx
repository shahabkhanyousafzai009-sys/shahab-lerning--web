import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export async function LessonContent({ content }: { content: string }) {
  const { content: rendered } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
  });

  return (
    <article className="prose prose-zinc max-w-none prose-headings:font-semibold prose-headings:text-zinc-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-code:rounded-md prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:text-indigo-600 prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200/60 prose-pre:bg-zinc-950 prose-pre:shadow-sm prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-zinc-900 dark:prose-invert dark:prose-headings:text-zinc-100 dark:prose-code:bg-zinc-800 dark:prose-code:text-indigo-400 dark:prose-pre:border-zinc-700/60 dark:prose-a:text-indigo-400 dark:prose-strong:text-zinc-100">
      {rendered}
    </article>
  );
}
