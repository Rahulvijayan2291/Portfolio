import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

const ContactSection = () => {
  return (
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
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> rahulvijayan2291@gmail.com
          </motion.a>
          <motion.a 
            href="tel:+919074023334" 
            className="contact-pill"
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPhone /> +91 9074023334
          </motion.a>
          <div className="socials">
            <motion.a 
              href="https://www.linkedin.com/in/rahul-vijayan-682a12194/" 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ 
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a 
              href="https://github.com/Rahulvijayan2291" 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ 
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="https://www.youtube.com/@Rahul_Vijayan/" 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ 
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaYoutube />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;