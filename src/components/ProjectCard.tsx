import React from 'react';
import { ArrowUpRight, Folder } from 'lucide-react';
import { Project } from '../types/types';

interface ProjectCardProps { project: Project; onClick: () => void; }

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => (
  <button type="button" onClick={onClick} className="surface-card group flex h-full min-h-[230px] w-full flex-col text-left transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_16px_34px_rgba(2,132,199,.1)]">
    <div className="relative aspect-[16/9] overflow-hidden rounded-t-[15px] border-b border-slate-100 bg-slate-100">
      <img
        src={project.thumbnail}
        alt={`${project.title} preview`}
        loading="lazy"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
    </div>
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><span className="flex items-center gap-2 font-mono text-xs text-slate-500"><Folder size={16} className="text-sky-600" /> project/{project.id}</span><ArrowUpRight size={18} className="text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-600" /></div>
    <div className="flex flex-1 flex-col p-5"><h3 className="text-lg font-bold tracking-tight text-slate-900">{project.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{project.description}</p><div className="mt-auto flex flex-wrap gap-2 pt-5">{project.techStack.slice(0, 5).map((tech) => <span className="pill-tag" key={tech}>{tech}</span>)}</div></div>
  </button>
);

export default ProjectCard;
