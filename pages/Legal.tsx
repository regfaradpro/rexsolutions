
import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

const Legal: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <div className="inline-block bg-black p-4 rounded-2xl mb-6 shadow-xl">
             <ShieldAlert className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">👉 Mentions légales</h1>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </header>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Société</h3>
                  <p className="text-xl font-bold text-gray-900">Rex Solutions</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Responsable</h3>
                  <p className="text-xl font-bold text-gray-900">Régis Faradji</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email</h3>
                  <p className="text-xl font-bold text-gray-900">rexsolutionspro@gmail.com</p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Localisation</h3>
                  <p className="text-xl font-bold text-gray-900">Belgique</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Numéro TVA</h3>
                  <p className="text-xl font-bold text-gray-900">BE1020.913.716</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Activité</h3>
                  <p className="text-lg font-medium text-gray-900">Commerce et Services numériques par abonnement</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-8 flex items-center gap-6">
            <Info className="h-12 w-12 text-gray-400 flex-shrink-0" />
            <p className="text-gray-300 text-sm leading-relaxed">
              Ce site web est édité par Rex Solutions. Les informations collectées sont uniquement utilisées dans le cadre de la gestion des abonnements et ne sont en aucun cas cédées à des tiers sans votre consentement explicite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
