export type UserRole = "student" | "guide" | "admin";

export type JourneyPhase =
    | "onboarding"      // Hafta 0: Kayıt & Profil
    | "discovery"       // Hafta 1-4: Keşif (Dijital Okuryazarlık)
    | "build"           // Hafta 5-8: İnşa (Veri Analizi & Proje)
    | "impact"          // Hafta 9-11: Etki (Hackathon & Sunum)
    | "graduation";     // Hafta 12: Mezuniyet

export interface Milestone {
    id: string;
    title: string;
    phase: JourneyPhase;
    completed: boolean;
    unlockedAt: number; // XP threshold
}

export type CareerPathId =
    | "veri-analizi"
    | "yapay-zeka-ml"
    | "dijital-pazarlama"
    | "yazilim-gelistirme"
    | "dijital-tasarim"
    | "e-ticaret";

export interface OnboardingState {
    goal: "career" | "project" | "explore" | null;
    skillLevel: "beginner" | "intermediate" | "advanced" | null;
    primaryPath: CareerPathId | null;
    secondaryPaths: CareerPathId[];
    city: "eskisehir";
    centerId: "digem-eskisehir";
    challenge: "daily" | "project" | "community" | null;
    completed: boolean;
    completedAt?: string;
}

export interface PhysicalCenterState {
    capacity: number; // 30
    occupancy: number;
    activeCheckInId?: string;
}

export interface WorkshopState {
    registeredIds: string[];
    attendedIds: string[];
}

export interface DailyReviewState {
    dueCount: number;
    completedToday: number;
    streak: number;
}

export interface PortfolioState {
    artifactIds: string[];
    certificateId?: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    timestamp: Date;
    actionUrl?: string;
}

export interface DashboardData {
    nextMilestone: string;
    pendingTasks: number;
    activeProjects: number;
    notifications: Notification[];
}

// ----------------------------------------------------------------------
// 3. Demo Scenario & Action Types
// ----------------------------------------------------------------------

export type DemoStage =
    | "onboarding"
    | "dashboard-new" // Discovery
    | "learning-module" // MicroLab
    | "simulation" // Build
    | "center-physical" // Physical Center
    | "mentorship" // Impact
    | "graduation"; // Final

export interface DemoUser {
    id: string;
    name: string;
    role: UserRole;
    avatarUrl: string;
    level: "cirak" | "kalfa" | "usta" | "graduate";
    xp: number;
    streak: number;
    gdrScore: number;

    // Legacy / Optional fields for backward compatibility or detailed stats
    cohort: string;
    seed: string;
    sdg: number;
    gdrComponents: {
        teknik_rol: number;
        takim: number;
        sunum: number;
        guvenilirlik: number;
        sosyal_etki: number;
    };
    completedMicrolabs: string[];
    completedTasks: string[];
    collectedBadges: string[];
    inventory: string[];

    // Simulation State (Nested)
    simulation?: {
        activeScenarioId: string | null;
        status: "idle" | "running" | "completed";
        score: number;
    };

    // New V2 State
    onboarding: OnboardingState;
    center: PhysicalCenterState;
    workshops: WorkshopState;
    dailyReview: DailyReviewState;
    portfolio: PortfolioState;
}

export interface DemoState extends DemoUser {
    phase: JourneyPhase;
    dashboard: DashboardData;
    isDemoMode: boolean;
}

// Alias for backward compatibility
export type LearnerState = DemoState;

export interface DemoScenario {
    id: string;
    name: string;
    description: string;
    initialState: Partial<DemoState>;
    actions: DemoAction[];
}

export type DemoAction =
    | { type: "SET_STAGE"; payload: { stage: DemoStage } }
    | { type: "UPDATE_USER"; payload: Partial<DemoUser> }
    | { type: "ADD_NOTIFICATION"; payload: Notification }
    | { type: "MARK_NOTIFICATION_READ"; payload: { id: string } }
    | { type: "ADD_XP"; payload: { amount: number } }
    | { type: "ADVANCE_PHASE"; payload: { phase: JourneyPhase } }
    | { type: "START_SIMULATION"; payload: { id: string } }
    | { type: "COMPLETE_SIMULATION"; payload: { id: string; score: number; xp: number } }
    | { type: "MANUAL_LEVEL_UP"; payload: { level: string } }
    | { type: "JUMP_TO_STAGE"; payload: { stage: string } }

    // Legacy Actions
    | { type: "COMPLETE_MICROLAB"; payload: { id: string; xp: number } }
    | { type: "SUBMIT_TASK"; payload: { id: string; xp: number; grade?: number } }
    | { type: "ATTEND_EVENT"; payload: { id: string; xp: number } }

    // V2 Actions
    | { type: "COMPLETE_ONBOARDING"; payload: OnboardingState }
    | { type: "CHECKIN_CENTER"; payload: { purpose: "learning" | "event" | "mentoring" } }
    | { type: "CHECKOUT_CENTER" }
    | { type: "REGISTER_WORKSHOP"; payload: { workshopId: string } }
    | { type: "COMPLETE_DAILY_REVIEW"; payload: { reviewed: number } }
    | { type: "RECALCULATE_GDR" }
    | { type: "GENERATE_CERTIFICATE" }
    | { type: "JUMP_TO_CHECKPOINT"; payload: { id: number } } // 1-7 scene index

    // Nirvana v2 Actions
    | { type: "START_MODULE"; payload: { moduleId: string } }
    | { type: "COMPLETE_LESSON"; payload: { lessonId: string; score: number } }
    | { type: "BOOK_MENTOR"; payload: { date: string } }
    | { type: "MARK_ATTENDANCE"; payload: { date: string } }
    | { type: "COMPLETE_CORE_MODULE"; payload: { moduleId: string } };
