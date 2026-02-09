"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const MOTIVATIONAL_QUOTES = [
    {
        quote: "Her büyük yolculuk tek bir adımla başlar.",
        author: "Lao Tzu",
    },
    {
        quote: "Başarısızlık bir seçenek değil. Sadece öğrenim fırsatları var.",
        author: "NASA",
    },
    {
        quote: "Bugün zor olan, yarın kolay olacak.",
        author: "PUSULA",
    },
    {
        quote: "Yapabileceğine inanırsan, yarı yoldasın demektir.",
        author: "Theodore Roosevelt",
    },
    {
        quote: "Her usta, bir zamanlar çıraktı.",
        author: "PUSULA",
    },
    {
        quote: "Hatalar, başarının hammaddesidir.",
        author: "Thomas Edison",
    },
    {
        quote: "En iyi zaman ağaç dikmek için 20 yıl önceydi. İkinci en iyi zaman şimdi.",
        author: "Çin Atasözü",
    },
    {
        quote: "Kod yazmak öğrenmek kolay, ustalaşmak zor ama imkansız değil.",
        author: "PUSULA",
    },
];

interface MotivationCardProps {
    className?: string;
}

export function MotivationCard({ className }: MotivationCardProps) {
    const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);

    useEffect(() => {
        // Günün her saati için farklı bir quote (tutarlılık için)
        const hourOfDay = new Date().getHours();
        const quoteIndex = hourOfDay % MOTIVATIONAL_QUOTES.length;
        setQuote(MOTIVATIONAL_QUOTES[quoteIndex]);
    }, []);

    return (
        <Card className={`border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900/50 ${className}`}>
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                        <Sparkles className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm italic text-zinc-300 leading-relaxed">
                            "{quote.quote}"
                        </p>
                        <p className="text-xs text-zinc-500">— {quote.author}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
