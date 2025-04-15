
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <Link to={`/products/${product.id}`} className="aspect-square overflow-hidden">
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col space-y-2 p-4">
        <h3 className="font-serif text-lg font-medium line-clamp-1">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description.substring(0, 100)}...
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-serif text-xl font-medium text-furniture-brown">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-8 w-8 border-furniture-tan text-furniture-brown hover:bg-furniture-tan/20"
            >
              <Link to={`/products/${product.id}`}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">View product</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-furniture-tan text-furniture-brown hover:bg-furniture-tan/20"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
