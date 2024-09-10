import React from "react";
import Card from "./Card";
import { CardGridProps, Document } from "../types";

const CardGrid: React.FC<CardGridProps> = ({
  documents,
  onReorder,
  onSelectImage,
}) => {
  // Handle the drag start event.
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ): void => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  // Handle drag over to allow dropping.
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  // Handle the drop event to reorder the documents.
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ): void => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const newDocuments = [...documents];
    const [removed] = newDocuments.splice(sourceIndex, 1);
    newDocuments.splice(targetIndex, 0, removed);
    onReorder(newDocuments);
  };

  return (
    <div className="grid">
      {documents.map((doc, index) => (
        <Card
          key={doc.type}
          document={doc}
          index={index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onSelectImage={onSelectImage}
        />
      ))}
    </div>
  );
};

export default CardGrid;
