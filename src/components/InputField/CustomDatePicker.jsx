import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  name,
}) => {
  const [open, setOpen] = useState(false); // State to handle opening and closing
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

      {/* Make the entire Box clickable */}
      <Box onClick={handleOpen}>
        <DatePicker
        
          open={open} // Bind the DatePicker open state
          value={value}
          onChange={(newValue) => onChange({ target: { name, value: newValue } })}
          onBlur={onBlur}
          onClose={handleClose} // Close the date picker when it loses focus
          renderInput={(params) => (
            <TextField
              {...params}
                  variant="outlined"
              name={name}
              fullWidth
              error={touched && Boolean(error)}
              helperText={touched && error ? error : " "}
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Almarai, sans-serif",
                  borderRadius: "5px",
                  height: "48px",
                  // backgroundColor: "#084267",
                  backgroundColor: "transparent",
                     // border: "1px solid #FFFFFF80",
                  "& input": {
                    color: "#fff",
                    cursor: "pointer",
                  },
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
                "& .css-1wqp779-MuiFormControl-root-MuiPickersTextField-root": {
                  width: "100% !important",
                },
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default CustomDatePicker;
