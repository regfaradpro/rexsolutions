
import React, { useState, useMemo } from 'react';
/* Added X for the close button in the zoom modal */
import { Search, ChevronRight, Star, Truck, MapPin, Filter, ArrowUpDown, ChevronDown, Check, Package, Info, ArrowLeft, Shield, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'gros-oeuvre', name: 'Gros Œuvre' },
  { id: 'acier', name: 'Acier & Armatures' },
  { id: 'bois', name: 'Bois & Charpente' },
  { id: 'toiture', name: 'Toiture & Isolation' },
  { id: 'outillage', name: 'Outillage Pro' },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Ciment Portland CEM II/A-LL 42,5 N",
    brand: "Rex Premium",
    category: "gros-oeuvre",
    image: "https://i.imgur.com/vxYPHmt.jpeg",
    description: "Ciment gris polyvalent pour travaux de bâtiment et génie civil.",
    specs: ["Sac de 25 kg", "Certifié Benor"],
    price: 8.45,
    unit: "sac",
    rating: 4.8,
    reviews: 124,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 2,
    name: "Treillis soudé de structure BE500S",
    brand: "Rex Steel",
    category: "acier",
    image: "https://i.imgur.com/1yIOHJc.png",
    description: "Armature pour béton armé, haute adhérence.",
    specs: ["Maille 150x150mm", "Fil 8mm", "2.4m x 5.0m"],
    price: 42.90,
    unit: "panneau",
    rating: 4.9,
    reviews: 45,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 3,
    name: "Poutre Chêne massif brut de sciage",
    brand: "Ardennes Wood",
    category: "bois",
    image: "https://i.imgur.com/pIXKFNY.jpeg",
    description: "Bois noble pour charpente traditionnelle et décoration.",
    specs: ["Section 15x15cm", "Long. 3m", "Qualité Q-P2"],
    price: 89.00,
    unit: "pièce",
    rating: 4.7,
    reviews: 28,
    stock: false,
    delivery: "24h",
    badge: null
  },
  {
    id: 4,
    name: "Laine de roche Rockwool Delta-Fix",
    brand: "Rockwool",
    category: "toiture",
    image: "https://i.imgur.com/OWHj0Q5.jpeg",
    description: "Panneau isolant thermique et acoustique pour toiture inclinée.",
    specs: ["Ep. 160mm", "R=4.55", "Colis de 2.16m²"],
    price: 15.25,
    unit: "m²",
    rating: 4.6,
    reviews: 89,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 5,
    name: "Bloc de béton creux haute résistance",
    brand: "Rex Concrete",
    category: "gros-oeuvre",
    image: "https://i.imgur.com/Y7Qzx2v.png",
    description: "Bloc standard pour murs porteurs et soubassements.",
    specs: ["19x19x39cm", "Résistance B40", "Palette de 60"],
    price: 1.15,
    unit: "pièce",
    rating: 4.5,
    reviews: 210,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 6,
    name: "Fer à béton HA diam. 12mm",
    brand: "SteelPro",
    category: "acier",
    image: "https://i.imgur.com/3fpRPgB.jpeg",
    description: "Barre d'acier nervuré pour renfort béton.",
    specs: ["Diamètre 12mm", "Long. 6m", "Soudable"],
    price: 11.80,
    unit: "barre",
    rating: 4.8,
    reviews: 67,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 7,
    name: "Brique terre cuite",
    brand: "Wienerberger",
    category: "gros-oeuvre",
    image: "https://i.imgur.com/umfSUj9.jpeg",
    description: "Brique alvéolaire en terre cuite offrant une isolation thermique renforcée et une excellente inertie. Idéale pour la construction de murs porteurs performants.",
    specs: ["Terre cuite alvéolaire", "Isolation thermique intégrée", "Pose à joint mince", "Conforme RT / RE en vigueur"],
    price: 1.45,
    unit: "pièce",
    rating: 4.9,
    reviews: 156,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 8,
    name: "Béton prêt à l'emploi structurel",
    brand: "Holcim",
    category: "gros-oeuvre",
    image: "https://i.imgur.com/weLQqR0.jpeg",
    description: "Béton formulé en centrale pour ouvrages structurels nécessitant une résistance élevée et une mise en œuvre fiable sur chantier.",
    specs: ["Béton normalisé", "Résistance adaptée aux fondations et dalles", "Livraison en toupie", "Qualité constante"],
    price: 145.00,
    unit: "m³",
    rating: 4.8,
    reviews: 42,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 9,
    name: "Chaux hydraulique naturelle",
    brand: "Vicat",
    category: "gros-oeuvre",
    image: "https://i.imgur.com/kglxVEr.jpeg",
    description: "Liant traditionnel destiné aux travaux de restauration, maçonnerie ancienne et enduits respirants. Respecte les supports anciens et favorise les échanges hygrométriques.",
    specs: ["Chaux hydraulique naturelle", "Haute compatibilité avec la pierre", "Bonne perméabilité à la vapeur", "Adaptée aux bâtiments anciens"],
    price: 12.60,
    unit: "sac",
    rating: 4.7,
    reviews: 35,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 10,
    name: "Granulats de construction",
    brand: "Colas",
    category: "gros-oeuvre",
    image: "https://i.imgur.com/3C6DFJi.jpeg",
    description: "Granulats issus de carrières contrôlées, destinés aux bétons, couches de fondation et travaux de voirie et réseaux divers (VRD).",
    specs: ["Granulométrie maîtrisée", "Haute résistance mécanique", "Usage béton, drainage, fondations", "Conforme normes travaux publics"],
    price: 38.00,
    unit: "tonne",
    rating: 4.6,
    reviews: 78,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 11,
    name: "Pierre Naturelle de construction",
    brand: "Rocamat",
    category: "gros-oeuvre",
    image: "https://i.imgur.com/8laZkAP.jpeg",
    description: "Pierre calcaire sélectionnée pour la maçonnerie, les façades et les ouvrages architecturaux. Allie durabilité, esthétique et performance structurelle.",
    specs: ["Pierre naturelle française", "Forte durabilité", "Finition brute ou taillée", "Usage structurel et décoratif"],
    price: 185.00,
    unit: "m²",
    rating: 4.9,
    reviews: 19,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 12,
    name: "Barres d’armature HA",
    brand: "ArcelorMittal",
    category: "acier",
    image: "https://i.imgur.com/nrhrhVg.jpeg",
    description: "Aciers nervurés haute adhérence conçus pour le ferraillage des fondations, poteaux et poutres. Offrent une adhérence optimale au béton et une haute résistance mécanique.",
    specs: ["Diamètre 10mm", "Long. 6m", "Haute Adhérence", "Acier S500"],
    price: 10.20,
    unit: "barre",
    rating: 4.9,
    reviews: 92,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 13,
    name: "Fil machine pour armatures",
    brand: "Bekaert",
    category: "acier",
    image: "https://i.imgur.com/eB9hSDy.jpeg",
    description: "Fil d’acier utilisé pour la fabrication de treillis soudés, ligatures et éléments de renfort. Haute régularité dimensionnelle et excellente ductilité.",
    specs: ["Fil d'acier tréfilé", "Ductilité élevée", "Usage polyvalent", "Conforme NF/BE"],
    price: 0.95,
    unit: "kg",
    rating: 4.7,
    reviews: 54,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 14,
    name: "Treillis en rouleaux",
    brand: "Riva Group",
    category: "acier",
    image: "https://i.imgur.com/VuF3HDH.gif",
    description: "Solution flexible pour le renforcement des chapes, dallages et ouvrages minces. Facile à transporter, découper et poser sur chantier.",
    specs: ["Maille 150x150mm", "Fil 5mm", "Rouleau 25m x 2.4m", "Pose rapide"],
    price: 125.00,
    unit: "rouleau",
    rating: 4.8,
    reviews: 61,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 15,
    name: "Poutre en bois massif",
    brand: "Piveteaubois",
    category: "bois",
    image: "https://i.imgur.com/Lo9wRyf.jpeg",
    description: "Poutre structurelle en bois massif destinée aux charpentes traditionnelles et ouvrages porteurs. Offre robustesse, durabilité et excellente tenue mécanique.",
    specs: ["Bois massif de charpente", "Usage structurel", "Robustesse élevée", "Tenue mécanique"],
    price: 92.00,
    unit: "pièce",
    rating: 4.9,
    reviews: 31,
    stock: true,
    delivery: "48h",
    badge: null
  },
  {
    id: 16,
    name: "Bois lamellé-collé",
    brand: "Binderholz",
    category: "bois",
    image: "https://i.imgur.com/GAaCFKu.jpeg",
    description: "Élément de charpente haute performance conçu pour grandes portées. Stabilité dimensionnelle élevée et excellente résistance mécanique.",
    specs: ["Lamellé-collé structurel", "Grandes portées", "Stabilité élevée"],
    price: 110.00,
    unit: "mètre",
    rating: 4.8,
    reviews: 24,
    stock: true,
    delivery: "72h",
    badge: null
  },
  {
    id: 17,
    name: "Panneau OSB 3",
    brand: "Kronospan",
    category: "bois",
    image: "https://i.imgur.com/C8iEOCx.jpeg",
    description: "Panneau structurel en copeaux orientés, adapté aux planchers, murs et toitures. Résistant à l’humidité et conforme aux usages en milieu porteur.",
    specs: ["OSB 3 construction", "Résistant humidité", "Multi-usage porteur"],
    price: 18.50,
    unit: "panneau",
    rating: 4.7,
    reviews: 112,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 18,
    name: "Bois lamellé-croisé CLT",
    brand: "Stora Enso",
    category: "bois",
    image: "https://i.imgur.com/fU786lW.jpeg",
    description: "Solution constructive innovante pour murs, planchers et toitures en construction bois. Allie solidité structurelle, rapidité de mise en œuvre et performance environnementale.",
    specs: ["Panneau CLT", "Solidité structurelle", "Rapide à poser", "Éco-performant"],
    price: 240.00,
    unit: "m²",
    rating: 5.0,
    reviews: 15,
    stock: true,
    delivery: "7j",
    badge: "Innovation"
  },
  {
    id: 19,
    name: "Tuile en terre cuite",
    brand: "Imerys Toiture",
    category: "toiture",
    image: "https://i.imgur.com/hJUfPHT.jpeg",
    description: "Tuile de couverture en terre cuite offrant une excellente durabilité et une protection optimale contre les intempéries. Adaptée aux toitures traditionnelles et contemporaines.",
    specs: ["Terre cuite premium", "Pose rapide", "Haute résistance"],
    price: 1.85,
    unit: "pièce",
    rating: 4.8,
    reviews: 84,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 20,
    name: "Ardoise naturelle",
    brand: "Cupac",
    category: "toiture",
    image: "https://i.imgur.com/ztMDnMu.png",
    description: "Ardoise naturelle haut de gamme pour toitures inclinées. Résistante au gel, au vent et au vieillissement, elle garantit une longévité exceptionnelle.",
    specs: ["Ardoise naturelle", "Qualité Excellence", "Durabilité séculaire"],
    price: 2.10,
    unit: "pièce",
    rating: 4.9,
    reviews: 56,
    stock: true,
    delivery: "24h",
    badge: "Haut de gamme"
  },
  {
    id: 21,
    name: "Laine de verre",
    brand: "Isover",
    category: "toiture",
    image: "https://i.imgur.com/VaSj7hI.png",
    description: "Isolant thermique et acoustique performant, idéal pour combles perdus et aménagés. Contribue aux économies d’énergie et au confort intérieur.",
    specs: ["R=5.00 (200mm)", "Confort acoustique", "Incombustible"],
    price: 12.40,
    unit: "m²",
    rating: 4.7,
    reviews: 132,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 22,
    name: "Isolant en laine de bois",
    brand: "Steico",
    category: "toiture",
    image: "https://i.imgur.com/ZO7tSGz.jpeg",
    description: "Isolant biosourcé destiné à l’isolation des toitures par l’intérieur ou l’extérieur. Offre une excellente protection thermique d’été et un confort durable.",
    specs: ["Laine de bois biosourcée", "Déphasage thermique", "Régulation hygrométrique"],
    price: 18.90,
    unit: "m²",
    rating: 4.9,
    reviews: 42,
    stock: true,
    delivery: "48h",
    badge: "Bio-sourcé"
  },
  {
    id: 23,
    name: "Perforateur burineur SDS+",
    brand: "Bosch Professional",
    category: "outillage",
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1769481661/PerforateurBosch_z3dpq6.jpg",
    description: "Outil électroportatif haute performance pour le perçage et le burinage du béton et de la maçonnerie. Puissant, fiable et conçu pour un usage intensif sur chantier.",
    specs: ["Perçage & Burinage", "Usage intensif", "Système SDS+"],
    price: 245.00,
    unit: "pièce",
    rating: 4.9,
    reviews: 156,
    stock: true,
    delivery: "24h",
    badge: "Top Pro"
  },
  {
    id: 24,
    name: "Meuleuse d’angle 125 mm",
    brand: "Makita",
    category: "outillage",
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1769481661/MeleuseAngle_fi2co1.jpg",
    description: "Meuleuse compacte et robuste pour la découpe, le meulage et l’ébarbage des métaux et matériaux de construction. Excellente maniabilité et longévité.",
    specs: ["Ø 125 mm", "Compacte & Robuste", "Ébarbage métaux"],
    price: 129.00,
    unit: "pièce",
    rating: 4.8,
    reviews: 210,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 25,
    name: "Visseuse à chocs sans fil",
    brand: "DeWalt",
    category: "outillage",
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1769481663/VisseuseAChocs_hqsbjh.jpg",
    description: "Outil puissant et précis pour le vissage intensif. Idéal pour charpente, ossature bois et montage métallique sur chantier.",
    specs: ["Vissage intensif", "Moteur Brushless", "Ossature bois"],
    price: 189.00,
    unit: "pièce",
    rating: 4.9,
    reviews: 178,
    stock: true,
    delivery: "24h",
    badge: null
  },
  {
    id: 26,
    name: "Niveau laser lignes croisées",
    brand: "Leica Geosystems",
    category: "outillage",
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1769481661/NiveauLaserLignesCroisees_ywz78t.jpg",
    description: "Instrument de mesure professionnel garantissant un alignement précis pour les travaux de maçonnerie, pose de cloisons et aménagement intérieur.",
    specs: ["Précision millimétrique", "Lignes croisées", "Maçonnerie & Cloisons"],
    price: 349.00,
    unit: "pièce",
    rating: 5.0,
    reviews: 42,
    stock: true,
    delivery: "48h",
    badge: "Précision"
  },
  {
    id: 27,
    name: "Scie circulaire professionnelle",
    brand: "Festool",
    category: "outillage",
    image: "https://res.cloudinary.com/dupcar9en/image/upload/v1769481661/ScieCirculairePro_xnyisr.jpg",
    description: "Scie de précision destinée aux découpes nettes et rapides du bois et des panneaux. Qualité de coupe optimale et sécurité renforcée.",
    specs: ["Précision de coupe", "Profondeur réglable", "Sécurité renforcée"],
    price: 520.00,
    unit: "pièce",
    rating: 4.9,
    reviews: 64,
    stock: true,
    delivery: "24h",
    badge: "Expertise"
  }
];

const MaterialsCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#F5F5F5] min-h-screen selection:bg-black selection:text-white relative">
      {/* Zoom Modal (Lightbox) */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white hover:rotate-90 transition-all duration-300 z-[110]"
            onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
          >
            <X className="h-10 w-10" />
          </button>
          <img 
            src={zoomedImage} 
            alt="Zoom produit" 
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-20 z-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Link to="/commerce" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors shrink-0">
              <ArrowLeft className="h-4 w-4" />
              Commerce
            </Link>
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text" 
                placeholder="Quel produit cherchez-vous ?" 
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-black border-2 rounded-full outline-none transition-all font-medium text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Belgique - Rex Solutions Hub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-black">Accueil</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/commerce" className="hover:text-black">Commerce</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-black">Catalogue Matériaux</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest">Filtrer par</h3>
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">Catégorie</h4>
                  <div className="space-y-2">
                    {CATEGORIES.map(cat => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="category"
                          className="hidden"
                          checked={selectedCategory === cat.id}
                          onChange={() => setSelectedCategory(cat.id)}
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedCategory === cat.id ? 'bg-black border-black' : 'border-gray-200 group-hover:border-gray-400'}`}>
                          {selectedCategory === cat.id && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className={`text-sm font-medium transition-colors ${selectedCategory === cat.id ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Listing */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <h1 className="text-xl font-black uppercase tracking-tight">
                {CATEGORIES.find(c => c.id === selectedCategory)?.name} 
                <span className="text-gray-300 ml-2">({filteredProducts.length})</span>
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Trier par :</span>
                  <select 
                    className="bg-transparent font-bold outline-none cursor-pointer hover:text-gray-600"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="relevant">Pertinence</option>
                    <option value="rating">Mieux notés</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="bg-white group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
                  {/* Image Container */}
                  <div className="h-60 bg-[#F9F9F9] relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={p.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={p.name} 
                    />
                    <button 
                      onClick={() => setZoomedImage(p.image)}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md shadow-md rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-black hover:text-white z-20"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{p.brand}</span>
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-[10px] font-bold text-gray-900 ml-1">{p.rating}</span>
                        <span className="text-[10px] text-gray-400 ml-1">({p.reviews})</span>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight hover:underline cursor-pointer flex-1 line-clamp-2">
                      {p.name}
                    </h3>

                    <div className="space-y-1 mb-6">
                      {p.specs.map((s, i) => (
                        <p key={i} className="text-[11px] text-gray-500 font-medium italic">{s}</p>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-50">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-black text-black uppercase tracking-widest">
                            <Truck className="h-3.5 w-3.5" />
                            Livraison {p.delivery}
                          </div>
                        </div>
                        <Link to="/import-export/materiaux#devis-form" className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95 group/btn flex items-center gap-2">
                          <span className="hidden group-hover:block text-[10px] font-black uppercase tracking-widest pl-2">Devis</span>
                          <Package className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <Package className="h-16 w-16 text-gray-200 mx-auto mb-6" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-400 text-sm">Ajustez vos filtres ou contactez-nous pour une recherche personnalisée.</p>
                <button onClick={() => {setSelectedCategory('all'); setSearchQuery('');}} className="mt-8 px-6 py-3 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl">Voir tout le catalogue</button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer Info Retail */}
      <section className="bg-white border-t border-gray-200 py-16 mt-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex gap-6 items-start">
            <div className="bg-gray-100 p-4 rounded-2xl">
              <Truck className="h-8 w-8 text-black" />
            </div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-widest mb-2">Livraison Chantier</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-light">Service de transport dédié avec déchargement grue disponible sur demande pour tous vos matériaux lourds.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="bg-gray-100 p-4 rounded-2xl">
              <Shield className="h-8 w-8 text-black" />
            </div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-widest mb-2">Qualité Certifiée</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-light">Nous ne sourçons que des produits répondant aux normes Benor, CE et ATG pour garantir la solidité de vos ouvrages.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="bg-gray-100 p-4 rounded-2xl">
              <ArrowUpDown className="h-8 w-8 text-black" />
            </div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-widest mb-2">Tarifs Professionnels</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-light">Bénéficiez de remises quantitatives et d'une tarification dégressive pour vos projets de grande envergure.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        input[type='range'] {
          -webkit-appearance: none;
          height: 4px;
          border-radius: 2px;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: #000;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default MaterialsCatalog;
