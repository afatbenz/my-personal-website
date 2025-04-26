import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectsPage from './pages/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import { useScrollPosition } from './hooks/useScrollPosition';

function HomePage() {
  const { activeSection } = useScrollPosition();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    setIsMounted(true);
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className={`min-h-screen bg-dark-800 text-gray-200 ${isMounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <CustomCursor />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0c1426;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #0369a1;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #0ea5e9;
        }
        
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            width: 5px;
          }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;