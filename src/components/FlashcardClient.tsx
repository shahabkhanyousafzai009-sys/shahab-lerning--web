"use client";

import { useState } from "react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export function FlashcardClient({ flashcards, lessonId }: { flashcards: Flashcard[]; lessonId?: string }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState(false);

  const card = flashcards[current];

  if (!flashcards.length) {
    return <div className="mt-8 text-center text-zinc-400 dark:text-zinc-500">No flashcards found.</div>;
  }

  if (finished) {
    const percent = Math.round((mastered.size / flashcards.length) * 100);
    return (
      <div className="mt-8 animate-scale-in">
        <div className="overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-500 p-8 text-center text-white">
            <div className="text-5xl">{percent === 100 ? "\u{1F3C6}" : percent >= 80 ? "\u{1F31F}" : percent >= 50 ? "\u{1F44D}" : "\u{1F4DA}"}</div>
            <div className="mt-3 text-4xl font-bold">{mastered.size}/{flashcards.length}</div>
            <div className="mt-2 flex items-center justify-center gap-1.5">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-white/30">
                <div className="h-full rounded-full bg-white transition-all duration-1000" style={{ width: `${percent}%` }} />
              </div>
              <span className="text-sm font-medium text-white/80">{percent}%</span>
            </div>
            <p className="mt-2 text-lg font-medium text-white/90">Flashcards Complete!</p>
          </div>
          <div className="p-8 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              {percent === 100
                ? "Perfect! You know every card."
                : percent >= 80
                ? "Great work! Almost there."
                : percent >= 50
                ? "Good progress! Keep practicing."
                : "Keep studying and try again!"}
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              {flashcards.length - mastered.size} card{flashcards.length - mastered.size !== 1 ? "s" : ""} to review
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setCurrent(0);
                  setFlipped(false);
                  setMastered(new Set());
                  setFinished(false);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
                Retry All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!card) {
    return <div className="mt-8 text-center text-zinc-400 dark:text-zinc-500">No flashcards found.</div>;
  }

  const isMastered = mastered.has(card.id);
  const progress = ((current + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (current < flashcards.length - 1) {
      setCurrent(current + 1);
      setFlipped(false);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setFlipped(false);
    }
  };

  const toggleMastered = () => {
    const next = new Set(mastered);
    if (isMastered) {
      next.delete(card.id);
    } else {
      next.add(card.id);
    }
    setMastered(next);
  };

  return (
    <div className="mt-8 animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>{current + 1} / {flashcards.length}</span>
          <span className="font-medium text-indigo-600">{mastered.size} mastered</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        className="group relative min-h-[280px] cursor-pointer [perspective:1000px]"
      >
        <div
          className={`relative size-full transition-all duration-500 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div
            className={`absolute inset-0 rounded-2xl border-2 p-8 shadow-sm [backface-visibility:hidden] ${
              isMastered
                ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30"
                : "border-zinc-200/60 bg-white hover:shadow-md hover:border-indigo-200 dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:border-indigo-600"
            }`}
          >
            <div className="flex size-full items-center justify-center">
              <p className="text-center text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
                {card.question}
              </p>
            </div>
            
          </div>

          <div
            className={`absolute inset-0 rounded-2xl border-2 p-8 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] ${
              isMastered
                ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30"
                : "border-zinc-200/60 bg-white hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900"
            }`}
          >
            <div className="flex size-full items-center justify-center">
              <p className="text-center text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">{card.answer}</p>
            </div>
            
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200/60 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent dark:border-zinc-700/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:disabled:hover:bg-transparent"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Previous
        </button>

        <button
          onClick={toggleMastered}
          className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
            isMastered
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
              : "border border-zinc-200/60 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700/60 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}
        >
          {isMastered ? "Mastered" : "Mark as Mastered"}
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200/60 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 dark:border-zinc-700/60 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          {current < flashcards.length - 1 ? "Next" : "Finish"}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
