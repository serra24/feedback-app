import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import starFilled from "../../assets/icons/star-filled.svg";
import starEmpty from "../../assets/icons/star-empty.svg";
// import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const ratingLabels = [
  " النظافه",
  " الخدمه",
  " المرافق",
  " الموقع",
  <>
    القيمه مقابل
    <br />
    السعر
  </>,
];

const EvaluationPage = () => {
  const [ratings, setRatings] = useState(Array(5).fill(0));
  const [hovered, setHovered] = useState({ index: null, value: 0 });
  const [comment, setComment] = useState("");
  // const location = useLocation();
  // const { bookingNumber, secretNumber } = location.state || {};

  const handleRating = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
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
          fontSize: { xs: "22px", sm: "30px" },
          textAlign: "center",
          mb: 1.5,
          color: "#ffffff",
        }}
      >
        تقييم الخدمات الفندقيه
      </Typography>
      </motion.div>

      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "14px", sm: "20px" },
          textAlign: "center",
          mb: 4,
          color: "#ffffff",
        }}
      >
        نقدر آرائكم ونسعي دائماً لتحسين خدماتنا بناءاً علي ملاحظاتكم.
      </Typography>
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
          background: "linear-gradient(180deg, #02395C 0%, #13537C 100%)",
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
            textAlign: "right",
            // mb: 3,
          }}
        >
          قيم إقامتك
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
                      onMouseEnter={() =>
                        setHovered({ index, value: star })
                      }
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
            تعليقك (إختياري)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="أخبرنا عن تجربتك في الفندق..."
            sx={{
              backgroundColor: "#084267",
              border: "1px solid #E4E4E766",
              borderRadius: "5px",
              fontFamily: "Almarai, sans-serif",
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                fontFamily: "Almarai, sans-serif",
                "& textarea::placeholder": {
                  fontFamily: "Almarai, sans-serif",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: 0,
                  verticalAlign: "middle",
                  color: "#FFFFFF80",
                },
              },
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
            >
              إرسال التقييم
            </Button>
          </motion.div>
      </Box>
      </motion.div>
    </Box>
  );
};

export default EvaluationPage;
