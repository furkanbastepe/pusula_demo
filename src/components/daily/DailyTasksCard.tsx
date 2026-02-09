"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Hammer, Users, Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DailyTask {
    id: string;
    task_type: "learning" | "project" | "community";
    title: string;
    description?: string;
    target_url?: string;
    xp_reward: number;
    completed: boolean;
}

interface DailyTasksCardProps {
    tasks?: DailyTask[];
    onComplete?: (taskId: string) => void;
    className?: string;
}

const TASK_CONFIG = {
    learning: {
        icon: BookOpen,
        label: "Öğrenme",
        color: "text-emerald-400",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
    },
    project: {
        icon: Hammer,
        label: "Proje",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
    },
    community: {
        icon: Users,
        label: "Topluluk",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
    },
} as const;

// Demo tasks for fallback
const DEMO_TASKS: DailyTask[] = [
    {
        id: "1",
        task_type: "learning",
        title: "MicroLab Tamamla",
        description: "Bugün bir MicroLab modülü tamamla",
        target_url: "/ogren",
        xp_reward: 25,
        completed: false,
    },
    {
        id: "2",
        task_type: "project",
        title: "Görev Üzerinde Çalış",
        description: "Aktif görevinde ilerleme kaydet",
        target_url: "/gorevler",
        xp_reward: 30,
        completed: false,
    },
    {
        id: "3",
        task_type: "community",
        title: "Buddy İnceleme Yap",
        description: "Bir arkadaşının çalışmasını incele",
        target_url: "/buddy",
        xp_reward: 30,
        completed: true,
    },
];

export function DailyTasksCard({
    tasks = DEMO_TASKS,
    onComplete,
    className,
}: DailyTasksCardProps) {
    const [localTasks, setLocalTasks] = useState(tasks);
    const completedCount = localTasks.filter((t) => t.completed).length;
    const totalXP = localTasks.reduce((sum, t) => sum + t.xp_reward, 0);
    const earnedXP = localTasks
        .filter((t) => t.completed)
        .reduce((sum, t) => sum + t.xp_reward, 0);

    useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    const handleComplete = (taskId: string) => {
        setLocalTasks((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
        );
        onComplete?.(taskId);
    };

    const progressPercent = (completedCount / localTasks.length) * 100;

    return (
        <Card className={cn("border-zinc-800 bg-zinc-900", className)}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-zinc-50">Bugünün Görevleri</CardTitle>
                    <Badge
                        variant="outline"
                        className={cn(
                            "border-zinc-700 text-xs",
                            completedCount === localTasks.length
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                : "text-zinc-400"
                        )}
                    >
                        {completedCount}/{localTasks.length}
                    </Badge>
                </div>
                {/* Progress Ring */}
                <div className="flex items-center gap-3 pt-2">
                    <div className="relative h-12 w-12">
                        <svg className="h-12 w-12 -rotate-90 transform">
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                className="text-zinc-800"
                            />
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${progressPercent * 1.256} 125.6`}
                                strokeLinecap="round"
                                className={cn(
                                    "transition-all duration-500",
                                    completedCount === localTasks.length ? "text-emerald-400" : "text-cyan-400"
                                )}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {completedCount === localTasks.length ? (
                                <Check className="h-5 w-5 text-emerald-400" />
                            ) : (
                                <span className="text-sm font-bold text-zinc-300">{completedCount}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-1 text-sm text-zinc-400">
                            <Zap className="h-3.5 w-3.5 text-amber-400" />
                            <span>
                                <span className="font-medium text-amber-400">{earnedXP}</span>
                                <span className="text-zinc-500">/{totalXP} XP</span>
                            </span>
                        </div>
                        <p className="text-xs text-zinc-500">
                            {completedCount === localTasks.length
                                ? "Tüm görevler tamamlandı! 🎉"
                                : `${localTasks.length - completedCount} görev kaldı`}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
                {localTasks.map((task) => {
                    const config = TASK_CONFIG[task.task_type];
                    const Icon = config.icon;

                    return (
                        <Link
                            key={task.id}
                            href={task.target_url || "#"}
                            className={cn(
                                "flex items-center gap-3 rounded-lg border p-3 transition-all",
                                task.completed
                                    ? "border-zinc-800 bg-zinc-800/30 opacity-60"
                                    : "border-zinc-800 bg-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-800"
                            )}
                            onClick={(e) => {
                                if (!task.completed && onComplete) {
                                    // Demo: görev tamamlama simülasyonu
                                    // Gerçek uygulamada target_url'e gidecek
                                }
                            }}
                        >
                            <div
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg",
                                    task.completed ? "bg-emerald-500/10" : config.bgColor
                                )}
                            >
                                {task.completed ? (
                                    <Check className="h-4 w-4 text-emerald-400" />
                                ) : (
                                    <Icon className={cn("h-4 w-4", config.color)} />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={cn(
                                            "text-sm font-medium truncate",
                                            task.completed ? "text-zinc-500 line-through" : "text-zinc-200"
                                        )}
                                    >
                                        {task.title}
                                    </span>
                                </div>
                                {task.description && (
                                    <p className="text-xs text-zinc-500 truncate">{task.description}</p>
                                )}
                            </div>
                            <Badge
                                variant="outline"
                                className={cn(
                                    "shrink-0 text-xs",
                                    task.completed
                                        ? "border-emerald-500/20 text-emerald-500"
                                        : "border-amber-500/20 text-amber-400"
                                )}
                            >
                                +{task.xp_reward} XP
                            </Badge>
                        </Link>
                    );
                })}
            </CardContent>
        </Card>
    );
}
