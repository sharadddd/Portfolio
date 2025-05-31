import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/About.css';
import myPhoto from '../assets/profile-pic (9).png';

const About = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullText = "I'm Sharad Pandey, a passionate software developer with expertise in creating innovative digital solutions. I specialize in building responsive web applications using modern technologies like React, Three.js, and more.";

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;

    if (isInView) {
      setIsTypingComplete(false);
      setDisplayedText('');

      typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(typingInterval);
        }
      }, 30);
    }

    return () => {
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    };
  }, [isInView]);

  return (
    <section className="about-section">
      <motion.div
        className="about-content"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="typewriter-text"
          >
            {displayedText}
            {!isTypingComplete && <span className="cursor">|</span>}
          </motion.p>
        </motion.div>
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="corner corner-tl"></div>
          <div className="corner corner-tr"></div>
          <div className="corner corner-bl"></div>
          <div className="corner corner-br"></div>
          <img
            src={myPhoto}
            alt="Sharad Pandey"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x400";
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;