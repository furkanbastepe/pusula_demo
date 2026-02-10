// XP Calculation Engine for PUSULA Platform
// Implements comprehensive XP system with difficulty-based awards, quality multipliers, and location bonuses

export interface XPCalculationParams {
  activityType: 'microlab' | 'task' | 'event' | 'collaboration' | 'mentorship' | 'achievement';
  difficulty?: 'easy' | 'medium' | 'hard';
  quality?: number; // 0-100 score
  isPhysicalCenter?: boolean; // 50% bonus for physical center activities
  collaborationLevel?: 'individual' | 'pair' | 'team';
  completionTime?: number; // minutes
  estimatedTime?: number; // minutes
  bonusMultipliers?: {
    streak?: boolean; // Active streak bonus
    firstTime?: boolean; // First time completing this type
    perfect?: boolean; // Perfect score
    early?: boolean; // Completed before deadline
  };
}

export interface XPResult {
  baseXP: number;
  qualityBonus: number;
  locationBonus: number;
  collaborationBonus: number;
  timeBonus: number;
  streakBonus: number;
  specialBonuses: number;
  totalXP: number;
  breakdown: string[];
}

export class XPEngine {
  private static instance: XPEngine;

  // Base XP values by difficulty
  private static readonly BASE_XP = {
    microlab: {
      easy: 30,
      medium: 50,
      hard: 75
    },
    task: {
      easy: 50,
      medium: 100,
      hard: 150
    },
    event: 100,
    collaboration: 25,
    mentorship: 50,
    achievement: 75
  };

  // Quality multipliers (applied to base XP)
  private static readonly QUALITY_MULTIPLIERS = {
    excellent: 1.5,  // 90-100 score
    good: 1.2,       // 75-89 score
    average: 1.0,    // 60-74 score
    poor: 0.8        // below 60
  };

  // Location bonus
  private static readonly PHYSICAL_CENTER_MULTIPLIER = 1.5; // 50% bonus

  // Collaboration bonuses
  private static readonly COLLABORATION_BONUS = {
    individual: 0,
    pair: 10,
    team: 25
  };

  static getInstance(): XPEngine {
    if (!XPEngine.instance) {
      XPEngine.instance = new XPEngine();
    }
    return XPEngine.instance;
  }

  /**
   * Calculate XP for an activity with all bonuses and multipliers
   */
  calculateXP(params: XPCalculationParams): XPResult {
    const breakdown: string[] = [];
    
    // 1. Calculate base XP
    const baseXP = this.getBaseXP(params);
    breakdown.push(`Base XP (${params.difficulty || 'standard'}): ${baseXP}`);

    // 2. Apply quality multiplier
    const qualityBonus = this.calculateQualityBonus(baseXP, params.quality);
    if (qualityBonus > 0) {
      breakdown.push(`Quality bonus: +${qualityBonus}`);
    }

    // 3. Apply location bonus (50% for physical center)
    const locationBonus = params.isPhysicalCenter 
      ? Math.round(baseXP * (XPEngine.PHYSICAL_CENTER_MULTIPLIER - 1))
      : 0;
    if (locationBonus > 0) {
      breakdown.push(`Physical center bonus (50%): +${locationBonus}`);
    }

    // 4. Collaboration bonus
    const collaborationBonus = params.collaborationLevel 
      ? XPEngine.COLLABORATION_BONUS[params.collaborationLevel]
      : 0;
    if (collaborationBonus > 0) {
      breakdown.push(`Collaboration bonus (${params.collaborationLevel}): +${collaborationBonus}`);
    }

    // 5. Time efficiency bonus
    const timeBonus = this.calculateTimeBonus(params.completionTime, params.estimatedTime);
    if (timeBonus > 0) {
      breakdown.push(`Time efficiency bonus: +${timeBonus}`);
    }

    // 6. Streak bonus
    const streakBonus = params.bonusMultipliers?.streak ? 15 : 0;
    if (streakBonus > 0) {
      breakdown.push(`Active streak bonus: +${streakBonus}`);
    }

    // 7. Special bonuses
    let specialBonuses = 0;
    if (params.bonusMultipliers?.firstTime) {
      specialBonuses += 25;
      breakdown.push(`First time bonus: +25`);
    }
    if (params.bonusMultipliers?.perfect) {
      specialBonuses += 50;
      breakdown.push(`Perfect score bonus: +50`);
    }
    if (params.bonusMultipliers?.early) {
      specialBonuses += 20;
      breakdown.push(`Early completion bonus: +20`);
    }

    // Calculate total
    const totalXP = baseXP + qualityBonus + locationBonus + collaborationBonus + 
                    timeBonus + streakBonus + specialBonuses;

    return {
      baseXP,
      qualityBonus,
      locationBonus,
      collaborationBonus,
      timeBonus,
      streakBonus,
      specialBonuses,
      totalXP,
      breakdown
    };
  }

  /**
   * Get base XP for activity type and difficulty
   */
  private getBaseXP(params: XPCalculationParams): number {
    const { activityType, difficulty } = params;

    if (activityType === 'microlab' || activityType === 'task') {
      const diff = difficulty || 'medium';
      return XPEngine.BASE_XP[activityType][diff];
    }

    return XPEngine.BASE_XP[activityType] || 0;
  }

  /**
   * Calculate quality bonus based on score
   */
  private calculateQualityBonus(baseXP: number, quality?: number): number {
    if (!quality) return 0;

    let multiplier = 1.0;
    if (quality >= 90) {
      multiplier = XPEngine.QUALITY_MULTIPLIERS.excellent;
    } else if (quality >= 75) {
      multiplier = XPEngine.QUALITY_MULTIPLIERS.good;
    } else if (quality >= 60) {
      multiplier = XPEngine.QUALITY_MULTIPLIERS.average;
    } else {
      multiplier = XPEngine.QUALITY_MULTIPLIERS.poor;
    }

    return Math.round(baseXP * (multiplier - 1));
  }

  /**
   * Calculate time efficiency bonus
   * Reward for completing faster than estimated time
   */
  private calculateTimeBonus(completionTime?: number, estimatedTime?: number): number {
    if (!completionTime || !estimatedTime) return 0;

    const efficiency = estimatedTime / completionTime;
    
    if (efficiency >= 1.5) {
      // Completed in 2/3 or less of estimated time
      return 30;
    } else if (efficiency >= 1.2) {
      // Completed in ~80% of estimated time
      return 15;
    }

    return 0;
  }

  /**
   * Calculate level from total XP
   * Çırak: 0 XP
   * Kalfa: 1000 XP
   * Usta: 2500 XP
   * Mezun: 5000 XP
   */
  calculateLevel(totalXP: number): 'cirak' | 'kalfa' | 'usta' | 'graduate' {
    if (totalXP >= 5000) return 'graduate';
    if (totalXP >= 2500) return 'usta';
    if (totalXP >= 1000) return 'kalfa';
    return 'cirak';
  }

  /**
   * Get XP required for next level
   */
  getXPForNextLevel(currentXP: number): { nextLevel: string; xpNeeded: number; progress: number } {
    const thresholds = [
      { level: 'Kalfa', xp: 1000 },
      { level: 'Usta', xp: 2500 },
      { level: 'Mezun', xp: 5000 }
    ];

    for (const threshold of thresholds) {
      if (currentXP < threshold.xp) {
        const previousThreshold = thresholds[thresholds.indexOf(threshold) - 1]?.xp || 0;
        const xpInCurrentLevel = currentXP - previousThreshold;
        const xpNeededForLevel = threshold.xp - previousThreshold;
        const progress = (xpInCurrentLevel / xpNeededForLevel) * 100;

        return {
          nextLevel: threshold.level,
          xpNeeded: threshold.xp - currentXP,
          progress: Math.round(progress)
        };
      }
    }

    return {
      nextLevel: 'Max Level',
      xpNeeded: 0,
      progress: 100
    };
  }

  /**
   * Get level thresholds
   */
  getLevelThresholds() {
    return {
      cirak: 0,
      kalfa: 1000,
      usta: 2500,
      graduate: 5000
    };
  }

  /**
   * Check if XP gain triggers level up
   */
  checkLevelUp(oldXP: number, newXP: number): { leveledUp: boolean; newLevel?: string; oldLevel?: string } {
    const oldLevel = this.calculateLevel(oldXP);
    const newLevel = this.calculateLevel(newXP);

    if (oldLevel !== newLevel) {
      return {
        leveledUp: true,
        newLevel,
        oldLevel
      };
    }

    return { leveledUp: false };
  }
}

// Export singleton instance
export const xpEngine = XPEngine.getInstance();
