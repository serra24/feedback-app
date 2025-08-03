import React from 'react';
import { Typography } from '@mui/material';

const FormTitle = ({ title }) => {
  return (
    <Typography
    sx={{
        fontFamily: "Almarai, sans-serif",
        fontWeight: 400,
        fontSize: { xs: "16px", sm: "20px" },
        color: "var(--white-color)",
        mb: {md:3,xs:2},
      }}
    >
      {title}
    </Typography>
  );
};

export default FormTitle;
