import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VideoPlayer } from "@/components/VideoPlayer";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ slug: string; sessionId: string }>;
}) {
  const { slug, sessionId } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: { videoSessions: { orderBy: { order: "asc" } } },
  });
  if (!course) notFound();

  const session = course.videoSessions.find((s) => s.id === sessionId);
  if (!session) notFound();

  const currentIdx = course.videoSessions.findIndex((s) => s.id === sessionId);
  const prevSession = currentIdx > 0 ? course.videoSessions[currentIdx - 1] : null;
  const nextSession = currentIdx < course.videoSessions.length - 1 ? course.videoSessions[currentIdx + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <Link
        href={`/courses/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to {course.title}
      </Link>

      <div className="mt-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-100">{session.title}</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Session {currentIdx + 1} of {course.videoSessions.length}
        </p>
      </div>

      <div className="mt-6 animate-fade-in-delay">
        <VideoPlayer videoUrl={session.videoUrl} title={session.title} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        {prevSession ? (
          <Link
            href={`/courses/${slug}/sessions/${prevSession.id}`}
            className="group flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {prevSession.title}
          </Link>
        ) : (
          <div />
        )}
        {nextSession ? (
          <Link
            href={`/courses/${slug}/sessions/${nextSession.id}`}
            className="group flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            {nextSession.title}
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
