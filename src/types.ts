export interface Document {
  type: string;
  title: string;
  position: number;
}

export interface CardProps {
  document: Document;
  index: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onSelectImage: (imageUrl: string) => void;
}

export interface CardGridProps {
  documents: Document[];
  onReorder: (newDocuments: Document[]) => void;
  onSelectImage: (imageUrl: string) => void;
}

export interface ImageOverlayProps {
  imageUrl: string;
  onClose: () => void;
}
