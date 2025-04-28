import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";
import { motion } from "framer-motion"; // Importing motion from framer-motion
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Card = ({
  topTitle,
  title,
  description,
  bgColor,
  iconColor,
  iconSize,
  imageSrc,
  arrowIcon,
  navigateTo, // Add navigateTo prop for dynamic routing
}) => {
  const { language } = useContext(LanguageContext);
  const isRtl = language === "ar";
  const navigate = useNavigate(); // Initialize navigate hook

  // Handle card click to navigate to a different page
  const handleClick = () => {
    navigate(navigateTo); // Navigate to the page passed via navigateTo prop
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3 },
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          background: `linear-gradient(180deg, ${bgColor[0]} 0%, ${bgColor[1]} 100%)`,
          borderRadius: 2,
          p: 3,
          width: {
            xs: "auto",
            sm: "auto",
            md: "auto",
            lg: "400px",
            xl: "400px",
          },
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* Top Title */}
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "18px", sm: "20px", md: "24px" },
              color: "#fff",
            }}
          >
            {topTitle}
          </Typography>

          {/* Circular Icon with Image */}
          {/* <Box
            sx={{
              width: iconSize,
              height: iconSize,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0px 4px 4px 0px #0000001C",
              background: iconColor,
              flexShrink: 0,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            {imageSrc && <img src={imageSrc} alt="icon" />}
          </Box>
        </Box> */}
          <Box
            sx={{
              width: {
                xs: "40px", // Smaller on mobile
                sm: "45px",
                md: iconSize, // Use passed iconSize from md and up
              },
              height: {
                xs: "40px",
                sm: "45px",
                md: iconSize,
              },
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0px 4px 4px 0px #0000001C",
              background: iconColor,
              flexShrink: 0,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            {imageSrc && (
              <Box
                component="img"
                src={imageSrc}
                alt="icon"
                sx={{
                  width: {
                    xs: "20px", // Adjust image size on small screens
                    sm: "24px",
                    md: "auto", // Default size on larger screens
                  },
                  height: "auto",
                }}
              />
            )}
          </Box>
        </Box>
        {/* Description */}
        <Typography
          sx={{
            fontFamily: "Almarai, sans-serif",
            fontWeight: 300,
            fontSize: { xs: "14px", sm: "16px", md: "18px" },
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {description}
        </Typography>

        {/* Title at bottom */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            // p: 1,
          }}
          onClick={handleClick}
        >
          <Typography
            sx={{
              fontFamily: "Almarai, sans-serif",
              fontWeight: 700,
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              lineHeight: "100%",
              color: "#CFAE78",
              textAlign: "right",
            }}
          >
            {title}
          </Typography>

          <Box
            component="img"
            src={arrowIcon}
            sx={{
              transform: isRtl ? "rotate(0deg)" : "rotate(180deg)",
              marginLeft: isRtl ? "0" : "12px",
              marginRight: isRtl ? "12px" : "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "4px",
            }}
            alt="icon"
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Card;
