import React, { useContext, useState } from "react";
// import backgroundImage from "../../assets/backgrounds/background.jpg";
import Header from "../../components/Header/Header";

import { Box, Typography, Drawer, IconButton } from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";
import Card from "../../components/Card/Card";
import star from "../../assets/icons/star.png";
import notification from "../../assets/icons/notification.png";
import arrowIcon from "../../assets/icons/arrowIcon.png";
import MenuIcon from "@mui/icons-material/Menu"; // Material-UI Menu icon
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector"; // Assuming you have this component
import { Link } from "react-router-dom";


const Home = () => {
  const {  translations: t } = useContext(LanguageContext);
  return (
    <Box
      sx={{
        // position: "relative",
        minHeight: "100vh",
        // backgroundImage: `url(${backgroundImage})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // "&::before": {
        //   content: '""',
        //   position: "absolute",
        //   inset: 0,
        //   backdropFilter: "blur(4px)",
        //   background:
        //     "linear-gradient(180deg, #00395D 0%, rgba(0, 0, 0, 0.6) 100%)",
        // },
      }}
    >
     

     

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "calc(100vh - 64px)", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          px: 2,
          '@media (max-width: 600px)': {
            height: "auto", // Allow for auto height on small screens
            padding: "20px", // Adjust padding if needed
          },
        }}
      >
        {/* Main Text */}
        <Typography
          sx={{
            fontFamily: "Almarai, sans-serif",
            fontWeight: 700,
            fontSize: "30px",
            // lineHeight: "100%",
            letterSpacing: "0%",
            // textAlign: "right",
            mb: 3,
          }}
        >
          {t.home.mainHeading}
        </Typography>

        <Typography
          sx={{
            fontFamily: "Almarai, sans-serif",
            fontWeight: 400,
            fontSize: "24px",
            // lineHeight: "100%",
            letterSpacing: "0%",
            // textAlign: "right",
            mb: 7.5,
          }}
        >
         {"\""}{t.home.subHeading}{"\""}
        </Typography>

        {/* Cards */}
        <Box sx={{ display: "flex", gap: 3, p: 3, flexDirection: { xs: "column", sm: "column", md: "row" } }}>
  <Card
    topTitle={t.home.cards.rateService.topTitle}
    title={t.home.cards.rateService.topTitle}
    description={t.home.cards.rateService.description}
    bgColor={["var(--primary-bg-color)", "var(--secondary-bg-color)"]}
    iconColor="var(--gold-color-2)"
    iconSize="50px"
    imageSrc={star}
    arrowIcon={arrowIcon}
    navigateTo="/rate-service"  // Specify the route to navigate to
  />

  <Card
    topTitle={t.home.cards.requestService.topTitle}
    title={t.home.cards.requestService.topTitle}
    description={t.home.cards.requestService.description}
    bgColor={["var(--primary-bg-color)", "var(--secondary-bg-color)"]}
    iconColor="var(--gold-color-2)"
    iconSize="50px"
    imageSrc={notification}
    arrowIcon={arrowIcon}
    navigateTo="/request-service"  // Specify the route to navigate to
  />
</Box>

      </Box>
    </Box>
  );
};

export default Home;
