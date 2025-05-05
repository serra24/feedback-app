import React from "react";
import { Box } from "@mui/material";
import logo from "./../../assets/logos/logo.svg";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed", // Ensures it ignores body padding and stays in place
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--primary-bg-color)",
        zIndex: 9999, // Ensure it stays above other content
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          position: "relative",
          width: 120,
          height: 120,
        }}
      >
        {/* Circular Loader */}
        <Box
          sx={{
            width: 120,
            height: 120,
            border: "2px solid transparent",
            borderTop: "2px solid rgba(255, 255, 255, 0.5)", // Increased borderTop thickness
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {/* Rotating Image inside the Circle */}
        <Box
          component="img"
          src={logo}
          loading="lazy"
          alt="Preloader"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(0deg)",
            width: 120,
            height: 100,
          }}
        />
      </Box>
    </Box>
  );
};

export default Loader;
