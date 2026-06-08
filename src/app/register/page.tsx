import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import Link from "next/link";

async function register(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    redirect("/register?error=missing");
  }
  if (password.length < 6) {
    redirect("/register?error=short");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    redirect("/register?error=taken");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, hashedPassword },
  });

  redirect("/login?registered=true");
}

export default async function RegisterPage(props: { searchParams?: Promise<{ error?: string }> }) {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  const searchParams = await props.searchParams;
  const error = searchParams?.error;
  const errorMsg = error === "taken" ? "Email already registered" : error === "short" ? "Password must be at least 6 characters" : error === "missing" ? "All fields are required" : null;

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="relative w-full max-w-sm animate-fade-in">
        <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 opacity-20 blur-xl" />
        <div className="rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Create account</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Sign up to start learning.
            </p>
          </div>

          {errorMsg && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {errorMsg}
            </p>
          )}

          <form action={register} className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-xl border border-zinc-200/60 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-xl border border-zinc-200/60 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="mt-1 block w-full rounded-xl border border-zinc-200/60 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-md"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
