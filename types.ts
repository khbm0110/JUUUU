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
  id: string;
  name: string;
  comment: string;
  rating: number; // 1 to 5
}

export interface Consultation {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string; // ISO String
  handled: boolean;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface Translations {
  lawyerName: string;
  header: {
    nav: NavLink[];
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    titlePrefix: string;
    p1: string;
    p2: string;
  };
  stats: {
    items: Stat[];
  };
  services: {
    title: string;
    items: Service[];
  };
  testimonials: {
    title: string;
  };
  contact: {
    titlePrefix: string;
    intro: string;
    whatsapp: string;
    emailPrompt: string;
    addressTitle: string;
    viewOnMap: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      success: string;
    };
  };
  footer: {
    copyright: string;
    legal: string;
  };
}

export interface SiteSettings {
  logoUrl: string;
  themeColor: 'gold' | 'blue'; // Example setting
  copyrightName: string;
}

export interface SiteContent {
  [Language.FR]: Translations;
  [Language.EN]: Translations;
  [Language.AR]: Translations;
}

export interface SiteData {
  about: {
    profileImageUrl: string;
  };
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
  consultations: Consultation[];
  settings: SiteSettings;
  content: SiteContent;
}