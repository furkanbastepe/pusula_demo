import { CareerPathId } from "@/lib/demo/types";

export interface TaskContent {
    id: string;
    title: string;
    description: string;
    difficulty: "Kolay" | "Orta" | "Zor";
    xp: number;
    deadline: string;
    deliverableType: "link" | "file" | "text";
    scenarioContext: string;
    careerPath?: CareerPathId;
}

export const TASKS: TaskContent[] = [
    // ========================================
    // VERİ ANALİZİ
    // ========================================
    {
        id: "task_01",
        title: "Eskişehir Hava Durumu Verisini Çek",
        description: "OpenWeatherMap API kullanarak Eskişehir'in son 5 yıllık sıcaklık verisini çeken bir Python scripti yaz.",
        difficulty: "Kolay",
        xp: 150,
        deadline: "Bu Hafta",
        deliverableType: "link",
        scenarioContext: "İlk veri toplama deneyimin! API'den gerçek veri çekeceksin.",
        careerPath: "veri-analizi"
    },
    {
        id: "task_05",
        title: "Porsuk Çayı Kirlilik Analizi Raporu",
        description: "Sana verilen 'water_quality.csv' dosyasını analiz et. pH değeri 7.0'ın altında olan bölgeleri haritalandır.",
        difficulty: "Orta",
        xp: 400,
        deadline: "3 Gün Sonra",
        deliverableType: "file",
        scenarioContext: "Belediye bu raporu bekliyor. Analizin şehrin sürdürülebilirlik hedefleri için kritik.",
        careerPath: "veri-analizi"
    },
    {
        id: "task_veri_03",
        title: "İş Zekası Dashboard Prototipi",
        description: "Eskişehir toplu taşıma verilerini kullanarak bir iş zekası dashboard'u tasarla. En yoğun hatları ve saatleri görselleştir.",
        difficulty: "Zor",
        xp: 600,
        deadline: "1 Hafta",
        deliverableType: "link",
        scenarioContext: "Belediye ulaşım dairesi bu dashboard'u karar destek sistemi olarak kullanacak.",
        careerPath: "veri-analizi"
    },

    // ========================================
    // YAPAY ZEKÂ & ML
    // ========================================
    {
        id: "task_ai_01",
        title: "Duygu Analizi Modeli",
        description: "Türkçe sosyal medya yorumlarından duygu analizi yapan bir ML modeli eğit. Pozitif/negatif/nötr sınıflandırma.",
        difficulty: "Orta",
        xp: 450,
        deadline: "5 Gün Sonra",
        deliverableType: "link",
        scenarioContext: "Belediye halkla ilişkiler birimi, sosyal medyadaki algıyı ölçmek istiyor.",
        careerPath: "yapay-zeka-ml"
    },
    {
        id: "task_ai_02",
        title: "Trafik Yoğunluk Tahmin Modeli",
        description: "Eskişehir'in 3 ana kavşağı için saatlik trafik yoğunluğunu tahmin eden bir regresyon modeli kur.",
        difficulty: "Zor",
        xp: 700,
        deadline: "2 Hafta",
        deliverableType: "link",
        scenarioContext: "Akıllı şehir projesi kapsamında trafik optimizasyonu için kritik bir model.",
        careerPath: "yapay-zeka-ml"
    },

    // ========================================
    // DİJİTAL PAZARLAMA
    // ========================================
    {
        id: "task_paz_01",
        title: "Yerel İşletme SEO Analizi",
        description: "Eskişehir'deki bir yerel işletmeyi seç. Google My Business, anahtar kelime analizi ve rakip karşılaştırması yap.",
        difficulty: "Kolay",
        xp: 200,
        deadline: "Bu Hafta",
        deliverableType: "file",
        scenarioContext: "İşletme Google'da ilk sayfaya çıkmak istiyor. Onlara yol haritası çizeceksin.",
        careerPath: "dijital-pazarlama"
    },
    {
        id: "task_paz_02",
        title: "Sosyal Medya Kampanya Planı",
        description: "Eskişehir Gençlik Merkezi için 1 aylık sosyal medya kampanyası tasarla. 4 platform, haftalık içerik takvimi, KPI hedefleri.",
        difficulty: "Orta",
        xp: 400,
        deadline: "5 Gün Sonra",
        deliverableType: "file",
        scenarioContext: "Merkez, gençlere ulaşmakta zorlanıyor. Kampanyan başvuru sayısını artıracak.",
        careerPath: "dijital-pazarlama"
    },

    // ========================================
    // YAZILIM GELİŞTİRME
    // ========================================
    {
        id: "task_yaz_01",
        title: "Todo API Geliştir",
        description: "Node.js ve Express ile CRUD işlemlerini destekleyen bir RESTful Todo API yaz. JSON dosyasında veri saklansın.",
        difficulty: "Orta",
        xp: 350,
        deadline: "5 Gün Sonra",
        deliverableType: "link",
        scenarioContext: "İlk backend projen! API tasarımını öğreneceksin.",
        careerPath: "yazilim-gelistirme"
    },
    {
        id: "task_yaz_02",
        title: "Topluluk Etkinlik Platformu",
        description: "React ile etkinlik listeleme, detay görüntüleme ve katılım butonu olan bir frontend uygulaması geliştir.",
        difficulty: "Zor",
        xp: 600,
        deadline: "2 Hafta",
        deliverableType: "link",
        scenarioContext: "DiGEM topluluğu için gerçek kullanılacak bir platform. Portfolio'na büyük katkı.",
        careerPath: "yazilim-gelistirme"
    },

    // ========================================
    // DİJİTAL TASARIM
    // ========================================
    {
        id: "task_tas_01",
        title: "Mobil Uygulama UI Kit",
        description: "Figma'da 10 temel bileşen içeren bir UI kit tasarla: buton, kart, navigasyon, form elemanları, modal.",
        difficulty: "Orta",
        xp: 350,
        deadline: "5 Gün Sonra",
        deliverableType: "link",
        scenarioContext: "Bu kit, tüm DiGEM projelerinde kullanılacak ortak tasarım dili olacak.",
        careerPath: "dijital-tasarim"
    },
    {
        id: "task_tas_02",
        title: "Erişilebilir Landing Page Tasarımı",
        description: "WCAG 2.1 AA standartlarına uygun, responsive bir landing page tasarla. Renk kontrastı, font boyutu ve navigasyon erişilebilirliğini test et.",
        difficulty: "Zor",
        xp: 500,
        deadline: "1 Hafta",
        deliverableType: "link",
        scenarioContext: "Herkesin erişebildiği tasarım, iyi tasarımdır. Portföyün için güçlü bir parça.",
        careerPath: "dijital-tasarim"
    },

    // ========================================
    // E-TİCARET
    // ========================================
    {
        id: "task_eti_01",
        title: "Ürün Katalogu Oluştur",
        description: "Bir niş ürün kategorisi seç (el yapımı takı, organik gıda vb.). 10 ürünlük profesyonel bir katalog hazırla.",
        difficulty: "Kolay",
        xp: 200,
        deadline: "Bu Hafta",
        deliverableType: "file",
        scenarioContext: "İlk e-ticaret adımın! Ürün listeleme ve fotoğraf çekimi becerilerini geliştireceksin.",
        careerPath: "e-ticaret"
    },
    {
        id: "task_eti_02",
        title: "E-Ticaret Mağaza Kurulumu",
        description: "Shopify veya WooCommerce ile bir demo mağaza kur. 5 ürün, ödeme entegrasyonu, kargo ayarları ve iade politikası yaz.",
        difficulty: "Orta",
        xp: 450,
        deadline: "1 Hafta",
        deliverableType: "link",
        scenarioContext: "Gerçek bir mağaza deneyimi. Siparişten kargoya tüm süreci yöneteceksin.",
        careerPath: "e-ticaret"
    },

    // ========================================
    // CAPSTONE (Tüm Yollar)
    // ========================================
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
