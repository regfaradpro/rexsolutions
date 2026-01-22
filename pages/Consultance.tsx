
import React from 'react';
import { Briefcase, Search, Lightbulb, TrendingUp, ArrowRight, Target, ClipboardList, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Consultance: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="bg-gray-100 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
          <Briefcase className="h-96 w-96 text-black" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">Consultance Stratégique & Audit Digital</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Optimisez vos processus internes et préparez votre entreprise aux défis de demain grâce à un accompagnement expert.
          </p>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-20">
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Notre Méthodologie</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              La croissance d'une entreprise s'accompagne souvent de complexité. Notre pôle Consultance intervient pour analyser, simplifier et optimiser vos méthodes de travail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-10 bg-white border-2 border-gray-100 rounded-3xl hover:border-black transition-all group">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold shadow-xl">1</div>
              <Search className="h-10 w-10 text-black mb-6 mt-4" />
              <h3 className="text-2xl font-bold mb-4">Audit & Diagnostic</h3>
              <p className="text-gray-600">Nous analysons vos flux de travail actuels pour identifier les goulots d'étranglement et les inefficacités structurelles.</p>
            </div>
            <div className="relative p-10 bg-white border-2 border-gray-100 rounded-3xl hover:border-black transition-all group">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold shadow-xl">2</div>
              <Lightbulb className="h-10 w-10 text-black mb-6 mt-4" />
              <h3 className="text-2xl font-bold mb-4">Stratégie Sur-Mesure</h3>
              <p className="text-gray-600">Nous élaborons un plan d'action personnalisé, aligné sur vos objectifs de croissance à court et long terme.</p>
            </div>
            <div className="relative p-10 bg-white border-2 border-gray-100 rounded-3xl hover:border-black transition-all group">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold shadow-xl">3</div>
              <TrendingUp className="h-10 w-10 text-black mb-6 mt-4" />
              <h3 className="text-2xl font-bold mb-4">Implémentation & Suivi</h3>
              <p className="text-gray-600">Nous accompagnons la mise en œuvre des changements et formons vos équipes pour assurer la pérennité des solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Domaines d'intervention</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Target className="h-6 w-6 text-black" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Processus Métiers (BPM)</h4>
                <p className="text-gray-600 text-sm">Optimisation de l'efficacité opérationnelle par la simplification des tâches.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <ClipboardList className="h-6 w-6 text-black" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Transformation Digitale</h4>
                <p className="text-gray-600 text-sm">Passage au tout-numérique avec des outils adaptés à votre échelle.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <GraduationCap className="h-6 w-6 text-black" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Gestion du Changement</h4>
                <p className="text-gray-600 text-sm">Formation et accompagnement humain lors des transitions stratégiques.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link to="/abonnements" className="inline-flex items-center px-10 py-5 bg-black text-white font-black rounded-xl hover:bg-gray-800 transition-all uppercase tracking-widest shadow-2xl group">
              Prendre rendez-vous pour un audit
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultance;
