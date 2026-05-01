import React from 'react';

export default function PackageCard({ data, onClick }) {
  
  return (
    <div 
      className="group relative flex-none w-[280px] bg-[#1a1a1a]/80 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-[#FF5A06] hover:shadow-[0_10px_30px_rgba(255,90,6,0.25)] flex flex-col snap-start"
      onClick={() => onClick(data)}
    >
      <div className="h-36 w-full overflow-hidden border-b border-gray-700/50">
        <img 
          src={data.iconUrl} 
          alt={data.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-5 flex-grow flex flex-col justify-center items-center text-center">
        <h3 className="m-0 text-lg tracking-wide font-bold text-white mb-1">
          {data.title}
        </h3>
        <p className="text-xs font-semibold text-[#FF5A06] uppercase tracking-wider">
          {data.subtitle}
        </p>
      </div>
    </div>
  );
}