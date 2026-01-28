import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Car, HardHat, Utensils, ArrowLeft, Send, CheckCircle2, Loader2, ShieldCheck, ChevronLeft, ChevronRight, Search, ChevronDown, AlertCircle } from 'lucide-react';

// Liste des pays mondiaux pour le préfixe
const COUNTRIES = [
  { code: 'BE', name: 'Belgique', dial: '+32' },
  { code: 'FR', name: 'France', dial: '+33' },
  { code: 'LU', name: 'Luxembourg', dial: '+352' },
  { code: 'CH', name: 'Suisse', dial: '+41' },
  { code: 'DE', name: 'Allemagne', dial: '+49' },
  { code: 'IT', name: 'Italie', dial: '+39' },
  { code: 'ES', name: 'Espagne', dial: '+34' },
  { code: 'GB', name: 'Royaume-Uni', dial: '+44' },
  { code: 'US', name: 'États-Unis', dial: '+1' },
  { code: 'CA', name: 'Canada', dial: '+1' },
  { code: 'MA', name: 'Maroc', dial: '+212' },
  { code: 'DZ', name: 'Algérie', dial: '+213' },
  { code: 'TN', name: 'Tunisie', dial: '+216' },
  { code: 'SN', name: 'Sénégal', dial: '+221' },
  { code: 'CI', name: 'Côte d’Ivoire', dial: '+225' },
  { code: 'CM', name: 'Cameroun', dial: '+237' },
  { code: 'CD', name: 'RD Congo', dial: '+243' },
  { code: 'AE', name: 'Émirats Arabes Unis', dial: '+971' },
  { code: 'CN', name: 'Chine', dial: '+86' },
  { code: 'JP', name: 'Japon', dial: '+81' },
  { code: 'BR', name: 'Brésil', dial: '+55' },
  { code: 'PT', name: 'Portugal', dial: '+351' },
  { code: 'NL', name: 'Pays-Bas', dial: '+31' },
  { code: 'TR', name: 'Turquie', dial: '+90' },
  { code: 'QA', name: 'Qatar', dial: '+974' },
  { code: 'SA', name: 'Arabie Saoudite', dial: '+966' },
].sort((a, b) => a.name.localeCompare(b.name));

const SUV_REALISATIONS = [
  {
    image: "https://i.imgur.com/OAsOoJM.jpeg",
    model: "RANGE ROVER",
    submodel: "RED CARPET • EXCLUSIVE EDITION",
    description: "Une configuration magistrale sur tapis rouge. Teinte gris anthracite et jantes forgées noires pour une élégance absolue lors de vos événements de prestige.",
    specs: { power: "530 CH", engine: "V8 4.4L", trans: "AUTO 8" }
  },
  {
    image: "https://i.imgur.com/wNUwC4G.jpeg",
    model: "BYD SEAL U",
    submodel: "PURE ELECTRIC • DESIGN SILVER",
    description: "L'excellence technologique chinoise importée en Belgique. Un SUV 100% électrique alliant confort premium et autonomie record.",
    specs: { power: "313 CH", engine: "ELECTRIQUE", trans: "SINGLE" }
  },
  {
    image: "https://i.imgur.com/UsmE1wP.jpeg",
    model: "MERCEDES G-CLASS",
    submodel: "KLASSEN PERFORMANCE • NIGHT PACK",
    description: "Préparation exclusive Klassen sur base de G63 AMG. Un monstre de puissance à la finition nocturne irréprochable.",
    specs: { power: "585 CH", engine: "V8 BITURBO", trans: "AMG SPEED" }
  },
  {
    image: "https://i.imgur.com/NG0BlBO.jpeg",
    model: "LAND ROVER DISCOVERY",
    submodel: "R-DYNAMIC • SNOW WHITE",
    description: "Le SUV familial par excellence. Polyvalence extrême et design épuré pour ce modèle 7 places prêt pour l'aventure.",
    specs: { power: "300 CH", engine: "L6 MHEV", trans: "ZF 8HP" }
  },
  {
    image: "https://i.imgur.com/vYwCxfF.jpeg",
    model: "TOYOTA PRADO",
    submodel: "BLACK SERIES • TXL PACK",
    description: "Robustesse légendaire et fiabilité sans faille. Le compagnon idéal pour les missions exigeantes et les longs trajets.",
    specs: { power: "204 CH", engine: "2.8L DIESEL", trans: "AUTO 6" }
  }
];

const ImportExportDetail: React.FC = () => {
  const { sector } = useParams<{ sector: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    prefix: '+32',
    prefixCode: 'BE',
    telephone: '',
    modeleRecherche: '',
    budget: '',
    delai: ''
  });

  useEffect(() => {
    if (sector !== 'vehicules') return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SUV_REALISATIONS.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [sector]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.dial.includes(searchQuery)
    );
  }, [searchQuery]);

  const sectorData = {
    vehicules: {
      title: 'SUV & Prestige',
      desc: 'Expertise exclusive en importation de SUV et 4x4 de prestige. Nous sourçons, auditons et livrons vos véhicules Land Cruiser, Range Rover et Nissan avec une rigueur absolue.',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920',
      icon: <Car className="h-12 w-12" />,
      formLabel: 'Modèle de SUV recherché',
      placeholder: 'ex: Land Cruiser 300 V6, Range Rover Sport...'
    },
    materiaux: {
      title: 'Pôle Matériaux',
      desc: 'Approvisionnement industriel et logistique pour le bâtiment et les travaux publics.',
      image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1920',
      icon: <HardHat className="h-12 w-12" />,
      formLabel: 'Type et quantité de matériaux',
      placeholder: 'ex: 100 tonnes d\'acier structurel, bois de charpente'
    },
    alimentation: {
      title: 'Pôle Alimentation',
      desc: 'Import-export de denrées agroalimentaires avec respect strict de la chaîne logistique.',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1920',
      icon: <Utensils className="h-12 w-12" />,
      formLabel: 'Type de produits et spécificités (Frais, sec, bio)',
      placeholder: 'ex: Riz Basmati, 20 containers, certification Bio'
    }
  }[sector as string] || null;

  if (!sectorData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (isSuccess) setIsSuccess(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    const required = ['nomComplet', 'email', 'telephone', 'modeleRecherche', 'budget', 'delai'];
    
    required.forEach(field => {
      if (!formData[field as keyof typeof formData]?.toString().trim()) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('https://rexsolutions.vercel.app/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nomComplet,
          email: formData.email,
          telephone: `${formData.prefix} ${formData.telephone}`,
          details: formData.modeleRecherche,
          budget: formData.budget,
          delai: formData.delai,
          secteur: sectorData.title
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        console.error("Erreur API :", errorData);
        alert(`Désolé, le serveur a renvoyé une erreur : ${errorData.error || response.statusText}`);
      }
    } catch (err) {
      console.error("Erreur Fetch :", err);
      alert("Impossible de joindre le service d'envoi. Veuillez vérifier votre connexion ou réessayer plus tard. Si le problème persiste, contactez-nous au +32 466 253 255.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass = "w-full py-3 bg-transparent border-b-2 outline-none transition-all font-medium text-base";
  const getInputBorder = (name: string) => errors[name] ? "border-red-500 focus:border-red-600 animate-pulse-red" : "border-gray-100 focus:border-black";
  const getLabelColor = (name: string) => errors[name] ? "text-red-500" : "text-gray-400";

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-32 overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={sectorData.image} className="w-full h-full object-cover grayscale opacity-60 scale-105" alt={sectorData.title} />
          {/* Strengthened gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/60 to-white/20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20 text-white">
          <Link to="/import-export" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors mb-8 group drop-shadow-md">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Retour à l'Import-Export
          </Link>
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
              {sectorData.icon}
            </div>
            {/* Added shadow for maximum legibility */}
            <h1 className="text-4xl md:text-[5.5rem] font-black tracking-tighter uppercase leading-[0.85] mb-6 animate-in slide-in-from-bottom-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              {sectorData.title}
            </h1>
            <p className="text-lg md:text-2xl text-gray-100 font-light max-w-2xl leading-relaxed drop-shadow-md opacity-90">
              {sectorData.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Galeries SUV */}
      {sector === 'vehicules' && (
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-center mb-16 text-gray-900">NOS RÉALISATIONS</h2>
            <div className="relative h-[650px] md:h-[800px] rounded-[3rem] overflow-hidden bg-black shadow-2xl">
              {SUV_REALISATIONS.map((real, idx) => (
                <div key={idx} className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                  <img src={real.image} className={`w-full h-full object-cover transition-all duration-[10000ms] ${idx === currentSlide ? 'scale-110' : 'scale-100'}`} alt={real.model} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute inset-0 p-8 md:p-20 flex flex-col justify-end">
                    <h3 className="text-3xl md:text-6xl font-black text-white uppercase mb-2 drop-shadow-lg">{real.model}</h3>
                    <h4 className="text-xl md:text-3xl font-black text-white/70 uppercase mb-8 drop-shadow-md">{real.submodel}</h4>
                    <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/20">
                      <div><p className="text-[10px] font-black text-white/50 uppercase mb-1 tracking-widest">Puissance</p><p className="text-white font-bold">{real.specs.power}</p></div>
                      <div><p className="text-[10px] font-black text-white/50 uppercase mb-1 tracking-widest">Moteur</p><p className="text-white font-bold">{real.specs.engine}</p></div>
                      <div><p className="text-[10px] font-black text-white/50 uppercase mb-1 tracking-widest">Boîte</p><p className="text-white font-bold">{real.specs.trans}</p></div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute right-8 bottom-8 z-30 flex items-center gap-4">
                <button onClick={() => setCurrentSlide(prev => (prev === 0 ? SUV_REALISATIONS.length - 1 : prev - 1))} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all flex items-center justify-center shadow-xl"><ChevronLeft className="h-5 w-5"/></button>
                <button onClick={() => setCurrentSlide(prev => (prev === SUV_REALISATIONS.length - 1 ? 0 : prev + 1))} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all flex items-center justify-center shadow-xl"><ChevronRight className="h-5 w-5"/></button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Formulaire */}
      <section id="form-section" className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Processus */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-gray-900">Processus d'Importation</h2>
              <div className="space-y-8">
                {[
                  { n: '01', t: 'Briefing Client', d: 'Remplissez le formulaire avec vos critères précis.' },
                  { n: '02', t: 'Sourcing & Audit', d: 'Rex Solutions identifie les meilleures opportunités mondiales.' },
                  { n: '03', t: 'Logistique VIP', d: 'Gestion du transport sécurisé jusqu\'à votre porte.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-6 group">
                    <span className="text-5xl font-black text-gray-100 group-hover:text-black transition-colors">{step.n}</span>
                    <div><h4 className="font-bold text-xl mb-1 text-gray-900">{step.t}</h4><p className="text-gray-500 text-sm leading-relaxed">{step.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black text-white p-10 rounded-[3rem] shadow-2xl border border-white/5">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6 tracking-[0.4em]">Garanties Rex Solutions</h3>
              <ul className="space-y-4">
                {["Certificats de non-accidentologie", "Historique complet constructeur", "Frais optimisés", "Livraison confidentielle"].map((g, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]"><ShieldCheck className="h-5 w-5 text-white/60" /> {g}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-7">
            <div className={`bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl border transition-all duration-500 ${isSuccess ? 'border-green-400 bg-green-50/20' : 'border-gray-100'}`}>
              <h2 className="text-2xl font-black mb-10 uppercase tracking-tight text-gray-900">Dossier de Recherche</h2>
              <form onSubmit={handleRequestQuote} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest transition-colors ${getLabelColor('nomComplet')}`}>Nom Complet</label>
                    <input type="text" name="nomComplet" value={formData.nomComplet} onChange={handleInputChange} placeholder="Jean Dupont" className={`${inputBaseClass} ${getInputBorder('nomComplet')}`} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest transition-colors ${getLabelColor('email')}`}>Email Direct</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="contact@pro.be" className={`${inputBaseClass} ${getInputBorder('email')}`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 relative" ref={dropdownRef}>
                    <label className={`text-[9px] font-black uppercase tracking-widest transition-colors ${getLabelColor('telephone')}`}>Téléphone Mobile</label>
                    <div className="flex gap-2">
                      <div onClick={() => !isSuccess && setIsDropdownOpen(!isDropdownOpen)} className={`w-[110px] flex items-center justify-between border-b-2 py-3 cursor-pointer transition-all ${errors.telephone ? 'border-red-500' : 'border-gray-100 hover:border-black'}`}>
                        <div className="flex items-center gap-2">
                          <img src={`https://flagcdn.com/w40/${formData.prefixCode.toLowerCase()}.png`} className="h-3 w-5 object-cover rounded-sm shadow-sm" alt="Flag" />
                          <span className="text-sm font-bold">{formData.prefix}</span>
                        </div>
                        <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      <input type="tel" name="telephone" value={formData.telephone} onChange={handleInputChange} placeholder="000 00 00 00" className={`flex-1 ${inputBaseClass} ${getInputBorder('telephone')}`} />
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-full md:w-[280px] bg-white mt-2 rounded-2xl shadow-2xl border border-gray-100 z-[100] animate-in fade-in slide-in-from-top-2">
                          <div className="p-3 border-b border-gray-50 flex items-center gap-2">
                            <Search className="h-4 w-4 text-gray-400" />
                            <input type="text" placeholder="Rechercher un pays..." className="w-full text-xs outline-none bg-transparent" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                          </div>
                          <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                            {filteredCountries.map(c => (
                              <div key={c.code} onClick={() => { setFormData(prev => ({ ...prev, prefix: c.dial, prefixCode: c.code })); setIsDropdownOpen(false); setSearchQuery(''); }} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                                <div className="flex items-center gap-3">
                                  <img src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} className="h-4 w-6 object-cover rounded-sm" alt={c.name} />
                                  <span className="text-xs font-bold text-gray-700">{c.name}</span>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 group-hover:text-black">{c.dial}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest transition-colors ${getLabelColor('modeleRecherche')}`}>{sectorData.formLabel}</label>
                    <input type="text" name="modeleRecherche" value={formData.modeleRecherche} onChange={handleInputChange} placeholder={sectorData.placeholder} className={`${inputBaseClass} ${getInputBorder('modeleRecherche')}`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest transition-colors ${getLabelColor('budget')}`}>Budget (€)</label>
                    <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} placeholder="ex: 120.000 €" className={`${inputBaseClass} ${getInputBorder('budget')}`} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest transition-colors ${getLabelColor('delai')}`}>Délai souhaité</label>
                    <input type="text" name="delai" value={formData.delai} onChange={handleInputChange} placeholder="ex: Sous 30 jours" className={`${inputBaseClass} ${getInputBorder('delai')}`} />
                  </div>
                </div>

                {Object.keys(errors).length > 0 && (
                  <div className="flex items-center gap-2 text-red-500 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Veuillez remplir tous les champs marqués en rouge</span>
                  </div>
                )}

                <div className="pt-6">
                  <button 
                    disabled={isSubmitting} 
                    type="submit" 
                    className={`w-full py-5 font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] ${
                      isSuccess 
                        ? 'bg-green-600 text-white cursor-default' 
                        : 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>ENVOI EN COURS...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>DEMANDE TRANSMISE !</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>DEMANDER LE DEVIS</span>
                      </>
                    )}
                  </button>
                  
                  {isSuccess && (
                    <div className="mt-8 text-center animate-in fade-in slide-in-from-top-4">
                      <p className="text-gray-700 text-sm font-medium leading-relaxed">
                        Merci pour votre confiance ! <br/>
                        Votre dossier de recherche a été transmis avec succès. <br/>
                        <span className="text-black font-bold">Faradji Régis</span> (Gérant - Rex Solutions) traitera votre demande sous <span className="underline decoration-green-500 decoration-2">24 heures</span>.
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #000; }
        
        @keyframes pulse-red {
          0%, 100% { border-color: #ef4444; }
          50% { border-color: #fca5a5; }
        }
        .animate-pulse-red {
          animation: pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default ImportExportDetail;
