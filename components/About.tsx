import React, { useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import CurvedSeparator from './CurvedSeparator';

const About: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, about: translations } = state.siteData.content[state.language];
  const { aboutImageUrl } = state.siteData;

  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="relative pt-28 md:pt-40 pb-24 md:pb-32" style={{ backgroundColor: '#0F172A' }}>
      <CurvedSeparator type="top" colorClass="text-[#0B1120]" />
      <div className="container mx-auto px-6">
        
        {/* Section Label */}
        <div className={`text-center mb-4 transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="uppercase tracking-[0.25em] text-sm font-semibold" style={{ color: '#C9A84C' }}>
            {state.language === 'ar' ? 'تعرفوا علينا' : state.language === 'en' ? 'Who We Are' : 'Qui Sommes-Nous'}
          </span>
        </div>

        {/* Title */}
        <div className={`transition-all duration-1000 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-center mb-14 md:mb-16`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading" style={{ color: '#F8FAFC' }}>
              {`${translations.titlePrefix} `}<span style={{ color: '#C9A84C' }}>{lawyerName}</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* Text Content Column */}
          <div className={aboutImageUrl ? 'md:col-span-2 order-last md:order-first' : 'md:col-span-3'}>
            <div className={`transition-all duration-1000 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg leading-relaxed mb-5" style={{ color: '#CBD5E1' }}>{translations.p1}</p>
              <p className="text-lg leading-relaxed" style={{ color: '#CBD5E1' }}>{translations.p2}</p>
              
              {/* Our Values Section */}
              {translations.values && translations.values.length > 0 && (
                <div className="mt-12 pt-10" style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                  <h3 className="text-2xl md:text-3xl font-semibold font-heading mb-8" style={{ color: '#F8FAFC' }}>{translations.valuesTitle}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {translations.values.map((value, index) => (
                      <div 
                        key={value.title}
                        className={`p-6 rounded-xl transition-all duration-500 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                        style={{ 
                          backgroundColor: 'rgba(201,168,76,0.05)',
                          border: '1px solid rgba(201,168,76,0.1)',
                          transitionDelay: `${500 + index * 100}ms`
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#C9A84C' }} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold mb-2" style={{ color: '#C9A84C' }}>{value.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image Column */}
          {aboutImageUrl && (
            <div className={`md:col-span-1 flex items-start justify-center transition-all duration-1000 ease-out delay-300 order-first md:order-last ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="w-10/12 md:w-full group">
                <div className="relative">
                  {/* Decorative frame */}
                  <div className="absolute -inset-3 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" style={{ border: '1px solid rgba(201,168,76,0.3)' }}></div>
                  <img 
                    src={aboutImageUrl} 
                    alt={lawyerName} 
                    className="relative rounded-lg shadow-2xl w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-[1.02]"
                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;