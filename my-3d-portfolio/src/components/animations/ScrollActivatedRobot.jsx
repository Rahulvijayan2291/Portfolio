import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollActivatedRobot = ({ type, position, delay = 0 }) => {
  const [isActive, setIsActive] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  const activationRange = useTransform(
    smoothScroll,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0.2, 0.4, 0.6, 0.8, 1]
  );

  const robotY = useTransform(
    smoothScroll,
    [0, 1],
    [0, type === 'sentinel' ? -500 : -400]
  );

  const robotX = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    type === 'scout' ? [0, 100, 0] : [0, -50, 0]
  );

  const robotRotate = useTransform(
    smoothScroll,
    [0, 0.3, 0.6, 1],
    type === 'guardian' ? [0, 45, -45, 0] : [0, 180, 360, 720]
  );

  useEffect(() => {
    const unsubscribe = activationRange.onChange(latest => {
      setIsActive(latest > 0.1);
    });
    return () => unsubscribe();
  }, [activationRange]);

  return (
    <motion.div
      className={`scroll-robot ${type}`}
      style={{
        position: 'fixed',
        ...position,
        y: robotY,
        x: robotX,
        rotate: robotRotate,
        zIndex: 1,
        opacity: useTransform(smoothScroll, [0, 0.1], [0.3, 1])
      }}
    >
      <div className="robot-container">
        {isActive && (
          <motion.div 
            className="energy-shield"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: 360
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className="robot-body">
          <div className="robot-head">
            <div className="helmet">
              <div className="eyes-container">
                <div className="eye left-eye" />
                <div className="eye right-eye" />
              </div>
            </div>
          </div>

          <div className="robot-torso">
            <div className="circuit-board">
              <div className="core-reactor">
                <div className="reactor-core" />
                <div className="energy-rings" />
              </div>
            </div>
          </div>

          <div className="robot-legs">
            <div className="leg left-leg" />
            <div className="leg right-leg" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollActivatedRobot;