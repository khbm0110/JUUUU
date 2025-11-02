import React, { useContext, useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import Stats from './Stats';
import CurvedSeparator from './CurvedSeparator';

const About: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, about: translations } = state.siteData.content[state.language];
  const { aboutImageUrl } = state.siteData;

  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [hasAutoShown, setHasAutoShown] = useState(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    // Trigger the auto-show only once when it comes into view
    if (isInView && !hasAutoShown) {
      setHasAutoShown(true); // Mark as shown to prevent re-triggering
      setIsStatsVisible(true); // Show the stats

      // Set a timer to hide it after 5 seconds
      timerId = setTimeout(() => {
        setIsStatsVisible(false);
      }, 5000);
    }

    // Cleanup function to clear the timer if the component unmounts
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isInView, hasAutoShown]);

  return (
    <section ref={ref} id="about" className="bg-gray-900 relative pt-28 md:pt-40 pb-20 md:pb-24">
      <CurvedSeparator type="top" colorClass="text-gray-800" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* Text Content Column */}
          <div className={aboutImageUrl ? 'md:col-span-2' : 'md:col-span-3'}>
            <div className={`transition-all duration-1000 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-center md:text-left rtl:md:text-right`}>
              <h2 className="text-4xl font-bold font-heading mb-6 text-yellow-400">{`${translations.titlePrefix} ${lawyerName}`}</h2>
              <p className="text-gray-400 leading-relaxed mb-4">{translations.p1}</p>
              <p className="text-gray-400 leading-relaxed">{translations.p2}</p>
              
              {/* Our Values Section */}
              {translations.values && translations.values.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-700/50">
                  <h3 className="text-3xl font-semibold font-heading mb-6 text-white">{translations.valuesTitle}</h3>
                  <div className="space-y-6">
                    {translations.values.map((value) => (
                      <div key={value.title}>
                        <h4 className="text-xl font-bold text-yellow-400 flex items-center gap-3">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          <span>{value.title}</span>
                        </h4>
                        <p className="text-gray-400 mt-1 pl-8">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image Column */}
          {aboutImageUrl && (
            <div className={`md:col-span-1 flex items-start justify-center transition-all duration-1000 ease-out ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div 
                className="relative w-10/12 md:w-full group"
                onMouseEnter={() => setIsStatsVisible(true)}
                onMouseLeave={() => setIsStatsVisible(false)}
                onFocus={() => setIsStatsVisible(true)}
                onBlur={() => setIsStatsVisible(false)}
                tabIndex={0}
              >
                {/* Offset background frame */}
                <div className="absolute top-4 -left-4 rtl:left-auto rtl:-right-4 w-full h-full bg-gray-800 rounded-lg border-2 border-gray-700 transition-transform duration-500 ease-in-out group-hover:rotate-[-2deg]"></div>
                {/* Image */}
                <img 
                  src={aboutImageUrl} 
                  alt={translations.imageAlt} 
                  className="relative z-10 rounded-lg shadow-2xl w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  style={{ aspectRatio: '4/5' }}
                />
                <Stats isVisible={isStatsVisible} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;