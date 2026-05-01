import React, { useState } from 'react';
import { AddAgentByRole } from './AdminAPI.jsx'
import toast from "react-hot-toast";

const AddAgentForm = () => {
    const categories = ["Developer", "Creator", "Gamer", "Student"];
    const [formData, setFormData] = useState({
        categoryTitle: '', title: '', subtitle: '', description: '', features: '', iconUrl: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const newAgent = {
        ...formData,
        features: formData.features
            .split(',')
            .map(f => f.trim())
            .filter(Boolean),
    };

    const toastId = toast.loading("Publishing agent...");

    try {
        const res = await AddAgentByRole(newAgent);

        toast.success("Agent added successfully", { id: toastId });

        setFormData({
            categoryTitle: '',
            title: '',
            subtitle: '',
            description: '',
            features: '',
            iconUrl: ''
        });

    } catch (err) {
        toast.error(err.message || "Failed to add agent ", { id: toastId });
        console.error("Submit Error:", err);
    }
};
    return (
        <div className="max-w-3xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">Deploy New Agent</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-[#141414] border border-gray-800 rounded-2xl p-8 shadow-xl">
                <select
                    name="categoryTitle"
                    value={formData.categoryTitle}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white"
                >
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))}
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Agent Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#ff6500] focus:ring-1 focus:ring-[#ff6500]" placeholder="e.g., Code Architect" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Subtitle</label>
                        <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} required className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#ff6500] focus:ring-1 focus:ring-[#ff6500]" placeholder="e.g., Design & Structure" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#ff6500] focus:ring-1 focus:ring-[#ff6500] resize-none" placeholder="Describe functionality..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Features (Comma separated)</label>
                        <input type="text" name="features" value={formData.features} onChange={handleChange} required className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#ff6500] focus:ring-1 focus:ring-[#ff6500]" placeholder="Feature 1, Feature 2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Icon URL</label>
                        <input type="url" name="iconUrl" value={formData.iconUrl} onChange={handleChange} required className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#ff6500] focus:ring-1 focus:ring-[#ff6500]" placeholder="https://..." />
                    </div>
                </div>

                <button type="submit" className="w-full bg-[#ff6500] hover:bg-[#e55b00] text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-[0_0_15px_rgba(255,101,0,0.2)] hover:shadow-[0_0_25px_rgba(255,101,0,0.4)]">
                    Publish Agent
                </button>
            </form>
        </div>
    );
};

export default AddAgentForm;