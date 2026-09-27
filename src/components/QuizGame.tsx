import React, { useState, useCallback } from 'react';
import { QUIZ_QUESTIONS } from '../data/gameData';
import { soundManager } from '../utils/audio';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { EducationalFeedbackModal } from './EducationalFeedbackModal';

interface QuizGameProps {
  onComplete: (score: number, stars: number) => void;
  onGoHome: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  onComplete,
  onGoHome,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null || isFinished) return;

    setSelectedOption(index);
    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      soundManager.playSuccess();
      setScore(s => s + 20);
    } else {
      soundManager.playError();
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPop();
    if (currentIndex + 1 >= QUIZ_QUESTIONS.length) {
      setIsFinished(true);
      const starsEarned = score >= 120 ? 3 : score >= 80 ? 2 : 1;
      onComplete(score, starsEarned);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-sky-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-heading flex items-center gap-2">
            <span>🎓</span> Kuis Dokter Gigi Cilik
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Uji pengetahuanmu seputar cara merawat kesehatan gigi dan mulut!
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
            <span className="text-slate-500 font-medium">Skor:</span>
            <span className="font-bold text-sky-700 text-sm tabular-nums">{score}</span>
          </div>

          <div className="text-slate-500">
            Soal <span className="font-semibold text-slate-700 tabular-nums">{currentIndex + 1}</span> dari{' '}
            <span className="tabular-nums">{QUIZ_QUESTIONS.length}</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      {currentQ && !isFinished && (
        <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-sm">
          
          {/* Question Text */}
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-2">
              Pertanyaan #{currentIndex + 1}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 font-heading leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;
              const hasAnswered = selectedOption !== null;

              let btnStyle = 'border-slate-200 hover:border-sky-400 bg-white text-slate-700';

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-semibold';
                } else {
                  btnStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-xs sm:text-sm ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {hasAnswered && (
                    <div className="shrink-0">
                      {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when Answered */}
          {selectedOption !== null && (
            <div className="mt-6 p-4 rounded-2xl bg-sky-50 border border-sky-200 animate-fade-in text-xs text-sky-900">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-sky-800">
                <span>💡</span>
                <span>Penjelasan Medis:</span>
              </div>
              <p className="leading-relaxed text-slate-700">
                {currentQ.explanation}
              </p>
              <div className="mt-2 text-[10px] text-slate-500">
                Sumber Referensi: {currentQ.source}
              </div>

              <button
                onClick={handleNextQuestion}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-sm transition-all"
              >
                <span>{currentIndex + 1 >= QUIZ_QUESTIONS.length ? 'Lihat Hasil Akhir' : 'Soal Berikutnya'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* Completion Modal */}
      <EducationalFeedbackModal
        isOpen={isFinished}
        title="Kuis Dokter Gigi Cilik Selesai!"
        subtitle={`Kamu berhasil mengumpulkan ${score} poin dari ${QUIZ_QUESTIONS.length * 20} poin maksimal!`}
        scoreEarned={score}
        starsEarned={score >= 120 ? 3 : score >= 80 ? 2 : 1}
        educationalTakeaway={[
          'Sikat gigi 2 kali sehari: pagi setelah sarapan dan malam sebelum tidur.',
          'Gunakan pasta gigi berfluoride seukuran biji jagung untuk melindungi lapisan email.',
          'Pemeriksaan rutin ke dokter gigi dilakukan setiap 6 bulan sekali.',
          'Gunakan benang gigi (dental floss) untuk membersihkan sela gigi yang sempit.'
        ]}
        doctorTip="Pertahankan wawasan hebat ini dan bagikan ilmu merawat gigi kepada teman dan keluargamu!"
        onPlayAgain={handleRestart}
        onNextGame={onGoHome}
        nextGameLabel="Kembali ke Beranda"
        onGoHome={onGoHome}
      />
    </div>
  );
};
