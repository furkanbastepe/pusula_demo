// Enhanced Mock Data Types for PUSULA Platform

export interface MockUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: 'student' | 'guide' | 'admin';
  level: 'cirak' | 'kalfa' | 'usta' | 'graduate';
  xp: number;
  streak: number;
  cohortId: string;
  sdgFocus: number[];
  gdrScore: number;
  gdrComponents: {
    teknik_rol: number;
    takim: number;
    sunum: number;
    guvenilirlik: number;
    sosyal_etki: number;
  };
  badges: string[];
  completedModules: string[];
  completedTasks: string[];
  physicalCenterVisits: number;
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  mentorshipGiven: number;
  mentorshipReceived: number;
  careerInterests: string[];
  joinedAt: string;
  lastActiveAt: string;
  profileImageUrl?: string;
  bio?: string;
  buddyId?: string;
}

export interface MockCohort {
  id: string;
  name: string;
  sdgFocus: number;
  problemTheme: string;
  startDate: string;
  endDate: string;
  guideId: string;
  memberIds: string[];
  capacity: number;
  status: 'upcoming' | 'active' | 'completed';
  description: string;
}

export interface MockMicroLab {
  id: string;
  title: string;
  description: string;
  phase: 'kesif' | 'insa' | 'etki';
  sdgAlignment: number[];
  estimatedMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites: string[];
  learningObjectives: string[];
  interactiveElements: InteractiveElement[];
  assessmentCriteria: AssessmentCriteria;
  realWorldApplication: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface InteractiveElement {
  type: 'video' | 'quiz' | 'simulation' | 'coding' | 'reflection' | 'upload';
  title: string;
  content: any;
  required: boolean;
  points: number;
}

export interface AssessmentCriteria {
  passingScore: number;
  maxAttempts: number;
  timeLimit?: number;
  rubric: RubricItem[];
}

export interface RubricItem {
  criterion: string;
  weight: number;
  levels: {
    score: number;
    description: string;
  }[];
}

export interface MockTask {
  id: string;
  title: string;
  description: string;
  phase: 'kesif' | 'insa' | 'etki';
  difficulty: 'easy' | 'med' | 'hard';
  estimatedHours: number;
  xpReward: number;
  sdgImpact: SDGImpact;
  deliverables: Deliverable[];
  evaluationRubric: RubricItem[];
  timeEstimate: number;
  collaborationLevel: 'individual' | 'pair' | 'team';
  realWorldContext: string;
  prerequisites: string[];
  hints: string[];
  mandatoryEvidence: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface SDGImpact {
  primarySDG: number;
  secondarySDGs: number[];
  impactDescription: string;
  measurableOutcomes: string[];
}

export interface Deliverable {
  type: 'document' | 'code' | 'design' | 'presentation' | 'video' | 'prototype';
  title: string;
  description: string;
  required: boolean;
  format: string[];
}

export interface MockSubmission {
  id: string;
  userId: string;
  taskId: string;
  evidenceFiles: EvidenceFile[];
  evidenceLinks: string[];
  selfAssessment: SelfAssessment;
  reflection: string;
  submittedAt: string;
  status: 'pending' | 'under_review' | 'approved' | 'needs_revision' | 'rejected';
  reviewerId?: string;
  reviewedAt?: string;
  feedback?: string;
  score?: number;
  buddyReviews: BuddyReview[];
}

export interface EvidenceFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export interface SelfAssessment {
  confidence: number; // 1-5
  difficulty: number; // 1-5
  timeSpent: number; // hours
  challenges: string[];
  learnings: string[];
}

export interface BuddyReview {
  reviewerId: string;
  rating: number; // 1-5
  comment: string;
  reviewedAt: string;
}

export interface MockPortfolioItem {
  id: string;
  userId: string;
  submissionId: string;
  title: string;
  description: string;
  tags: string[];
  visibility: 'private' | 'cohort' | 'public';
  featuredImage?: string;
  demoUrl?: string;
  githubUrl?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
}

export interface MockEvent {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'demo_day' | 'hackathon' | 'networking' | 'guest_speaker' | 'bot_arena';
  startDate: string;
  endDate: string;
  location: 'physical' | 'online' | 'hybrid';
  capacity: number;
  registeredUsers: string[];
  organizerId: string;
  tags: string[];
  requirements?: string[];
  rewards?: EventReward[];
}

export interface EventReward {
  type: 'xp' | 'badge' | 'certificate' | 'prize';
  value: string | number;
  condition: string;
}

export interface MockNotification {
  id: string;
  userId: string;
  type: 'achievement' | 'reminder' | 'announcement' | 'review' | 'event' | 'buddy';
  title: string;
  message: string;
  actionUrl?: string;
  read: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface MockAnalytics {
  userId: string;
  date: string;
  timeSpent: number; // minutes
  modulesCompleted: number;
  tasksCompleted: number;
  xpEarned: number;
  streakDays: number;
  physicalCenterVisit: boolean;
  collaborationMinutes: number;
  mentorInteractions: number;
}

export interface UNDPMetrics {
  totalLearners: number;
  activeThisMonth: number;
  completionRate: number;
  averageGDRScore: number;
  skillsAcquired: SkillMetric[];
  sdgContributions: SDGContribution[];
  employmentOutcomes: EmploymentData;
  communityImpact: CommunityImpact;
  digitalInclusionMetrics: InclusionMetrics;
  genderEquityData: GenderData;
  sustainabilityProjects: Project[];
  physicalCenterUtilization: CenterUtilization;
}

export interface SkillMetric {
  skill: string;
  learnersAcquired: number;
  averageProficiency: number;
  industryDemand: 'high' | 'medium' | 'low';
}

export interface SDGContribution {
  sdgNumber: number;
  projectsCompleted: number;
  impactScore: number;
  realWorldApplications: string[];
}

export interface EmploymentData {
  placementRate: number;
  averageSalaryIncrease: number;
  topEmployers: string[];
  jobRoles: { role: string; count: number }[];
}

export interface CommunityImpact {
  peerMentoringSessions: number;
  communityProjectsLaunched: number;
  socialMediaReach: number;
  localPartnerships: number;
}

export interface InclusionMetrics {
  ruralParticipation: number;
  disabilityInclusion: number;
  economicDiversityIndex: number;
  digitalLiteracyImprovement: number;
}

export interface GenderData {
  femaleParticipation: number;
  genderPayGapReduction: number;
  femaleLeadershipRoles: number;
  genderBalanceInTech: number;
}

export interface Project {
  id: string;
  title: string;
  sdgAlignment: number[];
  impact: string;
  participants: number;
  status: 'planning' | 'active' | 'completed';
}

export interface CenterUtilization {
  dailyAverageOccupancy: number;
  peakHours: string[];
  equipmentUsage: { equipment: string; utilizationRate: number }[];
  eventFrequency: number;
}

export interface MockBotArenaCompetition {
  id: string;
  title: string;
  type: 'trading_bot' | 'web_scraper' | 'chatbot_battle' | 'css_battle' | 'sql_olympics' | 'bug_hunt';
  description: string;
  startDate: string;
  endDate: string;
  participants: BotArenaParticipant[];
  rules: string[];
  prizes: EventReward[];
  status: 'upcoming' | 'active' | 'completed';
  leaderboard: LeaderboardEntry[];
}

export interface BotArenaParticipant {
  userId: string;
  botName: string;
  strategy: string;
  submissionUrl: string;
  score: number;
  rank: number;
}

export interface LeaderboardEntry {
  userId: string;
  score: number;
  rank: number;
  change: number; // position change from last update
  badge?: string;
}

export interface PhysicalCenterData {
  currentOccupancy: number;
  dailyCapacity: number;
  equipmentStatus: EquipmentStatus[];
  scheduledEvents: MockEvent[];
  attendancePatterns: AttendancePattern[];
  resourceUtilization: ResourceMetrics;
}

export interface EquipmentStatus {
  id: string;
  name: string;
  type: 'computer' | 'projector' | 'whiteboard' | 'meeting_room' | 'printer';
  status: 'available' | 'in_use' | 'maintenance' | 'reserved';
  location: string;
  reservedBy?: string;
  reservedUntil?: string;
}

export interface AttendancePattern {
  date: string;
  hourlyOccupancy: number[];
  totalVisitors: number;
  averageStayDuration: number;
}

export interface ResourceMetrics {
  internetUsage: number; // GB
  electricityConsumption: number; // kWh
  equipmentUtilization: number; // percentage
  spaceEfficiency: number; // percentage
}