/**
 * Route Registry — Single source of truth for all application routes.
 * Nirvana v2: Ensures no dead links in navigation or CTAs.
 */

export const ROUTES = {
    // --- Public ---
    home: "/",
    baslangic: "/baslangic",
    hakkinda: "/hakkinda",

    // --- Student Routes ---
    panel: "/panel",
    ogren: "/ogren",
    gorevler: "/gorevler",
    gorev: (id: string) => `/gorev/${id}` as const,
    microlab: (id: string) => `/microlab/${id}` as const,
    simulasyon: "/simulasyon",
    simulasyonDetail: (id: string) => `/simulasyon/${id}` as const,
    harita: "/harita",
    etkinlikler: "/etkinlikler",
    mentor: "/mentor",
    kapi: "/kapi",
    profil: "/profil",
    portfolyo: "/portfolyo",
    liderlik: "/liderlik",
    mezuniyet: "/mezuniyet",
    pazar: "/pazar",
    akademi: "/akademi",

    // --- Guide Routes ---
    rehber: "/rehber",
    rehberKohort: "/rehber/kohort",
    rehberDegerlendirme: "/rehber/degerlendirme",
    rehberInceleme: (id: string) => `/rehber/inceleme/${id}` as const,
    rehberCheckin: "/rehber/checkin",
    rehberOgrenciler: "/rehber/ogrenciler",
    rehberOgrenci: (id: string) => `/rehber/ogrenci/${id}` as const,
    rehberIcerik: "/rehber/icerik",
    rehberRapor: "/rehber/rapor",
} as const;

/** 
 * Helper: Resolve a route by content type + slug  
 * Used by Next Best Action and CTA buttons.
 */
export function resolveRouteByContent(type: string, slug: string): string {
    switch (type) {
        case "microlab":
            return ROUTES.microlab(slug);
        case "task":
        case "gorev":
            return ROUTES.gorev(slug);
        case "simulation":
        case "simulasyon":
            return ROUTES.simulasyonDetail(slug);
        case "event":
        case "etkinlik":
            return ROUTES.etkinlikler;
        case "mentor":
            return ROUTES.mentor;
        case "graduation":
        case "mezuniyet":
            return ROUTES.mezuniyet;
        default:
            return ROUTES.panel;
    }
}
