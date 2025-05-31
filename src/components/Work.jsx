import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiMongodb } from 'react-icons/si';
import '../styles/Work.css';

const Work = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const techIcons = {
    "React": <SiReact />,
    "Node.js": <SiNodedotjs />,
    "MongoDB": <SiMongodb />
  };

  const projects = [
    {
      id: 1,
      title: "Streamify",
      description: "Streamify is a YouTube-style video streaming platform built with React.js. It features custom video playback, search, comments, and related video suggestions",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww",
      technologies: ["React", "Node.js", "MongoDB"],
      liveLink: "https://your-live-demo.com",
      githubLink: "https://github.com/sharadddd/streamify-frontend"
    },
    {
      id: 2,
      title: "ChatBot",
      description: "A chatbot built with React.js and Python. It uses natural language processing to understand user queries and provide helpful responses.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D",
      technologies: ["Python", "OLLAMA"],
      liveLink: "https://your-live-demo.com",
      githubLink: "https://github.com/sharadddd/Chat_bot"
    },
    {
      id: 3,
      title: "Image Generator",
      description: "Image Generator is a web application that allows users to generate images using a text prompt. It uses React.js and Node.js to build the frontend and backend, respectively.",
      image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2dyYW1taW5nfGVufDB8fDB8fHww",
      technologies: ["React", "Node.js", "Gemini API"],
      liveLink: "https://your-live-demo.com",
      githubLink: "https://github.com/sharadddd/Image_Generator"
    }
  ];

  return (
    <motion.section
      className="work-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="section-header"
        initial={{ y: -50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Here are some of my recent works</p>
      </motion.div>

      <div className="project-stack">
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              style={{
                zIndex: hoveredId === project.id ? 2 : 1,
                position: 'relative',
                transformOrigin: 'center',
                transform: hoveredId === project.id
                  ? 'none'
                  : hoveredId && hoveredId < project.id
                    ? 'translateX(100px)'
                    : hoveredId && hoveredId > project.id
                      ? 'translateX(-100px)'
                      : 'none'
              }}
            >
              <motion.div className="project-content">
                <motion.div
                  className="project-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={project.image} alt={project.title} />
                  <div className="project-image-overlay">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      View Project
                    </motion.span>
                  </div>
                </motion.div>

                <motion.h3
                  className="project-title"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>

                <motion.p className="project-description">
                  {project.description}
                </motion.p>

                <motion.div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="tech-tag"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#2563eb",
                        color: "white"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {techIcons[tech]}
                      <span className="tech-name">{tech}</span>
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div className="project-links">
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink className="link-icon" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub className="link-icon" />
                    GitHub
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Work; 