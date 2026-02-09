"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface SDGGoal {
    id: number;
    title: string;
    description: string;
    color: string;
    icon: string;
}

interface SDGCardProps {
    goal: SDGGoal;
    className?: string;
}

export function SDGCard({ goal, className }: SDGCardProps) {
    return (
        <div
            className={cn(
                "flex flex-col rounded-2xl overflow-hidden",
                "bg-gradient-to-b from-[#111722] to-[#0d1117]",
                "border border-white/10",
                "p-5 text-start",
                "hover:border-white/30 hover:shadow-lg",
                "min-w-[280px] sm:min-w-[300px] max-w-[300px]",
                "transition-all duration-300",
                className
            )}
            style={{
                borderTopColor: goal.color,
                borderTopWidth: "4px"
            }}
        >
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="flex items-center justify-center size-12 rounded-xl text-2xl font-bold text-white"
                    style={{ backgroundColor: goal.color }}
                >
                    {goal.id}
                </div>
                <span className="text-3xl">{goal.icon}</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2 line-clamp-2">
                {goal.title}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-3">
                {goal.description}
            </p>
        </div>
    );
}

// SDG data with official colors
export const sdgGoals: SDGGoal[] = [
    { id: 1, title: "Yoksulluğa Son", description: "Her yerde her türlü yoksulluğu sona erdirmek", color: "#e5243b", icon: "🏠" },
    { id: 2, title: "Açlığa Son", description: "Açlığı sona erdirmek, gıda güvenliğini sağlamak", color: "#dda63a", icon: "🌾" },
    { id: 3, title: "Sağlıklı Bireyler", description: "Her yaşta sağlıklı yaşamı güvence altına almak", color: "#4c9f38", icon: "💚" },
    { id: 4, title: "Nitelikli Eğitim", description: "Kapsayıcı ve eşit kalitede eğitimi sağlamak", color: "#c5192d", icon: "📚" },
    { id: 5, title: "Toplumsal Cinsiyet Eşitliği", description: "Cinsiyet eşitliğini sağlamak ve kadınları güçlendirmek", color: "#ff3a21", icon: "⚖️" },
    { id: 6, title: "Temiz Su ve Sanitasyon", description: "Herkes için suya erişimi ve sürdürülebilir yönetimi sağlamak", color: "#26bde2", icon: "💧" },
    { id: 7, title: "Erişilebilir Temiz Enerji", description: "Herkes için modern enerjiye erişimi sağlamak", color: "#fcc30b", icon: "⚡" },
    { id: 8, title: "İnsana Yakışır İş", description: "Sürdürülebilir ekonomik büyüme ve istihdam", color: "#a21942", icon: "💼" },
    { id: 9, title: "Sanayi, Yenilikçilik", description: "Dayanıklı altyapı, kapsayıcı sanayileşme ve yenilikçilik", color: "#fd6925", icon: "🏭" },
    { id: 10, title: "Eşitsizliklerin Azaltılması", description: "Ülkeler içinde ve arasında eşitsizlikleri azaltmak", color: "#dd1367", icon: "🤝" },
    { id: 11, title: "Sürdürülebilir Şehirler", description: "Şehirleri kapsayıcı, güvenli ve dayanıklı kılmak", color: "#fd9d24", icon: "🏙️" },
    { id: 12, title: "Sorumlu Üretim ve Tüketim", description: "Sürdürülebilir tüketim ve üretim kalıpları sağlamak", color: "#bf8b2e", icon: "♻️" },
    { id: 13, title: "İklim Eylemi", description: "İklim değişikliğine karşı acil önlem almak", color: "#3f7e44", icon: "🌍" },
    { id: 14, title: "Sudaki Yaşam", description: "Okyanusları ve deniz kaynaklarını korumak", color: "#0a97d9", icon: "🐠" },
    { id: 15, title: "Karasal Yaşam", description: "Karasal ekosistemleri korumak ve onarmak", color: "#56c02b", icon: "🌳" },
    { id: 16, title: "Barış, Adalet", description: "Barışçıl ve kapsayıcı toplumlar oluşturmak", color: "#00689d", icon: "⚖️" },
    { id: 17, title: "Amaçlar İçin Ortaklıklar", description: "Uygulama araçlarını güçlendirmek ve ortaklıkları canlandırmak", color: "#19486a", icon: "🌐" },
];

interface SDGMarqueeProps {
    title?: string;
    description?: string;
    className?: string;
}

export function SDGMarquee({
    title = "Misyonunu Seç",
    description = "17 Sürdürülebilir Kalkınma Amacı'ndan birini seç ve gerçek dünya problemlerini çöz",
    className,
}: SDGMarqueeProps) {
    return (
        <section
            className={cn(
                "bg-[#0a0a0a] text-white",
                "py-16 sm:py-24 px-0",
                className
            )}
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:gap-12">
                <div className="flex flex-col items-center gap-4 px-6 sm:gap-6">
                    <span className="text-blue-500 font-medium tracking-widest text-sm uppercase">
                        Sürdürülebilir Kalkınma Amaçları
                    </span>
                    <h2 className="max-w-[720px] text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight font-display text-white">
                        {title}
                    </h2>
                    <p className="text-md max-w-[600px] font-medium text-slate-400 sm:text-lg">
                        {description}
                    </p>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:60s]">
                        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                            {[...Array(2)].map((_, setIndex) =>
                                sdgGoals.map((goal) => (
                                    <SDGCard key={`${setIndex}-${goal.id}`} goal={goal} />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-[#0a0a0a] sm:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-[#0a0a0a] sm:block" />
                </div>
            </div>
        </section>
    );
}
