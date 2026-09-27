import React, { useState, useEffect, useCallback } from 'react';
import { BrushingStep } from '../types';
import { BRUSHING_STEPS } from '../data/gameData';
import { soundManager } from '../utils/audio';
import { Check, ArrowUp, ArrowDown, Sparkles, HelpCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { EducationalFeedbackModal } from './EducationalFeedbackModal';

interface BrushingStepsGameProps {
  onComplete: (score: number, stars: number) => void;
  onGoHome: () => void;
  onNextGame: () => void;
}

export const BrushingStepsGame: React.FC<BrushingStepsGameProps> = ({
  onComplete,
  onGoHome,
  onNextGame,
}) => {
  const [currentSteps, setCurrentSteps] = useState<BrushingStep[]>([]);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Shuffle steps initially
  const shuffleSteps = useCallback(() => {
    let shuffled: BrushingStep[] = [];
    do {
      shuffled = [...BRUSHING_STEPS].sort(() => Math.random() - 0.5);
    } while (shuffled.every((step, idx) => step.correctOrder === idx + 1)); // ensure not already solved

    setCurrentSteps(shuffled);
    setIsEvaluated(false);
    setIsAllCorrect(false);
    setAttempts(0);
  }, []);

  useEffect(() => {
    shuffleSteps();
  }, [shuffleSteps]);

  // Move step up or down
  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (isAllCorrect) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentSteps.length) return;

    soundManager.playPop();
    const updated = [...currentSteps];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setCurrentSteps(updated);
    setIsEvaluated(false);
  };

  // Evaluate the sequence
  const handleCheckOrder = () => {
    const isPerfect = currentSteps.every((step, idx) => step.correctOrder === idx + 1);
    setIsEvaluated(true);
    setAttempts(a => a + 1);

    if (isPerfect) {
      soundManager.playSuccess();
      setIsAllCorrect(true);
      const scoreEarned = Math.max(50, 100 - (attempts * 15));
      const starsEarned = attempts === 0 ? 3 : attempts <= 2 ? 2 : 1;
      setTimeout(() => {
        onComplete(scoreEarned, starsEarned);
      }, 700);
    } else {
      soundManager.playError();
      setIsAllCorrect(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-sky-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-heading flex items-center gap-2">
            <span>📋</span> Urutkan Langkah Sikat Gigi yang Benar
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Susun 6 langkah menyikat gigi standar medis Kemenkes RI dari nomor 1 hingga 6!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playPop();
              setShowGuide(!showGuide);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>{showGuide ? 'Tutup Panduan' : 'Bantuan Panduan'}</span>
          </button>
        </div>
      </div>

      {/* Guide Tab (Collapsible) */}
      {showGuide && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-slate-700 animate-fade-in">
          <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-1">
            <span>💡</span> Panduan Urutan Sikat Gigi yang Tepat:
          </h4>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
            {BRUSHING_STEPS.map(s => (
              <li key={s.id}>
                <strong>{s.title}</strong>: {s.shortDesc}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Step Sequence Container */}
      <div className="space-y-3">
        {currentSteps.map((step, index) => {
          const slotNumber = index + 1;
          const isCorrectPosition = step.correctOrder === slotNumber;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border transition-all ${
                isEvaluated
                  ? isCorrectPosition
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : 'bg-rose-50/80 border-rose-300'
                  : 'bg-white border-slate-200 hover:border-sky-300 shadow-xs'
              }`}
            >
              {/* Position Number Pill */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base shrink-0 select-none ${
                  isEvaluated
                    ? isCorrectPosition
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-rose-500 text-white shadow-sm'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {slotNumber}
              </div>

              {/* Step Info Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-800 font-heading">
                    {step.title}
                  </h4>
                  {isEvaluated && (
                    <span className="text-xs font-semibold">
                      {isCorrectPosition ? (
                        <span className="text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Tepat
                        </span>
                      ) : (
                        <span className="text-rose-600">Posisi Belum Tepat</span>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  {step.shortDesc}
                </p>
                {isEvaluated && isCorrectPosition && (
                  <p className="text-[11px] text-emerald-800 mt-1 italic">
                    Alasan Medis: {step.detailReason}
                  </p>
                )}
              </div>

              {/* Reordering Controls (Up / Down) */}
              {!isAllCorrect && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    disabled={index === 0}
                    onClick={() => moveStep(index, 'up')}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-700"
                    title="Geser ke Atas"
                    aria-label="Geser ke Atas"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={index === currentSteps.length - 1}
                    onClick={() => moveStep(index, 'down')}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-700"
                    title="Geser ke Bawah"
                    aria-label="Geser ke Bawah"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-sky-100">
        <button
          onClick={() => {
            soundManager.playPop();
            shuffleSteps();
          }}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Acak Ulang Posisi</span>
        </button>

        <button
          onClick={handleCheckOrder}
          disabled={isAllCorrect}
          className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Periksa Urutan Langkah</span>
        </button>
      </div>

      {/* Completion Modal */}
      <EducationalFeedbackModal
        isOpen={isAllCorrect}
        title="Hebat! Urutan Sikat Gigi Sangat Sempurna!"
        subtitle="Kamu telah menguasai urutan menyikat gigi yang tepat sesuai standar kesehatan gigi nasional!"
        scoreEarned={Math.max(50, 100 - (attempts * 15))}
        starsEarned={attempts === 0 ? 3 : 2}
        educationalTakeaway={[
          'Oleskan pasta gigi berfluoride secukupnya (seukuran biji jagung).',
          'Sikat gigi bagian depan memutar dari gusi ke gigi agar tidak mengikis leher gigi.',
          'Sikat permukaan kunyah geraham secara merata untuk membuang sisa makanan di ceruk gigi.',
          'Bersihkan lidah untuk mencegah penumpukan bakteri bau mulut.',
          'Kumur cukup 1 kali dengan sedikit air agar fluoride tetap aktif melindungi enamel.'
        ]}
        doctorTip="Menyikat gigi bukan tentang seberapa keras menggosoknya, tetapi tentang teknik memutar yang lembut dan merata ke seluruh permukaan gigi!"
        onPlayAgain={shuffleSteps}
        onNextGame={onNextGame}
        nextGameLabel="Coba: Timer 2 Menit"
        onGoHome={onGoHome}
      />
    </div>
  );
};
