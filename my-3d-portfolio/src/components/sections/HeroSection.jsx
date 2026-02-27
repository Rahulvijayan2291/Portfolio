import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from '../animations/Typewriter';
import EnhancedHero3DCard from '../cards/EnhancedHero3DCard';

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-text-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="greeting">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ display: 'inline-block', marginRight: '10px' }}
              >
                &lt;/&gt;
              </motion.span>
              Hello, I'm
            </span>
            
            <h1 className="glitch-text" data-text="RAHUL VIJAYAN">
              RAHUL VIJAYAN
            </h1>
            
            <h2 className="typewriter-text">
              I am a <span className="highlight">
                <Typewriter 
                  words={["Full-Stack Engineer", "YouTuber", "Mentor", "Systems Engineer"]} 
                  wait={2000} 
                />
              </span>
            </h2>
            
            <p className="hero-desc">
              Architecting scalable <b>distributed systems</b> & <b>cloud-native applications</b> with 3.5+ years of expertise in Java, Spring Boot, and React.js.
            </p>
            
            <div className="hero-btns">
              <motion.a 
                href="#contact" 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get In Touch
                <div className="shine"></div>
              </motion.a>
              <motion.a 
                href="#projects" 
                className="btn-secondary glass"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Work
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <div className="hero-visual">
          <EnhancedHero3DCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;