import React, { useContext } from 'react';
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

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const positionClasses = language === Language.AR ? 'left-4 md:left-8' : 'right-4 md:right-8';

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 ${positionClasses} z-40 hidden md:block`}>
      <div className="flex flex-col items-center gap-5">
        {navLinks.map((link) => (
          <div key={link.href} className="group relative flex items-center">
            <button
              onClick={(e) => handleNavClick(e, link.href)}
              aria-label={`Go to ${link.name} section`}
              className="flex items-center justify-center cursor-pointer"
            >
              <span
                className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out ${
                  activeSection === link.href 
                    ? 'scale-150' 
                    : 'hover:scale-125'
                }`}
                style={{ 
                  backgroundColor: activeSection === link.href ? '#C9A84C' : 'rgba(148,163,184,0.3)',
                  boxShadow: activeSection === link.href ? '0 0 12px rgba(201,168,76,0.4)' : 'none'
                }}
              ></span>
            </button>
             <div
              className={`absolute text-sm rounded-lg py-1.5 px-3 shadow-xl transition-all duration-300 ease-in-out transform scale-0 group-hover:scale-100 ${
                language === Language.AR ? 'right-full mr-4 origin-right' : 'left-full ml-4 origin-left'
              }`}
              style={{ backgroundColor: '#1A2332', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              {link.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
