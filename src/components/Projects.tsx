import React, { useEffect, useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import { Project } from '../types/types';
import { fetchProjects } from '../api/projects';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const displayedProjects = useMemo(() => {
    const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

    if (isMobile) {
      return sortedProjects.filter(project => project.display).slice(0, 4);
    }

    return sortedProjects.filter(project => project.display).slice(0, 6);
  }, [projects, isMobile]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative z-[1] py-20" style={{ backgroundColor: '#0a0f22' }}>
      <div className="container px-6 md:px-12 lg:px-20 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-300">
            A selection of my recent development work and technical projects.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a 
            href="/projects" 
            rel="noopener noreferrer" 
            className="inline-block px-6 py-3 border border-primary-500 text-primary-400 rounded-md hover:bg-primary-500 hover:bg-opacity-10 transition-all"
          >
            View More Projects
          </a>
        </div>
      </div>

      {selectedProject && (
        <ProjectDialog 
          project={selectedProject} 
          onClose={handleCloseDialog}
        />
      )}
    </section>
  );
};

export default Projects;
