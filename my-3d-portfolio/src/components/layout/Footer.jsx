import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      <motion.p
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Designed & Built by Rahul Vijayan © {new Date().getFullYear()}
      </motion.p>
    </footer>
  );
};

export default Footer;