import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { FamilyIcon } from './icons/FamilyIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { useInView } from '../hooks/useInView';
import { BanknotesIcon } from './icons/BanknotesIcon';
import { StarIcon } from './icons/StarIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';

// Make icons responsive for smaller screens
const iconMap: { [key: string]: React.ReactElement } = {
  briefcase: <BriefcaseIcon className="h-10 w-10 md:h-12 md:w-12 text-yellow-400 mb-4" />,
  building: <BuildingIcon className="h-10 w-10 md:h-12 md:w-12 text-yellow-400 mb-4" />,
  family: <FamilyIcon className="h-10 w-10 md:h-12 md:w-12 text-yellow-400 mb-4" />,
  scale: <ScaleIcon className="h-10 w-10 md:h-12 md:w-12 text-yellow-400 mb-4" />,
  banknotes: <BanknotesIcon className="h-10 w-10 md:h-12 md:w-12 text-yellow-400 mb-4" />,
  star: <StarIcon className="h-10 w-10 md:h-12 md:w-12 text-yellow-400 mb-4" />,
  userGroup: <UserGroupIcon className="h-10 w-10 md:h-12 md:w-12 text-yellow-400 mb-4" />,
};

const CheckmarkIcon = () => (
  <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const Services: React.FC = () => {
  const { state } = useContext(AppContext);
  const translations = state.siteData.content[state.language].services;
  
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const services = translations.items;

  return (
    <section ref={ref} className="bg-black pt-20 md:pt-24 pb-20 md:pb-24 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className={`text-4xl font-bold font-heading mb-16 text-white transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          {translations.title}
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg border border-gray-700 h-full flex flex-col items-center justify-start text-center transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-yellow-500/20 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {iconMap[service.icon] || iconMap['briefcase']}
              <h3 className="text-lg md:text-xl font-bold font-heading text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-4 min-h-[40px] px-1">{service.description}</p>
              {service.subServices && (
                <ul className="text-left rtl:text-right space-y-2 text-gray-300 text-sm w-full pt-4 border-t border-gray-700 mt-auto">
                  {service.subServices.map((sub, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckmarkIcon />
                      <span className="flex-1">{sub}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;