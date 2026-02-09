"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/common/MaterialIcon";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface SuggestionChip {
    text: string;
    icon: string;
}

const suggestionChips: SuggestionChip[] = [
    { text: "SDG nedir?", icon: "public" },
    { text: "Nasıl kanıt oluştururum?", icon: "attach_file" },
    { text: "XP nasıl kazanırım?", icon: "star" },
    { text: "GDR puanı ne demek?", icon: "insights" },
];

const quickActions = [
    { label: "Görev Yardımı", icon: "task_alt", color: "text-chart-2" },
    { label: "Yazım Kontrolü", icon: "spellcheck", color: "text-chart-4" },
    { label: "Sunum İpuçları", icon: "present_to_all", color: "text-blue-400" },
    { label: "Kod Yardımı", icon: "code", color: "text-purple-400" },
];

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};


const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};

export default function MentorPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Merhaba! 👋 Ben PUSULA AI Mentor. Öğrenme yolculuğunda sana yardımcı olmak için buradayım. Nasıl yardımcı olabilirim?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText) return;

        // Add user message
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: messageText,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses: Record<string, string> = {
                "SDG nedir?": "SDG, Sürdürülebilir Kalkınma Amaçları (Sustainable Development Goals) anlamına gelir. Birleşmiş Milletler tarafından 2015'te belirlenen 17 küresel hedeftir. PUSULA'da SDG'lere bağlı projeler yaparak hem dünyaya katkı sağlıyorsun hem de öğreniyorsun! 🌍",
                "Nasıl kanıt oluştururum?": "Kanıt oluşturmak için:\n\n1. **Ekran görüntüsü**: İşini gösteren bir görüntü al\n2. **Video**: Süreç kaydı yap\n3. **Dosya**: Oluşturduğun dökümanı yükle\n4. **Link**: Canlı projenin linkini paylaş\n\nÖnemli: Kanıt tarih ve bağlam içermeli! 📸",
                "XP nasıl kazanırım?": "XP kazanmanın yolları:\n\n⭐ **Görev Tamamla**: Her görev XP verir\n📚 **MicroLab Bitir**: Eğitimleri tamamla\n🔥 **Streak Tut**: Ardışık günler aktif ol\n🏆 **Rozetler Kazan**: Özel başarılar\n\nToplam XP'n seviye atlaman için kritik!",
                "GDR puanı ne demek?": "GDR = Girişimcilik Dinamik Raporu\n\n📊 Üç boyutta ölçülür:\n- **G (Girişkenlik)**: İnisiyatif alma\n- **D (Dayanıklılık)**: Zorlukları aşma\n- **R (Refleksiyon)**: Öğrenmeyi yansıtma\n\n100 üzerinden skorlanır, senin benzersiz profilini oluşturur!",
            };

            const response = responses[messageText] || `"${messageText}" hakkında düşünüyorum... Bu konuda sana yardımcı olmak isterim! Daha spesifik bir soru sorabilir misin?`;

            const aiMessage: Message = {
                id: `ai-${Date.now()}`,
                role: "assistant",
                content: response,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-hero flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            <motion.header
                className="shrink-0 border-b border-border bg-card/30 backdrop-blur p-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500"
                            animate={{
                                boxShadow: [
                                    "0 0 0px rgba(139, 92, 246, 0)",
                                    "0 0 20px rgba(139, 92, 246, 0.5)",
                                    "0 0 0px rgba(139, 92, 246, 0)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <MaterialIcon name="smart_toy" className="text-white" />
                        </motion.div>
                        <div>
                            <h1 className="font-display font-semibold text-foreground">AI Mentor</h1>
                            <p className="text-xs text-muted-foreground">Öğrenme yolculuğunda rehberin</p>
                        </div>
                    </div>
                    <Link href="/panel">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm" className="border-border">
                                <MaterialIcon name="close" size="sm" />
                            </Button>
                        </motion.div>
                    </Link>
                </div>
            </motion.header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg.id}
                            variants={messageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <motion.div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === "user"
                                    ? "bg-primary text-black"
                                    : "bg-card/80 backdrop-blur border border-border text-foreground"
                                    }`}
                                whileHover={{ scale: 1.01 }}
                            >
                                {msg.role === "assistant" && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <motion.div
                                            className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            <MaterialIcon name="smart_toy" size="sm" className="text-white" />
                                        </motion.div>
                                        <span className="text-xs text-muted-foreground">AI Mentor</span>
                                    </div>
                                )}
                                <p className="whitespace-pre-line text-sm">{msg.content}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-start"
                    >
                        <div className="bg-card/80 backdrop-blur border border-border rounded-2xl px-4 py-3">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <MaterialIcon name="smart_toy" size="sm" className="text-white" />
                                </motion.div>
                                <span className="text-xs text-muted-foreground">düşünüyor</span>
                                <span className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.span
                                            key={i}
                                            className="h-2 w-2 rounded-full bg-muted-foreground"
                                            animate={{
                                                y: [0, -6, 0],
                                                opacity: [0.5, 1, 0.5]
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                repeat: Infinity,
                                                delay: i * 0.15
                                            }}
                                        />
                                    ))}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Suggestions - only show if no user messages */}
            <AnimatePresence>
                {messages.length === 1 && (
                    <motion.div
                        className="shrink-0 px-4 pb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <p className="text-xs text-muted-foreground mb-2">Önerilen sorular:</p>
                        <motion.div
                            className="flex flex-wrap gap-2"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {suggestionChips.map((chip, index) => (
                                <motion.button
                                    key={chip.text}
                                    variants={chipVariants}
                                    onClick={() => handleSend(chip.text)}
                                    className="flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                                    whileHover={{ scale: 1.05, borderColor: "rgba(19, 236, 91, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <MaterialIcon name={chip.icon} size="sm" />
                                    {chip.text}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Actions */}
            <AnimatePresence>
                {messages.length === 1 && (
                    <motion.div
                        className="shrink-0 px-4 pb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        <motion.div
                            className="grid grid-cols-2 gap-2"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {quickActions.map((action, index) => (
                                <motion.button
                                    key={action.label}
                                    variants={fadeInUp}
                                    className="flex items-center gap-2 rounded-xl border border-border bg-card/50 p-3 text-left hover:bg-card transition-colors"
                                    whileHover={{ scale: 1.02, borderColor: "rgba(19, 236, 91, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <MaterialIcon name={action.icon} className={action.color} />
                                    <span className="text-sm text-foreground">{action.label}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input Area */}
            <motion.div
                className="shrink-0 border-t border-border bg-card/30 backdrop-blur p-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Bir soru sor..."
                        className="flex-1 border-border bg-secondary text-foreground"
                    />
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isTyping}
                            className="bg-primary text-black hover:bg-primary/90"
                        >
                            <MaterialIcon name="send" size="sm" />
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
