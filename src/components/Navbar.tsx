import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

const scrollToSection = (sectionId: string) => {
  const index = SECTION_IDS.indexOf(sectionId);
  if (index < 0) return;

  if (index === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const vh = window.innerHeight;
  let scrollTarget = vh;
  for (let i = 1; i < index; i++) {
    const el = document.getElementById(SECTION_IDS[i]);
    scrollTarget += el?.offsetHeight ?? vh;
  }

  window.scrollTo({
    top: scrollTarget,
    behavior: 'smooth',
  });
};

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${
        isScrolled ? 'bg-dark-900 bg-opacity-90 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-6 md:px-12 lg:px-20 mx-auto flex justify-between items-center">
        <button
          onClick={() => scrollToSection('home')}
          className="font-mono text-lg font-medium cursor-pointer text-primary-400"
        >
          &lt;MF /&gt;
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex cursor-pointer flex-col items-center transition-all hover:text-primary-400 mt-1 ${
                activeSection === item.id ? 'font-medium text-white' : 'text-gray-300'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
          <a
            href="/M.N. Mafatichul Fuadi - Software Engineer.pdf"
            className="flex items-center gap-2 bg-transparent hover:bg-white/5 border-white text-sm border-[1px] text-white px-4 py-2 rounded-xl transition-all"
            download="M.N. Mafatichul Fuadi - Software Engineer.pdf"
            rel="noopener noreferrer"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-dark-800 bg-opacity-95 z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                closeMenu();
              }}
              className={`text-xl cursor-pointer transition-all hover:text-primary-400 ${
                activeSection === item.id ? 'text-primary-400 font-medium' : 'text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/Mafatichul_Fuadi-Software_Engineer.pdf"
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={18} />
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
