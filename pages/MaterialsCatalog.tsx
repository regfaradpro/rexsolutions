
import React, { useState, useMemo } from 'react';
/* Added Shield to the list of imports from lucide-react */
import { Search, ChevronRight, Star, Truck, MapPin, Filter, ArrowUpDown, ChevronDown, Check, Package, Info, ArrowLeft, Shield } from 'lucide-react';
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
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800&auto=format&fit=crop",
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
  }
];

const MaterialsCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevant');

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
    <div className="bg-[#F5F5F5] min-h-screen selection:bg-black selection:text-white">
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

                <div>
                  <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">Disponibilité</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded-md border-2 border-gray-200 group-hover:border-gray-400 flex items-center justify-center transition-all">
                        <Check className="h-3 w-3 text-transparent group-hover:text-gray-200" />
                      </div>
                      <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">En stock</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded-md border-2 border-gray-200 group-hover:border-gray-400 flex items-center justify-center transition-all">
                        <Check className="h-3 w-3 text-transparent group-hover:text-gray-200" />
                      </div>
                      <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">Sur commande</span>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div className="text-[10px] font-bold text-gray-500 leading-tight uppercase tracking-widest">
                      Plus de <span className="text-black">2500</span> références professionnelles
                    </div>
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
                    <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md shadow-md rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-black hover:text-white">
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
                        <Link to="/import-export/materiaux" className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95 group/btn flex items-center gap-2">
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
