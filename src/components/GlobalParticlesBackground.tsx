import { useEffect } from 'react';

type ParticleConfig = {
  color: string;
  opacity: number;
  density: number;
};

type Particle = {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  speedX: number;
  speedY: number;
  twinkleOffset: number;
};

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

const DESKTOP_PARTICLE_CAP = 120;
const MOBILE_PARTICLE_CAP = 60;
const RESIZE_DEBOUNCE_MS = 200;

const SECTION_PARTICLE_CONFIG: Record<string, ParticleConfig> = {
  home: { color: '#00bfff', opacity: 0.7, density: 80 },
  about: { color: '#00bfff', opacity: 0.4, density: 50 },
  experience: { color: '#a855f7', opacity: 0.3, density: 30 },
  projects: { color: '#4ade80', opacity: 0.3, density: 30 },
  contact: { color: '#00bfff', opacity: 0.3, density: 30 },
  footer: { color: '#00bfff', opacity: 0.2, density: 20 },
};

const OBSERVED_SECTION_IDS = ['home', 'about', 'experience', 'projects', 'contact', 'footer'];

const hexToRgb = (hex: string): RgbColor => {
  const value = hex.replace('#', '');
  const safeValue = value.length === 3
    ? value
        .split('')
        .map((char) => char + char)
        .join('')
    : value;

  return {
    r: Number.parseInt(safeValue.slice(0, 2), 16),
    g: Number.parseInt(safeValue.slice(2, 4), 16),
    b: Number.parseInt(safeValue.slice(4, 6), 16),
  };
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height,
  radius: Math.random() * 2 + 0.5,
  baseOpacity: Math.random() * 0.5 + 0.1,
  speedX: (Math.random() - 0.5) * 0.3,
  speedY: (Math.random() - 0.5) * 0.3,
  twinkleOffset: Math.random() * Math.PI * 2,
});

const GlobalParticlesBackground = () => {
  useEffect(() => {
    const body = document.body;
    let canvas = document.getElementById('particles-bg') as HTMLCanvasElement | null;
    let canvasCreated = false;

    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'particles-bg';
      body.prepend(canvas);
      canvasCreated = true;
    }

    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '0',
      pointerEvents: 'none',
    });

    const context = canvas.getContext('2d');
    if (!context) {
      if (canvasCreated) {
        canvas.remove();
      }
      return;
    }

    let animationFrameId = 0;
    let resizeTimeoutId: ReturnType<typeof window.setTimeout> | null = null;
    let particles: Particle[] = [];
    let currentSectionId = 'home';
    let targetSectionId = 'home';
    let activeSectionRatios = new Map<string, number>();

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = particles.map((particle) => ({
        ...particle,
        x: clamp(particle.x, 0, canvas.width),
        y: clamp(particle.y, 0, canvas.height),
      }));
    };

    const getParticleLimit = () => (window.innerWidth < 768 ? MOBILE_PARTICLE_CAP : DESKTOP_PARTICLE_CAP);

    const getDensityScale = () => getParticleLimit() / DESKTOP_PARTICLE_CAP;

    const getConfigForSection = (sectionId: string) =>
      SECTION_PARTICLE_CONFIG[sectionId] ?? SECTION_PARTICLE_CONFIG.contact;

    let currentColor = hexToRgb(getConfigForSection(currentSectionId).color);
    let targetColor = hexToRgb(getConfigForSection(targetSectionId).color);
    let currentOpacity = getConfigForSection(currentSectionId).opacity;
    let targetOpacity = getConfigForSection(targetSectionId).opacity;
    let currentDensity = getConfigForSection(currentSectionId).density;
    let targetDensity = getConfigForSection(targetSectionId).density;

    const syncTargetState = () => {
      const config = getConfigForSection(targetSectionId);
      targetColor = hexToRgb(config.color);
      targetOpacity = config.opacity;
      targetDensity = config.density;
    };

    const updateActiveSection = () => {
      let nextSectionId = currentSectionId;
      let bestRatio = 0;

      activeSectionRatios.forEach((ratio, sectionId) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          nextSectionId = sectionId;
        }
      });

      if (bestRatio === 0) {
        const scrollPosition = window.scrollY + window.innerHeight * 0.35;
        OBSERVED_SECTION_IDS.forEach((sectionId) => {
          const element = document.getElementById(sectionId);
          if (!element) {
            return;
          }

          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            nextSectionId = sectionId;
          }
        });
      }

      if (nextSectionId !== targetSectionId) {
        targetSectionId = nextSectionId;
        syncTargetState();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = (entry.target as HTMLElement).id;
          if (!sectionId) {
            return;
          }
          activeSectionRatios.set(sectionId, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        updateActiveSection();
      },
      {
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.8],
        rootMargin: '-12% 0px -18% 0px',
      },
    );

    OBSERVED_SECTION_IDS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    const adjustParticleCount = (desiredCount: number) => {
      while (particles.length < desiredCount) {
        particles.push(createParticle(canvas.width, canvas.height));
      }

      if (particles.length > desiredCount) {
        particles.length = desiredCount;
      }
    };

    const animate = () => {
      currentColor = {
        r: currentColor.r + (targetColor.r - currentColor.r) * 0.04,
        g: currentColor.g + (targetColor.g - currentColor.g) * 0.04,
        b: currentColor.b + (targetColor.b - currentColor.b) * 0.04,
      };
      currentOpacity += (targetOpacity - currentOpacity) * 0.04;
      currentDensity += (targetDensity - currentDensity) * 0.04;

      const desiredParticleCount = clamp(
        Math.round(currentDensity * getDensityScale()),
        12,
        getParticleLimit(),
      );
      adjustParticleCount(desiredParticleCount);

      context.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const red = Math.round(currentColor.r);
      const green = Math.round(currentColor.g);
      const blue = Math.round(currentColor.b);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
        if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius;
        if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius;

        const twinkle = (Math.sin(now * 0.001 + particle.twinkleOffset) + 1) / 2;
        const alpha = clamp(
          particle.baseOpacity * (0.45 + twinkle * 0.55) * currentOpacity,
          0.04,
          1,
        );

        context.beginPath();
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      if (currentSectionId !== targetSectionId) {
        const colorDelta =
          Math.abs(currentColor.r - targetColor.r) +
          Math.abs(currentColor.g - targetColor.g) +
          Math.abs(currentColor.b - targetColor.b);

        if (colorDelta < 2 && Math.abs(currentOpacity - targetOpacity) < 0.01) {
          currentSectionId = targetSectionId;
        }
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (resizeTimeoutId) {
        window.clearTimeout(resizeTimeoutId);
      }

      resizeTimeoutId = window.setTimeout(() => {
        setCanvasSize();
      }, RESIZE_DEBOUNCE_MS);
    };

    const handleScroll = () => {
      updateActiveSection();
    };

    setCanvasSize();
    syncTargetState();
    adjustParticleCount(Math.round(currentDensity * getDensityScale()));
    updateActiveSection();
    animationFrameId = window.requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();

      if (resizeTimeoutId) {
        window.clearTimeout(resizeTimeoutId);
      }

      if (canvasCreated) {
        canvas.remove();
      }
    };
  }, []);

  return null;
};

export default GlobalParticlesBackground;
