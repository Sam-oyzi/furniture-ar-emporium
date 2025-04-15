
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-furniture-gray text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">FurnitureAR</h3>
            <p className="text-sm text-gray-300 mb-4">
              Experience furniture in your space with our cutting-edge AR technology
              before you buy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">All Furniture</Link>
              </li>
              <li>
                <Link to="/products?category=living" className="text-gray-300 hover:text-white transition-colors">Living Room</Link>
              </li>
              <li>
                <Link to="/products?category=dining" className="text-gray-300 hover:text-white transition-colors">Dining Room</Link>
              </li>
              <li>
                <Link to="/products?category=bedroom" className="text-gray-300 hover:text-white transition-colors">Bedroom</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Warranty</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Newsletter</h4>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to get special offers and AR furniture updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-furniture-gray border border-gray-600 rounded-l-md focus:outline-none focus:border-furniture-tan w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-furniture-tan text-furniture-gray font-medium rounded-r-md hover:bg-furniture-brown transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>© 2025 FurnitureAR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
