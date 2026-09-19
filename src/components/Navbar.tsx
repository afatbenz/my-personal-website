import React, { useEffect, useState } from 'react';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps { activeSection: string; }

const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

const scrollToSection = (sectionId: string) => {
  if (!SECTION_IDS.includes(sectionId)) return;
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const navItems = SECTION_IDS.map((id) => ({ id, label: id[0].toUpperCase() + id.slice(1) }));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <nav className={`site-nav sticky inset-x-0 top-0 z-[9999] border-b transition-all duration-300 ${isScrolled || isMenuOpen ? 'site-nav-scrolled shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md' : 'backdrop-blur-sm'}`}>
      <div className="mx-auto flex h-[68px] w-[min(1200px,calc(100%-32px))] items-center justify-between">
        <button onClick={() => navigate('home')} className="font-mono text-base font-bold tracking-tight text-sky-700" aria-label="Go to home">&lt;MF /&gt;</button>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} className={`nav-link relative min-h-11 px-1 text-sm transition-colors ${activeSection === item.id ? 'nav-link-active font-semibold' : ''}`}>
              {item.label}
              {activeSection === item.id && <span className="absolute -bottom-[2px] left-1 right-1 h-0.5 rounded-full bg-sky-500" />}
            </button>
          ))}
          <a href="/Mafatichul_Fuadi-Software_Engineer.pdf" download="Mafatichul_Fuadi-Software_Engineer.pdf" className="resume-link inline-flex min-h-11 items-center gap-2 rounded-lg px-3.5 text-sm font-semibold transition-colors">
            <Download size={16} aria-hidden="true" /> Resume
          </a>
          <button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={themeLabel} title={themeLabel}>{isDark ? <Sun className="theme-icon" size={18} aria-hidden="true" /> : <Moon className="theme-icon" size={18} aria-hidden="true" />}</button>
        </div>

        <div className="flex items-center gap-2 md:hidden"><button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={themeLabel} title={themeLabel}>{isDark ? <Sun className="theme-icon" size={18} aria-hidden="true" /> : <Moon className="theme-icon" size={18} aria-hidden="true" />}</button><button className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button></div>
      </div>

      <div className={`mobile-menu border-t px-4 py-4 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="mx-auto flex max-w-[520px] flex-col gap-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} className={`mobile-nav-link min-h-11 rounded-lg px-3 text-left text-sm ${activeSection === item.id ? 'mobile-nav-link-active font-semibold' : ''}`}>{item.label}</button>
          ))}
          <a href="/Mafatichul_Fuadi-Software_Engineer.pdf" download="Mafatichul_Fuadi-Software_Engineer.pdf" className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white hover:bg-sky-700"><Download size={16} aria-hidden="true" /> Download Resume</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
