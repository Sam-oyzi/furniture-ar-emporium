
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import AuthForm from "./AuthForm";
import CategoryManager from "./CategoryManager";
import ProductForm from "./ProductForm";
import { Product } from "@/types";
import { getProductsByCategory, products } from "@/data/products";

const EditMenu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>(['living', 'dining', 'bedroom']);
  const [selectedCategory, setSelectedCategory] = useState<string>("living");
  
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };
  
  const handleAddCategory = (category: string) => {
    setCategories([...categories, category.toLowerCase()]);
    setSelectedCategory(category.toLowerCase());
  };
  
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleAddProduct = (product: Omit<Product, "id">) => {
    // In a real application, this would update the database
    // For now, we'll just log it to the console
    console.log("Adding new product:", product);
    
    // Here we would normally update our data store
    // Since we can't modify the products.ts file directly, we'll just simulate it
    const newProduct = {
      ...product,
      id: `${product.category}-${Date.now()}`,
    };
    
    // In a real app, this would be persisted
    console.log("New product added:", newProduct);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Admin Control Panel</DialogTitle>
        </DialogHeader>
        
        {!isAuthenticated ? (
          <AuthForm onAuthenticated={handleAuthentication} />
        ) : (
          <Tabs defaultValue="categories">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="mt-4">
              <CategoryManager 
                categories={categories}
                onAddCategory={handleAddCategory}
                onSelectCategory={handleSelectCategory}
              />
            </TabsContent>
            
            <TabsContent value="products" className="mt-4">
              <ProductForm 
                selectedCategory={selectedCategory}
                onAddProduct={handleAddProduct}
              />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
