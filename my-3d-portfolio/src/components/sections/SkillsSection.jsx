import React from 'react';
import { motion } from 'framer-motion';
import { GiCircuitry } from 'react-icons/gi';
import { skillCategories } from '../../data/portfolioData';

const SkillsSection = () => {
  return (
    <section id="skills" className="section">
      <h2 className="section-heading">Technical <span className="gradient-text">Arsenal</span></h2>
      <div className="skills-grid">
        {skillCategories.map((cat, i) => (
          <motion.div 
            key={i}
            className="skill-card glass"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="card-icon">{cat.icon}</div>
            <h3>{cat.title}</h3>
            <ul className="skill-list">
              {cat.skills.map(s => (
                <li key={s}>
                  <GiCircuitry style={{ marginRight: '8px', fontSize: '0.8rem' }} />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;