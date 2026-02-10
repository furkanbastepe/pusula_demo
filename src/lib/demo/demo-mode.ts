/**
 * UNDP Demo Mode and Guided Tours
 * 
 * Interactive demo mode with guided navigation, stakeholder-focused
 * feature highlights, and demo data reset capabilities.
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface DemoMode {
  isActive: boolean;
  scenario: string;
  currentStep: number;
  totalSteps: number;
  autoAdvance: boolean;
  highlightFeatures: boolean;
}

export interface GuidedTour {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  estimatedDuration: number; // minutes
  steps: TourStep[];
  completionReward?: string;
}

export interface TourStep {
  id: string;
  title: string;
  description: string;
  route: string;
  highlightElements: string[];
  actions: TourAction[];
  tips: string[];
  duration: number; // seconds
}

export interface TourAction {
  type: 'click' | 'scroll' | 'input' | 'wait' | 'highlight';
  target: string;
  value?: any;
  description: string;
}

export interface FeatureHighlight {
  feature: string;
  title: string;
  description: string;
  benefits: string[];
  demoData: any;
  relatedFeatures: string[];
}

// ============================================================================
// Demo Mode System
// ============================================================================

export class DemoModeSystem {
  private demoState: DemoMode = {
    isActive: false,
    scenario: '',
    currentStep: 0,
    totalSteps: 0,
    autoAdvance: false,
    highlightFeatures: true,
  };

  /**
   * Activate demo mode
   */
  activateDemoMode(scenario: string): DemoMode {
    this.demoState = {
      isActive: true,
      scenario,
      currentStep: 0,
      totalSteps: this.getTotalSteps(scenario),
      autoAdvance: false,
      highlightFeatures: true,
    };
    
    return this.demoState;
  }

  /**
   * Deactivate demo mode
   */
  deactivateDemoMode(): void {
    this.demoState.isActive = false;
  }

  /**
   * Get current demo state
   */
  getDemoState(): DemoMode {
    return { ...this.demoState };
  }

  /**
   * Advance to next step
   */
  nextStep(): DemoMode {
    if (this.demoState.currentStep < this.demoState.totalSteps - 1) {
      this.demoState.currentStep++;
    }
    return this.getDemoState();
  }

  /**
   * Go to previous step
   */
  previousStep(): DemoMode {
    if (this.demoState.currentStep > 0) {
      this.demoState.currentStep--;
    }
    return this.getDemoState();
  }

  /**
   * Reset demo data
   */
  resetDemoData(): { success: boolean; message: string } {
    // In a real implementation, this would reset all demo data
    // For now, we'll just return success
    return {
      success: true,
      message: 'Demo verileri sıfırlandı. Sayfa yenileniyor...',
    };
  }

  /**
   * Get total steps for scenario
   */
  private getTotalSteps(scenario: string): number {
    const stepCounts: Record<string, number> = {
      undp_executive: 8,
      municipality: 6,
      donor: 7,
      partner: 5,
    };
    
    return stepCounts[scenario] || 5;
  }
}

// ============================================================================
// Guided Tours System
// ============================================================================

export class GuidedToursSystem {
  /**
   * Get all available tours
   */
  getAllTours(): GuidedTour[] {
    return [
      this.getUNDPExecutiveTour(),
      this.getMunicipalityTour(),
      this.getStudentOnboardingTour(),
      this.getGuideOrientationTour(),
    ];
  }

  /**
   * Get tour by ID
   */
  getTour(tourId: string): GuidedTour | null {
    const tours = this.getAllTours();
    return tours.find(t => t.id === tourId) || null;
  }

  /**
   * UNDP Executive Tour
   */
  private getUNDPExecutiveTour(): GuidedTour {
    return {
      id: 'undp_executive_tour',
      title: 'UNDP Yönetici Turu',
      description: 'Kapsamlı platform özellikleri ve etki göstergeleri',
      targetAudience: 'UNDP Yöneticileri',
      estimatedDuration: 15,
      steps: [
        {
          id: 'step_1',
          title: 'Hoş Geldiniz',
          description: 'PUSULA Dijital Gençlik Merkezi\'ne hoş geldiniz',
          route: '/panel',
          highlightElements: ['#dashboard'],
          actions: [],
          tips: ['Platform 850 aktif öğrenciye hizmet veriyor'],
          duration: 30,
        },
        {
          id: 'step_2',
          title: 'SDG Etki Göstergeleri',
          description: 'Sürdürülebilir Kalkınma Hedefleri ilerlemesi',
          route: '/panel',
          highlightElements: ['#sdg-metrics'],
          actions: [
            {
              type: 'highlight',
              target: '#sdg-4',
              description: 'SDG 4: Nitelikli Eğitim - %87 ilerleme',
            },
            {
              type: 'highlight',
              target: '#sdg-5',
              description: 'SDG 5: Toplumsal Cinsiyet Eşitliği - %92 ilerleme',
            },
          ],
          tips: ['%61.2 kadın katılımı - hedefin üzerinde!'],
          duration: 45,
        },
        {
          id: 'step_3',
          title: 'İstihdam ve Ekonomik Etki',
          description: 'Mezunların istihdam durumu ve ekonomik katkı',
          route: '/panel',
          highlightElements: ['#employment-metrics'],
          actions: [],
          tips: ['%82.3 istihdam oranı', '%156.7 ortalama maaş artışı'],
          duration: 40,
        },
        {
          id: 'step_4',
          title: 'Öğrenme Yolculuğu',
          description: 'Örnek bir öğrenci yolculuğu',
          route: '/profil',
          highlightElements: ['#learner-journey'],
          actions: [],
          tips: ['3 aşamalı öğrenme: Keşif, İnşa, Etki'],
          duration: 50,
        },
        {
          id: 'step_5',
          title: 'Gamification ve Motivasyon',
          description: 'XP, rozetler ve seviye sistemi',
          route: '/profil',
          highlightElements: ['#gamification'],
          actions: [],
          tips: ['4 seviye: Çırak, Kalfa, Usta, Mezun'],
          duration: 35,
        },
        {
          id: 'step_6',
          title: 'Fiziksel Merkez Entegrasyonu',
          description: 'DiGEM fiziksel merkez kullanımı',
          route: '/panel',
          highlightElements: ['#physical-center'],
          actions: [],
          tips: ['Günlük ortalama 24.7/30 doluluk'],
          duration: 30,
        },
        {
          id: 'step_7',
          title: 'Sosyal Etki Projeleri',
          description: 'Öğrencilerin gerçek dünya projeleri',
          route: '/panel',
          highlightElements: ['#impact-projects'],
          actions: [],
          tips: ['52 proje tamamlandı', '125,000 kişiye ulaşıldı'],
          duration: 40,
        },
        {
          id: 'step_8',
          title: 'Ölçeklenebilirlik',
          description: 'Model diğer şehirlere uyarlanabilir',
          route: '/panel',
          highlightElements: ['#scalability'],
          actions: [],
          tips: ['Modüler yapı', 'Düşük maliyet', 'Yüksek etki'],
          duration: 35,
        },
      ],
      completionReward: 'UNDP Demo Turu Tamamlandı',
    };
  }

  /**
   * Municipality Tour
   */
  private getMunicipalityTour(): GuidedTour {
    return {
      id: 'municipality_tour',
      title: 'Belediye Turu',
      description: 'Yerel etki ve topluluk faydaları',
      targetAudience: 'Belediye Yetkilileri',
      estimatedDuration: 10,
      steps: [
        {
          id: 'step_1',
          title: 'Yerel Gençlik İstihdamı',
          description: 'Eskişehirli gençlerin istihdam durumu',
          route: '/panel',
          highlightElements: ['#local-employment'],
          actions: [],
          tips: ['340 Eskişehirli genç istihdam edildi'],
          duration: 40,
        },
        {
          id: 'step_2',
          title: 'Fiziksel Merkez Kullanımı',
          description: 'DiGEM günlük aktiviteler',
          route: '/panel',
          highlightElements: ['#center-usage'],
          actions: [],
          tips: ['Günde ortalama 45 ziyaretçi'],
          duration: 35,
        },
        {
          id: 'step_3',
          title: 'Topluluk Projeleri',
          description: 'Eskişehir için geliştirilen projeler',
          route: '/panel',
          highlightElements: ['#community-projects'],
          actions: [],
          tips: ['Akıllı Şehir Eskişehir projesi'],
          duration: 45,
        },
        {
          id: 'step_4',
          title: 'Ekonomik Katkı',
          description: 'Yerel ekonomiye katkı',
          route: '/panel',
          highlightElements: ['#economic-impact'],
          actions: [],
          tips: ['63.75M TL ekonomik değer yaratıldı'],
          duration: 40,
        },
        {
          id: 'step_5',
          title: 'Gençlik Katılımı',
          description: 'Aktif gençlik katılımı',
          route: '/panel',
          highlightElements: ['#youth-engagement'],
          actions: [],
          tips: ['850 aktif genç', '%85 memnuniyet'],
          duration: 30,
        },
        {
          id: 'step_6',
          title: 'Gelecek Planları',
          description: 'Genişleme ve sürdürülebilirlik',
          route: '/panel',
          highlightElements: ['#future-plans'],
          actions: [],
          tips: ['2025 hedefi: 1,200 öğrenci'],
          duration: 35,
        },
      ],
      completionReward: 'Belediye Demo Turu Tamamlandı',
    };
  }

  /**
   * Student Onboarding Tour
   */
  private getStudentOnboardingTour(): GuidedTour {
    return {
      id: 'student_onboarding',
      title: 'Öğrenci Oryantasyonu',
      description: 'Yeni öğrenciler için platform tanıtımı',
      targetAudience: 'Yeni Öğrenciler',
      estimatedDuration: 12,
      steps: [
        {
          id: 'step_1',
          title: 'Hoş Geldin!',
          description: 'PUSULA\'ya hoş geldin',
          route: '/panel',
          highlightElements: ['#welcome'],
          actions: [],
          tips: ['Dijital yolculuğun burada başlıyor'],
          duration: 30,
        },
        {
          id: 'step_2',
          title: 'Öğrenme Haritası',
          description: '3 aşamalı öğrenme yolculuğun',
          route: '/harita',
          highlightElements: ['#learning-map'],
          actions: [],
          tips: ['Keşif → İnşa → Etki'],
          duration: 45,
        },
        {
          id: 'step_3',
          title: 'MicroLab Modülleri',
          description: 'İnteraktif öğrenme modülleri',
          route: '/ogren',
          highlightElements: ['#microlabs'],
          actions: [],
          tips: ['50+ modül seni bekliyor'],
          duration: 40,
        },
        {
          id: 'step_4',
          title: 'Görevler ve Projeler',
          description: 'Gerçek dünya projeleri',
          route: '/gorevler',
          highlightElements: ['#tasks'],
          actions: [],
          tips: ['40+ görev ile pratik yap'],
          duration: 40,
        },
        {
          id: 'step_5',
          title: 'XP ve Seviyeler',
          description: 'İlerlemeni takip et',
          route: '/profil',
          highlightElements: ['#xp-system'],
          actions: [],
          tips: ['XP kazan, seviye atla, rozet topla'],
          duration: 35,
        },
        {
          id: 'step_6',
          title: 'Buddy Sistemi',
          description: 'Öğrenme arkadaşın',
          route: '/buddy',
          highlightElements: ['#buddy-system'],
          actions: [],
          tips: ['Birlikte öğrenmek daha eğlenceli'],
          duration: 35,
        },
        {
          id: 'step_7',
          title: 'AI Mentor',
          description: '7/24 yapay zeka desteği',
          route: '/mentor',
          highlightElements: ['#ai-mentor'],
          actions: [],
          tips: ['Sorularını sor, anında cevap al'],
          duration: 30,
        },
        {
          id: 'step_8',
          title: 'Fiziksel Merkez',
          description: 'DiGEM\'e gel, birlikte çalış',
          route: '/panel',
          highlightElements: ['#physical-center'],
          actions: [],
          tips: ['%50 XP bonusu kazan'],
          duration: 30,
        },
      ],
      completionReward: '100 XP Oryantasyon Bonusu',
    };
  }

  /**
   * Guide Orientation Tour
   */
  private getGuideOrientationTour(): GuidedTour {
    return {
      id: 'guide_orientation',
      title: 'Rehber Oryantasyonu',
      description: 'Rehberler için platform özellikleri',
      targetAudience: 'Rehberler',
      estimatedDuration: 10,
      steps: [
        {
          id: 'step_1',
          title: 'Rehber Paneli',
          description: 'Kohort yönetimi ve öğrenci takibi',
          route: '/rehber',
          highlightElements: ['#guide-dashboard'],
          actions: [],
          tips: ['Tüm öğrencilerini buradan takip et'],
          duration: 40,
        },
        {
          id: 'step_2',
          title: 'Risk Uyarıları',
          description: 'Erken müdahale sistemi',
          route: '/rehber',
          highlightElements: ['#risk-alerts'],
          actions: [],
          tips: ['Risk altındaki öğrencileri gör'],
          duration: 45,
        },
        {
          id: 'step_3',
          title: 'Değerlendirme Sistemi',
          description: 'Görev ve proje değerlendirme',
          route: '/rehber/degerlendirme',
          highlightElements: ['#evaluation'],
          actions: [],
          tips: ['Hızlı ve adil değerlendirme'],
          duration: 40,
        },
        {
          id: 'step_4',
          title: 'Analitik Raporlar',
          description: 'Kohort performans analizi',
          route: '/rehber',
          highlightElements: ['#analytics'],
          actions: [],
          tips: ['Veri odaklı kararlar al'],
          duration: 35,
        },
        {
          id: 'step_5',
          title: 'İletişim Araçları',
          description: 'Öğrencilerle iletişim',
          route: '/rehber',
          highlightElements: ['#communication'],
          actions: [],
          tips: ['Toplu mesaj, bireysel görüşme'],
          duration: 30,
        },
      ],
      completionReward: 'Rehber Oryantasyonu Tamamlandı',
    };
  }
}

// ============================================================================
// Feature Highlights System
// ============================================================================

export class FeatureHighlightsSystem {
  /**
   * Get all feature highlights
   */
  getAllHighlights(): FeatureHighlight[] {
    return [
      {
        feature: 'gamification',
        title: 'Kapsamlı Gamification Sistemi',
        description: 'XP, seviyeler, rozetler ve liderlik tablosu ile motivasyon',
        benefits: [
          'Öğrenci motivasyonunu %45 artırır',
          'Tamamlama oranını %30 yükseltir',
          'Sürekli engagement sağlar',
        ],
        demoData: {
          totalXP: 3500,
          level: 'Kalfa',
          badges: 12,
          rank: 45,
        },
        relatedFeatures: ['leaderboard', 'achievements', 'levels'],
      },
      {
        feature: 'ai_mentor',
        title: 'AI Mentor Sistemi',
        description: '7/24 yapay zeka destekli öğrenme asistanı',
        benefits: [
          'Anında destek',
          'Kişiselleştirilmiş öneriler',
          'Rehber iş yükünü %40 azaltır',
        ],
        demoData: {
          totalQuestions: 156,
          averageResponseTime: '2.3 saniye',
          satisfactionRate: 92,
        },
        relatedFeatures: ['content_reference', 'escalation'],
      },
      {
        feature: 'buddy_system',
        title: 'Akıllı Buddy Sistemi',
        description: 'Uyumluluk bazlı eşleştirme ve işbirlikçi öğrenme',
        benefits: [
          'Sosyal öğrenme',
          'Peer support',
          'Retention %25 artış',
        ],
        demoData: {
          matchScore: 87,
          collaborations: 23,
          mutualGrowth: 450,
        },
        relatedFeatures: ['collaboration', 'peer_learning'],
      },
      {
        feature: 'physical_center',
        title: 'Fiziksel-Dijital Entegrasyon',
        description: 'QR check-in, kaynak yönetimi ve %50 XP bonusu',
        benefits: [
          'Hibrit öğrenme',
          'Topluluk oluşturma',
          'Pratik deneyim',
        ],
        demoData: {
          visits: 45,
          xpBonus: 2250,
          averageStay: 3.5,
        },
        relatedFeatures: ['qr_checkin', 'resource_management'],
      },
      {
        feature: 'bot_arena',
        title: 'Bot Arena Yarışmaları',
        description: '6 farklı yarışma formatı ile beceri geliştirme',
        benefits: [
          'Pratik uygulama',
          'Rekabetçi öğrenme',
          'Gerçek dünya becerileri',
        ],
        demoData: {
          competitions: 6,
          participants: 120,
          averageScore: 78,
        },
        relatedFeatures: ['competitions', 'leaderboard'],
      },
      {
        feature: 'analytics',
        title: 'Gelişmiş Analitik ve Raporlama',
        description: 'Erken uyarı sistemi ve SDG-aligned raporlar',
        benefits: [
          'Veri odaklı kararlar',
          'Erken müdahale',
          'UNDP raporlama',
        ],
        demoData: {
          atRiskStudents: 12,
          sdgProgress: 87,
          employmentRate: 82.3,
        },
        relatedFeatures: ['predictive', 'undp_reporting'],
      },
    ];
  }

  /**
   * Get highlight by feature
   */
  getHighlight(feature: string): FeatureHighlight | null {
    const highlights = this.getAllHighlights();
    return highlights.find(h => h.feature === feature) || null;
  }
}

// ============================================================================
// Singleton Instances
// ============================================================================

export const demoMode = new DemoModeSystem();
export const guidedTours = new GuidedToursSystem();
export const featureHighlights = new FeatureHighlightsSystem();
