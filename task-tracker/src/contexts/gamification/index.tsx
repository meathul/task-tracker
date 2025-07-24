"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { notification } from 'antd';
import { UserStats, Achievement, GameEvent, ACHIEVEMENTS, calculateLevel, getPointsForTask, getExperienceForTask } from '@/types/gamification';

interface GamificationContextType {
  userStats: UserStats;
  updateStats: (event: Partial<GameEvent>) => void;
  checkAchievements: () => void;
  showLevelUpNotification: (newLevel: number) => void;
  showAchievementNotification: (achievement: Achievement) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

const getStoredStats = (): UserStats => {
  if (typeof window === 'undefined') return getDefaultStats();
  
  try {
    const stored = localStorage.getItem('taskTracker_userStats');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading user stats:', error);
  }
  return getDefaultStats();
};

const getDefaultStats = (): UserStats => ({
  level: 1,
  experience: 0,
  experienceToNext: 100,
  totalPoints: 0,
  streak: 0,
  longestStreak: 0,
  tasksCompleted: 0,
  achievements: [],
});

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats>(getDefaultStats);

  useEffect(() => {
    setUserStats(getStoredStats());
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('taskTracker_userStats', JSON.stringify(userStats));
    }
  }, [userStats]);

  const showLevelUpNotification = (newLevel: number) => {
    notification.success({
      message: '🎉 Level Up!',
      description: `Congratulations! You've reached level ${newLevel}!`,
      duration: 4,
      style: {
        background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
        border: '2px solid #ffd700',
      },
    });
  };

  const showAchievementNotification = (achievement: Achievement) => {
    const rarityColors = {
      common: '#52c41a',
      rare: '#1890ff',
      epic: '#722ed1',
      legendary: '#fa8c16',
    };

    notification.success({
      message: `${achievement.icon} Achievement Unlocked!`,
      description: `${achievement.title}: ${achievement.description}`,
      duration: 5,
      style: {
        background: `linear-gradient(45deg, ${rarityColors[achievement.rarity]}, ${rarityColors[achievement.rarity]}22)`,
        border: `2px solid ${rarityColors[achievement.rarity]}`,
      },
    });
  };

  const updateStats = (event: Partial<GameEvent>) => {
    setUserStats(prevStats => {
      const newExperience = prevStats.experience + (event.experience || 0);
      const newPoints = prevStats.totalPoints + (event.points || 0);
      const newTasksCompleted = event.type === 'task_completed' ? prevStats.tasksCompleted + 1 : prevStats.tasksCompleted;
      
      const { level: newLevel, experienceToNext } = calculateLevel(newExperience);
      
      // Check for level up
      if (newLevel > prevStats.level) {
        setTimeout(() => showLevelUpNotification(newLevel), 500);
      }

      return {
        ...prevStats,
        experience: newExperience,
        totalPoints: newPoints,
        tasksCompleted: newTasksCompleted,
        level: newLevel,
        experienceToNext,
      };
    });
  };

  const checkAchievements = () => {
    setUserStats(prevStats => {
      const newAchievements = [...prevStats.achievements];
      let hasNewAchievements = false;

      ACHIEVEMENTS.forEach(achievement => {
        const alreadyUnlocked = newAchievements.some(a => a.id === achievement.id);
        if (alreadyUnlocked) return;

        let shouldUnlock = false;

        switch (achievement.id) {
          case 'first_task':
            shouldUnlock = prevStats.tasksCompleted >= 1;
            break;
          case 'productive_day':
            // This would need more complex logic to check daily completion
            shouldUnlock = prevStats.tasksCompleted >= 5;
            break;
          case 'task_master':
            shouldUnlock = prevStats.tasksCompleted >= 50;
            break;
          case 'streak_warrior':
            shouldUnlock = prevStats.streak >= 7;
            break;
          case 'consistency_king':
            shouldUnlock = prevStats.streak >= 30;
            break;
          case 'legendary_achiever':
            shouldUnlock = prevStats.tasksCompleted >= 100;
            break;
          case 'speed_demon':
            // This would need daily tracking
            shouldUnlock = prevStats.tasksCompleted >= 10;
            break;
          case 'perfectionist':
            shouldUnlock = prevStats.tasksCompleted >= 20 && prevStats.streak >= 20;
            break;
        }

        if (shouldUnlock) {
          const unlockedAchievement = {
            ...achievement,
            unlockedAt: new Date().toISOString(),
            progress: achievement.maxProgress,
          };
          newAchievements.push(unlockedAchievement);
          hasNewAchievements = true;
          setTimeout(() => showAchievementNotification(unlockedAchievement), 1000);
        }
      });

      return hasNewAchievements ? { ...prevStats, achievements: newAchievements } : prevStats;
    });
  };

  return (
    <GamificationContext.Provider
      value={{
        userStats,
        updateStats,
        checkAchievements,
        showLevelUpNotification,
        showAchievementNotification,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};
