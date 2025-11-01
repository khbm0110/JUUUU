import React, { useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import Stats from './Stats';
import CurvedSeparator from './CurvedSeparator';

const About: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, about: translations } = state.siteData.content[state.language];
  const { about: aboutData } = state.siteData;

  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="bg-gray-900 relative pt-28 md:pt-48 pb-28 md:pb-48">
      <CurvedSeparator type="top" colorClass="text-gray-900" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className={`md:w-1/3 flex justify-center transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 rtl:translate-x-10'}`}>
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl border-4 border-gray-700">
              <img 
                src={aboutData.profileImageUrl}
                alt={`Portrait de ${lawyerName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className={`md:w-2/3 text-center md:text-left rtl:md:text-right transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 rtl:-translate-x-10'}`}>
            <h2 className="text-4xl font-bold font-heading mb-6 text-yellow-400">{`${translations.titlePrefix} ${lawyerName}`}</h2>
            <p className="text-gray-400 leading-relaxed mb-4">{translations.p1}</p>
            <p className="text-gray-400 leading-relaxed">{translations.p2}</p>
          </div>
        </div>
        <Stats />
      </div>
      <CurvedSeparator type="bottom" colorClass="text-black" />
    </section>
  );
};

export default About;
