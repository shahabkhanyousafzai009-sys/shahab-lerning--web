import { requireAuth, getAllStudents } from "@/lib/dal";
import Link from "next/link";

export default async function StudentsPage() {
  const user = await requireAuth();
  const students = await getAllStudents();

  const totalStudents = students.length;
  const avgCompletion = students.length > 0
    ? Math.round(students.reduce((s, st) => s + (st.totalLessons > 0 ? (st.completedLessons / st.totalLessons) * 100 : 0), 0) / students.length)
    : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Students</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Overview of all registered students and their progress.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-2xl p-5">
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalStudents}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Students</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{avgCompletion}%</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Avg Completion Rate</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {students.reduce((s, st) => s + st.badges, 0)}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Badges Earned</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200/60 bg-zinc-50 text-left dark:border-zinc-700/60 dark:bg-zinc-800/50">
                <th className="px-5 py-3.5 font-semibold text-zinc-700 dark:text-zinc-300">Student</th>
                <th className="px-5 py-3.5 font-semibold text-zinc-700 dark:text-zinc-300">Progress</th>
                <th className="px-5 py-3.5 font-semibold text-zinc-700 dark:text-zinc-300">Avg Quiz</th>
                <th className="px-5 py-3.5 font-semibold text-zinc-700 dark:text-zinc-300">Badges</th>
                <th className="px-5 py-3.5 font-semibold text-zinc-700 dark:text-zinc-300">Quizzes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-700/60">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-zinc-400">No students yet.</td>
                </tr>
              ) : (
                students.map((student) => {
                  const percent = student.totalLessons > 0 ? Math.round((student.completedLessons / student.totalLessons) * 100) : 0;
                  return (
                    <tr key={student.id} className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {student.image ? (
                            <img src={student.image} alt="" className="h-8 w-8 rounded-full ring-2 ring-zinc-200 dark:ring-zinc-700" />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-zinc-800 dark:text-zinc-200">{student.name}</p>
                            <p className="text-xs text-zinc-400">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-zinc-500">{percent}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          student.avgQuizScore >= 80 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                          : student.avgQuizScore >= 50 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}>
                          {student.avgQuizScore}%
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-zinc-600 dark:text-zinc-400">{student.badges}</td>
                      <td className="px-5 py-4 text-sm text-zinc-600 dark:text-zinc-400">{student.totalAttempts}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
