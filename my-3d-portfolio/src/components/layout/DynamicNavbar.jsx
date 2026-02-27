import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GiCyberEye } from 'react-icons/gi';

const DynamicNavbar = ({ activeSection, setActiveSection }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRefs = {
    home: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  };

  // FIX: Improved scroll spy with better detection
  useEffect(() => {
    const sections = ['home', 'skills', 'experience', 'projects', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for navbar
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionStart = offsetTop;
          const sectionEnd = offsetTop + offsetHeight;
          
          if (scrollPosition >= sectionStart && scrollPosition < sectionEnd) {
            setActiveSection(section);
            updateIndicator(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const updateIndicator = (section) => {
    if (navRefs[section]?.current) {
      const { offsetLeft, offsetWidth } = navRefs[section].current;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth
      });
    }
  };

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setActiveSection(section);
    updateIndicator(section);
    
    const element = document.getElementById(section);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveSection('home');
    updateIndicator('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update indicator on mount and resize
  useEffect(() => {
    updateIndicator(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => updateIndicator(activeSection);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  return (
    <nav className="navbar glass">
      <div className="nav-content">
        <motion.div 
          className="logo"
          onClick={handleLogoClick}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RV<span className="dot">.</span>
        </motion.div>
        
        <div className="nav-links-container">
          <motion.div 
            className="nav-indicator"
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          
          <div className="nav-links">
            {['home', 'skills', 'experience', 'projects', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                ref={navRefs[section]}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>

        <motion.div 
          className="nav-action"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <GiCyberEye />
        </motion.div>
      </div>
    </nav>
  );
};

export default DynamicNavbar;