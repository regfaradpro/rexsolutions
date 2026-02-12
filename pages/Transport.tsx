
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Truck, ShieldCheck, MapPin, Clock, ArrowRight, Package,
  Zap, Globe, User, Mail, Calendar, MessageSquare, Send,
  CheckCircle2, Loader2, ChevronDown, X, Search, Navigation,
  Phone, ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COUNTRIES } from '../components/constants';
import { STYLES } from '../components/styles';

const Transport: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    prefix: '+32',
    prefixCode: 'BE',
    telephone: '',
    marchandise: '',
    depart: '',
    destination: '',
    date: '',
    details: ''
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi vers l'API Rex Solutions
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          nomComplet: '', email: '', prefix: '+32', prefixCode: 'BE',
          telephone: '', marchandise: '', depart: '', destination: '',
          date: '', details: ''
        });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1920"
            className="w-full h-full object-cover opacity-20"
            alt="Logistique"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 hover:text-white transition-colors mb-12 group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Logistique & Transport Sécurisé</h1>
          <p className="text-xl text-blue-100 max-w-3xl leading-relaxed font-light">
            Une solution fiable pour l'acheminement de vos biens en Belgique et en Europe. Ponctualité, sécurité, intégrité.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <p className="text-2xl text-gray-700 leading-relaxed italic font-light">
              "La ponctualité et l'intégrité de vos marchandises sont non négociables. Nous garantissons un acheminement sans faille sur tout le territoire belge."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group p-8 rounded-[2rem] hover:bg-gray-50 transition-colors">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Flexibilité Logistique</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Du petit colis urgent à la palette volumineuse, nous adaptons nos véhicules à vos besoins spécifiques.</p>
            </div>
            <div className="text-center group p-8 rounded-[2rem] hover:bg-gray-50 transition-colors">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Sécurité Maximale</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Protocoles de sécurité stricts et manipulation experte pour vos biens de haute technologie ou de valeur.</p>
            </div>
            <div className="text-center group p-8 rounded-[2rem] hover:bg-gray-50 transition-colors">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                <Globe className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Couverture Hub</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Expertise locale forte en Belgique, avec des connexions logistiques optimisées vers les centres économiques.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tighter">Idéal pour vos flux professionnels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="bg-white p-8 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-100">
              <Package className="h-12 w-12 text-blue-900 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xl mb-1">Réapprovisionnement</h4>
                <p className="text-gray-600 text-sm">Transferts fluides entre vos points de vente et vos entrepôts.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-100">
              <MapPin className="h-12 w-12 text-blue-900 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xl mb-1">Dernier Kilomètre</h4>
                <p className="text-gray-600 text-sm">Livraison finale pour vos clients B2B avec un soin extrême.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-100">
              <Clock className="h-12 w-12 text-blue-900 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xl mb-1">Urgences Technologiques</h4>
                <p className="text-gray-600 text-sm">Transport de matériel sensible nécessitant une réactivité immédiate.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-100">
              <Truck className="h-12 w-12 text-blue-900 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xl mb-1">Régularité & Fiabilité</h4>
                <p className="text-gray-600 text-sm">Réseau logistique éprouvé garantissant des délais respectés.</p>
              </div>
            </div>
          </div>

          {/* New Quote Form Section */}
          <div id="transport-quote" className="max-w-5xl mx-auto scroll-mt-24">
            <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row">
              {/* Form Info Side */}
              <div className="lg:w-1/3 bg-blue-900 p-10 md:p-14 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">Demander un <br />Devis Express</h3>
                  <p className="text-blue-100 text-sm font-light leading-relaxed mb-8">
                    Obtenez une tarification personnalisée sous 2 heures pour vos besoins de transport en Belgique.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest bg-white/10 p-3 rounded-xl border border-white/10">
                      <ShieldCheck className="h-4 w-4" /> Assurance Transport incluse
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest bg-white/10 p-3 rounded-xl border border-white/10">
                      <Clock className="h-4 w-4" /> Réponse rapide sous 2H
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 mb-2">Support Direct</p>
                  <p className="font-bold">Contactez-nous par mail à l'adresse rexsolutionspro@gmail.com</p>
                </div>
              </div>

              {/* Form Side */}
              <div className="lg:w-2/3 p-10 md:p-14 bg-white">
                {isSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 py-10">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-4">Demande Transmise !</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Votre demande de devis transport a été reçue. Notre équipe logistique analyse votre trajet et vous recontactera très prochainement.
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
                          type="text" placeholder="Jean Dupont"
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-blue-900 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <Mail className="h-3 w-3" /> Email Pro
                        </label>
                        <input
                          required name="email" value={formData.email} onChange={handleInputChange}
                          type="email" placeholder="contact@entreprise.be"
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-blue-900 transition-all font-medium"
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
                            className="w-[100px] flex items-center justify-between border-b-2 border-gray-100 py-3 cursor-pointer hover:border-blue-900 transition-colors"
                          >
                            <div className="flex items-center gap-1.5">
                              <img src={`https://flagcdn.com/w40/${formData.prefixCode.toLowerCase()}.png`} className="h-3 w-5 object-cover rounded-sm shadow-sm" alt="Flag" />
                              <span className="text-sm font-bold">{formData.prefix}</span>
                            </div>
                            <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </div>

                          {isDropdownOpen && (
                            <div className="absolute top-[100%] left-0 w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] mt-2 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                              <div className="p-4 border-b flex items-center gap-3 bg-gray-50/50">
                                <Search className="h-4 w-4 text-gray-400" />
                                <input
                                  type="text"
                                  placeholder="Rechercher un pays..."
                                  className="w-full bg-transparent outline-none text-sm font-bold"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  autoFocus
                                />
                                {searchQuery && <X className="h-3 w-3 text-gray-400 cursor-pointer" onClick={() => setSearchQuery('')} />}
                              </div>
                              <div className="max-h-[250px] overflow-y-auto">
                                {filteredCountries.map((c) => (
                                  <div
                                    key={c.code}
                                    onClick={() => {
                                      setFormData(p => ({ ...p, prefix: c.dial, prefixCode: c.code }));
                                      setIsDropdownOpen(false);
                                      setSearchQuery('');
                                    }}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <img src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} className="h-3 w-5 object-cover rounded-sm" alt={c.name} />
                                      <span className="text-sm font-bold text-gray-700">{c.name}</span>
                                    </div>
                                    <span className="text-xs font-black text-gray-400">{c.dial}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <input
                            required name="telephone" value={formData.telephone} onChange={handleInputChange}
                            type="tel" placeholder="000 00 00 00"
                            className="flex-1 py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-blue-900 transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <Package className="h-3 w-3" /> Nature du transport
                        </label>
                        <input
                          required name="marchandise" value={formData.marchandise} onChange={handleInputChange}
                          type="text" placeholder="Ex: 4 palettes de matériel info"
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-blue-900 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <Navigation className="h-3 w-3" /> Départ
                        </label>
                        <input
                          required name="depart" value={formData.depart} onChange={handleInputChange}
                          type="text" placeholder="Ville ou Code Postal"
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-blue-900 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <MapPin className="h-3 w-3" /> Destination
                        </label>
                        <input
                          required name="destination" value={formData.destination} onChange={handleInputChange}
                          type="text" placeholder="Ville ou Code Postal"
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-blue-900 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <Calendar className="h-3 w-3" /> Date souhaitée
                        </label>
                        <input
                          required name="date" value={formData.date} onChange={handleInputChange}
                          type="date"
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-blue-900 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                          <MessageSquare className="h-3 w-3" /> Détails complémentaires
                        </label>
                        <input
                          name="details" value={formData.details} onChange={handleInputChange}
                          type="text" placeholder="Poids total, volume, fragilité..."
                          className="w-full py-3 bg-white border-b-2 border-gray-100 outline-none focus:border-blue-900 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full mt-6 py-5 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="h-5 w-5 animate-spin" /> <span>Calcul du devis...</span></>
                      ) : (
                        <><Send className="h-5 w-5" /> <span>Envoyer la demande</span></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transport;
