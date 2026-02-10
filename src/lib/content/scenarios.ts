import { DemoScenario } from "@/lib/demo/types";

export const ZEYNEP_SCENARIO: DemoScenario = {
    id: "zeynep_kaya",
    name: "Zeynep Kaya",
    description: "2. sınıf Bilgisayar Mühendisliği öğrencisi. Frontend geliştirmeye meraklı, görsel sanatlara ilgili.",
    initialState: {
        name: "Zeynep Kaya",
        role: "student",
        level: "cirak",
        phase: "onboarding",
        xp: 120,
        streak: 3,
        completedMicrolabs: [],
        completedTasks: [],
        inventory: [],
        dashboard: {
            nextMilestone: "GDR Hedefi: 50",
            pendingTasks: 3,
            activeProjects: 1,
            notifications: []
        },
        sdg: 7, // Erişilebilir ve Temiz Enerji
        gdrScore: 42,
        gdrComponents: {
            teknik_rol: 45,
            takim: 30,
            sunum: 50,
            guvenilirlik: 40,
            sosyal_etki: 35
        }
    },
    actions: []
};
