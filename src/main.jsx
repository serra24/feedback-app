import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter and routing components
import App from "./App.jsx"; // Import App component
import Home from "./pages/Home/Home"; // Assuming you have this component
import "./index.css";
import LanguageProvider from "./context/LanguageContext.jsx";
import RateServicePage from "./pages/RateServicePage/RateServicePage.jsx";
import RequestServicePage from "./pages/RequestServicePage/RequestServicePage.jsx";
import EvaluationPage from "./pages/EvaluationPage/EvaluationPage.jsx";

// Directly add routing logic here
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <Router>
        <Routes>
          {/* This will render App, and then inside it, Home will be rendered at the index path */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} /> 
            <Route path="/rate-service" element={<RateServicePage />} />
            <Route path="/request-service" element={<RequestServicePage />} />
            <Route path="/evaluation" element={<EvaluationPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  </StrictMode>
);
