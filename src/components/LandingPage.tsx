import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Grid3X3, 
  Layers, 
  Download, 
  Image as ImageIcon, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Sliders, 
  Zap, 
  CheckCircle,
  HelpCircle,
  Star
} from 'lucide-react';
import { DEFAULT_CAROUSEL_SLIDES } from '../data';

interface LandingPageProps {
  onStartCreating: () => void;
  onExploreTemplates: () => void;
}

export default function LandingPage({ onStartCreating, onExploreTemplates }: LandingPageProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? DEFAULT_CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === DEFAULT_CAROUSEL_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-yellow-600/5 blur-[100px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" /> Editorial Precision Canvas
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] font-sans"
          >
            Craft High-End <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Carousels
            </span> Without the Effort.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            The professional-grade canvas for creators who demand perfection. Seamless layouts, dark-editorial aesthetics, and lightning-fast social exports.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={onStartCreating}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-amber-500 text-black hover:bg-amber-400 font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-98 cursor-pointer"
            >
              Start Designing <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreTemplates}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800/80 font-medium transition-all cursor-pointer"
            >
              Browse Templates
            </button>
          </motion.div>
        </div>
      </section>

      {/* Interactive Visual Slider Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto relative">
        <div className="absolute inset-0 canvas-grid opacity-30 rounded-3xl" />
        
        <div className="relative glass-panel rounded-2xl border border-neutral-800/80 p-4 sm:p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2 text-xs font-mono text-neutral-500 tracking-wider">PREVIEW_PLAYGROUND.JSON</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevSlide}
                className="p-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Interactive Slide Frame */}
          <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[16/9] w-full max-h-[500px] rounded-lg bg-neutral-950 border border-neutral-900 flex flex-col justify-center items-center">
            {DEFAULT_CAROUSEL_SLIDES.map((slide, index) => {
              const isActive = index === activeSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out flex flex-col justify-between p-8 sm:p-12 ${
                    isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-98 pointer-events-none z-0'
                  }`}
                  style={{
                    backgroundColor: slide.bgColor,
                    backgroundImage: slide.bgImage ? `url(${slide.bgImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Dark Overlaid Layer to verify editorial aesthetic */}
                  <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ backgroundColor: `rgba(0,0,0,${1 - slide.bgOpacity})` }}
                  />

                  {/* Slide Metadata */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                      CarouselPro // Studio
                    </span>
                    <span className="text-neutral-500 font-mono text-xs">
                      {slide.slideNumber} / {DEFAULT_CAROUSEL_SLIDES.length.toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Main Slide Typography */}
                  <div className="relative z-10 my-auto max-w-xl">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] whitespace-pre-line mb-4 font-sans">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-lg text-neutral-300 leading-relaxed max-w-md">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Branding Footer */}
                  <div className="relative z-10 flex justify-between items-end">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-xs font-mono text-neutral-400 tracking-wider">EDITORIAL_DESIGN</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-600">
                      SWIPE TO DISCOVER
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {DEFAULT_CAROUSEL_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  index === activeSlide ? 'bg-amber-400 w-4' : 'bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 border-y border-neutral-900/60 bg-neutral-950/40">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">3M+</div>
            <div className="text-xs font-mono text-neutral-500 tracking-wider uppercase">Carousels Created</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">99.9%</div>
            <div className="text-xs font-mono text-neutral-500 tracking-wider uppercase">Platform Uptime</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">50k+</div>
            <div className="text-xs font-mono text-neutral-500 tracking-wider uppercase">Active Creators</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1 flex items-center justify-center gap-1">
              4.9 <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-xs font-mono text-neutral-500 tracking-wider uppercase">User Rating</div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Engineered For Absolute Precision.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Every feature is hand-crafted to respect your typography rules, layout rhythm, and pacing requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Grid System */}
          <div className="glass-panel p-8 rounded-xl flex flex-col justify-between border border-neutral-900 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-500" />
            <div className="mb-8">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                <Grid3X3 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Layout Grid</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Automatically align title text, subtitle elements, and custom stickers with perfect typography rhythm.
              </p>
            </div>
            <div className="font-mono text-neutral-600 text-[11px] uppercase tracking-wider">
              ALIGNMENT_GRID_V2.0
            </div>
          </div>

          {/* Card 2: AI Background Remover */}
          <div className="glass-panel p-8 rounded-xl flex flex-col justify-between border border-neutral-900 relative group overflow-hidden md:col-span-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-all duration-500" />
            <div className="mb-8">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-5">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">One-Click AI BG Removal</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Isolate subjects with high fidelity. Perfect for placing chairs, laptops, or custom avatars over deep, ambient gradients.
              </p>
            </div>
            <div className="font-mono text-neutral-600 text-[11px] uppercase tracking-wider">
              AI_BACKGROUND_ISOLATION
            </div>
          </div>

          {/* Card 3: Seamless Exports */}
          <div className="glass-panel p-8 rounded-xl flex flex-col justify-between border border-neutral-900 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-500" />
            <div className="mb-8">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Seamless Exports</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Export individual slice packages or full visual presentations optimized for Instagram, LinkedIn, and Twitter.
              </p>
            </div>
            <div className="font-mono text-neutral-600 text-[11px] uppercase tracking-wider">
              EXPORTS_MULTIPLATFORM
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Design Showcase */}
      <section className="py-16 bg-neutral-950/60 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-amber-400 font-mono text-xs tracking-wider uppercase mb-3 block">
              Continuous Flow
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-5 leading-snug">
              Visual elements that bridge adjacent slides beautifully.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
              Unlike cookie-cutter slider apps, CarouselPro lets elements span across slide borders. A beautiful golden trial or typographic line flows perfectly from slide 1 to slide 2, making the swipe experience highly engaging and fluid.
            </p>
            <div className="space-y-3">
              {[
                'Seamless graphic spanning across multiple slides',
                'Pre-configured premium font pairing profiles',
                'Fine-tuned canvas grain & editorial noise overlays',
                'Intelligent dark theme contrast controls'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent blur-3xl pointer-events-none" />
            <div className="relative glass-panel rounded-xl overflow-hidden border border-neutral-800 p-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden relative border border-neutral-800">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHalm3ubWqZ9zESufLSizjFLmc23kC6UhZQUdsmHYDsDxyG5ASUjGnz0ocAMA0f0VH60BTBXG5h3uKKknEqZg3z-XAl2p57qeBvxCSwqyYlQ6JcMlCSgOCCtOEnY5O5tOHCpRXJdUtaZ5V2g47hbmcQh4BLEJmBL_djwGvsbZjzjO-n6F2EWMhxEwQUDFBqTFhgogZ8-NeUHxRIGKHDzRhkjzvPsplOmsq8-RNLNbfzdBj2RnmESFjVA" 
                    alt="Seamless 1"
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 px-2 py-0.5 rounded text-[10px] text-amber-400 font-mono">
                    SLIDE 01
                  </div>
                </div>
                <div className="aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden relative border border-neutral-800">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Tgv5_J4YroyOrbKBD_YzvM0AS9CBEKi96v29ji0VdtG72qSACTkY1EvQfoJloUibfKUhY7oQz_kSi_Aqg105ajh9z1vg20WR3RvPbgOXOuOFJSRIXQM1YbROLTSIqK-rEnYo2bsrV5jQPYSVvUfXt-6tM-QYauCAs6jQ2NrDxnedcmfM3dks4zy359UTnD-5T1lKmdJLFAX5ZasU2omjsNvHWoeItk23VWvyd8cnR2tRpy_nD7RplQ" 
                    alt="Seamless 2"
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 px-2 py-0.5 rounded text-[10px] text-amber-400 font-mono">
                    SLIDE 02
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-4 text-center relative max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-amber-500/5 rounded-3xl blur-3xl pointer-events-none" />
        <div className="relative glass-panel rounded-2xl border border-neutral-800 p-8 sm:p-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Demand Better Carousels.
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto mb-8 text-sm sm:text-base">
            Join thousands of professional designers and digital creators who have elevated their social presence with custom, beautiful editorial designs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onStartCreating}
              className="px-8 py-4 rounded-lg bg-amber-500 text-black hover:bg-amber-400 font-semibold transition-all cursor-pointer"
            >
              Start Creating Now
            </button>
            <button
              onClick={onExploreTemplates}
              className="px-8 py-4 rounded-lg bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-all cursor-pointer"
            >
              Browse Premium Bases
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-neutral-900 text-center text-xs text-neutral-600 font-mono">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} CAROUSELPRO. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6 text-neutral-500">
            <span className="hover:text-amber-400 transition-colors cursor-pointer">PRIVACY</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">TERMS</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">CREDITS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
