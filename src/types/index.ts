
export interface Product {
  id: string;
  name: string;
  category: 'living' | 'dining' | 'bedroom';
  price: number;
  description: string;
  features: string[];
  images: string[];
  modelViewerSrc?: string; // For 3D model-viewer
  iosArSrc?: string; // For iOS Quick Look AR
  inStock: boolean;
  featured?: boolean;
}
