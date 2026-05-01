import React, { useState } from 'react';
import PromptApi from '../Prompt/PromptApi.jsx';

function FocusAgent({ sessionId, agentData }) {
    const [task, setTask] = useState('');
    const [duration, setDuration] = useState('3.0');
    const [allowedApps, setAllowedApps] = useState('');
    const [status, setStatus] = useState('SYSTEM READY');
    const [isLoading, setIsLoading] = useState(false);
    

    const handleEngage = async () => {
        if (!task) {
            setStatus('');
            return;
        }

        setIsLoading(true);
        setStatus('');

        const compiledPrompt = `Goal: ${task} | Duration: ${duration}h | Allowed: ${allowedApps}`;

        try {
            
            const result = await PromptApi({
                agentId: agentData._id,
                agentName: agentData.title,
                prompt: compiledPrompt,
                sessionId: sessionId
            });

            if (result && result.status === 'success') {
                setStatus(`SUCCESS: ${result.execution_result || 'PROTOCOL ENGAGED'}`);
            } else {
                throw new Error("Invalid response from core system.");
            }
        } catch (error) {
            console.error(error);
            setStatus(`CRITICAL FAILURE: SYSTEM DISCONNECTED`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-5 font-mono text-[#00f3ff] bg-[linear-gradient(transparent_50%,rgba(0,243,255,0.05)_50%)] bg-[length:100%_4px]">
            <div className="bg-[#0a0a10]/90 border border-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.2),inset_0_0_20px_rgba(0,243,255,0.1)] p-10 w-full max-w-[600px] relative overflow-hidden">

                <h1 className="text-[#ff003c] text-3xl mb-5 tracking-[4px] font-bold uppercase [text-shadow:2px_0_#00f3ff,-2px_0_#fcee0a]">
                    FOCUS GUARDIAN
                </h1>

                <div className="flex flex-col mb-5 flex-1">
                    <label className="text-[#00f3ff] text-xs mb-2 tracking-[2px]">PRIMARY DIRECTIVE (TASK)</label>
                    <input
                        type="text"
                        className="bg-[#0a0a0a] border border-[#333] border-b-2 border-b-[#00f3ff] text-white p-3 text-base outline-none transition-all duration-300 font-mono focus:border-b-[#fcee0a] focus:bg-[#111]"
                        placeholder="e.g., code the authentication module"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                </div>

                <div className="flex gap-5 mb-5">
                    <div className="flex flex-col flex-1">
                        <label className="text-[#00f3ff] text-xs mb-2 tracking-[2px]">DURATION (HOURS)</label>
                        <input type="number" step="0.5" className="bg-[#0a0a0a] border border-[#333] border-b-2 border-b-[#00f3ff] text-white p-3 text-base outline-none transition-all duration-300 font-mono focus:border-b-[#fcee0a] focus:bg-[#111]"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="text-[#00f3ff] text-xs mb-2 tracking-[2px]">WHITELISTED APPS</label>
                        <input type="text" className="bg-[#0a0a0a] border border-[#333] border-b-2 border-b-[#00f3ff] text-white p-3 text-base outline-none transition-all duration-300 font-mono focus:border-b-[#fcee0a] focus:bg-[#111]"
                            placeholder="vscode, github, stackoverflow"
                            value={allowedApps}
                            onChange={(e) => setAllowedApps(e.target.value)}
                        />
                    </div>
                </div>

                <button className="w-full bg-[#fcee0a] text-black border-none p-[15px] text-[1.2rem] font-bold mt-2.5 tracking-[3px] uppercase transition-all duration-200 [clip-path:polygon(0_0,95%_0,100%_20px,100%_100%,5%_100%,0_calc(100%-20px))] hover:bg-[#e6d600] disabled:bg-[#555] disabled:text-[#888] disabled:cursor-not-allowed"
                    onClick={handleEngage}
                    disabled={isLoading}
                >
                    {isLoading ? 'STARTING...' : 'START'}
                </button>
            </div>
        </div>
    );
}

export default FocusAgent;