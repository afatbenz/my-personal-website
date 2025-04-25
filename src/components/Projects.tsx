import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import { Project } from '../types/types';
import { fetchProjects } from '../api/projects';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-dark-900">
      <div className="container px-4 mx-auto">
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
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        )}

        {/* <div className="mt-12 text-center">
          <a 
            href="https://github.com/afatbenz" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-6 py-3 border border-primary-500 text-primary-400 rounded-md hover:bg-primary-500 hover:bg-opacity-10 transition-all"
          >
            View More Projects
          </a>
        </div> */}
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