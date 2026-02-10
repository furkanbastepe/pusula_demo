"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { useDemo } from "@/lib/DemoContext";
import { CAREER_PATHS } from "@/lib/content/path-packs";
import { cn } from "@/lib/utils";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function OgrenPage() {
    const { state } = useDemo();
    const activePathId = state.onboarding?.primaryPath;

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
            <header className="mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="font-display text-3xl font-bold text-foreground">Akademi</h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Kariyer yolunu seç, yeteneklerini geliştir ve sertifikanı al.
                    </p>
                </motion.div>
            </header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {CAREER_PATHS.map((path) => {
                    const isActive = path.id === activePathId;
                    const progress = isActive ? 15 : 0; // Mock progress for demo

                    return (
                        <motion.div key={path.id} variants={item}>
                            <Card className={cn(
                                "h-full border-2 transition-all duration-300 hover:shadow-lg overflow-hidden group relative flex flex-col",
                                isActive
                                    ? "border-emerald-500/50 bg-emerald-950/10 ring-1 ring-emerald-500/20"
                                    : "border-border bg-card/50 hover:border-emerald-500/30 hover:bg-card/80"
                            )}>
                                {isActive && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/20">
                                            <MaterialIcon name="verified" size="sm" />
                                            Seçili Yol
                                        </span>
                                    </div>
                                )}

                                <CardHeader className="pb-4">
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors shadow-inner",
                                        isActive ? "bg-emerald-500 text-black" : `bg-secondary text-${path.color.replace('text-', '')} group-hover:bg-secondary/80`
                                    )}>
                                        <MaterialIcon name={path.icon} size="lg" className={!isActive ? path.color : ""} />
                                    </div>
                                    <CardTitle className="font-display text-xl">{path.title}</CardTitle>
                                    <CardDescription className="line-clamp-2 text-base mt-2">{path.description}</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6 flex-1 flex flex-col justify-end">
                                    {isActive ? (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-emerald-400 font-medium">İlerleme</span>
                                                <span className="font-bold text-emerald-400">{progress}%</span>
                                            </div>
                                            <Progress value={progress} className="h-2 bg-emerald-950/30 [&>div]:bg-emerald-500" />
                                        </div>
                                    ) : (
                                        <div className="h-2" /> /* Spacer to keep alignment */
                                    )}

                                    <div className="space-y-3 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                            <div className="p-1 rounded bg-secondary/50"><MaterialIcon name="school" size="sm" /></div>
                                            <span>{path.microlabs.length} MicroLab</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                            <div className="p-1 rounded bg-secondary/50"><MaterialIcon name="task" size="sm" /></div>
                                            <span>{path.tasks.length} Görev</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                            <div className="p-1 rounded bg-secondary/50"><MaterialIcon name="emoji_events" size="sm" /></div>
                                            <span className={cn("font-medium", path.color)}>{path.finalProject}</span>
                                        </div>
                                    </div>

                                    <Button
                                        className={cn(
                                            "w-full font-bold mt-4 transition-all",
                                            isActive
                                                ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
                                                : "bg-secondary text-foreground hover:bg-secondary/80"
                                        )}
                                        variant={isActive ? "default" : "secondary"}
                                        asChild
                                    >
                                        <Link href={isActive ? `/microlab/${path.microlabs[0]}` : "#"}>
                                            {isActive ? (
                                                <>
                                                    Devam Et
                                                    <MaterialIcon name="arrow_forward" size="sm" className="ml-2" />
                                                </>
                                            ) : (
                                                "İncele"
                                            )}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
