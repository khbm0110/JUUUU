import React, { useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import Stats from './Stats';
import CurvedSeparator from './CurvedSeparator';

const ThreeDWaveSeparator: React.FC = () => (
    <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0, transform: 'rotate(180deg)' }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none"
        className="relative block w-[calc(100%+1.3px)] h-[100px] md:h-[150px]"
      >
        <defs>
          <filter id="strong-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="0" dy="15" in="SourceAlpha" result="offOut" />
            <feGaussianBlur stdDeviation="8" in="offOut" result="blurOut" />
            <feComponentTransfer in="blurOut" result="opacOut">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="opacOut" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path 
          d="M0,160L60,181.3C120,203,240,245,360,250.7C480,256,600,224,720,197.3C840,171,960,149,1080,160C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          // Use gray-800, which is slightly lighter than the gray-900 background of the section, for better contrast.
          className="fill-current text-gray-800" 
          style={{filter: "url(#strong-shadow)"}}
        />
      </svg>
    </div>
);

const About: React.FC = () => {
  const { state } = useContext(AppContext);
  const { lawyerName, about: translations } = state.siteData.content[state.language];

  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  const imageUrl = "https://i.postimg.cc/WzkqbkNk/Generated-Image-November-02-2025-1-33PM-1.png";

  return (
    <section ref={ref} id="about" className="bg-gray-900 relative pt-28 md:pt-40 pb-32 md:pb-48">
      <ThreeDWaveSeparator />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div 
            className={`transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 rtl:translate-x-10'}`}
          >
            <div className="p-2 bg-gray-800/50 rounded-xl shadow-2xl border border-gray-700 transform md:-rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src={imageUrl} 
                alt={translations.imageAlt}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text Content Column */}
          <div className={`w-full text-center md:text-left rtl:md:text-right transition-all duration-1000 ease-out delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 rtl:-translate-x-10'}`}>
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