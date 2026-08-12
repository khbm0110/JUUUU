import React, { useContext, useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? '' : 'opacity-30'}`} fill="#C9A84C" viewBox="0 0 20 20">
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
      5000
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
  
  const prevLabel = language === 'ar' ? 'الشهادة السابقة' : language === 'en' ? 'Previous testimonial' : 'Temoignage precedent';
  const nextLabel = language === 'ar' ? 'الشهادة التالية' : language === 'en' ? 'Next testimonial' : 'Temoignage suivant';

  return (
    <>
      <section ref={ref} className="pt-24 md:pt-32 pb-16 overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        {/* Decorative top line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent"></div>
        
        <div className="container mx-auto px-6 text-center">
          <span className={`inline-block uppercase tracking-[0.25em] text-sm font-semibold mb-4 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#C9A84C' }}>
            {state.language === 'ar' ? 'آراء العملاء' : state.language === 'en' ? 'Testimonials' : 'Temoignages'}
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-16 transition-opacity duration-1000 delay-100 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#F8FAFC' }}>
            {translations.title}
          </h2>

          {/* Desktop Grid View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`p-8 rounded-xl text-center transition-all duration-500 ease-out transform hover:-translate-y-1 h-full flex flex-col justify-center relative ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ 
                  backgroundColor: '#1A2332',
                  border: '1px solid rgba(201,168,76,0.1)',
                  transitionDelay: `${200 + index * 150}ms`
                }}
              >
                {/* Quote mark */}
                <div className="absolute top-6 left-6 text-6xl leading-none opacity-10" style={{ color: '#C9A84C', fontFamily: 'Georgia, serif' }}>
                  &ldquo;
                </div>
                <div className="relative z-10">
                  <StarRating rating={testimonial.rating} />
                  <p className="text-lg my-5 italic leading-relaxed" style={{ color: '#CBD5E1' }}>&ldquo;{testimonial.comment}&rdquo;</p>
                  <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: 'rgba(201,168,76,0.3)' }}></div>
                  <h3 className="font-bold text-lg" style={{ color: '#F8FAFC' }}>- {testimonial.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden relative pb-12">
            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="flex-shrink-0 w-full px-4">
                     <div className="p-8 rounded-xl text-center h-full flex flex-col justify-center min-h-[300px] relative" style={{ backgroundColor: '#1A2332', border: '1px solid rgba(201,168,76,0.1)' }}>
                      <div className="absolute top-6 left-6 text-5xl leading-none opacity-10" style={{ color: '#C9A84C', fontFamily: 'Georgia, serif' }}>&ldquo;</div>
                      <div className="relative z-10">
                        <StarRating rating={testimonial.rating} />
                        <p className="text-lg my-5 italic leading-relaxed" style={{ color: '#CBD5E1' }}>&ldquo;{testimonial.comment}&rdquo;</p>
                        <div className="w-10 h-px mx-auto mb-4" style={{ backgroundColor: 'rgba(201,168,76,0.3)' }}></div>
                        <h3 className="font-bold text-lg" style={{ color: '#F8FAFC' }}>- {testimonial.name}</h3>
                      </div>
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
                  className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 rounded-full transition-colors cursor-pointer"
                  style={{ backgroundColor: 'rgba(11,17,32,0.6)', color: '#C9A84C' }}
                >
                  <ChevronLeftIcon className="w-6 h-6"/>
                </button>
                <button
                  onClick={() => handleManualNavigation(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
                  aria-label={nextLabel}
                  className="absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 rounded-full transition-colors cursor-pointer"
                  style={{ backgroundColor: 'rgba(11,17,32,0.6)', color: '#C9A84C' }}
                >
                  <ChevronRightIcon className="w-6 h-6"/>
                </button>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleManualNavigation(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                        currentIndex === index ? 'scale-125' : ''
                      }`}
                      style={{ backgroundColor: currentIndex === index ? '#C9A84C' : 'rgba(148,163,184,0.4)' }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <div style={{ backgroundColor: '#0F172A' }} className="py-10 md:py-12">
        <div className="container mx-auto px-6">
            <hr style={{ borderColor: 'rgba(201,168,76,0.1)' }} />
        </div>
      </div>
    </>
  );
};

export default Testimonials;
