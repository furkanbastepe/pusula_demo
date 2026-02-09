"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/common/MaterialIcon";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

// Route to breadcrumb mapping
const ROUTE_LABELS: Record<string, string> = {
    panel: "Panel",
    ogren: "Müfredat",
    microlab: "MicroLab",
    gorevler: "Görevler",
    gorev: "Görev",
    teslim: "Teslim",
    teslimlerim: "Teslimlerim",
    simulasyon: "Simülasyon",
    harita: "Harita",
    liderlik: "Sıralama",
    buddy: "Buddy",
    pazar: "Pazar",
    bildirimler: "Bildirimler",
    profil: "Profil",
    portfolyo: "Portfolyo",
    ayarlar: "Ayarlar",
    kapi: "Seviye Kapısı",
    misyon: "Misyon",
    toplanti: "Toplantı",
    rehber: "Rehber Paneli",
    ogrenciler: "Öğrenciler",
    ogrenci: "Öğrenci",
    incelemeler: "İncelemeler",
    inceleme: "İnceleme",
    kohortlar: "Kohortlar",
    kohort: "Kohort",
    atolyeler: "Atölyeler",
    atolye: "Atölye",
    rapor: "Raporlar",
    checkin: "Check-in",
};

interface BreadcrumbProps {
    className?: string;
    items?: BreadcrumbItem[];
}

export function Breadcrumb({ className, items }: BreadcrumbProps) {
    const pathname = usePathname();

    // Auto-generate breadcrumbs from pathname if not provided
    const breadcrumbs: BreadcrumbItem[] = items || generateBreadcrumbs(pathname);

    // Don't show breadcrumb on root pages
    if (breadcrumbs.length <= 1) return null;

    return (
        <nav className={cn("flex items-center gap-1.5 text-sm", className)}>
            {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                    {index > 0 && (
                        <MaterialIcon name="chevron_right" size="sm" className="text-muted-foreground" />
                    )}
                    {item.href && index < breadcrumbs.length - 1 ? (
                        <Link
                            href={item.href}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-foreground font-medium">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = "";

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;

        // Skip route groups (parentheses)
        if (segment.startsWith("(") && segment.endsWith(")")) continue;

        // Check if segment is a dynamic route (uuid or number)
        const isDynamic = /^[0-9a-f-]{36}$/i.test(segment) || /^\d+$/.test(segment);

        if (isDynamic) {
            // For dynamic segments, just use a placeholder or skip
            breadcrumbs.push({
                label: `#${segment.slice(0, 6)}...`,
                href: currentPath,
            });
        } else {
            const label = ROUTE_LABELS[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
            breadcrumbs.push({
                label,
                href: currentPath,
            });
        }
    }

    return breadcrumbs;
}

export default Breadcrumb;
