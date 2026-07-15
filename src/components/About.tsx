import React, { useEffect, useState } from 'react';

type AboutSlide = {
  titleBefore: string;
  titleHighlight: string;
  text: string;
};

const ABOUT_EDGE_LABELS = ['INTEGRITY', 'OWNERSHIP', 'COLLABORATION', 'LEADERSHIP'];

const ABOUT_SLIDES: AboutSlide[] = [
  {
    titleBefore: 'Turn Ideas Into ',
    titleHighlight: 'Scalable Solutions.',
    text: 'Strong foundation in backend development, implement reliable and scalable business system.',
  },
  {
    titleBefore: 'Accelerated Response, ',
    titleHighlight: 'Driven By Precision.',
    text: 'Experienced in improving system reliability, and delivering production-grade systems for high-traffic applications used by millions of active users.',
  },
  {
    titleBefore: 'Built On ',
    titleHighlight: 'Integrity.',
    text: 'I value accountability, honesty, and consistency in every collaboration, from technical execution to day-to-day communication with teams and stakeholders.',
  },
  {
    titleBefore: 'Strengthened By ',
    titleHighlight: 'Empathy.',
    text: 'I enjoy listening carefully, aligning expectations, and turning complex discussions into practical next steps that help teams move forward together.',
  },
  {
    titleBefore: 'Focused On ',
    titleHighlight: 'Healthy Teamwork.',
    text: 'I bring a calm, dependable mindset to collaboration, helping teams build trust, stay productive under pressure, and deliver with shared ownership.',
  },
];

const About: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ABOUT_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative z-[1] h-screen overflow-hidden py-16 lg:py-24" style={{ backgroundColor: '#0c0416' }}>
      <style>
        {`
          .about-vertical-label {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            letter-spacing: 0.35em;
          }
        `}
      </style>

      <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 gap-4 xl:flex">
        {ABOUT_EDGE_LABELS.map((label) => (
          <span key={label} className="about-vertical-label text-xs font-semibold text-cyan-300/30">
            {label}
          </span>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-2 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl py-2 lg:py-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#00bfff]">
            <span>&lt;/&gt;</span>
            <span>About Me</span>
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-[40px]">
            About Me
          </h2>
          <div className="mt-5 h-0.5 w-12 rounded-full bg-[#00bfff] mx-auto" />

          <img
            src="/avatar.png"
            alt="Mafatichul Fuadi"
            className="mx-auto mt-10 h-48 w-48 lg:h-56 lg:w-56 object-cover"
          />

          <div className="relative min-h-[190px] px-6 py-2 backdrop-blur-sm sm:min-h-[168px] md:px-10 md:py-10">
            {ABOUT_SLIDES.map((slide, index) => (
              <div
                key={`${slide.titleBefore}-${slide.titleHighlight}`}
                className={`absolute inset-0 px-6 py-8 transition-all duration-200 md:px-10 md:py-10 ${
                  index === currentSlide
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-3 opacity-0'
                }`}
              >
                <h3 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-6xl">
                  {slide.titleBefore}
                  <span className="text-[#00bfff]">{slide.titleHighlight}</span>
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-base md:text-2xl leading-7 text-slate-300">
                  {slide.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[5rem] left-0 right-0 z-20 hidden sm:flex items-center justify-center gap-2">
        {ABOUT_SLIDES.map((slide, index) => (
          <button
            key={`dot-${slide.titleHighlight}`}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-[#00bfff]' : 'w-2.5 bg-white/20'
            }`}
            aria-label={`Tampilkan slide About Me ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default About;
