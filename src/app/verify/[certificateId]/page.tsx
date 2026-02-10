"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import Link from "next/link";

export default function VerifyPage() {
    const params = useParams();
    const certificateId = params.certificateId as string;

    // Simulation of verification logic
    const isValid = certificateId.startsWith("CERT-") || certificateId.startsWith("DEMO");

    // Mock Data
    const issueDate = new Date().toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' });
    const studentName = "Ayşe Yılmaz"; // In real app, fetch from DB based on ID

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                <Card className="shadow-xl border-t-8 border-t-indigo-600">
                    <CardContent className="p-8 text-center pt-12">
                        {isValid ? (
                            <>
                                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <MaterialIcon name="verified" className="text-5xl text-green-600" />
                                </div>

                                <h1 className="text-2xl font-bold text-slate-900 mb-2">Sertifika Doğrulandı</h1>
                                <p className="text-slate-600 mb-8">
                                    Bu sertifika geçerlidir ve Pusula Dijital Gençlik Merkezi tarafından verilmiştir.
                                </p>

                                <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left space-y-4 border border-slate-200">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sertifika ID</p>
                                        <p className="font-mono text-slate-900">{certificateId}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sahibi</p>
                                        <p className="text-lg font-bold text-slate-900">{studentName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Program</p>
                                        <p className="text-slate-900">Veri Bilimi ve Dijital Okuryazarlık</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Veriliş Tarihi</p>
                                        <p className="text-slate-900">{issueDate}</p>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200">
                                        <MaterialIcon name="security" size="sm" className="mr-1" />
                                        Blokzincir ile İmzalanmıştır
                                    </Badge>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                    <MaterialIcon name="error_outline" className="text-5xl text-red-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">Geçersiz Sertifika</h1>
                                <p className="text-slate-600 mb-8">
                                    Girdiğiniz ID ({certificateId}) ile eşleşen bir sertifika bulunamadı.
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <div className="text-center mt-8">
                    <Link href="/">
                        <Button variant="link" className="text-slate-500 hover:text-indigo-600">
                            Pusula Ana Sayfasına Dön
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
