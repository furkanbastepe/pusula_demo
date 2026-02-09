"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Check, CheckCircle2, Gift, Flame, Users } from "lucide-react";

interface Notification {
    id: string;
    type: string;
    title: string;
    content: string | null;
    metadata: Record<string, unknown>;
    read: boolean;
    created_at: string;
}

// Demo notifications
const demoNotifications: Notification[] = [
    {
        id: "1",
        type: "review_result",
        title: "✅ Görev Onaylandı!",
        content: "3 Dakikalık Mikro Sunum görevi için değerlendirme sonucu.",
        metadata: { decision: "approved" },
        read: false,
        created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
        id: "2",
        type: "streak_bonus",
        title: "🔥 7 Gün Streak!",
        content: "Tebrikler! 7 günlük streak tamamladın ve 50 bonus XP kazandın!",
        metadata: { streak_days: 7, bonus_xp: 50 },
        read: false,
        created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        id: "3",
        type: "buddy_review",
        title: "👥 Buddy İncelemesi",
        content: "Mehmet görevini inceledi ve yorum bıraktı.",
        metadata: {},
        read: true,
        created_at: new Date(Date.now() - 172800000).toISOString(),
    },
];

const typeIcons: Record<string, typeof CheckCircle2> = {
    review_result: CheckCircle2,
    reminder: Bell,
    milestone: Gift,
    level_ready: Flame,
    buddy_review: Users,
    streak_bonus: Flame,
};

const typeColors: Record<string, string> = {
    review_result: "text-emerald-400",
    reminder: "text-amber-400",
    milestone: "text-purple-400",
    level_ready: "text-orange-400",
    buddy_review: "text-blue-400",
    streak_bonus: "text-orange-400",
};

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
    const [open, setOpen] = useState(false);

    const markAsRead = async (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} dk önce`;
        if (diffHours < 24) return `${diffHours} saat önce`;
        return `${diffDays} gün önce`;
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 text-zinc-400 hover:text-zinc-50"
                >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs font-medium">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-zinc-900 border-zinc-800">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span className="text-zinc-50">Bildirimler</span>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs text-zinc-400 hover:text-zinc-50"
                            onClick={markAllAsRead}
                        >
                            <Check className="mr-1 h-3 w-3" />
                            Tümünü oku
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />

                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-zinc-500">Bildirim yok</div>
                ) : (
                    <>
                        {notifications.slice(0, 5).map((notification) => {
                            const Icon = typeIcons[notification.type] || Bell;
                            const colorClass = typeColors[notification.type] || "text-zinc-400";

                            return (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className={`flex flex-col items-start gap-1 p-3 cursor-pointer ${!notification.read ? "bg-zinc-800/50" : ""
                                        }`}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="flex items-start gap-3 w-full">
                                        <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${colorClass}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium ${!notification.read ? "text-zinc-50" : "text-zinc-400"}`}>
                                                {notification.title}
                                            </p>
                                            {notification.content && (
                                                <p className="text-xs text-zinc-500 truncate">
                                                    {notification.content}
                                                </p>
                                            )}
                                            <p className="text-xs text-zinc-600 mt-1">
                                                {formatTime(notification.created_at)}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                                        )}
                                    </div>
                                </DropdownMenuItem>
                            );
                        })}

                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem asChild>
                            <Link
                                href="/bildirimler"
                                className="flex items-center justify-center text-sm text-zinc-400 hover:text-zinc-50"
                            >
                                Tüm bildirimleri gör
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
