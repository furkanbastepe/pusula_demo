"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { useDemo } from "@/lib/DemoContext";
import { CAREER_PATHS } from "@/lib/content/path-packs";
import { CareerPathId, OnboardingState } from "@/lib/demo/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function OnboardingPage() {
    const router = useRouter();
    const { dispatch } = useDemo();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form state
    const [goal, setGoal] = useState<string>("");
    const [level, setLevel] = useState<string>("");
    const [selectedPath, setSelectedPath] = useState<CareerPathId | null>(null);
    const [city, setCity] = useState<string>("eskisehir");
    const [challenge, setChallenge] = useState<string>("");

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    const handleNext = async () => {
        if (step < totalSteps) {
            setStep(step + 1);
            return;
        }

        // Final step - save profile and start journey
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API

            if (!selectedPath) throw new Error("Path not selected");

            const onboardingData: OnboardingState = {
                completed: true,
                completedAt: new Date().toISOString(),
                goal: goal as any,
                skillLevel: level as any,
                primaryPath: selectedPath,
                secondaryPaths: [],
                city: "eskisehir",
                centerId: "digem-eskisehir",
                challenge: challenge as any
            };

            // Dispatch to engine
            dispatch({ type: "COMPLETE_ONBOARDING", payload: onboardingData });

            toast.success("Yolculuğun başlıyor! 🚀");
            router.push("/panel");
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Profil kaydedilemedi");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const isStepValid = () => {
        switch (step) {
            case 1: return !!goal;
            case 2: return !!level;
            case 3: return !!selectedPath;
            case 4: return !!city;
            case 5: return !!challenge;
            default: return false;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
                <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-chart-2/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <Card className="relative w-full max-w-2xl border-border bg-card/90 backdrop-blur shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <CardHeader className="text-center pt-8">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <MaterialIcon name="explore" size="lg" className="text-black" />
                    </div>
                    <CardTitle className="font-display text-3xl text-foreground">
                        {step === 1 && "Hedefini Belirle"}
                        {step === 2 && "Deneyim Seviyen"}
                        {step === 3 && "Kariyer Yolunu Seç"}
                        {step === 4 && "Lokasyon"}
                        {step === 5 && "Kendine Meydan Oku"}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-lg">
                        {step === 1 && "Seni buraya getiren motivasyon nedir?"}
                        {step === 2 && "Teknoloji dünyasındaki yerin neresi?"}
                        {step === 3 && "Hangi alanda uzmanlaşmak istersin?"}
                        {step === 4 && "Sana en yakın PUSULA merkezini seç."}
                        {step === 5 && "İlk sözünü ver, rozetini kap!"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8 p-6 md:p-10 h-[400px] overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Goal */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid md:grid-cols-3 gap-4"
                            >
                                {[
                                    { id: "career", icon: "work", title: "Kariyer", desc: "İş bulmak veya yükselmek istiyorum" },
                                    { id: "project", icon: "rocket_launch", title: "Proje", desc: "Hayalimdeki projeyi geliştirmek istiyorum" },
                                    { id: "explore", icon: "travel_explore", title: "Keşif", desc: "Teknoloji dünyasını tanımak istiyorum" }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setGoal(item.id)}
                                        className={cn(
                                            "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 h-full gap-4 hover:scale-105",
                                            goal === item.id
                                                ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                                : "border-border bg-secondary/30 hover:border-primary/50"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-4 rounded-full",
                                            goal === item.id ? "bg-primary text-black" : "bg-secondary text-muted-foreground"
                                        )}>
                                            <MaterialIcon name={item.icon} size="lg" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className={cn("font-bold mb-1", goal === item.id ? "text-primary" : "text-foreground")}>{item.title}</h3>
                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* Step 2: Level */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid gap-4"
                            >
                                {[
                                    { id: "beginner", icon: "school", title: "Çırak (Başlangıç)", desc: "Henüz yeniyim, temelleri öğrenmek istiyorum." },
                                    { id: "intermediate", icon: "construction", title: "Kalfa (Orta)", desc: "Projeler geliştirdim, kendimi ilerletmek istiyorum." },
                                    { id: "advanced", icon: "engineering", title: "Usta (İleri)", desc: "Profesyonel deneyimim var, uzmanlaşmak istiyorum." }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setLevel(item.id)}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left hover:translate-x-1",
                                            level === item.id
                                                ? "border-primary bg-primary/10"
                                                : "border-border bg-secondary/30 hover:border-primary/50"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3 rounded-lg",
                                            level === item.id ? "bg-primary/20 text-primary" : "bg-card text-muted-foreground"
                                        )}>
                                            <MaterialIcon name={item.icon} size="md" />
                                        </div>
                                        <div>
                                            <h3 className={cn("font-bold", level === item.id ? "text-primary" : "text-foreground")}>{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* Step 3: Path Selection (Power Packs) */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid lg:grid-cols-2 gap-4 h-full overflow-y-auto pr-2"
                            >
                                {CAREER_PATHS.map((path) => (
                                    <button
                                        key={path.id}
                                        onClick={() => setSelectedPath(path.id)}
                                        className={cn(
                                            "group flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg relative overflow-hidden",
                                            selectedPath === path.id
                                                ? "border-primary bg-primary/5"
                                                : "border-border bg-secondary/20 hover:border-primary/50"
                                        )}
                                    >
                                        {/* Glow effect */}
                                        {selectedPath === path.id && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                                        )}

                                        <div className={cn(
                                            "p-3 rounded-lg shrink-0 z-10",
                                            selectedPath === path.id ? "bg-primary text-black" : "bg-secondary text-muted-foreground group-hover:text-foreground"
                                        )}>
                                            <MaterialIcon name={path.icon} size="md" />
                                        </div>
                                        <div className="z-10">
                                            <h3 className={cn("font-bold mb-1", selectedPath === path.id ? "text-primary" : "text-foreground")}>{path.title}</h3>
                                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{path.description}</p>
                                            <div className="flex gap-2">
                                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full border border-current opacity-70", path.color)}>
                                                    {path.finalProject}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* Step 4: City */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col items-center justify-center h-full space-y-6"
                            >
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border group cursor-pointer" onClick={() => setCity("eskisehir")}>
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
                                    <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1555966380-9ee3a8b733b1?w=800&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" />

                                    <div className="absolute bottom-0 left-0 p-6 z-20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MaterialIcon name="location_on" className="text-primary" />
                                            <h3 className="text-2xl font-bold text-white">Eskişehir DİGEM</h3>
                                        </div>
                                        <p className="text-slate-200 text-sm">Uluönder, Tepebaşı</p>
                                    </div>

                                    <div className="absolute top-4 right-4 z-20 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        <MaterialIcon name="check_circle" size="sm" />
                                        Seçili Merkez
                                    </div>
                                </div>

                                <p className="text-center text-muted-foreground text-sm max-w-md">
                                    Şu an sadece Eskişehir DİGEM aktif. Yakında yeni şehirler eklenecektir.
                                </p>
                            </motion.div>
                        )}

                        {/* Step 5: Challenge */}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid gap-4"
                            >
                                {[
                                    { id: "daily", icon: "calendar_today", title: "Her Gün 1 Adım", desc: "Her gün en az 30dk ayıracağıma söz veriyorum." },
                                    { id: "project", icon: "code", title: "Proje Odaklı", desc: "Ay sonuna kadar ilk projemi tamamlayacağım." },
                                    { id: "community", icon: "groups", title: "Topluluk Lideri", desc: "Öğrendiklerimi başkalarıyla paylaşacağım." }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setChallenge(item.id)}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105",
                                            challenge === item.id
                                                ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                                : "border-border bg-secondary/30 hover:border-emerald-500/50"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3 rounded-lg",
                                            challenge === item.id ? "bg-emerald-500 text-black" : "bg-card text-muted-foreground"
                                        )}>
                                            <MaterialIcon name={item.icon} size="md" />
                                        </div>
                                        <div>
                                            <h3 className={cn("font-bold", challenge === item.id ? "text-emerald-500" : "text-foreground")}>{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}

                    </AnimatePresence>
                </CardContent>

                {/* Footer Navigation */}
                <div className="p-6 border-t border-border flex justify-between bg-card/50">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={step === 1 || loading}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <MaterialIcon name="arrow_back" size="sm" className="mr-2" />
                        Geri
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={!isStepValid() || loading}
                        className={cn(
                            "min-w-[140px] font-bold transition-all",
                            step === totalSteps
                                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                : "bg-primary text-black hover:bg-primary/90"
                        )}
                    >
                        {loading ? (
                            <MaterialIcon name="progress_activity" size="sm" className="animate-spin mr-2" />
                        ) : step === totalSteps ? (
                            <>
                                Başla
                                <MaterialIcon name="rocket_launch" size="sm" className="ml-2" />
                            </>
                        ) : (
                            <>
                                Devam Et
                                <MaterialIcon name="arrow_forward" size="sm" className="ml-2" />
                            </>
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
