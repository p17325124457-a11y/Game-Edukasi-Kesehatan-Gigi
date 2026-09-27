import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Volume2, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { EducationalFeedbackModal } from './EducationalFeedbackModal';

interface BrushingTimerProps {
  onComplete: (score: number, stars: number) => void;
  onGoHome: () => void;
}

interface QuadrantInfo {
  id: number;
  name: string;
  zone: string;
  instruction: string;
  technique: string;
  mouthGraphicPos: string;
}

const QUADRANTS: QuadrantInfo[] = [
  {
    id: 1,
    name: 'Kuadran 1: Gigi Kanan Atas',
    zone: 'Kanan Atas',
    instruction: 'Sikat bagian luar, kunyah, dan dalam gigi kanan atas dengan gerakan memutar melingkar.',
    technique: 'Arahkan bulu sikat 45 derajat ke garis gusi, buat lingkaran-lingkaran kecil.',
    mouthGraphicPos: 'top-right'
  },
  {
    id: 2,
    name: 'Kuadran 2: Gigi Kiri Atas',
    zone: 'Kiri Atas',
    instruction: 'Pindah ke gigi kiri atas! Bersihkan permukaan kunyah geraham dan bagian dalam gigi.',
    technique: 'Gerakan maju mundur untuk dataran kunyah, mencongkel keluar untuk bagian dalam.',
    mouthGraphicPos: 'top-left'
  },
  {
    id: 3,
    name: 'Kuadran 3: Gigi Kiri Bawah',
    zone: 'Kiri Bawah',
    instruction: 'Bagus! Lanjut ke gigi kiri bawah. Pastikan sela gigi geraham disikat menyeluruh.',
    technique: 'Sikat perlahan tanpa menekan terlalu keras ke gusi.',
    mouthGraphicPos: 'bottom-left'
  },
  {
    id: 4,
    name: 'Kuadran 4: Gigi Kanan Bawah',
    zone: 'Kanan Bawah',
    instruction: 'Langkah terakhir gigi! Sikat gigi kanan bawah sampai busanya merata.',
    technique: 'Cungkil perlahan sisa kotoran dari arah gusi ke mahkota gigi.',
    mouthGraphicPos: 'bottom-right'
  }
];

export const BrushingTimer: React.FC<BrushingTimerProps> = ({
  onComplete,
  onGoHome,
}) => {
  const TOTAL_SECONDS = 120; // 2 minutes
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Quadrant tracking: 0 to 29 = Quad 1, 30 to 59 = Quad 2, 60 to 89 = Quad 3, 90 to 119 = Quad 4
  const elapsed = TOTAL_SECONDS - secondsLeft;
  const currentQuadrantIndex = Math.min(3, Math.floor(elapsed / 30));
  const currentQuadrant = QUADRANTS[currentQuadrantIndex];
  const quadrantSecondsLeft = 30 - (elapsed % 30);

  // Tick effect
  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsLeft(prev => {
          const next = prev - 1;
          // Soft sound on transition
          if ((TOTAL_SECONDS - next) % 30 === 0 && next > 0) {
            soundManager.playSuccess();
          } else {
            soundManager.playTick();
          }
          return next;
        });
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      onComplete(80, 3);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, secondsLeft, onComplete]);

  const handleTogglePlay = () => {
    soundManager.playPop();
    setIsActive(!isActive);
  };

  const handleReset = () => {
    soundManager.playPop();
    setIsActive(false);
    setSecondsLeft(TOTAL_SECONDS);
    setIsFinished(false);
  };

  // Format mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const progressPercentage = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-sky-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-heading flex items-center gap-2">
            <span>⏱️</span> Panduan Sikat Gigi 2 Menit (4 Kuadran)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Gunakan timer interaktif ini saat kamu menyikat gigi di pagi dan malam hari!
          </p>
        </div>

        <div className="text-xs text-slate-500">
          Durasi Rekomendasi: <span className="font-bold text-sky-700">120 Detik (2 Menit)</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Interactive 4-Quadrant Mouth Visualizer */}
        <div className="md:col-span-6 bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-sm text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Area Sikat Aktif: Kuadran {currentQuadrantIndex + 1}
          </div>

          {/* Interactive Mouth Box */}
          <div className="w-56 h-56 mx-auto rounded-3xl bg-sky-50 border-4 border-sky-200 grid grid-cols-2 grid-rows-2 p-2 gap-2 relative shadow-inner">
            
            {/* Quad 1: Top Right */}
            <div
              className={`rounded-2xl flex flex-col items-center justify-center p-2 transition-all ${
                currentQuadrantIndex === 0 && isActive
                  ? 'bg-sky-500 text-white shadow-md scale-95 ring-4 ring-sky-200 animate-pulse-subtle'
                  : currentQuadrantIndex > 0
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white/80 text-slate-600'
              }`}
            >
              <span className="text-2xl">🦷</span>
              <span className="text-[11px] font-bold mt-1">Kanan Atas</span>
              {currentQuadrantIndex > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />}
            </div>

            {/* Quad 2: Top Left */}
            <div
              className={`rounded-2xl flex flex-col items-center justify-center p-2 transition-all ${
                currentQuadrantIndex === 1 && isActive
                  ? 'bg-sky-500 text-white shadow-md scale-95 ring-4 ring-sky-200 animate-pulse-subtle'
                  : currentQuadrantIndex > 1
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white/80 text-slate-600'
              }`}
            >
              <span className="text-2xl">🦷</span>
              <span className="text-[11px] font-bold mt-1">Kiri Atas</span>
              {currentQuadrantIndex > 1 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />}
            </div>

            {/* Quad 4: Bottom Right */}
            <div
              className={`rounded-2xl flex flex-col items-center justify-center p-2 transition-all ${
                currentQuadrantIndex === 3 && isActive
                  ? 'bg-sky-500 text-white shadow-md scale-95 ring-4 ring-sky-200 animate-pulse-subtle'
                  : currentQuadrantIndex > 3
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white/80 text-slate-600'
              }`}
            >
              <span className="text-2xl">🦷</span>
              <span className="text-[11px] font-bold mt-1">Kanan Bawah</span>
              {currentQuadrantIndex > 3 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />}
            </div>

            {/* Quad 3: Bottom Left */}
            <div
              className={`rounded-2xl flex flex-col items-center justify-center p-2 transition-all ${
                currentQuadrantIndex === 2 && isActive
                  ? 'bg-sky-500 text-white shadow-md scale-95 ring-4 ring-sky-200 animate-pulse-subtle'
                  : currentQuadrantIndex > 2
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white/80 text-slate-600'
              }`}
            >
              <span className="text-2xl">🦷</span>
              <span className="text-[11px] font-bold mt-1">Kiri Bawah</span>
              {currentQuadrantIndex > 2 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />}
            </div>

            {/* Floating Toothbrush Pointer */}
            {isActive && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-3xl animate-bounce">🪥</span>
              </div>
            )}

          </div>

          <div className="mt-4 text-xs font-semibold text-slate-600">
            Sisa Waktu Kuadran Ini: <span className="text-sky-600 font-bold tabular-nums">{quadrantSecondsLeft} detik</span>
          </div>
        </div>

        {/* Right: Timer Controls & Instruction Guidance */}
        <div className="md:col-span-6 bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-sm">
          
          {/* Big Digital Clock Display */}
          <div className="text-center mb-6">
            <div className="text-6xl font-black text-slate-800 font-heading tracking-tight tabular-nums">
              {formattedTime}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full mt-4 overflow-hidden p-0.5">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Current Step Instruction Card */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wide">
                {currentQuadrant.name}
              </span>
              <span className="text-[11px] font-semibold text-sky-600">
                Langkah {currentQuadrantIndex + 1} dari 4
              </span>
            </div>
            <p className="text-xs font-medium text-slate-700 leading-relaxed">
              {currentQuadrant.instruction}
            </p>
            <div className="mt-2 text-[11px] text-sky-900 bg-white/70 p-2 rounded-lg border border-sky-100">
              💡 <strong>Tips Teknik:</strong> {currentQuadrant.technique}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleTogglePlay}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-95 ${
                isActive
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-sky-600 hover:bg-sky-700'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Jeda Sementara</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>{secondsLeft === TOTAL_SECONDS ? 'Mulai Menyikat Gigi' : 'Lanjutkan'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-3 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
              title="Mulai Ulang Waktu"
              aria-label="Mulai Ulang Waktu"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      {/* Completion Modal */}
      <EducationalFeedbackModal
        isOpen={isFinished}
        title="Hebat! 2 Menit Selesai dengan Sempurna!"
        subtitle="Gigi kamu telah disikat selama 2 menit penuh di seluruh 4 kuadran mulut."
        scoreEarned={80}
        starsEarned={3}
        educationalTakeaway={[
          'Menyikat gigi selama 2 menit memastikan seluruh permukaan luar, kunyah, dan dalam bersih dari plak.',
          'Pemberian waktu 30 detik untuk setiap kuadran menjaga agar tidak ada bagian gigi yang terlewat.',
          'Lakukan kebiasaan baik ini 2 kali sehari: pagi setelah makan pagi dan malam sebelum tidur.',
          'Kumur cukup 1 kali dengan sedikit air agar pasta gigi berfluoride tetap melindungi email gigi.'
        ]}
        doctorTip="Jadikan sikat gigi 2 menit sebagai ritual seru setiap hari untuk senyum sehat bebas gigi berlubang!"
        onPlayAgain={handleReset}
        onNextGame={onGoHome}
        nextGameLabel="Kembali ke Beranda"
        onGoHome={onGoHome}
      />
    </div>
  );
};
