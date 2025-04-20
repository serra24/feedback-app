import React from "react";
import { Box, Typography } from "@mui/material";

const LuggageServicePage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
        نقل الأمتعة
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        نقل أمتعتك بأمان وسهولة داخل الفندق.
      </Typography>
    </Box>
  );
};

export default LuggageServicePage;
