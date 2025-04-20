import React from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";

const InputField = ({ label, value, onChange, onBlur, error, touched, iconSrc, placeholder ,name}) => {
  return (
    <Box sx={{ }}>
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: "20px",
          lineHeight: "100%",
          color: "var(--white-color)",
          marginBottom: "15px",
        }}
      >
        {label}
      </Typography>

      <TextField
        variant="outlined"
        name={name}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
            height: "48px",
            backgroundColor: "#084267",
            border: "1px solid #FFFFFF80",
            "& input": {
              color: "#fff",
            },
            // "& fieldset": {
            //   borderColor: "#00395D", // Border color
            // },
          },
        }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        
        placeholder={placeholder}
        InputProps={{
          startAdornment: iconSrc && (
            <InputAdornment position="start">
              <img src={iconSrc} alt="input-icon" />
            </InputAdornment>
          ),
        }}
        error={touched && error} // Show error if the field is touched and has an error
        helperText={touched && error ? error : " "} // Display error message if touched
      />
      
    </Box>
  );
};

export default InputField;
