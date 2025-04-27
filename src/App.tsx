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
import supabase from './helpers/supabaseClient';

function HomePage() {
  const { activeSection } = useScrollPosition();
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    setIsMounted(true);
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    const fetchVisits = async () => {
      const { data, error } = await supabase
        .from('visitors')
        .select('id, visits')
        .limit(1)
        .maybeSingle();
  
      if (error) {
        console.error('Error fetching visitor count:', error);
        return;
      }
  
      if (!data) {
        // Kalau belum ada data, langsung insert baru
        const { error: insertError } = await supabase
          .from('visitors')
          .insert([{ visits: 1 }]);
  
        if (insertError) {
          console.error('Error inserting visitor count:', insertError);
          return;
        }
  
        setCount(1);
        return;
      }
  
      const currentCount = data.visits || 0;
      const newCount = currentCount + 1;
  
      const { error: updateError } = await supabase
        .from('visitors')
        .update({ visits: newCount })
        .eq('id', data.id);
  
      if (updateError) {
        console.error('Error updating visitor count:', updateError);
        return;
      }
  
      setCount(newCount);
    };
  
    fetchVisits();
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
      <Footer visits={count} />
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