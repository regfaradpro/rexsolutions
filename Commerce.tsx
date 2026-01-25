
import React, { useState } from 'react';
import { ShoppingBag, Laptop, Smartphone, Users, ArrowRight, CheckCircle2, HardHat, Pickaxe, Truck, Layers, Ruler, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Commerce: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'digital' | 'materials'>('digital');

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

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-20">
          <ShoppingBag className="h-96 w-96 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-4 block">Pôle Commerce</span>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
            Solutions de Vente <br/> <span className="text-gray-500">& Matériaux BTP</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed font-light">
            De la digitalisation de votre point de vente à l'approvisionnement logistique de vos chantiers, Rex Solutions centralise vos besoins professionnels.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <button 
            onClick={() => setActiveTab('digital')}
            className={`px-8 py-5 text-sm font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'digital' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
          >
            Services Numériques
          </button>
          <button 
            onClick={() => setActiveTab('materials')}
            className={`px-8 py-5 text-sm font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'materials' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
          >
            Matériaux de Construction
          </button>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'digital' ? (
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
          ) : (
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
                       <span className="text-white">{f.icon}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{f.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{f.desc}</p>
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
              <Truck className="h-80 w-80" />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                {activeTab === 'digital' ? "Prêt à digitaliser votre enseigne ?" : "Une commande de matériaux en urgence ?"}
              </h2>
              <p className="text-xl text-gray-400 mb-12 font-light">
                {activeTab === 'digital' 
                  ? "Nos experts analysent vos besoins pour implémenter une solution POS et E-commerce fluide sous 15 jours."
                  : "Nous assurons la livraison sur vos chantiers en Belgique avec une réactivité exemplaire pour éviter tout arrêt de travaux."}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to={activeTab === 'digital' ? "/import-export/materiaux" : "/commerce/catalogue-materiaux"} className="inline-flex items-center px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-sm shadow-2xl group">
                  {activeTab === 'digital' ? "Demander un audit gratuit" : "Consulter le catalogue matériaux"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/abonnements" className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-white/20 text-white font-black rounded-2xl hover:border-white transition-all uppercase tracking-widest text-sm">
                  Voir nos formules
                </Link>
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
                src={activeTab === 'digital' 
                  ? "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800" 
                  : "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800"} 
                alt="Expertise Commerce" 
                className="rounded-[3rem] shadow-3xl grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute -bottom-8 -right-8 bg-black p-8 rounded-[2rem] shadow-2xl border border-white/10 hidden md:block">
                 <ShieldCheck className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter">
                {activeTab === 'digital' ? "Une interface pour la performance" : "La logistique BTP simplifiée"}
              </h2>
              <ul className="space-y-6">
                {[
                  activeTab === 'digital' ? "Interface intuitive pour vos équipes de vente" : "Matériaux certifiés aux normes CE/Benor",
                  activeTab === 'digital' ? "Synchronisation multi-plateforme instantanée" : "Livraison par camion grue ou semi-remorque",
                  activeTab === 'digital' ? "Rapports de ventes détaillés et analytiques" : "Tarification dégressive selon les volumes",
                  activeTab === 'digital' ? "Support technique prioritaire 7j/7" : "Conseils techniques par des experts du bâtiment"
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
    </div>
  );
};

export default Commerce;
