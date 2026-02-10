"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { useDemo } from "@/lib/DemoContext";
import { toast } from "sonner";

interface MockStudent {
    id: string;
    name: string;
    xp: number;
    level: string;
    status: "active" | "online" | "offline";
    task: string;
    progress: number;
    isUser?: boolean;
}

// Mock data generator for other students
const generateMockStudents = (): MockStudent[] => [
    { id: "s1", name: "Ahmet Yılmaz", xp: 1250, level: "Çırak", status: "active", task: "Veri Temizliği", progress: 65 },
    { id: "s2", name: "Elif Demir", xp: 2100, level: "Kalfa", status: "online", task: "Capstone Proje", progress: 30 },
    { id: "s3", name: "Can Öztürk", xp: 800, level: "Yeni", status: "offline", task: "Python Giriş", progress: 90 },
    { id: "s4", name: "Selin Kaya", xp: 1850, level: "Kalfa", status: "active", task: "Veri Görselleştirme", progress: 10 },
    { id: "s5", name: "Burak Yıldız", xp: 450, level: "Yeni", status: "offline", task: "Algoritma Mantığı", progress: 100 },
];

export default function RehberPage() {
    const { state } = useDemo();
    const [students] = useState<MockStudent[]>(generateMockStudents());

    // Merge current user (Zeynep) into the list
    const allStudents: MockStudent[] = [
        {
            id: "me",
            name: state.name,
            xp: state.xp,
            level: state.level,
            status: "online",
            task: "Aktif Görev", // Dynamic based on state could be better but simplified
            progress: 75,
            isUser: true
        },
        ...students
    ].sort((a, b) => b.xp - a.xp);

    const stats = {
        totalStudents: allStudents.length,
        activeToday: allStudents.filter(s => s.status !== "offline").length,
        avgXP: Math.round(allStudents.reduce((a, s) => a + s.xp, 0) / allStudents.length),
        cohortProgress: 42 // Mock global progress
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                            Rehber Paneli
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            İklim Savaşçıları Kohortu • {stats.activeToday} öğrenci çevrimiçi
                        </p>
                    </div>
                    <Button onClick={() => toast.success("Rapor oluşturuldu ve e-postana gönderildi.")}>
                        <MaterialIcon name="download" className="mr-2" />
                        Raporu İndir
                    </Button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <MaterialIcon name="groups" size="md" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">{stats.totalStudents}</div>
                            <div className="text-xs text-muted-foreground">Toplam Öğrenci</div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                            <MaterialIcon name="online_prediction" size="md" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">{stats.activeToday}</div>
                            <div className="text-xs text-muted-foreground">Aktif Öğrenci</div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                            <MaterialIcon name="stars" size="md" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">{stats.avgXP}</div>
                            <div className="text-xs text-muted-foreground">Ortalama XP</div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                            <MaterialIcon name="trending_up" size="md" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">%{stats.cohortProgress}</div>
                            <div className="text-xs text-muted-foreground">Kohort İlerlemesi</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Student List */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader>
                            <CardTitle>Öğrenci Listesi</CardTitle>
                            <CardDescription>Gerçek zamanlı ilerleme takibi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {allStudents.map((student, index) => (
                                    <motion.div
                                        key={student.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-4 rounded-xl border transition-all ${student.isUser
                                                ? "bg-primary/5 border-primary/50 shadow-lg shadow-primary/5"
                                                : "bg-secondary/20 border-border hover:bg-secondary/40"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-border">
                                                    <AvatarFallback className={student.isUser ? "bg-primary text-black" : "bg-muted"}>
                                                        {student.name.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-foreground">{student.name}</span>
                                                        {student.isUser && <Badge className="bg-primary/20 text-primary border-0 text-[10px]">SEN</Badge>}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <span className={`w-2 h-2 rounded-full ${student.status === "online" ? "bg-emerald-500 animate-pulse" : "bg-slate-500"}`}></span>
                                                        {student.status === "online" ? "Çevrimiçi" : student.status === "active" ? "Son görülme 1s" : "Çevrimdışı"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-primary">{student.xp} XP</div>
                                                <div className="text-xs text-muted-foreground">{student.level}</div>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Aktif Görev: {student.task}</span>
                                                <span>%{student.progress}</span>
                                            </div>
                                            <Progress value={student.progress} className="h-1.5" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Event Management Mock */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader>
                            <CardTitle>Etkinlik Yönetimi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => toast.info("Mock: Yeni etkinlik oluşturma modalı açıldı")}>
                                <MaterialIcon name="add" className="mr-2" />
                                Yeni Etkinlik Ekle
                            </Button>

                            <div className="space-y-3 mt-4">
                                <h4 className="text-sm font-semibold text-muted-foreground">Yaklaşan Etkinlikler</h4>
                                <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-medium text-sm">Bot Arena Finali</div>
                                            <div className="text-xs text-muted-foreground">3 gün kaldı</div>
                                        </div>
                                        <Badge variant="outline" className="text-[10px]">Yarışma</Badge>
                                    </div>
                                    <div className="mt-2 flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-slate-900 flex items-center justify-center text-[8px]">
                                                {i}
                                            </div>
                                        ))}
                                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-900 flex items-center justify-center text-[8px] text-muted-foreground">+24</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Insights Mock */}
                    <Card className="border-border bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MaterialIcon name="auto_awesome" className="text-purple-400" />
                                AI Asistanı
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-200">
                                <p className="mb-2"><strong>Dikkat:</strong> 3 öğrenci "Python Değişkenler" konusunda takıldı. Ek kaynak paylaşmamı ister misin?</p>
                                <Button size="sm" variant="secondary" className="w-full h-8 text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border-0">
                                    Kaynakları Gönder
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
