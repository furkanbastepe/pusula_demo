import { cn } from "@/lib/utils";
import { Level } from "@/types/database";

const LEVEL_CONFIG: Record<Level, { label: string; color: string; bgColor: string; icon: string }> = {
    cirak: {
        label: "Çırak",
        color: "#6b7280",
        bgColor: "rgba(107, 114, 128, 0.2)",
        icon: "school",
    },
    kalfa: {
        label: "Kalfa",
        color: "#3b82f6",
        bgColor: "rgba(59, 130, 246, 0.2)",
        icon: "engineering",
    },
    usta: {
        label: "Usta",
        color: "#8b5cf6",
        bgColor: "rgba(139, 92, 246, 0.2)",
        icon: "workspace_premium",
    },
    graduate: {
        label: "Mezun",
        color: "#f59e0b",
        bgColor: "rgba(245, 158, 11, 0.2)",
        icon: "verified",
    },
};

interface LevelBadgeProps {
    level: Level;
    variant?: "small" | "medium" | "large";
    showIcon?: boolean;
    className?: string;
}

/**
 * LevelBadge - Student progression level indicator
 * 
 * Usage:
 * <LevelBadge level="cirak" />
 * <LevelBadge level="usta" variant="large" showIcon />
 */
export function LevelBadge({
    level,
    variant = "medium",
    showIcon = true,
    className,
}: LevelBadgeProps) {
    const config = LEVEL_CONFIG[level];

    if (variant === "small") {
        return (
            <span
                className={cn(
                    "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold",
                    className
                )}
                style={{
                    backgroundColor: config.bgColor,
                    color: config.color,
                }}
            >
                {showIcon && (
                    <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontSize: "12px" }}
                    >
                        {config.icon}
                    </span>
                )}
                {config.label}
            </span>
        );
    }

    if (variant === "medium") {
        return (
            <span
                className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold",
                    className
                )}
                style={{
                    backgroundColor: config.bgColor,
                    color: config.color,
                }}
            >
                {showIcon && (
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "14px" }}
                    >
                        {config.icon}
                    </span>
                )}
                {config.label}
            </span>
        );
    }

    // Large variant
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold",
                className
            )}
            style={{
                backgroundColor: config.bgColor,
                color: config.color,
            }}
        >
            {showIcon && (
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                >
                    {config.icon}
                </span>
            )}
            {config.label}
        </span>
    );
}

export function getLevelConfig(level: Level) {
    return LEVEL_CONFIG[level];
}

export default LevelBadge;
