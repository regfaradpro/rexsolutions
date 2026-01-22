
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Landmark, CreditCard, ChevronLeft, ShieldCheck, Lock, CheckCircle2, ArrowRight, AlertCircle, FileText, Check } from 'lucide-react';

type Step = 'selection' | 'form' | 'success';
type PaymentMethod = 'sepa' | 'card';
type CardBrand = 'Visa' | 'Mastercard' | 'Amex' | 'Discover' | 'Diners' | 'JCB' | null;

const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'basic';
  const [step, setStep] = useState<Step>('selection');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Card brand detection state
  const [cardNumber, setCardNumber] = useState('');
  const [cardBrand, setCardBrand] = useState<CardBrand>(null);

  // Expiry date validation state
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryError, setExpiryError] = useState<string | null>(null);
  const [isExpiryValid, setIsExpiryValid] = useState(false);

  // SEPA specific info
  const creditorId = "BE64ZZZ1020913716"; // Derived from BCE BE1020.913.716
  const mandateRef = useMemo(() => `REX-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`, []);

  const planDetails = {
    basic: { name: 'Abonnement Basic', price: '29 €' },
    pro: { name: 'Abonnement Pro', price: '59 €' }
  }[plan as 'basic' | 'pro'] || { name: 'Abonnement Basic', price: '29 €' };

  // Handle Card Number Input with auto-formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 16) value = value.slice(0, 16); // Max 16 digits
    
    // Add spaces every 4 digits
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);
    
    // Detect Brand
    const brand = detectCardBrand(value);
    setCardBrand(brand);
  };

  const detectCardBrand = (sanitized: string): CardBrand => {
    if (/^4/.test(sanitized)) return 'Visa';
    if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/.test(sanitized)) return 'Mastercard';
    if (/^3[47]/.test(sanitized)) return 'Amex';
    if (/^6(?:011|5)/.test(sanitized)) return 'Discover';
    if (/^3(?:0[0-5]|[68])/.test(sanitized)) return 'Diners';
    if (/^(?:2131|1800|35)/.test(sanitized)) return 'JCB';
    return null;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Only digits
    
    // Auto-prefix single digit months > 1 (e.g., '5' -> '05/')
    if (value.length === 1 && parseInt(value) > 1) {
      value = '0' + value;
    }

    if (value.length > 4) value = value.slice(0, 4);

    let formattedValue = value;
    if (value.length >= 2) {
      formattedValue = value.slice(0, 2) + '/' + value.slice(2);
    }

    setExpiryDate(formattedValue);
    validateExpiry(formattedValue);
  };

  const validateExpiry = (value: string) => {
    if (value.length === 0) {
      setExpiryError(null);
      setIsExpiryValid(false);
      return;
    }

    const [monthStr, yearStr] = value.split('/');
    const month = parseInt(monthStr, 10);

    // Validate month range as soon as it's fully entered (2 digits)
    if (monthStr && monthStr.length === 2) {
      if (month < 1 || month > 12) {
        setExpiryError("Mois invalide (01-12)");
        setIsExpiryValid(false);
        return;
      }
    }

    // Don't show "Format error" while user is still typing naturally
    if (value.length < 5) {
      setExpiryError(null);
      setIsExpiryValid(false);
      return;
    }

    const year = parseInt('20' + yearStr, 10);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Check if card is expired
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setExpiryError("La carte est expirée");
      setIsExpiryValid(false);
      return;
    }

    // If we reach here, date is valid format and not expired
    setExpiryError(null);
    setIsExpiryValid(true);
  };

  const handleProcessPayment = () => {
    if (selectedMethod) {
      setStep('form');
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod === 'card' && (expiryError || !isExpiryValid)) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 2000);
  };

  const renderSelection = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Choisissez votre mode de paiement</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* SEPA Option */}
        <button 
          onClick={() => setSelectedMethod('sepa')}
          className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all duration-300 transform active:scale-95 group ${
            selectedMethod === 'sepa' 
            ? 'border-black bg-black text-white scale-105 shadow-xl ring-4 ring-black/5' 
            : 'border-gray-100 hover:border-gray-300 bg-gray-50 text-gray-600 scale-100 shadow-none'
          }`}
        >
          <div className={`transition-transform duration-500 transform ${selectedMethod === 'sepa' ? 'scale-110' : 'group-hover:scale-110'}`}>
            <Landmark className={`h-12 w-12 mb-4 ${selectedMethod === 'sepa' ? 'text-white' : 'text-gray-400 group-hover:text-black'}`} />
          </div>
          <div className={`flex flex-col items-center transition-transform duration-500 transform ${selectedMethod === 'sepa' ? 'scale-110' : 'group-hover:scale-105'}`}>
            <span className="font-bold text-lg">Prélèvement SEPA</span>
            <span className="text-xs opacity-70 mt-1">Direct debit</span>
          </div>
        </button>

        {/* Card Option */}
        <button 
          onClick={() => setSelectedMethod('card')}
          className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all duration-300 transform active:scale-95 group ${
            selectedMethod === 'card' 
            ? 'border-black bg-black text-white scale-105 shadow-xl ring-4 ring-black/5' 
            : 'border-gray-100 hover:border-gray-300 bg-gray-50 text-gray-600 scale-100 shadow-none'
          }`}
        >
          <div className={`transition-transform duration-500 transform ${selectedMethod === 'card' ? 'scale-110' : 'group-hover:scale-110'}`}>
            <CreditCard className={`h-12 w-12 mb-4 ${selectedMethod === 'card' ? 'text-white' : 'text-gray-400 group-hover:text-black'}`} />
          </div>
          <div className={`flex flex-col items-center transition-transform duration-500 transform ${selectedMethod === 'card' ? 'scale-110' : 'group-hover:scale-105'}`}>
            <span className="font-bold text-lg">Carte Bancaire</span>
            <span className="text-xs opacity-70 mt-1">Visa, Mastercard</span>
          </div>
        </button>
      </div>

      {selectedMethod && (
        <div className="mt-12 animate-in slide-in-from-top-4 duration-500">
          <button 
            onClick={handleProcessPayment}
            className="w-full py-5 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl active:scale-[0.98]"
          >
            Continuer vers le formulaire
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );

  const renderSEPAForm = () => (
    <form onSubmit={handleSubmitForm} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nom du titulaire du compte</label>
          <input 
            required
            type="text" 
            placeholder="Jean Dupont"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 transform focus:scale-[1.03] focus:shadow-md"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">BIC / Swift</label>
          <input 
            required
            type="text" 
            placeholder="XXXXXXXX"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 uppercase transform focus:scale-[1.03] focus:shadow-md"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">IBAN</label>
        <input 
          required
          type="text" 
          placeholder="BE00 0000 0000 0000"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 uppercase transform focus:scale-[1.03] focus:shadow-md"
        />
      </div>

      {/* SEPA Mandate Details Box */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-inner">
        <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Détails du Mandat SEPA</h4>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Créancier</p>
              <p className="text-sm font-bold text-gray-900">Rex Solutions</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Identifiant (ICS)</p>
              <p className="text-sm font-mono font-bold text-gray-900">{creditorId}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Référence Mandat (RUM)</p>
              <p className="text-sm font-mono font-bold text-gray-900">{mandateRef}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Type de paiement</p>
              <p className="text-sm font-bold text-gray-900">Récurrent / Mensuel</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 flex items-start gap-3">
            <input required type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer" />
            <p className="text-[11px] text-gray-600 leading-relaxed">
              En signant ce mandat, j'autorise (A) Rex Solutions à envoyer des instructions à ma banque pour débiter mon compte et (B) ma banque à débiter mon compte conformément aux instructions de Rex Solutions. Je bénéficie d'un droit de remboursement par ma banque selon les conditions de mon contrat avec elle. Toute demande de remboursement doit être présentée dans les 8 semaines suivant la date de débit de mon compte.
            </p>
          </div>
        </div>
      </div>

      <button 
        disabled={isSubmitting}
        type="submit"
        className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
      >
        {isSubmitting ? 'Traitement en cours...' : `Activer l'abonnement (${planDetails.price})`}
      </button>
    </form>
  );

  const renderCardForm = () => (
    <form onSubmit={handleSubmitForm} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Nom sur la carte</label>
        <input 
          required
          type="text" 
          placeholder="Jean Dupont"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 transform focus:scale-[1.03] focus:shadow-md"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Numéro de carte</label>
        <div className="relative">
          <input 
            required
            type="text" 
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            className="w-full pl-4 pr-32 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 font-mono tracking-wider transform focus:scale-[1.03] focus:shadow-md"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            {cardBrand ? (
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-black text-white rounded animate-in zoom-in-50 duration-300 shadow-sm border border-white/20">
                {cardBrand}
              </span>
            ) : (
              <CreditCard className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Expiration (MM/YY)</label>
          <div className="relative">
            <input 
              required
              type="text" 
              value={expiryDate}
              onChange={handleExpiryChange}
              placeholder="MM / YY"
              maxLength={5}
              className={`w-full px-4 py-3 bg-gray-50 border ${expiryError ? 'border-red-500 focus:ring-red-500' : isExpiryValid ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-black'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all duration-300 transform focus:scale-[1.03] focus:shadow-md`}
            />
            {expiryError && (
              <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-[10px] font-bold uppercase animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="h-3 w-3" />
                {expiryError}
              </div>
            )}
            {isExpiryValid && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 animate-in zoom-in duration-300">
                <Check className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">CVC</label>
          <input 
            required
            type="text" 
            placeholder="123"
            maxLength={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-300 transform focus:scale-[1.03] focus:shadow-md"
          />
        </div>
      </div>
      <button 
        disabled={isSubmitting || !!expiryError || !isExpiryValid || cardNumber.length < 15}
        type="submit"
        className="w-full mt-4 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
      >
        {isSubmitting ? 'Traitement en cours...' : `Payer ${planDetails.price} / mois`}
      </button>
    </form>
  );

  const renderSuccess = () => (
    <div className="text-center py-10 animate-in zoom-in-95 fade-in duration-700">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-4">Paiement Réussi !</h2>
      <p className="text-gray-600 mb-10 max-w-sm mx-auto leading-relaxed">
        Votre abonnement <strong>{planDetails.name}</strong> est désormais actif. Vous allez recevoir un email de confirmation d'ici quelques instants.
      </p>
      <Link to="/" className="inline-flex items-center px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95">
        Retour à l'accueil
      </Link>
    </div>
  );

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {step !== 'success' && (
          <>
            <button 
              onClick={() => step === 'form' ? setStep('selection') : window.history.back()}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors group"
            >
              <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              {step === 'form' ? 'Retour aux modes de paiement' : 'Retour aux offres'}
            </button>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {step === 'selection' ? 'Finalisez votre abonnement' : 'Détails du paiement'}
            </h1>
            <p className="text-gray-600 mb-10">
              {step === 'selection' 
                ? `Sélectionnez votre mode de paiement pour activer votre compte Rex Solutions.` 
                : `Veuillez renseigner vos informations de paiement ${selectedMethod === 'sepa' ? 'SEPA' : 'Bancaire'}.`
              }
            </p>
          </>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          {step !== 'success' && (
            <div className="p-8 border-b border-gray-50 bg-gray-50/50">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{planDetails.name}</h2>
                  <p className="text-sm text-gray-500">Facturation mensuelle récurrente</p>
                </div>
                <div className="text-2xl font-black text-black">
                  {planDetails.price}
                  <span className="text-xs font-normal text-gray-500 ml-1">/ mois</span>
                </div>
              </div>
            </div>
          )}

          <div className="p-8">
            {step === 'selection' && renderSelection()}
            {step === 'form' && selectedMethod === 'sepa' && renderSEPAForm()}
            {step === 'form' && selectedMethod === 'card' && renderCardForm()}
            {step === 'success' && renderSuccess()}
          </div>
        </div>

        {step !== 'success' && (
          <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
            <div className="flex items-center gap-1">
               <ShieldCheck className="h-4 w-4" />
               <span className="text-[10px] font-bold uppercase tracking-tighter">Paiement 100% sécurisé</span>
            </div>
            <div className="flex items-center gap-1">
               <Lock className="h-4 w-4" />
               <span className="text-[10px] font-bold uppercase tracking-tighter">Cryptage SSL 256 bits</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;