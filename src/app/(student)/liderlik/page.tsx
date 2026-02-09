"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { LevelBadge } from "@/components/common/LevelBadge";
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
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

// Mock leaderboard data
const leaderboardData = [
    { rank: 1, name: "Zeynep Y.", xp: 2450, level: "usta", gdr: 78, streak: 21, avatar: null, isCurrentUser: false },
    { rank: 2, name: "Ahmet K.", xp: 2280, level: "usta", gdr: 72, streak: 18, avatar: null, isCurrentUser: false },
    { rank: 3, name: "Elif D.", xp: 2100, level: "kalfa", gdr: 68, streak: 15, avatar: null, isCurrentUser: false },
    { rank: 4, name: "Can Ö.", xp: 1890, level: "kalfa", gdr: 65, streak: 12, avatar: null, isCurrentUser: false },
    { rank: 5, name: "Sena A.", xp: 1750, level: "kalfa", gdr: 62, streak: 10, avatar: null, isCurrentUser: true },
    { rank: 6, name: "Mert T.", xp: 1680, level: "kalfa", gdr: 58, streak: 9, avatar: null, isCurrentUser: false },
    { rank: 7, name: "Deniz B.", xp: 1520, level: "kalfa", gdr: 55, streak: 7, avatar: null, isCurrentUser: false },
    { rank: 8, name: "Ayşe K.", xp: 1400, level: "cirak", gdr: 48, streak: 5, avatar: null, isCurrentUser: false },
    { rank: 9, name: "Burak S.", xp: 1250, level: "cirak", gdr: 45, streak: 4, avatar: null, isCurrentUser: false },
    { rank: 10, name: "Yasemin Ç.", xp: 1100, level: "cirak", gdr: 42, streak: 3, avatar: null, isCurrentUser: false },
];

const cohortLeaderboard = [
    { rank: 1, name: "İklim Savaşçıları", sdg: 13, members: 12, avgXp: 1850, avgGdr: 62 },
    { rank: 2, name: "Su Koruyucuları", sdg: 6, members: 10, avgXp: 1650, avgGdr: 58 },
    { rank: 3, name: "Eşitlik Elçileri", sdg: 5, members: 8, avgXp: 1480, avgGdr: 52 },
];

const currentUserRank = {
    rank: 5,
    totalUsers: 45,
    percentile: 11,
    weeklyChange: 2,
};

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: index * 0.05 }}
        >
            {children}
        </motion.div>
    );
}

export default function LiderlikPage() {
    const [activeTab, setActiveTab] = useState("bireysel");
    const [sortBy, setSortBy] = useState<"xp" | "gdr" | "streak">("xp");

    const sortedData = [...leaderboardData].sort((a, b) => b[sortBy] - a[sortBy]);

    const getRankBadge = (rank: number) => {
        if (rank === 1) return { icon: "emoji_events", color: "text-yellow-400", bg: "bg-yellow-500/20" };
        if (rank === 2) return { icon: "workspace_premium", color: "text-gray-300", bg: "bg-gray-500/20" };
        if (rank === 3) return { icon: "military_tech", color: "text-amber-600", bg: "bg-amber-600/20" };
        return null;
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
                            Liderlik Tablosu
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Toplulukta nerede durduğunu gör
                        </p>
                    </motion.div>
                </div>
            </motion.header>

            {/* Current User Rank Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="mb-6 border-primary/30 bg-card/80 backdrop-blur glow-green overflow-hidden">
                    <CardContent className="p-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-2xl font-bold text-primary"
                                    animate={{
                                        boxShadow: [
                                            "0 0 0px rgba(19, 236, 91, 0.2)",
                                            "0 0 20px rgba(19, 236, 91, 0.4)",
                                            "0 0 0px rgba(19, 236, 91, 0.2)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    #{currentUserRank.rank}
                                </motion.div>
                                <div>
                                    <p className="font-semibold text-foreground">Senin Sıralaman</p>
                                    <p className="text-sm text-muted-foreground">
                                        {currentUserRank.totalUsers} öğrenci arasında Top %{currentUserRank.percentile}
                                    </p>
                                </div>
                            </div>
                            <motion.div
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {currentUserRank.weeklyChange > 0 ? (
                                    <Badge className="bg-primary/20 text-primary border-0">
                                        <motion.div
                                            animate={{ y: [0, -2, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            <MaterialIcon name="trending_up" size="sm" className="mr-1" />
                                        </motion.div>
                                        +{currentUserRank.weeklyChange} bu hafta
                                    </Badge>
                                ) : currentUserRank.weeklyChange < 0 ? (
                                    <Badge className="bg-destructive/20 text-destructive border-0">
                                        <MaterialIcon name="trending_down" size="sm" className="mr-1" />
                                        {currentUserRank.weeklyChange} bu hafta
                                    </Badge>
                                ) : (
                                    <Badge className="bg-secondary text-muted-foreground border-0">
                                        <MaterialIcon name="trending_flat" size="sm" className="mr-1" />
                                        Değişim yok
                                    </Badge>
                                )}
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <motion.div
                    className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <TabsList className="bg-card/50">
                        <TabsTrigger value="bireysel" className="data-[state=active]:bg-primary/20">
                            <MaterialIcon name="person" size="sm" className="mr-1.5" />
                            Bireysel
                        </TabsTrigger>
                        <TabsTrigger value="kohort" className="data-[state=active]:bg-primary/20">
                            <MaterialIcon name="groups" size="sm" className="mr-1.5" />
                            Kohortlar
                        </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                        {activeTab === "bireysel" && (
                            <motion.div
                                className="flex gap-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {[
                                    { key: "xp", label: "XP", icon: "star" },
                                    { key: "gdr", label: "GDR", icon: "radar" },
                                    { key: "streak", label: "Streak", icon: "local_fire_department" },
                                ].map((sort) => (
                                    <motion.div key={sort.key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={`border-border ${sortBy === sort.key
                                                ? "bg-primary/20 border-primary text-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                                }`}
                                            onClick={() => setSortBy(sort.key as "xp" | "gdr" | "streak")}
                                        >
                                            <MaterialIcon name={sort.icon} size="sm" className="mr-1" />
                                            {sort.label}
                                        </Button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Bireysel Tab */}
                <TabsContent value="bireysel" className="space-y-3">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3"
                    >
                        {sortedData.map((user, index) => {
                            const rankBadge = getRankBadge(index + 1);
                            return (
                                <AnimatedCard key={user.name} index={index}>
                                    <motion.div
                                        whileHover={{ scale: 1.01, x: 4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card
                                            className={`border-border bg-card/80 backdrop-blur transition-all cursor-pointer ${user.isCurrentUser ? "border-primary/50 ring-1 ring-primary/20" : "hover:border-primary/30"
                                                }`}
                                        >
                                            <CardContent className="flex items-center justify-between p-4">
                                                <div className="flex items-center gap-4">
                                                    {/* Rank */}
                                                    <motion.div
                                                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${rankBadge ? rankBadge.bg : "bg-secondary"
                                                            }`}
                                                        whileHover={{ rotate: index < 3 ? [0, -10, 10, 0] : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {rankBadge ? (
                                                            <motion.div
                                                                animate={index === 0 ? {
                                                                    scale: [1, 1.1, 1],
                                                                    rotate: [0, 5, -5, 0]
                                                                } : {}}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                            >
                                                                <MaterialIcon name={rankBadge.icon} className={rankBadge.color} />
                                                            </motion.div>
                                                        ) : (
                                                            <span className="font-semibold text-muted-foreground">#{index + 1}</span>
                                                        )}
                                                    </motion.div>

                                                    {/* Avatar & Name */}
                                                    <Avatar className="h-10 w-10 border-2 border-border">
                                                        <AvatarFallback className="bg-muted text-muted-foreground">
                                                            {user.name.split(" ").map(n => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className={`font-medium ${user.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                                                            {user.name} {user.isCurrentUser && "(Sen)"}
                                                        </p>
                                                        <LevelBadge level={user.level as "cirak" | "kalfa" | "usta" | "mezun"} variant="small" />
                                                    </div>
                                                </div>

                                                {/* Stats */}
                                                <div className="flex items-center gap-6">
                                                    <div className="text-center">
                                                        <motion.div
                                                            className={`text-lg font-bold ${sortBy === "xp" ? "text-primary" : "text-foreground"}`}
                                                            animate={sortBy === "xp" ? { scale: [1, 1.05, 1] } : {}}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {user.xp.toLocaleString()}
                                                        </motion.div>
                                                        <div className="text-xs text-muted-foreground">XP</div>
                                                    </div>
                                                    <div className="text-center hidden sm:block">
                                                        <motion.div
                                                            className={`text-lg font-bold ${sortBy === "gdr" ? "text-primary" : "text-foreground"}`}
                                                            animate={sortBy === "gdr" ? { scale: [1, 1.05, 1] } : {}}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {user.gdr}
                                                        </motion.div>
                                                        <div className="text-xs text-muted-foreground">GDR</div>
                                                    </div>
                                                    <div className="text-center hidden md:block">
                                                        <motion.div
                                                            className={`flex items-center justify-center gap-1 text-lg font-bold ${sortBy === "streak" ? "text-primary" : "text-orange-400"
                                                                }`}
                                                            animate={sortBy === "streak" ? { scale: [1, 1.05, 1] } : {}}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <motion.div
                                                                animate={{
                                                                    scale: [1, 1.2, 1],
                                                                    rotate: [0, 5, -5, 0]
                                                                }}
                                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                            >
                                                                <MaterialIcon name="local_fire_department" size="sm" />
                                                            </motion.div>
                                                            {user.streak}
                                                        </motion.div>
                                                        <div className="text-xs text-muted-foreground">Streak</div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </AnimatedCard>
                            );
                        })}
                    </motion.div>
                </TabsContent>

                {/* Kohort Tab */}
                <TabsContent value="kohort" className="space-y-4">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {cohortLeaderboard.map((cohort, index) => {
                            const rankBadge = getRankBadge(index + 1);
                            return (
                                <AnimatedCard key={cohort.name} index={index}>
                                    <motion.div
                                        whileHover={{ scale: 1.01, x: 4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="border-border bg-card/80 backdrop-blur cursor-pointer hover:border-primary/30">
                                            <CardContent className="flex items-center justify-between p-4">
                                                <div className="flex items-center gap-4">
                                                    <motion.div
                                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${rankBadge ? rankBadge.bg : "bg-secondary"
                                                            }`}
                                                        whileHover={{ rotate: [0, -5, 5, 0] }}
                                                    >
                                                        {rankBadge ? (
                                                            <MaterialIcon name={rankBadge.icon} size="lg" className={rankBadge.color} />
                                                        ) : (
                                                            <span className="text-xl font-bold text-muted-foreground">#{index + 1}</span>
                                                        )}
                                                    </motion.div>
                                                    <div>
                                                        <p className="font-semibold text-foreground">{cohort.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            SDG {cohort.sdg} • {cohort.members} üye
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-center">
                                                        <div className="text-lg font-bold text-foreground">{cohort.avgXp.toLocaleString()}</div>
                                                        <div className="text-xs text-muted-foreground">Ort. XP</div>
                                                    </div>
                                                    <div className="text-center hidden sm:block">
                                                        <div className="text-lg font-bold text-chart-2">{cohort.avgGdr}</div>
                                                        <div className="text-xs text-muted-foreground">Ort. GDR</div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </AnimatedCard>
                            );
                        })}
                    </motion.div>
                </TabsContent>
            </Tabs>
        </motion.div>
    );
}
