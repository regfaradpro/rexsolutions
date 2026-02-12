
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Briefcase, Search, Lightbulb, TrendingUp, Target,
  ClipboardList, GraduationCap, User, Mail, Phone,
  Calendar, Clock, MessageSquare, Send, CheckCircle2, Loader2,
  ChevronDown, X,
  ChevronLeft
} from 'lucide-react';
import { COUNTRIES } from '../components/constants';
import { useNavigate } from 'react-router-dom';


const Consultance: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    prefix: '+32',
    prefixCode: 'BE',
    phone: '',
    date: '',
    heure: '',
    projet: ''
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-audit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          phone: `${formData.prefix} ${formData.phone}`,
          date: formData.date,
          heure: formData.heure,
          projet: formData.projet,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur API");
      }

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          prefix: '+32',
          prefixCode: 'BE',
          phone: '',
          date: '',
          heure: '',
          projet: ''
        });
      }, 5000);

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’envoi. Contactez-nous au +32 466 253 255.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="bg-gray-100 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
          <Briefcase className="h-96 w-96 text-black" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 hover:text-white transition-colors mb-12 group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 uppercase tracking-tighter">Consultance & Audit</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-light">
            Optimisez vos processus internes et préparez votre entreprise aux défis de demain grâce à l'expertise opérationnelle de l'équipe de Rex Solutions.
          </p>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-20">
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter border-l-4 border-black pl-6">Notre Méthodologie</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              La croissance d'une entreprise s'accompagne souvent de complexité. Notre pôle Consultance intervient pour analyser, simplifier et optimiser vos méthodes de travail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-2xl transition-all group overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-black shadow-lg mb-8 italic">01</div>
                <Search className="h-10 w-10 text-black mb-6" />
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Audit & Diagnostic</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Analyse des flux de travail pour identifier les goulots d'étranglement et les inefficacités structurelles.</p>
              </div>
            </div>
            <div className="relative p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-2xl transition-all group overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-black shadow-lg mb-8 italic">02</div>
                <Lightbulb className="h-10 w-10 text-black mb-6" />
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Stratégie Sur-Mesure</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Élaboration d'un plan d'action personnalisé, aligné sur vos objectifs de croissance réels.</p>
              </div>
            </div>
            <div className="relative p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-2xl transition-all group overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-black shadow-lg mb-8 italic">03</div>
                <TrendingUp className="h-10 w-10 text-black mb-6" />
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Implémentation</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Accompagnement opérationnel et formation des équipes pour assurer la pérennité des solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Form Section */}
      <section id="audit-form" className="py-24 bg-gray-50 border-y border-gray-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Text Side */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block">Demande d'accompagnement</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                Réservez votre <br /><span className="text-gray-400">audit stratégique</span>
              </h2>
              <p className="text-xl text-gray-600 mb-10 font-light leading-relaxed">
                Nous analysons personnellement votre dossier. Ce premier échange d'environ 1 heure permet de définir le périmètre d'intervention et les gains de productivité immédiats.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"><Target className="h-5 w-5" /></div>
                  <span className="font-bold">Analyse des processus métiers (BPM)</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"><ClipboardList className="h-5 w-5" /></div>
                  <span className="font-bold">Diagnostic de transformation digitale</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"><GraduationCap className="h-5 w-5" /></div>
                  <span className="font-bold">Accompagnement au changement</span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="relative">
              {isSuccess ? (
                <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-green-100 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4">Demande Transmise !</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Votre demande de rendez-vous a été transmise avec succès. notre équipe reviendra vers vous sous 24h pour confirmer le créneau.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <User className="h-3 w-3" /> Prénom
                      </label>
                      <input
                        required name="prenom" value={formData.prenom} onChange={handleInputChange}
                        type="text" placeholder="Ex: Jean"
                        className="w-full px-5 py-3 bg-gray-50 border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <User className="h-3 w-3" /> Nom
                      </label>
                      <input
                        required name="nom" value={formData.nom} onChange={handleInputChange}
                        type="text" placeholder="Ex: Dupont"
                        className="w-full px-5 py-3 bg-gray-50 border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative" ref={dropdownRef}>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <Phone className="h-3 w-3" /> Mobile
                      </label>
                      <div className="flex gap-2">
                        <div
                          onClick={() => !isSuccess && setIsDropdownOpen(!isDropdownOpen)}
                          className="w-[110px] flex items-center justify-between border-b-2 border-gray-100 py-3 cursor-pointer hover:border-black transition-colors"
                        >
                          <div className="flex items-center gap-2">
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
                            <div className="max-h-[300px] overflow-y-auto">
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
                          required name="phone" value={formData.phone} onChange={handleInputChange}
                          type="tel" placeholder="000 00 00 00"
                          className="flex-1 py-3 bg-gray-50 border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium px-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <Mail className="h-3 w-3" /> Email
                      </label>
                      <input
                        required name="email" value={formData.email} onChange={handleInputChange}
                        type="email" placeholder="contact@pro.com"
                        className="w-full px-5 py-3 bg-gray-50 border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium"
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
                        className="w-full px-5 py-3 bg-gray-50 border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <Clock className="h-3 w-3" /> Heure
                      </label>
                      <input
                        required name="heure" value={formData.heure} onChange={handleInputChange}
                        type="time"
                        className="w-full px-5 py-3 bg-gray-50 border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <MessageSquare className="h-3 w-3" /> Énoncé de votre projet
                    </label>
                    <textarea
                      required name="projet" value={formData.projet} onChange={handleInputChange}
                      rows={3} placeholder="Décrivez brièvement vos besoins ou problématiques..."
                      className="w-full px-5 py-3 bg-gray-50 border-b-2 border-gray-100 outline-none focus:border-black transition-all font-medium resize-none"
                    ></textarea>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-5 w-5 animate-spin" /> <span>Traitement...</span></>
                    ) : (
                      <><Send className="h-5 w-5" /> <span>Demander le rendez-vous</span></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-3xl font-light italic text-gray-900 leading-relaxed mb-8">
            "La performance digitale n'est plus une option, c'est le moteur de votre rentabilité future en Belgique."
          </p>
          <div className="font-black uppercase tracking-widest text-sm">
            Faradji Régis — <span className="text-gray-400">Managing Director Rex Solutions</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultance;
