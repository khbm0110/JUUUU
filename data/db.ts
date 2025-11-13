import { SiteData, Language } from '../types';

export const initialDb: SiteData = {
  heroImageUrl: '/images/hero-background.jpg',
  aboutImageUrl: '/images/photo_fatima.jpg',
  faviconUrl: '/favicon.ico',
  contact: {
    email: "hassar.fz@gmail.com",
    whatsappNumber: "212616351285",
    address: "Boulevard Taib Naciri, Résidence Mohamed Reda, 3ème étage, N° 33, Casablanca",
    googleMapsLink: "https://www.google.com/maps/place/33%C2%B032'59.4%22N+7%C2%B040'34.7%22W",
  },
  socials: {
    linkedin: "https://www.linkedin.com",
    facebook: "https://www.facebook.com",
  },
  testimonials: [
    { id: 't1', name: 'Atlas Trading & Co.', comment: 'Une expertise et une réactivité hors pair. Maître Hassar a été un atout majeur dans notre litige commercial.', rating: 5 },
    { id: 't2', name: 'Karim Alami', comment: "Très à l'écoute et d'un grand professionnalisme. Je recommande vivement ses services pour toute affaire familiale.", rating: 5 },
    { id: 't3', name: 'Casablanca Immobilier', comment: 'Conseils juridiques clairs et précis qui nous ont permis de sécuriser notre transaction immobilière. Excellente avocate.', rating: 4 },
  ],
  settings: {
    themeColor: 'gold',
    copyrightName: "Cabinet Hassar",
    domain: "https://www.cabinethassar.ma/"
  },
  content: {
    [Language.FR]: {
      pageTitle: 'Cabinet Hassar - Maître Fatima Azzahraa Hassar, Avocate',
      metaDescription: 'Cabinet Hassar: Maître Fatima Azzahraa Hassar, avocate à Casablanca, offre une expertise juridique rigoureuse et personnalisée en droit des affaires, droit de la famille, et droit immobilier.',
      lawyerName: "Maître Fatima Azzahraa Hassar",
      header: {
        nav: [
          { name: 'Accueil', href: '#hero' },
          { name: 'À propos', href: '#about' },
          { name: 'Services', href: '#services' },
          { name: 'Témoignages', href: '#testimonials' },
          { name: 'Rendez-vous', href: '#appointment' },
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
        p2: 'Son approche est fondée sur l\'écoute, la transparence et un engagement sans faille. Que vous soyez un particulier ou une entreprise, Maître Hassar s\'engage à proteger vos intérêts avec détermination et professionnalisme.',
        valuesTitle: 'Nos Valeurs',
        values: [
          { title: 'Professionnalisme', description: 'Nous nous engageons à offrir un service professionnel de la plus haute qualité à nos clients.' },
          { title: 'Intégrité', description: 'Nous agissons avec intégrité, éthique et transparence dans toutes nos interactions.' },
          { title: 'Engagement', description: 'Notre engagement envers nos clients guide chaque action que nous entreprenons.' },
        ],
      },
      services: {
        title: 'Nos Domaines d\'Expertise',
        items: [
          {
            id: 's1',
            icon: 'briefcase',
            title: 'Droit des Affaires et des Sociétés',
            description: 'Accompagnement complet des entreprises, de la création à la gestion des litiges.',
            subServices: ['Droit commercial', 'Droit des sociétés', 'Droit fiscal', 'Recouvrement']
          },
          {
            id: 's2',
            icon: 'scale',
            title: 'Droit Civil et Immobilier',
            description: 'Défense de vos droits personnels et protection de votre patrimoine.',
            subServices: ['Droit civil', 'Conseil juridique', 'Droit immobilier']
          },
          {
            id: 's3',
            icon: 'family',
            title: 'Droit Social et de la Famille',
            description: 'Gestion des relations humaines, au travail comme dans la sphère privée.',
            subServices: ['Droit de la famille', 'Droit du travail', 'Droit social']
          },
          {
            id: 's4',
            icon: 'star',
            title: 'Droit du Sport',
            description: 'Assistance juridique spécialisée pour les acteurs du monde sportif.',
            subServices: ['Droit sportif']
          }
        ],
      },
      testimonials: {
        title: 'Ce que disent nos clients'
      },
      contact: {
        titlePrefix: 'Contactez',
        intro: "Pour toute demande, vous pouvez nous joindre via les coordonnées ci-dessous ou en utilisant le formulaire de contact.",
        phonePrompt: 'Téléphone',
        whatsapp: 'Discuter sur WhatsApp',
        emailPrompt: 'Email',
        addressTitle: 'Notre Adresse',
        viewOnMap: 'Voir sur Google Maps',
        form: { name: 'Votre nom', email: 'Votre email', message: 'Votre message', submit: 'Envoyer le message', successTitle: 'Message Envoyé !', successMessage: 'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.' },
        appointmentModal: {
          title: 'Demander à être rappelé',
          name: 'Votre nom complet',
          email: 'Votre adresse email',
          phone: 'Votre numéro de téléphone',
          message: 'Sujet de votre demande (facultatif)',
          submit: 'Envoyer la demande',
          successTitle: 'Demande Envoyée !',
          successMessage: 'Votre demande a été envoyée ! Nous vous contacterons bientôt pour confirmer.',
          close: 'Fermer',
        },
      },
      footer: {
        copyright: '© 2025 {lawyerName}. Tous droits réservés.',
        legal: 'Mentions légales',
      },
    },
    [Language.EN]: {
      pageTitle: 'Cabinet Hassar - Fatima Azzahraa Hassar, Esq., Lawyer',
      metaDescription: 'Cabinet Hassar: Fatima Azzahraa Hassar, Esq., a lawyer in Casablanca, offers rigorous and personalized legal expertise in business law, family law, and real estate law.',
      lawyerName: "Fatima Azzahraa Hassar, Esq.",
      header: {
        nav: [
            { name: 'Home', href: '#hero' },
            { name: 'About', href: '#about' },
            { name: 'Services', href: '#services' },
            { name: 'Testimonials', href: '#testimonials' },
            { name: 'Booking', href: '#appointment' },
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
        valuesTitle: 'Our Values',
        values: [
          { title: 'Professionalism', description: 'We are committed to providing a professional service of the highest quality to our clients.' },
          { title: 'Integrity', description: 'We act with integrity, ethics, and transparency in all our interactions.' },
          { title: 'Commitment', description: 'Our commitment to our clients guides every action we take.' },
        ],
      },
      services: {
        title: 'Our Areas of Expertise',
        items: [
          {
            id: 's1',
            icon: 'briefcase',
            title: 'Business & Corporate Law',
            description: 'Comprehensive support for businesses, from incorporation to dispute resolution.',
            subServices: ['Commercial Law', 'Corporate Law', 'Tax Law', 'Debt Collection']
          },
          {
            id: 's2',
            icon: 'scale',
            title: 'Civil & Real Estate Law',
            description: 'Defending your personal rights and protecting your assets.',
            subServices: ['Civil Law', 'Legal Consulting', 'Real Estate Law']
          },
          {
            id: 's3',
            icon: 'family',
            title: 'Social & Family Law',
            description: 'Managing human relations, both at work and in the private sphere.',
            subServices: ['Family Law', 'Labor Law', 'Social Law']
          },
          {
            id: 's4',
            icon: 'star',
            title: 'Sports Law',
            description: 'Specialized legal assistance for athletes, clubs, and federations.',
            subServices: ['Sports Law']
          }
        ],
      },
      testimonials: {
        title: 'What Our Clients Say'
      },
      contact: {
        titlePrefix: 'Contact',
        intro: "For any inquiries, you can reach us using the contact details below or by using the contact form.",
        phonePrompt: 'Phone',
        whatsapp: 'Chat on WhatsApp',
        emailPrompt: 'Email',
        addressTitle: 'Our Address',
        viewOnMap: 'View on Google Maps',
        form: { name: 'Your Name', email: 'Your Email', message: 'Your Message', submit: 'Send Message', successTitle: 'Message Sent!', successMessage: 'Thank you for your message. We will get back to you as soon as possible.' },
        appointmentModal: {
          title: 'Request a Callback',
          name: 'Your Full Name',
          email: 'Your Email Address',
          phone: 'Your Phone Number',
          message: 'Subject of your request (optional)',
          submit: 'Send Request',
          successTitle: 'Request Sent!',
          successMessage: 'Your request has been sent! We will contact you shortly to confirm.',
          close: 'Close',
        },
      },
      footer: {
        copyright: '© 2025 {lawyerName}. All rights reserved.',
        legal: 'Legal Notice',
      },
    },
    [Language.AR]: {
      pageTitle: 'مكتب حصار - المحامية فاطمة الزهراء حصار',
      metaDescription: 'مكتب حصار: المحامية فاطمة الزهراء حصار، محامية بالدار البيضاء، تقدم خبرة قانونية دقيقة وشخصية في قانون الأعمال، قانون الأسرة، والقانون العقاري.',
      lawyerName: "المحامية فاطمة الزهراء حصار",
      header: {
        nav: [
          { name: 'الرئيسية', href: '#hero' },
          { name: 'من نحن', href: '#about' },
          { name: 'الخدمات', href: '#services' },
          { name: 'الشهادات', href: '#testimonials' },
          { name: 'حجز موعد', href: '#appointment' },
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
        valuesTitle: 'قيمنا',
        values: [
          { title: 'الاحترافية', description: 'نلتزم بتقديم خدمة احترافية بأعلى جودة لعملائنا.' },
          { title: 'النزاهة', description: 'نتصرف بنزاهة وأخلاق وشفافية في جميع تعاملاتنا.' },
          { title: 'الالتزام', description: 'التزامنا تجاه عملائنا يوجه كل إجراء نتخذه.' },
        ],
      },
      services: {
        title: 'مجالات خبرتنا',
        items: [
          {
            id: 's1',
            icon: 'briefcase',
            title: 'قانون الأعمال والشركات',
            description: 'دعم شامل للشركات، من التأسيس إلى إدارة النزاعات.',
            subServices: ['القانون التجاري', 'قانون الشركات', 'القانون الضريبي', 'تحصيل الديون']
          },
          {
            id: 's2',
            icon: 'scale',
            title: 'القانون المدني والعقاري',
            description: 'الدفاع عن حقوقكم الشخصية وحماية ممتلكاتكم.',
            subServices: ['القانون المدني', 'استشارات قانونية', 'القانون العقاري']
          },
          {
            id: 's3',
            icon: 'family',
            title: 'قانون الأسرة والشغل',
            description: 'إدارة العلاقات الإنسانية، في العمل والحياة الخاصة.',
            subServices: ['قانون الأسرة', 'قانون الشغل', 'القانون الاجتماعي']
          },
          {
            id: 's4',
            icon: 'star',
            title: 'القانون الرياضي',
            description: 'مساعدة قانونية متخصصة للرياضيين، الأندية والاتحادات.',
            subServices: ['القانون الرياضي']
          }
        ],
      },
      testimonials: {
        title: 'ماذا يقول عملاؤنا'
      },
      contact: {
        titlePrefix: 'اتصلوا بـ',
        intro: "لأي استفسار، يمكنكم التواصل معنا باستخدام بيانات الاتصال أدناه أو عبر نموذج الاتصال.",
        phonePrompt: 'الهاتف',
        whatsapp: 'محادثة عبر الواتساب',
        emailPrompt: 'البريد الإلكتروني',
        addressTitle: 'عنواننا',
        viewOnMap: 'عرض على خرائط جوجل',
        form: { name: 'اسمكم', email: 'بريدكم الإلكتروني', message: 'رسالتكم', submit: 'إرسال الرسالة', successTitle: 'تم إرسال الرسالة!', successMessage: 'شكراً لرسالتكم. سنتصل بكم في أقرب وقت ممكن.' },
        appointmentModal: {
          title: 'طلب معاودة الاتصال',
          name: 'الاسم الكامل',
          email: 'البريد الإلكتروني',
          phone: 'رقم الهاتف',
          message: 'موضوع الطلب (اختياري)',
          submit: 'إرسال الطلب',
          successTitle: 'تم إرسال الطلب!',
          successMessage: 'تم إرسال طلبكم! سنتصل بكم قريباً للتأكيد.',
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