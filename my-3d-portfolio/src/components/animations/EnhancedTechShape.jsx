import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const EnhancedTechShape = ({ type, top, left, right, bottom, icon }) => {
  const [isActive, setIsActive] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const activationThreshold = useTransform(
    smoothScroll,
    [0, 0.3, 0.6, 1],
    [0, 0.5, 0.8, 1]
  );

  useEffect(() => {
    const unsubscribe = activationThreshold.onChange(latest => {
      setIsActive(latest > 0.2);
    });
    return () => unsubscribe();
  }, [activationThreshold]);

  const yMove = useTransform(smoothScroll, [0, 1], [0, type === 'cube' ? -500 : -350]);
  const rotateX = useTransform(smoothScroll, [0, 1], [0, 720]);
  const rotateY = useTransform(smoothScroll, [0, 1], [0, 360]);
  const rotateZ = useTransform(smoothScroll, [0, 1], [0, 180]);
  const scale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.2, 0.8]);

  return (
    <motion.div
      className="enhanced-shape-wrapper"
      style={{
        position: 'fixed',
        top,
        left,
        right,
        bottom,
        y: yMove,
        rotateX,
        rotateY,
        rotateZ,
        scale,
        zIndex: 1,
        opacity: useTransform(smoothScroll, [0, 0.1], [0.5, 1])
      }}
    >
      {isActive && (
        <motion.div 
          className="shape-energy-field"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      <div className={`tech-shape-3d ${type}`}>
        {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
          <div key={face} className={`face ${face}`}>
            <div className="face-content">{icon}</div>
            <div className="circuit-pattern" />
            <div className="holographic-grid" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EnhancedTechShape;