/**
 * Bot Arena Competition System - Competition Engine
 * 
 * Manages multiple competition types, automatic evaluation,
 * ranking systems, and real-time leaderboards with spectator modes.
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export type CompetitionType = 
  | 'trading_bot'
  | 'web_scraper'
  | 'chatbot_battle'
  | 'css_battle'
  | 'sql_olympics'
  | 'bug_hunt';

export type CompetitionStatus = 'draft' | 'registration' | 'active' | 'evaluation' | 'completed' | 'cancelled';

export interface Competition {
  id: string;
  title: string;
  type: CompetitionType;
  description: string;
  rules: string[];
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  status: CompetitionStatus;
  capacity: number;
  participants: Participant[];
  prizes: Prize[];
  evaluationCriteria: EvaluationCriteria[];
  leaderboard: LeaderboardEntry[];
  spectatorMode: boolean;
  liveUpdates: boolean;
}

export interface Participant {
  userId: string;
  botName: string;
  strategy: string;
  submissionUrl: string;
  submittedAt: Date;
  status: 'registered' | 'submitted' | 'evaluating' | 'completed' | 'disqualified';
  score: number;
  rank: number;
  metrics: Record<string, number>;
}

export interface Prize {
  rank: number;
  type: 'xp' | 'badge' | 'certificate' | 'physical';
  value: string | number;
  description: string;
}

export interface EvaluationCriteria {
  name: string;
  weight: number; // 0-1
  description: string;
  maxScore: number;
}

export interface LeaderboardEntry {
  userId: string;
  botName: string;
  score: number;
  rank: number;
  previousRank?: number;
  metrics: Record<string, number>;
  lastUpdated: Date;
}

export interface CompetitionResult {
  competitionId: string;
  winners: Participant[];
  statistics: CompetitionStatistics;
  highlights: string[];
  recordings?: string[];
}

export interface CompetitionStatistics {
  totalParticipants: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  completionRate: number;
  averageSubmissionTime: number;
  topStrategies: { strategy: string; count: number; avgScore: number }[];
}

// ============================================================================
// Competition Engine
// ============================================================================

export class CompetitionEngine {
  /**
   * Create a new competition
   */
  createCompetition(
    title: string,
    type: CompetitionType,
    description: string,
    startDate: Date,
    endDate: Date,
    capacity: number = 50
  ): Competition {
    const registrationDeadline = new Date(startDate.getTime() - 24 * 60 * 60 * 1000); // 1 day before
    
    return {
      id: `comp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      title,
      type,
      description,
      rules: this.getDefaultRules(type),
      startDate,
      endDate,
      registrationDeadline,
      status: 'draft',
      capacity,
      participants: [],
      prizes: this.getDefaultPrizes(type),
      evaluationCriteria: this.getEvaluationCriteria(type),
      leaderboard: [],
      spectatorMode: true,
      liveUpdates: true,
    };
  }

  /**
   * Register participant for competition
   */
  registerParticipant(
    competition: Competition,
    userId: string,
    botName: string,
    strategy: string
  ): Competition {
    // Validation
    if (competition.status !== 'registration') {
      throw new Error('Kayıt dönemi aktif değil.');
    }
    
    if (competition.participants.length >= competition.capacity) {
      throw new Error('Yarışma kapasitesi dolmuştur.');
    }
    
    if (competition.participants.some(p => p.userId === userId)) {
      throw new Error('Bu yarışmaya zaten kayıtlısınız.');
    }
    
    const participant: Participant = {
      userId,
      botName,
      strategy,
      submissionUrl: '',
      submittedAt: new Date(),
      status: 'registered',
      score: 0,
      rank: 0,
      metrics: {},
    };
    
    return {
      ...competition,
      participants: [...competition.participants, participant],
    };
  }

  /**
   * Submit bot for evaluation
   */
  submitBot(
    competition: Competition,
    userId: string,
    submissionUrl: string
  ): Competition {
    if (competition.status !== 'active') {
      throw new Error('Yarışma aktif değil.');
    }
    
    const participantIndex = competition.participants.findIndex(p => p.userId === userId);
    if (participantIndex === -1) {
      throw new Error('Bu yarışmaya kayıtlı değilsiniz.');
    }
    
    const updatedParticipants = [...competition.participants];
    updatedParticipants[participantIndex] = {
      ...updatedParticipants[participantIndex],
      submissionUrl,
      submittedAt: new Date(),
      status: 'submitted',
    };
    
    return {
      ...competition,
      participants: updatedParticipants,
    };
  }

  /**
   * Evaluate bot submission
   */
  evaluateSubmission(
    competition: Competition,
    userId: string,
    metrics: Record<string, number>
  ): Competition {
    const participantIndex = competition.participants.findIndex(p => p.userId === userId);
    if (participantIndex === -1) {
      throw new Error('Katılımcı bulunamadı.');
    }
    
    // Calculate total score based on evaluation criteria
    let totalScore = 0;
    competition.evaluationCriteria.forEach(criteria => {
      const metricValue = metrics[criteria.name] || 0;
      const normalizedScore = (metricValue / criteria.maxScore) * 100;
      totalScore += normalizedScore * criteria.weight;
    });
    
    const updatedParticipants = [...competition.participants];
    updatedParticipants[participantIndex] = {
      ...updatedParticipants[participantIndex],
      metrics,
      score: Math.round(totalScore),
      status: 'completed',
    };
    
    // Update rankings
    const rankedParticipants = this.updateRankings(updatedParticipants);
    
    // Update leaderboard
    const leaderboard = this.generateLeaderboard(rankedParticipants);
    
    return {
      ...competition,
      participants: rankedParticipants,
      leaderboard,
    };
  }

  /**
   * Update participant rankings
   */
  private updateRankings(participants: Participant[]): Participant[] {
    const sorted = [...participants].sort((a, b) => b.score - a.score);
    
    return sorted.map((participant, index) => ({
      ...participant,
      rank: index + 1,
    }));
  }

  /**
   * Generate leaderboard
   */
  private generateLeaderboard(participants: Participant[]): LeaderboardEntry[] {
    return participants
      .filter(p => p.status === 'completed')
      .map(p => ({
        userId: p.userId,
        botName: p.botName,
        score: p.score,
        rank: p.rank,
        metrics: p.metrics,
        lastUpdated: new Date(),
      }))
      .sort((a, b) => a.rank - b.rank);
  }

  /**
   * Get competition results
   */
  getCompetitionResults(competition: Competition): CompetitionResult {
    const completedParticipants = competition.participants.filter(p => p.status === 'completed');
    const winners = completedParticipants.slice(0, 3); // Top 3
    
    // Calculate statistics
    const scores = completedParticipants.map(p => p.score);
    const statistics: CompetitionStatistics = {
      totalParticipants: competition.participants.length,
      averageScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
      highestScore: Math.max(...scores, 0),
      lowestScore: Math.min(...scores, 0),
      completionRate: (completedParticipants.length / competition.participants.length) * 100,
      averageSubmissionTime: this.calculateAverageSubmissionTime(competition.participants),
      topStrategies: this.analyzeStrategies(completedParticipants),
    };
    
    // Generate highlights
    const highlights = this.generateHighlights(competition, winners, statistics);
    
    return {
      competitionId: competition.id,
      winners,
      statistics,
      highlights,
    };
  }

  /**
   * Calculate average submission time
   */
  private calculateAverageSubmissionTime(participants: Participant[]): number {
    const submitted = participants.filter(p => p.status !== 'registered');
    if (submitted.length === 0) return 0;
    
    const times = submitted.map(p => p.submittedAt.getTime());
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    
    return Math.round(avgTime / (1000 * 60)); // Convert to minutes
  }

  /**
   * Analyze strategies
   */
  private analyzeStrategies(participants: Participant[]): { strategy: string; count: number; avgScore: number }[] {
    const strategyMap = new Map<string, { count: number; totalScore: number }>();
    
    participants.forEach(p => {
      const existing = strategyMap.get(p.strategy) || { count: 0, totalScore: 0 };
      strategyMap.set(p.strategy, {
        count: existing.count + 1,
        totalScore: existing.totalScore + p.score,
      });
    });
    
    return Array.from(strategyMap.entries())
      .map(([strategy, data]) => ({
        strategy,
        count: data.count,
        avgScore: Math.round(data.totalScore / data.count),
      }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 5);
  }

  /**
   * Generate competition highlights
   */
  private generateHighlights(
    competition: Competition,
    winners: Participant[],
    statistics: CompetitionStatistics
  ): string[] {
    const highlights: string[] = [];
    
    if (winners.length > 0) {
      highlights.push(`🏆 Şampiyon: ${winners[0].botName} (${winners[0].score} puan)`);
    }
    
    if (statistics.highestScore > 90) {
      highlights.push(`🌟 Mükemmel performans! En yüksek skor: ${statistics.highestScore}`);
    }
    
    if (statistics.completionRate > 90) {
      highlights.push(`✅ Yüksek katılım oranı: %${Math.round(statistics.completionRate)}`);
    }
    
    if (statistics.topStrategies.length > 0) {
      highlights.push(`🎯 En başarılı strateji: ${statistics.topStrategies[0].strategy}`);
    }
    
    highlights.push(`👥 ${statistics.totalParticipants} katılımcı yarıştı`);
    
    return highlights;
  }

  /**
   * Get default rules for competition type
   */
  private getDefaultRules(type: CompetitionType): string[] {
    const commonRules = [
      'Orijinal kod yazımı zorunludur',
      'Zamanında teslim gereklidir',
      'Fair play kurallarına uyulmalıdır',
      'Kopyalama ve intihal yasaktır',
    ];
    
    const typeSpecificRules: Record<CompetitionType, string[]> = {
      trading_bot: [
        'Başlangıç sermayesi: 10,000 TL',
        'İşlem limiti: 100 işlem/gün',
        'Risk yönetimi stratejisi gereklidir',
      ],
      web_scraper: [
        'robots.txt kurallarına uyulmalıdır',
        'Rate limiting uygulanmalıdır',
        'Veri doğruluğu kontrol edilmelidir',
      ],
      chatbot_battle: [
        'Doğal dil işleme kullanılmalıdır',
        'Bağlam yönetimi gereklidir',
        'Yanıt süresi: maksimum 2 saniye',
      ],
      css_battle: [
        'Sadece CSS kullanılabilir',
        'Minimum kod hedeflenir',
        'Piksel-perfect tasarım beklenir',
      ],
      sql_olympics: [
        'Standart SQL kullanılmalıdır',
        'Sorgu optimizasyonu önemlidir',
        'Güvenlik açıkları kontrol edilir',
      ],
      bug_hunt: [
        'Tüm buglar raporlanmalıdır',
        'Severity seviyeleri belirtilmelidir',
        'Çözüm önerileri eklenmelidir',
      ],
    };
    
    return [...commonRules, ...typeSpecificRules[type]];
  }

  /**
   * Get default prizes for competition type
   */
  private getDefaultPrizes(type: CompetitionType): Prize[] {
    return [
      {
        rank: 1,
        type: 'xp',
        value: 500,
        description: '1. lik - 500 XP + Özel Rozet',
      },
      {
        rank: 1,
        type: 'badge',
        value: `${this.getCompetitionTitle(type)} Şampiyonu`,
        description: 'Şampiyonluk Rozeti',
      },
      {
        rank: 2,
        type: 'xp',
        value: 300,
        description: '2. lik - 300 XP',
      },
      {
        rank: 3,
        type: 'xp',
        value: 200,
        description: '3. lük - 200 XP',
      },
      {
        rank: 0, // All participants
        type: 'xp',
        value: 50,
        description: 'Katılım - 50 XP',
      },
    ];
  }

  /**
   * Get evaluation criteria for competition type
   */
  private getEvaluationCriteria(type: CompetitionType): EvaluationCriteria[] {
    const criteriaMap: Record<CompetitionType, EvaluationCriteria[]> = {
      trading_bot: [
        { name: 'profitability', weight: 0.4, description: 'Karlılık', maxScore: 100 },
        { name: 'risk_management', weight: 0.3, description: 'Risk Yönetimi', maxScore: 100 },
        { name: 'strategy_complexity', weight: 0.2, description: 'Strateji Karmaşıklığı', maxScore: 100 },
        { name: 'code_quality', weight: 0.1, description: 'Kod Kalitesi', maxScore: 100 },
      ],
      web_scraper: [
        { name: 'data_accuracy', weight: 0.4, description: 'Veri Doğruluğu', maxScore: 100 },
        { name: 'speed', weight: 0.3, description: 'Hız', maxScore: 100 },
        { name: 'error_handling', weight: 0.2, description: 'Hata Yönetimi', maxScore: 100 },
        { name: 'code_quality', weight: 0.1, description: 'Kod Kalitesi', maxScore: 100 },
      ],
      chatbot_battle: [
        { name: 'response_quality', weight: 0.4, description: 'Yanıt Kalitesi', maxScore: 100 },
        { name: 'context_understanding', weight: 0.3, description: 'Bağlam Anlama', maxScore: 100 },
        { name: 'response_time', weight: 0.2, description: 'Yanıt Süresi', maxScore: 100 },
        { name: 'personality', weight: 0.1, description: 'Kişilik', maxScore: 100 },
      ],
      css_battle: [
        { name: 'visual_accuracy', weight: 0.5, description: 'Görsel Doğruluk', maxScore: 100 },
        { name: 'code_efficiency', weight: 0.3, description: 'Kod Verimliliği', maxScore: 100 },
        { name: 'creativity', weight: 0.2, description: 'Yaratıcılık', maxScore: 100 },
      ],
      sql_olympics: [
        { name: 'query_correctness', weight: 0.4, description: 'Sorgu Doğruluğu', maxScore: 100 },
        { name: 'performance', weight: 0.3, description: 'Performans', maxScore: 100 },
        { name: 'optimization', weight: 0.2, description: 'Optimizasyon', maxScore: 100 },
        { name: 'readability', weight: 0.1, description: 'Okunabilirlik', maxScore: 100 },
      ],
      bug_hunt: [
        { name: 'bugs_found', weight: 0.4, description: 'Bulunan Bug Sayısı', maxScore: 100 },
        { name: 'severity_accuracy', weight: 0.3, description: 'Severity Doğruluğu', maxScore: 100 },
        { name: 'report_quality', weight: 0.2, description: 'Rapor Kalitesi', maxScore: 100 },
        { name: 'solution_quality', weight: 0.1, description: 'Çözüm Kalitesi', maxScore: 100 },
      ],
    };
    
    return criteriaMap[type];
  }

  /**
   * Get competition title
   */
  private getCompetitionTitle(type: CompetitionType): string {
    const titles: Record<CompetitionType, string> = {
      trading_bot: 'Ticaret Botu',
      web_scraper: 'Web Scraper',
      chatbot_battle: 'Chatbot',
      css_battle: 'CSS Battle',
      sql_olympics: 'SQL Olimpiyatları',
      bug_hunt: 'Bug Hunt',
    };
    
    return titles[type];
  }
}

// ============================================================================
// Spectator Mode System
// ============================================================================

export class SpectatorModeSystem {
  /**
   * Get live competition data for spectators
   */
  getLiveCompetitionData(competition: Competition): {
    leaderboard: LeaderboardEntry[];
    recentUpdates: string[];
    statistics: {
      totalSubmissions: number;
      averageScore: number;
      timeRemaining: number;
    };
  } {
    const now = Date.now();
    const timeRemaining = Math.max(0, competition.endDate.getTime() - now);
    
    const completedParticipants = competition.participants.filter(p => p.status === 'completed');
    const scores = completedParticipants.map(p => p.score);
    
    return {
      leaderboard: competition.leaderboard.slice(0, 10), // Top 10
      recentUpdates: this.generateRecentUpdates(competition),
      statistics: {
        totalSubmissions: completedParticipants.length,
        averageScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
        timeRemaining: Math.round(timeRemaining / (1000 * 60)), // minutes
      },
    };
  }

  /**
   * Generate recent updates for spectators
   */
  private generateRecentUpdates(competition: Competition): string[] {
    const updates: string[] = [];
    
    // Get recent submissions (last 5)
    const recentSubmissions = competition.participants
      .filter(p => p.status === 'completed')
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
      .slice(0, 5);
    
    recentSubmissions.forEach(p => {
      const timeAgo = this.getTimeAgo(p.submittedAt);
      updates.push(`${p.botName} teslim etti - ${p.score} puan (${timeAgo})`);
    });
    
    // Add rank changes
    const topRankChanges = competition.leaderboard
      .filter(entry => entry.previousRank && entry.previousRank !== entry.rank)
      .slice(0, 3);
    
    topRankChanges.forEach(entry => {
      const change = entry.previousRank! - entry.rank;
      const direction = change > 0 ? '⬆️' : '⬇️';
      updates.push(`${direction} ${entry.botName} ${Math.abs(change)} sıra ${change > 0 ? 'yükseldi' : 'düştü'}`);
    });
    
    return updates;
  }

  /**
   * Get time ago string
   */
  private getTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds} saniye önce`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika önce`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat önce`;
    return `${Math.floor(seconds / 86400)} gün önce`;
  }
}

// ============================================================================
// Singleton Instances
// ============================================================================

export const competitionEngine = new CompetitionEngine();
export const spectatorMode = new SpectatorModeSystem();
