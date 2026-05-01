import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import bgImage from '../media/NewBg.png';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for actual submission
    setStatus('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed bg-[#0a0a0a]"
      style={{ backgroundImage: `url(${bgImage})` }} 
    >
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-[#FF5A06]/10 z-0 pointer-events-none"></div>

      <div className="fixed top-0 left-0 w-full z-[999] bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-800/80 shadow-2xl">
        <Navbar />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 pt-36 pb-16 flex flex-col items-center min-h-[100vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mb-12"
        >
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
            Get in <span className="text-[#FF5A06]">Touch</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Have questions about AI-OS or want to discuss enterprise solutions? Drop us a message and our team will get back to you shortly.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl bg-[#111111]/80 backdrop-blur-md p-10 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[#0a0a0a] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5A06] focus:ring-1 focus:ring-[#FF5A06] transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#0a0a0a] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5A06] focus:ring-1 focus:ring-[#FF5A06] transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="bg-[#0a0a0a] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5A06] focus:ring-1 focus:ring-[#FF5A06] transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="mt-4 bg-[#FF5A06] text-white font-bold py-4 rounded-lg hover:bg-[#eb4f00] hover:shadow-[0_4px_20px_rgba(255,90,6,0.4)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Send Message
            </button>
            
            {status && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-center font-medium mt-2"
              >
                {status}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}