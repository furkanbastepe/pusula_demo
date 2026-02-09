"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Editor, { OnMount, Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Check, Copy, Loader2, Terminal } from "lucide-react";

interface MonacoEditorProps {
    defaultValue?: string;
    value?: string;
    onChange?: (value: string | undefined) => void;
    language?: string;
    theme?: "vs-dark" | "light" | "pusula-dark";
    height?: string;
    readOnly?: boolean;
    onRun?: (code: string) => void;
    onSubmit?: (code: string) => void;
    showRunButton?: boolean;
    showSubmitButton?: boolean;
    showConsole?: boolean;
    consoleOutput?: string[];
    className?: string;
    expectedOutput?: string;
}

// Custom dark theme for PUSULA
const PUSULA_THEME: editor.IStandaloneThemeData = {
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "comment", foreground: "6A9955" },
        { token: "keyword", foreground: "C586C0" },
        { token: "string", foreground: "CE9178" },
        { token: "number", foreground: "B5CEA8" },
        { token: "type", foreground: "4EC9B0" },
        { token: "function", foreground: "DCDCAA" },
    ],
    colors: {
        "editor.background": "#0a0a0a",
        "editor.foreground": "#D4D4D4",
        "editor.lineHighlightBackground": "#18181b",
        "editor.selectionBackground": "#264F78",
        "editorCursor.foreground": "#10b981",
        "editorLineNumber.foreground": "#52525b",
        "editorLineNumber.activeForeground": "#a1a1aa",
    },
};

export function MonacoEditor({
    defaultValue = "",
    value,
    onChange,
    language = "javascript",
    theme = "pusula-dark",
    height = "400px",
    readOnly = false,
    onRun,
    onSubmit,
    showRunButton = true,
    showSubmitButton = false,
    showConsole = true,
    consoleOutput = [],
    className,
    expectedOutput,
}: MonacoEditorProps) {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [localConsole, setLocalConsole] = useState<string[]>(consoleOutput);
    const [copied, setCopied] = useState(false);

    // Update local console when prop changes
    useEffect(() => {
        setLocalConsole(consoleOutput);
    }, [consoleOutput]);

    const handleEditorMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // Register custom theme
        monaco.editor.defineTheme("pusula-dark", PUSULA_THEME);
        monaco.editor.setTheme("pusula-dark");

        // Enable helpful features
        editor.updateOptions({
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            lineNumbers: "on",
            renderLineHighlight: "gutter",
            tabSize: 2,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
        });
    };

    const handleRun = useCallback(async () => {
        if (!editorRef.current || !onRun) return;
        const code = editorRef.current.getValue();

        setIsRunning(true);
        setLocalConsole(["▶ Çalıştırılıyor...\n"]);

        try {
            // Execute via callback
            onRun(code);

            // Simulate a simple JS execution for preview
            const logs: string[] = [];
            const originalLog = console.log;
            console.log = (...args) => {
                logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
            };

            try {
                // eslint-disable-next-line no-eval
                eval(code);
                setLocalConsole(["▶ Çalıştırılıyor...\n", ...logs, "\n✓ Başarıyla tamamlandı"]);
            } catch (err) {
                setLocalConsole(["▶ Çalıştırılıyor...\n", ...logs, `\n✗ Hata: ${err}`]);
            } finally {
                console.log = originalLog;
            }
        } catch (err) {
            setLocalConsole(["✗ Hata: " + String(err)]);
        } finally {
            setIsRunning(false);
        }
    }, [onRun]);

    const handleSubmit = useCallback(() => {
        if (!editorRef.current || !onSubmit) return;
        const code = editorRef.current.getValue();
        onSubmit(code);
    }, [onSubmit]);

    const handleReset = useCallback(() => {
        if (editorRef.current) {
            editorRef.current.setValue(defaultValue);
            setLocalConsole([]);
        }
    }, [defaultValue]);

    const handleCopy = useCallback(async () => {
        if (!editorRef.current) return;
        const code = editorRef.current.getValue();
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    return (
        <div className={cn("rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden", className)}>
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                        {language}
                    </Badge>
                    {readOnly && (
                        <Badge variant="outline" className="border-amber-700/50 text-amber-400 text-xs">
                            Salt Okunur
                        </Badge>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="text-zinc-400 hover:text-zinc-50"
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    {!readOnly && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                            className="text-zinc-400 hover:text-zinc-50"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    )}
                    {showRunButton && !readOnly && (
                        <Button
                            size="sm"
                            onClick={handleRun}
                            disabled={isRunning}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {isRunning ? (
                                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            ) : (
                                <Play className="mr-1 h-4 w-4" />
                            )}
                            Çalıştır
                        </Button>
                    )}
                    {showSubmitButton && !readOnly && (
                        <Button
                            size="sm"
                            onClick={handleSubmit}
                            className="bg-cyan-600 hover:bg-cyan-700"
                        >
                            <Check className="mr-1 h-4 w-4" />
                            Gönder
                        </Button>
                    )}
                </div>
            </div>

            {/* Editor */}
            <Editor
                height={height}
                language={language}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                onMount={handleEditorMount}
                theme={theme === "pusula-dark" ? "vs-dark" : theme}
                options={{
                    readOnly,
                }}
                loading={
                    <div className="flex h-full items-center justify-center bg-zinc-950">
                        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
                    </div>
                }
            />

            {/* Console Output */}
            {showConsole && localConsole.length > 0 && (
                <div className="border-t border-zinc-800 bg-zinc-900">
                    <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
                        <Terminal className="h-4 w-4 text-zinc-500" />
                        <span className="text-xs text-zinc-500">Konsol Çıktısı</span>
                    </div>
                    <div className="max-h-48 overflow-y-auto px-4 py-3">
                        <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap">
                            {localConsole.join("\n")}
                        </pre>
                    </div>
                </div>
            )}

            {/* Expected Output */}
            {expectedOutput && (
                <div className="border-t border-zinc-800 bg-zinc-900/50 px-4 py-3">
                    <div className="text-xs text-zinc-500 mb-1">Beklenen Çıktı:</div>
                    <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">
                        {expectedOutput}
                    </pre>
                </div>
            )}
        </div>
    );
}

// Diff View for comparing code
interface MonacoDiffProps {
    original: string;
    modified: string;
    language?: string;
    height?: string;
}

export function MonacoDiff({
    original,
    modified,
    language = "javascript",
    height = "400px",
}: MonacoDiffProps) {
    return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2">
                <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                    Karşılaştırma
                </Badge>
            </div>
            <Editor
                height={height}
                language={language}
                defaultValue={original}
                theme="vs-dark"
                options={{
                    readOnly: true,
                }}
            />
        </div>
    );
}

export default MonacoEditor;
