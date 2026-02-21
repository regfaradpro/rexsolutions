
import React from 'react';
import { ShoppingBag, Briefcase, Truck, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const pillars = [
    {
      title: "Commerce",
      description: "Solutions de commerce modernes et services numériques innovants pour dynamiser votre activité.",
      icon: <ShoppingBag className="h-8 w-8 text-white" />,
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
      link: "/commerce"
    },
    {
      title: "Consultance",
      description: "Accompagnement stratégique personnalisé pour optimiser vos processus et votre croissance numérique.",
      icon: <Briefcase className="h-8 w-8 text-white" />,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      link: "/consultance"
    },
    {
      title: "Transport",
      description: "Logistique efficace et transport sécurisé de vos biens à travers la Belgique et au-delà.",
      icon: <Truck className="h-8 w-8 text-white" />,
      image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800",
      link: "/transport"
    },
    {
      title: "Import-Export",
      description: "Expertise internationale : véhicules d'exception, matériaux de construction et produits agroalimentaires.",
      icon: <Globe className="h-8 w-8 text-white" />,
      image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=800",
      link: "/import-export"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-40 grayscale"
            alt="Rex Solutions Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              L'excellence au service de vos <span className="text-gray-400">solutions</span> globales.
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Rex Solutions : Votre partenaire multiservice en Belgique. Expertise, innovation et fiabilité dans le commerce, la consultance, le transport et l'import-export multisectoriel.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">Nos Quatre Pôles d'Activité</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="h-40 overflow-hidden bg-gray-200">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="bg-black w-12 h-12 rounded-xl flex items-center justify-center mb-6 -mt-12 relative z-10 shadow-lg border border-white/20 transition-transform group-hover:scale-110">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    {pillar.description}
                  </p>
                  <div className="pt-4 border-t border-gray-200 mt-auto">
                    <Link to={pillar.link} className="text-xs font-bold uppercase tracking-widest text-black flex items-center group-hover:gap-2 transition-all">
                      En savoir plus <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Qui sommes-nous ? Notre Mission</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Basée en Belgique, Rex Solutions est une société composée d'un Managing Director et un Business Manager. Ensemble, notre mission est de fournir des services de haute qualité, alliant la flexibilité numérique et l'expertise opérationnelle multisectorielle.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-black">100%</p>
                <p className="text-xs text-gray-500 uppercase font-semibold">Savoir-faire Belge</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gray-200 -z-10 rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
              alt="Bureau Rex Solutions" 
              className="rounded-lg shadow-2xl relative z-10 w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
