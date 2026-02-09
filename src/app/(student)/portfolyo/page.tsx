"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Mock portfolio data
const projects = [
    {
        id: "p1",
        title: "Yeşil Ulaşım Haritası",
        description: "Eskişehir'de karbon ayak izi azaltan sürdürülebilir ulaşım rotaları öneren interaktif harita",
        sdg: 13,
        status: "active",
        phase: "İnşa",
        image: null,
        skills: ["React", "Mapbox", "Python"],
        xp: 450,
        date: "Ocak 2025",
        featured: true,
    },
    {
        id: "p2",
        title: "Su Tüketim Takipçisi",
        description: "Evlerde su tüketimini izleyen ve tasarruf önerileri sunan IoT projesi",
        sdg: 6,
        status: "completed",
        phase: "Tamamlandı",
        image: null,
        skills: ["Arduino", "Node.js", "MongoDB"],
        xp: 600,
        date: "Aralık 2024",
        featured: false,
    },
];

const artifacts = [
    {
        id: "a1",
        title: "İklim Verisi Görselleştirme",
        type: "data_viz",
        project: "Yeşil Ulaşım Haritası",
        date: "5 Şubat 2025",
        icon: "bar_chart",
        color: "text-chart-2",
    },
    {
        id: "a2",
        title: "3 Dakikalık Pitch",
        type: "video",
        project: "Yeşil Ulaşım Haritası",
        date: "3 Şubat 2025",
        icon: "videocam",
        color: "text-red-400",
    },
    {
        id: "a3",
        title: "Kullanıcı Araştırma Raporu",
        type: "document",
        project: "Yeşil Ulaşım Haritası",
        date: "28 Ocak 2025",
        icon: "description",
        color: "text-blue-400",
    },
    {
        id: "a4",
        title: "Prototip Figma Dosyası",
        type: "design",
        project: "Yeşil Ulaşım Haritası",
        date: "20 Ocak 2025",
        icon: "design_services",
        color: "text-purple-400",
    },
];

const stats = {
    totalProjects: 2,
    totalArtifacts: 8,
    totalXP: 1050,
    certificates: 1,
};

import { useDemo } from "@/lib/DemoContext";

export default function PortfolyoPage() {
    const { currentUser } = useDemo();
    const [filter, setFilter] = useState<"all" | "projects" | "artifacts">("all");

    // Update stats with real user data
    const currentStats = {
        ...stats,
        totalXP: currentUser.xp,
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                            Portfolyo
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Projelerini ve çalışmalarını sergile
                        </p>
                    </div>
                    <Button className="bg-primary text-black hover:bg-primary/90">
                        <MaterialIcon name="share" size="sm" className="mr-1.5" />
                        Portfolyoyu Paylaş
                    </Button>
                </div>
            </header>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">{stats.totalProjects}</div>
                        <div className="text-xs text-muted-foreground">Proje</div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-chart-2">{stats.totalArtifacts}</div>
                        <div className="text-xs text-muted-foreground">Artifact</div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-chart-4">{currentStats.totalXP}</div>
                        <div className="text-xs text-muted-foreground">Kazanılan XP</div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">{stats.certificates}</div>
                        <div className="text-xs text-muted-foreground">Sertifika</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter */}
            <div className="mb-6 flex gap-2">
                {[
                    { key: "all", label: "Tümü", icon: "grid_view" },
                    { key: "projects", label: "Projeler", icon: "folder" },
                    { key: "artifacts", label: "Artifacts", icon: "attach_file" },
                ].map((f) => (
                    <Button
                        key={f.key}
                        variant="outline"
                        size="sm"
                        className={`border-border ${filter === f.key
                            ? "bg-primary/20 border-primary text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                        onClick={() => setFilter(f.key as "all" | "projects" | "artifacts")}
                    >
                        <MaterialIcon name={f.icon} size="sm" className="mr-1" />
                        {f.label}
                    </Button>
                ))}
            </div>

            {/* Projects */}
            {(filter === "all" || filter === "projects") && (
                <>
                    <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Projeler</h2>
                    <div className="mb-8 grid gap-4 md:grid-cols-2">
                        {projects.map((project) => (
                            <Card
                                key={project.id}
                                className={`border-border bg-card/80 backdrop-blur overflow-hidden transition-all hover:-translate-y-1 ${project.featured ? "border-primary/30 glow-green" : ""
                                    }`}
                            >
                                {/* Project Image */}
                                <div className="h-40 bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center">
                                    <MaterialIcon name="folder_open" size="xl" className="text-muted-foreground" />
                                </div>

                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <SDGBadge sdg={project.sdg} variant="small" />
                                        <Badge className={`border-0 ${project.status === "active"
                                            ? "bg-blue-500/20 text-blue-400"
                                            : "bg-primary/20 text-primary"
                                            }`}>
                                            {project.phase}
                                        </Badge>
                                    </div>

                                    <h3 className="mt-3 font-semibold text-foreground">{project.title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {project.skills.map((skill) => (
                                            <Badge key={skill} variant="outline" className="border-border text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{project.date}</span>
                                        <span className="flex items-center gap-1 text-primary">
                                            <MaterialIcon name="star" size="sm" />
                                            {project.xp} XP
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}

            {/* Artifacts */}
            {(filter === "all" || filter === "artifacts") && (
                <>
                    <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Artifacts</h2>
                    <div className="grid gap-3 md:grid-cols-2">
                        {artifacts.map((artifact) => (
                            <Card key={artifact.id} className="border-border bg-card/80 backdrop-blur">
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary ${artifact.color}`}>
                                        <MaterialIcon name={artifact.icon} size="lg" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-foreground truncate">{artifact.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {artifact.project} • {artifact.date}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <MaterialIcon name="visibility" size="sm" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
