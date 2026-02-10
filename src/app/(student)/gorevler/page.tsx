"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { useDemo } from "@/lib/DemoContext";
import { TASKS, TaskContent } from "@/lib/content/tasks";
import { cn } from "@/lib/utils";

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

const difficultyConfig = {
    Kolay: { label: "Kolay", color: "text-green-400", bg: "bg-green-500/20" },
    Orta: { label: "Orta", color: "text-yellow-400", bg: "bg-yellow-500/20" },
    Zor: { label: "Zor", color: "text-red-400", bg: "bg-red-500/20" },
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
    const { state } = useDemo();
    const [activeTab, setActiveTab] = useState("active");

    const filteredTasks = TASKS.filter((task) => {
        const isCompleted = state.completedTasks.includes(task.id);

        if (activeTab === "active") {
            return !isCompleted;
        } else if (activeTab === "completed") {
            return isCompleted;
        }
        return false;
    });

    const stats = {
        total: TASKS.length,
        completed: state.completedTasks.length,
        inProgress: TASKS.length - state.completedTasks.length,
        totalXP: TASKS.filter(t => state.completedTasks.includes(t.id)).reduce((a, t) => a + t.xp, 0),
        pendingXP: TASKS.filter(t => !state.completedTasks.includes(t.id)).reduce((a, t) => a + t.xp, 0),
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-hero p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Page Header */}
            <motion.header className="mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Breadcrumb />
                <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">Görevler</h1>
                        <p className="mt-1 text-muted-foreground">XP kazan, seviye atla, portföyünü zenginleştir</p>
                    </div>
                </div>
            </motion.header>

            {/* Stats Cards */}
            <motion.div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4" variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeInUp}>
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4 flex items-center gap-3">
                            <MaterialIcon name="task_alt" className="text-primary h-10 w-10 p-2 bg-primary/20 rounded-lg" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.completed}/{stats.total}</div>
                                <div className="text-xs text-muted-foreground">Tamamlanan</div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={fadeInUp}>
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4 flex items-center gap-3">
                            <MaterialIcon name="pending" className="text-blue-400 h-10 w-10 p-2 bg-blue-500/20 rounded-lg" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
                                <div className="text-xs text-muted-foreground">Bekleyen</div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={fadeInUp}>
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4 flex items-center gap-3">
                            <MaterialIcon name="star" className="text-chart-4 h-10 w-10 p-2 bg-chart-4/20 rounded-lg" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.totalXP}</div>
                                <div className="text-xs text-muted-foreground">Kazanılan XP</div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={fadeInUp}>
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4 flex items-center gap-3">
                            <MaterialIcon name="emoji_events" className="text-purple-400 h-10 w-10 p-2 bg-purple-500/20 rounded-lg" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.pendingXP}</div>
                                <div className="text-xs text-muted-foreground">Potansiyel XP</div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Tabs */}
            <div className="mb-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-card/50">
                        <TabsTrigger value="active" className="data-[state=active]:bg-primary/20">
                            <MaterialIcon name="pending_actions" size="sm" className="mr-1.5" />
                            Aktif Görevler
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="data-[state=active]:bg-primary/20">
                            <MaterialIcon name="check_circle" size="sm" className="mr-1.5" />
                            Tamamlananlar
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Task Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => {
                        const difficulty = difficultyConfig[task.difficulty];
                        const isCompleted = state.completedTasks.includes(task.id);

                        return (
                            <AnimatedCard key={task.id} index={index}>
                                <Card className="border-border bg-card/80 backdrop-blur hover:border-primary/50 transition-all h-full">
                                    <CardContent className="p-4 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge className={cn("border-0", difficulty?.bg, difficulty?.color)}>
                                                {difficulty?.label || "Normal"}
                                            </Badge>
                                            {isCompleted && <MaterialIcon name="check_circle" className="text-emerald-500" />}
                                        </div>

                                        <h3 className="font-semibold text-foreground text-lg mb-2">{task.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">{task.description}</p>

                                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-border/50">
                                            <span className="flex items-center gap-1 text-primary font-medium">
                                                <MaterialIcon name="star" size="sm" /> {task.xp} XP
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MaterialIcon name="schedule" size="sm" /> {task.deadline}
                                            </span>
                                        </div>

                                        <Link href={`/gorev/${task.id}`} className="mt-4 block">
                                            <Button className={cn("w-full", isCompleted ? "bg-secondary text-foreground hover:bg-secondary/80" : "bg-primary text-black hover:bg-primary/90")}>
                                                {isCompleted ? "Detayları Gör" : "Görevi Görüntüle"}
                                                <MaterialIcon name="chevron_right" className="ml-1" size="sm" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </AnimatedCard>
                        );
                    })
                ) : (
                    <div className="col-span-full py-12 text-center text-muted-foreground bg-card/30 rounded-xl border border-dashed border-border">
                        <MaterialIcon name="inbox" size="xl" className="mb-2 opacity-50" />
                        <p>{activeTab === "active" ? "Aktif görev bulunmuyor. Harika gidiyorsun!" : "Henüz tamamlanan görev yok."}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
