"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const activities = [
    {
        id: "workshop-1",
        title: "🐍 Python ile Veri Analizi Atölyesi",
        description: "Pandas ve NumPy kütüphanelerini kullanarak gerçek hayat verilerini analiz etmeyi öğrenin. Başlangıç seviyesi için uygundur.",
        icon: "analytics",
        status: "open",
        participants: 12,
        reward: 300,
        daysLeft: 2,
        tags: ["Python", "Veri Bilimi", "Yüzyüze"],
        difficulty: "Kolay",
        minLevel: "cirak"
    },
    {
        id: "workshop-2",
        title: "🤖 Robotik Kodlama: Arduino",
        description: "Sensörler ve motorlarla kendi robotunu tasarla. Temel elektronik bilgisi gerektirir.",
        icon: "smart_toy",
        status: "full",
        participants: 20,
        reward: 500,
        daysLeft: 5,
        tags: ["Donanım", "C++", "Mühendislik"],
        difficulty: "Orta",
        minLevel: "kalfa"
    },
    {
        id: "workshop-3",
        title: "🚀 Girişimcilik: Fikirden Ürüne",
        description: "Teknoloji girişiminizi nasıl kurarsınız? İş modeli kanvası ve sunum teknikleri.",
        icon: "lightbulb",
        status: "open",
        participants: 8,
        reward: 1000,
        daysLeft: 7,
        tags: ["Soft Skills", "Business", "Networking"],
        difficulty: "İleri",
        minLevel: "usta"
    },
    {
        id: "workshop-4",
        title: "🎮 Game Jam: 48 Saat",
        description: "Takımını kur, 48 saatte oyununu geliştir. Büyük ödül sizi bekliyor!",
        icon: "sports_esports",
        status: "live",
        participants: 45,
        reward: 2000,
        daysLeft: 1,
        tags: ["Oyun Geliştirme", "Unity", "Takım Çalışması"],
        difficulty: "Herkes",
        minLevel: "cirak"
    },
    {
        id: "workshop-5",
        title: "☁️ Bulut Bilişim Zirvesi",
        description: "AWS ve Azure uzmanlarıyla buluşma. Sektör trendlerini yakalayın.",
        icon: "cloud",
        status: "open",
        participants: 80,
        reward: 150,
        daysLeft: 10,
        tags: ["Cloud", "DevOps", "Kariyer"],
        difficulty: "Herkes",
        minLevel: "cirak"
    }
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

export default function EtkinliklerPage() {
    return (
        <motion.div
            className="min-h-screen bg-gradient-hero p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Page Header */}
            <motion.header
                className="mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Breadcrumb />
                <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <MaterialIcon name="celebration" className="text-primary" />
                            </motion.div>
                            Etkinlikler
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Yarışmalara katıl, becerilerini göster ve ödüller kazan!
                        </p>
                    </div>
                    <Link href="/kapi">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="bg-gradient-to-r from-indigo-900 to-blue-900 border-indigo-500/30 cursor-pointer hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                                <CardContent className="p-3 flex items-center gap-3">
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <MaterialIcon name="qr_code_2" className="text-white" />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="text-xs text-indigo-200 font-medium">Fiziksel Giriş</div>
                                        <div className="text-sm font-bold text-white">QR Kartım</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Link>
                </div>
            </motion.header>

            {/* Activities Grid */}
            <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {activities.map((activity) => (
                    <motion.div key={activity.id} variants={fadeInUp}>
                        <Link href={`/etkinlikler/${activity.id}`}>
                            <Card className="group relative overflow-hidden border-emerald-500/20 bg-gradient-to-br from-[#10221c] to-[#0d1619] hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all cursor-pointer h-full">
                                {/* Background Grid Effect */}
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
                                        backgroundSize: "20px 20px",
                                    }}
                                />

                                <CardHeader className="relative z-10 pb-2">
                                    <div className="flex items-start justify-between">
                                        <motion.div
                                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                                            animate={{ y: [0, -3, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <MaterialIcon name={activity.icon} className="text-xl" />
                                        </motion.div>
                                        {activity.status === "live" && (
                                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs animate-pulse">
                                                CANLI
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="mt-3 text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                                        {activity.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-3">
                                        {activity.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {activity.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex flex-wrap items-center gap-4 text-xs">
                                        <div className="flex items-center gap-1.5 text-emerald-400">
                                            <MaterialIcon name="groups" className="text-sm" />
                                            <span>{activity.participants} Katılımcı</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-yellow-400">
                                            <MaterialIcon name="emoji_events" className="text-sm" />
                                            <span>{activity.reward} XP</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-blue-400">
                                            <MaterialIcon name="timer" className="text-sm" />
                                            <span>{activity.daysLeft} Gün</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State if no activities */}
            {activities.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <MaterialIcon
                        name="celebration"
                        className="text-6xl text-muted-foreground mb-4"
                    />
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                        Henüz etkinlik yok
                    </h2>
                    <p className="text-muted-foreground">
                        Yeni etkinlikler yakında eklenecek!
                    </p>
                </div>
            )}
        </motion.div>
    );
}
