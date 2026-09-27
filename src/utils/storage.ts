import { PlayerProgress } from '../types';

const STORAGE_KEY = 'gigisehat_player_progress_v1';

export const DEFAULT_PROGRESS: PlayerProgress = {
  totalScore: 0,
  totalStars: 0,
  level: 1,
  unlockedBadges: [],
  highScores: {
    foodSorter: 0,
    toothCleaner: 0,
    brushingSteps: 0,
    quiz: 0,
  },
  brushingSessionsCompleted: 0,
  soundEnabled: true,
};

export function loadProgress(): PlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: PlayerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // safe fallback
  }
}

export function calculateLevel(score: number): { level: number; title: string; nextLevelScore: number; progressPercent: number } {
  const levels = [
    { level: 1, title: 'Sahabat Gigi Pemula', minScore: 0, next: 100 },
    { level: 2, title: 'Penjaga Gigi Ceria', minScore: 100, next: 250 },
    { level: 3, title: 'Pahlawan Anti Plak', minScore: 250, next: 500 },
    { level: 4, title: 'Ahli Kesehatan Mulut', minScore: 500, next: 800 },
    { level: 5, title: 'Dokter Gigi Cilik Teladan', minScore: 800, next: 1200 },
  ];

  for (let i = levels.length - 1; i >= 0; i--) {
    if (score >= levels[i].minScore) {
      const cur = levels[i];
      const range = cur.next - cur.minScore;
      const curProgress = Math.min(100, Math.max(0, Math.round(((score - cur.minScore) / range) * 100)));
      return {
        level: cur.level,
        title: cur.title,
        nextLevelScore: cur.next,
        progressPercent: curProgress,
      };
    }
  }

  return {
    level: 1,
    title: 'Sahabat Gigi Pemula',
    nextLevelScore: 100,
    progressPercent: 0,
  };
}
