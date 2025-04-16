
import { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useIsMobile } from "@/hooks/use-mobile";
import FurniturePalette from "@/components/RoomPlanner/FurniturePalette";
import RoomCanvas from "@/components/RoomPlanner/RoomCanvas";
import { Button } from "@/components/ui/button";
import { Save, Share2, Undo, Redo, Eye } from "lucide-react";
import { toast } from "sonner";

// Type for furniture item in room
export interface RoomFurnitureItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
}

const RoomPlannerPage = () => {
  const isMobile = useIsMobile();
  const [roomItems, setRoomItems] = useState<RoomFurnitureItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const historyRef = useRef<RoomFurnitureItem[][]>([]);
  const historyIndexRef = useRef<number>(-1);
  
  // Generate unique ID for new items
  const generateId = () => `furniture-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Handle adding furniture to room
  const handleAddFurniture = (productId: string, name: string, image: string) => {
    const newItem: RoomFurnitureItem = {
      id: generateId(),
      productId,
      name,
      image,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      rotation: 0,
      zIndex: roomItems.length + 1
    };
    
    // Save current state to history
    saveToHistory();
    
    setRoomItems([...roomItems, newItem]);
    setSelectedItemId(newItem.id);
    toast.success(`Added ${name} to room`);
  };
  
  // Handle updating furniture position
  const handleUpdateFurniture = (id: string, updates: Partial<RoomFurnitureItem>) => {
    setRoomItems(items => 
      items.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };
  
  // Handle selecting furniture
  const handleSelectFurniture = (id: string | null) => {
    setSelectedItemId(id);
  };
  
  // Handle removing furniture
  const handleRemoveFurniture = (id: string) => {
    saveToHistory();
    setRoomItems(items => items.filter(item => item.id !== id));
    setSelectedItemId(null);
    toast.info("Item removed from room");
  };
  
  // Save current state to history
  const saveToHistory = () => {
    const newHistory = [...historyRef.current.slice(0, historyIndexRef.current + 1), [...roomItems]];
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
  };
  
  // Undo last action
  const handleUndo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      setRoomItems([...historyRef.current[historyIndexRef.current]]);
      toast.info("Undid last change");
    }
  };
  
  // Redo last undone action
  const handleRedo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      setRoomItems([...historyRef.current[historyIndexRef.current]]);
      toast.info("Redid last change");
    }
  };
  
  // Save room configuration
  const handleSave = () => {
    const roomData = {
      items: roomItems,
      savedAt: new Date().toISOString(),
    };
    
    localStorage.setItem('savedRoom', JSON.stringify(roomData));
    toast.success("Room configuration saved!");
  };
  
  // Share room configuration
  const handleShare = () => {
    // Placeholder for sharing functionality
    toast.info("Sharing functionality coming soon!");
  };
  
  // View in AR
  const handleViewInAR = () => {
    toast.info("AR View coming soon!");
    // In future we'll integrate with existing AR component
  };
  
  // Select backend based on device
  const dndBackend = isMobile ? TouchBackend : HTML5Backend;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Room Planner</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <DndProvider backend={dndBackend}>
          <div className="w-full md:w-3/4 order-2 md:order-1">
            <div className="bg-white border rounded-lg shadow-lg mb-4 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleUndo}
                  >
                    <Undo className="mr-1 h-4 w-4" /> Undo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRedo}
                  >
                    <Redo className="mr-1 h-4 w-4" /> Redo
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleViewInAR}
                    className="text-furniture-brown border-furniture-brown hover:bg-furniture-tan/20"
                  >
                    <Eye className="mr-1 h-4 w-4" /> View in AR
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSave}
                  >
                    <Save className="mr-1 h-4 w-4" /> Save
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-1 h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
              <RoomCanvas 
                items={roomItems}
                selectedItemId={selectedItemId}
                onSelectItem={handleSelectFurniture}
                onUpdateItem={handleUpdateFurniture}
                onRemoveItem={handleRemoveFurniture}
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/4 order-1 md:order-2">
            <FurniturePalette onAddFurniture={handleAddFurniture} />
          </div>
        </DndProvider>
      </div>
      
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif font-bold mb-4">How to Use the Room Planner</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Drag furniture items from the panel on the right into your virtual room</li>
          <li>Click on a furniture item to select it</li>
          <li>Resize by dragging the corners</li>
          <li>Rotate using the rotation handle</li>
          <li>Move items by dragging them</li>
          <li>Save your design to view later</li>
        </ul>
      </div>
    </div>
  );
};

export default RoomPlannerPage;
