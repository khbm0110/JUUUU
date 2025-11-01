import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { FamilyIcon } from './icons/FamilyIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { useInView } from '../hooks/useInView';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import CurvedSeparator from './CurvedSeparator';

// FIX: Changed JSX.Element to React.ReactElement to resolve namespace error.
const iconMap: { [key: string]: React.ReactElement } = {
  briefcase: <BriefcaseIcon className="h-12 w-12 text-yellow-400 mb-4" />,
  building: <BuildingIcon className="h-12 w-12 text-yellow-400 mb-4" />,
  family: <FamilyIcon className="h-12 w-12 text-yellow-400 mb-4" />,
  scale: <ScaleIcon className="h-12 w-12 text-yellow-400 mb-4" />,
};

const Services: React.FC = () => {
  const { state } = useContext(AppContext);
  const translations = state.siteData.content[state.language].services;
  
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
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
    <section ref={ref} id="services" className="bg-black pt-20 md:pt-24 pb-24 md:pb-36 relative">
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
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 h-full flex flex-col items-center justify-center min-h-[280px]">
                      {iconMap[service.icon] || iconMap['briefcase']}
                      <h3 className="text-2xl font-bold font-heading text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400">{service.description}</p>
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
                className={`bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 h-full flex flex-col items-center justify-center text-center transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-yellow-500/20 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {iconMap[service.icon] || iconMap['briefcase']}
                <h3 className="text-2xl font-bold font-heading text-white mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <CurvedSeparator type="bottom" colorClass="text-gray-900" />
    </section>
  );
};

export default Services;