import React, { useState } from "react";
import { CardProps } from "../types";

const Card: React.FC<CardProps> = ({
  document,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  onSelectImage,
}) => {
  const [loading, setLoading] = useState(true);

  // Hide the spinner once the image has finished loading.
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      onClick={() => onSelectImage(`/images/${document.type}.jpeg`)}
    >
      {loading && <div className="spinner">Loading...</div>}
      <img
        src={`/images/${document.type}.jpeg`}
        alt={document.title}
        className="thumbnail"
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
      />
      <h3>{document.title}</h3>
    </div>
  );
};

export default Card;
