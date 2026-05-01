import React from 'react';
import { AssignAgent } from './PackagesAPI.jsx';
import toast from "react-hot-toast";

export default function PackageModal({ data, onClose }) {
  if (!data) return null;

  const handleSubscribe = async () => {
    const toastId = toast.loading("Subscribing...");

    try {
      await AssignAgent(data._id);

      toast.success("Agent subscribed successfully", { id: toastId });

      onClose();

    } catch (err) {
      toast.error(err.message || "Subscription failed ", { id: toastId });
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#151515] text-white w-[500px] p-10 rounded-xl border border-[#FF5A06]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative animate-pop-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-5 bg-transparent border-none text-gray-500 text-2xl cursor-pointer transition-colors duration-200 hover:text-[#FF5A06]"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-1">{data.title}</h2>
        <h4 className="text-[#FF5A06] text-lg font-medium mb-5">{data.subtitle}</h4>

        <p className="leading-relaxed text-gray-300">
          {data.description}
        </p>

        <h5 className="mt-6 text-white font-semibold">Core Capabilities:</h5>
        <ul className="mt-3 pl-5 text-gray-400 list-disc marker:text-[#FF5A06]">
          {data.features.map((feature, idx) => (
            <li key={idx} className="mb-1">{feature}</li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <button
            onClick={handleSubscribe}
            className="w-full py-4 bg-[#cb4400] hover:bg-[#e74d00] text-white font-bold text-lg rounded-lg transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-[#FF5A06]/10"
          >
            Subscribe Now
          </button>
          <p className="text-center text-gray-500 text-xs mt-3 italic">
            Cancel or upgrade your plan at any time.
          </p>
        </div>

      </div>
    </div>
  );
}