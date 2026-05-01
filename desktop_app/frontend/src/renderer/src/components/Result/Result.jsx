import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ShowAgents from './ShowAgents.jsx';
import ArchitectAgent from '../Agents/ArchitectAgent.jsx';
import FocusAgent from '../Agents/FocusAgent.jsx';
import CodeCheaterAgent from '../Agents/CodeCheaterAgent.jsx';
import CodeCheaterAgent from '../Agents/CodeCheaterAgent.jsx';
import Prompt from "../Prompt/Prompt";

function Result({ agentData }) {

    const [selectedAgentId, setSelectedAgentId] = useState(null);
    const [sessionId, setSessionId] = useState("");
    const [AgentResult, setAgentResult] = useState(null);

    useEffect(() => {
        if (selectedAgentId) {
            setSessionId(`agent_session_${uuidv4()}`);
            setAgentResult(null);
        }
    }, [selectedAgentId]);

    const handleAiResponse = (aiText) => {
        setAgentResult({ result: aiText });
    };

    const activeAgentData = agentData?.find(a => a._id === selectedAgentId);

    const getActiveAgentProps = () => {
        if (!activeAgentData) return null;
        return {
            agentId: activeAgentData._id,
            agentName: activeAgentData.title.toLowerCase().replace(/\s+/g, "")
        };
    };

    const activeAgent = getActiveAgentProps();

    const renderAgentComponent = () => {
        if (!activeAgentData) return null;

        switch (activeAgentData.title) {
            case "Code Architect":
                return <ArchitectAgent agentData={AgentResult} />;
            case "Focus":
                return <FocusAgent sessionId={sessionId} agentData={activeAgentData} />;
            case "Code Helper":
                return <CodeCheaterAgent sessionId={sessionId} agentData={activeAgentData} />;
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col w-full h-full'>
            <div className="flex-1 w-full overflow-hidden">
                {!selectedAgentId && (
                    <ShowAgents
                        agentData={agentData}
                        setWhichAgent={setSelectedAgentId}
                    />
                )}

                {renderAgentComponent()}
            </div>

            {activeAgent && (
                <div className="w-full shrink-0">
                    <Prompt
                        agent={activeAgent}
                        sessionId={sessionId}
                        onResponse={handleAiResponse}
                    />
                </div>
            )}
        </div>
    );
}

export default Result;