
import { CareerPathId } from "@/lib/demo/types";

export interface PathPack {
    id: CareerPathId;
    title: string;
    description: string;
    icon: string;
    color: string;
    duration: string;           // e.g. "24 hafta"
    technologies: string[];
    sdg: number;                // Primary UN SDG alignment
    microlabs: string[];        // IDs of recommended microlabs
    tasks: string[];            // IDs of recommended tasks
    finalProject: string;
}

export const CAREER_PATHS: PathPack[] = [
    {
        id: "veri-analizi",
        title: "Veri Analizi",
        description: "SQL, Python ve Pandas ile veriden anlam çıkar. İş zekası raporları oluştur, karar destek sistemleri kur.",
        icon: "query_stats",
        color: "text-purple-400",
        duration: "24 hafta",
        technologies: ["SQL", "Python", "Pandas", "Power BI"],
        sdg: 9,
        microlabs: ["python-veri-analizi", "sql-temelleri", "veri-gorsellestirme"],
        tasks: ["task_01", "task_05", "task_veri_03"],
        finalProject: "Eskişehir Açık Veri Dashboard'u"
    },
    {
        id: "yapay-zeka-ml",
        title: "Yapay Zekâ & ML",
        description: "Makine öğrenmesi ve derin öğrenme ile geleceğin teknolojilerini öğren. TensorFlow ve Scikit-learn ile modeller kur.",
        icon: "psychology",
        color: "text-cyan-400",
        duration: "32 hafta",
        technologies: ["TensorFlow", "Scikit-learn", "Python", "Derin Öğrenme"],
        sdg: 9,
        microlabs: ["makine-ogrenmesi-101", "yapay-zeka-etik", "model-egitimi"],
        tasks: ["task_ai_01", "task_ai_02", "task_09"],
        finalProject: "Trafik Tahmin Modeli"
    },
    {
        id: "dijital-pazarlama",
        title: "Dijital Pazarlama",
        description: "Growth hacking, SEO ve kampanya yönetimi ile markaları dijitalde büyüt. Veri odaklı pazarlama stratejileri geliştir.",
        icon: "campaign",
        color: "text-orange-400",
        duration: "20 hafta",
        technologies: ["Google Analytics", "SEO", "Meta Ads", "Growth Hacking"],
        sdg: 8,
        microlabs: ["dijital-pazarlama-temelleri", "seo-optimizasyonu", "sosyal-medya-stratejisi"],
        tasks: ["task_paz_01", "task_paz_02"],
        finalProject: "Yerel İşletme Büyüme Planı"
    },
    {
        id: "yazilim-gelistirme",
        title: "Yazılım Geliştirme",
        description: "JavaScript, React ve Node.js ile modern web uygulamaları geliştir. API tasarımından deployment'a tam yığın beceri kazan.",
        icon: "code",
        color: "text-green-400",
        duration: "28 hafta",
        technologies: ["JavaScript", "React", "Node.js", "API"],
        sdg: 9,
        microlabs: ["javascript-temelleri", "react-giris", "nodejs-giris"],
        tasks: ["task_yaz_01", "task_yaz_02"],
        finalProject: "Topluluk Platformu"
    },
    {
        id: "dijital-tasarim",
        title: "Dijital Tasarım",
        description: "Figma ile UI/UX tasarımı öğren. Design system kur, erişilebilir ve kullanıcı dostu arayüzler tasarla.",
        icon: "palette",
        color: "text-pink-400",
        duration: "20 hafta",
        technologies: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
        sdg: 10,
        microlabs: ["ui-ux-temelleri", "figma-giris", "tasarim-sistemi"],
        tasks: ["task_tas_01", "task_tas_02"],
        finalProject: "Erişilebilir Mobil Uygulama Tasarımı"
    },
    {
        id: "e-ticaret",
        title: "E-Ticaret",
        description: "Online mağaza kur ve yönet. Shopify, WooCommerce ile ürün yönetimi, ödeme ve lojistik süreçlerini öğren.",
        icon: "storefront",
        color: "text-amber-400",
        duration: "16 hafta",
        technologies: ["Shopify", "WooCommerce", "Ödeme Sistemleri", "Lojistik"],
        sdg: 8,
        microlabs: ["e-ticaret-temelleri", "urun-yonetimi", "dijital-odeme"],
        tasks: ["task_eti_01", "task_eti_02"],
        finalProject: "E-Ticaret Mağaza Simülasyonu"
    }
];
