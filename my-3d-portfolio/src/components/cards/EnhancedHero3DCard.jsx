import React, { useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { SiKubernetes, SiDocker } from 'react-icons/si';

const EnhancedHero3DCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const { scrollYProgress } = useScroll();
  const scrollSpring = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  const springConfig = { damping: 25, stiffness: 200 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);
  
  const rotateX = useTransform(mouseYSpring, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-10, 10]);
  
  const cardGlow = useTransform(scrollSpring, [0, 0.5, 1], [0, 20, 10]);
  const cardScale = useTransform(scrollSpring, [0, 0.5, 1], [1, 1.05, 0.95]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  return (
    <div className="enhanced-perspective">
      <motion.div
        style={{ 
          rotateX, 
          rotateY,
          scale: cardScale,
          boxShadow: useTransform(cardGlow, glow => `0 0 ${glow}px rgba(99, 102, 241, 0.5)`)
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          x.set(0.5);
          y.set(0.5);
          setIsHovered(false);
        }}
        onHoverStart={() => setIsHovered(true)}
        className="enhanced-hero-card"
      >
        <div className="card-content">
          <div className="holographic-overlay" />
          
          <div className="tech-ring outer-ring" />
          <div className="tech-ring inner-ring" />
          
          <motion.div 
            className="image-container"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          >
            <img src="/Profile_New.png" alt="Rahul Vijayan" />
            <div className="scan-effect" />
          </motion.div>
          
          <div className="tech-badge" style={{ top: '20%', left: '10%' }}>
            <SiKubernetes />
          </div>
          
          <div className="tech-badge" style={{ bottom: '20%', right: '10%' }}>
            <SiDocker />
          </div>
        </div>
        
        <div className="name-plate">
          <h3>Rahul Vijayan</h3>
          <p>Senior Software Engineer</p>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedHero3DCard;