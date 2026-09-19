import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { personalInfo } from '../data/profileData';

const Contact: React.FC = () => (
  <section id="contact" className="site-section contact-section">
    <div className="section-shell flex items-center">
      <div className="grid w-full items-center gap-10 rounded-[22px] border border-sky-100 bg-white p-7 shadow-[0_18px_46px_rgba(2,132,199,.08)] sm:p-10 lg:grid-cols-[1.15fr_.85fr] lg:p-14">
        <div><p className="section-eyebrow">Let's connect</p><h2 className="section-title mt-4">Let’s Build Something Great Together</h2><p className="section-lede mt-5">I’m always open to discussing new opportunities, interesting projects, or just having a good tech conversation.</p><a href={`mailto:${personalInfo.email}`} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-bold text-white transition hover:bg-sky-700">Send Message <ArrowRight size={17} aria-hidden="true" /></a></div>
        <div className="border-t border-slate-100 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><p className="mono-label">DIRECT CHANNELS</p><div className="mt-4 space-y-3"><a href={`mailto:${personalInfo.email}`} className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 px-4 text-sm text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"><Mail size={17} className="text-sky-600" /> {personalInfo.email}</a><a href="https://wa.me/6281335884729" target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 px-4 text-sm text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"><MessageCircle size={17} className="text-sky-600" /> WhatsApp</a><a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 px-4 text-sm text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"><Linkedin size={17} className="text-sky-600" /> LinkedIn profile</a><a href="https://github.com/afatbenz" target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 px-4 text-sm text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"><Github size={17} className="text-sky-600" /> GitHub repositories</a></div></div>
      </div>
    </div>
  </section>
);

export default Contact;
