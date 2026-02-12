
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Car, HardHat, Utensils, ArrowLeft, ArrowRight, Send, CheckCircle2, Loader2, ShieldCheck, ChevronLeft, ChevronRight, Search, ChevronDown, AlertCircle, Fuel, X } from 'lucide-react';

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

const BRAND_LOGOS = [
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738837/LandRover_cdh408.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738837/range_Rover_vb2ved.png",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738834/nissan2_rumxu2.png",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738832/mitsubishi_ndtchy.png",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738831/merco2_uxqgkl.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738829/initinity2_kyogg1.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770738828/byd_p3lzk5.jpg"
];

const TRUCK_BRAND_LOGOS = [
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743810/volvo_bewshu.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743809/scania_vgo323.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743808/mercedes-benz_ia0vpj.jpg",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743808/MAN_Truck___Bus_-_Logo.svg_hugeju.png",
  "https://res.cloudinary.com/dupcar9en/image/upload/v1770743807/freightliner_lxbjyp.png"
];

const SUV_REALISATIONS = [
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737558/RangeRoverSport_iuyioi.jpg",
    model: "RANGE ROVER",
    submodel: "DARK SHADOW • RED CARPET CONFIG",
    description: "Présentation exclusive sur tapis rouge. Finition full black satinée et jantes forgées. Un sourcing direct pour une présence diplomatique inégalée.",
    specs: { power: "530 CH", engine: "V8 4.4L", trans: "AUTO 8" },
    tag: "PHOTO 1"
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737557/byd_seal_u_03_gbnsbm.jpg",
    model: "BYD SEAL U",
    submodel: "DESIGN SILVER • STUDIO EDITION",
    description: "Le futur de la mobilité électrique premium. Design fluide et technologie de batterie révolutionnaire pour une autonomie étendue.",
    specs: { power: "313 CH", engine: "ELECTRIQUE", trans: "SINGLE" },
    tag: "PHOTO 2"
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737558/MG63AMG2_f311qk.jpg",
    model: "MERCEDES G-CLASS",
    submodel: "KLASSEN NIGHT EDITION",
    description: "La G-Wagon AMG dans sa version la plus radicale. Préparation nocturne avec éclairage LED adaptatif et signature Klassen.",
    specs: { power: "585 CH", engine: "V8 BITURBO", trans: "AMG SPEED" },
    tag: "PHOTO 3"
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737557/Discovery_wzoa4s.jpg",
    model: "LAND ROVER DISCOVERY",
    submodel: "R-DYNAMIC WHITE EDITION",
    description: "L'élégance polyvalente devant le showroom. Un espace généreux allié à des capacités de franchissement record.",
    specs: { power: "300 CH", engine: "L6 HYBRID", trans: "ZF 8HP" },
    tag: "PHOTO 5"
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737557/LandCruiser_ajmaq1.jpg",
    model: "TOYOTA PRADO",
    submodel: "TXL BLACK MOUNTAIN",
    description: "L'équilibre parfait entre robustesse et confort. Une silhouette imposante pour une efficacité redoutable sur tous terrains.",
    specs: { power: "204 CH", engine: "2.8L DIESEL", trans: "AUTO 6" },
    tag: "PHOTO 6"
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737558/Range_Rover_swytg7.jpg",
    model: "RANGE ROVER SPORT",
    submodel: "DYNAMIC SE WHITE",
    description: "Lignes épurées et sportivité affirmée. Importation certifiée avec historique complet. Le SUV dynamique par excellence.",
    specs: { power: "440 CH", engine: "L6 HYBRID", trans: "AUTO 8" },
    tag: "PHOTO 7"
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770737557/2025_Nissan_X-Trail_Nismo_Advanced_Package_e-4ORCE_loiduk.jpg",
    model: "NISSAN X-TRAIL NISMO",
    submodel: "PERFORMANCE GREY • RED ACCENTS",
    description: "L'ADN de compétition Nismo appliqué au SUV. Look agressif avec pack aérodynamique et détails rouges signature.",
    specs: { power: "213 CH", engine: "E-POWER", trans: "E-4ORCE" },
    tag: "PHOTO 8"
  }
];

const TANKER_REALISATIONS = [
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770745282/mercedes-benz-trucks_stawgy.jpg",
    model: "MERCEDES-BENZ AROCS",
    submodel: "TANKER PRO EDITION",
    description: "Le fer de lance du transport de fluides. Conçu pour la robustesse et une efficacité opérationnelle maximale dans les environnements exigeants.",
    specs: { power: "480 CH", engine: "OM 471", trans: "POWERSHIFT 3" }
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770743840/Volvo-trucks_k17xnh.jpg",
    model: "VOLVO FH16",
    submodel: "GLOBETROTTER TANKER",
    description: "L'excellence suédoise pour vos transports longue distance. Sécurité active de pointe et confort de conduite inégalé pour le transport ADR.",
    specs: { power: "750 CH", engine: "D16K", trans: "I-SHIFT" }
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770743839/Scania_poerpq.jpg",
    model: "SCANIA R-SERIES",
    submodel: "SUPER TANKER CONFIG",
    description: "Efficacité énergétique record et fiabilité légendaire. Le choix privilégié pour le transport d'hydrocarbures haute intensité.",
    specs: { power: "540 CH", engine: "DC13", trans: "OPTICRUISE" }
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770743837/Man-Trucks_hcquzh.webp",
    model: "MAN TGX",
    submodel: "EFFICIENTLINE TANK",
    description: "Ingénierie allemande au service de la rentabilité. Un aérodynamisme optimisé pour une consommation réduite lors des livraisons industrielles.",
    specs: { power: "510 CH", engine: "D26", trans: "MAN TipMatic" }
  },
  {
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1770743836/Freightliner_mkyb6j.jpg",
    model: "FREIGHTLINER CASCADIA",
    submodel: "HEAVY DUTY TANKER",
    description: "La puissance américaine adaptée aux besoins globaux. Une plateforme technologique avancée pour une disponibilité maximale.",
    specs: { power: "505 CH", engine: "DETROIT DD15", trans: "DT12" }
  }
];

const ImportExportDetail: React.FC = () => {
  const { sector } = useParams<{ sector: string }>();
  const { hash } = useLocation();
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

  // Gestion du défilement automatique vers le formulaire si le hash est présent
  useEffect(() => {
    if (hash === '#devis-form') {
      const timer = setTimeout(() => {
        const element = document.getElementById('devis-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Petit délai pour laisser le temps au composant de se monter et au ScrollToTop global de s'exécuter
      return () => clearTimeout(timer);
    }
  }, [hash]);

  useEffect(() => {
    if (sector !== 'vehicules' && sector !== 'camions-citernes') return;
    const items = sector === 'vehicules' ? SUV_REALISATIONS : TANKER_REALISATIONS;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
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
      placeholder: 'ex: Land Cruiser 300 V6, Range Rover Sport...',
      gallery: SUV_REALISATIONS
    },
    'camions-citernes': {
      title: 'Camions-Citernes',
      desc: 'Approvisionnement spécialisé en camions-citernes industriels. Hydrocarbures, eau potable, produits chimiques ou alimentaires : nous gérons la conformité ADR et l\'importation complète.',
      image: 'https://res.cloudinary.com/dupcar9en/image/upload/v1770743835/mercedes-benz-trucks_vovkse.jpg',
      icon: <Fuel className="h-12 w-12" />,
      formLabel: 'Type de citerne & Capacité (m³)',
      placeholder: 'ex: Citerne hydrocarbure 45.000L, Citerne inox alimentaire...',
      gallery: TANKER_REALISATIONS
    },
    materiaux: {
      title: 'Pôle Matériaux',
      desc: 'Approvisionnement industriel et logistique pour le bâtiment et les travaux publics.',
      image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1920',
      icon: <HardHat className="h-12 w-12" />,
      formLabel: 'Type et quantité de matériaux',
      placeholder: 'ex: 100 tonnes d\'acier structurel, bois de charpente',
      gallery: null
    },
    alimentation: {
      title: 'Pôle Alimentation',
      desc: 'Import-export de denrées agroalimentaires avec respect strict de la chaîne logistique.',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1920',
      icon: <Utensils className="h-12 w-12" />,
      formLabel: 'Type de produits et spécificités (Frais, sec, bio)',
      placeholder: 'ex: Riz Basmati, 20 containers, certification Bio',
      gallery: null
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
      let endpoint = "/api/send-email";
      let body: any = {};

      if (sector === "materiaux") {
        endpoint = "/api/send-materials-email";
        body = {
          nomComplet: formData.nomComplet,
          email: formData.email,
          phone: `${formData.prefix} ${formData.telephone}`,
          typeMateriaux: formData.modeleRecherche,
          budget: formData.budget,
          delai: formData.delai,
        };
      }

      else if (sector === "camions-citernes") {
        endpoint = "/api/send-camion-citerne-email";
        body = {
          nomComplet: formData.nomComplet,
          email: formData.email,
          phone: `${formData.prefix} ${formData.telephone}`,
          typeCiterne: formData.modeleRecherche,
          budget: formData.budget,
          delai: formData.delai,
        };
      }

      else {
        endpoint = "/api/send-email";
        body = {
          name: formData.nomComplet,
          email: formData.email,
          phone: `${formData.prefix} ${formData.telephone}`,
          model: formData.modeleRecherche,
          budget: formData.budget,
          delay: formData.delai,
          sector: sectorData.title,
        };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur API");

      setIsSuccess(true);

      // ✅ RESET AUTOMATIQUE (comme Transport)
      setTimeout(() => {
        setFormData({
          nomComplet: '',
          email: '',
          prefix: '+32',
          prefixCode: 'BE',
          telephone: '',
          modeleRecherche: '',
          budget: '',
          delai: ''
        });

        setIsSuccess(false);
        setErrors({});
      }, 5000);

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’envoi. Contactez-nous au +32 466 253 255.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const selectCountry = (c: typeof COUNTRIES[0]) => {
    setFormData(prev => ({ ...prev, prefix: c.dial, prefixCode: c.code }));
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const inputBaseClass = "w-full py-3 bg-transparent border-b-2 outline-none transition-all font-medium text-base";
  const getInputBorder = (name: string) => errors[name] ? "border-red-500 animate-pulse-red" : "border-gray-100 focus:border-black";
  const getLabelColor = (name: string) => errors[name] ? "text-red-500" : "text-gray-400";

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white pb-32 overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={sectorData.image} className="w-full h-full object-cover grayscale opacity-60 scale-105" alt={sectorData.title} />
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
            <h1 className="text-4xl md:text-[5.5rem] font-black tracking-tighter uppercase leading-[0.85] mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              {sectorData.title}
            </h1>
            <p className="text-lg md:text-2xl text-gray-100 font-light max-w-2xl leading-relaxed drop-shadow-md opacity-90">
              {sectorData.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Galerie Dynamique */}
      {sectorData.gallery && (
        <section className="py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-center mb-12 text-gray-900">NOS RÉALISATIONS</h2>
            <div className="relative h-[500px] md:h-[650px] rounded-[3rem] overflow-hidden bg-black shadow-2xl">
              {sectorData.gallery.map((real: any, idx: number) => (
                <div key={idx} className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                  <img src={real.image} className={`w-full h-full object-cover transition-all duration-[10000ms] ${idx === currentSlide ? 'scale-110' : 'scale-100'}`} alt={real.model} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end">
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-1 drop-shadow-lg">{real.model}</h3>
                    <h4 className="text-xl md:text-2xl font-black text-white/70 uppercase mb-6 drop-shadow-md">{real.submodel}</h4>
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                      <div><p className="text-[10px] font-black text-white/50 uppercase mb-1 tracking-widest">Puissance</p><p className="text-white font-bold">{real.specs.power}</p></div>
                      <div><p className="text-[10px] font-black text-white/50 uppercase mb-1 tracking-widest">Moteur</p><p className="text-white font-bold">{real.specs.engine}</p></div>
                      <div><p className="text-[10px] font-black text-white/50 uppercase mb-1 tracking-widest">Boîte</p><p className="text-white font-bold">{real.specs.trans}</p></div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute right-8 bottom-8 z-30 flex items-center gap-4">
                <button onClick={() => setCurrentSlide(prev => (prev === 0 ? sectorData.gallery!.length - 1 : prev - 1))} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all flex items-center justify-center shadow-xl"><ChevronLeft className="h-5 w-5" /></button>
                <button onClick={() => setCurrentSlide(prev => (prev === sectorData.gallery!.length - 1 ? 0 : prev + 1))} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all flex items-center justify-center shadow-xl"><ChevronRight className="h-5 w-5" /></button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Logos de marques - Uniquement affichés pour le secteur véhicules ou camions-citernes */}
      {(sector === 'vehicules' || sector === 'camions-citernes') && (
        <section className="pb-24 pt-8 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-80">
              {(sector === 'vehicules' ? BRAND_LOGOS : TRUCK_BRAND_LOGOS).map((logo, i) => (
                <div key={i} className="h-12 md:h-16 w-auto group transition-all duration-500">
                  <img
                    src={logo}
                    alt="Marque partenaire"
                    className="h-full w-auto object-contain transition-all duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catalogue CTA Section for Materials */}
      {sector === 'materiaux' && (
        <section className="bg-gray-50 border-y border-gray-100 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">Catalogue de Matériaux</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Accédez à notre inventaire complet de ciment, briques, acier et bois. Consultez les spécifications techniques détaillées avant de soumettre votre demande d'approvisionnement.
              </p>
            </div>
            <Link
              to="/commerce/catalogue-materiaux"
              className="inline-flex items-center px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all uppercase tracking-widest text-sm shadow-2xl group shrink-0"
            >
              Consulter le catalogue
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      )}

      {/* Formulaire */}
      <section id="devis-form" className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-gray-900">Processus Rex Solutions</h2>
            <div className="space-y-8">
              {[
                { n: '01', t: 'Briefing Client', d: 'Analyse précise de vos besoins industriels ou de prestige.' },
                { n: '02', t: 'Sourcing Expert', d: 'Rex Solutions identifie les opportunités mondiales certifiées.' },
                { n: '03', t: 'Logistique VIP', d: 'Transport sécurisé et dédouanement complet par nos soins.' },
              ].map((step) => (
                <div key={step.n} className="flex gap-6 group">
                  <span className="text-5xl font-black text-gray-100 group-hover:text-black transition-colors">{step.n}</span>
                  <div><h4 className="font-bold text-xl mb-1 text-gray-900">{step.t}</h4><p className="text-gray-500 text-sm leading-relaxed">{step.d}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className={`bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl border transition-all duration-500 ${isSuccess ? 'border-green-400 bg-green-50/20' : 'border-gray-100'}`}>
              <h2 className="text-2xl font-black mb-10 uppercase tracking-tight text-gray-900">Demande de devis</h2>
              <form onSubmit={handleRequestQuote} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest ${getLabelColor('nomComplet')}`}>Nom Complet</label>
                    <input type="text" name="nomComplet" value={formData.nomComplet} onChange={handleInputChange} placeholder="Jean Dupont" className={`${inputBaseClass} ${getInputBorder('nomComplet')}`} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest ${getLabelColor('email')}`}>Email Direct</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="contact@pro.be" className={`${inputBaseClass} ${getInputBorder('email')}`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 relative" ref={dropdownRef}>
                    <label className={`text-[9px] font-black uppercase tracking-widest ${getLabelColor('telephone')}`}>Téléphone Mobile</label>
                    <div className="flex gap-2">
                      <div onClick={() => !isSuccess && setIsDropdownOpen(!isDropdownOpen)} className={`w-[110px] flex items-center justify-between border-b-2 py-3 cursor-pointer ${errors.telephone ? 'border-red-500' : 'border-gray-100 hover:border-black'}`}>
                        <div className="flex items-center gap-2">
                          <img src={`https://flagcdn.com/w40/${formData.prefixCode.toLowerCase()}.png`} className="h-3 w-5 object-cover rounded-sm shadow-sm" alt="Flag" />
                          <span className="text-sm font-bold">{formData.prefix}</span>
                        </div>
                        <ChevronDown className={`h-3 w-3 text-gray-400 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>

                      {/* Country Dropdown List */}
                      {isDropdownOpen && (
                        <div className="absolute top-[100%] left-0 w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] mt-2 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                          <div className="p-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                            <Search className="h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Rechercher un pays..."
                              className="w-full bg-transparent outline-none text-sm font-bold"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              autoFocus
                            />
                            {searchQuery && <button onClick={() => setSearchQuery('')}><X className="h-3 w-3 text-gray-400" /></button>}
                          </div>
                          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            {filteredCountries.map((c) => (
                              <div
                                key={c.code}
                                onClick={() => selectCountry(c)}
                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <img src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} className="h-3 w-5 object-cover rounded-sm shadow-sm" alt={c.name} />
                                  <span className="text-sm font-bold text-gray-700 group-hover:text-black">{c.name}</span>
                                </div>
                                <span className="text-xs font-black text-gray-400 group-hover:text-black">{c.dial}</span>
                              </div>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="p-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest italic">Aucun pays trouvé</div>
                            )}
                          </div>
                        </div>
                      )}

                      <input type="tel" name="telephone" value={formData.telephone} onChange={handleInputChange} placeholder="000 00 00 00" className={`flex-1 ${inputBaseClass} ${getInputBorder('telephone')}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest ${getLabelColor('modeleRecherche')}`}>{sectorData.formLabel}</label>
                    <input type="text" name="modeleRecherche" value={formData.modeleRecherche} onChange={handleInputChange} placeholder={sectorData.placeholder} className={`${inputBaseClass} ${getInputBorder('modeleRecherche')}`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest ${getLabelColor('budget')}`}>Budget Estimatif</label>
                    <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} placeholder="ex: 85.000 €" className={`${inputBaseClass} ${getInputBorder('budget')}`} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[9px] font-black uppercase tracking-widest ${getLabelColor('delai')}`}>Délai de Livraison</label>
                    <input type="text" name="delai" value={formData.delai} onChange={handleInputChange} placeholder="ex: Sous 2 mois" className={`${inputBaseClass} ${getInputBorder('delai')}`} />
                  </div>
                </div>

                <div className="pt-6">
                  <button disabled={isSubmitting} type="submit" className={`w-full py-5 font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl ${isSuccess ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'}`}>
                    {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" /><span>TRAITEMENT...</span></> : isSuccess ? <><CheckCircle2 className="h-5 w-5" /><span>DEMANDE TRANSMISE !</span></> : <><Send className="h-5 w-5" /><span>DEMANDER LE DEVIS</span></>}
                  </button>
                  {isSuccess && <div className="mt-8 text-center text-sm font-medium text-gray-700">L'équipe de Rex Solutions traite votre demande</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse-red { 0%, 100% { border-color: #ef4444; } 50% { border-color: #fca5a5; } }
        .animate-pulse-red { animation: pulse-red 2s infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ImportExportDetail;
