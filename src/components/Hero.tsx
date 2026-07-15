import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  Box,
  Braces,
  Cloud,
  Database,
  Hammer,
  Network,
} from 'lucide-react';

// Custom scroll handler - consistent across all components
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const navbarHeight = 80;
  const rect = element.getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top;
  const targetScroll = Math.max(absoluteTop - navbarHeight, 0);
  window.scrollTo({
    top: targetScroll,
    behavior: 'smooth',
  });
};

type Token = {
  cls?: string;
  text: string;
};

type CodeLine =
  | {
      blank: true;
    }
  | {
      tokens: Token[];
    };

type TechItem = {
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
};

const EDGE_LABELS = ['API', 'DATABASE', 'MICROSERVICES', 'PERFORMANCE'];
const TECH_STACK: TechItem[] = [
  { label: 'Microservices', icon: Network },
  { label: 'Code Quality', icon: Braces },
  { label: 'Databases', icon: Database },
  { label: 'Docker', icon: Box },
  { label: 'Cloud', icon: Cloud },
  { label: 'Architecture', icon: Hammer },
];
const DEVELOPER_NAME = 'Muhammad Nurdin Mafaticul Fuadi';
const ROTATING_ROLES = [
  'Software Engineer',
  'Backend Engineer',
  'Fullstack Engineer',
  'System Analyst',
];
const TERMINAL_COMMAND = 'node portfolio.js';
const TERMINAL_OUTPUT = `Hi, i'm ${DEVELOPER_NAME}`;

const IDE_CODE_LINES: CodeLine[] = [
  {
    tokens: [
      { cls: 'ide-keyword', text: 'const' },
      { text: ' ' },
      { cls: 'ide-identifier', text: 'developer' },
      { text: ' ' },
      { cls: 'ide-punctuation', text: '=' },
      { text: ' ' },
      { cls: 'ide-punctuation', text: '{' },
    ],
  },
  {
    tokens: [
      { text: '  ' },
      { cls: 'ide-property', text: 'name' },
      { cls: 'ide-punctuation', text: ':' },
      { text: ' ' },
      { cls: 'ide-string', text: `"${DEVELOPER_NAME}"` },
      { cls: 'ide-punctuation', text: ',' },
    ],
  },
  {
    tokens: [
      { text: '  ' },
      { cls: 'ide-property', text: 'role' },
      { cls: 'ide-punctuation', text: ':' },
      { text: ' ' },
      { cls: 'ide-string', text: '"Software Engineer"' },
      { cls: 'ide-punctuation', text: ',' },
    ],
  },
  {
    tokens: [
      { text: '  ' },
      { cls: 'ide-property', text: 'experience' },
      { cls: 'ide-punctuation', text: ':' },
      { text: ' ' },
      { cls: 'ide-string', text: '"7+ years"' },
      { cls: 'ide-punctuation', text: ',' },
    ],
  },
  {
    tokens: [
      { text: '  ' },
      { cls: 'ide-property', text: 'stack' },
      { cls: 'ide-punctuation', text: ':' },
      { text: ' ' },
      {
        cls: 'ide-string',
        text: '["Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS"]',
      },
      { cls: 'ide-punctuation', text: ',' },
    ],
  },
  {
    tokens: [
      { text: '  ' },
      { cls: 'ide-property', text: 'passion' },
      { cls: 'ide-punctuation', text: ':' },
      { text: ' ' },
      {
        cls: 'ide-string',
        text: '"Building scalable and high-performance systems"',
      },
      { cls: 'ide-punctuation', text: ',' },
    ],
  },
  {
    tokens: [{ cls: 'ide-punctuation', text: '};' }],
  },
  { blank: true },
  {
    tokens: [
      { cls: 'ide-console', text: 'console.log' },
      { cls: 'ide-punctuation', text: '(' },
      { cls: 'ide-string', text: "`Hi, i'm " },
      { cls: 'ide-expression', text: '${developer.name}' },
      { cls: 'ide-string', text: '`' },
      { cls: 'ide-punctuation', text: ');' },
    ],
  },
];

const getLineLength = (line: CodeLine) =>
  'blank' in line ? 0 : line.tokens.reduce((total, token) => total + token.text.length, 0);

const getLineText = (line: CodeLine) => ('blank' in line ? '' : line.tokens.map((token) => token.text).join(''));

const createCursor = (documentRef: Document, className: string, text: string) => {
  const cursor = documentRef.createElement('span');
  cursor.className = className;
  cursor.textContent = text;
  return cursor;
};

const renderTypedLine = (
  lineEl: HTMLDivElement,
  line: CodeLine,
  visibleChars: number,
  showCursor: boolean,
) => {
  const documentRef = lineEl.ownerDocument;
  lineEl.innerHTML = '';

  if ('blank' in line) {
    lineEl.innerHTML = '&nbsp;';
  } else {
    let charsLeft = visibleChars;

    line.tokens.forEach((token) => {
      if (charsLeft <= 0) {
        return;
      }

      const visibleText = token.text.slice(0, charsLeft);
      charsLeft -= visibleText.length;

      if (!visibleText) {
        return;
      }

      if (token.cls) {
        const span = documentRef.createElement('span');
        span.className = token.cls;
        span.textContent = visibleText;
        lineEl.appendChild(span);
        return;
      }

      lineEl.appendChild(documentRef.createTextNode(visibleText));
    });
  }

  if (showCursor) {
    lineEl.appendChild(createCursor(documentRef, 'ide-cursor', '|'));
  }
};

const renderTerminalTypedLine = (
  lineEl: HTMLDivElement,
  content: string,
  visibleChars: number,
  options: { prompt?: boolean; showCursor: boolean; tone?: 'default' | 'output' },
) => {
  const documentRef = lineEl.ownerDocument;
  lineEl.innerHTML = '';

  if (options.prompt) {
    const promptEl = documentRef.createElement('span');
    promptEl.className = 'terminal-prompt';
    promptEl.textContent = '>';
    lineEl.appendChild(promptEl);
    lineEl.appendChild(documentRef.createTextNode(' '));
  }

  if (content) {
    const contentEl = documentRef.createElement('span');
    if (options.tone === 'output') {
      contentEl.className = 'terminal-output';
    }
    contentEl.textContent = content.slice(0, visibleChars);
    lineEl.appendChild(contentEl);
  }

  if (options.showCursor) {
    lineEl.appendChild(createCursor(documentRef, 'terminal-cursor', '_'));
  }
};

const buildTerminalMarkup = (containerEl: HTMLDivElement) => {
  containerEl.innerHTML = `
    <div class="ide-widget">
      <div class="ide-chrome">
        <div class="ide-dots">
          <span class="ide-dot ide-dot-red"></span>
          <span class="ide-dot ide-dot-yellow"></span>
          <span class="ide-dot ide-dot-green"></span>
        </div>
        <span class="ide-title">portfolio.js \u2014 ~/dev</span>
      </div>
      <div class="ide-editor"></div>
      <div class="ide-divider"></div>
      <div class="ide-terminal"></div>
    </div>
  `;
};

const TerminalWidget: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = terminalRef.current;
    if (!container) {
      return;
    }

    buildTerminalMarkup(container);

    const editor = container.querySelector('.ide-editor');
    const divider = container.querySelector('.ide-divider');
    const terminal = container.querySelector('.ide-terminal');

    if (!(editor instanceof HTMLDivElement) || !(divider instanceof HTMLDivElement) || !(terminal instanceof HTMLDivElement)) {
      return;
    }

    const timeoutIds: ReturnType<typeof window.setTimeout>[] = [];
    let mounted = true;

    const queue = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(() => {
        if (mounted) {
          callback();
        }
      }, delay);
      timeoutIds.push(timeoutId);
    };

    const addTerminalLine = (
      parent: HTMLDivElement,
      content: string,
      options: {
        prompt?: boolean;
        delay: number;
        tone?: 'default' | 'output';
        persistCursor?: boolean;
        onComplete?: () => void;
      },
    ) => {
      queue(() => {
        const lineEl = document.createElement('div');
        lineEl.className = 'terminal-line';

        parent.appendChild(lineEl);
        queue(() => lineEl.classList.add('visible'), 20);

        if (!content) {
          renderTerminalTypedLine(lineEl, '', 0, {
            prompt: options.prompt,
            showCursor: true,
            tone: options.tone,
          });
          return;
        }

        let visibleChars = 0;

        const typeCharacter = () => {
          if (!mounted) {
            return;
          }

          visibleChars += 1;
          renderTerminalTypedLine(lineEl, content, visibleChars, {
            prompt: options.prompt,
            showCursor: true,
            tone: options.tone,
          });

          if (visibleChars < content.length) {
            queue(typeCharacter, getCharacterDelay(content[visibleChars - 1]));
            return;
          }

          queue(() => {
            renderTerminalTypedLine(lineEl, content, visibleChars, {
              prompt: options.prompt,
              showCursor: Boolean(options.persistCursor),
              tone: options.tone,
            });
            options.onComplete?.();
          }, 140);
        };

        renderTerminalTypedLine(lineEl, content, 0, {
          prompt: options.prompt,
          showCursor: true,
          tone: options.tone,
        });
        queue(typeCharacter, 80);
      }, options.delay);
    };

    const getCharacterDelay = (char: string) => {
      if (char === ' ') {
        return 24;
      }

      if ('{}[]();,:'.includes(char)) {
        return 48;
      }

      if (char === '"' || char === "'") {
        return 72;
      }

      return /[A-Za-z0-9]/.test(char) ? 36 : 42;
    };

    const startLoop = () => {
      if (!mounted) {
        return;
      }

      editor.innerHTML = '';
      terminal.innerHTML = '';
      divider.classList.remove('visible');
      terminal.classList.remove('visible');

      let lineIndex = 0;
      let charIndex = 0;
      let currentLineEl: HTMLDivElement | null = null;

      const revealTerminal = () => {
        queue(() => {
          divider.classList.add('visible');
          terminal.classList.add('visible');

          addTerminalLine(terminal, TERMINAL_COMMAND, {
            prompt: true,
            delay: 160,
            onComplete: () => {
              addTerminalLine(terminal, TERMINAL_OUTPUT, {
                delay: 180,
                tone: 'output',
                onComplete: () => {
                  addTerminalLine(terminal, '', { prompt: true, delay: 220 });
                  queue(startLoop, 5000);
                },
              });
            },
          });
        }, 520);
      };

      const typeNextCharacter = () => {
        if (!mounted) {
          return;
        }

        if (lineIndex >= IDE_CODE_LINES.length) {
          revealTerminal();
          return;
        }

        const line = IDE_CODE_LINES[lineIndex];

        if ('blank' in line) {
          const blankLine = document.createElement('div');
          blankLine.className = 'ide-line';
          blankLine.innerHTML = '&nbsp;';
          editor.appendChild(blankLine);
          lineIndex += 1;
          queue(typeNextCharacter, 140);
          return;
        }

        if (!currentLineEl) {
          currentLineEl = document.createElement('div');
          currentLineEl.className = 'ide-line';
          editor.appendChild(currentLineEl);
        }

        charIndex += 1;
        renderTypedLine(currentLineEl, line, charIndex, true);

        const fullLength = getLineLength(line);
        if (charIndex < fullLength) {
          const fullText = getLineText(line);
          const currentChar = fullText[charIndex - 1];
          queue(typeNextCharacter, getCharacterDelay(currentChar));
          return;
        }

        const finishedLineEl = currentLineEl;
        const finishedLine = line;

        queue(() => {
          renderTypedLine(finishedLineEl, finishedLine, getLineLength(finishedLine), false);
          currentLineEl = null;
          charIndex = 0;
          lineIndex += 1;

          if (lineIndex >= IDE_CODE_LINES.length) {
            revealTerminal();
            return;
          }

          typeNextCharacter();
        }, 150);
      };

      typeNextCharacter();
    };

    queue(startLoop, 600);

    return () => {
      mounted = false;
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  return <div ref={terminalRef} className="relative w-full" />;
};

const TechBadge: React.FC<TechItem> = ({ icon: Icon, label }) => (
  <div className="w-[100%] min-w-0 shrink-0 rounded-2xl border border-[rgba(99,179,237,0.2)] bg-[#111827] px-3 py-2 text-center shadow-[0_0_25px_rgba(0,191,255,0.08)] sm:min-w-[92px] sm:w-[120px] sm:px-4 sm:py-3 mb-2 mr-2">
    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#0b1320] sm:h-11 sm:w-11">
      <Icon className="h-4 w-4 text-white/90 sm:h-5 sm:w-5" />
    </div>
    <span className="mt-1.5 block truncate text-[11px] font-medium text-slate-300 sm:mt-3 sm:text-xs">{label}</span>
  </div>
);

const Hero: React.FC = () => {
  const [displayedRole, setDisplayedRole] = useState(ROTATING_ROLES[0]);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof window.setTimeout>;
    let mounted = true;

    const currentRole = ROTATING_ROLES[roleIndex];
    const nextIndex = (roleIndex + 1) % ROTATING_ROLES.length;
    const nextRole = ROTATING_ROLES[nextIndex];

    setDisplayedRole(currentRole);

    const eraseRole = () => {
      let currentLength = currentRole.length;

      const eraseStep = () => {
        if (!mounted) {
          return;
        }

        currentLength -= 1;
        setDisplayedRole(currentRole.slice(0, Math.max(currentLength, 0)));

        if (currentLength > 0) {
          timeoutId = window.setTimeout(eraseStep, 45);
          return;
        }

        let nextLength = 0;

        const typeStep = () => {
          if (!mounted) {
            return;
          }

          nextLength += 1;
          setDisplayedRole(nextRole.slice(0, nextLength));

          if (nextLength < nextRole.length) {
            timeoutId = window.setTimeout(typeStep, 85);
            return;
          }

          timeoutId = window.setTimeout(() => setRoleIndex(nextIndex), 4000);
        };

        timeoutId = window.setTimeout(typeStep, 120);
      };

      eraseStep();
    };

    timeoutId = window.setTimeout(eraseRole, 4000);

    return () => {
      mounted = false;
      window.clearTimeout(timeoutId);
    };
  }, [roleIndex]);

  return (
    <section
      id="home"
      className="relative z-[1] flex min-h-screen items-center overflow-hidden"
      style={{ backgroundColor: '#050d1a' }}
    >
      <style>
        {`
          .hero-copy-enter {
            opacity: 0;
            transform: translateX(-28px);
            animation: heroCopyEnter 0.9s ease-out forwards;
          }

          .hero-widget-enter {
            opacity: 0;
            transform: translateX(32px) translateY(18px);
            animation: heroWidgetEnter 1s ease-out 0.15s forwards;
          }

          .hero-vertical-label {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            letter-spacing: 0.35em;
          }

          .hero-role-cursor,
          .ide-cursor,
          .terminal-cursor {
            display: inline-block;
            animation: heroBlink 1s steps(1, end) infinite;
          }

          .ide-widget {
            overflow: hidden;
            border-radius: 28px;
            border: 1px solid rgba(0, 191, 255, 0.32);
            background:
              linear-gradient(180deg, rgba(13, 17, 23, 0.98) 0%, rgba(8, 15, 24, 0.98) 100%);
            box-shadow:
              0 30px 80px rgba(2, 12, 27, 0.9),
              0 0 0 1px rgba(0, 191, 255, 0.08),
              0 0 50px rgba(0, 191, 255, 0.16);
            backdrop-filter: blur(10px);
          }

          .ide-chrome {
            display: flex;
            align-items: center;
            gap: 16px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            background: rgba(10, 18, 31, 0.92);
            padding: 14px 18px;
          }

          .ide-dots {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .ide-dot {
            height: 12px;
            width: 12px;
            border-radius: 9999px;
          }

          .ide-dot-red {
            background: #ff5f57;
          }

          .ide-dot-yellow {
            background: #ffbd2e;
          }

          .ide-dot-green {
            background: #28ca42;
          }

          .ide-title {
            font-size: 0.82rem;
            color: rgba(148, 163, 184, 0.9);
          }

          .ide-editor,
          .ide-terminal {
            font-family: 'Roboto Mono', monospace;
          }

          .ide-editor {
            min-height: 312px;
            background: #0d1117;
            padding: 22px 24px 20px;
          }

          .ide-line {
            min-height: 1.6em;
            color: #e2e8f0;
            font-size: 0.94rem;
            line-height: 1.6;
            white-space: pre-wrap;
            word-break: break-word;
          }

          .ide-keyword {
            color: #a855f7;
          }

          .ide-property,
          .ide-console {
            color: #00bfff;
          }

          .ide-string {
            color: #4ade80;
          }

          .ide-expression {
            color: #fbbf24;
          }

          .ide-punctuation {
            color: #cbd5e1;
          }

          .ide-identifier {
            color: #f8fafc;
          }

          .ide-divider {
            height: 1px;
            background: rgba(148, 163, 184, 0.18);
            opacity: 0;
            transform: scaleX(0.96);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }

          .ide-divider.visible {
            opacity: 1;
            transform: scaleX(1);
          }

          .ide-terminal {
            min-height: 134px;
            background: #080f18;
            padding: 18px 24px 22px;
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 0.45s ease, transform 0.45s ease;
          }

          .ide-terminal.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .terminal-line {
            color: #e2e8f0;
            font-size: 0.9rem;
            line-height: 1.7;
            opacity: 0;
            transform: translateY(4px);
            transition: opacity 0.35s ease, transform 0.35s ease;
            white-space: pre-wrap;
          }

          .terminal-line.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .terminal-prompt {
            color: #4ade80;
          }

          .terminal-output {
            color: #7dd3fc;
          }

          .hero-tech-scroll {
            scrollbar-width: none;
          }

          .hero-tech-scroll::-webkit-scrollbar {
            display: none;
          }

          @keyframes heroBlink {
            0%, 48% {
              opacity: 1;
            }

            49%, 100% {
              opacity: 0;
            }
          }

          @keyframes heroCopyEnter {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes heroWidgetEnter {
            to {
              opacity: 1;
              transform: translateX(0) translateY(0);
            }
          }

          @keyframes heroCodeDrift {
            0% {
              transform: translate3d(0, 0, 0);
            }

            100% {
              transform: translate3d(10px, -10px, 0);
            }
          }

          @keyframes heroArrowPulse {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.72;
            }

            50% {
              transform: translateY(8px);
              opacity: 1;
            }
          }

          @keyframes heroWidgetFloat {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes heroRingPulse {
            0%, 100% {
              opacity: 0.45;
              transform: translateX(-50%) scale(1);
            }

            50% {
              opacity: 0.82;
              transform: translateX(-50%) scale(1.05);
            }
          }

          @keyframes heroResumeFloat {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-6px);
            }
          }

          @media (max-width: 1023px) {
            .ide-editor {
              min-height: 270px;
            }
          }

          @media (max-width: 640px) {
            .ide-widget {
              border-radius: 22px;
            }

            .ide-chrome {
              gap: 12px;
              padding: 12px 14px;
            }

            .ide-title {
              font-size: 0.74rem;
            }

            .ide-editor {
              min-height: 208px;
              padding: 16px 16px 14px;
            }

            .ide-line {
              min-height: 1.45em;
              font-size: 0.8rem;
              line-height: 1.45;
            }

            .ide-terminal {
              min-height: 88px;
              padding: 14px 16px 16px;
            }

            .terminal-line {
              font-size: 0.76rem;
              line-height: 1.55;
            }
          }
        `}
      </style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,191,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.06),transparent_24%)]" />

      <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 gap-4 xl:flex">
        {EDGE_LABELS.map((label) => (
          <span key={label} className="hero-vertical-label text-xs font-semibold text-cyan-300/30">
            {label}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-col px-5 pb-32 pt-24 sm:px-6 md:px-12 md:pb-24 md:pt-28 lg:px-16 xl:px-20">
        <div className="grid items-center gap-14 lg:min-h-[calc(100vh-13rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="hero-copy-enter min-w-0 max-w-full text-center lg:max-w-[620px] lg:text-left">
            <h1 className="text-[2.25rem] font-extrabold leading-[0.98] tracking-tight text-white sm:text-[3rem] lg:text-[4.5rem]">
              <span className="block">Muhammad Nurdin</span>
              <span className="mt-2 block">
                M
                <span style={{ color: '#00bfff' }}>afatic</span>
                hul Fuadi
              </span>
            </h1>

            <div className="mt-2 lg:mt-6 inline-flex max-w-full items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/5 px-4 py-2 font-mono text-base text-[#a855f7] sm:text-lg lg:justify-start">
              <span>{displayedRole}</span>
              <span className="hero-role-cursor ml-1">|</span>
            </div>

            <p className="mt-8 max-w-full text-[0.85rem] leading-7 text-slate-300 sm:max-w-[36rem] sm:text-[1.02rem] sm:leading-8">
              <span className="block">
                Software Engineer with <span style={{ color: '#00bfff' }}>7+ years</span> of experience
              </span>
              <span className="block">building scalable back-end systems and enterprise applications. Specialized in designing high-performance APIs, AI-spec driven, microservices architecture, and database optimization.</span>
            </p>

            {/* <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold text-[#04111f] shadow-[0_10px_30px_rgba(0,191,255,0.25)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
                style={{ backgroundColor: '#00bfff' }}
              >
                <span>View My Work</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-white/25 bg-[#0a1423] px-6 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:border-cyan-300/40 hover:bg-white/5 sm:w-auto"
              >
                Contact Me
              </button>
            </div> */}

            <div className="mt-10 grid grid-cols-3 justify-items-center gap-2 sm:grid sm:grid-cols-4 sm:gap-1 lg:pr-16">
              {TECH_STACK.map((item) => (
                <TechBadge key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div className="hero-widget-enter relative mx-auto w-full max-w-full sm:max-w-[580px] lg:mx-0">
            <div
              className="relative"
              style={{
                animation: 'heroWidgetFloat 6.2s ease-in-out infinite',
              }}
            >
              <div className="absolute inset-x-8 top-10 h-28 rounded-full bg-cyan-400/10 blur-3xl" />
              <TerminalWidget />

              <div className="pointer-events-none absolute -bottom-12 left-1/2 h-24 w-[92%] -translate-x-1/2 sm:-bottom-16 sm:h-28 sm:w-[86%]">
                <div
                  className="absolute left-1/2 top-1/2 h-12 w-[78%] rounded-[999px] border border-cyan-300/40 sm:h-16 sm:w-[72%]"
                  style={{
                    boxShadow: '0 0 24px rgba(0, 191, 255, 0.35), inset 0 0 16px rgba(0, 191, 255, 0.18)',
                    animation: 'heroRingPulse 4.2s ease-in-out infinite',
                  }}
                />
                <svg
                  viewBox="0 0 420 120"
                  className="absolute inset-0 h-full w-full overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="hero-ring-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <ellipse
                    cx="210"
                    cy="60"
                    rx="155"
                    ry="26"
                    stroke="rgba(0,191,255,0.65)"
                    strokeWidth="2"
                    filter="url(#hero-ring-glow)"
                  />
                  <ellipse
                    cx="210"
                    cy="60"
                    rx="118"
                    ry="18"
                    stroke="rgba(125,211,252,0.48)"
                    strokeWidth="1.5"
                    filter="url(#hero-ring-glow)"
                  />
                  <ellipse
                    cx="210"
                    cy="60"
                    rx="85"
                    ry="11"
                    stroke="rgba(34,211,238,0.34)"
                    strokeWidth="1.2"
                    filter="url(#hero-ring-glow)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 sm:bottom-9">
          <button
            onClick={() => scrollToSection('about')}
            className="pointer-events-auto inline-flex cursor-pointer items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/5 p-3 text-cyan-300/90"
            style={{ animation: 'heroArrowPulse 2.2s ease-in-out infinite' }}
          >
            <ArrowDown size={26} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
