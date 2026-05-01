import { useState, useMemo, useEffect, useRef } from "react";
import mermaid from "mermaid";
import "./ArchitectAgent.css";
import ExecuteSetup from "./ExecuteSetup";
import { Terminal, Layers, Box, Code2, Sparkles, Download } from 'lucide-react';

mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    suppressErrorRendering: true,
    themeVariables: {
        primaryColor: '#060d18',
        primaryTextColor: '#a8d8e8',
        primaryBorderColor: '#00fff750',
        lineColor: '#00fff7',
        fontFamily: "'Share Tech Mono', monospace",
        tertiaryColor: '#00fff705'
    }
});

const MermaidViewer = ({ chart }) => {
    const containerRef = useRef(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let cleanChart = chart ? chart.trim() : "";

        cleanChart = cleanChart.replace(/\|>\s*/g, '| ');
        
        cleanChart = cleanChart.replace(/\|\s*\n\s*/g, '| ');

        cleanChart = cleanChart.replace(/^(graph|flowchart)\s+LR/im, '$1 TD');

        if (cleanChart && containerRef.current) {
            containerRef.current.innerHTML = '';
            setHasError(false);

            mermaid.render(`mermaid-svg-${Date.now()}`, cleanChart)
                .then(({ svg }) => {
                    if (containerRef.current) {
                        containerRef.current.innerHTML = svg;
                    }
                })
                .catch((err) => {
                    console.error("Mermaid parsing error:", err);
                    setHasError(true);
                });
        }
    }, [chart]);

    const handleDownloadSVG = () => {
        if (!containerRef.current) return;
        const svgNode = containerRef.current.querySelector('svg');
        if (!svgNode) return;

        const svgData = new XMLSerializer().serializeToString(svgNode);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'architecture-diagram.svg';
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (hasError) {
        return (
            <div className="flex flex-col gap-4 p-2">
                <div className="text-[#ff5c5c] p-3 bg-[#ff5c5c10] border border-[#ff5c5c50] rounded text-sm font-sans">
                    Invalid Mermaid.js syntax. Falling back to raw text:
                </div>
                <pre className="text-[#a8d8e8] bg-[#00000060] p-4 rounded-md border border-[#00fff720] overflow-x-auto">
                    <code>{chart}</code>
                </pre>
            </div>
        );
    }

    return (
        <div className="relative w-full flex flex-col items-center">
            {chart && !hasError && (
                <div className="w-full flex justify-end mb-2">
                    <button
                        onClick={handleDownloadSVG}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[#00fff705] border border-[#00fff740] text-[#00fff7] rounded-sm hover:bg-[#00fff720] hover:border-[#00fff7] hover:shadow-[0_0_8px_#00fff740] transition-all duration-300 font-['Orbitron'] tracking-widest cursor-pointer uppercase"
                        title="Download SVG"
                    >
                        <Download className="w-4 h-4" /> Download SVG
                    </button>
                </div>
            )}
            <div ref={containerRef} className="mermaid-container flex justify-center w-full overflow-x-auto" />
        </div>
    );
};

const formatText = (text) => {
    if (!text || typeof text !== 'string') return null;
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) =>
        index % 2 === 1 ? (
            <strong key={index} className="text-[#00fff7] font-bold tracking-wide">
                {part}
            </strong>
        ) : (
            <span key={index}>{part}</span>
        )
    );
};

function ArchitectAgent({ agentData }) {
    const [isSetupOpen, setIsSetupOpen] = useState(false);
    const [targetDirectory, setTargetDirectory] = useState(null);

    const handleSetUp = async () => {
        try {
            const path = await window.api.selectDirectory();
            
            if (path) {
                setTargetDirectory({ path: path });
                setIsSetupOpen(true);
            }
        } catch (error) {
            console.error("Folder selection failed:", error);
        }
    };

    const content = useMemo(() => {
        const rawData = agentData?.execution_result || agentData?.result;

        if (!rawData) return null;
        if (typeof rawData === 'object') return rawData;

        try {
            let cleanStr = rawData.trim();
            if (cleanStr.startsWith("```json")) {
                cleanStr = cleanStr.replace(/^```json/, "").replace(/```$/, "").trim();
            } else if (cleanStr.startsWith("```")) {
                cleanStr = cleanStr.replace(/^```/, "").replace(/```$/, "").trim();
            }

            return JSON.parse(cleanStr);
        } catch (e) {
            return {
                domain: "Parse Error",
                features: [],
                customStructure: { description: `Failed to parse architecture data. Raw output:\n\n${rawData}` },
                techStack: [],
                setupCommands: [],
                diagram: null
            };
        }
    }, [agentData]);

    const renderFeatures = (featuresArray) => {
        if (!featuresArray || !Array.isArray(featuresArray) || featuresArray.length === 0) {
            return <div className="text-[#a8d8e8] opacity-70">No core features specified.</div>;
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 p-2">
                {featuresArray.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 bg-[#00fff705] border border-[#00fff720] p-3 rounded-sm hover:border-[#00fff760] transition-colors">
                        <div className="mt-1 w-1.5 h-1.5 bg-[#00fff7] rounded-full shadow-[0_0_5px_#00fff7] shrink-0"></div>
                        <span className="text-[#a8d8e8] font-sans text-sm leading-snug">{feature}</span>
                    </div>
                ))}
            </div>
        );
    };

    const renderTechStack = (stackArray) => {
        if (!stackArray || !Array.isArray(stackArray) || stackArray.length === 0) {
            return <div className="text-[#a8d8e8] opacity-70">No tech stack specified.</div>;
        }

        return (
            <div className="flex flex-wrap gap-3 mt-4 p-2">
                {stackArray.map((tech, i) => (
                    <span key={i} className="tech-badge text-sm py-1.5 px-3">
                        {tech}
                    </span>
                ))}
            </div>
        );
    };

    const renderSetupCommands = (commandsArray) => {
        if (!commandsArray || !Array.isArray(commandsArray) || commandsArray.length === 0) {
            return <div className="text-[#a8d8e8] opacity-70">No CLI commands required.</div>;
        }

        return (
            <div className="bg-[#00000060] p-4 rounded-md border border-[#00fff720] flex flex-col gap-2 font-mono text-sm overflow-x-auto">
                {commandsArray.map((cmd, i) => (
                    <div key={i} className="flex gap-3">
                        <span className="text-[#4a7fa5] select-none">$&gt;</span>
                        <code className="text-[#00fff7] whitespace-pre">{cmd}</code>
                    </div>
                ))}
            </div>
        );
    };

    const renderCustomStructure = (customStruct) => {
        if (!customStruct) return <div className="text-[#a8d8e8] opacity-70">No custom structure provided.</div>;

        const description = customStruct.description || "";
        const tree = customStruct.tree || customStruct;

        let displayJson = JSON.stringify(tree, null, 2);

        return (
            <div className="flex flex-col gap-4">
                {description && (
                    <div className="text-[#a8d8e8] font-sans leading-relaxed p-2">
                        {formatText(description)}
                    </div>
                )}
                <pre className="text-[#a8d8e8] bg-[#00000060] p-4 rounded-md border border-[#00fff720] overflow-x-auto">
                    <code>{displayJson}</code>
                </pre>
            </div>
        );
    };

    if (!content) {
        return (
            <div className="flex flex-col w-full h-full p-5 border-2 border-gray-700 text-[#e0f7fa] architect-container">
                <div className="relative flex-1 mt-2 mb-5 border rounded-sm border-[#00fff730] bg-[#060d18] cyber-panel overflow-hidden flex items-center justify-center">
                    <div className="scan-line absolute inset-0 pointer-events-none" />
                    <div className="text-center opacity-50 italic">Waiting for Prompt...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full h-full p-5 border-2 border-gray-700 text-[#e0f7fa] architect-container">
            <div className="relative flex-1 mt-2 mb-5 border rounded-sm border-[#00fff730] bg-[#060d18] cyber-panel overflow-hidden flex flex-col">
                <div className="corner-tl absolute top-0 left-0" />
                <div className="corner-tr absolute top-0 right-0" />
                <div className="corner-bl absolute bottom-0 left-0" />
                <div className="corner-br absolute bottom-0 right-0" />
                <div className="scan-line absolute inset-0 pointer-events-none" />

                <div className="tab-watermark absolute top-3 right-5 pointer-events-none z-0">
                    {content.domain ? content.domain.toUpperCase() : "EXECUTION PLAN"}
                </div>

                <div className="relative z-10 flex-1 p-6 overflow-y-auto w-full h-full custom-scrollbar content-panel flex flex-col gap-10">

                    {content.domain && (
                        <div className="border-b border-[#00fff730] pb-4 mb-2 mt-4">
                            <h2 className="text-2xl font-['Orbitron'] text-[#00fff7] tracking-widest uppercase">
                                {content.domain}
                            </h2>
                            <p className="text-[#4a7fa5] text-sm mt-1 uppercase tracking-wider">Target Architecture Profile</p>
                        </div>
                    )}

                    <section>
                        <div className="section-title">
                            <Sparkles className="w-5 h-5 mr-2" /> CORE FEATURES
                        </div>
                        <div className="p-2">{renderFeatures(content.features)}</div>
                    </section>

                    <section>
                        <div className="section-title">
                            <Layers className="w-5 h-5 mr-2" /> TECH STACK
                        </div>
                        <div className="p-2 font-sans">{renderTechStack(content.techStack)}</div>
                    </section>

                    <section>
                        <div className="section-title">
                            <Terminal className="w-5 h-5 mr-2" /> CLI SETUP COMMANDS
                        </div>
                        <div className="p-2">
                            {renderSetupCommands(content.setupCommands)}
                        </div>
                    </section>

                    <section>
                        <div className="section-title">
                            <Box className="w-5 h-5 mr-2" /> CUSTOM INJECTIONS
                        </div>
                        {renderCustomStructure(content.customStructure)}
                    </section>

                    <section>
                        <div className="section-title">
                            <Code2 className="w-5 h-5 mr-2" /> SYSTEM TOPOLOGY
                        </div>
                        <div className="bg-[#00000040] p-4 rounded-md border border-[#00fff720]">
                            {content.diagram ? (
                                <MermaidViewer chart={content.diagram} />
                            ) : (
                                <div className="p-2">No topology diagram available.</div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSetUp} className="cursor-pointer px-8 py-3 bg-[#00fff705] border border-[#00fff750] text-[#00fff7] font-['Orbitron'] tracking-widest uppercase text-sm font-bold rounded-sm transition-all duration-300 hover:bg-[#00fff720] hover:border-[#00fff7] hover:shadow-[0_0_15px_#00fff760] hover:text-white">
                    Create Setup
                </button>
            </div>
            {isSetupOpen && (
                <ExecuteSetup
                    commands={content.setupCommands}
                    targetDirectory={targetDirectory}
                    onClose={() => setIsSetupOpen(false)}
                />
            )}
        </div>
    );
}

export default ArchitectAgent;