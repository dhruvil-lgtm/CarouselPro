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
  X
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

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 selection:bg-amber-500/35 selection:text-white flex flex-col font-sans">
      
      {/* Top Shared Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-900 z-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
          
          {/* Logo Brand Brand */}
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
          />
        )}

        {activeScreen === 'export' && (
          <ExportPreview 
            slides={slides} 
            onBackToEditor={() => setActiveScreen('editor')} 
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
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600" />
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono tracking-widest uppercase mb-2">
                  <Star className="w-3 h-3 fill-amber-400" /> Premium Access
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Upgrade to Pro Studio</h3>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                  Empower your social presence with advanced visual continuity and AI magic.
                </p>
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Free Plan */}
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-300">Basic Tier</h4>
                    <p className="text-neutral-500 text-[10px] uppercase font-mono mt-0.5">Free forever</p>
                    <div className="my-3 text-2xl font-extrabold text-white">$0</div>
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
                      $12<span className="text-xs font-normal text-neutral-500">/mo</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-neutral-300">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Infinite canvas slides</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> AI background isolation</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> High-res vector exports</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setIsProUser(true);
                      setShowUpgradeModal(false);
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
