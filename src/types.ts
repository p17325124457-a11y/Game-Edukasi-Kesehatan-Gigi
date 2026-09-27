export type GameView = 
  | 'HOME' 
  | 'GAME_FOOD' 
  | 'GAME_CLEAN' 
  | 'GAME_STEPS' 
  | 'TIMER_2MIN' 
  | 'QUIZ' 
  | 'ENCYCLOPEDIA' 
  | 'AWARDS';

export interface FoodItem {
  id: string;
  name: string;
  category: 'good' | 'bad';
  icon: string; // emoji or visual symbol
  description: string;
  educationalFact: string;
  color: string;
}

export interface BrushingStep {
  id: number;
  correctOrder: number;
  title: string;
  shortDesc: string;
  detailReason: string;
  iconName: string;
  color: string;
}

export interface GermTarget {
  id: string;
  toothId: number; // 0 to 11 (teeth index)
  type: 'plaque' | 'food' | 'germ_acid' | 'germ_sugar';
  name: string;
  hp: number; // hits required
  maxHp: number;
  requiredTool: 'brush' | 'floss' | 'rinse';
  x: number; // percentage in mouth zone
  y: number;
  defeated: boolean;
  educationalNote: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'food' | 'clean' | 'steps' | 'timer' | 'quiz' | 'general';
  unlockedAt?: string;
  condition: string;
}

export interface PlayerProgress {
  totalScore: number;
  totalStars: number;
  level: number;
  unlockedBadges: string[];
  highScores: {
    foodSorter: number;
    toothCleaner: number;
    brushingSteps: number;
    quiz: number;
  };
  brushingSessionsCompleted: number;
  soundEnabled: boolean;
}
