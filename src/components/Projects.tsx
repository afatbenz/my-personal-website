import React, { useEffect, useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import { Project } from '../types/types';
import { fetchProjects } from '../api/projects';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const displayedProjects = useMemo(() => projects.filter((project) => project.display).sort((a, b) => b.id - a.id).slice(0, 3), [projects]);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(() => setProjects([])).finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="site-section projects-section">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="section-eyebrow">Featured projects</p><h2 className="section-title">Some Things I’ve Built</h2><div className="section-rule" /></div><p className="section-lede max-w-md md:text-right">Selected work across digital platforms, healthcare, and operational software.</p></div>
        {loading ? <div className="surface-card mt-10 flex min-h-[240px] items-center justify-center text-sm text-slate-500">Loading selected projects...</div> : displayedProjects.length === 0 ? <div className="surface-card mt-10 flex min-h-[240px] items-center justify-center text-sm text-slate-500">Projects are being updated.</div> : <div className="mt-10 grid gap-5 lg:grid-cols-3">{displayedProjects.map((project) => <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />)}</div>}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5"><p className="text-sm text-slate-500">Want to see more of the work?</p><a href="/projects" className="text-sm font-bold text-sky-700 hover:text-sky-900">Browse project archive <span aria-hidden="true">→</span></a></div>
        {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </div>
    </section>
  );
};

export default Projects;
