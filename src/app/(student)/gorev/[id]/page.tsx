"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { toast } from "sonner";

// Mock task data
const mockTask = {
    id: "t1",
    title: "3 Dakikalık Mikro Sunum",
    description: "Seçtiğin SDG hakkında 3 dakikalık bir video sunum hazırla. Net konuş, görseller kullan.",
    sdg: 13,
    xp: 50,
    type: "sunum",
    phase: "İnşa",
    difficulty: "medium",
    steps: [
        { id: "s1", title: "Konu seç", completed: true },
        { id: "s2", title: "Taslak hazırla", completed: true },
        { id: "s3", title: "Sunumu kaydet", completed: false },
        { id: "s4", title: "Yükle ve gönder", completed: false },
    ],
    rubric: [
        { id: "r1", label: "İçerik net ve anlaşılır", points: 10 },
        { id: "r2", label: "Görsel destek kullanılmış", points: 10 },
        { id: "r3", label: "3 dakika sınırına uyulmuş", points: 10 },
        { id: "r4", label: "Konu hakkında bilgi verilmiş", points: 10 },
        { id: "r5", label: "Özgün yaklaşım", points: 10 },
    ],
    deadline: "15 Şubat 2025",
    estimatedTime: "60 dk",
};

export default function TaskDetailPage() {
    const params = useParams();
    const router = useRouter();
    const taskId = params.id as string;

    const [task] = useState(mockTask);
    const [notes, setNotes] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const completedSteps = task.steps.filter((s) => s.completed).length;
    const progress = (completedSteps / task.steps.length) * 100;
    const maxPoints = task.rubric.reduce((acc, r) => acc + r.points, 0);

    const handleSubmit = async () => {
        if (!uploadedFile) {
            toast.error("Lütfen bir dosya yükle");
            return;
        }

        setSubmitting(true);
        try {
            // In real app, upload file and create submission
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Görev gönderildi! 🎉");
            router.push("/gorevler");
        } catch (error) {
            toast.error("Gönderim başarısız");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            {/* Header */}
            <header className="mb-6">
                <Breadcrumb />
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Task Header */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-6">
                            <div className="flex flex-wrap items-start gap-3 mb-4">
                                <SDGBadge sdg={task.sdg} variant="medium" />
                                <Badge className="bg-chart-4/20 text-chart-4 border-0">{task.phase}</Badge>
                                <Badge className="bg-blue-500/20 text-blue-400 border-0">{task.type}</Badge>
                            </div>

                            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                                {task.title}
                            </h1>
                            <p className="text-muted-foreground mb-4">{task.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <MaterialIcon name="star" size="sm" className="text-primary" />
                                    {task.xp} XP
                                </span>
                                <span className="flex items-center gap-1">
                                    <MaterialIcon name="schedule" size="sm" />
                                    {task.estimatedTime}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MaterialIcon name="event" size="sm" />
                                    Son: {task.deadline}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Progress Steps */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-foreground flex items-center gap-2">
                                <MaterialIcon name="checklist" className="text-chart-2" />
                                Adımlar
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {task.steps.map((step, idx) => (
                                <div
                                    key={step.id}
                                    className={`flex items-center gap-3 rounded-lg border p-3 ${step.completed
                                        ? "border-primary/30 bg-primary/10"
                                        : "border-border bg-secondary/30"
                                        }`}
                                >
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step.completed ? "bg-primary text-black" : "bg-secondary text-muted-foreground"
                                        }`}>
                                        {step.completed ? (
                                            <MaterialIcon name="check" size="sm" />
                                        ) : (
                                            <span className="text-sm">{idx + 1}</span>
                                        )}
                                    </div>
                                    <span className={step.completed ? "text-foreground" : "text-muted-foreground"}>
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                            <div className="pt-2">
                                <Progress value={progress} className="h-2 bg-secondary" />
                                <p className="mt-1 text-sm text-muted-foreground text-center">
                                    {completedSteps} / {task.steps.length} tamamlandı
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submission */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-foreground flex items-center gap-2">
                                <MaterialIcon name="upload_file" className="text-blue-400" />
                                Teslim
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* File Upload */}
                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 p-6 transition-all hover:border-primary hover:bg-secondary/50">
                                <input
                                    type="file"
                                    accept="video/*,image/*,.pdf"
                                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                                {uploadedFile ? (
                                    <div className="text-center">
                                        <MaterialIcon name="check_circle" size="lg" className="text-primary mb-2" />
                                        <p className="font-medium text-foreground">{uploadedFile.name}</p>
                                        <p className="text-sm text-muted-foreground">Değiştirmek için tıkla</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <MaterialIcon name="cloud_upload" size="lg" className="text-muted-foreground mb-2" />
                                        <p className="font-medium text-foreground">Dosya yükle</p>
                                        <p className="text-sm text-muted-foreground">Video, resim veya PDF</p>
                                    </div>
                                )}
                            </label>

                            {/* Notes */}
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">
                                    Notlar (opsiyonel)
                                </label>
                                <Textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Eklemek istediğin bir not var mı?"
                                    className="border-border bg-secondary text-foreground min-h-[80px]"
                                />
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={!uploadedFile || submitting}
                                className="w-full bg-primary text-black hover:bg-primary/90"
                            >
                                {submitting ? (
                                    <MaterialIcon name="progress_activity" size="sm" className="mr-2 animate-spin" />
                                ) : (
                                    <MaterialIcon name="send" size="sm" className="mr-2" />
                                )}
                                Gönder
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Rubric */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base text-foreground flex items-center gap-2">
                                <MaterialIcon name="grading" size="sm" className="text-chart-4" />
                                Değerlendirme Kriterleri
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {task.rubric.map((r) => (
                                <div key={r.id} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{r.label}</span>
                                    <span className="text-foreground font-medium">{r.points} puan</span>
                                </div>
                            ))}
                            <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
                                <span className="font-medium text-foreground">Toplam</span>
                                <span className="font-bold text-primary">{maxPoints} puan</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Help */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardContent className="p-4">
                            <Button variant="outline" className="w-full border-border mb-2">
                                <MaterialIcon name="smart_toy" size="sm" className="mr-2 text-purple-400" />
                                AI Mentor'a Sor
                            </Button>
                            <Button variant="outline" className="w-full border-border">
                                <MaterialIcon name="help" size="sm" className="mr-2 text-blue-400" />
                                Yardım Al
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
