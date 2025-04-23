import React, { useState } from "react";
import { Box, TextField, Typography, DialogActions } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const CustomTimePicker = ({ label, name, value, onChange, onBlur, error, touched }) => {
  const [open, setOpen] = useState(false); // Manage the dialog's open state

  const handleOpen = () => setOpen(true); // Open the time picker dialog
  const handleClose = () => setOpen(false); // Close the dialog without saving changes

  const handleTimeChange = (newValue) => {
    const formattedTime = newValue ? dayjs(newValue).format("HH:mm") : "";
    onChange({
      target: {
        name,
        value: formattedTime,
      },
    });
    setOpen(false); // Close the dialog after saving the time
  };

  return (
    <Box sx={{ mb: { md: "0px", xs: "20px" } }}>
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

      <Box onClick={handleOpen}>
        <TimePicker
          open={open} // Open the TimePicker dialog
          value={value ? dayjs(`2000-01-01T${value}`) : null} // Set the current time value
          onChange={handleTimeChange} // Handle the time change and close
          onClose={handleClose} // Close when clicking outside
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              name={name}
              error={touched && Boolean(error)}
              helperText={touched && error}
              onBlur={onBlur}
            />
          )}
          DialogActionsComponent={() => <DialogActions />} // Override the default actions (make it empty)
        />
      </Box>
    </Box>
  );
};

export default CustomTimePicker;
