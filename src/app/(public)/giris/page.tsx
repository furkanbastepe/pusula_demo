"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { toast } from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Lütfen e-posta adresinizi girin");
            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;

            setSent(true);
            toast.success("Giriş bağlantısı gönderildi!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gradient-login p-4">
                <Card className="w-full max-w-md border-white/10 bg-login-dark/90 backdrop-blur">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                            <MaterialIcon name="mark_email_read" size="xl" className="text-primary" />
                        </div>
                        <CardTitle className="text-xl text-foreground">E-postanı Kontrol Et</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            <strong className="text-foreground">{email}</strong> adresine giriş bağlantısı gönderdik.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-6 text-center text-sm text-muted-foreground">
                            Bağlantıya tıklayarak giriş yapabilirsin. Spam klasörünü de kontrol etmeyi unutma.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full border-white/10 text-foreground hover:bg-white/5"
                            onClick={() => setSent(false)}
                        >
                            Farklı e-posta dene
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-login p-4">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <Card className="relative w-full max-w-md border-white/10 bg-login-dark/90 backdrop-blur">
                <CardHeader className="text-center">
                    {/* Logo */}
                    <Link href="/" className="mx-auto mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                            <MaterialIcon name="explore" size="lg" className="text-black" />
                        </div>
                        <div className="text-left">
                            <span className="font-display text-2xl font-bold text-foreground">PUSULA</span>
                            <p className="text-xs text-muted-foreground">Dijital Gençlik Merkezi</p>
                        </div>
                    </Link>
                    <CardTitle className="text-xl text-foreground">Giriş Yap</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        E-posta adresinle giriş bağlantısı al
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground">
                                E-posta
                            </Label>
                            <div className="relative">
                                <MaterialIcon
                                    name="mail"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    size="sm"
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ornek@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-white/10 bg-white/5 pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-black hover:bg-primary/90 glow-green"
                        >
                            {loading ? (
                                <>
                                    <MaterialIcon name="progress_activity" size="sm" className="mr-2 animate-spin" />
                                    Gönderiliyor...
                                </>
                            ) : (
                                <>
                                    <MaterialIcon name="login" size="sm" className="mr-2" />
                                    Giriş Bağlantısı Gönder
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Hesabın yok mu?{" "}
                        <Link href="/kayit" className="text-primary hover:underline">
                            Kayıt ol
                        </Link>
                    </div>

                    <Link
                        href="/"
                        className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <MaterialIcon name="arrow_back" size="sm" />
                        Ana Sayfaya Dön
                    </Link>
                </CardContent>
            </Card>
        </main>
    );
}
