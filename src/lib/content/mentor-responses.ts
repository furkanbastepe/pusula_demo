/**
 * Mentor Responses — Intent-based response engine for AI Mentor
 * Nirvana v2: 3-tier fallback with 20+ intents and keyword matching.
 *
 * Tier 1: Exact chip match (suggestion chips)
 * Tier 2: Keyword-based intent matching
 * Tier 3: Friendly fallback with redirect suggestions
 */

export interface MentorIntent {
    id: string;
    keywords: string[];
    response: string;
    followUp?: string[];
}

export const MENTOR_INTENTS: MentorIntent[] = [
    // --- Platform Mechanics ---
    {
        id: "sdg",
        keywords: ["sdg", "sürdürülebilir", "kalkınma", "amaç"],
        response:
            "SDG, Sürdürülebilir Kalkınma Amaçları (Sustainable Development Goals) anlamına gelir. Birleşmiş Milletler tarafından 2015'te belirlenen 17 küresel hedeftir. PUSULA'da SDG'lere bağlı projeler yaparak hem dünyaya katkı sağlıyorsun hem de öğreniyorsun! 🌍",
        followUp: ["Hangi SDG'ler var?", "Projem hangi SDG'ye bağlı?"],
    },
    {
        id: "xp",
        keywords: ["xp", "puan", "kazanmak", "seviye", "level"],
        response:
            "XP kazanmanın yolları:\n\n⭐ **Görev Tamamla**: Her görev XP verir\n📚 **MicroLab Bitir**: Eğitimleri tamamla\n🔥 **Streak Tut**: Ardışık günler aktif ol\n🏆 **Rozetler Kazan**: Özel başarılar\n\nToplam XP'n seviye atlaman için kritik!",
        followUp: ["Bugün ne yapabilirim?", "En çok XP veren görev hangisi?"],
    },
    {
        id: "gdr",
        keywords: ["gdr", "girişimcilik", "dinamik", "rapor"],
        response:
            "GDR = Girişimcilik Dinamik Raporu\n\n📊 Üç boyutta ölçülür:\n- **G (Girişkenlik)**: İnisiyatif alma\n- **D (Dayanıklılık)**: Zorlukları aşma\n- **R (Refleksiyon)**: Öğrenmeyi yansıtma\n\n100 üzerinden skorlanır, senin benzersiz profilini oluşturur!",
    },
    {
        id: "kanit",
        keywords: ["kanıt", "kanit", "delil", "evidence", "ispat"],
        response:
            "Kanıt oluşturmak için:\n\n1. **Ekran görüntüsü**: İşini gösteren bir görüntü al\n2. **Video**: Süreç kaydı yap\n3. **Dosya**: Oluşturduğun dökümanı yükle\n4. **Link**: Canlı projenin linkini paylaş\n\nÖnemli: Kanıt tarih ve bağlam içermeli! 📸",
    },

    // --- Kariyer Yolları ---
    {
        id: "veri-analizi",
        keywords: ["veri", "analiz", "data", "excel", "sql", "istatistik"],
        response:
            "📊 **Veri Analizi yolu** bu dönemin en iştah açan alanlarından! Eskişehir'deki işletmelerin verilerini analiz etmeyi öğreneceksin.\n\n🔧 **Araçlar**: Excel, Google Sheets, temel SQL, veri görselleştirme\n📈 **Çıktı**: Gerçek verilerle dashboard oluşturma\n⏱ **Süre**: 24 hafta\n\nİlk adımın: MicroLab'daki 'Veri Temizliği Atölyesi' olabilir!",
        followUp: ["Veri analizi simülasyonunu aç", "İlk görevim ne?"],
    },
    {
        id: "yapay-zeka",
        keywords: ["yapay", "zeka", "ai", "ml", "model", "machine", "learning", "öğrenme"],
        response:
            "🤖 **Yapay Zekâ & ML yolu** geleceğin en kritik yetkinliği! Temel kavramları öğrenip kendi modelini eğiteceksin.\n\n🔧 **Araçlar**: Python temelleri, Teachable Machine, basit NLP\n📈 **Çıktı**: Çalışan bir sınıflandırma modeli\n⏱ **Süre**: 24 hafta\n\nÖnce çekirdek modülleri tamamla, ardından ML simülasyonuna geç!",
    },
    {
        id: "dijital-pazarlama",
        keywords: ["pazarlama", "marketing", "reklam", "sosyal", "medya", "seo", "kampanya"],
        response:
            "📣 **Dijital Pazarlama yolu** ile markaları dijitalde büyütmeyi öğreneceksin!\n\n🔧 **Araçlar**: Google Analytics, Canva, Meta Business Suite\n📈 **Çıktı**: Gerçek bir Eskişehir işletmesi için kampanya planı\n⏱ **Süre**: 24 hafta\n\nA/B test simülasyonu ile hemen başlayabilirsin!",
    },
    {
        id: "yazilim",
        keywords: ["yazılım", "yazilim", "kod", "programming", "geliştirme", "developer", "frontend", "backend"],
        response:
            "💻 **Yazılım Geliştirme yolu** dijital ürünler inşa etmeyi öğretir!\n\n🔧 **Araçlar**: HTML/CSS, JavaScript, Git, VS Code\n📈 **Çıktı**: Çalışan bir web uygulaması\n⏱ **Süre**: 24 hafta\n\nSimülasyondaki 'İlk Fonksiyonun' dersiyle başla!",
    },
    {
        id: "tasarim",
        keywords: ["tasarım", "tasarim", "figma", "ui", "ux", "design", "grafik"],
        response:
            "🎨 **Dijital Tasarım yolu** ile görsel iletişim ustası olacaksın!\n\n🔧 **Araçlar**: Figma, Canva, temel CSS/HTML\n📈 **Çıktı**: Marka kimliği + prototip portföyü\n⏱ **Süre**: 24 hafta\n\nCSS Layout Challenge simülasyonuyla responsive tasarımı öğren!",
    },
    {
        id: "e-ticaret",
        keywords: ["e-ticaret", "eticaret", "mağaza", "satış", "shopify", "ürün"],
        response:
            "🛒 **E-Ticaret yolu** ile online satış dünyasına adım atarsın!\n\n🔧 **Araçlar**: Shopify/WooCommerce, ürün fotoğrafçılığı, lojistik temelleri\n📈 **Çıktı**: Çalışan bir online mağaza\n⏱ **Süre**: 24 hafta\n\nEnvanter Yönetimi simülasyonuyla starta bas!",
    },

    // --- Öğrenme Süreci ---
    {
        id: "gorev",
        keywords: ["görev", "gorev", "task", "teslim", "deadline", "ödev"],
        response:
            "📋 **Görevler** kariyer yoluna özel pratik çalışmalardır.\n\n• Her görevde zorluk seviyesi (Kolay/Orta/Zor) belirtilir\n• Teslim tipi: link, dosya veya metin olabilir\n• Tamamladığın görevler portföyüne eklenir\n\n💡 İpucu: Önce Kolay görevlerle başla ve XP topla!",
    },
    {
        id: "microlab",
        keywords: ["microlab", "lab", "eğitim", "ders", "kurs", "öğren"],
        response:
            "🧪 **MicroLab'lar** kısa ve odaklı öğrenme deneyimleridir (30-90 dk).\n\nHer biri adım adım ilerler:\n1. 📖 Oku — Teori kısmı\n2. 🎥 İzle — Video içerik\n3. 🛠️ Yap — Pratik uygulama\n4. ✅ Tamamla — Çıktını paylaş\n\nKeşif, İnşa ve Etki olmak üzere 3 fazda ilerler!",
    },
    {
        id: "simulasyon",
        keywords: ["simülasyon", "simulasyon", "simulation", "pratik", "interaktif"],
        response:
            "🎮 **Simülasyonlar** gerçek dünya senaryolarında kodlama pratiği yapmanı sağlar.\n\nYazılan kodu anında canlı önizleme ile görürsün! Değişkenleri doğru değere ayarla ve simülasyonu geç.\n\n🏆 Her biri XP kazandırır ve portföyüne eklenir.",
    },
    {
        id: "streak",
        keywords: ["streak", "seri", "ardışık", "günlük", "düzenli"],
        response:
            "🔥 **Streak** ardışık aktif olduğun günleri sayar.\n\n• Günde en az 1 etkinlik yapmak yeterli\n• 7 günlük streak = Bonus XP\n• 30 günlük streak = Özel rozet\n\nSüreklilik, yetenek kadar önemli! 💪",
    },
    {
        id: "rozet",
        keywords: ["rozet", "badge", "başarı", "ödül", "madalya"],
        response:
            "🏅 **Rozetler** özel başarıların tanınmasıdır.\n\nÖrnekler:\n• 🌱 İlk Adım — İlk görevi tamamla\n• 🔥 Ateş Serisi — 7 gün streak\n• 🎯 Hedef Odaklı — 5 görevi zamanında teslim et\n• 🏆 Etki Yaratıcı — İlk etki fazı projesini bitir\n\nKoleksiyonun profilinde görünür!",
    },

    // --- Platform Navigasyonu ---
    {
        id: "etkinlik",
        keywords: ["etkinlik", "event", "toplantı", "buluşma", "workshop"],
        response:
            "📅 **Etkinlikler** sayfasından yaklaşan workshop, atölye ve buluşmaları görebilirsin.\n\nEskişehir'deki fiziksel etkinlikler ve online oturumlar listelenir. Katılım için 'Katıl' butonuna bas!\n\n🎯 Etkinliklere katılmak hem XP kazandırır hem networking fırsatı sunar.",
    },
    {
        id: "mezuniyet",
        keywords: ["mezuniyet", "diploma", "sertifika", "bitirme", "tören"],
        response:
            "🎓 **Mezuniyet**, tüm fazları tamamlayınca ulaşılan son aşamadır.\n\n• Keşif + İnşa + Etki fazlarını tamamla\n• Final projesini teslim et\n• Kapstone sunumunu yap\n\nDijital sertifikan + portföyün hazır olacak! 🎉",
    },
    {
        id: "merhaba",
        keywords: ["merhaba", "selam", "hey", "naber", "nasılsın"],
        response:
            "Merhaba! 😊 Sana nasıl yardımcı olabilirim? İşte birkaç öneri:\n\n• Kariyer yolunu keşfet\n• Görevlerini incele\n• Simülasyona başla\n• XP ve rozetlerin hakkında bilgi al\n\nHerhangi bir konuda sormak istediğin şey var mı?",
    },
    {
        id: "yardim",
        keywords: ["yardım", "yardim", "help", "problem", "sorun", "takıldım", "anlamadım"],
        response:
            "🤝 Sana yardımcı olmak istiyorum! Birkaç seçenek:\n\n1. **Teknik sorun** → Rehberine danış veya etkinliklere katıl\n2. **Görev hakkında soru** → Görev detaylarını kontrol et\n3. **Kariyer yolu seçimi** → Bana ilgi alanından bahset\n4. **Platform kullanımı** → Herhangi bir özelliği sorabilirsinn\n\nBiraz daha detay verirsen daha iyi yardımcı olabilirim! 💡",
    },
];

/**
 * Match user input against intents using keyword scoring.
 * Returns the best matching intent or null for fallback.
 */
export function matchMentorIntent(input: string): MentorIntent | null {
    const normalised = input
        .toLocaleLowerCase("tr")
        .replace(/[?!.,;:'"]/g, "")
        .trim();

    const words = normalised.split(/\s+/);

    let bestMatch: MentorIntent | null = null;
    let bestScore = 0;

    for (const intent of MENTOR_INTENTS) {
        let score = 0;
        for (const keyword of intent.keywords) {
            const kw = keyword.toLocaleLowerCase("tr");
            // Exact word match = 2 points, partial/includes = 1 point
            if (words.includes(kw)) {
                score += 2;
            } else if (normalised.includes(kw)) {
                score += 1;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = intent;
        }
    }

    // Require at least score 1 to match
    return bestScore >= 1 ? bestMatch : null;
}

/**
 * Tier 3 fallback responses — friendly redirects
 */
const FALLBACK_RESPONSES = [
    "Hmm, bu konuda tam emin değilim ama sana yardımcı olmak istiyorum! 🤔 Daha spesifik bir soru sorabilir misin? Örneğin kariyer yolların, görevlerin veya simülasyonlar hakkında sorabilirsin.",
    "İlginç bir soru! 😊 Bu konuda rehberinle konuşmanı öneririm. Bana platform ile ilgili sorular sorabilirsin — mesela XP, rozetler, görevler hakkında.",
    "Bu soruyu tam olarak yanıtlayamıyorum, ama şu konularda uzmanım: kariyer yolları, MicroLab'lar, simülasyonlar, XP sistemi ve görevler. Hangisini merak ediyorsun? 💡",
];

export function getFallbackResponse(): string {
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}
