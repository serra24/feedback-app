import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Box, Typography } from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";
import Card from "../../components/Card/Card";
import star from "../../assets/icons/star.svg";
import notification from "../../assets/icons/notification.svg";
import arrowIcon from "../../assets/icons/arrowIcon.png";
import { motion } from "framer-motion";
import ComplaintIcon from "../../assets/icons/guest.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBookingNumber, setRoomNumber } from "../../redux/slices/roomSlice";
import LocationPopup from "../../components/LocationPopup/LocationPopup";
import {
  setLocationAsked,
  setLocationStatus,
} from "../../redux/slices/locationSlice";
import { checkRoomOccupancy } from "../../redux/slices/roomFeatures/roomOccupancySlice";

const Home = () => {
  const { translations: t } = useContext(LanguageContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const [hasCheckedRoom, setHasCheckedRoom] = useState(false);
  const locationAsked = useSelector((state) => state.location.locationAsked);
  const locationStatus = useSelector((state) => state.location.locationStatus);
  // console.log("locationAsked",locationAsked,"locationStatus",locationStatus);
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  // console.log("coordinates",coordinates);
  useEffect(() => {
    if (locationAsked && locationStatus === "allowed") {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ lat: latitude, lng: longitude });
            // console.log("📍 Auto-located after refresh:", latitude, longitude);
          },
          (error) => {
            console.error("Location fetch failed on refresh:", error.message);
          }
        );
      }
    }
  }, [locationAsked, locationStatus]);

  const handleAllowLocation = () => {
    dispatch(setLocationAsked(true));
    dispatch(setLocationStatus("allowed"));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          // console.log("Latitude:", latitude, "Longitude:", longitude);
        },
        (error) => {
          console.error("Location access denied:", error.message);
        }
      );
    }
  };

  const handleDeny = () => {
    dispatch(setLocationAsked(true));
    dispatch(setLocationStatus("denied"));
    // console.log("Location access denied by user.");
  };

  // Extract room number from the query string
  const queryParams = new URLSearchParams(location.search);
  const roomNumber = queryParams.get("roomNumber");
  const bookingNumber = queryParams.get("bookingNumber");
  // ✅ Handle room check & save in one effect
  useEffect(() => {
    const handleRoomValidation = async () => {
      if (!roomNumber || hasCheckedRoom) return;

      setHasCheckedRoom(true); // prevent duplicate execution

      try {
        const resultAction = await dispatch(checkRoomOccupancy(roomNumber));
        if (checkRoomOccupancy.fulfilled.match(resultAction)) {
          const isOccupied = resultAction.payload;

          if (isOccupied) {
            dispatch(setRoomNumber(roomNumber));
            // console.log("✅ Room is occupied. Saved:", roomNumber);
          } else {
            // console.warn("⚠️ Room is NOT occupied. Redirecting.");
            navigate("/room-not-occupied"); // or trigger a modal
          }
        } else {
          console.error(
            "❌ Failed to check room occupancy:",
            resultAction.payload
          );
        }
      } catch (err) {
        console.error("❌ Error during room check:", err);
      }
    };

    handleRoomValidation();

    if (bookingNumber) {
      dispatch(setBookingNumber(bookingNumber));
    }
  }, [roomNumber, bookingNumber, dispatch, navigate, hasCheckedRoom]);
  // useEffect(() => {
  //   if (roomNumber) {
  //     // sessionStorage.setItem("roomNum", roomNumber);
  //     dispatch(setRoomNumber(roomNumber));
  //   }

  //   if (bookingNumber) {
  //     // sessionStorage.setItem("bookingNumber", bookingNumber);
  //     dispatch(setBookingNumber(bookingNumber));
  //   }
  // }, [dispatch, roomNumber, bookingNumber]);

  // console.log("Stored Room Number from Redux:", storedRoomNumber);

  return (
    <>
      {/* ✅ Popup using Box */}

      {!locationAsked && locationStatus !== "allowed" && (
        <LocationPopup onAllow={handleAllowLocation} onDeny={handleDeny} />
      )}

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
                lg: "none",
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
          {/* <Box
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
        </Box> */}

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
    </>
  );
};

export default Home;
