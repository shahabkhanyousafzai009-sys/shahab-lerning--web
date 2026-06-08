import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessonData } from "@/lib/mdx";
import { getCourseWithLessons, getCurrentUser, getSession } from "@/lib/dal";
import { LessonContent } from "@/components/LessonContent";
import { prisma } from "@/lib/prisma";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug: courseSlug, lesson: lessonSlug } = await params;
  const lesson = getLessonData(courseSlug, lessonSlug);
  if (!lesson) notFound();

  const course = await getCourseWithLessons(courseSlug);
  if (!course) notFound();

  const currentLesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!currentLesson) notFound();

  const currentIdx = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentIdx > 0 ? course.lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < course.lessons.length - 1 ? course.lessons[currentIdx + 1] : null;

  const user = await getCurrentUser();
  let completed = false;
  let flashcardCount = 0;
  let quizCount = 0;

  if (user) {
    const progress = await prisma.userProgress.findUnique({
      where: { userId_lessonId: { userId: user.id, lessonId: currentLesson.id } },
    });
    completed = progress?.completed ?? false;
  }

  const flashcards = await prisma.flashcard.findMany({
    where: { lessonId: currentLesson.id },
  });
  flashcardCount = flashcards.length;

  const quizQuestions = await prisma.quizQuestion.findMany({
    where: { lessonId: currentLesson.id },
  });
  quizCount = quizQuestions.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <Link
        href={`/courses/${courseSlug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to {course.title}
      </Link>

      <div className="mt-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-100">{lesson.title}</h1>
        {lesson.description && (
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">{lesson.description}</p>
        )}
      </div>

      <div className="mt-8 animate-fade-in-delay">
        <LessonContent content={lesson.content} />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {flashcardCount > 0 && (
          <Link
            href={`/courses/${courseSlug}/${lessonSlug}/flashcards`}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/60 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            Flashcards ({flashcardCount})
          </Link>
        )}
        {quizCount > 0 && (
          <Link
            href={`/courses/${courseSlug}/${lessonSlug}/quiz`}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/60 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Take Quiz ({quizCount})
          </Link>
        )}
      </div>

      {user && (
        <div className="mt-8 animate-fade-in-delay-2">
          <form
            action={async () => {
              "use server";
              const session = await getSession();
              if (!session?.user?.id) return;
              await prisma.userProgress.upsert({
                where: {
                  userId_lessonId: {
                    userId: session.user.id,
                    lessonId: currentLesson.id,
                  },
                },
                update: { completed: true },
                create: {
                  userId: session.user.id,
                  lessonId: currentLesson.id,
                  completed: true,
                },
              });
            }}
          >
            <button
              type="submit"
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium shadow-sm transition-all ${
                completed
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
              : "bg-gradient-to-r from-indigo-600 to-violet-500 text-white hover:shadow-md hover:brightness-110"
              }`}
            >
              {completed ? (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Completed
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mark as Complete
                </>
              )}
            </button>
          </form>
        </div>
      )}

      <div className="mt-12 flex items-center justify-between border-t border-zinc-200/60 pt-6 dark:border-zinc-800/60">
        {prevLesson ? (
          <Link
            href={`/courses/${courseSlug}/${prevLesson.slug}`}
            className="group flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            href={`/courses/${courseSlug}/${nextLesson.slug}`}
            className="group flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            {nextLesson.title}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
