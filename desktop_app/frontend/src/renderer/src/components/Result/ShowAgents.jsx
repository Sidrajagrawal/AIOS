import { useState } from "react";
import "./ShowAgents.css";
import { Search } from 'lucide-react';

function ShowAgents({ agentData, setWhichAgent }) {
    const [query, setQuery] = useState("");

    function handleAgentClick(id) {
        if (id) {
            setWhichAgent(id);
        }
    }

    const safeAgentData = agentData || [];

    const filtered = safeAgentData.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(query.toLowerCase())
    );

    const themeColor = "#00fff7";

    const truncateText = (text, maxLength = 150) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <div className="agent-container centered">
            <div className="agent-search-list" style={{ width: '800px', maxWidth: '90%' }}>
                <div className="search-wrapper flex items-center">
                    <Search className="mx-1" color="#f0c040" size={16} />
                    <input
                        type="text"
                        className="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for Agents"
                    />
                </div>

                <div className="agent-list">
                    {filtered.length === 0 ? (
                        <div className="no-results">[ Please Subscribe Agent From ]</div>
                    ) : (
                        filtered.map((agent) => (
                            <div
                                key={agent._id}
                                onClick={() => handleAgentClick(agent._id)}
                                className="agent-item flex flex-col gap-2 p-4 cursor-pointer hover:bg-white/5 transition-colors"
                                style={{ alignItems: 'flex-start' }}
                            >
                                <div className="flex justify-between items-start w-full">
                                    <div className="agent-info text-left">
                                        <div className="agent-name" style={{ color: themeColor, fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                                            {agent.title}
                                        </div>
                                        <div className="agent-role uppercase" style={{ color: '#f0c040', fontSize: '0.80rem', marginTop: '4px', letterSpacing: '1px' }}>
                                            {agent.subtitle}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-400 mt-2 text-left leading-relaxed">
                                    {truncateText(agent.description, 150)}
                                </div>

                                {agent.features && agent.features.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3 w-full">
                                        {agent.features.map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-3 py-1.5 rounded"
                                                style={{
                                                    background: `${themeColor}10`,
                                                    color: themeColor,
                                                    border: `1px solid ${themeColor}30`,
                                                    boxShadow: `0 0 10px ${themeColor}10`
                                                }}
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowAgents;