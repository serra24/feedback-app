import React from "react";
import { Box, Typography } from "@mui/material";

// Sample images (you can replace these with actual image imports or URLs)
import cleaning from "../../assets/icons/cleaning.svg";  // Example image
import resources from "../../assets/icons/resources.svg"; // Example image

const RoomServicePage = () => {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        minHeight: "100vh",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "24px", sm: "30px" },
          textAlign: "right",
          mb: 2,
          color: "var(--white-color)",
        }}
      >
        خدمات الغرف
      </Typography>
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "16px", sm: "24px" },
          textAlign: "center",
          mb: 5,
          color: "var(--white-color)",
        }}
      >
       اطلب خدمات النظافه أو الموارد الإضافيه لغرفتك 
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        gap: 3,
          width: "100%",
          maxWidth: 500,
        }}
      >
        {/* First Card: شكوي */}
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
            نظافه
          </Typography>
        </Box>

        {/* Second Card: أخري */}
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
            موارد
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomServicePage;
