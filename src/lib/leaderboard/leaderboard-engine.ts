// Real-time Leaderboard Engine for PUSULA Platform
// Implements multi-metric leaderboards with filtering and ranking algorithms

import { MockUser } from '../mock-data/types';

export type LeaderboardMetric = 
  | 'xp' 
  | 'streak' 
  | 'modules_completed' 
  | 'tasks_completed' 
  | 'badges' 
  | 'social_impact' 
  | 'collaboration' 
  | 'mentorship' 
  | 'physical_visits'
  | 'gdr_score';

export type LeaderboardTimeframe = 'all_time' | 'this_month' | 'this_week' | 'today';

export interface LeaderboardEntry {
  userId: string;
  name: string;
  surname: string;
  profileImageUrl?: string;
  level: string;
  cohortId: string;
  rank: number;
  score: number;
  change: number; // Position change from previous period
  badge?: string; // Special badge for top performers
  metadata?: Record<string, any>; // Additional metric-specific data
}

export interface LeaderboardFilters {
  cohortId?: string;
  level?: string;
  timeframe?: LeaderboardTimeframe;
  sdgFocus?: number;
  limit?: number;
}

export interface LeaderboardStats {
  totalParticipants: number;
  averageScore: number;
  topScore: number;
  userRank?: number;
  userPercentile?: number;
}

export class LeaderboardEngine {
  private static instance: LeaderboardEngine;
  private previousRankings: Map<string, Map<string, number>> = new Map(); // metric -> userId -> rank

  static getInstance(): LeaderboardEngine {
    if (!LeaderboardEngine.instance) {
      LeaderboardEngine.instance = new LeaderboardEngine();
    }
    return LeaderboardEngine.instance;
  }

  /**
   * Generate leaderboard for a specific metric
   */
  generateLeaderboard(
    users: MockUser[],
    metric: LeaderboardMetric,
    filters: LeaderboardFilters = {}
  ): LeaderboardEntry[] {
    // Filter users based on criteria
    let filteredUsers = this.applyFilters(users, filters);

    // Extract scores based on metric
    const entries = filteredUsers.map(user => ({
      userId: user.id,
      name: user.name,
      surname: user.surname,
      profileImageUrl: user.profileImageUrl,
      level: user.level,
      cohortId: user.cohortId,
      score: this.getMetricScore(user, metric),
      metadata: this.getMetricMetadata(user, metric)
    }));

    // Sort by score (descending)
    entries.sort((a, b) => b.score - a.score);

    // Assign ranks and calculate changes
    const leaderboard = entries.map((entry, index) => {
      const rank = index + 1;
      const previousRank = this.getPreviousRank(metric, entry.userId);
      const change = previousRank ? previousRank - rank : 0;
      const badge = this.getTopPerformerBadge(rank, entries.length);

      return {
        ...entry,
        rank,
        change,
        badge
      };
    });

    // Update previous rankings for next comparison
    this.updatePreviousRankings(metric, leaderboard);

    // Apply limit if specified
    if (filters.limit) {
      return leaderboard.slice(0, filters.limit);
    }

    return leaderboard;
  }

  /**
   * Generate multi-metric leaderboard (combined scores)
   */
  generateMultiMetricLeaderboard(
    users: MockUser[],
    metrics: { metric: LeaderboardMetric; weight: number }[],
    filters: LeaderboardFilters = {}
  ): LeaderboardEntry[] {
    const filteredUsers = this.applyFilters(users, filters);

    // Calculate weighted scores
    const entries = filteredUsers.map(user => {
      let totalScore = 0;
      const metadata: Record<string, any> = {};

      metrics.forEach(({ metric, weight }) => {
        const score = this.getMetricScore(user, metric);
        totalScore += score * weight;
        metadata[metric] = score;
      });

      return {
        userId: user.id,
        name: user.name,
        surname: user.surname,
        profileImageUrl: user.profileImageUrl,
        level: user.level,
        cohortId: user.cohortId,
        score: Math.round(totalScore),
        metadata
      };
    });

    // Sort and rank
    entries.sort((a, b) => b.score - a.score);

    const leaderboard = entries.map((entry, index) => {
      const rank = index + 1;
      const previousRank = this.getPreviousRank('multi_metric', entry.userId);
      const change = previousRank ? previousRank - rank : 0;
      const badge = this.getTopPerformerBadge(rank, entries.length);

      return {
        ...entry,
        rank,
        change,
        badge
      };
    });

    this.updatePreviousRankings('multi_metric', leaderboard);

    if (filters.limit) {
      return leaderboard.slice(0, filters.limit);
    }

    return leaderboard;
  }

  /**
   * Get leaderboard statistics
   */
  getLeaderboardStats(
    leaderboard: LeaderboardEntry[],
    userId?: string
  ): LeaderboardStats {
    const totalParticipants = leaderboard.length;
    const averageScore = leaderboard.reduce((sum, entry) => sum + entry.score, 0) / totalParticipants;
    const topScore = leaderboard[0]?.score || 0;

    let userRank: number | undefined;
    let userPercentile: number | undefined;

    if (userId) {
      const userEntry = leaderboard.find(entry => entry.userId === userId);
      if (userEntry) {
        userRank = userEntry.rank;
        userPercentile = Math.round((1 - (userRank - 1) / totalParticipants) * 100);
      }
    }

    return {
      totalParticipants,
      averageScore: Math.round(averageScore),
      topScore,
      userRank,
      userPercentile
    };
  }

  /**
   * Get user's position in leaderboard
   */
  getUserPosition(
    leaderboard: LeaderboardEntry[],
    userId: string
  ): LeaderboardEntry | undefined {
    return leaderboard.find(entry => entry.userId === userId);
  }

  /**
   * Get users around a specific user (context)
   */
  getUserContext(
    leaderboard: LeaderboardEntry[],
    userId: string,
    contextSize: number = 5
  ): LeaderboardEntry[] {
    const userIndex = leaderboard.findIndex(entry => entry.userId === userId);
    if (userIndex === -1) return [];

    const start = Math.max(0, userIndex - contextSize);
    const end = Math.min(leaderboard.length, userIndex + contextSize + 1);

    return leaderboard.slice(start, end);
  }

  /**
   * Get top performers by cohort
   */
  getTopPerformersByCohort(
    users: MockUser[],
    metric: LeaderboardMetric,
    topN: number = 3
  ): Map<string, LeaderboardEntry[]> {
    const cohortMap = new Map<string, LeaderboardEntry[]>();

    // Group users by cohort
    const cohorts = new Set(users.map(u => u.cohortId).filter(Boolean));

    cohorts.forEach(cohortId => {
      const leaderboard = this.generateLeaderboard(users, metric, { cohortId, limit: topN });
      cohortMap.set(cohortId, leaderboard);
    });

    return cohortMap;
  }

  /**
   * Get rising stars (users with biggest positive changes)
   */
  getRisingStars(
    leaderboard: LeaderboardEntry[],
    limit: number = 10
  ): LeaderboardEntry[] {
    return [...leaderboard]
      .filter(entry => entry.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, limit);
  }

  /**
   * Apply filters to user list
   */
  private applyFilters(users: MockUser[], filters: LeaderboardFilters): MockUser[] {
    let filtered = users.filter(u => u.role === 'student'); // Only students in leaderboards

    if (filters.cohortId) {
      filtered = filtered.filter(u => u.cohortId === filters.cohortId);
    }

    if (filters.level) {
      filtered = filtered.filter(u => u.level === filters.level);
    }

    if (filters.sdgFocus !== undefined) {
      filtered = filtered.filter(u => u.sdgFocus.includes(filters.sdgFocus!));
    }

    // Timeframe filtering would require analytics data
    // For now, we show all-time data

    return filtered;
  }

  /**
   * Get score for a specific metric
   */
  private getMetricScore(user: MockUser, metric: LeaderboardMetric): number {
    switch (metric) {
      case 'xp':
        return user.xp;
      case 'streak':
        return user.streak;
      case 'modules_completed':
        return user.completedModules.length;
      case 'tasks_completed':
        return user.completedTasks.length;
      case 'badges':
        return user.badges.length;
      case 'social_impact':
        return user.gdrComponents.sosyal_etki;
      case 'collaboration':
        return user.mentorshipGiven + user.mentorshipReceived;
      case 'mentorship':
        return user.mentorshipGiven;
      case 'physical_visits':
        return user.physicalCenterVisits;
      case 'gdr_score':
        return user.gdrScore;
      default:
        return 0;
    }
  }

  /**
   * Get additional metadata for a metric
   */
  private getMetricMetadata(user: MockUser, metric: LeaderboardMetric): Record<string, any> {
    const metadata: Record<string, any> = {};

    switch (metric) {
      case 'xp':
        metadata.level = user.level;
        metadata.nextLevelXP = this.getNextLevelXP(user.level);
        break;
      case 'streak':
        metadata.lastActive = user.lastActiveAt;
        break;
      case 'modules_completed':
        metadata.totalModules = 50;
        metadata.completionRate = Math.round((user.completedModules.length / 50) * 100);
        break;
      case 'tasks_completed':
        metadata.totalTasks = 40;
        metadata.completionRate = Math.round((user.completedTasks.length / 40) * 100);
        break;
      case 'badges':
        metadata.badgeList = user.badges.slice(0, 5); // Top 5 badges
        break;
      case 'social_impact':
        metadata.sdgFocus = user.sdgFocus;
        break;
      case 'collaboration':
        metadata.given = user.mentorshipGiven;
        metadata.received = user.mentorshipReceived;
        break;
      case 'gdr_score':
        metadata.components = user.gdrComponents;
        break;
    }

    return metadata;
  }

  /**
   * Get next level XP requirement
   */
  private getNextLevelXP(level: string): number {
    const thresholds: Record<string, number> = {
      cirak: 1000,
      kalfa: 2500,
      usta: 5000,
      graduate: 5000
    };
    return thresholds[level] || 0;
  }

  /**
   * Get previous rank for change calculation
   */
  private getPreviousRank(metric: string, userId: string): number | undefined {
    return this.previousRankings.get(metric)?.get(userId);
  }

  /**
   * Update previous rankings for next comparison
   */
  private updatePreviousRankings(metric: string, leaderboard: LeaderboardEntry[]): void {
    const rankings = new Map<string, number>();
    leaderboard.forEach(entry => {
      rankings.set(entry.userId, entry.rank);
    });
    this.previousRankings.set(metric, rankings);
  }

  /**
   * Get special badge for top performers
   */
  private getTopPerformerBadge(rank: number, totalParticipants: number): string | undefined {
    if (rank === 1) return '🥇 1. Sıra';
    if (rank === 2) return '🥈 2. Sıra';
    if (rank === 3) return '🥉 3. Sıra';
    if (rank <= 10) return '⭐ Top 10';
    if (rank <= totalParticipants * 0.1) return '🌟 Top 10%';
    if (rank <= totalParticipants * 0.25) return '✨ Top 25%';
    return undefined;
  }

  /**
   * Generate leaderboard summary for display
   */
  generateLeaderboardSummary(
    leaderboard: LeaderboardEntry[],
    metric: LeaderboardMetric
  ): {
    title: string;
    description: string;
    icon: string;
    topThree: LeaderboardEntry[];
    stats: LeaderboardStats;
  } {
    const metricInfo = this.getMetricInfo(metric);
    const stats = this.getLeaderboardStats(leaderboard);
    const topThree = leaderboard.slice(0, 3);

    return {
      title: metricInfo.title,
      description: metricInfo.description,
      icon: metricInfo.icon,
      topThree,
      stats
    };
  }

  /**
   * Get metric display information
   */
  private getMetricInfo(metric: LeaderboardMetric): {
    title: string;
    description: string;
    icon: string;
  } {
    const info: Record<LeaderboardMetric, { title: string; description: string; icon: string }> = {
      xp: {
        title: 'XP Liderleri',
        description: 'En çok deneyim puanı kazanan öğrenciler',
        icon: '⚡'
      },
      streak: {
        title: 'Tutarlılık Şampiyonları',
        description: 'En uzun aktif seri rekoruna sahip öğrenciler',
        icon: '🔥'
      },
      modules_completed: {
        title: 'Modül Ustaları',
        description: 'En çok MicroLab modülü tamamlayan öğrenciler',
        icon: '📚'
      },
      tasks_completed: {
        title: 'Görev Şampiyonları',
        description: 'En çok görev tamamlayan öğrenciler',
        icon: '🎯'
      },
      badges: {
        title: 'Rozet Koleksiyoncuları',
        description: 'En çok rozet kazanan öğrenciler',
        icon: '🏆'
      },
      social_impact: {
        title: 'Sosyal Etki Liderleri',
        description: 'En yüksek sosyal etki skoruna sahip öğrenciler',
        icon: '🌍'
      },
      collaboration: {
        title: 'İşbirliği Kahramanları',
        description: 'En aktif işbirliği yapan öğrenciler',
        icon: '🤝'
      },
      mentorship: {
        title: 'Mentor Liderleri',
        description: 'En çok mentorluk yapan öğrenciler',
        icon: '🎓'
      },
      physical_visits: {
        title: 'DiGEM Düzenli Ziyaretçileri',
        description: 'Fiziksel merkeze en çok gelen öğrenciler',
        icon: '🏢'
      },
      gdr_score: {
        title: 'GDR Liderleri',
        description: 'En yüksek Gelişim Değerlendirme Raporu skoruna sahip öğrenciler',
        icon: '📊'
      }
    };

    return info[metric];
  }
}

// Export singleton instance
export const leaderboardEngine = LeaderboardEngine.getInstance();
