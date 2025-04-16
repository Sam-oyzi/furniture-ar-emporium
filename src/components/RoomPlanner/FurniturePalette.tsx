
import { useState } from "react";
import { useDrag } from "react-dnd";
import { getProductsByCategory, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { GripHorizontal, MoveIcon } from "lucide-react";

interface FurnitureItemProps {
  productId: string;
  name: string;
  image: string;
  onAddFurniture: (productId: string, name: string, image: string) => void;
}

const FurnitureItem = ({ productId, name, image, onAddFurniture }: FurnitureItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "furniture",
    item: { type: "furniture", productId, name, image },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onAddFurniture(productId, name, image);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  return (
    <div
      ref={drag}
      className={`relative cursor-move bg-white border rounded-md overflow-hidden group 
        ${isDragging ? "opacity-50 scale-105 shadow-lg" : "opacity-100"}
        hover:shadow-md transition-all duration-200`}
    >
      <div className="absolute top-0 left-0 right-0 bg-furniture-brown/80 text-white text-xs py-1 px-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <GripHorizontal className="h-3 w-3 mr-1" /> Drag to room
      </div>
      
      <div className="aspect-square w-full mt-2">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="p-2 flex items-center justify-between">
        <span className="text-sm truncate" title={name}>{name}</span>
        <GripHorizontal className="h-4 w-4 text-gray-400 group-hover:text-furniture-brown transition-colors" />
      </div>
      
      <button 
        className="absolute bottom-2 right-2 bg-furniture-brown hover:bg-furniture-gray text-white p-1.5 rounded-full flex items-center justify-center shadow
                   opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onAddFurniture(productId, name, image)}
        title="Click to add or drag to position"
      >
        +
      </button>
    </div>
  );
};

interface FurniturePaletteProps {
  onAddFurniture: (productId: string, name: string, image: string) => void;
}

const FurniturePalette = ({ onAddFurniture }: FurniturePaletteProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  const handleFilter = (newCategory: string | null) => {
    setActiveCategory(newCategory);
    if (newCategory) {
      setFilteredProducts(getProductsByCategory(newCategory));
    } else {
      setFilteredProducts(products);
    }
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="font-medium text-lg">Furniture Palette</h2>
        <p className="text-sm text-gray-500 mb-2">Drag items to your room</p>
        <div className="bg-furniture-tan/20 border border-furniture-brown/20 rounded p-2 text-xs">
          <strong>Tip:</strong> Drag an item to position it precisely, or click the + button to add it to the center of the room.
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            onClick={() => handleFilter(null)}
            size="sm"
            className={activeCategory === null ? "bg-furniture-brown hover:bg-furniture-gray" : ""}
          >
            All
          </Button>
          <Button
            variant={activeCategory === "living" ? "default" : "outline"}
            onClick={() => handleFilter("living")}
            size="sm"
            className={activeCategory === "living" ? "bg-furniture-brown hover:bg-furniture-gray" : ""}
          >
            Living
          </Button>
          <Button
            variant={activeCategory === "dining" ? "default" : "outline"}
            onClick={() => handleFilter("dining")}
            size="sm"
            className={activeCategory === "dining" ? "bg-furniture-brown hover:bg-furniture-gray" : ""}
          >
            Dining
          </Button>
          <Button
            variant={activeCategory === "bedroom" ? "default" : "outline"}
            onClick={() => handleFilter("bedroom")}
            size="sm"
            className={activeCategory === "bedroom" ? "bg-furniture-brown hover:bg-furniture-gray" : ""}
          >
            Bedroom
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredProducts.map((product) => (
            <FurnitureItem
              key={product.id}
              productId={product.id}
              name={product.name}
              image={product.images[0]}
              onAddFurniture={onAddFurniture}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FurniturePalette;
