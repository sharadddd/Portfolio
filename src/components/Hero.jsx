import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const [isFirstNameActive, setIsFirstNameActive] = useState(false);
  const [isLastNameActive, setIsLastNameActive] = useState(false);
  const [text, setText] = useState('');
  const fullText = "Web Developer | React Developer";

  // Add typing animation effect
  useEffect(() => {
    setText(''); // Clear any existing text
    let index = 0;

    const typeText = () => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
        setTimeout(typeText, 100);
      }
    };

    typeText();

    return () => {
      setText('');
      index = 0;
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Matrix characters
    const matrix = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const characters = matrix.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    // Enhanced matrix effect with color variations
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];

        // Add color variations
        const hue = (i * 2) % 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.8)`;
        ctx.font = fontSize + 'px monospace';

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  // Animation variants for letters
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  // Split name into letters for animation
  const nameArray = "Sharad Pandey".split("");

  // Enhanced content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="hero-container">
      <canvas ref={canvasRef} className="matrix-canvas" />
      <section className="hero-section">
        <div className="content-container">
          <div className="hero-content">
            <div className="text-content">
              <span className="greeting">Hello, I'm</span>
              <div className="name-heading">
                <div
                  className="first-name"
                  onClick={() => setIsFirstNameActive(!isFirstNameActive)}
                  onMouseLeave={() => setIsFirstNameActive(false)}
                >
                  {"SHARAD".split('').map((letter, index) => (
                    <span
                      key={`first-${index}`}
                      className={`magic-letter first ${isFirstNameActive ? 'active' : ''}`}
                      style={{ '--index': index }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <div
                  className="last-name"
                  onClick={() => setIsLastNameActive(!isLastNameActive)}
                  onMouseLeave={() => setIsLastNameActive(false)}
                >
                  {"PANDEY".split('').map((letter, index) => (
                    <span
                      key={`last-${index}`}
                      className={`magic-letter last ${isLastNameActive ? 'active' : ''}`}
                      style={{ '--index': index }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
              <div className="typewriter">
                <span className="typed-text">{text}</span>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              A passionate web developer with expertise in React, Node.js, and modern web technologies.
              I create responsive, user-friendly applications with clean and efficient code.
            </motion.p>
            <div className="cta-buttons">
              <button className="primary-button">
                <span>View Projects</span>
              </button>
              <button className="secondary-button">
                <span>Contact Me</span>
              </button>
            </div>
            <div className="developer-titles">
              <div className="title-wrapper">
                <span className="dev-title">Web Developer</span>
              </div>
              <div className="title-wrapper">
                <span className="separator">|</span>
              </div>
              <div className="title-wrapper">
                <span className="dev-title">React Developer</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const TypewriterText = () => {
  const fullText = "Web Developer | React Developer";

  return (
    <span className="animated-text">
      {fullText}
    </span>
  );
};

export default Hero;