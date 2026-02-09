"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { LevelBadge } from "@/components/common/LevelBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Mock student data
const mockStudents = [
    {
        id: "s1",
        name: "Ayşe Yılmaz",
        avatar: null,
        level: "cirak",
        xp: 320,
        gdr: 72,
        tasksCompleted: 4,
        tasksTotal: 10,
        streak: 5,
        lastActive: "2 saat önce",
        pendingReviews: 2,
        status: "active",
    },
    {
        id: "s2",
        name: "Mehmet Kaya",
        avatar: null,
        level: "cirak",
        xp: 180,
        gdr: 58,
        tasksCompleted: 2,
        tasksTotal: 10,
        streak: 0,
        lastActive: "3 gün önce",
        pendingReviews: 0,
        status: "inactive",
    },
    {
        id: "s3",
        name: "Zeynep Demir",
        avatar: null,
        level: "kalfa",
        xp: 850,
        gdr: 85,
        tasksCompleted: 12,
        tasksTotal: 25,
        streak: 12,
        lastActive: "30 dk önce",
        pendingReviews: 1,
        status: "active",
    },
    {
        id: "s4",
        name: "Can Özkan",
        avatar: null,
        level: "cirak",
        xp: 420,
        gdr: 68,
        tasksCompleted: 6,
        tasksTotal: 10,
        streak: 3,
        lastActive: "1 gün önce",
        pendingReviews: 0,
        status: "active",
    },
];

// Mock cohort stats
const cohortStats = {
    totalStudents: 12,
    activeStudents: 8,
    avgProgress: 42,
    avgGdr: 68,
    pendingReviews: 5,
    upcomingMeetings: 2,
};

export default function KohortPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "progress" | "gdr" | "activity">("activity");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

    const filteredStudents = mockStudents
        .filter((s) => {
            if (filterStatus === "active") return s.status === "active";
            if (filterStatus === "inactive") return s.status === "inactive";
            return true;
        })
        .filter((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "progress") return (b.tasksCompleted / b.tasksTotal) - (a.tasksCompleted / a.tasksTotal);
            if (sortBy === "gdr") return b.gdr - a.gdr;
            return a.lastActive.localeCompare(b.lastActive); // Simplified, would need proper date parsing
        });

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            <header className="mb-6">
                <Breadcrumb />
                <h1 className="font-display text-2xl font-bold text-foreground mt-2">Kohort Yönetimi</h1>
                <p className="text-muted-foreground">Öğrenci ilerlemelerini takip et ve yönet</p>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <MaterialIcon name="groups" size="lg" className="text-primary mb-1" />
                        <p className="text-2xl font-bold text-foreground">{cohortStats.totalStudents}</p>
                        <p className="text-xs text-muted-foreground">Toplam Öğrenci</p>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <MaterialIcon name="person_check" size="lg" className="text-chart-2 mb-1" />
                        <p className="text-2xl font-bold text-foreground">{cohortStats.activeStudents}</p>
                        <p className="text-xs text-muted-foreground">Aktif</p>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <MaterialIcon name="trending_up" size="lg" className="text-chart-4 mb-1" />
                        <p className="text-2xl font-bold text-foreground">%{cohortStats.avgProgress}</p>
                        <p className="text-xs text-muted-foreground">Ort. İlerleme</p>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                        <MaterialIcon name="rate_review" size="lg" className="text-blue-400 mb-1" />
                        <p className="text-2xl font-bold text-foreground">{cohortStats.pendingReviews}</p>
                        <p className="text-xs text-muted-foreground">Bekleyen İnceleme</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Öğrenci ara..."
                    className="w-full md:w-64 border-border bg-secondary text-foreground"
                />
                <div className="flex gap-2">
                    <Button
                        variant={filterStatus === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("all")}
                        className={filterStatus === "all" ? "bg-primary text-black" : "border-border"}
                    >
                        Tümü
                    </Button>
                    <Button
                        variant={filterStatus === "active" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("active")}
                        className={filterStatus === "active" ? "bg-primary text-black" : "border-border"}
                    >
                        Aktif
                    </Button>
                    <Button
                        variant={filterStatus === "inactive" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus("inactive")}
                        className={filterStatus === "inactive" ? "bg-primary text-black" : "border-border"}
                    >
                        İnaktif
                    </Button>
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground"
                >
                    <option value="activity">Son Aktivite</option>
                    <option value="name">İsim</option>
                    <option value="progress">İlerleme</option>
                    <option value="gdr">GDR Puanı</option>
                </select>
            </div>

            {/* Student List */}
            <div className="space-y-3">
                {filteredStudents.map((student) => {
                    const progressPercent = (student.tasksCompleted / student.tasksTotal) * 100;
                    return (
                        <Card key={student.id} className="border-border bg-card/80 backdrop-blur hover:bg-card/90 transition-colors">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-foreground font-medium">
                                            {student.name.split(" ").map((n) => n[0]).join("")}
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ${student.status === "active" ? "bg-primary" : "bg-muted-foreground"
                                            }`} />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium text-foreground truncate">{student.name}</h3>
                                            <LevelBadge level={student.level as "cirak" | "kalfa" | "usta" | "mezun"} variant="small" />
                                            {student.pendingReviews > 0 && (
                                                <Badge className="bg-chart-4/20 text-chart-4 border-0 text-xs">
                                                    {student.pendingReviews} bekliyor
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <MaterialIcon name="star" size="sm" className="text-primary" />
                                                {student.xp} XP
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MaterialIcon name="insights" size="sm" className="text-chart-2" />
                                                GDR {student.gdr}
                                            </span>
                                            {student.streak > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <MaterialIcon name="local_fire_department" size="sm" className="text-orange-400" />
                                                    {student.streak} gün
                                                </span>
                                            )}
                                            <span>{student.lastActive}</span>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="hidden md:block w-32">
                                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                            <span>İlerleme</span>
                                            <span>{student.tasksCompleted}/{student.tasksTotal}</span>
                                        </div>
                                        <Progress value={progressPercent} className="h-2 bg-secondary" />
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Link href={`/rehber/ogrenci/${student.id}`}>
                                            <Button variant="outline" size="sm" className="border-border">
                                                <MaterialIcon name="visibility" size="sm" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="sm" className="border-border">
                                            <MaterialIcon name="chat" size="sm" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {filteredStudents.length === 0 && (
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-8 text-center">
                        <MaterialIcon name="search_off" size="xl" className="text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Öğrenci bulunamadı</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
