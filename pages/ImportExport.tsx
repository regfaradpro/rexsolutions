
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, HardHat, Utensils, ArrowRight, Fuel } from 'lucide-react';

type Sector = 'vehicules' | 'materiaux' | 'alimentation' | 'camions-citernes';

const ImportExport: React.FC = () => {
  const sectors = [
    { 
      id: 'vehicules' as Sector, 
      label: 'Véhicules', 
      icon: <Car className="h-8 w-8" />,
      desc: 'Importation de véhicules d\'exception, SUV de luxe et logistique automobile spécialisée.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200'
    },
    { 
      id: 'camions-citernes' as Sector, 
      label: 'Citernes', 
      icon: <Fuel className="h-8 w-8" />,
      desc: 'Logistique industrielle : camions-citernes pour hydrocarbures, eau et produits chimiques.',
      image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80&w=1200'
    },
    { 
      id: 'materiaux' as Sector, 
      label: 'Matériaux', 
      icon: <HardHat className="h-8 w-8" />,
      desc: 'Approvisionnement en matériaux de construction, acier, bois et gros œuvre international.',
      image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200'
    },
    { 
      id: 'alimentation' as Sector, 
      label: 'Alimentation', 
      icon: <Utensils className="h-8 w-8" />,
      desc: 'Commerce de gros agroalimentaire, denrées sèches et gestion de flux périssables.',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="mb-24 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-gray-400 mb-6 block">Flux Internationaux</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              IMPORT-EXPORT <br/> <span className="text-gray-200">MULTISECTORIEL</span>
            </h1>
            <div className="w-24 h-2 bg-black mb-10"></div>
            <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
              Une expertise logistique globale pour vos échanges stratégiques. Cliquez sur un pôle pour accéder aux détails techniques et au formulaire de devis personnalisé.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sectors.map((sector, idx) => (
              <Link
                key={sector.id}
                to={`/import-export/${sector.id}`}
                className="group relative h-[550px] rounded-[3rem] overflow-hidden text-left transition-all duration-700 hover:-translate-y-4 shadow-2xl hover:shadow-black/20 block animate-in fade-in slide-in-from-bottom-10 bg-gray-100"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <img 
                  src={sector.image} 
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  alt={sector.label} 
                  onError={(e) => {
                    // Fallback en cas d'erreur de chargement d'image
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity group-hover:opacity-80"></div>
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-xl">
                    {sector.icon}
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{sector.label}</h3>
                  <p className="text-gray-300 font-light text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 line-clamp-3">
                    {sector.desc}
                  </p>
                  <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.3em]">
                    Découvrir le pôle <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-32 pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Gérant</p>
                <p className="font-bold text-gray-900">Faradji Régis</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Société</p>
                <p className="font-bold text-gray-900">Rex Solutions</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">TVA</p>
                <p className="font-bold text-gray-900">BE1020.913.716</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImportExport;
