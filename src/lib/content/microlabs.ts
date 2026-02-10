
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
    category: "Discovery" | "Build" | "Impact" | "Core";
    phase: "discovery" | "build" | "impact";
    thumbnail: string;
    videoUrl?: string; // Mock URL
    tags: string[];
    steps: MicroLabStep[];
    sdgAlignment?: number[];
    careerPath?: string; // Optional link to a specific career path
}

export const MICROLABS: MicroLabContent[] = [
    // ========================================
    // ORTAK / GENEL
    // ========================================
    {
        id: "dijital-okuryazarlik",
        title: "Dijital Ayak İzi",
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
                        },
                        {
                            q: "VPN ne işe yarar?",
                            options: ["İnterneti hızlandırır", "Bağlantını şifreler ve IP'ni gizler", "Virüs temizler", "Dosya paylaşır"],
                            correct: 1,
                            explanation: "VPN internet trafiğinizi şifreler ve gerçek IP adresinizi gizler."
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
                    "Tarayıcı gizlilik ayarlarımı kontrol ettim"
                ]
            }
        ]
    },

    // ========================================
    // VERİ ANALİZİ YOLU
    // ========================================
    {
        id: "sql-temelleri",
        title: "SQL Temelleri",
        description: "Veritabanlarını sorgula. SELECT, WHERE, JOIN komutlarıyla veri çek.",
        duration: "60 dk",
        xp: 200,
        category: "Discovery",
        phase: "discovery",
        thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&fit=crop",
        tags: ["SQL", "Veritabanı"],
        sdgAlignment: [9],
        careerPath: "veri-analizi",
        steps: [
            {
                type: "read",
                title: "SQL Nedir?",
                icon: "storage",
                content: "SQL (Structured Query Language), veritabanlarıyla konuşmanın dili. Milyonlarca satır veri arasından istediğin bilgiyi saniyeler içinde çekebilirsin. SELECT, FROM, WHERE — bu üç kelime her şeyin başlangıcı."
            },
            {
                type: "quiz",
                title: "SQL Bilgi Testi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "SELECT * FROM ogrenciler WHERE yas > 20; sorgusu ne yapar?",
                            options: ["Tüm öğrencileri siler", "Yaşı 20'den büyük öğrencileri listeler", "20 öğrenci ekler", "Tabloyu günceller"],
                            correct: 1,
                            explanation: "SELECT * tüm sütunları, WHERE yas > 20 ise sadece yaşı 20'den büyük satırları filtreler."
                        },
                        {
                            q: "JOIN komutu ne işe yarar?",
                            options: ["Tablo siler", "İki tabloyu birleştirir", "Veri ekler", "Sütun adını değiştirir"],
                            correct: 1,
                            explanation: "JOIN, ortak bir alan üzerinden iki tabloyu birleştirerek ilişkili verileri tek sonuç setinde gösterir."
                        }
                    ]
                }
            },
            {
                type: "reflection",
                title: "Kendi Sorgunuz",
                icon: "edit_note",
                prompt: "Bir üniversite veritabanından hangi bilgileri çekmek istersin? En az 3 SQL sorgusu yaz ve ne döndüreceklerini açıkla."
            }
        ]
    },
    {
        id: "python-veri-analizi",
        title: "Python ile Veri Analizi",
        description: "Pandas kütüphanesini kullanarak veri setlerini incele ve görselleştir.",
        duration: "60 dk",
        xp: 200,
        category: "Build",
        phase: "build",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop",
        tags: ["Python", "Pandas", "Analiz"],
        sdgAlignment: [9],
        careerPath: "veri-analizi",
        steps: [
            {
                type: "read",
                title: "Pandas Kütüphanesi",
                icon: "code",
                content: "Pandas, Python'da veri manipülasyonu için kullanılan en popüler kütüphanedir. DataFrame yapısıyla Excel benzeri işlemler yapabilirsin. read_csv(), describe(), groupby() — bu fonksiyonlar günlük iş akışının parçası olacak."
            },
            {
                type: "quiz",
                title: "Pandas Bilgi Testi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "df.describe() fonksiyonu ne döndürür?",
                            options: ["Tablo yapısı", "İstatistiksel özet (ortalama, std, min, max)", "İlk 5 satır", "Sütun isimleri"],
                            correct: 1,
                            explanation: "describe() sayısal sütunlar için count, mean, std, min, 25%, 50%, 75%, max değerlerini verir."
                        }
                    ]
                }
            },
            {
                type: "checklist",
                title: "Veri Analizi Adımları",
                icon: "checklist",
                content: [
                    "Veri setini yükledim (read_csv)",
                    "Eksik verileri kontrol ettim (isnull().sum())",
                    "Temel istatistiklere baktım (describe())",
                    "En az bir görselleştirme oluşturdum"
                ]
            }
        ]
    },
    {
        id: "veri-gorsellestirme",
        title: "Veri Görselleştirme",
        description: "Matplotlib ve Plotly ile veriden hikaye anlat. Doğru grafik seçimi ve tasarım ilkeleri.",
        duration: "45 dk",
        xp: 150,
        category: "Build",
        phase: "build",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop",
        tags: ["Görselleştirme", "Python"],
        sdgAlignment: [9],
        careerPath: "veri-analizi",
        steps: [
            {
                type: "read",
                title: "Doğru Grafik Seçimi",
                icon: "bar_chart",
                content: "Her veri için doğru grafik türü vardır: karşılaştırma için çubuk, trend için çizgi, oran için pasta, ilişki için saçılım. Yanlış grafik seçimi veriyi yanlış anlatır."
            },
            {
                type: "quiz",
                title: "Grafik Türleri",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Zaman içindeki değişimi göstermek için en uygun grafik hangisidir?",
                            options: ["Pasta grafiği", "Çizgi grafiği", "Dağılım grafiği", "Ağaç haritası"],
                            correct: 1,
                            explanation: "Çizgi grafikleri, zaman seri verilerini ve trendleri görselleştirmek için idealdir."
                        }
                    ]
                }
            }
        ]
    },

    // ========================================
    // YAPAY ZEKÂ & ML YOLU
    // ========================================
    {
        id: "makine-ogrenmesi-101",
        title: "Makine Öğrenmesi 101",
        description: "Geleceği tahmin et. Gözetimli ve gözetimsiz öğrenme, basit regresyon modeli kur.",
        duration: "120 dk",
        xp: 500,
        category: "Impact",
        phase: "impact",
        thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&fit=crop",
        tags: ["AI", "ML", "TensorFlow"],
        sdgAlignment: [9],
        careerPath: "yapay-zeka-ml",
        steps: [
            {
                type: "read",
                title: "Makine Öğrenmesi Nedir?",
                icon: "psychology",
                content: "Makine öğrenmesi, bilgisayarların veriden öğrenmesini sağlar. Spam filtreleri, öneri sistemleri, ses tanıma — hepsi ML. Gözetimli öğrenme (etiketli veri), gözetimsiz öğrenme (düzensiz veri) ve takviyeli öğrenme (ödül/ceza) üç ana paradigmadır."
            },
            {
                type: "quiz",
                title: "ML Kavramları",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Overfitting nedir?",
                            options: ["Model çok yavaş", "Model eğitim verisini ezberler, yeni veriye genelleyemez", "Model çok basit", "Veri yetersiz"],
                            correct: 1,
                            explanation: "Overfitting, modelin eğitim verisine aşırı uyum sağlayıp yeni verilerde kötü performans göstermesidir."
                        }
                    ]
                }
            },
            {
                type: "reflection",
                title: "AI Etki Analizi",
                icon: "eco",
                prompt: "Yapay zeka Eskişehir'deki hangi toplumsal sorunu çözebilir? (ulaşım, enerji, eğitim vb.) Bir ML modeli öner ve nasıl çalışacağını açıkla."
            }
        ]
    },
    {
        id: "yapay-zeka-etik",
        title: "AI Etiği ve Sorumlu Kullanım",
        description: "AI önyargısı, şeffaflık, gizlilik ve sorumlu AI geliştirme ilkeleri.",
        duration: "45 dk",
        xp: 150,
        category: "Discovery",
        phase: "discovery",
        thumbnail: "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=800&fit=crop",
        tags: ["Etik", "AI"],
        sdgAlignment: [10, 16],
        careerPath: "yapay-zeka-ml",
        steps: [
            {
                type: "read",
                title: "AI Önyargısı",
                icon: "balance",
                content: "AI modelleri eğitim verisindeki önyargıları öğrenir. Yüz tanıma sistemlerinin bazı etnik gruplarda daha düşük doğruluk oranı göstermesi bunun bir örneğidir. Sorumlu AI geliştirme, bu önyargıları tespit etmek ve azaltmakla başlar."
            },
            {
                type: "quiz",
                title: "AI Etik Testi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "AI karar sistemlerinde 'açıklanabilirlik' neden önemlidir?",
                            options: ["Kodu daha hızlı yapmak için", "Kararların nedenini anlayıp hesap verebilirlik sağlamak için", "Modeli küçültmek için", "Patent almak için"],
                            correct: 1,
                            explanation: "Açıklanabilirlik, AI'nin neden belli bir karar verdiğini anlamamızı sağlar — özellikle sağlık, hukuk gibi alanlarda kritiktir."
                        }
                    ]
                }
            }
        ]
    },

    // ========================================
    // DİJİTAL PAZARLAMA YOLU
    // ========================================
    {
        id: "dijital-pazarlama-temelleri",
        title: "Dijital Pazarlama Temelleri",
        description: "Dijital kanallar, hedef kitle analizi ve pazarlama hunisi kavramları.",
        duration: "45 dk",
        xp: 150,
        category: "Discovery",
        phase: "discovery",
        thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&fit=crop",
        tags: ["Pazarlama", "Strateji"],
        sdgAlignment: [8],
        careerPath: "dijital-pazarlama",
        steps: [
            {
                type: "read",
                title: "Pazarlama Hunisi",
                icon: "filter_alt",
                content: "Dijital pazarlama hunisi 4 aşamadan oluşur: Farkındalık → İlgi → Karar → Aksiyon (AIDA modeli). Her aşamada farklı kanallar ve mesajlar kullanılır. SEO farkındalık için, e-posta pazarlama karar aşaması için idealdir."
            },
            {
                type: "quiz",
                title: "Dijital Pazarlama Testi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "CTR (Click-Through Rate) nedir?",
                            options: ["Satış oranı", "Tıklama oranı = tıklamalar/gösterimler", "Müşteri memnuniyeti", "Dönüşüm oranı"],
                            correct: 1,
                            explanation: "CTR, reklamı veya linki görenlerin yüzde kaçının tıkladığını gösterir."
                        },
                        {
                            q: "A/B testi ne işe yarar?",
                            options: ["İki farklı siteyi karşılaştırır", "İki farklı versiyonu test ederek hangisinin daha iyi performans gösterdiğini belirler", "Alfabetik sıralama yapar", "Otomatik reklam oluşturur"],
                            correct: 1,
                            explanation: "A/B testi, iki farklı versiyon arasında performans karşılaştırması yaparak veri odaklı karar vermenizi sağlar."
                        }
                    ]
                }
            }
        ]
    },
    {
        id: "seo-optimizasyonu",
        title: "SEO Optimizasyonu",
        description: "Google'da üst sıralara çık. Anahtar kelime araştırması, on-page ve off-page SEO.",
        duration: "45 dk",
        xp: 200,
        category: "Build",
        phase: "build",
        thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&fit=crop",
        tags: ["SEO", "Google"],
        sdgAlignment: [8],
        careerPath: "dijital-pazarlama",
        steps: [
            {
                type: "read",
                title: "SEO Temelleri",
                icon: "search",
                content: "SEO (Arama Motoru Optimizasyonu), web sitenizin Google'da üst sıralarda çıkmasını sağlar. Title tag, meta description, heading yapısı, sayfa hızı ve mobile uyumluluk — bunlar temel ranking faktörleridir."
            },
            {
                type: "quiz",
                title: "SEO Bilgi Testi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Long-tail keyword nedir?",
                            options: ["Çok uzun bir kelime", "3-5 kelimelik spesifik arama terimi", "Anahtar kelimenin kuyruğu", "Yanlış yazılmış kelime"],
                            correct: 1,
                            explanation: "Long-tail keywordler daha spesifik ve daha az rekabetçidir: 'ayakkabı' yerine 'erkek koşu ayakkabısı 42 numara'"
                        }
                    ]
                }
            }
        ]
    },

    // ========================================
    // YAZILIM GELİŞTİRME YOLU
    // ========================================
    {
        id: "javascript-temelleri",
        title: "JavaScript Temelleri",
        description: "Değişkenler, veri tipleri, döngüler ve fonksiyonlar. Modern ES6+ sözdizimi.",
        duration: "60 dk",
        xp: 200,
        category: "Discovery",
        phase: "discovery",
        thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&fit=crop",
        tags: ["JavaScript", "Web"],
        sdgAlignment: [4],
        careerPath: "yazilim-gelistirme",
        steps: [
            {
                type: "read",
                title: "JavaScript Dünyası",
                icon: "terminal",
                content: "JavaScript, web'in programlama dilidir. let/const ile değişken tanımlama, arrow function, template literal, destructuring — modern JS'in güçlü araçları. Her tarayıcıda çalışır, Node.js ile sunucuda da kullanılır."
            },
            {
                type: "quiz",
                title: "JS Quiz",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "const ile let arasındaki fark nedir?",
                            options: ["Fark yoktur", "const tekrar atanamaz, let atanabilir", "let daha hızlıdır", "const sadece sayılar içindir"],
                            correct: 1,
                            explanation: "const ile tanımlanan değişkenin değeri tekrar atanamaz (immutable binding), let ise tekrar atanabilir."
                        },
                        {
                            q: "async/await ne işe yarar?",
                            options: ["Kodu yavaşlatır", "Asenkron işlemleri senkron gibi yazmamızı sağlar", "Döngü oluşturur", "Hata yakalar"],
                            correct: 1,
                            explanation: "async/await, Promise tabanlı asenkron kodu daha okunabilir şekilde yazmamızı sağlar."
                        }
                    ]
                }
            }
        ]
    },
    {
        id: "react-giris",
        title: "React'e Giriş",
        description: "Component tabanlı UI geliştirme. Props, state, hooks ve JSX.",
        duration: "90 dk",
        xp: 300,
        category: "Build",
        phase: "build",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&fit=crop",
        tags: ["React", "Frontend"],
        sdgAlignment: [4],
        careerPath: "yazilim-gelistirme",
        steps: [
            {
                type: "read",
                title: "Component Düşüncesi",
                icon: "widgets",
                content: "React'te her şey component'tir. Bir butonu, bir kartı, hatta tüm sayfayı component olarak düşün. Props ile veri alır, state ile iç durumu yönetir, hooks ile lifecycle olaylarını yakalar."
            },
            {
                type: "quiz",
                title: "React Bilgi Testi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "useState hook'u ne döndürür?",
                            options: ["Sadece değer", "Değer ve setter fonksiyonu içeren dizi", "Bir nesne", "Boolean"],
                            correct: 1,
                            explanation: "useState [value, setValue] şeklinde iki elemanlı bir dizi döndürür."
                        }
                    ]
                }
            }
        ]
    },

    // ========================================
    // DİJİTAL TASARIM YOLU
    // ========================================
    {
        id: "ui-ux-temelleri",
        title: "UI/UX Tasarım Temelleri",
        description: "Kullanıcı dostu arayüzler tasarlamanın altın kuralları. Gestalt ilkeleri, renk teorisi, tipografi.",
        duration: "45 dk",
        xp: 150,
        category: "Discovery",
        phase: "discovery",
        thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&fit=crop",
        tags: ["Tasarım", "UI/UX"],
        sdgAlignment: [10],
        careerPath: "dijital-tasarim",
        steps: [
            {
                type: "read",
                title: "Renk Teorisi ve Tipografi",
                icon: "palette",
                content: "Renkler duyguları tetikler. Mavi güven, kırmızı heyecan, yeşil doğa verir. Tipografi ise hiyerarşi oluşturur — başlıklar büyük ve kalın, gövde metni okunabilir. Whitespace öğeler arasında nefes alanı sağlar."
            },
            {
                type: "quiz",
                title: "Tasarım Bilgisi",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Whitespace (Beyaz Boşluk) ne işe yarar?",
                            options: ["Boşa yer kaplar", "Okunabilirliği artırır ve hiyerarşi oluşturur", "Maliyeti düşürür", "Hiçbiri"],
                            correct: 1,
                            explanation: "Whitespace, öğeler arasında nefes alma alanı sağlar ve görsel hiyerarşiyi güçlendirir."
                        },
                        {
                            q: "Accessibility (erişilebilirlik) neden önemlidir?",
                            options: ["Sadece engelli kullanıcılar için", "Herkesin ürünü rahatlıkla kullanabilmesi için", "Yasal zorunluluk", "Sadece mobilde"],
                            correct: 1,
                            explanation: "Erişilebilirlik, ürünün yaş, engel durumu veya cihaz fark etmeksizin herkes tarafından kullanılabilmesini sağlar."
                        }
                    ]
                }
            }
        ]
    },
    {
        id: "figma-giris",
        title: "Figma ile Prototipleme",
        description: "Figma'da frame, component, auto layout ve prototip bağlantıları.",
        duration: "60 dk",
        xp: 200,
        category: "Build",
        phase: "build",
        thumbnail: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&fit=crop",
        tags: ["Figma", "Prototip"],
        sdgAlignment: [10],
        careerPath: "dijital-tasarim",
        steps: [
            {
                type: "read",
                title: "Figma Temelleri",
                icon: "design_services",
                content: "Figma, web tabanlı tasarım aracıdır. Frame'ler sayfa yapısını, Component'lar tekrar kullanılabilir elemanları, Auto Layout ise responsive düzeni sağlar. Prototip modunda ekranlar arası geçiş animasyonları ekleyebilirsin."
            },
            {
                type: "quiz",
                title: "Figma Quiz",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Figma'da Component nedir?",
                            options: ["Bir sayfa", "Tekrar kullanılabilir tasarım elemanı", "Bir renk", "Export formatı"],
                            correct: 1,
                            explanation: "Component, bir kez tanımlanıp projenin her yerinde kullanılabilen ve güncellenen tasarım elemanıdır (buton, kart, ikon vb.)"
                        }
                    ]
                }
            }
        ]
    },

    // ========================================
    // E-TİCARET YOLU
    // ========================================
    {
        id: "e-ticaret-temelleri",
        title: "E-Ticaret Temelleri",
        description: "Online satışın ABC'si. İş modelleri, platform seçimi, ödeme sistemleri.",
        duration: "45 dk",
        xp: 150,
        category: "Discovery",
        phase: "discovery",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&fit=crop",
        tags: ["E-Ticaret", "İş Modeli"],
        sdgAlignment: [8],
        careerPath: "e-ticaret",
        steps: [
            {
                type: "read",
                title: "E-Ticaret İş Modelleri",
                icon: "store",
                content: "B2C (işletme-tüketici), B2B (işletme-işletme), C2C (tüketici-tüketici) ve D2C (direkt tüketici) — hangi model senin için uygun? Dropshipping, stoklu satış, dijital ürün — her birinin avantajları ve riskleri var."
            },
            {
                type: "quiz",
                title: "E-Ticaret Quiz",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "Dropshipping modelinde en büyük avantaj nedir?",
                            options: ["En yüksek kar marjı", "Stok tutma zorunluluğu yok", "En hızlı teslimat", "En iyi müşteri deneyimi"],
                            correct: 1,
                            explanation: "Dropshipping'de ürünleri stoklamazsınız — tedarikçi doğrudan müşteriye gönderir. Düşük başlangıç maliyeti ama düşük kar marjı."
                        }
                    ]
                }
            }
        ]
    },
    {
        id: "urun-yonetimi",
        title: "Ürün Yönetimi ve Katalog",
        description: "Ürün listeleme, fotoğraf çekimi, fiyatlama stratejileri ve envanter yönetimi.",
        duration: "45 dk",
        xp: 150,
        category: "Build",
        phase: "build",
        thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&fit=crop",
        tags: ["Operasyon", "Katalog"],
        sdgAlignment: [8],
        careerPath: "e-ticaret",
        steps: [
            {
                type: "read",
                title: "Etkili Ürün Listeleme",
                icon: "inventory_2",
                content: "İyi bir ürün sayfası: net fotoğraflar (en az 4 açı), SEO uyumlu başlık, detaylı açıklama, doğru fiyatlama ve stok bilgisi içerir. Müşteri güvenini artırmak için iade politikası ve kargo bilgileri açıkça belirtilmelidir."
            },
            {
                type: "quiz",
                title: "Ürün Yönetimi Quiz",
                icon: "quiz",
                content: {
                    questions: [
                        {
                            q: "SKU (Stock Keeping Unit) nedir?",
                            options: ["Ödeme sistemi", "Her ürüne verilen benzersiz takip kodu", "Kargo şirketi", "Müşteri numarası"],
                            correct: 1,
                            explanation: "SKU, her ürün varyantına atanan benzersiz koddur — envanter yönetimi için kritiktir."
                        }
                    ]
                }
            }
        ]
    }
];
