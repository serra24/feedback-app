import React, { useContext } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";

const Loading = () => {
    const { translations: t } = useContext(LanguageContext);
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color: "#016d73c9",
        }}
      />
      <Typography
        sx={{
          marginTop: 2,
          fontSize: "18px",
          color: "#016d73c9",
          fontWeight: "bold",
        }}
      >
        {t.loading}
      </Typography>
    </Box>
  );
};

export default Loading;
