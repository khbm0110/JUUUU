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

// FIX: Added missing Stat interface for the Stats component.
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Consultation {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string; // ISO String
  // FIX: Added handled property for admin dashboard functionality.
  handled?: boolean;
}

export interface AppointmentRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  preferredDateTime: string;
  confirmationMethod: 'sms' | 'email';
  date: string; // ISO String of submission
  // FIX: Added handled property for admin dashboard functionality.
  handled?: boolean;
}

export interface Translations {
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
  stats?: {
    items: Stat[];
  };
  testimonials: {
    title: string;
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
  // FIX: Uncommented consultations and appointmentRequests for use in the admin dashboard.
  consultations: Consultation[];
  appointmentRequests: AppointmentRequest[];
  settings: SiteSettings;
  content: SiteContent;
}