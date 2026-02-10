// Mock Data Generators for PUSULA Platform

import { 
  MockUser, MockCohort, MockMicroLab, MockTask, MockSubmission, 
  MockPortfolioItem, MockEvent, MockNotification, MockAnalytics,
  UNDPMetrics, MockBotArenaCompetition, PhysicalCenterData,
  InteractiveElement, AssessmentCriteria, Deliverable
} from './types';
import { ALL_MICROLABS_FINAL } from './content/microlabs';
import { ALL_TASKS_FINAL } from './content/tasks';
import { xpEngine, badgeSystem } from '../gamification';

// Comprehensive Turkish names for realistic, diverse data
const TURKISH_NAMES = {
  male: [
    'Ahmet', 'Mehmet', 'Mustafa', 'Ali', 'Hasan', 'Hüseyin', 'İbrahim', 'Ömer', 'Yusuf', 'Emre',
    'Burak', 'Cem', 'Deniz', 'Efe', 'Furkan', 'Kerem', 'Berk', 'Kaan', 'Mert', 'Eren',
    'Can', 'Barış', 'Oğuz', 'Tolga', 'Serkan', 'Onur', 'Umut', 'Alper', 'Çağlar', 'Taner',
    'Selim', 'Volkan', 'Murat', 'Erdem', 'Koray', 'Sinan', 'Tarık', 'Uğur', 'Yasin', 'Zafer'
  ],
  female: [
    'Ayşe', 'Fatma', 'Emine', 'Hatice', 'Zeynep', 'Elif', 'Merve', 'Seda', 'Büşra', 'Esra',
    'Gizem', 'İrem', 'Cansu', 'Duygu', 'Ebru', 'Selin', 'Defne', 'Ece', 'Naz', 'Yağmur',
    'Aslı', 'Begüm', 'Ceren', 'Dilara', 'Ezgi', 'Gamze', 'Hande', 'İpek', 'Melis', 'Nehir',
    'Özge', 'Pınar', 'Sinem', 'Tuğçe', 'Yeliz', 'Zara', 'Asya', 'Beren', 'Damla', 'Ela'
  ],
  surnames: [
    'Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Aydın', 'Özkan', 'Arslan', 'Doğan', 'Kılıç',
    'Aslan', 'Çetin', 'Kara', 'Koç', 'Kurt', 'Özdemir', 'Erdoğan', 'Güneş', 'Akın', 'Yıldız',
    'Öztürk', 'Yıldırım', 'Aksoy', 'Polat', 'Şimşek', 'Acar', 'Bulut', 'Çakır', 'Duman', 'Erdem',
    'Güler', 'Karaca', 'Özer', 'Sarı', 'Tekin', 'Uysal', 'Yavuz', 'Zengin', 'Aktaş', 'Bayram'
  ]
};

// SDG-aligned cohort names with real-world impact focus
const COHORT_NAMES = [
  'İklim Savaşçıları', 'Dijital Öncüler', 'Veri Kaşifleri', 'Kod Ustaları', 'Tasarım Guruları',
  'AI Yenilikçileri', 'Sürdürülebilirlik Elçileri', 'Teknoloji Liderleri', 'Gelecek Mimarları', 'İnovasyon Takımı',
  'Yeşil Teknoloji Ekibi', 'Sosyal Girişimciler', 'Akıllı Şehir Geliştiricileri', 'Eğitim Reformcuları', 'Sağlık Teknolojisi Öncüleri'
];

// Real-world problem themes aligned with Eskişehir and UNDP priorities
const PROBLEM_THEMES = [
  'Şehir İçi Ulaşım Optimizasyonu', 'Atık Yönetimi ve Geri Dönüşüm', 'Enerji Verimliliği ve Yenilenebilir Enerji',
  'Dijital Okuryazarlık ve Erişilebilirlik', 'Gençlik İstihdamı ve Girişimcilik', 'Çevre Koruma ve Biyoçeşitlilik',
  'Sosyal İçerme ve Eşitlik', 'Eğitim Teknolojileri ve Uzaktan Öğrenme', 'Sağlık Hizmetlerine Erişim',
  'Tarımsal Verimlilik ve Gıda Güvenliği', 'Su Kaynakları Yönetimi', 'Afet Hazırlığı ve Dayanıklılık',
  'Kültürel Miras Koruma', 'Toplum Güvenliği ve Adalet', 'Ekonomik Kalkınma ve İnovasyon'
];

// Career interests aligned with industry demand
const CAREER_INTERESTS = [
  'Frontend Development', 'Backend Development', 'Full Stack Development', 'Data Science', 'Machine Learning',
  'Artificial Intelligence', 'UX/UI Design', 'Product Design', 'DevOps Engineering', 'Cloud Architecture',
  'Cybersecurity', 'Mobile Development', 'Game Development', 'Blockchain Development', 'IoT Development',
  'Product Management', 'Project Management', 'Digital Marketing', 'Content Strategy', 'Business Analysis',
  'Quality Assurance', 'Technical Writing', 'System Administration', 'Database Administration', 'Network Engineering'
];

// Learning styles for personalized education
const LEARNING_STYLES = ['visual', 'auditory', 'kinesthetic', 'mixed'] as const;

// Realistic bio templates based on level and background
const BIO_TEMPLATES = {
  cirak: [
    'Dijital dünyaya yeni adım atıyorum. Teknoloji ile sosyal problemleri çözmeyi hedefliyorum.',
    'Kodlamayı öğrenmeye başladım ve her gün yeni şeyler keşfediyorum. Hedefim sürdürülebilir projeler geliştirmek.',
    'Teknoloji meraklısıyım ve dijital becerilerimi geliştirerek kariyerime yön vermek istiyorum.',
    'Yeni başlangıçlar heyecan verici! Öğrenmeye açık, takım çalışmasını seven biriyim.',
    'Dijital dönüşümün bir parçası olmak istiyorum. Her gün bir adım daha ileri.'
  ],
  kalfa: [
    'Kod yazma ve tasarım konularında kendimi geliştiriyorum. Takım çalışmasını seviyorum.',
    'Birkaç proje tamamladım ve artık daha karmaşık problemlere çözüm üretebiliyorum.',
    'Öğrendiklerimi gerçek projelerde uygulama fırsatı buldum. Mentorluk almaktan keyif alıyorum.',
    'Teknik becerilerimin yanı sıra iletişim ve proje yönetimi konularında da gelişiyorum.',
    'Dijital becerilerimi toplumsal fayda için kullanmak benim için önemli.'
  ],
  usta: [
    'Deneyimli bir geliştirici olarak projeler yönetiyor ve mentorluğa başlıyorum.',
    'Sürdürülebilir teknoloji çözümlerine odaklanıyorum ve ekip liderliği yapıyorum.',
    'Karmaşık problemleri çözme konusunda deneyim kazandım. Şimdi bilgimi paylaşma zamanı.',
    'Teknik uzmanlığımı sosyal etki projeleriyle birleştiriyorum.',
    'Yeni nesil geliştiricilere mentorluk yapıyor ve topluluk projelerine liderlik ediyorum.'
  ],
  graduate: [
    'PUSULA mezunu olarak artık sektörde aktif çalışıyor ve yeni nesil öğrencilere mentorluk yapıyorum.',
    'Dijital becerilerimi profesyonel kariyerime dönüştürdüm. Şimdi topluma geri verme zamanı.',
    'Mezun olduktan sonra kendi startup\'ımı kurdum ve sosyal etki odaklı projeler geliştiriyorum.',
    'Teknoloji şirketinde çalışırken PUSULA topluluğuyla bağımı sürdürüyorum.',
    'Dijital dönüşüm yolculuğum PUSULA ile başladı, şimdi bu yolculuğu başkalarına ilham olarak sürdürüyorum.'
  ]
};

export class MockDataGenerator {
  private static instance: MockDataGenerator;
  private users: MockUser[] = [];
  private cohorts: MockCohort[] = [];
  private microlabs: MockMicroLab[] = [];
  private tasks: MockTask[] = [];

  static getInstance(): MockDataGenerator {
    if (!MockDataGenerator.instance) {
      MockDataGenerator.instance = new MockDataGenerator();
    }
    return MockDataGenerator.instance;
  }

  // Generate realistic user profiles with diversity and inclusion focus
  generateUsers(count: number = 100): MockUser[] {
    const users: MockUser[] = [];
    
    // UNDP Gender Equality Goal: 60% female participation
    const femaleCount = Math.floor(count * 0.6);
    
    // First 5 users are guides (mentors/instructors)
    const guideCount = 5;
    
    for (let i = 0; i < count; i++) {
      const isGuide = i < guideCount;
      const isFemale = i < femaleCount;
      
      // Select realistic Turkish name
      const name = isFemale 
        ? TURKISH_NAMES.female[Math.floor(Math.random() * TURKISH_NAMES.female.length)]
        : TURKISH_NAMES.male[Math.floor(Math.random() * TURKISH_NAMES.male.length)];
      const surname = TURKISH_NAMES.surnames[Math.floor(Math.random() * TURKISH_NAMES.surnames.length)];
      
      // Realistic join date (last 6 months for active cohorts)
      const joinDate = new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000);
      
      // Generate XP based on realistic progression using XP engine
      // Guides don't have XP, students have varied progression
      let xp = 0;
      if (!isGuide) {
        // Create realistic distribution: more beginners, fewer advanced
        const random = Math.random();
        if (random < 0.4) {
          // 40% are beginners (Çırak)
          xp = Math.floor(Math.random() * 1000);
        } else if (random < 0.7) {
          // 30% are intermediate (Kalfa)
          xp = 1000 + Math.floor(Math.random() * 1500);
        } else if (random < 0.9) {
          // 20% are advanced (Usta)
          xp = 2500 + Math.floor(Math.random() * 2500);
        } else {
          // 10% are graduates
          xp = 5000 + Math.floor(Math.random() * 1000);
        }
      }
      
      const level = xpEngine.calculateLevel(xp);
      
      // Generate realistic GDR components based on level
      const gdrComponents = this.generateRealisticGDRComponents(level, xp);
      const gdrScore = this.calculateGDRScore(gdrComponents);
      
      // Assign to cohort (10 students per cohort on average)
      const cohortId = isGuide ? '' : `cohort_${Math.floor((i - guideCount) / 10) + 1}`;
      
      // Generate streak with realistic patterns (most people don't have long streaks)
      const streak = this.generateRealisticStreak(level);
      
      // Physical center visits based on level and engagement
      const physicalCenterVisits = this.generatePhysicalVisits(level, streak);
      
      // Generate completed content based on level
      const completedModules = this.generateCompletedModules(level);
      const completedTasks = this.generateCompletedTasks(level);
      
      // Career interests based on current trends and skills
      const careerInterests = this.generateCareerInterests();
      
      // Learning style preference
      const preferredLearningStyle = LEARNING_STYLES[Math.floor(Math.random() * LEARNING_STYLES.length)];
      
      // Mentorship metrics
      const mentorshipGiven = level === 'usta' || level === 'graduate' ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 3);
      const mentorshipReceived = Math.floor(Math.random() * 20) + 5;
      
      // Generate realistic bio
      const bio = this.generateRealisticBio(name, level, isFemale);
      
      // Buddy assignment (pair students for peer learning)
      const buddyId = !isGuide && i > guideCount + 5 ? `user_${Math.floor(Math.random() * (i - guideCount)) + guideCount + 1}` : undefined;
      
      // Last active date (more recent for engaged users)
      const lastActiveAt = this.generateLastActiveDate(streak, level);
      
      users.push({
        id: `user_${i + 1}`,
        name,
        surname,
        email: `${name.toLowerCase()}.${surname.toLowerCase()}@pusula.edu.tr`,
        role: isGuide ? 'guide' : 'student',
        level,
        xp,
        streak,
        cohortId,
        sdgFocus: this.generateSDGFocus(),
        gdrScore,
        gdrComponents,
        badges: (() => {
          // Generate badges using badge system
          const userStats = {
            xp,
            completedModules: completedModules.length,
            completedTasks: completedTasks.length,
            streak,
            collaborations: Math.floor(Math.random() * 10),
            mentorships: mentorshipGiven,
            events: Math.floor(Math.random() * 15),
            specialAchievements: []
          };
          const earnedBadges = badgeSystem.checkEarnedBadges(userStats);
          return earnedBadges.map((b: { name: string }) => b.name);
        })(),
        completedModules,
        completedTasks,
        physicalCenterVisits,
        preferredLearningStyle,
        mentorshipGiven,
        mentorshipReceived,
        careerInterests,
        joinedAt: joinDate.toISOString(),
        lastActiveAt,
        bio,
        buddyId,
        profileImageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}${surname}`
      });
    }
    
    this.users = users;
    console.log(`✅ Generated ${users.length} diverse user profiles`);
    console.log(`   - ${femaleCount} female (${Math.round(femaleCount/count*100)}%)`);
    console.log(`   - ${guideCount} guides, ${count - guideCount} students`);
    console.log(`   - Level distribution: Çırak ${users.filter(u => u.level === 'cirak').length}, Kalfa ${users.filter(u => u.level === 'kalfa').length}, Usta ${users.filter(u => u.level === 'usta').length}, Mezun ${users.filter(u => u.level === 'graduate').length}`);
    
    return users;
  }
  // Generate diverse, SDG-aligned cohorts
  generateCohorts(count: number = 10): MockCohort[] {
    const cohorts: MockCohort[] = [];
    
    for (let i = 0; i < count; i++) {
      // Stagger cohort start dates over 6 months
      const startDate = new Date(Date.now() - (180 - i * 18) * 24 * 60 * 60 * 1000);
      const endDate = new Date(startDate.getTime() + 90 * 24 * 60 * 60 * 1000); // 12-week program
      
      // Assign SDG focus (pilot SDGs: 4, 6, 11, 13, 17)
      const pilotSDGs = [4, 6, 11, 13, 17];
      const sdgFocus = pilotSDGs[i % pilotSDGs.length];
      
      // Select problem theme aligned with SDG
      const problemTheme = this.selectProblemThemeForSDG(sdgFocus);
      
      // Assign guide (first 5 users are guides)
      const guideId = `user_${(i % 5) + 1}`;
      
      // Calculate member IDs (10-15 students per cohort)
      const memberCount = 10 + Math.floor(Math.random() * 6);
      const startMemberId = 6 + (i * 10); // Start after guides
      const memberIds = Array.from(
        {length: memberCount}, 
        (_, j) => `user_${startMemberId + j}`
      );
      
      // Determine cohort status
      const status = this.getCohortStatus(startDate, endDate);
      
      // Generate rich description
      const description = this.generateCohortDescription(problemTheme, sdgFocus, memberCount);
      
      cohorts.push({
        id: `cohort_${i + 1}`,
        name: COHORT_NAMES[i % COHORT_NAMES.length],
        sdgFocus,
        problemTheme,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guideId,
        memberIds,
        capacity: 25,
        status,
        description
      });
    }
    
    this.cohorts = cohorts;
    console.log(`✅ Generated ${cohorts.length} SDG-aligned cohorts`);
    console.log(`   - Active: ${cohorts.filter(c => c.status === 'active').length}`);
    console.log(`   - Completed: ${cohorts.filter(c => c.status === 'completed').length}`);
    console.log(`   - Upcoming: ${cohorts.filter(c => c.status === 'upcoming').length}`);
    
    return cohorts;
  }

  private selectProblemThemeForSDG(sdg: number): string {
    const sdgThemes: Record<number, string[]> = {
      4: ['Dijital Okuryazarlık ve Erişilebilirlik', 'Eğitim Teknolojileri ve Uzaktan Öğrenme', 'Gençlik İstihdamı ve Girişimcilik'],
      6: ['Su Kaynakları Yönetimi', 'Atık Yönetimi ve Geri Dönüşüm', 'Çevre Koruma ve Biyoçeşitlilik'],
      11: ['Şehir İçi Ulaşım Optimizasyonu', 'Akıllı Şehir Geliştiricileri', 'Afet Hazırlığı ve Dayanıklılık'],
      13: ['Enerji Verimliliği ve Yenilenebilir Enerji', 'Çevre Koruma ve Biyoçeşitlilik', 'Tarımsal Verimlilik ve Gıda Güvenliği'],
      17: ['Ekonomik Kalkınma ve İnovasyon', 'Sosyal İçerme ve Eşitlik', 'Toplum Güvenliği ve Adalet']
    };
    
    const themes = sdgThemes[sdg] || PROBLEM_THEMES;
    return themes[Math.floor(Math.random() * themes.length)];
  }

  private generateCohortDescription(theme: string, sdg: number, memberCount: number): string {
    const sdgNames: Record<number, string> = {
      4: 'Nitelikli Eğitim',
      6: 'Temiz Su ve Sanitasyon',
      11: 'Sürdürülebilir Şehirler ve Topluluklar',
      13: 'İklim Eylemi',
      17: 'Amaçlar İçin Ortaklıklar'
    };
    
    return `${theme} odaklı 12 haftalık yoğun eğitim programı. SDG ${sdg} (${sdgNames[sdg]}) hedefine katkı sağlamak üzere ${memberCount} genç ile gerçek dünya problemlerine çözüm geliştiriyoruz. Fiziksel merkez ve online hibrit model ile desteklenen, kanıt odaklı öğrenme yaklaşımı.`;
  }

  // Generate comprehensive MicroLab content using professional definitions
  generateMicroLabs(count: number = 50): MockMicroLab[] {
    const microlabs: MockMicroLab[] = [];
    
    // Use professionally crafted content from microlabs.ts
    ALL_MICROLABS_FINAL.forEach((labDef, i) => {
      microlabs.push({
        id: labDef.id,
        title: labDef.title,
        description: labDef.description,
        phase: labDef.phase,
        sdgAlignment: labDef.sdgAlignment,
        estimatedMinutes: labDef.estimatedMinutes,
        difficulty: labDef.difficulty,
        prerequisites: labDef.prerequisites,
        learningObjectives: labDef.learningObjectives,
        interactiveElements: this.generateInteractiveElements(),
        assessmentCriteria: this.generateAssessmentCriteria(),
        realWorldApplication: labDef.realWorldApplication,
        status: 'published',
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      });
    });

    this.microlabs = microlabs;
    console.log(`✅ Generated ${microlabs.length} professional MicroLab modules`);
    console.log(`   - Keşif: ${microlabs.filter(m => m.phase === 'kesif').length}`);
    console.log(`   - İnşa: ${microlabs.filter(m => m.phase === 'insa').length}`);
    console.log(`   - Etki: ${microlabs.filter(m => m.phase === 'etki').length}`);
    
    return microlabs;
  }

  // Generate comprehensive Task/Challenge content using professional definitions
  generateTasks(count: number = 40): MockTask[] {
    const tasks: MockTask[] = [];
    
    // Use professionally crafted content from tasks.ts
    ALL_TASKS_FINAL.forEach((taskDef, i) => {
      tasks.push({
        id: taskDef.id,
        title: taskDef.title,
        description: taskDef.description,
        phase: taskDef.phase,
        difficulty: taskDef.difficulty,
        estimatedHours: taskDef.estimatedHours,
        xpReward: taskDef.xpReward,
        sdgImpact: taskDef.sdgImpact,
        deliverables: taskDef.deliverables,
        evaluationRubric: this.generateEvaluationRubric(),
        timeEstimate: taskDef.estimatedHours,
        collaborationLevel: taskDef.collaborationLevel,
        realWorldContext: taskDef.realWorldContext,
        prerequisites: taskDef.prerequisites,
        hints: taskDef.hints,
        mandatoryEvidence: taskDef.mandatoryEvidence,
        status: 'published',
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      });
    });

    this.tasks = tasks;
    console.log(`✅ Generated ${tasks.length} professional Challenge tasks`);
    console.log(`   - Keşif: ${tasks.filter(t => t.phase === 'kesif').length}`);
    console.log(`   - İnşa: ${tasks.filter(t => t.phase === 'insa').length}`);
    console.log(`   - Etki: ${tasks.filter(t => t.phase === 'etki').length}`);
    
    return tasks;
  }

  private generateRealisticGDRComponents(level: string, xp: number) {
    // GDR scores should correlate with level and XP
    const baseScore = level === 'graduate' ? 85 : level === 'usta' ? 70 : level === 'kalfa' ? 50 : 30;
    const variance = 15;
    
    return {
      teknik_rol: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * variance * 2) - variance)),
      takim: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * variance * 2) - variance)),
      sunum: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * variance * 2) - variance)),
      guvenilirlik: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * variance * 2) - variance)),
      sosyal_etki: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * variance * 2) - variance))
    };
  }

  private calculateGDRScore(components: any): number {
    // Weighted average: Technical 35%, Team 20%, Presentation 20%, Reliability 15%, Social Impact 10%
    return Math.round(
      components.teknik_rol * 0.35 +
      components.takim * 0.20 +
      components.sunum * 0.20 +
      components.guvenilirlik * 0.15 +
      components.sosyal_etki * 0.10
    );
  }

  private generateRealisticStreak(level: string): number {
    // Most people don't have long streaks, but advanced users tend to be more consistent
    const maxStreak = level === 'graduate' ? 60 : level === 'usta' ? 45 : level === 'kalfa' ? 30 : 15;
    const random = Math.random();
    
    // 60% have short streaks (0-7 days)
    if (random < 0.6) return Math.floor(Math.random() * 8);
    // 30% have medium streaks (8-20 days)
    if (random < 0.9) return 8 + Math.floor(Math.random() * 13);
    // 10% have long streaks
    return 21 + Math.floor(Math.random() * (maxStreak - 20));
  }

  private generatePhysicalVisits(level: string, streak: number): number {
    // Physical center visits correlate with engagement
    const baseVisits = level === 'graduate' ? 40 : level === 'usta' ? 30 : level === 'kalfa' ? 20 : 10;
    const streakBonus = Math.floor(streak / 7) * 2; // 2 extra visits per week of streak
    return baseVisits + streakBonus + Math.floor(Math.random() * 10);
  }

  private generateLastActiveDate(streak: number, level: string): string {
    // Active users were online recently
    if (streak > 7) {
      // Very active: within last 24 hours
      return new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString();
    } else if (streak > 0) {
      // Somewhat active: within last 3 days
      return new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString();
    } else {
      // Inactive: within last 2 weeks
      return new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString();
    }
  }

  private generateRealisticBio(name: string, level: string, isFemale: boolean): string {
    const templates = BIO_TEMPLATES[level as keyof typeof BIO_TEMPLATES] || BIO_TEMPLATES.cirak;
    const template = templates[Math.floor(Math.random() * templates.length)];
    return `Merhaba! Ben ${name}. ${template}`;
  }

  private generateSDGFocus(): number[] {
    const pilotSDGs = [4, 6, 11, 13, 17];
    const count = Math.floor(Math.random() * 3) + 1; // 1-3 SDGs
    const selected: number[] = [];
    for (let i = 0; i < count; i++) {
      const sdg = pilotSDGs[Math.floor(Math.random() * pilotSDGs.length)];
      if (!selected.includes(sdg)) selected.push(sdg);
    }
    return selected;
  }

  private generateGDRComponents() {
    return {
      teknik_rol: Math.floor(Math.random() * 100),
      takim: Math.floor(Math.random() * 100),
      sunum: Math.floor(Math.random() * 100),
      guvenilirlik: Math.floor(Math.random() * 100),
      sosyal_etki: Math.floor(Math.random() * 100)
    };
  }


  private generateCompletedModules(level: string): string[] {
    const counts = { cirak: 5, kalfa: 15, usta: 30, graduate: 50 };
    const count = counts[level as keyof typeof counts] || 0;
    return Array.from({length: count}, (_, i) => `ML-${String(i + 1).padStart(2, '0')}`);
  }

  private generateCompletedTasks(level: string): string[] {
    const counts = { cirak: 3, kalfa: 10, usta: 20, graduate: 35 };
    const count = counts[level as keyof typeof counts] || 0;
    return Array.from({length: count}, (_, i) => `T-${String(i + 1).padStart(2, '0')}`);
  }

  private generateCareerInterests(): string[] {
    const count = Math.floor(Math.random() * 4) + 2; // 2-5 interests
    const selected: string[] = [];
    
    while (selected.length < count) {
      const interest = CAREER_INTERESTS[Math.floor(Math.random() * CAREER_INTERESTS.length)];
      if (!selected.includes(interest)) selected.push(interest);
    }
    
    return selected;
  }

  private generateBio(name: string, level: string): string {
    const bios = {
      cirak: `Merhaba! Ben ${name}, dijital dünyaya yeni adım atıyorum. Teknoloji ile sosyal problemleri çözmeyi hedefliyorum.`,
      kalfa: `${name} olarak, kod yazma ve tasarım konularında kendimi geliştiriyorum. Takım çalışmasını seviyorum.`,
      usta: `Deneyimli ${name}. Projeler geliştiriyor, mentorluğa başlıyorum. Sürdürülebilir teknoloji çözümlerine odaklanıyorum.`,
      graduate: `PUSULA mezunu ${name}. Artık sektörde aktif olarak çalışıyor ve yeni nesil öğrencilere mentorluk yapıyorum.`
    };
    return bios[level as keyof typeof bios] || bios.cirak;
  }

  private getCohortStatus(startDate: Date, endDate: Date): 'upcoming' | 'active' | 'completed' {
    const now = new Date();
    if (now < startDate) return 'upcoming';
    if (now > endDate) return 'completed';
    return 'active';
  }

  private generateLearningObjectives(title: string): string[] {
    return [
      `${title} temel kavramlarını anlama`,
      `Pratik uygulamalar yapabilme`,
      `Gerçek dünya problemlerine uygulama`,
      `Takım içinde etkili çalışma`
    ];
  }

  private generateInteractiveElements(): InteractiveElement[] {
    return [
      { type: 'video' as const, title: 'Giriş Videosu', content: {}, required: true, points: 10 },
      { type: 'quiz' as const, title: 'Bilgi Kontrolü', content: {}, required: true, points: 20 },
      { type: 'coding' as const, title: 'Pratik Uygulama', content: {}, required: true, points: 30 },
      { type: 'reflection' as const, title: 'Yansıtma', content: {}, required: false, points: 15 }
    ];
  }

  private generateAssessmentCriteria() {
    return {
      passingScore: 70,
      maxAttempts: 3,
      timeLimit: 120,
      rubric: [
        {
          criterion: 'Teknik Doğruluk',
          weight: 0.4,
          levels: [
            { score: 100, description: 'Mükemmel teknik uygulama' },
            { score: 80, description: 'İyi teknik uygulama' },
            { score: 60, description: 'Kabul edilebilir' },
            { score: 40, description: 'Geliştirilmeli' }
          ]
        }
      ]
    };
  }

  private generateRealWorldApplication(title: string): string {
    return `${title} becerileri, gerçek projelerde ve iş hayatında doğrudan kullanılabilir.`;
  }

  private getEstimatedHours(difficulty: string): number {
    const hours = { easy: 8, med: 20, hard: 40 };
    return hours[difficulty as keyof typeof hours] || 8;
  }

  private getXPReward(difficulty: string): number {
    const xp = { easy: 50, med: 100, hard: 150 };
    return xp[difficulty as keyof typeof xp] || 50;
  }

  private generateSDGImpact() {
    const sdgs = [4, 6, 11, 13, 17];
    return {
      primarySDG: sdgs[Math.floor(Math.random() * sdgs.length)],
      secondarySDGs: sdgs.filter(() => Math.random() > 0.7),
      impactDescription: 'Bu proje sürdürülebilir kalkınma hedeflerine katkı sağlar.',
      measurableOutcomes: ['Beceri geliştirme', 'Toplumsal farkındalık', 'Teknoloji kullanımı']
    };
  }

  private generateDeliverables(title: string): Deliverable[] {
    return [
      { type: 'code' as const, title: 'Kaynak Kod', description: 'Çalışan kod deposu', required: true, format: ['github'] },
      { type: 'document' as const, title: 'Proje Raporu', description: 'Detaylı dokümantasyon', required: true, format: ['pdf', 'md'] },
      { type: 'presentation' as const, title: 'Demo Sunumu', description: 'Canlı demo', required: false, format: ['video', 'live'] }
    ];
  }

  private generateEvaluationRubric() {
    return [
      {
        criterion: 'Teknik Kalite',
        weight: 0.4,
        levels: [
          { score: 100, description: 'Mükemmel kod kalitesi ve mimari' },
          { score: 80, description: 'İyi kod kalitesi' },
          { score: 60, description: 'Kabul edilebilir kalite' }
        ]
      }
    ];
  }

  private generateRealWorldContext(title: string): string {
    return `${title} projesi, Eskişehir'deki gerçek ihtiyaçlardan yola çıkarak tasarlanmıştır.`;
  }

  private generateHints(title: string): string[] {
    return [
      'Küçük adımlarla başla',
      'Dokümantasyonu dikkatlice oku',
      'Buddy\'nden yardım iste'
    ];
  }

  private generateMandatoryEvidence(): string[] {
    return [
      'Çalışan demo videosu',
      'GitHub repository linki',
      'Proje dokümantasyonu'
    ];
  }
}