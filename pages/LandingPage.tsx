

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
  const { language } = state;
  const [activeSection, setActiveSection] = useState<string>('#hero');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        if (isScrollingProgrammatically.current) return;

        // On initial load or when scrolled to the top, force active section to be #hero.
        if (window.scrollY < window.innerHeight * 0.5) {
          setActiveSection('#hero');
          return;
        }

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
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref.current) {
      setActiveSection(sectionId);
      isScrollingProgrammatically.current = true;
      ref.current?.scrollIntoView({ behavior: 'smooth' });

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1000);
    }
  };
  
  const openAppointmentModal = () => setIsModalOpen(true);

  useEffect(() => {
    // Favicon update
    const faviconUrl = state.siteData.faviconUrl;
    if (faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }

    // Language and metadata update
    const translations = state.siteData.content[language];
    if (translations) {
        document.title = translations.pageTitle;

        const metas: {selector: string, attribute: string, value: string}[] = [
            {selector: 'meta[name="description"]', attribute: 'content', value: translations.metaDescription},
            {selector: 'meta[property="og:title"]', attribute: 'content', value: translations.pageTitle},
            {selector: 'meta[property="og:description"]', attribute: 'content', value: translations.metaDescription},
            {selector: 'meta[property="twitter:title"]', attribute: 'content', value: translations.pageTitle},
            {selector: 'meta[property="twitter:description"]', attribute: 'content', value: translations.metaDescription},
        ];

        metas.forEach(({selector, attribute, value}) => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute(attribute, value);
            }
        });
    }

    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
  }, [language, state.siteData]);

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