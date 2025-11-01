import React, { useState, useEffect, useContext } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { AppContext } from '../contexts/AppContext';

interface HeroProps {
  scrollToContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToContact }) => {
  const { state } = useContext(AppContext);
  const { hero: translations, lawyerName } = state.siteData.content[state.language];
  const { about: aboutData } = state.siteData;
  
  const [typedTitle, isTitleFinished] = useTypewriter(translations.title, 60);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCta, setShowCta] = useState(false);

  // When title typing is finished, wait 500ms then show the subtitle
  useEffect(() => {
    if (isTitleFinished) {
      const subtitleTimer = setTimeout(() => setShowSubtitle(true), 500);
      return () => clearTimeout(subtitleTimer);
    }
     // Reset animations on text change
    setShowSubtitle(false);
    setShowCta(false);
  }, [isTitleFinished, translations.title]);

  // When subtitle is shown, wait 500ms then show the CTA button
  useEffect(() => {
    if (showSubtitle) {
      const ctaTimer = setTimeout(() => setShowCta(true), 500);
      return () => clearTimeout(ctaTimer);
    }
  }, [showSubtitle]);

  const subtitleWords = translations.subtitle.split(' ');

  return (
    <section className="h-screen flex items-center bg-gradient-to-r from-black via-gray-900 to-[#3a301f] text-white overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        
        {/* Left side: Image */}
        <div className={`w-full md:w-1/3 flex justify-center order-2 md:order-1 mt-8 md:mt-0 transition-opacity duration-1000 delay-500 ${isTitleFinished ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative w-64 h-96 md:w-72 md:h-[450px] rounded-lg shadow-2xl border-2 border-yellow-500/50 overflow-hidden group">
            <img 
              src={aboutData.profileImageUrl}
              alt={`Portrait de ${lawyerName}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
          </div>
        </div>
        
        {/* Right side: Text Content */}
        <div className="w-full md:w-2/3 md:text-left rtl:md:text-right text-center order-1 md:order-2">
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading leading-[1.1] tracking-wide mb-4 min-h-[120px] md:min-h-[135px]">
            {typedTitle}
            {!isTitleFinished && (
               <span className="border-r-2 border-yellow-400 cursor-blink ml-1" aria-hidden="true"></span>
            )}
          </h1>
          
          <div className="min-h-[70px] md:min-h-[80px]">
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl mx-auto md:mx-0">
              {subtitleWords.map((word, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-500 ease-out ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>
         
           <div className="min-h-[50px]">
            <button
              onClick={scrollToContact}
              className={`bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg ${showCta ? 'opacity-100' : 'opacity-0'}`}
            >
              {translations.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;