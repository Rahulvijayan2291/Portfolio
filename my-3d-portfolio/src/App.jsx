import React, { useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SiKubernetes, SiDocker, SiApachekafka } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

// Import all components
import DynamicNavbar from './components/layout/DynamicNavbar';
import HeroSection from './components/sections/HeroSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import ScrollActivatedRobot from './components/animations/ScrollActivatedRobot';
import EnhancedTechShape from './components/animations/EnhancedTechShape';

import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgHue = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div 
      className="app-container"
      style={{ filter: `hue-rotate(${bgHue}deg)` }}
    >
      <div className="cyber-grid"></div>
      
      {/* Background 3D Elements */}
      <ScrollActivatedRobot type="sentinel" position={{ top: '20%', right: '5%' }} />
      <ScrollActivatedRobot type="scout" position={{ bottom: '30%', left: '3%' }} delay={1} />
      <ScrollActivatedRobot type="guardian" position={{ top: '60%', right: '8%' }} delay={2} />

      <EnhancedTechShape type="cube" top="10%" left="2%" icon={<SiKubernetes size={30} />} />
      <EnhancedTechShape type="prism" top="75%" right="3%" icon={<SiDocker size={30} />} />
      <EnhancedTechShape type="cube" bottom="15%" left="8%" icon={<SiApachekafka size={30} />} />
      <EnhancedTechShape type="prism" top="45%" right="12%" icon={<FaAws size={30} />} />

      <motion.div className="progress-bar" style={{ scaleX }} />

      <DynamicNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* FIX: Ensure all sections have proper IDs */}
      <main>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default App;