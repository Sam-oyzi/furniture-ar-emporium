
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/data/products";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-furniture-gray">
            Featured Pieces
          </h2>
          <Link
            to="/products"
            className="mt-4 md:mt-0 text-furniture-brown hover:text-furniture-tan transition-colors"
          >
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="border-furniture-brown text-furniture-brown hover:bg-furniture-brown/10"
          >
            <Link to="/products">Browse All Collections</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
