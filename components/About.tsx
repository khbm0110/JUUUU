import React, { useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import Stats from './Stats';
import CurvedSeparator from './CurvedSeparator';

const About: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, about: translations } = state.siteData.content[state.language];

  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="bg-gray-900 relative pt-24 md:pt-36 pb-24 md:pb-36">
      <CurvedSeparator type="top" colorClass="text-gray-900" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className={`w-full max-w-4xl text-center transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
