import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const Footer: React.FC = () => {
  const { state } = useContext(AppContext);
  const { footer: translations, lawyerName } = state.siteData.content[state.language];
  const { contact, settings } = state.siteData;
  
  const copyrightText = translations.copyright.replace('{lawyerName}', settings.copyrightName || lawyerName);

  return (
    <footer style={{ backgroundColor: '#0B1120' }} className="border-t py-10">
      <div className="container mx-auto px-6">
        {/* Top row with gold line accent */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          {/* Address */}
          <p className="text-sm text-center md:text-left" style={{ color: '#94A3B8' }}>{contact.address}</p>
          
          {/* Contact info */}
          <div className="flex items-center gap-6 text-sm">
            <a href={`tel:+${contact.whatsappNumber}`} className="transition-colors hover:opacity-80" style={{ color: '#C9A84C' }} dir="ltr">06 16 35 12 85</a>
            <span style={{ color: 'rgba(148,163,184,0.3)' }}>|</span>
            <a href={`mailto:${contact.email}`} className="transition-colors hover:opacity-80" style={{ color: '#C9A84C' }}>{contact.email}</a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm" style={{ color: '#64748B' }}>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;