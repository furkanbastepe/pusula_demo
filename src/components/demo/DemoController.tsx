"use client";

import { useDemo } from "@/lib/DemoContext";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Scene = {
    id: number;
    label: string;
    path: string;
    icon: string;
    description: string;
};

const SCENES: Scene[] = [
    { id: 1, label: "Başlangıç", path: "/", icon: "flag", description: "Onboarding & Profil" },
    { id: 2, label: "Panel", path: "/panel", icon: "dashboard", description: "Dashboard & Öneriler" },
    { id: 3, label: "Öğrenme", path: "/ogren", icon: "school", description: "Akademi & MicroLab" },
    { id: 4, label: "Simülasyon", path: "/simulasyon/ai-1", icon: "smart_toy", description: "Traffic AI Yapımı" },
    { id: 5, label: "Merkez", path: "/kapi", icon: "qr_code", description: "Fiziksel Giriş & Kapasite" },
    { id: 6, label: "Mentor", path: "/mentor", icon: "groups", description: "Mentor Görüşmesi (Impact)" }, // Mock route if not exists, user can see 404 but state updates
    { id: 7, label: "Mezuniyet", path: "/mezuniyet", icon: "workspace_premium", description: "Sertifika & Kutlama" },
];

export function DemoController() {
    const { state, dispatch } = useDemo();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [activeSceneId, setActiveSceneId] = useState<number>(1);

    const handleJump = (scene: Scene) => {
        // 1. Update State
        dispatch({ type: "JUMP_TO_CHECKPOINT", payload: { id: scene.id } });

        // 2. Navigate
        router.push(scene.path);

        // 3. Update UI
        setActiveSceneId(scene.id);
        toast.info(`Sahne ${scene.id}: ${scene.label} yüklendi.`);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className="w-72 rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-md text-white"
                    >
                        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-2">
                            <div className="flex items-center gap-2">
                                <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                                <h3 className="font-display text-sm font-bold tracking-wide">
                                    DEMO KONTROL
                                </h3>
                            </div>
                            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                                7-SAHNE MODU
                            </span>
                        </div>

                        <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                            {SCENES.map((scene) => {
                                const isActive = activeSceneId === scene.id;
                                return (
                                    <button
                                        key={scene.id}
                                        onClick={() => handleJump(scene)}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all duration-200 group",
                                            isActive
                                                ? "bg-emerald-600/20 border border-emerald-500/50"
                                                : "hover:bg-white/5 border border-transparent"
                                        )}
                                    >
                                        <div className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                                            isActive ? "bg-emerald-500 text-black" : "bg-white/10 text-slate-400 group-hover:text-white"
                                        )}>
                                            <MaterialIcon name={scene.icon} size="sm" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={cn("text-xs font-bold", isActive ? "text-emerald-400" : "text-slate-300")}>
                                                {scene.id}. {scene.label}
                                            </div>
                                            <div className="text-[10px] text-slate-500 truncate group-hover:text-slate-400">
                                                {scene.description}
                                            </div>
                                        </div>
                                        {isActive && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                            <div className="flex gap-2">
                                <span>XP: <b className="text-white">{state.xp}</b></span>
                                <span>SR: <b className="text-white">{state.level}</b></span>
                            </div>
                            <div>
                                {state.name}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 hover:bg-emerald-500 transition-all hover:scale-110 active:scale-95 z-50"
            >
                <MaterialIcon name={isOpen ? "close" : "tune"} />
            </button>
        </div>
    );
}
