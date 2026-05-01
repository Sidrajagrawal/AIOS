import { X, TerminalSquare, CheckCircle, FolderTree } from 'lucide-react';
import { useState } from 'react';

// Helper to auto-detect which folder a command should run in
const guessFolder = (cmd) => {
    const lowerCmd = cmd.toLowerCase();
    
    // Frontend triggers
    if (/(vite|next|react|vue|angular|tailwind)/.test(lowerCmd)) return 'frontend';
    
    // AI/ML triggers (Check this before backend so Python ML scripts route correctly)
    if (/(torch|tensorflow|keras|scikit|pandas|numpy|matplotlib|jupyter)/.test(lowerCmd)) return 'aiml';
    
    // Backend triggers
    if (/(django|fastapi|spring|express|nodemon|uvicorn|pip|npm init)/.test(lowerCmd)) return 'backend';
    
    return 'root';
};

function ExecuteSetup({ commands, targetDirectory, onClose }) {
    const [launchedIndexes, setLaunchedIndexes] = useState(new Set());
    
    // Initialize folder selections based on our auto-detect function
    const [folderSelections, setFolderSelections] = useState(() => {
        const initial = {};
        commands?.forEach((cmd, i) => {
            initial[i] = guessFolder(cmd);
        });
        return initial;
    });

    const handleRunSingle = async (cmd, index) => {
        try {
            setLaunchedIndexes(prev => new Set(prev).add(index));
            
            const selectedFolder = folderSelections[index];

            if (window.api && window.api.openTerminal) {
                // Pass the single command, the base path, and the selected subdirectory
                await window.api.openTerminal([cmd], targetDirectory.path, selectedFolder);
            } else {
                console.error("Electron API not found. Check your preload script.");
            }
        } catch (err) {
            console.error("Failed to launch terminal:", err);
        }
    };

    const handleFolderChange = (index, value) => {
        setFolderSelections(prev => ({ ...prev, [index]: value }));
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#00000080] backdrop-blur-sm p-4">
            <div className="relative w-full max-w-4xl bg-[#060d18] border border-[#00fff750] rounded-sm shadow-[0_0_30px_#00fff720] flex flex-col max-h-[85vh]">

                <div className="flex items-center justify-between p-4 border-b border-[#00fff730]">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-['Orbitron'] text-[#00fff7] tracking-widest uppercase">
                            Execution Pipeline
                        </h3>
                    </div>
                    <button onClick={onClose} className="text-[#4a7fa5] hover:text-[#ff5c5c] transition-colors cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar flex flex-col gap-4">
                    {commands?.map((cmd, index) => {
                        const isLaunched = launchedIndexes.has(index);

                        return (
                            <div 
                                key={index} 
                                className={`flex items-center justify-between gap-4 p-4 rounded-sm border transition-all
                                    ${isLaunched 
                                        ? 'bg-[#00ff8810] border-[#00ff8830]' 
                                        : 'bg-[#00000060] border-[#00fff720] hover:border-[#00fff740]'
                                    }
                                `}
                            >
                                <div className="flex items-start gap-3 flex-1 overflow-hidden pr-2">
                                    <span className={`select-none font-bold mt-1 ${isLaunched ? 'text-[#00ff88]' : 'text-[#4a7fa5]'}`}>
                                        [{index + 1}]
                                    </span>
                                    <code className={`font-mono text-sm break-all mt-1 ${isLaunched ? 'text-gray-400' : 'text-[#a8d8e8]'}`}>
                                        {cmd}
                                    </code>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    {/* Folder Selector Dropdown */}
                                    <div className="flex items-center gap-2 bg-[#00000040] border border-[#00fff720] rounded px-2 py-1">
                                        <FolderTree size={14} className="text-[#4a7fa5]" />
                                        <select
                                            value={folderSelections[index]}
                                            onChange={(e) => handleFolderChange(index, e.target.value)}
                                            className="bg-transparent text-[#a8d8e8] text-xs font-['Orbitron'] focus:outline-none cursor-pointer"
                                        >
                                            <option value="root" className="bg-[#060d18]">/ (Root)</option>
                                            <option value="frontend" className="bg-[#060d18]">/frontend</option>
                                            <option value="backend" className="bg-[#060d18]">/backend</option>
                                            <option value="aiml" className="bg-[#060d18]">/aiml_models</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => handleRunSingle(cmd, index)}
                                        className={`flex items-center gap-2 px-4 py-2 border transition-all cursor-pointer font-['Orbitron'] text-xs tracking-wider uppercase
                                            ${isLaunched 
                                                ? 'bg-[#00ff8820] border-[#00ff88] text-[#00ff88] hover:bg-[#00ff8840]' 
                                                : 'bg-[#00fff710] border-[#00fff740] text-[#00fff7] hover:bg-[#00fff730]'
                                            }
                                        `}
                                    >
                                        {isLaunched ? (
                                            <><CheckCircle size={14} /> Launched</>
                                        ) : (
                                            <><TerminalSquare size={14} /> Run</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="p-4 border-t border-[#00fff730] bg-[#00000040]">
                    <p className="text-[#4a7fa5] text-xs text-center font-['Orbitron'] tracking-wider">
                        Verify the target folder before clicking "RUN". The folder will be created automatically if it doesn't exist.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ExecuteSetup;