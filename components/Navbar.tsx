
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Logo className="h-14 w-14" />
            <div className="ml-4 flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900">REX SOLUTIONS</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">BELGIQUE</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-10">
            <Link to="/" className="text-gray-600 hover:text-black font-semibold transition-colors">Accueil</Link>
            <Link to="/connexion" className="flex items-center gap-2 text-gray-600 hover:text-black font-semibold transition-colors group">
              <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Espace Membre
            </Link>
          </div>
          <div className="lg:hidden flex items-center">
             <Link to="/connexion" className="text-sm font-bold bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm active:scale-95 transition-all">
               <User className="h-4 w-4" />
               Membre
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;