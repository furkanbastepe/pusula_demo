// Gamification Utility Functions

import { xpEngine } from './xp-engine';
import { levelSystem } from './level-system';
import { badgeSystem } from './badge-system';

/**
 * Format XP number with commas
 */
export function formatXP(xp: number): string {
  return xp.toLocaleString('tr-TR');
}

/**
 * Get level color
 */
export function getLevelColor(level: string): string {
  const colors = {
    cirak: '#10b981',
    kalfa: '#3b82f6',
    usta: '#f59e0b',
    graduate: '#8b5cf6'
  };
  return colors[level as keyof typeof colors] || '#6b7280';
}

/**
 * Get level icon
 */
export function getLevelIcon(level: string): string {
  const icons = {
    cirak: '🌱',
    kalfa: '⚡',
    usta: '🔥',
    graduate: '🎓'
  };
  return icons[level as keyof typeof icons] || '📚';
}

/**
 * Calculate total XP from activities
 */
export function calculateTotalXP(activities: Array<{
  type: string;
  difficulty?: string;
  quality?: number;
  isPhysicalCenter?: boolean;
}>): number {
  let total = 0;
  
  for (const activity of activities) {
    const result = xpEngine.calculateXP({
      activityType: activity.type as any,
      difficulty: activity.difficulty as any,
      quality: activity.quality,
      isPhysicalCenter: activity.isPhysicalCenter
    });
    total += result.totalXP;
  }
  
  return total;
}

/**
 * Get user's complete gamification profile
 */
export function getGamificationProfile(user: {
  xp: number;
  completedModules: string[];
  completedTasks: string[];
  streak: number;
  badges: string[];
}) {
  const level = xpEngine.calculateLevel(user.xp);
  const levelInfo = levelSystem.getLevelInfo(level);
  const levelProgress = levelSystem.getLevelProgress(user.xp);
  const unlocks = levelSystem.getCumulativeUnlocks(level);
  
  const userStats = {
    xp: user.xp,
    completedModules: user.completedModules.length,
    completedTasks: user.completedTasks.length,
    streak: user.streak,
    collaborations: 0, // Would come from user data
    mentorships: 0, // Would come from user data
    events: 0, // Would come from user data
    specialAchievements: []
  };
  
  const earnedBadges = badgeSystem.checkEarnedBadges(userStats);
  const nextBadges = badgeSystem.getNextBadges(userStats, user.badges);
  const badgeShowcase = badgeSystem.getBadgeShowcase(earnedBadges);

  return {
    level: {
      current: levelInfo,
      progress: levelProgress,
      unlocks
    },
    xp: {
      total: user.xp,
      formatted: formatXP(user.xp),
      nextLevel: levelProgress.xpNeededForNext
    },
    badges: {
      earned: earnedBadges,
      showcase: badgeShowcase,
      next: nextBadges,
      total: earnedBadges.length,
      percentage: Math.round((earnedBadges.length / badgeSystem.getAllBadges().length) * 100)
    },
    streak: {
      current: user.streak,
      icon: user.streak >= 7 ? '🔥' : '📅',
      message: user.streak >= 7 ? `${user.streak} günlük seri!` : 'Seri başlat!'
    },
    stats: {
      modulesCompleted: user.completedModules.length,
      tasksCompleted: user.completedTasks.length,
      totalActivities: user.completedModules.length + user.completedTasks.length
    }
  };
}

/**
 * Generate motivational message based on progress
 */
export function getMotivationalMessage(xp: number, streak: number): string {
  const messages = {
    lowXP: [
      'Harika bir başlangıç! Devam et! 🌟',
      'Her büyük yolculuk bir adımla başlar! 🚀',
      'Öğrenme yolculuğunda ilerliyorsun! 💪'
    ],
    mediumXP: [
      'Muhteşem ilerleme! Devam et! ⚡',
      'Becerilerini geliştirmeye devam ediyorsun! 🎯',
      'Harika gidiyorsun! 🔥'
    ],
    highXP: [
      'İnanılmaz bir performans! 🏆',
      'Gerçek bir usta oluyorsun! 👑',
      'Etkileyici bir ilerleme! 💎'
    ],
    streak: [
      `${streak} günlük seri! Tutarlılığın harika! 🔥`,
      `${streak} gün üst üste! Disiplin örneği! 💪`,
      `${streak} günlük başarı! Devam et! ⚡`
    ]
  };

  if (streak >= 7) {
    return messages.streak[Math.floor(Math.random() * messages.streak.length)];
  }

  if (xp < 1000) {
    return messages.lowXP[Math.floor(Math.random() * messages.lowXP.length)];
  } else if (xp < 3000) {
    return messages.mediumXP[Math.floor(Math.random() * messages.mediumXP.length)];
  } else {
    return messages.highXP[Math.floor(Math.random() * messages.highXP.length)];
  }
}

/**
 * Get rarity color
 */
export function getRarityColor(rarity: string): string {
  const colors = {
    common: '#9ca3af',
    rare: '#3b82f6',
    epic: '#a855f7',
    legendary: '#f59e0b'
  };
  return colors[rarity as keyof typeof colors] || '#6b7280';
}

/**
 * Format time duration
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} dakika`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} saat ${mins} dakika` : `${hours} saat`;
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}
