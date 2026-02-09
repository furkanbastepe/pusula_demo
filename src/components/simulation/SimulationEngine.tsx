"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Code,
    Database,
    LineChart,
    Palette,
    Globe,
    Shield,
    ChevronRight,
    Check,
    Lock,
    Sparkles,
    Play,
    BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";

// Dynamic import for Monaco to avoid SSR issues
const MonacoEditor = dynamic(
    () => import("@/components/editor/MonacoEditor"),
    { ssr: false, loading: () => <div className="h-96 animate-pulse bg-zinc-900 rounded-lg" /> }
);

// Career path icons and metadata
export const SIMULATION_PATHS = {
    "software-dev": {
        id: "software-dev",
        title: "Yazılım Geliştirici",
        description: "Web ve mobil uygulama geliştirme yetenekleri",
        icon: Code,
        color: "#10b981",
        skills: ["JavaScript", "React", "Node.js", "Git"],
    },
    "data-analysis": {
        id: "data-analysis",
        title: "Veri Analisti",
        description: "Veri analizi ve görselleştirme becerileri",
        icon: LineChart,
        color: "#3b82f6",
        skills: ["Python", "Pandas", "SQL", "Tableau"],
    },
    "product-design": {
        id: "product-design",
        title: "Ürün Tasarımcısı",
        description: "UI/UX ve ürün tasarım süreçleri",
        icon: Palette,
        color: "#f59e0b",
        skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    },
    "digital-marketing": {
        id: "digital-marketing",
        title: "Dijital Pazarlamacı",
        description: "Dijital pazarlama ve içerik stratejisi",
        icon: Globe,
        color: "#8b5cf6",
        skills: ["SEO", "Content Strategy", "Analytics", "Social Media"],
    },
    "database-admin": {
        id: "database-admin",
        title: "Veri Tabanı Yöneticisi",
        description: "Veritabanı tasarımı ve yönetimi",
        icon: Database,
        color: "#ec4899",
        skills: ["PostgreSQL", "MongoDB", "Redis", "Optimization"],
    },
    "cyber-security": {
        id: "cyber-security",
        title: "Siber Güvenlik Uzmanı",
        description: "Güvenlik analizi ve koruma sistemleri",
        icon: Shield,
        color: "#ef4444",
        skills: ["Penetration Testing", "Cryptography", "Network Security", "Forensics"],
    },
} as const;

export type PathId = keyof typeof SIMULATION_PATHS;

// Level progression
export const LEVELS = [
    { id: 0, name: "Giriş", xp: 0, color: "#52525b" },
    { id: 1, name: "Temel", xp: 100, color: "#10b981" },
    { id: 2, name: "Orta", xp: 250, color: "#3b82f6" },
    { id: 3, name: "İleri", xp: 500, color: "#8b5cf6" },
    { id: 4, name: "Uzman", xp: 800, color: "#f59e0b" },
    { id: 5, name: "Usta", xp: 1200, color: "#ef4444" },
];

// Single simulation lesson
export interface SimulationLesson {
    id: string;
    pathId: PathId;
    level: number;
    title: string;
    description: string;
    type: "code" | "quiz" | "project";
    language?: string;
    starterCode?: string;
    expectedOutput?: string;
    hints?: string[];
    xpReward: number;
    gdrReward: number;
}

// Demo lessons
export const DEMO_LESSONS: SimulationLesson[] = [
    {
        id: "sw-1-1",
        pathId: "software-dev",
        level: 1,
        title: "Değişkenler ve Veri Tipleri",
        description: "JavaScript'te değişken tanımlama ve temel veri tiplerini öğrenin.",
        type: "code",
        language: "javascript",
        starterCode: `// Bir isim değişkeni oluşturun ve konsola yazdırın
// Örnek: let isim = "Ayşe";

// Aşağıya kodunuzu yazın:

`,
        expectedOutput: "Merhaba, Ayşe!",
        hints: ["let veya const kullanın", "console.log() ile yazdırın"],
        xpReward: 25,
        gdrReward: 2,
    },
    {
        id: "sw-1-2",
        pathId: "software-dev",
        level: 1,
        title: "Fonksiyonlar",
        description: "Fonksiyon tanımlama ve çağırma işlemlerini öğrenin.",
        type: "code",
        language: "javascript",
        starterCode: `// Bir toplama fonksiyonu yazın
// İki sayıyı alıp toplamını döndürsün

function topla(a, b) {
  // Kodunuzu buraya yazın
}

// Test edin:
console.log(topla(5, 3));
`,
        expectedOutput: "8",
        hints: ["return ifadesini kullanın"],
        xpReward: 30,
        gdrReward: 3,
    },
    {
        id: "da-1-1",
        pathId: "data-analysis",
        level: 1,
        title: "Veri Okuma",
        description: "Python ile CSV dosyasından veri okumayı öğrenin.",
        type: "code",
        language: "python",
        starterCode: `# Pandas ile veri okuma
import pandas as pd

# Bir DataFrame oluşturun
data = {
    'isim': ['Ali', 'Ayşe', 'Mehmet'],
    'yas': [25, 30, 28]
}

df = pd.DataFrame(data)
print(df)
`,
        expectedOutput: "    isim  yas\n0    Ali   25\n1   Ayşe   30\n2 Mehmet   28",
        xpReward: 25,
        gdrReward: 2,
    },
];

// Props for the simulation view
interface SimulationEngineProps {
    lesson: SimulationLesson;
    onComplete?: (passed: boolean, xp: number) => void;
    className?: string;
}

// Main Simulation Engine component
export function SimulationEngine({
    lesson,
    onComplete,
    className,
}: SimulationEngineProps) {
    const [code, setCode] = useState(lesson.starterCode || "");
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showHints, setShowHints] = useState(false);

    const path = SIMULATION_PATHS[lesson.pathId];
    const Icon = path.icon;

    const handleRun = useCallback((code: string) => {
        setConsoleOutput(["▶ Çalıştırılıyor..."]);

        // Simulate execution
        setTimeout(() => {
            // Check if output matches expected
            const passed = lesson.expectedOutput
                ? code.includes("console.log") || code.includes("print")
                : true;

            if (passed) {
                setConsoleOutput(prev => [...prev, "✓ Doğru çıktı!"]);
            } else {
                setConsoleOutput(prev => [...prev, "✗ Beklenen çıktı eşleşmedi"]);
            }
        }, 500);
    }, [lesson.expectedOutput]);

    const handleSubmit = useCallback((code: string) => {
        // Validate code
        const passed = code.trim().length > lesson.starterCode!.trim().length;

        if (passed) {
            setIsCompleted(true);

            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: [path.color, "#10b981", "#3b82f6"],
            });

            // Callback
            onComplete?.(true, lesson.xpReward);
        } else {
            setConsoleOutput(prev => [...prev, "✗ Kod eksik görünüyor. Tüm adımları tamamladığınızdan emin olun."]);
        }
    }, [lesson.starterCode, lesson.xpReward, onComplete, path.color]);

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-lg"
                                style={{ backgroundColor: path.color + "20" }}
                            >
                                <Icon className="h-6 w-6" style={{ color: path.color }} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge
                                        variant="outline"
                                        style={{ borderColor: path.color + "50", color: path.color }}
                                    >
                                        {path.title}
                                    </Badge>
                                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                                        Seviye {lesson.level}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl text-zinc-50">{lesson.title}</CardTitle>
                                <CardDescription className="mt-1">{lesson.description}</CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                                <Sparkles className="mr-1 h-3 w-3" />
                                +{lesson.xpReward} XP
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Editor */}
            <MonacoEditor
                defaultValue={lesson.starterCode}
                value={code}
                onChange={(v) => setCode(v || "")}
                language={lesson.language}
                height="350px"
                showRunButton
                showSubmitButton={!isCompleted}
                showConsole
                consoleOutput={consoleOutput}
                expectedOutput={lesson.expectedOutput}
                onRun={handleRun}
                onSubmit={handleSubmit}
            />

            {/* Hints */}
            {lesson.hints && lesson.hints.length > 0 && (
                <Card className="border-zinc-800 bg-zinc-900">
                    <CardHeader className="pb-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowHints(!showHints)}
                            className="w-full justify-between text-zinc-400 hover:text-zinc-50"
                        >
                            <span className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                İpuçları ({lesson.hints.length})
                            </span>
                            <ChevronRight
                                className={cn("h-4 w-4 transition-transform", showHints && "rotate-90")}
                            />
                        </Button>
                    </CardHeader>
                    {showHints && (
                        <CardContent className="pt-0">
                            <ul className="space-y-2">
                                {lesson.hints.map((hint, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                                        <span className="text-emerald-400">💡</span>
                                        {hint}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    )}
                </Card>
            )}

            {/* Completion State */}
            {isCompleted && (
                <Card className="border-emerald-500/30 bg-emerald-500/5">
                    <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                                <Check className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-emerald-400">Ders Tamamlandı! 🎉</p>
                                <p className="text-sm text-zinc-400">
                                    +{lesson.xpReward} XP ve +{lesson.gdrReward} GDR kazandın
                                </p>
                            </div>
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            Sonraki Ders
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

// Path Selection Card
interface PathCardProps {
    path: typeof SIMULATION_PATHS[PathId];
    progress: number;
    currentLevel: number;
    isLocked?: boolean;
    onClick?: () => void;
}

export function PathCard({
    path,
    progress,
    currentLevel,
    isLocked = false,
    onClick,
}: PathCardProps) {
    const Icon = path.icon;

    return (
        <Card
            className={cn(
                "group border-zinc-800 bg-zinc-900 transition-all cursor-pointer",
                isLocked
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-zinc-700 hover:bg-zinc-800/50"
            )}
            onClick={() => !isLocked && onClick?.()}
        >
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                        style={{ backgroundColor: path.color + "20" }}
                    >
                        {isLocked ? (
                            <Lock className="h-6 w-6 text-zinc-500" />
                        ) : (
                            <Icon className="h-6 w-6" style={{ color: path.color }} />
                        )}
                    </div>
                    <Badge
                        variant="outline"
                        style={{
                            borderColor: isLocked ? "#52525b" : LEVELS[currentLevel].color + "50",
                            color: isLocked ? "#52525b" : LEVELS[currentLevel].color,
                        }}
                    >
                        {LEVELS[currentLevel].name}
                    </Badge>
                </div>

                <h3 className="font-semibold text-zinc-50 mb-1">{path.title}</h3>
                <p className="text-sm text-zinc-500 mb-4">{path.description}</p>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500">İlerleme</span>
                        <span className="text-zinc-400">{Math.round(progress)}%</span>
                    </div>
                    <Progress
                        value={progress}
                        className="h-1.5 bg-zinc-800"
                    />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {path.skills.slice(0, 3).map((skill) => (
                        <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs border-zinc-700 text-zinc-500"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default SimulationEngine;
