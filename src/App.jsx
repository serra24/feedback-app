import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import { Box } from '@mui/material';
import logo from './assets/logos/logo.png'; 
import { LanguageContext } from './context/LanguageContext'; 
import { Outlet } from "react-router-dom"; 
import backgroundImage from './assets/backgrounds/background.jpg';
import homeIcon from './assets/icons/home.svg';  
import aboutIcon from './assets/icons/about.svg'; 
import Loader from './components/Loader/Loader';

function App() {
  const { language, setLanguage, translations: t } = React.useContext(LanguageContext);
  const [loading, setLoading] = useState(true);  // State to control the loader visibility

  useEffect(() => {
    // Simulating loading for 2 seconds (you can replace this with real data fetching logic)
    const timer = setTimeout(() => {
      setLoading(false);  // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);  // Cleanup timer on component unmount
  }, []);

  const headerProps = {
    isRtl: language === 'ar',
    logoSrc: logo,
    language,
    setLanguage,
    t,
    homeIcon,
    aboutIcon
  };

if (loading) {
    return <Loader />; 
  }


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
