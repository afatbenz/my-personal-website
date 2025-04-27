import React from 'react';
import { Code, Server, Database, GitBranch, Briefcase, ShieldCheck, MessageCircle } from 'lucide-react';
import { skills } from '../data/profileData';
import { TypeAnimation } from 'react-type-animation';

const About: React.FC = () => {
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Code className="text-primary-400" size={24} />;
      case 'Frontend':
        return <Code className="text-secondary-400" size={24} />;
      case 'Database & Caching':
        return <Database className="text-green-400" size={24} />;
      case 'Cloud & DevOps':
        return <Server className="text-orange-400" size={24} />;
      case 'Testing & Monitoring':
        return <ShieldCheck className="text-blue-400" size={24} />;
      case 'Collaboration Tools':
        return <MessageCircle className="text-purple-400" size={24} />;
      default:
        return <GitBranch className="text-pink-400" size={24} />;
    }
  };

  return (
    <section id="about" className="py-20 bg-dark-900">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <div className="max-w-3xl mx-auto text-gray-300 text-lg">
          <TypeAnimation
            sequence={[
              'Experienced Fullstack Developer specializing in backend development with PHP, JavaScript (Node.js, Express.js, Hapi.js, Next.js), and Go (Gin). Skilled in designing scalable microservices, optimizing database performance (MySQL, MongoDB, Redis), and ensuring smooth deployments. Experienced in running Jenkins pipelines for CI/CD, and monitoring services using Kubernetes, EFS, and ECR. Passionate about clean code, system reliability, and continuously learning new technologies.',
              2000,
            ]}
            wrapper="h2"
            speed={50}
            repeat={Infinity}
            className=""
          />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <Briefcase className="text-primary-400" size={24} />
                <h3 className="text-xl font-semibold">Professional Summary</h3>
              </div>
              <p className="text-gray-300 pl-9">
                With over 6 years of software development experience, I've led teams, built API services, 
                optimized performance, and ensured high-quality code across multiple projects. I specialize in 
                backend systems but have experience across the full development stack.
              </p>
            </div>

            <div className="p-6 bg-dark-800 rounded-lg shadow-lg border border-dark-700 hover:border-primary-800 transition-all">
              <h3 className="text-xl font-semibold mb-4">Core Strengths</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                  <span>Microservices Architecture</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                  <span>API Development & Integration</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                  <span>Database Optimization</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                  <span>Team Leadership</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mr-3"></span>
                  <span>CI/CD & DevOps Practices</span>
                </li>
              </ul>
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