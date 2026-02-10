"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { LevelBadge } from "@/components/common/LevelBadge";
import { useDemo } from "@/lib/DemoContext";

interface NavItem {
    label: string;
    href: string;
    icon: string;
    badge?: number;
}

const MAIN_NAV: NavItem[] = [
    { label: "Panel", href: "/panel", icon: "dashboard" },
    { label: "Müfredat", href: "/ogren", icon: "menu_book" },
    { label: "Görevler", href: "/gorevler", icon: "checklist" },
    { label: "Etkinlikler", href: "/etkinlikler", icon: "celebration" },
    { label: "Çalışma Alanı", href: "/calisma", icon: "folder_open" },
    { label: "Simülasyon", href: "/simulasyon", icon: "science" },
    { label: "Harita", href: "/harita", icon: "map" },
    { label: "Sıralama", href: "/liderlik", icon: "trophy" },
];

const SECONDARY_NAV_TEMPLATE: NavItem[] = [
    { label: "AI Mentor", href: "/mentor", icon: "smart_toy" },
    { label: "Buddy", href: "/buddy", icon: "people" },
    { label: "Pazar", href: "/pazar", icon: "shopping_bag" },
    { label: "Etkileşimli Öğrenme", href: "/etkilesim/degiskenler", icon: "code" },
    { label: "Bildirimler", href: "/bildirimler", icon: "notifications" },
];

const BOTTOM_NAV: NavItem[] = [
    { label: "Profil", href: "/profil", icon: "person" },
    { label: "Ayarlar", href: "/ayarlar", icon: "settings" },
];

interface AppSidebarProps {
    className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
    const pathname = usePathname();
    const { state } = useDemo();
    const currentUser = state;

    const isActive = (href: string) => {
        if (href === "/panel") return pathname === "/panel";
        return pathname.startsWith(href);
    };

    const secondaryNav = SECONDARY_NAV_TEMPLATE.map(item => {
        if (item.label === "Bildirimler" && (currentUser?.notifications?.length || 0) > 0) {
            return { ...item, badge: currentUser.notifications.length };
        }
        return item;
    });

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border",
                className
            )}
        >
            {/* Logo Header */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                    <MaterialIcon name="explore" className="text-black" />
                </div>
                <div>
                    <h1 className="font-display text-lg font-bold text-white">PUSULA</h1>
                    <p className="text-xs text-muted-foreground">Eskişehir DiGEM</p>
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

                {/* Secondary Navigation */}
                <div className="space-y-1">
                    {secondaryNav.map((item) => (
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
                            {item.badge && item.badge > 0 && (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-black">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* User Profile Section */}
            <div className="border-t border-sidebar-border p-3">
                {/* Bottom Nav */}
                <div className="mb-3 space-y-1">
                    {BOTTOM_NAV.map((item) => (
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

                {/* User Card */}
                <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <MaterialIcon name="person" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                            {currentUser.name}
                        </p>
                        <div className="flex items-center gap-2">
                            <LevelBadge level={currentUser.level} variant="small" showIcon={false} />
                            <span className="text-xs text-muted-foreground">{currentUser.xp} XP</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
