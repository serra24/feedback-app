import React, { use } from "react";
import { Drawer, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomDrawer = ({
  drawerOpen,
  toggleDrawer,
  logo,
  homeIcon,
  aboutIcon,
  isRtl,
  t,
}) => {
  // Shared style for Link elements to avoid redundancy
  const linkStyles = {
    fontFamily: "Almarai, sans-serif",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "112%",
    letterSpacing: "2%",
    color: "#CFAE78",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    transition: "color 0.3s ease-in-out",
    "&:hover": {
      color: "#fff", // Hover effect to change color on hover
    },
  };
const navigate = useNavigate(); // Assuming you're using react-router-dom for navigation
  return (
    <Drawer
      anchor={isRtl ? "right" : "left"}
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#02395C",
          color: "white",
          width: "250px",
          //   padding: "20px",
          display: "flex",
          flexDirection: "column",
          //   gap: 4,

          //   boxSizing: "border-box", // Ensure padding doesn't affect width
        },
      }}
    >
      {/* Logo Section with Border Bottom */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          borderBottom: "2px solid #CFAE78", // Add bottom border
          paddingBottom: "16px", // Add padding to give space between logo and border
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ maxWidth: "120px", height: "auto" }}
        />
      </Box>
      {/* Drawer Content */}
      <Box sx={{ display: "flex", flexDirection: "column", px: 2, gap: 3 }}>
        {/* Navigation Links */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Home Link */}
          <Link
            component="button" // Using a button-style link
            onClick={() => navigate("/")}
            underline="none"
            color="white"
            sx={linkStyles}
            aria-label={t.navigation.home}
          >
            <img
              src={homeIcon}
              alt="Home"
              style={{
                marginRight: isRtl ? "0" : "8px",
                marginLeft: isRtl ? "8px" : "0",
                // width: "24px",
                height: "auto",
              }}
            />
            {t.navigation.home}
          </Link>

          {/* About Link */}
          <Link
            component="button" // Using a button-style link
            onClick={() => navigate("/about-us")}
            underline="none"
            color="white"
            sx={linkStyles}
            aria-label={t.navigation.about}
          >
            <img
              src={aboutIcon}
              alt="About"
              style={{
                marginRight: isRtl ? "0" : "8px",
                marginLeft: isRtl ? "8px" : "0",
                // width: "24px",
                height: "auto",
              }}
            />
            {t.navigation.about}
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
