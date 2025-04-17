
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Image, Box, Upload, Save, Loader2 } from "lucide-react";
import { Product } from "@/types";
import { createProduct, uploadFile } from "@/services/appwrite";

interface ProductFormProps {
  selectedCategory: string;
  onAddProduct: (product: Omit<Product, "id">) => void;
}

const ProductForm = ({ selectedCategory, onAddProduct }: ProductFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [modelUrl, setModelUrl] = useState("");
  const [features, setFeatures] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }
    
    const newProduct: Omit<Product, "id"> = {
      name: name.trim(),
      category: selectedCategory as 'living' | 'dining' | 'bedroom',
      price: parseFloat(price) || 0,
      description: description.trim(),
      features: features.split('\n').filter(f => f.trim() !== ""),
      images: [imageUrl],
      modelViewerSrc: modelUrl || undefined,
      iosArSrc: modelUrl ? `${modelUrl.split(".").slice(0, -1).join(".")}.usdz` : undefined,
      inStock: true
    };
    
    setIsLoading(true);
    try {
      await createProduct(newProduct);
      onAddProduct(newProduct);
      
      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setModelUrl("");
      setFeatures("");
      
      toast.success(`Added new product: ${name}`);
    } catch (error) {
      toast.error("Failed to save product. Please try again.");
      console.error("Error saving product:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsLoading(true);
        try {
          const result = await uploadFile(file);
          setImageUrl(result.url);
          toast.success(`Image uploaded: ${file.name}`);
        } catch (error) {
          toast.error("Failed to upload image");
          console.error("Error uploading image:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fileInput.click();
  };
  
  const handleModelUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.glb,.gltf';
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsLoading(true);
        try {
          const result = await uploadFile(file);
          setModelUrl(result.url);
          toast.success(`3D model uploaded: ${file.name}`);
        } catch (error) {
          toast.error("Failed to upload 3D model");
          console.error("Error uploading 3D model:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fileInput.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Product to {selectedCategory}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="product-price">Price ($)</Label>
            <Input
              id="product-price"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="product-features">Features (one per line)</Label>
            <Textarea
              id="product-features"
              placeholder="Enter features, one per line"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="product-image">Image URL</Label>
            <div className="flex space-x-2">
              <Input
                id="product-image"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="button" variant="outline" size="icon" title="Upload Image" onClick={handleImageUpload} disabled={isLoading}>
                <Image className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="product-model">3D Model URL (GLB format)</Label>
            <div className="flex space-x-2">
              <Input
                id="product-model"
                placeholder="Enter 3D model URL (.glb)"
                value={modelUrl}
                onChange={(e) => setModelUrl(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="button" variant="outline" size="icon" title="Upload 3D Model" onClick={handleModelUpload} disabled={isLoading}>
                <Box className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Product
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
