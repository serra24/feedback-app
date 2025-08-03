import React, { useContext } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { LanguageContext } from "../../context/LanguageContext";

// eslint-disable-next-line no-undef
const LocationPopup = ({ title, onAllow, onDeny }) => {
  const { translations: t } = useContext(LanguageContext);
  // Use default title if not provided
  const popupTitle = title || t.locationPopup.allowLocationAccess;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          p: { md: 4, xs: 2 },
          borderRadius: 3,
          width: { md: "90%", xs: "80%" },
          maxWidth: 400,
          boxShadow: 8,
          textAlign: "center",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onDeny}
          aria-label="Close"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon sx={{ color: "#9D7C47" }} />
        </IconButton>

        <Box
          sx={{
            width: 64,
            height: 64,
            bgcolor: "#f5f5f5",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 16px",
          }}
        >
          <LocationOnIcon sx={{ fontSize: 32, color: "#9D7C47" }} />
        </Box>

        <Typography  sx={{fontSize:{md:"24px",xs:"20px"}, mb: 2, fontWeight: 600, color: "#333" }}>
          {popupTitle}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            onClick={onAllow}
            variant="contained"
            sx={{
              bgcolor: "#9D7C47",
              color: "#fff",
              px: 3,
              "&:hover": { bgcolor: "#8a6a3f" },
            }}
          >
            {t.locationPopup.allow}
          </Button>
          <Button
            onClick={onDeny}
            variant="outlined"
            sx={{
              color: "#9D7C47",
              borderColor: "#9D7C47",
              px: 3,
              "&:hover": {
                bgcolor: "#f9f4ee",
                borderColor: "#9D7C47",
              },
            }}
          >
            {t.locationPopup.deny}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LocationPopup;
