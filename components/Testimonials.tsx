import React, { useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { AppContext } from '../contexts/AppContext';

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
  const { testimonials: translations } = state.siteData.content[state.language];
  const { testimonials } = state.siteData;

  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  if (testimonials.length === 0) return null;

  return (
    <>
      <section ref={ref} className="bg-gray-900 pt-20 md:pt-24 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-4xl font-bold font-heading mb-16 text-white transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            {translations.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center transition-all duration-500 ease-out transform hover:-translate-y-2 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-400 my-4 italic">"{testimonial.comment}"</p>
                <h3 className="font-bold text-lg text-white">- {testimonial.name}</h3>
              </div>
            ))}
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