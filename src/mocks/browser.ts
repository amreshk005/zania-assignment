import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

const LOCAL_STORAGE_KEY = "documents";

export const worker = setupWorker(
  // Mock GET request to fetch the documents
  http.get("/api/documents", () => {
    const storedDocuments = localStorage.getItem(LOCAL_STORAGE_KEY);
    const documents = storedDocuments ? JSON.parse(storedDocuments) : [];
    return HttpResponse.json(documents, { status: 200 });
  }),

  // Mock POST request to save the documents
  http.post("/api/documents", async ({ request }) => {
    const { documents } = (await request.json()) as { documents: Document[] };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documents));
    return HttpResponse.json(
      { message: "Documents saved successfully!" },
      { status: 200 }
    );
  })
);
