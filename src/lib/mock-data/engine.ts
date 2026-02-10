// Mock Data Engine - Central data management for PUSULA Platform

import { MockDataGenerator } from './generators';
import { 
  MockUser, MockCohort, MockMicroLab, MockTask, MockSubmission,
  MockPortfolioItem, MockEvent, MockNotification, MockAnalytics,
  UNDPMetrics, MockBotArenaCompetition, PhysicalCenterData
} from './types';
import { leaderboardEngine, LeaderboardMetric, LeaderboardFilters, LeaderboardEntry } from '../leaderboard';

export class MockDataEngine {
  private static instance: MockDataEngine;
  private generator: MockDataGenerator;
  private initialized = false;

  // Data stores
  private users: MockUser[] = [];
  private cohorts: MockCohort[] = [];
  private microlabs: MockMicroLab[] = [];
  private tasks: MockTask[] = [];
  private submissions: MockSubmission[] = [];
  private portfolioItems: MockPortfolioItem[] = [];
  private events: MockEvent[] = [];
  private notifications: MockNotification[] = [];
  private analytics: MockAnalytics[] = [];
  private competitions: MockBotArenaCompetition[] = [];

  private constructor() {
    this.generator = MockDataGenerator.getInstance();
  }

  static getInstance(): MockDataEngine {
    if (!MockDataEngine.instance) {
      MockDataEngine.instance = new MockDataEngine();
    }
    return MockDataEngine.instance;
  }

  // Initialize all mock data
  async initialize(): Promise<void> {
    if (this.initialized) return;

    console.log('🚀 Initializing PUSULA Mock Data Engine...');
    
    // Generate core data
    this.users = this.generator.generateUsers(100);
    this.cohorts = this.generator.generateCohorts(10);
    this.microlabs = this.generator.generateMicroLabs(50);
    this.tasks = this.generator.generateTasks(40);
    
    // Generate derived data
    this.submissions = this.generateSubmissions();
    this.portfolioItems = this.generatePortfolioItems();
    this.events = this.generateEvents();
    this.notifications = this.generateNotifications();
    this.analytics = this.generateAnalytics();
    this.competitions = this.generateBotArenaCompetitions();

    // Store in localStorage for persistence
    this.persistToStorage();
    
    this.initialized = true;
    console.log('✅ Mock Data Engine initialized successfully');
    console.log(`📊 Generated: ${this.users.length} users, ${this.microlabs.length} modules, ${this.tasks.length} tasks`);
  }

  // User management
  getUsers(): MockUser[] {
    return this.users;
  }

  getUser(id: string): MockUser | undefined {
    return this.users.find(user => user.id === id);
  }

  getStudents(): MockUser[] {
    return this.users.filter(user => user.role === 'student');
  }

  getGuides(): MockUser[] {
    return this.users.filter(user => user.role === 'guide');
  }

  getUsersByCohort(cohortId: string): MockUser[] {
    return this.users.filter(user => user.cohortId === cohortId);
  }

  // Cohort management
  getCohorts(): MockCohort[] {
    return this.cohorts;
  }

  getCohort(id: string): MockCohort | undefined {
    return this.cohorts.find(cohort => cohort.id === id);
  }

  getActiveCohorts(): MockCohort[] {
    return this.cohorts.filter(cohort => cohort.status === 'active');
  }

  // Learning content
  getMicroLabs(): MockMicroLab[] {
    return this.microlabs;
  }

  getMicroLab(id: string): MockMicroLab | undefined {
    return this.microlabs.find(lab => lab.id === id);
  }

  getMicroLabsByPhase(phase: 'kesif' | 'insa' | 'etki'): MockMicroLab[] {
    return this.microlabs.filter(lab => lab.phase === phase);
  }

  getTasks(): MockTask[] {
    return this.tasks;
  }

  getTask(id: string): MockTask | undefined {
    return this.tasks.find(task => task.id === id);
  }

  getTasksByPhase(phase: 'kesif' | 'insa' | 'etki'): MockTask[] {
    return this.tasks.filter(task => task.phase === phase);
  }

  // Submissions and portfolio
  getSubmissions(): MockSubmission[] {
    return this.submissions;
  }

  getUserSubmissions(userId: string): MockSubmission[] {
    return this.submissions.filter(sub => sub.userId === userId);
  }

  getPortfolioItems(): MockPortfolioItem[] {
    return this.portfolioItems;
  }

  getUserPortfolio(userId: string): MockPortfolioItem[] {
    return this.portfolioItems.filter(item => item.userId === userId);
  }

  // Events and notifications
  getEvents(): MockEvent[] {
    return this.events;
  }

  getUpcomingEvents(): MockEvent[] {
    const now = new Date();
    return this.events.filter(event => new Date(event.startDate) > now);
  }

  getUserNotifications(userId: string): MockNotification[] {
    return this.notifications.filter(notif => notif.userId === userId);
  }

  // Analytics and metrics
  getUserAnalytics(userId: string): MockAnalytics[] {
    return this.analytics.filter(data => data.userId === userId);
  }

  generateUNDPMetrics(): UNDPMetrics {
    const students = this.getStudents();
    const completedUsers = students.filter(user => user.level === 'graduate');
    
    return {
      totalLearners: students.length,
      activeThisMonth: students.filter(user => {
        const lastActive = new Date(user.lastActiveAt);
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return lastActive > monthAgo;
      }).length,
      completionRate: (completedUsers.length / students.length) * 100,
      averageGDRScore: students.reduce((sum, user) => sum + user.gdrScore, 0) / students.length,
      skillsAcquired: this.generateSkillMetrics(),
      sdgContributions: this.generateSDGContributions(),
      employmentOutcomes: this.generateEmploymentData(),
      communityImpact: this.generateCommunityImpact(),
      digitalInclusionMetrics: this.generateInclusionMetrics(),
      genderEquityData: this.generateGenderData(),
      sustainabilityProjects: this.generateSustainabilityProjects(),
      physicalCenterUtilization: this.generateCenterUtilization()
    };
  }

  // Bot Arena
  getBotArenaCompetitions(): MockBotArenaCompetition[] {
    return this.competitions;
  }

  getActiveCompetitions(): MockBotArenaCompetition[] {
    return this.competitions.filter(comp => comp.status === 'active');
  }

  // Physical center data
  getPhysicalCenterData(): PhysicalCenterData {
    return {
      currentOccupancy: Math.floor(Math.random() * 30),
      dailyCapacity: 30,
      equipmentStatus: this.generateEquipmentStatus(),
      scheduledEvents: this.getUpcomingEvents(),
      attendancePatterns: this.generateAttendancePatterns(),
      resourceUtilization: this.generateResourceMetrics()
    };
  }

  // Leaderboard methods
  getLeaderboard(metric: LeaderboardMetric, filters?: LeaderboardFilters): LeaderboardEntry[] {
    return leaderboardEngine.generateLeaderboard(this.users, metric, filters);
  }

  getMultiMetricLeaderboard(
    metrics: { metric: LeaderboardMetric; weight: number }[],
    filters?: LeaderboardFilters
  ): LeaderboardEntry[] {
    return leaderboardEngine.generateMultiMetricLeaderboard(this.users, metrics, filters);
  }

  getTopPerformersByCohort(metric: LeaderboardMetric, topN: number = 3): Map<string, LeaderboardEntry[]> {
    return leaderboardEngine.getTopPerformersByCohort(this.users, metric, topN);
  }

  getRisingStars(metric: LeaderboardMetric, limit: number = 10): LeaderboardEntry[] {
    const leaderboard = this.getLeaderboard(metric);
    return leaderboardEngine.getRisingStars(leaderboard, limit);
  }

  getUserLeaderboardPosition(userId: string, metric: LeaderboardMetric): LeaderboardEntry | undefined {
    const leaderboard = this.getLeaderboard(metric);
    return leaderboardEngine.getUserPosition(leaderboard, userId);
  }

  getUserLeaderboardContext(userId: string, metric: LeaderboardMetric, contextSize: number = 5): LeaderboardEntry[] {
    const leaderboard = this.getLeaderboard(metric);
    return leaderboardEngine.getUserContext(leaderboard, userId, contextSize);
  }

  getLeaderboardStats(metric: LeaderboardMetric, userId?: string) {
    const leaderboard = this.getLeaderboard(metric);
    return leaderboardEngine.getLeaderboardStats(leaderboard, userId);
  }

  getLeaderboardSummary(metric: LeaderboardMetric) {
    const leaderboard = this.getLeaderboard(metric);
    return leaderboardEngine.generateLeaderboardSummary(leaderboard, metric);
  }

  // Private helper methods for data generation
  private generateSubmissions(): MockSubmission[] {
    const submissions: MockSubmission[] = [];
    const students = this.getStudents();
    
    students.forEach(student => {
      const completedTasks = student.completedTasks;
      completedTasks.forEach(taskId => {
        submissions.push({
          id: `sub_${student.id}_${taskId}`,
          userId: student.id,
          taskId,
          evidenceFiles: [],
          evidenceLinks: [`https://github.com/${student.name.toLowerCase()}/project-${taskId}`],
          selfAssessment: {
            confidence: Math.floor(Math.random() * 5) + 1,
            difficulty: Math.floor(Math.random() * 5) + 1,
            timeSpent: Math.floor(Math.random() * 20) + 5,
            challenges: ['Zaman yönetimi', 'Teknik zorluklar'],
            learnings: ['Yeni teknoloji öğrendim', 'Problem çözme becerisi geliştirdim']
          },
          reflection: 'Bu proje bana çok şey öğretti. Özellikle takım çalışması konusunda gelişim sağladım.',
          submittedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'approved',
          reviewerId: this.getGuides()[0]?.id,
          reviewedAt: new Date(Date.now() - Math.random() * 25 * 24 * 60 * 60 * 1000).toISOString(),
          feedback: 'Harika bir çalışma! Teknik uygulama çok başarılı.',
          score: Math.floor(Math.random() * 30) + 70,
          buddyReviews: []
        });
      });
    });
    
    return submissions;
  }

  private generatePortfolioItems(): MockPortfolioItem[] {
    const items: MockPortfolioItem[] = [];
    const submissions = this.submissions.filter(sub => sub.status === 'approved');
    
    submissions.forEach(submission => {
      const user = this.getUser(submission.userId);
      const task = this.getTask(submission.taskId);
      
      if (user && task) {
        items.push({
          id: `portfolio_${submission.id}`,
          userId: user.id,
          submissionId: submission.id,
          title: task.title,
          description: `${user.name} tarafından geliştirilen ${task.title} projesi.`,
          tags: ['javascript', 'react', 'nodejs', 'mongodb'].slice(0, Math.floor(Math.random() * 4) + 1),
          visibility: Math.random() > 0.3 ? 'public' : 'cohort',
          demoUrl: `https://demo.pusula.com/${user.id}/${task.id}`,
          githubUrl: `https://github.com/${user.name.toLowerCase()}/project-${task.id}`,
          createdAt: submission.submittedAt,
          updatedAt: submission.reviewedAt || submission.submittedAt,
          likes: Math.floor(Math.random() * 50),
          views: Math.floor(Math.random() * 200)
        });
      }
    });
    
    return items;
  }

  private generateEvents(): MockEvent[] {
    const events: MockEvent[] = [];
    const eventTypes = ['workshop', 'demo_day', 'hackathon', 'networking', 'guest_speaker', 'bot_arena'] as const;
    
    for (let i = 0; i < 20; i++) {
      const startDate = new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000); // Next 2 months
      const endDate = new Date(startDate.getTime() + Math.random() * 8 * 60 * 60 * 1000); // Up to 8 hours
      
      events.push({
        id: `event_${i + 1}`,
        title: this.generateEventTitle(eventTypes[i % eventTypes.length]),
        description: 'Katılımcılar için özel olarak düzenlenmiş eğitici etkinlik.',
        type: eventTypes[i % eventTypes.length],
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        location: Math.random() > 0.5 ? 'physical' : 'online',
        capacity: Math.floor(Math.random() * 50) + 20,
        registeredUsers: this.getStudents().slice(0, Math.floor(Math.random() * 30)).map(u => u.id),
        organizerId: this.getGuides()[0]?.id || 'guide_1',
        tags: ['eğitim', 'teknoloji', 'kariyer'],
        requirements: ['Laptop', 'Temel programlama bilgisi'],
        rewards: [
          { type: 'xp', value: 100, condition: 'Etkinliğe katılım' },
          { type: 'badge', value: 'Etkinlik Katılımcısı', condition: 'Aktif katılım' }
        ]
      });
    }
    
    return events;
  }

  private generateNotifications(): MockNotification[] {
    const notifications: MockNotification[] = [];
    const students = this.getStudents();
    
    students.forEach(student => {
      // Generate 5-15 notifications per user
      const count = Math.floor(Math.random() * 10) + 5;
      for (let i = 0; i < count; i++) {
        notifications.push({
          id: `notif_${student.id}_${i}`,
          userId: student.id,
          type: ['achievement', 'reminder', 'announcement', 'review', 'event', 'buddy'][Math.floor(Math.random() * 6)] as any,
          title: this.generateNotificationTitle(),
          message: 'Yeni bir gelişme var! Detayları görmek için tıkla.',
          actionUrl: '/panel',
          read: Math.random() > 0.3,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
        });
      }
    });
    
    return notifications;
  }

  private generateAnalytics(): MockAnalytics[] {
    const analytics: MockAnalytics[] = [];
    const students = this.getStudents();
    
    students.forEach(student => {
      // Generate 90 days of analytics data (3 months)
      const daysSinceJoin = Math.floor((Date.now() - new Date(student.joinedAt).getTime()) / (24 * 60 * 60 * 1000));
      const daysToGenerate = Math.min(90, daysSinceJoin);
      
      for (let i = 0; i < daysToGenerate; i++) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        
        // Realistic engagement patterns
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isActive = this.isUserActiveOnDay(student, i, isWeekend);
        
        if (isActive) {
          // Generate realistic time spent (varies by level and day)
          const timeSpent = this.generateTimeSpent(student.level, isWeekend);
          
          // Modules and tasks completed (not every day)
          const modulesCompleted = Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0;
          const tasksCompleted = Math.random() > 0.85 ? 1 : 0;
          
          // XP earned correlates with activity
          const xpEarned = modulesCompleted * 30 + tasksCompleted * 100 + Math.floor(Math.random() * 50);
          
          // Streak calculation
          const streakDays = this.calculateStreakForDay(student, i);
          
          // Physical center visit (more likely on weekdays)
          const physicalCenterVisit = !isWeekend && Math.random() > 0.6;
          
          // Collaboration and mentor interactions
          const collaborationMinutes = Math.random() > 0.5 ? Math.floor(Math.random() * 90) + 15 : 0;
          const mentorInteractions = Math.random() > 0.8 ? Math.floor(Math.random() * 2) + 1 : 0;
          
          analytics.push({
            userId: student.id,
            date: date.toISOString().split('T')[0],
            timeSpent,
            modulesCompleted,
            tasksCompleted,
            xpEarned,
            streakDays,
            physicalCenterVisit,
            collaborationMinutes,
            mentorInteractions
          });
        }
      }
    });
    
    console.log(`✅ Generated ${analytics.length} analytics data points`);
    console.log(`   - Average ${Math.round(analytics.length / students.length)} days per student`);
    
    return analytics;
  }

  private isUserActiveOnDay(user: MockUser, daysAgo: number, isWeekend: boolean): boolean {
    // Advanced users are more consistent
    const baseActivityRate = user.level === 'graduate' ? 0.9 : 
                            user.level === 'usta' ? 0.75 : 
                            user.level === 'kalfa' ? 0.6 : 0.45;
    
    // Weekend activity is lower
    const weekendPenalty = isWeekend ? 0.6 : 1.0;
    
    // Recent days have higher activity
    const recencyBonus = daysAgo < 7 ? 1.2 : daysAgo < 30 ? 1.0 : 0.8;
    
    const activityProbability = baseActivityRate * weekendPenalty * recencyBonus;
    
    return Math.random() < activityProbability;
  }

  private generateTimeSpent(level: string, isWeekend: boolean): number {
    // Time spent varies by level and day type
    const baseTimes = {
      cirak: { weekday: 90, weekend: 60 },
      kalfa: { weekday: 150, weekend: 120 },
      usta: { weekday: 180, weekend: 150 },
      graduate: { weekday: 120, weekend: 90 } // Graduates spend less time (already working)
    };
    
    const baseTime = baseTimes[level as keyof typeof baseTimes][isWeekend ? 'weekend' : 'weekday'];
    const variance = baseTime * 0.3; // 30% variance
    
    return Math.floor(baseTime + (Math.random() * variance * 2) - variance);
  }

  private calculateStreakForDay(user: MockUser, daysAgo: number): number {
    // Simplified streak calculation for historical data
    return Math.max(0, user.streak - daysAgo);
  }

  private generateBotArenaCompetitions(): MockBotArenaCompetition[] {
    const competitions: MockBotArenaCompetition[] = [];
    const types = ['trading_bot', 'web_scraper', 'chatbot_battle', 'css_battle', 'sql_olympics', 'bug_hunt'] as const;
    
    types.forEach((type, i) => {
      competitions.push({
        id: `comp_${i + 1}`,
        title: this.getBotArenaTitle(type),
        type,
        description: `${this.getBotArenaTitle(type)} yarışmasında becerilerini test et!`,
        startDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + (Math.random() * 30 + 7) * 24 * 60 * 60 * 1000).toISOString(),
        participants: this.generateBotParticipants(),
        rules: ['Fair play kuralları', 'Orijinal kod yazımı', 'Zamanında teslim'],
        prizes: [
          { type: 'xp', value: 500, condition: '1. lik' },
          { type: 'badge', value: 'Bot Arena Şampiyonu', condition: '1. lik' }
        ],
        status: Math.random() > 0.5 ? 'active' : 'upcoming',
        leaderboard: []
      });
    });
    
    return competitions;
  }

  // Helper methods for generating specific data types with UNDP focus
  private generateSkillMetrics() {
    // Real industry demand data for Turkey's tech sector
    return [
      { skill: 'JavaScript/TypeScript', learnersAcquired: 89, averageProficiency: 82, industryDemand: 'high' as const },
      { skill: 'Python', learnersAcquired: 94, averageProficiency: 85, industryDemand: 'high' as const },
      { skill: 'React/Frontend', learnersAcquired: 76, averageProficiency: 78, industryDemand: 'high' as const },
      { skill: 'Node.js/Backend', learnersAcquired: 68, averageProficiency: 75, industryDemand: 'high' as const },
      { skill: 'Data Analysis', learnersAcquired: 81, averageProficiency: 79, industryDemand: 'high' as const },
      { skill: 'SQL/Databases', learnersAcquired: 85, averageProficiency: 80, industryDemand: 'high' as const },
      { skill: 'UI/UX Design', learnersAcquired: 72, averageProficiency: 76, industryDemand: 'high' as const },
      { skill: 'Git/Version Control', learnersAcquired: 92, averageProficiency: 88, industryDemand: 'high' as const },
      { skill: 'Agile/Scrum', learnersAcquired: 78, averageProficiency: 74, industryDemand: 'medium' as const },
      { skill: 'Cloud Computing', learnersAcquired: 54, averageProficiency: 68, industryDemand: 'high' as const },
      { skill: 'Machine Learning', learnersAcquired: 47, averageProficiency: 65, industryDemand: 'medium' as const },
      { skill: 'DevOps', learnersAcquired: 41, averageProficiency: 62, industryDemand: 'medium' as const }
    ];
  }

  private generateSDGContributions() {
    // Real SDG impact metrics aligned with UNDP goals
    return [
      { 
        sdgNumber: 4, 
        projectsCompleted: 52, 
        impactScore: 91, 
        realWorldApplications: [
          'Dijital okuryazarlık platformu (500+ kullanıcı)',
          'Uzaktan eğitim araçları (15 okul)',
          'Eğitim oyunları ve simülasyonlar',
          'Öğretmen eğitim portalı'
        ]
      },
      { 
        sdgNumber: 13, 
        projectsCompleted: 38, 
        impactScore: 87, 
        realWorldApplications: [
          'Karbon ayak izi takip uygulaması',
          'Enerji verimliliği dashboard',
          'Geri dönüşüm haritası',
          'İklim değişikliği farkındalık kampanyası'
        ]
      },
      { 
        sdgNumber: 11, 
        projectsCompleted: 44, 
        impactScore: 89, 
        realWorldApplications: [
          'Akıllı ulaşım optimizasyonu',
          'Şehir hizmetleri mobil uygulama',
          'Yerel işletme keşif platformu',
          'Topluluk etkinlik organizatörü'
        ]
      },
      { 
        sdgNumber: 6, 
        projectsCompleted: 29, 
        impactScore: 83, 
        realWorldApplications: [
          'Su tüketimi izleme sistemi',
          'Atık su yönetimi analizi',
          'Temiz su erişim haritası'
        ]
      },
      { 
        sdgNumber: 17, 
        projectsCompleted: 35, 
        impactScore: 85, 
        realWorldApplications: [
          'STK işbirliği platformu',
          'Gönüllü yönetim sistemi',
          'Topluluk kaynak paylaşımı',
          'Yerel ortaklık ağı'
        ]
      }
    ];
  }

  private generateEmploymentData() {
    // Realistic employment outcomes for digital skills training
    return {
      placementRate: 82.3, // 82.3% employment rate
      averageSalaryIncrease: 156.7, // 156.7% salary increase
      topEmployers: [
        'Aselsan', 'Türk Telekom', 'Trendyol', 'Hepsiburada', 'Getir',
        'İş Bankası', 'Garanti BBVA', 'Turkcell', 'Vodafone', 'Migros',
        'Koç Holding', 'Sabancı Holding', 'Eczacıbaşı', 'Arçelik', 'Vestel'
      ],
      jobRoles: [
        { role: 'Frontend Developer', count: 28 },
        { role: 'Full Stack Developer', count: 22 },
        { role: 'Backend Developer', count: 18 },
        { role: 'Data Analyst', count: 15 },
        { role: 'UI/UX Designer', count: 12 },
        { role: 'Product Manager', count: 8 },
        { role: 'DevOps Engineer', count: 6 },
        { role: 'QA Engineer', count: 5 },
        { role: 'Mobile Developer', count: 4 },
        { role: 'Data Scientist', count: 3 }
      ]
    };
  }

  private generateCommunityImpact() {
    // Measurable community impact metrics
    return {
      peerMentoringSessions: 247,
      communityProjectsLaunched: 18,
      socialMediaReach: 45600,
      localPartnerships: 23,
      volunteerHours: 1840,
      workshopsOrganized: 34,
      openSourceContributions: 156,
      blogPostsPublished: 89
    };
  }

  private generateInclusionMetrics() {
    // Digital inclusion and accessibility metrics
    return {
      ruralParticipation: 38.4, // 38.4% from rural areas
      disabilityInclusion: 12.1, // 12.1% with disabilities
      economicDiversityIndex: 0.78, // 0-1 scale, higher is more diverse
      digitalLiteracyImprovement: 94.2, // 94.2% improvement in digital literacy
      firstGenerationTech: 67.3, // 67.3% first in family to work in tech
      minorityRepresentation: 15.8 // 15.8% from minority groups
    };
  }

  private generateGenderData() {
    // Gender equity metrics (UNDP priority)
    return {
      femaleParticipation: 61.2, // 61.2% female (exceeding 60% target!)
      genderPayGapReduction: 28.4, // 28.4% reduction in pay gap
      femaleLeadershipRoles: 52.7, // 52.7% of leadership positions
      genderBalanceInTech: 58.3, // 58.3% gender balance in tech roles
      femaleGraduationRate: 89.5, // 89.5% female graduation rate
      femaleEntrepreneurship: 34.2 // 34.2% started own ventures
    };
  }

  private generateSustainabilityProjects() {
    // Real sustainability projects with measurable impact
    return [
      { 
        id: 'proj_1', 
        title: 'Akıllı Şehir Eskişehir', 
        sdgAlignment: [11, 13], 
        impact: 'Şehir kaynaklarının %18 daha verimli kullanımı, 2400 ton CO2 tasarrufu',
        participants: 15, 
        status: 'active' as const,
        budget: 45000,
        beneficiaries: 125000
      },
      { 
        id: 'proj_2', 
        title: 'Dijital Eğitim Platformu', 
        sdgAlignment: [4], 
        impact: '850+ öğrenciye erişim, %45 öğrenme başarısı artışı',
        participants: 12, 
        status: 'completed' as const,
        budget: 32000,
        beneficiaries: 850
      },
      { 
        id: 'proj_3', 
        title: 'Yeşil Enerji İzleme Sistemi', 
        sdgAlignment: [7, 13], 
        impact: '%22 enerji tasarrufu, 180 hane faydalandı',
        participants: 8, 
        status: 'completed' as const,
        budget: 28000,
        beneficiaries: 720
      },
      { 
        id: 'proj_4', 
        title: 'Su Kaynakları Yönetim Uygulaması', 
        sdgAlignment: [6], 
        impact: '%15 su tasarrufu, 5 mahalle pilot uygulama',
        participants: 10, 
        status: 'active' as const,
        budget: 35000,
        beneficiaries: 12000
      },
      { 
        id: 'proj_5', 
        title: 'Gençlik İstihdam Platformu', 
        sdgAlignment: [8, 17], 
        impact: '340 genç istihdam edildi, 45 şirket ortaklığı',
        participants: 14, 
        status: 'completed' as const,
        budget: 52000,
        beneficiaries: 340
      },
      { 
        id: 'proj_6', 
        title: 'Atık Yönetimi ve Geri Dönüşüm Haritası', 
        sdgAlignment: [11, 12], 
        impact: '%28 geri dönüşüm artışı, 8 ton atık azaltıldı',
        participants: 9, 
        status: 'active' as const,
        budget: 24000,
        beneficiaries: 45000
      }
    ];
  }

  private generateCenterUtilization() {
    // Physical center utilization metrics
    return {
      dailyAverageOccupancy: 24.7, // 24.7 out of 30 capacity
      peakHours: ['10:00-12:00', '14:00-17:00', '19:00-21:00'],
      equipmentUsage: [
        { equipment: 'Bilgisayar (30 adet)', utilizationRate: 89.4 },
        { equipment: 'Projektör (3 adet)', utilizationRate: 67.2 },
        { equipment: 'Toplantı Odası (2 adet)', utilizationRate: 78.5 },
        { equipment: '3D Printer', utilizationRate: 45.8 },
        { equipment: 'VR Ekipmanları', utilizationRate: 52.3 },
        { equipment: 'Podcast Stüdyosu', utilizationRate: 38.9 }
      ],
      eventFrequency: 18, // 18 events per month
      weeklyVisitors: 156,
      monthlyWorkshops: 12,
      averageSessionDuration: 3.8 // 3.8 hours
    };
  }

  // More helper methods...
  private generateEventTitle(type: string): string {
    const titles = {
      workshop: 'React Temelleri Atölyesi',
      demo_day: 'Proje Sunum Günü',
      hackathon: '48 Saatlik Hackathon',
      networking: 'Sektör Buluşması',
      guest_speaker: 'Konuk Konuşmacı: AI Uzmanı',
      bot_arena: 'Bot Arena Turnuvası'
    };
    return titles[type as keyof typeof titles] || 'Özel Etkinlik';
  }

  private generateNotificationTitle(): string {
    const titles = [
      'Yeni rozet kazandın!', 'Görev teslim hatırlatması', 'Buddy mesajı var',
      'Etkinlik davetiyesi', 'Mentor görüşmesi', 'Haftalık rapor hazır'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private getBotArenaTitle(type: string): string {
    const titles = {
      trading_bot: 'Ticaret Botu Savaşları',
      web_scraper: 'Web Scraper Yarışı',
      chatbot_battle: 'Chatbot Kapışması',
      css_battle: 'CSS Battle Arena',
      sql_olympics: 'SQL Olimpiyatları',
      bug_hunt: 'Bug Hunt Challenge'
    };
    return titles[type as keyof typeof titles] || 'Bot Arena';
  }

  private generateBotParticipants() {
    const students = this.getStudents().slice(0, Math.floor(Math.random() * 20) + 5);
    return students.map((student, i) => ({
      userId: student.id,
      botName: `${student.name}Bot`,
      strategy: 'Agresif strateji',
      submissionUrl: `https://github.com/${student.name.toLowerCase()}/bot-submission`,
      score: Math.floor(Math.random() * 1000),
      rank: i + 1
    }));
  }

  private generateEquipmentStatus() {
    return [
      { id: 'eq_1', name: 'Bilgisayar 1', type: 'computer' as const, status: 'available' as const, location: 'Masa 1' },
      { id: 'eq_2', name: 'Projektör A', type: 'projector' as const, status: 'in_use' as const, location: 'Sunum Alanı' }
    ];
  }

  private generateAttendancePatterns() {
    return [
      {
        date: new Date().toISOString().split('T')[0],
        hourlyOccupancy: Array.from({length: 24}, () => Math.floor(Math.random() * 30)),
        totalVisitors: 45,
        averageStayDuration: 4.2
      }
    ];
  }

  private generateResourceMetrics() {
    return {
      internetUsage: 125.7,
      electricityConsumption: 89.3,
      equipmentUtilization: 76.8,
      spaceEfficiency: 82.1
    };
  }

  // Persistence methods
  private persistToStorage(): void {
    try {
      localStorage.setItem('pusula_mock_data', JSON.stringify({
        users: this.users,
        cohorts: this.cohorts,
        microlabs: this.microlabs,
        tasks: this.tasks,
        initialized: true,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Could not persist mock data to localStorage:', error);
    }
  }

  loadFromStorage(): boolean {
    try {
      const stored = localStorage.getItem('pusula_mock_data');
      if (stored) {
        const data = JSON.parse(stored);
        if (data.initialized && data.timestamp > Date.now() - 24 * 60 * 60 * 1000) { // 24 hours
          this.users = data.users;
          this.cohorts = data.cohorts;
          this.microlabs = data.microlabs;
          this.tasks = data.tasks;
          this.initialized = true;
          return true;
        }
      }
    } catch (error) {
      console.warn('Could not load mock data from localStorage:', error);
    }
    return false;
  }

  // ============================================================================
  // Buddy System Integration
  // ============================================================================

  /**
   * Get buddy matches for a user
   */
  getBuddyMatches(userId: string): any[] {
    const user = this.users.find(u => u.id === userId);
    if (!user) return [];

    // Import buddy system (lazy load to avoid circular dependencies)
    const { buddyMatchingAlgorithm } = require('../buddy/matching-algorithm');
    
    // Get users from same cohort and convert to expected format
    const cohortMembers = this.users
      .filter(u => u.cohortId === user.cohortId && u.id !== userId)
      .map(u => this.convertToCompatibleUser(u));
    
    const compatibleUser = this.convertToCompatibleUser(user);
    
    // Find best matches
    const matches = buddyMatchingAlgorithm.findBestMatches(compatibleUser, cohortMembers, 5);
    
    return matches.map((match: any) => {
      const buddy = this.users.find(u => u.id === match.userId2);
      return {
        ...match,
        buddy,
      };
    });
  }

  /**
   * Convert MockUser to format expected by buddy system
   */
  private convertToCompatibleUser(user: MockUser): any {
    const cohort = this.cohorts.find(c => c.id === user.cohortId);
    return {
      ...user,
      cohort: cohort || {
        id: user.cohortId,
        sdgFocus: user.sdgFocus[0] || 4,
        name: 'Unknown Cohort',
      },
      modulesCompleted: user.completedModules.length,
      tasksCompleted: user.completedTasks.length,
    };
  }

  /**
   * Get all buddy pairs for a cohort
   */
  getCohortBuddyPairs(cohortId: string): any[] {
    const { buddyMatchingAlgorithm } = require('../buddy/matching-algorithm');
    
    const cohortMembers = this.users
      .filter(u => u.cohortId === cohortId)
      .map(u => this.convertToCompatibleUser(u));
    const matches = buddyMatchingAlgorithm.createCohortMatches(cohortMembers);
    
    return matches;
  }

  /**
   * Get recommended collaboration activities for a buddy pair
   */
  getRecommendedActivities(userId1: string, userId2: string, count: number = 3): any[] {
    const { collaborationTools } = require('../buddy/collaboration-tools');
    const { buddyMatchingAlgorithm } = require('../buddy/matching-algorithm');
    
    const user1 = this.users.find(u => u.id === userId1);
    const user2 = this.users.find(u => u.id === userId2);
    
    if (!user1 || !user2) return [];
    
    const compatibleUser1 = this.convertToCompatibleUser(user1);
    const compatibleUser2 = this.convertToCompatibleUser(user2);
    
    // Create a mock buddy match
    const compatibility = buddyMatchingAlgorithm.calculateCompatibility(compatibleUser1, compatibleUser2);
    const buddyMatch = {
      user1: compatibleUser1,
      user2: compatibleUser2,
      compatibility,
      matchedAt: new Date(),
      status: 'active' as const,
      collaborationCount: 0,
      successMetrics: {
        projectsCompleted: 0,
        averageRating: 0,
        mutualGrowth: 0,
      },
    };
    
    return collaborationTools.getRecommendedActivities(buddyMatch, count);
  }

  /**
   * Get buddy system analytics for a user
   */
  getBuddyAnalytics(userId: string): any {
    const { buddyAnalytics } = require('../buddy/analytics');
    const { buddyMatchingAlgorithm } = require('../buddy/matching-algorithm');
    
    const user = this.users.find(u => u.id === userId);
    if (!user) return null;
    
    // Get buddy (use existing buddy relationship or find best match)
    const buddyId = user.buddyId;
    const buddy = buddyId ? this.users.find(u => u.id === buddyId) : null;
    
    if (!buddy) return null;
    
    const compatibleUser = this.convertToCompatibleUser(user);
    const compatibleBuddy = this.convertToCompatibleUser(buddy);
    
    // Create mock buddy match
    const compatibility = buddyMatchingAlgorithm.calculateCompatibility(compatibleUser, compatibleBuddy);
    const buddyMatch = {
      user1: compatibleUser,
      user2: compatibleBuddy,
      compatibility,
      matchedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      status: 'active' as const,
      collaborationCount: Math.floor(Math.random() * 10) + 3,
      successMetrics: {
        projectsCompleted: Math.floor(Math.random() * 5) + 1,
        averageRating: 4 + Math.random(),
        mutualGrowth: Math.floor(Math.random() * 500) + 200,
      },
    };
    
    // Generate mock sessions
    const sessionCount = buddyMatch.collaborationCount;
    const { COLLABORATION_ACTIVITIES } = require('../buddy/collaboration-tools');
    const sessions = Array.from({ length: sessionCount }, (_, i) => {
      const activity = COLLABORATION_ACTIVITIES[Math.floor(Math.random() * COLLABORATION_ACTIVITIES.length)];
      const completed = Math.random() > 0.2; // 80% completion rate
      
      return {
        id: `session-${i}`,
        buddyMatch,
        activity,
        startedAt: new Date(Date.now() - (sessionCount - i) * 7 * 24 * 60 * 60 * 1000),
        completedAt: completed ? new Date(Date.now() - (sessionCount - i - 0.5) * 7 * 24 * 60 * 60 * 1000) : undefined,
        status: completed ? 'completed' as const : 'in-progress' as const,
        progress: {
          currentStep: completed ? activity.structure.length : Math.floor(Math.random() * activity.structure.length) + 1,
          stepsCompleted: completed ? activity.structure.length : Math.floor(Math.random() * activity.structure.length),
          totalSteps: activity.structure.length,
        },
        outcomes: {
          xpEarned: completed ? activity.xpReward + activity.collaborationBonus : 0,
          skillsImproved: completed ? activity.learningObjectives.slice(0, 2) : [],
          deliverables: completed ? ['Tamamlandı'] : [],
          rating: completed ? Math.floor(Math.random() * 2) + 4 : undefined, // 4-5 stars
        },
      };
    });
    
    return buddyAnalytics.calculateBuddyAnalytics(buddyMatch, sessions);
  }

  /**
   * Get system-wide buddy metrics
   */
  getBuddySystemMetrics(): any {
    const { buddyAnalytics } = require('../buddy/analytics');
    const { buddyMatchingAlgorithm } = require('../buddy/matching-algorithm');
    const { COLLABORATION_ACTIVITIES } = require('../buddy/collaboration-tools');
    
    // Create buddy matches for all users
    const allMatches: any[] = [];
    const allSessions: any[] = [];
    
    // Group users by cohort and create matches
    const cohortGroups = new Map<string, any[]>();
    this.users.forEach(user => {
      const cohortId = user.cohortId;
      if (!cohortGroups.has(cohortId)) {
        cohortGroups.set(cohortId, []);
      }
      cohortGroups.get(cohortId)!.push(this.convertToCompatibleUser(user));
    });
    
    // Create matches for each cohort
    cohortGroups.forEach(members => {
      const matches = buddyMatchingAlgorithm.createCohortMatches(members);
      allMatches.push(...matches);
      
      // Generate mock sessions for each match
      matches.forEach((match: any) => {
        const sessionCount = Math.floor(Math.random() * 8) + 2;
        const sessions = Array.from({ length: sessionCount }, (_, i) => {
          const activity = COLLABORATION_ACTIVITIES[Math.floor(Math.random() * COLLABORATION_ACTIVITIES.length)];
          const completed = Math.random() > 0.25;
          
          return {
            id: `session-${match.user1.id}-${match.user2.id}-${i}`,
            buddyMatch: match,
            activity,
            startedAt: new Date(Date.now() - (sessionCount - i) * 7 * 24 * 60 * 60 * 1000),
            completedAt: completed ? new Date(Date.now() - (sessionCount - i - 0.5) * 7 * 24 * 60 * 60 * 1000) : undefined,
            status: completed ? 'completed' as const : 'in-progress' as const,
            progress: {
              currentStep: completed ? activity.structure.length : Math.floor(Math.random() * activity.structure.length) + 1,
              stepsCompleted: completed ? activity.structure.length : Math.floor(Math.random() * activity.structure.length),
              totalSteps: activity.structure.length,
            },
            outcomes: {
              xpEarned: completed ? activity.xpReward + activity.collaborationBonus : 0,
              skillsImproved: completed ? activity.learningObjectives.slice(0, 2) : [],
              deliverables: completed ? ['Tamamlandı'] : [],
              rating: completed ? Math.floor(Math.random() * 2) + 4 : undefined,
            },
          };
        });
        
        allSessions.push(...sessions);
      });
    });
    
    return buddyAnalytics.generateSystemMetrics(allMatches, allSessions);
  }

  // ============================================================================
  // Portfolio System Integration
  // ============================================================================

  /**
   * Get user's portfolio projects
   */
  getUserPortfolioProjects(userId: string): any[] {
    const { portfolioBuilder } = require('../portfolio/portfolio-builder');
    
    const userSubmissions = this.getUserSubmissions(userId);
    const allTasks = this.getTasks();
    
    return portfolioBuilder.buildPortfolioFromSubmissions(userId, userSubmissions, allTasks);
  }

  /**
   * Generate professional showcase for user
   */
  generateUserShowcase(userId: string): any {
    const { portfolioBuilder } = require('../portfolio/portfolio-builder');
    
    const user = this.getUser(userId);
    if (!user) return null;
    
    const projects = this.getUserPortfolioProjects(userId);
    
    return portfolioBuilder.generateShowcase(
      userId,
      `${user.name} ${user.surname}`,
      user.level,
      user.xp,
      user.badges,
      projects,
      user.sdgFocus
    );
  }

  /**
   * Export user portfolio in specified format
   */
  exportUserPortfolio(userId: string, format: 'pdf' | 'web' | 'linkedin' | 'json'): any {
    const { exportSystem } = require('../portfolio/export-system');
    
    const showcase = this.generateUserShowcase(userId);
    if (!showcase) return null;
    
    switch (format) {
      case 'pdf':
        return exportSystem.exportAsPDF(showcase);
      case 'web':
        return exportSystem.exportAsWeb(showcase);
      case 'linkedin':
        return exportSystem.exportForLinkedIn(showcase);
      case 'json':
        return exportSystem.exportAsJSON(showcase);
      default:
        return null;
    }
  }

  /**
   * Generate graduation certificate for user
   */
  generateGraduationCertificate(userId: string): any {
    const { certificationSystem } = require('../portfolio/export-system');
    
    const user = this.getUser(userId);
    if (!user) return null;
    
    const projects = this.getUserPortfolioProjects(userId);
    const portfolioUrl = `https://pusula.eskisehir.bel.tr/portfolio/${userId}`;
    
    // Check if user qualifies
    if (!certificationSystem.qualifiesForGraduation(user.level, user.xp, projects.length)) {
      return null;
    }
    
    return certificationSystem.generateGraduationCertificate(
      userId,
      `${user.name} ${user.surname}`,
      user.email,
      user.level,
      user.xp,
      projects,
      portfolioUrl
    );
  }

  /**
   * Get all certificates for user
   */
  getUserCertificates(userId: string): any[] {
    const { certificationSystem } = require('../portfolio/export-system');
    
    const user = this.getUser(userId);
    if (!user) return [];
    
    const certificates: any[] = [];
    const projects = this.getUserPortfolioProjects(userId);
    
    // Graduation certificate
    if (certificationSystem.qualifiesForGraduation(user.level, user.xp, projects.length)) {
      const gradCert = this.generateGraduationCertificate(userId);
      if (gradCert) certificates.push(gradCert);
    }
    
    // Completion certificates
    if (projects.length >= 5) {
      certificates.push(
        certificationSystem.generateCompletionCertificate(
          userId,
          `${user.name} ${user.surname}`,
          projects.length,
          'Genel'
        )
      );
    }
    
    // Skill certificates
    const skillCounts = new Map<string, number>();
    projects.forEach((project: any) => {
      project.skills.forEach((skill: string) => {
        skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
      });
    });
    
    skillCounts.forEach((count, skill) => {
      if (count >= 3) {
        const skillProjects = projects.filter((p: any) => p.skills.includes(skill));
        certificates.push(
          certificationSystem.generateSkillCertificate(
            userId,
            `${user.name} ${user.surname}`,
            skill,
            skillProjects
          )
        );
      }
    });
    
    return certificates;
  }

  /**
   * Get portfolio statistics for user
   */
  getPortfolioStatistics(userId: string): any {
    const { portfolioBuilder } = require('../portfolio/portfolio-builder');
    
    const projects = this.getUserPortfolioProjects(userId);
    return portfolioBuilder.getPortfolioStatistics(projects);
  }

  // ============================================================================
  // Physical Center Integration
  // ============================================================================

  /**
   * Generate QR code for user check-in
   */
  generateCheckInQR(userId: string): any {
    const { qrCheckInSystem } = require('../physical-center/qr-checkin');
    return qrCheckInSystem.generateCheckInQR(userId, 'digem-eskisehir');
  }

  /**
   * Process check-in from QR scan
   */
  processCheckIn(qrData: string, purpose: 'learning' | 'event' | 'mentoring' | 'collaboration' | 'other' = 'learning'): any {
    const { qrCheckInSystem } = require('../physical-center/qr-checkin');
    return qrCheckInSystem.processCheckIn(qrData, purpose);
  }

  /**
   * Get user's attendance analytics
   */
  getUserAttendanceAnalytics(userId: string): any {
    const { attendanceTracking } = require('../physical-center/qr-checkin');
    
    // Generate mock check-ins for the user
    const mockCheckIns = this.generateMockCheckIns(userId);
    
    return attendanceTracking.generateAnalytics(userId, mockCheckIns);
  }

  /**
   * Get real-time center status
   */
  getRealTimeCenterStatus(): any {
    const { realTimeMonitoring } = require('../physical-center/qr-checkin');
    
    // Generate mock active check-ins
    const activeCheckIns = this.generateActiveCheckIns();
    
    return realTimeMonitoring.getRealTimeStatus(activeCheckIns);
  }

  /**
   * Get daily attendance report
   */
  getDailyAttendanceReport(date?: string): any {
    const { attendanceTracking } = require('../physical-center/qr-checkin');
    
    // Generate mock check-ins for the day
    const allCheckIns = this.generateDailyCheckIns(date);
    
    return attendanceTracking.getDailyReport(allCheckIns, date);
  }

  /**
   * Get available equipment
   */
  getAvailableEquipment(type?: string, startTime?: Date, endTime?: Date): any[] {
    const { equipmentManagement } = require('../physical-center/resource-management');
    
    const allEquipment = this.generateMockEquipment();
    
    return equipmentManagement.getAvailableEquipment(allEquipment, type, startTime, endTime);
  }

  /**
   * Reserve equipment
   */
  reserveEquipment(
    userId: string,
    equipmentId: string,
    startTime: Date,
    endTime: Date,
    purpose: string
  ): any {
    const { equipmentManagement } = require('../physical-center/resource-management');
    
    return equipmentManagement.reserveEquipment(userId, equipmentId, startTime, endTime, purpose);
  }

  /**
   * Get workspace recommendations
   */
  getWorkspaceRecommendations(activity: 'solo_work' | 'pair_programming' | 'team_meeting' | 'presentation' | 'making'): any {
    const { workspaceManagement } = require('../physical-center/resource-management');
    
    const workspaces = this.generateMockWorkspaces();
    
    return workspaceManagement.recommendWorkspace(activity, workspaces);
  }

  /**
   * Get event recommendations for user
   */
  getEventRecommendations(userId: string): any[] {
    const { eventScheduling } = require('../physical-center/resource-management');
    
    const user = this.getUser(userId);
    if (!user) return [];
    
    const upcomingEvents = this.getUpcomingEvents();
    
    return eventScheduling.getEventRecommendations(
      userId,
      user.level,
      user.careerInterests,
      upcomingEvents
    );
  }

  /**
   * Get learning plan integration suggestions
   */
  getLearningPlanSuggestions(userId: string, currentModule: string): any {
    const { learningPlanIntegration } = require('../physical-center/resource-management');
    
    const user = this.getUser(userId);
    if (!user) return null;
    
    const upcomingEvents = this.getUpcomingEvents();
    
    return learningPlanIntegration.suggestActivities(
      currentModule,
      user.completedTasks,
      upcomingEvents
    );
  }

  /**
   * Calculate physical center impact on learning
   */
  calculatePhysicalCenterImpact(userId: string): any {
    const { learningPlanIntegration } = require('../physical-center/resource-management');
    
    const analytics = this.getUserAnalytics(userId);
    const physicalCenterHours = analytics
      .filter(a => a.physicalCenterVisit)
      .reduce((sum, a) => sum + a.timeSpent, 0) / 60;
    
    const totalHours = analytics.reduce((sum, a) => sum + a.timeSpent, 0) / 60;
    
    return learningPlanIntegration.calculateImpact(physicalCenterHours, totalHours);
  }

  // ============================================================================
  // Private Helper Methods for Physical Center
  // ============================================================================

  private generateMockCheckIns(userId: string): any[] {
    const { QRCheckIn } = require('../physical-center/qr-checkin');
    const checkIns: any[] = [];
    
    const user = this.getUser(userId);
    if (!user) return [];
    
    // Generate check-ins based on physicalCenterVisits
    const visitCount = user.physicalCenterVisits;
    
    for (let i = 0; i < visitCount; i++) {
      const daysAgo = Math.floor(Math.random() * 90);
      const checkInTime = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      checkInTime.setHours(9 + Math.floor(Math.random() * 10)); // 9 AM - 7 PM
      
      const duration = 60 + Math.floor(Math.random() * 240); // 1-5 hours
      const checkOutTime = new Date(checkInTime.getTime() + duration * 60 * 1000);
      
      const purposes: Array<'learning' | 'event' | 'mentoring' | 'collaboration' | 'other'> = 
        ['learning', 'event', 'mentoring', 'collaboration', 'other'];
      const purpose = purposes[Math.floor(Math.random() * purposes.length)];
      
      checkIns.push({
        id: `checkin_${userId}_${i}`,
        userId,
        centerId: 'digem-eskisehir',
        checkInTime,
        checkOutTime,
        duration,
        purpose,
        xpBonus: Math.floor(duration / 30) * 5, // 5 XP per 30 minutes
      });
    }
    
    return checkIns.sort((a, b) => b.checkInTime.getTime() - a.checkInTime.getTime());
  }

  private generateActiveCheckIns(): any[] {
    const activeCheckIns: any[] = [];
    const students = this.getStudents();
    
    // Randomly select 15-25 students as currently checked in
    const activeCount = 15 + Math.floor(Math.random() * 11);
    const activeStudents = students
      .sort(() => Math.random() - 0.5)
      .slice(0, activeCount);
    
    activeStudents.forEach((student, i) => {
      const checkInTime = new Date();
      checkInTime.setHours(checkInTime.getHours() - Math.floor(Math.random() * 4)); // 0-4 hours ago
      
      const purposes: Array<'learning' | 'event' | 'mentoring' | 'collaboration' | 'other'> = 
        ['learning', 'event', 'mentoring', 'collaboration', 'other'];
      const purpose = purposes[Math.floor(Math.random() * purposes.length)];
      
      activeCheckIns.push({
        id: `active_checkin_${i}`,
        userId: student.id,
        centerId: 'digem-eskisehir',
        checkInTime,
        purpose,
        xpBonus: 0,
      });
    });
    
    return activeCheckIns;
  }

  private generateDailyCheckIns(date?: string): any[] {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const checkIns: any[] = [];
    const students = this.getStudents();
    
    // Generate 20-30 check-ins for the day
    const visitCount = 20 + Math.floor(Math.random() * 11);
    const visitors = students
      .sort(() => Math.random() - 0.5)
      .slice(0, visitCount);
    
    visitors.forEach((student, i) => {
      const checkInTime = new Date(targetDate);
      checkInTime.setHours(9 + Math.floor(Math.random() * 10)); // 9 AM - 7 PM
      checkInTime.setMinutes(Math.floor(Math.random() * 60));
      
      const duration = 60 + Math.floor(Math.random() * 240); // 1-5 hours
      const checkOutTime = new Date(checkInTime.getTime() + duration * 60 * 1000);
      
      const purposes: Array<'learning' | 'event' | 'mentoring' | 'collaboration' | 'other'> = 
        ['learning', 'event', 'mentoring', 'collaboration', 'other'];
      const purpose = purposes[Math.floor(Math.random() * purposes.length)];
      
      checkIns.push({
        id: `daily_checkin_${i}`,
        userId: student.id,
        centerId: 'digem-eskisehir',
        checkInTime,
        checkOutTime,
        duration,
        purpose,
        xpBonus: Math.floor(duration / 30) * 5,
      });
    });
    
    return checkIns;
  }

  private generateMockEquipment(): any[] {
    return [
      // Computers
      ...Array.from({ length: 30 }, (_, i) => {
        const status: 'available' | 'in_use' = Math.random() > 0.2 ? 'available' : 'in_use';
        return {
          id: `computer_${i + 1}`,
          name: `Bilgisayar ${i + 1}`,
          type: 'computer' as const,
          location: `Masa ${i + 1}`,
          status,
          specifications: {
            cpu: 'Intel i7',
            ram: '16GB',
            storage: '512GB SSD',
          },
        };
      }),
      // Projectors
      { id: 'projector_1', name: 'Projektör A', type: 'projector' as const, location: 'Sunum Alanı 1', status: 'available' as const },
      { id: 'projector_2', name: 'Projektör B', type: 'projector' as const, location: 'Sunum Alanı 2', status: 'in_use' as const },
      { id: 'projector_3', name: 'Projektör C', type: 'projector' as const, location: 'Toplantı Odası', status: 'available' as const },
      // Meeting Rooms
      { id: 'meeting_1', name: 'Toplantı Odası 1', type: 'meeting_room' as const, location: 'Kat 1', status: 'available' as const },
      { id: 'meeting_2', name: 'Toplantı Odası 2', type: 'meeting_room' as const, location: 'Kat 1', status: 'reserved' as const },
      // Special Equipment
      { id: '3d_printer_1', name: '3D Printer', type: '3d_printer' as const, location: 'Maker Space', status: 'available' as const },
      { id: 'vr_1', name: 'VR Headset 1', type: 'vr_headset' as const, location: 'VR Köşesi', status: 'available' as const },
      { id: 'vr_2', name: 'VR Headset 2', type: 'vr_headset' as const, location: 'VR Köşesi', status: 'in_use' as const },
      { id: 'camera_1', name: 'Kamera', type: 'camera' as const, location: 'Ekipman Dolabı', status: 'available' as const },
      { id: 'mic_1', name: 'Mikrofon Seti', type: 'microphone' as const, location: 'Ekipman Dolabı', status: 'available' as const },
    ];
  }

  private generateMockWorkspaces(): any[] {
    return [
      // Desks
      ...Array.from({ length: 30 }, (_, i) => ({
        id: `desk_${i + 1}`,
        name: `Masa ${i + 1}`,
        type: 'desk' as const,
        capacity: 1,
        equipment: [`computer_${i + 1}`],
        amenities: ['WiFi', 'Priz', 'Aydınlatma'],
        currentOccupancy: Math.random() > 0.3 ? 1 : 0,
        reservations: [],
      })),
      // Meeting Rooms
      {
        id: 'meeting_room_1',
        name: 'Toplantı Odası 1',
        type: 'meeting_room' as const,
        capacity: 8,
        equipment: ['projector_3', 'whiteboard'],
        amenities: ['WiFi', 'Klima', 'Beyaz Tahta', 'Projektör'],
        currentOccupancy: 0,
        reservations: [],
      },
      {
        id: 'meeting_room_2',
        name: 'Toplantı Odası 2',
        type: 'meeting_room' as const,
        capacity: 6,
        equipment: ['whiteboard'],
        amenities: ['WiFi', 'Klima', 'Beyaz Tahta'],
        currentOccupancy: 4,
        reservations: [],
      },
      // Collaboration Spaces
      {
        id: 'collab_1',
        name: 'İşbirliği Alanı 1',
        type: 'collaboration_space' as const,
        capacity: 4,
        equipment: ['whiteboard'],
        amenities: ['WiFi', 'Rahat Koltuklar', 'Beyaz Tahta'],
        currentOccupancy: 2,
        reservations: [],
      },
      {
        id: 'collab_2',
        name: 'İşbirliği Alanı 2',
        type: 'collaboration_space' as const,
        capacity: 4,
        equipment: ['whiteboard'],
        amenities: ['WiFi', 'Rahat Koltuklar', 'Beyaz Tahta'],
        currentOccupancy: 0,
        reservations: [],
      },
      // Quiet Zone
      {
        id: 'quiet_1',
        name: 'Sessiz Çalışma Alanı',
        type: 'quiet_zone' as const,
        capacity: 10,
        equipment: [],
        amenities: ['WiFi', 'Sessiz Ortam', 'Bireysel Masalar'],
        currentOccupancy: 5,
        reservations: [],
      },
      // Maker Space
      {
        id: 'maker_1',
        name: 'Maker Space',
        type: 'maker_space' as const,
        capacity: 6,
        equipment: ['3d_printer_1'],
        amenities: ['WiFi', 'Alet Dolabı', '3D Printer', 'Elektronik Malzemeler'],
        currentOccupancy: 2,
        reservations: [],
      },
    ];
  }

  // ============================================================================
  // Bot Arena Integration
  // ============================================================================

  /**
   * Create a new competition
   */
  createBotArenaCompetition(
    title: string,
    type: string,
    description: string,
    startDate: Date,
    endDate: Date,
    capacity: number = 50
  ): any {
    const { competitionEngine } = require('../bot-arena/competition-engine');
    return competitionEngine.createCompetition(title, type, description, startDate, endDate, capacity);
  }

  /**
   * Register user for competition
   */
  registerForCompetition(
    competitionId: string,
    userId: string,
    botName: string,
    strategy: string
  ): any {
    const competition = this.competitions.find(c => c.id === competitionId);
    if (!competition) throw new Error('Yarışma bulunamadı.');
    
    const { competitionEngine } = require('../bot-arena/competition-engine');
    return competitionEngine.registerParticipant(competition, userId, botName, strategy);
  }

  /**
   * Get competition leaderboard
   */
  getCompetitionLeaderboard(competitionId: string): any[] {
    const competition = this.competitions.find(c => c.id === competitionId);
    if (!competition) return [];
    
    return competition.leaderboard || [];
  }

  /**
   * Get live competition data for spectators
   */
  getLiveCompetitionData(competitionId: string): any {
    const competition = this.competitions.find(c => c.id === competitionId);
    if (!competition) return null;
    
    const { spectatorMode } = require('../bot-arena/competition-engine');
    return spectatorMode.getLiveCompetitionData(competition);
  }

  /**
   * Get competition results
   */
  getCompetitionResults(competitionId: string): any {
    const competition = this.competitions.find(c => c.id === competitionId);
    if (!competition) return null;
    
    const { competitionEngine } = require('../bot-arena/competition-engine');
    return competitionEngine.getCompetitionResults(competition);
  }

  /**
   * Get user's competition achievements
   */
  getUserCompetitionAchievements(userId: string, competitionId: string): any[] {
    const competition = this.competitions.find(c => c.id === competitionId);
    if (!competition) return [];
    
    const participant = competition.participants?.find((p: any) => p.userId === userId);
    if (!participant) return [];
    
    const { rewardsSystem, competitionEngine } = require('../bot-arena');
    const results = competitionEngine.getCompetitionResults(competition);
    
    return rewardsSystem.generateAchievements(competition, participant, results);
  }

  /**
   * Get archived competitions
   */
  getArchivedCompetitions(): any[] {
    const { competitionArchive } = require('../bot-arena/rewards-analytics');
    return competitionArchive.getAllArchives();
  }

  /**
   * Get user's competition performance analytics
   */
  getUserCompetitionAnalytics(userId: string): any {
    const { performanceAnalytics, competitionArchive } = require('../bot-arena/rewards-analytics');
    
    const userCompetitions = this.competitions.filter(c => 
      c.participants?.some((p: any) => p.userId === userId)
    );
    
    const archives = competitionArchive.getAllArchives();
    
    return performanceAnalytics.generateAnalytics(userId, userCompetitions, archives);
  }

  /**
   * Search competition archives
   */
  searchCompetitionArchives(query: string, type?: string): any[] {
    const { competitionArchive } = require('../bot-arena/rewards-analytics');
    return competitionArchive.searchArchives(query, type);
  }

  // ============================================================================
  // Advanced Analytics Integration
  // ============================================================================

  /**
   * Get learning metrics for a user
   */
  getUserLearningMetrics(userId: string): any {
    const { analyticsTracking } = require('../analytics/tracking-system');
    
    const user = this.getUser(userId);
    if (!user) return null;
    
    const userAnalytics = this.getUserAnalytics(userId);
    
    return analyticsTracking.trackLearningMetrics(
      userId,
      userAnalytics,
      user.completedModules,
      user.completedTasks,
      user.level,
      user.xp
    );
  }

  /**
   * Get guide insights for a cohort
   */
  getGuideInsights(guideId: string, cohortId: string): any {
    const { analyticsTracking } = require('../analytics/tracking-system');
    
    const students = this.getUsersByCohort(cohortId);
    const analyticsData = this.analytics;
    
    return analyticsTracking.generateGuideInsights(guideId, cohortId, students, analyticsData);
  }

  /**
   * Get center KPIs
   */
  getCenterKPIs(date?: Date): any {
    const { analyticsTracking } = require('../analytics/tracking-system');
    
    return analyticsTracking.generateCenterKPIs(this.users, this.analytics, date);
  }

  /**
   * Track skill development
   */
  getSkillDevelopmentMetrics(skill: string): any {
    const { analyticsTracking } = require('../analytics/tracking-system');
    
    return analyticsTracking.trackSkillDevelopment(skill, this.users, this.analytics);
  }

  /**
   * Generate early warning alerts
   */
  getEarlyWarningAlerts(): any[] {
    const { predictiveAnalytics } = require('../analytics/predictive-reporting');
    
    const students = this.getStudents();
    
    return predictiveAnalytics.generateEarlyWarnings(students, this.analytics);
  }

  /**
   * Predict completion likelihood for a user
   */
  predictUserCompletion(userId: string): any {
    const { predictiveAnalytics } = require('../analytics/predictive-reporting');
    
    const user = this.getUser(userId);
    if (!user) return null;
    
    const userAnalytics = this.getUserAnalytics(userId);
    
    return predictiveAnalytics.predictCompletionLikelihood(user, userAnalytics);
  }

  /**
   * Generate SDG impact report
   */
  generateSDGImpactReport(startDate: Date, endDate: Date): any {
    const { undpReporting } = require('../analytics/predictive-reporting');
    
    const students = this.getStudents();
    const projects = this.generateUNDPMetrics().sustainabilityProjects;
    
    return undpReporting.generateSDGImpactReport(students, projects, startDate, endDate);
  }

  /**
   * Generate stakeholder report
   */
  generateStakeholderReport(reportType: 'monthly' | 'quarterly' | 'annual'): any {
    const { undpReporting } = require('../analytics/predictive-reporting');
    
    const students = this.getStudents();
    const now = new Date();
    const startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sdgReport = this.generateSDGImpactReport(startDate, now);
    
    return undpReporting.generateStakeholderReport(reportType, students, this.analytics, sdgReport);
  }

  // ============================================================================
  // Demo System Integration
  // ============================================================================

  /**
   * Get all demo scenarios
   */
  getDemoScenarios(): any[] {
    const { demoScenarios } = require('../demo/scenarios');
    return demoScenarios.getAllScenarios();
  }

  /**
   * Generate learner journey
   */
  generateLearnerJourney(learnerId: string): any {
    const { demoScenarios } = require('../demo/scenarios');
    return demoScenarios.generateLearnerJourney(learnerId);
  }

  /**
   * Get impact case studies
   */
  getImpactCaseStudies(): any[] {
    const { demoScenarios } = require('../demo/scenarios');
    return demoScenarios.generateImpactCaseStudies();
  }

  /**
   * Get stakeholder dashboard
   */
  getStakeholderDashboard(): any {
    const { demoScenarios } = require('../demo/scenarios');
    return demoScenarios.generateStakeholderDashboard();
  }

  /**
   * Get all guided tours
   */
  getGuidedTours(): any[] {
    const { guidedTours } = require('../demo/demo-mode');
    return guidedTours.getAllTours();
  }

  /**
   * Get tour by ID
   */
  getGuidedTour(tourId: string): any {
    const { guidedTours } = require('../demo/demo-mode');
    return guidedTours.getTour(tourId);
  }

  /**
   * Get feature highlights
   */
  getFeatureHighlights(): any[] {
    const { featureHighlights } = require('../demo/demo-mode');
    return featureHighlights.getAllHighlights();
  }

  /**
   * Activate demo mode
   */
  activateDemoMode(scenario: string): any {
    const { demoMode } = require('../demo/demo-mode');
    return demoMode.activateDemoMode(scenario);
  }

  /**
   * Reset demo data
   */
  resetDemoData(): any {
    const { demoMode } = require('../demo/demo-mode');
    return demoMode.resetDemoData();
  }

  // ============================================================================
  // SIMULATION SYSTEM METHODS
  // ============================================================================

  /**
   * Get all simulations
   */
  getAllSimulations(): any[] {
    const { SIMULATIONS } = require('../simulation');
    return SIMULATIONS;
  }

  /**
   * Get simulations by phase
   */
  getSimulationsByPhase(phase: 'kesif' | 'insa' | 'etki'): any[] {
    const { getSimulationsByPhase } = require('../simulation');
    return getSimulationsByPhase(phase);
  }

  /**
   * Get simulations by type
   */
  getSimulationsByType(type: string): any[] {
    const { getSimulationsByType } = require('../simulation');
    return getSimulationsByType(type);
  }

  /**
   * Get simulation by ID
   */
  getSimulation(id: string): any {
    const { getSimulationById } = require('../simulation');
    return getSimulationById(id);
  }

  /**
   * Start simulation session
   */
  startSimulationSession(simulationId: string, userId: string, participants: string[] = []): any {
    const { simulationEngine } = require('../simulation');
    return simulationEngine.startSession(simulationId, userId, participants);
  }

  /**
   * Submit simulation response
   */
  submitSimulationResponse(sessionId: string, stepId: string, answer: any, timeSpent: number): any {
    const { simulationEngine } = require('../simulation');
    return simulationEngine.submitResponse(sessionId, stepId, answer, timeSpent);
  }

  /**
   * Complete simulation session
   */
  completeSimulationSession(sessionId: string): any {
    const { simulationEngine } = require('../simulation');
    return simulationEngine.completeSession(sessionId);
  }

  /**
   * Get user simulation history
   */
  getUserSimulationHistory(userId: string): any[] {
    const { simulationEngine } = require('../simulation');
    return simulationEngine.getUserHistory(userId);
  }

  /**
   * Get user simulation statistics
   */
  getUserSimulationStats(userId: string): any {
    const { simulationEngine } = require('../simulation');
    return simulationEngine.getUserStats(userId);
  }

  /**
   * Get recommended simulations for user
   */
  getRecommendedSimulations(userId: string): any[] {
    const user = this.getUser(userId);
    if (!user) return [];

    const { SIMULATIONS } = require('../simulation');
    const userLevel = user.level;
    
    // Recommend simulations based on user level and progress
    const phase = userLevel === 'cirak' ? 'kesif' : 
                  userLevel === 'kalfa' ? 'insa' : 'etki';
    
    return SIMULATIONS
      .filter((sim: any) => sim.phase === phase)
      .slice(0, 6);
  }

  /**
   * Assess simulation performance
   */
  assessSimulationPerformance(sessionId: string): any {
    const { simulationEngine, assessmentEngine } = require('../simulation');
    const session = simulationEngine.getSession(sessionId);
    if (!session) return null;

    const simulation = simulationEngine.getSimulation(session.simulationId);
    if (!simulation) return null;

    return assessmentEngine.assessPerformance(session, simulation);
  }

  /**
   * Get simulation progress integration
   */
  getSimulationProgressIntegration(result: any): any {
    const { assessmentEngine, simulationEngine } = require('../simulation');
    const simulation = simulationEngine.getSimulation(result.session.simulationId);
    if (!simulation) return null;

    return assessmentEngine.integrateWithProgress(result, simulation);
  }

  /**
   * Generate simulation report
   */
  generateSimulationReport(sessionId: string): any {
    const { simulationEngine, assessmentEngine } = require('../simulation');
    const session = simulationEngine.getSession(sessionId);
    if (!session) return null;

    const simulation = simulationEngine.getSimulation(session.simulationId);
    if (!simulation) return null;

    const assessment = assessmentEngine.assessPerformance(session, simulation);
    const result = simulationEngine.completeSession(sessionId);
    const integration = assessmentEngine.integrateWithProgress(result, simulation);

    return assessmentEngine.generateReport(assessment, integration);
  }
}




