"use client";

import Link from "next/link";
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
import { useDemo } from "@/lib/DemoContext";
import { getDashboardData } from "@/lib/demo/selectors";
// import { DEMO_STAGES } from "@/lib/demo-data"; // Removed dependency


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
    const { state: currentUser } = useDemo(); // state renamed to currentUser for compatibility/clarity
    const { nextBestAction, currentModule, activeTasks, upcomingEvents, feedItems } = getDashboardData(currentUser);

    const xpPercent = Math.min(100, (currentUser.xp / 1000) * 100); // Mock max XP for bar
    const level = currentUser.level as string;
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
                            Merhaba, {currentUser.name}! 👋
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            {currentUser.phase === 'discovery' ? 'Keşif Fazı: Dijital dünyayı anlama zamanı.' :
                                currentUser.phase === 'build' ? 'İnşa Fazı: Projelerle yeteneklerini geliştir.' :
                                    currentUser.phase === 'impact' ? 'Etki Fazı: Dünyayı değiştirecek çözümler üret.' :
                                        'Pusula Yolculuğuna Hoşgeldin!'}
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
                            <StreakBadge days={currentUser.streak} />
                        </motion.div>

                        <motion.div
                            variants={scaleIn}
                            className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2"
                        >
                            <MaterialIcon name="star" className="text-primary" />
                            <span className="text-sm font-semibold text-foreground">{currentUser.xp} XP</span>
                        </motion.div>

                        <motion.div variants={scaleIn}>
                            <LevelBadge level={currentUser.level} variant="medium" />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.header>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - 2/3 width */}
                <div className="space-y-6 lg:col-span-2">

                    {/* NEXT BEST ACTION CARD (Replaces generic Current Module) */}
                    <AnimatedSection delay={0.1}>
                        <motion.div whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
                            <Card className="overflow-hidden border-emerald-500/30 bg-card/80 backdrop-blur ring-1 ring-emerald-500/20">
                                <CardHeader className="pb-3 border-b border-white/5 bg-emerald-500/5">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2 text-lg text-emerald-400">
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                            >
                                                <MaterialIcon name="bolt" className="text-emerald-400" filled />
                                            </motion.div>
                                            Sıradaki Adım
                                        </CardTitle>
                                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                                            +{nextBestAction.xp} XP
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        {/* Thumbnail (if microlab) */}
                                        {nextBestAction.thumbnail && (
                                            <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
                                                <img
                                                    src={nextBestAction.thumbnail}
                                                    alt={nextBestAction.title}
                                                    className="h-full w-full object-cover transition-transform hover:scale-105"
                                                />
                                            </div>
                                        )}

                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <h3 className="font-display text-xl font-semibold text-foreground">
                                                    {nextBestAction.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                                    {nextBestAction.description}
                                                </p>
                                            </div>

                                            {/* Action Button */}
                                            <Link href={nextBestAction.actionUrl}>
                                                <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-500 sm:w-auto">
                                                    <MaterialIcon name="play_arrow" size="sm" className="mr-2" />
                                                    {nextBestAction.type === 'microlab' ? 'Derse Başla' : 'Görevi Görüntüle'}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Module Progress (only if currentModule exists and matches action) */}
                                    {currentModule && nextBestAction.type === 'microlab' && (
                                        <div className="mt-4 space-y-2 border-t border-white/5 pt-4">
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>{currentModule.title}</span>
                                                <span>%{currentModule.progress} Tamamlandı</span>
                                            </div>
                                            <Progress value={currentModule.progress} className="h-1.5 bg-secondary" />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
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
                                {activeTasks.length > 0 ? (
                                    <motion.div
                                        className="space-y-3"
                                        variants={staggerContainer}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {activeTasks.map((task) => (
                                            <motion.div
                                                key={task.id}
                                                variants={fadeInUp}
                                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                                            >
                                                <Link href={`/gorev/${task.id}`}>
                                                    <div className="group flex items-center justify-between rounded-lg bg-secondary/30 p-3 transition-all hover:bg-secondary/50">
                                                        <div className="flex items-center gap-3">
                                                            <motion.div
                                                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${task.difficulty === "Kolay" ? "bg-green-500/20 text-green-400" :
                                                                    task.difficulty === "Orta" ? "bg-yellow-500/20 text-yellow-400" :
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
                                ) : (
                                    <div className="text-center text-sm text-muted-foreground py-4">
                                        Aktif görev bulunmuyor.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    {/* Daily Tasks Card */}
                    <AnimatedSection delay={0.3}>
                        <DailyTasksCard />
                    </AnimatedSection>

                    {/* Quick Feed */}
                    <AnimatedSection delay={0.4}>
                        <QuickFeed items={feedItems} />
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
                                    <LevelBadge level={currentUser.level} variant="large" />
                                    <div className="text-right">
                                        <motion.div
                                            className="text-2xl font-bold text-foreground"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        >
                                            {currentUser.xp}
                                        </motion.div>
                                        {/* Mock XP target as we removed xpToNext from state */}
                                        <div className="text-xs text-muted-foreground">/ 5000 XP</div>
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
                                    <span className="font-semibold text-primary">{5000 - currentUser.xp} XP</span> daha kazanırsan{" "}
                                    <span className="font-semibold text-foreground capitalize">{nextLevel}</span> olacaksın!
                                </p>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    {/* GDR Mini Card */}
                    <AnimatedSection delay={0.25}>
                        <GDRCardMini
                            gdrScore={currentUser.gdrScore}
                            components={currentUser.gdrComponents}
                        />
                    </AnimatedSection>

                    {/* SDG Card */}
                    <AnimatedSection delay={0.35}>
                        <Card className="border-border bg-card/80 backdrop-blur">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MaterialIcon name="public" className="text-blue-400" />
                                    Odaklanılan SDG
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/20 border border-white/5">
                                    <SDGBadge sdg={currentUser.sdg} variant="large" showName className="w-full justify-center" />
                                    <p className="mt-3 text-center text-xs text-muted-foreground">
                                        Bu hedef doğrultusunda projeler geliştiriyorsun.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
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
                                {upcomingEvents.length > 0 ? (
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
                                ) : (
                                    <div className="text-center text-sm text-muted-foreground py-2">
                                        Yaklaşan etkinlik yok.
                                    </div>
                                )}
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
