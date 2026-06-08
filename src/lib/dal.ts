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
  const [progress, courses, quizAttempts, badges] = await Promise.all([
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
    prisma.quizAttempt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: "desc" },
    }),
  ]);

  const completedCount = progress.filter((p) => p.completed).length;
  const totalQuizScore = progress.reduce((sum, p) => sum + p.quizScore, 0);
  const totalQuizCount = progress.filter((p) => p.quizScore > 0).length;
  const totalLessons = courses.reduce((sum, c) => sum + c._count.lessons, 0);
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const avgQuizScore = quizAttempts.length > 0
    ? Math.round(quizAttempts.reduce((s, a) => s + Math.round((a.score / a.total) * 100), 0) / quizAttempts.length)
    : 0;

  const quizHighScore = quizAttempts.length > 0
    ? Math.max(...quizAttempts.map((a) => Math.round((a.score / a.total) * 100)))
    : 0;

  const streak = calculateStreak(progress);

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
    quizAttempts: quizAttempts.slice(0, 10),
    avgQuizScore,
    quizHighScore,
    streak,
    badges,
  };
}

export async function getPerformanceData(userId: string) {
  const [progress, quizAttempts, badges] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId },
      include: { lesson: { include: { course: true } } },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.quizAttempt.findMany({
      where: { userId },
      include: { lesson: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
    }),
  ]);

  const totalLessons = progress.length;
  const completed = progress.filter((p) => p.completed).length;
  const completionRate = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

  const courseBreakdown = progress.reduce<
    Record<string, {
      course: string;
      completed: number;
      total: number;
      avgScore: number;
    }>
  >((acc, p) => {
    const key = p.lesson.course.title;
    if (!acc[key]) {
      acc[key] = { course: key, completed: 0, total: 0, avgScore: 0 };
    }
    acc[key].total++;
    if (p.completed) acc[key].completed++;
    return acc;
  }, {});

  Object.values(courseBreakdown).forEach((c) => {
    const courseAttempts = quizAttempts.filter((a) =>
      progress.some((p) => p.lessonId === a.lessonId && p.lesson.course.title === c.course)
    );
    c.avgScore = courseAttempts.length > 0
      ? Math.round(courseAttempts.reduce((s, a) => s + (a.score / a.total) * 100, 0) / courseAttempts.length)
      : 0;
  });

  const quizStats = {
    total: quizAttempts.length,
    avgScore: quizAttempts.length > 0
      ? Math.round(quizAttempts.reduce((s, a) => s + (a.score / a.total) * 100, 0) / quizAttempts.length)
      : 0,
    highScore: quizAttempts.length > 0
      ? Math.max(...quizAttempts.map((a) => Math.round((a.score / a.total) * 100)))
      : 0,
    recentScores: quizAttempts.slice(0, 10).map((a) => ({
      score: Math.round((a.score / a.total) * 100),
      lesson: a.lesson.title,
      date: a.createdAt,
    })),
  };

  return {
    completionRate,
    completed,
    totalLessons,
    courseBreakdown: Object.values(courseBreakdown),
    quizStats,
    badges,
    quizAttempts: quizAttempts.slice(0, 20),
  };
}

export async function getAllStudents() {
  const users = await prisma.user.findMany({
    include: {
      progress: true,
      quizAttempts: true,
      badges: { include: { badge: true } },
    },
    orderBy: { name: "asc" },
  });

  return users.map((u) => {
    const completed = u.progress.filter((p) => p.completed).length;
    const total = u.progress.length;
    const avgQuiz = u.quizAttempts.length > 0
      ? Math.round(u.quizAttempts.reduce((s, a) => s + (a.score / a.total) * 100, 0) / u.quizAttempts.length)
      : 0;
    return {
      id: u.id,
      name: u.name ?? "Unknown",
      email: u.email ?? "",
      image: u.image,
      completedLessons: completed,
      totalLessons: total,
      avgQuizScore: avgQuiz,
      totalAttempts: u.quizAttempts.length,
      badges: u.badges.length,
      joinedAt: u.emailVerified,
    };
  });
}

function calculateStreak(progress: { completed: boolean; updatedAt: Date }[]) {
  const completedDates = progress
    .filter((p) => p.completed)
    .map((p) => new Date(p.updatedAt).toISOString().split("T")[0]);
  const unique = [...new Set(completedDates)].sort().reverse();
  let streak = 0;
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  for (let i = 0; i < unique.length; i++) {
    const expected = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
    const altExpected = new Date(Date.now() - (i + 1) * 86400000).toISOString().split("T")[0];
    if (unique[i] === expected || (i === 0 && unique[i] === yesterday)) {
      streak++;
    } else if (unique[0] === yesterday && unique[i] === altExpected) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}
