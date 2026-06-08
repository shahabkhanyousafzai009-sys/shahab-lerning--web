"use client";

import { useState } from "react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export function FlashcardClient({ flashcards }: { flashcards: Flashcard[] }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  const card = flashcards[current];

  if (!card) {
    return <div className="mt-8 text-center text-zinc-400 dark:text-zinc-500">No flashcards found.</div>;
  }

  const isMastered = mastered.has(card.id);
  const progress = ((current + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (current < flashcards.length - 1) {
      setCurrent(current + 1);
      setFlipped(false);
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
        className="group relative min-h-[280px] cursor-pointer"
      >
        <div
          className={`absolute inset-0 rounded-2xl border-2 p-8 shadow-sm transition-all duration-500 [backface-visibility:hidden] ${
            flipped ? "opacity-0 rotate-y-180" : "opacity-100"
          } ${isMastered ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30" : "border-zinc-200/60 bg-white hover:shadow-md hover:border-indigo-200 dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:border-indigo-600"}`}
        >
          <div className="flex size-full items-center justify-center">
            <p className="text-center text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
              {card.question}
            </p>
          </div>
          <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-zinc-400 dark:text-zinc-500">
            Click to reveal answer
          </p>
        </div>

        <div
          className={`absolute inset-0 rounded-2xl border-2 p-8 shadow-sm transition-all duration-500 [backface-visibility:hidden] [transform:rotateY(180deg)] ${
            flipped ? "opacity-100" : "opacity-0"
          } ${isMastered ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30" : "border-zinc-200/60 bg-white hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900"}`}
        >
          <div className="flex size-full items-center justify-center">
            <p className="text-center text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">{card.answer}</p>
          </div>
          <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-zinc-400 dark:text-zinc-500">
            Click to see question
          </p>
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
          disabled={current === flashcards.length - 1}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200/60 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent dark:border-zinc-700/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:disabled:hover:bg-transparent"
        >
          Next
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {mastered.size === flashcards.length && (
        <div className="mt-6 animate-fade-in rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6 text-center dark:from-emerald-950/30 dark:to-teal-950/30">
          <div className="text-2xl">🎉</div>
          <p className="mt-2 text-sm font-medium text-emerald-800 dark:text-emerald-400">
            You mastered all {flashcards.length} flashcards!
          </p>
        </div>
      )}
    </div>
  );
}
