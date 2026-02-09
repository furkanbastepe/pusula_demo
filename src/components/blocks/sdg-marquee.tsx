"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface SDGGoal {
    id: number;
    title: string;
    description: string;
    color: string;
    icon: string;
    image: string;
}

interface SDGCardProps {
    goal: SDGGoal;
    className?: string;
}

export function SDGCard({ goal, className }: SDGCardProps) {
    return (
        <div
            className={cn(
                "relative flex flex-col rounded-2xl overflow-hidden group",
                "bg-[#111722]",
                "border border-white/10",
                "min-w-[280px] sm:min-w-[320px] max-w-[320px] h-[400px]",
                "transition-all duration-500 hover:scale-105 hover:shadow-2xl",
                className
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={goal.image}
                    alt={goal.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"
                    style={{ backgroundColor: goal.color }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="mb-auto pt-4">
                    <div
                        className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold text-white mb-4 backdrop-blur-md"
                        style={{ backgroundColor: goal.color }}
                    >
                        SDG {goal.id}
                    </div>
                </div>

                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{goal.icon}</span>
                        <h3 className="text-xl font-display font-bold text-white leading-tight">
                            {goal.title}
                        </h3>
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-2 group-hover:line-clamp-none transition-all duration-300 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto">
                        {goal.description}
                    </p>
                </div>
            </div>

            {/* Bottom Border */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: goal.color }}
            />
        </div>
    );
}

// SDG data with official colors
// SDG data with official colors and images
export const sdgGoals: SDGGoal[] = [
    { id: 1, title: "Yoksulluğa Son", description: "Her yerde her türlü yoksulluğu sona erdirmek", color: "#e5243b", icon: "🏠", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=600&fit=crop" },
    { id: 2, title: "Açlığa Son", description: "Açlığı sona erdirmek, gıda güvenliğini sağlamak", color: "#dda63a", icon: "🌾", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=600&fit=crop" },
    { id: 3, title: "Sağlıklı Bireyler", description: "Her yaşta sağlıklı yaşamı güvence altına almak", color: "#4c9f38", icon: "💚", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=600&fit=crop" },
    { id: 4, title: "Nitelikli Eğitim", description: "Kapsayıcı ve eşit kalitede eğitimi sağlamak", color: "#c5192d", icon: "📚", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=600&fit=crop" },
    { id: 5, title: "Toplumsal Cinsiyet Eşitliği", description: "Cinsiyet eşitliğini sağlamak ve kadınları güçlendirmek", color: "#ff3a21", icon: "⚖️", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=600&fit=crop" },
    { id: 6, title: "Temiz Su ve Sanitasyon", description: "Herkes için suya erişimi ve sürdürülebilir yönetimi sağlamak", color: "#26bde2", icon: "💧", image: "https://images.unsplash.com/photo-1528642474493-224355ec6402?w=400&h=600&fit=crop" },
    { id: 7, title: "Erişilebilir Temiz Enerji", description: "Herkes için modern enerjiye erişimi sağlamak", color: "#fcc30b", icon: "⚡", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=600&fit=crop" },
    { id: 8, title: "İnsana Yakışır İş", description: "Sürdürülebilir ekonomik büyüme ve istihdam", color: "#a21942", icon: "💼", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=600&fit=crop" },
    { id: 9, title: "Sanayi, Yenilikçilik", description: "Dayanıklı altyapı, kapsayıcı sanayileşme ve yenilikçilik", color: "#fd6925", icon: "🏭", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop" },
    { id: 10, title: "Eşitsizliklerin Azaltılması", description: "Ülkeler içinde ve arasında eşitsizlikleri azaltmak", color: "#dd1367", icon: "🤝", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=600&fit=crop" },
    { id: 11, title: "Sürdürülebilir Şehirler", description: "Şehirleri kapsayıcı, güvenli ve dayanıklı kılmak", color: "#fd9d24", icon: "🏙️", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop" },
    { id: 12, title: "Sorumlu Üretim ve Tüketim", description: "Sürdürülebilir tüketim ve üretim kalıpları sağlamak", color: "#bf8b2e", icon: "♻️", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=600&fit=crop" },
    { id: 13, title: "İklim Eylemi", description: "İklim değişikliğine karşı acil önlem almak", color: "#3f7e44", icon: "🌍", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=600&fit=crop" },
    { id: 14, title: "Sudaki Yaşam", description: "Okyanusları ve deniz kaynaklarını korumak", color: "#0a97d9", icon: "🐠", image: "https://images.unsplash.com/photo-1583212235753-8b5008058a20?w=400&h=600&fit=crop" },
    { id: 15, title: "Karasal Yaşam", description: "Karasal ekosistemleri korumak ve onarmak", color: "#56c02b", icon: "🌳", image: "https://images.unsplash.com/photo-1500829243541-76b6379910ce?w=400&h=600&fit=crop" },
    { id: 16, title: "Barış, Adalet", description: "Barışçıl ve kapsayıcı toplumlar oluşturmak", color: "#00689d", icon: "⚖️", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop" },
    { id: 17, title: "Amaçlar İçin Ortaklıklar", description: "Uygulama araçlarını güçlendirmek ve ortaklıkları canlandırmak", color: "#19486a", icon: "🌐", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=600&fit=crop" },
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
