"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useDemo } from "@/lib/DemoContext";
import { SIMULATIONS, SimulationContent } from "@/lib/content/simulations";
import { cn } from "@/lib/utils";

export default function SimulationPlayerPage() {
    const router = useRouter();
    const params = useParams();
    const { state, dispatch } = useDemo();
    const simId = params.id as string;

    const [sim, setSim] = useState<SimulationContent | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [score, setScore] = useState(50); // Start with neutral score
    const [history, setHistory] = useState<string[]>([]); // Track choices
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        const found = SIMULATIONS.find(s => s.id === simId);
        if (!found) {
            toast.error("Simülasyon bulunamadı");
            router.push("/simulasyon");
            return;
        }
        setSim(found);

        // Auto-start if not running
        if (state.simulation.activeScenarioId !== simId || state.simulation.status === "idle") {
            dispatch({ type: "START_SIMULATION", payload: { id: simId } });
        }
    }, [simId, router, state.simulation.activeScenarioId, state.simulation.status, dispatch]);

    const handleOptionSelect = (option: any) => {
        // Apply impact
        // For simplicity, we just use 'score' from option if avail, or calc default
        let stepScoreDelta = option.impact.score || 0;
        setScore(prev => Math.min(100, Math.max(0, prev + stepScoreDelta)));

        setFeedback(option.feedback);
        setHistory([...history, option.id]);
    };

    const handleNextStep = () => {
        setFeedback(null);
        if (sim && currentStepIndex < sim.steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            finishSimulation();
        }
    };

    const finishSimulation = () => {
        if (!sim) return;

        const finalScore = score;
        const xpEarned = Math.round(sim.xp * (finalScore / 100));

        dispatch({
            type: "COMPLETE_SIMULATION",
            payload: {
                id: sim.id,
                score: finalScore,
                xp: xpEarned
            }
        });

        toast.success(`Simülasyon Tamamlandı! Skorun: ${finalScore}/100`);

        // Confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        setTimeout(() => router.push("/simulasyon"), 3000);
    };

    if (!sim) return null;

    // Build Step UI
    // If no steps defined (placeholder), show generic
    const hasSteps = sim.steps && sim.steps.length > 0;
    const currentStep = hasSteps ? sim.steps[currentStepIndex] : null;

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
            {/* Header / HUD */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur border-b border-white/10">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/simulasyon">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <MaterialIcon name="close" />
                            </Button>
                        </Link>
                        <h1 className="font-bold text-lg hidden md:block">{sim.title}</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Başarı Skoru</span>
                            <div className="font-mono text-xl font-bold text-emerald-400">{score}</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Adım</span>
                            <div className="font-mono text-xl font-bold">{currentStepIndex + 1}/{hasSteps ? sim.steps.length : 1}</div>
                        </div>
                    </div>
                </div>
                <Progress value={((currentStepIndex) / (hasSteps ? sim.steps.length : 1)) * 100} className="h-1 bg-white/5" />
            </div>

            <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
                {!hasSteps ? (
                    <div className="text-center py-20">
                        <MaterialIcon name="construction" size="xl" className="text-yellow-500 mb-4" />
                        <h2 className="text-2xl font-bold">Yapım Aşamasında</h2>
                        <p className="text-muted-foreground mt-2">Bu simülasyonun içeriği henüz yüklenmedi.</p>
                        <Button onClick={() => router.push("/simulasyon")} className="mt-8">Geri Dön</Button>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Scenario Context - Left Col */}
                        <div className="md:col-span-2 space-y-6">
                            <Card className="bg-slate-900 border-white/10 overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-indigo-900 to-slate-900 relative">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="bg-emerald-500 text-white border-0 mb-2">Karar Anı</Badge>
                                        <h2 className="text-2xl font-bold text-white shadow-black drop-shadow-lg">{currentStep?.title}</h2>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <p className="text-lg leading-relaxed text-slate-300">
                                        {currentStep?.description}
                                    </p>

                                    {feedback && (
                                        <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 animate-in fade-in slide-in-from-bottom-2">
                                            <div className="flex gap-3">
                                                <MaterialIcon name="info" />
                                                <div>
                                                    <p className="font-medium">Sonuç:</p>
                                                    <p>{feedback}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Options - Right Col */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-uppercase tracking-wider text-muted-foreground ml-1">Seçenekler</h3>
                            {currentStep?.options.map((opt) => (
                                <button
                                    key={opt.id}
                                    disabled={!!feedback}
                                    onClick={() => handleOptionSelect(opt)}
                                    className={cn(
                                        "w-full text-left p-4 rounded-xl border transition-all duration-200 relative group",
                                        feedback
                                            ? "opacity-50 cursor-not-allowed border-white/5 bg-white/5"
                                            : "bg-slate-800/50 border-white/10 hover:bg-slate-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
                                    )}
                                >
                                    <p className="font-medium text-slate-200 group-hover:text-emerald-300 transition-colors">{opt.text}</p>

                                    {/* Visualize impact preview if needed */}
                                </button>
                            ))}

                            {feedback && (
                                <Button
                                    onClick={handleNextStep}
                                    className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 text-lg shadow-lg shadow-emerald-500/20"
                                >
                                    {currentStepIndex < sim.steps.length - 1 ? "Sonraki Adım" : "Simülasyonu Bitir"}
                                    <MaterialIcon name="arrow_forward" className="ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
