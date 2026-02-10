"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { LevelBadge } from "@/components/common/LevelBadge";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { useDemo } from "@/lib/DemoContext";
import { DEMO_STAGES } from "@/lib/demo-data";

// Mock user data
const user = {
    name: "Zeynep",
    surname: "Yıldırım",
    email: "zeynep@example.com",
    avatar: null,
    level: "kalfa" as const,
    xp: 1250,
    xpToNext: 2500,
    streak: 12,
    cohort: "İklim Savaşçıları",
    sdg: 13,
    gdrScore: 58,
    joinedAt: "Ocak 2025",
    bio: "İklim aktivisti ve veri analisti. Sürdürülebilir geleceği inşa etmek için buradayım.",
    skills: ["Veri Analizi", "Excel", "Sunum", "Python", "Figma", "SQL"],
    badges: [
        { id: "b1", name: "İlk Görev", icon: "task_alt", color: "text-green-400" },
        { id: "b2", name: "7 Gün Streak", icon: "local_fire_department", color: "text-orange-400" },
        { id: "b3", name: "Takım Oyuncusu", icon: "people", color: "text-blue-400" },
        { id: "b4", name: "Araştırmacı", icon: "search", color: "text-purple-400" },
        { id: "b5", name: "MicroLab Ustası", icon: "science", color: "text-cyan-400" },
        { id: "b6", name: "Kod Kahramanı", icon: "code", color: "text-pink-400" },
        { id: "b7", name: "Simülasyon Pilotu", icon: "sports_esports", color: "text-yellow-400" },
        { id: "b8", name: "SDG Savunucusu", icon: "public", color: "text-emerald-400" },
    ],
};

const gdrComponents = [
    { key: "teknik_rol", label: "Teknik Rol", value: 65, color: "text-blue-400" },
    { key: "takim", label: "Takım İşi", value: 55, color: "text-green-400" },
    { key: "sunum", label: "Sunum", value: 45, color: "text-yellow-400" },
    { key: "guvenilirlik", label: "Güvenilirlik", value: 70, color: "text-purple-400" },
    { key: "sosyal_etki", label: "Sosyal Etki", value: 50, color: "text-red-400" },
];

const completedTasks = [
    { id: "t1", title: "Problem Kartı", xp: 30, date: "5 Şub" },
    { id: "t2", title: "Araştırma Raporu", xp: 100, date: "3 Şub" },
    { id: "t3", title: "Buddy İncelemesi", xp: 25, date: "1 Şub" },
];

const projects = [
    {
        id: "p1",
        title: "Yeşil Ulaşım Haritası",
        description: "Eskişehir'de karbon ayak izi azaltan ulaşım rotaları",
        status: "active",
        image: null,
    },
    {
        id: "p2",
        title: "Su Tüketim Takipçisi",
        description: "Evlerde su tüketimini izleyen IoT projesi",
        status: "completed",
        image: null,
    },
];

const certificates = [
    { id: "c1", title: "Keşif Fazı Tamamlama", date: "15 Ocak 2025", sdg: 13 },
];

export default function ProfilPage() {
    const { state } = useDemo();
    const currentUser = state;

    // Map current state to a demo stage key
    const getStageFromState = (): keyof typeof DEMO_STAGES => {
        if (state.level === "graduate") return "graduation";
        if (state.level === "usta") return "dashboard-advanced";
        if (state.level === "kalfa") return "bot-arena";
        if (state.level === "cirak") return "learning-module";
        return "onboarding";
    };

    const currentStage = getStageFromState();
    const { dashboardData } = DEMO_STAGES[currentStage];
    const [activeTab, setActiveTab] = useState("genel");

    const getXpToNext = () => {
        if (currentUser.level === "cirak") return 1000;
        if (currentUser.level === "kalfa") return 2500;
        if (currentUser.level === "usta") return 5000;
        return 5000;
    };

    // Merge dynamic user data with static profile data for Merve
    const profileUser = {
        ...user,
        name: currentUser.name,
        level: currentUser.level,
        xp: currentUser.xp,
        xpToNext: getXpToNext(),
        streak: currentUser.streak,
        // Use GDR score from current user
        gdrScore: currentUser.gdrScore,
    };

    const xpPercent = (profileUser.xp / profileUser.xpToNext) * 100;

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
            <header className="mb-6">
                <Breadcrumb />
            </header>

            {/* Profile Header Card */}
            <Card className="mb-6 overflow-hidden border-border bg-card/80 backdrop-blur">
                <CardContent className="p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        {/* Avatar & Basic Info */}
                        <div className="flex items-start gap-4">
                            <Avatar className="h-20 w-20 border-4 border-primary/30">
                                <AvatarImage src={profileUser.avatar || undefined} />
                                <AvatarFallback className="bg-primary/20 text-2xl font-bold text-primary">
                                    {profileUser.name[0]}{profileUser.surname[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="font-display text-2xl font-bold text-foreground">
                                    {profileUser.name} {profileUser.surname}
                                </h1>
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                    <LevelBadge level={profileUser.level} variant="medium" />
                                    <SDGBadge sdg={profileUser.sdg} variant="small" />
                                    <span className="text-sm text-muted-foreground">{profileUser.cohort}</span>
                                </div>
                                <p className="mt-2 max-w-md text-sm text-muted-foreground">{profileUser.bio}</p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{profileUser.xp}</div>
                                <div className="text-xs text-muted-foreground">XP</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-chart-4">{profileUser.streak}</div>
                                <div className="text-xs text-muted-foreground">Streak</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-chart-2">{profileUser.gdrScore}</div>
                                <div className="text-xs text-muted-foreground">GDR</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-chart-3">{profileUser.badges.length}</div>
                                <div className="text-xs text-muted-foreground">Rozet</div>
                            </div>
                        </div>
                    </div>

                    {/* XP Progress */}
                    <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Sonraki seviye: <span className="font-semibold text-foreground">Usta</span>
                            </span>
                            <span className="font-semibold text-foreground">{profileUser.xp} / {profileUser.xpToNext} XP</span>
                        </div>
                        <Progress value={xpPercent} className="h-2 bg-secondary" />
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-card/50">
                    <TabsTrigger value="genel" className="data-[state=active]:bg-primary/20">
                        <MaterialIcon name="person" size="sm" className="mr-1.5" />
                        <span className="hidden sm:inline">Genel</span>
                    </TabsTrigger>
                    <TabsTrigger value="gdr" className="data-[state=active]:bg-primary/20">
                        <MaterialIcon name="radar" size="sm" className="mr-1.5" />
                        <span className="hidden sm:inline">GDR</span>
                    </TabsTrigger>
                    <TabsTrigger value="projeler" className="data-[state=active]:bg-primary/20">
                        <MaterialIcon name="folder" size="sm" className="mr-1.5" />
                        <span className="hidden sm:inline">Projeler</span>
                    </TabsTrigger>
                    <TabsTrigger value="sertifikalar" className="data-[state=active]:bg-primary/20">
                        <MaterialIcon name="verified" size="sm" className="mr-1.5" />
                        <span className="hidden sm:inline">Sertifikalar</span>
                    </TabsTrigger>
                </TabsList>

                {/* Genel Tab */}
                <TabsContent value="genel" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Skills */}
                        <Card className="border-border bg-card/80 backdrop-blur">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MaterialIcon name="psychology" className="text-chart-2" />
                                    Yetenekler
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill) => (
                                        <Badge key={skill} className="bg-secondary text-foreground border-0">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Badges */}
                        <Card className="border-border bg-card/80 backdrop-blur">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MaterialIcon name="emoji_events" className="text-chart-4" />
                                    Rozetler ({user.badges.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {user.badges.map((badge) => (
                                        <div key={badge.id} className="flex items-center gap-2 rounded-lg bg-secondary/30 p-2">
                                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-card ${badge.color}`}>
                                                <MaterialIcon name={badge.icon} size="sm" />
                                            </div>
                                            <span className="text-sm font-medium text-foreground">{badge.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Streak Calendar */}
                        <Card className="border-border bg-card/80 backdrop-blur md:col-span-2">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MaterialIcon name="local_fire_department" className="text-orange-400" />
                                    Streak Takvimi
                                    <Badge className="ml-auto bg-orange-500/20 text-orange-400 border-0">
                                        {profileUser.streak} gün 🔥
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-7 gap-1.5">
                                    {Array.from({ length: 28 }).map((_, i) => {
                                        // Simulate activity: last `streak` days are active
                                        const isActive = i >= (28 - profileUser.streak);
                                        const isToday = i === 27;
                                        return (
                                            <div
                                                key={i}
                                                className={`h-8 rounded-md border transition-colors ${isToday
                                                        ? "border-primary bg-primary/30 ring-2 ring-primary/40"
                                                        : isActive
                                                            ? "border-orange-500/30 bg-orange-500/20"
                                                            : "border-border/50 bg-secondary/20"
                                                    }`}
                                                title={isToday ? "Bugün" : isActive ? "Aktif gün" : "Boş gün"}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                    <span>4 hafta önce</span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-sm bg-secondary/20 border border-border/50" />
                                        <span>Boş</span>
                                        <div className="h-3 w-3 rounded-sm bg-orange-500/20 border border-orange-500/30" />
                                        <span>Aktif</span>
                                    </div>
                                    <span>Bugün</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="border-border bg-card/80 backdrop-blur md:col-span-2">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MaterialIcon name="history" className="text-chart-3" />
                                    Son Tamamlanan Görevler
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {completedTasks.map((task) => (
                                        <div key={task.id} className="flex items-center justify-between rounded-lg bg-secondary/30 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                                    <MaterialIcon name="check" size="sm" />
                                                </div>
                                                <span className="font-medium text-foreground">{task.title}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <span className="flex items-center gap-1 text-primary">
                                                    <MaterialIcon name="star" size="sm" />
                                                    +{task.xp}
                                                </span>
                                                <span className="text-muted-foreground">{task.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* GDR Tab */}
                <TabsContent value="gdr" className="space-y-6">
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MaterialIcon name="radar" className="text-primary" />
                                Gelişim Durumu Raporu (GDR)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6 text-center">
                                <div className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-primary/20">
                                    <span className="text-4xl font-bold text-primary">{user.gdrScore}</span>
                                </div>
                                <p className="mt-2 text-muted-foreground">Genel Puan</p>
                            </div>

                            <div className="space-y-4">
                                {gdrComponents.map((comp) => (
                                    <div key={comp.key}>
                                        <div className="mb-1 flex items-center justify-between text-sm">
                                            <span className={`font-medium ${comp.color}`}>{comp.label}</span>
                                            <span className="text-foreground">{comp.value}/100</span>
                                        </div>
                                        <Progress value={comp.value} className="h-2 bg-secondary" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Projeler Tab */}
                <TabsContent value="projeler" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        {projects.map((project) => (
                            <Card key={project.id} className="border-border bg-card/80 backdrop-blur">
                                <CardContent className="p-4">
                                    <div className="mb-3 h-32 rounded-lg bg-secondary flex items-center justify-center">
                                        <MaterialIcon name="image" size="xl" className="text-muted-foreground" />
                                    </div>
                                    <Badge className={`mb-2 ${project.status === "active"
                                        ? "bg-blue-500/20 text-blue-400"
                                        : "bg-primary/20 text-primary"
                                        } border-0`}>
                                        {project.status === "active" ? "Devam Ediyor" : "Tamamlandı"}
                                    </Badge>
                                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Link href="/portfolyo">
                        <Button className="w-full bg-primary text-black hover:bg-primary/90">
                            <MaterialIcon name="folder_open" size="sm" className="mr-2" />
                            Tüm Portfolyoyu Gör
                        </Button>
                    </Link>
                </TabsContent>

                {/* Sertifikalar Tab */}
                <TabsContent value="sertifikalar" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        {certificates.map((cert) => (
                            <Card key={cert.id} className="border-primary/30 bg-card/80 backdrop-blur glow-green">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
                                            <MaterialIcon name="verified" size="lg" className="text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{cert.title}</h3>
                                            <div className="mt-1 flex items-center gap-2">
                                                <SDGBadge sdg={cert.sdg} variant="small" />
                                                <span className="text-sm text-muted-foreground">{cert.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Link href="/sertifikam">
                        <Button variant="outline" className="w-full border-border hover:border-primary">
                            <MaterialIcon name="download" size="sm" className="mr-2" />
                            Sertifikalarımı İndir
                        </Button>
                    </Link>
                </TabsContent>
            </Tabs>
        </div>
    );
}
