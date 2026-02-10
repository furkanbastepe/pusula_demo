'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FireAlarmPreviewProps {
    alarmActive: boolean;
}

export const FireAlarmPreview: React.FC<FireAlarmPreviewProps> = ({ alarmActive }) => {
    return (
        <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
            {/* Gece gökyüzü */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800" />

            {/* Yıldızlar */}
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 40}%`
                    }}
                />
            ))}

            {/* Bina */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-64 bg-gray-700 rounded-t-lg">
                {/* Pencereler */}
                <div className="grid grid-cols-3 gap-3 p-4 pt-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={`w-10 h-12 rounded ${i < 3 ? 'bg-orange-500' : 'bg-yellow-200/80'}`}
                            animate={i < 3 ? {
                                backgroundColor: ['#f97316', '#dc2626', '#f97316'],
                                boxShadow: ['0 0 20px #f97316', '0 0 40px #dc2626', '0 0 20px #f97316']
                            } : {}}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                    ))}
                </div>

                {/* Kapı */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-20 bg-amber-800 rounded-t-lg" />
            </div>

            {/* Yangın ve Duman */}
            <div className="absolute bottom-48 left-1/2 -translate-x-1/2">
                {/* Alevler */}
                <motion.div
                    className="relative"
                    animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                >
                    <div className="w-16 h-20 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full blur-sm" />
                    <motion.div
                        className="absolute -left-4 top-2 w-10 h-14 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full blur-sm"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
                    />
                    <motion.div
                        className="absolute -right-4 top-4 w-8 h-12 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full blur-sm"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 0.35, repeat: Infinity, delay: 0.2 }}
                    />
                </motion.div>

                {/* Duman */}
                <motion.div
                    className="absolute -top-20 left-1/2 -translate-x-1/2"
                    animate={{ y: [-10, -40], opacity: [0.6, 0], scale: [1, 2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-12 h-12 bg-gray-500/50 rounded-full blur-md" />
                </motion.div>
                <motion.div
                    className="absolute -top-16 left-1/3"
                    animate={{ y: [-5, -35], opacity: [0.5, 0], scale: [0.8, 1.8] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                >
                    <div className="w-8 h-8 bg-gray-500/40 rounded-full blur-md" />
                </motion.div>
            </div>

            {/* Alarm Butonu */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-white/60 text-xs mb-2">ACİL DURUM BUTONU</div>
                <motion.div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xs
                        ${alarmActive
                            ? 'bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.8)]'
                            : 'bg-gray-600 shadow-lg'
                        }`}
                    animate={alarmActive ? {
                        scale: [1, 1.1, 1],
                        boxShadow: [
                            '0 0 30px rgba(220,38,38,0.8)',
                            '0 0 50px rgba(220,38,38,1)',
                            '0 0 30px rgba(220,38,38,0.8)'
                        ]
                    } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    {alarmActive ? '🚨 AKTİF' : 'PASİF'}
                </motion.div>
            </div>

            {/* Alarm Sesi Göstergesi */}
            {alarmActive && (
                <motion.div
                    className="absolute top-4 left-4 bg-red-600/80 backdrop-blur-sm rounded-xl p-4 border border-red-400"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🔔</span>
                        <div>
                            <div className="text-white font-bold text-sm">ALARM!</div>
                            <div className="text-white/80 text-xs">Bina tahliye ediliyor</div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* İnsanlar kaçıyor - alarm aktifse */}
            {alarmActive && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="text-2xl"
                            initial={{ x: 0 }}
                            animate={{ x: i % 2 === 0 ? -100 : 100, opacity: [1, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                            🏃
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Durum Mesajı */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-cyan-500/30">
                <div className="text-cyan-400 font-mono text-sm text-center">
                    let acil_durum = {alarmActive ? 'true' : 'false'};
                </div>
                <div className={`text-xs mt-1 text-center ${alarmActive ? 'text-green-400' : 'text-red-400'}`}>
                    {alarmActive ? '✅ Herkes uyarıldı!' : '⚠️ Alarm pasif - tehlike!'}
                </div>
            </div>
        </div>
    );
};
