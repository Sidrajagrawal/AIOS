import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { docCategories } from './docData';
import { Search } from 'lucide-react';

export default function DocsLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-[Poppins] selection:bg-[#FF6B00] selection:text-white">
      <Navbar />
      <div className="relative pt-24 pb-16 px-6 flex flex-col items-center text-center border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_rgba(255,107,0,0.15),_transparent_50%)]">
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">AI-OS Docs</h1>
        <p className="text-xl text-gray-400 mb-10 font-[Bradley Hand ITC, cursive]">Official Documentation & Guides</p>
        
        <div className="relative w-full max-w-2xl">
          <input 
            type="text" 
            placeholder="Have a question? Type your keywords here!" 
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] backdrop-blur-md transition-all shadow-lg"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Find your answer by subject</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {docCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                onClick={() => navigate(`/docs/${category.id}`)}
                className="bg-[#121212] border border-white/5 rounded-xl p-8 flex flex-col items-center text-center cursor-pointer hover:border-[#FF6B00]/50 hover:bg-[#1a1a1a] transition-all group shadow-lg hover:shadow-[0_0_20px_rgba(255,107,0,0.15)]"
              >
                <Icon className="w-10 h-10 text-[#FF6B00] mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF6B00] transition-colors">{category.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}