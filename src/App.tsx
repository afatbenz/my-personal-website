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
    const fetchData = async () => {
      try {
        // 1. Fetch IP Address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIp = ipData.ip;
  
        // 2. Fetch Location Info
        const getLocation = async () => {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          return {
            origin: `${data.city}, ${data.country_name}`,
            location: `${data.latitude}, ${data.longitude}`,
            organization: data.org,
          };
        };
  
        const getOrigin = await getLocation();
  
        // 3. Cek apakah IP sudah ada di database
        const { data: existingIps, error: fetchError } = await supabase
          .from('visitors')
          .select('id, visits')
          .eq('ipaddress', userIp)
          .single(); // ambil 1 saja
  
        const now = getOrigin.origin.includes('Indonesia')
          ? new Date(Date.now() + (7 * 60 * 60 * 1000)).toISOString()
          : new Date().toISOString();
  
        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error checking IP address:', fetchError);
          return;
        }
  
        if (!existingIps) {
          // IP belum ada, insert baru
          const { error: insertError } = await supabase
            .from('visitors')
            .insert([{
              visits: 1,
              ipaddress: userIp,
              origin: getOrigin.origin,
              location: getOrigin.location,
              organization: getOrigin.organization,
              lastvisit: now,
            }]);
  
          if (insertError) {
            console.error('Error inserting new visitor:', insertError);
            return;
          }
        } else {
          // IP sudah ada, update lastvisit, origin, location
          const newVisits = (existingIps.visits || 0) + 1;
  
          const { error: updateError } = await supabase
            .from('visitors')
            .update({
              visits: newVisits,
              lastvisit: now,
              origin: getOrigin.origin,
              location: getOrigin.location,
            })
            .eq('id', existingIps.id);
  
          if (updateError) {
            console.error('Error updating visitor:', updateError);
            return;
          }
        }
  
        // 4. Setelah insert/update, ambil total visitors
        const { data: allVisitors, error: totalError } = await supabase
          .from('visitors')
          .select('visits');
  
        if (totalError) {
          console.error('Error fetching total visitors:', totalError);
          return;
        }
  
        const totalVisits = allVisitors.reduce(
          (sum: number, record: any) => sum + (record.visits || 0),
          0
        );
  
        setCount(totalVisits);
  
      } catch (error) {
        console.error('Error fetching IP or visitor data:', error);
      }
    };
  
    fetchData();
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