'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CarPreviewProps {
    speed: number;
}

export const CarPreview: React.FC<CarPreviewProps> = ({ speed }) => {
    // Hız bazlı animasyon süreleri - hız arttıkça süre AZALIR = daha hızlı hareket
    const envSpeed = speed > 0 ? Math.max(0.3, 4 - (speed / 40)) : 100; // Çevre hızı
    const roadLineSpeed = speed > 0 ? Math.max(0.1, 2 - (speed / 80)) : 100; // Yol çizgileri
    const wheelRotation = speed > 0 ? Math.max(0.05, 0.8 - (speed / 300)) : 100; // Tekerlek dönüşü

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Gökyüzü - gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-orange-200" />

            {/* Güneş */}
            <motion.div
                className="absolute top-6 right-16 w-14 h-14 bg-yellow-200 rounded-full"
                style={{ boxShadow: '0 0 60px 20px rgba(253,224,71,0.4)' }}
                animate={speed > 100 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Uzak dağlar - en yavaş hareket */}
            <motion.div
                className="absolute bottom-32 left-0 flex"
                animate={speed > 0 ? { x: [0, -600] } : {}}
                transition={{ duration: envSpeed * 4, repeat: Infinity, ease: 'linear' }}
            >
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="relative" style={{ marginRight: '-20px' }}>
                        <div
                            className="w-40 h-20 bg-gradient-to-t from-blue-400/40 to-blue-300/20"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                                marginLeft: i * 80
                            }}
                        />
                    </div>
                ))}
            </motion.div>

            {/* Bulutlar - orta hız */}
            <motion.div
                className="absolute top-8 left-0 flex gap-40"
                animate={speed > 0 ? { x: [0, -500] } : {}}
                transition={{ duration: envSpeed * 2, repeat: Infinity, ease: 'linear' }}
            >
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="relative">
                        <div className="w-24 h-10 bg-white/90 rounded-full shadow-lg" />
                        <div className="absolute -top-3 left-4 w-16 h-10 bg-white/90 rounded-full" />
                        <div className="absolute -top-1 left-12 w-12 h-8 bg-white/90 rounded-full" />
                    </div>
                ))}
            </motion.div>

            {/* Ağaçlar ve binalar - hızlı hareket */}
            <motion.div
                className="absolute bottom-28 left-0 flex items-end gap-20"
                animate={speed > 0 ? { x: [0, -800] } : {}}
                transition={{ duration: envSpeed, repeat: Infinity, ease: 'linear' }}
            >
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                        {i % 3 === 0 ? (
                            // Bina
                            <div className="w-12 h-20 bg-gray-600 rounded-t-sm relative">
                                <div className="absolute inset-1 grid grid-cols-2 gap-1">
                                    {Array.from({ length: 6 }).map((_, j) => (
                                        <div key={j} className="bg-yellow-200/60 rounded-sm" />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Ağaç
                            <>
                                <div className="w-10 h-14 bg-green-600 rounded-full shadow-md" />
                                <div className="w-3 h-5 bg-amber-800 -mt-2" />
                            </>
                        )}
                    </div>
                ))}
            </motion.div>

            {/* Yol */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gray-700">
                {/* Yol kenar çizgileri */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-white" />
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white" />

                {/* Orta şerit çizgileri - EN HIZLI hareket */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 overflow-hidden">
                    <motion.div
                        className="flex gap-8"
                        animate={speed > 0 ? { x: [0, -200] } : {}}
                        transition={{
                            duration: roadLineSpeed,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    >
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} className="w-16 h-2 bg-yellow-400 rounded flex-shrink-0" />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Araba - sabit pozisyonda, sadece hafif titreşim */}
            <motion.div
                className="absolute bottom-16 left-1/2 -translate-x-1/2"
                animate={speed > 50 ? {
                    y: [-1, 1, -1],
                } : {}}
                transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                {/* Hız çizgileri - yüksek hızda */}
                {speed >= 150 && (
                    <>
                        <motion.div
                            className="absolute -left-20 top-4 w-16 h-0.5 bg-gradient-to-l from-white/60 to-transparent"
                            animate={{ opacity: [0, 1, 0], x: [-10, -30] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute -left-16 top-8 w-12 h-0.5 bg-gradient-to-l from-white/40 to-transparent"
                            animate={{ opacity: [0, 1, 0], x: [-5, -25] }}
                            transition={{ duration: 0.25, repeat: Infinity, delay: 0.1 }}
                        />
                    </>
                )}

                {/* Egzoz dumanı */}
                {speed > 30 && (
                    <motion.div
                        className="absolute -left-6 bottom-1"
                        animate={{
                            x: [0, -40 - speed / 5],
                            opacity: [0.7, 0],
                            scale: [0.3, 1 + speed / 200]
                        }}
                        transition={{ duration: Math.max(0.2, 0.6 - speed / 400), repeat: Infinity }}
                    >
                        <div className="w-3 h-3 bg-gray-400/60 rounded-full blur-sm" />
                    </motion.div>
                )}
                {speed > 80 && (
                    <motion.div
                        className="absolute -left-4 bottom-3"
                        animate={{
                            x: [0, -30 - speed / 6],
                            opacity: [0.5, 0],
                            scale: [0.2, 0.8 + speed / 250]
                        }}
                        transition={{ duration: Math.max(0.15, 0.5 - speed / 500), repeat: Infinity, delay: 0.1 }}
                    >
                        <div className="w-2 h-2 bg-gray-400/50 rounded-full blur-sm" />
                    </motion.div>
                )}

                {/* Araba gövdesi */}
                <div className="relative">
                    {/* Gölge */}
                    <div className="absolute -bottom-2 left-2 right-2 h-3 bg-black/30 rounded-full blur-md" />

                    {/* Ana gövde */}
                    <div className="w-36 h-10 bg-gradient-to-b from-red-400 to-red-600 rounded-lg relative shadow-xl">
                        {/* Üst kısım / Kabin */}
                        <div className="absolute -top-5 left-8 w-20 h-6 bg-gradient-to-b from-red-400 to-red-500 rounded-t-lg" />
                        {/* Camlar */}
                        <div className="absolute -top-4 left-10 w-7 h-4 bg-sky-200/80 rounded-tl-lg" />
                        <div className="absolute -top-4 left-18 w-8 h-4 bg-sky-200/80 rounded-tr-lg" style={{ left: '4.5rem' }} />

                        {/* Ön far */}
                        <motion.div
                            className="absolute right-1 top-2 w-3 h-5 bg-yellow-200 rounded-r-lg"
                            animate={speed > 0 ? {
                                boxShadow: speed > 100
                                    ? ['0 0 10px #fef08a', '0 0 25px #fef08a', '0 0 10px #fef08a']
                                    : '0 0 8px #fef08a'
                            } : {}}
                            transition={{ duration: 0.4, repeat: Infinity }}
                        />

                        {/* Arka stop lambası */}
                        <motion.div
                            className="absolute left-1 top-2 w-2 h-5 bg-red-400 rounded-l-lg"
                            animate={speed < 50 && speed > 0 ? { opacity: [1, 0.5, 1] } : {}}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                    </div>

                    {/* Tekerlekler */}
                    <motion.div
                        className="absolute -bottom-2 left-5 w-7 h-7 bg-gray-900 rounded-full border-2 border-gray-600 flex items-center justify-center"
                        animate={speed > 0 ? { rotate: 360 } : {}}
                        transition={{ duration: wheelRotation, repeat: Infinity, ease: 'linear' }}
                    >
                        <div className="w-3 h-3 bg-gray-500 rounded-full" />
                        <div className="absolute w-full h-0.5 bg-gray-600" />
                        <div className="absolute w-0.5 h-full bg-gray-600" />
                    </motion.div>
                    <motion.div
                        className="absolute -bottom-2 right-5 w-7 h-7 bg-gray-900 rounded-full border-2 border-gray-600 flex items-center justify-center"
                        animate={speed > 0 ? { rotate: 360 } : {}}
                        transition={{ duration: wheelRotation, repeat: Infinity, ease: 'linear' }}
                    >
                        <div className="w-3 h-3 bg-gray-500 rounded-full" />
                        <div className="absolute w-full h-0.5 bg-gray-600" />
                        <div className="absolute w-0.5 h-full bg-gray-600" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Hız göstergesi - Speedometer tarzı */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-white/50 text-xs mb-1 text-center">KM/S</div>
                <div className="flex items-center justify-center">
                    <motion.span
                        className={`text-4xl font-bold font-mono ${speed >= 200 ? 'text-green-400' :
                                speed >= 150 ? 'text-yellow-400' :
                                    speed >= 100 ? 'text-orange-400' : 'text-white'
                            }`}
                        animate={speed >= 180 ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    >
                        {speed}
                    </motion.span>
                </div>

                {/* Hız barı */}
                <div className="w-28 h-2 bg-gray-800 rounded-full mt-3 overflow-hidden">
                    <motion.div
                        className={`h-full rounded-full transition-colors ${speed >= 200 ? 'bg-green-500' :
                                speed >= 150 ? 'bg-yellow-500' :
                                    speed >= 100 ? 'bg-orange-500' : 'bg-cyan-500'
                            }`}
                        animate={{ width: `${Math.min(100, (speed / 200) * 100)}%` }}
                        transition={{ duration: 0.2 }}
                    />
                </div>

                {/* Durum */}
                <div className="text-center text-xs mt-2 font-medium">
                    {speed === 0 && <span className="text-gray-500">⏸ DURDU</span>}
                    {speed > 0 && speed < 80 && <span className="text-cyan-400">🚗 Yavaş</span>}
                    {speed >= 80 && speed < 150 && <span className="text-orange-400">🚙 Normal</span>}
                    {speed >= 150 && speed < 200 && <span className="text-yellow-400">🏎 Hızlı!</span>}
                    {speed >= 200 && <span className="text-green-400">🔥 MAKSİMUM!</span>}
                </div>
            </div>

            {/* Değişken gösterimi */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-cyan-500/30">
                <div className="text-cyan-400 font-mono text-sm">
                    let hiz = {speed};
                </div>
            </div>
        </div>
    );
};
