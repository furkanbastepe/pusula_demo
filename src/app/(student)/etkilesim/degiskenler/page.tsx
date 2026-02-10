"use client";

import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { TrafficLightPreview } from '@/components/simulation/TrafficLightPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, ArrowRight, Zap, Code2, Terminal, Variable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Confetti from 'canvas-confetti';
import { toast } from 'sonner';
import Link from 'next/link';

// Lesson definition
interface Lesson {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    targetValue: string | number | boolean;
    successMessage: string;
}

const LESSONS: Lesson[] = [
    {
        id: 'ai-1',
        title: 'Değişkenler: Trafik Lambası',
        description: "Trafik lambasını kontrol etmek için `trafik_lambası` değişkenini değiştir.",
        initialCode: `// Trafik Lambası Simülasyonu
// Değişkeni değiştirerek lambayı kontrol et!
// Değerler: 'kırmızı', 'sarı', 'yeşil'

let trafik_lambası = 'kırmızı';

// Görevi tamamlamak için lambayı 'yeşil' yap!`,
        targetValue: 'green',
        successMessage: "Harika! Değişkenlerin nasıl çalıştığını anladın."
    },
    {
        id: 'ai-2',
        title: 'Değişkenler: Sıralı Kontrol',
        description: "Önce 'kırmızı', sonra 'sarı' yap.",
        initialCode: `// Trafik akışını başlatmamız lazım.
// Önce kırmızıyı yak, bekle, sonra sarıyı yak.
// (Bu simülasyonda sadece son değer geçerlidir, 'sarı' yapmayı dene)

let trafik_lambası = 'kırmızı';`,
        targetValue: 'yellow',
        successMessage: "Süper! Değişken değerlerini değiştirebiliyorsun."
    }
];

export default function DegiskenlerPage() {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const currentLesson = LESSONS[currentLevelIndex];

    const [code, setCode] = useState(currentLesson.initialCode);
    const [activeColor, setActiveColor] = useState<'red' | 'yellow' | 'green' | 'off'>('off');
    const [status, setStatus] = useState<'IDLE' | 'SUCCESS'>('IDLE');
    const [logs, setLogs] = useState<string[]>([]);

    // Reset when lesson changes
    useEffect(() => {
        setCode(currentLesson.initialCode);
        setStatus('IDLE');
        setLogs([]);
        setActiveColor('off');

        // Initial parse to set color if code is valid
        setTimeout(() => {
            // Trigger parse manually or just wait for the effect
        }, 100);
    }, [currentLevelIndex, currentLesson]);

    // Real-time Code Parsing
    useEffect(() => {
        if (status === 'SUCCESS') return;

        // Debounce slightly to avoid flickering
        const timer = setTimeout(() => {
            let success = false;

            // Filter out comment lines
            const codeLines = code.split('\n').filter(line => !line.trim().startsWith('//'));
            const codeWithoutComments = codeLines.join('\n');

            // Match "let trafik_lambası = 'renk'"
            const matchLetColor = codeWithoutComments.match(/let\s+trafik_lambası\s*=\s*["'](kırmızı|sarı|yeşil)["']/);

            const turkishToEnglish: Record<string, 'red' | 'yellow' | 'green'> = {
                'kırmızı': 'red',
                'sarı': 'yellow',
                'yeşil': 'green'
            };

            if (matchLetColor && matchLetColor[1]) {
                const turkishVal = matchLetColor[1];
                const englishVal = turkishToEnglish[turkishVal];

                if (englishVal) {
                    if (englishVal !== activeColor) {
                        setActiveColor(englishVal);
                        addLog(`> Değişken değişti: trafik_lambası = "${turkishVal}"`);
                    }

                    // Check success condition
                    if (currentLesson.id === 'ai-1' && englishVal === 'green') {
                        success = true;
                    }
                    if (currentLesson.id === 'ai-2' && englishVal === 'yellow') {
                        success = true;
                    }
                }
            } else {
                if (activeColor !== 'off') setActiveColor('off');
            }

            if (success) {
                setStatus('SUCCESS');

                var end = Date.now() + (3 * 1000);
                var colors = ['#10b981', '#ffffff'];

                (function frame() {
                    Confetti({
                        particleCount: 2,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: colors
                    });
                    Confetti({
                        particleCount: 2,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: colors
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }());

                toast.success(currentLesson.successMessage);
                addLog(`> GÖREV TAMAMLANDI: ${currentLesson.successMessage}`);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [code, activeColor, currentLesson, status]);

    const addLog = (msg: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
    };

    const handleReset = () => {
        setCode(currentLesson.initialCode);
        setStatus('IDLE');
        setActiveColor('off');
        addLog("> Sistem sıfırlandı.");
    };

    const handleNextLevel = () => {
        if (currentLevelIndex < LESSONS.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
        } else {
            toast("Tüm seviyeler tamamlandı!");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-emerald-500/30">
            {/* Header */}
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                        <Terminal size={18} className="text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-sm tracking-wide text-white">Etkileşimli Öğrenme</h1>
                        <p className="text-xs text-white/50">Bölüm 1: Değişkenler</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                        <span className="text-xs font-mono text-white/60">SEVİYE {currentLevelIndex + 1}/{LESSONS.length}</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Left Panel: Editor */}
                <div className="w-1/2 flex flex-col border-r border-white/10 bg-[#0a0a0f]">
                    {/* Instructions */}
                    <div className="p-6 border-b border-white/10 bg-gradient-to-r from-emerald-950/20 to-transparent">
                        <div className="flex items-center gap-2 mb-2">
                            <Variable className="w-4 h-4 text-emerald-400" />
                            <h2 className="text-lg font-bold text-white">{currentLesson.title}</h2>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {currentLesson.description}
                        </p>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 relative group">
                        <div className="absolute top-0 right-0 p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="outline" size="sm" onClick={handleReset} className="h-8 text-xs gap-2 bg-black/50 border-white/10 hover:bg-white/10">
                                <RotateCcw size={14} />
                                Sıfırla
                            </Button>
                        </div>
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                lineNumbers: 'on',
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 20, bottom: 20 },
                                renderLineHighlight: 'all',
                                cursorBlinking: 'smooth',
                                cursorSmoothCaretAnimation: 'on',
                                smoothScrolling: true,
                            }}
                        />
                    </div>

                    {/* Logs / Console */}
                    <div className="h-32 border-t border-white/10 bg-black p-4 overflow-y-auto font-mono text-xs">
                        <div className="text-white/30 mb-2 flex items-center gap-2">
                            <Terminal size={12} />
                            <span>Sistem Günlüğü</span>
                        </div>
                        <AnimatePresence mode="popLayout">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-emerald-400/80 mb-1"
                                >
                                    {log}
                                </motion.div>
                            ))}
                            {logs.length === 0 && (
                                <div className="text-white/20 italic">Henüz bir işlem yok...</div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel: Visualization */}
                <div className="w-1/2 bg-[#050505] p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                    <div className="relative w-full max-w-md aspect-[4/3]">
                        <TrafficLightPreview activeColor={activeColor} />
                    </div>

                    {/* Success Overlay */}
                    <AnimatePresence>
                        {status === 'SUCCESS' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4"
                            >
                                <div className="bg-emerald-500 text-black px-6 py-4 rounded-xl shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center gap-3 font-bold">
                                    <CheckCircle2 size={24} />
                                    <span>{currentLesson.successMessage}</span>
                                </div>

                                {currentLevelIndex < LESSONS.length - 1 && (
                                    <Button
                                        onClick={handleNextLevel}
                                        className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 h-auto text-lg font-bold shadow-xl animate-bounce"
                                    >
                                        Sonraki Seviye <ArrowRight className="ml-2" />
                                    </Button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
