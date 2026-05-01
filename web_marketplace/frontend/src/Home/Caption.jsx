import React from 'react';
import { motion } from 'framer-motion';

function Caption() {
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" } 
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.3,
                delayChildren: 0.2 
            }
        }
    };

    return (
        <div className="h-[30vh] w-full flex justify-center font-sans">
            <motion.div 
                className="relative w-full max-w-2xl flex flex-col items-center justify-center py-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="absolute top-3 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-white"
                />          
                
                <motion.h2 
                    variants={textVariants}
                    className="text-5xl md:text-4xl font-bold text-white tracking-tight mb-6 text-center"
                >
                    The Neural Operating System
                </motion.h2>
                
                <motion.p 
                    variants={textVariants}
                    className="text-[#AFAFAF] text-md font-medium leading-relaxed text-center max-w-2xl"
                >
                    Redefine computing with autonomous agents<br className="hidden md:block" />
                     that learn and manage your environment.
                </motion.p>

                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
                    className="absolute bottom-3 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-white/70"
                />
                
            </motion.div> 
        </div>
    );
}

export default Caption;