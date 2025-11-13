import React, { useContext, useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.175 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.25 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  const { state } = useContext(AppContext);
  const { language } = state;
  const { testimonials: translations } = state.siteData.content[state.language];
  const { testimonials } = state.siteData;

  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        ),
      5000 // Autoplay interval
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, testimonials.length]);

  const handleManualNavigation = (index: number) => {
    resetTimeout();
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;
  
  const prevLabel = language === 'ar' ? 'الشهادة السابقة' : language === 'en' ? 'Previous testimonial' : 'Témoignage précédent';
  const nextLabel = language === 'ar' ? 'الشهادة التالية' : language === 'en' ? 'Next testimonial' : 'Témoignage suivant';


  return (
    <>
      <section ref={ref} className="bg-gray-900 pt-20 md:pt-24 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-4xl font-bold font-heading mb-16 text-white transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            {translations.title}
          </h2>
          {/* Desktop Grid View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center transition-all duration-500 ease-out transform hover:-translate-y-2 h-full flex flex-col justify-center ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-300 my-4 italic">"{testimonial.comment}"</p>
                <h3 className="font-bold text-lg text-white">- {testimonial.name}</h3>
              </div>
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden relative pb-10">
            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0 w-full px-4"
                  >
                     <div
                        className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center h-full flex flex-col justify-center min-h-[280px]"
                      >
                        <StarRating rating={testimonial.rating} />
                        <p className="text-gray-300 my-4 italic">"{testimonial.comment}"</p>
                        <h3 className="font-bold text-lg text-white">- {testimonial.name}</h3>
                      </div>
                  </div>
                ))}
              </div>
            </div>

            {testimonials.length > 1 && (
              <>
                <button
                  onClick={() => handleManualNavigation(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
                  aria-label={prevLabel}
                  className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-white"/>
                </button>
                <button
                  onClick={() => handleManualNavigation(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
                  aria-label={nextLabel}
                  className="absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6 text-white"/>
                </button>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleManualNavigation(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentIndex === index ? 'bg-yellow-400' : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <div className="bg-gray-900 py-10 md:py-12">
        <div className="container mx-auto px-6">
            <hr className="border-t border-gray-700" />
        </div>
      </div>
    </>
  );
};

export default Testimonials;