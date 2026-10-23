import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaChartBar } from 'react-icons/fa';
import { SiPandas, SiReact, SiTypescript, SiVite, SiTailwindcss } from 'react-icons/si';

const toolGroups = [
  {
    title: 'Data Utilities',
    description: 'Python and Pandas power the CSV cleaning, transaction reporting, and weather observation tools.',
    icons: [
      { name: 'Python', icon: <FaPython size={38} className="text-blue-400" /> },
      { name: 'Pandas', icon: <SiPandas size={34} className="text-purple-400" /> },
      { name: 'Charts', icon: <FaChartBar size={34} className="text-emerald-400" /> },
    ],
  },
  {
    title: 'Portfolio Website',
    description: 'React, TypeScript, Vite, and Tailwind CSS build this responsive portfolio interface.',
    icons: [
      { name: 'React', icon: <SiReact size={34} className="text-cyan-400" /> },
      { name: 'TypeScript', icon: <SiTypescript size={34} className="text-blue-400" /> },
      { name: 'Vite', icon: <SiVite size={34} className="text-purple-400" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={34} className="text-teal-400" /> },
    ],
  },
];

const TechStackSection: React.FC = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="skills">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Tools <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Used</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Technologies used in the working projects and this website.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl"
          >
            <div className="p-6 md:p-8 h-full flex flex-col justify-between gap-8">
              <div className="flex flex-wrap gap-4">
                {group.icons.map(({ name, icon }) => (
                  <div key={name} title={name} className="bg-white/10 p-3 rounded-2xl border border-white/5">
                    {icon}
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{group.title}</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{group.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStackSection;
