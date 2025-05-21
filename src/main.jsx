import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter and routing components
import App from "./App.jsx"; // Import App component
import Home from "./pages/Home/Home"; 
import "./index.css";
import LanguageProvider from "./context/LanguageContext.jsx";
import RateServicePage from "./pages/RateServicePage/RateServicePage.jsx";
import RequestServicePage from "./pages/RequestServicePage/RequestServicePage.jsx";
import EvaluationPage from "./pages/EvaluationPage/EvaluationPage.jsx";
import MaintenanceServicePage from "./pages/MaintenanceServicePage/MaintenanceServicePage.jsx";
import RoomServicePage from "./pages/RoomServicePage/RoomServicePage.jsx";
import LuggageServicePage from "./pages/LuggageServicePage/LuggageServicePage.jsx";
import GuestServicePage from "./pages/GuestServicePage/GuestServicePage.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CleaningServicePage from "./pages/RoomServicePage/CleaningServicePage.jsx";
import ResourcesServicePage from "./pages/RoomServicePage/ResourcesServicePage.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import QRCodeGenerator from "./components/QRCodeGenerator/QRCodeGenerator.jsx";
import { Provider } from 'react-redux';
import {store,persistor } from './redux/store';
import { PersistGate } from "redux-persist/integration/react"; // PersistGate for delay loading


// Directly add routing logic here
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

    <LanguageProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Routes>
            {/* This will render App, and then inside it, Home will be rendered at the index path */}
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/about-us" element={<AboutUs/>} />
              <Route path="/rate-service" element={<RateServicePage />} />
              {/* <Route path="/rate-service" element={<EvaluationPage />} /> */}
              <Route path="/request-service" element={<RequestServicePage />} />
              <Route path="/evaluation" element={<EvaluationPage />} />
              <Route path="/guest-service" element={<GuestServicePage />} />
              <Route path="/scan" element={<QRCodeGenerator />} />
              <Route
                path="/maintenance-service"
                element={<MaintenanceServicePage />}
              />
              <Route path="/room-service" element={<RoomServicePage />} />
              <Route
                path="/cleaning-service"
                element={<CleaningServicePage />}
              />
              <Route
                path="/resources-service"
                element={<ResourcesServicePage />}
              />
              <Route path="/luggage-service" element={<LuggageServicePage />} />
              <Route path="*" element={<NotFound />} />
          
            </Route>
          </Routes>
        </Router>
      </LocalizationProvider>
    </LanguageProvider>
    </PersistGate>
    </Provider>
  </StrictMode>
);
