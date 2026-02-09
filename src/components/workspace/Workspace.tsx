"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Code,
    Bot,
    PanelRightOpen,
    PanelRightClose,
    Maximize2,
    Minimize2,
    Terminal,
    Sparkles,
} from "lucide-react";

// Dynamic imports
const MonacoEditor = dynamic(
    () => import("@/components/editor/MonacoEditor"),
    { ssr: false, loading: () => <div className="h-full animate-pulse bg-zinc-900 rounded-lg" /> }
);

const MentorChat = dynamic(
    () => import("@/components/mentor/MentorChat"),
    { ssr: false, loading: () => <div className="h-full animate-pulse bg-zinc-900 rounded-lg" /> }
);

interface WorkspaceProps {
    initialCode?: string;
    language?: string;
    title?: string;
    description?: string;
    expectedOutput?: string;
    onCodeChange?: (code: string) => void;
    onSubmit?: (code: string) => void;
    className?: string;
}

export function Workspace({
    initialCode = "// Kodunuzu buraya yazın\n",
    language = "javascript",
    title = "Workspace",
    description,
    expectedOutput,
    onCodeChange,
    onSubmit,
    className,
}: WorkspaceProps) {
    const [code, setCode] = useState(initialCode);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [showMentor, setShowMentor] = useState(true);
    const [mentorMinimized, setMentorMinimized] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleCodeChange = useCallback((value: string | undefined) => {
        const newCode = value || "";
        setCode(newCode);
        onCodeChange?.(newCode);
    }, [onCodeChange]);

    const handleRun = useCallback((code: string) => {
        setConsoleOutput(["▶ Çalıştırılıyor..."]);
        // Run callback is handled by MonacoEditor
    }, []);

    const handleSubmit = useCallback((code: string) => {
        onSubmit?.(code);
    }, [onSubmit]);

    const toggleMentor = () => {
        setShowMentor(!showMentor);
        if (!showMentor) setMentorMinimized(false);
    };

    return (
        <div
            className={cn(
                "flex flex-col h-full bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden",
                isFullscreen && "fixed inset-0 z-50",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
                        <Code className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-zinc-50">{title}</h2>
                        {description && (
                            <p className="text-xs text-zinc-500">{description}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMentor}
                        className={cn(
                            "text-zinc-400 hover:text-zinc-50",
                            showMentor && "text-emerald-400"
                        )}
                    >
                        {showMentor ? (
                            <PanelRightClose className="mr-1 h-4 w-4" />
                        ) : (
                            <PanelRightOpen className="mr-1 h-4 w-4" />
                        )}
                        <Bot className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="h-8 w-8 text-zinc-400 hover:text-zinc-50"
                    >
                        {isFullscreen ? (
                            <Minimize2 className="h-4 w-4" />
                        ) : (
                            <Maximize2 className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 min-h-0">
                {/* Editor Panel */}
                <div className={cn(
                    "flex-1 flex flex-col min-w-0 transition-all",
                    showMentor && !mentorMinimized ? "lg:w-3/5" : "w-full"
                )}>
                    <MonacoEditor
                        defaultValue={initialCode}
                        value={code}
                        onChange={handleCodeChange}
                        language={language}
                        height="100%"
                        showRunButton
                        showSubmitButton={!!onSubmit}
                        showConsole
                        consoleOutput={consoleOutput}
                        expectedOutput={expectedOutput}
                        onRun={handleRun}
                        onSubmit={handleSubmit}
                        className="flex-1 border-0 rounded-none"
                    />
                </div>

                {/* Mentor Panel */}
                {showMentor && !mentorMinimized && (
                    <div className="hidden lg:flex w-2/5 max-w-md border-l border-zinc-800">
                        <MentorChat
                            className="flex-1 rounded-none border-0"
                            onMinimize={() => setMentorMinimized(true)}
                        />
                    </div>
                )}
            </div>

            {/* Minimized Mentor FAB */}
            {showMentor && mentorMinimized && (
                <Button
                    onClick={() => setMentorMinimized(false)}
                    className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg hover:from-emerald-600 hover:to-cyan-600 z-50"
                >
                    <Bot className="h-6 w-6" />
                </Button>
            )}

            {/* Mobile Mentor Toggle */}
            {showMentor && !mentorMinimized && (
                <div className="lg:hidden fixed inset-0 z-40 bg-zinc-950/95">
                    <MentorChat
                        className="h-full rounded-none"
                        onMinimize={() => setMentorMinimized(true)}
                    />
                </div>
            )}
        </div>
    );
}

// Quick Workspace for embedding in pages
interface QuickWorkspaceProps {
    code: string;
    language?: string;
    height?: string;
}

export function QuickWorkspace({
    code,
    language = "javascript",
    height = "400px",
}: QuickWorkspaceProps) {
    return (
        <Card className="border-zinc-800 bg-zinc-900 overflow-hidden">
            <CardHeader className="py-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <CardTitle className="text-sm text-zinc-50">Kod Örneği</CardTitle>
                    <Badge variant="outline" className="ml-auto border-zinc-700 text-zinc-400 text-xs">
                        {language}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <MonacoEditor
                    defaultValue={code}
                    language={language}
                    height={height}
                    readOnly
                    showRunButton={false}
                    showConsole={false}
                />
            </CardContent>
        </Card>
    );
}

export default Workspace;
