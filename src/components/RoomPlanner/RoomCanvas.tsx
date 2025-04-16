import { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { RoomFurnitureItem } from "@/pages/RoomPlannerPage";
import FurnitureObject from "./FurnitureObject";
import { Move, RotateCw, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RoomCanvasProps {
  items: RoomFurnitureItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
  onUpdateItem: (id: string, updates: Partial<RoomFurnitureItem>) => void;
  onRemoveItem: (id: string) => void;
}

const ROOM_WIDTH = 800;
const ROOM_HEIGHT = 600;
const SCALE_FACTOR = 0.1;

const RoomCanvas = ({
  items,
  selectedItemId,
  onSelectItem,
  onUpdateItem,
  onRemoveItem,
}: RoomCanvasProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "furniture",
    drop: (item, monitor) => ({ name: "RoomCanvas" }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  
  const [scale, setScale] = useState(1);
  const [controlMode, setControlMode] = useState<"move" | "rotate">("move");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleBackgroundClick = () => {
    onSelectItem(null);
  };
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + SCALE_FACTOR, 2));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - SCALE_FACTOR, 0.5));
  };
  
  const handleRotationModeToggle = () => {
    setControlMode(prev => prev === "move" ? "rotate" : "move");
    toast.info(`Mode switched to ${controlMode === "move" ? "rotation" : "movement"}`);
  };
  
  const handleDeleteSelected = () => {
    if (selectedItemId) {
      onRemoveItem(selectedItemId);
    }
  };
  
  const isActive = canDrop && isOver;
  
  return (
    <div className="relative p-4">
      <div className="flex space-x-2 mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant={controlMode === "move" ? "default" : "outline"}
          size="sm"
          onClick={handleRotationModeToggle}
          className={controlMode === "move" ? "bg-furniture-brown hover:bg-furniture-gray" : ""}
        >
          {controlMode === "move" ? <Move className="h-4 w-4 mr-1" /> : <RotateCw className="h-4 w-4 mr-1" />}
          {controlMode === "move" ? "Move" : "Rotate"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteSelected}
          disabled={!selectedItemId}
          className={!selectedItemId ? "opacity-50 cursor-not-allowed" : "text-red-500 hover:bg-red-50"}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </div>
      
      <div 
        ref={drop}
        className={`relative bg-gray-100 border-2 transition-colors duration-200 ${
          isActive ? "border-furniture-brown bg-furniture-tan/10" : isOver ? "border-furniture-brown" : "border-gray-200"
        } rounded-lg overflow-hidden`}
        style={{ 
          width: `${ROOM_WIDTH}px`, 
          height: `${ROOM_HEIGHT}px`,
          maxWidth: '100%',
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          margin: '0 auto'
        }}
        onClick={handleBackgroundClick}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-200 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-200 to-transparent"></div>
        
        {items.map((item) => (
          <FurnitureObject
            key={item.id}
            item={item}
            isSelected={item.id === selectedItemId}
            controlMode={controlMode}
            onSelect={() => onSelectItem(item.id)}
            onUpdate={(updates) => onUpdateItem(item.id, updates)}
          />
        ))}
        
        {isOver && !items.length && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-furniture-brown text-lg font-medium">Drop furniture here</p>
          </div>
        )}
        
        {isActive && (
          <div className="absolute inset-0 border-2 border-dashed border-furniture-brown bg-furniture-tan/10 pointer-events-none" />
        )}
      </div>
      
      <div className="text-center mt-2 text-sm text-gray-500">
        Scale: {Math.round(scale * 100)}%
      </div>
    </div>
  );
};

export default RoomCanvas;
