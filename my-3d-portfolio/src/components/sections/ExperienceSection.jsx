import React from 'react';
import { motion } from 'framer-motion';
import { GiProcessor } from 'react-icons/gi';
import { experiences } from '../../data/portfolioData';

const ExperienceSection = () => {
  return (
    <section id="experience" className="section">
      <h2 className="section-heading">Career <span className="gradient-text">Timeline</span></h2>
      <div className="timeline">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="timeline-content glass">
              <div className="date-badge">{exp.period}</div>
              <h3>{exp.company}</h3>
              <h4>{exp.role}</h4>
              <ul className="achievement-list">
                {exp.achievements.map((ach, k) => (
                  <li key={k}>
                    <GiProcessor style={{ marginRight: '8px', color: '#ec4899' }} />
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;