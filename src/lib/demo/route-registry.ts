import { UserRole } from "./types";

export type RouteId =
    // Public
    | "home"
    | "about"
    | "center"
    | "blog"
    | "start" // /ogrenmeye-basla

    // Auth
    | "login"
    | "register"
    | "onboarding" // /baslangic

    // Student
    | "dashboard" // /panel
    | "learn" // /ogren
    | "microlab_detail" // /microlab/[id]
    | "map" // /harita
    | "tasks" // /gorevler
    | "task_detail" // /gorev/[id]
    | "simulation" // /simulasyon
    | "buddy" // /buddy
    | "workspace" // /calisma
    | "events" // /etkinlikler
    | "event_detail" // /etkinlikler/[id]
    | "bot_arena" // /etkinlikler/bot-arena
    | "calendar" // /toplanti
    | "mentor" // /mentor
    | "leaderboard" // /liderlik
    | "market" // /pazar
    | "portfolio" // /portfolyo
    | "profile" // /profil
    | "gate" // /kapi/[level]
    | "notifications" // /bildirimler
    | "certificate" // /sertifikam
    | "settings" // /ayarlar

    // Guide
    | "guide_dashboard" // /rehber
    | "guide_students" // /rehber/ogrenciler
    | "guide_student_detail" // /rehber/ogrenci/[id]
    | "guide_cohorts" // /rehber/kohortlar
    | "guide_reviews" // /rehber/incelemeler
    | "guide_review_detail" // /rehber/inceleme/[id]
    | "guide_checkin" // /rehber/checkin
    | "guide_workshops" // /rehber/atolyeler
    | "guide_reports" // /rehber/rapor
    | "guide_content"; // /rehber/icerik

export const ROUTES: Record<RouteId, string> = {
    // Public
    home: "/",
    about: "/hakkinda",
    center: "/merkez",
    blog: "/blog",
    start: "/ogrenmeye-basla",

    // Auth
    login: "/giris",
    register: "/kayit",
    onboarding: "/baslangic",

    // Student
    dashboard: "/panel",
    learn: "/ogren",
    microlab_detail: "/microlab/:id",
    map: "/harita",
    tasks: "/gorevler",
    task_detail: "/gorev/:id",
    simulation: "/simulasyon",
    buddy: "/buddy",
    workspace: "/calisma",
    events: "/etkinlikler",
    event_detail: "/etkinlikler/:id",
    bot_arena: "/etkinlikler/bot-arena",
    calendar: "/toplanti",
    mentor: "/mentor",
    leaderboard: "/liderlik",
    market: "/pazar",
    portfolio: "/portfolyo",
    profile: "/profil",
    gate: "/kapi/:level",
    notifications: "/bildirimler",
    certificate: "/sertifikam",
    settings: "/ayarlar",

    // Guide
    guide_dashboard: "/rehber",
    guide_students: "/rehber/ogrenciler",
    guide_student_detail: "/rehber/ogrenci/:id",
    guide_cohorts: "/rehber/kohortlar",
    guide_reviews: "/rehber/incelemeler",
    guide_review_detail: "/rehber/inceleme/:id",
    guide_checkin: "/rehber/checkin",
    guide_workshops: "/rehber/atolyeler",
    guide_reports: "/rehber/rapor",
    guide_content: "/rehber/icerik",
};

export function getRoute(id: RouteId, params?: Record<string, string>): string {
    let path = ROUTES[id];
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            path = path.replace(`:${key}`, value);
        });
    }
    return path;
}
