import React, { useEffect, useRef, useState, useCallback } from 'react';
import { experiences } from '../data/profileData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CARD_GAP = 24;
const PARTNER_PEEK = 40; // px of next card visible to hint scrollability
const MAX_VISIBLE_BULLETS = 4;

const Experience: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const dragState = useRef({
    startX: 0,
    startTranslate: 0,
    isDragging: false,
  });

  // translateX is tracked by a ref so drag handlers always see current value
  const translateX = useRef(0);

  // Calculate the slide width (2 cards + gap + peek from next slide)
  const getSlideWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 700;
    const cards = track.querySelectorAll('.exp-card');
    if (cards.length < 2) return 700;
    const card = cards[0] as HTMLElement;
    const cardWidth = card.offsetWidth;
    return cardWidth * 2 + CARD_GAP;
  }, []);

  // Clamp translateX
  const clampTranslate = useCallback((value: number) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return value;
    const maxTranslate = 0;
    const minTranslate = -(track.scrollWidth - container.offsetWidth + PARTNER_PEEK);
    return Math.max(minTranslate, Math.min(maxTranslate, value));
  }, []);

  // Recalculate total slides
  const recalculateSlides = useCallback(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const slideWidth = getSlideWidth();
    const total = track.scrollWidth / slideWidth;
    setTotalSlides(Math.max(1, Math.ceil(total)));

    // Clamp current position
    const clamped = clampTranslate(translateX.current);
    if (clamped !== translateX.current) {
      translateX.current = clamped;
      track.style.transform = `translateX(${clamped}px)`;
    }
  }, [getSlideWidth, clampTranslate]);

  // Snap to slide index
  const snapToSlide = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;

    const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
    const slideWidth = getSlideWidth();
    const targetX = -(clampedIndex * slideWidth);

    translateX.current = targetX;
    setCurrentSlide(clampedIndex);

    if (smooth) {
      track.classList.add('smooth-scroll');
    }
    track.style.transform = `translateX(${targetX}px)`;
    if (smooth) {
      setTimeout(() => {
        track?.classList.remove('smooth-scroll');
      }, 400);
    }
  }, [getSlideWidth, totalSlides]);

  // Navigation
  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) snapToSlide(currentSlide + 1);
  }, [currentSlide, totalSlides, snapToSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) snapToSlide(currentSlide - 1);
  }, [currentSlide, snapToSlide]);

  // Resize observer
  useEffect(() => {
    recalculateSlides();
    const observer = new ResizeObserver(() => recalculateSlides());
    const container = containerRef.current;
    if (container) observer.observe(container);
    return () => observer.disconnect();
  }, [recalculateSlides]);

  // --- Mouse drag handlers ---
  const handlePointerDown = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;

    dragState.current = {
      startX: clientX,
      startTranslate: translateX.current,
      isDragging: true,
    };
    setIsDragging(true);
    track.classList.remove('smooth-scroll');
    track.style.cursor = 'grabbing';
  }, []);

  const handlePointerMove = useCallback((clientX: number) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container || !dragState.current.isDragging) return;

    const delta = clientX - dragState.current.startX;
    const newTranslate = dragState.current.startTranslate + delta;
    translateX.current = clampTranslate(newTranslate);
    track.style.transform = `translateX(${translateX.current}px)`;
  }, [clampTranslate]);

  const handlePointerUp = useCallback(() => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDragging) return;

    dragState.current.isDragging = false;
    setIsDragging(false);
    track.style.cursor = 'grab';

    // Snap to nearest slide
    const slideWidth = getSlideWidth();
    const snappedIndex = Math.round(Math.abs(translateX.current) / slideWidth);
    snapToSlide(Math.min(snappedIndex, totalSlides - 1));
  }, [getSlideWidth, snapToSlide, totalSlides]);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => handlePointerDown(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handlePointerMove(e.clientX);
  const onMouseUp = () => handlePointerUp();
  const onMouseLeave = () => { if (dragState.current.isDragging) handlePointerUp(); };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handlePointerDown(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handlePointerMove(e.touches[0].clientX);
  const onTouchEnd = () => handlePointerUp();

  // Toggle expanded bullets
  const toggleExpand = (id: number) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="experience-section py-20 overflow-hidden">
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
        <div className="relative" ref={containerRef}>
          {/* Left Arrow — only visible when not on first slide */}
          <button
            onClick={goPrev}
            className={`slider-nav-btn prev-btn ${currentSlide <= 0 ? 'disabled' : ''}`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Track wrapper */}
          <div className="slider-wrapper">
            <div
              ref={trackRef}
              className={`slider-track ${isDragging ? 'dragging' : ''}`}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {experiences.map((exp) => {
                const isLatest = exp.id <= 2;
                const hasHidden = exp.responsibilities.length > MAX_VISIBLE_BULLETS;
                const isExpanded = expandedCards[exp.id] || false;
                const displayedBullets = isExpanded
                  ? exp.responsibilities
                  : exp.responsibilities.slice(0, MAX_VISIBLE_BULLETS);
                const hiddenCount = exp.responsibilities.length - MAX_VISIBLE_BULLETS;

                return (
                  <div key={exp.id} className="exp-card">
                    {/* LATEST badge */}
                    {isLatest && <span className="latest-badge">LATEST</span>}

                    {/* Job title */}
                    <div className="job-title">{exp.role}</div>

                    {/* Company + Location */}
                    <div className="company-line">
                      {exp.company}
                      <span className="separator">•</span>
                      <span className="location">{exp.location}</span>
                    </div>

                    {/* Date range */}
                    <div className="date-range">{exp.period}</div>

                    {/* Bullet list */}
                    <ul className="bullet-list">
                      {displayedBullets.map((item, i) => (
                        <li key={i}>
                          <span className="bullet-arrow">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expand link */}
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

          {/* Right Arrow — always visible unless at end */}
          <button
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
                key={i}
                onClick={() => snapToSlide(i)}
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