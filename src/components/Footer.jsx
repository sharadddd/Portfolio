import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    // Three.js background effect
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, 200);
    document.querySelector('.footer-background').appendChild(renderer.domElement);

    // Create animated waves
    const geometry = new THREE.PlaneGeometry(window.innerWidth, 200, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x2a2a2a,
      wireframe: true,
    });
    const waves = new THREE.Mesh(geometry, material);
    scene.add(waves);
    camera.position.z = 100;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(time + positions[i] / 50) * 5;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-background"></div>
      <motion.div
        className="footer-content"
        style={{ y, opacity }}
      >
        <motion.div
          className="footer-section brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3
            whileHover={{ scale: 1.1 }}
            className="gradient-text"
          >
            Sharad Pandey
          </motion.h3>
          <p className="role">Software Developer</p>
        </motion.div>

        <motion.div
          className="footer-section contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Contact</h3>
          <motion.div
            className="contact-info"
            whileHover={{ scale: 1.05 }}
          >
            <a href="mailto:sharad868788@gmail.com" className="contact-link">
              sharad868788@gmail.com
            </a>
            <a href="tel:+91 8687888687" className="contact-link">
              +91 8687888687
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="footer-section social"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Connect</h3>
          <div className="social-links">
            <motion.a
              href="https://github.com/sharadddd"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faGithub} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/sharad-pandey-019281215/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </motion.a>
            <motion.a
              href="https://x.com/SharadP10688186"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>&copy; 2024 Sharad Pandey. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer; 