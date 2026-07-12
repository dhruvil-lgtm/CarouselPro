export interface CarouselElement {
  id: string;
  type: 'sticker' | 'text' | 'shape';
  content: string; // text string, sticker URL, or shape name
  x: number;       // position percentage (0-100)
  y: number;       // position percentage (0-100)
  fontSize?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  fontWeight?: string;
  fontFamily?: string;
}

export interface CarouselSlide {
  id: string;
  slideNumber: string; // e.g. "01", "02"
  title: string;
  subtitle: string;
  bgImage: string;
  bgColor: string;
  bgOpacity: number;
  bgRemoved: boolean;
  bgRemovedImage?: string; // transparent isolated image
  elements: CarouselElement[];
  titleFontFamily?: string;
  titleColor?: string;
  titleSize?: number;
  subtitleFontFamily?: string;
  subtitleColor?: string;
  subtitleSize?: number;
}

export interface CarouselTemplate {
  id: string;
  name: string;
  slidesCount: number;
  views: string;
  isPro: boolean;
  coverImage: string;
  aesthetic: 'Aesthetic' | 'Bold' | 'Minimal' | 'Gradient' | 'Corporate';
  slides: CarouselSlide[];
}

export interface TextPreset {
  id: string;
  name: string;
  fontSize: number;
  fontWeight: string;
  letterSpacing: string;
  fontFamily: string;
}

export interface StickerPreset {
  id: string;
  name: string;
  image: string;
}
