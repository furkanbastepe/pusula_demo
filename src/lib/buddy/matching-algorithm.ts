/**
 * Buddy System - Peer Matching Algorithm
 * 
 * Implements sophisticated compatibility scoring and peer matching for the PUSULA platform.
 * Matches learners based on skills, interests, learning styles, and SDG alignments.
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

// Compatible user type for buddy matching (works with both MockUser and DemoUser)
export interface BuddyUser {
  id: string;
  name: string;
  level: 'cirak' | 'kalfa' | 'usta' | 'mezun' | 'graduate';
  cohort: {
    id: string;
    sdgFocus: number;
  };
  modulesCompleted: number;
  tasksCompleted: number;
  physicalCenterVisits?: number;
  badges: string[];
}

export interface CompatibilityScore {
  userId1: string;
  userId2: string;
  totalScore: number; // 0-100
  breakdown: {
    skillLevel: number; // 0-25
    interests: number; // 0-25
    learningStyle: number; // 0-20
    sdgAlignment: number; // 0-15
    availability: number; // 0-15
  };
  matchReason: string;
  potentialSynergies: string[];
}

export interface BuddyMatch {
  user1: BuddyUser;
  user2: BuddyUser;
  compatibility: CompatibilityScore;
  matchedAt: Date;
  status: 'active' | 'completed' | 'inactive';
  collaborationCount: number;
  successMetrics: {
    projectsCompleted: number;
    averageRating: number;
    mutualGrowth: number; // XP gained together
  };
}

export interface MatchingPreferences {
  preferredSkillGap?: 'similar' | 'complementary' | 'mentor'; // similar levels, different skills, or mentorship
  preferredLearningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  sdgFocus?: number[];
  availabilityHours?: string[]; // e.g., ['morning', 'afternoon', 'evening']
  collaborationPreference?: 'frequent' | 'moderate' | 'occasional';
}

// ============================================================================
// Compatibility Scoring Engine
// ============================================================================

export class BuddyMatchingAlgorithm {
  /**
   * Calculate compatibility score between two users
   */
  calculateCompatibility(user1: BuddyUser, user2: BuddyUser): CompatibilityScore {
    const skillScore = this.calculateSkillCompatibility(user1, user2);
    const interestScore = this.calculateInterestCompatibility(user1, user2);
    const learningStyleScore = this.calculateLearningStyleCompatibility(user1, user2);
    const sdgScore = this.calculateSDGCompatibility(user1, user2);
    const availabilityScore = this.calculateAvailabilityCompatibility(user1, user2);

    const totalScore = skillScore + interestScore + learningStyleScore + sdgScore + availabilityScore;

    const matchReason = this.generateMatchReason(
      { skillScore, interestScore, learningStyleScore, sdgScore, availabilityScore },
      user1,
      user2
    );

    const potentialSynergies = this.identifyPotentialSynergies(user1, user2);

    return {
      userId1: user1.id,
      userId2: user2.id,
      totalScore: Math.round(totalScore),
      breakdown: {
        skillLevel: Math.round(skillScore),
        interests: Math.round(interestScore),
        learningStyle: Math.round(learningStyleScore),
        sdgAlignment: Math.round(sdgScore),
        availability: Math.round(availabilityScore),
      },
      matchReason,
      potentialSynergies,
    };
  }

  /**
   * Calculate skill level compatibility (0-25 points)
   * Rewards both similar levels (peer learning) and complementary skills (mentorship)
   */
  private calculateSkillCompatibility(user1: BuddyUser, user2: BuddyUser): number {
    const levelMap: Record<string, number> = { cirak: 1, kalfa: 2, usta: 3, mezun: 4, graduate: 4 };
    const level1 = levelMap[user1.level];
    const level2 = levelMap[user2.level];
    const levelDiff = Math.abs(level1 - level2);

    // Same level: excellent for peer learning (25 points)
    if (levelDiff === 0) return 25;
    
    // One level apart: good for mentorship (20 points)
    if (levelDiff === 1) return 20;
    
    // Two levels apart: moderate mentorship potential (12 points)
    if (levelDiff === 2) return 12;
    
    // Three+ levels apart: limited compatibility (5 points)
    return 5;
  }

  /**
   * Calculate interest compatibility (0-25 points)
   * Based on career interests and SDG focus areas
   */
  private calculateInterestCompatibility(user1: BuddyUser, user2: BuddyUser): number {
    // Mock career interests based on user data
    const interests1 = this.extractCareerInterests(user1);
    const interests2 = this.extractCareerInterests(user2);

    const commonInterests = interests1.filter(i => interests2.includes(i));
    const totalInterests = new Set([...interests1, ...interests2]).size;

    if (totalInterests === 0) return 15; // Default moderate score

    const overlapRatio = commonInterests.length / totalInterests;
    
    // High overlap (60%+): excellent compatibility
    if (overlapRatio >= 0.6) return 25;
    
    // Moderate overlap (30-60%): good compatibility
    if (overlapRatio >= 0.3) return 18;
    
    // Low overlap (10-30%): some compatibility
    if (overlapRatio >= 0.1) return 12;
    
    // Very low overlap: minimal compatibility
    return 8;
  }

  /**
   * Calculate learning style compatibility (0-20 points)
   */
  private calculateLearningStyleCompatibility(user1: BuddyUser, user2: BuddyUser): number {
    // Infer learning style from user behavior
    const style1 = this.inferLearningStyle(user1);
    const style2 = this.inferLearningStyle(user2);

    // Mixed learners are compatible with everyone
    if (style1 === 'mixed' || style2 === 'mixed') return 20;

    // Same style: excellent compatibility
    if (style1 === style2) return 20;

    // Different but complementary styles
    const complementaryPairs = [
      ['visual', 'kinesthetic'],
      ['auditory', 'visual'],
    ];

    const isComplementary = complementaryPairs.some(
      pair => (pair.includes(style1) && pair.includes(style2))
    );

    return isComplementary ? 15 : 10;
  }

  /**
   * Calculate SDG alignment compatibility (0-15 points)
   */
  private calculateSDGCompatibility(user1: BuddyUser, user2: BuddyUser): number {
    const sdg1 = user1.cohort.sdgFocus;
    const sdg2 = user2.cohort.sdgFocus;

    // Same SDG focus: excellent alignment
    if (sdg1 === sdg2) return 15;

    // Related SDGs (based on UNDP interconnections)
    const relatedSDGs: Record<number, number[]> = {
      4: [8, 10, 17], // Quality Education relates to Decent Work, Reduced Inequalities, Partnerships
      6: [11, 13, 14], // Clean Water relates to Sustainable Cities, Climate Action, Life Below Water
      11: [6, 9, 13], // Sustainable Cities relates to Clean Water, Industry, Climate Action
      13: [6, 11, 15], // Climate Action relates to Clean Water, Cities, Life on Land
      17: [4, 8, 9], // Partnerships relates to Education, Decent Work, Industry
    };

    const related1 = relatedSDGs[sdg1] || [];
    const related2 = relatedSDGs[sdg2] || [];

    if (related1.includes(sdg2) || related2.includes(sdg1)) return 12;

    // Different but all SDGs are interconnected
    return 8;
  }

  /**
   * Calculate availability compatibility (0-15 points)
   * Based on activity patterns and physical center visits
   */
  private calculateAvailabilityCompatibility(user1: BuddyUser, user2: BuddyUser): number {
    // Users with similar physical center visit patterns are more likely to meet
    const visits1 = user1.physicalCenterVisits || 0;
    const visits2 = user2.physicalCenterVisits || 0;

    const visitDiff = Math.abs(visits1 - visits2);
    const avgVisits = (visits1 + visits2) / 2;

    if (avgVisits === 0) return 10; // Both remote learners

    const visitSimilarity = 1 - (visitDiff / Math.max(visits1, visits2, 1));

    // High similarity in visit patterns
    if (visitSimilarity >= 0.8) return 15;
    if (visitSimilarity >= 0.6) return 12;
    if (visitSimilarity >= 0.4) return 9;
    
    return 6;
  }

  /**
   * Generate human-readable match reason
   */
  private generateMatchReason(
    scores: { skillScore: number; interestScore: number; learningStyleScore: number; sdgScore: number; availabilityScore: number },
    user1: BuddyUser,
    user2: BuddyUser
  ): string {
    const reasons: string[] = [];

    if (scores.skillScore >= 20) {
      if (user1.level === user2.level) {
        reasons.push('Aynı seviyede olduğunuz için birlikte öğrenebilirsiniz');
      } else {
        reasons.push('Farklı seviyelerde olmanız mentorluk fırsatı yaratıyor');
      }
    }

    if (scores.interestScore >= 18) {
      reasons.push('Ortak kariyer ilgi alanlarınız var');
    }

    if (scores.sdgScore >= 12) {
      reasons.push(`SDG ${user1.cohort.sdgFocus} odağınız uyumlu`);
    }

    if (scores.availabilityScore >= 12) {
      reasons.push('Benzer zamanlarda aktifsiniz');
    }

    if (reasons.length === 0) {
      reasons.push('Birlikte çalışarak yeni perspektifler kazanabilirsiniz');
    }

    return reasons.join(', ');
  }

  /**
   * Identify potential synergies between buddies
   */
  private identifyPotentialSynergies(user1: BuddyUser, user2: BuddyUser): string[] {
    const synergies: string[] = [];

    // Skill complementarity
    const levelMap: Record<string, number> = { cirak: 1, kalfa: 2, usta: 3, mezun: 4, graduate: 4 };
    const level1 = levelMap[user1.level];
    const level2 = levelMap[user2.level];

    if (level1 > level2) {
      synergies.push(`${user1.name} mentorluk yapabilir`);
    } else if (level2 > level1) {
      synergies.push(`${user2.name} mentorluk yapabilir`);
    } else {
      synergies.push('Eşit seviyede peer learning');
    }

    // Project collaboration potential
    if (user1.tasksCompleted > 5 && user2.tasksCompleted > 5) {
      synergies.push('Ortak proje geliştirme potansiyeli');
    }

    // Physical center collaboration
    const visits1 = user1.physicalCenterVisits || 0;
    const visits2 = user2.physicalCenterVisits || 0;
    if (visits1 > 10 && visits2 > 10) {
      synergies.push('DiGEM\'de yüz yüze çalışma fırsatı');
    }

    // Community contribution
    if (user1.badges.length > 5 || user2.badges.length > 5) {
      synergies.push('Topluluk liderliği potansiyeli');
    }

    return synergies;
  }

  /**
   * Extract career interests from user profile
   */
  private extractCareerInterests(user: BuddyUser): string[] {
    const interests: string[] = [];

    // Infer from level and progress
    if (user.level === 'mezun' || user.level === 'usta') {
      interests.push('advanced-development', 'leadership');
    }

    // Infer from SDG focus
    const sdgInterests: Record<number, string[]> = {
      4: ['education-tech', 'e-learning', 'accessibility'],
      6: ['environmental-tech', 'iot', 'data-analysis'],
      11: ['smart-cities', 'urban-tech', 'sustainability'],
      13: ['climate-tech', 'green-tech', 'data-science'],
      17: ['collaboration-tools', 'open-source', 'community-building'],
    };

    const sdgBased = sdgInterests[user.cohort.sdgFocus] || [];
    interests.push(...sdgBased);

    // Infer from activity
    if (user.tasksCompleted > 10) {
      interests.push('project-management', 'problem-solving');
    }

    if (user.modulesCompleted > 20) {
      interests.push('continuous-learning', 'skill-development');
    }

    return interests;
  }

  /**
   * Infer learning style from user behavior
   */
  private inferLearningStyle(user: BuddyUser): 'visual' | 'auditory' | 'kinesthetic' | 'mixed' {
    const visits = user.physicalCenterVisits || 0;
    const totalActivities = user.modulesCompleted + user.tasksCompleted;

    // High physical center visits suggest kinesthetic learning
    if (visits > 15 && totalActivities > 0) {
      const visitRatio = visits / totalActivities;
      if (visitRatio > 0.6) return 'kinesthetic';
    }

    // High task completion suggests hands-on learning
    if (user.tasksCompleted > user.modulesCompleted * 1.5) {
      return 'kinesthetic';
    }

    // Balanced approach suggests mixed learning
    if (Math.abs(user.tasksCompleted - user.modulesCompleted) < 3) {
      return 'mixed';
    }

    // Default to visual for theory-focused learners
    if (user.modulesCompleted > user.tasksCompleted * 1.5) {
      return 'visual';
    }

    return 'mixed';
  }

  /**
   * Find best matches for a user from a pool of candidates
   */
  findBestMatches(
    user: BuddyUser,
    candidates: BuddyUser[],
    count: number = 5,
    preferences?: MatchingPreferences
  ): CompatibilityScore[] {
    // Filter out the user themselves
    const validCandidates = candidates.filter(c => c.id !== user.id);

    // Calculate compatibility with all candidates
    const scores = validCandidates.map(candidate => 
      this.calculateCompatibility(user, candidate)
    );

    // Apply preference filters if provided
    let filteredScores = scores;
    if (preferences) {
      filteredScores = this.applyPreferenceFilters(scores, candidates, preferences);
    }

    // Sort by total score descending
    filteredScores.sort((a, b) => b.totalScore - a.totalScore);

    // Return top N matches
    return filteredScores.slice(0, count);
  }

  /**
   * Apply user preferences to filter matches
   */
  private applyPreferenceFilters(
    scores: CompatibilityScore[],
    candidates: BuddyUser[],
    preferences: MatchingPreferences
  ): CompatibilityScore[] {
    return scores.filter(score => {
      const candidate = candidates.find(c => c.id === score.userId2);
      if (!candidate) return false;

      // Filter by skill gap preference
      if (preferences.preferredSkillGap) {
        const skillScore = score.breakdown.skillLevel;
        if (preferences.preferredSkillGap === 'similar' && skillScore < 20) return false;
        if (preferences.preferredSkillGap === 'complementary' && skillScore > 20) return false;
        if (preferences.preferredSkillGap === 'mentor' && skillScore < 15) return false;
      }

      // Filter by SDG focus
      if (preferences.sdgFocus && preferences.sdgFocus.length > 0) {
        if (!preferences.sdgFocus.includes(candidate.cohort.sdgFocus)) return false;
      }

      return true;
    });
  }

  /**
   * Create automatic matches for a new cohort
   */
  createCohortMatches(cohortMembers: BuddyUser[]): BuddyMatch[] {
    const matches: BuddyMatch[] = [];
    const matched = new Set<string>();

    // Sort by level to facilitate mentorship opportunities
    const sorted = [...cohortMembers].sort((a, b) => {
      const levelMap: Record<string, number> = { cirak: 1, kalfa: 2, usta: 3, mezun: 4, graduate: 4 };
      return levelMap[a.level] - levelMap[b.level];
    });

    for (const user of sorted) {
      if (matched.has(user.id)) continue;

      // Find best unmatched candidate
      const unmatched = sorted.filter(u => !matched.has(u.id) && u.id !== user.id);
      if (unmatched.length === 0) break;

      const bestMatches = this.findBestMatches(user, unmatched, 1);
      if (bestMatches.length === 0) continue;

      const bestMatch = bestMatches[0];
      const buddy = sorted.find(u => u.id === bestMatch.userId2);
      if (!buddy) continue;

      matches.push({
        user1: user,
        user2: buddy,
        compatibility: bestMatch,
        matchedAt: new Date(),
        status: 'active',
        collaborationCount: 0,
        successMetrics: {
          projectsCompleted: 0,
          averageRating: 0,
          mutualGrowth: 0,
        },
      });

      matched.add(user.id);
      matched.add(buddy.id);
    }

    return matches;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const buddyMatchingAlgorithm = new BuddyMatchingAlgorithm();
