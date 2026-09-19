import React from 'react';
import { Brain, CheckCircle2, MapPin, Users, Wrench } from 'lucide-react';

const capabilities = [
  { label: 'Problem Solver', icon: Brain },
  { label: 'Team Player', icon: Users },
  { label: 'Continuous Learner', icon: Wrench },
  { label: 'Detail Oriented', icon: CheckCircle2 },
];

const About: React.FC = () => (
  <section id="about" className="site-section about-section">
    <div className="soft-grid" />
    <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
      <div>
        <p className="section-eyebrow">About me</p>
        <h2 className="section-title">A Developer Who<br /><span className="text-sky-600">Builds With Purpose</span></h2>
        <div className="section-rule" />
        <p className="section-lede mt-7">With 7+ years in software engineering, I work across backend systems, enterprise applications, and the architecture decisions that make products reliable as they grow.</p>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">I enjoy turning complex requirements into clear technical direction, maintainable code, and dependable delivery for the people who use and support the product.</p>
        <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          {capabilities.map(({ label, icon: Icon }) => <div key={label} className="surface-card flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700"><Icon size={17} className="text-sky-600" aria-hidden="true" /> {label}</div>)}
        </div>
        <blockquote className="mt-8 border-l-2 border-sky-400 pl-4 font-serif text-lg italic leading-7 text-slate-600">“Good software solves problems. Great software creates opportunities.”</blockquote>
      </div>

      <div className="surface-card divide-y divide-slate-100 overflow-hidden">
        <div className="flex gap-4 p-5 sm:p-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Wrench size={19} /></div><div><p className="font-mono text-sm font-bold text-slate-900">7+ Years</p><p className="mt-1 text-sm text-slate-500">Professional experience</p></div></div>
        <div className="flex gap-4 p-5 sm:p-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><MapPin size={19} /></div><div><p className="font-mono text-sm font-bold text-slate-900">Yogyakarta, Indonesia</p><p className="mt-1 text-sm text-slate-500">Open to relocation and distributed teams</p></div></div>
        <div className="flex gap-4 p-5 sm:p-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /></div><div><p className="font-mono text-sm font-bold text-slate-900">Open to Opportunities</p><p className="mt-1 text-sm text-slate-500">Remote, hybrid, or onsite</p></div></div>
        <div className="flex gap-4 p-5 sm:p-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Brain size={19} /></div><div><p className="font-mono text-sm font-bold text-slate-900">Focused On</p><p className="mt-1 text-sm leading-6 text-slate-500">Backend development, system design, cloud, and scalable architecture</p></div></div>
      </div>
    </div>
  </section>
);

export default About;
