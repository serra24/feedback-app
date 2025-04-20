import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Star } from "@mui/icons-material";

const ratingLabels = [
  " النظافه",
  " الخدمه",
  " المرافق",
  " الموقع",
  " القيمه مقابل السعر",
];

const EvaluationPage = () => {
  const [ratings, setRatings] = useState(Array(5).fill(0));
  const [hovered, setHovered] = useState(null);
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
        minHeight: "100vh",
        p: 2,
        flexDirection: "column",
        // backgroundColor: "#001f33",
      }}
    >
      {/* Header Section */}
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "22px", sm: "30px" },
          textAlign: "right",
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
          px: 2,
        }}
      >
        نقدر آرائكم ونسعي دائماً لتحسين خدماتنا بناءاً علي ملاحظاتكم.
      </Typography>

      <Box
        sx={{
          width: { xs: "100%", sm: 443 },
          maxWidth: "100%",
          height: "auto",
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
            lineHeight: "100%",
            textAlign: "right",
          }}
        >
          قيم إقامتك
        </Typography>

        {/* Ratings */}
        {ratingLabels.map((label, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Almarai, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
              }}
            >
              {label}
            </Typography>
            <Box>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  sx={{
                    color:
                      star <= (hovered ?? ratings[index]) ? "#FFD700" : "#ccc",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                  onClick={() => handleRating(index, star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(null)}
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
              fontWeight: 500,
              fontSize: "16px",
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
            sx={{
              backgroundColor: "#084267",
              border: "1px solid #E4E4E766",
              borderRadius: "5px",
              fontFamily: "Almarai, sans-serif",
              input: {
                fontFamily: "Almarai, sans-serif",
              },
              "& .MuiOutlinedInput-root": {
                color: "#fff",
              },
            }}
          />
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: { xs: "100%", sm: 383 },
            height: 48,
            alignSelf: "center",
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
    </Box>
  );
};

export default EvaluationPage;
