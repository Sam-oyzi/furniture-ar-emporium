
import { useState, useEffect } from "react";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PanelLeft, Edit, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "./EditMenu/AuthForm";
import CategoryManager from "./EditMenu/CategoryManager";
import ProductForm from "./EditMenu/ProductForm";
import { Product } from "@/types";
import { getProducts, getProductsByCategory, createProduct, getCurrentUser } from "@/services/appwrite";

const EditSidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>(['living', 'dining', 'bedroom']);
  const [selectedCategory, setSelectedCategory] = useState<string>("living");
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setIsAuthenticated(true);
        loadProducts();
      } else {
        setIsLoading(false);
      }
    };
    
    if (isOpen) {
      checkUser();
    }
  }, [isOpen]);
  
  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const allProducts = await getProducts();
      setProducts(allProducts);
      
      // Extract unique categories from products
      const productCategories = [...new Set(allProducts.map(p => p.category))];
      if (productCategories.length > 0) {
        setCategories([...new Set([...categories, ...productCategories])]);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAuthentication = () => {
    setIsAuthenticated(true);
    loadProducts();
  };
  
  const handleAddCategory = (category: string) => {
    setCategories([...categories, category.toLowerCase()]);
    setSelectedCategory(category.toLowerCase());
  };
  
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleAddProduct = async (product: Omit<Product, "id">) => {
    try {
      await createProduct(product);
      loadProducts(); // Reload products after adding a new one
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar side="left" variant="floating" collapsible="icon">
          <SidebarContent className="flex flex-col items-center justify-center">
            <Button 
              onClick={() => setIsOpen(true)}
              variant="ghost" 
              className="flex items-center gap-2 w-full justify-start px-2"
            >
              <Edit className="h-5 w-5" />
              <span>Edit Mode</span>
            </Button>
          </SidebarContent>
        </Sidebar>
        
        {/* Fixed position edit button for mobile */}
        <Button 
          onClick={() => setIsOpen(true)} 
          className="fixed left-4 bottom-4 z-50 rounded-full w-12 h-12 p-0 md:hidden"
        >
          <Edit className="h-5 w-5" />
        </Button>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Admin Control Panel</DialogTitle>
            </DialogHeader>
            
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
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
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
};

export default EditSidebar;
