import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import { personalInfo } from '../data/profileData';

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const absoluteTop = window.scrollY + element.getBoundingClientRect().top;
  window.scrollTo({ top: Math.max(absoluteTop - 72, 0), behavior: 'smooth' });
};

const Hero: React.FC = () => (
  <section id="home" className="site-section hero-section flex items-center">
    <div className="soft-grid" />
    <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" aria-hidden="true" />
    <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.04fr_.96fr] lg:gap-16">
      <div className="min-w-0">
        <p className="section-eyebrow">Hello, I'm</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.7rem,6vw,5.4rem)] font-extrabold leading-[.96] tracking-[-.065em] text-slate-950">
          Muhammad Nurdin <span className="text-sky-600">Mafatichul Fuadi</span>
        </h1>
        <p className="mt-6 font-mono text-base font-semibold text-sky-700 sm:text-lg">Software Engineer</p>
        <p className="mt-5 max-w-xl text-[clamp(1rem,1.7vw,1.15rem)] leading-8 text-slate-600">
          I build scalable back-end systems and modern web applications that solve real problems. Focused on clean architecture, performance, and reliable software.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => scrollToSection('contact')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(2,132,199,.18)] transition hover:bg-sky-700 hover:shadow-[0_12px_26px_rgba(2,132,199,.24)]">Let's Connect <ArrowRight size={17} aria-hidden="true" /></button>
          <button onClick={() => scrollToSection('projects')} className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700">View My Work</button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <a href="https://github.com/afatbenz" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-sky-300 hover:text-sky-700"><Github size={18} /></a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-sky-300 hover:text-sky-700"><Linkedin size={18} /></a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-sky-300 hover:text-sky-700"><Mail size={18} /></a>
          <a href="https://wa.me/6281335884729" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-sky-300 hover:text-sky-700"><MessageCircle size={18} /></a>
          <span className="hidden h-5 w-px bg-slate-200 sm:block" />
          <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-sky-600" /> {personalInfo.location}</span>
          <span className="inline-flex items-center gap-2 text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Available for opportunities</span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[520px] lg:justify-self-end">
        <div className="hero-availability hero-availability-enter absolute -right-2 -top-5 z-20 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-[0_12px_28px_rgba(15,23,42,.08)] sm:right-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Open to opportunities</div>
          <p className="mt-1 text-xs text-slate-500">Remote / Hybrid · Indonesia / Overseas</p>
        </div>
        <div className="hero-visual-panel rounded-[22px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-5 shadow-[0_24px_60px_rgba(14,116,144,.12)] sm:p-7">
          <div className="flex items-end justify-between gap-5">
            <div className="relative shrink-0 rounded-2xl border-4 border-white bg-sky-100 shadow-lg">
              <img src="/avatar.png" alt="Portrait of Muhammad Nurdin Mafatichul Fuadi" className="h-44 w-36 rounded-xl object-cover object-top sm:h-56 sm:w-44" />
            </div>
            <div className="min-w-0 flex-1 pb-2 text-right">
              <p className="mono-label">/profile/engineer.ts</p>
              <p className="mt-2 text-sm font-semibold text-slate-700">Backend systems</p>
              <p className="mt-1 text-sm text-slate-500">Architecture · APIs · Delivery</p>
            </div>
          </div>
          <div className="hero-code hero-code-enter mt-5 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-[11px] leading-6 shadow-xl sm:text-xs">
            <div className="mb-3 flex items-center gap-1.5" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-rose-400" /><span className="h-2 w-2 rounded-full bg-amber-300" /><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="ml-2 text-slate-500">developer.ts</span></div>
            <p><span className="text-sky-300">const</span> developer = {'{'}</p>
            <p className="pl-4"><span className="text-cyan-300">role</span>: <span className="text-emerald-300">"Software Engineer"</span>,</p>
            <p className="pl-4"><span className="text-cyan-300">focus</span>: [<span className="text-emerald-300">"Backend"</span>, <span className="text-emerald-300">"System Design"</span>],</p>
            <p className="pl-4"><span className="text-cyan-300">mindset</span>: <span className="text-emerald-300">"Always Learning"</span></p>
            <p>{'}'};</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
