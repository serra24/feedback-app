import React from "react";
import { Box, Typography } from "@mui/material";

const MaintenanceServicePage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
        خدمة الصيانة
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        حلول فورية لأعطال الغرف أو الأجهزة.
      </Typography>
    </Box>
  );
};

export default MaintenanceServicePage;
