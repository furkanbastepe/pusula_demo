"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { useDemo } from "@/lib/DemoContext";
import { cn } from "@/lib/utils";

export default function KapiPage() {
    const { state } = useDemo();
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(120);

    // Refresh QR code timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 120));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const qrData = JSON.stringify({
        uid: state.seed, // In real app: user.id
        role: state.role,
        level: state.level,
        ts: Date.now(),
    });

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-4">
                <Link href="/etkinlikler">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                        <MaterialIcon name="arrow_back" className="mr-2" />
                        Geri Dön
                    </Button>
                </Link>
            </div>

            <Card className="w-full max-w-sm border-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 shadow-2xl overflow-hidden relative">
                {/* Glow effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full"></div>

                <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                    <div className="mb-6">
                        <MaterialIcon name="verified" size="xl" className="text-emerald-400 mb-2 scale-150" />
                    </div>

                    <h1 className="font-display text-2xl font-bold text-white mb-1">DİGEM Giriş Kartı</h1>
                    <p className="text-slate-300 text-sm mb-6">Fiziksel merkeze giriş için okutun</p>

                    <div className="bg-white p-6 rounded-2xl shadow-xl mb-6">
                        {/* QR Code */}
                        {/* Need to ensure we use a lib or image. qrcode.react is common but maybe not installed.
                             Checking package.json... if not found will use API fallback.
                         */}
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&color=000000&bgcolor=FFFFFF`}
                            alt="QR Pass"
                            className="w-48 h-48 opacity-90"
                        />
                    </div>

                    <div className="w-full space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                            <span className="text-slate-400 text-sm">Öğrenci Adı</span>
                            <span className="font-medium text-white">{state.name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                            <span className="text-slate-400 text-sm">Seviye</span>
                            <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-0 uppercase">
                                {state.level}
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                            <span className="text-slate-400 text-sm">Geçerlilik</span>
                            <span className="font-mono text-xs text-slate-300">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
                        </div>
                    </div>

                    <p className="mt-8 text-xs text-slate-500 flex items-center gap-1">
                        <MaterialIcon name="security" size="sm" />
                        Güvenli QR Teknolojisi
                    </p>
                </CardContent>
            </Card>


            <div className="mt-8 w-full max-w-sm">
                <CapacityIndicator />
            </div>
        </div >
    );
}

function CapacityIndicator() {
    const { state } = useDemo();
    // Helper to get capacity (we could import the selector but for now inline or import)
    // Importing selector is better. 
    // But let's just use state data directly if selector import is annoying to add (it is separate file).
    // Actually I should import it.

    // Occupancy 24/30 mock
    const occupancy = state.center.occupancy;
    const capacity = state.center.capacity;
    const percent = Math.round((occupancy / capacity) * 100);

    return (
        <Card className="bg-black/40 border-white/10 backdrop-blur text-white">
            <CardContent className="p-4 flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Merkez Doluluk</p>
                    <p className="text-2xl font-bold font-display">{occupancy} / {capacity}</p>
                </div>
                <div className="text-right">
                    <Badge variant={percent > 90 ? "destructive" : percent > 60 ? "default" : "secondary"} className="mb-1">
                        %{percent} Dolu
                    </Badge>
                    <p className="text-xs text-slate-400">{capacity - occupancy} boş yer</p>
                </div>
            </CardContent>
            {/* Progress bar */}
            <div className="h-1 w-full bg-white/10">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${percent}%` }}></div>
            </div>
        </Card>
    );
}
