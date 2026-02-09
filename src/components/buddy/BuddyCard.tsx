"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Users,
    MessageSquare,
    ClipboardCheck,
    Clock,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { LEVEL_COLORS, LEVEL_LABELS } from "@/lib/constants";

interface BuddyInfo {
    id: string;
    name: string;
    email: string;
    level: string;
    xp: number;
    lastActive?: string;
    currentTask?: string;
    pendingReview?: boolean;
}

interface BuddyCardProps {
    userId?: string;
    compact?: boolean;
}

// Demo buddy data
const demoBuddy: BuddyInfo = {
    id: "buddy-demo",
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    level: "cirak",
    xp: 280,
    lastActive: "5 dk önce",
    currentTask: "T-04: Kullanıcı Görüşmeleri",
    pendingReview: true,
};

export function BuddyCard({ userId, compact = false }: BuddyCardProps) {
    const [buddy, setBuddy] = useState<BuddyInfo | null>(demoBuddy);
    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <Card className="border-zinc-800 bg-zinc-900 animate-pulse">
                <CardContent className="p-4">
                    <div className="h-16 bg-zinc-800 rounded" />
                </CardContent>
            </Card>
        );
    }

    if (!buddy) {
        return (
            <Card className="border-zinc-800 bg-zinc-900">
                <CardContent className="p-4 text-center">
                    <Users className="mx-auto mb-2 h-8 w-8 text-zinc-600" />
                    <p className="text-sm text-zinc-500">Henüz buddy eşleşmesi yapılmadı</p>
                </CardContent>
            </Card>
        );
    }

    if (compact) {
        return (
            <Link href="/buddy">
                <Card className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                    <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback
                                    style={{
                                        backgroundColor: LEVEL_COLORS[buddy.level as keyof typeof LEVEL_COLORS],
                                        color: "#fff"
                                    }}
                                >
                                    {buddy.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-zinc-50 truncate">{buddy.name}</span>
                                    {buddy.pendingReview && (
                                        <Badge className="bg-amber-900/50 text-amber-400 border-0 text-xs">
                                            İnceleme
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-zinc-500 truncate">
                                    {buddy.lastActive}
                                </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-zinc-600" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        );
    }

    return (
        <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-medium text-zinc-400">Buddy&apos;n</span>
                    </div>
                    {buddy.pendingReview && (
                        <Badge className="bg-amber-900/50 text-amber-400 border-0">
                            <ClipboardCheck className="mr-1 h-3 w-3" />
                            İnceleme Bekliyor
                        </Badge>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                        <AvatarFallback
                            className="text-lg"
                            style={{
                                backgroundColor: LEVEL_COLORS[buddy.level as keyof typeof LEVEL_COLORS],
                                color: "#fff"
                            }}
                        >
                            {buddy.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="font-semibold text-zinc-50">{buddy.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge
                                className="text-xs"
                                style={{
                                    backgroundColor: LEVEL_COLORS[buddy.level as keyof typeof LEVEL_COLORS] + "30",
                                    color: LEVEL_COLORS[buddy.level as keyof typeof LEVEL_COLORS]
                                }}
                            >
                                {LEVEL_LABELS[buddy.level as keyof typeof LEVEL_LABELS]}
                            </Badge>
                            <span className="text-xs text-zinc-500">{buddy.xp} XP</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-xs text-zinc-500">
                            <Clock className="h-3 w-3" />
                            <span>{buddy.lastActive}</span>
                        </div>
                    </div>
                </div>

                {buddy.currentTask && (
                    <div className="mt-4 p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
                        <p className="text-xs text-zinc-500 mb-1">Şu an çalıştığı görev:</p>
                        <p className="text-sm text-zinc-300">{buddy.currentTask}</p>
                    </div>
                )}

                <div className="mt-4 flex gap-2">
                    <Link href="/buddy" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-zinc-700">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Profil
                        </Button>
                    </Link>
                    {buddy.pendingReview && (
                        <Link href={`/buddy/inceleme`}>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                <Sparkles className="mr-2 h-4 w-4" />
                                İncele
                            </Button>
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
