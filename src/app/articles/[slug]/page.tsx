import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleData } from "@/lib/articles";
import { LessonContent } from "@/components/LessonContent";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleData(slug);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <Link
        href="/articles"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to articles
      </Link>

      <div className="mt-6 animate-fade-in">
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
          {article.published && (
            <time dateTime={article.published}>
              {new Date(article.published).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
          )}
          {article.author && <span>By {article.author}</span>}
          {article.tags && (
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {article.tags}
            </span>
          )}
        </div>
        <h1 className="mt-4 text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">{article.title}</h1>
        <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">{article.description}</p>

        <hr className="my-8 border-zinc-200/60 dark:border-zinc-700/60" />

        <LessonContent content={article.content} />
      </div>

      <div className="mt-12 border-t border-zinc-200/60 pt-6 dark:border-zinc-700/60">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          All Articles
        </Link>
      </div>
    </div>
  );
}
