import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = () => {
  const particlesRef = useRef();
  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(() => {
    particlesRef.current.rotation.y += 0.001;
    particlesRef.current.rotation.x += 0.001;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particlesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" />
    </points>
  );
};

const ParticleBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Particles />
    </Canvas>
  );
};

export default ParticleBackground; 