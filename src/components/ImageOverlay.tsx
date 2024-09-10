import React, { useEffect } from "react";
import { ImageOverlayProps } from "../types";

const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageUrl, onClose }) => {
  
  // Close the overlay when the ESC key is pressed.
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <img src={imageUrl} alt="Selected document" className="overlay-image" />
    </div>
  );
};

export default ImageOverlay;
