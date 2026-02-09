// Constants for PUSULA Platform

// Turkish routes
export const ROUTES = {
    // Public
    home: '/',
    about: '/hakkinda',
    center: '/merkez',
    start: '/ogrenmeye-basla',
    faq: '/sss',
    privacy: '/gizlilik',

    // Auth
    login: '/giris',
    register: '/kayit',

    // Student
    onboarding: '/baslangic',
    meeting: '/toplanti',
    mission: '/misyon',
    panel: '/panel',
    learn: '/ogren',
    microlab: (id: string) => `/microlab/${id}`,
    tasks: '/gorevler',
    task: (id: string) => `/gorev/${id}`,
    submit: (id: string) => `/teslim/${id}`,
    gate: (level: string) => `/kapi/${level}`,
    portfolio: '/portfolyo',
    certificate: '/sertifikam',
    profile: '/profil',
    support: '/destek',

    // New features
    leaderboard: '/liderlik',
    simulation: '/simulasyon',
    simulationLesson: (lessonId: string) => `/simulasyon/${lessonId}`,
    learningMap: '/harita',
    pazar: '/pazar',
    notifications: '/bildirimler',

    // Guide
    guide: '/rehber',
    guideStudents: '/rehber/ogrenciler',
    guideStudent: (id: string) => `/rehber/ogrenci/${id}`,
    guideReviews: '/rehber/incelemeler',
    guideReview: (id: string) => `/rehber/inceleme/${id}`,
    guideWorkshops: '/rehber/atolyeler',
    guideMeetings: '/rehber/toplantilar',
    guideReport: '/rehber/rapor',
    guideApproval: (userId: string) => `/rehber/onay/${userId}`,
    guideCheckin: '/rehber/checkin',
} as const

// SDG Colors
export const SDG_COLORS: Record<number, string> = {
    1: '#E5243B', // No Poverty
    2: '#DDA63A', // Zero Hunger
    3: '#4C9F38', // Good Health
    4: '#C5192D', // Quality Education
    5: '#FF3A21', // Gender Equality
    6: '#26BDE2', // Clean Water
    7: '#FCC30B', // Affordable Energy
    8: '#A21942', // Decent Work
    9: '#FD6925', // Industry
    10: '#DD1367', // Reduced Inequalities
    11: '#FD9D24', // Sustainable Cities
    12: '#BF8B2E', // Responsible Consumption
    13: '#3F7E44', // Climate Action
    14: '#0A97D9', // Life Below Water
    15: '#56C02B', // Life on Land
    16: '#00689D', // Peace Justice
    17: '#19486A', // Partnerships
}

// Pilot SDGs (focused)
export const PILOT_SDGS = [4, 6, 11, 13, 17] as const

// Level colors
export const LEVEL_COLORS = {
    cirak: '#22c55e',    // Green
    kalfa: '#3b82f6',    // Blue
    usta: '#8b5cf6',     // Purple
    graduate: '#f59e0b', // Gold
} as const

// Level labels (Turkish)
export const LEVEL_LABELS = {
    cirak: 'Çırak',
    kalfa: 'Kalfa',
    usta: 'Usta',
    graduate: 'Mezun',
} as const

// XP thresholds
export const XP_THRESHOLDS = {
    cirak: 0,
    kalfa: 800,
    usta: 2000,
    graduate: 4000,
} as const

// Task XP values by difficulty
export const TASK_XP = {
    easy: 50,
    med: 100,
    hard: 150,
} as const

// SLA hours
export const REVIEW_SLA_HOURS = 48
export const REVIEW_WARN_HOURS = 24

// Inactive days for risk flags
export const RISK_RED_DAYS = 7
export const RISK_YELLOW_DAYS = 3
