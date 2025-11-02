
import { SiteData, Language } from '../types';

export const initialDb: SiteData = {
  heroImageUrl: 'https://i.postimg.cc/kM8xcGzk/360-F-516209984-APT701DWSDCUPz-Er-By-EBy-Urq-Ej-Hw-RYCX.jpg',
  contact: {
    email: "contact@cabinethassar.ma",
    whatsappNumber: "212616351285",
    address: "Boulevard Taib Naciri, Résidence Mohamed Reda, 3ème étage, N° 33",
    googleMapsLink: "https://www.google.com/maps/place/?q=place_id:ChIJ6rq1UUVspg0RDTL1I1G_3t4",
  },
  socials: {
    linkedin: "https://www.linkedin.com",
    facebook: "https://www.facebook.com",
  },
  testimonials: [
    { id: 't1', name: 'Société A', comment: 'Une expertise et une réactivité hors pair. Maître Hassar a été un atout majeur dans notre litige commercial.', rating: 5 },
    { id: 't2', name: 'M. Dupont', comment: "Très à l'écoute et d'un grand professionnalisme. Je recommande vivement ses services pour toute affaire familiale.", rating: 5 },
    { id: 't3', name: 'Immo Corp', comment: 'Conseils juridiques clairs et précis qui nous ont permis de sécuriser notre transaction immobilière. Excellente avocate.', rating: 4 },
  ],
  // consultations: [], // Deprecated
  // appointmentRequests: [], // Deprecated
  settings: {
    themeColor: 'gold',
    copyrightName: "Maître Fatima Azzahraa Hassar"
  },
  content: {
    [Language.FR]: {
      lawyerName: "Maître Fatima Azzahraa Hassar",
      header: {
        nav: [
          { name: 'Accueil', href: '#hero' },
          { name: 'À propos', href: '#about' },
          { name: 'Services', href: '#services' },
          { name: 'Témoignages', href: '#testimonials' },
          { name: 'Contact', href: '#contact' },
        ],
      },
      hero: {
        title: 'Votre avocate de confiance pour défendre vos droits',
        subtitle: 'Conseil, accompagnement et expertise juridique à votre service.',
        ctaCall: 'Appeler maintenant',
        ctaAppointment: 'Prendre rendez-vous',
      },
      about: {
        titlePrefix: 'À propos de',
        p1: 'Forte d\'une solide expérience et d\'une passion pour la justice, Maître Fatima Azzahraa Hassar a fondé son cabinet avec la conviction que chaque client mérite une défense rigoureuse et personnalisée. Diplômée des plus grandes universités, elle allie expertise technique et qualités humaines pour vous offrir une représentation juridique de premier ordre.',
        p2: 'Son approche est fondée sur l\'écoute, la transparence et un engagement sans faille. Que vous soyez un particulier ou une entreprise, Maître Hassar s\'engage à protéger vos intérêts avec détermination et professionnalisme.',
      },
      stats: {
        items: [
          { value: 10, label: "Ans d'expérience", suffix: '+' },
          { value: 350, label: "Cas Résolus", suffix: '+' },
          { value: 18, label: "Domaines de spécialisation" },
          { value: 98, label: "Taux de réussite", suffix: '%' },
          { value: 100, label: "Avis Clients", suffix: '+' },
          { value: 3, label: "Langues Parlées" },
        ],
      },
      services: {
        title: 'Nos Domaines d\'Expertise',
        items: [
          { id: 's1', icon: 'briefcase', title: 'Droit des Affaires', description: 'Accompagnement des entreprises, de la création à la résolution des litiges commerciaux.' },
          { id: 's2', icon: 'building', title: 'Droit Immobilier', description: 'Conseils et représentation pour toutes vos transactions et contentieux immobiliers.' },
          // FIX: Corrected service item to include both `title` and `description` properties as required by the `Service` type.
          { id: 's3', icon: 'family', title: 'Droit de la Famille', description: "Assistance dans les affaires de divorce, garde d'enfants, et successions avec humanité et discrétion." },
          { id: 's4', icon: 'scale', title: 'Conseils Juridiques', description: 'Une expertise à votre écoute pour anticiper les risques et sécuriser vos projets.' },
        ],
      },
      testimonials: {
        title: 'Ce que disent nos clients'
      },
      contact: {
        titlePrefix: 'Contactez',
        intro: "Pour toute demande, vous pouvez nous joindre via les coordonnées ci-dessous ou en utilisant le formulaire de contact.",
        phonePrompt: 'Téléphone :',
        whatsapp: 'Discuter sur WhatsApp',
        emailPrompt: 'Ou par email :',
        addressTitle: 'Notre Adresse',
        viewOnMap: 'Voir sur Google Maps',
        form: { name: 'Votre nom', email: 'Votre email', message: 'Votre message', submit: 'Envoyer le message', success: 'Message envoyé avec succès !' },
        appointmentModal: {
          title: 'Prendre un rendez-vous',
          name: 'Votre nom complet',
          email: 'Votre adresse email',
          phone: 'Votre numéro de téléphone',
          dateTime: 'Date et heure souhaitées',
          confirmation: 'Recevoir la confirmation par :',
          bySms: 'SMS',
          byEmail: 'Email',
          submit: 'Confirmer le rendez-vous',
          success: 'Votre demande a été envoyée ! Nous vous contacterons bientôt pour confirmer.',
          close: 'Fermer',
        },
      },
      footer: {
        copyright: '© 2025 {lawyerName}. Tous droits réservés.',
        legal: 'Mentions légales',
      },
    },
    [Language.EN]: {
      lawyerName: "Fatima Azzahraa Hassar, Esq.",
      header: {
        nav: [
            { name: 'Home', href: '#hero' },
            { name: 'About', href: '#about' },
            { name: 'Services', href: '#services' },
            { name: 'Testimonials', href: '#testimonials' },
            { name: 'Contact', href: '#contact' },
        ],
      },
      hero: {
        title: 'Your Trusted Lawyer to Defend Your Rights',
        subtitle: 'Legal advice, support, and expertise at your service.',
        ctaCall: 'Call Now',
        ctaAppointment: 'Book Appointment',
      },
      about: {
        titlePrefix: 'About',
        p1: 'With solid experience and a passion for justice, Fatima Azzahraa Hassar founded her firm with the belief that every client deserves a rigorous and personalized defense. A graduate of top universities, she combines technical expertise with human qualities to offer you first-class legal representation.',
        p2: 'Her approach is based on listening, transparency, and unwavering commitment. Whether you are an individual or a business, Ms. Hassar is committed to protecting your interests with determination and professionalism.',
      },
      stats: {
        items: [
          { value: 10, label: "Years of Experience", suffix: '+' },
          { value: 350, label: "Cases Solved", suffix: '+' },
          { value: 18, label: "Areas of Expertise" },
          { value: 98, label: "Success Rate", suffix: '%' },
          { value: 100, label: "Client Reviews", suffix: '+' },
          { value: 3, label: "Languages Spoken" },
        ],
      },
      services: {
        title: 'Our Areas of Expertise',
        items: [
          { id: 's1', icon: 'briefcase', title: 'Business Law', description: 'Supporting businesses, from incorporation to resolving commercial disputes.' },
          { id: 's2', icon: 'building', title: 'Real Estate Law', description: 'Advice and representation for all your real estate transactions and disputes.' },
          { id: 's3', icon: 'family', title: 'Family Law', description: 'Assistance in matters of divorce, child custody, and inheritance with humanity and discretion.' },
          { id: 's4', icon: 'scale', title: 'Legal Consulting', description: 'Expertise at your disposal to anticipate risks and secure your projects.' },
        ],
      },
      testimonials: {
        title: 'What Our Clients Say'
      },
      contact: {
        titlePrefix: 'Contact',
        intro: "For any inquiries, you can reach us using the contact details below or by using the contact form.",
        phonePrompt: 'Phone:',
        whatsapp: 'Chat on WhatsApp',
        emailPrompt: 'Or by email:',
        addressTitle: 'Our Address',
        viewOnMap: 'View on Google Maps',
        form: { name: 'Your Name', email: 'Your Email', message: 'Your Message', submit: 'Send Message', success: 'Message sent successfully!' },
        appointmentModal: {
          title: 'Book an Appointment',
          name: 'Your Full Name',
          email: 'Your Email Address',
          phone: 'Your Phone Number',
          dateTime: 'Preferred Date & Time',
          confirmation: 'Receive confirmation via:',
          bySms: 'SMS',
          byEmail: 'Email',
          submit: 'Confirm Appointment',
          success: 'Your request has been sent! We will contact you shortly to confirm.',
          close: 'Close',
        },
      },
      footer: {
        copyright: '© 2025 {lawyerName}. All rights reserved.',
        legal: 'Legal Notice',
      },
    },
    [Language.AR]: {
      lawyerName: "المحامية فاطمة الزهراء حصار",
      header: {
        nav: [
          { name: 'الرئيسية', href: '#hero' },
          { name: 'عني', href: '#about' },
          { name: 'الخدمات', href: '#services' },
          { name: 'الشهادات', href: '#testimonials' },
          { name: 'اتصل بنا', href: '#contact' },
        ],
      },
      hero: {
        title: 'محاميتكم الموثوقة للدفاع عن حقوقكم',
        subtitle: 'استشارة، مواكبة وخبرة قانونية في خدمتكم.',
        ctaCall: 'اتصل الآن',
        ctaAppointment: 'حجز موعد',
      },
      about: {
        titlePrefix: 'عن',
        p1: 'بفضل خبرتها الراسخة وشغفها بالعدالة، أسست الأستاذة فاطمة الزهراء حصار مكتبها إيمانا منها بأن كل موكل يستحق دفاعًا دقيقًا وشخصيًا. تخرجت من أرقى الجامعات، وتجمع بين الخبرة التقنية والصفات الإنسانية لتقدم لكم تمثيلاً قانونيًا من الدرجة الأولى.',
        p2: 'يعتمد نهجها على الاستماع والشفافية والالتزام المطلق. سواء كنتم أفرادًا أو شركات، تلتزم الأستاذة حصار بحماية مصالحكم بعزم واحترافية.',
      },
      stats: {
        items: [
          { value: 10, label: "سنوات من الخبرة", suffix: '+' },
          { value: 350, label: "قضية تم حلها", suffix: '+' },
          { value: 18, label: "مجال تخصص" },
          { value: 98, label: "نسبة النجاح", suffix: '%' },
          { value: 100, label: "تقييمات العملاء", suffix: '+' },
          { value: 3, label: "لغات متحدث بها" },
        ],
      },
      services: {
        title: 'مجالات خبرتنا',
        items: [
          { id: 's1', icon: 'briefcase', title: 'قانون الأعمال', description: 'مواكبة الشركات، من التأسيس إلى حل النزاعات التجارية.' },
          { id: 's2', icon: 'building', title: 'قانون العقارات', description: 'استشارات وتمثيل في جميع معاملاتكم ونزاعاتكم العقارية.' },
          { id: 's3', icon: 'family', title: 'قانون الأسرة', description: 'مساعدة في قضايا الطلاق، حضانة الأطفال، والميراث بإنسانية وسرية.' },
          { id: 's4', icon: 'scale', title: 'استشارات قانونية', description: 'خبرة في خدمتكم لتوقع المخاطر وتأمين مشاريعكم.' },
        ],
      },
      testimonials: {
        title: 'ماذا يقول عملاؤنا'
      },
      contact: {
        titlePrefix: 'اتصلوا بـ',
        intro: "لأي استفسار، يمكنكم التواصل معنا باستخدام بيانات الاتصال أدناه أو عبر نموذج الاتصال.",
        phonePrompt: 'الهاتف:',
        whatsapp: 'محادثة عبر الواتساب',
        emailPrompt: 'أو عبر البريد الإلكتروني:',
        addressTitle: 'عنواننا',
        viewOnMap: 'عرض على خرائط جوجل',
        form: { name: 'اسمكم', email: 'بريدكم الإلكتروني', message: 'رسالتكم', submit: 'إرسال الرسالة', success: 'تم إرسال الرسالة بنجاح!' },
        appointmentModal: {
          title: 'حجز موعد',
          name: 'الاسم الكامل',
          email: 'البريد الإلكتروني',
          phone: 'رقم الهاتف',
          dateTime: 'التاريخ والوقوف المفضل',
          confirmation: 'تلقي التأكيد عبر:',
          bySms: 'رسالة نصية',
          byEmail: 'بريد إلكتروني',
          submit: 'تأكيد الموعد',
          success: 'تم إرسال طلبكم! سنتصل بكم قريبا للتأكيد.',
          close: 'إغلاق',
        },
      },
      footer: {
        copyright: '© 2025 {lawyerName}. جميع الحقوق محفوظة.',
        legal: 'إشعارات قانونية',
      },
    },
  },
};