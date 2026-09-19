import { useEffect, useState } from 'react';

const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return undefined;

    const updateScrollPosition = () => setScrollPosition(window.scrollY);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]) setActiveSection(visibleEntries[0].target.id);
      },
      { root: null, rootMargin: '-84px 0px -45% 0px', threshold: [0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    updateScrollPosition();
    window.addEventListener('scroll', updateScrollPosition, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, []);

  return { scrollPosition, activeSection };
};
