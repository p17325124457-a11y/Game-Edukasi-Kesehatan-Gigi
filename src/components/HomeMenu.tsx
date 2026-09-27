import React from 'react';
import { GameView } from '../types';
import { calculateLevel } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { Play, Sparkles, Award, ArrowRight, ShieldCheck, HeartPulse, RefreshCw } from 'lucide-react';

interface HomeMenuProps {
  onNavigate: (view: GameView) => void;
  totalScore: number;
  totalStars: number;
  unlockedBadgesCount: number;
  onResetProgress: () => void;
}

export const HomeMenu: React.FC<HomeMenuProps> = ({
  onNavigate,
  totalScore,
  totalStars,
  unlockedBadgesCount,
  onResetProgress,
}) => {
  const levelInfo = calculateLevel(totalScore);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8">
      
      {/* Hero Mascot Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-600 text-white shadow-xl">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-10 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Petualangan Edukasi Kesehatan Gigi & Mulut</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
              Senyum Sehat, <br />
              <span className="text-amber-300">Gigi Kuat & Berkilau!</span>
            </h1>

            <p className="text-sm sm:text-base text-sky-50 max-w-xl leading-relaxed">
              Selamat datang di <strong>GigiSehat</strong>! Belajar merawat gigi dengan cara seru: pilah makanan bergizi, basmi kuman plak jahat, dan kuasai langkah sikat gigi yang benar.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playPop();
                  onNavigate('GAME_FOOD');
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-sky-700 hover:bg-sky-50 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-sky-700" />
                <span>Mulai Bermain</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playPop();
                  onNavigate('TIMER_2MIN');
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-sky-700/60 hover:bg-sky-700 text-white border border-white/20 font-semibold text-sm transition-all"
              >
                <span>⏱️ Sikat Bareng (2 Menit)</span>
              </button>
            </div>
          </div>

          {/* Hero Mascot Visual */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-sky-300/30">
              <img
                src="/src/assets/images/hero_mascot_gigisehat_1790480007468.jpg"
                alt="Maskot Gigi Sehat"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
                onError={(e) => {
                  // Fallback container if image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex flex-col items-center justify-center text-center p-4">
                        <span class="text-7xl mb-2">🦷✨</span>
                        <span class="font-bold text-lg text-white">Gigi si Ceria</span>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>

        </div>

        {/* Decorative Wave Bottom */}
        <div className="absolute -bottom-6 -right-6 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Player Dashboard Quick Bar */}
      <div className="bg-white rounded-2xl border border-sky-100 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 text-xl font-bold shrink-0">
            ⭐
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Peringkat Kamu</div>
            <div className="text-base font-bold text-slate-800 font-heading">
              Level {levelInfo.level} · {levelInfo.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-600 w-full sm:w-auto justify-between sm:justify-end">
          <div>
            <div className="text-slate-400">Total Poin</div>
            <div className="text-lg font-bold text-sky-600 tabular-nums">{totalScore}</div>
          </div>
          <div className="h-6 w-[1px] bg-slate-200" />
          <div>
            <div className="text-slate-400">Bintang</div>
            <div className="text-lg font-bold text-amber-500 flex items-center gap-1 tabular-nums">
              <Sparkles className="w-4 h-4 fill-amber-400" />
              <span>{totalStars}</span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-slate-200" />
          <button
            onClick={() => {
              soundManager.playPop();
              onNavigate('AWARDS');
            }}
            className="text-left group cursor-pointer"
          >
            <div className="text-slate-400 group-hover:text-amber-600 transition-colors">Lencana</div>
            <div className="text-lg font-bold text-slate-700 group-hover:text-amber-600 transition-colors flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="tabular-nums">{unlockedBadgesCount}/7</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mini Games Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-heading">
              Pilihan Mini Game Edukasi
            </h2>
            <p className="text-xs text-slate-500">
              Pilih petualanganmu dan kumpulkan poin serta lencana dokter gigi cilik!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Pilah Makanan */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform select-none">
                🍎
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-heading group-hover:text-sky-600 transition-colors">
                Pilah Makanan Gigi
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Pilah makanan sahabat gigi (kaya kalsium & serat) vs makanan musuh gigi (asam & gula berlebih).
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-600 font-medium">
                <span>✓ Belajar Gizi Gigi</span>
                <span>·</span>
                <span>Mode Kombo</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playPop();
                onNavigate('GAME_FOOD');
              }}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <span>Mainkan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Basmi Kuman */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform select-none">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-heading group-hover:text-sky-600 transition-colors">
                Basmi Kuman & Plak
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Gunakan sikat gigi, benang gigi (floss), dan semprotan air untuk membersihkan kuman di rongga mulut!
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-sky-600 font-medium">
                <span>✓ Simulasi Dokter Gigi</span>
                <span>·</span>
                <span>Kilau Gigi</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playPop();
                onNavigate('GAME_CLEAN');
              }}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <span>Mainkan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Langkah Sikat Gigi */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform select-none">
                🪥
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-heading group-hover:text-sky-600 transition-colors">
                Langkah Sikat Gigi
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Susun 6 langkah menyikat gigi yang tepat dari pasta biji jagung hingga kumur 1 kali sesuai standar Kemenkes.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-amber-600 font-medium">
                <span>✓ Edukasi Standar Medis</span>
                <span>·</span>
                <span>Asah Urutan</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playPop();
                onNavigate('GAME_STEPS');
              }}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <span>Mainkan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Secondary Feature Row: 2-Min Routine & Dental Quiz & Encyclopedia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Feature 1: Timer 2 Menit */}
        <div
          onClick={() => {
            soundManager.playPop();
            onNavigate('TIMER_2MIN');
          }}
          className="cursor-pointer bg-gradient-to-br from-indigo-50 to-sky-50 rounded-3xl border border-indigo-100 p-5 hover:border-indigo-300 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center text-2xl shrink-0 shadow-sm">
            ⏱️
          </div>
          <div>
            <h4 className="text-sm font-bold text-indigo-950 font-heading">
              Timer Sikat 2 Menit
            </h4>
            <p className="text-xs text-indigo-800/80 mt-0.5">
              Panduan 4 kuadran mulut untuk dipakai saat sikat gigi sungguhan.
            </p>
          </div>
        </div>

        {/* Feature 2: Quiz Dokter Gigi */}
        <div
          onClick={() => {
            soundManager.playPop();
            onNavigate('QUIZ');
          }}
          className="cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border border-purple-100 p-5 hover:border-purple-300 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-2xl shrink-0 shadow-sm">
            🎓
          </div>
          <div>
            <h4 className="text-sm font-bold text-purple-950 font-heading">
              Kuis Dokter Gigi Cilik
            </h4>
            <p className="text-xs text-purple-800/80 mt-0.5">
              Tantang wawasanmu dan raih predikat Dokter Gigi Cilik!
            </p>
          </div>
        </div>

        {/* Feature 3: Ensiklopedia Gigi */}
        <div
          onClick={() => {
            soundManager.playPop();
            onNavigate('ENCYCLOPEDIA');
          }}
          className="cursor-pointer bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl border border-teal-100 p-5 hover:border-teal-300 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-sm">
            📖
          </div>
          <div>
            <h4 className="text-sm font-bold text-teal-950 font-heading">
              Ensiklopedia Gigi
            </h4>
            <p className="text-xs text-teal-800/80 mt-0.5">
              Anatomi gigi, mitos vs fakta, dan tips perawatan klinis terpercaya.
            </p>
          </div>
        </div>

      </div>

      {/* Daily Doctor Tip Box */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-sky-200/50 rounded-xl text-sky-700 shrink-0 mt-0.5">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wide">
              Pesan Sehat Hari Ini dari Dokter Gigi
            </h4>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              "Kapan waktu terbaik menyikat gigi? Yaitu <strong>pagi hari setelah sarapan</strong> dan <strong>malam hari sebelum tidur</strong>! Menyikat gigi malam hari sangat penting karena produksi air liur berkurang saat kita tidur, sehingga kuman sangat mudah mengikis email jika ada sisa makanan."
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playPop();
            onNavigate('ENCYCLOPEDIA');
          }}
          className="shrink-0 text-xs font-semibold text-sky-700 hover:text-sky-900 underline whitespace-nowrap"
        >
          Pelajari Lebih Lanjut
        </button>
      </div>

      {/* Reset Progress Helper Option */}
      <div className="pt-4 text-center">
        <button
          onClick={() => {
            if (window.confirm('Apakah kamu yakin ingin mereset semua skor dan pencapaian ke awal?')) {
              onResetProgress();
            }
          }}
          className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Kemajuan Permainan</span>
        </button>
      </div>

    </div>
  );
};
