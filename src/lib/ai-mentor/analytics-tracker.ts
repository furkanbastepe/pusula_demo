// AI Mentor Analytics Tracker
// Tracks engagement metrics and provides improvement insights

import { ConversationSession, Message } from './conversation-manager';

export interface MentorAnalytics {
  userId: string;
  totalSessions: number;
  totalMessages: number;
  averageSessionDuration: number;
  averageMessagesPerSession: number;
  topTopics: { topic: string; count: number }[];
  satisfactionScore: number;
  escalationRate: number;
  resolutionRate: number;
  engagementTrend: 'increasing' | 'stable' | 'decreasing';
  lastInteraction: Date;
}

export interface SessionMetrics {
  sessionId: string;
  duration: number;
  messageCount: number;
  userMessageCount: number;
  assistantMessageCount: number;
  averageResponseTime: number;
  topicsDiscussed: string[];
  wasEscalated: boolean;
  wasResolved: boolean;
  satisfactionScore?: number;
}

export interface EngagementMetrics {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  averageSessionsPerUser: number;
  averageMessagesPerUser: number;
  peakUsageHours: number[];
  popularTopics: { topic: string; count: number }[];
  escalationRate: number;
  resolutionRate: number;
}

export class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private sessionMetrics: Map<string, SessionMetrics> = new Map();
  private userAnalytics: Map<string, MentorAnalytics> = new Map();

  static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }
    return AnalyticsTracker.instance;
  }

  /**
   * Track session completion
   */
  trackSessionCompletion(session: ConversationSession, wasResolved: boolean, satisfactionScore?: number): void {
    const duration = session.lastActivityAt.getTime() - session.startedAt.getTime();
    const userMessages = session.messages.filter(m => m.role === 'user');
    const assistantMessages = session.messages.filter(m => m.role === 'assistant');

    // Calculate average response time
    let totalResponseTime = 0;
    let responseCount = 0;
    for (let i = 0; i < session.messages.length - 1; i++) {
      if (session.messages[i].role === 'user' && session.messages[i + 1].role === 'assistant') {
        const responseTime = session.messages[i + 1].timestamp.getTime() - session.messages[i].timestamp.getTime();
        totalResponseTime += responseTime;
        responseCount++;
      }
    }
    const averageResponseTime = responseCount > 0 ? totalResponseTime / responseCount : 0;

    const metrics: SessionMetrics = {
      sessionId: session.id,
      duration,
      messageCount: session.messages.length,
      userMessageCount: userMessages.length,
      assistantMessageCount: assistantMessages.length,
      averageResponseTime,
      topicsDiscussed: session.context.recentTopics,
      wasEscalated: session.status === 'escalated',
      wasResolved,
      satisfactionScore
    };

    this.sessionMetrics.set(session.id, metrics);
    this.updateUserAnalytics(session.userId, metrics);
    this.persistMetrics();
  }

  /**
   * Track message sent
   */
  trackMessage(sessionId: string, message: Message): void {
    // Track message-level metrics if needed
    // For now, we track at session level
  }

  /**
   * Get user analytics
   */
  getUserAnalytics(userId: string): MentorAnalytics | null {
    return this.userAnalytics.get(userId) || null;
  }

  /**
   * Get session metrics
   */
  getSessionMetrics(sessionId: string): SessionMetrics | null {
    return this.sessionMetrics.get(sessionId) || null;
  }

  /**
   * Get overall engagement metrics
   */
  getEngagementMetrics(): EngagementMetrics {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekMs = 7 * dayMs;
    const monthMs = 30 * dayMs;

    const allSessions = Array.from(this.sessionMetrics.values());
    const allUsers = Array.from(this.userAnalytics.values());

    // Calculate active users
    const dailyActive = new Set(
      allUsers.filter(u => now - u.lastInteraction.getTime() < dayMs).map(u => u.userId)
    ).size;

    const weeklyActive = new Set(
      allUsers.filter(u => now - u.lastInteraction.getTime() < weekMs).map(u => u.userId)
    ).size;

    const monthlyActive = new Set(
      allUsers.filter(u => now - u.lastInteraction.getTime() < monthMs).map(u => u.userId)
    ).size;

    // Calculate averages
    const totalSessions = allUsers.reduce((sum, u) => sum + u.totalSessions, 0);
    const totalMessages = allUsers.reduce((sum, u) => sum + u.totalMessages, 0);
    const averageSessionsPerUser = allUsers.length > 0 ? totalSessions / allUsers.length : 0;
    const averageMessagesPerUser = allUsers.length > 0 ? totalMessages / allUsers.length : 0;

    // Calculate peak usage hours
    const peakUsageHours = this.calculatePeakUsageHours(allSessions);

    // Calculate popular topics
    const topicCounts = new Map<string, number>();
    allSessions.forEach(session => {
      session.topicsDiscussed.forEach(topic => {
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
      });
    });
    const popularTopics = Array.from(topicCounts.entries())
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate rates
    const escalatedCount = allSessions.filter(s => s.wasEscalated).length;
    const resolvedCount = allSessions.filter(s => s.wasResolved).length;
    const escalationRate = allSessions.length > 0 ? escalatedCount / allSessions.length : 0;
    const resolutionRate = allSessions.length > 0 ? resolvedCount / allSessions.length : 0;

    return {
      dailyActiveUsers: dailyActive,
      weeklyActiveUsers: weeklyActive,
      monthlyActiveUsers: monthlyActive,
      averageSessionsPerUser,
      averageMessagesPerUser,
      peakUsageHours,
      popularTopics,
      escalationRate,
      resolutionRate
    };
  }

  /**
   * Get improvement insights
   */
  getImprovementInsights(): {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  } {
    const metrics = this.getEngagementMetrics();
    const allUsers = Array.from(this.userAnalytics.values());

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    // Analyze resolution rate
    if (metrics.resolutionRate > 0.8) {
      strengths.push(`Yüksek çözüm oranı: %${Math.round(metrics.resolutionRate * 100)}`);
    } else if (metrics.resolutionRate < 0.6) {
      weaknesses.push(`Düşük çözüm oranı: %${Math.round(metrics.resolutionRate * 100)}`);
      recommendations.push('Yanıt kalitesini artırmak için daha fazla örnek ve açıklama ekle');
    }

    // Analyze escalation rate
    if (metrics.escalationRate < 0.2) {
      strengths.push(`Düşük yönlendirme oranı: %${Math.round(metrics.escalationRate * 100)}`);
    } else if (metrics.escalationRate > 0.4) {
      weaknesses.push(`Yüksek yönlendirme oranı: %${Math.round(metrics.escalationRate * 100)}`);
      recommendations.push('AI mentor yeteneklerini genişlet veya yönlendirme eşiklerini ayarla');
    }

    // Analyze engagement
    const avgSatisfaction = allUsers.reduce((sum, u) => sum + u.satisfactionScore, 0) / allUsers.length;
    if (avgSatisfaction > 4.0) {
      strengths.push(`Yüksek memnuniyet: ${avgSatisfaction.toFixed(1)}/5.0`);
    } else if (avgSatisfaction < 3.0) {
      weaknesses.push(`Düşük memnuniyet: ${avgSatisfaction.toFixed(1)}/5.0`);
      recommendations.push('Kullanıcı geri bildirimlerini analiz et ve iyileştirmeler yap');
    }

    // Analyze popular topics
    if (metrics.popularTopics.length > 0) {
      const topTopic = metrics.popularTopics[0];
      strengths.push(`En popüler konu: ${topTopic.topic} (${topTopic.count} soru)`);
      recommendations.push(`${topTopic.topic} için daha fazla içerik ve kaynak hazırla`);
    }

    // Analyze usage patterns
    if (metrics.dailyActiveUsers > 0) {
      const engagementRate = metrics.dailyActiveUsers / metrics.monthlyActiveUsers;
      if (engagementRate > 0.3) {
        strengths.push('Yüksek günlük katılım oranı');
      } else if (engagementRate < 0.1) {
        weaknesses.push('Düşük günlük katılım oranı');
        recommendations.push('Kullanıcıları düzenli kullanıma teşvik edecek özellikler ekle');
      }
    }

    return { strengths, weaknesses, recommendations };
  }

  /**
   * Update user analytics
   */
  private updateUserAnalytics(userId: string, sessionMetrics: SessionMetrics): void {
    let analytics = this.userAnalytics.get(userId);

    if (!analytics) {
      analytics = {
        userId,
        totalSessions: 0,
        totalMessages: 0,
        averageSessionDuration: 0,
        averageMessagesPerSession: 0,
        topTopics: [],
        satisfactionScore: 0,
        escalationRate: 0,
        resolutionRate: 0,
        engagementTrend: 'stable',
        lastInteraction: new Date()
      };
    }

    // Update counts
    analytics.totalSessions++;
    analytics.totalMessages += sessionMetrics.messageCount;

    // Update averages
    analytics.averageSessionDuration = 
      (analytics.averageSessionDuration * (analytics.totalSessions - 1) + sessionMetrics.duration) / analytics.totalSessions;
    analytics.averageMessagesPerSession = analytics.totalMessages / analytics.totalSessions;

    // Update topics
    const topicCounts = new Map<string, number>();
    analytics.topTopics.forEach(t => topicCounts.set(t.topic, t.count));
    sessionMetrics.topicsDiscussed.forEach(topic => {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
    });
    analytics.topTopics = Array.from(topicCounts.entries())
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Update satisfaction
    if (sessionMetrics.satisfactionScore) {
      analytics.satisfactionScore = 
        (analytics.satisfactionScore * (analytics.totalSessions - 1) + sessionMetrics.satisfactionScore) / analytics.totalSessions;
    }

    // Update rates
    const userSessions = Array.from(this.sessionMetrics.values()).filter(s => 
      s.sessionId.includes(userId)
    );
    const escalatedCount = userSessions.filter(s => s.wasEscalated).length;
    const resolvedCount = userSessions.filter(s => s.wasResolved).length;
    analytics.escalationRate = escalatedCount / userSessions.length;
    analytics.resolutionRate = resolvedCount / userSessions.length;

    // Update engagement trend
    analytics.engagementTrend = this.calculateEngagementTrend(userId);
    analytics.lastInteraction = new Date();

    this.userAnalytics.set(userId, analytics);
  }

  /**
   * Calculate peak usage hours
   */
  private calculatePeakUsageHours(sessions: SessionMetrics[]): number[] {
    const hourCounts = new Array(24).fill(0);

    sessions.forEach(session => {
      // Assuming we have session start time
      const hour = new Date().getHours(); // Simplified
      hourCounts[hour]++;
    });

    // Get top 3 hours
    return hourCounts
      .map((count, hour) => ({ hour, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(h => h.hour);
  }

  /**
   * Calculate engagement trend
   */
  private calculateEngagementTrend(userId: string): 'increasing' | 'stable' | 'decreasing' {
    const userSessions = Array.from(this.sessionMetrics.values())
      .filter(s => s.sessionId.includes(userId))
      .sort((a, b) => a.sessionId.localeCompare(b.sessionId)); // Simplified sorting

    if (userSessions.length < 3) return 'stable';

    const recentSessions = userSessions.slice(-3);
    const olderSessions = userSessions.slice(-6, -3);

    if (olderSessions.length === 0) return 'stable';

    const recentAvg = recentSessions.reduce((sum, s) => sum + s.messageCount, 0) / recentSessions.length;
    const olderAvg = olderSessions.reduce((sum, s) => sum + s.messageCount, 0) / olderSessions.length;

    if (recentAvg > olderAvg * 1.2) return 'increasing';
    if (recentAvg < olderAvg * 0.8) return 'decreasing';
    return 'stable';
  }

  /**
   * Persist metrics to storage
   */
  private persistMetrics(): void {
    try {
      localStorage.setItem('mentor_analytics', JSON.stringify({
        sessionMetrics: Array.from(this.sessionMetrics.entries()),
        userAnalytics: Array.from(this.userAnalytics.entries()).map(([userId, analytics]) => [
          userId,
          {
            ...analytics,
            lastInteraction: analytics.lastInteraction.toISOString()
          }
        ])
      }));
    } catch (error) {
      console.warn('Could not persist analytics:', error);
    }
  }

  /**
   * Load metrics from storage
   */
  loadPersistedMetrics(): void {
    try {
      const stored = localStorage.getItem('mentor_analytics');
      if (stored) {
        const data = JSON.parse(stored);
        
        this.sessionMetrics = new Map(data.sessionMetrics);
        this.userAnalytics = new Map(
          data.userAnalytics.map(([userId, analytics]: [string, any]) => [
            userId,
            {
              ...analytics,
              lastInteraction: new Date(analytics.lastInteraction)
            }
          ])
        );
      }
    } catch (error) {
      console.warn('Could not load persisted analytics:', error);
    }
  }
}

// Export singleton instance
export const analyticsTracker = AnalyticsTracker.getInstance();
