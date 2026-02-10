/**
 * UNDP Demo Scenarios and Data
 * 
 * Comprehensive demo scenarios, success stories, impact case studies,
 * and stakeholder presentation materials.
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  targetAudience: 'undp' | 'municipality' | 'donors' | 'partners' | 'general';
  duration: number; // minutes
  keyFeatures: string[];
  dataPoints: DemoDataPoint[];
  narrative: string;
  interactiveElements: InteractiveElement[];
}

export interface DemoDataPoint {
  metric: string;
  value: string | number;
  context: string;
  visualType: 'number' | 'chart' | 'map' | 'timeline';
}

export interface InteractiveElement {
  type: 'user_journey' | 'live_dashboard' | 'success_story' | 'impact_map';
  title: string;
  content: any;
}

export interface LearnerJourney {
  learnerId: string;
  learnerName: string;
  phase: 'kesif' | 'insa' | 'etki';
  startDate: Date;
  currentProgress: number; // percentage
  milestones: Milestone[];
  challenges: string[];
  achievements: string[];
  impactStory: string;
}

export interface Milestone {
  date: Date;
  title: string;
  description: string;
  xpEarned: number;
  skillsGained: string[];
}

export interface ImpactCaseStudy {
  id: string;
  title: string;
  category: 'individual' | 'community' | 'economic' | 'environmental' | 'social';
  sdgAlignment: number[];
  summary: string;
  background: string;
  intervention: string;
  results: Result[];
  testimonials: Testimonial[];
  metrics: Metric[];
  visualAssets: string[];
}

export interface Result {
  indicator: string;
  baseline: string | number;
  achieved: string | number;
  improvement: string;
}

export interface Testimonial {
  speaker: string;
  role: string;
  quote: string;
  date: Date;
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  comparison: string;
}

export interface StakeholderDashboard {
  title: string;
  lastUpdated: Date;
  kpis: KPI[];
  charts: Chart[];
  highlights: string[];
  alerts: string[];
}

export interface KPI {
  name: string;
  value: number;
  unit: string;
  target: number;
  status: 'on_track' | 'at_risk' | 'achieved';
  trend: 'improving' | 'stable' | 'declining';
}

export interface Chart {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  title: string;
  data: any;
  insights: string[];
}

// ============================================================================
// Demo Scenarios System
// ============================================================================

export class DemoScenariosSystem {
  /**
   * Get all demo scenarios
   */
  getAllScenarios(): DemoScenario[] {
    return [
      this.getUNDPExecutiveScenario(),
      this.getMunicipalityScenario(),
      this.getDonorScenario(),
      this.getPartnerScenario(),
    ];
  }

  /**
   * UNDP Executive Demo Scenario
   */
  private getUNDPExecutiveScenario(): DemoScenario {
    return {
      id: 'undp_executive',
      title: 'UNDP Yönetici Sunumu: Dijital Gençlik Merkezi Etki Raporu',
      description: 'UNDP yöneticileri için kapsamlı etki gösterimi',
      targetAudience: 'undp',
      duration: 30,
      keyFeatures: [
        'SDG hedef ilerlemesi',
        'Toplumsal cinsiyet eşitliği başarısı',
        'İstihdam ve ekonomik etki',
        'Ölçeklenebilirlik potansiyeli',
      ],
      dataPoints: [
        {
          metric: 'Toplam Faydalanıcı',
          value: 850,
          context: '18-29 yaş arası genç',
          visualType: 'number',
        },
        {
          metric: 'Kadın Katılımı',
          value: '61.2%',
          context: 'Hedef %60 - Aşıldı!',
          visualType: 'number',
        },
        {
          metric: 'İstihdam Oranı',
          value: '82.3%',
          context: 'Mezunlar arasında',
          visualType: 'number',
        },
        {
          metric: 'SDG İlerleme Skoru',
          value: 87,
          context: '100 üzerinden',
          visualType: 'chart',
        },
      ],
      narrative: 'PUSULA Dijital Gençlik Merkezi, Eskişehir\'de 850 gence ulaşarak...',
      interactiveElements: [
        {
          type: 'live_dashboard',
          title: 'Gerçek Zamanlı Etki Göstergeleri',
          content: {},
        },
        {
          type: 'success_story',
          title: 'Başarı Hikayeleri',
          content: {},
        },
      ],
    };
  }

  /**
   * Municipality Demo Scenario
   */
  private getMunicipalityScenario(): DemoScenario {
    return {
      id: 'municipality',
      title: 'Belediye Sunumu: Yerel Gençlik İstihdamı ve Dijital Dönüşüm',
      description: 'Eskişehir Belediyesi için yerel etki gösterimi',
      targetAudience: 'municipality',
      duration: 20,
      keyFeatures: [
        'Yerel istihdam artışı',
        'Gençlik katılımı',
        'Dijital dönüşüm katkısı',
        'Toplumsal fayda',
      ],
      dataPoints: [
        {
          metric: 'Eskişehirli Genç',
          value: 850,
          context: 'Programa katılan',
          visualType: 'number',
        },
        {
          metric: 'Yerel İstihdam',
          value: 340,
          context: 'Eskişehir\'de istihdam edilen',
          visualType: 'number',
        },
        {
          metric: 'Fiziksel Merkez Ziyareti',
          value: '24.7/30',
          context: 'Günlük ortalama doluluk',
          visualType: 'number',
        },
      ],
      narrative: 'Eskişehir Belediyesi DiGEM ile gençlere dijital beceriler kazandırıyor...',
      interactiveElements: [
        {
          type: 'impact_map',
          title: 'Eskişehir Etki Haritası',
          content: {},
        },
      ],
    };
  }

  /**
   * Donor Demo Scenario
   */
  private getDonorScenario(): DemoScenario {
    return {
      id: 'donor',
      title: 'Bağışçı Sunumu: Yatırım Getirisi ve Sosyal Etki',
      description: 'Potansiyel bağışçılar için ROI ve etki gösterimi',
      targetAudience: 'donors',
      duration: 25,
      keyFeatures: [
        'Yatırım getirisi (ROI)',
        'Maliyet etkinliği',
        'Ölçeklenebilir model',
        'Sürdürülebilirlik',
      ],
      dataPoints: [
        {
          metric: 'ROI',
          value: '245%',
          context: 'Sosyal yatırım getirisi',
          visualType: 'number',
        },
        {
          metric: 'Öğrenci Başına Maliyet',
          value: '2,206 TL',
          context: 'Sektör ortalamasının altında',
          visualType: 'number',
        },
        {
          metric: 'Ekonomik Değer',
          value: '63.75M TL',
          context: 'Yaratılan toplam değer',
          visualType: 'number',
        },
      ],
      narrative: 'Her 1 TL yatırım, 2.45 TL sosyal değer yaratıyor...',
      interactiveElements: [
        {
          type: 'live_dashboard',
          title: 'Finansal Etki Göstergeleri',
          content: {},
        },
      ],
    };
  }

  /**
   * Partner Demo Scenario
   */
  private getPartnerScenario(): DemoScenario {
    return {
      id: 'partner',
      title: 'Ortak Sunumu: İşbirliği Fırsatları ve Yetenek Havuzu',
      description: 'Şirket ortakları için yetenek ve işbirliği gösterimi',
      targetAudience: 'partners',
      duration: 15,
      keyFeatures: [
        'Nitelikli yetenek havuzu',
        'Özelleştirilebilir eğitim',
        'İşe hazır mezunlar',
        'Sürekli ortaklık',
      ],
      dataPoints: [
        {
          metric: 'Mezun Havuzu',
          value: 120,
          context: 'İşe hazır yetenekler',
          visualType: 'number',
        },
        {
          metric: 'Teknik Beceri Seviyesi',
          value: '82/100',
          context: 'Ortalama yeterlilik',
          visualType: 'number',
        },
        {
          metric: 'Ortak Şirketler',
          value: 45,
          context: 'Aktif işveren ortakları',
          visualType: 'number',
        },
      ],
      narrative: 'PUSULA mezunları, sektörün ihtiyaç duyduğu becerilere sahip...',
      interactiveElements: [
        {
          type: 'user_journey',
          title: 'Örnek Öğrenci Yolculuğu',
          content: {},
        },
      ],
    };
  }

  /**
   * Generate complete learner journey
   */
  generateLearnerJourney(learnerId: string): LearnerJourney {
    return {
      learnerId,
      learnerName: 'Ayşe Yılmaz',
      phase: 'etki',
      startDate: new Date('2024-09-01'),
      currentProgress: 85,
      milestones: [
        {
          date: new Date('2024-09-15'),
          title: 'İlk Modül Tamamlandı',
          description: 'HTML & CSS Temelleri',
          xpEarned: 100,
          skillsGained: ['HTML', 'CSS'],
        },
        {
          date: new Date('2024-10-20'),
          title: 'Kalfa Seviyesine Yükseldi',
          description: '1000 XP milestone',
          xpEarned: 1000,
          skillsGained: ['JavaScript', 'React'],
        },
        {
          date: new Date('2024-12-10'),
          title: 'İlk Proje Tamamlandı',
          description: 'E-ticaret web sitesi',
          xpEarned: 500,
          skillsGained: ['Full Stack', 'API Integration'],
        },
      ],
      challenges: [
        'İlk aylarda motivasyon düşüklüğü',
        'Teknik kavramları anlamakta zorluk',
      ],
      achievements: [
        'Buddy programında aktif mentor',
        'Bot Arena yarışmasında 2. lik',
        'Topluluk projesine liderlik',
      ],
      impactStory: 'Ayşe, programdan önce işsizdi. Şimdi bir teknoloji şirketinde Frontend Developer olarak çalışıyor ve ailesinin ilk üniversite mezunu.',
    };
  }

  /**
   * Generate impact case studies
   */
  generateImpactCaseStudies(): ImpactCaseStudy[] {
    return [
      {
        id: 'case_individual_1',
        title: 'İşsizlikten Yazılımcılığa: Ayşe\'nin Hikayesi',
        category: 'individual',
        sdgAlignment: [4, 5, 8],
        summary: 'Lise mezunu genç kadın, 6 ayda profesyonel yazılımcı oldu',
        background: 'Ayşe, lise mezunu, işsiz, dijital becerileri olmayan bir gençti',
        intervention: 'PUSULA programına katıldı, yoğun eğitim ve mentorluk aldı',
        results: [
          {
            indicator: 'İstihdam Durumu',
            baseline: 'İşsiz',
            achieved: 'Full Stack Developer',
            improvement: '%100 iyileşme',
          },
          {
            indicator: 'Gelir',
            baseline: '0 TL',
            achieved: '25,000 TL/ay',
            improvement: 'Sonsuz artış',
          },
        ],
        testimonials: [
          {
            speaker: 'Ayşe Yılmaz',
            role: 'Mezun',
            quote: 'PUSULA hayatımı değiştirdi. Şimdi hayallerimi gerçekleştirebiliyorum.',
            date: new Date(),
          },
        ],
        metrics: [
          { name: 'Eğitim Süresi', value: 6, unit: 'ay', trend: 'stable', comparison: 'Hedef süre' },
          { name: 'Maaş Artışı', value: 100, unit: '%', trend: 'up', comparison: 'Başlangıca göre' },
        ],
        visualAssets: ['photo_ayse.jpg', 'certificate_ayse.pdf'],
      },
      {
        id: 'case_community_1',
        title: 'Akıllı Şehir Eskişehir: Topluluk Projesi',
        category: 'community',
        sdgAlignment: [11, 13, 17],
        summary: '15 öğrenci, şehir kaynaklarını %18 daha verimli hale getirdi',
        background: 'Eskişehir\'de kaynak yönetimi verimsizdi',
        intervention: 'Öğrenciler akıllı şehir çözümleri geliştirdi',
        results: [
          {
            indicator: 'Kaynak Verimliliği',
            baseline: '100%',
            achieved: '118%',
            improvement: '%18 artış',
          },
          {
            indicator: 'CO2 Tasarrufu',
            baseline: '0 ton',
            achieved: '2,400 ton',
            improvement: '2,400 ton azalma',
          },
        ],
        testimonials: [
          {
            speaker: 'Belediye Başkanı',
            role: 'Eskişehir Belediyesi',
            quote: 'Gençlerimiz şehrimizi daha akıllı hale getiriyor.',
            date: new Date(),
          },
        ],
        metrics: [
          { name: 'Faydalanıcı', value: 125000, unit: 'kişi', trend: 'up', comparison: 'Şehir nüfusu' },
          { name: 'Proje Süresi', value: 4, unit: 'ay', trend: 'stable', comparison: 'Planlanan süre' },
        ],
        visualAssets: ['project_map.png', 'impact_chart.pdf'],
      },
    ];
  }

  /**
   * Generate stakeholder dashboard
   */
  generateStakeholderDashboard(): StakeholderDashboard {
    return {
      title: 'PUSULA Dijital Gençlik Merkezi - Canlı Gösterge Paneli',
      lastUpdated: new Date(),
      kpis: [
        {
          name: 'Aktif Öğrenci',
          value: 850,
          unit: 'öğrenci',
          target: 1000,
          status: 'on_track',
          trend: 'improving',
        },
        {
          name: 'Mezuniyet Oranı',
          value: 78,
          unit: '%',
          target: 85,
          status: 'on_track',
          trend: 'improving',
        },
        {
          name: 'İstihdam Oranı',
          value: 82.3,
          unit: '%',
          target: 80,
          status: 'achieved',
          trend: 'stable',
        },
        {
          name: 'Kadın Katılımı',
          value: 61.2,
          unit: '%',
          target: 60,
          status: 'achieved',
          trend: 'stable',
        },
      ],
      charts: [
        {
          type: 'line',
          title: 'Aylık Aktif Kullanıcılar',
          data: {},
          insights: ['Son 3 ayda %15 artış', 'Hedefin üzerinde'],
        },
        {
          type: 'bar',
          title: 'SDG Hedef İlerlemesi',
          data: {},
          insights: ['SDG 4: %87', 'SDG 5: %92', 'SDG 8: %82'],
        },
      ],
      highlights: [
        '🎓 850 aktif öğrenci',
        '👩 %61.2 kadın katılımcı',
        '💼 %82.3 istihdam oranı',
        '🌍 52 sosyal etki projesi',
      ],
      alerts: [
        '✅ Tüm KPI\'lar hedefte veya üzerinde',
        '📈 Engagement son 30 günde %12 arttı',
      ],
    };
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const demoScenarios = new DemoScenariosSystem();
