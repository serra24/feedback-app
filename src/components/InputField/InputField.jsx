import React, { useContext } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";

const InputField = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  iconSrc,
  placeholder,
  name,
  type = "text",
  disabled = false,
  required = false,
}) => {
  const { translations: t, language: lang } = useContext(LanguageContext);
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { md: "18px", xs: "14px" },
          lineHeight: "100%",
          
          color: "var(--white-color)",
          marginBottom: "12px",
        }}
      >
        {label}
        {required && (
          <Typography
            component="span"
            sx={{
              color: "red",
              marginRight: lang === "ar" ? "4px" : 0,
              marginLeft: lang === "en" ? "4px" : 0,
            }}
          >
            *
          </Typography>
        )}
      </Typography>
      <TextField
        variant="outlined"
        name={name}
        type={type} // Use native date input if type is date
        fullWidth
        sx={{
          "& .css-2u11ia-MuiInputBase-input-MuiOutlinedInput-input": {
            height: { md: "48px", xs: "8px !important" },
          },
         
          "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
            height: { md: "48px", xs: "40px" },
            backgroundColor: "#084267",
            // backgroundColor: "transparent",
            // border: "1px solid #FFFFFF80",
            "& input": {
              color: "#fff",
            },
            "& input::placeholder": {
              fontSize: { md: "15px", xs: "12px" },
                fontFamily: "Almarai",

            },
          },
          // Hide the label float for date inputs
          ...(type === "date" && {
            "& input::-webkit-calendar-picker-indicator": {
              filter: "invert(1)", // Make calendar icon visible on dark background
            },
          }),
        }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={type !== "date" ? placeholder : undefined} // Don't show placeholder on date input
        InputProps={{
          startAdornment:
            iconSrc && type !== "date" ? (
              <InputAdornment position="start">
                {/* <img src={iconSrc} alt="input-icon" /> */}
                {iconSrc}
              </InputAdornment>
            ) : undefined,
        }}
        error={touched && Boolean(error)}
        helperText={touched && error ? error : " "}
      />
    </Box>
  );
};

export default InputField;
