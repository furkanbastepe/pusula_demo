"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { toast } from "sonner";

// Types
interface QuizQuestion {
    q: string;
    options: string[];
    correct: number;
    explanation: string;
}

interface QuizContent {
    questions: QuizQuestion[];
}

interface MicroLabStep {
    type: "read" | "quiz" | "checklist" | "reflection" | "upload";
    title: string;
    content?: string | string[] | QuizContent;
    prompt?: string;
    minWords?: number;
    instruction?: string;
    accept?: string[];
    icon: string;
}

// Mock MicroLab data
const mockMicrolab = {
    id: "ML-01",
    title: "Kanıt Zinciri ve Portfolyo Yazımı",
    minutes: 35,
    sdg: 4,
    steps: [
        {
            type: "read" as const,
            title: "Kanıt Nedir?",
            icon: "menu_book",
            content: `Kanıt, yaptığın işin doğrulanabilir kaydıdır. PUSULA'da her görev için kanıt üretmen gerekiyor.

İyi Bir Kanıt:
• Tarih ve saat içerir
• Kimin yaptığı belli
• Sonucu gösterir
• Bağlamı açıklar

Kanıt Türleri:
1. Ekran görüntüsü - En yaygın
2. Video kaydı - Süreç göstermek için
3. Dosya - Dökümanlar, tablolar
4. Link - Canlı projeler

Unutma: Kanıtsız görev = Yapılmamış görev`,
        },
        {
            type: "quiz" as const,
            title: "Mini Quiz",
            icon: "quiz",
            content: {
                questions: [
                    {
                        q: "İyi bir kanıt hangi özelliği taşımalı?",
                        options: ["Çok uzun olmalı", "Doğrulanabilir olmalı", "Renkli olmalı", "Gizli olmalı"],
                        correct: 1,
                        explanation: "Kanıt, başkalarının da doğrulayabileceği şekilde net ve açık olmalı.",
                    },
                    {
                        q: "Aşağıdakilerden hangisi kanıt türü DEĞİLDİR?",
                        options: ["Ekran görüntüsü", "Video kaydı", "Düşünce", "Dosya"],
                        correct: 2,
                        explanation: "Düşünceler kanıt değildir - somut çıktılar gerekir.",
                    },
                ],
            } as QuizContent,
        },
        {
            type: "checklist" as const,
            title: "Kontrol Listesi",
            icon: "checklist",
            content: [
                "Ekran görüntüsü nasıl alınır öğrendim",
                "Video kaydı nasıl yapılır biliyorum",
                "Dosya yükleme sistemini anladım",
                "Portfolyo mantığını kavradım",
            ],
        },
        {
            type: "reflection" as const,
            title: "Düşün ve Yaz",
            icon: "edit_note",
            prompt: "Bu hafta ne öğrendin? Kanıt üretme konusunda kendini ne kadar hazır hissediyorsun? En az 50 kelime yaz.",
            minWords: 50,
        },
        {
            type: "upload" as const,
            title: "İlk Kanıtın",
            icon: "cloud_upload",
            instruction: "Herhangi bir ekran görüntüsü yükle. Bu senin ilk kanıtın olacak!",
            accept: ["image/*"],
        },
    ] as MicroLabStep[],
};

type StepStatus = "pending" | "current" | "done";

export default function MicrolabPlayerPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
    const [reflection, setReflection] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [stepCompleted, setStepCompleted] = useState<boolean[]>(new Array(mockMicrolab.steps.length).fill(false));

    const ml = mockMicrolab;
    const step = ml.steps[currentStep];
    const progress = ((currentStep + 1) / ml.steps.length) * 100;

    const getStepStatus = (index: number): StepStatus => {
        if (index < currentStep) return "done";
        if (index === currentStep) return "current";
        return "pending";
    };

    const canProceed = (): boolean => {
        if (step.type === "read") return true;
        if (step.type === "quiz") {
            const q = step.content as QuizContent;
            return Object.keys(answers).length === (q?.questions?.length || 0);
        }
        if (step.type === "checklist") {
            return checkedItems.filter(Boolean).length === (step.content as string[]).length;
        }
        if (step.type === "reflection") {
            const words = reflection.trim().split(/\s+/).filter(Boolean).length;
            return words >= (step.minWords || 50);
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

        if (currentStep < ml.steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            toast.success("MicroLab tamamlandı! 🎉");
            router.push("/ogren");
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
                        <div className="whitespace-pre-line text-muted-foreground leading-relaxed">{step.content as string}</div>
                    </div>
                );

            case "quiz": {
                const quizContent = step.content as QuizContent;
                if (!quizContent?.questions) return null;
                return (
                    <div className="space-y-6">
                        {quizContent.questions.map((q, qIdx) => (
                            <div key={qIdx} className="rounded-xl border border-border bg-secondary/30 p-4">
                                <p className="mb-4 font-medium text-foreground">{qIdx + 1}. {q.q}</p>
                                <div className="space-y-2">
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
                                                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${showResult
                                                        ? isCorrect
                                                            ? "border-primary bg-primary/10 text-primary"
                                                            : isSelected
                                                                ? "border-destructive bg-destructive/10 text-destructive"
                                                                : "border-border bg-card text-muted-foreground"
                                                        : isSelected
                                                            ? "border-blue-500 bg-blue-500/10 text-blue-400"
                                                            : "border-border bg-card text-foreground hover:border-muted-foreground"
                                                    }`}
                                            >
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-sm">
                                                    {String.fromCharCode(65 + optIdx)}
                                                </span>
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                                {answers[qIdx] !== undefined && (
                                    <div className="mt-3 rounded-lg bg-card p-3 text-sm text-muted-foreground">
                                        <MaterialIcon name="lightbulb" size="sm" className="mr-1.5 text-chart-4" />
                                        {q.explanation}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );
            }

            case "checklist": {
                const items = step.content as string[];
                if (checkedItems.length === 0) {
                    setCheckedItems(new Array(items.length).fill(false));
                }
                return (
                    <div className="space-y-3">
                        {items.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    const newChecked = [...checkedItems];
                                    newChecked[idx] = !newChecked[idx];
                                    setCheckedItems(newChecked);
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${checkedItems[idx]
                                        ? "border-primary bg-primary/10 text-foreground"
                                        : "border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground"
                                    }`}
                            >
                                <MaterialIcon
                                    name={checkedItems[idx] ? "check_circle" : "radio_button_unchecked"}
                                    className={checkedItems[idx] ? "text-primary" : ""}
                                />
                                {item}
                            </button>
                        ))}
                    </div>
                );
            }

            case "reflection": {
                const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;
                const minWords = step.minWords || 50;
                return (
                    <div className="space-y-4">
                        <p className="text-muted-foreground">{step.prompt}</p>
                        <textarea
                            value={reflection}
                            onChange={(e) => setReflection(e.target.value)}
                            placeholder="Düşüncelerini yaz..."
                            className="min-h-[200px] w-full rounded-xl border border-border bg-secondary p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <div className="flex justify-between text-sm">
                            <span className={wordCount >= minWords ? "text-primary" : "text-muted-foreground"}>
                                {wordCount} / {minWords} kelime
                            </span>
                            {wordCount >= minWords && (
                                <span className="text-primary flex items-center gap-1">
                                    <MaterialIcon name="check" size="sm" />
                                    Minimum karşılandı
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
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 p-8 transition-all hover:border-primary hover:bg-secondary/50">
                            <input
                                type="file"
                                accept={step.accept?.join(",") || "image/*"}
                                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                            {uploadedFile ? (
                                <div className="text-center">
                                    <MaterialIcon name="check_circle" size="xl" className="text-primary mb-2" />
                                    <p className="font-medium text-foreground">{uploadedFile.name}</p>
                                    <p className="text-sm text-muted-foreground">Tıklayarak değiştirebilirsin</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <MaterialIcon name="cloud_upload" size="xl" className="text-muted-foreground mb-2" />
                                    <p className="font-medium text-foreground">Dosya yükle</p>
                                    <p className="text-sm text-muted-foreground">veya sürükle bırak</p>
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
            {/* Header */}
            <header className="border-b border-border bg-card/30 backdrop-blur sticky top-0 z-10">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
                    <Link href="/ogren" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <MaterialIcon name="explore" size="sm" className="text-black" />
                        </div>
                        <span className="font-display font-semibold text-foreground">PUSULA</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <MaterialIcon name="schedule" size="sm" className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">~{ml.minutes} dk</span>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-4 py-8">
                {/* Title */}
                <div className="mb-6">
                    <Badge className="mb-2 bg-secondary text-muted-foreground border-0">
                        {ml.id}
                    </Badge>
                    <h1 className="font-display text-2xl font-bold text-foreground">{ml.title}</h1>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                        <span>Adım {currentStep + 1} / {ml.steps.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-secondary" />
                </div>

                {/* Step Indicators */}
                <div className="mb-8 flex justify-center gap-2">
                    {ml.steps.map((s, idx) => {
                        const status = getStepStatus(idx);
                        return (
                            <div
                                key={idx}
                                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${status === "done"
                                        ? "bg-primary/20 text-primary"
                                        : status === "current"
                                            ? "bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/50"
                                            : "bg-secondary text-muted-foreground"
                                    }`}
                            >
                                {status === "done" ? (
                                    <MaterialIcon name="check" size="sm" />
                                ) : (
                                    <MaterialIcon name={s.icon} size="sm" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Step Content Card */}
                <Card className="mb-6 border-border bg-card/80 backdrop-blur">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                                <MaterialIcon name={step.icon} size="lg" className="text-blue-400" />
                            </div>
                            <div>
                                <CardTitle className="text-lg text-foreground">{step.title}</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    {step.type === "read" && "Oku ve anla"}
                                    {step.type === "quiz" && "Sorulara cevap ver"}
                                    {step.type === "checklist" && "Tümünü işaretle"}
                                    {step.type === "reflection" && "Düşün ve yaz"}
                                    {step.type === "upload" && "Dosya yükle"}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>{renderStepContent()}</CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="border-border"
                    >
                        <MaterialIcon name="arrow_back" size="sm" className="mr-2" />
                        Geri
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="bg-primary text-black hover:bg-primary/90"
                    >
                        {currentStep === ml.steps.length - 1 ? "Tamamla" : "Devam"}
                        <MaterialIcon name="arrow_forward" size="sm" className="ml-2" />
                    </Button>
                </div>
            </main>
        </div>
    );
}
