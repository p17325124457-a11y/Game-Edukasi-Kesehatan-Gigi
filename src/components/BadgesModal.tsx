import React from 'react';
import { BADGES_LIST } from '../data/gameData';
import { calculateLevel } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { ArrowLeft, Award, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface BadgesModalProps {
  unlockedBadges: string[];
  totalScore: number;
  totalStars: number;
  onBack: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  unlockedBadges,
  totalScore,
  totalStars,
  onBack,
}) => {
  const levelInfo = calculateLevel(totalScore);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playPop();
              onBack();
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 font-heading flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>Lemari Lencana & Prestasi</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kumpulkan lencana dokter gigi cilik dengan menyelesaikan seluruh tantangan permainan!
            </p>
          </div>
        </div>
      </div>

      {/* Level Status Card */}
      <div className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-3xl p-6 text-white mb-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-200">
              Tingkat Prestasi Pemain
            </div>
            <div className="text-2xl font-bold font-heading mt-0.5">
              Level {levelInfo.level} · {levelInfo.title}
            </div>
            <p className="text-xs text-sky-100 mt-1">
              Dibutuhkan {levelInfo.nextLevelScore - totalScore} poin lagi untuk naik ke level berikutnya.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/20 self-start sm:self-auto">
            <div>
              <div className="text-[10px] text-sky-200 uppercase font-semibold">Total Poin</div>
              <div className="text-xl font-bold tabular-nums">{totalScore}</div>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div>
              <div className="text-[10px] text-sky-200 uppercase font-semibold">Bintang</div>
              <div className="text-xl font-bold flex items-center gap-1 tabular-nums">
                <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>{totalStars}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-black/20 rounded-full mt-5 overflow-hidden p-0.5">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${levelInfo.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {BADGES_LIST.map(badge => {
          const isUnlocked = unlockedBadges.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border transition-all ${
                isUnlocked
                  ? 'bg-white border-amber-200 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl select-none ${
                    isUnlocked ? 'bg-amber-50 border border-amber-200 shadow-xs' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isUnlocked ? badge.icon : <Lock className="w-6 h-6 text-slate-400" />}
                </div>

                {isUnlocked ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terbuka
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-slate-400">
                    Terkunci
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-800 font-heading">
                {badge.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {badge.description}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                <strong>Cara Membuka:</strong> {badge.condition}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
