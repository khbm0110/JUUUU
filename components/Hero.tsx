

import React, { useState, useEffect, useContext } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { AppContext } from '../contexts/AppContext';
import AppointmentModal from './AppointmentModal';

const Hero: React.FC = () => {
  const { state } = useContext(AppContext);
  const { hero: translations } = state.siteData.content[state.language];
  const { contact: contactInfo, hero: heroData } = state.siteData;
  
  const [typedTitle, isTitleFinished] = useTypewriter(translations.title, 60);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <section className="h-screen flex items-center bg-gradient-to-r from-black via-gray-900 to-[#3a301f] text-white overflow-hidden">
        <div className="container mx-auto px-6 flex items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
            
            {/* Image Content */}
            <div className="md:w-5/12 hidden md:block">
              <div className="w-full max-h-[600px] rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700 aspect-[3/4]">
                <img 
                  src={heroData.imageUrl} 
                  alt="Maître Fatima Azzahraa Hassar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="md:w-7/12 text-center md:text-left rtl:md:text-right">
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
                <div
                 className={`flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 transition-opacity duration-500 ${showCta ? 'opacity-100' : 'opacity-0'}`}
               >
                  <a
                    href={`tel:${phoneNumber}`}
                    className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                  >
                    {translations.ctaCall}
                  </a>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  >
                    {translations.ctaAppointment}
                  </button>
               </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;