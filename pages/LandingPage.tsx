import React, { useRef, useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SideNav from '../components/SideNav';
import Testimonials from '../components/Testimonials';
import { AppContext } from '../contexts/AppContext';
import { Language } from '../types';

const LandingPage: React.FC = () => {
  const { state } = useContext(AppContext);
  const { language } = state;
  const [activeSection, setActiveSection] = useState<string>('#hero');
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const sectionRefs = {
    '#hero': heroRef,
    '#about': aboutRef,
    '#services': servicesRef,
    '#testimonials': testimonialsRef,
    '#contact': contactRef,
  };
  
  const sectionIdMap = {
    'hero': '#hero',
    'about': '#about',
    'services': '#services',
    'testimonials': '#testimonials',
    'contact': '#contact',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = sectionIdMap[entry.target.id as keyof typeof sectionIdMap];
            if (sectionId) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <div className={`bg-gray-900 font-body ${language === Language.AR ? 'font-body' : ''}`}>
      <Header
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />
      <SideNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <main>
        <div ref={heroRef} id="hero">
          <Hero scrollToContact={() => scrollToSection('#contact')} />
        </div>
        <div ref={aboutRef} id="about">
          <About />
        </div>
        <div ref={servicesRef} id="services">
          <Services />
        </div>
        <div ref={testimonialsRef} id="testimonials">
          <Testimonials />
        </div>
        <div ref={contactRef} id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;