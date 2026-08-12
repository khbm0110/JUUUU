import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useInView } from '../hooks/useInView';

const Services: React.FC = () => {
  const { state } = useContext(AppContext);
  const translations = state.siteData.content[state.language].services;
  
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const services = translations.items;

  return (
    <section ref={ref} className="bg-black pt-20 md:pt-24 pb-20 md:pb-24 relative">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold font-heading mb-12 md:mb-16 text-white text-center transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          {translations.title}
        </h2>
      
        {/* Contained card for services */}
        <div className={`
          bg-gray-800 border border-gray-700/50 rounded-lg shadow-xl p-8 md:p-12
          transition-all duration-700 ease-out
          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-5">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`
                  flex items-center justify-start gap-3
                  transition-all duration-500 ease-out
                  ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5 rtl:translate-x-5'}
                `}
                style={{ transitionDelay: `${500 + index * 50}ms` }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-lg text-gray-200">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
