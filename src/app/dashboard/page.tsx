import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, getDashboardData } from "@/lib/dal";

function ProgressRing({ percent, size = 80, strokeWidth = 6 }: { percent: number; size?: number; strokeWidth?: number }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-zinc-200 dark:text-zinc-700" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="text-indigo-500 transition-all duration-1000"
        />
      </svg>
      <span className="absolute text-sm font-bold text-zinc-900 dark:text-zinc-100">{percent}%</span>
    </div>
  );
}

const barColors = ["from-indigo-500 to-violet-500", "from-emerald-500 to-teal-500", "from-orange-500 to-rose-500", "from-sky-500 to-cyan-500", "from-purple-500 to-pink-500"];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const data = await getDashboardData(user.id);
  const { completedCount, totalQuizScore, totalQuizCount, totalLessons, overallPercent, lessonsByCourse, activeCourses, recentActivity, avgQuizScore, quizHighScore, streak, badges } = data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div className="animate-fade-in flex items-start gap-6 rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900 sm:p-8 hover-lift">
        <div className="shrink-0">
          {user.image ? (
            <img src={user.image} alt="" className="size-16 rounded-2xl ring-2 ring-zinc-200 dark:ring-zinc-700" />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-xl font-bold text-white shadow-sm">
              {(user.name || "U")[0]}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Welcome back, {user.name || "Learner"}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {completedCount === totalLessons && totalLessons > 0
              ? "You completed everything! Amazing."
              : `Keep learning — you have ${totalLessons - completedCount} lessons remaining.`}
          </p>
          {streak > 0 && (
            <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <span>🔥</span> {streak} day streak
            </p>
          )}
        </div>
        <div className="hidden shrink-0 sm:block">
          <ProgressRing percent={overallPercent} size={88} strokeWidth={7} />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-2xl p-5 animate-slide-up animate-delay-100 stat-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{completedCount}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Lessons Done</div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700" style={{ width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 animate-slide-up animate-delay-200 stat-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalQuizScore}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Quiz Points</div>
              <div className="mt-0.5 text-[11px] text-zinc-400">{totalQuizCount} quiz{totalQuizCount !== 1 ? "zes" : ""} attempted</div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 animate-slide-up animate-delay-300 stat-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{activeCourses}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Active Courses</div>
              <div className="mt-0.5 text-[11px] text-zinc-400">
                {Object.values(lessonsByCourse).filter((c: Record<string, unknown>) => (c as { completedCount: number }).completedCount === (c as { totalLessons: number }).totalLessons).length} completed
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 animate-slide-up animate-delay-400 stat-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{overallPercent}%</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Overall Progress</div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-700" style={{ width: `${overallPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="mt-8 animate-slide-up animate-delay-200">
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Achievements</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {badges.slice(0, 5).map((ub) => (
                <div key={ub.id} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <span>{ub.badge.icon}</span>
                  {ub.badge.name}
                </div>
              ))}
              {badges.length > 5 && (
                <span className="inline-flex items-center rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  +{badges.length - 5}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {Object.entries(lessonsByCourse).length > 0 ? (
        <div className="mt-10 grid gap-8">
          {Object.entries(lessonsByCourse).map(([, course], ci) => {
            const c = course as Record<string, unknown>;
            const completed = c.completedCount as number;
            const total = c.totalLessons as number;
            const percent = c.percent as number;

            return (
              <section key={c.courseSlug as string} className="animate-slide-up" style={{ animationDelay: `${ci * 0.1 + 0.3}s` }}>
                <div className="mb-4 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${barColors[ci % barColors.length]}`} />
                      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{c.courseTitle as string}</h2>
                      <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {completed}/{total}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${barColors[ci % barColors.length]} transition-all duration-700`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    href={`/courses/${c.courseSlug as string}`}
                    className="ml-4 shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
                  >
                    View &rarr;
                  </Link>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {(c.lessons as Array<Record<string, unknown>>).slice(0, 6).map((p) => {
                    const lesson = p.lesson as { slug: string; title: string };
                    return (
                      <Link
                        key={p.id as string}
                        href={`/courses/${c.courseSlug as string}/${lesson.slug}`}
                        className={`flex items-center gap-3 rounded-xl border p-3.5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                          p.completed
                            ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20"
                            : "border-zinc-200/60 bg-white hover:border-zinc-300 dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:border-zinc-600"
                        }`}
                      >
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold shadow-sm ${
                            p.completed
                              ? "bg-emerald-500 text-white"
                              : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                          }`}
                        >
                          {p.completed ? (
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          ) : (
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {lesson.title}
                        </span>
                        {(p.quizScore as number) > 0 && (
                          <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400">
                            {p.quizScore as number}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                  {(c.lessons as Array<unknown>).length > 6 && (
                    <Link
                      href={`/courses/${c.courseSlug as string}`}
                      className="flex items-center justify-center rounded-xl border border-dashed border-zinc-300 p-3.5 text-sm font-medium text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-300"
                    >
                      +{(c.lessons as Array<unknown>).length - 6} more lessons
                    </Link>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mt-16 animate-fade-in text-center">
          <div className="mx-auto max-w-sm">
            <div className="flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-400 dark:from-indigo-950/50 dark:to-violet-950/50 dark:text-indigo-500">
                <svg className="size-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
            </div>
            <h2 className="mt-5 text-xl font-semibold text-zinc-900 dark:text-zinc-100">No progress yet</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Start a course and track your learning journey.</p>
            <Link
              href="/courses"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
            >
              Browse Courses
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/performance"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          Performance Report
        </Link>
      </div>

      {recentActivity.length > 0 && (
        <section className="mt-10 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Activity</h2>
          <div className="mt-4 space-y-2">
            {recentActivity.map((a) => (
              <Link
                key={a.id}
                href={`/courses/${a.lesson.course.slug}/${a.lesson.slug}`}
                className="flex items-center gap-3 rounded-xl border border-zinc-200/60 bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:border-zinc-600"
              >
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold shadow-sm ${
                  a.completed
                    ? "bg-emerald-500 text-white"
                    : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                }`}>
                  {a.completed ? (
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {a.lesson.title}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    {a.lesson.course.title}
                    {a.quizScore > 0 && ` \u00B7 Score: ${a.quizScore}`}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-zinc-400 dark:text-zinc-500">
                  {new Date(a.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
