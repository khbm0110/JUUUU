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
  // FIX: Filter navLinks to only include in-page hash links for scrolling.
  // This prevents errors when a non-scrollable link like '#appointment' is in the nav array.
  const navLinks = state.siteData.content[language].header.nav.filter(link => link.href.startsWith('#') && link.href !== '#appointment');

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const positionClasses = language === Language.AR ? 'left-4 md:left-8' : 'right-4 md:right-8';

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 ${positionClasses} z-40 hidden md:block`}>
      <div className="flex flex-col items-center space-y-4">
        {navLinks.map((link) => (
          <div key={link.href} className="group relative flex items-center">
            <button
              onClick={(e) => handleNavClick(e, link.href)}
              aria-label={`Go to ${link.name} section`}
              className="flex items-center justify-center"
            >
              <span
                className={`w-3 h-3 rounded-full bg-gray-600 transition-all duration-300 ease-in-out group-hover:bg-yellow-400 ${
                  activeSection === link.href ? '!bg-yellow-400 scale-150 shadow-lg shadow-yellow-500/50' : ''
                }`}
              ></span>
            </button>
             <div
              className={`absolute bg-gray-800 text-white text-sm rounded py-1 px-3 shadow-lg transition-all duration-300 ease-in-out transform scale-0 group-hover:scale-100 ${
                language === Language.AR ? 'right-full mr-4 origin-right' : 'left-full ml-4 origin-left'
              }`}
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