import React from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const AnimatedHeader = ({ title, subtitle }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          sx={{
            fontFamily: "Almarai, sans-serif",
            fontWeight: 700,
            fontSize: { xs: "22px", sm: "30px" },
            textAlign: "center",
            mb: 1.5,
            color: "#ffffff",
          }}
        >
          {title}
        </Typography>
      </motion.div>

      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "14px", sm: "20px" },
          textAlign: "center",
          mb: 4,
          color: "#ffffff",
        }}
      >
        {subtitle}
      </Typography>
    </>
  );
};

export default AnimatedHeader;
