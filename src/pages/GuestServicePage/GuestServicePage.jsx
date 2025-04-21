import React from "react";
import { Box, Typography } from "@mui/material";

// Sample images (you can replace these with actual image imports or URLs)
import complaintImg from "../../assets/icons/complaint.svg";  // Example image
import otherImg from "../../assets/icons/other.svg"; // Example image

const GuestServicePage = () => {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        minHeight: {md:"70vh", xs:"auto"},
      }}
    >
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "24px", sm: "30px" },
          textAlign: "right",
          mb: 1.5,
          color: "var(--white-color)",
        }}
      >
        مركز خدمة الضيوف
      </Typography>
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "16px", sm: "24px" },
          textAlign: "center",
          mb:4,
          color: "var(--white-color)",
        }}
      >
        يسعدنا مساعدتكم وتلبية احتياجاتكم لضمان إقامه مريحه
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
              src={complaintImg}
              alt="شكوي"
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
            شكوي
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
              src={otherImg}
              alt="أخري"
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
            أخري
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GuestServicePage;
