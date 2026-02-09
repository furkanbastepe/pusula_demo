"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// Mock workspace data
const mockFiles = [
    { id: "f1", name: "sunum.pptx", type: "presentation", size: "2.4 MB", updated: "Bugün 14:30" },
    { id: "f2", name: "arastirma.docx", type: "document", size: "156 KB", updated: "Dün" },
    { id: "f3", name: "grafik.png", type: "image", size: "890 KB", updated: "2 gün önce" },
    { id: "f4", name: "veri_analizi.ipynb", type: "notebook", size: "45 KB", updated: "3 gün önce" },
];

const mockTemplates = [
    { id: "t1", name: "Sunum Şablonu", icon: "present_to_all", color: "text-chart-4" },
    { id: "t2", name: "Araştırma Raporu", icon: "description", color: "text-blue-400" },
    { id: "t3", name: "Proje Teklifi", icon: "lightbulb", color: "text-chart-2" },
    { id: "t4", name: "Veri Analizi", icon: "analytics", color: "text-purple-400" },
];

const recentActivities = [
    { id: "a1", action: "Dosya düzenlendi", file: "sunum.pptx", time: "2 saat önce" },
    { id: "a2", action: "Yeni dosya oluşturuldu", file: "grafik.png", time: "Dün" },
    { id: "a3", action: "AI ile içerik oluşturuldu", file: "arastirma.docx", time: "2 gün önce" },
];

const fileIcons: Record<string, { icon: string; color: string }> = {
    presentation: { icon: "slideshow", color: "text-chart-4" },
    document: { icon: "description", color: "text-blue-400" },
    image: { icon: "image", color: "text-chart-2" },
    notebook: { icon: "code", color: "text-purple-400" },
};

export default function WorkspacePage() {
    const [activeTab, setActiveTab] = useState("files");

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            <header className="mb-6">
                <Breadcrumb />
                <div className="flex items-center justify-between mt-2">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground">Çalışma Alanı</h1>
                        <p className="text-muted-foreground">Dosyalarını yönet ve içerik oluştur</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-border">
                            <MaterialIcon name="upload" size="sm" className="mr-1.5" />
                            Yükle
                        </Button>
                        <Button className="bg-primary text-black hover:bg-primary/90">
                            <MaterialIcon name="add" size="sm" className="mr-1.5" />
                            Yeni
                        </Button>
                    </div>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {mockTemplates.map((template) => (
                            <button
                                key={template.id}
                                className="flex flex-col items-center justify-center rounded-xl border border-border bg-card/80 backdrop-blur p-4 hover:bg-card hover:border-primary/50 transition-all"
                            >
                                <div className={`h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-2 ${template.color}`}>
                                    <MaterialIcon name={template.icon} />
                                </div>
                                <span className="text-sm text-foreground">{template.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Files List */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg text-foreground">Dosyalarım</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                                        <MaterialIcon name="grid_view" size="sm" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                                        <MaterialIcon name="list" size="sm" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {mockFiles.map((file) => {
                                const fileType = fileIcons[file.type] || { icon: "draft", color: "text-muted-foreground" };
                                return (
                                    <button
                                        key={file.id}
                                        className="w-full flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-3 hover:bg-secondary/50 transition-colors text-left"
                                    >
                                        <div className={`h-10 w-10 rounded-lg bg-secondary flex items-center justify-center ${fileType.color}`}>
                                            <MaterialIcon name={fileType.icon} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-foreground truncate">{file.name}</h3>
                                            <p className="text-xs text-muted-foreground">{file.size} · {file.updated}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground shrink-0">
                                            <MaterialIcon name="more_vert" size="sm" />
                                        </Button>
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* AI Assistant */}
                    <Card className="border-border bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                    <MaterialIcon name="smart_toy" className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">AI Yardımcı</h3>
                                    <p className="text-xs text-muted-foreground">İçerik oluşturmana yardımcı olur</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full border-border justify-start">
                                    <MaterialIcon name="auto_awesome" size="sm" className="mr-2 text-chart-4" />
                                    Sunum Taslağı Oluştur
                                </Button>
                                <Button variant="outline" className="w-full border-border justify-start">
                                    <MaterialIcon name="edit_note" size="sm" className="mr-2 text-blue-400" />
                                    Yazı Düzenle
                                </Button>
                                <Button variant="outline" className="w-full border-border justify-start">
                                    <MaterialIcon name="translate" size="sm" className="mr-2 text-chart-2" />
                                    Çevir
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base text-foreground">Son Aktivite</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                                    <div className="flex-1">
                                        <p className="text-sm text-foreground">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground">{activity.file} · {activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Storage */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-muted-foreground">Depolama</span>
                                <span className="text-sm text-foreground">3.5 / 10 GB</span>
                            </div>
                            <div className="h-2 rounded-full bg-secondary overflow-hidden">
                                <div className="h-full w-[35%] rounded-full bg-primary" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
