import { requireAuth, getPerformanceData } from "@/lib/dal";
import Link from "next/link";

export default async function PerformancePage() {
  const user = await requireAuth();
  const data = await getPerformanceData(user.id);

  const barColors = ["from-indigo-500 to-indigo-600", "from-violet-500 to-violet-600", "from-purple-500 to-purple-600", "from-fuchsia-500 to-fuchsia-600", "from-pink-500 to-pink-600"];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Performance Report</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Your detailed learning analytics and progress.</p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-2xl p-6 animate-slide-up animate-delay-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{data.completionRate}%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Completion Rate</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 animate-slide-up animate-delay-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{data.quizStats.avgScore}%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Average Quiz Score</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 animate-slide-up animate-delay-300">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 0 1-2.77.896m0 0a6.006 6.006 0 0 1-2.77-.896" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{data.quizStats.highScore}%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Highest Score</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 animate-slide-up animate-delay-400">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{data.quizStats.total}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Quizzes Taken</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-6 animate-slide-up animate-delay-200">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Course Breakdown</h2>
          <div className="mt-4 space-y-4">
            {data.courseBreakdown.length === 0 && (
              <p className="text-sm text-zinc-400">No course data yet. Start learning!</p>
            )}
            {data.courseBreakdown.map((course, i) => (
              <div key={course.course}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{course.course}</span>
                  <span className="text-zinc-500">{course.completed}/{course.total} lessons</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${barColors[i % barColors.length]} transition-all duration-700`}
                    style={{ width: `${course.total > 0 ? (course.completed / course.total) * 100 : 0}%` }}
                  />
                </div>
                {course.avgScore > 0 && (
                  <p className="mt-0.5 text-xs text-zinc-400">Avg quiz score: {course.avgScore}%</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 animate-slide-up animate-delay-300">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Quiz Scores</h2>
          <div className="mt-4 space-y-2">
            {data.quizStats.recentScores.length === 0 && (
              <p className="text-sm text-zinc-400">No quiz scores yet. Take a quiz!</p>
            )}
            {data.quizStats.recentScores.map((q, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  q.score >= 80 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                  : q.score >= 50 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                }`}>
                  {q.score}%
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">{q.lesson}</p>
                  <p className="text-xs text-zinc-400">{new Date(q.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.badges.length > 0 && (
        <div className="mt-8 animate-slide-up animate-delay-400">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Badges Earned</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {data.badges.map((ub) => (
              <div key={ub.id} className="glass-card inline-flex items-center gap-2 rounded-xl px-4 py-2.5">
                <span className="text-xl">{ub.badge.icon}</span>
                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{ub.badge.name}</p>
                  <p className="text-xs text-zinc-400">{ub.badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4 animate-slide-up animate-delay-500">
        <Link
          href="/dashboard"
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
