import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { FamilyIcon } from './icons/FamilyIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { useInView } from '../hooks/useInView';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { BanknotesIcon } from './icons/BanknotesIcon';
import { StarIcon } from './icons/StarIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';

// FIX: Changed JSX.Element to React.ReactElement to resolve namespace error.
const iconMap: { [key: string]: React.ReactElement } = {
  briefcase: <BriefcaseIcon className="h-12 w-12 text-yellow-400 mb-4" />,
  building: <BuildingIcon className="h-12 w-12 text-yellow-400 mb-4" />,
  family: <FamilyIcon className="h-12 w-12 text-yellow-400 mb-4" />,
  scale: <ScaleIcon className="h-12 w-12 text-yellow-400 mb-4" />,
  banknotes: <BanknotesIcon className="h-12 w-12 text-yellow-400 mb-4" />,
  star: <StarIcon className="h-12 w-12 text-yellow-400 mb-4" />,
  userGroup: <UserGroupIcon className="h-12 w-12 text-yellow-400 mb-4" />,
};

const CheckmarkIcon = () => (
  <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const Services: React.FC = () => {
  const { state } = useContext(AppContext);
  const translations = state.siteData.content[state.language].services;
  
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  // Carousel-specific state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const services = translations.items;

  useEffect(() => {
    // Client-side check for screen size to avoid SSR issues with `window`
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile(); // Check on initial mount
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // --- Carousel Logic ---
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (services.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === services.length - 1 ? 0 : prevIndex + 1));
  }, [services.length]);

  const prevSlide = () => {
    if (services.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1));
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Autoplay effect for mobile carousel
  useEffect(() => {
    // Only run autoplay on mobile devices
    if (isMobile) {
      resetTimeout();
      if (isInView && !isPaused && services.length > 1) {
        timeoutRef.current = setTimeout(nextSlide, 4000); // Change slide every 4 seconds
      }
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isInView, isPaused, nextSlide, resetTimeout, isMobile, services.length]);


  return (
    <section ref={ref} className="bg-black pt-20 md:pt-24 pb-20 md:pb-24 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className={`text-4xl font-bold font-heading mb-16 text-white transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          {translations.title}
        </h2>
        
        {isMobile ? (
          // MOBILE VIEW: Carousel
          <div 
            className="max-w-2xl mx-auto relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform ease-in-out duration-500" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {services.map((service) => (
                  <div key={service.id} className="flex-shrink-0 w-full px-2">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 h-full flex flex-col items-center justify-start min-h-[400px]">
                      {iconMap[service.icon] || iconMap['briefcase']}
                      <h3 className="text-2xl font-bold font-heading text-white mb-2">{service.title}</h3>
                      <p className="text-gray-400 mb-6 min-h-[50px]">{service.description}</p>
                      {service.subServices && (
                        <ul className="text-left rtl:text-right space-y-3 text-gray-300 w-full pt-4 border-t border-gray-700 mt-auto">
                          {service.subServices.map((sub, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <CheckmarkIcon />
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {services.length > 1 && <>
              {/* Controls */}
              <button 
                onClick={prevSlide}
                className="absolute top-1/2 -translate-y-1/2 left-0 transform bg-gray-700/50 hover:bg-gray-600/80 p-2 rounded-full text-white transition-all z-10"
                aria-label="Previous service"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 right-0 transform bg-gray-700/50 hover:bg-gray-600/80 p-2 rounded-full text-white transition-all z-10"
                aria-label="Next service"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>

              {/* Dots */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-yellow-400 scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
                    aria-label={`Go to service ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>}
          </div>
        ) : (
          // DESKTOP VIEW: Static Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 h-full flex flex-col items-center justify-start text-center transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-yellow-500/20 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {iconMap[service.icon] || iconMap['briefcase']}
                <h3 className="text-xl font-bold font-heading text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-6 min-h-[40px] px-2">{service.description}</p>
                {service.subServices && (
                  <ul className="text-left rtl:text-right space-y-2 text-gray-300 text-sm w-full pt-4 border-t border-gray-700 mt-auto">
                    {service.subServices.map((sub, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckmarkIcon />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;