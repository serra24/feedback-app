import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import guestIcon from "../../assets/icons/guest.svg";
import maintenanceIcon from "../../assets/icons/maintenance.svg";
import roomIcon from "../../assets/icons/room.svg";
import luggageIcon from "../../assets/icons/luggage.svg";


const RequestServicePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { translations: t } = useContext(LanguageContext);
  const services = [
    // {
    //   icon: guestIcon,
    //   title: t.RequestServicePage.Complaint,
    //   description: t.RequestServicePage.Complaintdescription,
    //   link: "/guest-service", // Add a link for each service
    // },
    {
      icon: maintenanceIcon,
      title: t.RequestServicePage.Maintenance,
      description: t.RequestServicePage.Maintenancedescription,
      link: "/maintenance-service",
    },
    {
      icon: roomIcon,
      title: t.RequestServicePage.Room,
      description: t.RequestServicePage.Roomdescription,
      link: "/room-service",
    },
    {
      icon: luggageIcon,
      title: t.RequestServicePage.Luggage,
      description:t.RequestServicePage.Luggagedescription,
      link: "/luggage-service",
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
        minHeight: {md:"70vh", xs:"auto"},
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "24px", sm: "30px" },
          textAlign: "right",
          mb: {md:1.5,xs:2},
          color: "var(--white-color)",
        }}
      >
       {t.RequestServicePage.header.title}
      </Typography>

      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "16px", sm: "24px" },
          textAlign: "center",
          mb: 4,
          color: "var(--white-color)",
          maxWidth: "900px",
          display:{xs:"none", md:"flex"}
        }}
      >
          {t.RequestServicePage.header.description}
      </Typography>


      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {md:"center", xs:"center"},
          gap: {md:4, xs: 2}, // Adjust gap for smaller screens
          maxWidth: 650, // عرض الصف الكامل (259 * 2 + المسافة بين الكروت)
          // maxWidth: 950, 
        }}
      >
        {services.map((service, index) => (
          <Box
            key={index}
            onClick={() => navigate(service.link)} // Navigate to the respective service page
            sx={{
              width: 259,
              height: 149,
              borderRadius: "8px",
              background: "linear-gradient(180deg, #02395C 0%, #13537C 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              // mb: 4, // Add margin bottom for spacing between cards
              textAlign: "center",
              cursor: "pointer", // Make the card clickable
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover transition
              "&:hover": {
                transform: "scale(1.05)", // Slightly scale up on hover
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Add a stronger box shadow on hover
              },
            }}
          >
            <Box
              sx={{
                background: "#CFAE7824",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                width: "40px",
                height: "40px",
                boxShadow: "0px 4px 4px 0px #0000001C",
                mb: 2,
              }}
            >
              <img src={service.icon} alt={service.title} />
            </Box>
            <Typography
              sx={{
                fontFamily: "Almarai",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: 0,
                textAlign: "center",
                width: "100%",
                color: "var(--white-color)",
                mb: 1,
              }}
            >
              {service.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Almarai",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: 0,
                color: "var(--light-grey-bg)",
                textAlign: "center",
                mt: 1,
              }}
            >
              {service.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RequestServicePage;
