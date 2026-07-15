import React, { useEffect, useRef, useState } from 'react';
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
import ScrollToTop from './components/ScrollToTop';
import PageDots from './components/ScrollSpyIndicator';
import GlobalSnippets from './components/GlobalSnippets';
import CustomCursor from './components/CustomCursor';
import GlobalParticlesBackground from './components/GlobalParticlesBackground';
import { useScrollPosition } from './hooks/useScrollPosition';
import { useScrollRestoration } from './hooks/useScrollRestoration';
import supabase from './helpers/supabaseClient';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function HomePage() {
  const { activeSection } = useScrollPosition();
  const overlapSceneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [aboutHeight, setAboutHeight] = useState(0);
  const [skillsHeight, setSkillsHeight] = useState(0);
  const [experienceHeight, setExperienceHeight] = useState(0);
  const [projectsHeight, setProjectsHeight] = useState(0);
  const [contactHeight, setContactHeight] = useState(0);
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
      const measuredSkillsHeight = skillsRef.current?.offsetHeight ?? currentViewportHeight;
      const measuredExperienceHeight = experienceRef.current?.offsetHeight ?? currentViewportHeight;
      const measuredProjectsHeight = projectsRef.current?.offsetHeight ?? currentViewportHeight;
      const measuredContactHeight = contactRef.current?.offsetHeight ?? currentViewportHeight;

      setViewportHeight(currentViewportHeight);
      setAboutHeight(measuredAboutHeight);
      setSkillsHeight(measuredSkillsHeight);
      setExperienceHeight(measuredExperienceHeight);
      setProjectsHeight(measuredProjectsHeight);
      setContactHeight(measuredContactHeight);
    };

    const updateOverlapScroll = () => {
      const sceneElement = overlapSceneRef.current;
      const currentViewportHeight = window.innerHeight;
      const totalScrollDistance = Math.max(
        (aboutRef.current?.offsetHeight ?? currentViewportHeight)
          + (skillsRef.current?.offsetHeight ?? currentViewportHeight)
          + (experienceRef.current?.offsetHeight ?? currentViewportHeight)
          + (projectsRef.current?.offsetHeight ?? currentViewportHeight)
          + (contactRef.current?.offsetHeight ?? currentViewportHeight),
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

    if (skillsRef.current && resizeObserver) {
      resizeObserver.observe(skillsRef.current);
    }

    if (experienceRef.current && resizeObserver) {
      resizeObserver.observe(experienceRef.current);
    }

    if (projectsRef.current && resizeObserver) {
      resizeObserver.observe(projectsRef.current);
    }

    if (contactRef.current && resizeObserver) {
      resizeObserver.observe(contactRef.current);
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
  const measuredSkillsHeight = skillsHeight || effectiveViewportHeight || 0;
  const measuredExperienceHeight = experienceHeight || effectiveViewportHeight || 0;
  const measuredProjectsHeight = projectsHeight || effectiveViewportHeight || 0;
  const measuredContactHeight = contactHeight || effectiveViewportHeight || 0;

  const transitionDistance = effectiveViewportHeight || 1;
  const scrollProgress = clamp(overlapScroll / transitionDistance, 0, 1);
  const heroOpacity = clamp(1 - scrollProgress * 1.4, 0, 1);
  const heroScale = 1 - scrollProgress * 0.06;

  // Crossfade helpers: section fades in during first half, fades out during second half
  const crossfade = (scroll: number, vh: number) => {
    const normalized = clamp(scroll / vh, 0, 1);
    const progress = normalized * 2;
    return clamp(progress <= 1 ? progress : 2 - progress, 0, 1);
  };

  // Content translateY: slides up 20% of viewport during transition
  const contentSlide = (scroll: number, vh: number) => {
    const normalized = clamp(scroll / vh, 0, 1);
    const progress = normalized * 2;
    const slide = clamp(progress <= 1 ? progress : 2 - progress, 0, 1);
    return (1 - slide) * vh * 0.2;
  };

  const aboutScroll = clamp(overlapScroll - effectiveViewportHeight, 0, measuredAboutHeight);
  const aboutOpacity = crossfade(aboutScroll, measuredAboutHeight);
  const aboutContentY = contentSlide(aboutScroll, measuredAboutHeight);

  const skillsScroll = clamp(overlapScroll - effectiveViewportHeight - measuredAboutHeight, 0, measuredSkillsHeight);
  const skillsOpacity = crossfade(skillsScroll, measuredSkillsHeight);
  const skillsContentY = contentSlide(skillsScroll, measuredSkillsHeight);

  const experienceScroll = clamp(overlapScroll - effectiveViewportHeight - measuredAboutHeight - measuredSkillsHeight, 0, measuredExperienceHeight);
  const experienceOpacity = crossfade(experienceScroll, measuredExperienceHeight);
  const experienceContentY = contentSlide(experienceScroll, measuredExperienceHeight);

  const projectsScroll = clamp(overlapScroll - effectiveViewportHeight - measuredAboutHeight - measuredSkillsHeight - measuredExperienceHeight, 0, measuredProjectsHeight);
  const projectsOpacity = crossfade(projectsScroll, measuredProjectsHeight);
  const projectsContentY = contentSlide(projectsScroll, measuredProjectsHeight);

  const contactScroll = clamp(overlapScroll - effectiveViewportHeight - measuredAboutHeight - measuredSkillsHeight - measuredExperienceHeight - measuredProjectsHeight, 0, measuredContactHeight);
  const contactOpacity = crossfade(contactScroll, measuredContactHeight);
  const contactContentY = contentSlide(contactScroll, measuredContactHeight);

  const overlapSceneHeight = effectiveViewportHeight + measuredAboutHeight + measuredSkillsHeight + measuredExperienceHeight + measuredProjectsHeight + measuredContactHeight;
  

  return (
    <div className={`min-h-screen bg-dark-800 text-gray-200 ${isMounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <GlobalParticlesBackground />
      <GlobalSnippets />
      <CustomCursor />
      <PageDots />
      <header>
        <Navbar activeSection={activeSection} />
      </header>
      <main>
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
              className="absolute inset-x-0 top-0 z-[10]"
              style={{
                opacity: aboutOpacity,
                willChange: 'opacity',
              }}
            >
              <div
                style={{
                  transform: `translate3d(0, ${aboutContentY}px, 0)`,
                  willChange: 'transform',
                }}
              >
                <About />
              </div>
            </div>

            <div
              ref={skillsRef}
              className="absolute inset-x-0 top-0 z-[15]"
              style={{
                opacity: skillsOpacity,
                willChange: 'opacity',
              }}
            >
              <div
                style={{
                  transform: `translate3d(0, ${skillsContentY}px, 0)`,
                  willChange: 'transform',
                }}
              >
                <Skills />
              </div>
            </div>

            <div
              ref={experienceRef}
              className="absolute inset-x-0 top-0 z-[20]"
              style={{
                opacity: experienceOpacity,
                willChange: 'opacity',
              }}
            >
              <div
                style={{
                  transform: `translate3d(0, ${experienceContentY}px, 0)`,
                  willChange: 'transform',
                }}
              >
                <Experience />
              </div>
            </div>

            <div
              ref={projectsRef}
              className="absolute inset-x-0 top-0 z-[30]"
              style={{
                opacity: projectsOpacity,
                willChange: 'opacity',
              }}
            >
              <div
                style={{
                  transform: `translate3d(0, ${projectsContentY}px, 0)`,
                  willChange: 'transform',
                }}
              >
                <Projects />
              </div>
            </div>

            <div
              ref={contactRef}
              className="absolute inset-x-0 top-0 z-[40]"
              style={{
                opacity: contactOpacity,
                willChange: 'opacity',
              }}
            >
              <div
                style={{
                  transform: `translate3d(0, ${contactContentY}px, 0)`,
                  willChange: 'transform',
                }}
              >
                <Contact />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer visits={count} />
      <ScrollToTop />
      
      <style jsx global>{`
        section,
        footer {
          position: relative;
          z-index: 1;
        }

        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for Firefox */
        * {
          scrollbar-width: none;
        }

        /* Hide scrollbar for IE/Edge */
        * {
          -ms-overflow-style: none;
        }
      `}</style>
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
