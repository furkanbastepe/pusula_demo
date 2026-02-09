"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/common/MaterialIcon";

interface NavItem {
    label: string;
    href: string;
    icon: string;
    badge?: number;
}

const MAIN_NAV: NavItem[] = [
    { label: "Panel", href: "/rehber", icon: "dashboard" },
    { label: "Kohort", href: "/rehber/kohort", icon: "groups" },
    { label: "Değerlendirme", href: "/rehber/degerlendirme", icon: "checklist", badge: 5 },
];

const SECONDARY_NAV: NavItem[] = [
    { label: "Toplantılar", href: "/toplanti", icon: "calendar_month" },
    { label: "Raporlar", href: "/rehber/rapor", icon: "bar_chart" },
];


const BOTTOM_NAV: NavItem[] = [
    { label: "Check-in Kiosk", href: "/rehber/checkin", icon: "qr_code" },
    { label: "İçerik Kalite", href: "/rehber/icerik", icon: "verified" },
];

const PROFILE_NAV: NavItem[] = [
    { label: "Profil", href: "/profil", icon: "person" },
    { label: "Ayarlar", href: "/ayarlar", icon: "settings" },
];

// Mock guide data
const MOCK_GUIDE = {
    name: "Ahmet Rehber",
    role: "Kohort Mentoru",
    pendingReviews: 5,
};

interface GuideSidebarProps {
    className?: string;
}

export function GuideSidebar({ className }: GuideSidebarProps) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/rehber") return pathname === "/rehber";
        return pathname.startsWith(href);
    };

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border",
                className
            )}
        >
            {/* Logo Header */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                    <MaterialIcon name="school" className="text-white" />
                </div>
                <div>
                    <h1 className="font-display text-lg font-bold text-white">PUSULA</h1>
                    <p className="text-xs text-muted-foreground">Rehber Paneli</p>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-1">
                    {MAIN_NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                                isActive(item.href)
                                    ? "sidebar-item-active"
                                    : "sidebar-item"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <MaterialIcon name={item.icon} size="md" />
                                <span>{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Separator */}
                <div className="my-4 h-px bg-sidebar-border" />

                {/* Secondary Navigation */}
                <div className="space-y-1">
                    {SECONDARY_NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                                isActive(item.href)
                                    ? "sidebar-item-active"
                                    : "sidebar-item"
                            )}
                        >
                            <MaterialIcon name={item.icon} size="md" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Separator */}
                <div className="my-4 h-px bg-sidebar-border" />

                {/* Tools Navigation */}
                <div className="space-y-1">
                    {BOTTOM_NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                                isActive(item.href)
                                    ? "sidebar-item-active"
                                    : "sidebar-item"
                            )}
                        >
                            <MaterialIcon name={item.icon} size="md" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* User Profile Section */}
            <div className="border-t border-sidebar-border p-3">
                {/* Profile Nav */}
                <div className="mb-3 space-y-1">
                    {PROFILE_NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                isActive(item.href)
                                    ? "sidebar-item-active"
                                    : "sidebar-item"
                            )}
                        >
                            <MaterialIcon name={item.icon} size="md" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Guide Card */}
                <div className="flex items-center gap-3 rounded-lg bg-blue-600/20 p-3 border border-blue-600/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                        <MaterialIcon name="person" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                            {MOCK_GUIDE.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{MOCK_GUIDE.role}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default GuideSidebar;
