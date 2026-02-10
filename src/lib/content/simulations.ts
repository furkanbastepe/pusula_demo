import { DemoLesson } from '@/components/simulation/engine/SimulationEngine';

export const SIMULATION_LESSONS: Record<string, DemoLesson> = {
    // --- Traffic AI Path ---
    'ai-1': {
        id: 'ai-1',
        title: 'Trafik Lambası Kontrolü',
        description: "Trafik akışını yönetmek için lambayı kontrol et. Değişkeni 'yesil' yaparak araçların geçmesini sağla.",
        initialCode: `// Trafik lambasını kontrol et
let trafik_lambasi = "kirmizi";

// Kodu düzenle ve "yesil" yap
`,
        targetValues: { trafik_lambasi: 'yesil' },
        successMessage: "Harika! Trafik akışı başladı.",
        hints: ["Değişkenin değerini tırnak içinde yazmalısın.", "JavaScript'te metinler çift tırnak veya tek tırnak içinde yazılır."],
        type: 'traffic-ai',
        previewComponent: 'TrafficLightPreview'
    },
    'ai-2': {
        id: 'ai-2',
        title: 'Hız Limiti Ayarlama',
        description: "Otoyol hız limitini belirle. Güvenli ve verimli bir akış için hızı 90 km/s olarak ayarla.",
        initialCode: `// Hız limitini belirle
let hiz_limiti = 50;
let arac_hizi = 0;

// Hızı 90'a çıkar
arac_hizi = 50; 
`,
        targetValues: { arac_hizi: 90 },
        successMessage: "Mükemmel! Trafik güvenli ve hızlı akıyor.",
        hints: ["Sayıları tırnak işareti olmadan yazmalısın.", "arac_hizi değişkenine 90 değerini ata."],
        type: 'traffic-ai',
        previewComponent: 'CarPreview'
    },
    'ai-3': {
        id: 'ai-3',
        title: 'Acil Durum Protokolü',
        description: "Bir yangın tespit edildi! Acil durum sistemini devreye sokarak binayı tahliye et.",
        initialCode: `// Sistem durumu
let normal_mod = true;
let acil_durum = false;

// Acil durumu aktif et!
`,
        targetValues: { acil_durum: true },
        successMessage: "Alarm verildi! Herkes güvenle tahliye ediliyor.",
        hints: ["true (doğru) veya false (yanlış) değerlerini kullan.", "acil_durum = true yazmalısın."],
        type: 'traffic-ai',
        previewComponent: 'FireAlarmPreview'
    },
    'ai-4': {
        id: 'ai-4',
        title: 'Akıllı Otopark Sistemi',
        description: "Otopark kapasitesini yönet. Giriş yapan araçları say ve doluluk oranını kontrol et. Toplam 8 araçlık yer var.",
        initialCode: `// Otopark sayacı
let kapasite = 8;
let arac_sayisi = 0;

// Otoparkı tamamen doldur (8 araç)
arac_sayisi = 5;
`,
        targetValues: { arac_sayisi: 8 },
        successMessage: "Otopark tam kapasiteye ulaştı ve sistem doğru çalışıyor!",
        hints: ["arac_sayisi değişkenini 8 yapmalısın."],
        type: 'traffic-ai',
        previewComponent: 'ParkingPreview'
    },
    'ai-5': {
        id: 'ai-5',
        title: 'Enerji Verimliliği Optimizasyonu',
        description: "Veri merkezinin enerji tüketimini optimize et. İşlemci yükünü dengeleyerek verimliliği %100'e çıkar.",
        initialCode: `// Enerji optimizasyon sistemi
let cpu_yuk = 40;
let sogutma_gucu = 60;
let verimlilik = 0;

// Verimliliği hesapla ve 100 yap
verimlilik = (cpu_yuk + sogutma_gucu) / 2;
`,
        targetValues: { verimlilik: 100 },
        successMessage: "Sistem maksimum verimlilikte çalışıyor! Enerji tasarrufu sağlandı.",
        hints: ["Direkt olarak verimlilik = 100 yazabilirsin.", "Matematiksel işlemlerle de 100'e ulaşabilirsin."],
        type: 'traffic-ai',
        previewComponent: 'EfficiencyPreview'
    },
    'ai-6': {
        id: 'ai-6',
        title: 'Otomatik Fren Sistemi',
        description: "Öndeki araç aniden durdu! Çarpışmayı önlemek için acil fren sistemini devreye al.",
        initialCode: `// Mesafe sensörü verisi
let mesafe = 15; // metre
let fren = false;

// Çarpışmayı önlemek için freni aç!
if (mesafe < 20) {
    // Buraya kod yaz
}
`,
        targetValues: { fren: true },
        successMessage: "Frenler devreye girdi! Kaza önlendi.",
        hints: ["If bloğunun içine fren = true yazmalısın.", "Mantıksal kontrolü sağla."],
        type: 'traffic-ai',
        previewComponent: 'BrakePreview'
    },

    // --- Software Dev Path ---
    'dev-1': {
        id: 'dev-1',
        title: 'İlk Fonksiyonun',
        description: "Kullanıcıyı selamlayan bir fonksiyon yaz.",
        initialCode: `function selamla(isim) {
  // Buraya kod yaz
  return "Merhaba " + isim;
}

// Test et
let sonuc = selamla("Ahmet");
`,
        targetValues: { sonuc: "Merhaba Ahmet" },
        successMessage: "Fonksiyonun harika çalışıyor!",
        hints: ["Return anahtar kelimesini unutma."],
        type: 'software-dev'
    },

    // --- Veri Analizi Path ---
    'veri-1': {
        id: 'veri-1',
        title: 'SQL Veri Filtreleme',
        description: "Eskişehir nüfus verisinden 20 yaş üstü kişileri filtrele. Sonuç sayısını hesapla.",
        initialCode: `// Veritabanı sonucu (basitleştirilmiş)
let toplam_kayit = 150;
let yas_filtresi = 18;

// Yaş filtresini 20 yap
// yas_filtresi = ???

let sonuc_sayisi = toplam_kayit - (yas_filtresi * 2);
`,
        targetValues: { yas_filtresi: 20 },
        successMessage: "Sorgu başarılı! 20 yaş üstü kayıtlar filtrelendi.",
        hints: ["yas_filtresi değişkenini 20 yapmalısın.", "Filtreleme mantığını düşün."],
        type: 'veri-analizi'
    },

    // --- AI/ML Path ---
    'ml-1': {
        id: 'ml-1',
        title: 'Model Eğitim Parametresi',
        description: "Makine öğrenmesi modelinin öğrenme hızını ayarla. Optimum değer 0.01'dir.",
        initialCode: `// Model hiperparametreleri
let learning_rate = 0.1;
let epochs = 100;
let accuracy = 0;

// Learning rate'i 0.01'e düşür
// learning_rate = ???
`,
        targetValues: { learning_rate: 0.01 },
        successMessage: "Model başarıyla eğitildi! Doğruluk oranı %94'e ulaştı.",
        hints: ["Öğrenme hızı çok yüksek olursa model öğrenemez.", "0.01 değerini atayın."],
        type: 'yapay-zeka-ml'
    },

    // --- Dijital Pazarlama Path ---
    'paz-1': {
        id: 'paz-1',
        title: 'A/B Test Kampanya Analizi',
        description: "İki reklam kampanyasının dönüşüm oranını karşılaştır. Kazanan kampanyayı belirle.",
        initialCode: `// Kampanya A
let kampanya_a_tiklama = 1200;
let kampanya_a_donusum = 48;

// Kampanya B
let kampanya_b_tiklama = 800;
let kampanya_b_donusum = 56;

// Daha iyi dönüşüm oranına sahip kampanyayı seç
// "A" veya "B" yazın
let kazanan = "";
`,
        targetValues: { kazanan: "B" },
        successMessage: "Doğru! Kampanya B daha yüksek dönüşüm oranına sahip (%7 vs %4).",
        hints: ["Dönüşüm oranı = dönüşüm / tıklama", "A: 48/1200 = %4, B: 56/800 = %7"],
        type: 'dijital-pazarlama'
    },

    // --- Dijital Tasarım Path ---
    'tas-1': {
        id: 'tas-1',
        title: 'CSS Layout Challenge',
        description: "Bir kartın genişliğini responsive yapmak için yüzde değeri kullan. Genişliği %100 yap.",
        initialCode: `// Kart stilleri
let kart_genislik = 300; // pixel
let responsive = false;

// Responsive yapmak için genişliği yüzde olarak ayarla
// kart_genislik = ???
// responsive = ???
`,
        targetValues: { responsive: true },
        successMessage: "Kart artık her ekran boyutuna uyum sağlıyor!",
        hints: ["responsive değişkenini true yapın.", "Pixel yerine yüzde kullanmak responsive tasarımın temelidir."],
        type: 'dijital-tasarim'
    },

    // --- E-Ticaret Path ---
    'eti-1': {
        id: 'eti-1',
        title: 'Envanter Yönetimi',
        description: "Mağaza envanterini kontrol et. 50 ürünlük siparişten sonra kalan stoku hesapla.",
        initialCode: `// Stok durumu
let mevcut_stok = 200;
let siparis = 50;
let kalan_stok = 0;

// Kalan stoku hesapla
kalan_stok = mevcut_stok;
`,
        targetValues: { kalan_stok: 150 },
        successMessage: "Envanter güncellendi! Stok takibi başarılı.",
        hints: ["Kalan stok = mevcut stok - sipariş", "200 - 50 = 150"],
        type: 'e-ticaret'
    }
};

export const getLesson = (id: string): DemoLesson | undefined => {
    return SIMULATION_LESSONS[id];
};

export const getNextLessonId = (currentId: string): string | null => {
    const keys = Object.keys(SIMULATION_LESSONS);
    const index = keys.indexOf(currentId);
    if (index !== -1 && index < keys.length - 1) {
        return keys[index + 1];
    }
    return null;
};

// -- Metadata for Listing Page --

export interface SimulationContent {
    id: string;
    title: string;
    description: string;
    icon: string;
    sdg: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    scenario: string;
    duration: string;
    xp: number;
    careerPath?: string;
}

export const SIMULATIONS: SimulationContent[] = [
    {
        id: 'ai-1',
        title: 'Trafik Lambası Kontrolü',
        description: "Trafik akışını yönetmek için lambayı kontrol et.",
        icon: 'traffic',
        sdg: 11,
        difficulty: 'easy',
        scenario: 'Akıllı Şehir',
        duration: '10 dk',
        xp: 150
    },
    {
        id: 'ai-2',
        title: 'Hız Limiti Ayarlama',
        description: "Otoyol hız limitini güvenli seviyeye getir.",
        icon: 'speed',
        sdg: 11,
        difficulty: 'easy',
        scenario: 'Akıllı Ulaşım',
        duration: '15 dk',
        xp: 200
    },
    {
        id: 'ai-3',
        title: 'Acil Durum Protokolü',
        description: "Yangın anında tahliye sistemini devreye al.",
        icon: 'emergency',
        sdg: 3,
        difficulty: 'medium',
        scenario: 'Güvenlik',
        duration: '15 dk',
        xp: 250
    },
    {
        id: 'ai-4',
        title: 'Akıllı Otopark',
        description: "Otopark kapasitesini sensörlerle yönet.",
        icon: 'local_parking',
        sdg: 11,
        difficulty: 'medium',
        scenario: 'Şehir Planlama',
        duration: '20 dk',
        xp: 300
    },
    {
        id: 'ai-5',
        title: 'Enerji Optimizasyonu',
        description: "Veri merkezinin enerji tüketimini dengele.",
        icon: 'bolt',
        sdg: 7,
        difficulty: 'hard',
        scenario: 'Sürdürülebilirlik',
        duration: '25 dk',
        xp: 400
    },
    {
        id: 'ai-6',
        title: 'Otomatik Fren',
        description: "Çarpışma önleyici algoritmayı kodla.",
        icon: 'car_crash',
        sdg: 9,
        difficulty: 'expert',
        scenario: 'Otonom Araçlar',
        duration: '30 dk',
        xp: 500
    },
    // --- Kariyer Yollarına Özel Simülasyonlar ---
    {
        id: 'veri-1',
        title: 'SQL Veri Filtreleme',
        description: "Eskişehir nüfus verisinden yaş filtresi uygula.",
        icon: 'query_stats',
        sdg: 9,
        difficulty: 'easy',
        scenario: 'Veri Analizi',
        duration: '15 dk',
        xp: 200,
        careerPath: 'veri-analizi'
    },
    {
        id: 'ml-1',
        title: 'Model Eğitim Parametresi',
        description: "ML modelinin öğrenme hızını optimize et.",
        icon: 'psychology',
        sdg: 9,
        difficulty: 'medium',
        scenario: 'Yapay Zekâ',
        duration: '20 dk',
        xp: 300,
        careerPath: 'yapay-zeka-ml'
    },
    {
        id: 'paz-1',
        title: 'A/B Test Kampanya Analizi',
        description: "İki kampanyanın dönüşüm oranını karşılaştır.",
        icon: 'campaign',
        sdg: 8,
        difficulty: 'medium',
        scenario: 'Dijital Pazarlama',
        duration: '15 dk',
        xp: 250,
        careerPath: 'dijital-pazarlama'
    },
    {
        id: 'tas-1',
        title: 'CSS Layout Challenge',
        description: "Responsive kart tasarımını kodla.",
        icon: 'palette',
        sdg: 10,
        difficulty: 'easy',
        scenario: 'Dijital Tasarım',
        duration: '15 dk',
        xp: 200,
        careerPath: 'dijital-tasarim'
    },
    {
        id: 'eti-1',
        title: 'Envanter Yönetim Sistemi',
        description: "Mağaza stok hesaplamasını kodla.",
        icon: 'storefront',
        sdg: 8,
        difficulty: 'easy',
        scenario: 'E-Ticaret',
        duration: '15 dk',
        xp: 200,
        careerPath: 'e-ticaret'
    },
    {
        id: 'dev-1',
        title: 'İlk Fonksiyonun',
        description: "Kullanıcıyı selamlayan bir fonksiyon yaz.",
        icon: 'code',
        sdg: 4,
        difficulty: 'easy',
        scenario: 'Yazılım Geliştirme',
        duration: '10 dk',
        xp: 150,
        careerPath: 'yazilim-gelistirme'
    }
];
