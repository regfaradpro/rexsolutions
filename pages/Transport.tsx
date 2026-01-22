
import React from 'react';
import { Truck, ShieldCheck, MapPin, Clock, ArrowRight, Package, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Transport: React.FC = () => {
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
          <h1 className="text-4xl md:text-6xl font-black mb-6">Logistique & Transport Sécurisé</h1>
          <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
            Une solution fiable pour l'acheminement de vos biens en Belgique et en Europe. Ponctualité, sécurité, intégrité.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <p className="text-2xl text-gray-700 leading-relaxed italic">
              "La ponctualité et l'intégrité de vos marchandises sont non négociables. Nous garantissons un acheminement sans faille."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-all">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Flexibilité Logistique</h3>
              <p className="text-gray-600">Du petit colis urgent à la palette volumineuse, nous adaptons nos véhicules à vos besoins.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-all">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Sécurité Maximale</h3>
              <p className="text-gray-600">Suivi en temps réel (tracking) et protocoles de sécurité stricts pour vos biens de valeur.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-all">
                <Globe className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Couverture Étendue</h3>
              <p className="text-gray-600">Expertise locale forte en Belgique, avec des connexions rapides vers les pays limitrophes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Idéal pour vos besoins quotidiens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-100">
              <Package className="h-12 w-12 text-blue-900 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xl mb-1">Réapprovisionnement</h4>
                <p className="text-gray-600">Transferts rapides entre magasins ou entrepôts centraux.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-100">
              <MapPin className="h-12 w-12 text-blue-900 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xl mb-1">Dernier Kilomètre</h4>
                <p className="text-gray-600">Livraison finale pour vos clients B2B avec un soin extrême.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-100">
              <Clock className="h-12 w-12 text-blue-900 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xl mb-1">Urgences Technologiques</h4>
                <p className="text-gray-600">Transport de matériel sensible nécessitant une manipulation experte.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-100">
              <Truck className="h-12 w-12 text-blue-900 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xl mb-1">Régularité & Fiabilité</h4>
                <p className="text-gray-600">Réseau logistique éprouvé sur l'ensemble du territoire belge.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link to="/conditions-generales" className="inline-flex items-center px-10 py-5 bg-blue-900 text-white font-black rounded-xl hover:bg-blue-800 transition-all uppercase tracking-widest shadow-2xl group">
              Obtenir un devis transport
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transport;
