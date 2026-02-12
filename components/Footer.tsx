
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-black font-black text-xs">RXS</span>
              </div>
              <h3 className="text-white text-xl font-black tracking-tighter">REX SOLUTIONS</h3>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-gray-500">
              Expertise opérationnelle et solutions multisectorielles en Belgique. Nous accompagnons les entreprises dans leur croissance numérique, logistique et commerciale.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Belgique</span>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] pb-2 border-b border-white/10 inline-block">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/abonnements" className="text-gray-400 hover:text-white transition-all flex items-center group font-medium">
                  Abonnements
                  <ArrowUpRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/conditions-generales" className="text-gray-400 hover:text-white transition-all flex items-center group font-medium">
                  Conditions Générales
                  <ArrowUpRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-400 hover:text-white transition-all flex items-center group font-medium">
                  Mentions Légales
                  <ArrowUpRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] pb-2 border-b border-white/10 inline-block">Support & Contacts</h4>
            <div className="space-y-6">
              <a href="mailto:rexsolutionspro@gmail.com" className="block group">
                <p className="text-[10px] font-bold text-gray-600 uppercase mb-1">Email Expertise</p>
                <p className="text-white group-hover:text-gray-300 transition-colors font-medium">rexsolutionspro@gmail.com</p>
              </a>
              <p className="text-[10px] font-bold text-gray-600 uppercase mb-1">Ligne Directes</p>
              <a href="tel:+32466253255" className="group">
                <div className="pt-4 flex items-center gap-4">
                  <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                      MANAGING DIRECTOR
                    </span>
                  </div>
                  <span className="text-white font-medium group-hover:text-gray-300 transition-colors">
                    +32 466 253 255
                  </span>
                </div>
              </a>

              <a href="tel:+32465710189" className="block group">
                <div className="pt-4 flex items-center gap-4">
                  <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                      BUSINESS MANAGER
                    </span>
                  </div>
                  <span className="text-white font-medium group-hover:text-gray-300 transition-colors">
                    +32 465 710 189
                  </span>
                </div>
              </a>
              <a href="tel:+32470665114" className="block group">
                <div className="pt-4 flex items-center gap-4">
                  <div className="px-3 py-1 bg-white/5 rounded-md border border-white/10">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                      ASSOCIATE MANAGER
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                    +32 470 665 114
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          <p>&copy; {new Date().getFullYear()} Rex Solutions. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
