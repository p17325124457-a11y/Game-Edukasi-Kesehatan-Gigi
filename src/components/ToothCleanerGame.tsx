import React, { useState, useEffect, useCallback } from 'react';
import { soundManager } from '../utils/audio';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { EducationalFeedbackModal } from './EducationalFeedbackModal';

interface ToothCleanerGameProps {
  onComplete: (score: number, stars: number) => void;
  onGoHome: () => void;
  onNextGame: () => void;
}

type ToolType = 'brush' | 'floss' | 'rinse';

interface ToothSpot {
  id: number;
  jaw: 'upper' | 'lower';
  name: string;
  hasPlaque: boolean;
  plaqueCleaned: boolean;
  hasFood: boolean;
  foodCleaned: boolean;
  hasGerm: boolean;
  germCleaned: boolean;
  isSparkling: boolean;
}

export const ToothCleanerGame: React.FC<ToothCleanerGameProps> = ({
  onComplete,
  onGoHome,
  onNextGame,
}) => {
  const [selectedTool, setSelectedTool] = useState<ToolType>('brush');
  const [teeth, setTeeth] = useState<ToothSpot[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string>(
    'Pilih alat di bawah, lalu klik atau usap pada gigi yang bernoda atau ada kuman!'
  );

  // Initialize 12 teeth (6 upper, 6 lower)
  const initTeeth = useCallback(() => {
    const list: ToothSpot[] = [];
    const names = [
      'Geraham Kanan', 'Taring Kanan', 'Gigi Seri Kanan', 'Gigi Seri Kiri', 'Taring Kiri', 'Geraham Kiri'
    ];

    // Upper jaw (6 teeth)
    for (let i = 0; i < 6; i++) {
      list.push({
        id: i,
        jaw: 'upper',
        name: `Atas ${names[i]}`,
        hasPlaque: true,
        plaqueCleaned: false,
        hasFood: i % 2 === 1,
        foodCleaned: false,
        hasGerm: i % 2 === 0,
        germCleaned: false,
        isSparkling: false,
      });
    }

    // Lower jaw (6 teeth)
    for (let i = 0; i < 6; i++) {
      list.push({
        id: i + 6,
        jaw: 'lower',
        name: `Bawah ${names[i]}`,
        hasPlaque: true,
        plaqueCleaned: false,
        hasFood: i % 3 === 0,
        foodCleaned: false,
        hasGerm: i % 2 === 1,
        germCleaned: false,
        isSparkling: false,
      });
    }

    setTeeth(list);
    setScore(0);
    setIsFinished(false);
    setSelectedTool('brush');
    setActionFeedback('Pilih sikat gigi untuk membersihkan plak dan kuman pada permukaan gigi!');
  }, []);

  useEffect(() => {
    initTeeth();
  }, [initTeeth]);

  // Cleanliness calculation
  const totalTasks = teeth.reduce((acc, t) => {
    let count = 0;
    if (t.hasPlaque) count++;
    if (t.hasFood) count++;
    if (t.hasGerm) count++;
    return acc + count;
  }, 0);

  const cleanedTasks = teeth.reduce((acc, t) => {
    let count = 0;
    if (t.hasPlaque && t.plaqueCleaned) count++;
    if (t.hasFood && t.foodCleaned) count++;
    if (t.hasGerm && t.germCleaned) count++;
    return acc + count;
  }, 0);

  const cleanPercentage = totalTasks > 0 ? Math.round((cleanedTasks / totalTasks) * 100) : 0;

  // Handle interacting with a specific tooth
  const handleInteractTooth = (toothId: number) => {
    if (isFinished) return;

    setTeeth(prevTeeth => {
      return prevTeeth.map(tooth => {
        if (tooth.id !== toothId) return tooth;

        let pointsAwarded = 0;
        let newTooth = { ...tooth };

        if (selectedTool === 'brush') {
          // Brush cleans plaque and germ
          let brushedSomething = false;
          if (newTooth.hasPlaque && !newTooth.plaqueCleaned) {
            newTooth.plaqueCleaned = true;
            pointsAwarded += 10;
            brushedSomething = true;
          }
          if (newTooth.hasGerm && !newTooth.germCleaned) {
            newTooth.germCleaned = true;
            pointsAwarded += 15;
            brushedSomething = true;
          }

          if (brushedSomething) {
            soundManager.playBrushScrub();
            setScore(s => s + pointsAwarded);
            setActionFeedback(`Busa sikat membersihkan plak pada ${tooth.name}!`);
          } else if (newTooth.hasFood && !newTooth.foodCleaned) {
            soundManager.playPop();
            setActionFeedback('Sisa makanan terselip di sela gigi! Gunakan Benang Gigi (Floss) untuk mengangkatnya.');
          } else {
            soundManager.playPop();
            setActionFeedback('Gigi ini sudah disikat bersih! Bilas dengan semprotan air untuk membuatnya berkilau.');
          }
        } else if (selectedTool === 'floss') {
          // Floss removes stuck food in interdental spaces
          if (newTooth.hasFood && !newTooth.foodCleaned) {
            newTooth.foodCleaned = true;
            pointsAwarded += 20;
            soundManager.playPop();
            setScore(s => s + pointsAwarded);
            setActionFeedback(`Bagus! Benang gigi berhasil mengangkat sisa makanan di sela ${tooth.name}!`);
          } else {
            soundManager.playPop();
            setActionFeedback('Tidak ada sisa makanan terselip di gigi ini. Gunakan sikat gigi untuk plak!');
          }
        } else if (selectedTool === 'rinse') {
          // Rinse checks if all dirty elements are cleaned, then adds sparkle
          const isReadyToSparkle =
            (!newTooth.hasPlaque || newTooth.plaqueCleaned) &&
            (!newTooth.hasFood || newTooth.foodCleaned) &&
            (!newTooth.hasGerm || newTooth.germCleaned);

          if (isReadyToSparkle && !newTooth.isSparkling) {
            newTooth.isSparkling = true;
            pointsAwarded += 10;
            soundManager.playSparkle();
            setScore(s => s + pointsAwarded);
            setActionFeedback(`Kumur bersih! ${tooth.name} sekarang berkilau putih cemerlang! ✨`);
          } else if (!isReadyToSparkle) {
            soundManager.playError();
            setActionFeedback('Gigi masih ada plak atau sisa makanan! Sikat dan bersihkan dulu sebelum dibilas.');
          }
        }

        return newTooth;
      });
    });
  };

  // Check if all teeth are sparkling or fully cleaned
  useEffect(() => {
    if (teeth.length > 0 && cleanPercentage === 100) {
      // Check if all sparkling or trigger victory after slight delay
      const allDone = teeth.every(t => t.isSparkling || (!t.hasPlaque || t.plaqueCleaned));
      if (allDone && !isFinished) {
        const timer = setTimeout(() => {
          setIsFinished(true);
          const finalScore = score + 50; // victory bonus
          onComplete(finalScore, 3);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [teeth, cleanPercentage, isFinished, score, onComplete]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Game Header HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-sky-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-heading flex items-center gap-2">
            <span>🛡️</span> Basmi Kuman & Bersihkan Plak Gigi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Gunakan Sikat Gigi, Benang Gigi (Floss), dan Air Bilas untuk membersihkan mulut secara menyeluruh!
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {/* Cleanliness Meter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Kebersihan:</span>
            <div className="w-28 h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${cleanPercentage}%` }}
              />
            </div>
            <span className="font-bold text-emerald-600 tabular-nums">{cleanPercentage}%</span>
          </div>

          <span aria-hidden="true" className="text-slate-300">|</span>

          {/* Current Score */}
          <div className="flex items-center gap-1.5 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
            <span className="text-slate-500 font-medium">Skor:</span>
            <span className="font-bold text-sky-700 text-sm tabular-nums">{score}</span>
          </div>
        </div>
      </div>

      {/* Interactive Mouth / Teeth Stage */}
      <div className="bg-gradient-to-b from-sky-50/50 to-white rounded-3xl border border-sky-100 p-6 md:p-8 shadow-sm">
        
        {/* Dynamic Interactive Hint Banner */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-2.5 mb-6 text-center text-xs text-sky-800 font-medium flex items-center justify-center gap-2">
          <span>💡</span>
          <span>{actionFeedback}</span>
        </div>

        {/* Mouth Cavity Visual Container */}
        <div className="max-w-2xl mx-auto bg-rose-50 border-4 border-rose-200 rounded-[2.5rem] p-6 shadow-inner relative overflow-hidden">
          
          {/* Upper Gum & Teeth */}
          <div className="mb-6">
            <div className="text-center text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-2">
              Rahang Atas
            </div>
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {teeth.slice(0, 6).map(tooth => renderTooth(tooth, handleInteractTooth))}
            </div>
          </div>

          {/* Center Tongue Area */}
          <div className="my-4 py-3 bg-rose-200/60 rounded-2xl flex items-center justify-center text-xs font-semibold text-rose-600/80 tracking-wide select-none">
            👅 Rongga Mulut & Lidah
          </div>

          {/* Lower Gum & Teeth */}
          <div>
            <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-2">
              {teeth.slice(6, 12).map(tooth => renderTooth(tooth, handleInteractTooth))}
            </div>
            <div className="text-center text-[11px] font-bold uppercase tracking-wider text-rose-400 mt-2">
              Rahang Bawah
            </div>
          </div>

        </div>

        {/* Tool Selector Toolbar */}
        <div className="mt-8 max-w-lg mx-auto">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Peralatan Dokter Gigi Cilik
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Tool 1: Toothbrush */}
            <button
              onClick={() => {
                soundManager.playPop();
                setSelectedTool('brush');
                setActionFeedback('Gunakan sikat gigi untuk menggosok plak kuning dan menyingkirkan kuman!');
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                selectedTool === 'brush'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm scale-105'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-3xl mb-1">🪥</span>
              <span className="text-xs font-bold">Sikat Gigi</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Basmi Plak</span>
            </button>

            {/* Tool 2: Dental Floss */}
            <button
              onClick={() => {
                soundManager.playPop();
                setSelectedTool('floss');
                setActionFeedback('Gunakan benang gigi (floss) untuk mengangkat sisa makanan yang terselip!');
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                selectedTool === 'floss'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm scale-105'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-3xl mb-1">🧵</span>
              <span className="text-xs font-bold">Benang Gigi</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Sela-sela Gigi</span>
            </button>

            {/* Tool 3: Water Rinse */}
            <button
              onClick={() => {
                soundManager.playPop();
                setSelectedTool('rinse');
                setActionFeedback('Semprotkan air bersih untuk membilas busa dan membuat gigi berkilau cemerlang!');
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                selectedTool === 'rinse'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm scale-105'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-3xl mb-1">💧</span>
              <span className="text-xs font-bold">Semprotan Air</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Bilas & Kilau</span>
            </button>
          </div>
        </div>

        {/* Reset button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              soundManager.playPop();
              initTeeth();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang Pembersihan</span>
          </button>
        </div>

      </div>

      {/* Completion Modal */}
      <EducationalFeedbackModal
        isOpen={isFinished}
        title="Hebat! Semua Gigi Bersih Berkilau!"
        subtitle="Mulut pasien bebas dari kuman, plak, dan sisa makanan yang menempel."
        scoreEarned={score}
        starsEarned={3}
        educationalTakeaway={[
          'Plak adalah lapisan lengket bakteri yang terbentuk terus menerus dari sisa makanan dan air liur.',
          'Jika plak tidak dibersihkan dengan sikat gigi, dalam 48 jam ia akan mengeras menjadi karang gigi (kalkulus).',
          'Sikat gigi biasa hanya menjangkau sekitar 60% permukaan gigi; 40% sisanya di sela-sela gigi membutuhkan benang gigi (dental floss).',
          'Pembersihan gigi yang baik mencegah radang gusi (gingivitis) dan menjaga napas tetap segar.'
        ]}
        doctorTip="Lakukan pembersihan karang gigi (scaling) di dokter gigi setiap 6 bulan sekali untuk kesehatan mulut optimal!"
        onPlayAgain={initTeeth}
        onNextGame={onNextGame}
        nextGameLabel="Lanjut: Langkah Sikat Gigi"
        onGoHome={onGoHome}
      />
    </div>
  );
};

// Render individual tooth card
function renderTooth(tooth: ToothSpot, onInteract: (id: number) => void) {
  const isPlaqueVisible = tooth.hasPlaque && !tooth.plaqueCleaned;
  const isFoodVisible = tooth.hasFood && !tooth.foodCleaned;
  const isGermVisible = tooth.hasGerm && !tooth.germCleaned;
  const isClean = !isPlaqueVisible && !isFoodVisible && !isGermVisible;

  return (
    <button
      key={tooth.id}
      onClick={() => onInteract(tooth.id)}
      className={`group relative flex flex-col items-center justify-between p-2 rounded-xl transition-all duration-200 cursor-pointer ${
        tooth.isSparkling
          ? 'bg-sky-100/90 border-2 border-sky-400 shadow-md scale-105'
          : isClean
          ? 'bg-white border-2 border-emerald-300 shadow-sm'
          : 'bg-amber-50/90 border-2 border-amber-300 hover:border-amber-400'
      }`}
      title={tooth.name}
    >
      {/* Sparkle effect */}
      {tooth.isSparkling && (
        <span className="absolute -top-1.5 -right-1 text-sm animate-sparkle">✨</span>
      )}

      {/* Main Tooth Icon & Status */}
      <div className="relative text-3xl sm:text-4xl my-1 select-none">
        {tooth.isSparkling ? (
          <span role="img" aria-label="Gigi Bersih Berkilau">🦷</span>
        ) : isClean ? (
          <span role="img" aria-label="Gigi Bersih">🦷</span>
        ) : (
          <div className="relative">
            <span role="img" aria-label="Gigi Kotor" className="opacity-90">🦷</span>
            {/* Dirty Yellow Plaque Overlay */}
            {isPlaqueVisible && (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-700 bg-amber-400/40 rounded-full blur-[1px]">
                ●
              </span>
            )}
          </div>
        )}

        {/* Germ overlay */}
        {isGermVisible && (
          <span className="absolute -top-1 -right-1.5 text-xs animate-bounce" title="Kuman Plak">
            👾
          </span>
        )}

        {/* Stuck food overlay */}
        {isFoodVisible && (
          <span className="absolute -bottom-1 -left-1 text-[11px]" title="Sisa Makanan Terselip">
            🧀
          </span>
        )}
      </div>

      {/* Mini status indicator */}
      <div className="text-[10px] font-semibold text-slate-500 truncate w-full text-center">
        {tooth.isSparkling ? (
          <span className="text-sky-600 flex items-center justify-center gap-0.5">
            <CheckCircle2 className="w-2.5 h-2.5" /> Kilau
          </span>
        ) : isClean ? (
          <span className="text-emerald-600">Bersih</span>
        ) : (
          <span className="text-amber-600">Ada Plak</span>
        )}
      </div>
    </button>
  );
}
