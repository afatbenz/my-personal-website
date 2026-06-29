import React, { useEffect, useRef, useState, useCallback } from 'react';
import { experiences } from '../data/profileData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CARD_GAP = 24;
const MOBILE_CARD_GAP = 16;
const MAX_VISIBLE_BULLETS = 10;
const TABLET_BREAKPOINT = 1024;
const MOBILE_BREAKPOINT = 640;
const DESKTOP_VISIBLE_CARDS = 3;
const TABLET_VISIBLE_CARDS = 2;
const MOBILE_VISIBLE_CARDS = 1;

const getCardsPerSlide = () => {
  if (typeof window === 'undefined') {
    return DESKTOP_VISIBLE_CARDS;
  }

  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    return MOBILE_VISIBLE_CARDS;
  }

  if (window.innerWidth <= TABLET_BREAKPOINT) {
    return TABLET_VISIBLE_CARDS;
  }

  return DESKTOP_VISIBLE_CARDS;
};

const getGapSize = (cardsPerSlide: number) => (
  cardsPerSlide === MOBILE_VISIBLE_CARDS ? MOBILE_CARD_GAP : CARD_GAP
);

const Experience: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wheelSnapTimeoutRef = useRef<number>();
  const dragStateRef = useRef({
    isDragging: false,
    pointerId: -1,
    startX: 0,
    startTranslateX: 0,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const totalSlides = Math.max(1, experiences.length - cardsPerSlide + 1);

  const getSlideOffset = useCallback((slideIndex: number, visibleCards = cardsPerSlide) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return 0;
    }

    const card = track.querySelector('.exp-card') as HTMLElement | null;
    if (!card) {
      return 0;
    }

    const gap = getGapSize(visibleCards);
    const measuredCardWidth = card.getBoundingClientRect().width;
    const containerWidth = viewport.getBoundingClientRect().width;
    const fallbackCardWidth = (containerWidth - (gap * (visibleCards - 1))) / visibleCards;
    const cardWidth = measuredCardWidth || fallbackCardWidth;
    const stepWidth = cardWidth + gap;

    return slideIndex * stepWidth;
  }, [cardsPerSlide]);

  const getMaxOffset = useCallback(() => {
    return getSlideOffset(totalSlides - 1);
  }, [getSlideOffset, totalSlides]);

  const clampOffset = useCallback((offset: number) => {
    return Math.max(0, Math.min(offset, getMaxOffset()));
  }, [getMaxOffset]);

  const getNearestSlide = useCallback((offset: number) => {
    const stepWidth = getSlideOffset(1) - getSlideOffset(0);
    if (stepWidth <= 0) {
      return 0;
    }

    return Math.max(0, Math.min(Math.round(offset / stepWidth), totalSlides - 1));
  }, [getSlideOffset, totalSlides]);

  const goToSlide = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
    setCurrentSlide(clampedIndex);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const syncSlider = () => {
      setCardsPerSlide(getCardsPerSlide());
      setCurrentSlide(0);
      setTranslateX(0);
    };

    syncSlider();
    let resizeTimeout = 0;

    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(syncSlider, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (wheelSnapTimeoutRef.current) {
        window.clearTimeout(wheelSnapTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const clampedSlide = Math.max(0, Math.min(currentSlide, totalSlides - 1));
    if (clampedSlide !== currentSlide) {
      setCurrentSlide(clampedSlide);
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      setTranslateX(getSlideOffset(clampedSlide));
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [currentSlide, totalSlides, cardsPerSlide, getSlideOffset]);

  const toggleExpand = (id: number) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    const hasHorizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
    if (!hasHorizontalIntent) {
      return;
    }

    event.preventDefault();

    const delta = Math.abs(event.deltaX) > 0 ? event.deltaX : event.deltaY;
    const nextOffset = clampOffset(translateX + delta);
    setTranslateX(nextOffset);

    if (wheelSnapTimeoutRef.current) {
      window.clearTimeout(wheelSnapTimeoutRef.current);
    }

    wheelSnapTimeoutRef.current = window.setTimeout(() => {
      goToSlide(getNearestSlide(nextOffset));
    }, 120);
  }, [clampOffset, getNearestSlide, goToSlide, translateX]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    dragStateRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startTranslateX: translateX,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, [translateX]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return;
    }

    const delta = event.clientX - dragState.startX;
    const nextOffset = clampOffset(dragState.startTranslateX - delta);
    setTranslateX(nextOffset);
  }, [clampOffset]);

  const finishPointerDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current.isDragging = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    goToSlide(getNearestSlide(translateX));
  }, [getNearestSlide, goToSlide, translateX]);

  const ghostIndex = cardsPerSlide > 1 && totalSlides > 1
    ? (currentSlide < totalSlides - 1
      ? Math.min(currentSlide + cardsPerSlide - 1, experiences.length - 1)
      : currentSlide)
    : -1;

  return (
    <section id="experience" className="experience-section relative z-[1] overflow-hidden py-20">
      <div className="container px-6 md:px-12 lg:px-20 mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-[#00bfff]">Professional Journey</span>
          </h2>
          <span className="heading-accent mb-6" />
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            My professional journey as a software engineer and team lead.
          </p>
        </div>

        {/* Slider */}
        <div className="slider-container relative">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={goPrev}
            className={`slider-nav-btn prev-btn ${currentSlide <= 0 ? 'disabled' : ''}`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Track wrapper */}
          <div
            ref={viewportRef}
            className={`slider-wrapper${isDragging ? ' dragging' : ''}`}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointerDrag}
            onPointerCancel={finishPointerDrag}
          >
            <div
              ref={trackRef}
              className="slider-track"
              style={{
                transform: `translateX(-${translateX}px)`,
                transition: isDragging ? 'none' : undefined,
              }}
            >
              {experiences.map((exp, index) => {
                const isGhost = index === ghostIndex;
                const hasHidden = exp.responsibilities.length > MAX_VISIBLE_BULLETS;
                const isExpanded = expandedCards[exp.id] || false;
                const displayedBullets = isExpanded
                  ? exp.responsibilities
                  : exp.responsibilities.slice(0, MAX_VISIBLE_BULLETS);
                const hiddenCount = exp.responsibilities.length - MAX_VISIBLE_BULLETS;

                return (
                  <div
                    key={exp.id}
                    className={`exp-card${isGhost ? ' ghost' : ''}`}
                  >
                    <div className="job-title">{exp.role}</div>

                    <div className="company-line">
                      {exp.company}
                      <span className="separator">•</span>
                      <span className="location">{exp.location}</span>
                    </div>

                    <div className="date-range">{exp.period}</div>

                    <ul className="bullet-list">
                      {displayedBullets.map((item, i) => (
                        <li key={i}>
                          <span className="bullet-arrow">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {hasHidden && (
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="expand-link"
                      >
                        {isExpanded ? '− Show less' : `+${hiddenCount} more`}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={goNext}
            className={`slider-nav-btn next-btn ${currentSlide >= totalSlides - 1 ? 'disabled' : ''}`}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot pagination */}
        {totalSlides > 0 && (
          <div className="exp-dots">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => goToSlide(i)}
                className={`exp-dot ${i === currentSlide ? 'active' : ''}`}
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
