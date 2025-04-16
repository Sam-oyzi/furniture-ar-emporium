
import { useRef, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { RoomFurnitureItem } from "@/pages/RoomPlannerPage";
import { RotateCw } from "lucide-react";

interface FurnitureObjectProps {
  item: RoomFurnitureItem;
  isSelected: boolean;
  controlMode: "move" | "rotate";
  onSelect: () => void;
  onUpdate: (updates: Partial<RoomFurnitureItem>) => void;
}

const FurnitureObject = ({
  item,
  isSelected,
  controlMode,
  onSelect,
  onUpdate,
}: FurnitureObjectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startAngle, setStartAngle] = useState(0);
  
  const [{ opacity }, drag] = useDrag(() => ({
    type: "furnitureMove",
    item: { id: item.id, type: "furnitureMove" },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));
  
  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [drag]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        if (controlMode === "move") {
          // Handle move
          const dx = e.clientX - startPos.x;
          const dy = e.clientY - startPos.y;
          
          onUpdate({
            x: item.x + dx,
            y: item.y + dy,
          });
          
          setStartPos({ x: e.clientX, y: e.clientY });
        } else {
          // Handle rotate
          const rect = ref.current?.getBoundingClientRect();
          if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate angle between center of element and mouse position
            const angle = Math.atan2(
              e.clientY - centerY,
              e.clientX - centerX
            ) * 180 / Math.PI;
            
            // Apply rotation (and adjust by startAngle to make it relative)
            onUpdate({
              rotation: angle - startAngle,
            });
          }
        }
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPos, startAngle, item, onUpdate, controlMode]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    
    if (controlMode === "rotate") {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate current angle as reference point
        const currentAngle = Math.atan2(
          e.clientY - centerY,
          e.clientX - centerX
        ) * 180 / Math.PI;
        
        // Store the difference between current angle and item's rotation
        setStartAngle(currentAngle - item.rotation);
      }
    }
  };
  
  // Handle resize
  const handleResizeMouseDown = (e: React.MouseEvent, corner: string) => {
    e.stopPropagation();
    onSelect();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = item.width;
    const startHeight = item.height;
    
    const handleResizeMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = item.x;
      let newY = item.y;
      
      // Calculate aspect ratio for proportional resizing
      const aspectRatio = startWidth / startHeight;
      
      if (corner === "bottomRight") {
        newWidth = Math.max(30, startWidth + dx);
        newHeight = Math.max(30, startHeight + dy);
      } else if (corner === "bottomLeft") {
        newWidth = Math.max(30, startWidth - dx);
        newX = item.x + dx;
        newHeight = Math.max(30, startHeight + dy);
      } else if (corner === "topRight") {
        newWidth = Math.max(30, startWidth + dx);
        newHeight = Math.max(30, startHeight - dy);
        newY = item.y + dy;
      } else if (corner === "topLeft") {
        newWidth = Math.max(30, startWidth - dx);
        newHeight = Math.max(30, startHeight - dy);
        newX = item.x + dx;
        newY = item.y + dy;
      }
      
      onUpdate({
        width: newWidth,
        height: newHeight,
        x: newX,
        y: newY,
      });
    };
    
    const handleResizeMouseUp = () => {
      document.removeEventListener('mousemove', handleResizeMouseMove);
      document.removeEventListener('mouseup', handleResizeMouseUp);
    };
    
    document.addEventListener('mousemove', handleResizeMouseMove);
    document.addEventListener('mouseup', handleResizeMouseUp);
  };
  
  return (
    <div
      ref={ref}
      className={`absolute cursor-move ${isSelected ? 'z-10' : ''}`}
      style={{
        left: `${item.x}px`,
        top: `${item.y}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
        transform: `rotate(${item.rotation}deg)`,
        zIndex: item.zIndex,
        opacity,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Furniture item */}
      <div
        className={`w-full h-full bg-white overflow-hidden ${
          isSelected ? 'ring-2 ring-furniture-brown' : ''
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
      
      {/* Selection controls */}
      {isSelected && (
        <>
          {/* Resize handles */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-furniture-brown rounded-full cursor-nwse-resize -translate-x-1/2 -translate-y-1/2"
            onMouseDown={(e) => handleResizeMouseDown(e, "topLeft")}
          />
          <div className="absolute top-0 right-0 w-4 h-4 bg-furniture-brown rounded-full cursor-nesw-resize translate-x-1/2 -translate-y-1/2"
            onMouseDown={(e) => handleResizeMouseDown(e, "topRight")}
          />
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-furniture-brown rounded-full cursor-nesw-resize -translate-x-1/2 translate-y-1/2"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottomLeft")}
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-furniture-brown rounded-full cursor-nwse-resize translate-x-1/2 translate-y-1/2"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottomRight")}
          />
          
          {/* Rotation indicator */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className={`flex items-center justify-center ${controlMode === "rotate" ? "text-furniture-brown" : "text-gray-400"}`}>
              <RotateCw className="h-4 w-4 mr-1" />
              <span className="text-xs">{Math.round(item.rotation)}°</span>
            </div>
          </div>
          
          {/* Item name */}
          <div className="absolute -bottom-6 left-0 right-0 text-center">
            <span className="text-xs bg-white px-1 rounded">{item.name}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default FurnitureObject;
