"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { useDemo } from "@/lib/DemoContext";
import { MICROLABS, MicroLabContent } from "@/lib/content/microlabs";
import { cn } from "@/lib/utils";

export default function OgrenPage() {
    const { state } = useDemo();
    const [activePhase, setActivePhase] = useState<"discovery" | "build" | "impact">("discovery");

    // Filter modules by phase
    const discoveryModules = MICROLABS.filter(m => m.phase === "discovery");
    const buildModules = MICROLABS.filter(m => m.phase === "build");
    const impactModules = MICROLABS.filter(m => m.phase === "impact");

    // Organize modules by phase for UI
    const phases = [
        {
            id: "discovery",
            title: "Keşif",
            subtitle: "Problem Anlama",
            icon: "search",
            color: "text-blue-400",
            bgColor: "bg-blue-500/20",
            modules: discoveryModules,
            progress: Math.round((state.completedMicrolabs.filter(id => discoveryModules.find(m => m.id === id)).length / discoveryModules.length) * 100) || 0
        },
        {
            id: "build",
            title: "İnşa",
            subtitle: "Çözüm Geliştirme",
            icon: "construction",
            color: "text-amber-400",
            bgColor: "bg-amber-500/20",
            modules: buildModules,
            progress: Math.round((state.completedMicrolabs.filter(id => buildModules.find(m => m.id === id)).length / buildModules.length) * 100) || 0
        },
        {
            id: "impact",
            title: "Etki",
            subtitle: "Sonuç ve Sunum",
            icon: "campaign",
            color: "text-purple-400",
            bgColor: "bg-purple-500/20",
            modules: impactModules,
            progress: Math.round((state.completedMicrolabs.filter(id => impactModules.find(m => m.id === id)).length / impactModules.length) * 100) || 0
        },
    ];

    const totalProgress = Math.round((state.completedMicrolabs.length / MICROLABS.length) * 100);

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                            Müfredat
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Keşif → İnşa → Etki yolculuğunda ilerle
                        </p>
                    </div>

                    {/* Overall Progress */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground">Toplam İlerleme</div>
                            <div className="text-2xl font-bold text-emerald-400">{totalProgress}%</div>
                        </div>
                        <div className="relative h-12 w-12">
                            <svg viewBox="0 0 36 36" className="rotate-[-90deg] h-full w-full">
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="text-secondary"
                                />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeDasharray={`${totalProgress}, 100`}
                                    className="text-emerald-400 transition-all duration-1000 ease-out"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            {/* Phase Tabs */}
            <Tabs value={activePhase} onValueChange={(v) => setActivePhase(v as any)} className="mb-6">
                <TabsList className="grid w-full grid-cols-3 bg-card/50">
                    {phases.map((phase) => (
                        <TabsTrigger
                            key={phase.id}
                            value={phase.id}
                            className="flex items-center gap-2 data-[state=active]:bg-secondary/50 data-[state=active]:text-foreground"
                        >
                            <MaterialIcon name={phase.icon} size="sm" className={phase.color} />
                            <span className="hidden sm:inline">{phase.title}</span>
                            <span className="sm:hidden">{phase.title.slice(0, 3)}</span>
                            {phase.progress === 100 && (
                                <MaterialIcon name="check_circle" size="sm" className="text-emerald-400" />
                            )}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Modules Grid - 2/3 */}
                <div className="space-y-6 lg:col-span-2">
                    {phases
                        .filter((p) => p.id === activePhase)
                        .map((phase) => (
                            <div key={phase.id} className="space-y-4">
                                {/* Phase Header */}
                                <Card className="border-border bg-card/80 backdrop-blur">
                                    <CardContent className="flex items-center gap-4 p-4">
                                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${phase.bgColor}`}>
                                            <MaterialIcon name={phase.icon} size="xl" className={phase.color} />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="font-display text-xl font-bold text-foreground">
                                                {phase.title}: {phase.subtitle}
                                            </h2>
                                            <div className="mt-2 flex items-center gap-4">
                                                <Progress value={phase.progress} className="h-2 flex-1 bg-secondary" />
                                                <span className="text-sm font-semibold text-foreground">{phase.progress}%</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Module Cards */}
                                {phase.modules.map((module, idx) => {
                                    const isCompleted = state.completedMicrolabs.includes(module.id);
                                    // Logic for 'current': First incomplete module in the phase
                                    // If all completed, last one is technically done but let's keep it accessible
                                    const firstIncompleteIdx = phase.modules.findIndex(m => !state.completedMicrolabs.includes(m.id));

                                    // If all are complete, firstIncompleteIdx is -1.
                                    // Then isCurrent shouldn't match any idx if we strictly follow "next one is current"
                                    // BUT, we might want to highlight something? 
                                    // Let's say if all complete, nothing is "current" in the sense of "next to do", 
                                    // or maybe the last one is just "done".

                                    const isCurrent = (firstIncompleteIdx !== -1 && idx === firstIncompleteIdx);

                                    // Lock logic: 
                                    // If it's incomplete AND it's NOT the current one (meaning it's further down the list), it's locked.
                                    // BUT, we should only look at "first incomplete". 
                                    // So if I am at index 2, and index 0 is incomplete, index 2 is locked.
                                    // if index 0 is complete, index 1 is incomplete (current), index 2 is locked.
                                    const isLocked = !isCompleted && !isCurrent;

                                    return (
                                        <Card
                                            key={module.id}
                                            className={cn(
                                                "border-border bg-card/80 backdrop-blur transition-all",
                                                isCurrent && "ring-1 ring-emerald-500/50 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]",
                                                isLocked && "opacity-50 grayscale"
                                            )}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className={cn(
                                                            "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                                                            isCompleted ? "bg-emerald-500/20 text-emerald-400" :
                                                                isCurrent ? "bg-emerald-500 text-black" :
                                                                    "bg-secondary text-muted-foreground"
                                                        )}>
                                                            {isCompleted ? (
                                                                <MaterialIcon name="check_circle" />
                                                            ) : isLocked ? (
                                                                <MaterialIcon name="lock" />
                                                            ) : (
                                                                <span className="font-bold">{idx + 1}</span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-foreground">{module.title}</h3>
                                                            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{module.description}</p>
                                                            <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                                                                <span className="flex items-center gap-1">
                                                                    <MaterialIcon name="schedule" size="sm" />
                                                                    {module.duration}
                                                                </span>
                                                                <Badge variant="outline" className="text-xs border-white/10">
                                                                    {module.xp} XP
                                                                </Badge>
                                                                {module.tags?.slice(0, 1).map(tag => (
                                                                    <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50 text-muted-foreground">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Link href={`/microlab/${module.id}`} className={cn(isLocked && "pointer-events-none")}>
                                                        <Button
                                                            size="sm"
                                                            disabled={isLocked}
                                                            className={cn(
                                                                isCurrent
                                                                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                                                                    : isCompleted
                                                                        ? "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                                                        : "bg-secondary text-foreground hover:bg-secondary/80"
                                                            )}
                                                        >
                                                            {isCurrent ? "Başla" : isCompleted ? "Tekrar" : "Kilitli"}
                                                            {!isLocked && <MaterialIcon name="chevron_right" size="sm" className="ml-1" />}
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        ))}
                </div>

                {/* Right Sidebar - 1/3 */}
                <div className="space-y-6">
                    {/* SDG Connection - Dynamic from state/scenario */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MaterialIcon name="public" className="text-blue-400" />
                                SDG Bağlantısı
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center">
                                <SDGBadge sdg={state.sdg || 4} variant="large" showName className="w-full justify-center" />
                                <p className="mt-3 text-center text-sm text-muted-foreground">
                                    Müfredatın, seçtiğin bu Sürdürülebilir Kalkınma Hedefi ile uyumlu projeler içeriyor.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4">
                            <div className="space-y-2">
                                <Link href="/harita">
                                    <Button variant="outline" className="w-full justify-start border-border hover:border-primary">
                                        <MaterialIcon name="map" size="sm" className="mr-2 text-chart-2" />
                                        Öğrenme Haritası
                                    </Button>
                                </Link>
                                <Link href="/simulasyon">
                                    <Button variant="outline" className="w-full justify-start border-border hover:border-primary">
                                        <MaterialIcon name="science" size="sm" className="mr-2 text-chart-3" />
                                        Simülasyona Git
                                    </Button>
                                </Link>
                                <Link href="/gorevler">
                                    <Button variant="outline" className="w-full justify-start border-border hover:border-primary">
                                        <MaterialIcon name="assignment" size="sm" className="mr-2 text-chart-4" />
                                        Görevler
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
