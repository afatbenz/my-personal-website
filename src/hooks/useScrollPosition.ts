import { useState, useEffect } from 'react';

const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      const vh = window.innerHeight;
      const navbarHeight = 80;
      const triggerY = position + navbarHeight;

      let accumulated = 0;

      for (let i = 0; i < SECTION_IDS.length; i++) {
        const sectionId = SECTION_IDS[i];
        const el = document.getElementById(sectionId);

        if (i === 0) {
          // Hero always occupies the first viewport height
          accumulated = vh;
          if (triggerY < vh) {
            setActiveSection(sectionId);
            return;
          }
          continue;
        }

        const sectionHeight = el?.offsetHeight ?? vh;
        const sectionEnd = accumulated + sectionHeight;

        if (triggerY >= accumulated && triggerY < sectionEnd) {
          setActiveSection(sectionId);
          return;
        }

        accumulated = sectionEnd;
      }

      // If we've scrolled past all sections, activate the last one
      setActiveSection(SECTION_IDS[SECTION_IDS.length - 1]);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollPosition, activeSection };
};
