import React from "react";
import { Box, Typography } from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import guestIcon from "../../assets/icons/guest.png";
import maintenanceIcon from "../../assets/icons/maintenance.png";
import roomIcon from "../../assets/icons/room.png";
import luggageIcon from "../../assets/icons/luggage.png";

const services = [
  {
    icon: guestIcon,
    title: "مركز خدمة الضيوف",
    description: "دعم متكامل لضيوفنا على مدار الساعة.",
    link: "/guest-service", // Add a link for each service
  },
  {
    icon: maintenanceIcon,
    title: "خدمة الصيانة",
    description: "حلول فورية لأعطال الغرف أو الأجهزة.",
    link: "/maintenance-service",
  },
  {
    icon: roomIcon,
    title: "خدمات الغرف",
    description: "راحة تامة وخدمة مميزة داخل غرفتك.",
    link: "/room-service",
  },
  {
    icon: luggageIcon,
    title: "نقل الأمتعة",
    description: "نقل أمتعتك بأمان وسهولة داخل الفندق.",
    link: "/luggage-service",
  },
];

const RequestServicePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  // const { translations: t } = useContext(LanguageContext);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "24px", sm: "30px" },
          textAlign: "right",
          mb: 3,
          color: "var(--white-color)",
        }}
      >
        اختَر الخدمة التي تحتاجها
      </Typography>

      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "16px", sm: "24px" },
          textAlign: "center",
          mb: 5,
          color: "var(--white-color)",
        }}
      >
        في نوازي، نوفر لك مجموعة متنوعة من الخدمات المصممة بعناية لتلبية
        احتياجاتك أثناء رحلتك الدينية. اختر الخدمة المناسبة لك، ودعنا نهتم
        بالباقي.
      </Typography>

      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxWidth: 650, // عرض الصف الكامل (259 * 2 + المسافة بين الكروت)
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
              mb: 4, // مسافة بين الصفوف
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
