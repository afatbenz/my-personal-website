import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Cloud,
  Code2,
  Database,
  Server,
} from 'lucide-react';

type SkillMetric = {
  name: string;
  years: number;
  width: number;
  icon: React.ReactNode;
};

type SkillCategory = {
  title: string;
  colorClass: string;
  icon: React.ReactNode;
  items: string[];
  fullWidth?: boolean;
};

type AboutSlide = {
  titleBefore: string;
  titleHighlight: string;
  text: string;
};

const CARD_CLASS =
  'rounded-xl border border-[rgba(99,179,237,0.15)] bg-[#0f172a] shadow-[0_20px_60px_rgba(2,12,27,0.22)]';

const IconBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2236]">{children}</div>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <polygon points="12,1.5 20.5,6.4 20.5,17.6 12,22.5 3.5,17.6 3.5,6.4" fill="#83CD29" />
    <path d="M12.4 6.9v9.7h-1.5L8.1 11v5.6H6.7V7h1.6l2.6 5.1V7h1.5Z" fill="#0b1220" />
  </svg>
);

const GoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <rect x="2.5" y="7" width="19" height="10" rx="5" fill="#00ADD8" />
    <text x="12" y="14.4" textAnchor="middle" fontSize="7" fontWeight="700" fill="#052435">
      GO
    </text>
  </svg>
);

const PhpIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <ellipse cx="12" cy="12" rx="9" ry="6.2" fill="#777BB4" />
    <text x="12" y="14.4" textAnchor="middle" fontSize="6" fontWeight="700" fill="#f8fafc">
      PHP
    </text>
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="#3178C6" />
    <text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff">
      TS
    </text>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="8.5" ry="3.3" fill="none" stroke="#61DAFB" strokeWidth="1.4" />
    <ellipse
      cx="12"
      cy="12"
      rx="8.5"
      ry="3.3"
      fill="none"
      stroke="#61DAFB"
      strokeWidth="1.4"
      transform="rotate(60 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="8.5"
      ry="3.3"
      fill="none"
      stroke="#61DAFB"
      strokeWidth="1.4"
      transform="rotate(120 12 12)"
    />
  </svg>
);

const AngularIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path d="M12 2.5 4.2 5.3l1.2 10.3L12 21.5l6.6-5.9 1.2-10.3L12 2.5Z" fill="#DD0031" />
    <path d="M12 2.5v19l6.6-5.9 1.2-10.3L12 2.5Z" fill="#C3002F" />
    <path d="m12 6.4 3.2 8.5h-1.9l-.6-1.7h-3.5l-.6 1.7H6.8L10 6.4h2Zm.1 5.2L11 8.6l-1.1 3h2.2Z" fill="#ffffff" />
  </svg>
);

const SqlIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <ellipse cx="12" cy="6.5" rx="6.5" ry="2.8" fill="#22d3ee" />
    <path d="M5.5 6.5v4.1c0 1.6 2.9 2.8 6.5 2.8s6.5-1.2 6.5-2.8V6.5" fill="#22d3ee" opacity="0.9" />
    <path d="M5.5 10.8v4.1c0 1.6 2.9 2.8 6.5 2.8s6.5-1.2 6.5-2.8v-4.1" fill="#22d3ee" opacity="0.75" />
  </svg>
);

const MongoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      d="M12.4 3.2c2.2 2.6 3.7 5.6 3.7 8.8 0 3.8-2 6.7-4.1 8.8-2-2-4-5-4-8.8 0-3.2 1.5-6.2 3.7-8.8l.4 1.9.3-1.9Z"
      fill="#4CAF50"
    />
    <path d="M12 4.4c.8 2.3 1.2 4.8 1.2 7.4 0 2.6-.4 5.1-1.2 7.4-.8-2.3-1.2-4.8-1.2-7.4 0-2.6.4-5.1 1.2-7.4Z" fill="#e5fbe7" opacity="0.7" />
  </svg>
);

const LANGUAGE_SKILLS: SkillMetric[] = [
  { name: 'Node.js', years: 6, width: 86, icon: <NodeIcon /> },
  { name: 'Go', years: 2, width: 29, icon: <GoIcon /> },
  { name: 'PHP', years: 3, width: 43, icon: <PhpIcon /> },
  { name: 'TypeScript', years: 4, width: 57, icon: <TypeScriptIcon /> },
  { name: 'React', years: 4, width: 57, icon: <ReactIcon /> },
  { name: 'Angular', years: 0.8, width: 11, icon: <AngularIcon /> },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Backend Engineering',
    colorClass: 'text-[#00bfff]',
    icon: <Server size={22} />,
    items: ['Node.js', 'Go', 'PHP', 'TypeScript', '.NET', 'REST API', 'Micro-services'],
  },
  {
    title: 'Frontend Development',
    colorClass: 'text-[#00bfff]',
    icon: <Code2 size={22} />,
    items: ['React', 'Angular', 'HTML', 'CSS', 'TypeScript'],
  },
  {
    title: 'Databases & Caching',
    colorClass: 'text-[#4ade80]',
    icon: <Database size={22} />,
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server', 'Redis'],
  },
  {
    title: 'Cloud & Infrastructure',
    colorClass: 'text-[#fb923c]',
    icon: <Cloud size={22} />,
    items: ['AWS (EKS, EC2, ECR)', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    title: 'Testing & Observability',
    colorClass: 'text-[#f43f5e]',
    icon: <BarChart3 size={22} />,
    items: ['Jest', 'Mocha', 'SonarQube', 'Kibana', 'Splunk'],
    fullWidth: true,
  },
];

const ABOUT_SNIPPETS = [
  { text: 'integrity.commitment = "always on";', top: '12%', left: '56%', delay: '0s' },
  { text: 'listen.deeply(team, stakeholders);', top: '26%', left: '8%', delay: '1.4s' },
  { text: 'trust = buildThroughConsistency();', top: '43%', left: '58%', delay: '0.9s' },
  { text: 'alignPeopleWithSharedGoals();', top: '64%', left: '7%', delay: '2.1s' },
  { text: 'leadership.mode = "calm under pressure";', top: '78%', left: '50%', delay: '1.2s' },
];

const ABOUT_EDGE_LABELS = ['INTEGRITY', 'OWNERSHIP', 'COLLABORATION', 'LEADERSHIP'];

const ABOUT_SLIDES: AboutSlide[] = [
  {
    titleBefore: 'I turn ideas into ',
    titleHighlight: 'scalable solutions.',
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
  const skillsSectionRef = useRef<HTMLElement>(null);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % ABOUT_SLIDES.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const section = skillsSectionRef.current;
    if (!section) {
      return;
    }

    let hasStarted = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          setHasAnimatedIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section id="about" className="relative z-[1] overflow-hidden bg-[#0c0416] py-24">
        <style>
          {`
            .about-code-snippet {
              position: absolute;
              font-family: 'Roboto Mono', monospace;
              font-size: 0.78rem;
              color: rgba(148, 163, 184, 0.16);
              letter-spacing: 0.04em;
              white-space: nowrap;
              animation: aboutCodeDrift 10s ease-in-out infinite alternate;
            }

            .about-left-dot {
              height: 10px;
              width: 10px;
              border-radius: 9999px;
              background: #00bfff;
              box-shadow: 0 0 0 6px rgba(0, 191, 255, 0.08), 0 0 18px rgba(0, 191, 255, 0.5);
            }

            .about-vertical-label {
              writing-mode: vertical-rl;
              transform: rotate(180deg);
              letter-spacing: 0.35em;
            }

            @keyframes aboutCodeDrift {
              0% {
                transform: translate3d(0, 0, 0);
                opacity: 0.58;
              }

              50% {
                opacity: 1;
              }

              100% {
                transform: translate3d(12px, -8px, 0);
                opacity: 0.72;
              }
            }

            @media (max-width: 640px) {
              .about-code-snippet {
                font-size: 0.64rem;
                opacity: 0.72;
              }
            }
          `}
        </style>

        <div className="absolute inset-0 overflow-hidden">
          {ABOUT_SNIPPETS.map((snippet) => (
            <span
              key={snippet.text}
              className="about-code-snippet"
              style={{ top: snippet.top, left: snippet.left, animationDelay: snippet.delay }}
            >
              {snippet.text}
            </span>
          ))}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16, 17, 43, 0.8),transparent_0%),radial-gradient(circle_at_bottom_right,rgba(7, 7, 18, 0.93),transparent_98%)]" />
        </div>

        <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex">
          {[0, 1, 2, 3].map((dot) => (
            <span key={dot} className="about-left-dot" />
          ))}
        </div>

        <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 gap-4 xl:flex">
          {ABOUT_EDGE_LABELS.map((label) => (
            <span key={label} className="about-vertical-label text-xs font-semibold text-cyan-300/30">
              {label}
            </span>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl py-16 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#00bfff]">
              <span>&lt;/&gt;</span>
              <span>About Me</span>
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-[40px]">
              About Me
            </h2>
            <div className="mt-5 h-0.5 w-12 rounded-full bg-[#00bfff] mx-auto" />

            <div className="relative mt-5 min-h-[190px] px-6 py-8 backdrop-blur-sm sm:min-h-[168px] md:px-10 md:py-10">
              {ABOUT_SLIDES.map((slide, index) => (
                <div
                  key={`${slide.titleBefore}-${slide.titleHighlight}`}
                  className={`absolute inset-0 px-6 py-8 transition-all duration-500 md:px-10 md:py-10 ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-3 opacity-0'
                  }`}
                >
                  <h3 className="mx-auto max-w-3xl text-2xl font-bold leading-tight text-white md:text-5xl">
                    {slide.titleBefore}
                    <span className="text-[#00bfff]">{slide.titleHighlight}</span>
                  </h3>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
                    {slide.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
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
          </div>
        </div>
      </section>

      <section ref={skillsSectionRef} className="relative z-[1] bg-[#11061f] py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#00bfff]">
              <span>&lt;/&gt;</span>
              <span>Skills &amp; Technologies</span>
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-[40px]">
              Skills &amp; Technologies
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Technologies and tools I use to build scalable and reliable solutions.
            </p>
            <div className="mt-5 h-0.5 w-12 rounded-full bg-[#00bfff]" />
          </div>
          <div className="absolute inset-0 overflow-hidden">
          {ABOUT_SNIPPETS.map((snippet) => (
            <span
              key={snippet.text}
              className="about-code-snippet"
              style={{ top: snippet.top, left: snippet.left, animationDelay: snippet.delay }}
            >
              {snippet.text}
            </span>
          ))}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255, 255, 43, 0.8),transparent_0%),radial-gradient(circle_at_bottom_right,rgba(7, 7, 18, 0.93),transparent_98%)]" />
        </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
            <div className={`${CARD_CLASS} p-7`}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/25 bg-[#1e1b4b] text-violet-300">
                  <Code2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">Programming Languages</h3>
              </div>

              <div className="mt-8 space-y-5">
                {LANGUAGE_SKILLS.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <IconBadge>{skill.icon}</IconBadge>
                        <span className="truncate text-sm font-medium text-white">{skill.name}</span>
                      </div>
                      <span className="shrink-0 text-[13px] font-medium text-white">
                        {skill.years} years
                      </span>
                    </div>

                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                      <div
                        className="h-full rounded-full transition-[width] duration-[800ms] ease-out"
                        style={{
                          width: hasAnimatedIn ? `${skill.width}%` : '0%',
                          background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {SKILL_CATEGORIES.map((category) => (
                <div
                  key={category.title}
                  className={`${CARD_CLASS} p-6 ${category.fullWidth ? 'sm:col-span-2' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={category.colorClass}>{category.icon}</div>
                    <h3 className="text-base font-bold text-white">{category.title}</h3>
                  </div>
                  <div className="mt-4 h-0.5 w-8 rounded-full bg-[#00bfff]" />

                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-[rgba(255,255,255,0.1)] bg-[#1e293b] px-3 py-1 text-[13px] text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
