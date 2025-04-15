
import { Product } from '../types';

export const products: Product[] = [
  {
    id: "sofa-01",
    name: "Modern Comfort Sofa",
    category: "living",
    price: 1299.99,
    description: "Elevate your living room with this sleek modern sofa. Its clean lines and plush cushions offer both style and supreme comfort.",
    features: [
      "Stain-resistant fabric",
      "High-density foam cushions",
      "Solid wood frame",
      "Available in multiple colors"
    ],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
    ],
    modelViewerSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // Placeholder
    iosArSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.usdz",
    inStock: true,
    featured: true
  },
  {
    id: "coffee-table-01",
    name: "Oak Round Coffee Table",
    category: "living",
    price: 499.99,
    description: "This beautifully crafted oak coffee table adds warmth and elegance to any living space. The round shape creates a welcoming feel.",
    features: [
      "Solid oak construction",
      "Water-resistant finish",
      "Sturdy, stable design",
      "Easy assembly"
    ],
    images: [
      "https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      "https://images.unsplash.com/photo-1604074131665-7a4b13870ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    ],
    modelViewerSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // Placeholder
    iosArSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.usdz",
    inStock: true,
    featured: true
  },
  {
    id: "dining-table-01",
    name: "Extendable Dining Table",
    category: "dining",
    price: 899.99,
    description: "Perfect for both everyday use and entertaining, this extendable dining table adapts to your needs. Comfortably seats 4-8 people.",
    features: [
      "Extension leaf included",
      "Solid wood construction",
      "Smooth extension mechanism",
      "Scratch-resistant surface"
    ],
    images: [
      "/images/dining-table-1.jpg",
      "/images/dining-table-2.jpg"
    ],
    modelViewerSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // Placeholder
    iosArSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.usdz",
    inStock: true
  },
  {
    id: "dining-chair-01",
    name: "Modern Dining Chair",
    category: "dining",
    price: 199.99,
    description: "These comfortable and stylish dining chairs will complement any dining table. The ergonomic design ensures comfort during long meals.",
    features: [
      "High-density foam padding",
      "Stain-resistant fabric",
      "Solid wood legs",
      "Available in sets"
    ],
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1561677978-583a8c7a4b43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ],
    modelViewerSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // Placeholder
    iosArSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.usdz",
    inStock: true,
    featured: true
  },
  {
    id: "bed-frame-01",
    name: "King Size Platform Bed",
    category: "bedroom",
    price: 1099.99,
    description: "This minimalist platform bed creates a serene sleep environment. The low profile design and solid construction ensure a peaceful night's rest.",
    features: [
      "No box spring needed",
      "Solid wood frame",
      "Includes headboard",
      "Easy assembly"
    ],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    ],
    modelViewerSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // Placeholder
    iosArSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.usdz",
    inStock: true
  },
  {
    id: "nightstand-01",
    name: "Modern Nightstand",
    category: "bedroom",
    price: 349.99,
    description: "Complete your bedroom with this functional and stylish nightstand. The perfect height for your bed with ample storage.",
    features: [
      "Two spacious drawers",
      "Smooth drawer slides",
      "Cable management hole",
      "Matches our bed frames"
    ],
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1532372320572-cda25653a694?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    ],
    modelViewerSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // Placeholder
    iosArSrc: "https://modelviewer.dev/shared-assets/models/Astronaut.usdz",
    inStock: true,
    featured: true
  }
];

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}
