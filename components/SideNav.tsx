import React, { useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { AppContext } from '../contexts/AppContext';

interface SideNavProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ activeSection, scrollToSection }) => {
  const { state } = useContext(AppContext);
  const { language } = state;
  const navLinks = state.siteData.content[language].header.nav.filter(link => link.href.startsWith('#') && link.href !== '#appointment');
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeIndex = navLinks.findIndex(l => l.href === activeSection);
  const progressPercent = navLinks.length > 1 ? (activeIndex / (navLinks.length - 1)) * 100 : 0;

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const positionClasses = language === Language.AR ? 'left-5 md:left-8' : 'right-5 md:right-8';

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 ${positionClasses} z-40 hidden md:flex flex-col items-center`}
      style={{ gap: '24px' }}
    >
      {/* Vertical track */}
      <div className="absolute w-px h-full" style={{ background: 'rgba(201,168,76,0.1)' }}>
        {/* Progress fill */}
        <div 
          className="w-full transition-all duration-500 ease-out"
          style={{ 
            height: `${Math.max(8, progressPercent)}%`,
            background: 'linear-gradient(180deg, var(--gold-dark), var(--gold))',
            boxShadow: '0 0 8px rgba(201,168,76,0.3)',
            transition: 'height 500ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        ></div>
      </div>

      {/* Dots */}
      {navLinks.map((link, index) => {
        const isActive = activeSection === link.href;
        return (
          <div key={link.href} className="group relative flex items-center">
            <button
              onClick={(e) => handleNavClick(e, link.href)}
              aria-label={`Go to ${link.name} section`}
              className="flex items-center justify-center cursor-pointer relative z-10"
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'w-3 h-3 pulse-gold'
                    : 'w-2 h-2 hover:w-2.5 hover:h-2.5'
                }`}
                style={{ 
                  backgroundColor: isActive ? 'var(--gold)' : 'rgba(148,163,184,0.3)',
                }}
              ></span>
            </button>
            {/* Tooltip */}
            <div
              className={`absolute text-xs font-medium rounded-lg py-1.5 px-3 shadow-xl transition-all duration-300 whitespace-nowrap pointer-events-none ${
                language === Language.AR 
                  ? 'right-full mr-4 origin-right' 
                  : 'left-full ml-4 origin-left'
              } ${
                isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
              }`}
              style={{ 
                backgroundColor: 'var(--navy-card)', 
                color: isActive ? 'var(--gold)' : 'var(--text-secondary)', 
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {link.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideNav;