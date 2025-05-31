import React from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const skills = [
    'React', 'Three.js', 'JavaScript', 'Node.js', 
    'Python', 'TypeScript', 'MongoDB', 'AWS'
  ];

  return (
    <section className="skills-section">
      <h2><span>Skills</span></h2>
      <div className="skills-container">
        {skills.map((skill, index) => {
          const angle = (360 / skills.length) * index;
          const radius = 300; // Increased radius for better spacing
          
          return (
            <div 
              key={skill}
              className="skill-item"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`
              }}
            >
              <span className="skill-text">{skill}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills; 