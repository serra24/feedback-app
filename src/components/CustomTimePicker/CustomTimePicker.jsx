import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const CustomTimePicker = ({ label, name, value, onChange, onBlur, error, touched }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (newValue) => {
    const formattedTime = newValue ? dayjs(newValue).format("HH:mm") : "";
    onChange({
      target: {
        name,
        value: formattedTime,
      },
    });
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

      <TimePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value ? dayjs(`2000-01-01T${value}`) : null}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            name={name}
            error={touched && Boolean(error)}
            helperText={touched && error}
            onBlur={onBlur}
            onClick={handleOpen}
          />
        )}
      />
    </Box>
  );
};

export default CustomTimePicker;