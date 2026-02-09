"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Mock simulation paths
const paths = [
    {
        id: "climate-crisis",
        title: "İklim Krizi Senaryosu",
        description: "2050 yılına kadar şehir içi karbon emisyonlarını azaltma stratejileri geliştir",
        sdg: 13,
        difficulty: "medium",
        duration: "45-60 dk",
        xp: 300,
        status: "available",
        progress: 0,
        icon: "eco",
        scenario: "Eskişehir Belediyesi",
    },
    {
        id: "water-management",
        title: "Su Yönetimi Simülasyonu",
        description: "Kuraklık döneminde su kaynaklarını yönet ve adil dağıtım sağla",
        sdg: 6,
        difficulty: "hard",
        duration: "60-90 dk",
        xp: 500,
        status: "locked",
        progress: 0,
        icon: "water_drop",
        scenario: "Bölgesel Su İdaresi",
    },
    {
        id: "equality-workplace",
        title: "İş Yeri Eşitliği",
        description: "Cinsiyet eşitliğini destekleyen kurum politikaları tasarla",
        sdg: 5,
        difficulty: "medium",
        duration: "30-45 dk",
        xp: 250,
        status: "completed",
        progress: 100,
        icon: "diversity_3",
        scenario: "Tech Startup",
    },
    {
        id: "sustainable-city",
        title: "Sürdürülebilir Şehir",
        description: "2040 vizyonuyla akıllı şehir altyapısı planla",
        sdg: 11,
        difficulty: "expert",
        duration: "90-120 dk",
        xp: 750,
        status: "locked",
        progress: 0,
        icon: "location_city",
        scenario: "Şehir Planlama Bakanlığı",
    },
];

const difficultyConfig = {
    easy: { label: "Kolay", color: "text-green-400", bg: "bg-green-500/20" },
    medium: { label: "Orta", color: "text-yellow-400", bg: "bg-yellow-500/20" },
    hard: { label: "Zor", color: "text-orange-400", bg: "bg-orange-500/20" },
    expert: { label: "Uzman", color: "text-red-400", bg: "bg-red-500/20" },
};

const completedCount = paths.filter((p) => p.status === "completed").length;
const totalXP = paths.reduce((acc, p) => p.status === "completed" ? acc + p.xp : acc, 0);

export default function SimulasyonPage() {
    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
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
                        <div className="text-2xl font-bold text-primary">{completedCount}/{paths.length}</div>
                        <div className="text-xs text-muted-foreground">Tamamlanan</div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-chart-4">{totalXP}</div>
                        <div className="text-xs text-muted-foreground">Kazanılan XP</div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-chart-2">
                            {paths.filter((p) => p.status === "available").length}
                        </div>
                        <div className="text-xs text-muted-foreground">Kullanılabilir</div>
                    </CardContent>
                </Card>
            </div>

            {/* Simulation Cards */}
            <div className="grid gap-4 md:grid-cols-2">
                {paths.map((path) => {
                    const difficulty = difficultyConfig[path.difficulty as keyof typeof difficultyConfig];
                    const isLocked = path.status === "locked";
                    const isCompleted = path.status === "completed";

                    return (
                        <Card
                            key={path.id}
                            className={`border-border bg-card/80 backdrop-blur overflow-hidden transition-all ${isLocked ? "opacity-60" : "hover:-translate-y-1"
                                } ${isCompleted ? "border-primary/30" : ""}`}
                        >
                            {/* Header Gradient */}
                            <div className={`h-3 ${isCompleted ? "bg-primary" : isLocked ? "bg-muted" : "bg-chart-4"
                                }`} />

                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isCompleted ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                                            }`}>
                                            <MaterialIcon name={path.icon} size="lg" />
                                        </div>
                                        <SDGBadge sdg={path.sdg} variant="small" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge className={`${difficulty.bg} ${difficulty.color} border-0`}>
                                            {difficulty.label}
                                        </Badge>
                                        {isCompleted && (
                                            <Badge className="bg-primary/20 text-primary border-0">
                                                <MaterialIcon name="check" size="sm" className="mr-0.5" />
                                                Tamamlandı
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <h3 className="mt-4 font-semibold text-foreground">{path.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                    {path.description}
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MaterialIcon name="business" size="sm" />
                                        {path.scenario}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MaterialIcon name="schedule" size="sm" />
                                        {path.duration}
                                    </span>
                                    <span className="flex items-center gap-1 text-primary">
                                        <MaterialIcon name="star" size="sm" />
                                        {path.xp} XP
                                    </span>
                                </div>

                                {isCompleted && (
                                    <div className="mt-3">
                                        <Progress value={100} className="h-1.5 bg-secondary" />
                                    </div>
                                )}

                                <Link href={isLocked ? "#" : `/simulasyon/${path.id}`}>
                                    <Button
                                        className={`mt-4 w-full ${isLocked
                                                ? "bg-secondary text-muted-foreground cursor-not-allowed"
                                                : isCompleted
                                                    ? "bg-secondary text-foreground hover:bg-secondary/80"
                                                    : "bg-primary text-black hover:bg-primary/90"
                                            }`}
                                        disabled={isLocked}
                                    >
                                        {isLocked ? (
                                            <>
                                                <MaterialIcon name="lock" size="sm" className="mr-1.5" />
                                                Kilitli
                                            </>
                                        ) : isCompleted ? (
                                            <>
                                                <MaterialIcon name="refresh" size="sm" className="mr-1.5" />
                                                Tekrar Oyna
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
