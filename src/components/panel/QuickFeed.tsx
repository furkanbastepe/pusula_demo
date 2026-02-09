"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Trophy,
    Sparkles,
    Calendar,
    Award,
    Zap,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FeedItem {
    id: string;
    type: "achievement" | "problem" | "workshop" | "milestone" | "announcement";
    title: string;
    description?: string;
    link?: string;
    timestamp: string;
    xp?: number;
}

interface QuickFeedProps {
    items?: FeedItem[];
    className?: string;
}

const FEED_CONFIG = {
    achievement: {
        icon: Award,
        color: "text-amber-400",
        bgColor: "bg-amber-500/10",
    },
    problem: {
        icon: Zap,
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/10",
    },
    workshop: {
        icon: Calendar,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
    },
    milestone: {
        icon: Trophy,
        color: "text-emerald-400",
        bgColor: "bg-emerald-500/10",
    },
    announcement: {
        icon: Bell,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
    },
} as const;

// Demo feed items
const DEMO_FEED: FeedItem[] = [
    {
        id: "1",
        type: "achievement",
        title: "Yeni Rozet: İlk Adım",
        description: "İlk MicroLab'ını tamamladın!",
        timestamp: "Bugün",
        xp: 50,
    },
    {
        id: "2",
        type: "problem",
        title: "Yeni Problem: Su Tasarrufu",
        description: "SDG 6 - Temiz Su ve Sanitasyon",
        link: "/pazar",
        timestamp: "2 saat önce",
    },
    {
        id: "3",
        type: "workshop",
        title: "Atölye: Kod İnceleme",
        description: "Yarın 14:00'te başlıyor",
        link: "/pazar?tab=workshops",
        timestamp: "Yarın",
    },
    {
        id: "4",
        type: "milestone",
        title: "7 Günlük Seri!",
        description: "Tebrikler, pes etmedin!",
        timestamp: "Dün",
        xp: 50,
    },
];

export function QuickFeed({ items = DEMO_FEED, className }: QuickFeedProps) {
    return (
        <Card className={cn("border-zinc-800 bg-zinc-900", className)}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base text-zinc-50">
                        <Sparkles className="h-4 w-4 text-amber-400" />
                        Neler Oluyor?
                    </CardTitle>
                    <Badge variant="outline" className="border-zinc-700 text-xs text-zinc-400">
                        {items.length} yeni
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
                {items.slice(0, 4).map((item) => {
                    const config = FEED_CONFIG[item.type];
                    const Icon = config.icon;

                    const Content = (
                        <div
                            className={cn(
                                "flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-800/30 p-3 transition-all",
                                item.link && "hover:border-zinc-700 hover:bg-zinc-800/50 cursor-pointer"
                            )}
                        >
                            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", config.bgColor)}>
                                <Icon className={cn("h-4 w-4", config.color)} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-medium text-zinc-200 truncate">
                                        {item.title}
                                    </p>
                                    {item.xp && (
                                        <Badge variant="outline" className="shrink-0 border-amber-500/20 text-xs text-amber-400">
                                            +{item.xp} XP
                                        </Badge>
                                    )}
                                </div>
                                {item.description && (
                                    <p className="text-xs text-zinc-500 truncate">{item.description}</p>
                                )}
                                <p className="mt-1 text-xs text-zinc-600">{item.timestamp}</p>
                            </div>
                        </div>
                    );

                    return item.link ? (
                        <Link key={item.id} href={item.link}>
                            {Content}
                        </Link>
                    ) : (
                        <div key={item.id}>{Content}</div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
