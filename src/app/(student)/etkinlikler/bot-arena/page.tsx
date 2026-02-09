"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/common/MaterialIcon";

// Bot Arena component
export default function BotArenaPage() {
    const [code, setCode] = useState(`import sys
import json

def solve(data_stream):
    # Parse the incoming JSON data
    bots = json.loads(data_stream)
    
    # TODO: Filter bots with velocity > 80
    fast_bots = []
    
    # Your optimization logic here
    for bot in bots:
        if bot['velocity'] > 80:
             fast_bots.append(bot['id'])
    
    # Return sorted list
    return sorted(fast_bots)

# Main execution loop
if __name__ == "__main__":
    stream = sys.stdin.read()
    print(json.dumps(solve(stream)))`);

    const [timeLeft, setTimeLeft] = useState(899); // 14:59 in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const leaderboard = [
        { rank: 1, name: "You", lang: "Python 3.8", score: 1500, status: "running", isYou: true },
        { rank: 2, name: "User_Alpha", lang: "NodeJS", score: 1450, status: "waiting" },
        { rank: 3, name: "Cyber_Student", lang: "C++", score: 1300, status: "completed" },
        { rank: 4, name: "Dev_Wizard", lang: "Python 3.8", score: 1250, status: "failed" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "running":
                return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
            case "waiting":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "completed":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "failed":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    return (
        <div className="min-h-screen bg-[#10221c] text-white flex flex-col overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-[#23483c] bg-[#10221c] px-6 py-3 shrink-0 z-20">
                <div className="flex items-center gap-4 text-white">
                    <Link href="/panel" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <MaterialIcon name="arrow_back" />
                    </Link>
                    <div className="size-8 flex items-center justify-center bg-emerald-500/10 rounded-lg text-emerald-500">
                        <MaterialIcon name="smart_toy" />
                    </div>
                    <div>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">PUSULA Bot Arena</h2>
                        <div className="text-xs text-emerald-500/80 font-medium">Oyun Botu Yarışması 2024</div>
                    </div>
                </div>

                {/* Center Status */}
                <div className="hidden md:flex items-center gap-4 bg-[#19332b] px-4 py-2 rounded-lg border border-[#23483c]">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <MaterialIcon name="timer" className="text-emerald-500 text-lg" />
                        <span className="text-white font-mono text-base">{formatTime(timeLeft)}</span>
                    </div>
                    <div className="h-4 w-px bg-[#23483c]"></div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <MaterialIcon name="flag" className="text-emerald-500 text-lg" />
                        <span>Round 3: Data Extraction</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-6">
                        <Link href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                            Lobby
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                            Kurallar
                        </Link>
                        <Link href="#" className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                            <MaterialIcon name="leaderboard" className="text-base" />
                            Sıralama
                        </Link>
                    </div>
                    <div className="h-8 w-px bg-[#23483c] hidden lg:block"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-white">Cyber_Student</div>
                            <div className="text-xs text-emerald-500">Level 12 • 1300 XP</div>
                        </div>
                        <div className="bg-emerald-500/20 rounded-full size-10 ring-2 ring-emerald-500/20 flex items-center justify-center">
                            <MaterialIcon name="person" className="text-emerald-500" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left Pane: Code Editor */}
                <section className="flex flex-col w-full lg:w-1/2 xl:w-[45%] border-r border-[#23483c] bg-[#0d1619] relative">
                    {/* Editor Tabs & Toolbar */}
                    <div className="flex items-center justify-between bg-[#19332b] border-b border-[#23483c] px-4 py-2 shrink-0">
                        <div className="flex items-center gap-1">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#0d1619] text-emerald-500 text-xs font-medium rounded-t border-t border-x border-[#23483c] relative top-[1px] z-10">
                                <MaterialIcon name="code" className="text-sm" />
                                solver_bot.py
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-white text-xs font-medium transition-colors">
                                <MaterialIcon name="description" className="text-sm" />
                                README.md
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-[#23483c] rounded text-gray-400 hover:text-white transition-colors">
                                <MaterialIcon name="settings" className="text-lg" />
                            </button>
                            <button className="p-1.5 hover:bg-[#23483c] rounded text-gray-400 hover:text-white transition-colors">
                                <MaterialIcon name="restart_alt" className="text-lg" />
                            </button>
                        </div>
                    </div>

                    {/* Problem Description */}
                    <div className="bg-[#19332b]/50 border-b border-[#23483c] p-4">
                        <h3 className="text-white text-sm font-bold flex items-center gap-2 mb-2">
                            <MaterialIcon name="info" className="text-emerald-500 text-sm" />
                            Challenge Objective
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Write a Python script to filter the fastest bots from the incoming data stream. Optimize for speed and memory usage. Your bot must return a sorted list of IDs where <code className="bg-[#23483c] px-1 rounded">velocity &gt; 80</code>.
                        </p>
                        <div className="flex gap-2 mt-3">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                Algorithms
                            </Badge>
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                                Optimization
                            </Badge>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 relative overflow-hidden flex">
                        {/* Line Numbers */}
                        <div className="w-10 bg-[#19332b]/30 text-gray-600 text-right pr-2 py-4 select-none font-mono text-sm leading-6 border-r border-[#23483c] shrink-0">
                            {code.split("\n").map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>
                        {/* Code Input */}
                        <textarea
                            className="flex-1 bg-transparent text-gray-100 font-mono text-sm leading-6 p-4 outline-none resize-none border-none focus:ring-0 placeholder-gray-600"
                            spellCheck={false}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    {/* Editor Footer / Console */}
                    <div className="border-t border-[#23483c] bg-[#19332b] p-2 shrink-0">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-xs text-gray-400 font-mono">Ready to compile</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="bg-[#23483c] border-[#23483c] hover:bg-[#23483c]/80 text-white">
                                    <MaterialIcon name="bug_report" className="mr-2 text-lg" />
                                    Test Run
                                </Button>
                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#10221c] font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                    <MaterialIcon name="rocket_launch" className="mr-2 text-lg" />
                                    Deploy Bot
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Pane: Visualization & Leaderboard */}
                <section className="flex-1 flex flex-col bg-[#10221c] relative overflow-hidden">
                    {/* Visualization Stage */}
                    <div className="flex-1 relative bg-[#050b0e] flex flex-col items-center justify-center overflow-hidden">
                        {/* Grid Background Effect */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
                                backgroundSize: "40px 40px",
                            }}
                        />

                        {/* Status Overlay */}
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                            <div className="bg-black/60 backdrop-blur-md border border-emerald-500/30 text-emerald-500 px-3 py-1 rounded text-xs font-mono">
                                LIVE FEED
                            </div>
                            <div className="bg-black/60 backdrop-blur-md border border-red-500/30 text-red-400 px-3 py-1 rounded text-xs font-mono flex items-center gap-1">
                                <span className="size-2 bg-red-500 rounded-full animate-pulse"></span>
                                OPPONENT ACTIVE
                            </div>
                        </div>

                        {/* Bot Visualization */}
                        <div className="relative z-10 w-full max-w-2xl aspect-video bg-black/40 border border-emerald-500/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Bot 1 (Player) */}
                                <motion.div
                                    className="absolute top-1/2 left-1/4 -translate-y-1/2 flex flex-col items-center gap-2"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className="relative size-16 bg-emerald-500/10 rounded-full border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                                        <MaterialIcon name="smart_toy" className="text-emerald-500 text-3xl" />
                                        <div className="absolute -right-2 -top-2 bg-emerald-500 text-[#10221c] text-[10px] font-bold px-1.5 py-0.5 rounded">
                                            YOU
                                        </div>
                                    </div>
                                    <div className="h-1 w-24 bg-[#19332b] rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-emerald-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: "92%" }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                    <div className="font-mono text-xs text-emerald-500">Efficiency: 92%</div>
                                </motion.div>

                                {/* VS Divider */}
                                <div className="h-full w-px bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"></div>

                                {/* Bot 2 (Opponent) */}
                                <motion.div
                                    className="absolute top-1/2 right-1/4 -translate-y-1/2 flex flex-col items-center gap-2 opacity-80"
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                >
                                    <div className="relative size-14 bg-purple-500/10 rounded-full border-2 border-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                        <MaterialIcon name="smart_toy" className="text-purple-500 text-2xl" />
                                        <div className="absolute -right-2 -top-2 bg-purple-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                            CPU
                                        </div>
                                    </div>
                                    <div className="h-1 w-20 bg-[#19332b] rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-purple-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: "84%" }}
                                            transition={{ duration: 1, delay: 0.7 }}
                                        />
                                    </div>
                                    <div className="font-mono text-xs text-purple-400">Efficiency: 84%</div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Camera Controls */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
                            <button className="bg-[#19332b]/80 backdrop-blur border border-[#23483c] text-white p-2 rounded hover:bg-[#23483c] transition-colors">
                                <MaterialIcon name="add" />
                            </button>
                            <button className="bg-[#19332b]/80 backdrop-blur border border-[#23483c] text-white p-2 rounded hover:bg-[#23483c] transition-colors">
                                <MaterialIcon name="remove" />
                            </button>
                            <button className="bg-[#19332b]/80 backdrop-blur border border-[#23483c] text-white p-2 rounded hover:bg-[#23483c] transition-colors">
                                <MaterialIcon name="center_focus_strong" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Panel: Leaderboard */}
                    <div className="h-1/3 min-h-[250px] bg-[#19332b] border-t border-[#23483c] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
                        {/* Tabs */}
                        <div className="flex border-b border-[#23483c] bg-[#152a24]">
                            <button className="px-6 py-3 text-sm font-bold text-white border-b-2 border-emerald-500 bg-emerald-500/5 flex items-center gap-2">
                                <MaterialIcon name="trophy" className="text-lg" />
                                Live Leaderboard
                            </button>
                            <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                <MaterialIcon name="terminal" className="text-lg" />
                                System Logs
                                <Badge variant="outline" className="bg-[#23483c] text-gray-300 border-none text-xs">
                                    New
                                </Badge>
                            </button>
                        </div>

                        {/* Leaderboard Content */}
                        <div className="flex-1 overflow-auto p-4">
                            <div className="bg-[#11221c] rounded-lg border border-[#23483c] overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#0d1a16] text-gray-400 text-xs uppercase tracking-wider border-b border-[#23483c]">
                                            <th className="px-4 py-3 font-medium w-16 text-center">Rank</th>
                                            <th className="px-4 py-3 font-medium">User</th>
                                            <th className="px-4 py-3 font-medium text-right">Score</th>
                                            <th className="px-4 py-3 font-medium text-center w-32">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-[#23483c]">
                                        {leaderboard.map((player) => (
                                            <tr
                                                key={player.rank}
                                                className={`hover:bg-white/5 transition-colors ${player.isYou ? "bg-emerald-500/5" : ""} ${player.status === "failed" ? "opacity-60" : ""}`}
                                            >
                                                <td className={`px-4 py-3 text-center font-bold ${player.isYou ? "text-emerald-500" : "text-gray-500"}`}>
                                                    {player.rank}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`size-8 rounded-full flex items-center justify-center ${player.isYou ? "bg-emerald-500/20 ring-2 ring-emerald-500" : "bg-gray-700"}`}>
                                                            <MaterialIcon name="person" className={player.isYou ? "text-emerald-500" : "text-gray-400"} />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-white flex items-center gap-2">
                                                                {player.name}
                                                                {player.isYou && (
                                                                    <Badge className="bg-emerald-500 text-[#10221c] text-[10px] font-bold uppercase">
                                                                        Leading
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className={`text-xs ${player.isYou ? "text-emerald-500/70" : "text-gray-500"}`}>{player.lang}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={`px-4 py-3 text-right font-mono ${player.isYou ? "text-emerald-500 font-bold" : "text-gray-300"}`}>
                                                    {player.score} pts
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge variant="outline" className={`text-xs font-medium border ${getStatusColor(player.status)}`}>
                                                        {player.status === "running" ? "Running" : player.status === "waiting" ? "Waiting" : player.status === "completed" ? "Completed" : "Failed"}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
