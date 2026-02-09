"use client";

import { Flame } from "lucide-react";

interface StreakBadgeProps {
    days: number;
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
}

export function StreakBadge({ days, size = "md", showLabel = true }: StreakBadgeProps) {
    const isActive = days > 0;
    const isMilestone = days > 0 && days % 7 === 0;

    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    if (days === 0) {
        return null; // Don't show if no streak
    }

    return (
        <div
            className={`flex items-center gap-1.5 ${isMilestone
                    ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 px-2 py-1 rounded-full"
                    : ""
                }`}
        >
            <Flame
                className={`${sizeClasses[size]} ${isActive
                        ? isMilestone
                            ? "text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]"
                            : "text-orange-400"
                        : "text-zinc-600"
                    }`}
            />
            {showLabel && (
                <span
                    className={`${textSizes[size]} font-medium ${isActive ? "text-zinc-50" : "text-zinc-600"
                        }`}
                >
                    {days} gün
                </span>
            )}
        </div>
    );
}
