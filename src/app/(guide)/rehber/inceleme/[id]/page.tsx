"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { toast } from "sonner";

// Mock submission data
const MOCK_SUBMISSIONS: Record<string, any> = {
    "r1": {
        id: "r1",
        student: { name: "Ahmet Yılmaz", avatar: null, level: "Çırak" },
        task: {
            title: "3 Dakikalık Mikro Sunum",
            description: "Kendini ve projeni tanıtan kısa bir video çek.",
            type: "video",
            xp: 500
        },
        submission: {
            content: "https://youtube.com/watch?v=dQw4w9WgXcQ",
            note: "Merhaba hocam, videoyu ekte paylaşıyorum. Biraz heyecanlıydım ama umarım beğenirsiniz.",
            submittedAt: "2 saat önce"
        }
    },
    "default": {
        id: "default",
        student: { name: "Elif Demir", avatar: null, level: "Kalfa" },
        task: {
            title: "Veri Görselleştirme Raporu",
            description: "Eskişehir hava durumu verilerini analiz et ve raporla.",
            type: "file",
            xp: 750
        },
        submission: {
            content: "hava_durumu_analiz.pdf (2.4 MB)",
            note: "Analiz tamamlandı. Özellikle yağış grafiğine dikkat etmenizi rica ederim.",
            submittedAt: "5 saat önce"
        }
    }
};

export default function GradingPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const data = MOCK_SUBMISSIONS[id] || MOCK_SUBMISSIONS["default"];

    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const handleApprove = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success(`Görev onaylandı! ${data.student.name} +${data.task.xp} XP kazandı.`);
        setLoading(false);
        router.push("/rehber");
    };

    const handleReject = async () => {
        if (!feedback) {
            toast.error("Lütfen ret sebebini belirtin.");
            return;
        }
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.info("Görev revizeye gönderildi.");
        setLoading(false);
        router.push("/rehber");
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            <header className="mb-6">
                <Breadcrumb />
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                            Görev İnceleme
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            {data.task.title} • {data.submission.submittedAt}
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Submission Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-border">
                                    <AvatarFallback className="bg-muted">
                                        {data.student.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-lg">{data.student.name}</CardTitle>
                                    <CardDescription>{data.student.level} Seviye</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                                <h3 className="font-semibold text-foreground mb-2">Öğrenci Notu:</h3>
                                <p className="text-muted-foreground text-sm italic">"{data.submission.note}"</p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-foreground">Teslim Edilen İçerik:</h3>
                                {data.task.type === "video" || data.task.type === "link" ? (
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                        <MaterialIcon name="link" />
                                        <a href="#" className="underline truncate hover:text-blue-300 transition-colors">
                                            {data.submission.content}
                                        </a>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                        <MaterialIcon name="description" />
                                        <span className="font-medium">{data.submission.content}</span>
                                        <Button size="sm" variant="ghost" className="ml-auto h-8 w-8 p-0">
                                            <MaterialIcon name="download" size="sm" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader>
                            <CardTitle>Geri Bildirim</CardTitle>
                            <CardDescription>
                                Öğrenciye not veya düzeltme isteği yazın.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Harika iş! Belki şurayı geliştirebilirsin..."
                                className="min-h-[150px] bg-secondary/30 border-border focus:border-primary"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3 border-t border-white/5 pt-4">
                            <Button
                                variant="outline"
                                className="border-destructive/50 text-destructive hover:bg-destructive/10"
                                onClick={handleReject}
                                disabled={loading}
                            >
                                <MaterialIcon name="assignment_return" className="mr-2" />
                                Revize İste
                            </Button>
                            <Button
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={handleApprove}
                                disabled={loading}
                            >
                                {loading ? (
                                    <MaterialIcon name="progress_activity" className="mr-2 animate-spin" />
                                ) : (
                                    <MaterialIcon name="check_circle" className="mr-2" />
                                )}
                                Onayla (+{data.task.xp} XP)
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Right Column: Task Details */}
                <div className="space-y-6">
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MaterialIcon name="assignment" className="text-primary" />
                                Görev Detayı
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-foreground text-sm">Başlık</h4>
                                <p className="text-muted-foreground text-sm">{data.task.title}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm">Açıklama</h4>
                                <p className="text-muted-foreground text-sm">{data.task.description}</p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                <span className="text-sm font-semibold text-muted-foreground">Ödül</span>
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-0">
                                    {data.task.xp} XP
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MaterialIcon name="school" className="text-chart-2" />
                                Değerlendirme Kriterleri
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                                <li>Konu bütünlüğü</li>
                                <li>Sunum netliği</li>
                                <li>Zamanlama (3 dk altı)</li>
                                <li>Yaratıcılık</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
