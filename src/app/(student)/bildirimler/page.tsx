"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Mock notification data
const notifications = [
    {
        id: "n1",
        type: "task",
        title: "Görevin onaylandı!",
        message: "3 Dakikalık Mikro Sunum görevi başarıyla tamamlandı.",
        time: "10 dk önce",
        read: false,
        icon: "check_circle",
        color: "text-primary",
        link: "/gorev/t1",
    },
    {
        id: "n2",
        type: "xp",
        title: "+50 XP kazandın!",
        message: "Mikro sunum görevini tamamladığın için XP kazandın.",
        time: "10 dk önce",
        read: false,
        icon: "star",
        color: "text-chart-4",
        link: null,
    },
    {
        id: "n3",
        type: "buddy",
        title: "Buddy'nden mesaj",
        message: "Ahmet: 'Sunumun çok iyi olmuş, tebrikler!'",
        time: "1 saat önce",
        read: false,
        icon: "person",
        color: "text-blue-400",
        link: "/buddy",
    },
    {
        id: "n4",
        type: "event",
        title: "Yaklaşan etkinlik",
        message: "Mentor Klinik yarın saat 14:00'te başlıyor.",
        time: "3 saat önce",
        read: true,
        icon: "event",
        color: "text-purple-400",
        link: "/toplanti",
    },
    {
        id: "n5",
        type: "streak",
        title: "7 günlük streak!",
        message: "Harika gidiyorsun! 7 gün üst üste aktif oldun.",
        time: "1 gün önce",
        read: true,
        icon: "local_fire_department",
        color: "text-orange-400",
        link: null,
    },
    {
        id: "n6",
        type: "level",
        title: "Seviye atladın!",
        message: "Tebrikler! Artık Kalfa seviyesindesin.",
        time: "2 gün önce",
        read: true,
        icon: "upgrade",
        color: "text-primary",
        link: "/profil",
    },
    {
        id: "n7",
        type: "task",
        title: "Yeni görev açıldı",
        message: "Veri Görselleştirme görevi artık kullanılabilir.",
        time: "3 gün önce",
        read: true,
        icon: "add_task",
        color: "text-chart-2",
        link: "/gorevler",
    },
];

const filterOptions = [
    { id: "all", label: "Tümü", icon: "notifications" },
    { id: "task", label: "Görevler", icon: "task_alt" },
    { id: "xp", label: "XP", icon: "star" },
    { id: "buddy", label: "Buddy", icon: "person" },
    { id: "event", label: "Etkinlik", icon: "event" },
];

export default function BildirimlerPage() {
    const [filter, setFilter] = useState("all");
    const [notificationList, setNotificationList] = useState(notifications);

    const unreadCount = notificationList.filter((n) => !n.read).length;
    const filteredNotifications = filter === "all"
        ? notificationList
        : notificationList.filter((n) => n.type === filter);

    const markAsRead = (id: string) => {
        setNotificationList((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                            Bildirimler
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            {unreadCount > 0 ? `${unreadCount} okunmamış bildirim` : "Tüm bildirimler okundu"}
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-border text-muted-foreground hover:text-foreground"
                            onClick={markAllAsRead}
                        >
                            <MaterialIcon name="done_all" size="sm" className="mr-1.5" />
                            Tümünü okundu işaretle
                        </Button>
                    )}
                </div>
            </header>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                    <Button
                        key={option.id}
                        variant="outline"
                        size="sm"
                        className={`border-border ${filter === option.id
                            ? "bg-primary/20 border-primary text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                        onClick={() => setFilter(option.id)}
                    >
                        <MaterialIcon name={option.icon} size="sm" className="mr-1" />
                        {option.label}
                    </Button>
                ))}
            </div>

            {/* Notification List */}
            <div className="space-y-3">
                {filteredNotifications.map((notification) => {
                    const cardContent = (
                        <Card
                            className={`border-border bg-card/80 backdrop-blur transition-all cursor-pointer hover:border-primary/30 ${!notification.read ? "border-l-4 border-l-primary" : ""
                                }`}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <CardContent className="flex items-start gap-4 p-4">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary ${notification.color}`}>
                                    <MaterialIcon name={notification.icon} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                                            {notification.title}
                                        </h3>
                                        <span className="shrink-0 text-xs text-muted-foreground">{notification.time}</span>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                        {notification.message}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                                )}
                            </CardContent>
                        </Card>
                    );

                    return notification.link ? (
                        <Link key={notification.id} href={notification.link}>
                            {cardContent}
                        </Link>
                    ) : (
                        <div key={notification.id}>{cardContent}</div>
                    );
                })}

                {filteredNotifications.length === 0 && (
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <MaterialIcon name="notifications_off" size="xl" className="text-muted-foreground" />
                            <p className="mt-4 text-lg font-medium text-foreground">Bildirim yok</p>
                            <p className="text-sm text-muted-foreground">Bu kategoride bildirim bulunmuyor</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
