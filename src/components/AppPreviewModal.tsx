import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Smartphone, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Send, 
  Linkedin, 
  Instagram, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Users, 
  Share2, 
  MoreHorizontal, 
  Plus, 
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';
import { CarouselSlide } from '../types';

interface AppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: CarouselSlide[];
}

type SocialApp = 'linkedin' | 'instagram_feed' | 'instagram_stories' | 'twitter' | 'tiktok';

export default function AppPreviewModal({ isOpen, onClose, slides }: AppPreviewModalProps) {
  const [selectedApp, setSelectedApp] = useState<SocialApp>('linkedin');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<'portrait' | 'square' | 'story'>('portrait');
  const [customCaption, setCustomCaption] = useState(
    "Excited to launch this brand-new design system! Perfect continuity between slides maximizes reader retention. What do you think of this visual flow? 🚀✨ #marketing #design #carouselpro"
  );
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'setup' | 'preview'>('preview');

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const RenderPreviewSlide = ({ slide, width, height, watermark }: { slide: CarouselSlide, width: string, height: string, watermark?: string }) => {
    const scaleRatio = parseInt(width) / 380;
    return (
      <div
        className="relative overflow-hidden transition-all duration-300 shadow-lg select-none"
        style={{
          width,
          height,
          backgroundColor: slide.bgColor?.startsWith('linear-gradient') ? undefined : (slide.bgColor || '#000000'),
          backgroundImage: slide.bgColor?.startsWith('linear-gradient')
            ? slide.bgColor
            : ((!slide.bgRemoved && slide.bgImage) ? `url(${slide.bgImage})` : 'none'),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Backdrop mask */}
        {!slide.bgRemoved && slide.bgImage && (
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ backgroundColor: `rgba(0,0,0,${1 - slide.bgOpacity})` }}
          />
        )}

        {/* Isolated AI Subject mask */}
        {slide.bgRemoved && (
          <div className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none">
            <div className="absolute inset-0 canvas-grid-light opacity-10" />
            {slide.bgRemovedImage && (
              <img 
                src={slide.bgRemovedImage} 
                alt="subject" 
                className="relative z-10 w-4/5 h-4/5 object-contain object-bottom mb-8"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        )}

        {/* Slide Overlays / Watermarks */}
        <div className="absolute inset-4 pointer-events-none z-10 flex flex-col justify-between p-0.5">
          <div className="flex justify-between items-center text-[7px] font-mono">
            <span className="text-amber-400 font-bold">CAROUSELPRO</span>
            <span className="text-neutral-400">{slide.slideNumber} / {slides.length.toString().padStart(2, '0')}</span>
          </div>

          <div className="flex justify-between items-end text-[7px] font-mono text-neutral-500">
            <span>{watermark || 'EDITORIAL_FLOW'}</span>
            <span>SWIPE ➔</span>
          </div>
        </div>

        {/* Core text content */}
        <div className="absolute inset-5 flex flex-col justify-center items-start z-20 pointer-events-none">
          <h3 
            className="text-white tracking-tight leading-[1.15] mb-1.5 whitespace-pre-line font-bold"
            style={{
              fontFamily: slide.titleFontFamily || 'Inter, sans-serif',
              color: slide.titleColor || '#FFFFFF',
              fontSize: slide.titleSize ? `${slide.titleSize * scaleRatio}px` : `${28 * scaleRatio}px`,
            }}
          >
            {slide.title}
          </h3>
          <p 
            className="leading-relaxed"
            style={{
              fontFamily: slide.subtitleFontFamily || 'Inter, sans-serif',
              color: slide.subtitleColor || '#D1D5DB',
              fontSize: slide.subtitleSize ? `${slide.subtitleSize * scaleRatio}px` : `${12 * scaleRatio}px`,
            }}
          >
            {slide.subtitle}
          </p>
        </div>

        {/* Draggable/Interactive Custom elements (Text & Stickers) */}
        {slide.elements?.map((el) => {
          return (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: `${el.x}%`,
                top: `${el.y}%`,
                opacity: el.opacity !== undefined ? el.opacity : 1,
                filter: el.blur ? `blur(${el.blur * scaleRatio}px)` : 'none',
              }}
              className="z-30 pointer-events-none select-none"
            >
              {el.type === 'text' ? (
                <span 
                  style={{ 
                    fontSize: `${(el.fontSize || 14) * scaleRatio}px`, 
                    color: el.color || '#FFFFFF',
                    fontWeight: el.fontWeight || 'normal',
                    fontFamily: el.fontFamily || 'inherit'
                  }}
                  className="block whitespace-nowrap"
                >
                  {el.content}
                </span>
              ) : (
                <div style={{ width: `${(el.fontSize || 100) * scaleRatio}px` }}>
                  <img 
                    src={el.content} 
                    alt="Sticker asset" 
                    className="w-full object-contain pointer-events-none" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Aspect ratio dims for preview
  const getAspectDims = (app: SocialApp) => {
    if (app === 'instagram_stories' || app === 'tiktok') {
      return { width: '250px', height: '444px', label: '9:16 Stories' };
    }
    switch (aspectRatio) {
      case 'square':
        return { width: '280px', height: '280px', label: '1:1 Square' };
      case 'portrait':
      default:
        return { width: '280px', height: '350px', label: '4:5 Portrait' };
    }
  };

  const activeDims = getAspectDims(selectedApp);

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(0); // wrap around
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setCurrentSlideIndex(slides.length - 1); // wrap around
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#0D0D0D] border border-neutral-800 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl"
      >
        {/* Mobile top tabs */}
        <div className="flex md:hidden bg-[#161616] p-1 border-b border-neutral-800 shrink-0">
          <button
            onClick={() => setActiveMobileTab('setup')}
            className={`flex-1 py-2 text-center rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
              activeMobileTab === 'setup' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            ⚙️ Setup Feed
          </button>
          <button
            onClick={() => setActiveMobileTab('preview')}
            className={`flex-1 py-2 text-center rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
              activeMobileTab === 'preview' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            📱 Live Simulator
          </button>
        </div>
        
        {/* LEFT COLUMN: Controls & App Selectors */}
        <div className={`w-full md:w-[350px] bg-[#121212] border-r border-neutral-900 p-6 flex-col justify-between overflow-y-auto shrink-0 ${
          activeMobileTab === 'setup' ? 'flex' : 'hidden md:flex'
        }`}>
          <div className="space-y-6">
            
            {/* Header Title */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> High-Fidelity Simulator
                </span>
                <h3 className="text-xl font-extrabold text-white">App Feed Previewer</h3>
              </div>
              <button
                onClick={onClose}
                className="md:hidden p-1.5 bg-neutral-950 border border-neutral-800 rounded-full text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Select App Platform */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                1. Select Target Social App
              </label>
              
              <div className="space-y-1.5">
                {[
                  { id: 'linkedin', name: 'LinkedIn Feed', icon: Linkedin, color: 'text-blue-400' },
                  { id: 'instagram_feed', name: 'Instagram Feed Grid', icon: Instagram, color: 'text-pink-400' },
                  { id: 'instagram_stories', name: 'Instagram Stories', icon: Smartphone, color: 'text-amber-400' },
                  { id: 'twitter', name: 'Twitter / X Post', icon: Share2, color: 'text-neutral-300' },
                  { id: 'tiktok', name: 'TikTok Slideshow', icon: RefreshCw, color: 'text-teal-400' }
                ].map((app) => {
                  const Icon = app.icon;
                  const isSelected = selectedApp === app.id;
                  return (
                    <button
                      key={app.id}
                      onClick={() => {
                        setSelectedApp(app.id as SocialApp);
                        setCurrentSlideIndex(0);
                      }}
                      className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-500/10 border-amber-500/40 text-white' 
                          : 'bg-neutral-950/60 border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-amber-500/10' : 'bg-neutral-900'} ${app.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className="block text-xs font-bold">{app.name}</span>
                        <span className="text-[9px] font-mono text-neutral-500 uppercase">
                          {app.id === 'instagram_stories' || app.id === 'tiktok' ? '9:16 vertical' : 'Adjustable scale'}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Aspect Ratio (Only active for Feeds) */}
            {selectedApp !== 'instagram_stories' && selectedApp !== 'tiktok' && (
              <div className="space-y-2.5 pt-2">
                <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  2. Simulation Aspect Ratio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'portrait', name: 'Portrait', label: '4:5 Feed' },
                    { id: 'square', name: 'Square', label: '1:1 Post' }
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => setAspectRatio(ratio.id as any)}
                      className={`p-2 rounded-lg border text-center transition-all cursor-pointer text-xs ${
                        aspectRatio === ratio.id 
                          ? 'bg-neutral-900 border-amber-500/40 text-amber-400' 
                          : 'bg-neutral-950 border-neutral-900 text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <span className="block font-bold">{ratio.name}</span>
                      <span className="text-[9px] font-mono text-neutral-600 block">{ratio.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customize Mock Post Caption */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  3. Feed Description text
                </label>
                <button
                  onClick={() => setIsEditingCaption(!isEditingCaption)}
                  className="text-[10px] font-mono text-amber-400 hover:underline cursor-pointer"
                >
                  {isEditingCaption ? 'Save' : 'Edit Caption'}
                </button>
              </div>
              
              {isEditingCaption ? (
                <textarea
                  value={customCaption}
                  onChange={(e) => setCustomCaption(e.target.value)}
                  className="w-full h-24 bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:border-amber-500/40 font-sans"
                  placeholder="Enter custom post caption..."
                />
              ) : (
                <p className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-900 text-xs text-neutral-400 leading-relaxed max-h-24 overflow-y-auto font-sans italic">
                  "{customCaption}"
                </p>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
              <span className="text-xs font-mono text-neutral-400">Mock App Theme</span>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="px-3 py-1 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 rounded cursor-pointer"
              >
                {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </div>

          </div>

          <div className="pt-6 hidden md:block">
            <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-[10px] text-amber-300/80 leading-relaxed flex gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Use the bottom or slide arrows to test the swipe experience. Carousels perform up to 10x better than single image posts.
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Desktop Preview Canvas */}
        <div className={`flex-1 bg-neutral-950 flex-col justify-between overflow-hidden relative ${
          activeMobileTab === 'preview' ? 'flex' : 'hidden md:flex'
        }`}>
          
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center shrink-0 bg-[#0D0D0D]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                FEED_PLACEMENT_SIMULATOR // ONLINE
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Device Mockup Stage */}
          <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 bg-gradient-to-b from-[#0A0A0A] to-neutral-950 relative">
            
            <div className="scale-90 sm:scale-100 transition-transform origin-center">
              
              {/* ----------------- LINKEDIN SIMULATOR ----------------- */}
              {selectedApp === 'linkedin' && (
                <div className={`w-[360px] rounded-2xl border transition-all ${
                  isDarkMode 
                    ? 'bg-[#1D2226] border-[#292D32] text-[#F3F5F7]' 
                    : 'bg-white border-neutral-200 text-neutral-800'
                } shadow-2xl p-4 space-y-3 font-sans`}>
                  
                  {/* User Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-black font-extrabold text-sm">
                        CP
                      </div>
                      <div>
                        <h4 className="text-xs font-bold flex items-center gap-1">
                          CarouselPro AI Studio
                          <span className="text-[10px] font-normal text-neutral-500">• 1st</span>
                        </h4>
                        <p className="text-[10px] text-neutral-500">Premium Visual Editor & Brand Builder</p>
                        <p className="text-[9px] text-neutral-500 flex items-center gap-1">
                          2h • Edited • <Users className="w-2.5 h-2.5 inline" />
                        </p>
                      </div>
                    </div>
                    <button className="text-neutral-500 hover:text-amber-400">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Caption */}
                  <p className="text-[11px] leading-relaxed line-clamp-3">
                    {customCaption}
                  </p>

                  {/* LinkedIn Style Slider Wrapper */}
                  <div className="relative rounded-lg overflow-hidden border border-neutral-800 group">
                    <div className="flex items-center justify-center bg-black/40">
                      
                      {/* Swipeable Slide Rendered Container */}
                      <RenderPreviewSlide slide={currentSlide} width={activeDims.width} height={activeDims.height} watermark="LINKEDIN_FEED" />
                    </div>

                    {/* Left/Right Absolute navigation buttons on card hover */}
                    <div className="absolute inset-y-0 left-2 flex items-center">
                      <button
                        onClick={handlePrevSlide}
                        className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="absolute inset-y-0 right-2 flex items-center">
                      <button
                        onClick={handleNextSlide}
                        className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Slide counter pill top-right */}
                    <div className="absolute top-2 right-2 bg-black/75 px-2 py-0.5 rounded text-[8px] font-mono text-neutral-300">
                      {currentSlideIndex + 1} / {slides.length}
                    </div>
                  </div>

                  {/* LinkedIn reactions bar */}
                  <div className="flex justify-between items-center text-[10px] text-neutral-500 border-b border-neutral-900/60 pb-2">
                    <div className="flex items-center gap-1">
                      <span className="flex -space-x-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">👍</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white">👏</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center text-[8px] text-white">💡</span>
                      </span>
                      <span>You and 142 others</span>
                    </div>
                    <span>42 comments • 12 reposts</span>
                  </div>

                  {/* Footer interaction buttons */}
                  <div className="grid grid-cols-4 gap-1 text-[11px] font-semibold text-neutral-400">
                    <button className="py-1 hover:bg-neutral-800/40 rounded flex items-center justify-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" /> <span>Like</span>
                    </button>
                    <button className="py-1 hover:bg-neutral-800/40 rounded flex items-center justify-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" /> <span>Comment</span>
                    </button>
                    <button className="py-1 hover:bg-neutral-800/40 rounded flex items-center justify-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5" /> <span>Repost</span>
                    </button>
                    <button className="py-1 hover:bg-neutral-800/40 rounded flex items-center justify-center gap-1.5">
                      <Send className="w-3.5 h-3.5" /> <span>Send</span>
                    </button>
                  </div>

                </div>
              )}

              {/* ----------------- INSTAGRAM FEED SIMULATOR ----------------- */}
              {selectedApp === 'instagram_feed' && (
                <div className={`w-[350px] rounded-2xl border transition-all ${
                  isDarkMode 
                    ? 'bg-black border-[#1A1A1A] text-white' 
                    : 'bg-white border-neutral-200 text-neutral-900'
                } shadow-2xl p-3 space-y-3 font-sans`}>
                  
                  {/* Insta Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-[1.5px]">
                        <div className={`w-full h-full rounded-full flex items-center justify-center text-[9px] font-extrabold ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                          CP
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold">carouselpro_studio</h4>
                        <p className="text-[8px] text-neutral-500">San Francisco, California</p>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-neutral-500" />
                  </div>

                  {/* Main Carousel viewport container */}
                  <div className="relative rounded bg-[#0A0A0A] overflow-hidden border border-neutral-900 flex items-center justify-center">
                    
                    {/* Rendered Slide */}
                    <RenderPreviewSlide slide={currentSlide} width={activeDims.width} height={activeDims.height} watermark="INSTA_GRID" />

                    {/* Navigation arrows */}
                    <div className="absolute inset-y-0 left-2 flex items-center">
                      <button
                        onClick={handlePrevSlide}
                        className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white cursor-pointer"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="absolute inset-y-0 right-2 flex items-center">
                      <button
                        onClick={handleNextSlide}
                        className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white cursor-pointer"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Slide indicator overlay */}
                    <div className="absolute top-3 right-3 bg-black/75 px-2 py-0.5 rounded-full text-[8px] font-mono text-neutral-300">
                      {currentSlideIndex + 1}/{slides.length}
                    </div>

                  </div>

                  {/* Icon Actions Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4.5 h-4.5 cursor-pointer text-pink-500 hover:scale-110 transition-transform" />
                      <MessageCircle className="w-4.5 h-4.5 cursor-pointer hover:scale-110 transition-transform" />
                      <Send className="w-4.5 h-4.5 cursor-pointer hover:scale-110 transition-transform" />
                    </div>

                    {/* Center Dots Indicator */}
                    <div className="flex gap-1">
                      {slides.map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            i === currentSlideIndex 
                              ? 'bg-blue-500 scale-110' 
                              : 'bg-neutral-700'
                          }`}
                        />
                      ))}
                    </div>

                    <Bookmark className="w-4.5 h-4.5 cursor-pointer hover:scale-110 transition-transform text-amber-400" />
                  </div>

                  {/* Description & comments */}
                  <div className="text-[11px] leading-relaxed space-y-1">
                    <p className="font-bold">1,248 likes</p>
                    <p>
                      <span className="font-bold mr-1.5">carouselpro_studio</span>
                      {customCaption}
                    </p>
                    <p className="text-[9px] text-neutral-500 uppercase mt-1">View all 18 comments</p>
                    <p className="text-[8px] text-neutral-600 uppercase">3 MINUTES AGO</p>
                  </div>

                </div>
              )}

              {/* ----------------- INSTAGRAM STORIES SIMULATOR (9:16) ----------------- */}
              {selectedApp === 'instagram_stories' && (
                <div className="w-[280px] h-[496px] bg-[#121212] rounded-[36px] border-4 border-neutral-800 overflow-hidden shadow-2xl relative font-sans text-white">
                  
                  {/* Top notch camera sensor */}
                  <div className="absolute top-2 inset-x-0 flex justify-center z-40">
                    <div className="w-20 h-4 rounded-full bg-black" />
                  </div>

                  {/* Stories top Progress Indicators */}
                  <div className="absolute top-8 inset-x-3 flex gap-1 z-30">
                    {slides.map((_, i) => (
                      <div key={i} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white transition-all duration-300"
                          style={{
                            width: i < currentSlideIndex ? '100%' : i === currentSlideIndex ? '60%' : '0%'
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Top user profile header story */}
                  <div className="absolute top-11 left-3 right-3 flex items-center justify-between z-30">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-amber-500 p-[1px]">
                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[8px] font-extrabold text-white">
                          CP
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold leading-tight">carouselpro_studio</h4>
                        <p className="text-[7px] text-neutral-400 leading-none">Sponsored</p>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-neutral-300" />
                  </div>

                  {/* Full size slide background content */}
                  <div className="absolute inset-0">
                    <RenderPreviewSlide slide={currentSlide} width="280px" height="496px" watermark="INSTA_STORIES" />
                    <div className="absolute bottom-16 inset-x-0 pointer-events-none text-center text-[7px] font-mono text-neutral-400 animate-bounce z-20">
                      ▲ SWIPE UP TO EXPLORE
                    </div>
                  </div>

                  {/* Left / Right hidden click triggers for rapid story navigation */}
                  <div className="absolute inset-y-0 left-0 w-1/4 z-20 cursor-pointer" onClick={handlePrevSlide} />
                  <div className="absolute inset-y-0 right-0 w-1/4 z-20 cursor-pointer" onClick={handleNextSlide} />

                  {/* Story footer text reply */}
                  <div className="absolute bottom-5 inset-x-3 z-30 flex items-center gap-2.5">
                    <div className="flex-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-2 text-[9px] text-neutral-300">
                      Send message...
                    </div>
                    <Heart className="w-4 h-4 text-white cursor-pointer shrink-0" />
                    <Send className="w-4 h-4 text-white cursor-pointer shrink-0" />
                  </div>

                </div>
              )}

              {/* ----------------- TWITTER / X SIMULATOR ----------------- */}
              {selectedApp === 'twitter' && (
                <div className="w-[360px] rounded-2xl border bg-black border-neutral-900 text-white shadow-2xl p-4 space-y-3 font-sans">
                  
                  {/* Twitter Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-amber-400 font-bold text-xs border border-neutral-800">
                        𝕏
                      </div>
                      <div>
                        <h4 className="text-xs font-bold flex items-center gap-1">
                          CarouselPro AI Studio
                          <span className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[7px] text-white">✓</span>
                        </h4>
                        <p className="text-[10px] text-neutral-500">@carouselpro_hq</p>
                      </div>
                    </div>
                    <button className="text-neutral-500 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post caption text */}
                  <p className="text-[11px] leading-normal">
                    {customCaption}
                  </p>

                  {/* Twitter Style image box */}
                  <div className="relative rounded-xl overflow-hidden border border-neutral-900 bg-neutral-950 flex items-center justify-center">
                    
                    {/* Render slide inside card box */}
                    <RenderPreviewSlide slide={currentSlide} width={activeDims.width} height={activeDims.height} watermark="X_THREAD" />

                    {/* Thread slide arrows */}
                    <div className="absolute inset-y-0 left-2 flex items-center">
                      <button onClick={handlePrevSlide} className="p-1 rounded-full bg-black/75 text-white border border-neutral-800 cursor-pointer">
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="absolute inset-y-0 right-2 flex items-center">
                      <button onClick={handleNextSlide} className="p-1 rounded-full bg-black/75 text-white border border-neutral-800 cursor-pointer">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Dots indicator overlay */}
                    <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                      {slides.map((_, i) => (
                        <span key={i} className={`w-1 h-1 rounded-full ${i === currentSlideIndex ? 'bg-white' : 'bg-neutral-600'}`} />
                      ))}
                    </div>

                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[8px] text-neutral-400 font-mono">
                      {currentSlideIndex + 1} of {slides.length}
                    </div>

                  </div>

                  {/* Twitter metrics */}
                  <div className="py-2 border-b border-neutral-900 text-[10px] text-neutral-500 flex gap-4">
                    <span><strong>12.4K</strong> Views</span>
                    <span><strong>182</strong> Reposts</span>
                    <span><strong>940</strong> Likes</span>
                  </div>

                </div>
              )}

              {/* ----------------- TIKTOK SLIDESHOW SIMULATOR ----------------- */}
              {selectedApp === 'tiktok' && (
                <div className="w-[280px] h-[496px] bg-black rounded-[36px] border-4 border-neutral-800 overflow-hidden shadow-2xl relative font-sans text-white">
                  
                  {/* Top Notch container */}
                  <div className="absolute top-2 inset-x-0 flex justify-center z-40">
                    <div className="w-20 h-4 rounded-full bg-neutral-950" />
                  </div>

                  {/* Top active tab indicator */}
                  <div className="absolute top-7 inset-x-0 flex justify-center gap-3 z-30 text-[11px] font-bold text-neutral-400">
                    <span>Following</span>
                    <span className="text-white border-b-2 border-white pb-1">For You</span>
                  </div>

                  {/* Render full screen background slide representation */}
                  <div className="absolute inset-0">
                    <RenderPreviewSlide slide={currentSlide} width="280px" height="496px" watermark="TIKTOK_SHOW" />
                    
                    {/* Custom TikTok indicators overlaying slide */}
                    <div className="absolute inset-x-5 bottom-16 pointer-events-none z-20 space-y-2">
                      <div className="flex gap-1 mb-1">
                        {slides.map((_, i) => (
                          <div key={i} className={`h-[2.5px] flex-1 rounded-full ${i === currentSlideIndex ? 'bg-amber-400' : 'bg-white/30'}`} />
                        ))}
                      </div>
                      <h4 className="text-[10px] font-mono text-amber-400 font-bold drop-shadow-md">@carouselpro_studio</h4>
                      <p className="text-[8px] text-neutral-400 font-mono drop-shadow-md">
                        ♫ Original Sound - CarouselPro Beats (60 bpm)
                      </p>
                    </div>
                  </div>

                  {/* Slideshow control arrows */}
                  <div className="absolute inset-y-0 left-2 flex items-center z-20">
                    <button onClick={handlePrevSlide} className="p-1 bg-black/60 rounded-full border border-neutral-800 text-white cursor-pointer">
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-14 flex items-center z-20">
                    <button onClick={handleNextSlide} className="p-1 bg-black/60 rounded-full border border-neutral-800 text-white cursor-pointer">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Vertical action icons panel on the right margin */}
                  <div className="absolute right-3.5 bottom-16 flex flex-col items-center gap-4 z-30">
                    
                    {/* User profile with plus */}
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[8px] font-extrabold text-white">
                        CP
                      </div>
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-500 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] text-white font-bold cursor-pointer">
                        +
                      </span>
                    </div>

                    {/* Hearts like count */}
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="p-2 bg-neutral-900/60 rounded-full hover:scale-110 transition-transform">
                        <Heart className="w-4.5 h-4.5 text-rose-500 fill-rose-500" />
                      </div>
                      <span className="text-[8px] text-neutral-300 font-bold mt-1">4.2K</span>
                    </div>

                    {/* Comments count */}
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="p-2 bg-neutral-900/60 rounded-full hover:scale-110 transition-transform">
                        <MessageCircle className="w-4.5 h-4.5 text-white" />
                      </div>
                      <span className="text-[8px] text-neutral-300 font-bold mt-1">324</span>
                    </div>

                    {/* Bookmark count */}
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="p-2 bg-neutral-900/60 rounded-full hover:scale-110 transition-transform text-amber-400">
                        <Bookmark className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[8px] text-neutral-300 font-bold mt-1">102</span>
                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>

          {/* Bottom Slide Picker Controls */}
          <div className="p-5 border-t border-neutral-900 bg-[#0D0D0D] shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Step navigation and active labels */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevSlide}
                className="p-2 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white rounded-lg transition-all cursor-pointer"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-center sm:text-left">
                <span className="block text-[10px] font-mono text-neutral-500 uppercase">Interactive swipe tracker</span>
                <span className="text-xs font-bold text-white">
                  Active Frame: {currentSlide.slideNumber} of {slides.length.toString().padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={handleNextSlide}
                className="p-2 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white rounded-lg transition-all cursor-pointer"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick selector thumbnails */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[280px] p-1 bg-neutral-950 rounded-xl border border-neutral-900">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(i)}
                  className={`w-8 h-8 rounded text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                    i === currentSlideIndex 
                      ? 'bg-amber-500 border-amber-500 text-black scale-105' 
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: slide.bgColor,
                    backgroundImage: (!slide.bgRemoved && slide.bgImage) ? `url(${slide.bgImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <span className="bg-black/45 px-0.5 rounded text-white text-[8px] font-mono block">
                    {slide.slideNumber}
                  </span>
                </button>
              ))}
            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
