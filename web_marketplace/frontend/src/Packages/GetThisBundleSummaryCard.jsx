import React from 'react';

export default function GetThisBundleSummaryCard({ data, onClose }) {
  if (!data) {
    console.log("hello");

    return null;
  }
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">


        <div className="p-8 border-b border-gray-800 flex justify-between items-start">
          <div>
            <p className="text-[#FF5A06] text-xs font-bold uppercase tracking-[0.2em] mb-2">Bundle Summary</p>
            <h2 className="text-3xl font-black text-white">{data.categoryTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-2xl"
          >
            &times;
          </button>
        </div>


        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <p className="text-gray-400 mb-6 italic">This bundle includes {data.agents.length} specialized agents:</p>

          <div className="grid gap-4">
            {data.agents.map((agent) => (
              <div key={agent.id} className="...">
                <div className="...">
                  <span className="font-bold">{agent.title.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">{agent.title}</h4>
                  <p className="text-gray-400 text-sm line-clamp-1">{agent.subtitle || "Specialized AI Agent"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-black/40 flex flex-col sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-all"
          >
            Go Back
          </button>
          <button className="flex-1 px-6 py-4 rounded-xl bg-[#FF5A06] text-white font-bold hover:shadow-[0_0_25px_rgba(255,90,6,0.5)] transition-all">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}