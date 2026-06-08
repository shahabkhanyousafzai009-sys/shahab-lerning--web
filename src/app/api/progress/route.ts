import { NextRequest } from "next/server";
import { getSession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId, quizScore } = await request.json();

  await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
    create: {
      userId: session.user.id,
      lessonId,
      quizScore: quizScore || 0,
    },
    update: {
      quizScore: quizScore || 0,
    },
  });

  return Response.json({ success: true });
}
