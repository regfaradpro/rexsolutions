
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, CreditCard, ShieldCheck, UserPlus } from 'lucide-react';

const Subscriptions: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 flex items-center justify-center gap-4">
            <span className="text-4xl">👉</span> Abonnements & Paiement récurrent
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Nos services sont proposés exclusivement sous forme d’abonnements avec facturation récurrente. Pour y souscrire, vous devez d'abord créer votre compte membre.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-12">Nos formules</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Abonnement Basic</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold">29 €</span>
                <span className="text-gray-500 ml-2">/ mois</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-gray-600">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                Accès aux services standards
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                Facturation mensuelle
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                Résiliable à tout moment
              </li>
            </ul>
            <Link 
              to="/connexion?redirect_plan=basic"
              className="w-full py-4 px-6 bg-gray-100 text-black font-bold rounded-xl hover:bg-black hover:text-white transition-all text-center flex items-center justify-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              S'inscrire et choisir Basic
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-black rounded-3xl p-10 shadow-2xl flex flex-col relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-widest">Recommandé</div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Abonnement Pro</h3>
              <div className="flex items-baseline text-white">
                <span className="text-4xl font-extrabold">59 €</span>
                <span className="text-gray-400 ml-2">/ mois</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-gray-300">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-white" />
                Accès complet aux services
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-white" />
                Support prioritaire
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-white" />
                Facturation mensuelle
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-white" />
                Résiliable à tout moment
              </li>
            </ul>
            <Link 
              to="/connexion?redirect_plan=pro"
              className="w-full py-4 px-6 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all text-center flex items-center justify-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              S'inscrire et choisir Pro
            </Link>
          </div>
        </div>

        {/* Payment Info */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="bg-gray-100 p-8 rounded-full">
              <CreditCard className="h-16 w-16 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Processus d'inscription</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Pour assurer la sécurité de vos paiements et le suivi de vos prestations, l'adhésion à Rex Solutions se fait en deux étapes : création de votre espace membre, puis activation de votre moyen de paiement sécurisé.
              </p>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <ShieldCheck className="h-6 w-6 text-black flex-shrink-0 mt-1" />
                <p className="text-sm font-medium text-gray-700">
                  Compte membre crypté : vos informations personnelles sont protégées selon les normes RGPD en vigueur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
