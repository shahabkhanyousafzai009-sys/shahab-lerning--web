import { NextRequest } from "next/server";
import { getSession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId, quizScore, quizTotal, completed } = await request.json();

  await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
    create: {
      userId: session.user.id,
      lessonId,
      quizScore: quizScore || 0,
      attempts: 1,
      completed: completed ?? false,
    },
    update: {
      quizScore: quizScore || 0,
      attempts: { increment: 1 },
      completed: completed ?? undefined,
    },
  });

  if (quizScore !== undefined && quizTotal !== undefined) {
    await prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        lessonId,
        score: quizScore,
        total: quizTotal,
      },
    });
  }

  return Response.json({ success: true });
}
