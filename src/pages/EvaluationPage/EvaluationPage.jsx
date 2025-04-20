import React, { useState } from "react";
import { Box, Typography, Button, TextField, Container } from "@mui/material";
import starFilled from "../../assets/icons/star-filled.png";
import starEmpty from "../../assets/icons/star-empty.png";

const ratingLabels = [
  " النظافه",
  " الخدمه",
  " المرافق",
  " الموقع",
  " القيمه مقابل السعر",
];

const EvaluationPage = () => {
  const [ratings, setRatings] = useState(Array(5).fill(0));
  const [hovered, setHovered] = useState({ index: null, value: 0 });

  const [comment, setComment] = useState("");

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
        minHeight: "100vh", // Full viewport height
        p: 3,
        flexDirection: "column",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          sx={{
            fontFamily: "Almarai, sans-serif",
            fontWeight: 700,
            fontSize: { xs: "22px", sm: "30px" },
            textAlign: "center",
            mb: 2,
            color: "#ffffff",
          }}
        >
          تقييم الخدمات الفندقيه
        </Typography>

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

        <Box
          sx={{
            width: "100%",
            borderRadius: "8px",
            background: "linear-gradient(180deg, #02395C 0%, #13537C 100%)",
            p: { xs: 2, sm: 4 },
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Almarai, sans-serif",
              fontWeight: 700,
              fontSize: "24px",
              textAlign: "right",
              mb: 3,
            }}
          >
            قيم إقامتك
          </Typography>

          {ratingLabels.map((label, index) => (
            <Box
              key={index}
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
                  fontSize: "20px",
                }}
              >
                {label}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={
                      star <=
                      (hovered.index === index ? hovered.value : ratings[index])
                        ? starFilled
                        : starEmpty
                    }
                    alt="star"
                    style={{
                      width: 24,
                      height: 24,
                      cursor: "pointer",
                      marginLeft: 4,
                    }}
                    onClick={() => handleRating(index, star)}
                    onMouseEnter={() => setHovered({ index, value: star })}
                    onMouseLeave={() => setHovered({ index: null, value: 0 })}
                  />
                ))}
              </Box>
            </Box>
          ))}

          {/* Comment Section */}
          <Box>
            <Typography
              sx={{
                fontFamily: "Almarai, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                mb: 1,
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
          <Button
            variant="contained"
            sx={{
              mt: "30px",
              width: "100%",
              height: 48,
              borderRadius: "5px",
              backgroundColor: "#00395D",
              fontFamily: "Almarai, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "100%",
              "&:hover": {
                backgroundColor: "#002d4d",
              },
            }}
          >
            إرسال التقييم
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EvaluationPage;
