export interface QuizQuestion {
    q: string;
    options: string[];
    correct: number;
    explanation: string;
}

export interface QuizContent {
    questions: QuizQuestion[];
}

export interface MicroLabStep {
    type: "read" | "quiz" | "checklist" | "reflection" | "upload";
    title: string;
    content?: string | string[] | QuizContent;
    prompt?: string;
    minWords?: number;
    instruction?: string;
    accept?: string[];
    icon: string;
}

export interface MicroLabContent {
    id: string;
    title: string;
    description: string;
    duration: string; // e.g. "45 dk"
    xp: number;
    category: "Discovery" | "Build" | "Impact";
    phase: "discovery" | "build" | "impact";
    thumbnail: string;
    videoUrl?: string; // Mock URL
    tags: string[];
    steps: MicroLabStep[];
    sdgAlignment?: number[];
}

export const MICROLABS: MicroLabContent[] = [
    // --- PHASE 1: DISCOVERY (Weeks 1-4) ---
    {
        id: "ml_01",
        title: "Dijital Ayak İzi Nedir?",
        description: "İnternette bıraktığın izleri anla ve yönet. Gizlilik ayarları simülasyonu.",
        duration: "30 dk",
        xp: 100,
        category: "Discovery",
        phase: "discovery",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&fit=crop",
        tags: ["Siber Güvenlik", "Etik"],
        sdgAlignment: [16],
        steps: [
            {
                type: "read",
                title: "Giriş: Dijital İzlerimiz",
                icon: "menu_book",
                content: "Her tıkladığın link, her beğendiğin gönderi bir iz bırakır. Bu modülde dijital gölgeni nasıl yöneteceğini öğreneceksin."
            },
            {
                type: "quiz",
                title: "Gizlilik Testi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Hangisi güçlü bir şifredir?",
                            options: ["123456", "password", "K7!m#9vP2", "dogumtarihim"],
                            correct: 2,
                            explanation: "Güçlü şifreler harf, rakam ve sembol içerir."
                        }
                    ]
                }
            },
            {
                type: "checklist",
                title: "Güvenlik Kontrolü",
                icon: "security",
                content: ["Sosyal medya gizlilik ayarlarını kontrol et", "İki faktörlü doğrulamayı aç", "Gereksiz uygulamaları kaldır"]
            }
        ]
    },
    {
        id: "ml_02",
        title: "Algoritma Mantığına Giriş",
        description: "Kod yazmadan düşünme biçimini değiştir. Akış şemaları ile problem çözme.",
        duration: "45 dk",
        xp: 150,
        category: "Discovery",
        phase: "discovery",
        thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&fit=crop",
        tags: ["Algoritma", "Mantık"],
        steps: [
            {
                type: "read",
                title: "Algoritma Nedir?",
                icon: "lightbulb",
                content: "Algoritma, bir sorunu çözmek için izlenen adımlar bütünüdür. Yemek tarifi de bir algoritmadır."
            }
        ]
    },
    {
        id: "ml_03",
        title: "Python: İlk Değişkenin",
        description: "'Hello World'den fazlası. İklim verisi değişkenlerini tanımla.",
        duration: "60 dk",
        xp: 200,
        category: "Discovery",
        phase: "discovery",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&fit=crop",
        tags: ["Python", "Kodlama"],
        steps: [
            {
                type: "read",
                title: "Değişkenler",
                icon: "code",
                content: "Değişkenler veri tutuculardır. `sicaklik = 25` gibi."
            }
        ]
    },

    // --- PHASE 2: BUILD (Weeks 5-8) ---
    {
        id: "ml_10",
        title: "Pandas ile Veri Temizliği",
        description: "Kirli veriyle analiz yapılmaz. Eksik verileri bul ve tamamla.",
        duration: "90 dk",
        xp: 300,
        category: "Build",
        phase: "build",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop",
        tags: ["Veri Bilimi", "Pandas"],
        steps: []
    },
    {
        id: "ml_12",
        title: "Veri Görselleştirme Sanatı",
        description: "Veriyi hikayeye dönüştür. Porsuk Çayı kirlilik grafiğini çiz.",
        duration: "75 dk",
        xp: 250,
        category: "Build",
        phase: "build",
        thumbnail: "https://images.unsplash.com/photo-1543286386-713df548e9cc?w=800&fit=crop",
        tags: ["Görselleştirme", "Tasarım"],
        steps: []
    },

    // --- PHASE 3: IMPACT (Weeks 9-12) ---
    {
        id: "ml_20",
        title: "Makine Öğrenmesi 101: Tahmin",
        description: "Geleceği tahmin et. Basit bir regresyon modeli kur.",
        duration: "120 dk",
        xp: 500,
        category: "Impact",
        phase: "impact",
        thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&fit=crop",
        tags: ["AI", "Machine Learning"],
        sdgAlignment: [9, 11],
        steps: []
    }
];
