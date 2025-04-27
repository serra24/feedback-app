import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Typography, Button, TextField, TextareaAutosize } from "@mui/material";
import starFilled from "../../assets/icons/star-filled.svg";
import starEmpty from "../../assets/icons/star-empty.svg";
// import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageContext } from "../../context/LanguageContext";
import AnimatedHeader from "../../components/AnimatedHeader/AnimatedHeader";
import SuccessPopup from "../../components/SuccessPopup/SuccessPopup";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

const EvaluationPage = () => {
  const { translations: t } = useContext(LanguageContext);

  const [ratings, setRatings] = useState(Array(5).fill(0));
  const [hovered, setHovered] = useState({ index: null, value: 0 });
  const [comment, setComment] = useState("");
  // const location = useLocation();
  // const { bookingNumber, secretNumber } = location.state || {};
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(""); // 'success' or 'error'
  const [popupMessage, setPopupMessage] = useState("");
   // Reference for main content area
   const mainContentRef = useRef(null);

   // Apply blur effect to the main content when popup is open
   useEffect(() => {
     if (popupOpen) {
       // Apply the blur effect on the main content area
       if (mainContentRef.current) {
         mainContentRef.current.style.filter = "blur(5px)";
       }
     } else {
       if (mainContentRef.current) {
         mainContentRef.current.style.filter = "none";
       }
     }
   }, [popupOpen]);
  const ratingLabels = [
    t.Evaluation.ratings.cleanliness,
    t.Evaluation.ratings.service,
    t.Evaluation.ratings.facilities,
    t.Evaluation.ratings.location,
    t.Evaluation.ratings.value,
  ];
  const handleRating = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };
  const handleSubmit = () => {
    // Example validation: Check if all ratings are provided
    const isValid = ratings.every(rating => rating !== 0);
    
    if (isValid) {
      // Show success popup
      setPopupMessage(t.Evaluation.successMessage);
      setPopupType('success');
    } else {
      // Show error popup
      setPopupMessage(t.Evaluation.errorMessage);
      setPopupType('error');
    }
    
    setPopupOpen(true);
  };
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
      <Box  ref={mainContentRef}>
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
            width: { xs: "90%", sm: "440px" }, // Adjust width for small screens
            // height: { xs: "auto", sm: "400px" },
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
              // textAlign: "right",
              // mb: 3,
            }}
          >
            {t.Evaluation.rateYourStay}
          </Typography>

          {ratingLabels.map((label, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
            >
              <Box
                // key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Almarai, sans-serif",
                    fontWeight: 400,
                    fontSize: "18px",
                    whiteSpace: "normal", // allow line breaks
                    // textAlign: { xs: "center", sm: "right" }, // center on small screens
                    width: { xs: "95px", sm: "auto" },
                  }}
                >
                  {label}
                </Typography>
                <Box>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.img
                      key={star}
                      src={
                        star <=
                        (hovered.index === index
                          ? hovered.value
                          : ratings[index])
                          ? starFilled
                          : starEmpty
                      }
                      alt="star"
                      style={{
                        width: 22,
                        height: 22,
                        cursor: "pointer",
                        marginLeft: 4,
                      }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleRating(index, star)}
                      onMouseEnter={() => setHovered({ index, value: star })}
                      onMouseLeave={() => setHovered({ index: null, value: 0 })}
                    />
                  ))}
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
              {t.Evaluation.submit}
            </Button>
          </motion.div>
        </Box>
      </motion.div>
      </Box>
         {/* Success or Error Popups */}
         {popupType === 'success' && (
        <SuccessPopup
          open={popupOpen}
          message={popupMessage}
          onClose={() => setPopupOpen(false)}
        />
      )}
     {popupType === 'error' && (
        <ErrorPopup
          open={popupOpen}
          message={popupMessage}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </Box>
  );
};

export default EvaluationPage;
