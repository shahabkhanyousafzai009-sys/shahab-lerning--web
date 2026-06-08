import Link from "next/link";

interface CourseCardProps {
  title: string;
  description: string;
  slug: string;
  lessonCount: number;
}

const gradients = [
  "from-indigo-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-rose-500",
  "from-sky-500 to-cyan-500",
  "from-pink-500 to-purple-500",
];

export function CourseCard({ title, description, slug, lessonCount }: CourseCardProps) {
  const gradient = gradients[title.length % gradients.length];

  return (
    <Link
      href={`/courses/${slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:shadow-zinc-800/50"
    >
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-br ${gradient} group-hover:opacity-5`} />
      <div className="relative">
        <div className={`mb-4 h-2 w-12 rounded-full bg-gradient-to-r ${gradient}`} />
        <h2 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500 line-clamp-2 dark:text-zinc-400">{description}</p>
        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
        </div>
      </div>
    </Link>
  );
}
