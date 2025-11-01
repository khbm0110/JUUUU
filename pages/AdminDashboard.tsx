







// FIX: Imported `ReactNode` to resolve a type error in the `CollapsibleSection` component.
import React, { useState, useContext, useEffect, ChangeEvent, ReactElement, ReactNode } from 'react';
import { AppContext } from '../contexts/AppContext';
import { AdminDashboardIcon, AdminAboutIcon, AdminServicesIcon, AdminConsultationsIcon, AdminAppointmentsIcon, AdminContactIcon, AdminTestimonialsIcon, AdminLanguagesIcon, AdminSettingsIcon, AdminLogoutIcon, AdminMenuIcon, AdminCloseIcon, AdminSaveIcon, AdminPlusIcon, AdminDeleteIcon, AdminEditIcon, AdminStarFilledIcon, AdminStarOutlineIcon } from '../components/admin/icons';
import { Language, Service, Testimonial, SiteData, Consultation, AppointmentRequest } from '../types';

type AdminView = 'dashboard' | 'about' | 'services' | 'consultations' | 'appointments' | 'contact' | 'testimonials' | 'languages' | 'settings';


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

const NavItem = ({ icon, text, active = false, isOpen, onClick, notificationCount }: { icon: ReactElement, text: string, active?: boolean, isOpen: boolean, onClick?: () => void, notificationCount?: number }) => (
    <button
        onClick={onClick}
        title={!isOpen ? text : ''}
        className={`flex items-center w-full px-4 py-3 transition-colors duration-200 relative ${isOpen ? '' : 'justify-center'} ${active ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
    >
        <span className={active ? 'text-black' : 'text-yellow-400'}>{React.cloneElement(icon, { className: 'w-6 h-6' })}</span>
        {isOpen && <span className="ml-4 font-semibold flex-grow text-left">{text}</span>}
        {notificationCount && notificationCount > 0 && (
             <span className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-600 rounded-full ${isOpen ? '' : 'absolute top-1 right-1'}`}>
                {notificationCount}
            </span>
        )}
    </button>
);


// --- View Components ---

const DashboardHome: React.FC<{ siteData: SiteData }> = ({ siteData }) => {
    const newConsultations = (siteData.consultations || []).filter(c => !c.handled).length;
    const totalAppointments = (siteData.appointmentRequests || []).length;
    const newAppointments = (siteData.appointmentRequests || []).filter(a => !a.handled).length;

    // BUG FIX: Added optional chaining and a fallback to prevent crashes if `siteData.content.fr` or its properties are missing.
    const servicesCount = siteData.content?.fr?.services?.items?.length || 0;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-2">Bienvenue Maître Hassar</h2>
            <p className="text-gray-400 mb-8">Voici un aperçu de votre site.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <h3 className="text-lg font-semibold text-yellow-400">Rendez-vous</h3>
                    <p className="text-4xl font-bold text-white mt-2">{totalAppointments}</p>
                    {newAppointments > 0 && <span className="text-sm text-red-500 animate-pulse"> ({newAppointments} nouvelles)</span>}
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
                    <AdminInput label="Texte du bouton (Appel)" value={currentLangData.hero?.ctaCall || ''} onChange={(e) => handleTextChange('hero.ctaCall', e.target.value)} />
                    <AdminInput label="Texte du bouton (Rendez-vous)" value={currentLangData.hero?.ctaAppointment || ''} onChange={(e) => handleTextChange('hero.ctaAppointment', e.target.value)} />
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
                    <AdminInput label="