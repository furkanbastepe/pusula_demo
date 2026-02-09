"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Mock data
const pendingReviews = [
    {
        id: "r1",
        student: { name: "Ahmet Yılmaz", avatar: null },
        task: "3 Dakikalık Mikro Sunum",
        submittedAt: "2 saat önce",
        cohort: "İklim Savaşçıları",
        priority: "high",
    },
    {
        id: "r2",
        student: { name: "Elif Demir", avatar: null },
        task: "Veri Görselleştirme",
        submittedAt: "5 saat önce",
        cohort: "İklim Savaşçıları",
        priority: "normal",
    },
    {
        id: "r3",
        student: { name: "Can Öztürk", avatar: null },
        task: "Problem Kartı",
        submittedAt: "1 gün önce",
        cohort: "Su Koruyucuları",
        priority: "low",
    },
];

const cohorts = [
    { id: "c1", name: "İklim Savaşçıları", sdg: 13, students: 12, active: 10, progress: 45 },
    { id: "c2", name: "Su Koruyucuları", sdg: 6, students: 8, active: 7, progress: 30 },
];

const recentActivity = [
    { id: "a1", type: "review", message: "Zeynep'in görevini onayladın", time: "30 dk önce" },
    { id: "a2", type: "checkin", message: "5 öğrenci check-in yaptı", time: "2 saat önce" },
    { id: "a3", type: "workshop", message: "Mentor Klinik başlıyor", time: "Yarın 14:00" },
];

const stats = {
    totalStudents: 20,
    activeToday: 15,
    pendingReviews: 3,
    avgGDR: 52,
};

export default function RehberPage() {
    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4">
                    <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                        Rehber Paneli
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Hoş geldin! Bugün {stats.activeToday} öğrenci aktif.
                    </p>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                                <MaterialIcon name="people" className="text-blue-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.totalStudents}</div>
                                <div className="text-xs text-muted-foreground">Toplam Öğrenci</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                                <MaterialIcon name="check_circle" className="text-primary" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.activeToday}</div>
                                <div className="text-xs text-muted-foreground">Bugün Aktif</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20">
                                <MaterialIcon name="pending_actions" className="text-destructive" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.pendingReviews}</div>
                                <div className="text-xs text-muted-foreground">Bekleyen İnceleme</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                                <MaterialIcon name="radar" className="text-purple-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.avgGDR}</div>
                                <div className="text-xs text-muted-foreground">Ortalama GDR</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - 2/3 */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Pending Reviews */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MaterialIcon name="rate_review" className="text-destructive" />
                                    Bekleyen İncelemeler
                                    <Badge className="bg-destructive/20 text-destructive border-0 ml-2">
                                        {pendingReviews.length}
                                    </Badge>
                                </CardTitle>
                                <Link href="/rehber/incelemeler">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                        Tümü
                                        <MaterialIcon name="chevron_right" size="sm" />
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {pendingReviews.map((review) => (
                                    <Link key={review.id} href={`/rehber/inceleme/${review.id}`}>
                                        <div className="group flex items-center justify-between rounded-lg bg-secondary/30 p-3 transition-all hover:bg-secondary/50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                                    {review.student.name.split(" ").map(n => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                                                        {review.student.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {review.task} • {review.submittedAt}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={`${review.priority === "high"
                                                        ? "bg-destructive/20 text-destructive"
                                                        : review.priority === "normal"
                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                            : "bg-secondary text-muted-foreground"
                                                    } border-0`}>
                                                    {review.priority === "high" ? "Acil" : review.priority === "normal" ? "Normal" : "Düşük"}
                                                </Badge>
                                                <MaterialIcon name="chevron_right" className="text-muted-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Cohorts */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MaterialIcon name="groups" className="text-chart-2" />
                                    Kohortlar
                                </CardTitle>
                                <Link href="/rehber/kohortlar">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                        Tümü
                                        <MaterialIcon name="chevron_right" size="sm" />
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {cohorts.map((cohort) => (
                                    <Link key={cohort.id} href={`/rehber/kohort/${cohort.id}`}>
                                        <div className="group rounded-lg bg-secondary/30 p-4 transition-all hover:bg-secondary/50">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {cohort.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        SDG {cohort.sdg} • {cohort.students} öğrenci
                                                    </p>
                                                </div>
                                                <Badge className="bg-primary/20 text-primary border-0">
                                                    {cohort.active} aktif
                                                </Badge>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-muted-foreground">Genel İlerleme</span>
                                                    <span className="text-foreground font-medium">{cohort.progress}%</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full transition-all"
                                                        style={{ width: `${cohort.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - 1/3 */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MaterialIcon name="bolt" className="text-chart-4" />
                                Hızlı İşlemler
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/rehber/ogrenciler">
                                <Button variant="outline" className="w-full justify-start border-border hover:border-primary">
                                    <MaterialIcon name="people" size="sm" className="mr-2 text-blue-400" />
                                    Öğrenci Listesi
                                </Button>
                            </Link>
                            <Link href="/rehber/checkin">
                                <Button variant="outline" className="w-full justify-start border-border hover:border-primary">
                                    <MaterialIcon name="qr_code" size="sm" className="mr-2 text-primary" />
                                    Check-in Kiosk
                                </Button>
                            </Link>
                            <Link href="/rehber/atolyeler">
                                <Button variant="outline" className="w-full justify-start border-border hover:border-primary">
                                    <MaterialIcon name="event" size="sm" className="mr-2 text-purple-400" />
                                    Atölye Planla
                                </Button>
                            </Link>
                            <Link href="/rehber/rapor">
                                <Button variant="outline" className="w-full justify-start border-border hover:border-primary">
                                    <MaterialIcon name="bar_chart" size="sm" className="mr-2 text-chart-4" />
                                    Haftalık Rapor
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MaterialIcon name="history" className="text-chart-3" />
                                Son Aktivite
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center gap-3">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${activity.type === "review"
                                                ? "bg-primary/20 text-primary"
                                                : activity.type === "checkin"
                                                    ? "bg-blue-500/20 text-blue-400"
                                                    : "bg-purple-500/20 text-purple-400"
                                            }`}>
                                            <MaterialIcon
                                                name={
                                                    activity.type === "review"
                                                        ? "check"
                                                        : activity.type === "checkin"
                                                            ? "login"
                                                            : "event"
                                                }
                                                size="sm"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-foreground truncate">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
