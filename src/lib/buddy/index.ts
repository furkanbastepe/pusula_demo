/**
 * Buddy System - Main Exports
 * 
 * Comprehensive peer learning and collaboration system for PUSULA platform.
 */

// Matching Algorithm
export {
  buddyMatchingAlgorithm,
  type CompatibilityScore,
  type BuddyMatch,
  type MatchingPreferences,
} from './matching-algorithm';

// Collaboration Tools
export {
  collaborationTools,
  COLLABORATION_ACTIVITIES,
  type CollaborationActivity,
  type ActivityStep,
  type CollaborationSession,
  type SharedWorkspace,
  type CommunicationMessage,
} from './collaboration-tools';

// Analytics
export {
  buddyAnalytics,
  type BuddyAnalytics,
  type LearningOutcome,
  type MatchingEffectiveness,
  type SystemMetrics,
} from './analytics';
