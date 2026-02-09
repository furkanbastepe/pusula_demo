"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { LevelBadge } from "@/components/common/LevelBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Mock buddy data
const buddy = {
    name: "Ahmet",
    surname: "Yılmaz",
    avatar: null,
    level: "kalfa" as const,
    cohort: "İklim Savaşçıları",
    xp: 1680,
    streak: 9,
    matchedSince: "15 Ocak 2025",
    completedReviews: 5,
    pendingReviews: 1,
    skills: ["Python", "Veri Analizi", "Sunum"],
    lastActive: "2 saat önce",
};

const sharedTasks = [
    {
        id: "st1",
        title: "Problem Kartı İncelemesi",
        status: "completed",
        myProgress: 100,
        buddyProgress: 100,
        type: "peer_review",
    },
    {
        id: "st2",
        title: "Veri Görselleştirme",
        status: "in_progress",
        myProgress: 60,
        buddyProgress: 40,
        type: "parallel",
    },
    {
        id: "st3",
        title: "3 Dakikalık Sunum",
        status: "pending",
        myProgress: 0,
        buddyProgress: 0,
        type: "peer_review",
    },
];

const recentMessages = [
    { id: "m1", from: "buddy", text: "Sunumun çok iyi olmuş, tebrikler!", time: "1 saat önce" },
    { id: "m2", from: "me", text: "Teşekkürler! Senin veri görselleştirme nasıl gidiyor?", time: "45 dk önce" },
    { id: "m3", from: "buddy", text: "Grafiği bitirdim, son rötuşları yapıyorum.", time: "30 dk önce" },
];

export default function BuddyPage() {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (!message.trim()) return;
        // In real app, send message to buddy
        console.log("Send message:", message);
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
            <header className="mb-6">
                <Breadcrumb />
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Buddy Profile */}
                <div className="space-y-6 lg:col-span-1">
                    {/* Buddy Card */}
                    <Card className="border-primary/30 bg-card/80 backdrop-blur overflow-hidden">
                        <div className="h-20 bg-gradient-to-r from-primary/20 to-chart-2/20" />
                        <CardContent className="relative pt-0">
                            <Avatar className="-mt-12 h-24 w-24 border-4 border-card">
                                <AvatarImage src={buddy.avatar || undefined} />
                                <AvatarFallback className="bg-primary/20 text-2xl font-bold text-primary">
                                    {buddy.name[0]}{buddy.surname[0]}
                                </AvatarFallback>
                            </Avatar>

                            <div className="mt-3">
                                <h2 className="font-display text-xl font-bold text-foreground">
                                    {buddy.name} {buddy.surname}
                                </h2>
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                    <LevelBadge level={buddy.level} variant="small" />
                                    <span className="text-sm text-muted-foreground">{buddy.cohort}</span>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                                <div>
                                    <div className="text-lg font-bold text-primary">{buddy.xp}</div>
                                    <div className="text-xs text-muted-foreground">XP</div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-orange-400">
                                        <MaterialIcon name="local_fire_department" size="sm" />
                                        {buddy.streak}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Streak</div>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-chart-2">{buddy.completedReviews}</div>
                                    <div className="text-xs text-muted-foreground">İnceleme</div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {buddy.skills.map((skill) => (
                                    <Badge key={skill} className="bg-secondary text-foreground border-0">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                <MaterialIcon name="access_time" size="sm" />
                                {buddy.lastActive}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                <MaterialIcon name="handshake" size="sm" />
                                Eşleşme: {buddy.matchedSince}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Hızlı İşlemler</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start border-border">
                                <MaterialIcon name="rate_review" size="sm" className="mr-2 text-primary" />
                                Bekleyen İnceleme ({buddy.pendingReviews})
                            </Button>
                            <Button variant="outline" className="w-full justify-start border-border">
                                <MaterialIcon name="videocam" size="sm" className="mr-2 text-blue-400" />
                                Video Görüşme Başlat
                            </Button>
                            <Button variant="outline" className="w-full justify-start border-border">
                                <MaterialIcon name="calendar_add_on" size="sm" className="mr-2 text-chart-4" />
                                Toplantı Planla
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Tasks & Chat */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Shared Tasks */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MaterialIcon name="group_work" className="text-chart-2" />
                                Ortak Görevler
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {sharedTasks.map((task) => (
                                <div key={task.id} className="rounded-lg bg-secondary/30 p-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h4 className="font-medium text-foreground">{task.title}</h4>
                                            <Badge className={`mt-1 border-0 ${task.type === "peer_review"
                                                    ? "bg-purple-500/20 text-purple-400"
                                                    : "bg-blue-500/20 text-blue-400"
                                                }`}>
                                                {task.type === "peer_review" ? "Peer Review" : "Paralel Görev"}
                                            </Badge>
                                        </div>
                                        <Badge className={`border-0 ${task.status === "completed"
                                                ? "bg-primary/20 text-primary"
                                                : task.status === "in_progress"
                                                    ? "bg-chart-4/20 text-chart-4"
                                                    : "bg-secondary text-muted-foreground"
                                            }`}>
                                            {task.status === "completed" ? "Tamamlandı" : task.status === "in_progress" ? "Devam Ediyor" : "Bekliyor"}
                                        </Badge>
                                    </div>

                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="w-12 text-xs text-muted-foreground">Sen</span>
                                            <Progress value={task.myProgress} className="h-2 flex-1 bg-secondary" />
                                            <span className="w-10 text-right text-xs text-foreground">{task.myProgress}%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="w-12 text-xs text-muted-foreground">{buddy.name}</span>
                                            <Progress value={task.buddyProgress} className="h-2 flex-1 bg-secondary" />
                                            <span className="w-10 text-right text-xs text-foreground">{task.buddyProgress}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Chat */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MaterialIcon name="chat" className="text-blue-400" />
                                Mesajlar
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
                                {recentMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.from === "me"
                                                    ? "bg-primary text-black"
                                                    : "bg-secondary text-foreground"
                                                }`}
                                        >
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={`mt-1 text-xs ${msg.from === "me" ? "text-black/60" : "text-muted-foreground"
                                                }`}>
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <Textarea
                                    placeholder="Mesaj yaz..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="min-h-[60px] resize-none border-border bg-secondary text-foreground"
                                />
                                <Button
                                    className="bg-primary text-black hover:bg-primary/90"
                                    onClick={handleSendMessage}
                                >
                                    <MaterialIcon name="send" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
