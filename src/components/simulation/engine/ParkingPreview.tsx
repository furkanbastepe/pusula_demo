'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ParkingPreviewProps {
    carCount: number;
}

const CAR_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export const ParkingPreview: React.FC<ParkingPreviewProps> = ({ carCount }) => {
    const [animatingCar, setAnimatingCar] = useState<number | null>(null);
    const [enteringCar, setEnteringCar] = useState(false);
    const [exitingCar, setExitingCar] = useState<number | null>(null);
    const [showSuccessEffect, setShowSuccessEffect] = useState(false);
    const prevCountRef = useRef(carCount);
    const maxSpots = 8;
    const occupiedSpots = Math.min(Math.max(0, carCount), maxSpots);
    const isFull = carCount >= maxSpots;

    // Araç sayısı değiştiğinde animasyon tetikle
    useEffect(() => {
        const prevCount = prevCountRef.current;

        if (carCount > prevCount && carCount <= maxSpots) {
            // Yeni araç giriyor
            setEnteringCar(true);
            setTimeout(() => setEnteringCar(false), 1200);
        } else if (carCount < prevCount && prevCount <= maxSpots) {
            // Araç çıkıyor
            setExitingCar(prevCount - 1);
            setTimeout(() => setExitingCar(null), 800);
        }

        // Otopark dolduğunda özel efekt
        if (carCount === maxSpots && prevCount !== maxSpots) {
            setShowSuccessEffect(true);
            setTimeout(() => setShowSuccessEffect(false), 2000);
        }

        prevCountRef.current = carCount;
    }, [carCount]);

    // Rastgele araç animasyonu
    useEffect(() => {
        const interval = setInterval(() => {
            if (occupiedSpots > 0 && occupiedSpots < maxSpots) {
                const randomIndex = Math.floor(Math.random() * occupiedSpots);
                setAnimatingCar(randomIndex);
                setTimeout(() => setAnimatingCar(null), 800);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [occupiedSpots]);

    return (
        <div className="relative w-full h-full bg-gradient-to-b from-sky-400 via-sky-500 to-gray-600 overflow-hidden">
            {/* Gökyüzü */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-sky-400 to-sky-500" />

            {/* Güneş */}
            <motion.div
                className="absolute top-4 right-8 w-14 h-14 bg-yellow-300 rounded-full"
                style={{ boxShadow: '0 0 50px rgba(253,224,71,0.6)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Bulutlar */}
            <motion.div
                className="absolute top-6 left-10"
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            >
                <div className="w-16 h-6 bg-white/80 rounded-full" />
                <div className="absolute -top-2 left-3 w-10 h-6 bg-white/80 rounded-full" />
            </motion.div>

            {/* Otopark Tabelası - Animasyonlu */}
            <div className="absolute top-4 left-4 z-20">
                <motion.div
                    className={`px-4 py-2 rounded-lg border-4 shadow-lg ${isFull ? 'bg-red-600 border-red-300' : 'bg-blue-600 border-white'}`}
                    animate={isFull ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    <div className="text-white font-bold text-lg flex items-center gap-2">
                        🅿️ {isFull ? 'DOLU!' : 'OTOPARK'}
                    </div>
                </motion.div>
                {isFull && (
                    <motion.div
                        className="mt-2 text-red-400 text-xs font-bold text-center"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        ⛔ Yer yok!
                    </motion.div>
                )}
            </div>

            {/* Otopark Alanı */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gray-600">
                {/* Zemin çizgileri */}
                <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="absolute h-full w-px bg-white" style={{ left: `${i * 10}%` }} />
                    ))}
                </div>

                {/* Otopark çizgileri */}
                <div className="absolute top-6 left-6 right-6 bottom-16 grid grid-cols-4 grid-rows-2 gap-3">
                    {Array.from({ length: maxSpots }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={`relative border-2 border-dashed rounded-lg flex items-center justify-center transition-colors duration-300 ${i < occupiedSpots ? 'border-yellow-400/70 bg-yellow-400/5' : 'border-green-400/50 bg-green-400/5'
                                }`}
                            animate={animatingCar === i ? { borderColor: ['#facc15', '#ffffff', '#facc15'] } : {}}
                            transition={{ duration: 0.4, repeat: 2 }}
                        >
                            {/* Park yeri numarası */}
                            <span className={`absolute top-1 left-2 text-xs font-mono font-bold ${i < occupiedSpots ? 'text-yellow-400/70' : 'text-green-400/70'}`}>
                                {i + 1}
                            </span>

                            {/* Araç */}
                            <AnimatePresence mode="wait">
                                {i < occupiedSpots && exitingCar !== i && (
                                    <motion.div
                                        key={`car-${i}`}
                                        initial={enteringCar && i === occupiedSpots - 1 ? { scale: 0, y: -50, rotate: -15, opacity: 0 } : { scale: 1, y: 0, rotate: 0, opacity: 1 }}
                                        animate={{
                                            scale: 1,
                                            y: 0,
                                            rotate: 0,
                                            opacity: 1,
                                            x: animatingCar === i ? [0, -3, 3, 0] : 0
                                        }}
                                        exit={{ scale: 0, y: 50, opacity: 0, rotate: 15 }}
                                        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                                        className="relative"
                                    >
                                        {/* Araç gölgesi */}
                                        <div className="absolute -bottom-1 left-1 right-1 h-2 bg-black/30 rounded-full blur-sm" />

                                        {/* Araç gövdesi */}
                                        <div
                                            className="w-14 h-9 rounded-lg shadow-lg relative overflow-hidden"
                                            style={{
                                                background: `linear-gradient(to bottom, ${CAR_COLORS[i % CAR_COLORS.length]}dd, ${CAR_COLORS[i % CAR_COLORS.length]})`
                                            }}
                                        >
                                            {/* Cam */}
                                            <div className="absolute top-1 left-2 right-2 h-3 bg-sky-200/70 rounded-t" />
                                            {/* Farlar */}
                                            <motion.div
                                                className="absolute bottom-1.5 left-1 w-2 h-2 bg-yellow-200 rounded-full"
                                                animate={enteringCar && i === occupiedSpots - 1 ? { opacity: [1, 0.3, 1] } : {}}
                                                transition={{ duration: 0.2, repeat: 5 }}
                                            />
                                            <motion.div
                                                className="absolute bottom-1.5 right-1 w-2 h-2 bg-yellow-200 rounded-full"
                                                animate={enteringCar && i === occupiedSpots - 1 ? { opacity: [1, 0.3, 1] } : {}}
                                                transition={{ duration: 0.2, repeat: 5 }}
                                            />
                                            {/* Plaka */}
                                            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-white rounded-sm text-[6px] text-gray-800 flex items-center justify-center font-bold">
                                                {34 + i}ABC
                                            </div>
                                        </div>
                                        {/* Tekerlekler */}
                                        <div className="absolute -bottom-1 left-1.5 w-2.5 h-2.5 bg-gray-900 rounded-full border border-gray-600" />
                                        <div className="absolute -bottom-1 right-1.5 w-2.5 h-2.5 bg-gray-900 rounded-full border border-gray-600" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Boş park yeri işareti */}
                            {i >= occupiedSpots && (
                                <motion.div
                                    className="flex flex-col items-center"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="text-green-400 text-2xl">✓</span>
                                    <span className="text-green-400/60 text-[10px]">BOŞ</span>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* Giriş/Çıkış Bariyeri */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <div className="relative">
                    {/* Bariyer direği */}
                    <div className="w-3 h-12 bg-yellow-500 rounded-t" />
                    {/* Bariyer kolu */}
                    <motion.div
                        className="absolute top-0 left-3 w-20 h-2 bg-gradient-to-r from-red-500 via-white to-red-500 rounded origin-left"
                        animate={enteringCar || exitingCar !== null ? { rotate: [0, -80, 0] } : { rotate: 0 }}
                        transition={{ duration: 1 }}
                    />
                </div>
                <div className="w-24 h-5 bg-gray-500 flex items-center justify-center rounded-t mt-1">
                    <motion.div
                        className="text-[10px] text-white/80 font-bold"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {isFull ? '⛔ DOLU' : '▼ GİRİŞ ▼'}
                    </motion.div>
                </div>
            </div>

            {/* Araç Sayacı - Gelişmiş ve Etkileşimli */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-white/60 text-xs mb-1 font-mono">ARAÇ SAYISI</div>
                <div className="flex items-baseline gap-2">
                    <motion.span
                        className={`text-5xl font-bold font-mono ${carCount >= maxSpots ? 'text-red-400' :
                                carCount >= maxSpots / 2 ? 'text-yellow-400' : 'text-green-400'
                            }`}
                        key={carCount}
                        initial={{ scale: 2, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, type: 'spring', bounce: 0.5 }}
                    >
                        {carCount}
                    </motion.span>
                    <span className="text-white/40 text-lg font-mono">/ {maxSpots}</span>
                </div>

                {/* Doluluk barı - Segmentli ve Animasyonlu */}
                <div className="flex gap-1 mt-3">
                    {Array.from({ length: maxSpots }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={`w-3 h-6 rounded ${i < carCount
                                    ? carCount >= maxSpots ? 'bg-red-500' : carCount >= maxSpots / 2 ? 'bg-yellow-500' : 'bg-green-500'
                                    : 'bg-gray-700'
                                }`}
                            initial={i === carCount - 1 && enteringCar ? { scale: 0, opacity: 0 } : {}}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                        />
                    ))}
                </div>

                {/* Durum */}
                <div className="text-xs mt-3 font-medium">
                    {carCount === 0 && <span className="text-green-400">🟢 Tamamen Boş</span>}
                    {carCount > 0 && carCount < maxSpots / 2 && <span className="text-green-400">🟢 Müsait ({maxSpots - carCount} yer)</span>}
                    {carCount >= maxSpots / 2 && carCount < maxSpots && <span className="text-yellow-400">🟡 Dolmak üzere ({maxSpots - carCount} yer)</span>}
                    {carCount >= maxSpots && (
                        <motion.span
                            className="text-red-400"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            🔴 TAMAMEN DOLU!
                        </motion.span>
                    )}
                </div>
            </div>

            {/* Değişken gösterimi - Canlı Kod Önizleme */}
            <motion.div
                className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/30"
                animate={enteringCar || exitingCar !== null ? { borderColor: ['#06b6d4', '#22d3ee', '#06b6d4'] } : {}}
                transition={{ duration: 0.5, repeat: 2 }}
            >
                <div className="text-cyan-400/60 text-[10px] mb-1 font-mono">KOD ÖNİZLEME</div>
                <div className="text-cyan-400 font-mono text-sm flex items-center gap-1">
                    <span className="text-purple-400">let</span>
                    <span className="text-white">arac_sayisi</span>
                    <span className="text-white">=</span>
                    <motion.span
                        key={carCount}
                        initial={{ scale: 1.8, color: '#fbbf24' }}
                        animate={{ scale: 1, color: carCount >= maxSpots ? '#f87171' : '#22d3ee' }}
                        transition={{ duration: 0.3 }}
                        className="font-bold text-lg"
                    >
                        {carCount}
                    </motion.span>
                    <span className="text-white">;</span>
                </div>
                {carCount < maxSpots && (
                    <motion.div
                        className="text-yellow-400/60 text-[10px] mt-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        🎯 Hedef: {maxSpots} araç
                    </motion.div>
                )}
            </motion.div>

            {/* Dolu uyarısı overlay */}
            <AnimatePresence>
                {isFull && (
                    <motion.div
                        className="absolute inset-0 bg-red-900/20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                )}
            </AnimatePresence>

            {/* Başarı efekti - Otopark dolduğunda */}
            <AnimatePresence>
                {showSuccessEffect && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="text-6xl"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: [0, 1.5, 1], rotate: 0 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                        >
                            🎉
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
