import { cn } from "@/lib/utils";

interface MaterialIconProps {
    name: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    filled?: boolean;
}

const sizeClasses = {
    sm: "text-base", // 16px
    md: "text-xl",   // 20px
    lg: "text-2xl",  // 24px
    xl: "text-3xl",  // 30px
};

/**
 * MaterialIcon - Google Material Symbols wrapper
 * 
 * Usage:
 * <MaterialIcon name="dashboard" />
 * <MaterialIcon name="menu_book" size="lg" filled />
 * 
 * Icons reference: https://fonts.google.com/icons
 */
export function MaterialIcon({
    name,
    className,
    size = "md",
    filled = false,
}: MaterialIconProps) {
    return (
        <span
            className={cn(
                "material-symbols-outlined select-none",
                sizeClasses[size],
                className
            )}
            style={{
                fontVariationSettings: filled
                    ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}
        >
            {name}
        </span>
    );
}

export default MaterialIcon;
