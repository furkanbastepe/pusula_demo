'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, RotateCcw, Check, ChevronRight, Terminal,
    AlertCircle, CheckCircle2, Trophy, ArrowRight,
    Maximize2, Minimize2, Code2, Cpu, Zap
} from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { MonacoEditor } from '@/components/editor/MonacoEditor';
import { useAudio } from '@/hooks/useAudio';

// Previews
import { TrafficLightPreview } from '../TrafficLightPreview';
import { CarPreview } from './CarPreview';
import { FireAlarmPreview } from './FireAlarmPreview';
import { ParkingPreview } from './ParkingPreview';
import { EfficiencyPreview } from './EfficiencyPreview';
import { BrakePreview } from './BrakePreview';

// --- Types ---

export type SimulationType = 'traffic-ai' | 'software-dev' | 'ecommerce' | 'cyber-security' | 'data-science' | 'veri-analizi' | 'yapay-zeka-ml' | 'dijital-pazarlama' | 'dijital-tasarim' | 'e-ticaret';

export interface DemoLesson {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    targetValues: Record<string, any>;
    successMessage: string;
    hints: string[];
    type: SimulationType;
    previewComponent?: string; // Component name to render
}

export type SimulationStatus = 'idle' | 'running' | 'success' | 'error';

interface SimulationEngineProps {
    lesson: DemoLesson;
    onComplete: (score: number) => void;
    onNext?: () => void;
}

// --- Component ---

export function SimulationEngine({ lesson, onComplete, onNext }: SimulationEngineProps) {
    const [code, setCode] = useState(lesson.initialCode);
    const [status, setStatus] = useState<SimulationStatus>('idle');
    const [logs, setLogs] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [variables, setVariables] = useState<Record<string, any>>({});
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Preview State
    const [previewState, setPreviewState] = useState<any>({});

    const audio = useAudio();

    // Reset when lesson changes
    useEffect(() => {
        setCode(lesson.initialCode);
        setStatus('idle');
        setLogs([]);
        setError(null);
        setVariables({});
        setPreviewState({});
    }, [lesson]);

    // Parse variables from code for live preview update
    useEffect(() => {
        // Simple regex to find variable declarations, works for basic demo cases
        // Finds: let/const/var variableName = value;
        const variableRegex = /(?:let|const|var)\s+(\w+)\s*=\s*([^;]+)/g;
        let match;
        const newVars: Record<string, any> = {};

        while ((match = variableRegex.exec(code)) !== null) {
            const [_, name, valueStr] = match;
            try {
                // Safe-ish eval for primitive values
                // eslint-disable-next-line no-eval
                const value = eval(valueStr);
                newVars[name] = value;
            } catch (e) {
                // Ignore parse errors while typing
            }
        }

        setVariables(newVars);

        // Update specific preview states based on variables
        // This maps code variables to UI props
        if (lesson.type === 'traffic-ai') {
            if (lesson.id === 'ai-1') { // Traffic Light
                setPreviewState({ activeColor: newVars['trafik_lambası'] || 'off' });
            } else if (lesson.id === 'ai-2') { // Speed
                setPreviewState({ speed: newVars['hiz'] || 0 });
            } else if (lesson.id === 'ai-3') { // Fire Alarm
                setPreviewState({ alarmActive: newVars['acil_durum'] === true });
            } else if (lesson.id === 'ai-4') { // Parking
                setPreviewState({ carCount: newVars['arac_sayisi'] || 0 });
            } else if (lesson.id === 'ai-5') { // Efficiency
                setPreviewState({ efficiency: newVars['verimlilik'] || 0 });
            } else if (lesson.id === 'ai-6') { // Brake
                setPreviewState({ brakeActive: newVars['fren'] === true });
            }
        }
    }, [code, lesson.id, lesson.type]);

    const handleRun = async () => {
        setStatus('running');
        setLogs(['> Kod derleniyor...', '> Simülasyon başlatılıyor...']);
        setError(null);
        audio.play('click');

        // Simulate execution time
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            // 1. Static Analysis Check
            // Check if required variables exist in code
            const missingVars = Object.keys(lesson.targetValues).filter(key => !variables.hasOwnProperty(key));

            if (missingVars.length > 0) {
                throw new Error(`Eksik değişkenler: ${missingVars.join(', ')}. Lütfen bu değişkenleri tanımla.`);
            }

            // 2. Logic Validation
            let success = true;
            for (const [key, targetValue] of Object.entries(lesson.targetValues)) {
                if (variables[key] !== targetValue) {
                    success = false;
                    throw new Error(`'${key}' değişkeni yanlış değerde. Beklenen: ${targetValue}, Senin değerin: ${variables[key]}`);
                }
            }

            // Special check for arrays or objects if needed (simple equality for now)

            if (success) {
                setStatus('success');
                setLogs(prev => [...prev, '> Testler başarıyla geçti!', '> Simülasyon tamamlandı.']);
                audio.play('success');
                toast.success(lesson.successMessage);
                onComplete(100);
            }

        } catch (err: any) {
            setStatus('error');
            const errorMessage = err.message || "Bilinmeyen bir hata oluştu";
            setError(errorMessage);
            setLogs(prev => [...prev, `x Hata: ${errorMessage}`]);
            audio.play('error');
            toast.error("Kodunda hatalar var, lütfen kontrol et.");
        }
    };

    const handleReset = () => {
        setCode(lesson.initialCode);
        setStatus('idle');
        setLogs([]);
        setError(null);
        setVariables({});
        audio.play('click');
    };

    const renderPreview = () => {
        if (lesson.type === 'traffic-ai') {
            switch (lesson.id) {
                case 'ai-1':
                    return <TrafficLightPreview activeColor={previewState.activeColor || 'off'} />;
                case 'ai-2':
                    return <CarPreview speed={Number(previewState.speed) || 0} />;
                case 'ai-3':
                    return <FireAlarmPreview alarmActive={Boolean(previewState.alarmActive)} />;
                case 'ai-4':
                    return <ParkingPreview carCount={Number(previewState.carCount) || 0} />;
                case 'ai-5':
                    return <EfficiencyPreview efficiency={Number(previewState.efficiency) || 0} />;
                case 'ai-6':
                    return <BrakePreview brakeActive={Boolean(previewState.brakeActive)} />;
                default:
                    return <TrafficLightPreview activeColor={previewState.activeColor || 'off'} />;
            }
        }

        // Fallback for generic/software-dev
        return (
            <div className="flex items-center justify-center h-full bg-zinc-900 border border-white/10 rounded-xl p-8 text-center">
                <div>
                    <Terminal className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-zinc-400 font-mono text-lg">Konsol Çıktısı Bekleniyor</h3>
                    <p className="text-zinc-600 text-sm mt-2">Kodu çalıştırdığında sonuçlar burada görünecek.</p>
                </div>
            </div>
        );
    };

    return (
        <div className={cn("flex flex-col h-full gap-4", isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : "")}>

            {/* Toolbar */}
            <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="h-8 px-3 gap-2 bg-primary/10 border-primary/20 text-primary">
                        <Code2 className="w-3.5 h-3.5" />
                        {lesson.type === 'traffic-ai' ? 'Python (Simüle)' : 'JavaScript'}
                    </Badge>
                    <h2 className="text-sm font-medium text-muted-foreground">
                        {lesson.title}
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">

                {/* Left: Code Editor */}
                <div className="flex flex-col gap-4 min-h-0">
                    <div className="flex-1 relative rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <MonacoEditor
                            value={code}
                            onChange={(val) => setCode(val || '')}
                            language={lesson.type === 'traffic-ai' ? 'python' : 'javascript'}
                            theme="pusula-dark"
                            height="100%"
                            className="h-full border-0"
                            showRunButton={false} // We use our own run button
                            showConsole={false}
                        />

                        {/* Status Overlay */}
                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute bottom-4 right-4 bg-green-500/90 backdrop-blur text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 pointer-events-none"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="font-bold text-sm">Harika İş!</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
                        <div className="flex items-center gap-2">
                            <Button
                                size="lg"
                                onClick={handleRun}
                                disabled={status === 'running'}
                                className={cn(
                                    "min-w-[140px] font-bold transition-all",
                                    status === 'success'
                                        ? "bg-green-600 hover:bg-green-700 shadow-green-900/20"
                                        : "bg-blue-600 hover:bg-blue-700 shadow-blue-900/20"
                                )}
                            >
                                {status === 'running' ? (
                                    <>
                                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                                        Çalışıyor...
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        Tamamlandı
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 mr-2" />
                                        Kodu Çalıştır
                                    </>
                                )}
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleReset}
                                disabled={status === 'running'}
                                title="Kodu Sıfırla"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </Button>
                        </div>

                        {status === 'success' && onNext && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Button
                                    onClick={onNext}
                                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
                                >
                                    Sonraki Ders
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right: Preview & Console */}
                <div className="flex flex-col gap-4 min-h-0">

                    {/* Visual Preview */}
                    <div className="flex-[2] relative rounded-xl border border-border bg-zinc-950 overflow-hidden shadow-inner">
                        <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono text-white/50 border border-white/10 flex items-center gap-2">
                            <Cpu className="w-3 h-3" />
                            Canlı Önizleme
                        </div>
                        {renderPreview()}
                    </div>

                    {/* Console/Logs */}
                    <div className="flex-1 rounded-xl border border-border bg-zinc-950 overflow-hidden flex flex-col min-h-[150px]">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                                <Terminal className="w-3 h-3" />
                                Sistem Günlükleri
                            </div>
                            {error && (
                                <Badge variant="destructive" className="h-5 text-[10px] px-1.5">
                                    1 Hata
                                </Badge>
                            )}
                        </div>
                        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto">
                            {logs.length === 0 ? (
                                <div className="text-zinc-600 italic">...konsol çıktısı bekleniyor...</div>
                            ) : (
                                <div className="flex flex-col gap-1.5">
                                    {logs.map((log, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={cn(
                                                "break-words",
                                                log.startsWith('x') ? "text-red-400 bg-red-400/10 p-1 rounded border border-red-400/20" :
                                                    log.startsWith('>') ? "text-blue-400" :
                                                        "text-zinc-300"
                                            )}
                                        >
                                            {log}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
