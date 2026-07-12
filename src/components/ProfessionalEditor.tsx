import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  Type, 
  Smile, 
  Image as ImageIcon, 
  Layers, 
  Maximize2, 
  Minimize2,
  Sliders,
  Maximize,
  Grid3X3,
  Undo,
  Download,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Settings,
  X,
  FileImage,
  Sparkle
} from 'lucide-react';
import { CarouselSlide, CarouselElement, CarouselTemplate } from '../types';
import { TEXT_PRESETS, STICKER_PRESETS } from '../data';
import AppPreviewModal from './AppPreviewModal';

interface ProfessionalEditorProps {
  slides: CarouselSlide[];
  onUpdateSlides: (newSlides: CarouselSlide[]) => void;
  onGoToExport: () => void;
  isProUser?: boolean;
  onUpgrade?: () => void;
}

export default function ProfessionalEditor({ 
  slides, 
  onUpdateSlides, 
  onGoToExport,
  isProUser = false,
  onUpgrade
}: ProfessionalEditorProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'text' | 'elements' | 'uploads' | 'magic'>('text');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [selectedCoreType, setSelectedCoreType] = useState<'title' | 'subtitle' | null>('title');
  const [isProcessingBG, setIsProcessingBG] = useState(false);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 70;
    }
    return 100;
  });
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'canvas' | 'tools' | 'properties'>('canvas');
  const [editingElementId, setEditingElementId] = useState<string | null>(null);

  // Drag & drop state (refs for performance — avoids re-renders during drag)
  const dragState = useRef({
    isDragging: false,
    justDragged: false, // prevents click event from firing after a drag
    elementId: null as string | null,
    startMouseX: 0,
    startMouseY: 0,
    startElX: 0,
    startElY: 0,
    containerWidth: 380,
    containerHeight: 475,
  });
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const activeSlide = slides[activeSlideIndex] || slides[0];

  // Handler to update fields of the active slide
  const updateActiveSlide = (updatedFields: Partial<CarouselSlide>) => {
    const updated = slides.map((slide, idx) => {
      if (idx === activeSlideIndex) {
        return { ...slide, ...updatedFields };
      }
      return slide;
    });
    onUpdateSlides(updated);
  };

  // Handler to update a specific element inside the active slide
  const updateActiveElement = (elementId: string, updatedFields: Partial<CarouselElement>) => {
    const updatedElements = activeSlide.elements.map((el) => {
      if (el.id === elementId) {
        return { ...el, ...updatedFields };
      }
      return el;
    });
    updateActiveSlide({ elements: updatedElements });
  };

  // Ref pointing to the latest updateActiveElement (avoid stale closure in event listeners)
  const updateActiveElementRef = useRef(updateActiveElement);
  useEffect(() => {
    updateActiveElementRef.current = updateActiveElement;
  });

  // Window-level drag event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.current.isDragging || !dragState.current.elementId) return;
      e.preventDefault();
      const dx = e.clientX - dragState.current.startMouseX;
      const dy = e.clientY - dragState.current.startMouseY;
      const newX = Math.max(0, Math.min(100, Math.round(dragState.current.startElX + (dx / dragState.current.containerWidth) * 100)));
      const newY = Math.max(0, Math.min(100, Math.round(dragState.current.startElY + (dy / dragState.current.containerHeight) * 100)));
      updateActiveElementRef.current(dragState.current.elementId, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (dragState.current.isDragging) {
        dragState.current.justDragged = true;
      }
      dragState.current.isDragging = false;
      dragState.current.elementId = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragState.current.isDragging || !dragState.current.elementId) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragState.current.startMouseX;
      const dy = touch.clientY - dragState.current.startMouseY;
      const newX = Math.max(0, Math.min(100, Math.round(dragState.current.startElX + (dx / dragState.current.containerWidth) * 100)));
      const newY = Math.max(0, Math.min(100, Math.round(dragState.current.startElY + (dy / dragState.current.containerHeight) * 100)));
      updateActiveElementRef.current(dragState.current.elementId, { x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      if (dragState.current.isDragging) {
        dragState.current.justDragged = true;
      }
      dragState.current.isDragging = false;
      dragState.current.elementId = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Add a new slide to the list
  const handleAddSlide = () => {
    if (!isProUser && slides.length >= 3) {
      onUpgrade?.();
      return;
    }
    const nextNum = (slides.length + 1).toString().padStart(2, '0');
    const newSlide: CarouselSlide = {
      id: `slide-${Date.now()}`,
      slideNumber: nextNum,
      title: 'Write a Bold\nHeadline here',
      subtitle: 'Subtitles support editorial insights.',
      bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', // default artistic canvas
      bgColor: '#0B0B0B',
      bgOpacity: 0.5,
      bgRemoved: false,
      elements: []
    };
    onUpdateSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
    setMobileView('canvas');
  };

  // Delete a slide
  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) return; // keep at least one
    const updated = slides.filter((_, idx) => idx !== index);
    // Adjust indices
    const nextSlides = updated.map((slide, i) => ({
      ...slide,
      slideNumber: (i + 1).toString().padStart(2, '0')
    }));
    onUpdateSlides(nextSlides);
    setActiveSlideIndex(Math.max(0, index - 1));
    setSelectedElementId(null);
  };

  // Duplicate the current slide
  const handleDuplicateSlide = () => {
    if (!isProUser && slides.length >= 3) {
      onUpgrade?.();
      return;
    }
    const duplicated: CarouselSlide = {
      ...activeSlide,
      id: `slide-${Date.now()}`,
      slideNumber: (slides.length + 1).toString().padStart(2, '0'),
      elements: activeSlide.elements.map(el => ({ ...el, id: `el-${Date.now()}-${Math.random()}` }))
    };
    onUpdateSlides([...slides, duplicated]);
    setActiveSlideIndex(slides.length);
    setMobileView('canvas');
  };

  // Add predefined text blocks
  const handleAddTextPreset = (preset: typeof TEXT_PRESETS[0]) => {
    const newEl: CarouselElement = {
      id: `el-${Date.now()}`,
      type: 'text',
      content: preset.name === 'Technical Mono' ? 'STEREOPHONIC_SYSTEM' : 'Editable Typography Block',
      x: 30,
      y: 50,
      fontSize: preset.fontSize,
      color: '#ffdca1',
      fontWeight: preset.fontWeight,
      opacity: 1,
      blur: 0
    };
    updateActiveSlide({
      elements: [...activeSlide.elements, newEl]
    });
    setSelectedElementId(newEl.id);
    setSelectedCoreType(null);
    setMobileView('canvas');
  };

  // Add premium sticker shapes
  const handleAddSticker = (sticker: typeof STICKER_PRESETS[0]) => {
    const newEl: CarouselElement = {
      id: `el-${Date.now()}`,
      type: 'sticker',
      content: sticker.image,
      x: 40,
      y: 40,
      fontSize: 100, // represent sticker width/scale
      opacity: 1,
      blur: 0
    };
    updateActiveSlide({
      elements: [...activeSlide.elements, newEl]
    });
    setSelectedElementId(newEl.id);
    setSelectedCoreType(null);
    setMobileView('canvas');
  };

  // Handle uploading custom hotlinked background image
  const handleApplyBackgroundUrl = (url: string) => {
    if (!url) return;
    updateActiveSlide({ bgImage: url });
    setCustomImageUrl('');
    setMobileView('canvas');
  };

  // Simulate AI Background Remover
  const handleSimulateBackgroundRemover = () => {
    if (isProcessingBG) return;
    setIsProcessingBG(true);
    // Simulate smart background removal
    setTimeout(() => {
      setIsProcessingBG(false);
      updateActiveSlide({ 
        bgRemoved: !activeSlide.bgRemoved,
        // Ensure a transparent isolated mockup is present
        bgRemovedImage: activeSlide.bgRemovedImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB7cv0sTv6EB6SVjKMqXhrLr1yfu2dAO5LcYDZbGXaSBqsICFvc1C7A3YqKz7If5fGzSDrE0eR7BR7Vou9Im2871kuN-emZfNzM-9roDmqK3RCfKGvPY0OYcPWLiPjBf87fTdZOr7NraPMSWhgwkfRBnx6eOhut1E4PZ4j7oAunLtgn3vpDJhiiPwhbc-0YWUpDCSn6_iEo49l4MDgxcX1-iXUipWirIvQbIGQ3iYommecgso-dpPzAA'
      });
      setMobileView('canvas');
    }, 1800);
  };

  // Remove a particular added layer
  const handleDeleteElement = (id: string) => {
    updateActiveSlide({
      elements: activeSlide.elements.filter(el => el.id !== id)
    });
    setSelectedElementId(null);
  };

  const selectedElement = activeSlide.elements.find(el => el.id === selectedElementId);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 flex flex-col pt-16">
      
      {/* Editorial Control Header */}
      <div className="bg-[#121212] border-b border-neutral-900 px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap gap-2 justify-between items-center shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden xs:inline-flex bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-mono text-amber-400 uppercase tracking-wider">
            PROJECT_ACTIVE
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-white font-sans">
            Page {activeSlide.slideNumber} of {slides.length.toString().padStart(2, '0')}
          </h2>
        </div>

        {/* Toolbar shortcuts */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Toggle Grid */}
          <button
            onClick={() => setGridEnabled(!gridEnabled)}
            className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 sm:gap-1.5 border transition-all cursor-pointer ${
              gridEnabled 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-white'
            }`}
            title="Toggle alignment grid lines"
          >
            <Grid3X3 className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded px-1.5 py-1 text-xs text-neutral-400">
            <button onClick={() => setZoomLevel(Math.max(30, zoomLevel - 10))} className="hover:text-white cursor-pointer px-1">-</button>
            <span className="font-mono min-w-[30px] text-center">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))} className="hover:text-white cursor-pointer px-1">+</button>
          </div>

          {/* App Feed Live Preview Button */}
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="px-2 py-1.5 sm:px-3.5 sm:py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 font-semibold text-xs rounded flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer"
            title="Preview how it looks on specific social apps"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">App Preview</span>
          </button>

          {/* Go to Export CTA */}
          <button
            onClick={onGoToExport}
            className="px-2.5 py-1.5 sm:px-4 sm:py-1.5 bg-amber-500 text-black font-semibold text-xs rounded hover:bg-amber-400 flex items-center gap-1 sm:gap-1.5 transition-all shadow-md shadow-amber-500/5 cursor-pointer"
          >
            Export <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile view switcher segmented control */}
      <div className="lg:hidden bg-neutral-950 border-b border-neutral-900 p-2 flex justify-center shrink-0">
        <div className="bg-[#121212] p-1 rounded-lg border border-neutral-800/60 flex gap-1 w-full max-w-md">
          <button
            onClick={() => setMobileView('tools')}
            className={`flex-1 py-1.5 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
              mobileView === 'tools'
                ? 'bg-amber-500 text-black shadow font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            🛠️ Tools
          </button>
          <button
            onClick={() => setMobileView('canvas')}
            className={`flex-1 py-1.5 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
              mobileView === 'canvas'
                ? 'bg-amber-500 text-black shadow font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            🎨 Canvas
          </button>
          <button
            onClick={() => setMobileView('properties')}
            className={`flex-1 py-1.5 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
              mobileView === 'properties'
                ? 'bg-amber-500 text-black shadow font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ⚙️ Properties
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT SIDEBAR: Tools Editor Suite */}
        <div className={`w-full lg:w-[320px] bg-[#121212] border-r border-neutral-900/80 flex-col overflow-hidden shrink-0 ${mobileView === 'tools' ? 'flex flex-1' : 'hidden lg:flex'}`}>
          {/* Vertical mini tabs header */}
          <div className="flex border-b border-neutral-900 text-xs font-mono">
            {[
              { id: 'text', label: 'Typography', icon: Type },
              { id: 'elements', label: 'Stickers', icon: Smile },
              { id: 'uploads', label: 'Backdrop', icon: ImageIcon },
              { id: 'magic', label: 'AI Magic', icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-amber-500 text-amber-400 bg-neutral-950/20'
                      : 'border-transparent text-neutral-500 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] scale-90 tracking-wide uppercase">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1.5">Typographic Presets</h3>
                  <p className="text-neutral-500 text-[11px]">Click a curated template to add beautiful custom text layers on the canvas.</p>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {TEXT_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleAddTextPreset(preset)}
                      className="w-full text-left p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 hover:border-amber-500/20 transition-all flex justify-between items-center group cursor-pointer"
                    >
                      <div>
                        <span 
                          className="block text-white mb-0.5 group-hover:text-amber-400 transition-colors"
                          style={{ fontFamily: preset.fontFamily, fontWeight: preset.fontWeight }}
                        >
                          {preset.name}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">
                          {preset.fontWeight} // {preset.fontSize}px
                        </span>
                      </div>
                      <Plus className="w-4 h-4 text-neutral-600 group-hover:text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'elements' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1.5">Digital Elements</h3>
                  <p className="text-neutral-500 text-[11px]">Add premium neon stickers or abstract geometry to overlay across layouts.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {STICKER_PRESETS.map((sticker) => (
                    <button
                      key={sticker.id}
                      onClick={() => handleAddSticker(sticker)}
                      className="aspect-square rounded-lg bg-neutral-950 border border-neutral-800 p-3 hover:border-amber-500/20 transition-all flex flex-col justify-between items-center group cursor-pointer"
                    >
                      <div className="w-14 h-14 overflow-hidden rounded flex items-center justify-center">
                        <img 
                          src={sticker.image} 
                          alt={sticker.name} 
                          className="max-w-full max-h-full object-contain filter group-hover:brightness-110" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 group-hover:text-neutral-300">
                        {sticker.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'uploads' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1.5">Backdrop Asset</h3>
                  <p className="text-neutral-500 text-[11px]">Paste any high-resolution image URL or select from our stock collection.</p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Paste direct image URL..."
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-white focus:border-amber-500/40"
                  />
                  <button
                    onClick={() => handleApplyBackgroundUrl(customImageUrl)}
                    className="w-full py-2 bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-semibold rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Apply Background
                  </button>
                </div>

                {/* Ambient curated options */}
                <div className="pt-4">
                  <span className="text-[10px] font-mono text-neutral-500 block mb-2 uppercase">Curated Editorial Scenes</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Luxury Living', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvcTCFfLXsEr493aBRD-zESJRwQqX_xkEm4ZCVYQ5IJjpiqcb-DVbBnAo-DoQWhWSPejgEItceXK2rVuTZUshzF58UBA-xSzEiP6bzq1EIOFZQElX7hb0DLU3rOkIHCHyCSpfpBCoDXjQNjINjbcpMBo7rEEVDXKYRGPjXJ6pJPyTLKqya_w2ye-Q0J7BmKUlT_CotyJMbpAgC2HfZKDGBOQwiCRCrU7A_IF3yL2_paPuCsJWUZWVmNg' },
                      { name: 'Golden Trails', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuaW4UcWsw_d6Oo9QpkHq36U12GiWMKdxJtTlYz6oo6I-j6xo6VxxGIFvxvMowcVSMtPoQHl72uv9aXAlrPnvochQrgQInu1UmYMdg4SUGWB88wMl_b-TsYVhw7mwzPHjIk9_aY4745tCCYbwhjRpmHtiuQ9IafxNfbXEFuvhPrMbRQSZMjMUwXfnPJwXV8Swgju-rsdfXpQ1ATCLO4b_pLql2MwqXrQjlrcTYoiFeAybQQ8W095-coQ' },
                      { name: 'Grid Cyber', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTED_yqkxvXvvpNef6rqr8-Aa1YAmSPniLFor2RgwRldcu9l96iUaxrvRmTZd11zfEUB_-YWm0lCJPIVFBLCenYu4R7Znnl_FSFkC_OgSUppSRBR3YmmTe7vBsyJM9FyT9QAbGAwXlHZ7K0-IiFdeqQWYJonu-9jrd8y3TWKgQulfDQcJ2bfHs3T93Jw7N4Du89NclYuYUQCjC_nL_hG7p8rLLzyyoInm-JV8O7F_q9m5KZ-T7icDMJw' },
                      { name: 'Rainy Night', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl432cCgeYH3ee7ZGoqFdYrFlBtSgzQY1pY0lXcdnEl0RGHgpj45UbyqAhn6tTb3r8Ud_8C9zaYPSYIrnJUKQ9nPe0ppHRUliidUx2BUtE2YK3yxxbvKGbzBT7nwLUQCFgLcaxV2kQo-YnB4D_6OVnLKVxys-XodKnzF54cHoKqAYwkdoLqUiDqOrX-EQvO1XOhW2OHvgEwEjdqX11dg3dt3qHtn7H3PG5jo9owb26bCqmqEt0T7eEQQ' }
                    ].map((item) => (
                      <button
                        key={item.url}
                        onClick={() => handleApplyBackgroundUrl(item.url)}
                        className="relative group aspect-video rounded overflow-hidden bg-neutral-950 border border-neutral-900 cursor-pointer text-left"
                      >
                        <img 
                          src={item.url} 
                          alt={item.name} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-neutral-300 bg-neutral-950/80 px-1 py-0.5 rounded">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'magic' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] tracking-wider uppercase mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> PRECISE_AI_ENGINE_V1
                  </div>
                  <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1.5">AI Background Remover</h3>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">
                    Uses high-fidelity semantic networks to isolate product chairs, laptops, or custom visual subjects from your backdrops in seconds.
                  </p>
                </div>

                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3">
                    <Sparkle className="w-6 h-6 animate-pulse" />
                  </div>
                  
                  <span className="text-xs font-semibold text-white mb-1.5">Isolate Active Slide Subject</span>
                  <p className="text-[10px] text-neutral-500 max-w-[200px] mb-4">
                    Creates a transparent layer highlighting key visual subjects to stand out cleanly.
                  </p>

                  <button
                    onClick={handleSimulateBackgroundRemover}
                    disabled={isProcessingBG}
                    className={`w-full py-2.5 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isProcessingBG
                        ? 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                        : activeSlide.bgRemoved
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                        : 'bg-amber-500 text-black hover:bg-amber-400'
                    }`}
                  >
                    {isProcessingBG ? (
                      <>Analyzing Pixels...</>
                    ) : activeSlide.bgRemoved ? (
                      <>Restore Original Background</>
                    ) : (
                      <>Isolate & Remove Background</>
                    )}
                  </button>
                </div>

                <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-3 text-[11px] text-amber-300 leading-normal">
                  <strong>PRO Tip:</strong> Background removal is ideal for creating layered spatial depth in minimalist cards.
                </div>
              </div>
            )}

          </div>

          {/* Tray list of layers inside the active slide */}
          <div className="p-4 border-t border-neutral-900 bg-neutral-950/40">
            <span className="text-[10px] font-mono text-neutral-500 block mb-2 uppercase">Active Page Layers</span>
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
              <button
                onClick={() => { setSelectedCoreType('title'); setSelectedElementId(null); }}
                className={`w-full text-left p-2 rounded text-xs flex justify-between items-center transition-colors cursor-pointer ${
                  selectedCoreType === 'title' ? 'bg-neutral-800 text-amber-400 font-medium' : 'bg-transparent text-neutral-400 hover:bg-neutral-900'
                }`}
              >
                <span className="flex items-center gap-1.5"><Type className="w-3.5 h-3.5" /> Headline Text</span>
                <span className="text-[9px] font-mono text-neutral-600">CORE</span>
              </button>
              
              <button
                onClick={() => { setSelectedCoreType('subtitle'); setSelectedElementId(null); }}
                className={`w-full text-left p-2 rounded text-xs flex justify-between items-center transition-colors cursor-pointer ${
                  selectedCoreType === 'subtitle' ? 'bg-neutral-800 text-amber-400 font-medium' : 'bg-transparent text-neutral-400 hover:bg-neutral-900'
                }`}
              >
                <span className="flex items-center gap-1.5"><Type className="w-3.5 h-3.5" /> Subtitle Description</span>
                <span className="text-[9px] font-mono text-neutral-600">CORE</span>
              </button>

              {activeSlide.elements.map((el) => (
                <div
                  key={el.id}
                  onClick={() => { setSelectedElementId(el.id); setSelectedCoreType(null); }}
                  className={`group w-full p-2 rounded text-xs flex justify-between items-center transition-colors cursor-pointer ${
                    selectedElementId === el.id ? 'bg-neutral-800 text-amber-400 font-medium' : 'bg-transparent text-neutral-400 hover:bg-neutral-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    {el.type === 'text' ? <Type className="w-3.5 h-3.5" /> : <Smile className="w-3.5 h-3.5" />}
                    <span className="truncate">{el.type === 'text' ? el.content : 'Custom Sticker'}</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteElement(el.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER STAGE: Canvas Workspace */}
        <div className={`flex-1 bg-[#0A0A0A] flex flex-col overflow-hidden relative ${mobileView === 'canvas' ? 'flex' : 'hidden lg:flex'}`}>
          
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 relative">
            
            {/* Grid Backdrop effect */}
            {gridEnabled && (
              <div className="absolute inset-0 canvas-grid opacity-40 pointer-events-none" />
            )}

            {/* Simulated processing scanline overlay */}
            {isProcessingBG && (
              <div className="absolute inset-0 bg-amber-500/5 flex items-center justify-center z-50 pointer-events-none overflow-hidden">
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-1 bg-amber-400 shadow-lg shadow-amber-400/50"
                />
                <span className="bg-[#121212] border border-amber-500/30 px-4 py-2 rounded text-xs font-mono text-amber-400 uppercase tracking-widest animate-pulse">
                  AI_ISOLATING_SUBJECT_CHAIR
                </span>
              </div>
            )}

            {/* Core Slide Container (Aspect Ratio 4/5 - Instagram Portrait style) */}
            <div 
              ref={slideContainerRef}
              className="relative overflow-hidden shadow-2xl transition-all duration-300 origin-center bg-black"
              style={{
                width: '380px',
                height: '475px', // 4:5 aspect ratio
                transform: `scale(${zoomLevel / 100})`,
                backgroundColor: activeSlide.bgColor,
                backgroundImage: (!activeSlide.bgRemoved && activeSlide.bgImage) ? `url(${activeSlide.bgImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Background gradient overlay if image exists */}
              {!activeSlide.bgRemoved && activeSlide.bgImage && (
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity" 
                  style={{ backgroundColor: `rgba(0,0,0,${1 - activeSlide.bgOpacity})` }}
                />
              )}

              {/* Simulation of AI Background Removed State (Show a gorgeous isolated checkerboard pattern with subject) */}
              {activeSlide.bgRemoved && (
                <div className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none">
                  {/* Subtle luxury off-white gradient checkerboard backdrop */}
                  <div className="absolute inset-0 canvas-grid-light opacity-25" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-neutral-950" />
                  
                  {/* The isolated chair subject centered cleanly with nice floating look */}
                  <motion.img 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src={activeSlide.bgRemovedImage}
                    alt="Isolated Chair Subject"
                    className="relative z-10 w-4/5 h-4/5 object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(255,184,0,0.15)] mb-12"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Safe area layout indicator */}
              <div className="absolute inset-4 border border-dashed border-neutral-800/60 pointer-events-none z-10 flex flex-col justify-between p-4">
                
                {/* Header branding row */}
                <div className="flex justify-between items-center relative z-20">
                  <span className="text-amber-400/90 font-mono text-[9px] tracking-widest uppercase">
                    CarouselPro Studio //
                  </span>
                  <span className="text-neutral-500 font-mono text-[9px]">
                    PAGE {activeSlide.slideNumber}
                  </span>
                </div>

                {/* Footer elements row */}
                <div className="flex justify-between items-end relative z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                    <span className="text-[8px] font-mono text-neutral-500 tracking-wider uppercase">
                      EDITORIAL_DESIGN_SYSTEM
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-neutral-600">
                    SWIPE TO DISCOVER
                  </span>
                </div>
              </div>

              {/* CORE DESIGN LAYERS - Interactive elements */}
              <div className="absolute inset-8 flex flex-col justify-center items-start z-20">
                
                {/* Core Title (Clickable & Editable) */}
                <div
                  onClick={(e) => { e.stopPropagation(); setSelectedCoreType('title'); setSelectedElementId(null); }}
                  className={`w-full text-left rounded p-1.5 mb-3 transition-all cursor-pointer select-none ${
                    selectedCoreType === 'title' ? 'ring-1 ring-amber-400 bg-neutral-900/30' : 'hover:bg-neutral-900/10'
                  }`}
                >
                  <h2 className="text-2xl sm:text-3.5xl font-extrabold text-white tracking-tight leading-[1.1] whitespace-pre-line font-sans">
                    {activeSlide.title}
                  </h2>
                </div>

                {/* Core Subtitle Description (Clickable & Editable) */}
                <div
                  onClick={(e) => { e.stopPropagation(); setSelectedCoreType('subtitle'); setSelectedElementId(null); }}
                  className={`w-full text-left rounded p-1.5 transition-all cursor-pointer select-none ${
                    selectedCoreType === 'subtitle' ? 'ring-1 ring-amber-400 bg-neutral-900/30' : 'hover:bg-neutral-900/10'
                  }`}
                >
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {activeSlide.subtitle}
                  </p>
                </div>

                {/* Draggable/Interactive Custom elements added */}
                {activeSlide.elements.map((el) => {
                  const isSelected = selectedElementId === el.id;
                  const isEditing = editingElementId === el.id;
                  const isCurrentlyDragging = dragState.current.isDragging && dragState.current.elementId === el.id;

                  // Start drag on mousedown
                  const handleDragStart = (clientX: number, clientY: number) => {
                    if (isEditing) return; // don't drag while editing
                    dragState.current.justDragged = false; // reset flag on new drag
                    const rect = slideContainerRef.current?.getBoundingClientRect();
                    if (rect) {
                      dragState.current.containerWidth = rect.width;
                      dragState.current.containerHeight = rect.height;
                    }
                    dragState.current.isDragging = true;
                    dragState.current.elementId = el.id;
                    dragState.current.startMouseX = clientX;
                    dragState.current.startMouseY = clientY;
                    dragState.current.startElX = el.x;
                    dragState.current.startElY = el.y;
                  };

                  return (
                    <div
                      key={el.id}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleDragStart(e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        const touch = e.touches[0];
                        handleDragStart(touch.clientX, touch.clientY);
                      }}
                      onClick={(e) => { 
                        e.stopPropagation();
                        // Skip click events that immediately follow a drag
                        if (dragState.current.justDragged) {
                          dragState.current.justDragged = false;
                          return;
                        }
                        // If already selected and it's a text element, enter edit mode
                        if (selectedElementId === el.id && el.type === 'text') {
                          setEditingElementId(el.id);
                        } else {
                          setSelectedElementId(el.id); 
                          setSelectedCoreType(null);
                          setEditingElementId(null);
                        }
                      }}
                      onDoubleClick={(e) => {
                        if (el.type === 'text') {
                          e.stopPropagation();
                          setEditingElementId(el.id);
                          setSelectedElementId(el.id);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        opacity: el.opacity !== undefined ? el.opacity : 1,
                        filter: el.blur ? `blur(${el.blur}px)` : 'none',
                        cursor: isEditing ? 'text' : isCurrentlyDragging ? 'grabbing' : 'grab',
                        touchAction: isEditing ? 'auto' : 'none',
                      }}
                      className={`rounded p-1 transition-colors z-30 select-none ${
                        isSelected && !isEditing ? 'ring-1 ring-amber-400 bg-neutral-900/30' : 'hover:bg-neutral-900/10'
                      } ${isCurrentlyDragging ? 'shadow-lg shadow-amber-500/10 scale-105' : ''}`}
                    >
                      {el.type === 'text' && isEditing ? (
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            updateActiveElement(el.id, { content: e.currentTarget.textContent || '' });
                            setEditingElementId(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              e.currentTarget.blur();
                            }
                            if (e.key === 'Escape') {
                              e.currentTarget.blur();
                            }
                          }}
                          style={{ 
                            fontSize: `${el.fontSize || 14}px`, 
                            color: el.color || '#FFFFFF',
                            fontWeight: el.fontWeight || 'normal',
                            outline: 'none',
                          }}
                          className="font-mono block whitespace-nowrap ring-1 ring-amber-400 rounded px-1 bg-neutral-900/40 min-w-[20px]"
                          dangerouslySetInnerHTML={{ __html: el.content }}
                        />
                      ) : el.type === 'text' ? (
                        <span 
                          style={{ 
                            fontSize: `${el.fontSize || 14}px`, 
                            color: el.color || '#FFFFFF',
                            fontWeight: el.fontWeight || 'normal'
                          }}
                          className="font-mono block whitespace-nowrap"
                        >
                          {el.content}
                        </span>
                      ) : (
                        <div style={{ width: `${el.fontSize || 100}px` }} className="pointer-events-none">
                          <img 
                            src={el.content} 
                            alt="Sticker asset" 
                            className="w-full object-contain" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>

            </div>

          </div>

          {/* BOTTOM TIMELINE SLIDES TRAY: Carousel Sequencer */}
          <div className="bg-[#121212] border-t border-neutral-900 p-4 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">Slide Sequence Flow</span>
                {!isProUser && (
                  <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono">
                    Free Tier: 3 Slides Max
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={handleAddSlide}
                  className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-mono text-amber-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Page
                </button>
                <button
                  onClick={handleDuplicateSlide}
                  className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Layers className="w-3 h-3" /> Duplicate
                </button>
              </div>
            </div>

            {/* Horizontal Miniature list of slides */}
            <div className="flex gap-3 overflow-x-auto pb-1.5 pt-0.5">
              {slides.map((slide, idx) => {
                const isActive = idx === activeSlideIndex;
                return (
                  <div
                    key={slide.id}
                    onClick={() => { setActiveSlideIndex(idx); setSelectedElementId(null); setSelectedCoreType('title'); }}
                    className={`relative w-28 aspect-[4/5] rounded overflow-hidden bg-neutral-950 border shrink-0 cursor-pointer transition-all ${
                      isActive ? 'ring-2 ring-amber-500 border-transparent scale-[1.02]' : 'border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    {/* Tiny visual representation of the slide background */}
                    {slide.bgImage && !slide.bgRemoved ? (
                      <img 
                        src={slide.bgImage} 
                        alt={`Slide ${slide.slideNumber}`} 
                        className="w-full h-full object-cover opacity-40" 
                        referrerPolicy="no-referrer"
                      />
                    ) : slide.bgRemoved ? (
                      <div className="w-full h-full flex items-end justify-center bg-neutral-900">
                        <img 
                          src={slide.bgRemovedImage} 
                          alt="isolated subject" 
                          className="w-4/5 h-4/5 object-contain object-bottom opacity-50" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full" style={{ backgroundColor: slide.bgColor }} />
                    )}

                    {/* Miniature text hints */}
                    <div className="absolute inset-1.5 flex flex-col justify-between pointer-events-none p-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[7px] font-mono text-amber-400 bg-black/70 px-1 py-0.5 rounded">
                          {slide.slideNumber}
                        </span>
                        {slides.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSlide(idx);
                            }}
                            className="p-0.5 bg-neutral-950 hover:bg-red-500 hover:text-white rounded text-neutral-400 transition-colors pointer-events-auto"
                            title="Delete slide"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>

                      <div className="max-w-full">
                        <p className="text-[6px] text-white font-extrabold truncate uppercase mb-0.5">
                          {slide.title || 'Untitled'}
                        </p>
                        <p className="text-[5px] text-neutral-400 truncate">
                          {slide.subtitle || 'No description'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!isProUser && (
                <div 
                  onClick={onUpgrade}
                  className="relative w-28 aspect-[4/5] rounded overflow-hidden bg-neutral-950/40 border border-dashed border-neutral-800 hover:border-amber-500/40 shrink-0 cursor-pointer transition-all flex flex-col items-center justify-center p-2 text-center group"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-all">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-[9px] font-bold text-neutral-400 group-hover:text-amber-400 transition-colors">Upgrade to Pro</span>
                  <span className="text-[7.5px] text-neutral-500 leading-tight mt-1">Free version only shows 3 slides</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR: Layer Properties Editor */}
        <div className={`w-full lg:w-[300px] bg-[#121212] border-l border-neutral-900/80 flex-col overflow-y-auto p-5 space-y-6 shrink-0 ${mobileView === 'properties' ? 'flex flex-1' : 'hidden lg:flex'}`}>
          <div>
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1.5">Properties Manager</h3>
            <p className="text-neutral-500 text-[11px]">Refine alignment, typography parameters, colors, and opacity layers.</p>
          </div>

          {/* Edit properties of core title or description */}
          {selectedCoreType && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  ACTIVE_TYPOGRAPHY: {selectedCoreType}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[9px] font-mono text-amber-400 uppercase">
                  CORE_LAYER
                </span>
              </div>

              {/* Core Text Input Area */}
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400">Layer Text Content</label>
                <textarea
                  rows={3}
                  value={selectedCoreType === 'title' ? activeSlide.title : activeSlide.subtitle}
                  onChange={(e) => {
                    if (selectedCoreType === 'title') {
                      updateActiveSlide({ title: e.target.value });
                    } else {
                      updateActiveSlide({ subtitle: e.target.value });
                    }
                  }}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white focus:border-amber-500/50"
                />
              </div>

              {/* Preconfigured Font Sizes */}
              <div className="space-y-2">
                <label className="text-xs text-neutral-400">Quick Palette Color</label>
                <div className="flex gap-1.5">
                  {['#FFFFFF', '#FFB800', '#FFDCA1', '#E5E2E1', '#A3A3A3'].map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        if (selectedCoreType === 'title') {
                          // Standard visual color for preview, since title uses native styling
                        }
                      }}
                      className="w-5 h-5 rounded border border-neutral-800 cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Edit properties of standard added Elements (added text/stickers) */}
          {selectedElement && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  LAYER_TYPE: {selectedElement.type}
                </span>
                <button
                  onClick={() => handleDeleteElement(selectedElement.id)}
                  className="p-1 hover:bg-neutral-900 rounded text-red-400 transition-colors cursor-pointer"
                  title="Remove Layer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Text Element Edit Area */}
              {selectedElement.type === 'text' && (
                <div className="space-y-1.5">
                  <label className="text-xs text-neutral-400">Content</label>
                  <textarea
                    rows={2}
                    value={selectedElement.content}
                    onChange={(e) => updateActiveElement(selectedElement.id, { content: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white"
                  />
                </div>
              )}

              {/* Position controls */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono text-neutral-500 block uppercase">Manual Positioning</span>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>X Position (Horizontal)</span>
                    <span className="font-mono text-amber-400">{selectedElement.x}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedElement.x}
                    onChange={(e) => updateActiveElement(selectedElement.id, { x: parseInt(e.target.value) })}
                    className="w-full accent-amber-500 bg-neutral-950 h-1 rounded"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Y Position (Vertical)</span>
                    <span className="font-mono text-amber-400">{selectedElement.y}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedElement.y}
                    onChange={(e) => updateActiveElement(selectedElement.id, { y: parseInt(e.target.value) })}
                    className="w-full accent-amber-500 bg-neutral-950 h-1 rounded"
                  />
                </div>
              </div>

              {/* Size & Scale controls */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Scale / Font Size</span>
                  <span className="font-mono text-amber-400">{selectedElement.fontSize || 14}px</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={selectedElement.fontSize || 14}
                  onChange={(e) => updateActiveElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 bg-neutral-950 h-1 rounded"
                />
              </div>

              {/* Opacity slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Layer Opacity</span>
                  <span className="font-mono text-amber-400">
                    {Math.round((selectedElement.opacity !== undefined ? selectedElement.opacity : 1) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round((selectedElement.opacity !== undefined ? selectedElement.opacity : 1) * 100)}
                  onChange={(e) => updateActiveElement(selectedElement.id, { opacity: parseFloat(e.target.value) / 100 })}
                  className="w-full accent-amber-500 bg-neutral-950 h-1 rounded"
                />
              </div>

              {/* Blur slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Gaussian Blur</span>
                  <span className="font-mono text-amber-400">{selectedElement.blur || 0}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={selectedElement.blur || 0}
                  onChange={(e) => updateActiveElement(selectedElement.id, { blur: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 bg-neutral-950 h-1 rounded"
                />
              </div>
            </div>
          )}

          {/* Active Page global controls (Slide properties) */}
          <div className="pt-4 border-t border-neutral-900 space-y-4">
            <span className="text-[10px] font-mono text-neutral-500 block uppercase">Page Settings</span>
            
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-400">Background Color</label>
              <div className="flex gap-1.5">
                {['#000000', '#0A0A0A', '#121212', '#1E1B18', '#0F172A'].map((color) => (
                  <button
                    key={color}
                    onClick={() => updateActiveSlide({ bgColor: color })}
                    className={`w-6 h-6 rounded border cursor-pointer ${
                      activeSlide.bgColor === color ? 'border-amber-400 ring-1 ring-amber-400' : 'border-neutral-800'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Backdrop Intensity</span>
                <span className="font-mono text-amber-400">{Math.round(activeSlide.bgOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(activeSlide.bgOpacity * 100)}
                onChange={(e) => updateActiveSlide({ bgOpacity: parseFloat(e.target.value) / 100 })}
                className="w-full accent-amber-500 bg-neutral-950 h-1 rounded"
              />
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
