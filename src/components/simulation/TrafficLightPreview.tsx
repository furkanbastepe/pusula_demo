"use client";

import { motion } from 'framer-motion';
import { TrafficCone, Code2 } from 'lucide-react';

interface TrafficLightPreviewProps {
    activeColor: 'red' | 'yellow' | 'green' | 'off';
}

export function TrafficLightPreview({ activeColor }: TrafficLightPreviewProps) {
    const glowColor = activeColor === 'red' ? 'rgba(255,0,0,0.15)' :
        activeColor === 'yellow' ? 'rgba(255,170,0,0.15)' :
            activeColor === 'green' ? 'rgba(0,255,0,0.15)' : 'transparent';

    const colorTurkish = activeColor === 'red' ? 'kırmızı' :
        activeColor === 'yellow' ? 'sarı' :
            activeColor === 'green' ? 'yeşil' : 'kapalı';

    return (
        <div className="relative flex flex-col h-full bg-[#0a0a0f] overflow-hidden rounded-2xl border border-white/10">
            {/* Header - Sol üst */}
            <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <TrafficCone className="w-5 h-5 text-amber-400" />
                <span className="font-mono font-bold text-white">Trafik Lambası</span>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative flex items-center justify-center">
                {/* Environmental Glow */}
                <motion.div
                    animate={{ background: `radial-gradient(circle at 50% 40%, ${glowColor}, transparent 60%)` }}
                    className="absolute inset-0 pointer-events-none transition-colors duration-500"
                />

                {/* Traffic Light */}
                <div className="relative z-10 flex flex-col items-center">
                    {/* Housing */}
                    <div className="bg-[#1a1a1a] p-5 rounded-3xl border-2 border-[#333] shadow-2xl flex flex-col gap-4">
                        <Light color="red" active={activeColor === 'red'} />
                        <Light color="yellow" active={activeColor === 'yellow'} />
                        <Light color="green" active={activeColor === 'green'} />
                    </div>
                    {/* Pole */}
                    <div className="w-4 h-24 bg-[#333] -mt-1 rounded-b" />
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                    <motion.div
                        animate={{
                            backgroundColor: activeColor === 'red' ? 'rgba(239,68,68,0.2)' :
                                activeColor === 'yellow' ? 'rgba(245,158,11,0.2)' :
                                    activeColor === 'green' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)',
                            borderColor: activeColor === 'red' ? 'rgba(239,68,68,0.5)' :
                                activeColor === 'yellow' ? 'rgba(245,158,11,0.5)' :
                                    activeColor === 'green' ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.2)',
                        }}
                        className="px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider"
                    >
                        <span className={
                            activeColor === 'red' ? 'text-red-400' :
                                activeColor === 'yellow' ? 'text-amber-400' :
                                    activeColor === 'green' ? 'text-green-400' : 'text-white/50'
                        }>
                            {colorTurkish}
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Footer - Değişken Açıklaması */}
            <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="flex items-center gap-2 mb-2 text-white/40 text-xs font-mono">
                    <Code2 className="w-3 h-3" />
                    Değişkenler
                </div>
                <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between bg-white/5 rounded px-3 py-2">
                        <span className="text-cyan-400">trafik_lambası</span>
                        <span className="text-white">= "{colorTurkish}"</span>
                    </div>
                    <div className="text-white/30 text-[10px] leading-relaxed">
                        💡 Değerleri: "kırmızı", "sarı", "yeşil"
                    </div>
                </div>
            </div>
        </div>
    );
}

function Light({ color, active }: { color: string; active: boolean }) {
    const getGlow = () => {
        if (!active) return 'inset 0 0 15px rgba(0,0,0,0.5)';
        switch (color) {
            case 'red': return '0 0 60px #ff0000, inset 0 0 15px #ff0000';
            case 'yellow': return '0 0 60px #ffaa00, inset 0 0 15px #ffaa00';
            case 'green': return '0 0 60px #00ff00, inset 0 0 15px #00ff00';
            default: return 'none';
        }
    };

    const getBg = () => {
        switch (color) {
            case 'red': return active ? '#ff3333' : '#330000';
            case 'yellow': return active ? '#ffcc33' : '#332200';
            case 'green': return active ? '#33ff33' : '#003300';
            default: return '#000';
        }
    };

    return (
        <motion.div
            animate={{
                backgroundColor: getBg(),
                boxShadow: getGlow(),
            }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-full border-2 border-black/50"
        />
    );
}
