
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
        
        {isOver && (
          <div className="absolute inset-0 border-2 border-dashed border-furniture-brown bg-furniture-tan/10 pointer-events-none flex items-center justify-center">
            <div className="bg-white p-3 rounded-lg shadow-lg">
              <p className="text-furniture-brown text-lg font-medium">Drop furniture here</p>
            </div>
          </div>
        )}
        
        {!items.length && !isOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <p className="text-gray-500 font-medium mb-2">Your room is empty</p>
            <p className="text-gray-400 text-sm">Drag furniture items from the palette on the right<br/>or click the + button to add them here</p>
          </div>
        )}
      </div>
      
      <div className="text-center mt-2 text-sm text-gray-500">
        Scale: {Math.round(scale * 100)}%
      </div>
      
      <div className="mt-4 p-3 bg-furniture-tan/20 border border-furniture-brown/20 rounded text-sm">
        <p className="font-medium mb-1">Editing Instructions:</p>
        <ul className="list-disc pl-4 text-xs space-y-1">
          <li>Click on an item to select it</li> 
          <li>Use the <strong>Move/Rotate</strong> toggle to switch between movement and rotation modes</li>
          <li>Drag the blue dots to resize the selected furniture</li>
        </ul>
      </div>
    </div>
  );
};

export default RoomCanvas;
