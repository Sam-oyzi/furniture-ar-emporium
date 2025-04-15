
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState<string | null>(category);
  
  useEffect(() => {
    if (category) {
      setActiveCategory(category);
      setFilteredProducts(getProductsByCategory(category));
    } else {
      setActiveCategory(null);
      setFilteredProducts(products);
    }
  }, [category]);
  
  const handleFilter = (newCategory: string | null) => {
    setActiveCategory(newCategory);
    if (newCategory) {
      setFilteredProducts(getProductsByCategory(newCategory));
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
        {activeCategory 
          ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Room Furniture`
          : "All Furniture"}
      </h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          onClick={() => handleFilter(null)}
          className={activeCategory === null ? "bg-furniture-brown hover:bg-furniture-gray" : ""}
        >
          All
        </Button>
        <Button
          variant={activeCategory === "living" ? "default" : "outline"}
          onClick={() => handleFilter("living")}
          className={activeCategory === "living" ? "bg-furniture-brown hover:bg-furniture-gray" : ""}
        >
          Living Room
        </Button>
        <Button
          variant={activeCategory === "dining" ? "default" : "outline"}
          onClick={() => handleFilter("dining")}
          className={activeCategory === "dining" ? "bg-furniture-brown hover:bg-furniture-gray" : ""}
        >
          Dining Room
        </Button>
        <Button
          variant={activeCategory === "bedroom" ? "default" : "outline"}
          onClick={() => handleFilter("bedroom")}
          className={activeCategory === "bedroom" ? "bg-furniture-brown hover:bg-furniture-gray" : ""}
        >
          Bedroom
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-2">No products found</h2>
          <p className="text-gray-500">Try changing your filters or check back later for new items.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
