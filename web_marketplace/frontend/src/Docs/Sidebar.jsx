import React from 'react';

const docStructure = [
  {
    category: "System Overview",
    items: [
      { id: "intro", title: "Introduction to AI-OS" },
      { id: "registry", title: "Agent Registry" }
    ]
  },
  {
    category: "Core Kernel",
    items: [
      { id: "orchestrator", title: "Orchestrator" },
      { id: "brain", title: "Brain & Inference" },
      { id: "memory", title: "Memory System" },
      { id: "security", title: "Security Protocols" }
    ]
  },
  {
    category: "Developer Agents",
    items: [
      { id: "architect", title: "Code Architect" },
      { id: "codecheater", title: "Code Cheater" },
      { id: "syntax", title: "Syntax Monitor" }
    ]
  },
  {
    category: "Common Agents",
    items: [
      { id: "focus-agent", title: "Focus Guardian" },
      { id: "nlp-shell", title: "NLP Shell" }
    ]
  },
  {
    category: "Kernel Tools",
    items: [
      { id: "tool-cli", title: "CLI Interface" },
      { id: "tool-window", title: "Window Tools" }
    ]
  }
];

export default function Sidebar({ activeDoc, onNavigate }) {
  return (
    <aside className="w-72 bg-white/[0.02] backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto hidden md:block">
      {docStructure.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            {section.category}
          </h3>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                    activeDoc === item.id
                      ? 'bg-[#FF6B00]/10 text-[#FF6B00] border-l-2 border-[#FF6B00]'
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}