export interface SimulationContent {
    id: string;
    title: string;
    description: string;
    sdg: number;
    difficulty: "easy" | "medium" | "hard" | "expert";
    duration: string;
    xp: number;
    icon: string;
    scenario: string;
    objectives: string[];
    steps: {
        id: string;
        title: string;
        description: string;
        options: {
            id: string;
            text: string;
            impact: {
                environment?: number;
                social?: number;
                economic?: number;
                score?: number;
            };
            feedback: string;
        }[];
    }[];
}

export const SIMULATIONS: SimulationContent[] = [
    {
        id: "climate-crisis",
        title: "İklim Krizi Senaryosu",
        description: "2050 yılına kadar şehir içi karbon emisyonlarını azaltma stratejileri geliştir. Kararların şehrin geleceğini belirleyecek.",
        sdg: 13,
        difficulty: "medium",
        duration: "45-60 dk",
        xp: 300,
        icon: "eco",
        scenario: "Eskişehir Belediyesi",
        objectives: [
            "Karbon emisyonlarını %50 azalt",
            "Halk memnuniyetini %70 üzerinde tut",
            "Bütçeyi aşma"
        ],
        steps: [
            {
                id: "step-1",
                title: "Toplu Taşıma Reformu",
                description: "Şehrin ulaşım altyapısını modernize etmen gerekiyor. Hangi stratejiyi izleyeceksin?",
                options: [
                    {
                        id: "opt-1-a",
                        text: "Tüm otobüsleri elektriklilerle değiştir (Yüksek Maliyet)",
                        impact: { environment: 40, economic: -30, score: 20 },
                        feedback: "Çevresel etkisi harika, ama bütçeyi zorladın."
                    },
                    {
                        id: "opt-1-b",
                        text: "Bisiklet yollarını artır ve teşvik et (Düşük Maliyet)",
                        impact: { environment: 20, social: 30, economic: -10, score: 15 },
                        feedback: "Halk sağlığı ve çevre için iyi bir adım, ancak etkisi daha uzun vadeli."
                    },
                    {
                        id: "opt-1-c",
                        text: "Mevcut sistemi koru, sadece bakım yap",
                        impact: { environment: 0, economic: 10, score: 0 },
                        feedback: "Statüko korundu, ancak emisyon hedeflerine ulaşamazsın."
                    }
                ]
            },
            {
                id: "step-2",
                title: "Enerji Kaynakları",
                description: "Şehrin artan enerji ihtiyacını nasıl karşılayacaksın?",
                options: [
                    {
                        id: "opt-2-a",
                        text: "Yenilenebilir enerji santralleri kur",
                        impact: { environment: 50, economic: -40, score: 25 },
                        feedback: "Geleceğe yatırım yaptın."
                    },
                    {
                        id: "opt-2-b",
                        text: "Kömür santrallerini filtrele",
                        impact: { environment: 10, economic: -20, score: 5 },
                        feedback: "Yetersiz bir çözüm."
                    }
                ]
            }
        ]
    },
    {
        id: "water-management",
        title: "Su Yönetimi Simülasyonu",
        description: "Kuraklık döneminde su kaynaklarını yönet ve adil dağıtım sağla. Tarım ve sanayi dengesini koru.",
        sdg: 6,
        difficulty: "hard",
        duration: "60-90 dk",
        xp: 500,
        icon: "water_drop",
        scenario: "Bölgesel Su İdaresi",
        objectives: [],
        steps: []
    },
    {
        id: "equality-workplace",
        title: "İş Yeri Eşitliği",
        description: "Cinsiyet eşitliğini destekleyen kurum politikaları tasarla. Kapsayıcı bir kültür oluştur.",
        sdg: 5,
        difficulty: "medium",
        duration: "30-45 dk",
        xp: 250,
        icon: "diversity_3",
        scenario: "Tech Startup",
        objectives: [],
        steps: []
    },
    {
        id: "sustainable-city",
        title: "Sürdürülebilir Şehir",
        description: "2040 vizyonuyla akıllı şehir altyapısı planla. Teknoloji ve doğayı entegre et.",
        sdg: 11,
        difficulty: "expert",
        duration: "90-120 dk",
        xp: 750,
        icon: "location_city",
        scenario: "Şehir Planlama Bakanlığı",
        objectives: [],
        steps: []
    }
];
