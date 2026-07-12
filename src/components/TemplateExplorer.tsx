import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Eye, Filter, Sparkles, BookOpen, Clock, Layers, Hourglass, Palette, Camera, Quote, Globe } from 'lucide-react';
import { TEMPLATES } from '../data';
import { CarouselTemplate } from '../types';

interface TemplateExplorerProps {
  onSelectTemplate: (template: CarouselTemplate) => void;
}

export default function TemplateExplorer({ onSelectTemplate }: TemplateExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>('All');

  const aesthetics = ['All', 'Aesthetic', 'Bold', 'Minimal', 'Gradient', 'Corporate'];

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.aesthetic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAesthetic = selectedAesthetic === 'All' || template.aesthetic === selectedAesthetic;
    return matchesSearch && matchesAesthetic;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
      {/* Header Info */}
      <div className="mb-10 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 font-mono text-xs tracking-wider uppercase mb-2">
          <BookOpen className="w-4 h-4" /> Editorial Bases
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Explore Templates
        </h1>
        <p className="text-neutral-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          Premium carousel layouts designed for maximum engagement. Select a high-fidelity preset to launch directly into the canvas editor.
        </p>
      </div>

      {/* Control Panel / Search and Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-center">
        {/* Search */}
        <div className="lg:col-span-5 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search premium templates or styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900/60 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-neutral-500"
          />
        </div>

        {/* Aesthetic Filter Chips */}
        <div className="lg:col-span-7 flex flex-wrap gap-2 items-center justify-start lg:justify-end">
          <span className="text-xs font-mono text-neutral-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> FILTER_BY:
          </span>
          {aesthetics.map((aesthetic) => (
            <button
              key={aesthetic}
              onClick={() => setSelectedAesthetic(aesthetic)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium font-sans transition-all cursor-pointer ${
                selectedAesthetic === aesthetic
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/10'
                  : 'bg-neutral-900 border border-neutral-800/80 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {aesthetic}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => onSelectTemplate(template)}
              className="group cursor-pointer glass-panel rounded-xl overflow-hidden border border-neutral-900/80 hover:border-amber-500/20 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="aspect-[4/3] bg-neutral-950 overflow-hidden relative">
                <img
                  src={template.coverImage}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Custom Overlay on Hover */}
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-5 py-2.5 rounded-lg bg-amber-500 text-black font-semibold text-sm flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl shadow-amber-500/15">
                    Launch Editor <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Badge tags */}
                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                  <span className="px-2 py-0.5 rounded bg-neutral-950/80 backdrop-blur text-[10px] font-mono text-neutral-300 uppercase tracking-wider">
                    {template.aesthetic}
                  </span>
                  {template.isPro && (
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider">
                      PRO
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur px-2.5 py-1 rounded text-xs font-mono text-neutral-300 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  {template.slidesCount} Slides
                </div>
              </div>

              {/* Info Frame */}
              <div className="p-5 flex justify-between items-center bg-neutral-950/30">
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 mt-0.5">
                    HIGH-FIDELITY BASE PRESET
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-xs text-neutral-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{template.views}</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-600 uppercase">Views</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-neutral-950/30 border border-neutral-900 rounded-xl max-w-xl mx-auto">
          <p className="text-neutral-400 mb-2 font-mono text-sm">NO_MATCHING_TEMPLATES_FOUND</p>
          <p className="text-xs text-neutral-500">Try refining your search queries or resetting the aesthetic filters.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedAesthetic('All'); }}
            className="mt-4 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded text-xs text-amber-400 hover:text-white transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Coming Soon Templates Section */}
      <section className="mt-20">
        <div className="text-center sm:text-left mb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 font-mono text-xs tracking-wider uppercase mb-2">
            <Hourglass className="w-4 h-4" /> Coming Soon
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            More Templates on the Way
          </h2>
          <p className="text-neutral-400 max-w-xl text-sm leading-relaxed">
            We're crafting fresh new designs to expand your creative toolkit. Stay tuned for these upcoming releases.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'Neon Nights',
              desc: 'Cyberpunk-inspired glow layouts with vibrant gradients and futuristic typography.',
              icon: Camera,
              eta: 'Coming in 2 weeks'
            },
            {
              name: 'Minimal Luxe',
              desc: 'Clean, high-end editorial designs with subtle textures and refined spacing.',
              icon: Palette,
              eta: 'Coming in 3 weeks'
            },
            {
              name: 'Bold Statements',
              desc: 'Large typography-driven layouts built for maximum impact and engagement.',
              icon: Quote,
              eta: 'Coming in 1 month'
            },
            {
              name: 'World Travel',
              desc: 'Wanderlust-themed carousels with map elements, stamps, and destination styles.',
              icon: Globe,
              eta: 'Coming soon'
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative glass-panel rounded-xl overflow-hidden border border-dashed border-neutral-800/80 hover:border-amber-500/20 transition-all duration-300 group cursor-default"
              >
                {/* Top badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-mono uppercase tracking-wider">
                    COMING SOON
                  </span>
                </div>

                {/* Illustration area */}
                <div className="aspect-[4/3] bg-neutral-950/80 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400/60 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider">
                      {item.eta}
                    </span>
                  </div>
                  
                  {/* Subtle grid pattern overlay */}
                  <div className="absolute inset-0 canvas-grid-light opacity-20" />
                </div>

                {/* Info */}
                <div className="p-4 bg-neutral-950/20">
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom notification bar */}
                <div className="px-4 py-2 bg-neutral-950/40 border-t border-neutral-900/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">In development — stay tuned</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Pro Badge Feature CTA */}
      <section className="mt-20 glass-panel rounded-2xl border border-neutral-900 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="max-w-xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-amber-400 font-mono text-xs tracking-wider uppercase mb-1.5">
            <Sparkles className="w-4 h-4" /> AI Generator Premium
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Unlock High-Value Designs
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            PRO level designs include continuous image transitions, advanced typography grids, and high-fidelity background removal capabilities. Get started now.
          </p>
        </div>
        <button 
          onClick={() => onSelectTemplate(TEMPLATES[0])}
          className="px-6 py-3 rounded-lg bg-amber-500 text-black hover:bg-amber-400 font-semibold text-sm transition-all shadow-lg shadow-amber-500/10 cursor-pointer shrink-0"
        >
          Try Premium Core Base
        </button>
      </section>
    </div>
  );
}
