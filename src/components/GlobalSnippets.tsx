import React, { useEffect, useState } from 'react';

const GLOBAL_SNIPPETS = [
  // Hero snippets
  { text: 'const api = createService();', top: '10%', left: '56%', delay: '0s' },
  { text: 'SELECT * FROM systems;', top: '24%', left: '9%', delay: '1.5s' },
  { text: 'docker compose up -d', top: '41%', left: '58%', delay: '0.8s' },
  { text: 'await optimizeDatabase();', top: '63%', left: '6%', delay: '2.2s' },
  // About snippets
  { text: 'integrity.commitment = "always on";', top: '12%', left: '56%', delay: '3.0s' },
  { text: 'leadership.mode = "calm under pressure";', top: '78%', left: '50%', delay: '4.2s' },
  { text: 'location = "Yogyakarta, Indonesia";', top: '88%', left: '30%', delay: '5.5s' },
  { text: 'education = "Bachelor Degree";', top: '88%', left: '70%', delay: '5.7s' },
  // Skills snippets
  { text: 'system.scalability();', top: '18%', left: '74%', delay: '6.0s' },
  { text: 'deploy("production", { rollback: true });', top: '36%', left: '7%', delay: '7.6s' },
  { text: 'monitor.uptime > 99.9', top: '52%', left: '60%', delay: '6.7s' },
  { text: 'team.collaborate({ mode: "async" });', top: '70%', left: '9%', delay: '8.0s' },
  { text: 'incident.respond(time < 5min);', top: '85%', left: '52%', delay: '7.3s' },
  // Experience snippets
  { text: 'scalable.systems++;', top: '15%', left: '42%', delay: '9.0s' },
  { text: 'optimize.query("performance");', top: '32%', left: '76%', delay: '10.6s' },
  { text: 'log.metric("latency", < 50ms);', top: '48%', left: '7%', delay: '9.7s' },
  { text: 'team.velocity *= 1.5;', top: '68%', left: '55%', delay: '11.0s' },
  { text: 'deploy.automated = true;', top: '82%', left: '22%', delay: '10.3s' },
  // Contact snippets
  { text: 'contact.open("opportunities");', top: '28%', left: '8%', delay: '13.5s' },
  { text: 'await response({ status: 200 });', top: '45%', left: '58%', delay: '12.8s' },
];

const GlobalSnippets: React.FC = () => {
  return (
    <>
      <style>
        {`
          .global-snippet {
            position: fixed;
            font-family: 'Roboto Mono', monospace;
            font-size: 0.78rem;
            color: rgba(148, 163, 184, 0.13);
            letter-spacing: 0.04em;
            white-space: nowrap;
            pointer-events: none;
            z-index: 5;
            animation: globalSnippetDrift 10s ease-in-out infinite alternate;
          }

          @keyframes globalSnippetDrift {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(10px, -10px, 0); }
          }

          @media (max-width: 640px) {
            .global-snippet {
              font-size: 0.64rem;
              opacity: 0.7;
            }
          }
        `}
      </style>
      {GLOBAL_SNIPPETS.map((snippet) => (
        <span
          key={`${snippet.text}-${snippet.top}`}
          className="global-snippet"
          style={{ top: snippet.top, left: snippet.left, animationDelay: snippet.delay }}
        >
          {snippet.text}
        </span>
      ))}
    </>
  );
};

export default GlobalSnippets;