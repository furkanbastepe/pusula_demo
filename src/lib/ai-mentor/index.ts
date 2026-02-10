// AI Mentor System Exports

export { ConversationManager, conversationManager } from './conversation-manager';
export type {
  Message,
  ConversationSession,
  ConversationContext
} from './conversation-manager';

export { ContentReferencer, contentReferencer } from './content-referencer';
export type {
  ContentReference,
  NextStepSuggestion
} from './content-referencer';

export { EscalationManager, escalationManager } from './escalation-manager';
export type {
  EscalationTrigger,
  EscalationDecision
} from './escalation-manager';

export { AnalyticsTracker, analyticsTracker } from './analytics-tracker';
export type {
  MentorAnalytics,
  SessionMetrics,
  EngagementMetrics
} from './analytics-tracker';
