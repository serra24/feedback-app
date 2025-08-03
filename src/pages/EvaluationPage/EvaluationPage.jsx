import React, { use, useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  CircularProgress,
  IconButton,
} from "@mui/material";
import starFilled from "../../assets/icons/star-filled.svg";
import starEmpty from "../../assets/icons/star-empty.svg";
import starHalf from "../../assets/icons/half-star.svg";
// import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageContext } from "../../context/LanguageContext";
import AnimatedHeader from "../../components/AnimatedHeader/AnimatedHeader";
import SuccessPopup from "../../components/SuccessPopup/SuccessPopup";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuestEvaluation } from "../../redux/slices/guestEvaluationSlice";
import Loading from "../../components/Loading/Loading";
import { addEvaluation } from "../../redux/slices/evaluationSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const EvaluationPage = () => {
  const { translations: t, language } = useContext(LanguageContext);
  const roomNum2 = useSelector((state) => state.room.roomNum);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, loading } = useSelector((state) => state.guestEvaluation);
  const location = useLocation();
  const {
    phone,
    email,
    guestName,
    sourceId,
    branchId,
    ratings: prevRatings = [],
    comment: prevComment = "",
  } = location.state || {};
  const [ratings, setRatings] = useState(
    prevRatings?.length === data?.length
      ? prevRatings
      : data?.map(() => 0) || []
  );
  console.log("ratings:", ratings);

  // const [ratings, setRatings] = useState([]);
  const [hovered, setHovered] = useState({ index: null, value: 0 });
  const locationAsked = useSelector((state) => state.location.locationAsked);
  const locationStatus = useSelector((state) => state.location.locationStatus);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [locationPopupOpen, setLocationPopupOpen] = useState(false);

  const [comment, setComment] = useState(prevComment);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(""); // 'success' or 'error'
  const [popupMessage, setPopupMessage] = useState("");
  const mainContentRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingNumber = useSelector((state) => state.room.bookingNumber);
  const roomNum = useSelector((state) => state.room.roomNum);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    // Fetch guest evaluation data when the component mounts
    dispatch(fetchGuestEvaluation({language, sourceId: sourceId,
          branchId: branchId,}))
      .then(() => {
        // console.log("Guest evaluation data fetched successfully.");
      })
      .catch((error) => {
        console.error("Error fetching guest evaluation data:", error);
      });
  }, [dispatch, language]);
  // useEffect(() => {
  //   // Initialize ratings for each item (if data is available)
  //   const initialRatings = data?.map(() => 0); // Initialize all ratings to 0
  //   setRatings(initialRatings);
  // }, [data]);

  const handleRating = (index, value, e) => {
    const { left, width } = e.target.getBoundingClientRect();
    const clickX = e.clientX - left;

    let isHalf;

    if (language === "ar") {
      // Reverse the check for Arabic (RTL), since scaleX(-1) is applied
      isHalf = clickX > width / 2;
    } else {
      // Default LTR behavior
      isHalf = clickX < width / 2;
    }

    const newValue = isHalf ? value - 0.5 : value;

    const updatedRatings = [...ratings];
    if (updatedRatings[index] === newValue) {
      updatedRatings[index] = 0; // toggle off
    } else {
      updatedRatings[index] = newValue;
    }
    setRatings(updatedRatings);
  };
  const handleSubmit = async () => {
    if (
      locationAsked &&
      locationStatus === "allowed" &&
      "geolocation" in navigator
    ) {
      try {
        const position = await getLocation();
        // console.log("User location:", position);

        const freshCoordinates = {
          lat: position?.latitude,
          lng: position?.longitude,
        };

        setCoordinates(freshCoordinates);
        setIsSubmitting(true);

        // const isValid = ratings.every((rating) => rating !== 0); // Check if all ratings are selected
        const hasAtLeastOneRating = ratings.some((rating) => rating > 0);
        const hasComment = comment.trim().length > 0;

        if (!hasAtLeastOneRating && !hasComment) {
          setPopupMessage(
            t.Evaluation.errorMessage ||
              "Please provide at least one rating or a comment."
          );
          setPopupType("error");
          setPopupOpen(true);
          return; // Stop submission
        }
        // if (isValid) {
        // Create the evaluation payload
        const evaluationData = {
          name: guestName, // You can replace this with a dynamic name if needed
          roomId: roomNum,
          // roomId: roomNum2, // Use the room number from session storage
          // roomId: roomNum, // Use the room number from session storage
          // roomId: sessionStorage.getItem("roomNum"), // Use the room number from session storage
          items: data?.map((item, index) => ({
            itemId: item.id, // Use the actual itemId from the data
            rate: ratings[index], // The corresponding rating for that item
          })),
          description: comment,
          email: email || null,
          phoneNumber: phone || null,
          language: language === "ar" ? 1 : 2,
          bookingNumber: bookingNumber,
          sourceId: sourceId,
          branchId: branchId,
        };

        // Dispatch the evaluation action
        dispatch(
          addEvaluation({ evaluationData, coordinates: freshCoordinates })
        )
          .then((response) => {
            // console.log("re", response);

            // console.log("Evaluation submitted successfully:", response);
            if (response.payload.successtate === 200) {
              setPopupMessage(response.payload?.message);
              setPopupType("success");
              setPopupOpen(true);
              setComment("");
              setRatings(data?.map(() => 0));
              setHovered({ index: null, value: 0 });
              // } else {
              //   setPopupMessage(response.payload?.errormessage|| response?.payload?.payload);
              //   // console.log("Error message:", response?.payload?.errormessage);

              //   setPopupType("error");
              //   setPopupOpen(true); // Show error popup
              // }
            } else {
              const payload = response.payload;

              if (payload?.status === 400) {
                // Show a specific message for status 400
                setPopupMessage(t.roomLocation);
              } else {
                // Fallback to error message or payload string
                setPopupMessage(
                  payload?.errormessage ||
                    payload?.payload ||
                    payload ||
                    "Something went wrong."
                );
              }

              setPopupType("error");
              setPopupOpen(true);
            }
          })
          .catch((error) => {
            // console.log("Error submitting evaluation:", error);
            setIsSubmitting(false);
            setPopupMessage(error?.errormessage);
            setPopupType("error");
            setPopupOpen(true); // Show error popup
          })
          .finally(() => {
            setIsSubmitting(false);
          });
        return; // ✅ prevent further execution
      } catch (error) {
        console.error("Location access failed:", error.message);
        setLocationPopupOpen(true);
        return;
      }
    } else {
      setLocationPopupOpen(true);
      return;
    }
  };

  const handleBack = () => {
    navigate("/rate-service", {
      state: {
        phone,
        email,
        guestName,
        sourceId,
        branchId,
        ratings: ratings || [], // Fallback if ratings not in state
        comment: comment || "",
      },
    });
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: { md: "70vh", xs: "auto" },
        p: 3,
        flexDirection: "column",
      }}
    >
      <Box
        ref={mainContentRef}
        sx={{
          display: "contents",
        }}
      >
        <AnimatedHeader
          title={t.Evaluation.header}
          subtitle={t.Evaluation.subheader}
        />

        {/* Animated Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box
            sx={{
              width: { xs: "90%", sm: "440px" },
              borderRadius: "8px",
              background: "linear-gradient(180deg, #00395D 0%, #13537C 100%)",
              p: { xs: 2, sm: 3 },
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Almarai, sans-serif",
                fontWeight: 700,
                fontSize: { md: "20px", xs: "18px" },
              }}
            >
              {t.Evaluation.rateYourStay}
            </Typography>

            {/* Iterate through the evaluation items */}
            {data?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {/* Rating Label */}
                  <Typography
                    sx={{
                      fontFamily: "Almarai, sans-serif",
                      fontWeight: 400,
                      fontSize: { md: "18px", xs: "16px" },
                      whiteSpace: "normal",
                      width: { xs: "95px", sm: "auto" },
                    }}
                  >
                    {item?.localizedName}
                  </Typography>

                  {/* Rating Stars */}
                  <Box>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const currentRating =
                        hovered.index === index
                          ? hovered.value
                          : ratings[index];
                      let starIcon;

                      if (currentRating >= star) {
                        starIcon = starFilled;
                      } else if (currentRating >= star - 0.5) {
                        starIcon = starHalf;
                      } else {
                        starIcon = starEmpty;
                      }

                      return (
                        <Box
                          sx={{
                            display: "inline-block",
                            transform:
                              language === "en" ? "scaleX(-1)" : "none",
                            "& img": {
                              width: { xs: 18, sm: 22 },
                              height: { xs: 18, sm: 22 },
                              cursor: "pointer",
                              marginLeft: 1,
                            },
                          }}
                        >
                          <motion.img
                            key={star}
                            src={starIcon}
                            alt="star"
                            style={{
                              // width: 22,
                              // height: 22,
                              cursor: "pointer",
                              marginLeft: 4,
                            }}
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={(e) => handleRating(index, star, e)}
                            onMouseMove={(e) => {
                              const { left, width } =
                                e.target.getBoundingClientRect();
                              const x = e.clientX - left;

                              let hoverValue;

                              if (language === "ar") {
                                // For RTL, swap the x calculation
                                hoverValue = x > width / 2 ? star - 0.5 : star;
                              } else {
                                hoverValue = x < width / 2 ? star - 0.5 : star;
                              }

                              setHovered({ index, value: hoverValue });
                            }}
                            onMouseLeave={() =>
                              setHovered({ index: null, value: 0 })
                            }
                          />
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </motion.div>
            ))}

            {/* Comment Section */}
            <Box>
              <Typography
                sx={{
                  fontFamily: "Almarai, sans-serif",
                  fontWeight: 400,
                  fontSize: { md: "18px", xs: "16px" },
                  mb: 2,
                }}
              >
                {t.Evaluation.commentLabel}
              </Typography>
              <TextareaAutosize
                name="comment"
                minRows={8.5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.Evaluation.commentPlaceholder}
                className="styled-placeholder"
                style={{
                  border: "1px solid #FFFFFF80",
                  borderRadius: "4px",
                  padding: "12px",
                  backgroundColor: "transparent",
                  color: "#fff",
                  width: "90.6%",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 3,
                width: "100%",
                alignItems: "center", // Ensures buttons are aligned vertically
              }}
            >
              {/* Back Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{ flex: 1, width: "100%" }} // Ensures motion div takes full width
              >
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleBack}
                  sx={{
                    height: { md: "48px", xs: "38px" },
                    borderRadius: "5px",
                    borderColor: "var(--gold-color)",
                    color: "var(--gold-color)",
                    fontWeight: 400,
                    fontSize: { xs: "14px", sm: "18px" },
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255, 215, 0, 0.1)",
                      borderColor: "var(--gold-color)",
                    },
                  }}
                >
                  {t.back}
                </Button>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{ flex: 2, width: "100%" }} // Makes submit button wider
              >
                <Button
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    height: { md: "48px", xs: "38px" },
                    borderRadius: "5px",
                    backgroundColor: "#00395D",
                    fontFamily: "Almarai, sans-serif",
                    fontWeight: 400,
                    fontSize: { xs: "14px", sm: "18px" },
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#002d4d",
                    },
                    "&:disabled": {
                      backgroundColor: "rgba(0, 61, 93, 0.5)",
                      color: "rgba(255, 255, 255, 0.5)",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    t.Evaluation.submit
                  )}
                </Button>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Success or Error Popups */}
      {popupType === "success" && (
        <SuccessPopup
          open={popupOpen}
          message={popupMessage}
          onClose={() => {
            setPopupOpen(false);
            navigate("/"); // Redirect to home
          }}
        />
      )}
      {popupType === "error" && (
        <ErrorPopup
          open={popupOpen}
          message={popupMessage}
          onClose={() => {
            setPopupOpen(false);
            setIsSubmitting(false);
          }}
        />
      )}
    </Box>
  );
};

export default EvaluationPage;
