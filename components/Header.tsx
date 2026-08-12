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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
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
  };

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'glass-heavy shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between" dir="ltr">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="Go to homepage"
            className="group flex items-center transition-all duration-300"
          >
            <LogoIcon className="h-11 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(201,168,76,0.3)]" />
          </a>
          
          <div className="flex items-center gap-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-x-1">
              {translations.nav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                    activeSection === item.href
                        ? 'text-[var(--gold)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.name}
                  {activeSection === item.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }}></span>
                  )}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              {/* Desktop Language Switcher */}
              <div className="hidden lg:flex items-center glass rounded-full p-1">
                {(Object.keys(Language) as Array<keyof typeof Language>).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => setLanguage(Language[langKey])}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                      language === Language[langKey]
                        ? 'text-[var(--navy-deep)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                    style={language === Language[langKey] ? { background: 'var(--gold)' } : {}}
                  >
                    {langKey}
                  </button>
                ))}
              </div>

              {/* CTA Button Desktop */}
              <button
                onClick={openAppointmentModal}
                className="hidden lg:inline-flex btn-primary text-sm py-2.5 px-5 cursor-pointer"
              >
                <span>{translations.nav.find(n => n.href === '#appointment')?.name || 'Rendez-vous'}</span>
              </button>

              {/* Mobile Menu Button */}
              <div className="lg:hidden relative" ref={menuRef}>
                <button 
                  onClick={() => setIsMobileMenuOpen(o => !o)} 
                  aria-label="Toggle menu" 
                  className="relative z-10 w-10 h-10 rounded-xl glass flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{ color: 'var(--gold)' }}
                >
                  {isMobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <HamburgerIcon className="h-5 w-5" />}
                </button>

                {/* Mobile Full-Screen Menu */}
                <div
                  className={`fixed inset-0 top-0 z-50 transition-all duration-500 ease-out ${
                    isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  style={{ backgroundColor: 'rgba(6,10,19,0.97)', backdropFilter: 'blur(20px)' }}
                >
                  <div className="flex flex-col items-center justify-center min-h-screen px-8">
                    {/* Close button */}
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="absolute top-5 right-5 w-10 h-10 rounded-xl glass flex items-center justify-center cursor-pointer"
                      style={{ color: 'var(--gold)' }}
                    >
                      <CloseIcon className="h-5 w-5" />
                    </button>

                    <nav className="flex flex-col items-center space-y-2 mb-12">
                      {translations.nav.map((item, index) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`text-2xl font-heading font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer ${
                            activeSection === item.href
                              ? 'text-gold-gradient'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                          style={{
                            transitionDelay: isMobileMenuOpen ? `${index * 60}ms` : '0ms',
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                          }}
                        >
                          {item.name}
                        </a>
                      ))}
                    </nav>

                    <div className="flex items-center glass rounded-full p-1">
                      {(Object.keys(Language) as Array<keyof typeof Language>).map((langKey) => (
                        <button
                          key={langKey}
                          onClick={() => handleLangClick(Language[langKey])}
                          className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-200 cursor-pointer ${
                            language === Language[langKey]
                              ? 'text-[var(--navy-deep)]'
                              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                          }`}
                          style={language === Language[langKey] ? { background: 'var(--gold)' } : {}}
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
        </div>
      </header>
    </>
  );
};

export default Header;
