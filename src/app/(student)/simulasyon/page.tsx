"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { useDemo } from "@/lib/DemoContext";
import { SIMULATIONS, SimulationContent } from "@/lib/content/simulations";
import { cn } from "@/lib/utils";

const difficultyConfig = {
    easy: { label: "Kolay", color: "text-green-400", bg: "bg-green-500/20" },
    medium: { label: "Orta", color: "text-yellow-400", bg: "bg-yellow-500/20" },
    hard: { label: "Zor", color: "text-orange-400", bg: "bg-orange-500/20" },
    expert: { label: "Uzman", color: "text-red-400", bg: "bg-red-500/20" },
};

export default function SimulasyonPage() {
    const { state } = useDemo();

    // In a real app, completed simulations would be tracked in state.simulation.history or similar
    // For this demo, we can check if the current active one is completed or just use a mock approach 
    // combined with state.simulation.status if ID matches.
    // But `state.simulation` only tracks ONE active/current simulation state.
    // Let's assume for now "climate-crisis" is the main one we care about for the demo flow.

    // We can also check state.completedTasks if we treat simulations as tasks? No.
    // Let's just use the `state.simulation` to reflect status of the ACTIVE scenario.

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4">
                    <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                        Simülasyon Merkezi
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Gerçek dünya senaryolarında becerilerini test et
                    </p>
                </div>
            </header>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-3 gap-4">
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">
                            {state.simulation?.status === "completed" ? 1 : 0}/{SIMULATIONS.length}
                        </div>
                        <div className="text-xs text-muted-foreground">Tamamlanan</div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-chart-4">
                            {state.xp || 0} {/* XP from engine */}
                        </div>
                        <div className="text-xs text-muted-foreground">Toplam XP</div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-chart-2">
                            {SIMULATIONS.length}
                        </div>
                        <div className="text-xs text-muted-foreground">Senaryo</div>
                    </CardContent>
                </Card>
            </div>

            {/* Simulation Cards */}
            <div className="grid gap-4 md:grid-cols-2">
                {SIMULATIONS.map((sim) => {
                    const difficulty = difficultyConfig[sim.difficulty];

                    // Logic for lock/unlock
                    // For demo: Climate Crisis is unlocked. Others locked.
                    const isUnlocked = sim.id === "climate-crisis" || sim.id === "water-management"; // Allow first two for view
                    // Real logic: const isUnlocked = state.level !== "cirak" || sim.id === "climate-crisis";

                    const isActive = state.simulation?.activeScenarioId === sim.id && state.simulation?.status === "running";
                    const isCompleted = state.simulation?.activeScenarioId === sim.id && state.simulation?.status === "completed";

                    // Force unlock for demo purposes if we want to show UI

                    return (
                        <Card
                            key={sim.id}
                            className={cn(
                                "border-border bg-card/80 backdrop-blur overflow-hidden transition-all",
                                !isUnlocked && "opacity-60 grayscale",
                                isUnlocked && "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5",
                                isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                            )}
                        >
                            <div className={cn("h-3",
                                isCompleted ? "bg-emerald-500" :
                                    isActive ? "bg-blue-500" :
                                        !isUnlocked ? "bg-muted" : "bg-chart-4"
                            )} />

                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "flex h-12 w-12 items-center justify-center rounded-xl",
                                            isCompleted ? "bg-emerald-500/20 text-emerald-500" :
                                                isActive ? "bg-blue-500/20 text-blue-500" :
                                                    "bg-secondary text-muted-foreground"
                                        )}>
                                            <MaterialIcon name={sim.icon} size="lg" />
                                        </div>
                                        <SDGBadge sdg={sim.sdg} variant="small" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge className={cn("border-0", difficulty.bg, difficulty.color)}>
                                            {difficulty.label}
                                        </Badge>
                                        {isCompleted && (
                                            <Badge className="bg-emerald-500/20 text-emerald-500 border-0">
                                                <MaterialIcon name="check" size="sm" className="mr-0.5" />
                                                Tamamlandı
                                            </Badge>
                                        )}
                                        {isActive && (
                                            <Badge className="bg-blue-500/20 text-blue-500 border-0 animate-pulse">
                                                <MaterialIcon name="play_arrow" size="sm" className="mr-0.5" />
                                                Devam Et
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <h3 className="mt-4 font-semibold text-foreground">{sim.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                    {sim.description}
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MaterialIcon name="business" size="sm" />
                                        {sim.scenario}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MaterialIcon name="schedule" size="sm" />
                                        {sim.duration}
                                    </span>
                                    <span className="flex items-center gap-1 text-primary">
                                        <MaterialIcon name="star" size="sm" />
                                        {sim.xp} XP
                                    </span>
                                </div>

                                <Link href={!isUnlocked ? "#" : `/simulasyon/${sim.id}`} className={cn(!isUnlocked && "pointer-events-none")}>
                                    <Button
                                        className={cn(
                                            "mt-4 w-full",
                                            !isUnlocked && "bg-secondary text-muted-foreground cursor-not-allowed",
                                            isUnlocked && !isActive && !isCompleted && "bg-primary text-black hover:bg-primary/90",
                                            isActive && "bg-blue-600 text-white hover:bg-blue-500",
                                            isCompleted && "bg-secondary text-foreground hover:bg-secondary/80"
                                        )}
                                        disabled={!isUnlocked}
                                    >
                                        {!isUnlocked ? (
                                            <>
                                                <MaterialIcon name="lock" size="sm" className="mr-1.5" />
                                                Kilitli
                                            </>
                                        ) : isCompleted ? (
                                            <>
                                                <MaterialIcon name="refresh" size="sm" className="mr-1.5" />
                                                Tekrar Oyna
                                            </>
                                        ) : isActive ? (
                                            <>
                                                <MaterialIcon name="play_arrow" size="sm" className="mr-1.5" />
                                                Devam Et
                                            </>
                                        ) : (
                                            <>
                                                <MaterialIcon name="play_arrow" size="sm" className="mr-1.5" />
                                                Başla
                                            </>
                                        )}
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
