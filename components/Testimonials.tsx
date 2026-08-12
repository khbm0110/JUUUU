import React, { useContext, useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center gap-1.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 transition-all duration-300 ${i < rating ? 'scale-100' : 'scale-75 opacity-30'}`} fill="#C9A84C" viewBox="0 0 20 20">
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

  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (testimonials.length <= 1) return;
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1)),
      5000
    );
    return () => resetTimeout();
  }, [currentIndex, testimonials.length]);

  const handleManualNavigation = (index: number) => {
    resetTimeout();
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;
  
  const prevLabel = language === 'ar' ? 'الشهادة السابقة' : language === 'en' ? 'Previous' : 'Precedent';
  const nextLabel = language === 'ar' ? 'الشهادة التالية' : language === 'en' ? 'Next' : 'Suivant';

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: 'var(--navy-mid)' }}>
      {/* Mesh background */}
      <div className="absolute inset-0 bg-mesh"></div>
      <div className="deco-ring" style={{ width: '500px', height: '500px', top: '-200px', right: '-150px' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="section-badge">
              {language === 'ar' ? 'آراء العملاء' : language === 'en' ? 'Testimonials' : 'Temoignages'}
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-5 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ color: 'var(--text-primary)' }}>
            {translations.title}
          </h2>
          <div className={`w-16 h-0.5 mx-auto transition-all duration-700 delay-200 ${isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ background: 'var(--gold)' }}></div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`glass-card rounded-2xl p-8 relative group transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Large decorative quote */}
              <div className="absolute top-6 right-8 text-7xl leading-none opacity-[0.06] pointer-events-none select-none" style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}>
                &ldquo;
              </div>
              
              <div className="relative z-10">
                <StarRating rating={testimonial.rating} />
                
                <p className="text-base my-6 leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                
                <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ 
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
                    color: 'var(--gold)'
                  }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{testimonial.name}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {language === 'ar' ? 'عميل' : language === 'en' ? 'Client' : 'Client'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative pb-14">
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0 w-full px-2">
                  <div className="glass-card rounded-2xl p-8 relative">
                    <div className="absolute top-6 right-6 text-6xl leading-none opacity-[0.06] pointer-events-none select-none" style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}>&ldquo;</div>
                    <div className="relative z-10">
                      <StarRating rating={testimonial.rating} />
                      <p className="text-base my-5 leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>&ldquo;{testimonial.comment}&rdquo;</p>
                      <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs" style={{ 
                          background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
                          color: 'var(--gold)'
                        }}>
                          {testimonial.name.charAt(0)}
                        </div>
                        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{testimonial.name}</h3>
                      </div>
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
                className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2.5 rounded-full glass cursor-pointer transition-all hover:scale-110"
              >
                <ChevronLeftIcon className="w-5 h-5" style={{ color: 'var(--gold)' }} />
              </button>
              <button
                onClick={() => handleManualNavigation(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
                aria-label={nextLabel}
                className="absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2.5 rounded-full glass cursor-pointer transition-all hover:scale-110"
              >
                <ChevronRightIcon className="w-5 h-5" style={{ color: 'var(--gold)' }} />
              </button>
              {/* Dots */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleManualNavigation(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === index ? 'w-6' : 'w-2'
                    }`}
                    style={{ backgroundColor: currentIndex === index ? 'var(--gold)' : 'rgba(148,163,184,0.3)' }}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
