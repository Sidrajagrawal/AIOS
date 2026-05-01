import React from 'react';

const DashboardStats = ({ totalUsers, totalAgents, usersList = [] }) => {
    return (
        <div className="space-y-8 animate-fade-in">

            <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Total Users</p>
                        <p className="text-4xl font-bold text-white mt-2">{totalUsers}</p>
                    </div>
                </div>
                <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Active Agents</p>
                        <p className="text-4xl font-bold text-white mt-2">{totalAgents}</p>
                    </div>

                </div>
            </div>

            <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-6">User Database</h3>

                <div className="overflow-x-auto">
                    {usersList.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 text-gray-400 text-sm tracking-wide">
                                    <th className="pb-4 pl-4 font-medium">Name</th>
                                    <th className="pb-4 font-medium">Email</th>
                                    <th className="pb-4 font-medium">Role</th>
                                    <th className="pb-4 font-medium">Joined Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {usersList.map((user, index) => (
                                    <tr
                                        key={user._id || index}
                                        className="border-b border-gray-800/50 hover:bg-[#1a1a1a] transition-colors"
                                    >
                                        <td className="py-4 pl-4 font-medium text-gray-200">
                                            {user.name || "Unknown User"}
                                        </td>
                                        <td className="py-4 text-gray-400">
                                            {user.email}
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                                                ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                {user.role ? user.role.toUpperCase() : 'USER'}
                                            </span>
                                        </td>
                                        <td className="py-4 text-gray-500">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No users found or loading data...</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default DashboardStats;