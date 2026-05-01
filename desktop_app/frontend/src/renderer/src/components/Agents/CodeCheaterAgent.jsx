import { useState } from 'react';
import PromptApi from '../Prompt/PromptApi.jsx';

function CodeCheaterAgent({ sessionId, agentData }) {
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [platform, setPlatform] = useState("LeetCode");
    const [logs, setLogs] = useState(["System Idle. Waiting for activation signal..."]);

    const platforms = ["LeetCode", "CodeChef", "HackerRank", "HackerEarth", "CodingBlocks", "GeeksforGeeks", "Other"];

    const addLog = (message) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    };

    const handlePlatformChange = async (e) => {
        const newPlatform = e.target.value;
        setPlatform(newPlatform);

        if (isActive) {
            addLog(`Updating target architecture to: ${newPlatform}...`);
            await PromptApi({
                agentId: agentData._id,
                agentName: agentData.title,
                prompt: JSON.stringify({ action: "init", platform: newPlatform }),
                sessionId: sessionId
            });
            addLog(`✓ TARGET SET TO: ${newPlatform.toUpperCase()}`);
        }
    };

    const handleStartAgent = async () => {
        if (isActive) return;

        setIsLoading(true);
        addLog("Transmitting activation payload to Core Service...");
        console.log(agentData);
        try {
            const response = await PromptApi({
                agentId: agentData._id,
                agentName: agentData.title,
                prompt: JSON.stringify({ action: "init", platform: platform }),
                sessionId: sessionId
            });

            if (response && response.status === "success") {
                setIsActive(true);
                addLog("✓ BACKGROUND ACTIVATED.");
                addLog(`✓ TARGET: ${platform.toUpperCase()}`);
                addLog("Listening for keystroke triggers...");
            } else {
                addLog("✕ FAILED TO INITIALIZE. Check core logs.");
            }
        } catch (error) {
            addLog("✕ CONNECTION REFUSED. Core Service offline.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStopTyping = async () => {
        addLog("Transmitting emergency interrupt signal...");
        try {
            await PromptApi({
                agentId: 3,
                agentName: "CodeCheater",
                prompt: JSON.stringify({ action: "stop_typing" }),
                sessionId: sessionId
            });
            addLog("✓ TYPING ABORTED BY USER.");
        } catch (error) {
            addLog("✕ FAILED TO SEND INTERRUPT.");
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full p-8 bg-[#03070c] text-[#a0c0d0] font-sans overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}>
            </div>

            <div className="relative z-10 w-full max-w-2xl bg-[#080d14]/90 backdrop-blur-md border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.05)] rounded-sm overflow-hidden">
                <div className="p-6 border-b border-[#00f0ff]/20 flex justify-between items-center bg-gradient-to-r from-[#00f0ff]/5 to-transparent">
                    <div>
                        <h2 className="text-xl font-bold tracking-widest text-[#00f0ff] uppercase shadow-[#00f0ff]">
                            CodeCheater Subsystem
                        </h2>
                        <p className="text-[#5a8090] text-xs mt-1 tracking-widest uppercase font-mono">
                            Target Architecture Profile
                        </p>
                    </div>

                    <div className="flex items-center space-x-3 bg-[#03070c] px-4 py-1.5 border border-[#00f0ff]/20">
                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]' : 'bg-red-500/80'}`}></div>
                        <span className="text-xs font-mono tracking-widest text-[#a0c0d0] uppercase">
                            {isActive ? 'Active' : 'Offline'}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-end mb-4">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-semibold text-[#80a0b0] tracking-widest uppercase">Configuration</h3>
                        </div>

                        {/* Platform Dropdown */}
                        <div className="flex flex-col">
                            <label className="text-[10px] text-[#5a8090] tracking-widest uppercase mb-1">Target Platform</label>
                            <select
                                value={platform}
                                onChange={handlePlatformChange}
                                className="bg-[#03070c] border border-[#00f0ff]/30 text-[#00f0ff] text-xs py-1.5 px-3 uppercase tracking-wider outline-none focus:border-[#00f0ff]/80 transition-colors cursor-pointer"
                            >
                                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-[#03070c]/80 p-4 border border-[#00f0ff]/10 hover:border-[#00f0ff]/40 transition-colors flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f0ff]/20 group-hover:bg-[#00f0ff]/60 transition-colors"></div>
                            <span className="text-lg font-mono text-[#00f0ff] mb-2 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">SHIFT + 3</span>
                            <span className="text-[#5a8090] text-[10px] uppercase tracking-wider">Execute C++</span>
                        </div>
                        <div className="bg-[#03070c]/80 p-4 border border-[#00f0ff]/10 hover:border-[#00f0ff]/40 transition-colors flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f0ff]/20 group-hover:bg-[#00f0ff]/60 transition-colors"></div>
                            <span className="text-lg font-mono text-[#00f0ff] mb-2 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">SHIFT + 4</span>
                            <span className="text-[#5a8090] text-[10px] uppercase tracking-wider">Execute Java</span>
                        </div>
                        <div className="bg-[#03070c]/80 p-4 border border-red-500/20 hover:border-red-500/60 transition-colors flex flex-col items-center justify-center relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/20 group-hover:bg-red-500/60 transition-colors"></div>
                            <span className="text-lg font-mono text-red-500 mb-2 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">SHIFT + ESC</span>
                            <span className="text-[#5a8090] text-[10px] uppercase tracking-wider">Emergency Stop</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleStopTyping}
                            disabled={!isActive}
                            className={`px-4 py-2 border text-xs font-bold tracking-widest uppercase transition-all duration-300
                                ${!isActive
                                    ? 'border-gray-800 text-gray-700 cursor-not-allowed bg-transparent'
                                    : 'border-red-500/50 text-red-500 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(255,0,0,0.2)] bg-transparent cursor-pointer'
                                }`}
                        >
                            [ ABORT TYPING ]
                        </button>

                        <button
                            onClick={handleStartAgent}
                            disabled={isActive || isLoading}
                            className={`px-6 py-2 border text-xs font-bold tracking-widest uppercase transition-all duration-300
                                ${isActive
                                    ? 'border-gray-600 text-gray-500 cursor-not-allowed bg-transparent'
                                    : isLoading
                                        ? 'border-[#00f0ff]/50 text-[#00f0ff]/50 cursor-wait bg-transparent'
                                        : 'border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] bg-transparent cursor-pointer'
                                }`}
                        >
                            {isLoading ? '[ INITIALIZING... ]' : isActive ? '[ Agent RUNNING ]' : 'START Agent'}
                        </button>
                    </div>
                </div>

                <div className="bg-[#010306] p-4 h-40 overflow-y-auto font-mono text-xs border-t border-[#00f0ff]/20 relative">
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-20"></div>

                    <div className="relative z-20">
                        {logs.map((log, index) => (
                            <div key={index} className={`mb-1.5 ${log.includes('✓') ? 'text-[#00ffcc]' :
                                log.includes('✕') || log.includes('ABORT') ? 'text-[#ff3366]' :
                                    'text-[#4a7080]'
                                }`}>
                                <span className="opacity-50 mr-2">&gt;</span> {log}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeCheaterAgent;