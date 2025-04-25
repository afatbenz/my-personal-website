import React from 'react';
import { Link } from 'react-scroll';
import { Github as GitHub, Linkedin, Twitter, ArrowUp, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 pt-12 pb-8">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center">
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full mb-8 cursor-pointer transition-all"
          >
            <ArrowUp size={20} />
          </Link>

          <div className="flex space-x-6 mb-8">
            <a 
              href="https://github.com/afatbenz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GitHub size={22} />
            </a>
            <a 
              href="https://linkedin.com/in/mafatichulfuadi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a 
              href="https://instagram.com/mafatichulfuadi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Mafatichul Fuadi. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;