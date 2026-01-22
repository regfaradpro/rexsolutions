
import React from 'react';
import { ShoppingBag, Laptop, Smartphone, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Commerce: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-20">
          <ShoppingBag className="h-96 w-96 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Solutions de Commerce & Services Numériques</h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            Transformez votre point de vente et boostez vos ventes en ligne grâce à des outils innovants conçus pour le commerce de demain.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-2xl text-gray-700 leading-relaxed mb-12">
              Le commerce d'aujourd'hui ne se limite plus à une simple transaction. Chez Rex Solutions, nous vous aidons à créer une expérience client fluide, que ce soit en boutique physique ou sur le web. Nous déployons des technologies qui s'adaptent à votre activité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <Laptop className="h-12 w-12 text-black mb-6" />
              <h3 className="text-xl font-bold mb-4">Digitalisation POS</h3>
              <p className="text-gray-600">Installation de caisses enregistreuses modernes, terminaux de paiement intelligents et gestion des stocks en temps réel.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <Smartphone className="h-12 w-12 text-black mb-6" />
              <h3 className="text-xl font-bold mb-4">E-Commerce & Click & Collect</h3>
              <p className="text-gray-600">Création de boutiques en ligne performantes et intégration omnicanale pour lier votre stock physique à votre site web.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <Users className="h-12 w-12 text-black mb-6" />
              <h3 className="text-xl font-bold mb-4">Expérience Client</h3>
              <p className="text-gray-600">Outils de fidélisation numériques et solutions CRM pour mieux comprendre et engager vos clients sur le long terme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-3xl font-light italic mb-12 max-w-4xl mx-auto leading-tight">
            "Nous ne vous vendons pas simplement un logiciel, nous vous offrons une infrastructure complète pour faire croître votre chiffre d'affaires."
          </blockquote>
          <Link to="/abonnements" className="inline-flex items-center px-10 py-5 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-all uppercase tracking-widest shadow-2xl group">
            Demander une démo gratuite
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Feature List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800" alt="Commerce moderne" className="rounded-3xl shadow-2xl" />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Pourquoi choisir notre pôle Commerce ?</h2>
              <ul className="space-y-4">
                {[
                  "Une interface intuitive pour vos équipes",
                  "Synchronisation multi-plateforme instantanée",
                  "Rapports de ventes détaillés et analytiques",
                  "Support technique prioritaire 7j/7"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-gray-700">
                    <CheckCircle2 className="h-6 w-6 text-black flex-shrink-0" />
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
