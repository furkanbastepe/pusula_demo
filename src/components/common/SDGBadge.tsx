import { cn } from "@/lib/utils";

// Official SDG colors
const SDG_COLORS: Record<number, string> = {
    1: "#e5243b",
    2: "#dda63a",
    3: "#4c9f38",
    4: "#c5192d",
    5: "#ff3a21",
    6: "#26bde2",
    7: "#fcc30b",
    8: "#a21942",
    9: "#fd6925",
    10: "#dd1367",
    11: "#fd9d24",
    12: "#bf8b2e",
    13: "#3f7e44",
    14: "#0a97d9",
    15: "#56c02b",
    16: "#00689d",
    17: "#19486a",
};

// SDG Turkish names
const SDG_NAMES: Record<number, string> = {
    1: "Yoksulluğa Son",
    2: "Açlığa Son",
    3: "Sağlık ve Kaliteli Yaşam",
    4: "Nitelikli Eğitim",
    5: "Toplumsal Cinsiyet Eşitliği",
    6: "Temiz Su ve Sanitasyon",
    7: "Erişilebilir ve Temiz Enerji",
    8: "İnsana Yakışır İş ve Ekonomik Büyüme",
    9: "Sanayi, Yenilikçilik ve Altyapı",
    10: "Eşitsizliklerin Azaltılması",
    11: "Sürdürülebilir Şehirler ve Topluluklar",
    12: "Sorumlu Üretim ve Tüketim",
    13: "İklim Eylemi",
    14: "Sudaki Yaşam",
    15: "Karasal Yaşam",
    16: "Barış, Adalet ve Güçlü Kurumlar",
    17: "Amaçlar için Ortaklıklar",
};

interface SDGBadgeProps {
    sdg: number;
    variant?: "small" | "medium" | "large" | "card";
    showName?: boolean;
    className?: string;
}

/**
 * SDGBadge - UN Sustainable Development Goals badge
 * 
 * Usage:
 * <SDGBadge sdg={4} />
 * <SDGBadge sdg={8} variant="large" showName />
 */
export function SDGBadge({
    sdg,
    variant = "medium",
    showName = false,
    className,
}: SDGBadgeProps) {
    const color = SDG_COLORS[sdg] || "#6b7280";
    const name = SDG_NAMES[sdg] || `SDG ${sdg}`;

    if (variant === "small") {
        return (
            <span
                className={cn(
                    "inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold text-white",
                    className
                )}
                style={{ backgroundColor: color }}
                title={name}
            >
                {sdg}
            </span>
        );
    }

    if (variant === "medium") {
        return (
            <span
                className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold text-white",
                    className
                )}
                style={{ backgroundColor: color }}
            >
                <span className="font-bold">{sdg}</span>
                {showName && <span className="truncate max-w-[120px]">{name}</span>}
            </span>
        );
    }

    if (variant === "large") {
        return (
            <div
                className={cn(
                    "inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white",
                    className
                )}
                style={{ backgroundColor: color }}
            >
                <span className="text-lg font-bold">{sdg}</span>
                {showName && <span>{name}</span>}
            </div>
        );
    }

    // Card variant - for selection grids
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all hover:scale-105",
                className
            )}
            style={{
                backgroundColor: `${color}20`,
                borderColor: `${color}50`,
            }}
        >
            <span
                className="flex items-center justify-center w-10 h-10 rounded-lg text-lg font-bold text-white mb-2"
                style={{ backgroundColor: color }}
            >
                {sdg}
            </span>
            <span className="text-xs text-center text-foreground font-medium leading-tight">
                {name}
            </span>
        </div>
    );
}

export function getSDGColor(sdg: number): string {
    return SDG_COLORS[sdg] || "#6b7280";
}

export function getSDGName(sdg: number): string {
    return SDG_NAMES[sdg] || `SDG ${sdg}`;
}

export default SDGBadge;
