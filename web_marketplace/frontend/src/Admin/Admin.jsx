import React, { useState, useEffect } from 'react';
import { packagesData } from '../Packages/data/packages.js';
import DashboardStats from './DashboardStats';
import AgentsList from './AgentsList';
import AddAgentForm from './AddAgentForm';
import { TotalUser, GetAllAgents } from './AdminAPI.jsx';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    const [totalUsers, setTotalUsers] = useState(0);
    const [usersList, setUsersList] = useState([]);
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const loadUserData = async () => {
            const result = await TotalUser();
            if (result && result.success) {
                setTotalUsers(result.totalUsers);
                setUsersList(result.users);
            }
        };

        const loadAgents = async () => {
            const res = await GetAllAgents();
            if (res && res.success) {
                setAgents(res.data);
            }
        };

        loadUserData();
        loadAgents();
    }, []);

    const totalAgents = agents.length;

    return (
        <div className="min-h-screen bg-[#0a0a0a] font-sans flex">

            <aside className="w-64 bg-[#141414] border-r border-gray-800 hidden md:block">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-8 tracking-wide">
                        AI OS <span className="text-[#ff6500]">Admin</span>
                    </h2>
                    <nav className="space-y-2">

                        <button
                            onClick={() => navigate('/')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-[#1a1a1a]`}
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#ff6500]/10 text-[#ff6500]' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('agents')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'agents' ? 'bg-[#ff6500]/10 text-[#ff6500]' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}
                        >
                            View Agents
                        </button>
                        <button
                            onClick={() => setActiveTab('add')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'add' ? 'bg-[#ff6500]/10 text-[#ff6500]' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}
                        >
                            Add New Agent
                        </button>
                    </nav>
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'dashboard' && <DashboardStats totalUsers={totalUsers} totalAgents={totalAgents} usersList={usersList} />}
                {activeTab === 'agents' && <AgentsList agents={agents} />}
                {activeTab === 'add' && <AddAgentForm />}
            </main>

        </div>
    );
}

export default Admin;