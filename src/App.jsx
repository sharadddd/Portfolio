import React, { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

const AppContainer = styled.div`
  scroll-behavior: smooth;
  overflow-x: hidden;
`;

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <ParallaxProvider>
      <AnimatePresence>
        {loading && <LoadingScreen />}
        <AppContainer>
          <CustomCursor />
          <Suspense fallback={<LoadingScreen />}>
            <Parallax speed={-20}>
              <Hero />
            </Parallax>
            <Parallax speed={-10}>
              <About />
            </Parallax>
            <Skills />
            <Parallax speed={-5}>
              <Work />
            </Parallax>
            <Contact />
            <Chatbot />
            <Footer />
          </Suspense>
        </AppContainer>
      </AnimatePresence>
    </ParallaxProvider>
  );
}

export default App; 