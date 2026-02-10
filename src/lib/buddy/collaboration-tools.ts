/**
 * Buddy System - Collaboration Tools and Activities
 * 
 * Provides structured peer learning activities, communication tools,
 * and collaboration XP reward systems for the PUSULA platform.
 */

import type { BuddyMatch } from './matching-algorithm';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface CollaborationActivity {
  id: string;
  type: 'pair-programming' | 'code-review' | 'project-collab' | 'study-session' | 'challenge-race' | 'peer-teaching';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  xpReward: number;
  collaborationBonus: number; // Additional XP for completion
  requirements: {
    minLevel?: 'cirak' | 'kalfa' | 'usta' | 'mezun';
    skillsNeeded?: string[];
    physicalCenter?: boolean;
  };
  structure: ActivityStep[];
  learningObjectives: string[];
  successCriteria: string[];
}

export interface ActivityStep {
  stepNumber: number;
  title: string;
  description: string;
  duration: number; // minutes
  role1Action: string; // What user 1 does
  role2Action: string; // What user 2 does
  deliverable?: string;
}

export interface CollaborationSession {
  id: string;
  buddyMatch: BuddyMatch;
  activity: CollaborationActivity;
  startedAt: Date;
  completedAt?: Date;
  status: 'in-progress' | 'completed' | 'abandoned';
  progress: {
    currentStep: number;
    stepsCompleted: number;
    totalSteps: number;
  };
  outcomes: {
    xpEarned: number;
    skillsImproved: string[];
    deliverables: string[];
    rating?: number; // 1-5 stars
    feedback?: string;
  };
}

export interface SharedWorkspace {
  id: string;
  buddyMatch: BuddyMatch;
  type: 'code-editor' | 'whiteboard' | 'document' | 'project-board';
  content: any;
  lastModified: Date;
  modifiedBy: string;
  version: number;
}

export interface CommunicationMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'code-snippet' | 'resource-link' | 'encouragement';
  read: boolean;
}

// ============================================================================
// Collaboration Activities Library
// ============================================================================

export const COLLABORATION_ACTIVITIES: CollaborationActivity[] = [
  // Beginner Activities
  {
    id: 'CA-001',
    type: 'pair-programming',
    title: 'İlk Web Sayfası Birlikte Kodlama',
    description: 'HTML ve CSS kullanarak basit bir kişisel web sayfası oluşturun',
    difficulty: 'easy',
    estimatedMinutes: 60,
    xpReward: 50,
    collaborationBonus: 25,
    requirements: {
      minLevel: 'cirak',
    },
    structure: [
      {
        stepNumber: 1,
        title: 'Planlama',
        description: 'Web sayfası içeriğini ve yapısını planlayın',
        duration: 15,
        role1Action: 'Sayfa yapısını çiz (header, content, footer)',
        role2Action: 'İçerik fikirlerini listele (metin, resimler)',
        deliverable: 'Sayfa planı',
      },
      {
        stepNumber: 2,
        title: 'HTML Yapısı',
        description: 'HTML iskeletini oluşturun',
        duration: 20,
        role1Action: 'HTML etiketlerini yaz',
        role2Action: 'İçeriği ekle ve kontrol et',
        deliverable: 'HTML dosyası',
      },
      {
        stepNumber: 3,
        title: 'CSS Stillendirme',
        description: 'Sayfayı güzelleştirin',
        duration: 20,
        role1Action: 'Renk ve font seç',
        role2Action: 'CSS kurallarını yaz',
        deliverable: 'Stillendirilmiş sayfa',
      },
      {
        stepNumber: 4,
        title: 'Test ve İyileştirme',
        description: 'Sayfayı test edin ve iyileştirin',
        duration: 5,
        role1Action: 'Farklı ekran boyutlarında test et',
        role2Action: 'Hataları düzelt',
        deliverable: 'Tamamlanmış web sayfası',
      },
    ],
    learningObjectives: [
      'HTML yapısını anlamak',
      'CSS ile stillendirme yapmak',
      'Pair programming pratiği',
      'Kod review alışkanlığı',
    ],
    successCriteria: [
      'Çalışan bir web sayfası',
      'Temiz ve okunabilir kod',
      'Her iki buddy de katkıda bulundu',
      'Tüm adımlar tamamlandı',
    ],
  },
  {
    id: 'CA-002',
    type: 'code-review',
    title: 'Kod İnceleme Seansı',
    description: 'Birbirinizin kodlarını inceleyin ve geri bildirim verin',
    difficulty: 'easy',
    estimatedMinutes: 45,
    xpReward: 40,
    collaborationBonus: 20,
    requirements: {
      minLevel: 'cirak',
    },
    structure: [
      {
        stepNumber: 1,
        title: 'Kod Paylaşımı',
        description: 'İncelenecek kodu paylaşın',
        duration: 5,
        role1Action: 'Kodunu paylaş',
        role2Action: 'Kodu incele',
      },
      {
        stepNumber: 2,
        title: 'İlk İnceleme',
        description: 'Kodu genel olarak inceleyin',
        duration: 15,
        role1Action: 'Soruları yanıtla',
        role2Action: 'Anlamadığın yerleri sor',
      },
      {
        stepNumber: 3,
        title: 'Detaylı Analiz',
        description: 'İyileştirme önerileri sunun',
        duration: 15,
        role1Action: 'Önerileri dinle ve not al',
        role2Action: 'Yapıcı geri bildirim ver',
      },
      {
        stepNumber: 4,
        title: 'Rol Değişimi',
        description: 'Rolleri değiştirin ve tekrarlayın',
        duration: 10,
        role1Action: 'Şimdi sen incele',
        role2Action: 'Şimdi sen paylaş',
      },
    ],
    learningObjectives: [
      'Kod okuma becerisi',
      'Yapıcı geri bildirim verme',
      'Farklı çözüm yaklaşımları görme',
      'İletişim becerileri',
    ],
    successCriteria: [
      'Her iki taraf da kod paylaştı',
      'Yapıcı geri bildirimler verildi',
      'İyileştirme önerileri sunuldu',
      'Saygılı iletişim kuruldu',
    ],
  },

  // Intermediate Activities
  {
    id: 'CA-003',
    type: 'project-collab',
    title: 'Mini Proje Geliştirme',
    description: 'Küçük bir web uygulaması birlikte geliştirin',
    difficulty: 'medium',
    estimatedMinutes: 120,
    xpReward: 100,
    collaborationBonus: 50,
    requirements: {
      minLevel: 'kalfa',
      skillsNeeded: ['JavaScript', 'HTML', 'CSS'],
    },
    structure: [
      {
        stepNumber: 1,
        title: 'Proje Seçimi',
        description: 'Geliştireceğiniz projeyi seçin',
        duration: 15,
        role1Action: 'Proje fikirlerini paylaş',
        role2Action: 'Fikirleri değerlendir ve seç',
      },
      {
        stepNumber: 2,
        title: 'Görev Dağılımı',
        description: 'İş bölümü yapın',
        duration: 15,
        role1Action: 'Frontend görevlerini al',
        role2Action: 'Backend/logic görevlerini al',
      },
      {
        stepNumber: 3,
        title: 'Paralel Geliştirme',
        description: 'Ayrı ayrı geliştirin',
        duration: 60,
        role1Action: 'Kendi görevlerini tamamla',
        role2Action: 'Kendi görevlerini tamamla',
      },
      {
        stepNumber: 4,
        title: 'Entegrasyon',
        description: 'Kodları birleştirin',
        duration: 20,
        role1Action: 'Kodları merge et',
        role2Action: 'Çakışmaları çöz',
      },
      {
        stepNumber: 5,
        title: 'Test ve Sunum',
        description: 'Projeyi test edin ve sunun',
        duration: 10,
        role1Action: 'Test senaryolarını çalıştır',
        role2Action: 'Sonuçları dokümante et',
      },
    ],
    learningObjectives: [
      'Proje yönetimi',
      'Git kullanımı',
      'Takım çalışması',
      'Problem çözme',
    ],
    successCriteria: [
      'Çalışan bir uygulama',
      'Her iki buddy de katkıda bulundu',
      'Kod birleştirildi',
      'Dokümantasyon hazırlandı',
    ],
  },
  {
    id: 'CA-004',
    type: 'study-session',
    title: 'Konsept Öğrenme Seansı',
    description: 'Yeni bir teknolojiyi birlikte öğrenin',
    difficulty: 'medium',
    estimatedMinutes: 90,
    xpReward: 75,
    collaborationBonus: 35,
    requirements: {
      minLevel: 'kalfa',
    },
    structure: [
      {
        stepNumber: 1,
        title: 'Konu Seçimi',
        description: 'Öğrenilecek konuyu belirleyin',
        duration: 10,
        role1Action: 'Öğrenmek istediğin konuyu öner',
        role2Action: 'Konuyu değerlendir ve karar ver',
      },
      {
        stepNumber: 2,
        title: 'Kaynak Araştırması',
        description: 'Öğrenme kaynaklarını bulun',
        duration: 15,
        role1Action: 'Video kaynakları bul',
        role2Action: 'Yazılı kaynakları bul',
      },
      {
        stepNumber: 3,
        title: 'Birlikte Öğrenme',
        description: 'Kaynakları birlikte inceleyin',
        duration: 45,
        role1Action: 'Anladıklarını açıkla',
        role2Action: 'Sorular sor ve tartış',
      },
      {
        stepNumber: 4,
        title: 'Pratik Yapma',
        description: 'Öğrendiklerinizi uygulayın',
        duration: 20,
        role1Action: 'Basit bir örnek yap',
        role2Action: 'Örneği geliştir',
      },
    ],
    learningObjectives: [
      'Yeni teknoloji öğrenme',
      'Peer teaching',
      'Aktif öğrenme',
      'Bilgi paylaşımı',
    ],
    successCriteria: [
      'Konu anlaşıldı',
      'Pratik örnek yapıldı',
      'Her iki buddy de aktif katıldı',
      'Notlar alındı',
    ],
  },

  // Advanced Activities
  {
    id: 'CA-005',
    type: 'challenge-race',
    title: 'Algoritma Yarışması',
    description: 'Algoritma problemlerini birlikte çözün',
    difficulty: 'hard',
    estimatedMinutes: 90,
    xpReward: 120,
    collaborationBonus: 60,
    requirements: {
      minLevel: 'usta',
      skillsNeeded: ['Algorithms', 'Problem Solving'],
    },
    structure: [
      {
        stepNumber: 1,
        title: 'Problem Seçimi',
        description: '3-5 algoritma problemi seçin',
        duration: 10,
        role1Action: 'Problemleri listele',
        role2Action: 'Zorluk seviyelerini değerlendir',
      },
      {
        stepNumber: 2,
        title: 'Birlikte Çözüm',
        description: 'İlk problemi birlikte çözün',
        duration: 25,
        role1Action: 'Yaklaşımı açıkla',
        role2Action: 'Kodu yaz',
      },
      {
        stepNumber: 3,
        title: 'Bağımsız Çözüm',
        description: 'Ayrı ayrı çözün',
        duration: 30,
        role1Action: 'Kendi çözümünü yap',
        role2Action: 'Kendi çözümünü yap',
      },
      {
        stepNumber: 4,
        title: 'Çözüm Karşılaştırma',
        description: 'Çözümleri karşılaştırın',
        duration: 25,
        role1Action: 'Çözümünü açıkla',
        role2Action: 'Çözümünü açıkla ve karşılaştır',
      },
    ],
    learningObjectives: [
      'Algoritma tasarımı',
      'Problem çözme stratejileri',
      'Kod optimizasyonu',
      'Farklı yaklaşımları değerlendirme',
    ],
    successCriteria: [
      'En az 3 problem çözüldü',
      'Farklı yaklaşımlar denendi',
      'Çözümler karşılaştırıldı',
      'Öğrenme notları alındı',
    ],
  },
  {
    id: 'CA-006',
    type: 'peer-teaching',
    title: 'Öğret ve Öğren',
    description: 'Birbirinize farklı konuları öğretin',
    difficulty: 'medium',
    estimatedMinutes: 60,
    xpReward: 80,
    collaborationBonus: 40,
    requirements: {
      minLevel: 'kalfa',
    },
    structure: [
      {
        stepNumber: 1,
        title: 'Konu Belirleme',
        description: 'Her biri bir konu seçin',
        duration: 10,
        role1Action: 'Öğretmek istediğin konuyu seç',
        role2Action: 'Öğretmek istediğin konuyu seç',
      },
      {
        stepNumber: 2,
        title: 'İlk Öğretim',
        description: 'Birinci kişi öğretir',
        duration: 20,
        role1Action: 'Konunu öğret',
        role2Action: 'Dinle, sorular sor',
      },
      {
        stepNumber: 3,
        title: 'İkinci Öğretim',
        description: 'İkinci kişi öğretir',
        duration: 20,
        role1Action: 'Dinle, sorular sor',
        role2Action: 'Konunu öğret',
      },
      {
        stepNumber: 4,
        title: 'Geri Bildirim',
        description: 'Birbirinize geri bildirim verin',
        duration: 10,
        role1Action: 'Öğretim kalitesi hakkında geri bildirim ver',
        role2Action: 'Öğretim kalitesi hakkında geri bildirim ver',
      },
    ],
    learningObjectives: [
      'Öğretme becerisi',
      'İletişim becerileri',
      'Bilgiyi pekiştirme',
      'Empati geliştirme',
    ],
    successCriteria: [
      'Her iki konu da öğretildi',
      'Aktif katılım sağlandı',
      'Geri bildirim verildi',
      'Öğrenme gerçekleşti',
    ],
  },
];

// ============================================================================
// Collaboration Tools Manager
// ============================================================================

export class CollaborationToolsManager {
  /**
   * Get recommended activities for a buddy pair
   */
  getRecommendedActivities(
    buddyMatch: BuddyMatch,
    count: number = 3
  ): CollaborationActivity[] {
    const user1Level = this.getLevelValue(buddyMatch.user1.level);
    const user2Level = this.getLevelValue(buddyMatch.user2.level);
    const minLevel = Math.min(user1Level, user2Level);

    // Filter activities by level
    const suitable = COLLABORATION_ACTIVITIES.filter(activity => {
      if (!activity.requirements.minLevel) return true;
      const requiredLevel = this.getLevelValue(activity.requirements.minLevel);
      return minLevel >= requiredLevel;
    });

    // Sort by compatibility with buddy pair
    const scored = suitable.map(activity => ({
      activity,
      score: this.scoreActivityForPair(activity, buddyMatch),
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, count).map(s => s.activity);
  }

  /**
   * Score how suitable an activity is for a buddy pair
   */
  private scoreActivityForPair(
    activity: CollaborationActivity,
    buddyMatch: BuddyMatch
  ): number {
    let score = 0;

    // Prefer activities matching their compatibility strengths
    if (buddyMatch.compatibility.breakdown.skillLevel >= 20) {
      if (activity.type === 'pair-programming' || activity.type === 'project-collab') {
        score += 10;
      }
    }

    // If they have good learning style compatibility, prefer teaching activities
    if (buddyMatch.compatibility.breakdown.learningStyle >= 15) {
      if (activity.type === 'peer-teaching' || activity.type === 'study-session') {
        score += 8;
      }
    }

    // Consider their collaboration history
    if (buddyMatch.collaborationCount > 5) {
      // Prefer more challenging activities for experienced pairs
      if (activity.difficulty === 'hard') score += 5;
    } else {
      // Prefer easier activities for new pairs
      if (activity.difficulty === 'easy') score += 5;
    }

    // Physical center bonus
    const visits1 = buddyMatch.user1.physicalCenterVisits || 0;
    const visits2 = buddyMatch.user2.physicalCenterVisits || 0;
    if (visits1 > 10 && visits2 > 10 && activity.requirements.physicalCenter) {
      score += 7;
    }

    return score;
  }

  /**
   * Start a collaboration session
   */
  startSession(
    buddyMatch: BuddyMatch,
    activity: CollaborationActivity
  ): CollaborationSession {
    return {
      id: `CS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      buddyMatch,
      activity,
      startedAt: new Date(),
      status: 'in-progress',
      progress: {
        currentStep: 1,
        stepsCompleted: 0,
        totalSteps: activity.structure.length,
      },
      outcomes: {
        xpEarned: 0,
        skillsImproved: [],
        deliverables: [],
      },
    };
  }

  /**
   * Complete a collaboration session
   */
  completeSession(
    session: CollaborationSession,
    rating: number,
    feedback?: string
  ): CollaborationSession {
    const totalXP = session.activity.xpReward + session.activity.collaborationBonus;

    return {
      ...session,
      completedAt: new Date(),
      status: 'completed',
      progress: {
        ...session.progress,
        stepsCompleted: session.activity.structure.length,
      },
      outcomes: {
        ...session.outcomes,
        xpEarned: totalXP,
        rating,
        feedback,
      },
    };
  }

  /**
   * Calculate collaboration XP bonus
   */
  calculateCollaborationXP(
    activity: CollaborationActivity,
    completionQuality: 'excellent' | 'good' | 'average'
  ): number {
    const baseXP = activity.xpReward;
    const bonus = activity.collaborationBonus;

    const qualityMultipliers = {
      excellent: 1.5,
      good: 1.2,
      average: 1.0,
    };

    return Math.round((baseXP + bonus) * qualityMultipliers[completionQuality]);
  }

  /**
   * Generate encouragement messages
   */
  generateEncouragement(buddyMatch: BuddyMatch): string[] {
    const messages: string[] = [
      `${buddyMatch.user1.name} ve ${buddyMatch.user2.name}, harika bir takımsınız! 🎉`,
      'Birlikte öğrenmek daha eğlenceli! Devam edin! 💪',
      'İşbirliğiniz örnek teşkil ediyor! 🌟',
      'Peer learning gücünü keşfediyorsunuz! 🚀',
    ];

    if (buddyMatch.collaborationCount > 5) {
      messages.push('Deneyimli bir buddy çiftisiniz! Yeni başlayanlara mentorluk yapabilirsiniz! 🎓');
    }

    if (buddyMatch.successMetrics.averageRating >= 4.5) {
      messages.push('Mükemmel işbirliği! Diğer buddylere ilham veriyorsunuz! ⭐');
    }

    return messages;
  }

  /**
   * Get level numeric value
   */
  private getLevelValue(level: 'cirak' | 'kalfa' | 'usta' | 'mezun' | 'graduate'): number {
    const map = { cirak: 1, kalfa: 2, usta: 3, mezun: 4, graduate: 4 };
    return map[level];
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const collaborationTools = new CollaborationToolsManager();
