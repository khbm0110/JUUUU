export const LOCALES = ["fr", "ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export const DIR: Record<Locale, "ltr" | "rtl"> = { fr: "ltr", ar: "rtl", en: "ltr" };

export type ServiceItem = { slug: string; fr: string; ar: string; en: string };

// slug is stable across languages — used for /[locale]/services/[slug]
export const SERVICES: ServiceItem[] = [
  { slug: "conseil-juridique", fr: "Conseil juridique", ar: "استشارات قانونية", en: "Legal Consulting" },
  { slug: "droit-civil", fr: "Droit civil", ar: "القانون المدني", en: "Civil Law" },
  { slug: "droit-commercial", fr: "Droit commercial", ar: "القانون التجاري", en: "Commercial Law" },
  { slug: "droit-de-la-famille", fr: "Droit de la famille", ar: "قانون الأسرة", en: "Family Law" },
  { slug: "droit-des-societes", fr: "Droit des sociétés", ar: "قانون الشركات", en: "Corporate Law" },
  { slug: "droit-du-travail", fr: "Droit du travail", ar: "قانون الشغل", en: "Labor Law" },
  { slug: "droit-fiscal", fr: "Droit fiscal", ar: "القانون الضريبي", en: "Tax Law" },
  { slug: "droit-immobilier", fr: "Droit immobilier", ar: "القانون العقاري", en: "Real Estate Law" },
  { slug: "droit-social", fr: "Droit social", ar: "القانون الاجتماعي", en: "Social Law" },
  { slug: "droit-sportif", fr: "Droit sportif", ar: "القانون الرياضي", en: "Sports Law" },
  { slug: "recouvrement", fr: "Recouvrement de créances", ar: "تحصيل الديون", en: "Debt Collection" },
];

// One SEO-oriented paragraph per service, keyed "<slug>-<locale>". Written
// around the "service + Casablanca" keyword pattern from the market research.
export const SERVICE_COPY: Record<string, string> = {
  "conseil-juridique-fr": "Avocate en conseil juridique à Casablanca, Maître Fatima Azzahraa Hassar accompagne particuliers et entreprises dans l'analyse de leurs situations et la sécurisation de leurs décisions, avant tout contentieux.",
  "conseil-juridique-ar": "بصفتها محامية استشارات قانونية بالدار البيضاء، ترافق الأستاذة فاطمة الزهراء حصار الأفراد والشركات في تحليل وضعياتهم وتأمين قراراتهم قبل أي نزاع قضائي.",
  "conseil-juridique-en": "As a legal consulting attorney in Casablanca, Maître Fatima Azzahraa Hassar helps individuals and businesses analyze their situations and secure their decisions before any dispute arises.",

  "droit-civil-fr": "Avocate en droit civil à Casablanca, le cabinet intervient dans les litiges entre particuliers : responsabilité civile, contrats, voisinage et obligations, en conseil comme en contentieux.",
  "droit-civil-ar": "محامية في القانون المدني بالدار البيضاء، يتدخل المكتب في النزاعات بين الأفراد: المسؤولية المدنية، العقود، الجوار والالتزامات، استشارة وترافعًا.",
  "droit-civil-en": "As a civil law attorney in Casablanca, the firm handles disputes between individuals — civil liability, contracts, neighbor disputes, and obligations — both in advisory and litigation matters.",

  "droit-commercial-fr": "Avocate en droit commercial à Casablanca, Maître Hassar conseille commerçants et entreprises sur leurs contrats, litiges fournisseurs et opérations commerciales.",
  "droit-commercial-ar": "محامية في القانون التجاري بالدار البيضاء، ترافق الأستاذة حصار التجار والشركات في عقودهم ونزاعاتهم مع الموردين وعملياتهم التجارية.",
  "droit-commercial-en": "As a commercial law attorney in Casablanca, Maître Hassar advises merchants and businesses on contracts, supplier disputes, and commercial operations.",

  "droit-de-la-famille-fr": "Avocate en droit de la famille à Casablanca, le cabinet accompagne avec humanité les procédures de divorce, garde d'enfants, pension alimentaire et succession.",
  "droit-de-la-famille-ar": "محامية في قانون الأسرة بالدار البيضاء، يرافق المكتب بإنسانية مساطر الطلاق، الحضانة، النفقة والإرث.",
  "droit-de-la-famille-en": "As a family law attorney in Casablanca, the firm handles divorce proceedings, child custody, alimony, and inheritance matters with care and discretion.",

  "droit-des-societes-fr": "Avocate en droit des sociétés à Casablanca, Maître Hassar accompagne la création, la gouvernance et la restructuration de sociétés marocaines.",
  "droit-des-societes-ar": "محامية في قانون الشركات بالدار البيضاء، ترافق الأستاذة حصار تأسيس وحوكمة وإعادة هيكلة الشركات المغربية.",
  "droit-des-societes-en": "As a corporate law attorney in Casablanca, Maître Hassar advises on the formation, governance, and restructuring of Moroccan companies.",

  "droit-du-travail-fr": "Avocate en droit du travail à Casablanca, le cabinet conseille employeurs et salariés : licenciement, contrats, contentieux prud'homal.",
  "droit-du-travail-ar": "محامية في قانون الشغل بالدار البيضاء، يستشير المكتب أرباب العمل والأجراء: الفصل، العقود، المنازعات الاجتماعية.",
  "droit-du-travail-en": "As a labor law attorney in Casablanca, the firm advises employers and employees on termination, contracts, and labor tribunal disputes.",

  "droit-fiscal-fr": "Avocate en droit fiscal à Casablanca, Maître Hassar accompagne particuliers et entreprises dans leurs obligations fiscales et contentieux avec l'administration.",
  "droit-fiscal-ar": "محامية في القانون الضريبي بالدار البيضاء، ترافق الأستاذة حصار الأفراد والشركات في التزاماتهم الضريبية ومنازعاتهم مع الإدارة.",
  "droit-fiscal-en": "As a tax law attorney in Casablanca, Maître Hassar assists individuals and businesses with their tax obligations and disputes with the administration.",

  "droit-immobilier-fr": "Avocate en droit immobilier à Casablanca, le cabinet sécurise transactions, baux et litiges de copropriété.",
  "droit-immobilier-ar": "محامية في القانون العقاري بالدار البيضاء، يؤمن المكتب المعاملات، عقود الكراء ونزاعات الملكية المشتركة.",
  "droit-immobilier-en": "As a real estate law attorney in Casablanca, the firm secures transactions, leases, and co-ownership disputes.",

  "droit-social-fr": "Avocate en droit social à Casablanca, Maître Hassar intervient sur les questions de sécurité sociale et de protection des salariés.",
  "droit-social-ar": "محامية في القانون الاجتماعي بالدار البيضاء، تتدخل الأستاذة حصار في قضايا الضمان الاجتماعي وحماية الأجراء.",
  "droit-social-en": "As a social law attorney in Casablanca, Maître Hassar handles matters of social security and employee protection.",

  "droit-sportif-fr": "Avocate en droit sportif à Casablanca, le cabinet conseille clubs, athlètes et fédérations sur leurs contrats et litiges.",
  "droit-sportif-ar": "محامية في القانون الرياضي بالدار البيضاء، يستشير المكتب الأندية والرياضيين والجامعات في عقودهم ونزاعاتهم.",
  "droit-sportif-en": "As a sports law attorney in Casablanca, the firm advises clubs, athletes, and federations on their contracts and disputes.",

  "recouvrement-fr": "Avocate en recouvrement de créances à Casablanca, Maître Hassar accompagne les entreprises dans le recouvrement amiable et judiciaire de leurs impayés.",
  "recouvrement-ar": "محامية في تحصيل الديون بالدار البيضاء، ترافق الأستاذة حصار الشركات في تحصيل مستحقاتها وديًا وقضائيًا.",
  "recouvrement-en": "As a debt collection attorney in Casablanca, Maître Hassar helps businesses recover unpaid debts, both amicably and through the courts.",
};

export const PAGE = {
  fr: {
    nav: { home: "Accueil", about: "Cabinet", services: "Domaines", testimonials: "Avis", contact: "Contact", cta: "Prendre rendez-vous" },
    hero: { badge: "Casablanca, Maroc", title: "Votre avocate de confiance pour défendre vos droits", subtitle: "Conseil, accompagnement et expertise juridique à votre service." },
    about: {
      eyebrow: "Le Cabinet", titlePrefix: "À propos de",
      p1: "Forte d'une solide expérience et d'une passion pour la justice, Maître Fatima Azzahraa Hassar a fondé son cabinet avec la conviction que chaque client mérite une défense rigoureuse et personnalisée.",
      p2: "Son approche est fondée sur l'écoute, la transparence et un engagement sans faille.",
      valuesTitle: "Nos Valeurs",
    },
    values: [
      { t: "Professionnalisme", d: "Un service professionnel de la plus haute qualité, à chaque dossier." },
      { t: "Intégrité", d: "Intégrité, éthique et transparence dans toutes nos interactions." },
      { t: "Engagement", d: "Notre engagement envers nos clients guide chaque action que nous entreprenons." },
    ],
    servicesTitle: { eyebrow: "Expertise", title: "Nos Domaines d'Expertise" },
    testimonials: { eyebrow: "Avis Clients", title: "Ce que disent nos clients" },
    contact: { eyebrow: "Contact", titlePrefix: "Contactez", form: { name: "Votre nom", email: "Votre email", message: "Votre message", submit: "Envoyer le message" } },
    footer: "Tous droits réservés.",
    backToServices: "Tous nos domaines",
    contactCta: "Prendre rendez-vous pour ce domaine",
  },
  ar: {
    nav: { home: "الرئيسية", about: "المكتب", services: "المجالات", testimonials: "الآراء", contact: "تواصل", cta: "حجز موعد" },
    hero: { badge: "الدار البيضاء، المغرب", title: "محاميتكم الموثوقة للدفاع عن حقوقكم", subtitle: "استشارة، مواكبة وخبرة قانونية في خدمتكم." },
    about: {
      eyebrow: "المكتب", titlePrefix: "عن",
      p1: "بفضل خبرتها الراسخة وشغفها بالعدالة، أسست الأستاذة فاطمة الزهراء حصار مكتبها إيمانًا منها بأن كل موكل يستحق دفاعًا دقيقًا وشخصيًا.",
      p2: "يعتمد نهجها على الاستماع والشفافية والالتزام المطلق.",
      valuesTitle: "قيمنا",
    },
    values: [
      { t: "الاحترافية", d: "نلتزم بتقديم خدمة احترافية بأعلى جودة لعملائنا." },
      { t: "النزاهة", d: "نتصرف بنزاهة وأخلاق وشفافية في جميع تعاملاتنا." },
      { t: "الالتزام", d: "التزامنا تجاه عملائنا يوجه كل إجراء نتخذه." },
    ],
    servicesTitle: { eyebrow: "الخبرة", title: "مجالات خبرتنا" },
    testimonials: { eyebrow: "آراء العملاء", title: "ماذا يقول عملاؤنا" },
    contact: { eyebrow: "تواصل", titlePrefix: "اتصلوا بـ", form: { name: "اسمكم", email: "بريدكم الإلكتروني", message: "رسالتكم", submit: "إرسال الرسالة" } },
    footer: "جميع الحقوق محفوظة.",
    backToServices: "كل مجالاتنا",
    contactCta: "احجز موعدًا بخصوص هذا المجال",
  },
  en: {
    nav: { home: "Home", about: "Firm", services: "Practice Areas", testimonials: "Reviews", contact: "Contact", cta: "Book Appointment" },
    hero: { badge: "Casablanca, Morocco", title: "Your Trusted Lawyer to Defend Your Rights", subtitle: "Legal advice, support, and expertise at your service." },
    about: {
      eyebrow: "The Firm", titlePrefix: "About",
      p1: "With solid experience and a passion for justice, Fatima Azzahraa Hassar founded her firm with the belief that every client deserves a rigorous and personalized defense.",
      p2: "Her approach is based on listening, transparency, and unwavering commitment.",
      valuesTitle: "Our Values",
    },
    values: [
      { t: "Professionalism", d: "We are committed to providing a professional service of the highest quality to our clients." },
      { t: "Integrity", d: "We act with integrity, ethics, and transparency in all our interactions." },
      { t: "Commitment", d: "Our commitment to our clients guides every action we take." },
    ],
    servicesTitle: { eyebrow: "Expertise", title: "Our Areas of Expertise" },
    testimonials: { eyebrow: "Client Reviews", title: "What Our Clients Say" },
    contact: { eyebrow: "Contact", titlePrefix: "Contact", form: { name: "Your Name", email: "Your Email", message: "Your Message", submit: "Send Message" } },
    footer: "All rights reserved.",
    backToServices: "All practice areas",
    contactCta: "Book an appointment for this matter",
  },
};

export const TESTIMONIALS = [
  { name: "Atlas Trading & Co.", quote: "Une expertise et une réactivité hors pair. Maître Hassar a été un atout majeur dans notre litige commercial.", rating: 5 },
  { name: "Karim Alami", quote: "Très à l'écoute et d'un grand professionnalisme. Je recommande vivement ses services pour toute affaire familiale.", rating: 5 },
  { name: "Casablanca Immobilier", quote: "Conseils juridiques clairs et précis qui nous ont permis de sécuriser notre transaction immobilière.", rating: 4 },
];

export const CONTACT = {
  phone: "+212616351285",
  phoneDisplay: "06 16 35 12 85",
  email: "hassar.fz@gmail.com",
  address: "Boulevard Taib Naciri, Résidence Mohamed Reda, 3ème étage, N° 33, Casablanca",
};
