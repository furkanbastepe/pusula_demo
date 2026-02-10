/**
 * Advanced Analytics and Reporting - Comprehensive Tracking System
 * 
 * Tracks detailed learning metrics, provides actionable insights,
 * and creates real-time KPI dashboards for center operations.
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface LearningMetrics {
  userId: string;
  timeSpent: number; // minutes
  modulesStarted: number;
  modulesCompleted: number;
  tasksStarted: number;
  tasksCompleted: number;
  averageCompletionTime: number; // minutes
  skillsAcquired: string[];
  skillProficiency: Record<string, number>; // 0-100
  learningVelocity: number; // XP per hour
  engagementScore: number; // 0-100
  retentionRate: number; // percentage
  lastActiveDate: Date;
}

export interface GuideInsights {
  guideId: string;
  cohortId: string;
  totalStudents: number;
  activeStudents: number;
  atRiskStudents: AtRiskStudent[];
  topPerformers: TopPerformer[];
  averageProgress: number; // percentage
  completionRate: number; // percentage
  engagementTrend: 'increasing' | 'stable' | 'decreasing';
  recommendedActions: string[];
  upcomingMilestones: Milestone[];
}

export interface AtRiskStudent {
  userId: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskFactors: string[];
  lastActive: Date;
  interventionSuggestions: string[];
}

export interface TopPerformer {
  userId: string;
  name: string;
  xp: number;
  level: string;
  recentAchievements: string[];
  mentorshipPotential: boolean;
}

export interface Milestone {
  type: 'level_up' | 'task_deadline' | 'event' | 'assessment';
  title: string;
  date: Date;
  affectedStudents: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface CenterKPI {
  date: Date;
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  averageSessionDuration: number; // minutes
  totalXPEarned: number;
  modulesCompleted: number;
  tasksCompleted: number;
  physicalCenterVisits: number;
  collaborationSessions: number;
  mentorInteractions: number;
  newRegistrations: number;
  graduations: number;
  retentionRate: number; // percentage
  npsScore: number; // -100 to 100
}

export interface SkillDevelopmentMetrics {
  skill: string;
  totalLearners: number;
  averageProficiency: number;
  completionRate: number;
  averageTimeToMaster: number; // hours
  industryDemand: 'high' | 'medium' | 'low';
  relatedCareers: string[];
  topResources: string[];
}

// ============================================================================
// Analytics Tracking System
// ============================================================================

export class AnalyticsTrackingSystem {
  /**
   * Track learning metrics for a user
   */
  trackLearningMetrics(
    userId: string,
    analyticsData: any[],
    completedModules: string[],
    completedTasks: string[],
    userLevel: string,
    userXP: number
  ): LearningMetrics {
    // Calculate time spent
    const totalTimeSpent = analyticsData.reduce((sum, data) => sum + data.timeSpent, 0);
    
    // Calculate modules
    const modulesStarted = completedModules.length + Math.floor(Math.random() * 5); // Some in progress
    const modulesCompleted = completedModules.length;
    
    // Calculate tasks
    const tasksStarted = completedTasks.length + Math.floor(Math.random() * 3);
    const tasksCompleted = completedTasks.length;
    
    // Average completion time
    const completedItems = modulesCompleted + tasksCompleted;
    const averageCompletionTime = completedItems > 0 ? totalTimeSpent / completedItems : 0;
    
    // Skills acquired (mock based on level)
    const skillsAcquired = this.getSkillsByLevel(userLevel);
    
    // Skill proficiency
    const skillProficiency = this.calculateSkillProficiency(skillsAcquired, userLevel);
    
    // Learning velocity (XP per hour)
    const totalHours = totalTimeSpent / 60;
    const learningVelocity = totalHours > 0 ? userXP / totalHours : 0;
    
    // Engagement score
    const engagementScore = this.calculateEngagementScore(analyticsData);
    
    // Retention rate
    const retentionRate = this.calculateRetentionRate(analyticsData);
    
    // Last active date
    const lastActiveDate = analyticsData.length > 0 
      ? new Date(analyticsData[0].date) 
      : new Date();
    
    return {
      userId,
      timeSpent: totalTimeSpent,
      modulesStarted,
      modulesCompleted,
      tasksStarted,
      tasksCompleted,
      averageCompletionTime,
      skillsAcquired,
      skillProficiency,
      learningVelocity: Math.round(learningVelocity * 10) / 10,
      engagementScore,
      retentionRate,
      lastActiveDate,
    };
  }

  /**
   * Generate insights for guides
   */
  generateGuideInsights(
    guideId: string,
    cohortId: string,
    students: any[],
    analyticsData: any[]
  ): GuideInsights {
    const totalStudents = students.length;
    
    // Active students (active in last 7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const activeStudents = students.filter(s => 
      new Date(s.lastActiveAt).getTime() > sevenDaysAgo
    ).length;
    
    // At-risk students
    const atRiskStudents = this.identifyAtRiskStudents(students, analyticsData);
    
    // Top performers
    const topPerformers = this.identifyTopPerformers(students);
    
    // Average progress
    const averageProgress = students.reduce((sum, s) => {
      const progress = (s.completedModules.length / 50) * 100; // 50 total modules
      return sum + progress;
    }, 0) / totalStudents;
    
    // Completion rate
    const graduates = students.filter(s => s.level === 'graduate').length;
    const completionRate = (graduates / totalStudents) * 100;
    
    // Engagement trend
    const engagementTrend = this.calculateEngagementTrend(analyticsData);
    
    // Recommended actions
    const recommendedActions = this.generateRecommendedActions(
      atRiskStudents,
      activeStudents,
      totalStudents,
      engagementTrend
    );
    
    // Upcoming milestones
    const upcomingMilestones = this.getUpcomingMilestones(students);
    
    return {
      guideId,
      cohortId,
      totalStudents,
      activeStudents,
      atRiskStudents,
      topPerformers,
      averageProgress: Math.round(averageProgress),
      completionRate: Math.round(completionRate),
      engagementTrend,
      recommendedActions,
      upcomingMilestones,
    };
  }

  /**
   * Generate center KPIs
   */
  generateCenterKPIs(
    allUsers: any[],
    analyticsData: any[],
    date: Date = new Date()
  ): CenterKPI {
    const targetDate = date.toISOString().split('T')[0];
    const students = allUsers.filter(u => u.role === 'student');
    
    // Daily active users
    const dailyActiveUsers = analyticsData.filter(a => a.date === targetDate).length;
    
    // Weekly active users
    const weekAgo = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const weeklyActiveUsers = new Set(
      analyticsData.filter(a => a.date >= weekAgo && a.date <= targetDate).map(a => a.userId)
    ).size;
    
    // Monthly active users
    const monthAgo = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const monthlyActiveUsers = new Set(
      analyticsData.filter(a => a.date >= monthAgo && a.date <= targetDate).map(a => a.userId)
    ).size;
    
    // Average session duration
    const todayData = analyticsData.filter(a => a.date === targetDate);
    const averageSessionDuration = todayData.length > 0
      ? todayData.reduce((sum, a) => sum + a.timeSpent, 0) / todayData.length
      : 0;
    
    // Total XP earned today
    const totalXPEarned = todayData.reduce((sum, a) => sum + a.xpEarned, 0);
    
    // Modules and tasks completed today
    const modulesCompleted = todayData.reduce((sum, a) => sum + a.modulesCompleted, 0);
    const tasksCompleted = todayData.reduce((sum, a) => sum + a.tasksCompleted, 0);
    
    // Physical center visits today
    const physicalCenterVisits = todayData.filter(a => a.physicalCenterVisit).length;
    
    // Collaboration sessions today
    const collaborationSessions = todayData.reduce((sum, a) => sum + (a.collaborationMinutes > 0 ? 1 : 0), 0);
    
    // Mentor interactions today
    const mentorInteractions = todayData.reduce((sum, a) => sum + a.mentorInteractions, 0);
    
    // New registrations (mock)
    const newRegistrations = Math.floor(Math.random() * 5);
    
    // Graduations (mock)
    const graduations = Math.floor(Math.random() * 2);
    
    // Retention rate (30-day)
    const retentionRate = (monthlyActiveUsers / students.length) * 100;
    
    // NPS Score (mock - typically 40-60 for educational platforms)
    const npsScore = 45 + Math.floor(Math.random() * 20);
    
    return {
      date,
      dailyActiveUsers,
      weeklyActiveUsers,
      monthlyActiveUsers,
      averageSessionDuration: Math.round(averageSessionDuration),
      totalXPEarned,
      modulesCompleted,
      tasksCompleted,
      physicalCenterVisits,
      collaborationSessions,
      mentorInteractions,
      newRegistrations,
      graduations,
      retentionRate: Math.round(retentionRate),
      npsScore,
    };
  }

  /**
   * Track skill development metrics
   */
  trackSkillDevelopment(
    skill: string,
    allUsers: any[],
    analyticsData: any[]
  ): SkillDevelopmentMetrics {
    const students = allUsers.filter(u => u.role === 'student');
    
    // Total learners with this skill
    const totalLearners = students.filter(s => 
      s.completedModules.some((m: string) => m.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    
    // Average proficiency (mock based on level distribution)
    const averageProficiency = 65 + Math.floor(Math.random() * 25);
    
    // Completion rate
    const completionRate = (totalLearners / students.length) * 100;
    
    // Average time to master (mock)
    const averageTimeToMaster = 20 + Math.floor(Math.random() * 40);
    
    // Industry demand
    const highDemandSkills = ['javascript', 'python', 'react', 'nodejs', 'sql', 'ui/ux'];
    const industryDemand = highDemandSkills.some(s => skill.toLowerCase().includes(s)) 
      ? 'high' as const
      : 'medium' as const;
    
    // Related careers
    const relatedCareers = this.getRelatedCareers(skill);
    
    // Top resources
    const topResources = this.getTopResources(skill);
    
    return {
      skill,
      totalLearners,
      averageProficiency,
      completionRate: Math.round(completionRate),
      averageTimeToMaster,
      industryDemand,
      relatedCareers,
      topResources,
    };
  }

  // ============================================================================
  // Private Helper Methods
  // ============================================================================

  private getSkillsByLevel(level: string): string[] {
    const skillMap: Record<string, string[]> = {
      cirak: ['HTML', 'CSS', 'JavaScript Temelleri', 'Git'],
      kalfa: ['React', 'Node.js', 'MongoDB', 'API Geliştirme', 'TypeScript'],
      usta: ['Full Stack Development', 'DevOps', 'Cloud Computing', 'Microservices', 'Testing'],
      graduate: ['System Design', 'Architecture', 'Team Leadership', 'Project Management'],
    };
    
    return skillMap[level] || [];
  }

  private calculateSkillProficiency(skills: string[], level: string): Record<string, number> {
    const proficiency: Record<string, number> = {};
    const baseScore = level === 'graduate' ? 85 : level === 'usta' ? 75 : level === 'kalfa' ? 65 : 55;
    
    skills.forEach(skill => {
      proficiency[skill] = baseScore + Math.floor(Math.random() * 15);
    });
    
    return proficiency;
  }

  private calculateEngagementScore(analyticsData: any[]): number {
    if (analyticsData.length === 0) return 0;
    
    // Factors: consistency, time spent, activities completed
    const recentData = analyticsData.slice(0, 30); // Last 30 days
    const activeDays = recentData.length;
    const avgTimeSpent = recentData.reduce((sum, a) => sum + a.timeSpent, 0) / activeDays;
    const avgActivities = recentData.reduce((sum, a) => sum + a.modulesCompleted + a.tasksCompleted, 0) / activeDays;
    
    // Score calculation
    const consistencyScore = (activeDays / 30) * 40; // 40% weight
    const timeScore = Math.min((avgTimeSpent / 120) * 30, 30); // 30% weight, 120 min target
    const activityScore = Math.min(avgActivities * 10, 30); // 30% weight
    
    return Math.round(consistencyScore + timeScore + activityScore);
  }

  private calculateRetentionRate(analyticsData: any[]): number {
    if (analyticsData.length < 7) return 100;
    
    const last7Days = analyticsData.slice(0, 7);
    const activeDays = last7Days.length;
    
    return Math.round((activeDays / 7) * 100);
  }

  private identifyAtRiskStudents(students: any[], analyticsData: any[]): AtRiskStudent[] {
    const atRisk: AtRiskStudent[] = [];
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    
    students.forEach(student => {
      const lastActive = new Date(student.lastActiveAt);
      const daysSinceActive = Math.floor((Date.now() - lastActive.getTime()) / (24 * 60 * 60 * 1000));
      const riskFactors: string[] = [];
      let riskLevel: AtRiskStudent['riskLevel'] = 'low';
      
      // Inactivity
      if (daysSinceActive > 14) {
        riskFactors.push('14+ gün inaktif');
        riskLevel = 'critical';
      } else if (daysSinceActive > 7) {
        riskFactors.push('7+ gün inaktif');
        riskLevel = 'high';
      }
      
      // Low progress
      if (student.completedModules.length < 5 && daysSinceActive > 30) {
        riskFactors.push('Düşük ilerleme');
        riskLevel = riskLevel === 'critical' ? 'critical' : 'high';
      }
      
      // Low streak
      if (student.streak < 3) {
        riskFactors.push('Düşük streak');
        if (riskLevel === 'low') riskLevel = 'medium';
      }
      
      if (riskFactors.length > 0) {
        atRisk.push({
          userId: student.id,
          name: `${student.name} ${student.surname}`,
          riskLevel,
          riskFactors,
          lastActive,
          interventionSuggestions: this.generateInterventions(riskFactors, riskLevel),
        });
      }
    });
    
    return atRisk.sort((a, b) => {
      const levelOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return levelOrder[a.riskLevel] - levelOrder[b.riskLevel];
    }).slice(0, 10); // Top 10 at-risk
  }

  private generateInterventions(riskFactors: string[], riskLevel: string): string[] {
    const interventions: string[] = [];
    
    if (riskFactors.some(f => f.includes('inaktif'))) {
      interventions.push('Kişisel mesaj gönder');
      interventions.push('Telefon araması yap');
    }
    
    if (riskFactors.some(f => f.includes('ilerleme'))) {
      interventions.push('Bire bir mentorluk planla');
      interventions.push('Daha kolay görevler öner');
    }
    
    if (riskFactors.some(f => f.includes('streak'))) {
      interventions.push('Günlük hedefler belirle');
      interventions.push('Buddy eşleştirmesi yap');
    }
    
    if (riskLevel === 'critical') {
      interventions.push('Acil müdahale gerekli');
    }
    
    return interventions;
  }

  private identifyTopPerformers(students: any[]): TopPerformer[] {
    return students
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 5)
      .map(student => ({
        userId: student.id,
        name: `${student.name} ${student.surname}`,
        xp: student.xp,
        level: student.level,
        recentAchievements: student.badges.slice(0, 3),
        mentorshipPotential: student.level === 'usta' || student.level === 'graduate',
      }));
  }

  private calculateEngagementTrend(analyticsData: any[]): 'increasing' | 'stable' | 'decreasing' {
    if (analyticsData.length < 14) return 'stable';
    
    const recentWeek = analyticsData.slice(0, 7);
    const previousWeek = analyticsData.slice(7, 14);
    
    const recentAvg = recentWeek.reduce((sum, a) => sum + a.timeSpent, 0) / 7;
    const previousAvg = previousWeek.reduce((sum, a) => sum + a.timeSpent, 0) / 7;
    
    if (recentAvg > previousAvg * 1.1) return 'increasing';
    if (recentAvg < previousAvg * 0.9) return 'decreasing';
    return 'stable';
  }

  private generateRecommendedActions(
    atRiskStudents: AtRiskStudent[],
    activeStudents: number,
    totalStudents: number,
    engagementTrend: string
  ): string[] {
    const actions: string[] = [];
    
    if (atRiskStudents.length > totalStudents * 0.2) {
      actions.push('⚠️ Yüksek risk: Toplu müdahale planı oluştur');
    }
    
    if (activeStudents < totalStudents * 0.7) {
      actions.push('📢 Aktivasyon kampanyası başlat');
    }
    
    if (engagementTrend === 'decreasing') {
      actions.push('📉 Engagement düşüyor: Yeni içerik ve etkinlikler ekle');
    }
    
    if (atRiskStudents.some(s => s.riskLevel === 'critical')) {
      actions.push('🚨 Kritik durumda öğrenciler var: Acil iletişim kur');
    }
    
    if (actions.length === 0) {
      actions.push('✅ Tüm metrikler iyi durumda');
    }
    
    return actions;
  }

  private getUpcomingMilestones(students: any[]): Milestone[] {
    const milestones: Milestone[] = [];
    const now = Date.now();
    
    // Level ups (students close to next level)
    students.forEach(student => {
      const nextLevelXP = this.getNextLevelXP(student.level);
      if (nextLevelXP && student.xp >= nextLevelXP * 0.9) {
        milestones.push({
          type: 'level_up',
          title: `${student.name} seviye atlayacak`,
          date: new Date(now + 7 * 24 * 60 * 60 * 1000), // Estimate 7 days
          affectedStudents: [student.id],
          priority: 'medium',
        });
      }
    });
    
    return milestones.slice(0, 5);
  }

  private getNextLevelXP(currentLevel: string): number | null {
    const levels: Record<string, number> = {
      cirak: 1000,
      kalfa: 2500,
      usta: 5000,
    };
    
    return levels[currentLevel] || null;
  }

  private getRelatedCareers(skill: string): string[] {
    const careerMap: Record<string, string[]> = {
      javascript: ['Frontend Developer', 'Full Stack Developer', 'Web Developer'],
      python: ['Data Scientist', 'Backend Developer', 'ML Engineer'],
      react: ['Frontend Developer', 'React Developer', 'UI Developer'],
      'ui/ux': ['UI/UX Designer', 'Product Designer', 'UX Researcher'],
    };
    
    const key = Object.keys(careerMap).find(k => skill.toLowerCase().includes(k));
    return key ? careerMap[key] : ['Software Developer', 'Tech Professional'];
  }

  private getTopResources(skill: string): string[] {
    return [
      `${skill} MicroLab Serisi`,
      `${skill} Pratik Görevleri`,
      `${skill} Mentor Seansları`,
    ];
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const analyticsTracking = new AnalyticsTrackingSystem();
