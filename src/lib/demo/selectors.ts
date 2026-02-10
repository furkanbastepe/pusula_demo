import { DemoState } from "./types";
import { CAREER_PATHS } from "@/lib/content/path-packs";
import { MICROLABS } from "@/lib/content/microlabs";
import { TASKS } from "@/lib/content/tasks";

// ─── Next Best Action ────────────────────────────────────────
// Deterministic recommendation based on phase + career path

export const getRecommendedNextStep = (state: DemoState) => {
    const pathId = state.onboarding?.primaryPath || "veri-analizi";
    const pathPack = CAREER_PATHS.find(p => p.id === pathId);

    if (state.phase === "onboarding") {
        return {
            type: "onboarding" as const,
            title: "Profilini Tamamla",
            description: "Yolculuğuna başlamak için hedefini seç.",
            actionUrl: "/baslangic",
            priority: "critical" as const,
        };
    }

    if (state.phase === "discovery") {
        if (state.xp < 200) {
            // Suggest the first microlab for their career path
            const relevantLab = MICROLABS.find(m => m.careerPath === pathId) || MICROLABS[0];
            return {
                type: "microlab" as const,
                title: relevantLab.title,
                description: relevantLab.description,
                actionUrl: `/microlab/${relevantLab.id}`,
                priority: "high" as const,
            };
        }
        // Suggest first task for their career path
        const relevantTask = TASKS.find(t => t.careerPath === pathId) || TASKS[0];
        return {
            type: "task" as const,
            title: relevantTask.title,
            description: relevantTask.description,
            actionUrl: `/gorev/${relevantTask.id}`,
            priority: "medium" as const,
        };
    }

    if (state.phase === "build") {
        return {
            type: "simulation" as const,
            title: "Simülasyona Git",
            description: pathPack
                ? `${pathPack.title} yolundaki simülasyonunu tamamla.`
                : "Gerçek hayat senaryosunu kodla çöz.",
            actionUrl: "/simulasyon",
            priority: "critical" as const,
        };
    }

    if (state.phase === "impact") {
        return {
            type: "mentoring" as const,
            title: "Mentor Görüşmesi",
            description: "Final projen için geri bildirim al.",
            actionUrl: "/mentor",
            priority: "high" as const,
        };
    }

    return {
        type: "graduation" as const,
        title: "Mezuniyet Töreni",
        description: "Sertifikanı al ve kutla! 🎓",
        actionUrl: "/mezuniyet",
        priority: "celebrate" as const,
    };
};

// ─── Center Capacity ─────────────────────────────────────────

export const getCenterCapacityCard = (state: DemoState) => {
    const occupancy = state.center.occupancy;
    const capacity = state.center.capacity;
    const ratio = occupancy / capacity;

    let status: "low" | "moderate" | "high" | "full" = "low";
    if (ratio >= 1) status = "full";
    else if (ratio > 0.8) status = "high";
    else if (ratio > 0.5) status = "moderate";

    return {
        occupancy,
        capacity,
        ratio,
        status,
        message:
            status === "full"
                ? "Merkez şu an tam kapasite. Yer açılmasını bekle."
                : `Merkezde ${capacity - occupancy} kişilik yer var.`,
    };
};

// ─── Graduation Checklist ────────────────────────────────────

export const getGraduationChecklist = (state: DemoState) => {
    return [
        { id: "xp", label: "5000 XP Topla", isComplete: state.xp >= 5000 },
        {
            id: "level",
            label: "Usta Seviyesine Ulaş",
            isComplete: state.level === "usta" || state.level === "graduate",
        },
        {
            id: "sim",
            label: "Capstone Projesini Tamamla",
            isComplete: state.simulation?.status === "completed",
        },
        { id: "gdr", label: "GDR Skoru > 80", isComplete: state.gdrScore > 80 },
        {
            id: "workshop",
            label: "En az 3 Atölyeye Katıl",
            isComplete: state.workshops.attendedIds.length >= 3,
        },
    ];
};

// ─── Dashboard Composite Selector ────────────────────────────

export const getDashboardData = (state: DemoState) => {
    const recommendation = getRecommendedNextStep(state);
    const pathId = state.onboarding?.primaryPath || "veri-analizi";
    const pathPack = CAREER_PATHS.find(p => p.id === pathId);

    // Get career-path-specific tasks
    const pathTasks = TASKS.filter(t => t.careerPath === pathId).slice(0, 2);
    const activeTasks = pathTasks.map((t, i) => ({
        id: t.id,
        title: t.title,
        status: i === 0 ? ("pending" as const) : ("todo" as const),
        deadline: i === 0 ? "Bugün" : "Yarın",
        difficulty: t.difficulty,
        xp: t.xp,
        progress: 0,
    }));

    return {
        nextBestAction: {
            ...recommendation,
            xp: 50,
            thumbnail:
                recommendation.type === "microlab"
                    ? "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
                    : "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&fit=crop",
        },
        currentModule: {
            title: pathPack ? `${pathPack.title} — Temel Modül` : "Dijital Okuryazarlık",
            progress: 35,
            totalSteps: 12,
            completedSteps: 4,
        },
        activeTasks:
            activeTasks.length > 0
                ? activeTasks
                : [
                    {
                        id: "1",
                        title: "İlk Görevini Seç",
                        status: "todo" as const,
                        deadline: "Bugün",
                        difficulty: "Kolay" as const,
                        xp: 150,
                        progress: 0,
                    },
                ],
        upcomingEvents: [
            { id: "evt1", title: "Mentör Buluşması", date: "Cuma 14:00", type: "meeting" },
        ],
        feedItems: state.dashboard.notifications.map(n => ({
            id: n.id,
            title: n.title,
            message: n.message,
            timestamp: n.timestamp.toISOString(),
            type: (n.type === "success"
                ? "achievement"
                : n.type === "error"
                    ? "problem"
                    : "announcement") as any,
        })),
    };
};
