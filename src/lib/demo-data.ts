import { UserRole, Level } from "@/types/database";
import { FeedItem } from "@/components/panel/QuickFeed";
import { mockDataEngine, getCurrentUser, getDemoUser } from "@/lib/mock-data";

export type DemoStage =
    | "onboarding"
    | "dashboard-beginner"
    | "learning-module"
    | "bot-arena"
    | "dashboard-advanced"
    | "project-submission"
    | "graduation";

export interface DashboardData {
    currentModule: {
        id: string;
        title: string;
        progress: number;
        currentLesson: string;
        lessons: { id: string; title: string; done: boolean; current?: boolean }[];
    };
    activeTasks: {
        id: string;
        title: string;
        type: string;
        difficulty: "easy" | "med" | "hard";
        xp: number;
        deadline: string;
        progress: number;
    }[];
    upcomingEvents: {
        id: string;
        title: string;
        date: string;
        type: "meeting" | "event";
    }[];
    feedItems: FeedItem[];
}

export interface DemoUser {
    name: string;
    surname: string;
    role: UserRole;
    level: Level;
    xp: number;
    xpToNext: number;
    streak: number;
    completedModules: number;
    totalModules: number;
    badges: string[];
    notifications: number;
    cohort: string;
    sdg: number;
    gdrScore: number;
    gdrComponents: {
        teknik_rol: number;
        takim: number;
        sunum: number;
        guvenilirlik: number;
        sosyal_etki: number;
    };
    recentActivity: {
        id: string;
        title: string;
        type: "task" | "module" | "event" | "achievement";
        date: string;
        score?: string;
    }[];
}

// Enhanced demo stages with mock data integration
export const DEMO_STAGES: Record<DemoStage, {
    label: string;
    user: DemoUser;
    dashboardData: DashboardData;
    context: string;
}> = {
    "onboarding": {
        label: "1. Karşılama & Onboarding",
        user: {
            name: "Merve",
            surname: "Yılmaz",
            role: "student",
            level: "cirak",
            xp: 0,
            xpToNext: 1000,
            streak: 0,
            completedModules: 0,
            totalModules: 12,
            badges: [],
            notifications: 1,
            cohort: "Atanmamış",
            sdg: 0,
            gdrScore: 0,
            gdrComponents: { teknik_rol: 0, takim: 0, sunum: 0, guvenilirlik: 0, sosyal_etki: 0 },
            recentActivity: []
        },
        dashboardData: {
            currentModule: {
                id: "m0",
                title: "Hoşgeldin & Oryantasyon",
                progress: 0,
                currentLesson: "Platform Tanıtımı",
                lessons: [
                    { id: "l1", title: "Video: PUSULA Nedir?", done: false, current: true },
                    { id: "l2", title: "Profil Oluşturma", done: false },
                    { id: "l3", title: "SDG Seçimi", done: false }
                ]
            },
            activeTasks: [],
            upcomingEvents: [],
            feedItems: [
                {
                    id: "f1",
                    type: "announcement",
                    title: "PUSULA'ya Hoşgeldin!",
                    description: "Yolculuğun başlıyor. İlk adımlarını atmak için modülleri takip et.",
                    timestamp: "Şimdi",
                    link: "#"
                }
            ]
        },
        context: "Kullanıcı sisteme ilk kez giriş yapıyor."
    },
    "dashboard-beginner": {
        label: "2. Başlangıç Paneli (Çırak)",
        user: {
            name: "Merve",
            surname: "Yılmaz",
            role: "student",
            level: "cirak",
            xp: 150,
            xpToNext: 1000,
            streak: 3,
            completedModules: 1,
            totalModules: 12,
            badges: ["İlk Adım"],
            notifications: 2,
            cohort: "Yeni Başlayanlar",
            sdg: 4,
            gdrScore: 20,
            gdrComponents: { teknik_rol: 30, takim: 10, sunum: 10, guvenilirlik: 40, sosyal_etki: 10 },
            recentActivity: [
                { id: "1", title: "Dijital Okuryazarlık 101 tamamlandı", type: "module", date: "2 saat önce", score: "95/100" },
                { id: "2", title: "Discord sunucusuna katıldı", type: "event", date: "1 gün önce" }
            ]
        },
        dashboardData: {
            currentModule: {
                id: "m1",
                title: "Veri Bilimine Giriş",
                progress: 15,
                currentLesson: "Veri Nedir?",
                lessons: [
                    { id: "l1", title: "Veri Temelleri", done: true },
                    { id: "l2", title: "Veri Türleri", done: false, current: true },
                    { id: "l3", title: "Basit Analiz", done: false }
                ]
            },
            activeTasks: [
                { id: "t1", title: "Profilini Tamamla", type: "task", difficulty: "easy", xp: 50, deadline: "Bugün", progress: 80 }
            ],
            upcomingEvents: [
                { id: "e1", title: "Hoşgeldin Toplantısı", date: "Yarın, 10:00", type: "meeting" }
            ],
            feedItems: [
                {
                    id: "f1",
                    type: "achievement",
                    title: "İlk Rozet: İlk Adım",
                    description: "İlk modülünü başarıyla tamamladın!",
                    timestamp: "2 saat önce",
                    xp: 50
                },
                {
                    id: "f2",
                    type: "announcement",
                    title: "Discord Sunucusu Açıldı",
                    description: "Topluluk seni bekliyor. Hemen katıl!",
                    timestamp: "1 gün önce",
                    link: "#"
                }
            ]
        },
        context: "İlk modüller tamamlanmış, yolculuk başlıyor."
    },
    "learning-module": {
        label: "3. Öğrenme & Uygulama",
        user: {
            name: "Merve",
            surname: "Yılmaz",
            role: "student",
            level: "cirak",
            xp: 450,
            xpToNext: 1000,
            streak: 5,
            completedModules: 2,
            totalModules: 12,
            badges: ["Meraklı Kâşif", "Kod Okuryazarı"],
            notifications: 0,
            cohort: "Python Grubu A",
            sdg: 4,
            gdrScore: 35,
            gdrComponents: { teknik_rol: 50, takim: 20, sunum: 20, guvenilirlik: 45, sosyal_etki: 40 },
            recentActivity: [
                { id: "3", title: "Python Temelleri quiz sonucu", type: "task", date: "10 dk önce", score: "100/100" }
            ]
        },
        dashboardData: {
            currentModule: {
                id: "m2",
                title: "Python ile Algoritma",
                progress: 60,
                currentLesson: "Döngüler ve Koşullar",
                lessons: [
                    { id: "l1", title: "Değişkenler", done: true },
                    { id: "l2", title: "Fonksiyonlar", done: true },
                    { id: "l3", title: "Döngüler", done: false, current: true },
                    { id: "l4", title: "Listeler", done: false }
                ]
            },
            activeTasks: [
                { id: "t2", title: "Hesap Makinesi Yap", type: "task", difficulty: "med", xp: 100, deadline: "2 gün", progress: 30 }
            ],
            upcomingEvents: [
                { id: "e2", title: "Kod İnceleme Seansı", date: "Per, 15:00", type: "meeting" }
            ],
            feedItems: [
                {
                    id: "f1",
                    type: "milestone",
                    title: "5 Günlük Seri!",
                    description: "İstikrarlı çalışman harika gidiyor.",
                    timestamp: "Bugün",
                    xp: 25
                },
                {
                    id: "f2",
                    type: "problem",
                    title: "Yeni Problem: Veri Temizliği",
                    description: "Gerçek hayat veri setini temizlemen gerek.",
                    timestamp: "3 saat önce",
                    link: "#"
                },
                {
                    id: "f3",
                    type: "achievement",
                    title: "Kod Okuryazarı",
                    description: "Temel programlama kavramlarını öğrendin.",
                    timestamp: "Dün",
                    xp: 50
                }
            ]
        },
        context: "Aktif öğrenme süreci ve interaktif içerik."
    },
    "bot-arena": {
        label: "4. Etkinlik (Bot Arena)",
        user: {
            name: "Merve",
            surname: "Yılmaz",
            role: "student",
            level: "kalfa",
            xp: 1200,
            xpToNext: 2500,
            streak: 12,
            completedModules: 5,
            totalModules: 12,
            badges: ["Problem Çözücü", "Algoritma Ustası"],
            notifications: 5,
            cohort: "İklim Savaşçıları",
            sdg: 13,
            gdrScore: 55,
            gdrComponents: { teknik_rol: 65, takim: 40, sunum: 30, guvenilirlik: 70, sosyal_etki: 70 },
            recentActivity: [
                { id: "4", title: "Bot Arena Turnuvası Başvurusu", type: "event", date: "Şimdi" }
            ]
        },
        dashboardData: {
            currentModule: {
                id: "m5",
                title: "Yapay Zeka ve Oyun Teorisi",
                progress: 10,
                currentLesson: "Minimax Algoritması",
                lessons: [
                    { id: "l1", title: "Oyun Ağaçları", done: true },
                    { id: "l2", title: "Minimax", done: false, current: true },
                    { id: "l3", title: "Alpha-Beta Budama", done: false }
                ]
            },
            activeTasks: [
                { id: "t3", title: "Bot Arena: İlk Botunu Yaz", type: "task", difficulty: "hard", xp: 500, deadline: "3 gün", progress: 0 }
            ],
            upcomingEvents: [
                { id: "e3", title: "Bot Arena Finali", date: "Cmt, 20:00", type: "event" }
            ],
            feedItems: [
                {
                    id: "f1",
                    type: "announcement",
                    title: "Bot Arena Başlıyor! 🤖",
                    description: "Büyük turnuva için kayıtlar açıldı. Botunu hazırladın mı?",
                    timestamp: "Şimdi",
                    link: "/etkinlikler/bot-arena"
                },
                {
                    id: "f2",
                    type: "milestone",
                    title: "Kalfa Seviyesine Ulaştın",
                    description: "Artık daha karmaşık problemler çözebilirsin.",
                    timestamp: "Dün",
                    xp: 200
                },
                {
                    id: "f3",
                    type: "workshop",
                    title: "Minimax Stratejileri",
                    description: "Turnuva öncesi taktik geliştirme atölyesi.",
                    timestamp: "2 gün önce",
                    link: "#"
                }
            ]
        },
        context: "Yarışma ve topluluk etkileşimi."
    },
    "project-submission": {
        label: "5. Proje & Gerçek Hayat",
        user: {
            name: "Merve",
            surname: "Yılmaz",
            role: "student",
            level: "kalfa",
            xp: 2100,
            xpToNext: 2500,
            streak: 24,
            completedModules: 8,
            totalModules: 12,
            badges: ["Proje Lideri", "Takım Oyuncusu", "Hackathon Finalisti"],
            notifications: 3,
            cohort: "İklim Savaşçıları",
            sdg: 13,
            gdrScore: 78,
            gdrComponents: { teknik_rol: 80, takim: 75, sunum: 60, guvenilirlik: 85, sosyal_etki: 90 },
            recentActivity: [
                { id: "5", title: "Bitirme Projesi Taslağı Onaylandı", type: "task", date: "1 gün önce" },
                { id: "6", title: "Mentor Görüşmesi", type: "event", date: "Yarın 14:00" }
            ]
        },
        dashboardData: {
            currentModule: {
                id: "m8",
                title: "Bitirme Projesi: Sürdürülebilirlik",
                progress: 40,
                currentLesson: "Proje Dokümantasyonu",
                lessons: [
                    { id: "l1", title: "Problem Tanımı", done: true },
                    { id: "l2", title: "MVP Geliştirme", done: true },
                    { id: "l3", title: "Dokümantasyon", done: false, current: true },
                    { id: "l4", title: "Sunum Hazırlığı", done: false }
                ]
            },
            activeTasks: [
                { id: "t4", title: "Proje Raporunu Teslim Et", type: "task", difficulty: "hard", xp: 1000, deadline: "5 gün", progress: 50 }
            ],
            upcomingEvents: [
                { id: "e4", title: "Proje Sunumu (Demo Day)", date: "Haftaya Salı", type: "event" }
            ],
            feedItems: [
                {
                    id: "f1",
                    type: "achievement",
                    title: "Proje Onayı",
                    description: "Mentorun proje taslağını onayladı. Kodlamaya başlayabilirsin!",
                    timestamp: "1 gün önce",
                    xp: 100
                },
                {
                    id: "f2",
                    type: "workshop",
                    title: "Etkili Sunum Teknikleri",
                    description: "Demo Day için hazırlık.",
                    timestamp: "3 gün önce",
                    link: "#"
                },
                {
                    id: "f3",
                    type: "milestone",
                    title: "Hackathon Finalisti",
                    description: "Takımınla birlikte finale kaldın. Tebrikler!",
                    timestamp: "Geçen hafta",
                    xp: 500
                }
            ]
        },
        context: "Bitirme projesi üzerinde çalışma ve mentorluk."
    },
    "dashboard-advanced": {
        label: "6. İleri Seviye (Usta Adayı)",
        user: {
            name: "Merve",
            surname: "Yılmaz",
            role: "student",
            level: "usta",
            xp: 4800,
            xpToNext: 5000,
            streak: 45,
            completedModules: 11,
            totalModules: 12,
            badges: ["Usta Yazılımcı", "Topluluk Mentoru", "Açık Kaynak Katılımcısı"],
            notifications: 8,
            cohort: "Mezun Adayları",
            sdg: 13,
            gdrScore: 92,
            gdrComponents: { teknik_rol: 95, takim: 90, sunum: 85, guvenilirlik: 95, sosyal_etki: 95 },
            recentActivity: [
                { id: "7", title: "Staj Mülakatı Simülasyonu", type: "task", date: "3 saat önce", score: "Başarılı" }
            ]
        },
        dashboardData: {
            currentModule: {
                id: "m12",
                title: "Kariyer & Gelecek",
                progress: 90,
                currentLesson: "CV & Portföy İncelemesi",
                lessons: [
                    { id: "l1", title: "LinkedIn Profili", done: true },
                    { id: "l2", title: "GitHub Portföyü", done: true },
                    { id: "l3", title: "Mülakat Teknikleri", done: true },
                    { id: "l4", title: "Final Görüşmesi", done: false, current: true }
                ]
            },
            activeTasks: [
                { id: "t5", title: "Mezuniyet Başvurusunu Tamamla", type: "task", difficulty: "med", xp: 200, deadline: "Yarın", progress: 90 }
            ],
            upcomingEvents: [
                { id: "e5", title: "Mezuniyet Töreni", date: "20 Haziran", type: "event" }
            ],
            feedItems: [
                {
                    id: "f1",
                    type: "achievement",
                    title: "Usta Seviyesi",
                    description: "Artık sen bir Ustasın. Çıraklara yol gösterebilirsin.",
                    timestamp: "Dün",
                    xp: 1000
                },
                {
                    id: "f2",
                    type: "milestone",
                    title: "45 Günlük Seri",
                    description: "İnanılmaz bir disiplin!",
                    timestamp: "Bugün",
                    xp: 100
                },
                {
                    id: "f3",
                    type: "announcement",
                    title: "Kariyer Fuarı",
                    description: "Partner şirketlerle tanışma fırsatı.",
                    timestamp: "2 gün önce",
                    link: "#"
                }
            ]
        },
        context: "Mezuniyete sadece bir adım kaldı."
    },
    "graduation": {
        label: "7. Mezuniyet & İstihdam",
        user: {
            name: "Merve",
            surname: "Yılmaz",
            role: "student",
            level: "graduate",
            xp: 5500,
            xpToNext: 5500,
            streak: 60,
            completedModules: 12,
            totalModules: 12,
            badges: ["PUSULA Mezunu 2024", "İstihdam Hazır", "Full Stack Developer"],
            notifications: 10,
            cohort: "Mezunlar",
            sdg: 13,
            gdrScore: 98,
            gdrComponents: { teknik_rol: 98, takim: 98, sunum: 95, guvenilirlik: 100, sosyal_etki: 99 },
            recentActivity: [
                { id: "8", title: "Mezuniyet Sertifikası Hazır", type: "achievement", date: "Şimdi" },
                { id: "9", title: "İş Görüşmesi Daveti: TechCorp", type: "event", date: "Gelen Kutusu" }
            ]
        },
        dashboardData: {
            currentModule: {
                id: "m_grad",
                title: "Mezuniyet Sonrası",
                progress: 100,
                currentLesson: "Artık bir PUSULA Mezunusun!",
                lessons: [
                    { id: "l1", title: "Tebrikler!", done: true },
                    { id: "l2", title: "Alumni Ağına Katıl", done: true }
                ]
            },
            activeTasks: [],
            upcomingEvents: [
                { id: "e6", title: "Alumni Buluşması", date: "Gelecek Ay", type: "event" }
            ],
            feedItems: [
                {
                    id: "f1",
                    type: "achievement",
                    title: "MEZUN OLDUN! 🎓",
                    description: "PUSULA programını başarıyla tamamladın.",
                    timestamp: "Şimdi",
                    xp: 5000
                },
                {
                    id: "f2",
                    type: "announcement",
                    title: "İş Görüşmesi Daveti",
                    description: "TechCorp seninle görüşmek istiyor.",
                    timestamp: "1 saat önce",
                    link: "#"
                },
                {
                    id: "f3",
                    type: "milestone",
                    title: "Yolculuk Tamamlandı",
                    description: "Sıfırdan zirveye...",
                    timestamp: "Bugün"
                }
            ]
        },
        context: "Başarı hikayesi ve sertifika."
    }
};
