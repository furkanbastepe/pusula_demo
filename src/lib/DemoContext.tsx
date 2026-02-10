"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { DemoState, DemoAction, DemoUser, DemoStage } from "@/lib/demo/types";
import { DemoEngine } from "@/lib/demo/engine";

// Deterministic Initial State for "Ayşe Yılmaz"
const INITIAL_DEMO_STATE: DemoState = {
    // Identity
    id: "user-ayse-2026",
    name: "Ayşe Yılmaz",
    role: "student",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse",
    level: "cirak",
    xp: 0,
    streak: 0,
    gdrScore: 0,

    // Legacy / Compat
    cohort: "Genel",
    seed: "DEMO_SEED_2026",
    sdg: 0,
    gdrComponents: { teknik_rol: 0, takim: 0, sunum: 0, guvenilirlik: 0, sosyal_etki: 0 },
    completedMicrolabs: [],
    completedTasks: [],
    collectedBadges: [],
    inventory: [],

    // V2 State
    onboarding: {
        goal: null,
        skillLevel: null,
        primaryPath: null,
        secondaryPaths: [],
        city: "eskisehir",
        centerId: "digem-eskisehir",
        challenge: null,
        completed: false
    },
    center: {
        capacity: 30,
        occupancy: 12, // Default start
        activeCheckInId: undefined
    },
    workshops: {
        registeredIds: [],
        attendedIds: []
    },
    dailyReview: {
        dueCount: 5,
        completedToday: 0,
        streak: 0
    },
    portfolio: {
        artifactIds: [],
        certificateId: undefined
    },

    // UI State
    phase: "onboarding", // Starts at onboarding
    dashboard: {
        nextMilestone: "Profil Oluşturma",
        pendingTasks: 0,
        activeProjects: 0,
        notifications: [
            {
                id: "welcome",
                title: "Pusula'ya Hoşgeldin",
                message: "Geleceğini şekillendirmek için ilk adımı at.",
                type: "info",
                read: false,
                timestamp: new Date()
            }
        ]
    },
    isDemoMode: true
};

interface DemoContextType {
    state: DemoState;
    dispatch: (action: DemoAction) => void;
    // Legacy mapping (optional, but requested for easier refactor)
    currentUser?: DemoUser;
    currentStage?: DemoStage;
    setStage?: (stage: DemoStage) => void;
    nextStage?: () => void;
    prevStage?: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
    // Persist engine instance
    const engineRef = useRef<DemoEngine | null>(null);
    if (!engineRef.current) {
        engineRef.current = new DemoEngine(INITIAL_DEMO_STATE);
    }

    const [state, setState] = useState<DemoState>(engineRef.current.getState());

    useEffect(() => {
        const engine = engineRef.current;
        if (!engine) return;

        // Subscribe to engine updates
        const unsubscribe = engine.subscribe((newState) => {
            setState(newState);
        });

        return () => unsubscribe();
    }, []);

    const dispatch = (action: DemoAction) => {
        engineRef.current?.dispatch(action);
    };

    // ------------------------------------------------------------------
    // Legacy mapping (to keep existing components working during refactor)
    // ------------------------------------------------------------------
    const currentUser = state; // DemoState implements DemoUser

    // Backward compat for manual stage setting
    // We map stages to engine actions or just ignore if phase-based
    const currentStage: DemoStage = (function () {
        // Map engine phase/level to "DemoStage"
        if (state.phase === "graduation") return "graduation";
        if (state.level === "usta") return "decision-make"; // Mapping 'decision-make' if it existed, else fallback
        if (state.level === "kalfa") return "bot-arena"; // Or better mapping
        if (state.level === "cirak") return "learning-module";
        return "onboarding";
    })() as any; // Cast for now if types mismatch slightly

    const setStage = (stage: DemoStage) => {
        dispatch({ type: "JUMP_TO_STAGE", payload: { stage } });
    };

    const nextStage = () => {
        // Placeholder
    };

    const prevStage = () => {
        // Placeholder
    };
    // ------------------------------------------------------------------

    return (
        <DemoContext.Provider value={{ state, dispatch, currentUser, currentStage, setStage, nextStage, prevStage }}>
            {children}
        </DemoContext.Provider>
    );
}

export function useDemo() {
    const context = useContext(DemoContext);
    if (context === undefined) {
        throw new Error("useDemo must be used within a DemoProvider");
    }
    return context;
}
