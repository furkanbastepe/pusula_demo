"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Bot,
    User,
    Send,
    Sparkles,
    Loader2,
    Trash2,
    Minimize2,
    Maximize2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

// Types
interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface MentorChatProps {
    className?: string;
    initialMessages?: Message[];
    onMessagesChange?: (messages: Message[]) => void;
    minimized?: boolean;
    onMinimize?: () => void;
}

// Quick action suggestions
const QUICK_ACTIONS = [
    "JavaScript temellerini açıkla",
    "React hooks nasıl çalışır?",
    "Git commit best practices",
    "CV'mi nasıl geliştirebilirim?",
];

export function MentorChat({
    className,
    initialMessages = [],
    onMessagesChange,
    minimized = false,
    onMinimize,
}: MentorChatProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streamingContent]);

    // Notify parent of message changes
    useEffect(() => {
        onMessagesChange?.(messages);
    }, [messages, onMessagesChange]);

    // Auto-resize textarea
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
    };

    // Send message
    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        setStreamingContent("");

        try {
            const allMessages = [...messages, userMessage].map((m) => ({
                role: m.role,
                content: m.content,
            }));

            const response = await fetch("/api/mentor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: allMessages, stream: true }),
            });

            if (!response.ok) throw new Error("API hatası");

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullContent = "";

            if (reader) {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split("\n");

                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const data = line.slice(6);
                            if (data === "[DONE]") break;
                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.content) {
                                    fullContent += parsed.content;
                                    setStreamingContent(fullContent);
                                }
                            } catch {
                                // Skip invalid JSON
                            }
                        }
                    }
                }
            }

            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: fullContent || "Üzgünüm, yanıt oluşturulamadı.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: "Bağlantı hatası oluştu. Lütfen tekrar deneyin.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            setStreamingContent("");
        }
    }, [isLoading, messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const clearHistory = () => {
        setMessages([]);
    };

    if (minimized) {
        return (
            <Button
                onClick={onMinimize}
                className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg hover:from-emerald-600 hover:to-cyan-600"
            >
                <Bot className="h-6 w-6" />
            </Button>
        );
    }

    return (
        <Card className={cn("flex flex-col border-zinc-800 bg-zinc-900", className)}>
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-zinc-800 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-base text-zinc-50">Pusula Mentor</CardTitle>
                        <p className="text-xs text-zinc-500">Yapay zeka asistanın</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={clearHistory}
                        disabled={messages.length === 0}
                        className="h-8 w-8 text-zinc-400 hover:text-zinc-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    {onMinimize && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onMinimize}
                            className="h-8 w-8 text-zinc-400 hover:text-zinc-50"
                        >
                            <Minimize2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 mb-4">
                            <Sparkles className="h-8 w-8 text-emerald-400" />
                        </div>
                        <h3 className="font-semibold text-zinc-200 mb-2">Merhaba! 👋</h3>
                        <p className="text-sm text-zinc-500 max-w-xs mb-6">
                            Yazılım, veri analizi ve kariyer konularında sana yardımcı olabilirim.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {QUICK_ACTIONS.map((action) => (
                                <Badge
                                    key={action}
                                    variant="outline"
                                    className="border-zinc-700 text-zinc-400 cursor-pointer hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                                    onClick={() => sendMessage(action)}
                                >
                                    {action}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    "flex gap-3",
                                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                        message.role === "user"
                                            ? "bg-zinc-700"
                                            : "bg-gradient-to-br from-emerald-500 to-cyan-500"
                                    )}
                                >
                                    {message.role === "user" ? (
                                        <User className="h-4 w-4 text-zinc-200" />
                                    ) : (
                                        <Bot className="h-4 w-4 text-white" />
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        "max-w-[80%] rounded-lg px-4 py-2",
                                        message.role === "user"
                                            ? "bg-zinc-800 text-zinc-200"
                                            : "bg-zinc-800/50 text-zinc-300"
                                    )}
                                >
                                    {message.role === "assistant" ? (
                                        <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700">
                                            <ReactMarkdown>
                                                {message.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Streaming message */}
                        {isLoading && streamingContent && (
                            <div className="flex gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500">
                                    <Bot className="h-4 w-4 text-white" />
                                </div>
                                <div className="max-w-[80%] rounded-lg bg-zinc-800/50 px-4 py-2">
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown>
                                            {streamingContent}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading indicator */}
                        {isLoading && !streamingContent && (
                            <div className="flex gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500">
                                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                                </div>
                                <div className="flex items-center gap-1 px-4 py-2">
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: "0ms" }} />
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: "150ms" }} />
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </>
                )}
            </CardContent>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-4">
                <div className="flex items-end gap-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Bir soru sor..."
                        rows={1}
                        className="flex-1 resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isLoading}
                        className="h-10 w-10 bg-emerald-600 hover:bg-emerald-700"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default MentorChat;
