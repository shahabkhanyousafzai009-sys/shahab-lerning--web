import Link from "next/link";
import { getAllCourses } from "@/lib/dal";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const courses = await getAllCourses();
  const session = await auth();

  const totalLessons = courses.reduce((a, c) => a + c._count.lessons, 0);
  const totalSessions = courses.reduce((a, c) => a + c._count.videoSessions, 0);

  return (
    <div className="relative mx-auto max-w-5xl px-4">
      <div className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/hero-bg.jpg)" }} />

      <section className="py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <span className="flex size-1.5 rounded-full bg-emerald-400" />
            Interactive learning platform
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Master{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
              Web Development
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Learn HTML, CSS, JavaScript, Python and more with interactive lessons, smart flashcards, and quizzes that adapt to your pace.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:brightness-105"
                >
                  Go to Dashboard
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Browse Courses
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:brightness-105"
                >
                  Create Account
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { value: courses.length, label: "Courses" },
            { value: totalLessons, label: "Lessons" },
            { value: totalSessions, label: "Video Sessions" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <div className="text-5xl font-bold text-white">{stat.value}+</div>
              <div className="mt-2 text-sm font-medium text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Everything you need to learn</h2>
          <p className="mt-2 text-white/60">Interactive tools designed for effective learning.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Interactive Lessons",
              desc: "Hands-on coding exercises and real-world examples.",
              icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
            },
            {
              title: "Smart Flashcards",
              desc: "Flip cards to review and mark what you've mastered.",
              icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
            },
            {
              title: "Practice Quizzes",
              desc: "Test your knowledge and track scores over time.",
              icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Video Sessions",
              desc: "Follow along with embedded video tutorials.",
              icon: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Available Courses</h2>
            <p className="mt-1 text-white/60">Start your learning journey today.</p>
          </div>
          <Link
            href="/courses"
            className="hidden items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white sm:flex"
          >
            View all
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 text-lg font-bold text-white shadow-sm">
                  {course.title[0]}
                </div>
                <div className="h-1.5 flex-1 rounded-full bg-white/10">
                  <div className="h-full w-0 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 transition-all duration-700 group-hover:w-1/3" />
                </div>
              </div>
              <h3 className="font-semibold text-white transition-colors group-hover:text-indigo-300">{course.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60 line-clamp-2">{course.description}</p>
              <div className="mt-5 flex items-center gap-4 text-xs font-medium text-white/50">
                <span className="flex items-center gap-1">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  {course._count.lessons} lessons
                </span>
                {course._count.videoSessions > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    {course._count.videoSessions} sessions
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
        {courses.length > 6 && (
          <div className="mt-8 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              View All {courses.length} Courses
            </Link>
          </div>
        )}
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/90 via-violet-500/90 to-purple-500/90 px-8 py-16 text-center text-white backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="relative">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to start learning?</h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-white/70">
            Join thousands of learners mastering web development with interactive tools and real-world projects.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl"
              >
                Go to Dashboard
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ) : (
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl"
              >
                Create Free Account
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              {session ? "Continue Learning" : "Explore Courses"}
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} DevLearn. All rights reserved.</p>
      </footer>
    </div>
  );
}
