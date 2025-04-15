
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import ARViewer from "@/components/ARViewer";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showAR, setShowAR] = useState(false);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/products">Back to Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
            {showAR ? (
              <ARViewer
                modelSrc={product.modelViewerSrc || ""}
                iosSrc={product.iosArSrc || ""}
                alt={product.name}
                poster={product.images[activeImage]}
              />
            ) : (
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
          
          <div className="flex justify-between gap-4 mb-4">
            {product.images.map((image, index) => (
              <button 
                key={index}
                className={`relative aspect-square w-24 rounded-md overflow-hidden ${
                  activeImage === index ? "ring-2 ring-furniture-brown" : ""
                }`}
                onClick={() => {
                  setActiveImage(index);
                  setShowAR(false);
                }}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
            
            {product.modelViewerSrc && (
              <button 
                className={`relative aspect-square w-24 rounded-md overflow-hidden bg-furniture-tan/20 flex items-center justify-center ${
                  showAR ? "ring-2 ring-furniture-brown" : ""
                }`}
                onClick={() => setShowAR(true)}
              >
                <span className="text-furniture-brown text-xs font-medium">View in 3D</span>
              </button>
            )}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-serif font-medium text-furniture-brown mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="prose prose-gray mb-6">
            <p>{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-3">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1 text-furniture-brown">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="py-4 border-y border-gray-200 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <div>
                <span className="text-gray-500">
                  {product.inStock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button
              className="flex-1 bg-furniture-brown hover:bg-furniture-gray text-white py-6"
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            
            {(product.modelViewerSrc || product.iosArSrc) && (
              <Button
                variant="outline"
                className="flex-1 border-furniture-tan text-furniture-brown hover:bg-furniture-tan/20 py-6"
                onClick={() => setShowAR(true)}
              >
                View in Your Space
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
