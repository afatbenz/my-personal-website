import React, { useState } from 'react';
import { experiences } from '../data/profileData';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="h-screen py-20 bg-dark-800">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-300">
            My professional journey as a software engineer and team lead.
          </p>
        </div>

        <div className="md:grid md:grid-cols-12 gap-8">
          {/* Tabs for mobile */}
          <div className="md:hidden mb-6">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(Number(e.target.value))}
              className="w-full p-3 bg-dark-700 text-gray-200 rounded-md border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {experiences.map((exp, index) => (
                <option key={exp.id} value={index}>
                  {exp.role} @ {exp.company}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs for desktop */}
          <div className="hidden md:flex md:col-span-3 flex-col">
            {experiences.map((exp, index) => (
              <button
                key={exp.id}
                className={`text-left px-4 py-3 border-l-2 transition-all ${
                  activeTab === index ? 'border-primary-500 text-primary-400 bg-dark-700' : 'border-dark-600 text-gray-400 hover:text-gray-300 hover:bg-dark-700'
                }`}
                onClick={() => setActiveTab(index)}
              >
                <span className="block font-medium">{exp.company}</span>
                <span className="block text-sm opacity-75">{exp.role}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-9">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeTab === index ? 1 : 0,
                  y: activeTab === index ? 0 : 20,
                  display: activeTab === index ? 'block' : 'none'
                }}
                transition={{ duration: 0.6 }}
                className="bg-dark-700 p-6 rounded-lg shadow-lg"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <div className="flex flex-wrap items-center text-gray-300 gap-x-2">
                    <span className="text-primary-400">{exp.company}</span>
                    <span className="text-sm">•</span>
                    <span>{exp.location}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{exp.period}</p>
                </div>
                
                <ul className="space-y-3 text-gray-300">
                  {exp.responsibilities.map((responsibility, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">▹</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;