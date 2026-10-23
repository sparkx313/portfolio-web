import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter } from './ui/GlassCard';
import { FaGithub } from 'react-icons/fa';
import TiltCard from './ui/TiltCard';

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: 'CSV Cleaner',
    description: 'Trims CSV headers and text cells, optionally removes duplicate or fully empty rows, and preserves missing values for review.',
    tags: ['Python', 'Pandas', 'CSV'],
    githubUrl: 'https://github.com/sparkx313/portfolio-web/tree/main/src/projects/data_cleaning',
  },
  {
    title: 'Transaction Category Report',
    description: 'Summarizes a transaction CSV by category and writes a net-amount report with a bar chart. Reads the transactions you provide.',
    tags: ['Python', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/sparkx313/portfolio-web/tree/main/src/projects/expense_tracker',
  },
  {
    title: 'Weather Observations Dashboard',
    description: 'Plots temperature and precipitation readings from a weather CSV and reports the observed date range and summary statistics.',
    tags: ['Python', 'Pandas', 'Data Visualization'],
    githubUrl: 'https://github.com/sparkx313/portfolio-web/tree/main/src/projects/weather_dashboard',
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Working <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            These small tools run on files you provide. Their source and input requirements are documented in each project folder.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard className="h-full">
                <GlassCard className="h-full flex flex-col transition-all duration-300 border border-white/5 hover:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
                  <GlassCardHeader>
                    <GlassCardTitle className="text-foreground">{project.title}</GlassCardTitle>
                    <GlassCardDescription className="text-gray-300 mt-2">
                      {project.description}
                    </GlassCardDescription>
                  </GlassCardHeader>

                  <GlassCardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-dark-800 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCardContent>

                  <GlassCardFooter>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center pt-4"
                      aria-label={`View source for ${project.title} on GitHub`}
                    >
                      <FaGithub className="mr-2" /> Source
                    </a>
                  </GlassCardFooter>
                </GlassCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
