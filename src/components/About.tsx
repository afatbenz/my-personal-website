import React from 'react';
import { Code, Server, Database, GitBranch, Briefcase } from 'lucide-react';
import { skills } from '../data/profileData';

const About: React.FC = () => {
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Backend Engineering':
        return <Server className="text-primary-400" size={24} />;
      case 'Frontend Development':
        return <Code className="text-secondary-400" size={24} />;
      case 'Databases & Caching':
        return <Database className="text-green-400" size={24} />;
      case 'Cloud & Infrastructure':
        return <GitBranch className="text-orange-400" size={24} />;
      case 'Testing & Observability':
        return <Briefcase className="text-pink-400" size={24} />;
      default:
        return <GitBranch className="text-pink-400" size={24} />;
    }
  };

  const totalYears = 7;
  const programmingExperience = [
    { language: 'Node.js', years: 6 },
    { language: 'Go', years: 2 },
    { language: 'PHP', years: 3 },
    { language: 'TypeScript', years: 4 },
    { language: 'React', years: 4 },
    { language: 'Angular', years: 0.8 },
    { language: 'SQL Database', years: 7 },
    { language: 'NoSQL Database', years: 1 },
  ];

  return (
    <section id="about" className="py-20 bg-dark-900">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            Software Engineer with 7+ years of experience building scalable back-end systems and enterprise
            applications across telecom and healthcare digital platforms. Specialized in designing high-performance
            APIs, microservices architecture, and database optimization. Experienced in leading engineering teams in
            large-scale digital platforms, improving system reliability, and delivering production-grade systems for
            high-traffic applications used by millions of active users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <Briefcase className="text-primary-400" size={24} />
                <h3 className="text-xl font-semibold">Professional Summary</h3>
              </div>
              <p className="text-gray-300 pl-9">
                With 7+ years of experience, I specialize in Backend Engineering (Node.js, Go, PHP) and have a strong
                background in Frontend Development, Databases, Cloud Infrastructure, and Observability. I have successfully
                led teams, optimized high-traffic systems, and ensured 100% SLA compliance.
              </p>
            </div>

            <div className="p-6 bg-dark-800 rounded-lg shadow-lg border border-dark-700 hover:border-primary-800 transition-all">
              <h3 className="text-xl font-semibold mb-6">Programming Languages & Databases</h3>
              <div className="space-y-4">
                {programmingExperience.map((lang, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{lang.language}</span>
                      <span className="text-primary-400">{lang.years} years</span>
                    </div>
                    <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 rounded-full transition-all duration-500"
                        style={{ width: `${(lang.years / totalYears) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <h3 className="text-xl font-semibold mb-2">Technical Skills</h3>
            
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="p-5 bg-dark-800 rounded-lg shadow-lg border border-dark-700 hover:border-primary-800 transition-all"
              >
                <div className="flex items-center mb-3">
                  {getIconForCategory(skill.category)}
                  <h4 className="text-lg font-medium ml-3">{skill.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2 ml-9">
                  {skill.items.map((item, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-dark-700 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;