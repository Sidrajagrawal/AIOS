import React from 'react';

const AuthButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff6b00] hover:bg-[#ff6b00] hover:shadow-[0_8px_20px_rgba(255,107,0,0.3)] active:translate-y-0"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default AuthButton;