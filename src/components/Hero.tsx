
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-furniture-offwhite">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-furniture-gray">
              See Furniture in Your Space Before You Buy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Experience our furniture in your home with augmented reality. 
              Transform your space with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="bg-furniture-brown hover:bg-furniture-gray text-white text-lg px-8 py-6"
              >
                <Link to="/products">
                  Shop Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-furniture-tan text-furniture-brown hover:bg-furniture-tan/20 text-lg px-8 py-6"
              >
                <Link to="/products?featured=true">
                  View Featured
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MTx8c2VhcmNofDR8fGxpdmluZyUyMHJvb218ZW58MHx8fHwxNjgzNzIzNTUwfDA&auto=format&fit=crop&w=800&q=80"
              alt="Modern living room furniture" 
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg">
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-serif">Visualize with AR</p>
                <p className="text-white/80">See exactly how it fits in your space</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
