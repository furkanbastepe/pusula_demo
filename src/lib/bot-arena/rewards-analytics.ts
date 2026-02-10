/**
 * Bot Arena Competition System - Rewards and Analytics
 * 
 * Manages competition rewards, achievement recognition,
 * result archiving, and performance analytics.
 */

import type { Competition, Participant, CompetitionResult, Prize } from './competition-engine';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  unlockedAt: Date;
  competitionId: string;
}

export interface CompetitionArchive {
  competitionId: string;
  title: string;
  type: string;
  completedAt: Date;
  results: CompetitionResult;
  recordings: Recording[];
  highlights: Highlight[];
  statistics: ArchiveStatistics;
}

export interface Recording {
  id: string;
  title: string;
  type: 'full_competition' | 'highlights' | 'winner_interview' | 'analysis';
  url: string;
  duration: number; // seconds
  views: number;
  uploadedAt: Date;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  participants: string[];
  type: 'milestone' | 'upset' | 'record' | 'comeback' | 'innovation';
}

export interface ArchiveStatistics {
  totalParticipants: number;
  totalSubmissions: number;
  averageScore: number;
  recordScore: number;
  mostPopularStrategy: string;
  viewCount: number;
  engagementRate: number;
}

export interface PerformanceAnalytics {
  userId: string;
  competitionHistory: CompetitionPerformance[];
  overallStats: OverallStats;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  skillProgression: SkillProgression[];
}

export interface CompetitionPerformance {
  competitionId: string;
  competitionTitle: string;
  type: string;
  rank: number;
  score: number;
  percentile: number;
  date: Date;
  achievements: Achievement[];
}

export interface OverallStats {
  totalCompetitions: number;
  wins: number;
  topThreeFinishes: number;
  averageRank: number;
  averageScore: number;
  bestPerformance: CompetitionPerformance;
  improvementRate: number; // percentage
}

export interface SkillProgression {
  skill: string;
  level: number; // 1-10
  trend: 'improving' | 'stable' | 'declining';
  competitions: number;
  lastScore: number;
}

// ============================================================================
// Rewards System
// ============================================================================

export class RewardsSystem {
  /**
   * Distribute prizes to winners
   */
  distributePrizes(competition: Competition, results: CompetitionResult): Map<string, Prize[]> {
    const prizeDistribution = new Map<string, Prize[]>();
    
    // Award prizes to winners
    results.winners.forEach(winner => {
      const prizes = competition.prizes.filter(p => p.rank === winner.rank || p.rank === 0);
      prizeDistribution.set(winner.userId, prizes);
    });
    
    // Award participation prizes to all participants
    const participationPrizes = competition.prizes.filter(p => p.rank === 0);
    competition.participants.forEach(participant => {
      if (!prizeDistribution.has(participant.userId)) {
        prizeDistribution.set(participant.userId, participationPrizes);
      }
    });
    
    return prizeDistribution;
  }

  /**
   * Generate achievements for competition
   */
  generateAchievements(
    competition: Competition,
    participant: Participant,
    results: CompetitionResult
  ): Achievement[] {
    const achievements: Achievement[] = [];
    
    // Winner achievements
    if (participant.rank === 1) {
      achievements.push({
        id: `ach_${competition.id}_winner`,
        title: `${competition.title} Şampiyonu`,
        description: `${competition.title} yarışmasında 1. oldu!`,
        icon: '🏆',
        rarity: 'legendary',
        xpReward: 500,
        unlockedAt: new Date(),
        competitionId: competition.id,
      });
    }
    
    if (participant.rank <= 3) {
      achievements.push({
        id: `ach_${competition.id}_podium`,
        title: 'Podyum Finişi',
        description: `${competition.title} yarışmasında ilk 3'e girdi!`,
        icon: '🥇',
        rarity: 'epic',
        xpReward: 200,
        unlockedAt: new Date(),
        competitionId: competition.id,
      });
    }
    
    // Perfect score
    if (participant.score === 100) {
      achievements.push({
        id: `ach_${competition.id}_perfect`,
        title: 'Mükemmel Performans',
        description: 'Tam puan aldı!',
        icon: '💯',
        rarity: 'legendary',
        xpReward: 300,
        unlockedAt: new Date(),
        competitionId: competition.id,
      });
    }
    
    // High score
    if (participant.score >= 90) {
      achievements.push({
        id: `ach_${competition.id}_highscore`,
        title: 'Yüksek Performans',
        description: '90+ puan aldı!',
        icon: '⭐',
        rarity: 'rare',
        xpReward: 100,
        unlockedAt: new Date(),
        competitionId: competition.id,
      });
    }
    
    // Participation
    achievements.push({
      id: `ach_${competition.id}_participant`,
      title: 'Yarışmacı',
      description: `${competition.title} yarışmasına katıldı`,
      icon: '🎯',
      rarity: 'common',
      xpReward: 50,
      unlockedAt: new Date(),
      competitionId: competition.id,
    });
    
    // Strategy innovation
    const topStrategies = results.statistics.topStrategies;
    if (topStrategies.length > 0 && topStrategies[0].strategy === participant.strategy) {
      achievements.push({
        id: `ach_${competition.id}_innovator`,
        title: 'Strateji Yenilikçisi',
        description: 'En başarılı stratejiyi kullandı',
        icon: '💡',
        rarity: 'epic',
        xpReward: 150,
        unlockedAt: new Date(),
        competitionId: competition.id,
      });
    }
    
    return achievements;
  }

  /**
   * Calculate total XP reward
   */
  calculateTotalXP(prizes: Prize[], achievements: Achievement[]): number {
    const prizeXP = prizes
      .filter(p => p.type === 'xp')
      .reduce((sum, p) => sum + (typeof p.value === 'number' ? p.value : 0), 0);
    
    const achievementXP = achievements.reduce((sum, a) => sum + a.xpReward, 0);
    
    return prizeXP + achievementXP;
  }
}

// ============================================================================
// Competition Archive System
// ============================================================================

export class CompetitionArchiveSystem {
  private archives: Map<string, CompetitionArchive> = new Map();

  /**
   * Archive completed competition
   */
  archiveCompetition(
    competition: Competition,
    results: CompetitionResult
  ): CompetitionArchive {
    const archive: CompetitionArchive = {
      competitionId: competition.id,
      title: competition.title,
      type: competition.type,
      completedAt: new Date(),
      results,
      recordings: this.generateRecordings(competition),
      highlights: this.generateHighlights(competition, results),
      statistics: {
        totalParticipants: results.statistics.totalParticipants,
        totalSubmissions: competition.participants.filter(p => p.status === 'completed').length,
        averageScore: results.statistics.averageScore,
        recordScore: results.statistics.highestScore,
        mostPopularStrategy: results.statistics.topStrategies[0]?.strategy || 'N/A',
        viewCount: 0,
        engagementRate: 0,
      },
    };
    
    this.archives.set(competition.id, archive);
    return archive;
  }

  /**
   * Get archived competition
   */
  getArchive(competitionId: string): CompetitionArchive | undefined {
    return this.archives.get(competitionId);
  }

  /**
   * Get all archives
   */
  getAllArchives(): CompetitionArchive[] {
    return Array.from(this.archives.values())
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
  }

  /**
   * Search archives
   */
  searchArchives(query: string, type?: string): CompetitionArchive[] {
    const allArchives = this.getAllArchives();
    
    return allArchives.filter(archive => {
      const matchesQuery = archive.title.toLowerCase().includes(query.toLowerCase()) ||
                          archive.type.toLowerCase().includes(query.toLowerCase());
      const matchesType = !type || archive.type === type;
      
      return matchesQuery && matchesType;
    });
  }

  /**
   * Generate recordings (mock)
   */
  private generateRecordings(competition: Competition): Recording[] {
    return [
      {
        id: `rec_${competition.id}_full`,
        title: `${competition.title} - Tam Kayıt`,
        type: 'full_competition',
        url: `https://pusula.eskisehir.bel.tr/recordings/${competition.id}/full`,
        duration: 3600, // 1 hour
        views: Math.floor(Math.random() * 500) + 100,
        uploadedAt: new Date(),
      },
      {
        id: `rec_${competition.id}_highlights`,
        title: `${competition.title} - Öne Çıkanlar`,
        type: 'highlights',
        url: `https://pusula.eskisehir.bel.tr/recordings/${competition.id}/highlights`,
        duration: 600, // 10 minutes
        views: Math.floor(Math.random() * 1000) + 200,
        uploadedAt: new Date(),
      },
    ];
  }

  /**
   * Generate highlights
   */
  private generateHighlights(competition: Competition, results: CompetitionResult): Highlight[] {
    const highlights: Highlight[] = [];
    
    // Winner announcement
    if (results.winners.length > 0) {
      highlights.push({
        id: `hl_${competition.id}_winner`,
        title: 'Şampiyon Belli Oldu!',
        description: `${results.winners[0].botName} yarışmayı kazandı!`,
        timestamp: new Date(),
        participants: [results.winners[0].userId],
        type: 'milestone',
      });
    }
    
    // Record score
    if (results.statistics.highestScore > 95) {
      highlights.push({
        id: `hl_${competition.id}_record`,
        title: 'Rekor Skor!',
        description: `${results.statistics.highestScore} puanla yeni rekor!`,
        timestamp: new Date(),
        participants: results.winners.slice(0, 1).map(w => w.userId),
        type: 'record',
      });
    }
    
    // Close competition
    if (results.winners.length >= 2 && 
        results.winners[0].score - results.winners[1].score < 5) {
      highlights.push({
        id: `hl_${competition.id}_close`,
        title: 'Çekişmeli Yarış!',
        description: 'İlk iki sıra arasında sadece birkaç puan fark var!',
        timestamp: new Date(),
        participants: results.winners.slice(0, 2).map(w => w.userId),
        type: 'upset',
      });
    }
    
    return highlights;
  }
}

// ============================================================================
// Performance Analytics System
// ============================================================================

export class PerformanceAnalyticsSystem {
  /**
   * Generate performance analytics for user
   */
  generateAnalytics(
    userId: string,
    competitions: Competition[],
    archives: CompetitionArchive[]
  ): PerformanceAnalytics {
    // Get user's competition history
    const userCompetitions = competitions.filter(c => 
      c.participants.some(p => p.userId === userId)
    );
    
    const competitionHistory = this.buildCompetitionHistory(userId, userCompetitions, archives);
    const overallStats = this.calculateOverallStats(competitionHistory);
    const skillProgression = this.analyzeSkillProgression(competitionHistory);
    const strengths = this.identifyStrengths(skillProgression);
    const weaknesses = this.identifyWeaknesses(skillProgression);
    const recommendations = this.generateRecommendations(overallStats, strengths, weaknesses);
    
    return {
      userId,
      competitionHistory,
      overallStats,
      strengths,
      weaknesses,
      recommendations,
      skillProgression,
    };
  }

  /**
   * Build competition history
   */
  private buildCompetitionHistory(
    userId: string,
    competitions: Competition[],
    archives: CompetitionArchive[]
  ): CompetitionPerformance[] {
    const history = competitions
      .filter(c => c.status === 'completed')
      .map(competition => {
        const participant = competition.participants.find(p => p.userId === userId);
        if (!participant) return null;
        
        const totalParticipants = competition.participants.length;
        const percentile = ((totalParticipants - participant.rank + 1) / totalParticipants) * 100;
        
        return {
          competitionId: competition.id,
          competitionTitle: competition.title,
          type: competition.type as string,
          rank: participant.rank,
          score: participant.score,
          percentile: Math.round(percentile),
          date: competition.endDate,
          achievements: [], // Would be populated from rewards system
        } as CompetitionPerformance;
      })
      .filter((p): p is CompetitionPerformance => p !== null);
    
    return history.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * Calculate overall statistics
   */
  private calculateOverallStats(history: CompetitionPerformance[]): OverallStats {
    if (history.length === 0) {
      return {
        totalCompetitions: 0,
        wins: 0,
        topThreeFinishes: 0,
        averageRank: 0,
        averageScore: 0,
        bestPerformance: {} as CompetitionPerformance,
        improvementRate: 0,
      };
    }
    
    const wins = history.filter(h => h.rank === 1).length;
    const topThreeFinishes = history.filter(h => h.rank <= 3).length;
    const averageRank = history.reduce((sum, h) => sum + h.rank, 0) / history.length;
    const averageScore = history.reduce((sum, h) => sum + h.score, 0) / history.length;
    const bestPerformance = history.reduce((best, current) => 
      current.score > best.score ? current : best
    );
    
    // Calculate improvement rate (compare first half vs second half)
    const midpoint = Math.floor(history.length / 2);
    const recentAvg = history.slice(0, midpoint).reduce((sum, h) => sum + h.score, 0) / midpoint;
    const olderAvg = history.slice(midpoint).reduce((sum, h) => sum + h.score, 0) / (history.length - midpoint);
    const improvementRate = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;
    
    return {
      totalCompetitions: history.length,
      wins,
      topThreeFinishes,
      averageRank: Math.round(averageRank * 10) / 10,
      averageScore: Math.round(averageScore),
      bestPerformance,
      improvementRate: Math.round(improvementRate),
    };
  }

  /**
   * Analyze skill progression
   */
  private analyzeSkillProgression(history: CompetitionPerformance[]): SkillProgression[] {
    const skillMap = new Map<string, { scores: number[]; dates: Date[] }>();
    
    history.forEach(comp => {
      if (!skillMap.has(comp.type)) {
        skillMap.set(comp.type, { scores: [], dates: [] });
      }
      const skill = skillMap.get(comp.type)!;
      skill.scores.push(comp.score);
      skill.dates.push(comp.date);
    });
    
    return Array.from(skillMap.entries()).map(([skill, data]) => {
      const avgScore = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
      const level = Math.min(10, Math.floor(avgScore / 10) + 1);
      
      // Determine trend
      let trend: 'improving' | 'stable' | 'declining' = 'stable';
      if (data.scores.length >= 2) {
        const recentAvg = data.scores.slice(0, Math.ceil(data.scores.length / 2))
          .reduce((a, b) => a + b, 0) / Math.ceil(data.scores.length / 2);
        const olderAvg = data.scores.slice(Math.ceil(data.scores.length / 2))
          .reduce((a, b) => a + b, 0) / Math.floor(data.scores.length / 2);
        
        if (recentAvg > olderAvg * 1.1) trend = 'improving';
        else if (recentAvg < olderAvg * 0.9) trend = 'declining';
      }
      
      return {
        skill,
        level,
        trend,
        competitions: data.scores.length,
        lastScore: data.scores[0],
      };
    });
  }

  /**
   * Identify strengths
   */
  private identifyStrengths(skillProgression: SkillProgression[]): string[] {
    return skillProgression
      .filter(s => s.level >= 7 || s.trend === 'improving')
      .map(s => this.getSkillDisplayName(s.skill))
      .slice(0, 3);
  }

  /**
   * Identify weaknesses
   */
  private identifyWeaknesses(skillProgression: SkillProgression[]): string[] {
    return skillProgression
      .filter(s => s.level < 5 || s.trend === 'declining')
      .map(s => this.getSkillDisplayName(s.skill))
      .slice(0, 3);
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(
    stats: OverallStats,
    strengths: string[],
    weaknesses: string[]
  ): string[] {
    const recommendations: string[] = [];
    
    if (stats.improvementRate > 20) {
      recommendations.push('Harika ilerleme! Bu tempoyu koruyun.');
    } else if (stats.improvementRate < -10) {
      recommendations.push('Son performansınız düşüş gösteriyor. Daha fazla pratik yapın.');
    }
    
    if (strengths.length > 0) {
      recommendations.push(`Güçlü yönleriniz: ${strengths.join(', ')}. Bu alanlarda uzmanlaşmaya devam edin.`);
    }
    
    if (weaknesses.length > 0) {
      recommendations.push(`Gelişim alanlarınız: ${weaknesses.join(', ')}. Bu konularda daha fazla çalışın.`);
    }
    
    if (stats.topThreeFinishes / stats.totalCompetitions < 0.3) {
      recommendations.push('Daha fazla yarışmaya katılarak deneyim kazanın.');
    }
    
    if (stats.averageScore < 70) {
      recommendations.push('Temel becerileri güçlendirin. MicroLab modüllerini gözden geçirin.');
    }
    
    return recommendations;
  }

  /**
   * Get skill display name
   */
  private getSkillDisplayName(skill: string): string {
    const displayNames: Record<string, string> = {
      trading_bot: 'Ticaret Botları',
      web_scraper: 'Web Scraping',
      chatbot_battle: 'Chatbot Geliştirme',
      css_battle: 'CSS & Tasarım',
      sql_olympics: 'SQL & Veritabanı',
      bug_hunt: 'Bug Hunting & Testing',
    };
    
    return displayNames[skill] || skill;
  }
}

// ============================================================================
// Singleton Instances
// ============================================================================

export const rewardsSystem = new RewardsSystem();
export const competitionArchive = new CompetitionArchiveSystem();
export const performanceAnalytics = new PerformanceAnalyticsSystem();
