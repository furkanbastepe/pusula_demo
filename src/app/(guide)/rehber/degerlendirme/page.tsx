"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { toast } from "sonner";

// Mock pending submissions
const mockSubmissions = [
    {
        id: "sub1",
        taskTitle: "3 Dakikalık Mikro Sunum",
        taskId: "t1",
        studentName: "Ayşe Yılmaz",
        studentId: "s1",
        sdg: 13,
        submittedAt: "2 saat önce",
        fileType: "video",
        fileUrl: "#",
        notes: "İlk sunumum, geri bildirim bekliyorum.",
        rubric: [
            { id: "r1", label: "İçerik net ve anlaşılır", points: 10, score: null },
            { id: "r2", label: "Görsel destek kullanılmış", points: 10, score: null },
            { id: "r3", label: "3 dakika sınırına uyulmuş", points: 10, score: null },
            { id: "r4", label: "Konu hakkında bilgi verilmiş", points: 10, score: null },
            { id: "r5", label: "Özgün yaklaşım", points: 10, score: null },
        ],
    },
    {
        id: "sub2",
        taskTitle: "SDG Araştırma Raporu",
        taskId: "t2",
        studentName: "Zeynep Demir",
        studentId: "s3",
        sdg: 4,
        submittedAt: "5 saat önce",
        fileType: "pdf",
        fileUrl: "#",
        notes: "Ek kaynakları da ekledim.",
        rubric: [
            { id: "r1", label: "Araştırma kapsamlı", points: 15, score: null },
            { id: "r2", label: "Kaynaklar belirtilmiş", points: 10, score: null },
            { id: "r3", label: "Analiz yapılmış", points: 15, score: null },
            { id: "r4", label: "Yazım düzgün", points: 10, score: null },
        ],
    },
];

interface RubricItem {
    id: string;
    label: string;
    points: number;
    score: number | null;
}

export default function ReviewPage() {
    const [submissions] = useState(mockSubmissions);
    const [selectedSubmission, setSelectedSubmission] = useState(submissions[0]);
    const [rubricScores, setRubricScores] = useState<Record<string, number>>({});
    const [feedback, setFeedback] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleScoreChange = (itemId: string, score: number) => {
        setRubricScores((prev) => ({ ...prev, [itemId]: score }));
    };

    const totalScore = Object.values(rubricScores).reduce((acc, score) => acc + score, 0);
    const maxScore = selectedSubmission.rubric.reduce((acc, r) => acc + r.points, 0);
    const allScored = selectedSubmission.rubric.every((r) => rubricScores[r.id] !== undefined);

    const handleSubmitReview = async () => {
        if (!allScored) {
            toast.error("Lütfen tüm kriterleri puanla");
            return;
        }

        setSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Değerlendirme kaydedildi!");
            // Reset and move to next
            setRubricScores({});
            setFeedback("");
            if (submissions.length > 1) {
                const nextIndex = submissions.findIndex((s) => s.id === selectedSubmission.id) + 1;
                if (nextIndex < submissions.length) {
                    setSelectedSubmission(submissions[nextIndex]);
                }
            }
        } catch (error) {
            toast.error("Değerlendirme kaydedilemedi");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-6">
            <header className="mb-6">
                <Breadcrumb />
                <h1 className="font-display text-2xl font-bold text-foreground mt-2">Değerlendirme</h1>
                <p className="text-muted-foreground">Bekleyen öğrenci teslimlerini incele</p>
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Submission List */}
                <div className="space-y-3">
                    <h2 className="text-sm font-medium text-muted-foreground mb-2">
                        Bekleyen Teslimler ({submissions.length})
                    </h2>
                    {submissions.map((sub) => (
                        <button
                            key={sub.id}
                            onClick={() => {
                                setSelectedSubmission(sub);
                                setRubricScores({});
                                setFeedback("");
                            }}
                            className={`w-full text-left rounded-xl border p-4 transition-all ${selectedSubmission.id === sub.id
                                    ? "border-primary bg-primary/10"
                                    : "border-border bg-card/80 hover:bg-card"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <SDGBadge sdg={sub.sdg} variant="small" />
                                <Badge className="bg-secondary text-muted-foreground border-0 text-xs">
                                    {sub.fileType}
                                </Badge>
                            </div>
                            <h3 className="font-medium text-foreground mb-1">{sub.taskTitle}</h3>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{sub.studentName}</span>
                                <span>{sub.submittedAt}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Review Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Submission Details */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <SDGBadge sdg={selectedSubmission.sdg} variant="medium" />
                                    <CardTitle className="text-lg text-foreground">{selectedSubmission.taskTitle}</CardTitle>
                                </div>
                                <Link href={`/rehber/ogrenci/${selectedSubmission.studentId}`}>
                                    <Button variant="outline" size="sm" className="border-border">
                                        <MaterialIcon name="person" size="sm" className="mr-1" />
                                        {selectedSubmission.studentName}
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* File Preview */}
                            <div className="rounded-xl border border-border bg-secondary/50 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-muted-foreground">Yüklenen Dosya</span>
                                    <Button variant="outline" size="sm" className="border-border">
                                        <MaterialIcon name="download" size="sm" className="mr-1" />
                                        İndir
                                    </Button>
                                </div>
                                <div className="aspect-video rounded-lg bg-secondary flex items-center justify-center">
                                    <MaterialIcon
                                        name={selectedSubmission.fileType === "video" ? "videocam" : "description"}
                                        size="xl"
                                        className="text-muted-foreground"
                                    />
                                </div>
                            </div>

                            {/* Student Notes */}
                            {selectedSubmission.notes && (
                                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                                    <p className="text-xs text-muted-foreground mb-1">Öğrenci Notu:</p>
                                    <p className="text-sm text-foreground">{selectedSubmission.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Rubric Scoring */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                                    <MaterialIcon name="grading" className="text-chart-4" />
                                    Değerlendirme Kriterleri
                                </CardTitle>
                                <div className="text-lg font-bold text-primary">
                                    {totalScore} / {maxScore}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {selectedSubmission.rubric.map((item) => (
                                <div key={item.id} className="rounded-xl border border-border bg-secondary/30 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-foreground">{item.label}</span>
                                        <span className="text-sm text-muted-foreground">max {item.points} puan</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {[0, Math.round(item.points * 0.25), Math.round(item.points * 0.5), Math.round(item.points * 0.75), item.points].map((score) => (
                                            <button
                                                key={score}
                                                onClick={() => handleScoreChange(item.id, score)}
                                                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${rubricScores[item.id] === score
                                                        ? "bg-primary text-black"
                                                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                                    }`}
                                            >
                                                {score}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Feedback */}
                    <Card className="border-border bg-card/80 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-foreground flex items-center gap-2">
                                <MaterialIcon name="comment" className="text-blue-400" />
                                Geri Bildirim
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Öğrenciye yapıcı geri bildirim yaz..."
                                className="min-h-[120px] border-border bg-secondary text-foreground"
                            />
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 border-border">
                            <MaterialIcon name="undo" size="sm" className="mr-1" />
                            Revizyon İste
                        </Button>
                        <Button
                            onClick={handleSubmitReview}
                            disabled={!allScored || submitting}
                            className="flex-1 bg-primary text-black hover:bg-primary/90"
                        >
                            {submitting ? (
                                <MaterialIcon name="progress_activity" size="sm" className="mr-1 animate-spin" />
                            ) : (
                                <MaterialIcon name="check" size="sm" className="mr-1" />
                            )}
                            Değerlendirmeyi Kaydet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
