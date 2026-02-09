"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Mock curriculum data
const phases = [
    {
        id: "kesif",
        title: "Keşif",
        subtitle: "Problem Anlama",
        icon: "search",
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
        progress: 100,
        modules: [
            { id: "m1", title: "SDG ve Problemler", lessons: 5, done: 5, duration: "2 saat" },
            { id: "m2", title: "Araştırma Teknikleri", lessons: 4, done: 4, duration: "1.5 saat" },
        ],
    },
    {
        id: "insa",
        title: "İnşa",
        subtitle: "Çözüm Geliştirme",
        icon: "construction",
        color: "text-primary",
        bgColor: "bg-primary/20",
        progress: 35,
        modules: [
            { id: "m3", title: "Veri Toplama & Doğrulama", lessons: 6, done: 2, duration: "3 saat", current: true },
            { id: "m4", title: "Prototipleme", lessons: 5, done: 0, duration: "4 saat" },
            { id: "m5", title: "Test & İterasyon", lessons: 4, done: 0, duration: "2 saat" },
        ],
    },
    {
        id: "etki",
        title: "Etki",
        subtitle: "Sonuç ve Sunum",
        icon: "campaign",
        color: "text-purple-400",
        bgColor: "bg-purple-500/20",
        progress: 0,
        modules: [
            { id: "m6", title: "Hikaye Anlatımı", lessons: 4, done: 0, duration: "2 saat" },
            { id: "m7", title: "Demo Hazırlığı", lessons: 3, done: 0, duration: "2 saat" },
            { id: "m8", title: "Sunum Teknikleri", lessons: 4, done: 0, duration: "1.5 saat" },
        ],
    },
];

const recommendedLessons = [
    { id: "l1", title: "Veri Görselleştirme Temelleri", duration: "15 dk", type: "video" },
    { id: "l2", title: "Grafik Oluşturma Atölyesi", duration: "30 dk", type: "lab" },
    { id: "l3", title: "İnfografik Tasarımı", duration: "20 dk", type: "reading" },
];

export default function OgrenPage() {
    const [activePhase, setActivePhase] = useState("insa");

    const totalProgress = phases.reduce((acc, p) => acc + p.progress, 0) / phases.length;

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
                            <div className="text-2xl font-bold text-primary">{Math.round(totalProgress)}%</div>
                        </div>
                        <div className="h-12 w-12">
                            <svg viewBox="0 0 36 36" className="rotate-[-90deg]">
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
                                    className="text-primary"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            {/* Phase Tabs */}
            <Tabs value={activePhase} onValueChange={setActivePhase} className="mb-6">
                <TabsList className="grid w-full grid-cols-3 bg-card/50">
                    {phases.map((phase) => (
                        <TabsTrigger
                            key={phase.id}
                            value={phase.id}
                            className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-foreground"
                        >
                            <MaterialIcon name={phase.icon} size="sm" className={phase.color} />
                            <span className="hidden sm:inline">{phase.title}</span>
                            <span className="sm:hidden">{phase.title.slice(0, 3)}</span>
                            {phase.progress === 100 && (
                                <MaterialIcon name="check_circle" size="sm" className="text-primary" />
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
                                {phase.modules.map((module, idx) => (
                                    <Card
                                        key={module.id}
                                        className={`border-border bg-card/80 backdrop-blur transition-all ${module.current ? "ring-2 ring-primary glow-green" : ""
                                            } ${module.done === module.lessons ? "opacity-60" : ""}`}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-4">
                                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${module.done === module.lessons
                                                            ? "bg-primary/20 text-primary"
                                                            : module.current
                                                                ? "bg-primary text-black"
                                                                : "bg-secondary text-muted-foreground"
                                                        }`}>
                                                        {module.done === module.lessons ? (
                                                            <MaterialIcon name="check_circle" />
                                                        ) : module.current ? (
                                                            <MaterialIcon name="play_arrow" />
                                                        ) : (
                                                            <span className="font-bold">{idx + 1}</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-foreground">{module.title}</h3>
                                                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <MaterialIcon name="menu_book" size="sm" />
                                                                {module.done}/{module.lessons} ders
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <MaterialIcon name="schedule" size="sm" />
                                                                {module.duration}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link href={`/microlab/${module.id}`}>
                                                    <Button
                                                        size="sm"
                                                        className={
                                                            module.current
                                                                ? "bg-primary text-black hover:bg-primary/90"
                                                                : module.done === module.lessons
                                                                    ? "bg-secondary text-muted-foreground"
                                                                    : "bg-secondary text-foreground hover:bg-secondary/80"
                                                        }
                                                    >
                                                        {module.current ? "Devam Et" : module.done === module.lessons ? "Tekrar" : "Başla"}
                                                        <MaterialIcon name="chevron_right" size="sm" className="ml-1" />
                                                    </Button>
                                                </Link>
                                            </div>

                                            {/* Progress for current module */}
                                            {module.current && (
                                                <div className="mt-4">
                                                    <Progress value={(module.done / module.lessons) * 100} className="h-1.5 bg-secondary" />
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ))}
                </div>

                {/* Right Sidebar - 1/3 */}
                <div className="space-y-6">
                    {/* SDG Connection */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MaterialIcon name="public" className="text-chart-2" />
                                SDG Bağlantısı
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SDGBadge sdg={13} variant="large" showName />
                            <p className="mt-3 text-sm text-muted-foreground">
                                Bu eğitim programı BM Sürdürülebilir Kalkınma Hedefi 13: İklim Eylemi ile ilişkilidir.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Recommended Next */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MaterialIcon name="lightbulb" className="text-chart-4" />
                                Önerilen Dersler
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recommendedLessons.map((lesson) => (
                                    <Link key={lesson.id} href={`/microlab/${lesson.id}`}>
                                        <div className="group flex items-center gap-3 rounded-lg bg-secondary/30 p-3 transition-all hover:bg-secondary/50">
                                            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${lesson.type === "video" ? "bg-red-500/20 text-red-400" :
                                                    lesson.type === "lab" ? "bg-green-500/20 text-green-400" :
                                                        "bg-blue-500/20 text-blue-400"
                                                }`}>
                                                <MaterialIcon
                                                    name={lesson.type === "video" ? "play_circle" : lesson.type === "lab" ? "science" : "menu_book"}
                                                    size="sm"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                                    {lesson.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                            </div>
                                            <MaterialIcon name="chevron_right" size="sm" className="text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                    </Link>
                                ))}
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
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
