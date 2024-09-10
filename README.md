
This project is a frontend for managing a set of documents. It allows users to view documents as cards, drag and drop them to reorder, and save the updated order via a mock API using Mock Service Worker (MSW). It also includes an image overlay for viewing larger document thumbnails and persistence using `localStorage`.

## Features

- **Static JSON Data**: Loads document information from a static `data.json` file.
- **Drag and Drop**: Reorder the documents using drag-and-drop functionality.
- **Thumbnails and Overlay**: Each document has a thumbnail, and clicking on it opens an image overlay.
- **Loading Spinner**: A spinner is displayed while the document images are being loaded.
- **Data Persistence**: The document order is saved to `localStorage`, and changes are saved to a mock API.
- **Mock API (MSW)**: Uses Mock Service Worker to simulate API calls for fetching and saving documents.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/document-manager.git
2. Install the node modules:

   ```bash
   npm install
2. Start the server:

   ```bash
   npm start
