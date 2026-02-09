"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface GDRComponents {
    teknik_rol: number;
    takim: number;
    sunum: number;
    guvenilirlik: number;
    sosyal_etki: number;
}

interface GDRCardProps {
    gdrScore: number;
    components: GDRComponents;
    rankPercentile?: number; // Top X%
    showDetails?: boolean;
    className?: string;
}

const GDR_LABELS = {
    teknik_rol: { label: "Teknik Rol", weight: "35%", color: "bg-cyan-500" },
    takim: { label: "Takım", weight: "20%", color: "bg-purple-500" },
    sunum: { label: "Sunum", weight: "20%", color: "bg-amber-500" },
    guvenilirlik: { label: "Güvenilirlik", weight: "15%", color: "bg-emerald-500" },
    sosyal_etki: { label: "Sosyal Etki", weight: "10%", color: "bg-pink-500" },
} as const;

export function GDRCard({
    gdrScore,
    components,
    rankPercentile,
    showDetails = true,
    className,
}: GDRCardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-400";
        if (score >= 60) return "text-cyan-400";
        if (score >= 40) return "text-amber-400";
        return "text-zinc-400";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return "Mükemmel";
        if (score >= 60) return "İyi";
        if (score >= 40) return "Gelişiyor";
        return "Başlangıç";
    };

    return (
        <Card className={cn("border-zinc-800 bg-zinc-900 overflow-hidden", className)}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base text-zinc-50">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                            <Trophy className="h-4 w-4 text-cyan-400" />
                        </div>
                        GDR Skoru
                    </CardTitle>
                    {rankPercentile && (
                        <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                            <TrendingUp className="h-3 w-3" />
                            Top {rankPercentile}%
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Ana Skor */}
                <div className="flex items-end justify-between">
                    <div>
                        <div className={cn("text-4xl font-bold", getScoreColor(gdrScore))}>
                            {gdrScore}
                        </div>
                        <div className="text-xs text-zinc-500">{getScoreLabel(gdrScore)}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <Sparkles className="h-3 w-3" />
                        <span>/ 100</span>
                    </div>
                </div>

                {/* Bileşen Barları */}
                {showDetails && (
                    <div className="space-y-2.5">
                        {(Object.keys(GDR_LABELS) as (keyof typeof GDR_LABELS)[]).map((key) => {
                            const info = GDR_LABELS[key];
                            const value = components[key];
                            return (
                                <div key={key} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-zinc-400">{info.label}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-zinc-500">{info.weight}</span>
                                            <span className="font-medium text-zinc-300">{value}</span>
                                        </div>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                                        <div
                                            className={cn("h-full rounded-full transition-all duration-500", info.color)}
                                            style={{ width: `${value}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Liderlik Tablosu Linki */}
                <Link
                    href="/liderlik"
                    className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800/50 px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-300"
                >
                    <Trophy className="h-3 w-3" />
                    Liderlik Tablosunu Gör
                </Link>
            </CardContent>
        </Card>
    );
}

// Mini versiyon - Sadece skor ve küçük bar
export function GDRCardMini({
    gdrScore,
    components,
    className,
}: Omit<GDRCardProps, "showDetails" | "rankPercentile">) {
    return (
        <Link href="/liderlik">
            <Card
                className={cn(
                    "border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700 hover:bg-zinc-800/80",
                    className
                )}
            >
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                            <Trophy className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-500">GDR Skoru</span>
                                <span className="text-lg font-bold text-zinc-50">{gdrScore}</span>
                            </div>
                            {/* Mini 5-segment bar */}
                            <div className="mt-1 flex h-1.5 gap-0.5 overflow-hidden rounded-full">
                                <div
                                    className="bg-cyan-500"
                                    style={{ width: `${components.teknik_rol * 0.35}%` }}
                                />
                                <div
                                    className="bg-purple-500"
                                    style={{ width: `${components.takim * 0.2}%` }}
                                />
                                <div
                                    className="bg-amber-500"
                                    style={{ width: `${components.sunum * 0.2}%` }}
                                />
                                <div
                                    className="bg-emerald-500"
                                    style={{ width: `${components.guvenilirlik * 0.15}%` }}
                                />
                                <div
                                    className="bg-pink-500"
                                    style={{ width: `${components.sosyal_etki * 0.1}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
