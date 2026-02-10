/**
 * Simulation Engine - Interactive Learning System
 * 
 * Provides 36+ interactive simulations with immediate feedback,
 * collaborative exercises, performance assessment, and portfolio integration.
 */

import { MockUser } from '../mock-data/types';

// Simulation Types
export type SimulationType = 
  | 'scenario' // Real-world decision-making scenarios
  | 'coding' // Interactive coding challenges
  | 'design' // UI/UX design simulations
  | 'data' // Data analysis simulations
  | 'business' // Business strategy simulations
  | 'social'; // Social impact simulations

export type SimulationDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type SimulationStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';

// Simulation Definition
export interface Simulation {
  id: string;
  title: string;
  description: string;
  type: SimulationType;
  difficulty: SimulationDifficulty;
  phase: 'kesif' | 'insa' | 'etki';
  sdgAlignment: number[];
  estimatedMinutes: number;
  xpReward: number;
  gdrReward: number;
  
  // Learning objectives
  objectives: string[];
  skills: string[];
  prerequisites: string[];
  
  // Simulation content
  scenario: string;
  initialState: any;
  steps: SimulationStep[];
  
  // Collaboration
  supportsCollaboration: boolean;
  maxParticipants: number;
  
  // Assessment
  passingScore: number;
  assessmentCriteria: AssessmentCriterion[];
}

export interface SimulationStep {
  id: string;
  title: string;
  description: string;
  type: 'decision' | 'input' | 'analysis' | 'reflection';
  options?: StepOption[];
  expectedAnswer?: any;
  feedback: {
    correct: string;
    incorrect: string;
    hint: string;
  };
  points: number;
}

export interface StepOption {
  id: string;
  label: string;
  description?: string;
  isCorrect: boolean;
  impact: string;
  points: number;
}

export interface AssessmentCriterion {
  id: string;
  name: string;
  description: string;
  weight: number; // 0-1
  maxScore: number;
}

// Simulation Session
export interface SimulationSession {
  id: string;
  simulationId: string;
  userId: string;
  participants: string[]; // For collaborative sessions
  status: SimulationStatus;
  startedAt: Date;
  completedAt?: Date;
  
  // Progress
  currentStep: number;
  totalSteps: number;
  responses: SimulationResponse[];
  
  // Scoring
  score: number;
  maxScore: number;
  criteriaScores: Record<string, number>;
  
  // Feedback
  feedback: SessionFeedback;
  improvementAreas: string[];
  strengths: string[];
}

export interface SimulationResponse {
  stepId: string;
  answer: any;
  isCorrect: boolean;
  points: number;
  timeSpent: number; // seconds
  attempts: number;
}

export interface SessionFeedback {
  overall: string;
  performance: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement';
  detailedFeedback: string[];
  nextSteps: string[];
  relatedContent: string[];
}

// Simulation Result
export interface SimulationResult {
  session: SimulationSession;
  passed: boolean;
  xpEarned: number;
  gdrEarned: number;
  badges: string[];
  portfolioEntry: PortfolioEntry;
  recommendations: string[];
}

export interface PortfolioEntry {
  simulationId: string;
  title: string;
  description: string;
  completedAt: Date;
  score: number;
  skills: string[];
  evidence: {
    type: 'screenshot' | 'code' | 'document' | 'analysis';
    content: any;
  }[];
}

/**
 * Simulation Engine Class
 */
export class SimulationEngine {
  private simulations: Map<string, Simulation> = new Map();
  private sessions: Map<string, SimulationSession> = new Map();

  constructor() {
    this.initializeSimulations();
  }

  /**
   * Initialize all 36+ simulations
   */
  private initializeSimulations(): void {
    const simulations = this.createAllSimulations();
    simulations.forEach(sim => this.simulations.set(sim.id, sim));
  }

  /**
   * Get all simulations
   */
  getAllSimulations(): Simulation[] {
    return Array.from(this.simulations.values());
  }

  /**
   * Get simulations by filter
   */
  getSimulations(filter: {
    type?: SimulationType;
    difficulty?: SimulationDifficulty;
    phase?: 'kesif' | 'insa' | 'etki';
    sdg?: number;
  }): Simulation[] {
    return this.getAllSimulations().filter(sim => {
      if (filter.type && sim.type !== filter.type) return false;
      if (filter.difficulty && sim.difficulty !== filter.difficulty) return false;
      if (filter.phase && sim.phase !== filter.phase) return false;
      if (filter.sdg && !sim.sdgAlignment.includes(filter.sdg)) return false;
      return true;
    });
  }

  /**
   * Get simulation by ID
   */
  getSimulation(id: string): Simulation | undefined {
    return this.simulations.get(id);
  }

  /**
   * Start a new simulation session
   */
  startSession(
    simulationId: string,
    userId: string,
    participants: string[] = []
  ): SimulationSession {
    const simulation = this.simulations.get(simulationId);
    if (!simulation) {
      throw new Error(`Simulation ${simulationId} not found`);
    }

    const session: SimulationSession = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      simulationId,
      userId,
      participants: [userId, ...participants],
      status: 'in_progress',
      startedAt: new Date(),
      currentStep: 0,
      totalSteps: simulation.steps.length,
      responses: [],
      score: 0,
      maxScore: simulation.steps.reduce((sum, step) => sum + step.points, 0),
      criteriaScores: {},
      feedback: {
        overall: '',
        performance: 'satisfactory',
        detailedFeedback: [],
        nextSteps: [],
        relatedContent: []
      },
      improvementAreas: [],
      strengths: []
    };

    this.sessions.set(session.id, session);
    return session;
  }

  /**
   * Submit response for current step
   */
  submitResponse(
    sessionId: string,
    stepId: string,
    answer: any,
    timeSpent: number
  ): {
    isCorrect: boolean;
    feedback: string;
    points: number;
    canProceed: boolean;
  } {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const simulation = this.simulations.get(session.simulationId);
    if (!simulation) {
      throw new Error(`Simulation ${session.simulationId} not found`);
    }

    const step = simulation.steps.find(s => s.id === stepId);
    if (!step) {
      throw new Error(`Step ${stepId} not found`);
    }

    // Evaluate response
    const isCorrect = this.evaluateResponse(step, answer);
    const points = isCorrect ? step.points : Math.floor(step.points * 0.3);

    // Record response
    const response: SimulationResponse = {
      stepId,
      answer,
      isCorrect,
      points,
      timeSpent,
      attempts: 1
    };

    session.responses.push(response);
    session.score += points;
    session.currentStep++;

    // Update session
    this.sessions.set(sessionId, session);

    return {
      isCorrect,
      feedback: isCorrect ? step.feedback.correct : step.feedback.incorrect,
      points,
      canProceed: true
    };
  }

  /**
   * Complete simulation session
   */
  completeSession(sessionId: string): SimulationResult {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const simulation = this.simulations.get(session.simulationId);
    if (!simulation) {
      throw new Error(`Simulation ${session.simulationId} not found`);
    }

    // Mark as completed
    session.status = 'completed';
    session.completedAt = new Date();

    // Calculate final score percentage
    const scorePercentage = (session.score / session.maxScore) * 100;
    const passed = scorePercentage >= simulation.passingScore;

    // Generate feedback
    session.feedback = this.generateFeedback(session, simulation, scorePercentage);

    // Calculate rewards
    const xpMultiplier = passed ? 1 : 0.5;
    const xpEarned = Math.floor(simulation.xpReward * xpMultiplier);
    const gdrEarned = passed ? simulation.gdrReward : 0;

    // Generate portfolio entry
    const portfolioEntry = this.generatePortfolioEntry(session, simulation);

    // Generate recommendations
    const recommendations = this.generateRecommendations(session, simulation);

    // Award badges
    const badges = this.awardBadges(session, simulation, scorePercentage);

    this.sessions.set(sessionId, session);

    return {
      session,
      passed,
      xpEarned,
      gdrEarned,
      badges,
      portfolioEntry,
      recommendations
    };
  }

  /**
   * Get session by ID
   */
  getSession(sessionId: string): SimulationSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Get user's simulation history
   */
  getUserHistory(userId: string): SimulationSession[] {
    return Array.from(this.sessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  }

  /**
   * Get user's simulation statistics
   */
  getUserStats(userId: string): {
    totalCompleted: number;
    totalXP: number;
    averageScore: number;
    byType: Record<SimulationType, number>;
    byDifficulty: Record<SimulationDifficulty, number>;
    strengths: string[];
    improvementAreas: string[];
  } {
    const history = this.getUserHistory(userId);
    const completed = history.filter(s => s.status === 'completed');

    const stats = {
      totalCompleted: completed.length,
      totalXP: 0,
      averageScore: 0,
      byType: {} as Record<SimulationType, number>,
      byDifficulty: {} as Record<SimulationDifficulty, number>,
      strengths: [] as string[],
      improvementAreas: [] as string[]
    };

    if (completed.length === 0) return stats;

    // Calculate stats
    let totalScore = 0;
    const strengthsMap = new Map<string, number>();
    const improvementMap = new Map<string, number>();

    completed.forEach(session => {
      const simulation = this.simulations.get(session.simulationId);
      if (!simulation) return;

      // Score
      const scorePercentage = (session.score / session.maxScore) * 100;
      totalScore += scorePercentage;

      // Type
      stats.byType[simulation.type] = (stats.byType[simulation.type] || 0) + 1;

      // Difficulty
      stats.byDifficulty[simulation.difficulty] = 
        (stats.byDifficulty[simulation.difficulty] || 0) + 1;

      // Strengths and improvements
      session.strengths.forEach(s => {
        strengthsMap.set(s, (strengthsMap.get(s) || 0) + 1);
      });
      session.improvementAreas.forEach(i => {
        improvementMap.set(i, (improvementMap.get(i) || 0) + 1);
      });
    });

    stats.averageScore = totalScore / completed.length;
    stats.strengths = Array.from(strengthsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill]) => skill);
    stats.improvementAreas = Array.from(improvementMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([area]) => area);

    return stats;
  }

  // Private helper methods

  private evaluateResponse(step: SimulationStep, answer: any): boolean {
    if (step.type === 'decision' && step.options) {
      const selectedOption = step.options.find(opt => opt.id === answer);
      return selectedOption?.isCorrect || false;
    }

    if (step.expectedAnswer) {
      return JSON.stringify(answer) === JSON.stringify(step.expectedAnswer);
    }

    return false;
  }

  private generateFeedback(
    session: SimulationSession,
    simulation: Simulation,
    scorePercentage: number
  ): SessionFeedback {
    let performance: SessionFeedback['performance'];
    if (scorePercentage >= 90) performance = 'excellent';
    else if (scorePercentage >= 75) performance = 'good';
    else if (scorePercentage >= 60) performance = 'satisfactory';
    else performance = 'needs_improvement';

    const detailedFeedback: string[] = [];
    const nextSteps: string[] = [];

    // Analyze responses
    const correctCount = session.responses.filter(r => r.isCorrect).length;
    const totalCount = session.responses.length;

    detailedFeedback.push(
      `${correctCount}/${totalCount} adımı doğru tamamladınız (${scorePercentage.toFixed(1)}%)`
    );

    if (performance === 'excellent') {
      detailedFeedback.push('Mükemmel performans! Tüm kavramları çok iyi anladınız.');
      nextSteps.push('Daha zor simülasyonlara geçebilirsiniz');
    } else if (performance === 'good') {
      detailedFeedback.push('İyi bir performans sergiledini. Bazı alanlarda gelişme fırsatı var.');
      nextSteps.push('Benzer simülasyonları tekrar ederek pekiştirebilirsiniz');
    } else {
      detailedFeedback.push('Temel kavramları anladınız ama pratik yapmanız gerekiyor.');
      nextSteps.push('İlgili MicroLab modüllerini tekrar gözden geçirin');
      nextSteps.push('Buddy\'nizle birlikte pratik yapın');
    }

    return {
      overall: detailedFeedback[0],
      performance,
      detailedFeedback,
      nextSteps,
      relatedContent: []
    };
  }

  private generatePortfolioEntry(
    session: SimulationSession,
    simulation: Simulation
  ): PortfolioEntry {
    return {
      simulationId: simulation.id,
      title: simulation.title,
      description: `${simulation.description} - Skor: ${((session.score / session.maxScore) * 100).toFixed(1)}%`,
      completedAt: session.completedAt || new Date(),
      score: (session.score / session.maxScore) * 100,
      skills: simulation.skills,
      evidence: [
        {
          type: 'document',
          content: {
            responses: session.responses.length,
            correctAnswers: session.responses.filter(r => r.isCorrect).length,
            totalTime: session.responses.reduce((sum, r) => sum + r.timeSpent, 0)
          }
        }
      ]
    };
  }

  private generateRecommendations(
    session: SimulationSession,
    simulation: Simulation
  ): string[] {
    const recommendations: string[] = [];
    const scorePercentage = (session.score / session.maxScore) * 100;

    if (scorePercentage >= 80) {
      recommendations.push(`Bir sonraki ${simulation.type} simülasyonuna geçebilirsiniz`);
      recommendations.push('Daha zor seviyeye hazırsınız');
    } else {
      recommendations.push('İlgili MicroLab modüllerini tekrar edin');
      recommendations.push('Buddy\'nizle birlikte pratik yapın');
    }

    return recommendations;
  }

  private awardBadges(
    session: SimulationSession,
    simulation: Simulation,
    scorePercentage: number
  ): string[] {
    const badges: string[] = [];

    if (scorePercentage === 100) {
      badges.push('perfect-simulation');
    } else if (scorePercentage >= 90) {
      badges.push('simulation-master');
    }

    if (session.participants.length > 1) {
      badges.push('collaborative-learner');
    }

    return badges;
  }

  private createAllSimulations(): Simulation[] {
    // Import simulations from content file
    // This is done dynamically to avoid circular dependencies
    return [];
  }
}

/**
 * Initialize simulation engine with content
 */
export function initializeSimulationEngine(simulations: Simulation[]): void {
  simulations.forEach(sim => {
    (simulationEngine as any).simulations.set(sim.id, sim);
  });
}

// Export singleton instance
export const simulationEngine = new SimulationEngine();
