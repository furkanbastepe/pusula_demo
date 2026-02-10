"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useDemo } from "@/lib/DemoContext";
import { TASKS, TaskContent } from "@/lib/content/tasks";
import { cn } from "@/lib/utils";

export default function TaskDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { state, dispatch } = useDemo();
    const taskId = params.id as string;

    const [task, setTask] = useState<TaskContent | null>(null);
    const [submissionType, setSubmissionType] = useState<"text" | "file" | "link">("text"); // default fallback
    const [submissionContent, setSubmissionContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const found = TASKS.find(t => t.id === taskId);
        if (!found) {
            toast.error("Görev bulunamadı");
            router.push("/gorevler");
            return;
        }
        setTask(found);
        setSubmissionType(found.deliverableType);
    }, [taskId, router]);

    if (!task) return null;

    const isCompleted = state.completedTasks.includes(taskId);

    const handleSubmit = async () => {
        if (!submissionContent.trim() && submissionType !== "file") {
            toast.error("Lütfen içeriği doldurunuz.");
            return;
        }

        setIsSubmitting(true);

        // Fake API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        dispatch({
            type: "SUBMIT_TASK",
            payload: {
                id: task.id,
                xp: task.xp
            }
        });

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        toast.success("Görev başarıyla teslim edildi!");
        setIsSubmitting(false);
        setTimeout(() => router.push("/gorevler"), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-hero p-4 md:p-8 flex justify-center">
            <Card className="w-full max-w-3xl border-border bg-card/90 backdrop-blur shadow-2xl">
                <CardHeader className="border-b border-border/50 pb-6">
                    <div className="flex items-center justify-between">
                        <Link href="/gorevler">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                <MaterialIcon name="arrow_back" className="mr-2" size="sm" />
                                Görevlere Dön
                            </Button>
                        </Link>
                        <Badge variant="outline" className="text-xs uppercase tracking-wider">{task.difficulty} Seviye</Badge>
                    </div>
                    <CardTitle className="text-3xl font-display font-bold mt-4">{task.title}</CardTitle>
                    <CardDescription className="text-lg mt-2 flex items-center gap-2">
                        <MaterialIcon name="schedule" size="sm" /> Son teslim: {task.deadline}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-6 md:p-8 space-y-8">
                    {/* Scenario Context */}
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary-foreground dark:text-primary">
                        <div className="flex gap-3">
                            <MaterialIcon name="tips_and_updates" size="md" />
                            <div>
                                <h4 className="font-bold text-sm uppercase mb-1">Bağlam</h4>
                                <p>{task.scenarioContext}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <MaterialIcon name="description" /> Görev Tanımı
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">{task.description}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <MaterialIcon name="upload_file" /> {isCompleted ? "Teslim Durumu" : "Teslim"}
                        </h3>

                        {isCompleted ? (
                            <div className="p-8 border-2 border-emerald-500/20 bg-emerald-500/5 rounded-2xl text-center">
                                <MaterialIcon name="check_circle" size="xl" className="text-emerald-500 mb-4 scale-150" />
                                <h4 className="text-xl font-bold text-emerald-500">Görev Tamamlandı!</h4>
                                <p className="text-muted-foreground mt-2">Puanın hesabına eklendi.</p>
                                <Button className="mt-6" variant="outline" onClick={() => router.push("/gorevler")}>Listeye Dön</Button>
                            </div>
                        ) : (
                            <div className="p-6 border border-border bg-secondary/20 rounded-xl space-y-4">
                                {task.deliverableType === "text" && (
                                    <textarea
                                        className="w-full min-h-[150px] p-4 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                                        placeholder="Yanıtını buraya yaz..."
                                        value={submissionContent}
                                        onChange={(e) => setSubmissionContent(e.target.value)}
                                    />
                                )}
                                {task.deliverableType === "link" && (
                                    <input
                                        type="url"
                                        className="w-full p-4 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                                        placeholder="https://..."
                                        value={submissionContent}
                                        onChange={(e) => setSubmissionContent(e.target.value)}
                                    />
                                )}
                                {task.deliverableType === "file" && (
                                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/50 cursor-pointer transition-colors">
                                        <MaterialIcon name="cloud_upload" size="xl" className="text-muted-foreground mb-2" />
                                        <p>Dosya yüklemek için tıkla veya sürükle</p>
                                        <input type="file" className="hidden" onChange={(e) => setSubmissionContent(e.target.value)} />
                                    </div>
                                )}

                                <Button
                                    className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                            Gönderiliyor...
                                        </span>
                                    ) : (
                                        `Görevi Teslim Et (+${task.xp} XP)`
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
