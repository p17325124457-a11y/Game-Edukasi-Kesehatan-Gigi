import React from 'react';
import { GameView } from '../types';
import { Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentView: GameView;
  onNavigate: (view: GameView) => void;
  totalScore: number;
  totalStars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  totalScore,
  totalStars,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            soundManager.playPop();
            onNavigate('HOME');
          }}
          className="text-2xl font-bold tracking-tight text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-2 font-heading"
        >
          <span className="text-2xl" role="img" aria-label="GigiSehat">🦷</span>
          <span>GigiSehat</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => { soundManager.playPop(); onNavigate('HOME'); }}
            className={`transition-colors hover:text-sky-600 whitespace-nowrap ${currentView === 'HOME' ? 'text-sky-600 font-semibold underline underline-offset-8 decoration-2' : ''}`}
          >
            Beranda
          </button>
          <button
            onClick={() => { soundManager.playPop(); onNavigate('GAME_FOOD'); }}
            className={`transition-colors hover:text-sky-600 whitespace-nowrap ${currentView === 'GAME_FOOD' ? 'text-sky-600 font-semibold underline underline-offset-8 decoration-2' : ''}`}
          >
            Pilah Makanan
          </button>
          <button
            onClick={() => { soundManager.playPop(); onNavigate('GAME_CLEAN'); }}
            className={`transition-colors hover:text-sky-600 whitespace-nowrap ${currentView === 'GAME_CLEAN' ? 'text-sky-600 font-semibold underline underline-offset-8 decoration-2' : ''}`}
          >
            Basmi Kuman
          </button>
          <button
            onClick={() => { soundManager.playPop(); onNavigate('GAME_STEPS'); }}
            className={`transition-colors hover:text-sky-600 whitespace-nowrap ${currentView === 'GAME_STEPS' ? 'text-sky-600 font-semibold underline underline-offset-8 decoration-2' : ''}`}
          >
            Langkah Sikat
          </button>
          <button
            onClick={() => { soundManager.playPop(); onNavigate('TIMER_2MIN'); }}
            className={`transition-colors hover:text-sky-600 whitespace-nowrap ${currentView === 'TIMER_2MIN' ? 'text-sky-600 font-semibold underline underline-offset-8 decoration-2' : ''}`}
          >
            Timer 2 Menit
          </button>
          <button
            onClick={() => { soundManager.playPop(); onNavigate('QUIZ'); }}
            className={`transition-colors hover:text-sky-600 whitespace-nowrap ${currentView === 'QUIZ' ? 'text-sky-600 font-semibold underline underline-offset-8 decoration-2' : ''}`}
          >
            Kuis Gigi
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playPop();
              onNavigate('AWARDS');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors whitespace-nowrap"
            title="Lihat Lencana & Prestasi"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="tabular-nums">{totalScore} Poin</span>
            <span aria-hidden="true" className="text-amber-400">·</span>
            <span className="flex items-center gap-0.5 text-amber-700">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="tabular-nums">{totalStars}</span>
            </span>
          </button>

          <button
            onClick={onToggleSound}
            className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-sky-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-white text-xs scrollbar-none">
        <button
          onClick={() => { soundManager.playPop(); onNavigate('HOME'); }}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentView === 'HOME' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Beranda
        </button>
        <button
          onClick={() => { soundManager.playPop(); onNavigate('GAME_FOOD'); }}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentView === 'GAME_FOOD' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Pilah Makanan
        </button>
        <button
          onClick={() => { soundManager.playPop(); onNavigate('GAME_CLEAN'); }}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentView === 'GAME_CLEAN' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Basmi Kuman
        </button>
        <button
          onClick={() => { soundManager.playPop(); onNavigate('GAME_STEPS'); }}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentView === 'GAME_STEPS' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Langkah Sikat
        </button>
        <button
          onClick={() => { soundManager.playPop(); onNavigate('TIMER_2MIN'); }}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentView === 'TIMER_2MIN' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Timer 2 Menit
        </button>
        <button
          onClick={() => { soundManager.playPop(); onNavigate('QUIZ'); }}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentView === 'QUIZ' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Kuis Gigi
        </button>
      </div>
    </header>
  );
};
