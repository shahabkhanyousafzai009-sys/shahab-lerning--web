import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "courses");

export interface CourseMeta {
  title: string;
  slug: string;
  description: string;
  order: number;
  lessons: { title: string; slug: string; description: string; order: number }[];
}

export interface LessonData {
  title: string;
  description: string;
  content: string;
  frontmatter: Record<string, unknown>;
}

export function getCourseSlugs(): string[] {
  try {
    return fs.readdirSync(contentDir).filter((f) =>
      fs.statSync(path.join(contentDir, f)).isDirectory()
    );
  } catch {
    return [];
  }
}

export function getCourseMeta(slug: string): CourseMeta | null {
  const courseDir = path.join(contentDir, slug);
  try {
    const indexPath = path.join(courseDir, "index.md");
    if (!fs.existsSync(indexPath)) return null;
    const file = fs.readFileSync(indexPath, "utf-8");
    const { data } = matter(file);
    const lessonFiles = fs.readdirSync(courseDir)
      .filter((f) => f !== "index.md" && f.endsWith(".md"))
      .sort();
    const lessons = lessonFiles.map((f) => {
      const lessonPath = path.join(courseDir, f);
      const lessonFile = fs.readFileSync(lessonPath, "utf-8");
      const { data: lessonData } = matter(lessonFile);
      return {
        title: lessonData.title || f.replace(".md", ""),
        slug: f.replace(".md", ""),
        description: lessonData.description || "",
        order: lessonData.order || 0,
      };
    });
    return {
      title: data.title || slug,
      slug,
      description: data.description || "",
      order: data.order || 0,
      lessons,
    };
  } catch {
    return null;
  }
}

export function getAllCourses(): CourseMeta[] {
  const slugs = getCourseSlugs();
  return slugs
    .map(getCourseMeta)
    .filter((c): c is CourseMeta => c !== null)
    .sort((a, b) => a.order - b.order);
}

export function getLessonData(
  courseSlug: string,
  lessonSlug: string
): LessonData | null {
  const lessonPath = path.join(contentDir, courseSlug, `${lessonSlug}.md`);
  try {
    if (!fs.existsSync(lessonPath)) return null;
    const file = fs.readFileSync(lessonPath, "utf-8");
    const { data, content } = matter(file);
    return {
      title: data.title || lessonSlug,
      description: data.description || "",
      content,
      frontmatter: data,
    };
  } catch {
    return null;
  }
}
