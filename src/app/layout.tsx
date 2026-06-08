import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getCurrentUser } from "@/lib/dal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Dev Learning",
  description: "Learn web development with interactive courses, flashcards, and quizzes.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <ThemeProvider>
          <Header user={user} />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-200/60 bg-white py-8 text-center text-sm text-zinc-400 dark:border-zinc-800/60 dark:bg-zinc-900 dark:text-zinc-500">
            <div className="mx-auto max-w-5xl px-4">
              &copy; {new Date().getFullYear()} Web Dev Learning. Built with Next.js.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
