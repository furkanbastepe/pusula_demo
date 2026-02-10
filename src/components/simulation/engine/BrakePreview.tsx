'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrakePreviewProps {
    brakeActive: boolean;
}

export const BrakePreview: React.FC<BrakePreviewProps> = ({ brakeActive }) => {
    const [distance, setDistance] = useState(100);
    const [crashed, setCrashed] = useState(false);

    useEffect(() => {
        if (!brakeActive) {
            // Fren aktif değilse mesafe azalır
            const interval = setInterval(() => {
                setDistance(prev => {
                    if (prev <= 0) {
                        setCrashed(true);
                        return 0;
                    }
                    return prev - 2;
                });
            }, 100);
            return () => clearInterval(interval);
        } else {
            // Fren aktifse mesafe sabit kalır veya artar
            setCrashed(false);
            setDistance(100);
        }
    }, [brakeActive]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Arka plan - Gece yolu */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-gray-700" />

            {/* Yıldızlar */}
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${(i * 37) % 100}%`,
                        top: `${(i * 13) % 30}%`,
                        opacity: 0.5 + (i % 5) * 0.1
                    }}
                />
            ))}

            {/* Yol */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gray-800 perspective-[500px]">
                {/* Yol çizgileri */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-white" />
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-white" />

                {/* Orta çizgiler - hareket eden */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex gap-8 overflow-hidden"
                    animate={!brakeActive ? { x: [0, -100] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                >
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-12 h-2 bg-yellow-400 rounded flex-shrink-0" />
                    ))}
                </motion.div>
            </div>

            {/* Engel - Önde duran araç/nesne */}
            <motion.div
                className="absolute bottom-24 left-1/2 -translate-x-1/2"
                animate={!brakeActive && !crashed ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.3, repeat: Infinity }}
            >
                {/* Tehlike işareti */}
                <motion.div
                    className="absolute -top-16 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, -5, 0], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    <div className="text-4xl">⚠️</div>
                </motion.div>

                {/* Engel araç */}
                <div className="relative">
                    <div className="w-32 h-16 bg-gradient-to-b from-gray-500 to-gray-600 rounded-lg shadow-xl">
                        {/* Stop lambaları */}
                        <motion.div
                            className="absolute top-2 left-2 w-4 h-8 bg-red-500 rounded"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                            style={{ boxShadow: '0 0 20px #ef4444' }}
                        />
                        <motion.div
                            className="absolute top-2 right-2 w-4 h-8 bg-red-500 rounded"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                            style={{ boxShadow: '0 0 20px #ef4444' }}
                        />
                        {/* Plaka */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-white rounded text-[8px] text-gray-800 flex items-center justify-center font-bold">
                            ENGEL
                        </div>
                    </div>
                    {/* Tekerlekler */}
                    <div className="absolute -bottom-2 left-4 w-6 h-6 bg-gray-900 rounded-full" />
                    <div className="absolute -bottom-2 right-4 w-6 h-6 bg-gray-900 rounded-full" />
                </div>
            </motion.div>

            {/* Bizim araç */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={!brakeActive ? {
                    y: [0, -2, 0],
                    scale: crashed ? [1, 1.1, 1] : 1
                } : {}}
                transition={{ duration: 0.1, repeat: Infinity }}
            >
                {/* Fren ışığı efekti */}
                {brakeActive && (
                    <motion.div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-full h-8 bg-gradient-to-t from-red-500/50 to-transparent rounded-full blur-md"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                    />
                )}

                <div className="relative">
                    {/* Gölge */}
                    <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/40 rounded-full blur-md" />

                    {/* Araç gövdesi */}
                    <div className={`w-36 h-12 rounded-lg shadow-xl relative ${crashed ? 'bg-gradient-to-b from-orange-400 to-red-600' : 'bg-gradient-to-b from-blue-400 to-blue-600'}`}>
                        {/* Kabin */}
                        <div className={`absolute -top-5 left-8 w-20 h-6 rounded-t-lg ${crashed ? 'bg-orange-400' : 'bg-blue-400'}`} />
                        {/* Camlar */}
                        <div className="absolute -top-4 left-10 w-7 h-4 bg-sky-200/80 rounded-tl-lg" />
                        <div className="absolute -top-4 left-[4.5rem] w-8 h-4 bg-sky-200/80 rounded-tr-lg" />

                        {/* Farlar */}
                        <motion.div
                            className="absolute right-1 top-2 w-3 h-6 bg-yellow-200 rounded-r-lg"
                            style={{ boxShadow: '0 0 15px #fef08a' }}
                        />

                        {/* Fren lambaları */}
                        <motion.div
                            className={`absolute left-1 top-2 w-3 h-6 rounded-l-lg ${brakeActive ? 'bg-red-500' : 'bg-red-900'}`}
                            animate={brakeActive ? {
                                boxShadow: ['0 0 10px #ef4444', '0 0 30px #ef4444', '0 0 10px #ef4444']
                            } : {}}
                            transition={{ duration: 0.3, repeat: Infinity }}
                        />
                    </div>

                    {/* Tekerlekler */}
                    <motion.div
                        className="absolute -bottom-2 left-5 w-8 h-8 bg-gray-900 rounded-full border-2 border-gray-600"
                        animate={!brakeActive ? { rotate: 360 } : {}}
                        transition={{ duration: 0.2, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute -bottom-2 right-5 w-8 h-8 bg-gray-900 rounded-full border-2 border-gray-600"
                        animate={!brakeActive ? { rotate: 360 } : {}}
                        transition={{ duration: 0.2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Fren kıvılcımları */}
                    {brakeActive && (
                        <>
                            <motion.div
                                className="absolute -bottom-4 left-4 w-2 h-2 bg-orange-400 rounded-full"
                                animate={{ y: [0, 10], opacity: [1, 0], x: [-5, -15] }}
                                transition={{ duration: 0.3, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -bottom-4 right-4 w-2 h-2 bg-orange-400 rounded-full"
                                animate={{ y: [0, 10], opacity: [1, 0], x: [5, 15] }}
                                transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
                            />
                        </>
                    )}
                </div>
            </motion.div>

            {/* Mesafe göstergesi */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-white/50 text-xs mb-2 font-mono">ÇARPIŞMAYA KALAN</div>
                <motion.div
                    className={`text-4xl font-bold font-mono ${brakeActive ? 'text-green-400' : distance > 50 ? 'text-yellow-400' : 'text-red-400'
                        }`}
                    animate={!brakeActive && distance < 30 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.2, repeat: Infinity }}
                >
                    {brakeActive ? '∞' : `${distance}m`}
                </motion.div>

                {/* Tehlike barı */}
                <div className="w-32 h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
                    <motion.div
                        className={`h-full rounded-full ${brakeActive ? 'bg-green-500' : distance > 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                        animate={{ width: brakeActive ? '100%' : `${distance}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            </div>

            {/* Fren durumu */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-white/50 text-xs mb-2 font-mono">FREN SİSTEMİ</div>
                <motion.div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 ${brakeActive
                            ? 'bg-green-600 border-green-400'
                            : 'bg-red-600 border-red-400'
                        }`}
                    animate={brakeActive ? {
                        boxShadow: ['0 0 20px rgba(34,197,94,0.5)', '0 0 40px rgba(34,197,94,0.8)', '0 0 20px rgba(34,197,94,0.5)']
                    } : {
                        boxShadow: ['0 0 20px rgba(239,68,68,0.5)', '0 0 40px rgba(239,68,68,0.8)', '0 0 20px rgba(239,68,68,0.5)']
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    {brakeActive ? '✓ AKTİF' : '✗ PASİF'}
                </motion.div>
            </div>

            {/* Uyarı mesajı */}
            <AnimatePresence>
                {!brakeActive && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600/90 backdrop-blur-sm rounded-xl p-6 border border-red-400"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">🚨</span>
                            <div>
                                <div className="text-white font-bold text-lg">ACİL DURUM!</div>
                                <div className="text-white/80 text-sm">Freni aktif et!</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Çarpışma efekti */}
            <AnimatePresence>
                {crashed && (
                    <motion.div
                        className="absolute inset-0 bg-red-600/50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="text-8xl"
                            animate={{ scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            💥
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Başarı mesajı */}
            <AnimatePresence>
                {brakeActive && (
                    <motion.div
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-green-600/90 backdrop-blur-sm rounded-xl px-6 py-3 border border-green-400"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                    >
                        <div className="flex items-center gap-2 text-white font-bold">
                            <span className="text-xl">✅</span>
                            Güvenli! Araç durdu.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Değişken gösterimi */}
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-3 border border-cyan-500/30">
                <div className="text-cyan-400 font-mono text-sm">
                    let fren = <motion.span
                        key={String(brakeActive)}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        className={brakeActive ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}
                    >
                        {brakeActive ? 'true' : 'false'}
                    </motion.span>;
                </div>
            </div>
        </div>
    );
};
