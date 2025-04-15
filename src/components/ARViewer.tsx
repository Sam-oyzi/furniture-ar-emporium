
import { useEffect, useState } from "react";

interface ARViewerProps {
  modelSrc: string;
  iosSrc: string;
  alt: string;
  poster?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const ARViewer = ({ modelSrc, iosSrc, alt, poster }: ARViewerProps) => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
  }, []);

  return (
    <div className="ar-viewer-container w-full h-full min-h-[400px]">
      <model-viewer
        src={modelSrc}
        ios-src={iosSrc}
        alt={alt}
        ar
        ar-modes="webxr scene-viewer quick-look"
        environment-image="neutral"
        auto-rotate
        camera-controls
        poster={poster}
        shadow-intensity="1"
        style={{width: '100%', height: '100%', minHeight: '400px'}}
      >
        <button slot="ar-button" className="ar-button">
          View in your space
        </button>
      </model-viewer>
      
      {isIOS && (
        <div className="mt-4">
          <a
            href={iosSrc}
            rel="ar"
            className="inline-flex items-center px-4 py-2 bg-furniture-brown text-white rounded-md hover:bg-furniture-gray transition-colors"
          >
            <img 
              className="w-5 h-5 mr-2" 
              src="https://developer.apple.com/design/human-interface-guidelines/technologies/augmented-reality/images/ar-glyph.svg"
              alt="AR Quick Look"  
            />
            View in AR (iOS Quick Look)
          </a>
        </div>
      )}
    </div>
  );
};

export default ARViewer;
