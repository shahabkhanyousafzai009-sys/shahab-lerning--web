import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getSession = cache(async () => {
  return await auth();
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session?.user?.id) return null;
  return session.user as { id: string; name?: string | null; email?: string | null; image?: string | null };
});

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function getUserProgress(userId: string) {
  return prisma.userProgress.findMany({
    where: { userId },
    include: { lesson: { include: { course: true } } },
  });
}

export async function getCourseWithLessons(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
}

export async function getAllCourses() {
  return prisma.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { _count: { select: { lessons: true, videoSessions: true } } },
  });
}

export async function getDashboardData(userId: string) {
  const [progress, courses] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId },
      include: { lesson: { include: { course: true } } },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.course.findMany({
      where: { published: true },
      include: { _count: { select: { lessons: true } } },
      orderBy: { order: "asc" },
    }),
  ]);

  const completedCount = progress.filter((p) => p.completed).length;
  const totalQuizScore = progress.reduce((sum, p) => sum + p.quizScore, 0);
  const totalQuizCount = progress.filter((p) => p.quizScore > 0).length;
  const totalLessons = courses.reduce((sum, c) => sum + c._count.lessons, 0);
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const lessonsByCourse = progress.reduce<
    Record<string, {
      courseTitle: string;
      courseSlug: string;
      courseId: string;
      totalLessons: number;
      lessons: typeof progress;
    }>
  >((acc, p) => {
    const key = p.lesson.courseId;
    if (!acc[key]) {
      const course = courses.find((c) => c.id === key);
      acc[key] = {
        courseTitle: p.lesson.course.title,
        courseSlug: p.lesson.course.slug,
        courseId: key,
        totalLessons: course?._count.lessons ?? 0,
        lessons: [],
      };
    }
    acc[key].lessons.push(p);
    return acc;
  }, {});

  Object.values(lessonsByCourse).forEach((c) => {
    const completed = c.lessons.filter((l) => l.completed).length;
    (c as Record<string, unknown>).completedCount = completed;
    (c as Record<string, unknown>).percent = c.totalLessons > 0 ? Math.round((completed / c.totalLessons) * 100) : 0;
  });

  return {
    completedCount,
    totalQuizScore,
    totalQuizCount,
    totalLessons,
    overallPercent,
    lessonsByCourse,
    activeCourses: Object.keys(lessonsByCourse).length,
    recentActivity: progress.slice(0, 5),
  };
}
