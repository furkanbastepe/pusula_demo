import { LearnerState } from "./types";
import { MICROLABS } from "../content/microlabs";
import { TASKS } from "../content/tasks";
import { EVENTS } from "../content/events";

export interface DashboardData {
    nextBestAction: {
        id: string;
        title: string;
        description: string;
        type: "microlab" | "task" | "event";
        xp: number;
        actionUrl: string;
        thumbnail?: string;
    };
    currentModule: {
        title: string;
        progress: number;
        currentLesson: string;
        lessons: { id: string; title: string; done: boolean; current: boolean }[];
    } | null;
    activeTasks: {
        id: string;
        title: string;
        difficulty: "Kolay" | "Orta" | "Zor"; // Aligning with UI expectation (was 'easy' | 'med' | 'hard' in some places, unifying to Turkish/English mapping in component if needed or strict type)
        xp: number;
        deadline: string;
        progress: number;
    }[];
    upcomingEvents: {
        id: string;
        title: string;
        date: string;
        type: "meeting" | "event" | "workshop";
    }[];
    feedItems: {
        id: string;
        type: "achievement" | "problem" | "workshop" | "milestone" | "announcement";
        title: string;
        description?: string;
        link?: string;
        timestamp: string;
        xp?: number;
    }[];
}

export function getDashboardData(state: LearnerState): DashboardData {
    // 1. Determine Next Best Action
    // Logic: First incomplete MicroLab -> First incomplete Task -> Next Event
    let nextBestAction: DashboardData["nextBestAction"] = {
        id: "default",
        title: "Yolculuğun Tamamlandı",
        description: "Tebrikler! Tüm görevleri bitirdin.",
        type: "event",
        xp: 0,
        actionUrl: "/mezuniyet"
    };

    const nextMicrolab = MICROLABS.find(m => !state.completedMicrolabs.includes(m.id));
    if (nextMicrolab) {
        nextBestAction = {
            id: nextMicrolab.id,
            title: nextMicrolab.title,
            description: nextMicrolab.description,
            type: "microlab",
            xp: nextMicrolab.xp,
            actionUrl: `/microlab/${nextMicrolab.id}`,
            thumbnail: nextMicrolab.thumbnail
        };
    } else {
        const nextTask = TASKS.find(t => !state.completedTasks.includes(t.id));
        if (nextTask) {
            nextBestAction = {
                id: nextTask.id,
                title: nextTask.title,
                description: nextTask.description,
                type: "task",
                xp: nextTask.xp,
                actionUrl: `/gorev/${nextTask.id}`
            };
        }
    }

    // 2. Derive Current Module (Mocking structure for now based on next microlab)
    let currentModule = null;
    if (nextMicrolab) {
        currentModule = {
            title: "Dijital Okuryazarlık ve Algoritma", // Generic Module Name
            progress: Math.floor((state.completedMicrolabs.length / MICROLABS.length) * 100),
            currentLesson: nextMicrolab.title,
            lessons: MICROLABS.slice(0, 3).map(m => ({
                id: m.id,
                title: m.title.substring(0, 20) + "...",
                done: state.completedMicrolabs.includes(m.id),
                current: m.id === nextMicrolab.id
            }))
        };
    }

    // 3. Active Tasks
    // For demo, show the next 2 available tasks
    const activeTasks = TASKS
        .filter(t => !state.completedTasks.includes(t.id))
        .slice(0, 2)
        .map(t => ({
            id: t.id,
            title: t.title,
            difficulty: t.difficulty,
            xp: t.xp,
            deadline: t.deadline,
            progress: 0 // Mock progress
        }));

    // 4. Upcoming Events
    const upcomingEvents = EVENTS.map(e => ({
        id: e.id,
        title: e.title,
        date: e.date,
        type: e.type
    }));

    // 5. Mock Feed (Static for now, could be randomized)
    const feedItems: DashboardData["feedItems"] = [
        {
            id: "1",
            type: "achievement",
            title: "Yeni Rozet: İlk Adım",
            description: "İlk MicroLab'ını tamamladın!",
            timestamp: "Bugün",
            xp: 50,
        },
        {
            id: "2",
            type: "problem",
            title: "Yeni Problem: Su Tasarrufu",
            description: "SDG 6 - Temiz Su ve Sanitasyon",
            link: "/pazar",
            timestamp: "2 saat önce",
        },
        {
            id: "3",
            type: "workshop",
            title: "Atölye: Kod İnceleme",
            description: "Yarın 14:00'te başlıyor",
            link: "/pazar?tab=workshops",
            timestamp: "Yarın",
        },
    ];

    return {
        nextBestAction,
        currentModule,
        activeTasks,
        upcomingEvents,
        feedItems
    };
}
