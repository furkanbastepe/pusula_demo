"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/DemoContext";
import { SimulationEngine } from "@/components/simulation/engine/SimulationEngine";
import { getLesson, getNextLessonId } from "@/lib/content/simulations";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function SimulationPage(props: PageProps) {
    const params = use(props.params);
    const router = useRouter();
    const demo = useDemo();
    const [isLoading, setIsLoading] = useState(true);

    const lesson = getLesson(params.id);

    useEffect(() => {
        // Simulate a short loading delay for effect
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-zinc-500">Simülasyon ortamı hazırlanıyor...</p>
                </div>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-black gap-6">
                <h1 className="text-2xl font-bold text-white">Simülasyon Bulunamadı</h1>
                <p className="text-zinc-400">Aradığın ders mevcut değil veya kaldırılmış.</p>
                <Button variant="outline" onClick={() => router.push("/panel")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Panele Dön
                </Button>
            </div>
        );
    }

    const handleComplete = (score: number) => {
        // Update global state
        demo.dispatch({
            type: "ADD_XP",
            payload: { amount: 50 }
        });

        // Ensure phase is updated if this was the first task
        if (demo.state.phase === 'discovery') {
            // Optional: transition phase or just rely on XP
        }
    };

    const handleNext = () => {
        const nextId = getNextLessonId(lesson.id);
        if (nextId) {
            router.push(`/simulasyon/${nextId}`);
        } else {
            toast.success("Tüm simülasyonları tamamladın!");
            router.push("/panel");
        }
    };

    return (
        <div className="flex h-screen w-full flex-col bg-black overflow-hidden relative">
            {/* Header / Nav */}
            <div className="flex items-center gap-4 px-6 py-3 border-b border-white/10 shrink-0 bg-zinc-950/50 backdrop-blur z-10">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="text-zinc-400 hover:text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Çıkış
                </Button>
                <div className="h-4 w-px bg-white/10" />
                <div>
                    <h1 className="text-sm font-medium text-white">{lesson.title}</h1>
                    <p className="text-xs text-zinc-500 hidden sm:block">Simülasyon Ortamı v2.0</p>
                </div>
            </div>

            {/* Main Engine Area */}
            <div className="flex-1 min-h-0 bg-[#09090b] p-4">
                <SimulationEngine
                    lesson={lesson}
                    onComplete={handleComplete}
                    onNext={handleNext}
                />
            </div>
        </div>
    );
}
