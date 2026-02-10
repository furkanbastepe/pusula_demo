"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useDemo } from "@/lib/DemoContext";
import { MICROLABS, MicroLabContent, QuizContent } from "@/lib/content/microlabs";
import { cn } from "@/lib/utils";

type StepStatus = "pending" | "current" | "done";

export default function MicrolabPlayerPage() {
    const router = useRouter();
    const params = useParams();
    const { state, dispatch } = useDemo();
    const microlabId = params.id as string;

    const [microlab, setMicrolab] = useState<MicroLabContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
    const [reflection, setReflection] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [stepCompleted, setStepCompleted] = useState<boolean[]>([]);

    useEffect(() => {
        const ml = MICROLABS.find(m => m.id === microlabId);
        if (!ml) {
            toast.error("MicroLab bulunamadı");
            router.push("/ogren");
            return;
        }

        // Ensure steps exist
        if (!ml.steps || ml.steps.length === 0) {
            toast.error("Bu modülün içeriği hazırlanıyor.");
            router.push("/ogren");
            return;
        }

        setMicrolab(ml);
        setStepCompleted(new Array(ml.steps.length).fill(false));
        setLoading(false);
    }, [microlabId, router]);

    if (loading || !microlab) {
        return (
            <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="text-muted-foreground">MicroLab yükleniyor...</p>
                </div>
            </div>
        );
    }

    const step = microlab.steps[currentStep];
    const isAlreadyCompleted = state.completedMicrolabs.includes(microlabId);

    const getStepStatus = (index: number): StepStatus => {
        if (index < currentStep) return "done";
        if (index === currentStep) return "current";
        return "pending";
    };

    const canProceed = (): boolean => {
        if (isAlreadyCompleted) return true;

        if (step.type === "read") return true;
        if (step.type === "quiz") {
            const q = step.content as QuizContent;
            return Object.keys(answers).length === (q?.questions?.length || 0);
        }
        if (step.type === "checklist") {
            return checkedItems.filter(Boolean).length === (step.content as string[])?.length;
        }
        if (step.type === "reflection") {
            const words = reflection.trim().split(/\s+/).filter(Boolean).length;
            return words >= (step.minWords || 10);
        }
        if (step.type === "upload") {
            return uploadedFile !== null;
        }
        return true;
    };

    const handleNext = () => {
        const newCompleted = [...stepCompleted];
        newCompleted[currentStep] = true;
        setStepCompleted(newCompleted);

        if (currentStep < microlab.steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // FINISH
            if (!isAlreadyCompleted) {
                dispatch({
                    type: "COMPLETE_MICROLAB",
                    payload: {
                        id: microlab.id,
                        xp: microlab.xp
                    }
                });
                toast.success(`Tebrikler! ${microlab.title} tamamlandı. +${microlab.xp} XP kazandın! 🎉`);

                // Fire confetti
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

                const interval: any = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }, 250);

            } else {
                toast.success("Modül tekrar tamamlandı.");
            }

            // Wait slightly before redirecting to let confetti show
            setTimeout(() => {
                router.push("/ogren");
            }, 2000);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (step.type) {
            case "read":
                return (
                    <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-line text-muted-foreground leading-relaxed text-lg">{step.content as string}</div>
                    </div>
                );

            case "quiz": {
                const quizContent = step.content as QuizContent;
                if (!quizContent?.questions) return null;
                return (
                    <div className="space-y-6">
                        {quizContent.questions.map((q, qIdx) => (
                            <div key={qIdx} className="rounded-xl border border-border bg-secondary/30 p-6">
                                <p className="mb-4 font-medium text-foreground text-lg">{qIdx + 1}. {q.q}</p>
                                <div className="space-y-3">
                                    {q.options.map((opt, optIdx) => {
                                        const isSelected = answers[qIdx] === optIdx;
                                        const isCorrect = optIdx === q.correct;
                                        const showResult = answers[qIdx] !== undefined;

                                        return (
                                            <button
                                                key={optIdx}
                                                onClick={() => {
                                                    if (!showResult) {
                                                        setAnswers({ ...answers, [qIdx]: optIdx });
                                                    }
                                                }}
                                                disabled={showResult}
                                                className={cn(
                                                    "flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all",
                                                    showResult
                                                        ? isCorrect
                                                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                                                            : isSelected
                                                                ? "border-red-500 bg-red-500/10 text-red-500"
                                                                : "border-border bg-card text-muted-foreground opacity-50"
                                                        : isSelected
                                                            ? "border-blue-500 bg-blue-500/10 text-blue-400"
                                                            : "border-border bg-card text-foreground hover:border-muted-foreground hover:bg-secondary/50"
                                                )}
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-sm">
                                                    {String.fromCharCode(65 + optIdx)}
                                                </span>
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                                {answers[qIdx] !== undefined && (
                                    <div className="mt-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-400">
                                        <div className="flex items-start gap-2">
                                            <MaterialIcon name="lightbulb" size="sm" className="mt-0.5" />
                                            <p>{q.explanation}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );
            }

            case "checklist": {
                const items = step.content as string[];
                return (
                    <div className="space-y-3">
                        {items?.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    const newChecked = [...checkedItems];
                                    if (newChecked.length < items.length) {
                                        for (let i = newChecked.length; i < items.length; i++) newChecked.push(false);
                                    }
                                    newChecked[idx] = !newChecked[idx];
                                    setCheckedItems(newChecked);
                                }}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all",
                                    checkedItems[idx]
                                        ? "border-emerald-500 bg-emerald-500/10 text-foreground"
                                        : "border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground"
                                )}
                            >
                                <MaterialIcon
                                    name={checkedItems[idx] ? "check_circle" : "radio_button_unchecked"}
                                    className={checkedItems[idx] ? "text-emerald-500" : ""}
                                />
                                {item}
                            </button>
                        ))}
                    </div>
                );
            }

            case "reflection": {
                const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;
                const minWords = step.minWords || 10;
                return (
                    <div className="space-y-4">
                        <p className="text-muted-foreground text-lg">{step.prompt}</p>
                        <textarea
                            value={reflection}
                            onChange={(e) => setReflection(e.target.value)}
                            placeholder="Düşüncelerini buraya yaz..."
                            className="min-h-[200px] w-full rounded-xl border border-border bg-secondary/50 p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-lg leading-relaxed"
                        />
                        <div className="flex justify-between text-sm">
                            <span className={wordCount >= minWords ? "text-emerald-400" : "text-muted-foreground"}>
                                {wordCount} / {minWords} kelime
                            </span>
                            {wordCount >= minWords && (
                                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                                    <MaterialIcon name="check" size="sm" />
                                    Harika!
                                </span>
                            )}
                        </div>
                    </div>
                );
            }

            case "upload":
                return (
                    <div className="space-y-4">
                        <p className="text-muted-foreground">{step.instruction}</p>
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 p-12 transition-all hover:border-primary hover:bg-secondary/50 group">
                            <input
                                type="file"
                                accept={step.accept?.join(",") || "image/*"}
                                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                            {uploadedFile ? (
                                <div className="text-center">
                                    <MaterialIcon name="check_circle" size="xl" className="text-emerald-500 mb-4 scale-125" />
                                    <p className="font-medium text-foreground text-lg">{uploadedFile.name}</p>
                                    <p className="text-sm text-muted-foreground mt-2">Değiştirmek için tıkla</p>
                                </div>
                            ) : (
                                <div className="text-center group-hover:scale-105 transition-transform">
                                    <MaterialIcon name="cloud_upload" size="xl" className="text-muted-foreground mb-4 scale-125 group-hover:text-primary transition-colors" />
                                    <p className="font-medium text-foreground text-lg">Dosya Seç</p>
                                    <p className="text-sm text-muted-foreground mt-2">veya buraya sürükle</p>
                                </div>
                            )}
                        </label>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero">
            <header className="border-b border-border bg-card/30 backdrop-blur sticky top-0 z-50">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                    <Link href="/ogren" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                            <MaterialIcon name="arrow_back" size="sm" className="text-black" />
                        </div>
                        <span className="font-display font-semibold text-foreground hidden sm:inline">Müfredata Dön</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        {microlab.sdgAlignment?.map(sdg => (
                            <SDGBadge key={sdg} sdg={sdg} variant="small" />
                        ))}
                        <div className="h-4 w-px bg-border mx-2"></div>
                        <MaterialIcon name="schedule" size="sm" className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{microlab.duration}</span>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-4 py-8 pb-32">
                <div className="mb-8 text-center">
                    <Badge className="mb-4 bg-secondary/50 text-muted-foreground border-0 hover:bg-secondary">
                        {microlab.category} • {microlab.xp} XP
                    </Badge>
                    <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">{microlab.title}</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{microlab.description}</p>
                </div>

                <div className="mb-12 sticky top-20 z-40 bg-background/80 backdrop-blur-xl p-4 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="mb-3 flex items-center justify-between text-sm font-medium text-muted-foreground">
                        <span>Adım {currentStep + 1} / {microlab.steps.length}</span>
                        <span className="text-emerald-400">{Math.round(((currentStep) / microlab.steps.length) * 100)}%</span>
                    </div>
                    <Progress value={((currentStep) / microlab.steps.length) * 100} className="h-2 bg-secondary" />
                </div>

                <div className="mb-12 flex justify-center gap-4 flex-wrap">
                    {microlab.steps.map((s, idx) => {
                        const status = getStepStatus(idx);
                        return (
                            <div
                                key={idx}
                                className={cn(
                                    "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500",
                                    status === "done"
                                        ? "bg-emerald-500/20 text-emerald-400 scale-90"
                                        : status === "current"
                                            ? "bg-blue-500 text-black ring-4 ring-blue-500/20 scale-110 shadow-lg shadow-blue-500/20"
                                            : "bg-secondary text-muted-foreground scale-90 opacity-50"
                                )}
                            >
                                {status === "done" ? (
                                    <MaterialIcon name="check" size="md" />
                                ) : (
                                    <MaterialIcon name={s.icon} size="md" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <Card className="mb-8 border-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                    <CardHeader className="border-b border-border/50 bg-secondary/20">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                                <MaterialIcon name={step.icon} size="lg" className="text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl text-foreground">{step.title}</CardTitle>
                                <CardDescription className="text-muted-foreground mt-1">
                                    {step.type === "read" && "Okuma Parçası"}
                                    {step.type === "quiz" && "Bilgi Yarışması"}
                                    {step.type === "checklist" && "Kontrol Listesi"}
                                    {step.type === "reflection" && "Düşünce Köşesi"}
                                    {step.type === "upload" && "Proje Teslimi"}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">{renderStepContent()}</CardContent>
                </Card>

                <div className="flex justify-between items-center mt-8">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <MaterialIcon name="arrow_back" size="sm" className="mr-2" />
                        Önceki Adım
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        size="lg"
                        className={cn(
                            "min-w-[160px] transition-all duration-300",
                            canProceed()
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25"
                                : "bg-secondary text-muted-foreground"
                        )}
                    >
                        {currentStep === microlab.steps.length - 1 ? (isAlreadyCompleted ? "Tekrar Bitir" : "Tamamla & XP Kazan") : "Devam Et"}
                        <MaterialIcon name={currentStep === microlab.steps.length - 1 ? "check_circle" : "arrow_forward"} size="sm" className="ml-2" />
                    </Button>
                </div>
            </main>
        </div>
    );
}
