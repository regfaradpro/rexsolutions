
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ShoppingBag, Laptop, Smartphone, Users, ArrowRight,
  CheckCircle2, HardHat, Pickaxe, Truck, Layers,
  Ruler, ShieldCheck, ChevronLeft, Wind, ThermometerSun, Zap,
  User, Mail, Phone, MessageSquare, Send, Loader2, ChevronDown, Search, X, Calendar, Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { COUNTRIES } from '../components/constants';

const Commerce: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'digital' | 'materials' | 'finishing'>('digital');
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  // States pour le formulaire d'installation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    prefix: '+32',
    prefixCode: 'BE',
    telephone: '',
    typeProjet: 'Climatisation',
    message: ''
  });

  const filteredCountries = useMemo(() =>
    COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dial.includes(searchQuery)
    ), [searchQuery]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-installation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomComplet: formData.nomComplet,
          email: formData.email,
          phone: `${formData.prefix} ${formData.telephone}`,
          typeProjet: formData.typeProjet,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur API");
      }

      setIsSuccess(true);

      // Reset formulaire après succès
      setTimeout(() => {
        setFormData({
          nomComplet: '',
          email: '',
          prefix: '+32',
          prefixCode: 'BE',
          telephone: '',
          typeProjet: 'Climatisation',
          message: ''
        });
        setIsSuccess(false);
      }, 5000);

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’envoi. Contactez-nous au +32 466 253 255.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const digitalFeatures = [
    {
      icon: <Laptop className="h-12 w-12 text-black mb-6" />,
      title: "Digitalisation POS",
      desc: "Installation de caisses enregistreuses modernes, terminaux de paiement intelligents et gestion des stocks en temps réel."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-black mb-6" />,
      title: "E-Commerce & Click & Collect",
      desc: "Création de boutiques en ligne performantes et intégration omnicanale pour lier votre stock physique à votre site web."
    },
    {
      icon: <Users className="h-12 w-12 text-black mb-6" />,
      title: "Expérience Client",
      desc: "Outils de fidélisation numériques et solutions CRM pour mieux comprendre et engager vos clients sur le long terme."
    }
  ];

  const materialsFeatures = [
    {
      icon: <Layers className="h-12 w-12 text-black mb-6" />,
      title: "Gros Œuvre",
      desc: "Ciment haute performance, sable de rivière, agrégats et blocs de béton pour vos fondations et structures."
    },
    {
      icon: <Pickaxe className="h-12 w-12 text-black mb-6" />,
      title: "Armatures & Acier",
      desc: "Treillis soudés, barres d'acier et profilés métalliques conformes aux normes de sécurité européennes."
    },
    {
      icon: <Ruler className="h-12 w-12 text-black mb-6" />,
      title: "Bois & Charpente",
      desc: "Sélection de bois de construction traités et solutions de charpente pour vos projets résidentiels et industriels."
    }
  ];

  const finishingFeatures = [
    {
      icon: <Wind className="h-12 w-12 text-black mb-6" />,
      title: "Installation de Clim",
      desc: "Systèmes de climatisation réversible air-air performants pour un confort thermique optimal en toute saison."
    },
    {
      icon: <Zap className="h-12 w-12 text-black mb-6" />,
      title: "Pompes à Chaleur",
      desc: "Solutions de chauffage durable et économes en énergie (PAC air-eau) adaptées aux nouvelles normes environnementales."
    },
    {
      icon: <ThermometerSun className="h-12 w-12 text-black mb-6" />,
      title: "Ventilation & VMC",
      desc: "Installation de systèmes de ventilation double flux pour garantir une qualité d'air saine et maîtriser l'humidité."
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-20">
          <ShoppingBag className="h-96 w-96 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors mb-12 group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>
          <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-4 block">Pôle Commerce</span>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
            Solutions de Vente <br /> <span className="text-gray-500">& Travaux Pro</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed font-light">
            De la digitalisation de votre point de vente à l'installation technique de vos infrastructures, Rex Solutions centralise vos besoins professionnels.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-center flex-wrap">
          <button
            onClick={() => setActiveTab('digital')}
            className={`px-6 md:px-8 py-5 text-[10px] md:text-sm font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'digital' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
          >
            Services Numériques
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-6 md:px-8 py-5 text-[10px] md:text-sm font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'materials' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
          >
            Matériaux BTP
          </button>
          <button
            onClick={() => setActiveTab('finishing')}
            className={`px-6 md:px-8 py-5 text-[10px] md:text-sm font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'finishing' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
          >
            Travaux de finition
          </button>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'digital' && (
            <div className="animate-in slide-in-from-bottom-5 duration-500">
              <div className="max-w-4xl mb-16">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">Digitalisation du Commerce</h2>
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  Le commerce d'aujourd'hui ne se limite plus à une simple transaction. Nous déployons des technologies omnicanales qui s'adaptent à votre flux de vente réel.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {digitalFeatures.map((f, i) => (
                  <div key={i} className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all duration-500">
                    {f.icon}
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{f.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="animate-in slide-in-from-bottom-5 duration-500">
              <div className="max-w-4xl mb-16">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">Négoce de Matériaux Professionnels</h2>
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  Partenaire privilégié des entrepreneurs, Rex Solutions assure le négoce et la livraison de matériaux de gros œuvre avec une exigence de qualité sans compromis.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {materialsFeatures.map((f, i) => (
                  <div key={i} className="p-10 bg-gray-900 text-white rounded-[2.5rem] border border-white/5 hover:bg-black transition-all duration-500">
                    <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                      {f.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{f.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'finishing' && (
            <div className="animate-in slide-in-from-bottom-5 duration-500">
              <div className="max-w-4xl mb-16">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">Travaux de Finition Technique</h2>
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  Expertise certifiée dans l'installation de solutions thermiques de pointe. Nous accompagnons votre transition énergétique avec des équipements haute performance.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {finishingFeatures.map((f, i) => (
                  <div key={i} className="p-10 bg-blue-50/30 rounded-[2.5rem] border border-blue-100/50 hover:bg-blue-50 transition-all duration-500">
                    <div className="mb-8">{f.icon}</div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{f.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 opacity-10">
              {activeTab === 'finishing' ? <Wind className="h-80 w-80" /> : <Truck className="h-80 w-80" />}
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                {activeTab === 'digital' && "Prêt à digitaliser votre enseigne ?"}
                {activeTab === 'materials' && "Une commande de matériaux en urgence ?"}
                {activeTab === 'finishing' && "Optimisez votre confort thermique"}
              </h2>
              <p className="text-xl text-gray-400 mb-12 font-light">
                {activeTab === 'digital' && "Nos experts analysent vos besoins pour implémenter une solution POS et E-commerce fluide sous 15 jours."}
                {activeTab === 'materials' && "Nous assurons la livraison sur vos chantiers en Belgique avec une réactivité exemplaire pour éviter tout arrêt de travaux."}
                {activeTab === 'finishing' && "Installation certifiée et mise en service rapide pour vos systèmes de climatisation et pompes à chaleur de dernière génération."}
              </p>
              <div className="flex flex-wrap gap-6">
                {activeTab === 'finishing' ? (
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-sm shadow-2xl group"
                  >
                    Demander un devis installation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <Link
                    to={activeTab === 'materials' ? "/commerce/catalogue-materiaux" : "/consultance"}
                    className="inline-flex items-center px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-sm shadow-2xl group"
                  >
                    {activeTab === 'digital' && "Demander un audit gratuit"}
                    {activeTab === 'materials' && "Consulter le catalogue"}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Feature List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 -z-10 rounded-full"></div>
              <img
                src={
                  activeTab === 'digital' ? "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800" :
                    activeTab === 'materials' ? "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" :
                      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800"
                }
                alt="Expertise Commerce"
                className="rounded-[3rem] shadow-3xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-8 -right-8 bg-black p-8 rounded-[2rem] shadow-2xl border border-white/10 hidden md:block">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter">
                {activeTab === 'digital' ? "Une interface pour la performance" :
                  activeTab === 'materials' ? "La logistique BTP simplifiée" :
                    "Normes & Qualité d'installation"}
              </h2>
              <ul className="space-y-6">
                {[
                  activeTab === 'digital' ? "Interface intuitive pour vos équipes de vente" :
                    activeTab === 'materials' ? "Matériaux certifiés aux normes CE/Benor" :
                      "Matériel garanti haute performance énergétique",

                  activeTab === 'digital' ? "Synchronisation multi-plateforme instantanée" :
                    activeTab === 'materials' ? "Livraison par camion grue ou semi-remorque" :
                      "Mise en service par des techniciens agréés",

                  activeTab === 'digital' ? "Rapports de ventes détaillés et analytiques" :
                    activeTab === 'materials' ? "Tarification dégressive selon les volumes" :
                      "Étude thermique personnalisée avant installation",

                  activeTab === 'digital' ? "Support technique prioritaire 7j/7" :
                    activeTab === 'materials' ? "Conseils techniques par des experts du bâtiment" :
                      "Contrats de maintenance et SAV réactif"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-gray-700 font-medium">
                    <CheckCircle2 className="h-7 w-7 text-black flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* New Installation Form Section - Only visible for finishing tab */}
      {activeTab === 'finishing' && (
        <section ref={formRef} className="py-24 bg-gray-50 scroll-mt-24 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-black p-10 text-white">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Votre Devis Installation</h3>
                <p className="text-gray-400 text-sm font-light mb-8 leading-relaxed">
                  Remplissez ce formulaire pour recevoir une étude technique personnalisée sous 48h.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest bg-white/10 p-3 rounded-xl border border-white/10">
                    <ThermometerSun className="h-4 w-4" /> Clim / Pompe à chaleur
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest bg-white/10 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4" /> Expertise certifiée
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-10 md:p-12">
                {isSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 py-10">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-4">Demande reçue !</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Votre demande de devis installation a été transmise. Nos techniciens vous recontacteront pour une visite technique.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <User className="h-3 w-3" /> Nom Complet
                        </label>
                        <input
                          required name="nomComplet" value={formData.nomComplet} onChange={handleInputChange}
                          type="text" placeholder="Ex: Marc Lavoie"
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <Mail className="h-3 w-3" /> Email Pro
                        </label>
                        <input
                          required name="email" value={formData.email} onChange={handleInputChange}
                          type="email" placeholder="contact@pro.be"
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 relative" ref={dropdownRef}>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <Phone className="h-3 w-3" /> Téléphone Mobile
                        </label>
                        <div className="flex gap-2">
                          <div
                            onClick={() => !isSubmitting && setIsDropdownOpen(!isDropdownOpen)}
                            className="w-[100px] flex items-center justify-between border-b-2 border-gray-100 py-3 cursor-pointer hover:border-black transition-colors"
                          >
                            <div className="flex items-center gap-1.5">
                              <img src={`https://flagcdn.com/w40/${formData.prefixCode.toLowerCase()}.png`} className="h-3 w-5 object-cover rounded-sm shadow-sm" alt="Flag" />
                              <span className="text-sm font-bold">{formData.prefix}</span>
                            </div>
                            <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </div>

                          {isDropdownOpen && (
                            <div className="absolute top-[100%] left-0 w-[250px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] mt-2 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                              <div className="p-3 border-b flex items-center gap-2 bg-gray-50/50">
                                <Search className="h-4 w-4 text-gray-400" />
                                <input
                                  type="text"
                                  placeholder="Rechercher..."
                                  className="w-full bg-transparent outline-none text-xs font-bold"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  autoFocus
                                />
                                {searchQuery && <X className="h-3 w-3 text-gray-400 cursor-pointer" onClick={() => setSearchQuery('')} />}
                              </div>
                              <div className="max-h-[200px] overflow-y-auto">
                                {filteredCountries.map((c) => (
                                  <div
                                    key={c.code}
                                    onClick={() => {
                                      setFormData(p => ({ ...p, prefix: c.dial, prefixCode: c.code }));
                                      setIsDropdownOpen(false);
                                      setSearchQuery('');
                                    }}
                                    className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <img src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} className="h-3 w-5 object-cover rounded-sm" alt={c.name} />
                                      <span className="text-xs font-bold text-gray-700">{c.name}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400">{c.dial}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <input
                            required name="telephone" value={formData.telephone} onChange={handleInputChange}
                            type="tel" placeholder="000 00 00 00"
                            className="flex-1 py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <Settings className="h-3 w-3" /> Type d'installation
                        </label>
                        <select
                          name="typeProjet" value={formData.typeProjet} onChange={handleInputChange}
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium text-sm appearance-none"
                        >
                          <option value="Climatisation">Climatisation Réversible</option>
                          <option value="Pompe à chaleur">Pompe à chaleur</option>
                          <option value="Ventilation">Ventilation / VMC</option>
                          <option value="Autre">Autre projet thermique</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" /> Message ou précisions
                      </label>
                      <textarea
                        name="message" value={formData.message} onChange={handleInputChange}
                        rows={3} placeholder="Nombre de pièces, surface à équiper, urgence..."
                        className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium resize-none"
                      ></textarea>
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full py-4 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="h-5 w-5 animate-spin" /> <span>Analyse...</span></>
                      ) : (
                        <><Send className="h-5 w-5" /> <span>Envoyer ma demande</span></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Commerce;
