"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { LevelBadge } from "@/components/common/LevelBadge";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { GDRCardMini } from "@/components/gdr/GDRCard";
import { DailyTasksCard } from "@/components/daily/DailyTasksCard";
import { MotivationCard } from "@/components/panel/MotivationCard";
import { QuickFeed } from "@/components/panel/QuickFeed";
import { BuddyCard } from "@/components/buddy/BuddyCard";
import { StreakBadge } from "@/components/gamification/StreakBadge";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

// Mock data
const mockUser = {
    name: "Zeynep",
    surname: "Yıldırım",
    level: "kalfa" as const,
    xp: 1250,
    xpToNext: 2500,
    streak: 12,
    cohort: "İklim Savaşçıları",
    sdg: 13,
    gdrScore: 58,
    gdrComponents: {
        teknik_rol: 65,
        takim: 55,
        sunum: 45,
        guvenilirlik: 70,
        sosyal_etki: 50,
    },
};

const currentModule = {
    id: "m2",
    title: "İnşa: Problem Çözümü",
    progress: 35,
    currentLesson: "Veri Doğrulama Teknikleri",
    lessons: [
        { id: "l1", title: "Problem Tanımlama", done: true },
        { id: "l2", title: "Veri Toplama", done: true },
        { id: "l3", title: "Veri Doğrulama Teknikleri", done: false, current: true },
        { id: "l4", title: "Çözüm Geliştirme", done: false },
        { id: "l5", title: "Prototipleme", done: false },
    ],
};

const activeTasks = [
    {
        id: "t1",
        title: "3 Dakikalık Mikro Sunum",
        type: "task",
        difficulty: "easy",
        xp: 50,
        deadline: "2 gün",
        progress: 60,
    },
    {
        id: "t2",
        title: "Veri Görselleştirme",
        type: "task",
        difficulty: "med",
        xp: 100,
        deadline: "5 gün",
        progress: 20,
    },
];

const upcomingEvents = [
    { id: "e1", title: "Mentor Klinik", date: "Çar, 14:00", type: "meeting" },
    { id: "e2", title: "Demo Day", date: "Cum, 18:00", type: "event" },
];

// Scroll-triggered animation component
function AnimatedSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function PanelPage() {
    const xpPercent = (mockUser.xp / mockUser.xpToNext) * 100;
    const level = mockUser.level as string;
    const nextLevel = level === "cirak" ? "kalfa" : level === "kalfa" ? "usta" : "mezun";

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
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                            Merhaba, {mockUser.name}! 👋
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Bugün harika işler başaracaksın
                        </p>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        className="flex flex-wrap items-center gap-3"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={scaleIn}>
                            <StreakBadge days={mockUser.streak} />
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2"
                        >
                            <MaterialIcon name="star" className="text-primary" />
                            <span className="text-sm font-semibold text-foreground">{mockUser.xp} XP</span>
                        </motion.div>

                        <motion.div variants={scaleIn}>
                            <LevelBadge level={mockUser.level} variant="medium" />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.header>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - 2/3 width */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Hero Card - Current Progress */}
                    <AnimatedSection delay={0.1}>
                        <motion.div
                            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                        >
                            <Card className="overflow-hidden border-border bg-card/80 backdrop-blur">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                            >
                                                <MaterialIcon name="school" className="text-primary" />
                                            </motion.div>
                                            Şu anki modül
                                        </CardTitle>
                                        <SDGBadge sdg={mockUser.sdg} variant="small" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-display text-xl font-semibold text-foreground">
                                                {currentModule.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Şu an: {currentModule.currentLesson}
                                            </p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">İlerleme</span>
                                                <span className="font-semibold text-foreground">{currentModule.progress}%</span>
                                            </div>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                            >
                                                <Progress value={currentModule.progress} className="h-2 bg-secondary" />
                                            </motion.div>
                                        </div>

                                        {/* Lesson Pills */}
                                        <motion.div
                                            className="flex flex-wrap gap-2"
                                            variants={staggerContainer}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {currentModule.lessons.map((lesson, i) => (
                                                <motion.div
                                                    key={lesson.id}
                                                    variants={scaleIn}
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${lesson.done
                                                        ? "bg-primary/20 text-primary"
                                                        : lesson.current
                                                            ? "bg-primary text-black glow-green"
                                                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                                        }`}
                                                >
                                                    {lesson.done && <MaterialIcon name="check" size="sm" />}
                                                    {lesson.current && (
                                                        <motion.div
                                                            animate={{ scale: [1, 1.2, 1] }}
                                                            transition={{ duration: 1, repeat: Infinity }}
                                                        >
                                                            <MaterialIcon name="play_arrow" size="sm" />
                                                        </motion.div>
                                                    )}
                                                    {lesson.title}
                                                </motion.div>
                                            ))}
                                        </motion.div>

                                        {/* Continue Button */}
                                        <Link href="/ogren">
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button className="w-full bg-primary text-black hover:bg-primary/90 glow-green">
                                                    <MaterialIcon name="play_arrow" size="sm" className="mr-2" />
                                                    Derse Devam Et
                                                </Button>
                                            </motion.div>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatedSection>

                    {/* Etkinlikler Section */}
                    <AnimatedSection delay={0.15}>
                        <Card className="border-border bg-card/80 backdrop-blur overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <motion.div
                                            animate={{ rotate: [0, 15, -15, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                                        >
                                            <MaterialIcon name="celebration" className="text-chart-5" />
                                        </motion.div>
                                        Etkinlikler
                                    </CardTitle>
                                    <Link href="/etkinlikler">
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                            Tümü
                                            <MaterialIcon name="chevron_right" size="sm" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Link href="/etkinlikler/bot-arena">
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-[#10221c] to-[#0d1619] p-4 cursor-pointer transition-all hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                                    >
                                        {/* Background Grid Effect */}
                                        <div
                                            className="absolute inset-0 opacity-10"
                                            style={{
                                                backgroundImage: "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
                                                backgroundSize: "20px 20px",
                                            }}
                                        />

                                        <div className="relative z-10 flex items-start gap-4">
                                            {/* Icon */}
                                            <motion.div
                                                className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <MaterialIcon name="smart_toy" className="text-2xl" />
                                            </motion.div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-display text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                                                        🤖 Oyun Botu Yapma Yarışması
                                                    </h3>
                                                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs animate-pulse">
                                                        CANLI
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                                                    Python veya JavaScript ile yapay zeka destekli oyun botu geliştir!
                                                    Diğer öğrencilerin botlarıyla yarış, algoritma optimizasyonu yap ve
                                                    liderlik tablosunda zirveye çık.
                                                </p>

                                                {/* Stats */}
                                                <div className="flex flex-wrap items-center gap-4 text-xs">
                                                    <div className="flex items-center gap-1.5 text-emerald-400">
                                                        <MaterialIcon name="groups" className="text-sm" />
                                                        <span>24 Katılımcı</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-yellow-400">
                                                        <MaterialIcon name="emoji_events" className="text-sm" />
                                                        <span>500 XP Ödül</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-blue-400">
                                                        <MaterialIcon name="timer" className="text-sm" />
                                                        <span>3 Gün Kaldı</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <motion.div
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="text-emerald-500/50 group-hover:text-emerald-500 transition-colors"
                                            >
                                                <MaterialIcon name="arrow_forward" className="text-xl" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                    <AnimatedSection delay={0.2}>
                        <Card className="border-border bg-card/80 backdrop-blur">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <MaterialIcon name="checklist" className="text-chart-2" />
                                        Aktif Görevler
                                    </CardTitle>
                                    <Link href="/gorevler">
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                            Tümü
                                            <MaterialIcon name="chevron_right" size="sm" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <motion.div
                                    className="space-y-3"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {activeTasks.map((task, index) => (
                                        <motion.div
                                            key={task.id}
                                            variants={fadeInUp}
                                            whileHover={{ x: 4, transition: { duration: 0.2 } }}
                                        >
                                            <Link href={`/gorev/${task.id}`}>
                                                <div className="group flex items-center justify-between rounded-lg bg-secondary/30 p-3 transition-all hover:bg-secondary/50">
                                                    <div className="flex items-center gap-3">
                                                        <motion.div
                                                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${task.difficulty === "easy" ? "bg-green-500/20 text-green-400" :
                                                                task.difficulty === "med" ? "bg-yellow-500/20 text-yellow-400" :
                                                                    "bg-red-500/20 text-red-400"
                                                                }`}
                                                            whileHover={{ rotate: 5 }}
                                                        >
                                                            <MaterialIcon name="task_alt" />
                                                        </motion.div>
                                                        <div>
                                                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                                                                {task.title}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                <span className="flex items-center gap-0.5">
                                                                    <MaterialIcon name="star" size="sm" className="text-primary" />
                                                                    {task.xp} XP
                                                                </span>
                                                                <span>•</span>
                                                                <span>{task.deadline}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="hidden sm:block text-right">
                                                            <span className="text-sm font-medium text-foreground">{task.progress}%</span>
                                                        </div>
                                                        <motion.div
                                                            animate={{ x: [0, 3, 0] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        >
                                                            <MaterialIcon name="chevron_right" className="text-muted-foreground group-hover:text-primary transition-colors" />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    {/* Daily Tasks Card */}
                    <AnimatedSection delay={0.3}>
                        <DailyTasksCard />
                    </AnimatedSection>

                    {/* Quick Feed */}
                    <AnimatedSection delay={0.4}>
                        <QuickFeed />
                    </AnimatedSection>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-6">
                    {/* XP & Level Progress */}
                    <AnimatedSection delay={0.15}>
                        <Card className="border-border bg-card/80 backdrop-blur overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <motion.div
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <MaterialIcon name="trending_up" className="text-chart-4" />
                                    </motion.div>
                                    Seviye İlerlemesi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <LevelBadge level={mockUser.level} variant="large" />
                                    <div className="text-right">
                                        <motion.div
                                            className="text-2xl font-bold text-foreground"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        >
                                            {mockUser.xp}
                                        </motion.div>
                                        <div className="text-xs text-muted-foreground">/ {mockUser.xpToNext} XP</div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    style={{ transformOrigin: "left" }}
                                >
                                    <Progress value={xpPercent} className="h-3 bg-secondary" />
                                </motion.div>
                                <p className="text-center text-sm text-muted-foreground">
                                    <span className="font-semibold text-primary">{mockUser.xpToNext - mockUser.xp} XP</span> daha kazanırsan{" "}
                                    <span className="font-semibold text-foreground">{nextLevel}</span> olacaksın!
                                </p>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    {/* GDR Mini Card */}
                    <AnimatedSection delay={0.25}>
                        <GDRCardMini
                            gdrScore={mockUser.gdrScore}
                            components={mockUser.gdrComponents}
                        />
                    </AnimatedSection>

                    {/* Buddy Card */}
                    <AnimatedSection delay={0.35}>
                        <BuddyCard />
                    </AnimatedSection>

                    {/* Motivation Card */}
                    <AnimatedSection delay={0.45}>
                        <MotivationCard />
                    </AnimatedSection>

                    {/* Upcoming Events */}
                    <AnimatedSection delay={0.55}>
                        <Card className="border-border bg-card/80 backdrop-blur">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MaterialIcon name="calendar_month" className="text-chart-3" />
                                    Yaklaşan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <motion.div
                                    className="space-y-3"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {upcomingEvents.map((event) => (
                                        <motion.div
                                            key={event.id}
                                            variants={fadeInUp}
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3 cursor-pointer"
                                        >
                                            <motion.div
                                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${event.type === "meeting" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
                                                    }`}
                                                whileHover={{ rotate: 10 }}
                                            >
                                                <MaterialIcon name={event.type === "meeting" ? "videocam" : "celebration"} />
                                            </motion.div>
                                            <div>
                                                <p className="font-medium text-foreground">{event.title}</p>
                                                <p className="text-xs text-muted-foreground">{event.date}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <Link href="/toplanti">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button variant="outline" className="mt-4 w-full border-border hover:border-primary hover:text-primary">
                                            <MaterialIcon name="calendar_today" size="sm" className="mr-2" />
                                            Takvime Git
                                        </Button>
                                    </motion.div>
                                </Link>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </div>
            </div>
        </motion.div>
    );
}
