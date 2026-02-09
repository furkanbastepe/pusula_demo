"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Mock meeting data
const upcomingMeetings = [
    {
        id: "m1",
        title: "Mentor Klinik",
        description: "Haftalık mentor görüşmesi ve soru-cevap",
        date: "10 Şubat 2025",
        time: "14:00",
        duration: "60 dk",
        type: "mentor",
        host: { name: "Selin Hoca", avatar: null },
        attendees: 8,
        isJoined: true,
        link: "https://meet.google.com/abc-defg-hij",
    },
    {
        id: "m2",
        title: "Kohort Senkron",
        description: "İklim Savaşçıları haftalık durum toplantısı",
        date: "12 Şubat 2025",
        time: "16:00",
        duration: "45 dk",
        type: "cohort",
        host: { name: "Zeynep", avatar: null },
        attendees: 12,
        isJoined: true,
        link: null,
    },
    {
        id: "m3",
        title: "Demo Day Provası",
        description: "Sunum provaları ve geri bildirim",
        date: "15 Şubat 2025",
        time: "15:00",
        duration: "90 dk",
        type: "workshop",
        host: { name: "Mehmet Hoca", avatar: null },
        attendees: 20,
        isJoined: false,
        link: null,
    },
];

const pastMeetings = [
    {
        id: "p1",
        title: "Veri Görselleştirme Atölyesi",
        date: "5 Şubat 2025",
        type: "workshop",
        recording: true,
    },
    {
        id: "p2",
        title: "Mentor Klinik",
        date: "3 Şubat 2025",
        type: "mentor",
        recording: true,
    },
    {
        id: "p3",
        title: "Kohort Senkron",
        date: "29 Ocak 2025",
        type: "cohort",
        recording: false,
    },
];

const typeConfig = {
    mentor: { label: "Mentor", color: "text-purple-400", bg: "bg-purple-500/20", icon: "school" },
    cohort: { label: "Kohort", color: "text-blue-400", bg: "bg-blue-500/20", icon: "groups" },
    workshop: { label: "Atölye", color: "text-chart-4", bg: "bg-chart-4/20", icon: "construction" },
};

export default function ToplantiPage() {
    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                            Toplantılar
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Mentor klinikleri, atölyeler ve kohort toplantıları
                        </p>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-card/50">
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary/20">
                        <MaterialIcon name="event_upcoming" size="sm" className="mr-1.5" />
                        Yaklaşan
                    </TabsTrigger>
                    <TabsTrigger value="past" className="data-[state=active]:bg-primary/20">
                        <MaterialIcon name="history" size="sm" className="mr-1.5" />
                        Geçmiş
                    </TabsTrigger>
                </TabsList>

                {/* Upcoming Meetings */}
                <TabsContent value="upcoming" className="space-y-4">
                    {upcomingMeetings.map((meeting) => {
                        const config = typeConfig[meeting.type as keyof typeof typeConfig];
                        return (
                            <Card key={meeting.id} className="border-border bg-card/80 backdrop-blur">
                                <CardContent className="p-4">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div className="flex gap-4">
                                            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.color}`}>
                                                <MaterialIcon name={config.icon} size="lg" />
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="font-semibold text-foreground">{meeting.title}</h3>
                                                    <Badge className={`${config.bg} ${config.color} border-0`}>
                                                        {config.label}
                                                    </Badge>
                                                    {meeting.isJoined && (
                                                        <Badge className="bg-primary/20 text-primary border-0">
                                                            Kayıtlı
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {meeting.description}
                                                </p>
                                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <MaterialIcon name="calendar_today" size="sm" />
                                                        {meeting.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MaterialIcon name="schedule" size="sm" />
                                                        {meeting.time} ({meeting.duration})
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MaterialIcon name="people" size="sm" />
                                                        {meeting.attendees} katılımcı
                                                    </span>
                                                </div>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarFallback className="bg-muted text-xs">
                                                            {meeting.host.name.split(" ").map(n => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm text-muted-foreground">
                                                        {meeting.host.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {meeting.link ? (
                                                <Link href={meeting.link} target="_blank">
                                                    <Button className="bg-primary text-black hover:bg-primary/90">
                                                        <MaterialIcon name="videocam" size="sm" className="mr-1.5" />
                                                        Katıl
                                                    </Button>
                                                </Link>
                                            ) : meeting.isJoined ? (
                                                <Button variant="outline" className="border-border text-muted-foreground">
                                                    <MaterialIcon name="check" size="sm" className="mr-1.5" />
                                                    Kayıtlısın
                                                </Button>
                                            ) : (
                                                <Button className="bg-primary text-black hover:bg-primary/90">
                                                    <MaterialIcon name="add" size="sm" className="mr-1.5" />
                                                    Kayıt Ol
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </TabsContent>

                {/* Past Meetings */}
                <TabsContent value="past" className="space-y-3">
                    {pastMeetings.map((meeting) => {
                        const config = typeConfig[meeting.type as keyof typeof typeConfig];
                        return (
                            <Card key={meeting.id} className="border-border bg-card/80 backdrop-blur">
                                <CardContent className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bg} ${config.color}`}>
                                            <MaterialIcon name={config.icon} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground">{meeting.title}</h4>
                                            <p className="text-sm text-muted-foreground">{meeting.date}</p>
                                        </div>
                                    </div>
                                    {meeting.recording ? (
                                        <Button variant="outline" size="sm" className="border-border">
                                            <MaterialIcon name="play_circle" size="sm" className="mr-1.5 text-primary" />
                                            Kaydı İzle
                                        </Button>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">Kayıt yok</span>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </TabsContent>
            </Tabs>
        </div>
    );
}
