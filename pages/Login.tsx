
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ChevronLeft, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plan = searchParams.get('redirect_plan');

  const handleAuthSimulation = (type: 'email' | 'google', e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (type === 'google') setIsGoogleLoading(true);
    else setIsEmailLoading(true);

    // Simulation du processus d'authentification (handshake Google ou vérification base de données)
    setTimeout(() => {
      if (type === 'google') setIsGoogleLoading(false);
      else setIsEmailLoading(false);
      
      setAuthSuccess(true);

      // Redirection après un bref message de succès pour confirmer l'enclenchement
      setTimeout(() => {
        if (plan) {
          navigate(`/checkout?plan=${plan}`);
        } else {
          navigate('/');
        }
      }, 1200);
    }, 1800);
  };

  const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
      />
    </svg>
  );

  if (authSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            {isLogin ? 'Connexion réussie !' : 'Bienvenue chez Rex Solutions !'}
          </h2>
          <p className="text-gray-500">Finalisation de votre session membre...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-500 hover:text-black mb-6 transition-colors group"
          >
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Retour
          </button>
          <div className="bg-black w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
             <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-center text-3xl font-black text-gray-900 tracking-tight">
            {isLogin ? 'Connexion Membre' : 'Devenir Membre'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin 
              ? 'Accédez à votre espace sécurisé Rex Solutions' 
              : 'Créez votre compte pour gérer vos services et abonnements'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          {/* Google Auth Button */}
          <button
            disabled={isGoogleLoading || isEmailLoading}
            onClick={() => handleAuthSimulation('google')}
            className={`w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm active:scale-[0.98] mb-6 disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-3 animate-spin text-gray-400" />
                <span>{isLogin ? 'Vérification Google...' : 'Création via Google...'}</span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span>{isLogin ? 'Continuer avec Google' : "S'inscrire avec Google"}</span>
              </>
            )}
          </button>

          {/* Separator */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="px-4 bg-white text-gray-400 font-bold text-[10px] tracking-widest">ou avec votre email</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => handleAuthSimulation('email', e)}>
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nom Complet</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    required
                    type="text"
                    disabled={isGoogleLoading || isEmailLoading}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all transform focus:scale-[1.01]"
                    placeholder="Jean Dupont"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Adresse Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  required
                  type="email"
                  disabled={isGoogleLoading || isEmailLoading}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all transform focus:scale-[1.01]"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <input
                  required
                  type="password"
                  disabled={isGoogleLoading || isEmailLoading}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all transform focus:scale-[1.01]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-700 cursor-pointer">
                  Se souvenir
                </label>
              </div>
              {isLogin && (
                <a href="#" className="font-medium text-black hover:underline">
                  Oublié ?
                </a>
              )}
            </div>

            <button
              type="submit"
              disabled={isGoogleLoading || isEmailLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all shadow-lg active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isEmailLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Se connecter' : 'Créer mon compte'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              disabled={isGoogleLoading || isEmailLoading}
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors disabled:opacity-50"
            >
              {isLogin ? "Pas encore membre ? Rejoignez-nous" : "Déjà membre ? Connectez-vous"}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 opacity-40">
           <ShieldCheck className="h-4 w-4" />
           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Connexion 100% sécurisée via Google & SSL</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
