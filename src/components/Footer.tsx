import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC<{ visits: number }> = ({ visits }) => (
  <footer id="footer" className="relative z-[1] border-t border-slate-200 bg-white py-8 text-slate-500">
    <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col items-center justify-between gap-5 text-center text-sm sm:flex-row sm:text-left">
      <div><p className="font-semibold text-slate-700">Mafatichul Fuadi</p><p className="mt-1 text-xs">Built with React, TypeScript, and Tailwind CSS · Visitors: {visits}</p></div>
      <div className="flex items-center gap-2"><a href="https://github.com/afatbenz" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 hover:border-sky-300 hover:text-sky-700"><Github size={18} /></a><a href="https://linkedin.com/in/mafatichulfuadi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 hover:border-sky-300 hover:text-sky-700"><Linkedin size={18} /></a><a href="mailto:mafatichulfuadi@gmail.com" aria-label="Email" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 hover:border-sky-300 hover:text-sky-700"><Mail size={18} /></a></div>
    </div>
  </footer>
);

export default Footer;
