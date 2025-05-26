import React, { use, useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  CircularProgress,
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

const EvaluationPage = () => {
  const { translations: t, language } = useContext(LanguageContext);
  const roomNum2 = useSelector((state) => state.room.roomNum);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log("Room Number from Redux:", roomNum2);
  const location = useLocation();
  const { phone, email, guestName } = location.state || {};
  const [ratings, setRatings] = useState([]); // We will store individual ratings for each item here
  const [hovered, setHovered] = useState({ index: null, value: 0 });

  const [comment, setComment] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(""); // 'success' or 'error'
  const [popupMessage, setPopupMessage] = useState("");
  const mainContentRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingNumber = useSelector((state) => state.room.bookingNumber);
  const roomNum = useSelector((state) => state.room.roomNum);

  const { data, loading } = useSelector((state) => state.guestEvaluation);

  useEffect(() => {
    // Fetch guest evaluation data when the component mounts
    dispatch(fetchGuestEvaluation(language))
      .then(() => {
        // console.log("Guest evaluation data fetched successfully.");
      })
      .catch((error) => {
        console.error("Error fetching guest evaluation data:", error);
      });
  }, [dispatch, language]);
  useEffect(() => {
    // Initialize ratings for each item (if data is available)
    const initialRatings = data?.map(() => 0); // Initialize all ratings to 0
    setRatings(initialRatings);
  }, [data]);

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
  const handleSubmit = () => {
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
    };

    // Dispatch the evaluation action
    dispatch(addEvaluation(evaluationData))
      .then((response) => {
        // console.log("Evaluation submitted successfully:", response);
        if (response.payload.successtate === 200) {
          setPopupMessage(response.payload?.message);
          setPopupType("success");
          setPopupOpen(true);
          setComment("");
          setRatings(data?.map(() => 0));
          setHovered({ index: null, value: 0 });
        } else {
          setPopupMessage(response.payload?.errormessage);
          // console.log("Error message:", response?.payload?.errormessage);

          setPopupType("error");
          setPopupOpen(true); // Show error popup
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
    // } else {
    //   setPopupMessage(t.Evaluation.errorMessage);
    //   setPopupType("error");
    //   setPopupOpen(true); // Show error popup for incomplete ratings
    // }
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
                fontSize: "20px",
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
                      fontSize: "18px",
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
    transform: language === "en" ? "scaleX(-1)" : "none", // Flip visually for LTR
  }}
>
  <motion.img
    key={star}
    src={starIcon}
    alt="star"
    style={{
      width: 22,
      height: 22,
      cursor: "pointer",
      marginLeft: 4,
    }}
    whileHover={{ scale: 1.2 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={(e) => handleRating(index, star, e)}
    onMouseMove={(e) => {
      const { left, width } = e.target.getBoundingClientRect();
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
    onMouseLeave={() => setHovered({ index: null, value: 0 })}
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
                  fontSize: "18px",
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

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  mt: "6px",
                  width: "100%",
                  height: 48,
                  borderRadius: "5px",
                  backgroundColor: "#00395D",
                  fontFamily: "Almarai, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "100%",
                  "&:hover": {
                    backgroundColor: "#002d4d",
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
