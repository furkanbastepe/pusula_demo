'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EfficiencyPreviewProps {
    efficiency: number;
}

export const EfficiencyPreview: React.FC<EfficiencyPreviewProps> = ({ efficiency }) => {
    const normalizedEfficiency = Math.min(100, Math.max(0, efficiency));
    const isOptimal = normalizedEfficiency >= 100;
    const isGood = normalizedEfficiency >= 80;
    const isMedium = normalizedEfficiency >= 50;

    // Parçacık hızı verimliliğe göre
    const particleSpeed = Math.max(0.5, 3 - (normalizedEfficiency / 50));

    return (
        <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Arka plan grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Hareket eden parçacıklar */}
            <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full ${isOptimal ? 'bg-green-400' : isGood ? 'bg-cyan-400' : isMedium ? 'bg-yellow-400' : 'bg-red-400'
                            }`}
                        style={{
                            left: `${(i * 17) % 100}%`,
                            top: `${(i * 23) % 100}%`,
                            boxShadow: `0 0 10px ${isOptimal ? '#4ade80' : isGood ? '#22d3ee' : isMedium ? '#facc15' : '#f87171'}`
                        }}
                        animate={{
                            x: [0, 30, -30, 0],
                            y: [0, -20, 20, 0],
                            scale: [1, 1.2, 0.8, 1],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: particleSpeed,
                            repeat: Infinity,
                            delay: i * 0.1
                        }}
                    />
                ))}
            </div>

            {/* Ana CPU/Sistem görseli */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    className={`w-40 h-40 rounded-2xl border-4 flex items-center justify-center relative ${isOptimal ? 'border-green-400 bg-green-400/10' :
                            isGood ? 'border-cyan-400 bg-cyan-400/10' :
                                isMedium ? 'border-yellow-400 bg-yellow-400/10' :
                                    'border-red-400 bg-red-400/10'
                        }`}
                    animate={{
                        boxShadow: isOptimal
                            ? ['0 0 30px rgba(74,222,128,0.3)', '0 0 60px rgba(74,222,128,0.5)', '0 0 30px rgba(74,222,128,0.3)']
                            : isGood
                                ? ['0 0 20px rgba(34,211,238,0.3)', '0 0 40px rgba(34,211,238,0.4)', '0 0 20px rgba(34,211,238,0.3)']
                                : isMedium
                                    ? ['0 0 15px rgba(250,204,21,0.3)', '0 0 30px rgba(250,204,21,0.4)', '0 0 15px rgba(250,204,21,0.3)']
                                    : ['0 0 10px rgba(248,113,113,0.3)', '0 0 20px rgba(248,113,113,0.4)', '0 0 10px rgba(248,113,113,0.3)']
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    {/* İç devreler */}
                    <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 gap-2">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className={`rounded ${i < Math.ceil(normalizedEfficiency / 12)
                                        ? isOptimal ? 'bg-green-400' : isGood ? 'bg-cyan-400' : isMedium ? 'bg-yellow-400' : 'bg-red-400'
                                        : 'bg-gray-700'
                                    }`}
                                animate={i < Math.ceil(normalizedEfficiency / 12) ? {
                                    opacity: [0.5, 1, 0.5]
                                } : {}}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                            />
                        ))}
                    </div>

                    {/* Merkez gösterge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                            className={`text-4xl font-bold font-mono ${isOptimal ? 'text-green-400' : isGood ? 'text-cyan-400' : isMedium ? 'text-yellow-400' : 'text-red-400'
                                }`}
                            key={efficiency}
                            initial={{ scale: 1.5 }}
                            animate={{ scale: 1 }}
                        >
                            {normalizedEfficiency}%
                        </motion.span>
                    </div>
                </motion.div>

                {/* Dönen halkalar */}
                <motion.div
                    className={`absolute -inset-4 border-2 border-dashed rounded-full ${isOptimal ? 'border-green-400/50' : isGood ? 'border-cyan-400/50' : isMedium ? 'border-yellow-400/50' : 'border-red-400/50'
                        }`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 - (normalizedEfficiency / 20), repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className={`absolute -inset-8 border border-dashed rounded-full ${isOptimal ? 'border-green-400/30' : isGood ? 'border-cyan-400/30' : isMedium ? 'border-yellow-400/30' : 'border-red-400/30'
                        }`}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15 - (normalizedEfficiency / 15), repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Üst bilgi paneli */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-white/50 text-xs mb-2 font-mono">SİSTEM VERİMLİLİĞİ</div>
                <div className="flex items-center gap-3">
                    <motion.div
                        className={`w-3 h-3 rounded-full ${isOptimal ? 'bg-green-400' : isGood ? 'bg-cyan-400' : isMedium ? 'bg-yellow-400' : 'bg-red-400'
                            }`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className={`text-sm font-bold ${isOptimal ? 'text-green-400' : isGood ? 'text-cyan-400' : isMedium ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                        {isOptimal ? 'OPTİMAL' : isGood ? 'İYİ' : isMedium ? 'ORTA' : 'DÜŞÜK'}
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-32 h-2 bg-gray-800 rounded-full mt-3 overflow-hidden">
                    <motion.div
                        className={`h-full rounded-full ${isOptimal ? 'bg-gradient-to-r from-green-500 to-green-400' :
                                isGood ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' :
                                    isMedium ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                                        'bg-gradient-to-r from-red-500 to-red-400'
                            }`}
                        animate={{ width: `${normalizedEfficiency}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Sağ üst - Metrikler */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between gap-4">
                        <span className="text-white/50">CPU:</span>
                        <span className={isOptimal ? 'text-green-400' : 'text-cyan-400'}>{Math.min(100, normalizedEfficiency + 5)}%</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-white/50">RAM:</span>
                        <span className={isOptimal ? 'text-green-400' : 'text-cyan-400'}>{Math.min(100, normalizedEfficiency - 10)}%</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-white/50">GPU:</span>
                        <span className={isOptimal ? 'text-green-400' : 'text-cyan-400'}>{Math.min(100, normalizedEfficiency)}%</span>
                    </div>
                </div>
            </div>

            {/* Alt bilgi */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                {/* Hedef göstergesi */}
                <div className="bg-black/70 backdrop-blur-sm rounded-xl p-3 border border-primary/30">
                    <div className="text-xs text-white/50 mb-1">HEDEF</div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        <span className="text-primary font-bold">100%</span>
                    </div>
                </div>

                {/* Değişken gösterimi */}
                <div className="bg-black/70 backdrop-blur-sm rounded-xl p-3 border border-cyan-500/30">
                    <div className="text-cyan-400 font-mono text-sm">
                        let verimlilik = <motion.span
                            key={efficiency}
                            initial={{ scale: 1.5, color: '#22d3ee' }}
                            animate={{ scale: 1, color: '#22d3ee' }}
                            className="text-cyan-300 font-bold"
                        >
                            {efficiency}
                        </motion.span>;
                    </div>
                </div>
            </div>

            {/* Optimal durumda kutlama efekti */}
            {isOptimal && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-2xl"
                            style={{ left: `${(i * 10) + 5}%`, top: '50%' }}
                            animate={{
                                y: [-20, -100],
                                opacity: [1, 0],
                                scale: [1, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        >
                            ✨
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};
