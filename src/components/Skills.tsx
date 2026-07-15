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

const DotNetIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#512BD4" />
    <text x="12" y="15.5" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#ffffff" fontFamily="sans-serif">
      .NET
    </text>
  </svg>
);


const LANGUAGE_SKILLS: SkillMetric[] = [
  { name: 'Javascript', years: 7, width: 96, icon: <NodeIcon /> },
  { name: 'TypeScript', years: 5, width: 67, icon: <TypeScriptIcon /> },
  { name: 'React', years: 5, width: 67, icon: <ReactIcon /> },
  { name: 'PHP', years: 3, width: 43, icon: <PhpIcon /> },
  { name: 'Go', years: 3, width: 43, icon: <GoIcon /> },
  { name: 'Angular', years: 0.8, width: 11, icon: <AngularIcon /> },
  { name: '.NET', years: 0.8, width: 11, icon: <DotNetIcon /> },
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

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
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
    <section ref={sectionRef} id="skills" className="relative z-[1] py-16 lg:py-24" style={{ backgroundColor: '#11061f' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255, 255, 43, 0.8),transparent_0%),radial-gradient(circle_at_bottom_right,rgba(7, 7, 18, 0.93),transparent_98%)]" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#00bfff]">
            <span>&lt;/&gt;</span>
            <span>Skills &amp; Technologies</span>
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-[40px]">
            Skills &amp; Technologies
          </h2>
          <div className="mt-5 h-0.5 w-12 rounded-full bg-[#00bfff]" />
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
  );
};

export default Skills;
