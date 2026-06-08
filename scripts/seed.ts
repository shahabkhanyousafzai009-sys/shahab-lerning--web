import { prisma } from "../src/lib/prisma";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "courses");

async function seed() {
  console.log("Seeding database from content directory...");

  const courseDirs = fs.readdirSync(contentDir).filter((f) =>
    fs.statSync(path.join(contentDir, f)).isDirectory()
  );

  for (const slug of courseDirs) {
    const indexPath = path.join(contentDir, slug, "index.md");
    if (!fs.existsSync(indexPath)) {
      console.log(`  Skipping ${slug}: no index.md`);
      continue;
    }

    const indexFile = fs.readFileSync(indexPath, "utf-8");
    const { data } = matter(indexFile);

    const course = await prisma.course.upsert({
      where: { slug },
      update: {
        title: data.title || slug,
        description: data.description || "",
        order: data.order || 0,
      },
      create: {
        slug,
        title: data.title || slug,
        description: data.description || "",
        order: data.order || 0,
      },
    });
    console.log(`  Course: ${course.title}`);

    const sessions = data.sessions || [];
    if (sessions.length > 0) {
      await prisma.videoSession.deleteMany({ where: { courseId: course.id } });
      await prisma.videoSession.createMany({
        data: sessions.map((s: { title: string; video: string; order: number }) => ({
          courseId: course.id,
          title: s.title,
          videoUrl: s.video,
          order: s.order || 0,
        })),
      });
      console.log(`    Sessions: ${sessions.length}`);
    }

    const lessonFiles = fs
      .readdirSync(path.join(contentDir, slug))
      .filter((f) => f !== "index.md" && f.endsWith(".md"))
      .sort();

    for (const lessonFile of lessonFiles) {
      const lessonSlug = lessonFile.replace(".md", "");
      const lessonPath = path.join(contentDir, slug, lessonFile);
      const lessonContent = fs.readFileSync(lessonPath, "utf-8");
      const { data: lessonData } = matter(lessonContent);

      const lesson = await prisma.lesson.upsert({
        where: { courseId_slug: { courseId: course.id, slug: lessonSlug } },
        update: {
          title: lessonData.title || lessonSlug,
          description: lessonData.description || "",
          order: lessonData.order || 0,
          contentPath: lessonPath,
        },
        create: {
          courseId: course.id,
          slug: lessonSlug,
          title: lessonData.title || lessonSlug,
          description: lessonData.description || "",
          order: lessonData.order || 0,
          contentPath: lessonPath,
        },
      });

      const flashcards = lessonData.flashcards || [];
      if (flashcards.length > 0) {
        await prisma.flashcard.deleteMany({ where: { lessonId: lesson.id } });
        await prisma.flashcard.createMany({
          data: flashcards.map((fc: { q: string; a: string }) => ({
            lessonId: lesson.id,
            question: fc.q,
            answer: fc.a,
          })),
        });
      }

      const quiz = lessonData.quiz || [];
      if (quiz.length > 0) {
        await prisma.quizQuestion.deleteMany({ where: { lessonId: lesson.id } });
        await prisma.quizQuestion.createMany({
          data: quiz.map((q: { q: string; o: string[]; a: string }) => ({
            lessonId: lesson.id,
            question: q.q,
            options: JSON.stringify(q.o),
            correctAnswer: q.a,
          })),
        });
      }

      console.log(`    Lesson: ${lesson.title}`);
    }
  }

  console.log("Seed complete!");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
