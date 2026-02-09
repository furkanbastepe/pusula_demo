"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { toast } from "sonner";

// Mock store data
const rewards = [
    {
        id: "r1",
        name: "Premium Sticker Pack",
        description: "PUSULA özel tasarım çıkartma seti",
        cost: 200,
        category: "fiziksel",
        image: null,
        stock: 15,
        icon: "redeem",
    },
    {
        id: "r2",
        name: "Mentor 1-1 Görüşme",
        description: "30 dakikalık özel mentor görüşmesi",
        cost: 500,
        category: "deneyim",
        image: null,
        stock: 5,
        icon: "videocam",
    },
    {
        id: "r3",
        name: "Profil Çerçevesi: Gold",
        description: "Profiline altın çerçeve ekle",
        cost: 150,
        category: "dijital",
        image: null,
        stock: 999,
        icon: "filter_frames",
    },
    {
        id: "r4",
        name: "Eskişehir Kafe Kuponu",
        description: "Yerel kafede içecek kuponu",
        cost: 100,
        category: "fiziksel",
        image: null,
        stock: 20,
        icon: "local_cafe",
    },
    {
        id: "r5",
        name: "Özel Rozet: Kahraman",
        description: "Profiline özel kahraman rozeti",
        cost: 300,
        category: "dijital",
        image: null,
        stock: 999,
        icon: "military_tech",
    },
    {
        id: "r6",
        name: "Workshop Öncelikli Kayıt",
        description: "Gelecek atölyeye öncelikli kayıt hakkı",
        cost: 250,
        category: "deneyim",
        image: null,
        stock: 3,
        icon: "event_seat",
    },
];

const categories = [
    { id: "all", label: "Tümü", icon: "grid_view" },
    { id: "dijital", label: "Dijital", icon: "brush" },
    { id: "fiziksel", label: "Fiziksel", icon: "inventory_2" },
    { id: "deneyim", label: "Deneyim", icon: "auto_awesome" },
];

// Mock user balance
const userBalance = {
    coins: 450,
    pendingCoins: 100,
};

const recentPurchases = [
    { id: "p1", item: "Profil Çerçevesi: Silver", date: "3 Şubat", cost: 100 },
    { id: "p2", item: "Sticker Mini Set", date: "25 Ocak", cost: 75 },
];

export default function PazarPage() {
    const [category, setCategory] = useState("all");
    const [activeTab, setActiveTab] = useState("market");

    const filteredRewards = category === "all"
        ? rewards
        : rewards.filter((r) => r.category === category);

    const handlePurchase = (reward: typeof rewards[0]) => {
        if (userBalance.coins < reward.cost) {
            toast.error("Yeterli coin yok!");
            return;
        }
        toast.success(`${reward.name} satın alındı!`);
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Page Header */}
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                            Ödül Pazarı
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            XP'lerini ödüllere dönüştür
                        </p>
                    </div>
                    <Card className="border-primary/30 bg-card/80 px-4 py-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-4/20">
                                <MaterialIcon name="monetization_on" className="text-chart-4" />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-foreground">{userBalance.coins}</div>
                                <div className="text-xs text-muted-foreground">
                                    +{userBalance.pendingCoins} bekliyor
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </header>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-card/50">
                    <TabsTrigger value="market" className="data-[state=active]:bg-primary/20">
                        <MaterialIcon name="storefront" size="sm" className="mr-1.5" />
                        Mağaza
                    </TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-primary/20">
                        <MaterialIcon name="history" size="sm" className="mr-1.5" />
                        Geçmiş
                    </TabsTrigger>
                </TabsList>

                {/* Market Tab */}
                <TabsContent value="market" className="space-y-6">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant="outline"
                                size="sm"
                                className={`border-border ${category === cat.id
                                        ? "bg-primary/20 border-primary text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                onClick={() => setCategory(cat.id)}
                            >
                                <MaterialIcon name={cat.icon} size="sm" className="mr-1" />
                                {cat.label}
                            </Button>
                        ))}
                    </div>

                    {/* Rewards Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredRewards.map((reward) => {
                            const canAfford = userBalance.coins >= reward.cost;
                            const lowStock = reward.stock <= 5 && reward.stock < 999;

                            return (
                                <Card
                                    key={reward.id}
                                    className={`border-border bg-card/80 backdrop-blur transition-all hover:-translate-y-1 ${!canAfford ? "opacity-60" : ""
                                        }`}
                                >
                                    <CardContent className="p-4">
                                        {/* Icon/Image */}
                                        <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-chart-4/10">
                                            <MaterialIcon name={reward.icon} size="xl" className="text-chart-4" />
                                        </div>

                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-semibold text-foreground">{reward.name}</h3>
                                            <Badge className={`shrink-0 border-0 ${reward.category === "dijital"
                                                    ? "bg-purple-500/20 text-purple-400"
                                                    : reward.category === "fiziksel"
                                                        ? "bg-blue-500/20 text-blue-400"
                                                        : "bg-chart-4/20 text-chart-4"
                                                }`}>
                                                {categories.find((c) => c.id === reward.category)?.label}
                                            </Badge>
                                        </div>

                                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                            {reward.description}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <MaterialIcon name="monetization_on" size="sm" className="text-chart-4" />
                                                <span className="font-bold text-foreground">{reward.cost}</span>
                                            </div>
                                            {lowStock && (
                                                <span className="text-xs text-destructive">
                                                    Sadece {reward.stock} kaldı!
                                                </span>
                                            )}
                                        </div>

                                        <Button
                                            className={`mt-4 w-full ${canAfford
                                                    ? "bg-primary text-black hover:bg-primary/90"
                                                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                                                }`}
                                            disabled={!canAfford}
                                            onClick={() => handlePurchase(reward)}
                                        >
                                            {canAfford ? (
                                                <>
                                                    <MaterialIcon name="shopping_cart" size="sm" className="mr-1.5" />
                                                    Satın Al
                                                </>
                                            ) : (
                                                "Yeterli Coin Yok"
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" className="space-y-4">
                    <h2 className="font-display text-lg font-semibold text-foreground">Son Alımlar</h2>
                    {recentPurchases.length > 0 ? (
                        <div className="space-y-3">
                            {recentPurchases.map((purchase) => (
                                <Card key={purchase.id} className="border-border bg-card/80 backdrop-blur">
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                                <MaterialIcon name="check_circle" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{purchase.item}</p>
                                                <p className="text-sm text-muted-foreground">{purchase.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-chart-4">
                                            <MaterialIcon name="monetization_on" size="sm" />
                                            <span className="font-medium">-{purchase.cost}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-border bg-card/80 backdrop-blur">
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <MaterialIcon name="shopping_bag" size="xl" className="text-muted-foreground" />
                                <p className="mt-4 text-lg font-medium text-foreground">Henüz alım yok</p>
                                <p className="text-sm text-muted-foreground">İlk ödülünü almak için mağazaya göz at</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
