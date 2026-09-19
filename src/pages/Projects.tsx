import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ProjectDialog from '../components/ProjectDialog';
import { Project } from '../types/types';
import { fetchProjects } from '../api/projects';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setProjects(sorted);
        setFilteredProjects(sorted);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTech = selectedTech === '' || project.techStack.includes(selectedTech);
      return matchesSearch && matchesTech;
    });
    setFilteredProjects(filtered);
  }, [searchTerm, selectedTech, projects]);

  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.techStack))
  ).sort();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="project-archive-page min-h-screen py-20">
      <div className="container px-6 md:px-12 lg:px-40 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate('/')}
            className="absolute left-8 top-8 flex items-center gap-2 text-slate-500 transition-colors hover:text-sky-700"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">Project Portfolio</h1>
          <p className="mx-auto max-w-2xl text-slate-500">
            Explore my collection of projects showcasing various technologies and solutions.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-800 transition-colors focus:border-sky-500 focus:outline-none"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="min-w-[200px] cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-8 text-slate-800 focus:border-sky-500 focus:outline-none"
            >
              <option value="">All Technologies</option>
              {allTechnologies.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-lg text-slate-500">No projects found matching your criteria.</p>
          </div>
        )}

        {selectedProject && (
          <ProjectDialog
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
