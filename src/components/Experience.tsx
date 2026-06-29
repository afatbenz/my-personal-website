import React, { useEffect, useRef, useState, useCallback } from 'react';
import { experiences } from '../data/profileData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const dragState = useRef({
    startX: 0,
    startTranslate: 0,
    isDragging: false,
    moved: 0,
  });

  const translateX = useRef(0);

  // Calculate the step width (= 1 card + gap)
  const getStepWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 340;
    const firstCard = track.querySelector('.exp-card') as HTMLElement;
    if (!firstCard) return 340;
    const cardWidth = firstCard.offsetWidth;
    const gap = 24; // matches gap-6
    return cardWidth + gap;
  }, []);

  // Calculate max index based on visible area
  const recalculateMaxIndex = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const containerWidth = container.offsetWidth;
    const totalWidth = track.scrollWidth;
    const step = getStepWidth();

    const maxIdx = Math.max(0, Math.ceil((totalWidth - containerWidth) / step));
    setMaxIndex(maxIdx);
    setShowArrows(maxIdx > 0);
  }, [getStepWidth]);

  // Snap to the nearest card position
  const snapToIndex = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;

    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    const step = getStepWidth();
    const targetX = -clampedIndex * step;

    translateX.current = targetX;
    setCurrentIndex(clampedIndex);

    if (smooth) {
      track.classList.add('smooth-scroll');
    }
    track.style.transform = `translateX(${targetX}px)`;
    if (smooth) {
      setTimeout(() => {
        track?.classList.remove('smooth-scroll');
      }, 500);
    }
  }, [maxIndex, getStepWidth]);

  // Arrow navigation
  const goPrev = useCallback(() => {
    if (currentIndex > 0) snapToIndex(currentIndex - 1);
  }, [currentIndex, snapToIndex]);

  const goNext = useCallback(() => {
    if (currentIndex < maxIndex) snapToIndex(currentIndex + 1);
  }, [currentIndex, maxIndex, snapToIndex]);

  // Recalculate on resize
  useEffect(() => {
    recalculateMaxIndex();
    const handleResize = () => recalculateMaxIndex();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [recalculateMaxIndex]);

  // Recalculate when track changes size (e.g., after render)
  useEffect(() => {
    const observer = new ResizeObserver(() => recalculateMaxIndex());
    const track = trackRef.current;
    if (track) observer.observe(track);
    return () => observer.disconnect();
  }, [recalculateMaxIndex]);

  // --- Drag handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;

    dragState.current = {
      startX: e.clientX,
      startTranslate: translateX.current,
      isDragging: true,
      moved: 0,
    };
    setIsDragging(true);
    track.classList.remove('smooth-scroll');
    track.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDragging) return;

    const delta = e.clientX - dragState.current.startX;
    dragState.current.moved += Math.abs(delta - dragState.current.moved);
    const newTranslate = dragState.current.startTranslate + delta;

    // Clamp
    const container = containerRef.current;
    if (container) {
      const maxTranslate = 0;
      const minTranslate = -(track.scrollWidth - container.offsetWidth);
      translateX.current = Math.max(minTranslate, Math.min(maxTranslate, newTranslate));
      track.style.transform = `translateX(${translateX.current}px)`;
    }
  };

  const handleMouseUp = () => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDragging) return;

    dragState.current.isDragging = false;
    setIsDragging(false);
    track.style.cursor = 'grab';

    // Snap to nearest card
    const step = getStepWidth();
    const snappedIndex = Math.round(Math.abs(translateX.current) / step);
    snapToIndex(snappedIndex);
  };

  const handleMouseLeave = () => {
    if (dragState.current.isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;

    const touch = e.touches[0];
    dragState.current = {
      startX: touch.clientX,
      startTranslate: translateX.current,
      isDragging: true,
      moved: 0,
    };
    setIsDragging(true);
    track.classList.remove('smooth-scroll');
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDragging) return;

    const touch = e.touches[0];
    const delta = touch.clientX - dragState.current.startX;
    const newTranslate = dragState.current.startTranslate + delta;

    const container = containerRef.current;
    if (container) {
      const maxTranslate = 0;
      const minTranslate = -(track.scrollWidth - container.offsetWidth);
      translateX.current = Math.max(minTranslate, Math.min(maxTranslate, newTranslate));
      track.style.transform = `translateX(${translateX.current}px)`;
    }
  };

  const handleTouchEnd = () => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDragging) return;

    dragState.current.isDragging = false;
    setIsDragging(false);

    const step = getStepWidth();
    const snappedIndex = Math.round(Math.abs(translateX.current) / step);
    snapToIndex(snappedIndex);
  };

  return (
    <section id="experience" className="py-20 bg-dark-800 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary-400">Professional Journey</span>
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-300">
            My professional journey as a software engineer and team lead.
          </p>
        </div>

        <div className="relative group/slider" ref={containerRef}>
          {/* Left Arrow */}
          <button
            onClick={goPrev}
            className={`slider-arrow prev ${currentIndex <= 0 ? 'disabled' : ''}`}
            aria-label="Previous"
            style={{ opacity: currentIndex > 0 ? 1 : 0 }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Slider Track */}
          <div className="slider-container">
            <div
              ref={trackRef}
              className={`slider-track ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`exp-card ${index === currentIndex || (index === currentIndex + 1) ? 'active' : ''}`}
                >
                  <div className="exp-card-inner">
                    {(index === 0 || index === 1) && (
                      <span className="latest-badge">LATEST</span>
                    )}
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="flex flex-wrap items-center text-gray-300 gap-x-2 mb-2">
                      <span className="text-primary-400">{exp.company}</span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-400 text-sm">{exp.location}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{exp.period}</p>

                    <ul className="space-y-2 text-gray-300">
                      {exp.responsibilities.slice(0, 4).map((responsibility, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className="text-primary-400 mr-2 mt-1 flex-shrink-0">▹</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                      {exp.responsibilities.length > 4 && (
                        <li className="text-primary-400 text-sm font-medium mt-1">
                          +{exp.responsibilities.length - 4} more
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goNext}
            className={`slider-arrow next ${currentIndex >= maxIndex ? 'disabled' : ''}`}
            aria-label="Next"
            style={{ opacity: currentIndex < maxIndex ? 1 : 0 }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pagination Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => snapToIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-primary-400 w-7'
                    : 'bg-dark-500 hover:bg-dark-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;