"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { DemoEngine } from "./demo/engine";
import { LearnerState, DemoAction, DemoScenario } from "./demo/types";

// Placeholder for the default scenario. 
// In the next step, we will import the real 'ZEYNEP_SCENARIO' from @/lib/content/scenarios
const DEFAULT_SCENARIO: DemoScenario = {
    id: "default",
    name: "Zeynep Kaya - Standart Akış",
    description: "Sıfırdan mezuniyete Data Science yolculuğu.",
    initialState: {
        name: "Zeynep",
        role: "student",
        level: "cirak",
        xp: 0,
        phase: "onboarding"
    },
    actions: [],
};

interface DemoContextType {
    state: LearnerState;
    dispatch: (action: DemoAction) => void;
    resetDemo: () => void;
    engine: DemoEngine;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
    // Initialize Engine
    // We use a lazy initializer to ensure the engine is created only once per page load
    const [engine] = useState(() => new DemoEngine(DEFAULT_SCENARIO));
    const [state, setState] = useState<LearnerState>(engine.getState());

    useEffect(() => {
        // Subscribe to engine updates to trigger re-renders
        const unsubscribe = engine.subscribe((newState) => {
            setState({ ...newState }); // Spread to ensure new reference
        });
        return unsubscribe;
    }, [engine]);

    const dispatch = useCallback((action: DemoAction) => {
        engine.dispatch(action);
    }, [engine]);

    const resetDemo = useCallback(() => {
        // Reload to reset the engine state to initial
        window.location.reload();
    }, []);

    return (
        <DemoContext.Provider value={{ state, dispatch, resetDemo, engine }}>
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
