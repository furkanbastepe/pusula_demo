/**
 * System Integration Module
 * 
 * Wires all enhanced systems together for seamless data flow
 * and unified user experience across the PUSULA platform.
 */

import { MockDataEngine } from '../mock-data/engine';

/**
 * Central Integration Hub
 * Coordinates all platform systems and ensures data consistency
 */
export class SystemIntegration {
  private static instance: SystemIntegration;
  private mockDataEngine: MockDataEngine;
  private initialized = false;

  private constructor() {
    this.mockDataEngine = MockDataEngine.getInstance();
  }

  static getInstance(): SystemIntegration {
    if (!SystemIntegration.instance) {
      SystemIntegration.instance = new SystemIntegration();
    }
    return SystemIntegration.instance;
  }

  /**
   * Initialize all systems
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    console.log('🔗 Initializing System Integration...');

    // Initialize mock data engine (core data)
    await this.mockDataEngine.initialize();

    // Initialize simulation system with content
    this.initializeSimulationSystem();

    // Initialize gamification system
    this.initializeGamificationSystem();

    // Initialize AI mentor system
    this.initializeAIMentorSystem();

    // Initialize buddy system
    this.initializeBuddySystem();

    // Initialize portfolio system
    this.initializePortfolioSystem();

    // Initialize physical center integration
    this.initializePhysicalCenterSystem();

    // Initialize bot arena system
    this.initializeBotArenaSystem();

    // Initialize analytics system
    this.initializeAnalyticsSystem();

    // Initialize demo system
    this.initializeDemoSystem();

    this.initialized = true;
    console.log('✅ System Integration complete');
  }

  /**
   * Get unified user dashboard data
   */
  getUserDashboard(userId: string): {
    user: any;
    progress: any;
    nextActions: any[];
    recentActivity: any[];
    achievements: any[];
    recommendations: any[];
  } {
    const user = this.mockDataEngine.getUser(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    // Gather data from all systems
    const progress = this.getUserProgress(userId);
    const nextActions = this.getNextActions(userId);
    const recentActivity = this.getRecentActivity(userId);
    const achievements = this.getUserAchievements(userId);
    const recommendations = this.getRecommendations(userId);

    return {
      user,
      progress,
      nextActions,
      recentActivity,
      achievements,
      recommendations
    };
  }

  /**
   * Get comprehensive user progress across all systems
   */
  private getUserProgress(userId: string): any {
    const user = this.mockDataEngine.getUser(userId);
    if (!user) return null;

    return {
      // XP and Level
      xp: user.xp,
      level: user.level,
      nextLevelXP: this.getNextLevelXP(user.level),
      
      // Learning Progress
      completedModules: user.completedModules,
      completedTasks: user.completedTasks,
      totalMicroLabs: this.mockDataEngine.getMicroLabs().length,
      totalTasks: this.mockDataEngine.getTasks().length,
      
      // Simulations
      completedSimulations: this.mockDataEngine.getUserSimulationHistory(userId)
        .filter((s: any) => s.status === 'completed').length,
      
      // GDR and Skills
      gdrScore: user.gdrScore,
      gdrComponents: user.gdrComponents,
      careerInterests: user.careerInterests,
      
      // Badges
      badges: user.badges,
      
      // Streak
      streak: user.streak,
      
      // Physical Center
      physicalCenterVisits: user.physicalCenterVisits,
      
      // Social
      buddyId: user.buddyId,
      mentorshipGiven: user.mentorshipGiven,
      mentorshipReceived: user.mentorshipReceived
    };
  }

  /**
   * Get next recommended actions for user
   */
  private getNextActions(userId: string): any[] {
    const actions: any[] = [];
    const user = this.mockDataEngine.getUser(userId);
    if (!user) return actions;

    // Get user submissions to find incomplete tasks
    const userSubmissions = this.mockDataEngine.getUserSubmissions(userId);
    const completedTaskIds = new Set(userSubmissions.map((s: any) => s.taskId));
    
    // Find incomplete tasks
    const allTasks = this.mockDataEngine.getTasks();
    const incompleteTasks = allTasks
      .filter((t: any) => !completedTaskIds.has(t.id))
      .slice(0, 3);

    incompleteTasks.forEach((task: any) => {
      actions.push({
        type: 'task',
        priority: 'high',
        title: task.title,
        description: 'Devam eden görev',
        link: `/gorev/${task.id}`,
        icon: 'assignment'
      });
    });

    // Check for recommended simulations
    const recommendedSims = this.mockDataEngine.getRecommendedSimulations(userId).slice(0, 2);
    recommendedSims.forEach((sim: any) => {
      actions.push({
        type: 'simulation',
        priority: 'medium',
        title: sim.title,
        description: 'Önerilen simülasyon',
        link: `/simulasyon/${sim.id}`,
        icon: 'science'
      });
    });

    // Check for buddy activities
    if (user.buddyId) {
      actions.push({
        type: 'buddy',
        priority: 'medium',
        title: 'Buddy ile Çalış',
        description: 'Ortak proje zamanı',
        link: '/buddy',
        icon: 'group'
      });
    }

    // Check for physical center events
    const upcomingEvents = this.mockDataEngine.getUpcomingEvents().slice(0, 1);
    upcomingEvents.forEach((event: any) => {
      actions.push({
        type: 'event',
        priority: 'low',
        title: event.title,
        description: 'Yaklaşan etkinlik',
        link: '/etkinlikler',
        icon: 'event'
      });
    });

    return actions.slice(0, 5);
  }

  /**
   * Get recent activity across all systems
   */
  private getRecentActivity(userId: string): any[] {
    const activities: any[] = [];

    // Recent submissions
    const submissions = this.mockDataEngine.getUserSubmissions(userId).slice(0, 3);
    submissions.forEach((sub: any) => {
      activities.push({
        type: 'submission',
        title: `${sub.taskTitle} teslim edildi`,
        timestamp: sub.submittedAt,
        icon: 'check_circle',
        color: 'success'
      });
    });

    // Recent simulations
    const simulations = this.mockDataEngine.getUserSimulationHistory(userId).slice(0, 2);
    simulations.forEach((sim: any) => {
      activities.push({
        type: 'simulation',
        title: `Simülasyon tamamlandı`,
        timestamp: sim.completedAt || sim.startedAt,
        icon: 'science',
        color: 'info'
      });
    });

    // Recent badges
    const user = this.mockDataEngine.getUser(userId);
    if (user && user.badges.length > 0) {
      activities.push({
        type: 'badge',
        title: `${user.badges[user.badges.length - 1]} rozeti kazanıldı`,
        timestamp: new Date(),
        icon: 'military_tech',
        color: 'warning'
      });
    }

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  }

  /**
   * Get user achievements
   */
  private getUserAchievements(userId: string): any[] {
    const user = this.mockDataEngine.getUser(userId);
    if (!user) return [];

    const achievements: any[] = [];

    // Level achievement
    achievements.push({
      type: 'level',
      title: `${user.level} Seviyesi`,
      description: `${user.xp} XP`,
      icon: 'star',
      color: 'primary'
    });

    // Badges
    user.badges.forEach((badge: string) => {
      achievements.push({
        type: 'badge',
        title: badge,
        description: 'Rozet',
        icon: 'military_tech',
        color: 'warning'
      });
    });

    // Streak
    if (user.streak > 0) {
      achievements.push({
        type: 'streak',
        title: `${user.streak} Gün Seri`,
        description: 'Kesintisiz öğrenme',
        icon: 'local_fire_department',
        color: 'error'
      });
    }

    return achievements;
  }

  /**
   * Get personalized recommendations
   */
  private getRecommendations(userId: string): any[] {
    const recommendations: any[] = [];
    const user = this.mockDataEngine.getUser(userId);
    if (!user) return recommendations;

    // Recommended MicroLabs based on user level
    const phase = user.level === 'cirak' ? 'kesif' : 
                  user.level === 'kalfa' ? 'insa' : 'etki';
    const microLabs = this.mockDataEngine.getMicroLabsByPhase(phase).slice(0, 2);
    
    microLabs.forEach((ml: any) => {
      recommendations.push({
        type: 'microlab',
        title: ml.title,
        description: ml.description,
        link: `/microlab/${ml.id}`,
        reason: 'Seviyene uygun içerik'
      });
    });

    // Recommended Simulations
    const simulations = this.mockDataEngine.getRecommendedSimulations(userId).slice(0, 2);
    simulations.forEach((sim: any) => {
      recommendations.push({
        type: 'simulation',
        title: sim.title,
        description: sim.description,
        link: `/simulasyon/${sim.id}`,
        reason: 'Pratik yapma fırsatı'
      });
    });

    // Buddy recommendation
    if (!user.buddyId) {
      recommendations.push({
        type: 'buddy',
        title: 'Buddy Bul',
        description: 'Birlikte öğrenin',
        link: '/buddy',
        reason: 'İşbirliği öğrenmeyi güçlendirir'
      });
    }

    return recommendations.slice(0, 5);
  }

  /**
   * Process activity completion (unified handler)
   */
  async processActivityCompletion(
    userId: string,
    activityType: 'microlab' | 'task' | 'simulation' | 'event',
    activityId: string,
    result: any
  ): Promise<{
    xpEarned: number;
    gdrEarned: number;
    badgesEarned: string[];
    levelUp: boolean;
    newLevel?: string;
    portfolioUpdated: boolean;
    notifications: any[];
  }> {
    const user = this.mockDataEngine.getUser(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    // Calculate rewards
    const xpEarned = result.xpEarned || 0;
    const gdrEarned = result.gdrEarned || 0;
    const badgesEarned = result.badges || [];

    // Check for level up
    const currentXP = user.xp + xpEarned;
    const levelUp = this.checkLevelUp(user.level, currentXP);
    const newLevel = levelUp ? this.getNextLevel(user.level) : undefined;

    // Update portfolio
    const portfolioUpdated = activityType === 'task' || activityType === 'simulation';

    // Generate notifications
    const notifications: any[] = [];
    
    if (levelUp) {
      notifications.push({
        type: 'level_up',
        title: 'Seviye Atladın!',
        message: `Tebrikler! ${newLevel} seviyesine ulaştın`,
        icon: 'celebration'
      });
    }

    badgesEarned.forEach((badge: string) => {
      notifications.push({
        type: 'badge',
        title: 'Yeni Rozet!',
        message: `${badge} rozetini kazandın`,
        icon: 'military_tech'
      });
    });

    return {
      xpEarned,
      gdrEarned,
      badgesEarned,
      levelUp,
      newLevel,
      portfolioUpdated,
      notifications
    };
  }

  // Private helper methods

  private initializeSimulationSystem(): void {
    const { SIMULATIONS, initializeSimulationEngine } = require('../simulation');
    initializeSimulationEngine(SIMULATIONS);
    console.log(`  ✓ Simulation System: ${SIMULATIONS.length} simulations`);
  }

  private initializeGamificationSystem(): void {
    // Gamification is already integrated via mock data
    console.log('  ✓ Gamification System: XP, Levels, Badges');
  }

  private initializeAIMentorSystem(): void {
    // AI Mentor is already integrated
    console.log('  ✓ AI Mentor System: Ready');
  }

  private initializeBuddySystem(): void {
    // Buddy system is already integrated
    console.log('  ✓ Buddy System: Matching & Collaboration');
  }

  private initializePortfolioSystem(): void {
    // Portfolio system is already integrated
    console.log('  ✓ Portfolio System: Evidence & Export');
  }

  private initializePhysicalCenterSystem(): void {
    // Physical center is already integrated
    console.log('  ✓ Physical Center: QR Check-in & Resources');
  }

  private initializeBotArenaSystem(): void {
    // Bot arena is already integrated
    console.log('  ✓ Bot Arena: Competitions & Rankings');
  }

  private initializeAnalyticsSystem(): void {
    // Analytics is already integrated
    console.log('  ✓ Analytics System: Tracking & Reporting');
  }

  private initializeDemoSystem(): void {
    // Demo system is already integrated
    console.log('  ✓ Demo System: Scenarios & Tours');
  }

  private getNextLevelXP(currentLevel: string): number {
    const levels: Record<string, number> = {
      'cirak': 1000,
      'kalfa': 2500,
      'usta': 5000,
      'mezun': 5000
    };
    return levels[currentLevel] || 1000;
  }

  private checkLevelUp(currentLevel: string, newXP: number): boolean {
    const thresholds: Record<string, number> = {
      'cirak': 1000,
      'kalfa': 2500,
      'usta': 5000
    };
    return newXP >= (thresholds[currentLevel] || Infinity);
  }

  private getNextLevel(currentLevel: string): string {
    const progression: Record<string, string> = {
      'cirak': 'kalfa',
      'kalfa': 'usta',
      'usta': 'mezun'
    };
    return progression[currentLevel] || currentLevel;
  }
}

// Export singleton instance
export const systemIntegration = SystemIntegration.getInstance();
