import Link from "next/link";
import { getAllCourses } from "@/lib/dal";

export default async function HomePage() {
  const courses = await getAllCourses();

  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute -top-40 right-0 -z-10 size-[500px] rounded-full bg-gradient-to-br from-indigo-100/60 via-transparent to-violet-100/60 blur-3xl dark:from-indigo-900/20 dark:to-violet-900/20" />
        <div className="absolute -bottom-40 left-0 -z-10 size-[400px] rounded-full bg-gradient-to-tr from-sky-100/40 via-transparent to-indigo-100/40 blur-3xl dark:from-sky-900/10 dark:to-indigo-900/10" />
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
            <span className="flex size-2 rounded-full bg-indigo-500" />
            Interactive learning platform
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-100">
            Learn{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              Web Development
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
            Master HTML, CSS, and JavaScript with interactive lessons, flashcards, and quizzes that
            adapt to your pace.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-lg hover:brightness-110"
            >
              Browse Courses
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/60 bg-white px-6 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Available Courses</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Start your learning journey today.</p>
          </div>
            <Link
              href="/courses"
              className="hidden items-center gap-1 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 sm:flex dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:shadow-zinc-800/50"
            >
              <div className="mb-4 h-2 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
              <h3 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                {course.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 line-clamp-2 dark:text-zinc-400">
                {course.description}
              </p>
              <p className="mt-5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {course._count.lessons} lessons{course._count.videoSessions > 0 ? ` · ${course._count.videoSessions} sessions` : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200/60 py-16 dark:border-zinc-800/60">
        <div className="mx-auto grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 text-center shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              4
            </div>
            <div className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">Courses</div>
          </div>
          <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 text-center shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              9+
            </div>
            <div className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">Lessons</div>
          </div>
          <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 text-center shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              2
            </div>
            <div className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">Video Sessions</div>
          </div>
        </div>
      </section>
    </div>
  );
}
