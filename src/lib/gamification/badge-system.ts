// Badge and Achievement System for PUSULA Platform

export type BadgeCategory = 'skill' | 'milestone' | 'community' | 'special';

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: BadgeRequirement;
  xpReward: number;
}

export interface BadgeRequirement {
  type: 'xp' | 'tasks' | 'modules' | 'streak' | 'collaboration' | 'mentorship' | 'event' | 'special';
  value: number;
  description: string;
}

export class BadgeSystem {
  private static instance: BadgeSystem;

  // Comprehensive badge definitions
  private static readonly BADGES: Badge[] = [
    // Milestone Badges
    {
      id: 'first_step',
      name: 'İlk Adım',
      description: 'PUSULA yolculuğuna başladın!',
      category: 'milestone',
      icon: '🌟',
      rarity: 'common',
      requirement: { type: 'xp', value: 1, description: 'İlk XP\'ni kazan' },
      xpReward: 10
    },
    {
      id: 'curious_explorer',
      name: 'Meraklı Kâşif',
      description: '500 XP kazandın',
      category: 'milestone',
      icon: '🔍',
      rarity: 'common',
      requirement: { type: 'xp', value: 500, description: '500 XP kazan' },
      xpReward: 25
    },
    {
      id: 'code_literate',
      name: 'Kod Okuryazarı',
      description: '1000 XP kazandın ve Kalfa oldun',
      category: 'milestone',
      icon: '📚',
      rarity: 'rare',
      requirement: { type: 'xp', value: 1000, description: 'Kalfa seviyesine ulaş' },
      xpReward: 50
    },
    {
      id: 'problem_solver',
      name: 'Problem Çözücü',
      description: '2000 XP kazandın',
      category: 'milestone',
      icon: '🧩',
      rarity: 'rare',
      requirement: { type: 'xp', value: 2000, description: '2000 XP kazan' },
      xpReward: 75
    },
    {
      id: 'algorithm_master',
      name: 'Algoritma Ustası',
      description: '3000 XP kazandın',
      category: 'milestone',
      icon: '🎯',
      rarity: 'epic',
      requirement: { type: 'xp', value: 3000, description: '3000 XP kazan' },
      xpReward: 100
    },
    {
      id: 'tech_leader',
      name: 'Teknoloji Lideri',
      description: '4000 XP kazandın',
      category: 'milestone',
      icon: '👑',
      rarity: 'epic',
      requirement: { type: 'xp', value: 4000, description: '4000 XP kazan' },
      xpReward: 125
    },
    {
      id: 'pusula_graduate',
      name: 'PUSULA Mezunu 2024',
      description: 'PUSULA programını başarıyla tamamladın!',
      category: 'milestone',
      icon: '🎓',
      rarity: 'legendary',
      requirement: { type: 'xp', value: 5000, description: 'Mezun ol (5000 XP)' },
      xpReward: 200
    },

    // Skill Badges
    {
      id: 'module_beginner',
      name: 'Modül Başlangıcı',
      description: 'İlk 5 modülü tamamladın',
      category: 'skill',
      icon: '📖',
      rarity: 'common',
      requirement: { type: 'modules', value: 5, description: '5 modül tamamla' },
      xpReward: 25
    },
    {
      id: 'module_enthusiast',
      name: 'Modül Meraklısı',
      description: '15 modül tamamladın',
      category: 'skill',
      icon: '📚',
      rarity: 'rare',
      requirement: { type: 'modules', value: 15, description: '15 modül tamamla' },
      xpReward: 50
    },
    {
      id: 'module_expert',
      name: 'Modül Uzmanı',
      description: '30 modül tamamladın',
      category: 'skill',
      icon: '🎓',
      rarity: 'epic',
      requirement: { type: 'modules', value: 30, description: '30 modül tamamla' },
      xpReward: 100
    },
    {
      id: 'module_master',
      name: 'Modül Ustası',
      description: 'Tüm 50 modülü tamamladın!',
      category: 'skill',
      icon: '🏆',
      rarity: 'legendary',
      requirement: { type: 'modules', value: 50, description: '50 modül tamamla' },
      xpReward: 200
    },
    {
      id: 'task_starter',
      name: 'Görev Başlatıcı',
      description: 'İlk 3 görevi tamamladın',
      category: 'skill',
      icon: '✅',
      rarity: 'common',
      requirement: { type: 'tasks', value: 3, description: '3 görev tamamla' },
      xpReward: 30
    },
    {
      id: 'task_achiever',
      name: 'Görev Tamamlayıcı',
      description: '10 görev tamamladın',
      category: 'skill',
      icon: '🎯',
      rarity: 'rare',
      requirement: { type: 'tasks', value: 10, description: '10 görev tamamla' },
      xpReward: 75
    },
    {
      id: 'task_champion',
      name: 'Görev Şampiyonu',
      description: '20 görev tamamladın',
      category: 'skill',
      icon: '🏅',
      rarity: 'epic',
      requirement: { type: 'tasks', value: 20, description: '20 görev tamamla' },
      xpReward: 150
    },
    {
      id: 'task_legend',
      name: 'Görev Efsanesi',
      description: 'Tüm 40 görevi tamamladın!',
      category: 'skill',
      icon: '💎',
      rarity: 'legendary',
      requirement: { type: 'tasks', value: 40, description: '40 görev tamamla' },
      xpReward: 300
    },

    // Streak Badges
    {
      id: 'week_streak',
      name: '7 Gün Serisi',
      description: '7 gün üst üste aktif oldun',
      category: 'milestone',
      icon: '🔥',
      rarity: 'common',
      requirement: { type: 'streak', value: 7, description: '7 günlük seri' },
      xpReward: 50
    },
    {
      id: 'month_streak',
      name: 'Aylık Tutarlılık',
      description: '30 gün üst üste aktif oldun',
      category: 'milestone',
      icon: '⚡',
      rarity: 'rare',
      requirement: { type: 'streak', value: 30, description: '30 günlük seri' },
      xpReward: 150
    },
    {
      id: 'discipline_champion',
      name: 'Disiplin Şampiyonu',
      description: '60 gün üst üste aktif oldun',
      category: 'milestone',
      icon: '💪',
      rarity: 'epic',
      requirement: { type: 'streak', value: 60, description: '60 günlük seri' },
      xpReward: 300
    },

    // Community Badges
    {
      id: 'team_player',
      name: 'Takım Oyuncusu',
      description: '10 işbirliği aktivitesi tamamladın',
      category: 'community',
      icon: '🤝',
      rarity: 'common',
      requirement: { type: 'collaboration', value: 10, description: '10 işbirliği' },
      xpReward: 50
    },
    {
      id: 'mentor',
      name: 'Mentor',
      description: '5 kişiye mentorluk yaptın',
      category: 'community',
      icon: '🎓',
      rarity: 'rare',
      requirement: { type: 'mentorship', value: 5, description: '5 mentorluk' },
      xpReward: 100
    },
    {
      id: 'community_contributor',
      name: 'Topluluk Katkıcısı',
      description: '20 topluluk aktivitesine katıldın',
      category: 'community',
      icon: '🌟',
      rarity: 'rare',
      requirement: { type: 'event', value: 20, description: '20 etkinlik' },
      xpReward: 100
    },
    {
      id: 'event_enthusiast',
      name: 'Etkinlik Meraklısı',
      description: '10 etkinliğe katıldın',
      category: 'community',
      icon: '🎉',
      rarity: 'common',
      requirement: { type: 'event', value: 10, description: '10 etkinlik' },
      xpReward: 50
    },

    // Special Badges
    {
      id: 'hackathon_finalist',
      name: 'Hackathon Finalisti',
      description: 'Hackathon finaline kaldın',
      category: 'special',
      icon: '🏆',
      rarity: 'epic',
      requirement: { type: 'special', value: 1, description: 'Hackathon finali' },
      xpReward: 200
    },
    {
      id: 'researcher',
      name: 'Araştırmacı',
      description: 'Araştırma makalesi yayınladın',
      category: 'special',
      icon: '🔬',
      rarity: 'rare',
      requirement: { type: 'special', value: 1, description: 'Makale yayınla' },
      xpReward: 150
    },
    {
      id: 'project_leader',
      name: 'Proje Lideri',
      description: 'Takım projesi liderliği yaptın',
      category: 'special',
      icon: '👨‍💼',
      rarity: 'rare',
      requirement: { type: 'special', value: 1, description: 'Proje liderliği' },
      xpReward: 100
    },
    {
      id: 'open_source_contributor',
      name: 'Açık Kaynak Destekçisi',
      description: 'Açık kaynak projeye katkı yaptın',
      category: 'special',
      icon: '💻',
      rarity: 'rare',
      requirement: { type: 'special', value: 1, description: 'Açık kaynak katkısı' },
      xpReward: 150
    },
    {
      id: 'innovation_award',
      name: 'İnovasyon Ödülü',
      description: 'Yenilikçi proje ödülü kazandın',
      category: 'special',
      icon: '💡',
      rarity: 'legendary',
      requirement: { type: 'special', value: 1, description: 'İnovasyon ödülü' },
      xpReward: 250
    }
  ];

  static getInstance(): BadgeSystem {
    if (!BadgeSystem.instance) {
      BadgeSystem.instance = new BadgeSystem();
    }
    return BadgeSystem.instance;
  }

  /**
   * Get all badges
   */
  getAllBadges(): Badge[] {
    return BadgeSystem.BADGES;
  }

  /**
   * Get badges by category
   */
  getBadgesByCategory(category: BadgeCategory): Badge[] {
    return BadgeSystem.BADGES.filter(badge => badge.category === category);
  }

  /**
   * Get badge by ID
   */
  getBadge(id: string): Badge | undefined {
    return BadgeSystem.BADGES.find(badge => badge.id === id);
  }

  /**
   * Check which badges a user has earned
   */
  checkEarnedBadges(userStats: {
    xp: number;
    completedModules: number;
    completedTasks: number;
    streak: number;
    collaborations: number;
    mentorships: number;
    events: number;
    specialAchievements: string[];
  }): Badge[] {
    const earned: Badge[] = [];

    for (const badge of BadgeSystem.BADGES) {
      if (this.hasBadgeRequirement(badge, userStats)) {
        earned.push(badge);
      }
    }

    return earned;
  }

  /**
   * Check if user meets badge requirement
   */
  private hasBadgeRequirement(badge: Badge, userStats: any): boolean {
    const { requirement } = badge;

    switch (requirement.type) {
      case 'xp':
        return userStats.xp >= requirement.value;
      case 'modules':
        return userStats.completedModules >= requirement.value;
      case 'tasks':
        return userStats.completedTasks >= requirement.value;
      case 'streak':
        return userStats.streak >= requirement.value;
      case 'collaboration':
        return userStats.collaborations >= requirement.value;
      case 'mentorship':
        return userStats.mentorships >= requirement.value;
      case 'event':
        return userStats.events >= requirement.value;
      case 'special':
        // Special badges require manual awarding
        return userStats.specialAchievements?.includes(badge.id) || false;
      default:
        return false;
    }
  }

  /**
   * Get next badges user can earn
   */
  getNextBadges(userStats: any, currentBadges: string[]): Badge[] {
    const nextBadges: Badge[] = [];

    for (const badge of BadgeSystem.BADGES) {
      // Skip if already earned
      if (currentBadges.includes(badge.id)) continue;

      // Check if close to earning (within 20% of requirement)
      const progress = this.getBadgeProgress(badge, userStats);
      if (progress >= 80 && progress < 100) {
        nextBadges.push(badge);
      }
    }

    return nextBadges.slice(0, 5); // Return top 5
  }

  /**
   * Get progress towards a badge (0-100)
   */
  getBadgeProgress(badge: Badge, userStats: any): number {
    const { requirement } = badge;
    let current = 0;

    switch (requirement.type) {
      case 'xp':
        current = userStats.xp;
        break;
      case 'modules':
        current = userStats.completedModules;
        break;
      case 'tasks':
        current = userStats.completedTasks;
        break;
      case 'streak':
        current = userStats.streak;
        break;
      case 'collaboration':
        current = userStats.collaborations;
        break;
      case 'mentorship':
        current = userStats.mentorships;
        break;
      case 'event':
        current = userStats.events;
        break;
      case 'special':
        return userStats.specialAchievements?.includes(badge.id) ? 100 : 0;
      default:
        return 0;
    }

    return Math.min(100, Math.round((current / requirement.value) * 100));
  }

  /**
   * Get badge showcase (top badges to display)
   */
  getBadgeShowcase(earnedBadges: Badge[]): Badge[] {
    // Sort by rarity and return top 6
    const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
    
    return earnedBadges
      .sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity])
      .slice(0, 6);
  }
}

// Export singleton instance
export const badgeSystem = BadgeSystem.getInstance();
