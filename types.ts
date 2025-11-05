

import { ReactElement } from 'react';

export enum Language {
  FR = 'fr',
  EN = 'en',
  AR = 'ar',
}

export interface NavLink {
  name: string;
  href: string;
}

export interface Service {
  id: string;
  icon: string; // Icon identifier
  title: string;
  description: string;
}

export interface Testimonial {
  id:string;
  name: string;
  comment: string;
  rating: number; // 1 to 5
}

// FIX: Added Stat interface for use in the Stats component.
export interface Stat {
  value: number;
  label: string;
  suffix: string;
}

export interface Translations {
  pageTitle: string;
  metaDescription: string;
  lawyerName: string;
  header: {
    nav: NavLink[];
  };
  hero: {
    title: string;
    subtitle: string;
    ctaCall: string;
    ctaAppointment: string;
  };
  about: {
    titlePrefix: string;
    p1: string;
    p2: string;
    valuesTitle: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  services: {
    title: string;
    items: Service[];
  };
  testimonials: {
    title: string;
  };
  // FIX: Added optional stats property for the Stats component.
  stats?: {
    items: Stat[];
  };
  contact: {
    titlePrefix: string;
    intro: string;
    phonePrompt: string;
    whatsapp: string;
    emailPrompt: string;
    addressTitle: string;
    viewOnMap: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      successTitle: string;
      successMessage: string;
    };
    appointmentModal: {
      title: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      successTitle: string;
      successMessage: string;
      close: string;
    };
  };
  footer: {
    copyright: string;
    legal: string;
  };
}

export interface SiteSettings {
  themeColor: 'gold' | 'blue'; // Example setting
  copyrightName: string;
  domain?: string;
}

export interface SiteContent {
  [Language.FR]: Translations;
  [Language.EN]: Translations;
  [Language.AR]: Translations;
}

export interface SiteData {
  heroImageUrl?: string;
  aboutImageUrl?: string;
  faviconUrl?: string;
  contact: {
    email: string;
    whatsappNumber: string;
    address: string;
    googleMapsLink: string;
  };
  socials: {
    linkedin: string;
    facebook: string;
  };
  testimonials: Testimonial[];
  // DEPRECATED: Consultations and appointments are now handled by an external form service.
  settings: SiteSettings;
  content: SiteContent;
}