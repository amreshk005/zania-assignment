import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import documentsData from "./data.json";
import CardGrid from "./components/CardGrid";
import ImageOverlay from "./components/ImageOverlay";
import { Document } from "./types";
import Spinner from "./components/Spinner";

const LOCAL_STORAGE_KEY = "documents";

const App: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const lastSaveTimeRef = useRef<number | null>(null);

  // Load documents from localStorage or static data when the component mounts.
  useEffect(() => {
    const storedDocuments = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedDocuments) {
      setDocuments(JSON.parse(storedDocuments));
    } else {
      setDocuments(documentsData);
    }
  }, []);

  // Handle reordering of the cards and update localStorage.
  const handleReorder = (newDocuments: Document[]): void => {
    setDocuments(newDocuments);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDocuments));
  };

  // Handle selecting an image for overlay display.
  const handleSelectImage = (imageUrl: string): void => {
    setSelectedImage(imageUrl);
  };

  // Close the image overlay.
  const handleCloseOverlay = (): void => {
    setSelectedImage(null);
  };

  // Save documents to the mock API.
  const saveDocuments = async () => {
    setIsSaving(true);
    await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documents }),
    });
    setIsSaving(false);
    lastSaveTimeRef.current = Date.now();
  };

  // Automatically save documents every 5 seconds if changes are made.
  useEffect(() => {
    const intervalId = setInterval(() => {
      saveDocuments();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [documents]);

  return (
    <div className="app">
      <CardGrid
        documents={documents}
        onReorder={handleReorder}
        onSelectImage={handleSelectImage}
      />
      {isSaving && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      {selectedImage && (
        <ImageOverlay imageUrl={selectedImage} onClose={handleCloseOverlay} />
      )}
    </div>
  );
};

export default App;
