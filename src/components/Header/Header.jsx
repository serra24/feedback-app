import React, { useState } from "react";
import { Box, AppBar, Toolbar, Link, IconButton, Drawer } from "@mui/material";
import { RiCloseLargeLine } from "react-icons/ri"; // Import Close Icon
import { HiMenuAlt2 } from "react-icons/hi"; // Import Menu Icon
import { motion } from "framer-motion"; // Importing motion from framer-motion
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import CustomDrawer from "./CustomDrawer";

const Header = ({
  logoSrc,
  language,
  setLanguage,
  t,
  homeIcon,
  aboutIcon,
  isRtl,
}) => {
  const navigate = useNavigate();
  // Handler for logo click (logs message and redirects to home)
  const handleLogoClick = () => {
    navigate("/"); // Redirect to the home page
  };
  // State for handling the drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for menu open/close

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    setIsMenuOpen(!isMenuOpen); // Toggle menu state on drawer open/close
  };

  return (
    <AppBar
      position="relative"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 0, sm: 0, md: 6.2},
          py: {md:3,xs:1},
        }}
      >
        {/* Drawer for Small Screens */}
        <CustomDrawer
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          logo={logo}
          homeIcon={homeIcon}
          aboutIcon={aboutIcon}
          isRtl={isRtl}
          t={t}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: "50px" }}>
          {/* Logo with animation */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <motion.img
              src={logoSrc}
              alt="Logo"
              style={{ cursor: "pointer" }}
              onClick={handleLogoClick} // Handle logo click
              whileHover={{ scale: 1.1 }} // Hover animation to scale up the logo
              transition={{ duration: 0.3 }} 
               className="responsive-logo"
            />
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3, ml: "auto" }}>
            <motion.div
              whileHover={{
                scale: 1.05, // Slight scaling effect on hover
                color: "#FFD700", // Change text color on hover
                transition: { duration: 0.3 }, // Duration of the hover effect
              }}
            >
             <Link
                component="button" // Using a button-style link
                onClick={() => navigate("/")}
                underline="none"
                sx={{
                  fontFamily: "Almarai, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "112%",
                  letterSpacing: "2%",
                  color: "#CFAE78",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={homeIcon}
                  alt="Home"
                  style={{
                    marginRight: isRtl ? "0" : "8px",
                    marginLeft: isRtl ? "8px" : "0",
                  }}
                />
                {t.navigation.home}
              </Link>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05, // Slight scaling effect on hover
                color: "#FFD700", // Change text color on hover
                transition: { duration: 0.3 }, // Duration of the hover effect
              }}
            >
              <Link
                component="button" // Using a button-style link
                onClick={() => navigate("/about-us")}
                underline="none"
                sx={{
                  fontFamily: "Almarai, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "112%",
                  letterSpacing: "2%",
                  color: "#CFAE78",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={aboutIcon}
                  alt="About"
                  style={{
                    marginRight: isRtl ? "0" : "8px",
                    marginLeft: isRtl ? "8px" : "0",
                  }}
                />
                {t.navigation.about}
              </Link>
            </motion.div>
          </Box>
        </Box>
        <Box sx={{ display: "flex",gap: "10px" }}>
          {/* Language Selector */}
          <LanguageSelector language={language} setLanguage={setLanguage} />
          {/* Menu Icon for Small Screens */}
          <IconButton
            sx={{
              display: { xs: "block", sm: "none" },
            }}
            onClick={toggleDrawer}
            className={isMenuOpen ? "active" : ""}
          >
            <motion.div
              animate={{
                rotate: isMenuOpen ? 180 : 0, // Rotate 180 degrees when the menu is open
              }}
              transition={{ duration: 0.3 }} // Duration of the rotation animation
            >
              {isMenuOpen ? (
                <RiCloseLargeLine
                  style={{ fontSize: "24px", color: "var(--gold-color)" }}
                />
              ) : (
                <HiMenuAlt2
                  style={{ fontSize: "24px", color: "var(--gold-color)" }}
                />
              )}
            </motion.div>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
