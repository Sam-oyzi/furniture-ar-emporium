
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ARExperience from "@/components/ARExperience";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Hero />
      
      <FeaturedProducts />
      
      <ARExperience />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-furniture-offwhite rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-furniture-tan/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-furniture-brown">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">Premium Quality</h3>
              <p className="text-gray-600">Our furniture is crafted with the highest quality materials for lasting beauty and durability.</p>
            </div>
            
            <div className="p-8 bg-furniture-offwhite rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-furniture-tan/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-furniture-brown">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">5-Year Warranty</h3>
              <p className="text-gray-600">Every piece comes with our comprehensive 5-year warranty for your peace of mind.</p>
            </div>
            
            <div className="p-8 bg-furniture-offwhite rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-furniture-tan/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-furniture-brown">
                  <rect width="16" height="16" x="4" y="4" rx="2"></rect>
                  <rect width="4" height="4" x="10" y="10" rx="1"></rect>
                  <path d="M4 16h16"></path>
                  <path d="M4 12h4"></path>
                  <path d="M4 8h16"></path>
                  <path d="M16 4v16"></path>
                  <path d="M12 4v4"></path>
                  <path d="M8 4v16"></path>
                  <path d="M20 8v8"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">Free Shipping</h3>
              <p className="text-gray-600">Enjoy free shipping on all orders over $999 and easy delivery to your door.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-furniture-gray text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8">Ready to transform your space?</h2>
          <Button
            asChild
            className="bg-furniture-tan hover:bg-furniture-brown text-furniture-gray hover:text-white text-lg px-8 py-6"
          >
            <Link to="/products">
              Shop Our Collection
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
