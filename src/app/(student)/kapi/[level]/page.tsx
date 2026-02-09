"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDemo } from "@/lib/DemoContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { LevelBadge } from "@/components/common/LevelBadge";
import { LEVEL_COLORS, LEVEL_LABELS, XP_THRESHOLDS } from "@/lib/constants";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface GateRequirement {
    id: string;
    label: string;
    type: "xp" | "task" | "microlab" | "meeting";
    target: number;
    current: number;
    fulfilled: boolean;
    icon: string;
}

interface GateData {
    level: string;
    nextLevel: string;
    requirements: GateRequirement[];
    allFulfilled: boolean;
    canAdvance: boolean;
}

// Gate requirements data
const gateConfigs: Record<string, GateData> = {
    cirak: {
        level: "cirak",
        nextLevel: "kalfa",
        requirements: [
            { id: "xp", label: "800 XP topla", type: "xp", target: 800, current: 320, fulfilled: false, icon: "star" },
            { id: "tasks", label: "10 görevi tamamla", type: "task", target: 10, current: 4, fulfilled: false, icon: "task_alt" },
            { id: "microlabs", label: "5 MicroLab bitir", type: "microlab", target: 5, current: 2, fulfilled: false, icon: "science" },
            { id: "meeting", label: "Mentor toplantısına katıl", type: "meeting", target: 1, current: 1, fulfilled: true, icon: "groups" },
        ],
        allFulfilled: false,
        canAdvance: false,
    },
    kalfa: {
        level: "kalfa",
        nextLevel: "usta",
        requirements: [
            { id: "xp", label: "2000 XP topla", type: "xp", target: 2000, current: 850, fulfilled: false, icon: "star" },
            { id: "tasks", label: "25 görevi tamamla", type: "task", target: 25, current: 12, fulfilled: false, icon: "task_alt" },
            { id: "microlabs", label: "8 MicroLab bitir", type: "microlab", target: 8, current: 8, fulfilled: true, icon: "science" },
            { id: "project", label: "Mini proje sun", type: "meeting", target: 1, current: 0, fulfilled: false, icon: "rocket_launch" },
        ],
        allFulfilled: false,
        canAdvance: false,
    },
    usta: {
        level: "usta",
        nextLevel: "graduate",
        requirements: [
            { id: "xp", label: "4000 XP topla", type: "xp", target: 4000, current: 2100, fulfilled: false, icon: "star" },
            { id: "tasks", label: "40 görevi tamamla", type: "task", target: 40, current: 28, fulfilled: false, icon: "task_alt" },
            { id: "microlabs", label: "10 MicroLab bitir", type: "microlab", target: 10, current: 10, fulfilled: true, icon: "science" },
            { id: "capstone", label: "Capstone projesi tamamla", type: "task", target: 1, current: 0, fulfilled: false, icon: "workspace_premium" },
            { id: "demo", label: "Demo Day'de sun", type: "meeting", target: 1, current: 0, fulfilled: false, icon: "present_to_all" },
        ],
        allFulfilled: false,
        canAdvance: false,
    },
};

const levelDescriptions: Record<string, { title: string; desc: string }> = {
    cirak: { title: "Çıraklık Kapısı", desc: "Kalfa olmak için gereksinimleri tamamla" },
    kalfa: { title: "Kalfalık Kapısı", desc: "Usta olmak için gereksinimleri tamamla" },
    usta: { title: "Ustalık Kapısı", desc: "Mezun olmak için gereksinimleri tamamla" },
};

export default function GatePage() {
    const params = useParams();
    const router = useRouter();
    const level = params.level as string;

    const { currentUser, setStage, nextStage } = useDemo();
    const [gate, setGate] = useState<GateData | null>(null);
    const [loading, setLoading] = useState(true);
    const [advancing, setAdvancing] = useState(false);

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            const levelConfig = gateConfigs[level] || gateConfigs.cirak;

            // Mock requirements based on demo user data
            const requirements = levelConfig.requirements.map((req) => {
                let current = req.current;

                // Use real demo user data where possible
                if (req.type === "xp") current = currentUser.xp;
                // For other types, we'll just use the mock values or satisfied values if user level is higher
                const isHigherLevel =
                    (currentUser.level === "kalfa" && level === "cirak") ||
                    (currentUser.level === "usta" && (level === "cirak" || level === "kalfa")) ||
                    (currentUser.level === "graduate" && level !== "graduate");

                if (isHigherLevel) {
                    current = req.target;
                }

                return { ...req, current, fulfilled: current >= req.target };
            });

            const allFulfilled = requirements.every((r) => r.fulfilled);

            setGate({
                ...levelConfig,
                requirements,
                allFulfilled,
                canAdvance: allFulfilled && currentUser.level === level,
            });
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [level, currentUser]);

    const handleAdvance = async () => {
        if (!gate?.canAdvance) return;
        setAdvancing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Advance stage in demo
        nextStage();

        // Confetti celebration!
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#13ec5b", "#22c55e", "#3b82f6", "#facc15"],
        });

        toast.success(`Tebrikler! ${LEVEL_LABELS[gate.nextLevel as keyof typeof LEVEL_LABELS]} seviyesine yükseldin! 🎉`);
        setTimeout(() => router.push("/panel"), 2500);
        setAdvancing(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
                <MaterialIcon name="progress_activity" size="xl" className="animate-spin text-primary" />
            </div>
        );
    }

    if (!gate) {
        return (
            <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
                <Card className="border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-8 text-center">
                        <MaterialIcon name="lock" size="xl" className="text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Bu seviye kapısı bulunamadı.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const fulfilledCount = gate.requirements.filter((r) => r.fulfilled).length;
    const progressPercent = (fulfilledCount / gate.requirements.length) * 100;
    const levelInfo = levelDescriptions[level] || levelDescriptions.cirak;

    return (
        <div className="min-h-screen bg-gradient-hero">
            {/* Decorative Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-chart-4/5 blur-3xl" />
            </div>

            {/* Header */}
            <header className="relative border-b border-border bg-card/30 backdrop-blur">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
                    <Link href="/panel" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <MaterialIcon name="explore" size="sm" className="text-black" />
                        </div>
                        <span className="font-display font-semibold text-foreground">PUSULA</span>
                    </Link>
                    <Link href="/harita">
                        <Button variant="outline" size="sm" className="border-border">
                            <MaterialIcon name="map" size="sm" className="mr-1.5" />
                            Harita
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="relative mx-auto max-w-2xl px-4 py-12">
                {/* Gate Header - Ceremony Style */}
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-6 relative">
                        {/* Outer glow ring */}
                        <div className={`absolute inset-0 rounded-full blur-xl ${gate.allFulfilled ? "bg-primary/40" : "bg-secondary"}`} />

                        {/* Gate icon container */}
                        <div
                            className={`relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 ${gate.allFulfilled
                                ? "border-primary bg-primary/20 glow-green"
                                : "border-border bg-secondary"
                                }`}
                        >
                            <MaterialIcon
                                name={gate.allFulfilled ? "lock_open" : "lock"}
                                size="xl"
                                className={gate.allFulfilled ? "text-primary" : "text-muted-foreground"}
                            />
                        </div>
                    </div>

                    <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                        {levelInfo.title}
                    </h1>
                    <p className="text-muted-foreground mb-4">{levelInfo.desc}</p>

                    {/* Level Transition */}
                    <div className="flex items-center justify-center gap-4">
                        <LevelBadge level={level as "cirak" | "kalfa" | "usta" | "graduate"} variant="medium" />
                        <MaterialIcon name="arrow_forward" className="text-muted-foreground" />
                        <LevelBadge level={gate.nextLevel as "cirak" | "kalfa" | "usta" | "graduate"} variant="medium" />
                    </div>
                </div>

                {/* Progress Card */}
                <Card className="mb-6 border-border bg-card/80 backdrop-blur">
                    <CardContent className="p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">İlerleme</span>
                            <span className="font-medium text-foreground">
                                {fulfilledCount} / {gate.requirements.length} tamamlandı
                            </span>
                        </div>
                        <Progress value={progressPercent} className="h-3 bg-secondary" />
                        {progressPercent === 100 && (
                            <p className="mt-2 text-center text-sm text-primary">
                                <MaterialIcon name="celebration" size="sm" className="mr-1" />
                                Tüm gereksinimler tamamlandı!
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Requirements */}
                <Card className="mb-6 border-border bg-card/80 backdrop-blur">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-foreground">Gereksinimler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {gate.requirements.map((req) => (
                            <div
                                key={req.id}
                                className={`flex items-center justify-between rounded-xl border p-4 transition-all ${req.fulfilled
                                    ? "border-primary/30 bg-primary/10"
                                    : "border-border bg-secondary/30"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${req.fulfilled ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                                        }`}>
                                        <MaterialIcon name={req.fulfilled ? "check_circle" : req.icon} />
                                    </div>
                                    <span className={req.fulfilled ? "text-foreground" : "text-muted-foreground"}>
                                        {req.label}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className={`font-medium ${req.fulfilled ? "text-primary" : "text-foreground"}`}>
                                        {req.current} / {req.target}
                                    </span>
                                    {!req.fulfilled && (
                                        <Progress
                                            value={(req.current / req.target) * 100}
                                            className="mt-1 h-1.5 w-20 bg-secondary"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Action Card */}
                {gate.allFulfilled ? (
                    <Card className="border-primary/30 bg-primary/10 glow-green">
                        <CardContent className="p-8 text-center">
                            <MaterialIcon name="auto_awesome" size="xl" className="text-primary mb-4" />
                            <h3 className="text-2xl font-bold text-foreground mb-2">Hazırsın! 🎉</h3>
                            <p className="text-muted-foreground mb-6">
                                Tüm gereksinimleri tamamladın. Bir sonraki seviyeye geçmeye hazırsın!
                            </p>
                            <Button
                                size="lg"
                                className="bg-primary text-black hover:bg-primary/90 glow-green"
                                onClick={handleAdvance}
                                disabled={advancing || !gate.canAdvance}
                            >
                                {advancing ? (
                                    <MaterialIcon name="progress_activity" size="sm" className="mr-2 animate-spin" />
                                ) : (
                                    <MaterialIcon name="upgrade" size="sm" className="mr-2" />
                                )}
                                {LEVEL_LABELS[gate.nextLevel as keyof typeof LEVEL_LABELS]} Ol
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-8 text-center">
                            <MaterialIcon name="hourglass_empty" size="xl" className="text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium text-foreground mb-2">Henüz Hazır Değilsin</h3>
                            <p className="text-muted-foreground mb-6">
                                Tüm gereksinimleri tamamladığında bu kapı açılacak.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <Link href="/gorevler">
                                    <Button variant="outline" className="border-border">
                                        <MaterialIcon name="task_alt" size="sm" className="mr-1.5" />
                                        Görevlere Git
                                    </Button>
                                </Link>
                                <Link href="/ogren">
                                    <Button variant="outline" className="border-border">
                                        <MaterialIcon name="school" size="sm" className="mr-1.5" />
                                        MicroLab'lara Git
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
