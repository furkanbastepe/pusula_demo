"use client";

import { useDemo } from "@/lib/DemoContext";
import { DEMO_STAGES, DemoStage } from "@/lib/demo-data";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DemoController() {
    const { currentStage, setStage, nextStage, prevStage, currentUser } = useDemo();
    const [isOpen, setIsOpen] = useState(true);

    const stages = Object.keys(DEMO_STAGES) as DemoStage[];
    const currentIndex = stages.indexOf(currentStage);
    const progress = ((currentIndex + 1) / stages.length) * 100;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className="w-80 rounded-xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md"
                    >
                        <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
                            <div className="flex items-center gap-2">
                                <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                                <h3 className="font-display text-sm font-bold text-foreground">
                                    PUSULA Demo Modu
                                </h3>
                            </div>
                            <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                v1.0
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Current Context */}
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">
                                    Aktif Sahne:
                                </p>
                                <p className="font-semibold text-foreground">
                                    {DEMO_STAGES[currentStage].label}
                                </p>
                                <p className="text-xs text-muted-foreground italic">
                                    "{DEMO_STAGES[currentStage].context}"
                                </p>
                            </div>

                            {/* User State Preview */}
                            <div className="rounded-lg bg-secondary/50 p-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Kullanıcı:</span>
                                    <span className="font-medium">{currentUser.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Seviye:</span>
                                    <span className="font-medium capitalize text-primary">
                                        {currentUser.level}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">XP:</span>
                                    <span className="font-medium">{currentUser.xp}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between gap-2">
                                <button
                                    onClick={prevStage}
                                    disabled={currentIndex === 0}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-secondary/80 disabled:opacity-50"
                                    title="Önceki Sahne (Ctrl + Sol)"
                                >
                                    <MaterialIcon name="chevron_left" />
                                </button>

                                <div className="flex-1 text-center text-xs font-medium text-muted-foreground">
                                    {currentIndex + 1} / {stages.length}
                                </div>

                                <button
                                    onClick={nextStage}
                                    disabled={currentIndex === stages.length - 1}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-black hover:bg-primary/90 disabled:opacity-50 shadow-glow"
                                    title="Sonraki Sahne (Ctrl + Sağ)"
                                >
                                    <MaterialIcon name="chevron_right" />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            {/* Stage Select Dropdown (Optional/Hidden by default) */}
                            <select
                                value={currentStage}
                                onChange={(e) => setStage(e.target.value as DemoStage)}
                                className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                            >
                                {stages.map((stage) => (
                                    <option key={stage} value={stage}>
                                        {DEMO_STAGES[stage].label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-black shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95"
            >
                <MaterialIcon name={isOpen ? "close" : "smart_toy"} />
            </button>
        </div>
    );
}
