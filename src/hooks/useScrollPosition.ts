import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
      const triggerLine = 120;
      let nextActiveSection = 'home';

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute('id') || '';

        if (rect.top <= triggerLine && rect.bottom > triggerLine) {
          nextActiveSection = sectionId;
          break;
        }
      }

      setActiveSection(nextActiveSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollPosition, activeSection };
};
