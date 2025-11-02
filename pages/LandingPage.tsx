

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
import AppointmentModal from '../components/AppointmentModal';

const LandingPage: React.FC = () => {
  const { state } = useContext(AppContext);
  const { language, siteData } = state;
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
  
  const openAppointmentModal = () => setIsModalOpen(true);

  // SEO and Language Effect
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';

    const currentContent = siteData.content[language];
    const { seo, lawyerName } = currentContent;
    const { contact, aboutImageUrl } = siteData;

    // Update Title
    document.title = seo.title;

    // Helper to update or create meta tags
    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    
    // Update Meta Description and OpenGraph tags
    setMetaTag('name', 'description', seo.description);
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'twitter:card', 'summary_large_image');
    setMetaTag('property', 'twitter:title', seo.title);
    setMetaTag('property', 'twitter:description', seo.description);


    // Update or create JSON-LD structured data
    let ldJsonScript = document.getElementById('ld-json-script');
    if (!ldJsonScript) {
      // FIX: Property 'type' does not exist on type 'HTMLElement'.
      // Solved by creating a new `script` const which is correctly typed as HTMLScriptElement,
      // allowing access to the `type` property without a type assertion.
      const newScript = document.createElement('script');
      newScript.id = 'ld-json-script';
      newScript.type = 'application/ld+json';
      document.head.appendChild(newScript);
      ldJsonScript = newScript;
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Attorney",
      "name": lawyerName,
      "image": aboutImageUrl,
      "telephone": `+${contact.whatsappNumber}`,
      "email": contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Boulevard Taib Naciri, Résidence Mohamed Reda, 3ème étage, N° 33",
        "addressLocality": "Casablanca",
        "addressCountry": "MA"
      },
      "url": window.location.origin,
      "description": seo.description,
    };
    ldJsonScript.textContent = JSON.stringify(structuredData);

  }, [language, siteData]);

  return (
    <div className={`bg-gray-900 font-body ${language === Language.AR ? 'font-body' : ''}`}>
      <Header
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        openAppointmentModal={openAppointmentModal}
      />
      <SideNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <main>
        <div ref={heroRef} id="hero">
          <Hero openAppointmentModal={openAppointmentModal} />
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
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LandingPage;