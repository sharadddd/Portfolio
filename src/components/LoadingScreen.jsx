import React from 'react';
import { motion } from 'framer-motion';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <motion.div
      className="loading-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div className="loading-content">
        <motion.h1
          className="loading-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          Loading...
        </motion.h1>
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen; 