
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ARExperience = () => {
  return (
    <section className="py-16 bg-furniture-tan/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Person using AR to view furniture"
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div className="flex flex-col space-y-6">
            <span className="text-furniture-brown font-medium">AR EXPERIENCE</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-furniture-gray">
              Try Before You Buy with Augmented Reality
            </h2>
            <p className="text-lg text-gray-600">
              Our augmented reality feature allows you to see exactly how our furniture will look in your space before making a purchase. Simply use your device's camera to place 3D models of our products in your home.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 mt-1 bg-furniture-tan rounded-full p-1">
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Works on most modern devices</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 bg-furniture-tan rounded-full p-1">
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Accurate measurements and scaling</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 bg-furniture-tan rounded-full p-1">
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Special support for iOS devices with Quick Look</span>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-furniture-brown hover:bg-furniture-gray text-white w-fit group"
              >
                <Link to="/products">
                  Try AR Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="border-furniture-brown text-furniture-brown hover:bg-furniture-tan/20 w-fit group"
              >
                <Link to="/room-planner">
                  Design Your Room <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARExperience;
