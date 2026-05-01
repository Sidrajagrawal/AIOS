import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import Caption from './Caption';
import Services from './Services';
import RobotEyes from './RobotEyes';
import NeuralBackground from './NeuralBackground';

function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Navbar />
      </div>

      <div className="sticky top-0 h-screen w-full -z-10 overflow-hidden bg-[#050505]">

        <motion.div
          className="absolute inset-0 w-full h-full -z-10"
          style={{
            scale: scrollScale,
            opacity: scrollOpacity
          }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${import.meta.env.VITE_NEW_BG})` }}
          >
            <RobotEyes
              color="#0E100E"
              className="top-[47.5%] right-[24%] md:right-[45.5%]"
            />
          </div>
        </motion.div>

        <div className="absolute inset-0 z-0 opacity-60">
          <NeuralBackground />
        </div>

        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent opacity-90 -z-10" />

        <div className="relative z-10 w-full flex flex-col pt-20">
          <Caption />
        </div>

      </div>

      <div className="relative z-10">
        <div className="shadow-[0_-40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
          <Services />
        </div>
      </div>

    </div>
  );
}

export default Home;