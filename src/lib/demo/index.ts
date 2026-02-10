/**
 * UNDP Demo Scenarios and Data - Main Export
 * 
 * Comprehensive demo system including:
 * - Demo scenarios for different stakeholders
 * - Complete learner journeys
 * - Impact case studies
 * - Stakeholder dashboards
 * - Interactive demo mode
 * - Guided tours
 * - Feature highlights
 */

// Demo Scenarios
export {
  DemoScenariosSystem,
  demoScenarios,
  type DemoScenario,
  type DemoDataPoint,
  type InteractiveElement,
  type LearnerJourney,
  type Milestone,
  type ImpactCaseStudy,
  type Result,
  type Testimonial,
  type Metric,
  type StakeholderDashboard,
  type KPI,
  type Chart,
} from './scenarios';

// Demo Mode and Guided Tours
export {
  DemoModeSystem,
  GuidedToursSystem,
  FeatureHighlightsSystem,
  demoMode,
  guidedTours,
  featureHighlights,
  type DemoMode,
  type GuidedTour,
  type TourStep,
  type TourAction,
  type FeatureHighlight,
} from './demo-mode';
