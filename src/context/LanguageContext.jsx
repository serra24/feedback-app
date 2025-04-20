import { createContext, useState, useEffect } from "react";
import en from "../assets/locales/en.json";
import ar from "../assets/locales/ar.json";

// Create Context
export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const storedLang = localStorage.getItem("nwazilang") || "en";
  const [language, setLanguage] = useState(storedLang);
  const [translations, setTranslations] = useState(storedLang === "ar" ? ar : en);

  useEffect(() => {
    localStorage.setItem("nwazilang", language);
    setTranslations(language === "ar" ? ar : en);

    // Update the direction of the document
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("nwazilang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;