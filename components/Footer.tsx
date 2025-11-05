import React, { useContext } from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { AppContext } from '../contexts/AppContext';

const Footer: React.FC = () => {
  const { state } = useContext(AppContext);
  const { footer: translations, lawyerName } = state.siteData.content[state.language];
  const { contact, socials, settings } = state.siteData;
  
  const copyrightText = translations.copyright.replace('{lawyerName}', settings.copyrightName || lawyerName);

  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <div className="flex justify-center space-x-6 mb-4">
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visitez notre profil LinkedIn" className="p-2 rounded-full text-gray-400 hover:text-yellow-400 transition-colors duration-300">
            <LinkedInIcon className="h-6 w-6" />
          </a>
          <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visitez notre page Facebook" className="p-2 rounded-full text-gray-400 hover:text-yellow-400 transition-colors duration-300">
            <FacebookIcon className="h-6 w-6" />
          </a>
        </div>
        <p className="mb-4 text-sm text-gray-400">{contact.address}</p>
        <p className="mb-2">{copyrightText}</p>
        <div className="flex justify-center items-center gap-4 text-sm">
            <a href="/legal" className="hover:text-yellow-400 transition-colors duration-300">
              {translations.legal}
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;