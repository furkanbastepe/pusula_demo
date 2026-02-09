"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { SDGBadge } from "@/components/common/SDGBadge";
import { toast } from "sonner";

// SDG options for interest selection
const sdgOptions = [
    { id: 1, name: "Yoksulluğa Son" },
    { id: 4, name: "Nitelikli Eğitim" },
    { id: 5, name: "Toplumsal Cinsiyet Eşitliği" },
    { id: 6, name: "Temiz Su ve Sanitasyon" },
    { id: 7, name: "Erişilebilir ve Temiz Enerji" },
    { id: 11, name: "Sürdürülebilir Şehirler" },
    { id: 12, name: "Sorumlu Üretim ve Tüketim" },
    { id: 13, name: "İklim Eylemi" },
];

// Skills options
const skillOptions = [
    { id: "python", name: "Python", icon: "code" },
    { id: "data", name: "Veri Analizi", icon: "analytics" },
    { id: "design", name: "Tasarım", icon: "palette" },
    { id: "presentation", name: "Sunum", icon: "present_to_all" },
    { id: "writing", name: "Yazı", icon: "edit" },
    { id: "video", name: "Video", icon: "videocam" },
    { id: "research", name: "Araştırma", icon: "search" },
    { id: "leadership", name: "Liderlik", icon: "groups" },
];

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [selectedSDGs, setSelectedSDGs] = useState<number[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    const toggleSDG = (id: number) => {
        if (selectedSDGs.includes(id)) {
            setSelectedSDGs(selectedSDGs.filter((s) => s !== id));
        } else if (selectedSDGs.length < 3) {
            setSelectedSDGs([...selectedSDGs, id]);
        }
    };

    const toggleSkill = (id: string) => {
        if (selectedSkills.includes(id)) {
            setSelectedSkills(selectedSkills.filter((s) => s !== id));
        } else if (selectedSkills.length < 4) {
            setSelectedSkills([...selectedSkills, id]);
        }
    };

    const canProceed = () => {
        if (step === 1) return name.trim().length >= 2;
        if (step === 2) return selectedSDGs.length >= 1;
        if (step === 3) return selectedSkills.length >= 1;
        return false;
    };

    const handleNext = async () => {
        if (step < totalSteps) {
            setStep(step + 1);
            return;
        }

        // Final step - save profile
        setLoading(true);
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                await supabase.from("profiles").update({
                    full_name: name,
                    bio: bio,
                    sdg_interests: selectedSDGs,
                    skills: selectedSkills,
                    onboarding_completed: true,
                }).eq("id", user.id);

                toast.success("Profilin kaydedildi! 🎉");
                router.push("/panel");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Profil kaydedilemedi");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-chart-2/5 blur-3xl" />
            </div>

            <Card className="relative w-full max-w-lg border-border bg-card/90 backdrop-blur">
                <CardHeader className="text-center">
                    {/* Logo */}
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
                        <MaterialIcon name="explore" size="lg" className="text-black" />
                    </div>
                    <CardTitle className="font-display text-2xl text-foreground">
                        PUSULA'ya Hoş Geldin!
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {step === 1 && "Kendini tanıt"}
                        {step === 2 && "İlgi alanlarını seç"}
                        {step === 3 && "Becerilerini belirt"}
                    </CardDescription>

                    {/* Progress */}
                    <div className="mt-4">
                        <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                            <span>Adım {step} / {totalSteps}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-secondary" />
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Step 1: Profile Info */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-foreground">Ad Soyad</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Adın Soyadın"
                                    className="border-border bg-secondary text-foreground"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-foreground">Kısa Biyografi (Opsiyonel)</Label>
                                <Input
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Bir cümleyle kendini anlat"
                                    className="border-border bg-secondary text-foreground"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: SDG Interests */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                En çok ilgilenen 3 SDG'yi seç (en az 1)
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {sdgOptions.map((sdg) => {
                                    const isSelected = selectedSDGs.includes(sdg.id);
                                    return (
                                        <button
                                            key={sdg.id}
                                            onClick={() => toggleSDG(sdg.id)}
                                            disabled={!isSelected && selectedSDGs.length >= 3}
                                            className={`flex items-center gap-2 rounded-xl border p-3 text-left transition-all ${isSelected
                                                    ? "border-primary bg-primary/10"
                                                    : "border-border bg-secondary/30 hover:border-muted-foreground"
                                                } ${!isSelected && selectedSDGs.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            <SDGBadge sdg={sdg.id} variant="small" />
                                            <span className={`text-sm ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                                                {sdg.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Skills */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Sahip olduğun veya geliştirmek istediğin becerileri seç (en fazla 4)
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {skillOptions.map((skill) => {
                                    const isSelected = selectedSkills.includes(skill.id);
                                    return (
                                        <button
                                            key={skill.id}
                                            onClick={() => toggleSkill(skill.id)}
                                            disabled={!isSelected && selectedSkills.length >= 4}
                                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${isSelected
                                                    ? "border-primary bg-primary/10"
                                                    : "border-border bg-secondary/30 hover:border-muted-foreground"
                                                } ${!isSelected && selectedSkills.length >= 4 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isSelected ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                                                }`}>
                                                <MaterialIcon name={skill.icon} size="sm" />
                                            </div>
                                            <span className={`text-sm ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                                                {skill.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={step === 1}
                            className="border-border"
                        >
                            <MaterialIcon name="arrow_back" size="sm" className="mr-1.5" />
                            Geri
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={!canProceed() || loading}
                            className="bg-primary text-black hover:bg-primary/90"
                        >
                            {loading ? (
                                <MaterialIcon name="progress_activity" size="sm" className="mr-1.5 animate-spin" />
                            ) : step === totalSteps ? (
                                <MaterialIcon name="check" size="sm" className="mr-1.5" />
                            ) : (
                                <MaterialIcon name="arrow_forward" size="sm" className="mr-1.5" />
                            )}
                            {step === totalSteps ? "Tamamla" : "Devam"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
