import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  HelpCircle, 
  User, 
  Crown,
  Check,
  Zap,
  Star,
  Compass,
  Layout,
  Sliders,
  DollarSign,
  X,
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import TemplateExplorer from './components/TemplateExplorer';
import ProfessionalEditor from './components/ProfessionalEditor';
import ExportPreview from './components/ExportPreview';
import { CarouselSlide, CarouselTemplate } from './types';
import { DEFAULT_CAROUSEL_SLIDES } from './data';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'landing' | 'templates' | 'editor' | 'export'>('landing');
  const [slides, setSlides] = useState<CarouselSlide[]>(DEFAULT_CAROUSEL_SLIDES);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isProUser, setIsProUser] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'pricing' | 'payment' | 'processing' | 'success'>('pricing');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // Load selected template into editor slides state
  const handleSelectTemplate = (template: CarouselTemplate) => {
    // If the template only has 1 slide, let's auto-generate a beautiful multi-slide sequence
    // to give the user a high-end experience inside the editor!
    if (template.slides.length <= 1) {
      const enhancedSlides: CarouselSlide[] = [
        {
          ...template.slides[0],
          id: 'temp-s-1',
          slideNumber: '01',
          title: template.name,
          subtitle: 'Unlocking high-fidelity dark-editorial design systems.'
        },
        {
          id: 'temp-s-2',
          slideNumber: '02',
          title: 'Aesthetic Continuity',
          subtitle: 'Layout assets span across boundaries cleanly.',
          bgImage: template.slides[0].bgImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnMsJ-E7mkr9LEc6Fce6LfYPhRJoQS41teVjamI23zzINXzlem-_aJVJnvOML1yxpwkaZEWW6rTPlBDloKPJDOjE0ElY6rUy9GdqjYllMVNUPnG4ooi-BDqk0NOOw9r-AdIZ11YB9wXgjJOHTgDz326YZjMg_lmbMnSAII_oi08LLOPUoUThHEYvtQKXHTOz84fcl2MQM6dBxb8xzNXXMtbH2uC3L-jWX8tNzjXAL81gxjXiJoh_jKTg',
          bgColor: '#000000',
          bgOpacity: 0.5,
          bgRemoved: false,
          elements: []
        },
        {
          id: 'temp-s-3',
          slideNumber: '03',
          title: 'High Retention',
          subtitle: 'Perfectly formatted for Instagram and LinkedIn document updates.',
          bgImage: template.slides[0].bgImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuaW4UcWsw_d6Oo9QpkHq36U12GiWMKdxJtTlYz6oo6I-j6xo6VxxGIFvxvMowcVSMtPoQHl72uv9aXAlrPnvochQrgQInu1UmYMdg4SUGWB88wMl_b-TsYVhw7mwzPHjIk9_aY4745tCCYbwhjRpmHtiuQ9IafxNfbXEFuvhPrMbRQSZMjMUwXfnPJwXV8Swgju-rsdfXpQ1ATCLO4b_pLql2MwqXrQjlrcTYoiFeAybQQ8W095-coQ',
          bgColor: '#000000',
          bgOpacity: 0.6,
          bgRemoved: false,
          elements: []
        }
      ];
      setSlides(enhancedSlides);
    } else {
      setSlides(template.slides);
    }
    setActiveScreen('editor');
  };

  const handleStartBlankDesign = () => {
    setSlides(DEFAULT_CAROUSEL_SLIDES);
    setActiveScreen('editor');
  };

  const [processingStatus, setProcessingStatus] = useState('');

  const handleSimulatePayment = () => {
    setProcessingStatus('Initializing secure cryptographic handshake...');
    
    setTimeout(() => {
      setProcessingStatus('Verifying sandbox credentials with payment server...');
    }, 1100);

    setTimeout(() => {
      setProcessingStatus('Authorizing Pro Studio subscription lease keys...');
    }, 2200);

    setTimeout(() => {
      setProcessingStatus('Securing secure transaction authorization token...');
    }, 3300);

    setTimeout(() => {
      setIsProUser(true);
      setCheckoutStep('success');
    }, 4400);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 selection:bg-amber-500/35 selection:text-white flex flex-col font-sans">
      
      {/* Top Shared Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-900 z-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveScreen('landing')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-black shadow-md shadow-amber-500/10 group-hover:scale-[1.03] transition-all">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-extrabold text-sm tracking-tight font-sans">
                  Carousel<span className="text-amber-400">Pro</span>
                </span>
                <span className="block text-[8px] font-mono text-neutral-500 tracking-widest leading-none uppercase">
                  Editorial_System
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <button
              onClick={() => setActiveScreen('landing')}
              className={`transition-colors cursor-pointer ${
                activeScreen === 'landing' ? 'text-amber-400 font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveScreen('templates')}
              className={`transition-colors cursor-pointer ${
                activeScreen === 'templates' ? 'text-amber-400 font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Bases Explorer
            </button>
            <button
              onClick={() => setActiveScreen('editor')}
              className={`transition-colors cursor-pointer ${
                activeScreen === 'editor' ? 'text-amber-400 font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Professional Editor
            </button>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" /> Pricing
            </button>
          </div>

          {/* Action Call / User profile badge */}
          <div className="flex items-center gap-3">
            {isProUser ? (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
                <Crown className="w-3 h-3" /> PRO_USER
              </span>
            ) : (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="hidden sm:flex items-center gap-1 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded text-xs font-mono tracking-wide transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" /> UPGRADE
              </button>
            )}

            <button
              onClick={handleStartBlankDesign}
              className="px-4 py-1.5 bg-amber-500 text-black text-xs font-semibold rounded hover:bg-amber-400 transition-all cursor-pointer"
            >
              Create New
            </button>
          </div>

        </div>
      </nav>

      {/* Main Screens Display Controller */}
      <main className="flex-1">
        {activeScreen === 'landing' && (
          <LandingPage 
            onStartCreating={handleStartBlankDesign} 
            onExploreTemplates={() => setActiveScreen('templates')} 
          />
        )}

        {activeScreen === 'templates' && (
          <TemplateExplorer 
            onSelectTemplate={handleSelectTemplate} 
          />
        )}

        {activeScreen === 'editor' && (
          <ProfessionalEditor 
            slides={slides} 
            onUpdateSlides={setSlides} 
            onGoToExport={() => setActiveScreen('export')} 
            isProUser={isProUser}
            onUpgrade={() => setShowUpgradeModal(true)}
          />
        )}

        {activeScreen === 'export' && (
          <ExportPreview 
            slides={slides} 
            onBackToEditor={() => setActiveScreen('editor')} 
            isProUser={isProUser}
            onUpgrade={() => setShowUpgradeModal(true)}
          />
        )}
      </main>

      {/* Subscription Pricing Upgrade Modal (Simulated, ultra-premium looking!) */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#121212] border border-neutral-800 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => {
                  setShowUpgradeModal(false);
                  if (checkoutStep !== 'success') {
                    setCheckoutStep('pricing');
                  }
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600" />
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {checkoutStep === 'pricing' && (
                <>
                  <div className="text-center mb-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono tracking-widest uppercase mb-2">
                      <Star className="w-3 h-3 fill-amber-400" /> Premium Access
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Upgrade to Pro Studio</h3>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                      Empower your social presence with advanced visual continuity and AI magic.
                    </p>
                  </div>

                  {isProUser ? (
                    <div className="py-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
                        <Crown className="w-6 h-6 fill-amber-400 animate-pulse" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">You are in Pro Studio Mode</h3>
                      <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed mb-6 font-sans">
                        All restrictions have been lifted! You now have unlimited canvas slides, high-resolution document layouts, and full custom branding.
                      </p>
                      
                      <div className="flex gap-3 max-w-sm mx-auto">
                        <button
                          onClick={() => {
                            setIsProUser(false);
                            setCheckoutStep('pricing');
                          }}
                          className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-bold rounded uppercase cursor-pointer transition-colors"
                        >
                          Reset to Free
                        </button>
                        <button
                          onClick={() => setShowUpgradeModal(false)}
                          className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded uppercase cursor-pointer transition-colors"
                        >
                          Keep Pro Status
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Pricing Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {/* Free Plan */}
                        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-neutral-300">Basic Tier</h4>
                            <p className="text-neutral-500 text-[10px] uppercase font-mono mt-0.5">Free forever</p>
                            <div className="my-3 text-2xl font-extrabold text-white">Free</div>
                            <ul className="space-y-1.5 text-[11px] text-neutral-400">
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Edit up to 3 slides</li>
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Default text layers</li>
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Standard downloads</li>
                            </ul>
                          </div>
                          <button 
                            disabled 
                            className="mt-4 w-full py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-500 text-[11px] font-mono rounded uppercase"
                          >
                            Active Tier
                          </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/20 flex flex-col justify-between relative">
                          <span className="absolute top-2 right-2 bg-amber-500 text-black text-[8px] font-mono font-bold px-1.5 py-0.5 rounded">
                            RECOMMENDED
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1">
                              Pro Studio <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                            </h4>
                            <p className="text-neutral-500 text-[10px] uppercase font-mono mt-0.5">Professional grade</p>
                            <div className="my-3 text-2xl font-extrabold text-white">
                              ₹499<span className="text-xs font-normal text-neutral-500">/mo</span>
                            </div>
                            <ul className="space-y-1.5 text-[11px] text-neutral-300">
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Infinite canvas slides</li>
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> AI background isolation</li>
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> High-res vector exports</li>
                            </ul>
                          </div>
                          <button
                            onClick={() => {
                              setCheckoutStep('payment');
                            }}
                            className="mt-4 w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold rounded uppercase cursor-pointer"
                          >
                            Unlock Pro Features
                          </button>
                        </div>
                      </div>

                      <div className="text-center text-[10px] text-neutral-600 font-mono">
                        SECURE CHECKOUT // 256-BIT SSL ENCRYPTION
                      </div>
                    </>
                  )}
                </>
              )}

              {checkoutStep === 'payment' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-3 mb-2">
                    <button 
                      onClick={() => setCheckoutStep('pricing')}
                      className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors font-mono"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Plans
                    </button>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Secure Checkout Simulator</span>
                  </div>
                  
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900 mb-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-white">Pro Studio - Monthly Subscription</h4>
                      <p className="text-[10px] text-neutral-500 mt-0.5">Sandbox Mode - No real charge</p>
                    </div>
                    <span className="text-amber-400 font-bold text-sm font-mono">₹499/mo</span>
                  </div>

                  {paymentError && (
                    <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 font-mono">
                      {paymentError}
                    </div>
                  )}

                  <div className="space-y-3 text-left">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">Cardholder Name</label>
                      <input 
                        type="text"
                        placeholder="Dhruvil Shah"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          value={cardNumber}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                            const parts = [];
                            for (let i = 0; i < v.length && i < 16; i += 4) {
                              parts.push(v.substring(i, i + 4));
                            }
                            setCardNumber(parts.join(' '));
                          }}
                          maxLength={19}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                        />
                        <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">Expiry Date</label>
                        <input 
                          type="text"
                          placeholder="MM / YY"
                          value={cardExpiry}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                            if (v.length >= 2) {
                              setCardExpiry(`${v.substring(0, 2)} / ${v.substring(2, 4)}`);
                            } else {
                              setCardExpiry(v);
                            }
                          }}
                          maxLength={7}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">CVC / CVV</label>
                        <input 
                          type="password"
                          placeholder="•••"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/gi, '').substring(0, 4))}
                          maxLength={4}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (!cardName.trim()) {
                          setPaymentError('Please enter Cardholder Name.');
                          return;
                        }
                        if (cardNumber.replace(/\s/g, '').length < 15) {
                          setPaymentError('Please enter a valid credit card number.');
                          return;
                        }
                        if (cardExpiry.length < 7) {
                          setPaymentError('Please enter card expiry date (MM / YY).');
                          return;
                        }
                        if (cardCvc.length < 3) {
                          setPaymentError('Please enter a valid CVV.');
                          return;
                        }
                        setPaymentError('');
                        setCheckoutStep('processing');
                        handleSimulatePayment();
                      }}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold rounded uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Lock className="w-3.5 h-3.5" /> Authorize & Pay ₹499
                    </button>
                    <div className="flex items-center justify-center gap-1 text-[9px] text-neutral-500 font-mono mt-3 uppercase">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Secured simulated gateway // No actual charges will apply
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 'processing' && (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="relative mb-6">
                    <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-neutral-300 uppercase tracking-wider mb-2">Processing Sandbox Order</h4>
                  <p className="text-xs text-neutral-400 font-mono max-w-sm mx-auto h-8 flex items-center justify-center">
                    {processingStatus}
                  </p>
                  <div className="mt-8 text-[9px] text-neutral-600 font-mono uppercase">
                    Do not close this modal or refresh the builder.
                  </div>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="py-6 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">Pro Studio Unlocked!</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed mb-6 font-sans">
                    Welcome to the professional plan, <span className="text-white font-bold">{cardName || 'Dhruvil Shah'}</span>! Your workspace is now upgraded with continuous infinite canvas slides, high-resolution document layouts, and full custom branding.
                  </p>

                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900 w-full text-left mb-6 font-mono text-[11px] space-y-1">
                    <div className="text-neutral-500 uppercase text-[9px] tracking-wider font-bold mb-1">Receipt & License Details</div>
                    <div className="flex justify-between"><span className="text-neutral-500">Tier:</span> <span className="text-amber-400">Pro Studio Lifetime Sandbox</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500">Method:</span> <span className="text-neutral-300">Visa ending in {cardNumber.slice(-4) || '4242'}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500">Reference:</span> <span className="text-neutral-400">TXN-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                    <div className="flex justify-between border-t border-neutral-900 pt-1 mt-1 font-bold text-xs"><span className="text-white">Amount Paid:</span> <span className="text-white">₹499 (Simulated)</span></div>
                  </div>

                  <button
                    onClick={() => {
                      setShowUpgradeModal(false);
                      setCheckoutStep('pricing');
                      // Reset card info
                      setCardNumber('');
                      setCardExpiry('');
                      setCardCvc('');
                      setCardName('');
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black text-xs font-bold rounded uppercase cursor-pointer shadow-lg shadow-amber-500/10 transition-all"
                  >
                    Return to Workspace
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating "Made by Dhruvil Shah" badge - bottom right corner */}
      <div className="fixed bottom-4 right-4 z-30">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="group"
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#121212]/80 backdrop-blur-md border border-neutral-800/60 shadow-lg shadow-amber-500/5 hover:border-amber-500/20 hover:shadow-amber-500/10 transition-all duration-300 cursor-default">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-[8px] text-black font-bold">
              D
            </div>
            <span className="text-[10px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
              Made by <span className="font-bold text-amber-400">Dhruvil Shah</span>
            </span>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
