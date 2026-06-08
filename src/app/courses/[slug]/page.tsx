import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/dal";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      lessons: { orderBy: { order: "asc" } },
      videoSessions: { orderBy: { order: "asc" } },
    },
  });
  if (!course) notFound();

  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <Link
        href="/courses"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to courses
      </Link>

      <div className="mt-6 animate-fade-in">
        <div className="mb-4 h-2 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">{course.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">{course.description}</p>
      </div>

      {course.videoSessions.length > 0 && (
        <div className="mt-12 animate-fade-in-delay">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <svg className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Video Sessions
          </h2>
          <div className="mt-5 space-y-3">
            {course.videoSessions.map((s, idx) => (
              <Link
                key={s.id}
                href={`/courses/${slug}/sessions/${s.id}`}
                className="group flex items-center gap-4 rounded-xl border border-zinc-200/60 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md sm:p-5 dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:border-rose-800"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-sm font-bold text-white shadow-sm">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-zinc-900 transition-colors group-hover:text-rose-600 dark:text-zinc-100 dark:group-hover:text-rose-400">
                    {s.title}
                  </span>
                </div>
                <svg className="h-5 w-5 shrink-0 text-zinc-300 transition-colors group-hover:text-rose-500 dark:text-zinc-600 dark:group-hover:text-rose-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {course.lessons.length > 0 && (
        <div className={`${course.videoSessions.length > 0 ? "mt-12" : "mt-12"} animate-fade-in`}>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Text Lessons
          </h2>
          <div className="mt-5 space-y-3">
            {course.lessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href={`/courses/${slug}/${lesson.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-zinc-200/60 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-5 dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:border-indigo-700"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-sm">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                    {lesson.title}
                  </span>
                  {lesson.description && (
                    <p className="mt-0.5 text-sm text-zinc-500 truncate dark:text-zinc-400">{lesson.description}</p>
                  )}
                </div>
                <svg className="h-5 w-5 shrink-0 text-zinc-300 transition-colors group-hover:text-indigo-500 dark:text-zinc-600 dark:group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!user && (
        <div className="mt-12 animate-fade-in rounded-2xl border border-indigo-200/60 bg-gradient-to-r from-indigo-50/80 to-violet-50/80 p-6 text-center shadow-sm dark:border-indigo-800/60 dark:from-indigo-950/30 dark:to-violet-950/30">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Sign in
            </Link>{" "}
            to track your progress through this course.
          </p>
        </div>
      )}
    </div>
  );
}
