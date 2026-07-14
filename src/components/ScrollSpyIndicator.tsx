import React from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';

const Dot: React.FC<{ active: boolean }> = ({ active }) => (
  <div
    className={`w-[11px] h-[11px] rounded-full transition-all duration-300 ${
      active ? 'bg-white scale-[1.2] shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'bg-white/20 scale-100'
    }`}
  />
);

const PageDots: React.FC = () => {
  const { activeSection } = useScrollPosition();

  const dots = [
    { id: 'home', index: 0 },
    { id: 'about', index: 1 },
    { id: 'skills', index: 2 },
    { id: 'experience', index: 3 },
    { id: 'projects', index: 4 },
    { id: 'contact', index: 5 },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[10000] hidden sm:flex flex-col items-center gap-[24px]">
      {dots.map((dot) => (
        <Dot key={dot.id} active={activeSection === dot.id} />
      ))}
    </div>
  );
};

export default PageDots;