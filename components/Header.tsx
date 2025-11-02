import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { HamburgerIcon } from './icons/HamburgerIcon';
import { CloseIcon } from './icons/CloseIcon';
import { LogoIcon } from './icons/LogoIcon';
import { useAppContext } from '../contexts/AppContext';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
  openAppointmentModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection, activeSection, openAppointmentModal }) => {
  const { state, setLanguage } = useAppContext();
  const { language } = state;
  const { header: translations } = state.siteData.content[language];
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#appointment') {
      openAppointmentModal();
    } else {
      scrollToSection(href);
    }
    setIsMobileMenuOpen(false);
  };
  
  const handleLangClick = (lang: Language) => {
    setLanguage(lang);
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <header className="bg-black bg-opacity-50 backdrop-blur-lg sticky top-0 z-40 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="Go to homepage"
            className="group flex items-center"
          >
            <LogoIcon className="h-12 w-auto transition-opacity duration-300 group-hover:opacity-80" />
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {translations.nav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-medium transition-colors duration-300 ${
                  activeSection === item.href
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center">
            {/* Desktop Language Switcher */}
            <div className="hidden md:flex items-center space-x-4">
              {(Object.keys(Language) as Array<keyof typeof Language>).map((langKey) => (
                <button
                  key={langKey}
                  onClick={() => setLanguage(Language[langKey])}
                  className={`px-2 py-1 text-sm font-semibold transition-colors duration-300 ${
                    language === Language[langKey]
                      ? 'text-yellow-400 border-b-2 border-yellow-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {langKey}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button and Dropdown */}
            <div className="md:hidden relative" ref={menuRef}>
              <button onClick={() => setIsMobileMenuOpen(o => !o)} aria-label="Toggle menu" className="text-gray-300 hover:text-yellow-400 transition-colors z-10 relative">
                 {isMobileMenuOpen ? <CloseIcon className="h-7 w-7" /> : <HamburgerIcon className="h-7 w-7" />}
              </button>

              {/* Mobile Menu Dropdown */}
              <div
                className={`absolute top-full mt-4 p-6 rounded-lg shadow-2xl bg-gray-900 border border-gray-700 w-64 transition-all duration-300 ease-in-out ${language === Language.AR ? 'left-0 origin-top-left' : 'right-0 origin-top-right'} ${
                  isMobileMenuOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 pointer-events-none'
                }`}
              >
                <nav className="flex flex-col space-y-4 mb-6">
                  {translations.nav.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`block text-lg font-medium transition-colors duration-300 ${
                        activeSection === item.href
                            ? 'text-yellow-400'
                            : 'text-gray-200 hover:text-yellow-400'
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                <div className="border-t border-gray-700 pt-4 flex items-center justify-around">
                  {(Object.keys(Language) as Array<keyof typeof Language>).map((langKey) => (
                    <button
                      key={langKey}
                      onClick={() => handleLangClick(Language[langKey])}
                      className={`px-3 py-1 text-base font-bold transition-colors duration-300 ${
                        language === Language[langKey]
                          ? 'text-yellow-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {langKey}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;