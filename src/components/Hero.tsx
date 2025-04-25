import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { ArrowDown } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';
import { personalInfo } from '../data/profileData';

const Hero: React.FC = () => {
  const fullName = personalInfo.name; // "Muhammad Nurdin Mafatichul Fuadi"
  const highlight = "fatich";

  // Temukan kata yang mengandung highlight
  const targetWord = fullName.split(' ').find(word => word.toLowerCase().includes(highlight)) || '';

  // Pisahkan jadi sebelum, highlight, dan sesudah
  const parts = targetWord
    ? [
        targetWord.slice(0, targetWord.toLowerCase().indexOf(highlight)),
        targetWord.slice(targetWord.toLowerCase().indexOf(highlight), targetWord.toLowerCase().indexOf(highlight) + highlight.length),
        targetWord.slice(targetWord.toLowerCase().indexOf(highlight) + highlight.length),
      ]
    : [];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-12 bg-gradient-to-b from-dark-900/90 to-dark-800/90">
      <ParticlesBackground  />
      
      <div className="container px-4 mx-auto z-10 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
        {fullName.split(' ').map((word, i) =>
          word === targetWord ? (
            <React.Fragment key={i}>
              {parts[0]}
              <span className="text-primary-400">{parts[1]}</span>
              {parts[2]}{' '}
            </React.Fragment>
          ) : (
            word + ' '
          )
        )}
      </h1>

        
        <div className="h-16 md:h-20 flex items-center justify-center">
          <TypeAnimation
            sequence={[
              'Software Engineer',
              2000,
              'Fullstack Developer',
              2000,
              'Backend Specialist',
              2000,
              'Development Team Lead',
              2000,
            ]}
            wrapper="h2"
            speed={50}
            repeat={Infinity}
            className="text-xl md:text-2xl font-mono text-secondary-400"
          />
        </div>
        
        <p className="text-lg max-w-xl text-gray-300 mb-8 animate-fade-in">
          Experienced Fullstack Developer specializing in backend development
          with PHP, JavaScript, and Go. Skilled in designing scalable microservices
          and optimizing database performance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            to="projects"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-all text-lg"
          >
            View My Work
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            className="bg-transparent hover:bg-dark-700 text-white border border-primary-600 px-6 py-3 rounded-md transition-all text-lg"
          >
            Contact Me
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            className="cursor-pointer"
          >
            <ArrowDown className="text-primary-400" size={28} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;