"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { LevelBadge } from "@/components/common/LevelBadge";
import { useDemo } from "@/lib/DemoContext";

interface NavItem {
    label: string;
    href: string;
    icon: string;
    badge?: number;
}

const MAIN_NAV_TEMPLATE: NavItem[] = [
    { label: "Panel", href: "/panel", icon: "dashboard" },
    { label: "Müfredat", href: "/ogren", icon: "menu_book" },
    { label: "Görevler", href: "/gorevler", icon: "checklist" },
    { label: "Simülasyon", href: "/simulasyon", icon: "science" },
    { label: "Harita", href: "/harita", icon: "map" },
    { label: "Sıralama", href: "/liderlik", icon: "trophy" },
    { label: "Buddy", href: "/buddy", icon: "people" },
    { label: "Pazar", href: "/pazar", icon: "shopping_bag" },
    { label: "Etkileşimli Öğrenme", href: "/etkilesim/degiskenler", icon: "code" },
    { label: "Bildirimler", href: "/bildirimler", icon: "notifications" },
    { label: "Profil", href: "/profil", icon: "person" },
    { label: "Ayarlar", href: "/ayarlar", icon: "settings" },
];

interface SidebarMobileSheetProps {
    type?: "student" | "guide";
}

export function SidebarMobileSheet({ type = "student" }: SidebarMobileSheetProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { state } = useDemo();
    const currentUser = state;

    const isActive = (href: string) => {
        if (href === "/panel") return pathname === "/panel";
        return pathname.startsWith(href);
    };

    const mainNav = MAIN_NAV_TEMPLATE.map(item => {
        if (item.label === "Bildirimler" && (currentUser?.notifications?.length || 0) > 0) {
            return { ...item, badge: currentUser.notifications.length };
        }
        return item;
    });

    return (
        <>
            {/* Mobile Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
                {/* Hamburger Menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <MaterialIcon name="menu" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 bg-sidebar border-sidebar-border p-0">
                        {/* Logo */}
                        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                                <MaterialIcon name="explore" className="text-black" />
                            </div>
                            <div>
                                <h1 className="font-display text-lg font-bold text-white">PUSULA</h1>
                                <p className="text-xs text-muted-foreground">Eskişehir DiGEM</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto px-3 py-4">
                            <div className="space-y-1">
                                {mainNav.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
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

                        {/* User */}
                        <div className="border-t border-sidebar-border p-3">
                            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                    <MaterialIcon name="person" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{currentUser.name}</p>
                                    <LevelBadge level={currentUser.level} variant="small" showIcon={false} />
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Center Logo */}
                <Link href="/panel" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <MaterialIcon name="explore" size="sm" className="text-black" />
                    </div>
                    <span className="font-display font-bold text-foreground">PUSULA</span>
                </Link>

                {/* Right side: Notifications + XP */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1">
                        <MaterialIcon name="star" size="sm" className="text-primary" />
                        <span className="text-xs font-semibold text-foreground">{currentUser.xp}</span>
                    </div>
                    <Link href="/bildirimler">
                        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                            <MaterialIcon name="notifications" />
                            {(currentUser?.notifications?.length || 0) > 0 && (
                                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                                    {currentUser.notifications.length}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Spacer for fixed header */}
            <div className="h-14 lg:hidden" />
        </>
    );
}
