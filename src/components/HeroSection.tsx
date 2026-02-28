import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import ParticleNetwork from './ParticleNetwork';

const HeroSection: React.FC = () => {
  const roles = [
    "Data Science",
    "Predictive Modeling",
    "Advanced Analytics",
    "Machine Learning"
  ];

  const [index, setIndex] = useState(0);

  // Focus on Data Science gradient
  const currentGradient = "from-blue-400 to-purple-500";

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 4000); // Change phrase every 4 seconds

    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <ParticleNetwork />
      {/* Gradient Orb Background */}
      <div
        id="gradient-orb"
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.15), transparent 70%)',
        }}
      ></div>

      {/* Content */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hi, I'm Muhammed Rabeeh
        </motion.h1>

        <motion.div
          className={`text-2xl sm:text-3xl md:text-4xl text-foreground mb-8 min-h-[80px] flex items-center justify-center space-x-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span>Passionate about</span>
          <div className="relative inline-flex overflow-visible h-14 w-[360px] justify-start items-center ml-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`absolute font-semibold text-transparent bg-clip-text bg-gradient-to-r ${currentGradient} whitespace-nowrap left-0`}
              >
                {roles[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          I specialize in extracting meaningful insights from complex datasets, building predictive models, and creating data-driven solutions that drive business value through advanced analytics and machine learning techniques.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
        <div className="w-8 h-12 rounded-full border-2 border-gray-500 flex justify-center p-1">
          <motion.div
            className="w-2 h-2 bg-gray-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;