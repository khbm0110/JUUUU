
// FIX: Imported `ReactNode` to resolve a type error in the `CollapsibleSection` component.
import React, { useState, useContext, useEffect, ChangeEvent, ReactElement, ReactNode } from 'react';
import { AppContext } from '../contexts/AppContext';
import { AdminDashboardIcon, AdminAboutIcon, AdminServicesIcon, AdminConsultationsIcon, AdminContactIcon, AdminTestimonialsIcon, AdminLanguagesIcon, AdminSettingsIcon, AdminLogoutIcon, AdminMenuIcon, AdminCloseIcon, AdminSaveIcon, AdminPlusIcon, AdminDeleteIcon, AdminEditIcon, AdminStarFilledIcon, AdminStarOutlineIcon } from '../components/admin/icons';
import { Language, Service, Testimonial, SiteData, Consultation } from '../types';

type AdminView = 'dashboard' | 'about' | 'services' | 'consultations' | 'contact' | 'testimonials' | 'languages' | 'settings';


// --- Reusable Form Components ---
interface AdminInputProps {
    label: string;
    name?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
const AdminInput: React.FC<AdminInputProps> = ({ label, name, value, onChange, type = "text" }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} className="w-full bg-gray-900 border border-gray-600 p-2 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
    </div>
);

interface AdminTextareaProps {
    label: string;
    name?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
}
const AdminTextarea: React.FC<AdminTextareaProps> = ({ label, name, value, onChange, rows=3 }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <textarea name={name} value={value} onChange={onChange} rows={rows} className="w-full bg-gray-900 border border-gray-600 p-2 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-white" />
    </div>
);

const CollapsibleSection: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
    <details className="bg-gray-800 p-4 rounded-lg border border-gray-700" open>
        <summary className="font-bold text-lg cursor-pointer text-white">{title}</summary>
        <div className="mt-4 space-y-4">{children}</div>
    </details>
);

const NavItem = ({ icon, text, active = false, isOpen, onClick }: { icon: ReactElement, text: string, active?: boolean, isOpen: boolean, onClick?: () => void }) => (
    <button
        onClick={onClick}
        title={!isOpen ? text : ''}
        className={`flex items-center w-full px-4 py-3 transition-colors duration-200 ${isOpen ? '' : 'justify-center'} ${active ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
    >
        <span className={active ? 'text-black' : 'text-yellow-400'}>{React.cloneElement(icon, { className: 'w-6 h-6' })}</span>
        {isOpen && <span className="ml-4 font-semibold">{text}</span>}
    </button>
);


// --- View Components ---

const DashboardHome: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
    const newConsultations = (siteData.consultations || []).filter(c => !c.handled).length;
    // BUG FIX: Added optional chaining and a fallback to prevent crashes if `siteData.content.fr` or its properties are missing.
    const servicesCount = siteData.content?.fr?.services?.items?.length || 0;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">Bienvenue Maître Hassar</h2>
            <p className="text-gray-400 mb-8">Voici un aperçu de votre site.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-yellow-400">Services</h3>
                    <p className="text-4xl font-bold text-white mt-2">{servicesCount}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-yellow-400">Consultations</h3>
                    <p className="text-4xl font-bold text-white mt-2">{(siteData.consultations || []).length}</p>
                    {newConsultations > 0 && <span className="text-sm text-yellow-400"> ({newConsultations} nouvelles)</span>}
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-yellow-400">Témoignages</h3>
                    <p className="text-4xl font-bold text-white mt-2">{(siteData.testimonials || []).length}</p>
                </div>
            </div>
        </div>
    );
}

const ServicesEditor: React.FC<{ data: SiteData, setData: React.Dispatch<React.SetStateAction<SiteData>> }> = ({ data, setData }) => {
    
    const addService = () => {
        const newId = `s_${Date.now()}`;

        setData(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData));
            (Object.keys(Language) as Language[]).forEach(lang => {
                const newService = {
                    id: newId,
                    icon: 'briefcase',
                    title: lang === Language.EN ? 'New Service' : lang === Language.AR ? 'خدمة جديدة' : 'Nouveau Service',
                    description: lang === Language.EN ? 'Description for the new service.' : lang === Language.AR ? 'وصف الخدمة الجديدة.' : 'Description du nouveau service.'
                };

                // BUG FIX: Ensure the entire path to the items array exists to prevent crashes.
                if (!newData.content[lang]) newData.content[lang] = {};
                if (!newData.content[lang].services) {
                    const defaultTitle = lang === Language.EN ? 'Our Expertise' : lang === Language.AR ? 'مجالات خبرتنا' : 'Nos Domaines d\'Expertise';
                    newData.content[lang].services = { title: defaultTitle, items: [] };
                }
                if (!newData.content[lang].services.items) {
                    newData.content[lang].services.items = [];
                }
                newData.content[lang].services.items.push(newService);
            });
            return newData;
        });
    };

    const deleteService = (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.')) {
            setData(prevData => {
                const newData = JSON.parse(JSON.stringify(prevData));
                (Object.keys(newData.content) as Language[]).forEach(lang => {
                     // BUG FIX: Added safety check to prevent crash if `items` array does not exist.
                    if (newData.content[lang]?.services?.items) {
                      newData.content[lang].services.items = newData.content[lang].services.items.filter((s: Service) => s.id !== id);
                    }
                });
                return newData;
            });
        }
    };
    
    const updateIcon = (id: string, icon: string) => {
       setData(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData));
            (Object.keys(newData.content) as Language[]).forEach(lang => {
                 // BUG FIX: Added safety check to prevent crash if `items` array does not exist.
                const items = newData.content[lang]?.services?.items;
                if (items) {
                    const service = items.find((s: Service) => s.id === id);
                    if (service) service.icon = icon;
                }
            });
            return newData;
        });
    };

    const availableIcons = ['briefcase', 'building', 'family', 'scale'];
    // BUG FIX: Added optional chaining and fallback to prevent crash if `fr` content is missing.
    const frenchServices = data.content?.fr?.services?.items || [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <h3 className="text-2xl font-bold text-white">Gérer les services</h3>
                <button onClick={addService} className="flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-colors">
                    <AdminPlusIcon /> Ajouter un service
                </button>
            </div>
            <p className="text-gray-400">Gérez ici la structure de vos services (icônes, ajout/suppression). Pour modifier les textes (titre, description), rendez-vous dans la section "Langues".</p>
            <div className="space-y-4">
                {frenchServices.map((service: Service) => (
                    <div key={service.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <select value={service.icon} onChange={(e) => updateIcon(service.id, e.target.value)} className="bg-gray-900 border border-gray-600 p-2 rounded-md">
                                {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                            <span className="font-semibold text-white">{service.title}</span>
                        </div>
                        <button onClick={() => deleteService(service.id)} className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition-colors">
                            <AdminDeleteIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TestimonialModal: React.FC<{ testimonial: Testimonial | null, onSave: (t: Testimonial) => void, onClose: () => void }> = ({ testimonial, onSave, onClose }) => {
    const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
        name: testimonial?.name || '',
        comment: testimonial?.comment || '',
        rating: testimonial?.rating || 5,
    });
    const {name, comment, rating} = formData;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(s => ({ ...s, [e.target.name]: e.target.value }));
    };

    const setRating = (rate: number) => {
        setFormData(s => ({...s, rating: rate}));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: testimonial?.id || '', ...formData });
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700 w-full max-w-lg">
                <h3 className="text-xl font-bold text-white mb-6">{testimonial ? 'Modifier le' : 'Ajouter un'} témoignage</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <AdminInput label="Nom du client" name="name" value={name} onChange={handleChange} />
                    <AdminTextarea label="Commentaire" name="comment" value={comment} onChange={handleChange} rows={4} />
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Note</label>
                        <div className="flex items-center">
                             {[...Array(5)].map((_, i) => (
                                <button type="button" key={i} onClick={() => setRating(i + 1)}>
                                    {i < rating ? <AdminStarFilledIcon className="text-yellow-400 h-6 w-6" /> : <AdminStarOutlineIcon className="text-gray-500 h-6 w-6" />}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-semibold">Annuler</button>
                        <button type="submit" className="py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TestimonialsEditor: React.FC<{ data: SiteData, setData: React.Dispatch<React.SetStateAction<SiteData>> }> = ({ data, setData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

    const handleOpenModal = (testimonial: Testimonial | null = null) => {
        setEditingTestimonial(testimonial);
        setIsModalOpen(true);
    };

    const handleSave = (testimonial: Testimonial) => {
        setData(prevData => {
            const testimonials = [...(prevData.testimonials || [])];
            if (editingTestimonial) { // Edit
                const index = testimonials.findIndex(t => t.id === editingTestimonial.id);
                if (index > -1) testimonials[index] = testimonial;
            } else { // Add
                testimonials.push({ ...testimonial, id: `t_${Date.now()}` });
            }
            return { ...prevData, testimonials };
        });
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
            setData(prevData => ({
                ...prevData,
                testimonials: (prevData.testimonials || []).filter(t => t.id !== id)
            }));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <h3 className="text-2xl font-bold text-white">Gérer les témoignages</h3>
                <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-colors">
                    <AdminPlusIcon /> Ajouter un témoignage
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(data.testimonials || []).map((testimonial: Testimonial) => (
                    <div key={testimonial.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col">
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => i < testimonial.rating ? <AdminStarFilledIcon key={i} className="text-yellow-400" /> : <AdminStarOutlineIcon key={i} className="text-gray-500" />)}
                        </div>
                        <p className="text-gray-400 italic flex-grow">"{testimonial.comment}"</p>
                        <p className="font-semibold text-white mt-2">- {testimonial.name}</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => handleOpenModal(testimonial)} className="p-2 text-gray-400 hover:text-white"><AdminEditIcon /></button>
                            <button onClick={() => handleDelete(testimonial.id)} className="p-2 text-gray-400 hover:text-red-500"><AdminDeleteIcon /></button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && <TestimonialModal testimonial={editingTestimonial} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

const LanguageEditor: React.FC<{ data: SiteData, setData: React.Dispatch<React.SetStateAction<SiteData>> }> = ({ data, setData }) => {
    const [activeLang, setActiveLang] = useState<Language>(Language.FR);
    
    const handleTextChange = (path: string, value: string) => {
        setData(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData));
            const keys = path.split('.');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let current: any = newData.content[activeLang];
            // BUG FIX: Safely traverse the object path to prevent crashes on undefined properties.
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current) break; // Stop if path is broken
                current = current[keys[i]];
            }
            if (current) { // Only set value if the path was valid
                current[keys[keys.length - 1]] = value.replace(/\\n/g, '\n');
            }
            return newData;
        });
    };
    
    // BUG FIX: Use a fallback empty object to prevent crashes if language data is missing.
    const currentLangData = data.content[activeLang] || {};

    return (
        <div>
            <div className="flex gap-2 mb-4 border-b border-gray-700">
                {(Object.keys(Language) as Language[]).map(lang => (
                    <button key={lang} onClick={() => setActiveLang(lang)} className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${activeLang === lang ? 'bg-gray-800 text-yellow-400' : 'text-gray-400 hover:text-white'}`}>
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className="space-y-6">
                <CollapsibleSection title="Général & Navigation">
                     <AdminInput label="Nom de l'avocat (Titre principal)" value={currentLangData.lawyerName || ''} onChange={(e) => handleTextChange('lawyerName', e.target.value)} />
                      <div className="space-y-4 mt-4 pl-4 border-l-2 border-gray-700">
                        <h4 className="text-md font-semibold text-gray-300">Liens de navigation</h4>
                        {/* BUG FIX: Added optional chaining and fallback to prevent crashes. */}
                        {(currentLangData.header?.nav || []).map((navItem, index) => (
                            <div key={index}>
                                <AdminInput label={`Texte du lien #${index + 1} (${navItem.href})`} value={navItem.name} onChange={e => handleTextChange(`header.nav.${index}.name`, e.target.value)} />
                            </div>
                        ))}
                    </div>
                </CollapsibleSection>

                <CollapsibleSection title="Section Hero">
                    {/* BUG FIX: Added optional chaining and fallbacks for all nested properties. */}
                    <AdminTextarea label="Titre Principal (utilisez \n pour un saut de ligne)" value={(currentLangData.hero?.title || '').replace(/\n/g, '\\n')} onChange={(e) => handleTextChange('hero.title', e.target.value)} rows={2} />
                    <AdminInput label="Sous-titre" value={currentLangData.hero?.subtitle || ''} onChange={(e) => handleTextChange('hero.subtitle', e.target.value)} />
                    <AdminInput label="Texte du bouton (CTA)" value={currentLangData.hero?.cta || ''} onChange={(e) => handleTextChange('hero.cta', e.target.value)} />
                </CollapsibleSection>
                
                <CollapsibleSection title="Section À Propos">
                     <AdminInput label="Préfixe du titre (ex: 'À propos de')" value={currentLangData.about?.titlePrefix || ''} onChange={(e) => handleTextChange('about.titlePrefix', e.target.value)} />
                     <AdminTextarea label="Paragraphe 1" value={currentLangData.about?.p1 || ''} onChange={(e) => handleTextChange('about.p1', e.target.value)} rows={4} />
                     <AdminTextarea label="Paragraphe 2" value={currentLangData.about?.p2 || ''} onChange={(e) => handleTextChange('about.p2', e.target.value)} rows={4} />
                </CollapsibleSection>

                <CollapsibleSection title="Section Services">
                    <AdminInput label="Titre de la section" value={currentLangData.services?.title || ''} onChange={(e) => handleTextChange('services.title', e.target.value)} />
                    <div className="space-y-4 mt-4 pl-4 border-l-2 border-gray-700">
                        {(currentLangData.services?.items || []).map((service, index) => (
                            <div key={service.id}>
                                <AdminInput label={`Titre du service #${index + 1}`} value={service.title} onChange={e => handleTextChange(`services.items.${index}.title`, e.target.value)} />
                                <AdminTextarea label={`Description du service #${index + 1}`} value={service.description} onChange={e => handleTextChange(`services.items.${index}.description`, e.target.value)} rows={3}/>
                            </div>
                        ))}
                    </div>
                </CollapsibleSection>

                <CollapsibleSection title="Section Témoignages">
                    <AdminInput label="Titre de la section" value={currentLangData.testimonials?.title || ''} onChange={(e) => handleTextChange('testimonials.title', e.target.value)} />
                </CollapsibleSection>
                
                <CollapsibleSection title="Section Contact">
                    <AdminInput label="Préfixe du titre (ex: 'Contactez')" value={currentLangData.contact?.titlePrefix || ''} onChange={(e) => handleTextChange('contact.titlePrefix', e.target.value)} />
                    <AdminTextarea label="Texte d'introduction" value={currentLangData.contact?.intro || ''} onChange={(e) => handleTextChange('contact.intro', e.target.value)} />
                    <AdminInput label="Texte bouton WhatsApp" value={currentLangData.contact?.whatsapp || ''} onChange={(e) => handleTextChange('contact.whatsapp', e.target.value)} />
                    <AdminInput label="Texte avant l'email" value={currentLangData.contact?.emailPrompt || ''} onChange={(e) => handleTextChange('contact.emailPrompt', e.target.value)} />
                    <AdminInput label="Titre bloc Adresse" value={currentLangData.contact?.addressTitle || ''} onChange={(e) => handleTextChange('contact.addressTitle', e.target.value)} />
                    <AdminInput label="Texte sur la carte" value={currentLangData.contact?.viewOnMap || ''} onChange={(e) => handleTextChange('contact.viewOnMap', e.target.value)} />
                    <div className="pl-4 border-l-2 border-gray-700 space-y-4">
                        <h4 className="text-md font-semibold text-gray-300">Textes du formulaire</h4>
                        <AdminInput label="Placeholder Nom" value={currentLangData.contact?.form?.name || ''} onChange={(e) => handleTextChange('contact.form.name', e.target.value)} />
                        <AdminInput label="Placeholder Email" value={currentLangData.contact?.form?.email || ''} onChange={(e) => handleTextChange('contact.form.email', e.target.value)} />
                        <AdminInput label="Placeholder Message" value={currentLangData.contact?.form?.message || ''} onChange={(e) => handleTextChange('contact.form.message', e.target.value)} />
                        <AdminInput label="Texte bouton Envoyer" value={currentLangData.contact?.form?.submit || ''} onChange={(e) => handleTextChange('contact.form.submit', e.target.value)} />
                        <AdminInput label="Message de succès" value={currentLangData.contact?.form?.success || ''} onChange={(e) => handleTextChange('contact.form.success', e.target.value)} />
                    </div>
                </CollapsibleSection>

                <CollapsibleSection title="Pied de page (Footer)">
                    <AdminInput label="Texte Copyright" value={currentLangData.footer?.copyright || ''} onChange={(e) => handleTextChange('footer.copyright', e.target.value)} />
                    <AdminInput label="Texte Mentions légales" value={currentLangData.footer?.legal || ''} onChange={(e) => handleTextChange('footer.legal', e.target.value)} />
                </CollapsibleSection>
            </div>
        </div>
    )
};

const ContactEditor: React.FC<{ data: SiteData, setData: React.Dispatch<React.SetStateAction<SiteData>> }> = ({ data, setData }) => {
    // BUG FIX: Updated handleChange to safely handle potentially undefined `prev.contact`.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({ 
            ...prev, 
            contact: { 
                ...(prev.contact || {}), 
                [e.target.name]: e.target.value 
            } 
        }));
    };

    return (
         <div className="space-y-6 max-w-xl">
            <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">Infos de contact</h3>
            {/* BUG FIX: Added optional chaining and fallbacks to prevent crashes on render. */}
            <AdminInput label="Email" name="email" type="email" value={data.contact?.email || ''} onChange={handleChange} />
            <AdminInput label="Numéro WhatsApp (avec code pays)" name="whatsappNumber" value={data.contact?.whatsappNumber || ''} onChange={handleChange} />
            <AdminInput label="Adresse" name="address" value={data.contact?.address || ''} onChange={handleChange} />
            <AdminInput label="Lien Google Maps" name="googleMapsLink" value={data.contact?.googleMapsLink || ''} onChange={handleChange} />
        </div>
    );
};

const AboutEditor: React.FC<{ data: SiteData, setData: React.Dispatch<React.SetStateAction<SiteData>> }> = ({ data, setData }) => {
    // BUG FIX: Updated handleChange to safely handle potentially undefined `prev.about`.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({ 
            ...prev, 
            about: { 
                ...(prev.about || {}), 
                [e.target.name]: e.target.value 
            } 
        }));
    };

    return (
         <div className="space-y-6 max-w-xl">
            <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">À propos</h3>
            {/* BUG FIX: Added optional chaining and a fallback to prevent crashes on render. */}
            <AdminInput label="URL de l'image de profil" name="profileImageUrl" value={data.about?.profileImageUrl || ''} onChange={handleChange} />
             <p className="text-gray-400 text-sm">Pour modifier les textes de cette section, allez dans l'onglet "Langues".</p>
        </div>
    );
};

const ConsultationsView: React.FC<{ data: SiteData, setData: React.Dispatch<React.SetStateAction<SiteData>> }> = ({ data, setData }) => {

    const toggleHandled = (id: string) => {
        setData(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData));
            // FIX: Ensure consultations array exists to prevent crash.
            if (!newData.consultations) {
                newData.consultations = [];
            }
            const consultation = newData.consultations.find((c: Consultation) => c.id === id);
            if (consultation) {
                consultation.handled = !consultation.handled;
            }
            return newData;
        });
    };

    const sortedConsultations = [...(data.consultations || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (!sortedConsultations || sortedConsultations.length === 0) {
        return (
            <div>
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-4">Consultations</h3>
                <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
                    <p className="text-gray-400">Aucune consultation pour le moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-4">Consultations</h3>
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="divide-y divide-gray-700">
                    {sortedConsultations.map((c: Consultation) => (
                        <details key={c.id} className="p-4 group">
                            <summary className="flex items-center justify-between cursor-pointer list-none">
                                <div className="flex items-center gap-4">
                                     <span className={`flex-shrink-0 w-3 h-3 rounded-full ${!c.handled ? 'bg-yellow-400' : 'bg-green-500'}`} title={!c.handled ? 'En attente' : 'Traité'}></span>
                                    <span className="font-semibold text-white w-48 truncate">{c.name}</span>
                                    <span className="text-gray-400 w-56 truncate hidden md:inline">{c.email}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">{new Date(c.date).toLocaleDateString('fr-FR')}</span>
                                    <span className="transform transition-transform duration-200 group-open:rotate-180">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </div>
                            </summary>
                            <div className="mt-4 pt-4 border-t border-gray-700">
                               <p className="text-gray-300 whitespace-pre-wrap">{c.message}</p>
                               <div className="flex justify-end mt-4">
                                   <button onClick={() => toggleHandled(c.id)} className={`px-3 py-1 text-sm font-bold rounded-full transition-colors ${
                                       c.handled
                                       ? 'bg-gray-600 hover:bg-gray-500 text-white'
                                       : 'bg-yellow-500 hover:bg-yellow-400 text-black'
                                   }`}>
                                       {c.handled ? 'Marquer comme non traité' : 'Marquer comme traité'}
                                   </button>
                               </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Main Admin Dashboard Component ---

const AdminDashboard: React.FC = () => {
    const { state, logout, updateSiteData } = useContext(AppContext);
    const [view, setView] = useState<AdminView>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [localSiteData, setLocalSiteData] = useState<SiteData>(() => JSON.parse(JSON.stringify(state.siteData)));
    const [showSaveModal, setShowSaveModal] = useState(false);

    useEffect(() => {
        setLocalSiteData(JSON.parse(JSON.stringify(state.siteData)));
    }, [state.siteData]);

    const handleSave = () => {
        updateSiteData(localSiteData);
        setShowSaveModal(false);
        // You could add a success notification here
    };
    
    const hasChanges = JSON.stringify(localSiteData) !== JSON.stringify(state.siteData);

    const renderView = () => {
        switch (view) {
            case 'dashboard': return <DashboardHome siteData={localSiteData} />;
            case 'services': return <ServicesEditor data={localSiteData} setData={setLocalSiteData} />;
            case 'testimonials': return <TestimonialsEditor data={localSiteData} setData={setLocalSiteData} />;
            case 'languages': return <LanguageEditor data={localSiteData} setData={setLocalSiteData} />;
            case 'contact': return <ContactEditor data={localSiteData} setData={setLocalSiteData} />;
            case 'consultations': return <ConsultationsView data={localSiteData} setData={setLocalSiteData} />;
            case 'about': return <AboutEditor data={localSiteData} setData={setLocalSiteData} />;
            default: return <div className="p-8"><h2 className="text-2xl font-bold text-white">Section en construction</h2></div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-300 font-body">
            {/* Sidebar */}
            <aside className={`bg-black text-white transition-all duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="flex items-center justify-between p-4 h-16 border-b border-gray-800 flex-shrink-0">
                    {isSidebarOpen && <h1 className="text-xl font-bold font-heading text-yellow-400">Admin Panel</h1>}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white">
                        {isSidebarOpen ? <AdminCloseIcon className="w-6 h-6" /> : <AdminMenuIcon className="w-6 h-6" />}
                    </button>
                </div>
                <nav className="mt-4 flex-grow overflow-y-auto">
                    <NavItem icon={<AdminDashboardIcon />} text="Tableau de bord" active={view === 'dashboard'} onClick={() => setView('dashboard')} isOpen={isSidebarOpen} />
                    <NavItem icon={<AdminAboutIcon />} text="À propos" active={view === 'about'} onClick={() => setView('about')} isOpen={isSidebarOpen} />
                    <NavItem icon={<AdminServicesIcon />} text="Services" active={view === 'services'} onClick={() => setView('services')} isOpen={isSidebarOpen} />
                    <NavItem icon={<AdminTestimonialsIcon />} text="Témoignages" active={view === 'testimonials'} onClick={() => setView('testimonials')} isOpen={isSidebarOpen} />
                    <NavItem icon={<AdminConsultationsIcon />} text="Consultations" active={view === 'consultations'} onClick={() => setView('consultations')} isOpen={isSidebarOpen} />
                    <NavItem icon={<AdminContactIcon />} text="Contact" active={view === 'contact'} onClick={() => setView('contact')} isOpen={isSidebarOpen} />
                    <NavItem icon={<AdminLanguagesIcon />} text="Langues" active={view === 'languages'} onClick={() => setView('languages')} isOpen={isSidebarOpen} />
                    <NavItem icon={<AdminSettingsIcon />} text="Paramètres" active={view === 'settings'} onClick={() => setView('settings')} isOpen={isSidebarOpen} />
                </nav>
                <div className="flex-shrink-0">
                    <NavItem icon={<AdminLogoutIcon />} text="Déconnexion" onClick={logout} isOpen={isSidebarOpen} />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between h-16 bg-gray-800 border-b border-gray-700 px-8 flex-shrink-0">
                    <h2 className="text-xl font-semibold text-white capitalize">{view.replace('-', ' ')}</h2>
                    <button
                        onClick={() => setShowSaveModal(true)}
                        disabled={!hasChanges}
                        className="flex items-center gap-2 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-all duration-300 disabled:bg-gray-500 disabled:text-gray-800 disabled:cursor-not-allowed"
                    >
                        <AdminSaveIcon />
                        Enregistrer
                    </button>
                </header>
                <div className="flex-1 overflow-y-auto p-8">
                    {renderView()}
                </div>
            </main>

            {/* Save Confirmation Modal */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700 max-w-sm w-full">
                        <h3 className="text-xl font-bold text-white mb-4">Confirmer les modifications</h3>
                        <p className="text-gray-400 mb-6">Êtes-vous sûr de vouloir enregistrer les modifications apportées ? Cette action mettra à jour le site public.</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={() => setShowSaveModal(false)} className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-semibold">Annuler</button>
                            <button onClick={handleSave} className="py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold">Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
