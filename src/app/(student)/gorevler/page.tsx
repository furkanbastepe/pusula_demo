"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }
};

const allTasks = [
    {
        id: "t1",
        title: "3 Dakikalık Mikro Sunum",
        description: "Bulduğun veriyi 3 dakikada anlaşılır şekilde anlat",
        difficulty: "easy",
        xp: 50,
        deadline: "2 gün",
        status: "in_progress",
        progress: 60,
        category: "sunum",
        sdg: 13,
    },
    {
        id: "t2",
        title: "Veri Görselleştirme Grafiği",
        description: "İklim verilerini görselleştiren bir grafik oluştur",
        difficulty: "med",
        xp: 100,
        deadline: "5 gün",
        status: "in_progress",
        progress: 20,
        category: "teknik",
        sdg: 13,
    },
    {
        id: "t3",
        title: "Problem Kartı Dokümantasyonu",
        description: "Kohort problemini detaylı şekilde belgele",
        difficulty: "easy",
        xp: 30,
        deadline: "1 hafta",
        status: "unlocked",
        progress: 0,
        category: "dokumantasyon",
        sdg: 13,
    },
    {
        id: "t4",
        title: "Kullanıcı Araştırma Raporu",
        description: "5 kişilik kullanıcı araştırması yap ve raporla",
        difficulty: "hard",
        xp: 150,
        deadline: "2 hafta",
        status: "unlocked",
        progress: 0,
        category: "arastirma",
        sdg: 13,
    },
    {
        id: "t5",
        title: "Prototip İncelemesi",
        description: "Buddy'nin prototipini incele ve geri bildirim ver",
        difficulty: "easy",
        xp: 25,
        deadline: "3 gün",
        status: "completed",
        progress: 100,
        category: "takim",
        sdg: 13,
    },
    {
        id: "t6",
        title: "Demo Sunumu",
        description: "Projenin demo sunumunu hazırla ve kaydet",
        difficulty: "hard",
        xp: 200,
        deadline: null,
        status: "locked",
        progress: 0,
        category: "sunum",
        sdg: 13,
    },
];

const categories = [
    { id: "all", label: "Tümü", icon: "list" },
    { id: "sunum", label: "Sunum", icon: "slideshow" },
    { id: "teknik", label: "Teknik", icon: "code" },
    { id: "arastirma", label: "Araştırma", icon: "search" },
    { id: "takim", label: "Takım", icon: "people" },
    { id: "dokumantasyon", label: "Döküman", icon: "description" },
];

const difficultyConfig = {
    easy: { label: "Kolay", color: "text-green-400", bg: "bg-green-500/20" },
    med: { label: "Orta", color: "text-yellow-400", bg: "bg-yellow-500/20" },
    hard: { label: "Zor", color: "text-red-400", bg: "bg-red-500/20" },
};

const statusConfig = {
    in_progress: { label: "Devam Ediyor", color: "text-blue-400", icon: "play_circle" },
    unlocked: { label: "Açık", color: "text-muted-foreground", icon: "lock_open" },
    completed: { label: "Tamamlandı", color: "text-primary", icon: "check_circle" },
    locked: { label: "Kilitli", color: "text-zinc-500", icon: "lock" },
};

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            transition={{ delay: index * 0.05 }}
        >
            {children}
        </motion.div>
    );
}

export default function GorevlerPage() {
    const [activeTab, setActiveTab] = useState("active");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredTasks = allTasks.filter((task) => {
        const categoryMatch = selectedCategory === "all" || task.category === selectedCategory;

        if (activeTab === "active") {
            return categoryMatch && (task.status === "in_progress" || task.status === "unlocked");
        } else if (activeTab === "completed") {
            return categoryMatch && task.status === "completed";
        } else {
            return categoryMatch && task.status === "locked";
        }
    });

    const stats = {
        total: allTasks.length,
        completed: allTasks.filter((t) => t.status === "completed").length,
        inProgress: allTasks.filter((t) => t.status === "in_progress").length,
        totalXP: allTasks.filter((t) => t.status === "completed").reduce((a, t) => a + t.xp, 0),
        pendingXP: allTasks.filter((t) => t.status !== "completed" && t.status !== "locked").reduce((a, t) => a + t.xp, 0),
    };

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
                transition={{ duration: 0.5 }}
            >
                <Breadcrumb />
                <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                            Görevler
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            XP kazan, seviye atla, portföyünü zenginleştir
                        </p>
                    </motion.div>
                </div>
            </motion.header>

            {/* Stats Cards */}
            <motion.div
                className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={fadeInUp}>
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <MaterialIcon name="task_alt" className="text-primary" />
                                </motion.div>
                                <div>
                                    <div className="text-2xl font-bold text-foreground">{stats.completed}/{stats.total}</div>
                                    <div className="text-xs text-muted-foreground">Tamamlanan</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={fadeInUp}>
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <MaterialIcon name="pending" className="text-blue-400" />
                                </motion.div>
                                <div>
                                    <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
                                    <div className="text-xs text-muted-foreground">Devam Eden</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={fadeInUp}>
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/20"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <MaterialIcon name="star" className="text-chart-4" />
                                </motion.div>
                                <div>
                                    <div className="text-2xl font-bold text-foreground">{stats.totalXP}</div>
                                    <div className="text-xs text-muted-foreground">Kazanılan XP</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={fadeInUp}>
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <MaterialIcon name="emoji_events" className="text-purple-400" />
                                </motion.div>
                                <div>
                                    <div className="text-2xl font-bold text-foreground">{stats.pendingXP}</div>
                                    <div className="text-xs text-muted-foreground">Bekleyen XP</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Tabs and Filters */}
            <motion.div
                className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-card/50">
                        <TabsTrigger value="active" className="data-[state=active]:bg-primary/20">
                            <MaterialIcon name="pending_actions" size="sm" className="mr-1.5" />
                            Aktif
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="data-[state=active]:bg-primary/20">
                            <MaterialIcon name="check_circle" size="sm" className="mr-1.5" />
                            Tamamlanan
                        </TabsTrigger>
                        <TabsTrigger value="locked" className="data-[state=active]:bg-primary/20">
                            <MaterialIcon name="lock" size="sm" className="mr-1.5" />
                            Kilitli
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className={`border-border transition-all ${selectedCategory === cat.id
                                    ? "bg-primary/20 border-primary text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                <MaterialIcon name={cat.icon} size="sm" className="mr-1" />
                                {cat.label}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Task Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.map((task, index) => {
                    const difficulty = difficultyConfig[task.difficulty as keyof typeof difficultyConfig];
                    const status = statusConfig[task.status as keyof typeof statusConfig];
                    const isLocked = task.status === "locked";

                    return (
                        <AnimatedCard key={task.id} index={index}>
                            <motion.div
                                whileHover={!isLocked ? { scale: 1.02, y: -4 } : {}}
                                transition={{ duration: 0.2 }}
                            >
                                <Card
                                    className={`border-border bg-card/80 backdrop-blur transition-all ${isLocked ? "opacity-50" : "hover:border-primary/50"
                                        }`}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <SDGBadge sdg={task.sdg} variant="small" />
                                                <Badge className={`${difficulty.bg} ${difficulty.color} border-0`}>
                                                    {difficulty.label}
                                                </Badge>
                                            </div>
                                            <motion.div
                                                className={`flex items-center gap-1 text-sm ${status.color}`}
                                                animate={task.status === "in_progress" ? { scale: [1, 1.1, 1] } : {}}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <MaterialIcon name={status.icon} size="sm" />
                                            </motion.div>
                                        </div>

                                        <h3 className="mt-3 font-semibold text-foreground">{task.title}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>

                                        <div className="mt-4 flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-3 text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <motion.div
                                                        animate={{ rotate: [0, 10, -10, 0] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                    >
                                                        <MaterialIcon name="star" size="sm" className="text-primary" />
                                                    </motion.div>
                                                    {task.xp} XP
                                                </span>
                                                {task.deadline && (
                                                    <span className="flex items-center gap-1">
                                                        <MaterialIcon name="schedule" size="sm" />
                                                        {task.deadline}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {task.status === "in_progress" && (
                                            <div className="mt-3">
                                                <Progress value={task.progress} className="h-1.5 bg-secondary" />
                                            </div>
                                        )}

                                        <Link href={isLocked ? "#" : `/gorev/${task.id}`}>
                                            <motion.div
                                                whileHover={!isLocked ? { scale: 1.02 } : {}}
                                                whileTap={!isLocked ? { scale: 0.98 } : {}}
                                            >
                                                <Button
                                                    className={`mt-4 w-full ${isLocked
                                                        ? "bg-secondary text-muted-foreground cursor-not-allowed"
                                                        : task.status === "completed"
                                                            ? "bg-secondary text-foreground hover:bg-secondary/80"
                                                            : "bg-primary text-black hover:bg-primary/90"
                                                        }`}
                                                    disabled={isLocked}
                                                >
                                                    {isLocked
                                                        ? "Kilitli"
                                                        : task.status === "completed"
                                                            ? "Görüntüle"
                                                            : task.status === "in_progress"
                                                                ? "Devam Et"
                                                                : "Başla"}
                                                    {!isLocked && <MaterialIcon name="chevron_right" size="sm" className="ml-1" />}
                                                </Button>
                                            </motion.div>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </AnimatedCard>
                    );
                })}
            </div>

            {filteredTasks.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <MaterialIcon name="inbox" size="xl" className="text-muted-foreground" />
                            <p className="mt-4 text-lg font-medium text-foreground">Bu kategoride görev yok</p>
                            <p className="text-sm text-muted-foreground">Farklı bir filtre dene</p>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </motion.div>
    );
}
