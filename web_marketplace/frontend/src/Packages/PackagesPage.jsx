import React, { useState, useEffect } from 'react';
import PackageCard from './PackageCard';
import PackageModal from './PackageModal';
import Navbar from '../Navbar/Navbar';
import GetThisBundleSummaryCard from './GetThisBundleSummaryCard';
import { GetAllAgents } from '../Admin/AdminAPI.jsx';

export default function PackagesPage() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const res = await GetAllAgents();

        if (res && res.success) {
          const agents = res.data;

          // 🔥 Group agents by category
          const grouped = Object.values(
            agents.reduce((acc, agent) => {
              if (!acc[agent.categoryTitle]) {
                acc[agent.categoryTitle] = {
                  categoryId: agent.categoryTitle,
                  categoryTitle: agent.categoryTitle,
                  agents: []
                };
              }

              acc[agent.categoryTitle].agents.push(agent);
              return acc;
            }, {})
          );

          setPackagesData(grouped);
        }
      } catch (err) {
        console.error("Error loading packages:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  const handleShowSummary = (id) => {
    const bundle = packagesData.find((item) => item.categoryId === id);
    setSelectedBundle(bundle);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        Loading packages...
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed bg-[#0a0a0a]"
      style={{ backgroundImage: `url(${import.meta.env.VITE_PACKAGE_BG_IMG})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-[#FF5A06]/5 z-0 pointer-events-none"></div>

      <div className="fixed top-0 left-0 w-full z-[999] bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-800/80 shadow-2xl">
        <Navbar />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 pt-32 pb-16 flex flex-col items-center">

        <div className="text-center max-w-3xl mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
            AI <span className="text-[#FF5A06]">Packages</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Packages are curated collections of specialized AI agents designed to handle complex workflows.
            Initialize a package to deploy a team of digital experts directly into your environment.
          </p>
        </div>

        <hr className="w-full max-w-6xl border-gray-800/50 mb-16" />

        <div className="w-full max-w-7xl">
          {packagesData.map((category) => (
            <div key={category.categoryId} className="mb-20">

              <div className="flex flex-col md:flex-row md:items-center mb-8 gap-4">
                <div className="flex items-center">
                  <div className="h-10 w-1.5 bg-[#FF5A06] rounded-full mr-4 shadow-[0_0_15px_rgba(255,90,6,0.6)]"></div>
                  <h2 className="text-3xl font-bold text-white tracking-wide">
                    {category.categoryTitle}
                  </h2>
                </div>

                <button
                  onClick={() => handleShowSummary(category.categoryId)}
                  className="px-8 py-2.5 text-xs font-black text-white uppercase tracking-[0.2em] transition-all duration-300 border border-[#FF5A06]/40 bg-[#FF5A06]/5 hover:bg-[#FF5A06] hover:shadow-[0_0_25px_rgba(255,90,6,0.4)] rounded-lg active:scale-95"
                >
                  Get this bundle
                </button>
              </div>

              <div className="flex overflow-x-auto gap-6 pb-8 pt-2 snap-x snap-mandatory hide-scrollbar">
                {category.agents.map((agent) => (
                  <div key={agent._id} className="snap-start min-w-[300px]">
                    <PackageCard
                      data={agent}
                      onClick={setSelectedAgent}
                    />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      {selectedAgent && (
        <PackageModal
          data={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {selectedBundle && (
        <GetThisBundleSummaryCard
          data={selectedBundle}
          onClose={() => setSelectedBundle(null)}
        />
      )}
    </div>
  );
}