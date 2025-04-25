import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  useEffect(() => {
    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    const handleLinkHover = () => {
      setLinkHover(true);
    };

    const handleLinkLeave = () => {
      setLinkHover(false);
    };

    document.addEventListener('mousemove', mMove);
    document.addEventListener('mouseleave', mLeave);
    document.addEventListener('mousedown', mDown);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseleave', mLeave);
      document.removeEventListener('mousedown', mDown);

      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  useEffect(() => {
    const updateLinkListeners = () => {
      const links = document.querySelectorAll('a, button, [role="button"]');
      
      const handleLinkHover = () => {
        setLinkHover(true);
      };

      const handleLinkLeave = () => {
        setLinkHover(false);
      };

      links.forEach((link) => {
        link.addEventListener('mouseenter', handleLinkHover);
        link.addEventListener('mouseleave', handleLinkLeave);
      });

      return () => {
        links.forEach((link) => {
          link.removeEventListener('mouseenter', handleLinkHover);
          link.removeEventListener('mouseleave', handleLinkLeave);
        });
      };
    };

    // Initial setup
    const cleanup = updateLinkListeners();

    // Set up a periodic check for new elements
    const interval = setInterval(updateLinkListeners, 2000);

    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, []);

  const cursorClasses = `
    fixed pointer-events-none z-50 transition-transform duration-150
    flex items-center justify-center
    mix-blend-difference
    ${hidden ? 'opacity-0' : 'opacity-50'}
    ${clicked ? 'scale-75' : ''}
    ${linkHover ? 'scale-150' : ''}
  `;

  return (
    <>
      <div
        className={cursorClasses}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-10 h-10 bg-blue-300 rounded-full opacity-50" />
      </div>
    </>
  );
};

export default CustomCursor;