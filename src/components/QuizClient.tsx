"use client";

import { useState, useCallback } from "react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export function QuizClient({
  questions,
  lessonId,
}: {
  questions: QuizQuestion[];
  lessonId: string;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelected(option);
  };

  const handleSubmit = useCallback(async () => {
    if (!selected) return;
    setShowResult(true);
    const correct = selected === q.correctAnswer;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => ({ ...prev, [q.id]: selected }));
  }, [selected, q]);

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const finalScore = score + (selected === q.correctAnswer ? 1 : 0);
      setScore(finalScore);
      setFinished(true);
      saveScore(finalScore);
    }
  };

  const saveScore = async (finalScore: number) => {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, quizScore: finalScore }),
      });
    } catch {}
  };

  if (finished) {
    return (
      <div className="mt-8 animate-fade-in">
        <div className="overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-500 p-8 text-center text-white">
            <div className="text-5xl font-bold">{score}/{questions.length}</div>
            <p className="mt-2 text-lg font-medium text-white/90">Quiz Complete!</p>
          </div>
          <div className="p-8 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              {score === questions.length
                ? "Perfect score! You know this inside out."
                : score >= questions.length / 2
                ? "Great job! A little more practice and you'll ace it."
                : "Keep studying and try again!"}
            </p>
            <button
              onClick={() => {
                setCurrent(0);
                setSelected(null);
                setShowResult(false);
                setScore(0);
                setFinished(false);
                setAnswers({});
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>Question {current + 1} of {questions.length}</span>
          <span className="font-medium text-indigo-600">{score} correct</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-700/60 dark:bg-zinc-900">
        <h2 className="text-lg font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">{q.question}</h2>
        <div className="mt-5 space-y-2.5">
          {q.options.map((option) => {
            let classes =
              "w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200";

            if (showResult && option === q.correctAnswer) {
              classes += " border-emerald-300 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-300 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
            } else if (showResult && option === selected && option !== q.correctAnswer) {
              classes += " border-red-200 bg-red-50 text-red-700 ring-1 ring-red-200 dark:border-red-700 dark:bg-red-950/30 dark:text-red-400";
            } else if (selected === option) {
              classes += " border-indigo-300 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300 dark:border-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400";
            } else {
              classes += " border-zinc-200/60 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700/60 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800";
            }

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={classes}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110 disabled:opacity-30 disabled:hover:shadow-none disabled:hover:brightness-100"
          >
            Submit Answer
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
          >
            {current < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
