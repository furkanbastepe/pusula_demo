/**
 * Buddy System - Analytics and Adaptive Learning
 * 
 * Tracks peer learning outcomes, measures effectiveness,
 * and adjusts matching algorithms based on success metrics.
 */

import type { BuddyMatch, CompatibilityScore } from './matching-algorithm';
import type { CollaborationSession } from './collaboration-tools';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface BuddyAnalytics {
  buddyMatchId: string;
  totalSessions: number;
  totalCollaborationTime: number; // minutes
  averageSessionDuration: number;
  completionRate: number; // 0-100
  averageRating: number; // 1-5
  xpGainedTogether: number;
  skillsImproved: string[];
  projectsCompleted: number;
  relationshipStrength: number; // 0-100
  effectivenessScore: number; // 0-100
  trends: {
    engagementTrend: 'increasing' | 'stable' | 'decreasing';
    performanceTrend: 'improving' | 'stable' | 'declining';
    collaborationFrequency: 'high' | 'medium' | 'low';
  };
}

export interface LearningOutcome {
  userId: string;
  buddyId: string;
  sessionId: string;
  skillsAcquired: string[];
  knowledgeGained: string[];
  xpEarned: number;
  confidenceIncrease: number; // 0-100
  satisfactionScore: number; // 1-5
  wouldCollaborateAgain: boolean;
}

export interface MatchingEffectiveness {
  compatibilityScore: number;
  actualPerformance: number;
  predictionAccuracy: number; // How well did we predict success?
  adjustmentRecommendations: string[];
}

export interface SystemMetrics {
  totalBuddyPairs: number;
  activePairs: number;
  averageCompatibility: number;
  averageEffectiveness: number;
  successRate: number; // % of pairs that complete activities
  retentionRate: number; // % of pairs that continue collaborating
  topPerformingPairs: BuddyMatch[];
  strugglingPairs: BuddyMatch[];
  insights: string[];
}

// ============================================================================
// Buddy Analytics Engine
// ============================================================================

export class BuddyAnalyticsEngine {
  /**
   * Calculate comprehensive analytics for a buddy pair
   */
  calculateBuddyAnalytics(
    buddyMatch: BuddyMatch,
    sessions: CollaborationSession[]
  ): BuddyAnalytics {
    const completedSessions = sessions.filter(s => s.status === 'completed');
    const totalTime = completedSessions.reduce(
      (sum, s) => sum + (s.activity.estimatedMinutes || 0),
      0
    );

    const ratings = completedSessions
      .map(s => s.outcomes.rating)
      .filter((r): r is number => r !== undefined);

    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
      : 0;

    const completionRate = sessions.length > 0
      ? (completedSessions.length / sessions.length) * 100
      : 0;

    const xpGained = completedSessions.reduce(
      (sum, s) => sum + s.outcomes.xpEarned,
      0
    );

    const allSkills = new Set<string>();
    completedSessions.forEach(s => {
      s.outcomes.skillsImproved.forEach(skill => allSkills.add(skill));
    });

    const relationshipStrength = this.calculateRelationshipStrength(
      buddyMatch,
      completedSessions
    );

    const effectivenessScore = this.calculateEffectivenessScore(
      buddyMatch,
      completedSessions,
      averageRating,
      completionRate
    );

    const trends = this.analyzeTrends(sessions);

    return {
      buddyMatchId: `${buddyMatch.user1.id}-${buddyMatch.user2.id}`,
      totalSessions: sessions.length,
      totalCollaborationTime: totalTime,
      averageSessionDuration: sessions.length > 0 ? totalTime / sessions.length : 0,
      completionRate,
      averageRating,
      xpGainedTogether: xpGained,
      skillsImproved: Array.from(allSkills),
      projectsCompleted: buddyMatch.successMetrics.projectsCompleted,
      relationshipStrength,
      effectivenessScore,
      trends,
    };
  }

  /**
   * Calculate relationship strength between buddies
   */
  private calculateRelationshipStrength(
    buddyMatch: BuddyMatch,
    sessions: CollaborationSession[]
  ): number {
    let strength = 0;

    // Base strength from compatibility
    strength += buddyMatch.compatibility.totalScore * 0.3;

    // Collaboration frequency
    if (sessions.length >= 10) strength += 20;
    else if (sessions.length >= 5) strength += 15;
    else if (sessions.length >= 2) strength += 10;

    // Completion rate
    const completedCount = sessions.filter(s => s.status === 'completed').length;
    const completionRate = sessions.length > 0 ? completedCount / sessions.length : 0;
    strength += completionRate * 20;

    // Average rating
    const ratings = sessions
      .map(s => s.outcomes.rating)
      .filter((r): r is number => r !== undefined);
    if (ratings.length > 0) {
      const avgRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
      strength += (avgRating / 5) * 20;
    }

    // Time together
    const daysSinceMatch = Math.floor(
      (Date.now() - buddyMatch.matchedAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceMatch > 30) strength += 10;

    return Math.min(100, Math.round(strength));
  }

  /**
   * Calculate effectiveness score
   */
  private calculateEffectivenessScore(
    buddyMatch: BuddyMatch,
    sessions: CollaborationSession[],
    averageRating: number,
    completionRate: number
  ): number {
    let score = 0;

    // Completion rate (40 points)
    score += (completionRate / 100) * 40;

    // Average rating (30 points)
    score += (averageRating / 5) * 30;

    // XP growth (20 points)
    const xpGained = buddyMatch.successMetrics.mutualGrowth;
    if (xpGained >= 1000) score += 20;
    else if (xpGained >= 500) score += 15;
    else if (xpGained >= 200) score += 10;
    else score += 5;

    // Projects completed (10 points)
    const projects = buddyMatch.successMetrics.projectsCompleted;
    if (projects >= 5) score += 10;
    else if (projects >= 3) score += 7;
    else if (projects >= 1) score += 4;

    return Math.round(score);
  }

  /**
   * Analyze trends in collaboration
   */
  private analyzeTrends(sessions: CollaborationSession[]): {
    engagementTrend: 'increasing' | 'stable' | 'decreasing';
    performanceTrend: 'improving' | 'stable' | 'declining';
    collaborationFrequency: 'high' | 'medium' | 'low';
  } {
    if (sessions.length < 3) {
      return {
        engagementTrend: 'stable',
        performanceTrend: 'stable',
        collaborationFrequency: 'low',
      };
    }

    // Split sessions into first half and second half
    const midpoint = Math.floor(sessions.length / 2);
    const firstHalf = sessions.slice(0, midpoint);
    const secondHalf = sessions.slice(midpoint);

    // Engagement trend (based on completion rate)
    const firstCompletion = firstHalf.filter(s => s.status === 'completed').length / firstHalf.length;
    const secondCompletion = secondHalf.filter(s => s.status === 'completed').length / secondHalf.length;
    
    let engagementTrend: 'increasing' | 'stable' | 'decreasing';
    if (secondCompletion > firstCompletion + 0.1) engagementTrend = 'increasing';
    else if (secondCompletion < firstCompletion - 0.1) engagementTrend = 'decreasing';
    else engagementTrend = 'stable';

    // Performance trend (based on ratings)
    const firstRatings = firstHalf
      .map(s => s.outcomes.rating)
      .filter((r): r is number => r !== undefined);
    const secondRatings = secondHalf
      .map(s => s.outcomes.rating)
      .filter((r): r is number => r !== undefined);

    const firstAvg = firstRatings.length > 0
      ? firstRatings.reduce((sum, r) => sum + r, 0) / firstRatings.length
      : 0;
    const secondAvg = secondRatings.length > 0
      ? secondRatings.reduce((sum, r) => sum + r, 0) / secondRatings.length
      : 0;

    let performanceTrend: 'improving' | 'stable' | 'declining';
    if (secondAvg > firstAvg + 0.3) performanceTrend = 'improving';
    else if (secondAvg < firstAvg - 0.3) performanceTrend = 'declining';
    else performanceTrend = 'stable';

    // Collaboration frequency
    const daysSinceFirst = sessions.length > 0
      ? Math.floor((Date.now() - sessions[0].startedAt.getTime()) / (1000 * 60 * 60 * 24))
      : 1;
    const sessionsPerWeek = (sessions.length / daysSinceFirst) * 7;

    let collaborationFrequency: 'high' | 'medium' | 'low';
    if (sessionsPerWeek >= 2) collaborationFrequency = 'high';
    else if (sessionsPerWeek >= 0.5) collaborationFrequency = 'medium';
    else collaborationFrequency = 'low';

    return { engagementTrend, performanceTrend, collaborationFrequency };
  }

  /**
   * Evaluate matching effectiveness
   */
  evaluateMatchingEffectiveness(
    compatibility: CompatibilityScore,
    analytics: BuddyAnalytics
  ): MatchingEffectiveness {
    const compatibilityScore = compatibility.totalScore;
    const actualPerformance = analytics.effectivenessScore;

    // Calculate prediction accuracy
    // If compatibility was high and performance is high: good prediction
    // If compatibility was low but performance is high: underestimated
    // If compatibility was high but performance is low: overestimated
    const difference = Math.abs(compatibilityScore - actualPerformance);
    const predictionAccuracy = Math.max(0, 100 - difference);

    const adjustmentRecommendations: string[] = [];

    // Analyze discrepancies
    if (compatibilityScore >= 80 && actualPerformance < 60) {
      adjustmentRecommendations.push(
        'Yüksek uyumluluk skoru düşük performansla sonuçlandı. Skill level ağırlığını azalt.'
      );
    }

    if (compatibilityScore < 60 && actualPerformance >= 80) {
      adjustmentRecommendations.push(
        'Düşük uyumluluk skoru yüksek performansla sonuçlandı. İlgi alanları ağırlığını artır.'
      );
    }

    if (compatibility.breakdown.learningStyle < 15 && actualPerformance >= 75) {
      adjustmentRecommendations.push(
        'Öğrenme stili uyumsuzluğuna rağmen başarılı. Öğrenme stili ağırlığını azalt.'
      );
    }

    if (compatibility.breakdown.availability < 10 && analytics.trends.collaborationFrequency === 'high') {
      adjustmentRecommendations.push(
        'Düşük müsaitlik skoruna rağmen sık işbirliği. Müsaitlik hesaplamasını gözden geçir.'
      );
    }

    if (analytics.trends.performanceTrend === 'declining') {
      adjustmentRecommendations.push(
        'Performans düşüyor. Buddy çiftini yeniden değerlendir veya destek sağla.'
      );
    }

    return {
      compatibilityScore,
      actualPerformance,
      predictionAccuracy,
      adjustmentRecommendations,
    };
  }

  /**
   * Generate system-wide metrics
   */
  generateSystemMetrics(
    allMatches: BuddyMatch[],
    allSessions: CollaborationSession[]
  ): SystemMetrics {
    const activePairs = allMatches.filter(m => m.status === 'active').length;
    
    const avgCompatibility = allMatches.length > 0
      ? allMatches.reduce((sum, m) => sum + m.compatibility.totalScore, 0) / allMatches.length
      : 0;

    // Calculate effectiveness for each pair
    const pairAnalytics = allMatches.map(match => {
      const matchSessions = allSessions.filter(
        s => s.buddyMatch.user1.id === match.user1.id && s.buddyMatch.user2.id === match.user2.id
      );
      return this.calculateBuddyAnalytics(match, matchSessions);
    });

    const avgEffectiveness = pairAnalytics.length > 0
      ? pairAnalytics.reduce((sum, a) => sum + a.effectivenessScore, 0) / pairAnalytics.length
      : 0;

    // Success rate: pairs that completed at least one session
    const successfulPairs = pairAnalytics.filter(a => a.totalSessions > 0 && a.completionRate > 50).length;
    const successRate = allMatches.length > 0 ? (successfulPairs / allMatches.length) * 100 : 0;

    // Retention rate: pairs still active after 30 days
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const oldMatches = allMatches.filter(m => m.matchedAt.getTime() < thirtyDaysAgo);
    const retainedPairs = oldMatches.filter(m => m.status === 'active').length;
    const retentionRate = oldMatches.length > 0 ? (retainedPairs / oldMatches.length) * 100 : 0;

    // Top performing pairs
    const matchesWithAnalytics = allMatches.map((match, index) => ({
      match,
      analytics: pairAnalytics[index],
    }));

    matchesWithAnalytics.sort((a, b) => b.analytics.effectivenessScore - a.analytics.effectivenessScore);
    const topPerformingPairs = matchesWithAnalytics.slice(0, 5).map(m => m.match);

    // Struggling pairs
    const strugglingPairs = matchesWithAnalytics
      .filter(m => m.analytics.effectivenessScore < 40 || m.analytics.trends.performanceTrend === 'declining')
      .slice(0, 5)
      .map(m => m.match);

    // Generate insights
    const insights = this.generateSystemInsights({
      totalPairs: allMatches.length,
      activePairs,
      avgCompatibility,
      avgEffectiveness,
      successRate,
      retentionRate,
      pairAnalytics,
    });

    return {
      totalBuddyPairs: allMatches.length,
      activePairs,
      averageCompatibility: Math.round(avgCompatibility),
      averageEffectiveness: Math.round(avgEffectiveness),
      successRate: Math.round(successRate),
      retentionRate: Math.round(retentionRate),
      topPerformingPairs,
      strugglingPairs,
      insights,
    };
  }

  /**
   * Generate actionable insights from system metrics
   */
  private generateSystemInsights(data: {
    totalPairs: number;
    activePairs: number;
    avgCompatibility: number;
    avgEffectiveness: number;
    successRate: number;
    retentionRate: number;
    pairAnalytics: BuddyAnalytics[];
  }): string[] {
    const insights: string[] = [];

    // Overall health
    if (data.successRate >= 75) {
      insights.push('✅ Buddy sistemi çok başarılı! Eşleştirme algoritması iyi çalışıyor.');
    } else if (data.successRate >= 50) {
      insights.push('⚠️ Buddy sistemi orta seviyede. İyileştirme fırsatları var.');
    } else {
      insights.push('🔴 Buddy sistemi düşük performans gösteriyor. Acil iyileştirme gerekli.');
    }

    // Retention
    if (data.retentionRate >= 70) {
      insights.push('💪 Yüksek retention oranı! Buddyler uzun vadeli işbirliği yapıyor.');
    } else if (data.retentionRate < 50) {
      insights.push('📉 Düşük retention. Buddy çiftlerini daha iyi desteklemeyi düşünün.');
    }

    // Compatibility vs Performance
    const gap = Math.abs(data.avgCompatibility - data.avgEffectiveness);
    if (gap > 20) {
      if (data.avgCompatibility > data.avgEffectiveness) {
        insights.push('🔧 Uyumluluk skorları performansı aşıyor. Algoritma kalibrasyonu gerekli.');
      } else {
        insights.push('🎯 Performans uyumluluk skorlarını aşıyor! Algoritma iyi çalışıyor.');
      }
    }

    // Engagement trends
    const increasingEngagement = data.pairAnalytics.filter(
      a => a.trends.engagementTrend === 'increasing'
    ).length;
    const decreasingEngagement = data.pairAnalytics.filter(
      a => a.trends.engagementTrend === 'decreasing'
    ).length;

    if (increasingEngagement > decreasingEngagement * 2) {
      insights.push('📈 Engagement artıyor! Buddy sistemi momentum kazanıyor.');
    } else if (decreasingEngagement > increasingEngagement) {
      insights.push('📉 Engagement azalıyor. Yeni aktiviteler veya teşvikler ekleyin.');
    }

    // Collaboration frequency
    const highFrequency = data.pairAnalytics.filter(
      a => a.trends.collaborationFrequency === 'high'
    ).length;
    const lowFrequency = data.pairAnalytics.filter(
      a => a.trends.collaborationFrequency === 'low'
    ).length;

    if (lowFrequency > data.totalPairs * 0.5) {
      insights.push('⏰ Çoğu buddy çifti düşük frekansta işbirliği yapıyor. Daha fazla teşvik gerekli.');
    }

    return insights;
  }

  /**
   * Recommend algorithm adjustments based on effectiveness data
   */
  recommendAlgorithmAdjustments(
    evaluations: MatchingEffectiveness[]
  ): {
    skillLevelWeight: number;
    interestsWeight: number;
    learningStyleWeight: number;
    sdgAlignmentWeight: number;
    availabilityWeight: number;
    reasoning: string[];
  } {
    // Current weights (from matching algorithm)
    let weights = {
      skillLevelWeight: 25,
      interestsWeight: 25,
      learningStyleWeight: 20,
      sdgAlignmentWeight: 15,
      availabilityWeight: 15,
    };

    const reasoning: string[] = [];

    // Analyze patterns in recommendations
    const recommendations = evaluations.flatMap(e => e.adjustmentRecommendations);

    // Skill level adjustments
    const decreaseSkillLevel = recommendations.filter(r => r.includes('Skill level ağırlığını azalt')).length;
    if (decreaseSkillLevel > evaluations.length * 0.3) {
      weights.skillLevelWeight = 20;
      weights.interestsWeight = 28;
      reasoning.push('Skill level ağırlığı azaltıldı, ilgi alanları ağırlığı artırıldı');
    }

    // Interests adjustments
    const increaseInterests = recommendations.filter(r => r.includes('İlgi alanları ağırlığını artır')).length;
    if (increaseInterests > evaluations.length * 0.3) {
      weights.interestsWeight = 30;
      weights.skillLevelWeight = 22;
      reasoning.push('İlgi alanları ağırlığı artırıldı');
    }

    // Learning style adjustments
    const decreaseLearningStyle = recommendations.filter(r => r.includes('Öğrenme stili ağırlığını azalt')).length;
    if (decreaseLearningStyle > evaluations.length * 0.3) {
      weights.learningStyleWeight = 15;
      weights.interestsWeight += 3;
      weights.sdgAlignmentWeight += 2;
      reasoning.push('Öğrenme stili ağırlığı azaltıldı');
    }

    // Availability adjustments
    const reviewAvailability = recommendations.filter(r => r.includes('Müsaitlik hesaplamasını gözden geçir')).length;
    if (reviewAvailability > evaluations.length * 0.3) {
      weights.availabilityWeight = 12;
      weights.interestsWeight += 3;
      reasoning.push('Müsaitlik ağırlığı azaltıldı');
    }

    if (reasoning.length === 0) {
      reasoning.push('Mevcut ağırlıklar iyi çalışıyor, değişiklik önerilmiyor');
    }

    return { ...weights, reasoning };
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const buddyAnalytics = new BuddyAnalyticsEngine();
