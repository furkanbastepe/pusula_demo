/**
 * 6 Çekirdek Modül — Tüm kariyer yollarından bağımsız, herkesin geçeceği temeller.
 * Nirvana v2 planından entegre edildi.
 */

export interface CoreModuleStep {
    type: "read" | "quiz" | "checklist" | "practice" | "reflection";
    title: string;
    icon: string;
    content?: string | string[] | { questions: CoreQuizQuestion[] };
    prompt?: string;
}

export interface CoreQuizQuestion {
    q: string;
    options: string[];
    correct: number;
    explanation: string;
}

export interface CoreModule {
    id: string;
    order: number;
    title: string;
    description: string;
    icon: string;
    color: string;
    duration: string;
    xp: number;
    output: string;            // Ne üretecek
    sdg: number;
    prerequisites: string[];   // Önceki modül ID'leri
    steps: CoreModuleStep[];
}

export const CORE_MODULES: CoreModule[] = [
    {
        id: "mod-dijital-okuryazarlik",
        order: 1,
        title: "Dijital Okuryazarlık & Güvenli Başlangıç",
        description: "İnternette güvenli gezinme, güçlü şifre oluşturma, kimlik avı saldırılarını tanıma ve kişisel veri koruma.",
        icon: "security",
        color: "text-emerald-400",
        duration: "2 hafta",
        xp: 200,
        output: "Kişisel güvenlik kontrol listesi",
        sdg: 16,
        prerequisites: [],
        steps: [
            {
                type: "read",
                title: "Dijital Dünyada Güvenlik",
                icon: "shield",
                content: "Her gün internette saatler geçiriyoruz ama dijital güvenliğimizi ne kadar ciddiye alıyoruz? Bu modülde kişisel verilerini korumayı, güçlü şifreler oluşturmayı ve kimlik avı saldırılarını tanımayı öğreneceksin."
            },
            {
                type: "quiz",
                title: "Güvenlik Bilgi Testi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Hangisi güçlü bir şifredir?",
                            options: ["123456", "password", "K7!m#9vP2xL", "dogumtarihim1990"],
                            correct: 2,
                            explanation: "Güçlü şifreler en az 12 karakter, büyük/küçük harf, rakam ve sembol içerir."
                        },
                        {
                            q: "Kimlik avı (phishing) e-postasının tipik özelliği nedir?",
                            options: ["Resmi logo kullanması", "Acil eylem isteyip kişisel bilgi sorması", "Türkçe yazılmış olması", "Ekinde PDF olması"],
                            correct: 1,
                            explanation: "Phishing e-postaları genellikle aciliyet yaratarak kişisel bilgilerinizi çalmaya çalışır."
                        },
                        {
                            q: "İki faktörlü kimlik doğrulama (2FA) nedir?",
                            options: ["İki farklı şifre kullanmak", "Şifre + telefon/uygulama kodu ile giriş", "İki farklı tarayıcı kullanmak", "Şifresiz giriş"],
                            correct: 1,
                            explanation: "2FA, şifrenize ek olarak ikinci bir doğrulama katmanı (SMS, uygulama kodu) ekler."
                        }
                    ]
                }
            },
            {
                type: "checklist",
                title: "Güvenlik Kontrol Listesi",
                icon: "checklist",
                content: [
                    "Tüm hesaplarımda benzersiz şifreler kullanıyorum",
                    "En az bir hesapta 2FA aktif",
                    "Tarayıcı gizlilik ayarlarımı kontrol ettim",
                    "Sosyal medya gizlilik ayarlarımı gözden geçirdim",
                    "Şüpheli bağlantıları tıklamadan önce URL'yi kontrol ediyorum"
                ]
            }
        ]
    },
    {
        id: "mod-uretkenlik-araclari",
        order: 2,
        title: "Üretkenlik Araçları & İşbirliği",
        description: "Google Workspace, Notion, Trello gibi araçlarla üretkenliğini artır. Uzaktan işbirliği ve toplantı yönetimi.",
        icon: "dashboard_customize",
        color: "text-blue-400",
        duration: "2 hafta",
        xp: 200,
        output: "Haftalık çalışma panosu",
        sdg: 4,
        prerequisites: ["mod-dijital-okuryazarlik"],
        steps: [
            {
                type: "read",
                title: "Dijital Çalışma Alanın",
                icon: "laptop",
                content: "Modern iş dünyasında üretkenlik araçları hayati önem taşır. Bu modülde proje yönetimi, doküman paylaşımı ve etkili toplantı yönetimini öğreneceksin."
            },
            {
                type: "quiz",
                title: "Araç Bilgisi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Kanban panosu ne işe yarar?",
                            options: ["Takvim yönetimi", "Görevleri görsel olarak takip etme", "Video konferans", "Dosya paylaşımı"],
                            correct: 1,
                            explanation: "Kanban panosu (Trello, Notion) görevleri 'Yapılacak', 'Devam Eden', 'Tamamlanan' gibi sütunlarda görselleştirir."
                        },
                        {
                            q: "Etkili bir toplantı için en önemli unsur nedir?",
                            options: ["Uzun sürmesi", "Herkesin katılması", "Net bir gündemi olması", "Kayıt altına alınması"],
                            correct: 2,
                            explanation: "Net gündem, toplantının amacını ve beklenen çıktıları belirler."
                        }
                    ]
                }
            },
            {
                type: "practice",
                title: "Önceliklendirme Oyunu",
                icon: "sort",
                content: "Eisenhower Matrisini kullanarak 10 görevi Acil/Önemli kategorilerine yerleştir."
            }
        ]
    },
    {
        id: "mod-veriyle-dusunme",
        order: 3,
        title: "Veriyle Düşünme",
        description: "Veri okuma, grafik yorumlama ve veri odaklı karar verme. Temel istatistik kavramları ve görselleştirme.",
        icon: "insights",
        color: "text-purple-400",
        duration: "3 hafta",
        xp: 300,
        output: "Mini gösterge paneli",
        sdg: 9,
        prerequisites: ["mod-uretkenlik-araclari"],
        steps: [
            {
                type: "read",
                title: "Veri Okuryazarlığı",
                icon: "analytics",
                content: "Dijital çağda veri her yerde. Bu modülde verileri okumayı, yorumlamayı ve doğru kararlar almak için kullanmayı öğreneceksin. Ortalama, medyan, korelasyon gibi temel kavramları pratiğe dökeceksin."
            },
            {
                type: "quiz",
                title: "Grafik Yorumlama",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Bir çubuk grafikte en uzun çubuk neyi gösterir?",
                            options: ["En eski veri", "En yeni veri", "En yüksek değer", "Ortalama değer"],
                            correct: 2,
                            explanation: "Çubuk grafiklerde çubuğun uzunluğu/yüksekliği o kategorinin sayısal değerini temsil eder."
                        },
                        {
                            q: "Hangisi korelasyonu en iyi gösterir?",
                            options: ["Pasta grafiği", "Çubuk grafik", "Saçılım grafiği (scatter plot)", "Çizgi grafik"],
                            correct: 2,
                            explanation: "Scatter plot, iki değişken arasındaki ilişkiyi (korelasyonu) görselleştirmek için idealdir."
                        }
                    ]
                }
            },
            {
                type: "reflection",
                title: "Veri Hikayesi",
                icon: "edit_note",
                prompt: "Günlük hayatında hangi veriler senin kararlarını etkiliyor? En az 3 örnek ver ve neden önemli olduklarını açıkla."
            }
        ]
    },
    {
        id: "mod-web-temelleri",
        order: 4,
        title: "Web Temelleri (HTML/CSS)",
        description: "İnternetin yapı taşlarını öğren. Kendi kişisel tanıtım sayfanı sıfırdan oluştur.",
        icon: "language",
        color: "text-red-400",
        duration: "3 hafta",
        xp: 350,
        output: "Kişisel tanıtım sayfası",
        sdg: 4,
        prerequisites: ["mod-veriyle-dusunme"],
        steps: [
            {
                type: "read",
                title: "HTML: Web'in İskeleti",
                icon: "code",
                content: "Her web sayfası HTML ile başlar. Başlıklar (<h1>), paragraflar (<p>), linkler (<a>) ve görseller (<img>) — bunlar web'in temel yapı taşlarıdır. Bu modülde kendi sayfanı oluşturacaksın."
            },
            {
                type: "quiz",
                title: "HTML/CSS Bilgi Testi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "CSS'de 'margin' ve 'padding' arasındaki fark nedir?",
                            options: ["Aynı şeydir", "Margin iç, padding dış boşluktur", "Margin dış, padding iç boşluktur", "İkisi de renk ayarlar"],
                            correct: 2,
                            explanation: "Margin öğenin DIŞ kenarındaki boşluk, padding İÇ kenarındaki boşluktur."
                        },
                        {
                            q: "Responsive tasarım nedir?",
                            options: ["Hızlı yüklenen site", "Farklı ekran boyutlarına uyum sağlayan tasarım", "Animasyonlu site", "Tek sayfalık site"],
                            correct: 1,
                            explanation: "Responsive tasarım, sitenin mobil, tablet ve masaüstü ekranlarında düzgün görünmesini sağlar."
                        }
                    ]
                }
            },
            {
                type: "practice",
                title: "CSS Hata Avı",
                icon: "bug_report",
                content: "Verilen CSS kodundaki 5 hatayı bul ve düzelt. Sayfanın doğru görünmesi için tüm hataları gidermelisin."
            }
        ]
    },
    {
        id: "mod-javascript-etkileşim",
        order: 5,
        title: "JavaScript ile Etkileşim",
        description: "Web sayfalarına hayat ver. Değişkenler, fonksiyonlar, olaylar ve DOM manipülasyonu.",
        icon: "javascript",
        color: "text-yellow-400",
        duration: "4 hafta",
        xp: 400,
        output: "Mini etkileşimli uygulama",
        sdg: 4,
        prerequisites: ["mod-web-temelleri"],
        steps: [
            {
                type: "read",
                title: "JavaScript'e Giriş",
                icon: "terminal",
                content: "JavaScript web'in programlama dilidir. Değişkenler, döngüler, koşullar ve fonksiyonlarla web sayfalarına etkileşim katarsın. Bu modülde temellerden başlayarak kendi mini uygulamanı yapacaksın."
            },
            {
                type: "quiz",
                title: "JS Temelleri",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "let x = '5' + 3; sonucu nedir?",
                            options: ["8", "\"53\"", "Hata verir", "undefined"],
                            correct: 1,
                            explanation: "JavaScript'te string + number işlemi concatenation yapar: '5' + 3 = '53'"
                        },
                        {
                            q: "DOM nedir?",
                            options: ["Bir programlama dili", "Sayfanın nesne modeli", "Bir veritabanı", "Bir CSS özelliği"],
                            correct: 1,
                            explanation: "DOM (Document Object Model), HTML elemanlarını JavaScript ile kontrol etmeni sağlayan arayüzdür."
                        }
                    ]
                }
            },
            {
                type: "practice",
                title: "Debug Sprint",
                icon: "bug_report",
                content: "Hatalı bir form doğrulama kodunu düzelt. Email formatı, şifre uzunluğu ve eşleşme kontrollerini çalışır hale getir."
            }
        ]
    },
    {
        id: "mod-ai-problem-cozme",
        order: 6,
        title: "Yapay Zeka ile Problem Çözme",
        description: "AI araçlarını etik ve etkili kullan. Prompt mühendisliği, toplumsal soruna AI destekli prototip geliştirme.",
        icon: "smart_toy",
        color: "text-indigo-400",
        duration: "3 hafta",
        xp: 400,
        output: "Toplumsal soruna AI destekli prototip",
        sdg: 11,
        prerequisites: ["mod-javascript-etkileşim"],
        steps: [
            {
                type: "read",
                title: "AI Araçlarını Tanı",
                icon: "auto_awesome",
                content: "ChatGPT, Gemini, Claude — bu araçlar nasıl çalışır? Güçlü yönleri ve sınırlarını anlayarak bunları sorun çözmek için nasıl kullanabileceğini öğren. Prompt mühendisliğinin temellerini keşfet."
            },
            {
                type: "quiz",
                title: "AI Etik ve Kullanım",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "AI'dan alınan çıktıyı doğrudan proje olarak sunmak neden sorunludur?",
                            options: ["Çünkü AI hata yapmaz", "Çünkü AI yanlış olabilir ve orijinallik sorunu var", "Çünkü AI başka dillerde çalışmaz", "Sorunlu değildir"],
                            correct: 1,
                            explanation: "AI hallucination yapabilir (yanlış bilgi üretir) ve doğrudan sunmak akademik dürüstlük sorunudur."
                        },
                        {
                            q: "İyi bir prompt'un en önemli özelliği nedir?",
                            options: ["Çok uzun olması", "Emoji içermesi", "Net bağlam ve istenen çıktı formatını belirtmesi", "Türkçe olması"],
                            correct: 2,
                            explanation: "İyi promptlar: Rol belirleme + Bağlam + Net talimat + Çıktı formatı içerir."
                        }
                    ]
                }
            },
            {
                type: "reflection",
                title: "Toplumsal Sorun Analizi",
                icon: "groups",
                prompt: "Eskişehir'deki bir toplumsal sorunu seç (ulaşım, çevre, eğitim vb.) ve AI'nin bu sorunu çözmede nasıl yardımcı olabileceğini 200 kelimeyle açıkla."
            }
        ]
    }
];

/** Utility: Get module by ID */
export const getCoreModule = (id: string): CoreModule | undefined =>
    CORE_MODULES.find(m => m.id === id);

/** Utility: Get next module in sequence */
export const getNextCoreModule = (currentId: string): CoreModule | undefined => {
    const current = CORE_MODULES.find(m => m.id === currentId);
    if (!current) return undefined;
    return CORE_MODULES.find(m => m.order === current.order + 1);
};

/** Utility: Check if a module is unlocked based on completed modules */
export const isModuleUnlocked = (moduleId: string, completedModuleIds: string[]): boolean => {
    const mod = CORE_MODULES.find(m => m.id === moduleId);
    if (!mod) return false;
    return mod.prerequisites.every(prereq => completedModuleIds.includes(prereq));
};
