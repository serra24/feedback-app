import React from "react";
import { Box, Typography } from "@mui/material";

// Image import (you can replace this with your actual image import or URL)
import resourcesImage from "../../assets/icons/resources.svg";

const ResourcesServicePage = () => {
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
        خدمات الموارد
      </Typography>
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "16px", sm: "24px" },
          textAlign: "center",
          mb: 4,
          color: "var(--white-color)",
        }}
      >
        اطلب موارد إضافية لغرفتك
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
              transform: "scale(1.05)",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
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
            <img src={resourcesImage} alt="موارد" width={24} height={24} />
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

export default ResourcesServicePage;
