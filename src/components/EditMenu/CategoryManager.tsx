
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface CategoryManagerProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onSelectCategory: (category: string) => void;
}

const CategoryManager = ({ categories, onAddCategory, onSelectCategory }: CategoryManagerProps) => {
  const [newCategory, setNewCategory] = useState("");
  
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    if (categories.includes(newCategory.toLowerCase().trim())) {
      toast.error("Category already exists");
      return;
    }
    
    onAddCategory(newCategory.trim());
    setNewCategory("");
    toast.success(`Added new category: ${newCategory}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Label htmlFor="new-category">New Category</Label>
              <Input
                id="new-category"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleAddCategory} 
              className="mt-6"
              size="sm"
            >
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label>Existing Categories</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button 
                  key={category} 
                  variant="outline" 
                  onClick={() => onSelectCategory(category)}
                  className="justify-start text-left"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryManager;
