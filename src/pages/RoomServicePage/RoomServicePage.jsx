import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";

// Sample images (you can replace these with actual image imports or URLs)
import cleaning from "../../assets/icons/cleaning.svg"; // Example image
import resources from "../../assets/icons/resources.svg"; // Example image
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import AnimatedHeader from "../../components/AnimatedHeader/AnimatedHeader";

const RoomServicePage = () => {
  const { translations: t } = useContext(LanguageContext);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        minHeight: { md: "70vh", xs: "auto" },
      }}
    >
      <AnimatedHeader
        title={t.roomServices.title}
        subtitle={t.roomServices.description}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Link to="/cleaning-service" style={{ textDecoration: "none" }}>
          {/* First Card */}
          <Box
            sx={{
              width: 135,
              height: 122,
              position: "relative",
              borderRadius: "8px",
              background: "linear-gradient(180deg, #02395C 0%, #13537C 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 4px 0px #0000001C",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)", // Slightly scale up on hover
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Add a stronger box shadow on hover
              },
            }}
          >
            <Box
              sx={{
                background: "#CFAE7824",
                borderRadius: "50%",
                width: 40,
                height: 40,
                boxShadow: "0px 4px 4px 0px #0000001C",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <img
                src={cleaning}
                alt="نظافه"
                //   style={{ width: "24px", height: "24px" }} // Adjust image size
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Almarai, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                textAlign: "center",
                color: "var(--white-color)",
              }}
            >
              {t.Cleaning}
            </Typography>
          </Box>
        </Link>
        <Link to="/resources-service" style={{ textDecoration: "none" }}>
          {/* Second Card */}
          <Box
            sx={{
              width: 135,
              height: 122,
              position: "relative",
              borderRadius: "8px",
              background: "linear-gradient(180deg, #02395C 0%, #13537C 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 4px 0px #0000001C",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)", // Slightly scale up on hover
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Add a stronger box shadow on hover
              },
            }}
          >
            <Box
              sx={{
                background: "#CFAE7824",
                borderRadius: "50%",
                width: 40,
                height: 40,
                boxShadow: "0px 4px 4px 0px #0000001C",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <img
                src={resources}
                alt="موارد"
                //   style={{ width: "24px", height: "24px" }} // Adjust image size
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "Almarai, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                textAlign: "center",
                color: "var(--white-color)",
              }}
            >
              {t.resources}
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default RoomServicePage;
