import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useAnimation } from 'framer-motion';
import { FaGithub, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaAws, FaJava, FaReact, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import { SiSpringboot, SiApachekafka, SiKubernetes, SiDocker } from 'react-icons/si';
import { GiCyberEye, GiCircuitry, GiProcessor } from 'react-icons/gi';
import './App.css';

// --- Typewriter Component ---
const Typewriter = ({ words, wait = 3000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? wait : 150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, wait]);

  return (
    <span>
      {`${words[index].substring(0, subIndex)}`}
      <span className="cursor-blink" style={{ opacity: blink ? 1 : 0 }}>|</span>
    </span>
  );
};

// --- DYNAMIC NAVBAR WITH SLIDING INDICATOR ---
const DynamicNavbar = ({ activeSection, setActiveSection }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRefs = {
    home: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  };

  // Scroll spy to detect which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            updateIndicator(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    updateIndicator(activeSection);
  }, []);

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
            <a 
              href="#home" 
              ref={navRefs.home}
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
            <a 
              href="#skills" 
              ref={navRefs.skills}
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'skills')}
            >
              Skills
            </a>
            <a 
              href="#experience" 
              ref={navRefs.experience}
              className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'experience')}
            >
              Experience
            </a>
            <a 
              href="#projects" 
              ref={navRefs.projects}
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'projects')}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              ref={navRefs.contact}
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact
            </a>
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

// --- SCROLL-ACTIVATED ROBOT - FIXED Z-INDEX ---
const ScrollActivatedRobot = ({ type, position, delay = 0 }) => {
  const [isActive, setIsActive] = useState(false);
  const [activationLevel, setActivationLevel] = useState(0);
  const robotRef = useRef(null);
  const controls = useAnimation();
  
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
      setActivationLevel(latest);
      
      if (latest > 0.8) {
        controls.start({
          scale: [1, 1.2, 1],
          transition: { duration: 2, repeat: Infinity }
        });
      } else if (latest > 0.5) {
        controls.start({
          rotate: [0, 10, -10, 0],
          transition: { duration: 3, repeat: Infinity }
        });
      } else if (latest > 0.2) {
        controls.start({
          y: [0, -10, 0],
          transition: { duration: 2, repeat: Infinity }
        });
      }
    });

    return () => unsubscribe();
  }, [activationRange, controls]);

  const partAnimations = {
    head: {
      rotate: isActive ? [0, 5, -5, 0] : 0,
      transition: { duration: 4, repeat: Infinity }
    },
    eyes: {
      scale: isActive ? [1, 1.5, 1] : 1,
      opacity: isActive ? [1, 0.8, 1] : 0.5,
      transition: { duration: 2, repeat: Infinity }
    },
    arms: {
      rotate: isActive ? [0, 15, -15, 0] : 0,
      transition: { duration: 3, repeat: Infinity }
    }
  };

  return (
    <motion.div
      ref={robotRef}
      className={`scroll-robot ${type}`}
      style={{
        position: 'fixed',
        ...position,
        y: robotY,
        x: robotX,
        rotate: robotRotate,
        zIndex: 1, // FIXED: Always behind content
        opacity: useTransform(smoothScroll, [0, 0.1], [0.3, 1])
      }}
    >
      <motion.div 
        className="robot-container"
        animate={controls}
      >
        {isActive && (
          <motion.div 
            className="energy-shield"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: activationLevel * 0.5,
              scale: 1 + activationLevel * 0.5,
              rotate: 360
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className="robot-body">
          <motion.div 
            className="robot-head"
            animate={partAnimations.head}
          >
            <div className="helmet">
              <motion.div 
                className="antenna"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="antenna-ball" />
              </motion.div>
              
              <motion.div 
                className="eyes-container"
                animate={partAnimations.eyes}
              >
                <motion.div 
                  className="eye left-eye"
                  animate={{ 
                    scale: isActive ? [1, 1.2, 1] : 1,
                    background: isActive ? 
                      ['#00ffff', '#ff00ff', '#00ffff'] : '#6366f1'
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="pupil" />
                </motion.div>
                <motion.div 
                  className="eye right-eye"
                  animate={{ 
                    scale: isActive ? [1, 1.2, 1] : 1,
                    background: isActive ? 
                      ['#ff00ff', '#00ffff', '#ff00ff'] : '#ec4899'
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="pupil" />
                </motion.div>
              </motion.div>

              <motion.div 
                className="status-light"
                animate={{ 
                  backgroundColor: isActive ? '#00ff00' : '#ff0000',
                  boxShadow: isActive ? '0 0 20px #00ff00' : '0 0 10px #ff0000'
                }}
              />
            </div>
          </motion.div>

          <div className="robot-torso">
            <motion.div 
              className="circuit-board"
              animate={{
                backgroundPosition: isActive ? ['0% 0%', '100% 100%'] : '0% 0%'
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                className="core-reactor"
                animate={{
                  scale: isActive ? [1, 1.3, 1] : 1,
                  boxShadow: isActive ?
                    ['0 0 20px #6366f1', '0 0 40px #ec4899', '0 0 20px #6366f1'] :
                    '0 0 10px #6366f1'
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="reactor-core" />
                <motion.div 
                  className="energy-rings"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              {isActive && (
                <>
                  <motion.div 
                    className="floating-tech-icon"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 360],
                      x: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                  >
                    <FaReact color="#61dafb" />
                  </motion.div>
                  <motion.div 
                    className="floating-tech-icon"
                    animate={{ 
                      y: [0, 20, 0],
                      rotate: [0, -360],
                      x: [0, -10, 10, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  >
                    <SiSpringboot color="#6db33f" />
                  </motion.div>
                </>
              )}
            </motion.div>

            <motion.div 
              className="arm left-arm"
              animate={partAnimations.arms}
            >
              <div className="shoulder" />
              <div className="elbow" />
              <motion.div 
                className="hand"
                animate={{
                  rotate: isActive ? [0, 30, 0] : 0,
                  scale: isActive ? [1, 1.2, 1] : 1
                }}
              >
                <div className="finger" />
                <div className="finger" />
                <div className="finger" />
              </motion.div>
            </motion.div>

            <motion.div 
              className="arm right-arm"
              animate={partAnimations.arms}
              transition={{ delay: 0.2 }}
            >
              <div className="shoulder" />
              <div className="elbow" />
              <motion.div 
                className="hand"
                animate={{
                  rotate: isActive ? [0, -30, 0] : 0,
                  scale: isActive ? [1, 1.2, 1] : 1
                }}
              >
                <div className="finger" />
                <div className="finger" />
                <div className="finger" />
              </motion.div>
            </motion.div>
          </div>

          <div className="robot-legs">
            <motion.div 
              className="leg left-leg"
              animate={{
                y: isActive ? [0, 5, 0] : 0,
                rotate: isActive ? [0, 5, 0] : 0
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="thigh" />
              <div className="calf" />
              <div className="foot">
                <div className="wheel" />
              </div>
            </motion.div>

            <motion.div 
              className="leg right-leg"
              animate={{
                y: isActive ? [0, 5, 0] : 0,
                rotate: isActive ? [0, -5, 0] : 0
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            >
              <div className="thigh" />
              <div className="calf" />
              <div className="foot">
                <div className="wheel" />
              </div>
            </motion.div>
          </div>
        </div>

        {isActive && (
          <div className="data-streams-container">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="robot-data-stream"
                initial={{ y: 0, opacity: 0 }}
                animate={{ 
                  y: [-50, 50],
                  opacity: [0, 1, 0],
                  x: Math.sin(i) * 30
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear"
                }}
              >
                <div className="data-bit" />
                <div className="data-bit" />
                <div className="data-bit" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div 
        className="activation-bar"
        style={{ 
          width: useTransform(smoothScroll, [0, 1], ['0%', '100%']),
          opacity: isActive ? 1 : 0.3
        }}
      >
        <motion.div 
          className="activation-fill"
          animate={{
            background: isActive ? 
              ['linear-gradient(90deg, #6366f1, #ec4899)'] : 
              'linear-gradient(90deg, #333, #666)'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// --- ENHANCED 3D TECH SHAPES - FIXED Z-INDEX ---
const EnhancedTechShape = ({ type, top, left, right, bottom, icon, color, delay = 0 }) => {
  const [isActive, setIsActive] = useState(false);
  const [activationLevel, setActivationLevel] = useState(0);
  
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
      setActivationLevel(latest);
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
        zIndex: 1, // FIXED: Always behind content
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

      <motion.div 
        className={`tech-shape-3d ${type}`}
        animate={{
          rotateX: isActive ? [0, 360] : 0,
          rotateY: isActive ? [0, 360] : 0,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          delay
        }}
        style={{
          filter: isActive ? `hue-rotate(${activationLevel * 360}deg)` : 'none'
        }}
      >
        {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face, index) => (
          <div key={face} className={`face ${face}`}>
            <motion.div 
              className="face-content"
              animate={{
                scale: isActive ? [1, 1.1, 1] : 1,
                opacity: isActive ? [0.8, 1, 0.8] : 0.6
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              {icon}
            </motion.div>
            
            <div className="circuit-pattern" />
            <div className="holographic-grid" />
          </div>
        ))}
      </motion.div>

      {isActive && (
        <div className="shape-particles">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                x: [0, Math.cos(i * 45) * 50, 0],
                y: [0, Math.sin(i * 45) * 50, 0],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// --- ENHANCED 3D HERO CARD ---
const EnhancedHero3DCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  
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

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition(prev => (prev + 1) % 200);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
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
          <div 
            className="holographic-overlay"
            style={{ transform: `translateY(${scanlinePosition}%)` }}
          />
          
          <motion.div 
            className="tech-ring outer-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="tech-ring inner-ring"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div 
            className="image-container"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          >
            <img src="/Profile_New.png" alt="Rahul Vijayan" />
            
            <motion.div 
              className="scan-effect"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <motion.div 
            className="tech-badge"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ top: '20%', left: '10%' }}
          >
            <SiKubernetes />
          </motion.div>
          
          <motion.div 
            className="tech-badge"
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            style={{ bottom: '20%', right: '10%' }}
          >
            <SiDocker />
          </motion.div>
        </div>
        
        <motion.div 
          className="name-plate"
          animate={isHovered ? { 
            scale: 1.1,
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)'
          } : {}}
        >
          <h3>Rahul Vijayan</h3>
          <p>Senior Software Engineer</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const bgHue = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const skillCategories = [
    { title: "Languages", skills: ["Java (Core/Advanced)", "JavaScript (ES6+)", "Python", "SQL"], icon: <FaCode /> },
    { title: "Backend", skills: ["Spring Boot", "Microservices", "RESTful APIs", "System Design"], icon: <FaJava /> },
    { title: "Frontend", skills: ["React.js", "Redux", "Tailwind CSS", "Framer Motion"], icon: <FaReact /> },
    { title: "DevOps", skills: ["AWS", "Docker", "Kubernetes", "Kafka", "CI/CD"], icon: <FaAws /> }
  ];

  const experiences = [
    {
      company: "Tata Consultancy Services",
      role: "Software Development Engineer",
      period: "Sep 2023 – Present",
      achievements: [
        "Re-architected legacy batch processing system reducing workflow time by 95%",
        "Engineered event-driven microservices using Apache Kafka",
        "Maintained 99.9% uptime with robust CI/CD pipelines"
      ]
    },
    {
      company: "Claysys Technologies",
      role: "RPA Developer",
      period: "Jun 2023 – Aug 2023",
      achievements: [
        "Designed workflow automation tools reducing manual reporting by 30%",
        "Integrated backend services for better data visibility"
      ]
    },
    {
        company: "Freelancer",
        role: "Full Stack Developer",
        period: "Jun 2022 – Jun 2023",
        achievements: [
          "Architected academic management platform automating workflows by 40%",
          "Implemented secure RBAC and OAuth2 integration"
        ]
    }
  ];

  const projects = [
    {
      title: "Real-Time Event Processing",
      tech: ["Kafka", "Spring Boot", "PostgreSQL"],
      desc: "Scalable event streaming pipeline improving throughput by 60%.",
      icon: <SiApachekafka />
    },
    {
      title: "Railway Management System",
      tech: ["Java", "React", "MySQL"],
      desc: "Concurrent reservation system with optimistic locking.",
      icon: <FaJava />
    },
    {
        title: "E-Commerce Microservices",
        tech: ["Spring Cloud", "Docker", "K8s"],
        desc: "Fully distributed e-commerce backend with discovery service.",
        icon: <SiSpringboot />
    }
  ];

  return (
    <motion.div 
      className="app-container"
      style={{
        filter: `hue-rotate(${bgHue}deg)`
      }}
    >
      <div className="cyber-grid"></div>
      <div className="floating-particles">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, #6366f1, #ec4899)`
            }}
          />
        ))}
      </div>

      {/* Scroll-Activated Robots - Now behind content */}
      <ScrollActivatedRobot 
        type="sentinel" 
        position={{ top: '20%', right: '5%' }}
      />
      <ScrollActivatedRobot 
        type="scout" 
        position={{ bottom: '30%', left: '3%' }}
        delay={1}
      />
      <ScrollActivatedRobot 
        type="guardian" 
        position={{ top: '60%', right: '8%' }}
        delay={2}
      />

      {/* Enhanced 3D Tech Shapes - Now behind content */}
      <EnhancedTechShape 
        type="cube" 
        top="10%" 
        left="2%" 
        icon={<SiKubernetes size={40} />}
        color="#326CE5"
      />
      <EnhancedTechShape 
        type="prism" 
        top="75%" 
        right="3%" 
        icon={<SiDocker size={40} />}
        color="#2496ED"
      />
      <EnhancedTechShape 
        type="cube" 
        bottom="15%" 
        left="8%" 
        icon={<SiApachekafka size={40} />}
        color="#000000"
      />
      <EnhancedTechShape 
        type="prism" 
        top="45%" 
        right="12%" 
        icon={<FaAws size={40} />}
        color="#FF9900"
      />

      <motion.div className="progress-bar" style={{ scaleX }} />

      <DynamicNavbar activeSection={activeSection} setActiveSection={setActiveSection} />

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
              <motion.div 
                className="card-icon"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {cat.icon}
              </motion.div>
              <h3>{cat.title}</h3>
              <ul className="skill-list">
                {cat.skills.map(s => (
                  <motion.li 
                    key={s}
                    whileHover={{ x: 10, color: '#6366f1' }}
                  >
                    <GiCircuitry style={{ marginRight: '8px', fontSize: '0.8rem' }} />
                    {s}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

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
                <motion.div 
                  className="date-badge"
                  whileHover={{ scale: 1.1 }}
                >
                  {exp.period}
                </motion.div>
                <h3>{exp.company}</h3>
                <h4>{exp.role}</h4>
                <ul className="achievement-list">
                  {exp.achievements.map((ach, k) => (
                    <motion.li 
                      key={k}
                      whileHover={{ x: 10 }}
                    >
                      <GiProcessor style={{ marginRight: '8px', color: '#ec4899' }} />
                      {ach}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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
              <motion.div 
                className="project-icon-wrapper"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {proj.icon}
              </motion.div>
              <div className="project-info">
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <div className="tech-stack">
                  {proj.tech.map(t => (
                    <motion.span 
                      key={t} 
                      className="tech-tag"
                      whileHover={{ scale: 1.1, background: '#6366f1' }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="contact-container glass">
          <div className="contact-text">
            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Let's Build the Future
            </motion.h2>
            <p>Open for collaborations and opportunities.</p>
          </div>
          <div className="contact-links">
            <motion.a 
              href="mailto:rahulvijayan2291@gmail.com" 
              className="contact-pill"
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <FaEnvelope /> rahulvijayan2291@gmail.com
            </motion.a>
            <motion.a 
              href="tel:+919074023334" 
              className="contact-pill"
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <FaPhone /> +91 9074023334
            </motion.a>
            <div className="socials">
              <motion.a 
                href="https://www.linkedin.com/in/rahul-vijayan-682a12194/" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a 
                href="https://github.com/Rahulvijayan2291" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a 
                href="https://www.youtube.com/@Rahul_Vijayan/" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaYoutube />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <motion.p
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Designed & Built by Rahul Vijayan © {new Date().getFullYear()}
        </motion.p>
      </footer>
    </motion.div>
  );
};

export default App;