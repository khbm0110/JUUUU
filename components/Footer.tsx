import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const Footer: React.FC = () => {
  const { state } = useContext(AppContext);
  const { footer: translations, lawyerName } = state.siteData.content[state.language];
  const { contact, settings } = state.siteData;
  
  const copyrightText = translations.copyright.replace('{lawyerName}', settings.copyrightName || lawyerName);

  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <p className="mb-4 text-sm text-gray-400">{contact.address}</p>
        <p className="mb-2">{copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;
