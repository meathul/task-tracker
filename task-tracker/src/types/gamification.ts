export interface UserStats {
  level: number;
  experience: number;
  experienceToNext: number;
  totalPoints: number;
  streak: number;
  longestStreak: number;
  tasksCompleted: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface GameEvent {
  type: 'task_completed' | 'streak_milestone' | 'level_up' | 'achievement_unlocked';
  points: number;
  experience: number;
  achievement?: Achievement;
  message: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_task',
    title: 'Getting Started',
    description: 'Complete your first task',
    icon: '🎯',
    rarity: 'common',
    maxProgress: 1,
  },
  {
    id: 'productive_day',
    title: 'Productive Day',
    description: 'Complete 5 tasks in one day',
    icon: '💪',
    rarity: 'common',
    maxProgress: 5,
  },
  {
    id: 'task_master',
    title: 'Task Master',
    description: 'Complete 50 tasks',
    icon: '👑',
    rarity: 'rare',
    maxProgress: 50,
  },
  {
    id: 'streak_warrior',
    title: 'Streak Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    rarity: 'rare',
    maxProgress: 7,
  },
  {
    id: 'consistency_king',
    title: 'Consistency King',
    description: 'Maintain a 30-day streak',
    icon: '⚡',
    rarity: 'epic',
    maxProgress: 30,
  },
  {
    id: 'legendary_achiever',
    title: 'Legendary Achiever',
    description: 'Complete 100 tasks',
    icon: '🏆',
    rarity: 'legendary',
    maxProgress: 100,
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete 10 tasks in one day',
    icon: '⚡',
    rarity: 'epic',
    maxProgress: 10,
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete 20 tasks without skipping a day',
    icon: '💎',
    rarity: 'legendary',
    maxProgress: 20,
  },
];

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850, 4500, 5200, 5950, 6750, 7600, 8500, 9450, 10450
];

export const calculateLevel = (experience: number): { level: number; experienceToNext: number } => {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (experience >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  
  const nextLevelExp = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const experienceToNext = nextLevelExp - experience;
  
  return { level, experienceToNext };
};

export const getPointsForTask = (priority?: string): number => {
  switch (priority) {
    case 'urgent':
      return 50;
    case 'high':
      return 30;
    case 'medium':
      return 20;
    case 'low':
      return 10;
    default:
      return 15;
  }
};

export const getExperienceForTask = (priority?: string): number => {
  return getPointsForTask(priority) * 2;
};
