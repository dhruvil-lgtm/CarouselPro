import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Share2, 
  FileText, 
  FileImage, 
  Instagram, 
  Linkedin, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Smartphone,
  Sparkles,
  Info
} from 'lucide-react';
import { CarouselSlide } from '../types';
import AppPreviewModal from './AppPreviewModal';

interface ExportPreviewProps {
  slides: CarouselSlide[];
  onBackToEditor: () => void;
  isProUser?: boolean;
  onUpgrade?: () => void;
}

export default function ExportPreview({ 
  slides, 
  onBackToEditor,
  isProUser = false,
  onUpgrade
}: ExportPreviewProps) {
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | 'svg'>('png');
  const [aspectRatio, setAspectRatio] = useState<'portrait' | 'square' | 'story'>('portrait');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedSimulatorActive, setFeedSimulatorActive] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Determine slide size on-screen based on aspect ratio chosen
  const getAspectDimensions = () => {
    switch (aspectRatio) {
      case 'square':
        return { width: '320px', height: '320px', label: '1:1 Square' };
      case 'story':
        return { width: '220px', height: '390px', label: '9:16 Stories' };
      case 'portrait':
      default:
        return { width: '280px', height: '350px', label: '4:5 Portrait' };
    }
  };

  const dims = getAspectDimensions();

  // Simulate exporting process
  const handleStartExport = () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportStep(1);

    setTimeout(() => {
      setExportStep(2);
    }, 1000);

    setTimeout(() => {
      setExportStep(3);
      // Trigger a raw text download as file mockup
      try {
        const count = isProUser ? slides.length : Math.min(3, slides.length);
        const mockupContent = `CarouselPro Export Package\nFormat: ${exportFormat.toUpperCase()}\nAspect Ratio: ${dims.label}\nSlides Count: ${count}${!isProUser ? ' (Free Tier Limit)' : ''}\nGenerated on: ${new Date().toISOString()}`;
        const blob = new Blob([mockupContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `carouselpro-export-${exportFormat}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Simulation download failed:", err);
      }
    }, 2200);

    setTimeout(() => {
      setIsExporting(false);
      setShowConfetti(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 relative">
      
      {/* Header Info */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs tracking-wider uppercase mb-2">
            <Smartphone className="w-4 h-4" /> Export Studio
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
            Seamless Continuity
          </h1>
          <p className="text-neutral-400 max-w-xl text-sm leading-relaxed">
            Verify how individual frames align and flow. Unlike cookie-cutter sliders, CarouselPro maintains pixel-perfect graphic connectivity between adjacent panels.
          </p>
        </div>
        
        <button
          onClick={onBackToEditor}
          className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 hover:text-white transition-all cursor-pointer font-medium text-sm"
        >
          ← Return to Canvas Editor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COMPONENT: Seamless Horizontal Flow Preview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-2xl border border-neutral-900/80 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Continuous Feed Track
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="px-3 py-1 rounded text-xs font-mono border bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-400 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Launch Multi-App Preview
                </button>
                <button
                  onClick={() => setFeedSimulatorActive(!feedSimulatorActive)}
                  className={`px-3 py-1 rounded text-xs font-mono border transition-all cursor-pointer ${
                    feedSimulatorActive
                      ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-500 hover:text-white'
                  }`}
                >
                  {feedSimulatorActive ? 'Hide Inline Overlay' : 'Simulate Inline Feed'}
                </button>
              </div>
            </div>

            {/* Seamless Side-By-Side Horizontal Rail */}
            <div className="relative overflow-x-auto pb-4 pt-2 flex gap-1 bg-neutral-950/60 p-4 rounded-xl border border-neutral-900">
              
              {/* Optional LinkedIn Feed Simulator Frame */}
              {feedSimulatorActive && (
                <div className="absolute top-2 left-4 z-40 bg-neutral-900/95 border border-amber-500/30 rounded p-2.5 text-[10px] text-amber-400 font-mono tracking-wide max-w-[240px]">
                  <strong>Feed Placement Mode:</strong> Verify alignment over professional LinkedIn post container mockups.
                </div>
              )}

              {slides.slice(0, isProUser ? slides.length : 3).map((slide, index) => (
                <div
                  key={slide.id}
                  className="relative shrink-0 select-none shadow-xl border-r border-dashed border-neutral-800 last:border-0 overflow-hidden"
                  style={{
                    width: dims.width,
                    height: dims.height,
                    backgroundColor: slide.bgColor?.startsWith('linear-gradient') ? undefined : (slide.bgColor || '#000000'),
                    backgroundImage: slide.bgColor?.startsWith('linear-gradient')
                      ? slide.bgColor
                      : ((!slide.bgRemoved && slide.bgImage) ? `url(${slide.bgImage})` : 'none'),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'all 0.3s ease'
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
                      <div className="absolute inset-0 canvas-grid-light opacity-15" />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-neutral-950" />
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

                  {/* Inside card headers */}
                  <div className="absolute inset-4 pointer-events-none z-10 flex flex-col justify-between p-2">
                    <div className="flex justify-between items-center text-[8px] font-mono">
                      <span className="text-amber-400">CAROUSELPRO</span>
                      <span className="text-neutral-500">{slide.slideNumber} / {slides.length.toString().padStart(2, '0')}</span>
                    </div>

                    <div className="flex justify-between items-end text-[7px] font-mono text-neutral-500">
                      <span>EDITORIAL_FLOW</span>
                      <span>SWIPE ➔</span>
                    </div>
                  </div>

                  {/* Core copy */}
                  <div className="absolute inset-6 flex flex-col justify-center items-start z-20 pointer-events-none">
                    <h3 
                      className="text-white tracking-tight leading-[1.1] mb-2 whitespace-pre-line font-bold"
                      style={{
                        fontFamily: slide.titleFontFamily || 'Inter, sans-serif',
                        color: slide.titleColor || '#FFFFFF',
                        fontSize: slide.titleSize ? `${(slide.titleSize * parseInt(dims.width)) / 380}px` : undefined,
                      }}
                    >
                      {slide.title}
                    </h3>
                    <p 
                      className="text-neutral-300 leading-relaxed font-sans"
                      style={{
                        fontFamily: slide.subtitleFontFamily || 'Inter, sans-serif',
                        color: slide.subtitleColor || '#D1D5DB',
                        fontSize: slide.subtitleSize ? `${(slide.subtitleSize * parseInt(dims.width)) / 380}px` : undefined,
                      }}
                    >
                      {slide.subtitle}
                    </p>

                    {/* Render standard added text layers and stickers in minified form */}
                    {slide.elements?.map((el) => {
                      const scaleRatio = parseInt(dims.width) / 380;
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

                </div>
              ))}

              {!isProUser && (
                <div 
                  onClick={onUpgrade}
                  className="relative shrink-0 select-none shadow-xl border border-dashed border-neutral-800 rounded-xl bg-neutral-950/40 hover:border-amber-500/40 hover:bg-neutral-900/10 cursor-pointer transition-all flex flex-col items-center justify-center p-6 text-center group"
                  style={{
                    width: dims.width,
                    height: dims.height,
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-all">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-300 group-hover:text-amber-400 transition-colors font-sans">Pro Studio Unlock</h4>
                  <p className="text-xs text-neutral-500 max-w-[200px] leading-relaxed mt-2 font-sans">
                    Free version only shows 3 slides. Upgrade for unlimited frames and premium high-fidelity exports.
                  </p>
                  <span className="mt-4 px-4 py-1.5 bg-amber-500 text-black text-xs font-semibold rounded group-hover:bg-amber-400 transition-all font-sans">
                    Upgrade Now
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 text-xs font-mono text-neutral-500">
              <span>➔ HOLD SHIFT + SCROLL HORIZONTALLY TO NAVIGATE CHANNELS</span>
              <span className="text-amber-400">
                {isProUser ? `${slides.length} slides total` : `Showing 3 of ${slides.length} slides (Free version)`}
              </span>
            </div>
          </div>

          {/* Social Simulator feed representation if requested */}
          {feedSimulatorActive && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-5 rounded-2xl border border-neutral-900/80 max-w-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
                  CP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">CarouselPro Premium Brand</h4>
                  <p className="text-[10px] text-neutral-500 font-mono">14,295 followers • Promoted</p>
                </div>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                "Our designs stand out on the professional feed because the visual trails flow seamlessly from one panel to the next, encouraging higher retention."
              </p>
              
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <span>💬 248 Comments</span>
                <span>🔁 82 Reposts</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT COMPONENT: Export Control Center */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Format selector */}
          <div className="glass-panel rounded-2xl border border-neutral-900/80 p-6 space-y-4">
            <span className="text-xs font-mono text-neutral-400 block uppercase tracking-widest">
              1. Select Export Format
            </span>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'png', label: 'PNG Pack', desc: 'Social Slices' },
                { id: 'pdf', label: 'PDF Book', desc: 'LinkedIn Doc' },
                { id: 'svg', label: 'SVG Vector', desc: 'Infinite scale' }
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setExportFormat(fmt.id as any)}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    exportFormat === fmt.id
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-md'
                      : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800'
                  }`}
                >
                  <span className="block text-xs font-bold uppercase mb-0.5">{fmt.id}</span>
                  <span className="text-[9px] font-mono text-neutral-500 block">{fmt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio configurations */}
          <div className="glass-panel rounded-2xl border border-neutral-900/80 p-6 space-y-4">
            <span className="text-xs font-mono text-neutral-400 block uppercase tracking-widest">
              2. Social Aspect Ratio
            </span>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'portrait', label: 'Portrait', size: '4:5' },
                { id: 'square', label: 'Square', size: '1:1' },
                { id: 'story', label: 'Stories', size: '9:16' }
              ].map((aspect) => (
                <button
                  key={aspect.id}
                  onClick={() => setAspectRatio(aspect.id as any)}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    aspectRatio === aspect.id
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-md'
                      : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800'
                  }`}
                >
                  <span className="block text-xs font-bold uppercase mb-0.5">{aspect.label}</span>
                  <span className="text-[9px] font-mono text-neutral-500 block">{aspect.size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Download block trigger */}
          <div className="glass-panel rounded-2xl border border-neutral-900/80 p-6 space-y-5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400 uppercase">Package details</span>
              <span className="text-neutral-500">READY</span>
            </div>

            <div className="space-y-2 bg-neutral-950/60 p-3 rounded-lg border border-neutral-900 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Total Slides:</span>
                <span className="text-white">{slides.length}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Export Format:</span>
                <span className="text-white uppercase">{exportFormat}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>DPI / Scale:</span>
                <span className="text-white">300 DPI (High)</span>
              </div>
              <div className="flex justify-between text-neutral-400 border-t border-neutral-900 pt-2 mt-2">
                <span>Est. Size:</span>
                <span className="text-amber-400">{(slides.length * 1.2).toFixed(1)} MB</span>
              </div>
            </div>

            {/* Simulated exports actions with steps loading */}
            <button
              onClick={handleStartExport}
              disabled={isExporting}
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-80"
            >
              {isExporting ? (
                <>Generating {exportFormat.toUpperCase()} package...</>
              ) : (
                <>Compile & Download Package <Download className="w-4 h-4" /></>
              )}
            </button>

            {/* Live steps animation tracker */}
            <AnimatePresence>
              {isExporting && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2.5 pt-2"
                >
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-amber-400 uppercase">SYSTEM_PROCESS: EXPORT_TRAY</span>
                    <span className="text-neutral-500 animate-pulse">RUNNING</span>
                  </div>
                  
                  <div className="space-y-1.5 text-[11px] font-mono text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Check className={`w-3.5 h-3.5 ${exportStep >= 1 ? 'text-green-400' : 'text-neutral-700'}`} />
                      <span>Slicing seamless continuous tracks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className={`w-3.5 h-3.5 ${exportStep >= 2 ? 'text-green-400' : 'text-neutral-700'}`} />
                      <span>Optimizing color profile layers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className={`w-3.5 h-3.5 ${exportStep >= 3 ? 'text-green-400' : 'text-neutral-700'}`} />
                      <span>Triggering high-res file streams</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confetti or success message */}
            {showConfetti && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-xs font-sans text-center flex flex-col items-center gap-1.5"
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-4 h-4 animate-bounce" /> Export Complete!
                </div>
                <span>Your high-fidelity social assets pack has downloaded successfully.</span>
                <button 
                  onClick={() => setShowConfetti(false)} 
                  className="mt-1 text-[10px] font-mono text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  Dismiss
                </button>
              </motion.div>
            )}

          </div>

          {/* Social feed warning box */}
          <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl text-[11px] text-amber-300 leading-relaxed flex gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>Continuity Alert:</strong> Instagram and LinkedIn carousels are optimized to look unified in swipe feed grids. Ensure alignment tracks cross borders before finalized exports.
            </div>
          </div>

        </div>

      </div>

      <AppPreviewModal 
        isOpen={isPreviewModalOpen} 
        onClose={() => setIsPreviewModalOpen(false)} 
        slides={slides} 
      />
    </div>
  );
}
