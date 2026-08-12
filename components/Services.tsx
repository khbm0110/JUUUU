import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useInView } from '../hooks/useInView';

const Services: React.FC = () => {
  const { state } = useContext(AppContext);
  const translations = state.siteData.content[state.language].services;
  
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const services = translations.items;

  // Service icons for visual richness (SVG scale/justice symbols)
  const getServiceIcon = (index: number) => {
    const icons = [
      // Scale of Justice
      <svg key="scale" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>,
      // Building / Institution
      <svg key="building" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>,
      // Family
      <svg key="family" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
      // Briefcase
      <svg key="brief" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
    ];
    return icons[index % icons.length];
  };

  return (
    <section ref={ref} className="pt-24 md:pt-32 pb-24 md:pb-32 relative" style={{ backgroundColor: '#0B1120' }}>
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent"></div>

      <div className="container mx-auto px-6">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-center transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#C9A84C' }}>
          {translations.title}
        </h2>
        <p className={`text-center mb-14 md:mb-20 max-w-2xl mx-auto transition-opacity duration-1000 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ color: '#94A3B8' }}>
          {state.language === 'ar' 
            ? 'نقدم لكم مجموعة شاملة من الخدمات القانونية المتخصصة'
            : state.language === 'en'
            ? 'We provide a comprehensive range of specialized legal services'
            : 'Nous vous offrons un eventail complet de services juridiques specialises'
          }
        </p>
      
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`
                group p-6 md:p-7 rounded-xl transition-all duration-500 ease-out cursor-default
                gold-border-glow
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ 
                backgroundColor: '#1A2332',
                transitionDelay: `${200 + index * 60}ms` 
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}
                >
                  {getServiceIcon(index)}
                </div>
                <span className="font-semibold text-lg" style={{ color: '#E2E8F0' }}>{service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
