"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { useDemo } from "@/lib/DemoContext";
import confetti from "canvas-confetti";
import { getGraduationChecklist } from "@/lib/demo/selectors";
import { cn } from "@/lib/utils";

export default function MezuniyetPage() {
    const { state } = useDemo();
    const router = useRouter();
    const [showCertificate, setShowCertificate] = useState(false);

    const checklist = getGraduationChecklist(state);
    const isGraduated = checklist.every(i => i.isComplete);

    useEffect(() => {
        if (isGraduated) {
            const duration = 5 * 1000;
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

            setTimeout(() => setShowCertificate(true), 1500);
        }
    }, [isGraduated]);

    // Format date for certificate
    const today = new Date().toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' });

    if (!isGraduated) {
        return (
            <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md space-y-6"
                >
                    <div className="bg-yellow-500/20 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                        <MaterialIcon name="workspace_premium" size="xl" className="text-yellow-500 scale-150" />
                    </div>
                    <h1 className="text-3xl font-bold font-display">Henüz Mezun Değilsin</h1>
                    <p className="text-muted-foreground">
                        Mezuniyet için aşağıdaki kriterleri tamamlaman gerekiyor:
                    </p>

                    <div className="bg-card/50 border border-white/5 rounded-xl p-6 text-left space-y-4">
                        {checklist.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                                    item.isComplete
                                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                                        : "bg-secondary border-white/10 text-muted-foreground"
                                )}>
                                    <MaterialIcon name={item.isComplete ? "check" : "circle"} size="sm" />
                                </div>
                                <div className="flex-1">
                                    <p className={cn(
                                        "font-medium",
                                        item.isComplete ? "text-foreground" : "text-muted-foreground"
                                    )}>{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href="/panel">
                        <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                            Panele Dön & Tamamla
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full animate-pulse delay-1000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-4xl"
            >
                <div className="text-center mb-8">
                    <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 mb-4 px-4 py-1 text-sm uppercase tracking-widest">
                        Tebrikler
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                        Yolculuğun Tamamlandı
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Geleceğin dijital lideri olarak mezun oldun.
                    </p>
                </div>

                {showCertificate && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="perspective-1000"
                    >
                        <Card className="border-8 border-double border-slate-700 bg-[#fffbf0] text-slate-800 shadow-2xl relative overflow-hidden transform-style-3d">
                            {/* Decorative Corner Borders */}
                            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-slate-800"></div>
                            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-slate-800"></div>
                            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-slate-800"></div>
                            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-slate-800"></div>

                            <CardContent className="p-12 md:p-20 text-center relative z-10">
                                <div className="mb-8">
                                    <MaterialIcon name="school" className="text-6xl text-slate-800" />
                                </div>

                                <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-widest uppercase mb-2 border-b-2 border-slate-800 inline-block pb-2">
                                    Başarı Sertifikası
                                </h2>

                                <p className="mt-8 text-lg md:text-xl font-serif italic text-slate-600">
                                    Bu sertifika, aşağıda ismi bulunan kişinin
                                </p>

                                <h1 className="text-4xl md:text-6xl font-script text-indigo-700 my-8 py-4">
                                    {state.name}
                                </h1>

                                <p className="text-lg md:text-xl font-serif text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                    <strong>Pusula Dijital Gençlik Merkezi</strong> bünyesindeki
                                    Veri Bilimi ve Dijital Okuryazarlık eğitim programını
                                    üstün başarıyla tamamladığını belgeler.
                                </p>

                                <div className="mt-16 flex justify-around items-end">
                                    <div className="text-center">
                                        <div className="w-40 border-b border-slate-400 mb-2"></div>
                                        <p className="font-serif font-bold text-sm">Program Direktörü</p>
                                    </div>
                                    <div className="text-center">
                                        <MaterialIcon name="verified" className="text-yellow-600 text-5xl mb-2 opacity-80" />
                                        <p className="font-mono text-xs text-slate-400">{today}</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-40 border-b border-slate-400 mb-2"></div>
                                        <p className="font-serif font-bold text-sm">Eğitmen</p>
                                    </div>
                                </div>
                            </CardContent>

                            {/* Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                <MaterialIcon name="workspace_premium" className="text-[500px]" />
                            </div>
                        </Card>
                    </motion.div>
                )}

                <div className="mt-10 flex justify-center gap-4">
                    <Button
                        size="lg"
                        className="bg-white text-black hover:bg-slate-200 shadow-xl"
                        onClick={() => window.print()}
                    >
                        <MaterialIcon name="print" className="mr-2" />
                        Sertifikayı Yazdır
                    </Button>
                    <Link href="/panel">
                        <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            Panele Dön
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
