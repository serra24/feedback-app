import React from 'react';
import Header from './components/Header/Header';
import { Box } from '@mui/material';
import logo from './assets/logos/logo.png'; 
import { LanguageContext } from './context/LanguageContext'; 
import { Outlet } from "react-router-dom"; 
import backgroundImage from './assets/backgrounds/background.jpg';
import homeIcon from './assets/icons/home.png';  
import aboutIcon from './assets/icons/about.png'; 

function App() {
  const { language, setLanguage, translations: t } = React.useContext(LanguageContext);
  const headerProps = {
    isRtl: language === 'ar',
    logoSrc: logo,
    language,
    setLanguage,
    t,
    homeIcon,
    aboutIcon
  };

  return (
   
      <Box
           sx={{
             position: "relative",
             minHeight: "100vh",
             backgroundImage: `url(${backgroundImage})`,
             backgroundSize: "cover",
             backgroundPosition: "center",
             "&::before": {
               content: '""',
               position: "absolute",
               inset: 0,
               backdropFilter: "blur(4px)",
               background:
                 "linear-gradient(180deg, #00395D 0%, rgba(0, 0, 0, 0.6) 100%)",
             },
           }}
         >
        {/* Reusable Header */}
        <Header {...headerProps} />
        <Outlet />
    
      </Box>

  );
}

export default App;
