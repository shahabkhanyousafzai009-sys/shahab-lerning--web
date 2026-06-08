import { getAllCourses } from "@/lib/dal";
import { CourseCard } from "@/components/CourseCard";

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">All Courses</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">Choose a course to start learning.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <div
            key={course.id}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CourseCard
              title={course.title}
              description={course.description}
              slug={course.slug}
              lessonCount={course._count.lessons}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
