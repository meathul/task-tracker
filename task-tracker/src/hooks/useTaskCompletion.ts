"use client";

import { notification } from 'antd';
import { useGamification } from '@/contexts/gamification';
import { getPointsForTask, getExperienceForTask } from '@/types/gamification';

export const useTaskCompletion = () => {
  const { updateStats, checkAchievements } = useGamification();

  const handleTaskComplete = (task: any) => {
    const points = getPointsForTask(task.priority);
    const experience = getExperienceForTask(task.priority);

    // Update gamification stats
    updateStats({
      type: 'task_completed',
      points,
      experience,
      message: `Task completed! +${points} points, +${experience} XP`,
    });

    // Show immediate feedback
    notification.success({
      message: '🎉 Task Completed!',
      description: `Great job! Task "${task.title}" completed. +${points} points | +${experience} XP`,
      duration: 3,
      style: {
        background: 'linear-gradient(45deg, #52c41a22, #52c41a11)',
        border: '1px solid #52c41a',
      },
    });

    // Check for achievements after a delay
    setTimeout(() => {
      checkAchievements();
    }, 1000);
  };

  const getTaskPoints = (priority?: string) => {
    return getPointsForTask(priority);
  };

  return {
    handleTaskComplete,
    getTaskPoints,
  };
};
