import React from 'react';
import { FaPython, FaRProject, FaDatabase, FaChartLine, FaBrain } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiJupyter, SiTableau, SiMicrosoftpowerpoint, SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';
import { motion } from 'framer-motion';

const bentoItems = [
  {
    title: 'Core Languages',
    icons: [<FaPython size={40} className="text-blue-400" />, <FaDatabase size={40} className="text-green-400" />, <FaRProject size={40} className="text-red-400" />],
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    desc: 'Python, SQL, and R form the solid foundation of my data operations and analytical pipelines.',
    bg: 'bg-gradient-to-br from-blue-900/40 to-indigo-900/40'
  },
  {
    title: 'Machine Learning',
    icons: [<FaBrain size={32} className="text-cyan-400" />, <SiTensorflow size={32} className="text-orange-500" />, <SiPytorch size={32} className="text-red-600" />, <SiScikitlearn size={32} className="text-pink-400" />],
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    desc: 'Building intelligent predictive models.',
    bg: 'bg-gradient-to-br from-purple-900/40 to-pink-900/40'
  },
  {
    title: 'Data Wrangling',
    icons: [<SiPandas size={28} className="text-purple-400" />, <SiNumpy size={28} className="text-yellow-400" />],
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    desc: 'Cleaning and preparing robust datasets.',
    bg: 'bg-gradient-to-br from-yellow-900/40 to-orange-900/40'
  },
  {
    title: 'Visualization',
    icons: [<SiTableau size={32} className="text-blue-500" />, <SiMicrosoftpowerpoint size={32} className="text-blue-600" />, <FaChartLine size={32} className="text-emerald-400" />],
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    desc: 'Translating data into business insights.',
    bg: 'bg-gradient-to-br from-emerald-900/40 to-teal-900/40'
  },
  {
    title: 'Environments',
    icons: [<SiJupyter size={32} className="text-orange-400" />],
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    desc: 'Rapid prototyping and exploratory analysis.',
    bg: 'bg-gradient-to-br from-orange-900/40 to-red-900/40'
  }
];

const TechStackMarquee: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="skills">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Tools and technologies organized by my core workflows.
          </p>
        </motion.div>

        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px]">
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 ${item.bg} backdrop-blur-xl hover:border-white/30 transition-all duration-500 col-span-1 ${item.colSpan} ${item.rowSpan}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-6 md:p-8 h-full flex flex-col justify-between relative z-10">
                <div className="flex flex-wrap gap-4 mb-4">
                  {item.icons.map((icon, i) => (
                    <div key={i} className="bg-white/10 p-3 rounded-2xl backdrop-blur-md shadow-lg border border-white/5">
                      {icon}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">{item.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackMarquee;