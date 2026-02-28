import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter } from './ui/GlassCard';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import TiltCard from './ui/TiltCard';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  colSpan?: number;
  rowSpan?: number;
  githubUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Predictive Analytics Dashboard',
    description: 'Interactive dashboard for forecasting sales trends using machine learning algorithms.',
    tags: ['Python', 'TensorFlow', 'React', 'D3.js'],
    colSpan: 2,
    rowSpan: 1,
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 2,
    title: 'Data Pipeline Automation',
    description: 'Automated ETL pipeline for processing large-scale datasets with real-time monitoring.',
    tags: ['Python', 'Airflow', 'SQL', 'AWS'],
    colSpan: 1,
    rowSpan: 2,
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 3,
    title: 'Customer Segmentation Model',
    description: 'Unsupervised learning model for segmenting customers based on behavioral patterns.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    colSpan: 1,
    rowSpan: 1,
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 4,
    title: 'NLP Sentiment Analysis',
    description: 'Natural language processing model for analyzing sentiment in social media data.',
    tags: ['Python', 'NLTK', 'Transformers', 'PyTorch'],
    colSpan: 1,
    rowSpan: 1,
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 5,
    title: 'Real-time Data Visualization',
    description: 'Streaming data visualization platform for monitoring live metrics and KPIs.',
    tags: ['Python', 'Plotly', 'WebSocket', 'FastAPI'],
    colSpan: 2,
    rowSpan: 1,
    githubUrl: '#',
    demoUrl: '#'
  }
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
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A collection of data science and analytics projects showcasing my expertise in machine learning, data visualization, and predictive modeling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`group relative ${project.colSpan ? `col-span-${project.colSpan}` : 'col-span-1'} ${project.rowSpan ? `row-span-${project.rowSpan}` : 'row-span-1'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: project.id * 0.1 }}
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
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs rounded-full bg-dark-800 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCardContent>

                  <GlassCardFooter>
                    <div className="flex space-x-4 pt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                        >
                          <FaGithub className="mr-2" /> Source
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                        >
                          <FaExternalLinkAlt className="mr-2" /> Live Demo
                        </a>
                      )}
                    </div>
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