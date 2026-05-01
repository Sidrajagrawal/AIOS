import React from 'react';

const AgentsList = ({ agents }) => {

    const groupedAgents = agents.reduce((acc, agent) => {
        if (!acc[agent.categoryTitle]) {
            acc[agent.categoryTitle] = [];
        }
        acc[agent.categoryTitle].push(agent);
        return acc;
    }, {});

    if (!agents.length) {
        return <p className="text-white">No agents found</p>;
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">Existing Agents</h2>

            <div className="space-y-10">
                {Object.keys(groupedAgents).map((category) => (
                    <div key={category} className="space-y-4">
                        <h3 className="text-xl font-semibold text-[#ff6500] border-b border-gray-800 pb-2">
                            {category}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedAgents[category].map((agent) => (
                                <div key={agent._id} className="bg-[#141414] border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors">
                                    
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={agent.iconUrl}
                                            alt={agent.title}
                                            className="w-12 h-12 rounded-lg object-cover bg-gray-800"
                                        />
                                        <div>
                                            <h4 className="text-white font-semibold">{agent.title}</h4>
                                            <p className="text-xs text-[#ff6500]">{agent.subtitle}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {agent.description}
                                    </p>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgentsList;