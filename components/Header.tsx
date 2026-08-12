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
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Track scroll for header background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#0B1120]/90 backdrop-blur-xl border-[rgba(201,168,76,0.1)] shadow-lg'
          : 'bg-transparent backdrop-blur-md border-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between" dir="ltr">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="Go to homepage"
            className="group flex items-center"
          >
            <LogoIcon className="h-12 w-auto transition-all duration-300 group-hover:opacity-80 group-hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]" />
          </a>
          
          {/* Wrapper for right-aligned items */}
          <div className="flex items-center gap-x-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-x-8">
              {translations.nav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-medium text-[15px] tracking-wide transition-colors duration-200 cursor-pointer ${
                    activeSection === item.href
                        ? 'text-[#C9A84C]'
                        : 'text-[#94A3B8] hover:text-[#C9A84C]'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center">
              {/* Desktop Language Switcher */}
              <div className="hidden md:flex items-center space-x-1">
                {(Object.keys(Language) as Array<keyof typeof Language>).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => setLanguage(Language[langKey])}
                    className={`px-3 py-1.5 text-sm font-semibold rounded transition-all duration-200 cursor-pointer ${
                      language === Language[langKey]
                        ? 'text-[#C9A84C] bg-[rgba(201,168,76,0.1)]'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {langKey}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button and Dropdown */}
              <div className="md:hidden relative" ref={menuRef}>
                <button onClick={() => setIsMobileMenuOpen(o => !o)} aria-label="Toggle menu" className="text-[#94A3B8] hover:text-[#C9A84C] transition-colors z-10 relative cursor-pointer">
                   {isMobileMenuOpen ? <CloseIcon className="h-7 w-7" /> : <HamburgerIcon className="h-7 w-7" />}
                </button>

                {/* Mobile Menu Dropdown */}
                <div
                  className={`absolute top-full mt-4 p-6 rounded-xl shadow-2xl bg-[#0F172A] border border-[rgba(201,168,76,0.15)] w-72 transition-all duration-300 ease-in-out right-0 origin-top-right ${
                    isMobileMenuOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 pointer-events-none'
                  }`}
                >
                  <nav className="flex flex-col space-y-1 mb-6">
                    {translations.nav.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`block text-lg font-medium py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
                          activeSection === item.href
                              ? 'text-[#C9A84C] bg-[rgba(201,168,76,0.08)]'
                              : 'text-[#CBD5E1] hover:text-[#C9A84C] hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>

                  <div className="border-t border-[rgba(201,168,76,0.1)] pt-4 flex items-center justify-around">
                    {(Object.keys(Language) as Array<keyof typeof Language>).map((langKey) => (
                      <button
                        key={langKey}
                        onClick={() => handleLangClick(Language[langKey])}
                        className={`px-4 py-2 text-base font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                          language === Language[langKey]
                            ? 'text-[#C9A84C] bg-[rgba(201,168,76,0.1)]'
                            : 'text-[#94A3B8] hover:text-white'
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
        </div>
      </header>
    </>
  );
};

export default Header;
