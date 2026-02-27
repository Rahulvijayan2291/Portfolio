import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../../data/portfolioData';

const ProjectsSection = () => {
  return (
    <section id="projects" className="section">
      <h2 className="section-heading">Featured <span className="gradient-text">Projects</span></h2>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <motion.div 
            key={i}
            className="project-card glass"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            viewport={{ once: true }}
          >
            <div className="project-icon-wrapper">{proj.icon}</div>
            <div className="project-info">
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <div className="tech-stack">
                {proj.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;