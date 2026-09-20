import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectsPage from './pages/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useScrollPosition } from './hooks/useScrollPosition';
import { useScrollRestoration } from './hooks/useScrollRestoration';
import supabase from './helpers/supabaseClient';

function HomePage() {
  const { activeSection } = useScrollPosition();
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIp = ipData.ip;
        const locationResponse = await fetch('https://ipapi.co/json/');
        const locationData = await locationResponse.json();
        const origin = `${locationData.city}, ${locationData.country_name}`;
        const location = `${locationData.latitude}, ${locationData.longitude}`;
        const now = origin.includes('Indonesia')
          ? new Date(Date.now() + (7 * 60 * 60 * 1000)).toISOString()
          : new Date().toISOString();

        const { data: existingVisitor, error: fetchError } = await supabase
          .from('visitors')
          .select('id, visits')
          .eq('ipaddress', userIp)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error checking IP address:', fetchError);
          return;
        }

        if (!existingVisitor) {
          const { error } = await supabase.from('visitors').insert([{
            visits: 1,
            ipaddress: userIp,
            origin,
            location,
            organization: locationData.org,
            lastvisit: now,
          }]);
          if (error) {
            console.error('Error inserting new visitor:', error);
            return;
          }
        } else {
          const { error } = await supabase.from('visitors').update({
            visits: (existingVisitor.visits || 0) + 1,
            lastvisit: now,
            origin,
            location,
          }).eq('id', existingVisitor.id);
          if (error) {
            console.error('Error updating visitor:', error);
            return;
          }
        }

        const { data: allVisitors, error: totalError } = await supabase.from('visitors').select('visits');
        if (totalError) {
          console.error('Error fetching total visitors:', totalError);
          return;
        }
        setCount((allVisitors ?? []).reduce((sum: number, record: { visits?: number | null }) => sum + (record.visits || 0), 0));
      } catch (error) {
        console.error('Error fetching IP or visitor data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`app-shell min-h-screen overflow-x-hidden pt-[68px] transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer visits={count} />
    </div>
  );
}

function ScrollRestorationWrapper({ children }: { children: React.ReactNode }) {
  useScrollRestoration();
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <ScrollRestorationWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </ScrollRestorationWrapper>
    </Router>
  );
}

export default App;
