import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FoodItem } from '../types';
import { FOOD_ITEMS } from '../data/gameData';
import { soundManager } from '../utils/audio';
import { Heart, Sparkles, CheckCircle, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { EducationalFeedbackModal } from './EducationalFeedbackModal';

interface FoodSorterGameProps {
  onComplete: (score: number, stars: number) => void;
  onGoHome: () => void;
  onNextGame: () => void;
}

export const FoodSorterGame: React.FC<FoodSorterGameProps> = ({
  onComplete,
  onGoHome,
  onNextGame,
}) => {
  // Game state
  const [itemsQueue, setItemsQueue] = useState<FoodItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [lastFeedback, setLastFeedback] = useState<{
    isCorrect: boolean;
    item: FoodItem;
    explanation: string;
  } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize randomized game items
  const startNewGame = useCallback(() => {
    // Shuffle all items
    const shuffled = [...FOOD_ITEMS].sort(() => Math.random() - 0.5);
    setItemsQueue(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setLives(3);
    setLastFeedback(null);
    setIsFinished(false);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const currentItem = useMemo(() => {
    return itemsQueue[currentIndex] || null;
  }, [itemsQueue, currentIndex]);

  const handleChoice = (chosenCategory: 'good' | 'bad') => {
    if (!currentItem || isFinished) return;

    const isCorrect = currentItem.category === chosenCategory;

    if (isCorrect) {
      soundManager.playSuccess();
      const pointsAdded = 15 + streak * 5;
      setScore(prev => prev + pointsAdded);
      setStreak(prev => prev + 1);
    } else {
      soundManager.playError();
      setStreak(0);
      setLives(prev => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          // Game Over due to no lives
          setTimeout(() => finishGame(score), 800);
        }
        return Math.max(0, nextLives);
      });
    }

    setLastFeedback({
      isCorrect,
      item: currentItem,
      explanation: currentItem.educationalFact,
    });
  };

  const handleNextItem = () => {
    soundManager.playPop();
    setLastFeedback(null);
    if (currentIndex + 1 >= itemsQueue.length) {
      finishGame(score);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const finishGame = (finalScore: number) => {
    setIsFinished(true);
    const calculatedStars = finalScore >= 140 ? 3 : finalScore >= 80 ? 2 : 1;
    onComplete(finalScore, calculatedStars);
  };

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lastFeedback) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextItem();
        }
        return;
      }
      if (e.key === 'ArrowLeft') {
        handleChoice('good');
      } else if (e.key === 'ArrowRight') {
        handleChoice('bad');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentItem, lastFeedback, isFinished]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Game Header HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-sky-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-heading flex items-center gap-2">
            <span>🥗</span> Pilah Makanan Sahabat vs Musuh Gigi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilah apakah makanan ini menyehatkan email gigi atau justru memicu asam & gigi berlubang!
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {/* Hearts / Lives */}
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(heartNum => (
              <Heart
                key={heartNum}
                className={`w-5 h-5 transition-transform ${
                  heartNum <= lives
                    ? 'fill-rose-500 text-rose-500 scale-100'
                    : 'fill-slate-200 text-slate-300 scale-90'
                }`}
              />
            ))}
          </div>

          <span aria-hidden="true" className="text-slate-300">|</span>

          {/* Current Score */}
          <div className="flex items-center gap-1.5 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
            <span className="text-slate-500 font-medium">Skor:</span>
            <span className="font-bold text-sky-700 text-sm tabular-nums">{score}</span>
          </div>

          {/* Progress */}
          <div className="text-slate-500">
            <span className="font-semibold text-slate-700 tabular-nums">{currentIndex + 1}</span>
            <span className="mx-0.5">/</span>
            <span className="tabular-nums">{itemsQueue.length}</span>
          </div>
        </div>
      </div>

      {/* Main Playing Arena */}
      {currentItem && !isFinished && (
        <div className="relative">
          {/* Central Food Card */}
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-sky-100 shadow-md p-6 sm:p-8 text-center relative overflow-hidden transition-all duration-300">
            
            {/* Streak Indicator */}
            {streak > 1 && (
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>Kombo x{streak}! (+{streak * 5} bonus)</span>
              </div>
            )}

            {/* Food Icon Display */}
            <div className="w-32 h-32 mx-auto rounded-2xl bg-sky-50/80 flex items-center justify-center text-7xl shadow-inner mb-4 animate-float select-none">
              {currentItem.icon}
            </div>

            <h3 className="text-2xl font-bold text-slate-800 font-heading">
              {currentItem.name}
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
              {currentItem.description}
            </p>

            {/* Immediate Educational Feedback Drawer */}
            {lastFeedback && (
              <div
                className={`mt-6 p-4 rounded-xl text-left border animate-fade-in ${
                  lastFeedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  {lastFeedback.isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span>Tepat Sekali!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Kurang Tepat!</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-slate-700">
                  {lastFeedback.explanation}
                </p>

                <button
                  onClick={handleNextItem}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <span>Lanjutkan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Action Decision Baskets */}
            {!lastFeedback && (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => handleChoice('good')}
                  className="group flex flex-col items-center justify-center p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 hover:border-emerald-400 active:scale-95 transition-all text-emerald-800"
                >
                  <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">🦷✨</span>
                  <span className="text-xs sm:text-sm font-bold">Sahabat Gigi</span>
                  <span className="text-[11px] text-emerald-600 font-medium hidden sm:inline mt-0.5">
                    Kaya Kalsium & Serat
                  </span>
                </button>

                <button
                  onClick={() => handleChoice('bad')}
                  className="group flex flex-col items-center justify-center p-4 rounded-xl border-2 border-rose-200 bg-rose-50/70 hover:bg-rose-100 hover:border-rose-400 active:scale-95 transition-all text-rose-800"
                >
                  <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">👾⚠️</span>
                  <span className="text-xs sm:text-sm font-bold">Musuh Gigi</span>
                  <span className="text-[11px] text-rose-600 font-medium hidden sm:inline mt-0.5">
                    Asam & Gula Pemicu Plak
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Guidance Footer */}
          <div className="mt-4 text-center text-xs text-slate-400">
            Tip: Gunakan tombol keyboard <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px]">←</kbd> untuk Sahabat Gigi, dan <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px]">→</kbd> untuk Musuh Gigi.
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <EducationalFeedbackModal
        isOpen={isFinished}
        title="Hebat! Misi Memilah Selesai!"
        subtitle="Kamu berhasil mengenali makanan yang menyehatkan dan makanan yang perlu dibatasi untuk gigi sehat."
        scoreEarned={score}
        starsEarned={score >= 140 ? 3 : score >= 80 ? 2 : 1}
        educationalTakeaway={[
          'Makanan renyah kaya serat seperti apel dan wortel merangsang produksi saliva alami untuk membilas kotoran gigi.',
          'Susu dan keju mengandung kalsium dan fosfat yang memperbaiki serta memperkuat lapisan email gigi.',
          'Makanan manis dan minuman bersoda menciptakan lingkungan asam yang bisa melarutkan mineral email gigi.',
          'Bila sesekali makan yang manis, jangan lupa minum air putih dan menyikat gigi 30 menit setelahnya.'
        ]}
        doctorTip="Ingat selalu rumus 2x2: Sikat gigi minimal 2 kali sehari selama 2 menit untuk membersihkan sisa makanan!"
        onPlayAgain={startNewGame}
        onNextGame={onNextGame}
        nextGameLabel="Lanjut: Basmi Kuman"
        onGoHome={onGoHome}
      />
    </div>
  );
};
