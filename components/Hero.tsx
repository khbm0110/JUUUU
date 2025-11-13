

import React, { useState, useEffect, useContext } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { AppContext } from '../contexts/AppContext';

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

interface HeroProps {
  openAppointmentModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ openAppointmentModal }) => {
  const { state } = useContext(AppContext);
  const { hero: translations } = state.siteData.content[state.language];
  const { contact: contactInfo, heroImageUrl } = state.siteData;
  
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
  const phoneNumber = contactInfo.whatsappNumber;
  const displayNumber = "06 16 35 12 85";

  return (
    <>
      <section 
        className="relative bg-black py-24 md:py-40 flex items-center text-white overflow-hidden"
      >
        {heroImageUrl && (
            <img
                src={heroImageUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center hero-bg-zoom"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                aria-hidden="true"
            />
        )}
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <div className="container mx-auto px-6 flex items-center relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            
            {/* Text Content */}
            <div className="md:w-10/12 lg:w-8/12 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold font-heading leading-[1.1] tracking-wide mb-4 min-h-[120px] md:min-h-[135px]">
                {typedTitle}
                {!isTitleFinished && (
                   <span className="border-r-2 border-yellow-400 cursor-blink ml-1" aria-hidden="true"></span>
                )}
              </h1>
              
              <div className="min-h-[70px] md:min-h-[80px]">
                <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl mx-auto">
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
                <div
                 className={`max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-500 ${showCta ? 'opacity-100' : 'opacity-0'}`}
               >
                  <a
                    href={`tel:+${phoneNumber}`}
                    className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    dir="ltr"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    <span>{displayNumber}</span>
                  </a>
                  <button
                    onClick={openAppointmentModal}
                    className="bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    {translations.ctaAppointment}
                  </button>
               </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;