import React from 'react';
import { BarChart3, Cloud, Code2, Database, Server, Wrench } from 'lucide-react';

const categories = [
  { title: 'Backend', icon: Server, items: ['Node.js', 'Go', 'PHP', 'C# / .NET', 'REST API', 'Micro-services'] },
  { title: 'Frontend', icon: Code2, items: ['React', 'React Native', 'Angular / AngularJS', 'HTML', 'CSS'] },
  { title: 'Databases', icon: Database, items: ['PostgreSQL', 'MySQL', 'MSSQL', 'MongoDB', 'Redis'] },
  { title: 'Cloud & DevOps', icon: Cloud, items: ['AWS', 'Docker', 'Kubernetes / EKS', 'Jenkins', 'CI/CD'] },
  { title: 'Tools & Architecture', icon: Wrench, items: ['Nginx', 'RabbitMQ', 'Prometheus', 'Kong', 'Git'] },
];

const Skills: React.FC = () => (
  <section id="skills" className="site-section skills-section">
    <div className="section-shell">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="section-eyebrow">Tech stack</p><h2 className="section-title">Tools &amp; Technologies</h2><div className="section-rule" /></div>
        <p className="section-lede max-w-md md:text-right">Technologies I work with to build scalable and reliable applications.</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ title, icon: Icon, items }) => <article key={title} className="surface-card p-5 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_14px_34px_rgba(2,132,199,.08)]">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Icon size={19} aria-hidden="true" /></div><h3 className="font-semibold text-slate-900">{title}</h3></div>
          <div className="mt-5 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="pill-tag">{item}</span>)}</div>
        </article>)}
      </div>
      <div className="mt-5 flex items-center gap-3 text-sm text-slate-500"><BarChart3 size={17} className="text-sky-600" /> Practical tools, chosen for the system and the team around it.</div>
    </div>
  </section>
);

export default Skills;
