import React from "react";
import { Box, Typography } from "@mui/material";

const RequestServicePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Request Service Page
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is the page where users can request a service.
      </Typography>
    </Box>
  );
};

export default RequestServicePage;
