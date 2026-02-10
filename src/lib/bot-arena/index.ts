/**
 * Bot Arena Competition System - Main Export
 * 
 * Comprehensive competition system including:
 * - Multiple competition formats
 * - Automatic evaluation and ranking
 * - Real-time leaderboards with spectator mode
 * - Rewards and achievement system
 * - Competition archiving and analytics
 */

// Competition Engine
export {
  CompetitionEngine,
  SpectatorModeSystem,
  competitionEngine,
  spectatorMode,
  type Competition,
  type Participant,
  type Prize,
  type EvaluationCriteria,
  type LeaderboardEntry,
  type CompetitionResult,
  type CompetitionStatistics,
  type CompetitionType,
  type CompetitionStatus,
} from './competition-engine';

// Rewards and Analytics
export {
  RewardsSystem,
  CompetitionArchiveSystem,
  PerformanceAnalyticsSystem,
  rewardsSystem,
  competitionArchive,
  performanceAnalytics,
  type Achievement,
  type CompetitionArchive,
  type Recording,
  type Highlight,
  type ArchiveStatistics,
  type PerformanceAnalytics,
  type CompetitionPerformance,
  type OverallStats,
  type SkillProgression,
} from './rewards-analytics';
