"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { LevelBadge } from "@/components/common/LevelBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Learning map data - phases and modules
const phases = [
    {
        id: "kesif",
        name: "Keşif",
        description: "Problemi anla, araştır, keşfet",
        color: "bg-chart-2",
        borderColor: "border-chart-2",
        textColor: "text-chart-2",
        icon: "search",
        status: "completed",
        progress: 100,
    },
    {
        id: "insa",
        name: "İnşa",
        description: "Çözüm tasarla, prototiple, test et",
        color: "bg-chart-3",
        borderColor: "border-chart-3",
        textColor: "text-chart-3",
        icon: "construction",
        status: "current",
        progress: 45,
    },
    {
        id: "etki",
        name: "Etki",
        description: "Sunum yap, başlat, ölç",
        color: "bg-primary",
        borderColor: "border-primary",
        textColor: "text-primary",
        icon: "rocket_launch",
        status: "locked",
        progress: 0,
    },
];

const currentPhase = phases.find((p) => p.status === "current")!;

const modules = [
    // Keşif phase modules
    {
        id: "m1",
        phase: "kesif",
        title: "Problem Keşfi",
        description: "SDG problemini tanı ve belgele",
        lessons: 4,
        completedLessons: 4,
        xp: 200,
        status: "completed",
        icon: "lightbulb",
    },
    {
        id: "m2",
        phase: "kesif",
        title: "Kullanıcı Araştırması",
        description: "Etkilenen kitleyi anla",
        lessons: 3,
        completedLessons: 3,
        xp: 150,
        status: "completed",
        icon: "people",
    },
    {
        id: "m3",
        phase: "kesif",
        title: "Veri Analizi",
        description: "Sayılarla problem boyutunu ölç",
        lessons: 5,
        completedLessons: 5,
        xp: 250,
        status: "completed",
        icon: "bar_chart",
    },
    // İnşa phase modules
    {
        id: "m4",
        phase: "insa",
        title: "Çözüm Tasarımı",
        description: "Fikrin iskeletini çiz",
        lessons: 4,
        completedLessons: 3,
        xp: 200,
        status: "in_progress",
        icon: "draw",
    },
    {
        id: "m5",
        phase: "insa",
        title: "Prototipleme",
        description: "İlk versiyonu oluştur",
        lessons: 5,
        completedLessons: 1,
        xp: 300,
        status: "in_progress",
        icon: "widgets",
    },
    {
        id: "m6",
        phase: "insa",
        title: "Test & İterasyon",
        description: "Geri bildirim al ve geliştir",
        lessons: 4,
        completedLessons: 0,
        xp: 200,
        status: "unlocked",
        icon: "refresh",
    },
    // Etki phase modules
    {
        id: "m7",
        phase: "etki",
        title: "Pitch Hazırlığı",
        description: "Hikayeni anlat",
        lessons: 3,
        completedLessons: 0,
        xp: 200,
        status: "locked",
        icon: "present_to_all",
    },
    {
        id: "m8",
        phase: "etki",
        title: "Demo Günü",
        description: "Projeyi sun",
        lessons: 2,
        completedLessons: 0,
        xp: 400,
        status: "locked",
        icon: "celebration",
    },
    {
        id: "m9",
        phase: "etki",
        title: "Etki Ölçümü",
        description: "Başarını belgele",
        lessons: 3,
        completedLessons: 0,
        xp: 250,
        status: "locked",
        icon: "trending_up",
    },
];

const totalXP = modules.reduce((acc, m) => acc + m.xp, 0);
const earnedXP = modules
    .filter((m) => m.status === "completed")
    .reduce((acc, m) => acc + m.xp, 0);

export default function HaritaPage() {
    const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

    const getModuleColor = (status: string) => {
        switch (status) {
            case "completed":
                return "border-primary bg-primary/10";
            case "in_progress":
                return "border-chart-4 bg-chart-4/10";
            case "unlocked":
                return "border-border bg-card/80";
            case "locked":
                return "border-border/50 bg-card/50 opacity-60";
            default:
                return "border-border bg-card/80";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4">
                    <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                        Öğrenme Haritası
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Keşif → İnşa → Etki yolculuğunda nerede olduğunu gör
                    </p>
                </div>
            </header>

            {/* Progress Overview */}
            <Card className="mb-6 border-border bg-card/80 backdrop-blur">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Toplam İlerleme</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">
                                    {Math.round((earnedXP / totalXP) * 100)}%
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    ({earnedXP}/{totalXP} XP)
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LevelBadge level="kalfa" variant="medium" />
                            <SDGBadge sdg={13} variant="medium" />
                        </div>
                    </div>
                    <Progress value={(earnedXP / totalXP) * 100} className="mt-4 h-2 bg-secondary" />
                </CardContent>
            </Card>

            {/* Phase Timeline */}
            <div className="mb-8 flex items-center justify-between gap-2 px-2">
                {phases.map((phase, index) => (
                    <div key={phase.id} className="flex flex-1 items-center">
                        <button
                            onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                            className={`relative flex flex-col items-center transition-all ${selectedPhase === phase.id ? "scale-110" : ""
                                }`}
                        >
                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-full border-4 ${phase.status === "completed"
                                        ? `${phase.borderColor} ${phase.color}`
                                        : phase.status === "current"
                                            ? `${phase.borderColor} bg-card`
                                            : "border-border bg-card/50"
                                    }`}
                            >
                                <MaterialIcon
                                    name={phase.status === "completed" ? "check" : phase.icon}
                                    size="lg"
                                    className={
                                        phase.status === "completed"
                                            ? "text-black"
                                            : phase.status === "current"
                                                ? phase.textColor
                                                : "text-muted-foreground"
                                    }
                                />
                            </div>
                            <span
                                className={`mt-2 text-sm font-medium ${phase.status === "locked" ? "text-muted-foreground" : "text-foreground"
                                    }`}
                            >
                                {phase.name}
                            </span>
                            {phase.status === "current" && (
                                <Badge className="mt-1 bg-chart-4/20 text-chart-4 border-0">
                                    %{phase.progress}
                                </Badge>
                            )}
                        </button>
                        {index < phases.length - 1 && (
                            <div
                                className={`mx-2 h-1 flex-1 rounded ${phases[index + 1].status !== "locked" || phase.status === "completed"
                                        ? phase.color
                                        : "bg-border"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Current Phase Highlight */}
            <Card className={`mb-6 border-2 ${currentPhase.borderColor} bg-card/80 backdrop-blur`}>
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${currentPhase.color}`}>
                            <MaterialIcon name={currentPhase.icon} size="lg" className="text-black" />
                        </div>
                        <div className="flex-1">
                            <h2 className="font-display text-lg font-semibold text-foreground">
                                Şu an: {currentPhase.name} Fazı
                            </h2>
                            <p className="text-sm text-muted-foreground">{currentPhase.description}</p>
                        </div>
                        <div className="text-right">
                            <span className={`text-2xl font-bold ${currentPhase.textColor}`}>
                                {currentPhase.progress}%
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Module Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {modules
                    .filter((m) => !selectedPhase || m.phase === selectedPhase)
                    .map((module) => {
                        const phase = phases.find((p) => p.id === module.phase)!;
                        const isLocked = module.status === "locked";
                        const progress = (module.completedLessons / module.lessons) * 100;

                        return (
                            <Link
                                key={module.id}
                                href={isLocked ? "#" : `/microlab/${module.id}`}
                                className={isLocked ? "pointer-events-none" : ""}
                            >
                                <Card
                                    className={`h-full transition-all hover:-translate-y-1 ${getModuleColor(module.status)}`}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${module.status === "completed"
                                                        ? "bg-primary/20 text-primary"
                                                        : module.status === "in_progress"
                                                            ? "bg-chart-4/20 text-chart-4"
                                                            : "bg-secondary text-muted-foreground"
                                                    }`}
                                            >
                                                <MaterialIcon name={module.icon} />
                                            </div>
                                            <Badge className={`${phase.color} text-black border-0`}>
                                                {phase.name}
                                            </Badge>
                                        </div>

                                        <h3 className="mt-3 font-semibold text-foreground">{module.title}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                            {module.description}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                {module.completedLessons}/{module.lessons} ders
                                            </span>
                                            <span className="flex items-center gap-1 text-primary">
                                                <MaterialIcon name="star" size="sm" />
                                                {module.xp} XP
                                            </span>
                                        </div>

                                        <Progress value={progress} className="mt-2 h-1.5 bg-secondary" />
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}
