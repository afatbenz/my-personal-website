import React, { useEffect, useRef, useState } from 'react';
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
import GlobalParticlesBackground from './components/GlobalParticlesBackground';
import { useScrollPosition } from './hooks/useScrollPosition';
import supabase from './helpers/supabaseClient';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function HomePage() {
  const { activeSection } = useScrollPosition();
  const overlapSceneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [aboutHeight, setAboutHeight] = useState(0);
  const [experienceHeight, setExperienceHeight] = useState(0);
  const [overlapScroll, setOverlapScroll] = useState(0);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    setIsMounted(true);
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
    
  }, []);

  useEffect(() => {
    const updateMeasurements = () => {
      const currentViewportHeight = window.innerHeight;
      const measuredAboutHeight = aboutRef.current?.offsetHeight ?? currentViewportHeight;
      const measuredExperienceHeight = experienceRef.current?.offsetHeight ?? currentViewportHeight;

      setViewportHeight(currentViewportHeight);
      setAboutHeight(measuredAboutHeight);
      setExperienceHeight(measuredExperienceHeight);
    };

    const updateOverlapScroll = () => {
      const sceneElement = overlapSceneRef.current;
      const currentViewportHeight = window.innerHeight;
      const totalScrollDistance = Math.max(
        (aboutRef.current?.offsetHeight ?? currentViewportHeight)
          + (experienceRef.current?.offsetHeight ?? currentViewportHeight),
        currentViewportHeight,
      );

      if (!sceneElement) {
        return;
      }

      const sceneRect = sceneElement.getBoundingClientRect();
      const currentScroll = clamp(-sceneRect.top, 0, totalScrollDistance);

      setOverlapScroll(currentScroll);
    };

    updateMeasurements();
    updateOverlapScroll();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          updateMeasurements();
          updateOverlapScroll();
        })
      : null;

    if (aboutRef.current && resizeObserver) {
      resizeObserver.observe(aboutRef.current);
    }

    if (experienceRef.current && resizeObserver) {
      resizeObserver.observe(experienceRef.current);
    }

    window.addEventListener('scroll', updateOverlapScroll, { passive: true });
    window.addEventListener('resize', updateMeasurements);
    window.addEventListener('resize', updateOverlapScroll);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', updateOverlapScroll);
      window.removeEventListener('resize', updateMeasurements);
      window.removeEventListener('resize', updateOverlapScroll);
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

  const effectiveViewportHeight = viewportHeight || 0;
  const measuredAboutHeight = aboutHeight || effectiveViewportHeight || 0;
  const measuredExperienceHeight = experienceHeight || effectiveViewportHeight || 0;

  const transitionDistance = effectiveViewportHeight || 1;
  const scrollProgress = clamp(overlapScroll / transitionDistance, 0, 1);
  const heroOpacity = clamp(1 - scrollProgress * 1.4, 0, 1);
  const heroScale = 1 - scrollProgress * 0.06;
  const aboutOverflowDistance = Math.max(measuredAboutHeight - effectiveViewportHeight, 0);
  const aboutTranslateY = clamp(
    effectiveViewportHeight - overlapScroll,
    -aboutOverflowDistance,
    effectiveViewportHeight,
  );
  const experienceOverflowDistance = Math.max(measuredExperienceHeight - effectiveViewportHeight, 0);
  const experienceTranslateY = clamp(
    effectiveViewportHeight + measuredAboutHeight - overlapScroll,
    -experienceOverflowDistance,
    effectiveViewportHeight + measuredAboutHeight,
  );
  const overlapSceneHeight = effectiveViewportHeight + measuredAboutHeight + measuredExperienceHeight;
  

  return (
    <div className={`relative z-[1] min-h-screen bg-dark-800 text-gray-200 ${isMounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <GlobalParticlesBackground />
      <CustomCursor />
      <header className="relative z-[1]">
        <Navbar activeSection={activeSection} />
      </header>
      <main className="relative z-[1]">
        <div
          ref={overlapSceneRef}
          className="relative"
          style={{ height: overlapSceneHeight > 0 ? `${overlapSceneHeight}px` : '200vh' }}
        >
          <div
            ref={heroRef}
            className="sticky top-0 h-screen overflow-hidden"
          >
            <div
              className="absolute inset-0 z-[1]"
              style={{
                opacity: heroOpacity,
                transform: `scale(${heroScale})`,
                transformOrigin: 'center top',
                transition: 'none',
                willChange: 'transform, opacity',
              }}
            >
              <Hero />
            </div>

            <div
              ref={aboutRef}
              className="absolute inset-x-0 top-0 z-[10] overflow-hidden rounded-t-[24px]"
              style={{
                background: 'var(--color-dark-800, #050d1a)',
                boxShadow: '0 -20px 60px rgba(0, 191, 255, 0.08)',
                transform: `translate3d(0, ${aboutTranslateY}px, 0)`,
                transition: 'none',
                willChange: 'transform',
              }}
            >
              <About />
            </div>

            <div
              ref={experienceRef}
              className="absolute inset-x-0 top-0 z-[20] overflow-hidden rounded-t-[24px]"
              style={{
                background: 'var(--color-dark-800, #050d1a)',
                boxShadow: '0 -20px 60px rgba(0, 191, 255, 0.08)',
                transform: `translate3d(0, ${experienceTranslateY}px, 0)`,
                transition: 'none',
                willChange: 'transform',
              }}
            >
              <Experience />
            </div>
          </div>
        </div>

        <div className="relative z-[10]">
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer visits={count} />
      <ScrollToTop />
      
      <style jsx global>{`
        section,
        header,
        footer {
          position: relative;
          z-index: 1;
        }

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
