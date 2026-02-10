/**
 * Simulation Assessment and Integration System
 * 
 * Provides performance assessment, improvement suggestions,
 * progress tracking integration, and portfolio development.
 */

import { SimulationSession, SimulationResult, Simulation } from './simulation-engine';

// Assessment Types
export interface PerformanceAssessment {
  sessionId: string;
  userId: string;
  simulationId: string;
  
  // Overall performance
  overallScore: number;
  performance: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement';
  passed: boolean;
  
  // Detailed metrics
  accuracy: number; // % of correct answers
  efficiency: number; // Time efficiency score
  completeness: number; // % of steps completed
  collaboration: number; // Collaboration effectiveness (if applicable)
  
  // Skill assessment
  skillScores: SkillScore[];
  strengths: string[];
  weaknesses: string[];
  
  // Improvement suggestions
  suggestions: ImprovementSuggestion[];
  nextSteps: string[];
  relatedContent: RelatedContent[];
}

export interface SkillScore {
  skill: string;
  score: number; // 0-100
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  improvement: number; // Change from previous assessment
}

export interface ImprovementSuggestion {
  area: string;
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  resources: string[];
  estimatedTime: number; // minutes
}

export interface RelatedContent {
  type: 'microlab' | 'task' | 'simulation' | 'resource';
  id: string;
  title: string;
  relevance: number; // 0-1
  reason: string;
}

// Progress Integration
export interface ProgressIntegration {
  userId: string;
  simulationId: string;
  
  // XP and rewards
  xpEarned: number;
  gdrEarned: number;
  badges: string[];
  
  // Progress updates
  skillsImproved: string[];
  milestonesReached: string[];
  levelProgress: number; // % to next level
  
  // Learning path
  completedInPath: number;
  totalInPath: number;
  nextRecommended: string[];
  
  // Portfolio impact
  portfolioItemsAdded: number;
  portfolioQualityScore: number;
}

/**
 * Assessment Engine
 */
export class AssessmentEngine {
  /**
   * Assess simulation performance
   */
  assessPerformance(
    session: SimulationSession,
    simulation: Simulation
  ): PerformanceAssessment {
    // Calculate metrics
    const accuracy = this.calculateAccuracy(session);
    const efficiency = this.calculateEfficiency(session, simulation);
    const completeness = this.calculateCompleteness(session);
    const collaboration = this.calculateCollaboration(session);

    // Overall score (weighted average)
    const overallScore = (
      accuracy * 0.4 +
      efficiency * 0.2 +
      completeness * 0.3 +
      collaboration * 0.1
    );

    // Performance level
    let performance: PerformanceAssessment['performance'];
    if (overallScore >= 90) performance = 'excellent';
    else if (overallScore >= 75) performance = 'good';
    else if (overallScore >= 60) performance = 'satisfactory';
    else performance = 'needs_improvement';

    // Skill assessment
    const skillScores = this.assessSkills(session, simulation);
    const strengths = skillScores
      .filter(s => s.score >= 80)
      .map(s => s.skill)
      .slice(0, 3);
    const weaknesses = skillScores
      .filter(s => s.score < 60)
      .map(s => s.skill)
      .slice(0, 3);

    // Generate suggestions
    const suggestions = this.generateSuggestions(session, simulation, skillScores);
    const nextSteps = this.generateNextSteps(performance, simulation);
    const relatedContent = this.findRelatedContent(simulation, weaknesses);

    return {
      sessionId: session.id,
      userId: session.userId,
      simulationId: session.simulationId,
      overallScore,
      performance,
      passed: overallScore >= simulation.passingScore,
      accuracy,
      efficiency,
      completeness,
      collaboration,
      skillScores,
      strengths,
      weaknesses,
      suggestions,
      nextSteps,
      relatedContent
    };
  }

  /**
   * Integrate with progress tracking
   */
  integrateWithProgress(
    result: SimulationResult,
    simulation: Simulation
  ): ProgressIntegration {
    const { session, xpEarned, gdrEarned, badges } = result;

    // Calculate skill improvements
    const skillsImproved = simulation.skills.slice(0, 3);

    // Check milestones
    const milestonesReached: string[] = [];
    if (result.passed) {
      milestonesReached.push(`Completed ${simulation.title}`);
    }
    if (badges.length > 0) {
      milestonesReached.push(`Earned ${badges.length} badge(s)`);
    }

    // Level progress (simplified - would integrate with actual XP system)
    const levelProgress = 0; // Would calculate based on user's current XP

    // Learning path progress
    const completedInPath = 1; // This simulation
    const totalInPath = 10; // Typical path length
    const nextRecommended = this.recommendNextSimulations(simulation);

    // Portfolio impact
    const portfolioItemsAdded = 1;
    const portfolioQualityScore = (session.score / session.maxScore) * 100;

    return {
      userId: session.userId,
      simulationId: session.simulationId,
      xpEarned,
      gdrEarned,
      badges,
      skillsImproved,
      milestonesReached,
      levelProgress,
      completedInPath,
      totalInPath,
      nextRecommended,
      portfolioItemsAdded,
      portfolioQualityScore
    };
  }

  /**
   * Generate comprehensive report
   */
  generateReport(
    assessment: PerformanceAssessment,
    integration: ProgressIntegration
  ): {
    summary: string;
    details: string[];
    recommendations: string[];
    nextActions: string[];
  } {
    const summary = this.generateSummary(assessment, integration);
    const details = this.generateDetails(assessment);
    const recommendations = this.generateRecommendations(assessment);
    const nextActions = this.generateNextActions(integration);

    return {
      summary,
      details,
      recommendations,
      nextActions
    };
  }

  // Private helper methods

  private calculateAccuracy(session: SimulationSession): number {
    if (session.responses.length === 0) return 0;
    const correct = session.responses.filter(r => r.isCorrect).length;
    return (correct / session.responses.length) * 100;
  }

  private calculateEfficiency(session: SimulationSession, simulation: Simulation): number {
    const totalTime = session.responses.reduce((sum, r) => sum + r.timeSpent, 0);
    const expectedTime = simulation.estimatedMinutes * 60; // Convert to seconds
    
    if (totalTime <= expectedTime) return 100;
    if (totalTime <= expectedTime * 1.5) return 75;
    if (totalTime <= expectedTime * 2) return 50;
    return 25;
  }

  private calculateCompleteness(session: SimulationSession): number {
    return (session.currentStep / session.totalSteps) * 100;
  }

  private calculateCollaboration(session: SimulationSession): number {
    // If solo session, return neutral score
    if (session.participants.length <= 1) return 75;
    
    // For collaborative sessions, would analyze interaction patterns
    // Simplified for now
    return 80;
  }

  private assessSkills(session: SimulationSession, simulation: Simulation): SkillScore[] {
    return simulation.skills.map(skill => {
      // Simplified skill assessment based on overall performance
      const baseScore = (session.score / session.maxScore) * 100;
      const variance = (Math.random() - 0.5) * 20; // Add some variance
      const score = Math.max(0, Math.min(100, baseScore + variance));

      let level: SkillScore['level'];
      if (score >= 80) level = 'expert';
      else if (score >= 65) level = 'advanced';
      else if (score >= 50) level = 'intermediate';
      else level = 'beginner';

      return {
        skill,
        score,
        level,
        improvement: Math.floor(Math.random() * 10) // Would track actual improvement
      };
    });
  }

  private generateSuggestions(
    session: SimulationSession,
    simulation: Simulation,
    skillScores: SkillScore[]
  ): ImprovementSuggestion[] {
    const suggestions: ImprovementSuggestion[] = [];

    // Identify weak skills
    const weakSkills = skillScores.filter(s => s.score < 60);

    weakSkills.forEach(skill => {
      suggestions.push({
        area: skill.skill,
        priority: skill.score < 40 ? 'high' : 'medium',
        suggestion: `${skill.skill} becerisini geliştirmek için ilgili MicroLab modüllerini tekrar edin`,
        resources: [`MicroLab: ${skill.skill} Temelleri`, `Görev: ${skill.skill} Pratiği`],
        estimatedTime: 60
      });
    });

    // Time management suggestion if needed
    const totalTime = session.responses.reduce((sum, r) => sum + r.timeSpent, 0);
    const expectedTime = simulation.estimatedMinutes * 60;
    
    if (totalTime > expectedTime * 1.5) {
      suggestions.push({
        area: 'Zaman Yönetimi',
        priority: 'medium',
        suggestion: 'Simülasyonları daha hızlı tamamlamak için pratik yapın',
        resources: ['MicroLab: Etkili Zaman Yönetimi'],
        estimatedTime: 30
      });
    }

    return suggestions;
  }

  private generateNextSteps(
    performance: PerformanceAssessment['performance'],
    simulation: Simulation
  ): string[] {
    const steps: string[] = [];

    if (performance === 'excellent') {
      steps.push('Bir sonraki seviye simülasyonuna geçebilirsiniz');
      steps.push('Buddy\'nize yardım ederek bilginizi pekiştirin');
    } else if (performance === 'good') {
      steps.push('Benzer simülasyonları tekrar ederek pekiştirin');
      steps.push('İlgili MicroLab modüllerini gözden geçirin');
    } else {
      steps.push('Temel kavramları tekrar edin');
      steps.push('Rehberinizden destek alın');
      steps.push('Buddy\'nizle birlikte pratik yapın');
    }

    return steps;
  }

  private findRelatedContent(
    simulation: Simulation,
    weaknesses: string[]
  ): RelatedContent[] {
    const content: RelatedContent[] = [];

    // Add related MicroLabs
    simulation.skills.forEach((skill, index) => {
      content.push({
        type: 'microlab',
        id: `ML-${simulation.phase}-${index + 1}`,
        title: `${skill} Temelleri`,
        relevance: weaknesses.includes(skill) ? 0.9 : 0.6,
        reason: weaknesses.includes(skill) 
          ? 'Bu alanda gelişme fırsatı var'
          : 'İlgili beceri geliştirme'
      });
    });

    // Add related tasks
    content.push({
      type: 'task',
      id: `T-${simulation.phase}-1`,
      title: `${simulation.title} Pratiği`,
      relevance: 0.8,
      reason: 'Pratik yaparak pekiştirin'
    });

    return content.slice(0, 5);
  }

  private recommendNextSimulations(simulation: Simulation): string[] {
    // Would use actual simulation data
    return [
      `Next ${simulation.type} simulation`,
      `Advanced ${simulation.phase} simulation`,
      'Collaborative simulation'
    ];
  }

  private generateSummary(
    assessment: PerformanceAssessment,
    integration: ProgressIntegration
  ): string {
    return `${assessment.performance === 'excellent' ? 'Mükemmel' : 
            assessment.performance === 'good' ? 'İyi' : 
            assessment.performance === 'satisfactory' ? 'Yeterli' : 'Geliştirilmeli'} performans! ` +
           `${assessment.overallScore.toFixed(1)}% skor ile ${integration.xpEarned} XP kazandınız.`;
  }

  private generateDetails(assessment: PerformanceAssessment): string[] {
    return [
      `Doğruluk: ${assessment.accuracy.toFixed(1)}%`,
      `Verimlilik: ${assessment.efficiency.toFixed(1)}%`,
      `Tamamlanma: ${assessment.completeness.toFixed(1)}%`,
      `Güçlü yönler: ${assessment.strengths.join(', ') || 'Henüz belirlenmedi'}`,
      `Gelişim alanları: ${assessment.weaknesses.join(', ') || 'Yok'}`
    ];
  }

  private generateRecommendations(assessment: PerformanceAssessment): string[] {
    return assessment.suggestions
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, 3)
      .map(s => s.suggestion);
  }

  private generateNextActions(integration: ProgressIntegration): string[] {
    const actions: string[] = [];

    if (integration.nextRecommended.length > 0) {
      actions.push(`Sonraki simülasyon: ${integration.nextRecommended[0]}`);
    }

    if (integration.milestonesReached.length > 0) {
      actions.push('Başarılarınızı portföyünüze ekleyin');
    }

    actions.push('Buddy\'nizle deneyimlerinizi paylaşın');

    return actions;
  }
}

// Export singleton instance
export const assessmentEngine = new AssessmentEngine();
