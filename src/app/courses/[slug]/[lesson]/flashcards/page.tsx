import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCourseWithLessons } from "@/lib/dal";
import { FlashcardClient } from "@/components/FlashcardClient";

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug: courseSlug, lesson: lessonSlug } = await params;
  const course = await getCourseWithLessons(courseSlug);
  if (!course) notFound();

  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const flashcards = await prisma.flashcard.findMany({
    where: { lessonId: lesson.id },
  });

  if (flashcards.length === 0) notFound();

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
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-100">Flashcards</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Review key concepts from &ldquo;{lesson.title}&rdquo;
        </p>
      </div>

      <FlashcardClient flashcards={flashcards} />
    </div>
  );
}
