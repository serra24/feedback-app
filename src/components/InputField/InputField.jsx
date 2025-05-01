import React from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";

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
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "100%",
          color: "var(--white-color)",
          marginBottom: "12px",
        }}
      >
        {label}
      </Typography>

      <TextField
        variant="outlined"
        name={name}
        type={type} // Use native date input if type is date
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
            height: "48px",
            backgroundColor: "#084267",
            // backgroundColor: "transparent",
            // border: "1px solid #FFFFFF80",
            "& input": {
              color: "#fff",
            },
            "& input::placeholder": {
              fontSize: "15px",  
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
