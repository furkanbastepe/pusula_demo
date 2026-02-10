// Level Progression and Unlocking System for PUSULA Platform

export interface LevelInfo {
  level: 'cirak' | 'kalfa' | 'usta' | 'graduate';
  displayName: string;
  xpRequired: number;
  description: string;
  icon: string;
  color: string;
}

export interface LevelUnlocks {
  features: string[];
  content: string[];
  privileges: string[];
}

export class LevelSystem {
  private static instance: LevelSystem;

  // Level definitions with exact thresholds
  private static readonly LEVELS: Record<string, LevelInfo> = {
    cirak: {
      level: 'cirak',
      displayName: 'Çırak',
      xpRequired: 0,
      description: 'Dijital yolculuğuna yeni başlayan öğrenci. Temel becerileri öğreniyor.',
      icon: '🌱',
      color: '#10b981' // green
    },
    kalfa: {
      level: 'kalfa',
      displayName: 'Kalfa',
      xpRequired: 1000,
      description: 'Temel becerileri kazanmış, projeler geliştirmeye başlayan öğrenci.',
      icon: '⚡',
      color: '#3b82f6' // blue
    },
    usta: {
      level: 'usta',
      displayName: 'Usta',
      xpRequired: 2500,
      description: 'İleri seviye becerilere sahip, mentorluk yapabilen deneyimli öğrenci.',
      icon: '🔥',
      color: '#f59e0b' // amber
    },
    graduate: {
      level: 'graduate',
      displayName: 'Mezun',
      xpRequired: 5000,
      description: 'PUSULA programını başarıyla tamamlamış, sertifikalı mezun.',
      icon: '🎓',
      color: '#8b5cf6' // purple
    }
  };

  // Feature unlocks per level
  private static readonly UNLOCKS: Record<string, LevelUnlocks> = {
    cirak: {
      features: [
        'Temel MicroLab modüllerine erişim',
        'Keşif fazı görevleri',
        'Buddy sistemi',
        'Temel portfolyo',
        'Topluluk forumları'
      ],
      content: [
        'Keşif fazı içeriği (20 modül)',
        'Başlangıç seviyesi görevler (15 görev)',
        'Temel simülasyonlar'
      ],
      privileges: [
        'DiGEM fiziksel merkez erişimi',
        'Haftalık mentor görüşmeleri',
        'Grup çalışma odaları'
      ]
    },
    kalfa: {
      features: [
        'İleri seviye MicroLab modülleri',
        'İnşa fazı görevleri',
        'Proje işbirliği araçları',
        'Gelişmiş portfolyo özellikleri',
        'Bot Arena yarışmaları',
        'Etkinlik organizasyonu'
      ],
      content: [
        'İnşa fazı içeriği (20 modül)',
        'Orta seviye görevler (15 görev)',
        'İleri simülasyonlar',
        'Özel workshop\'lar'
      ],
      privileges: [
        'Özel çalışma alanları',
        'Sektör mentorluğu',
        'Hackathon katılımı',
        'Sertifika programları'
      ]
    },
    usta: {
      features: [
        'Tüm MicroLab modüllerine erişim',
        'Etki fazı görevleri',
        'Mentorluk yapabilme',
        'Capstone proje yönetimi',
        'Topluluk liderliği',
        'Özel AI mentor özellikleri'
      ],
      content: [
        'Etki fazı içeriği (10 modül)',
        'İleri seviye görevler (10 görev)',
        'Capstone proje desteği',
        'Sektör projeleri'
      ],
      privileges: [
        'Yeni öğrencilere mentorluk',
        'Etkinlik konuşmacılığı',
        'Sektör networking etkinlikleri',
        'İş başvuru desteği',
        'Özel ekipman erişimi (VR, 3D Printer)'
      ]
    },
    graduate: {
      features: [
        'Mezun ağına katılım',
        'Alumni platformu',
        'Kariyer danışmanlığı',
        'Sürekli eğitim programları',
        'Topluluk ambassadörlüğü'
      ],
      content: [
        'Tüm içeriğe sınırsız erişim',
        'Özel mezun içerikleri',
        'Sektör case study\'leri',
        'İleri seviye sertifikalar'
      ],
      privileges: [
        'Ömür boyu DiGEM erişimi',
        'Alumni network',
        'İş fırsatları platformu',
        'Konferans konuşmacılığı',
        'Yeni cohort\'lara mentorluk',
        'PUSULA elçiliği'
      ]
    }
  };

  static getInstance(): LevelSystem {
    if (!LevelSystem.instance) {
      LevelSystem.instance = new LevelSystem();
    }
    return LevelSystem.instance;
  }

  /**
   * Get level information
   */
  getLevelInfo(level: 'cirak' | 'kalfa' | 'usta' | 'graduate'): LevelInfo {
    return LevelSystem.LEVELS[level];
  }

  /**
   * Get all levels in order
   */
  getAllLevels(): LevelInfo[] {
    return [
      LevelSystem.LEVELS.cirak,
      LevelSystem.LEVELS.kalfa,
      LevelSystem.LEVELS.usta,
      LevelSystem.LEVELS.graduate
    ];
  }

  /**
   * Get unlocks for a level
   */
  getLevelUnlocks(level: 'cirak' | 'kalfa' | 'usta' | 'graduate'): LevelUnlocks {
    return LevelSystem.UNLOCKS[level];
  }

  /**
   * Get all unlocks up to and including current level
   */
  getCumulativeUnlocks(level: 'cirak' | 'kalfa' | 'usta' | 'graduate'): LevelUnlocks {
    const levels = ['cirak', 'kalfa', 'usta', 'graduate'];
    const currentIndex = levels.indexOf(level);
    
    const cumulative: LevelUnlocks = {
      features: [],
      content: [],
      privileges: []
    };

    for (let i = 0; i <= currentIndex; i++) {
      const unlocks = LevelSystem.UNLOCKS[levels[i]];
      cumulative.features.push(...unlocks.features);
      cumulative.content.push(...unlocks.content);
      cumulative.privileges.push(...unlocks.privileges);
    }

    return cumulative;
  }

  /**
   * Check if user has access to a feature
   */
  hasFeatureAccess(userLevel: string, requiredLevel: string): boolean {
    const levels = ['cirak', 'kalfa', 'usta', 'graduate'];
    const userIndex = levels.indexOf(userLevel);
    const requiredIndex = levels.indexOf(requiredLevel);
    
    return userIndex >= requiredIndex;
  }

  /**
   * Get next level information
   */
  getNextLevel(currentLevel: 'cirak' | 'kalfa' | 'usta' | 'graduate'): LevelInfo | null {
    const levels = ['cirak', 'kalfa', 'usta', 'graduate'];
    const currentIndex = levels.indexOf(currentLevel);
    
    if (currentIndex < levels.length - 1) {
      return LevelSystem.LEVELS[levels[currentIndex + 1]];
    }
    
    return null; // Already at max level
  }

  /**
   * Generate level transition ceremony data
   */
  generateLevelUpCeremony(oldLevel: string, newLevel: string, userName: string) {
    const newLevelInfo = this.getLevelInfo(newLevel as any);
    const unlocks = this.getLevelUnlocks(newLevel as any);

    return {
      title: `Tebrikler ${userName}!`,
      subtitle: `${newLevelInfo.displayName} seviyesine yükseldin! ${newLevelInfo.icon}`,
      message: newLevelInfo.description,
      newUnlocks: {
        features: unlocks.features.slice(0, 3), // Show first 3
        totalFeatures: unlocks.features.length,
        totalContent: unlocks.content.length,
        totalPrivileges: unlocks.privileges.length
      },
      celebration: {
        confetti: true,
        sound: 'level-up',
        animation: 'celebration'
      },
      nextSteps: [
        'Yeni özelliklerini keşfet',
        'Yeni içeriklere göz at',
        'Topluluğa başarını duyur'
      ]
    };
  }

  /**
   * Get level progress visualization data
   */
  getLevelProgress(currentXP: number) {
    const levels = this.getAllLevels();
    const currentLevel = levels.find((l, i) => {
      const nextLevel = levels[i + 1];
      return currentXP >= l.xpRequired && (!nextLevel || currentXP < nextLevel.xpRequired);
    }) || levels[0];

    const nextLevel = this.getNextLevel(currentLevel.level);
    
    if (!nextLevel) {
      return {
        currentLevel,
        nextLevel: null,
        progress: 100,
        xpInCurrentLevel: currentXP - currentLevel.xpRequired,
        xpNeededForNext: 0,
        isMaxLevel: true
      };
    }

    const xpInCurrentLevel = currentXP - currentLevel.xpRequired;
    const xpNeededForLevel = nextLevel.xpRequired - currentLevel.xpRequired;
    const progress = (xpInCurrentLevel / xpNeededForLevel) * 100;

    return {
      currentLevel,
      nextLevel,
      progress: Math.round(progress),
      xpInCurrentLevel,
      xpNeededForNext: nextLevel.xpRequired - currentXP,
      isMaxLevel: false
    };
  }
}

// Export singleton instance
export const levelSystem = LevelSystem.getInstance();
