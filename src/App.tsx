import React, { useState, useEffect, useCallback } from 'react';
import { GameView, PlayerProgress } from './types';
import { loadProgress, saveProgress, DEFAULT_PROGRESS } from './utils/storage';
import { soundManager } from './utils/audio';
import { Navbar } from './components/Navbar';
import { HomeMenu } from './components/HomeMenu';
import { FoodSorterGame } from './components/FoodSorterGame';
import { ToothCleanerGame } from './components/ToothCleanerGame';
import { BrushingStepsGame } from './components/BrushingStepsGame';
import { BrushingTimer } from './components/BrushingTimer';
import { QuizGame } from './components/QuizGame';
import { Encyclopedia } from './components/EncyclopediaModal';
import { BadgesModal } from './components/BadgesModal';

export default function App() {
  const [currentView, setCurrentView] = useState<GameView>('HOME');
  const [progress, setProgress] = useState<PlayerProgress>(DEFAULT_PROGRESS);

  // Load progress from local storage on mount
  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    soundManager.enabled = loaded.soundEnabled;
  }, []);

  // Save progress helper
  const updateProgressAndSave = useCallback((newProgress: PlayerProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  }, []);

  // Check and unlock badges
  const checkBadgeUnlocks = useCallback((updated: PlayerProgress, gameType: string, score: number) => {
    const unlocked = new Set(updated.unlockedBadges);

    // 1. First step
    unlocked.add('badge_first_step');

    // 2. Food master
    if (gameType === 'food' && score >= 100) {
      unlocked.add('badge_food_master');
    }

    // 3. Germ slayer
    if (gameType === 'clean') {
      unlocked.add('badge_germ_slayer');
    }

    // 4. Step genius
    if (gameType === 'steps') {
      unlocked.add('badge_step_genius');
    }

    // 5. Timer hero
    if (gameType === 'timer') {
      unlocked.add('badge_timer_hero');
    }

    // 6. Quiz champ
    if (gameType === 'quiz' && score >= 120) {
      unlocked.add('badge_quiz_champ');
    }

    // 7. Sparkle legend
    if (updated.totalScore >= 300) {
      unlocked.add('badge_sparkle_legend');
    }

    return Array.from(unlocked);
  }, []);

  // Game completion handler
  const handleGameComplete = useCallback((gameType: 'food' | 'clean' | 'steps' | 'timer' | 'quiz', scoreEarned: number, starsEarned: number) => {
    setProgress(prev => {
      const newTotalScore = prev.totalScore + scoreEarned;
      const newTotalStars = prev.totalStars + starsEarned;
      
      const newHighScores = { ...prev.highScores };
      if (gameType === 'food') newHighScores.foodSorter = Math.max(newHighScores.foodSorter, scoreEarned);
      if (gameType === 'clean') newHighScores.toothCleaner = Math.max(newHighScores.toothCleaner, scoreEarned);
      if (gameType === 'steps') newHighScores.brushingSteps = Math.max(newHighScores.brushingSteps, scoreEarned);
      if (gameType === 'quiz') newHighScores.quiz = Math.max(newHighScores.quiz, scoreEarned);

      const newSessions = gameType === 'timer' ? prev.brushingSessionsCompleted + 1 : prev.brushingSessionsCompleted;

      const baseUpdated: PlayerProgress = {
        ...prev,
        totalScore: newTotalScore,
        totalStars: newTotalStars,
        highScores: newHighScores,
        brushingSessionsCompleted: newSessions,
      };

      const updatedBadges = checkBadgeUnlocks(baseUpdated, gameType, scoreEarned);
      const finalProgress: PlayerProgress = {
        ...baseUpdated,
        unlockedBadges: updatedBadges,
      };

      saveProgress(finalProgress);
      return finalProgress;
    });
  }, [checkBadgeUnlocks]);

  // Sound toggle
  const handleToggleSound = () => {
    const nextVal = !progress.soundEnabled;
    soundManager.enabled = nextVal;
    if (nextVal) {
      soundManager.playPop();
    }
    const updated = { ...progress, soundEnabled: nextVal };
    updateProgressAndSave(updated);
  };

  // Reset progress
  const handleResetProgress = () => {
    updateProgressAndSave(DEFAULT_PROGRESS);
    soundManager.playPop();
  };

  return (
    <div className="min-h-screen bg-sky-50/60 text-slate-800 flex flex-col font-sans">
      
      {/* 3-Zone Contract Top Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        totalScore={progress.totalScore}
        totalStars={progress.totalStars}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {currentView === 'HOME' && (
          <HomeMenu
            onNavigate={setCurrentView}
            totalScore={progress.totalScore}
            totalStars={progress.totalStars}
            unlockedBadgesCount={progress.unlockedBadges.length}
            onResetProgress={handleResetProgress}
          />
        )}

        {currentView === 'GAME_FOOD' && (
          <FoodSorterGame
            onComplete={(score, stars) => handleGameComplete('food', score, stars)}
            onGoHome={() => setCurrentView('HOME')}
            onNextGame={() => setCurrentView('GAME_CLEAN')}
          />
        )}

        {currentView === 'GAME_CLEAN' && (
          <ToothCleanerGame
            onComplete={(score, stars) => handleGameComplete('clean', score, stars)}
            onGoHome={() => setCurrentView('HOME')}
            onNextGame={() => setCurrentView('GAME_STEPS')}
          />
        )}

        {currentView === 'GAME_STEPS' && (
          <BrushingStepsGame
            onComplete={(score, stars) => handleGameComplete('steps', score, stars)}
            onGoHome={() => setCurrentView('HOME')}
            onNextGame={() => setCurrentView('TIMER_2MIN')}
          />
        )}

        {currentView === 'TIMER_2MIN' && (
          <BrushingTimer
            onComplete={(score, stars) => handleGameComplete('timer', score, stars)}
            onGoHome={() => setCurrentView('HOME')}
          />
        )}

        {currentView === 'QUIZ' && (
          <QuizGame
            onComplete={(score, stars) => handleGameComplete('quiz', score, stars)}
            onGoHome={() => setCurrentView('HOME')}
          />
        )}

        {currentView === 'ENCYCLOPEDIA' && (
          <Encyclopedia
            onBack={() => setCurrentView('HOME')}
          />
        )}

        {currentView === 'AWARDS' && (
          <BadgesModal
            unlockedBadges={progress.unlockedBadges}
            totalScore={progress.totalScore}
            totalStars={progress.totalStars}
            onBack={() => setCurrentView('HOME')}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-sky-100 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sky-600 font-heading">GigiSehat</span>
            <span>·</span>
            <span>Edukasi Kesehatan Gigi & Mulut untuk Anak & Keluarga</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Standar Promosi Kesehatan Gigi</span>
            <span>·</span>
            <button
              onClick={() => {
                soundManager.playPop();
                setCurrentView('ENCYCLOPEDIA');
              }}
              className="hover:text-sky-600 transition-colors"
            >
              Panduan Perawatan
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
