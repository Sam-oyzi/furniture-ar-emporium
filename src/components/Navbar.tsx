
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const cart = useCart();
  const cartItemCount = cart.getCartItemCount();

  // Handle navbar background change on scroll
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium hover:text-furniture-brown">
                  Home
                </Link>
                <Link to="/products" className="text-lg font-medium hover:text-furniture-brown">
                  Products
                </Link>
                <Link to="/products?category=living" className="text-lg font-medium hover:text-furniture-brown">
                  Living Room
                </Link>
                <Link to="/products?category=dining" className="text-lg font-medium hover:text-furniture-brown">
                  Dining Room
                </Link>
                <Link to="/products?category=bedroom" className="text-lg font-medium hover:text-furniture-brown">
                  Bedroom
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="text-xl md:text-2xl font-serif font-bold text-furniture-brown">
            FurnitureAR
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-furniture-brown transition-colors">
            Home
          </Link>
          <Link to="/products" className="font-medium hover:text-furniture-brown transition-colors">
            All Products
          </Link>
          <Link to="/products?category=living" className="font-medium hover:text-furniture-brown transition-colors">
            Living Room
          </Link>
          <Link to="/products?category=dining" className="font-medium hover:text-furniture-brown transition-colors">
            Dining Room
          </Link>
          <Link to="/products?category=bedroom" className="font-medium hover:text-furniture-brown transition-colors">
            Bedroom
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="w-5 h-5" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-furniture-brown text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
