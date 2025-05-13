import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";

const AboutUs = () => {
  const { translations: t } = useContext(LanguageContext);

  // Define the content for each section

  const sections = [
    {
      title: t.who_we_are.title,
      content: t.who_we_are.content,
    },
    {
      title: t.our_vision.title,
      content: t.our_vision.content,
    },
    {
      title: t.our_mission.title,
      content: t.our_mission.content,
    },
    {
      title: t.our_values.title,
      content: t.our_values.content,
    },
    {
      title: t.what_we_offer.title,
      content: t.what_we_offer.content,
    },
  ];

  return (
    <Box
         sx={{
           position: "relative",
           zIndex: 2,
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           p: 3,
           minHeight: { md: "140vh", xs: "230vh" },
         }}
       >
      <Box sx={{ mb: "32px" }}>
        {/* Header Section (من نحن ؟) */}
        <Typography
          sx={{
            fontFamily: "Almarai",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "100%",
            color: "var(--white-color)",
            // textAlign: "right",
          }}
        >
          {t.whowe}
        </Typography>
      </Box>

      {/* Gradient Box */}
      <Box
        sx={{
          width: { xs: "90%", sm: "440px", md: "635px" },
          //   width: "635px",
          mt: "60px",
          borderRadius: "8px",
          background: "linear-gradient(180deg, #00395D 0%, #13537C 100%)",
          position: "absolute",
          p: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          //   alignItems: "flex-end",
          //   textAlign: "right",
        }}
      >
        {/* Content Sections Inside the Gradient Box */}
        {sections.map((section, index) => (
          <Box sx={{ mb: 3 }} key={index}>
            <Typography
              variant="h5"
              sx={{
                mb: "6px",
                fontFamily: "Almarai",
                fontWeight: 700,
                fontSize: "18px",
                color: "var(--gold-color)",
              }}
            >
              {section.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Almarai",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
                // textAlign: "right",
                verticalAlign: "middle",
                color: "white",
              }}
            >
              {Array.isArray(section.content)
                ? section.content.map((line, index) => (
                    <Box key={index} sx={{ mb: "10px" }}>
                      {line}
                    </Box>
                  ))
                : section.content}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AboutUs;
