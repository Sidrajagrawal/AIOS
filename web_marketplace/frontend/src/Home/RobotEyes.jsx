import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function RobotEyes({ color = "#FF8C00", className }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18; 
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute flex gap-4 ${className}`}>
      <div className="relative w-12 h-12 ">
        <motion.div
          className="w-4 h-4 rotate-45 rounded-full" 
          style={{
            backgroundColor: color,
            boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
          }}
          animate={{
            x: mousePos.x,
            y: mousePos.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
      </div>

      <div className="relative w-12 h-12">
        {/* The Pupil */}
        <motion.div
          className="w-4 h-4 rotate-45 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
          }}
          animate={{
            x: mousePos.x,
            y: mousePos.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
      </div>
    </div>
  );
}

export default RobotEyes;