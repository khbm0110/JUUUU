import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Language } from '../types';
import { LogoIcon } from './icons/LogoIcon';

const WhatsAppIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const LinkedInIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const FacebookIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
);

const Footer: React.FC = () => {
  const { state } = useContext(AppContext);
  const { footer: translations, header: headerTrans } = state.siteData.content[state.language];
  const { contact, socials } = state.siteData;
  const copyrightText = translations.copyright.replace('{lawyerName}', state.siteData.settings.copyrightName || state.siteData.content[state.language].lawyerName);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = headerTrans.nav.filter(l => l.href.startsWith('#') && l.href !== '#appointment');

  return (
    <footer className="relative pt-20 pb-8" style={{ backgroundColor: 'var(--navy-mid)' }}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider-gold"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Brand + Logo */}
          <div>
            <div className="mb-5">
              <LogoIcon className="h-10 w-auto" />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              {state.language === 'ar'
                ? 'مكتب حصار يقدم خدمات قانونية متخصصة بالدار البيضاء، المغرب.'
                : state.language === 'en'
                ? 'Cabinet Hassar provides specialized legal services in Casablanca, Morocco.'
                : 'Le Cabinet Hassar offre des services juridiques specialises a Casablanca, Maroc.'
              }
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer" style={{ color: '#25D366' }}>
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'var(--gold)' }}>
              {state.language === 'ar' ? 'روابط سريعة' : state.language === 'en' ? 'Quick Links' : 'Liens Rapides'}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm transition-colors duration-200 hover:pl-1" style={{ color: 'var(--text-muted)' }}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: 'var(--gold)' }}>
              {state.language === 'ar' ? 'معلومات الاتصال' : state.language === 'en' ? 'Contact Info' : 'Coordonnees'}
            </h4>
            <div className="space-y-3">
              <a href={`tel:+${contact.whatsappNumber}`} className="block text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }} dir="ltr">
                {"06 16 35 12 85"}
              </a>
              <a href={`mailto:${contact.email}`} className="block text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                {contact.email}
              </a>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{contact.address}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-8"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{copyrightText}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {state.language === 'ar' ? 'صمم بشغف' : state.language === 'en' ? 'Crafted with passion' : 'Concu avec passion'}
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`scroll-top glass ${showScrollTop ? 'visible' : ''}`}
        style={{ color: 'var(--gold)' }}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${contact.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" style={{ color: '#fff' }} />
      </a>
    </footer>
  );
};

export default Footer;
