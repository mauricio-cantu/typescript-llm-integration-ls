import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QuizContextProvider } from "./contexts/QuizContextProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <div className="min-h-screen max-w-4xl m-auto grid place-items-center">
    <StrictMode>
      <QuizContextProvider>
        <App />
      </QuizContextProvider>
    </StrictMode>
  </div>
);
