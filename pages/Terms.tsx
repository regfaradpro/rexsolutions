
import React from 'react';
import { FileText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 border-b border-gray-100 pb-10">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="h-8 w-8 text-black" />
            <h1 className="text-4xl font-extrabold text-gray-900">👉 Conditions générales & Mandat SEPA</h1>
          </div>
          <p className="text-gray-500">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </header>

        <article className="prose prose-lg max-w-none text-gray-700 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</span>
              Paiement par prélèvement SEPA
            </h2>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <p className="mb-4">
                Le règlement des abonnements s’effectue par prélèvement SEPA récurrent.
              </p>
              <p className="mb-4">
                En souscrivant à un abonnement, le client autorise <strong>Rex Solutions</strong> à prélever automatiquement les montants dus selon la périodicité indiquée lors de la souscription.
              </p>
              <p className="font-semibold text-gray-900">
                Le mandat SEPA peut être révoqué à tout moment par simple demande écrite adressée à notre service client par email.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">2</span>
              Résiliation
            </h2>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <p className="mb-4">
                Les abonnements sont sans engagement et peuvent être résiliés à tout moment.
              </p>
              <p className="font-semibold text-gray-900 italic">
                Toute période entamée reste due et ne fera l'objet d'aucun remboursement partiel.
              </p>
            </div>
          </section>

          <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
            <p className="text-blue-900 text-sm italic">
              Pour toute question relative aux présentes conditions générales, merci de contacter rexsolutionspro@gmail.com
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Terms;
