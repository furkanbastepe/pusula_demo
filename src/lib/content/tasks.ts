export interface TaskContent {
    id: string;
    title: string;
    description: string;
    difficulty: "Kolay" | "Orta" | "Zor";
    xp: number;
    deadline: string; // "2 gün" or specific date string mocked
    deliverableType: "link" | "file" | "text";
    scenarioContext: string; // Fluff text connecting to Zeynep's story
}

export const TASKS: TaskContent[] = [
    {
        id: "task_01",
        title: "Eskişehir Hava Durumu Verisini Çek",
        description: "OpenWeatherMap API kullanarak Eskişehir'in son 5 yıllık sıcaklık verisini çeken bir Python scripti yaz.",
        difficulty: "Kolay",
        xp: 150,
        deadline: "Bu Hafta",
        deliverableType: "link",
        scenarioContext: "Meteoroloji mühendisliği arka planını kullanma zamanı Zeynep!"
    },
    {
        id: "task_05",
        title: "Porsuk Çayı Kirlilik Analizi Raporu",
        description: "Sana verilen 'water_quality.csv' dosyasını analiz et. pH değeri 7.0'ın altında olan bölgeleri haritalandır.",
        difficulty: "Orta",
        xp: 400,
        deadline: "3 Gün Sonra",
        deliverableType: "file",
        scenarioContext: "Belediye bu raporu bekliyor. Analizin şehrin sürdürülebilirlik hedefleri için kritik."
    },
    {
        id: "task_09",
        title: "Capstone: Akıllı Şehir Dashboard'u",
        description: "Tüm öğrendiklerini birleştir. Şehrin enerji tüketimini canlı gösteren bir dashboard prototipi yap.",
        difficulty: "Zor",
        xp: 1000,
        deadline: "Final Haftası",
        deliverableType: "link",
        scenarioContext: "Bu proje senin mezuniyet biletin. Jüri karşısında sunacaksın."
    }
];
