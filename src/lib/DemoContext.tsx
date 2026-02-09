"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEMO_STAGES, DemoStage, DemoUser } from "./demo-data";
import { toast } from "sonner";

interface DemoContextType {
    currentStage: DemoStage;
    currentUser: DemoUser;
    setStage: (stage: DemoStage) => void;
    nextStage: () => void;
    prevStage: () => void;
    isDemoMode: boolean;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
    const [currentStage, setCurrentStage] = useState<DemoStage>("onboarding");
    const [isDemoMode, setIsDemoMode] = useState(true);

    const currentUser = DEMO_STAGES[currentStage].user;

    const setStage = (stage: DemoStage) => {
        setCurrentStage(stage);
        toast.success(`Demo Sahnesi Değiştirildi: ${DEMO_STAGES[stage].label}`, {
            description: DEMO_STAGES[stage].context,
        });
    };

    const stages = Object.keys(DEMO_STAGES) as DemoStage[];

    const nextStage = () => {
        const currentIndex = stages.indexOf(currentStage);
        if (currentIndex < stages.length - 1) {
            setStage(stages[currentIndex + 1]);
        }
    };

    const prevStage = () => {
        const currentIndex = stages.indexOf(currentStage);
        if (currentIndex > 0) {
            setStage(stages[currentIndex - 1]);
        }
    };

    // Keyboard shortcuts for demo control
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "ArrowRight") {
                nextStage();
            } else if (e.ctrlKey && e.key === "ArrowLeft") {
                prevStage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentStage]);

    return (
        <DemoContext.Provider
            value={{
                currentStage,
                currentUser,
                setStage,
                nextStage,
                prevStage,
                isDemoMode,
            }}
        >
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
