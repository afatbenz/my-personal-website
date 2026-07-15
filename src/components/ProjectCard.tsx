import React from 'react';
import { Project } from '../types/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      className="bg-dark-800 rounded-lg overflow-hidden shadow-lg border border-blue-900 hover:border-blue-400 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer w-[100%] mx-auto"
      onClick={onClick}
    >
      <div className="h-[210px] overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-400 mb-4 h-12 line-clamp-2 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-dark-700 text-primary-400 rounded-md text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;