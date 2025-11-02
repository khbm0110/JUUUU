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
                  alt={lawyerName} 
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