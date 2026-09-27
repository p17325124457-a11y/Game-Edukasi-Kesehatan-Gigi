import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface EducationalFeedbackModalProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  scoreEarned: number;
  starsEarned: number;
  educationalTakeaway: string[];
  doctorTip: string;
  onPlayAgain: () => void;
  onNextGame: () => void;
  nextGameLabel?: string;
  onGoHome: () => void;
}

export const EducationalFeedbackModal: React.FC<EducationalFeedbackModalProps> = ({
  isOpen,
  title,
  subtitle,
  scoreEarned,
  starsEarned,
  educationalTakeaway,
  doctorTip,
  onPlayAgain,
  onNextGame,
  nextGameLabel = 'Mainkan Game Berikutnya',
  onGoHome,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundManager.playFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#34d399', '#fbbf24', '#f472b6'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden text-center p-6 md:p-8">
        
        {/* Sparkle Header Trophy */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-inner">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>

        <h3 className="text-2xl font-bold text-slate-800 font-heading">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
          {subtitle}
        </p>

        {/* Score & Stars Earned */}
        <div className="flex items-center justify-center gap-6 my-6 py-3 px-4 bg-sky-50/70 border border-sky-100 rounded-xl text-center">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">Poin Baru</div>
            <div className="text-2xl font-bold text-sky-600 tabular-nums">+{scoreEarned}</div>
          </div>
          <div className="h-8 w-[1px] bg-sky-200" aria-hidden="true" />
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">Bintang</div>
            <div className="text-2xl font-bold text-amber-500 flex items-center justify-center gap-1 tabular-nums">
              <Sparkles className="w-5 h-5 fill-amber-400" />
              <span>+{starsEarned}</span>
            </div>
          </div>
        </div>

        {/* Educational Takeaways */}
        <div className="text-left bg-slate-50 border border-slate-200/70 rounded-xl p-4 mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1.5 mb-2">
            <span>💡</span> Catatan Edukasi Dokter Gigi Cilik
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            {educationalTakeaway.map((point, index) => (
              <li key={index} className="flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Doctor's Gold Tip */}
        <div className="text-left bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-6 text-xs text-emerald-900 leading-relaxed">
          <strong className="block text-emerald-800 font-semibold mb-0.5">Pesan Kesehatan:</strong>
          {doctorTip}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              soundManager.playPop();
              onPlayAgain();
            }}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Lagi</span>
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              onNextGame();
            }}
            className="w-full sm:w-auto flex-[1.4] flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md transition-all hover:shadow-sky-200"
          >
            <span>{nextGameLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              onGoHome();
            }}
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Kembali ke Beranda"
            aria-label="Kembali ke Beranda"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
