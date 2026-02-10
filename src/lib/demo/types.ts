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

export interface LearnerState {
    // Integrity
    seed: string;

    // Identity
    name: string;
    role: UserRole;
    cohort: string;
    avatarUrl: string;
    sdg: number; // 1-17

    // Progress
    phase: JourneyPhase;
    level: "cirak" | "kalfa" | "usta" | "graduate";
    xp: number;
    streak: number;
    gdrScore: number;
    gdrComponents: {
        teknik_rol: number;
        takim: number;
        sunum: number;
        guvenilirlik: number;
        sosyal_etki: number;
    };

    // Content Progress
    completedMicrolabs: string[];
    completedTasks: string[];
    collectedBadges: string[];

    // Simulation State
    simulation: {
        activeScenarioId: string | null;
        status: "idle" | "running" | "completed";
        score: number; // 0-100
    };
    inventory: string[]; // E.g., "Python Basics Certificate", "Hackathon Ticket"
    notifications: Notification[];
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    timestamp: string;
    actionUrl?: string;
}

export interface DemoScenario {
    id: string;
    name: string;
    description: string;
    initialState: Partial<LearnerState>;
    actions: DemoAction[];
}

export type DemoAction =
    | { type: "COMPLETE_MICROLAB"; payload: { id: string; xp: number } }
    | { type: "SUBMIT_TASK"; payload: { id: string; xp: number; grade?: number } }
    | { type: "ATTEND_EVENT"; payload: { id: string; xp: number } }
    | { type: "ADVANCE_PHASE"; payload: { phase: JourneyPhase } }
    | { type: "START_SIMULATION"; payload: { id: string } }
    | { type: "COMPLETE_SIMULATION"; payload: { id: string; score: number; xp: number } }
    | { type: "MANUAL_LEVEL_UP"; payload: { level: string } }
    | { type: "JUMP_TO_STAGE"; payload: { stage: string } };
