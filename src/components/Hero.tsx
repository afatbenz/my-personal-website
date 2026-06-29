import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { ArrowDown } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';
import { personalInfo } from '../data/profileData';

const TerminalWidget: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = terminalRef.current;
    if (!container) return;

    let animationFrame: number;
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];
    let rafId: number;
    let isMounted = true;

    const codeLines = [
      { text: 'const message = "Hello, World!";', tokens: [
        { cls: 'keyword', text: 'const' },
        { cls: 'variable', text: ' message' },
        { cls: 'operator', text: ' = ' },
        { cls: 'string', text: '"Hello, World!"' },
        { cls: 'punctuation', text: ';' },
      ]},
      { text: 'const submessage = "Let\'s do something together";', tokens: [
        { cls: 'keyword', text: 'const' },
        { cls: 'variable', text: ' submessage' },
        { cls: 'operator', text: ' = ' },
        { cls: 'string', text: '"Let\'s do something together"' },
        { cls: 'punctuation', text: ';' },
      ]},
      { text: '', skip: true },
      { text: 'console.log(message);', tokens: [
        { cls: 'method', text: 'console' },
        { cls: 'punctuation', text: '.' },
        { cls: 'method', text: 'log' },
        { cls: 'punctuation', text: '(' },
        { cls: 'variable', text: 'message' },
        { cls: 'punctuation', text: ');' },
      ]},
      { text: 'console.log(submessage);', tokens: [
        { cls: 'method', text: 'console' },
        { cls: 'punctuation', text: '.' },
        { cls: 'method', text: 'log' },
        { cls: 'punctuation', text: '(' },
        { cls: 'variable', text: 'submessage' },
        { cls: 'punctuation', text: ');' },
      ]},
    ];

    const consoleOutput = [
      '> Hello, World!',
      '> Let\'s do something together',
    ];

    function buildTerminal(containerEl: HTMLDivElement) {
      containerEl.innerHTML = `
        <div class="terminal-header">
          <div class="terminal-dot red"></div>
          <div class="terminal-dot yellow"></div>
          <div class="terminal-dot green"></div>
          <span class="terminal-title">portfolio.js — ~/dev</span>
        </div>
        <div class="terminal-body">
          <div class="code-area"></div>
          <hr class="terminal-divider" style="display:none" />
          <div class="console-section" style="display:none">
            <span class="console-label">▸ Console</span>
            <div class="console-output"></div>
          </div>
        </div>
      `;
    }

    function runAnimation(containerEl: HTMLDivElement) {
      const codeArea = containerEl.querySelector('.code-area') as HTMLElement;
      const divider = containerEl.querySelector('.terminal-divider') as HTMLElement;
      const consoleSection = containerEl.querySelector('.console-section') as HTMLElement;
      const consoleOutputEl = containerEl.querySelector('.console-output') as HTMLElement;

      if (!codeArea) return;
      codeArea.innerHTML = '';
      if (divider) divider.style.display = 'none';
      if (consoleSection) consoleSection.style.display = 'none';
      if (consoleOutputEl) consoleOutputEl.innerHTML = '';

      const cursorSpan = document.createElement('span');
      cursorSpan.className = 'terminal-cursor';

      let lineIndex = 0;
      let charIndex = 0;
      let currentLineEl: HTMLElement | null = null;
      let currentCode = '';
      let isTyping = true;

      function typeNextChar() {
        if (!isMounted) return;

        if (lineIndex >= codeLines.length) {
          // Typing done — show console
          cursorSpan.remove();
          showConsole();
          return;
        }

        const line = codeLines[lineIndex];

        if (line.skip) {
          // Empty line
          const emptyLine = document.createElement('div');
          emptyLine.className = 'terminal-line';
          emptyLine.innerHTML = '&nbsp;';
          codeArea.appendChild(emptyLine);
          lineIndex++;
          rafId = requestAnimationFrame(() => {
            timeoutIds.push(setTimeout(typeNextChar, 400));
          });
          return;
        }

        if (charIndex === 0) {
          currentLineEl = document.createElement('div');
          currentLineEl.className = 'terminal-line';
          codeArea.appendChild(currentLineEl);
          currentCode = '';
        }

        if (!currentLineEl) return;

        if (charIndex < line.text.length) {
          currentCode += line.text[charIndex];
          // Rebuild the line with syntax highlighting
          currentLineEl.innerHTML = '';
          let remaining = currentCode;
          for (const token of line.tokens) {
            if (remaining.startsWith(token.text)) {
              const span = document.createElement('span');
              span.className = token.cls;
              span.textContent = token.text;
              currentLineEl.appendChild(span);
              remaining = remaining.slice(token.text.length);
            }
          }
          if (remaining) {
            currentLineEl.appendChild(document.createTextNode(remaining));
          }
          currentLineEl.appendChild(cursorSpan);
          charIndex++;
          // Variable delay: faster for spaces/punctuation, slower for code
          const ch = line.text[charIndex - 1];
          let delay = 30 + Math.random() * 40;
          if (ch === ' ' || ch === ';' || ch === '(' || ch === ')') delay = 80 + Math.random() * 40;
          else if (ch === '"') delay = 120;
          else if (/[a-zA-Z]/.test(ch)) delay = 40 + Math.random() * 60;
          rafId = requestAnimationFrame(() => {
            timeoutIds.push(setTimeout(typeNextChar, delay));
          });
        } else {
          // Line complete — move to next line
          charIndex = 0;
          lineIndex++;
          cursorSpan.remove();
          rafId = requestAnimationFrame(() => {
            timeoutIds.push(setTimeout(typeNextChar, 350));
          });
        }
      }

      function showConsole() {
        if (!isMounted || !divider || !consoleSection || !consoleOutputEl) return;
        divider.style.display = 'block';
        consoleSection.style.display = 'block';

        consoleOutputEl.innerHTML = '';
        consoleOutput.forEach((line, i) => {
          const lineEl = document.createElement('div');
          lineEl.className = 'console-line';
          lineEl.style.animationDelay = `${i * 0.3}s`;
          const prefix = document.createElement('span');
          prefix.className = 'console-prefix';
          prefix.textContent = '>';
          lineEl.appendChild(prefix);
          lineEl.appendChild(document.createTextNode(line.slice(1)));
          consoleOutputEl.appendChild(lineEl);
        });

        // After showing console, wait and restart
        timeoutIds.push(setTimeout(() => {
          if (!isMounted) return;
          runAnimation(containerEl);
        }, 3000));
      }

      // Start typing
      typeNextChar();
    }

    buildTerminal(container);
    // Small delay before starting
    timeoutIds.push(setTimeout(() => {
      if (isMounted) runAnimation(container);
    }, 600));

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  return <div ref={terminalRef} className="terminal-widget" />;
};

const Hero: React.FC = () => {
  const fullName = personalInfo.name;
  const highlight = "fatich";
  const targetWord = fullName.split(' ').find(word => word.toLowerCase().includes(highlight)) || '';
  const parts = targetWord
    ? [
        targetWord.slice(0, targetWord.toLowerCase().indexOf(highlight)),
        targetWord.slice(targetWord.toLowerCase().indexOf(highlight), targetWord.toLowerCase().indexOf(highlight) + highlight.length),
        targetWord.slice(targetWord.toLowerCase().indexOf(highlight) + highlight.length),
      ]
    : [];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-12 bg-gradient-to-b from-dark-900/90 to-dark-800/90">
      <ParticlesBackground id="hero-particles" />

      <div className="container px-6 md:px-12 lg:px-20 mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left side: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
              {fullName.split(' ').map((word, i) =>
                word === targetWord ? (
                  <React.Fragment key={i}>
                    {parts[0]}
                    <span className="text-primary-400">{parts[1]}</span>
                    {parts[2]}{' '}
                  </React.Fragment>
                ) : (
                  word + ' '
                )
              )}
            </h1>

            <div className="h-16 md:h-20 flex items-center justify-center lg:justify-start">
              <TypeAnimation
                sequence={[
                  'Software Engineer',
                  2000,
                  'Backend Developer',
                  2000,
                  'Fullstack Engineer',
                  2000,
                ]}
                wrapper="h2"
                speed={50}
                repeat={Infinity}
                className="text-xl md:text-2xl font-mono text-secondary-400"
              />
            </div>

            <p className="text-lg max-w-xl text-gray-300 mb-8 animate-fade-in">
              Software Engineer with 7+ years of experience building scalable back-end systems and enterprise applications.
              Specialized in designing high-performance APIs, microservices architecture, and database optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
              <Link
                to="projects"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-all text-lg text-center"
              >
                View My Work
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                className="bg-transparent hover:bg-dark-700 text-white border border-primary-600 px-6 py-3 rounded-md transition-all text-lg text-center"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Right side: Terminal widget */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-lg lg:max-w-none">
            <TerminalWidget />
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            className="cursor-pointer animate-bounce inline-block"
          >
            <ArrowDown className="text-primary-400" size={28} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;