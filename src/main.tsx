import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import DocumentProvider from "./context/DocumentProvider.tsx";
import ModalProvider from "./context/ModalProvider.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DocumentProvider>
      <ModalProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ModalProvider>
    </DocumentProvider>
  </StrictMode>
);
