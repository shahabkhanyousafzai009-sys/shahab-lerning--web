import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCourseWithLessons, getCurrentUser } from "@/lib/dal";
import { QuizClient } from "@/components/QuizClient";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug: courseSlug, lesson: lessonSlug } = await params;
  const course = await getCourseWithLessons(courseSlug);
  if (!course) notFound();

  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const questions = await prisma.quizQuestion.findMany({
    where: { lessonId: lesson.id },
  });

  if (questions.length === 0) notFound();

  const user = await getCurrentUser();
  let savedScore = 0;
  if (user) {
    const progress = await prisma.userProgress.findUnique({
      where: { userId_lessonId: { userId: user.id, lessonId: lesson.id } },
    });
    savedScore = progress?.quizScore ?? 0;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <Link
        href={`/courses/${courseSlug}/${lessonSlug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to {lesson.title}
      </Link>

      <div className="mt-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-100">Quiz</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Test your knowledge of &ldquo;{lesson.title}&rdquo;</p>
        {savedScore > 0 && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Best score: {savedScore}/{questions.length}
          </div>
        )}
      </div>

      <QuizClient
        questions={questions.map((q) => ({
          id: q.id,
          question: q.question,
          options: JSON.parse(q.options) as string[],
          correctAnswer: q.correctAnswer,
        }))}
        lessonId={lesson.id}
      />
    </div>
  );
}
