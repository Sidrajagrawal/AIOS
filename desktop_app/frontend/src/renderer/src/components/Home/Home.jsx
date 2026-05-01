import { useState } from 'react';
import bgImg from '../../media/bgImg.png';
import Sidebar from '../Sidebar/Sidebar';
import Result from '../Result/Result';
import AuthHome from '../Auth/AuthHome';

function Home() {
    const [chatKey, setChatKey] = useState(0);
    const [isVerified, setIsVerified] = useState(() => {
        return localStorage.getItem('isVerified') === 'true';
    });
    const [agentData, setAgentData] = useState(() => {
        const savedAgents = localStorage.getItem('agentData');
        return savedAgents ? JSON.parse(savedAgents) : [];
    });

    const handleNewChat = () => {
        setChatKey(prevKey => prevKey + 1);
    };

    return (
        <div className="w-screen h-screen flex overflow-hidden text-white bg-cover bg-bottom" style={{ backgroundImage: `url(${bgImg})` }}>

            {!isVerified ? (
                <div className="w-full h-full flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
                    <AuthHome onVerify={() => setIsVerified(true)} setAgentData={setAgentData} />
                </div>
            ) : (
                <>
                    <div className="h-full flex-shrink-0 border-r border-cyan-900/30" style={{ width: '16%' }}>
                        <Sidebar onNewChat={handleNewChat} />
                    </div>

                    <div className="flex flex-col overflow-hidden" style={{ width: '84%', height: '100%' }}>
                        <div className="flex-1 overflow-hidden w-full h-full">
                            <Result key={chatKey} agentData={agentData} />
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default Home;