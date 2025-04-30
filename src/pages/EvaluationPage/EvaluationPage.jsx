import React, { use, useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import starFilled from "../../assets/icons/star-filled.svg";
import starEmpty from "../../assets/icons/star-empty.svg";
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
import { useLocation } from "react-router-dom";

const EvaluationPage = () => {
  const { translations: t, language } = useContext(LanguageContext);
  const roomNum2 = useSelector((state) => state.room.roomNum);
  // console.log("Room Number from Redux:", roomNum2);
   const location = useLocation();
  const { phone, email,guestName } = location.state || {};
  const [ratings, setRatings] = useState([]); // We will store individual ratings for each item here
  const [hovered, setHovered] = useState({ index: null, value: 0 });
  const [comment, setComment] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(""); // 'success' or 'error'
  const [popupMessage, setPopupMessage] = useState("");
  const mainContentRef = useRef(null);
  const dispatch = useDispatch();
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
    const initialRatings = data.map(() => 0); // Initialize all ratings to 0
    setRatings(initialRatings);
  }, [data]);

  const handleRating = (index, value) => {
    const updatedRatings = [...ratings]; // Copy current ratings
    updatedRatings[index] = value; // Update the rating for the specific item
    setRatings(updatedRatings); // Update state
  };

  const handleSubmit = () => {
    // const isValid = ratings.every((rating) => rating !== 0); // Check if all ratings are selected

    // if (isValid) {
    // Create the evaluation payload
    const evaluationData = {
      name: guestName, // You can replace this with a dynamic name if needed
      roomId: 660101,
      // roomId: roomNum2, // Use the room number from session storage
      // roomId: roomNum, // Use the room number from session storage
      // roomId: sessionStorage.getItem("roomNum"), // Use the room number from session storage
      items: data.map((item, index) => ({
        itemId: item.id, // Use the actual itemId from the data
        rate: ratings[index], // The corresponding rating for that item
      })),
      description: comment,
      email: email || null,
      phoneNumber: phone || null,
      language: language === "ar" ? 1 : 2, 
    };

    // Dispatch the evaluation action
    dispatch(addEvaluation(evaluationData))
      .then((response) => {
        // console.log("Evaluation submitted successfully:", response);
        if (response.payload.successtate === 200) {
          setPopupMessage(t.Evaluation.successMessage);
          setPopupType("success");
          setPopupOpen(true);
        } else {
          setPopupMessage(response.payload?.errormessage);
          // console.log("Error message:", response?.payload?.errormessage);

          setPopupType("error");
          setPopupOpen(true); // Show error popup
        }
      })
      .catch((error) => {
        // console.log("Error submitting evaluation:", error);

        setPopupMessage(error?.errormessage);
        setPopupType("error");
        setPopupOpen(true); // Show error popup
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
      <Box ref={mainContentRef} sx={{   
            display:"contents"}}>
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
            {data.map((item, index) => (
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
                        onClick={() => handleRating(index, star)} // Update the rating for the item
                        onMouseEnter={() => setHovered({ index, value: star })}
                        onMouseLeave={() =>
                          setHovered({ index: null, value: 0 })
                        }
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
      {popupType === "success" && (
        <SuccessPopup
          open={popupOpen}
          message={popupMessage}
          onClose={() => setPopupOpen(false)}
        />
      )}
      {popupType === "error" && (
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
