import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Box, Typography } from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";
import Card from "../../components/Card/Card";
import star from "../../assets/icons/star.svg";
import notification from "../../assets/icons/notification.svg";
import arrowIcon from "../../assets/icons/arrowIcon.png";
import { motion } from "framer-motion";
import ComplaintIcon from "../../assets/icons/guest.svg";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRoomNumber } from "../../redux/slices/roomSlice";
const Home = () => {
  const { translations: t } = useContext(LanguageContext);
  const location = useLocation();
  const dispatch = useDispatch();

  // Extract room number from the query string
  const queryParams = new URLSearchParams(location.search);
  const roomNumber = queryParams.get("roomNumber");

  useEffect(() => {
    if (roomNumber) {
      console.log("Room Number from QR Code:", roomNumber); // Log the room number to the console
      sessionStorage.setItem("roomNum", roomNumber);
      // Dispatch action to store room number in Redux
      dispatch(setRoomNumber(roomNumber));
    }
  }, [dispatch, roomNumber]);

  // Access room number from Redux state
  const storedRoomNumber = useSelector((state) => state.room.roomNum);
  console.log("Stored Room Number from Redux:", storedRoomNumber);
  // Save room number after scanning the QR code

  // Retrieve room number in another page/component
  const roomNum = sessionStorage.getItem("roomNum");

  return (
    <Box
      sx={{
        minHeight: { md: "70vh", xs: "auto" },
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          px: 2,
          py: 4,
        }}
      >
        {/* Welcome Heading - Simplified for mobile */}
        <Box
          sx={{
            // mb: { xs: 2, md: 3 }

            display: {
              xs: "none", // hide on extra small screens
              sm: "none", // hide on small screens
              md: "block", // show on medium and larger
            },
          }}
        >
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              sx={{
                fontFamily: "Almarai, sans-serif",
                fontWeight: 700,
                fontSize: { xs: "24px", sm: "28px", md: "30px" },
                mb: { xs: 1, md: 1.5 }, //should be 2 in md
              }}
            >
              {t.home.mainHeading}
            </Typography>
          </motion.div>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
              lineHeight: "1.5",
              mb: { xs: 3, md: 4 },
              maxWidth: "1200px",
            }}
          >
            {'"'}
            {t.home.subHeading}
            {'"'}
          </Typography>
        </Box>

        {/* For xs screens (mobile) - show welcomeMessage2 */}
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            {t.home.welcomeMessage2}
          </Typography>
        </Box>

        {/* For md and up - show welcomeMessage */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
            mb: 5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            {t.home.welcomeMessage}
          </Typography>
        </Box>

        {/* Cards */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            gap: { xs: 2, md: 3 },
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "center",
            px: { xs: 1, sm: 2 },
            mb: 2.5,
          }}
        >
          <Card
            topTitle={t.home.cards.rateService.topTitle}
            title={t.home.cards.rateService.topTitle}
            description={t.home.cards.rateService.description}
            bgColor={["var(--primary-bg-color)", "var(--secondary-bg-color)"]}
            iconColor="var(--gold-color-2)"
            iconSize="50px"
            imageSrc={star}
            arrowIcon={arrowIcon}
            navigateTo="/rate-service"
          />

          <Card
            topTitle={t.home.cards.requestService.topTitle}
            title={t.home.cards.requestService.topTitle}
            description={t.home.cards.requestService.description}
            bgColor={["var(--primary-bg-color)", "var(--secondary-bg-color)"]}
            iconColor="var(--gold-color-2)"
            iconSize="50px"
            imageSrc={notification}
            arrowIcon={arrowIcon}
            navigateTo="/request-service"
          />
        </Box>
        <Box
          s
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            gap: { xs: 2, md: 3 },
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: "center",
            px: { xs: 1, sm: 2 },
            mb: 2.5,
          }}
        >
          <Card
            topTitle={t.RequestServicePage.Complaint}
            title={t.Submitcomplaint}
            description={t.RequestServicePage.Complaintdescription}
            bgColor={["var(--primary-bg-color)", "var(--secondary-bg-color)"]}
            iconColor="var(--gold-color-2)"
            iconSize="50px"
            imageSrc={ComplaintIcon}
            arrowIcon={arrowIcon}
            navigateTo="/guest-service"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
