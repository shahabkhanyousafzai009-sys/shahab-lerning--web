import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">Articles</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          In-depth guides and tutorials to deepen your understanding.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-zinc-400 dark:text-zinc-500">No articles yet.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-700/60 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
                {article.published && <span>{new Date(article.published).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>}
                {article.author && <span>By {article.author}</span>}
                {article.tags && <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800 dark:text-zinc-400">{article.tags}</span>}
              </div>
              <h2 className="mt-3 text-xl font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                {article.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
                {article.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Read article
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
