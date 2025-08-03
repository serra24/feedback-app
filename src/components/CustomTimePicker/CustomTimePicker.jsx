import React, { useState, useRef, useContext } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  TextField,
  ClickAwayListener,
  Divider,
  InputAdornment,
} from "@mui/material";
import dayjs from "dayjs";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import clockicon from "../../assets/icons/clock-icon.svg";
import { LanguageContext } from "../../context/LanguageContext";
const CustomTimePicker = ({ label, name, value, onChange, onBlur, error, touched }) => {
  const { translations: t,language } = useContext(LanguageContext);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [hour, setHour] = useState("01");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  const inputRef = useRef(null);

  const open = Boolean(anchorEl);

  const handleOpen = () => {
    if (value) {
      const [time, p] = value.split(" ");
      const [h, m] = time.split(":");
      setHour(h);
      setMinute(m);
      setPeriod(p);
    }
    setAnchorEl(inputRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleNow = () => {
  //   const now = dayjs();
  //   setHour(now.format("hh"));
  //   setMinute(now.format("mm"));
  //   setPeriod(now.format("A"));
  // };
  const handleNow = () => {
    const now = dayjs();
    const h = now.format("hh");
    const m = now.format("mm");
    const p = now.format("A");
    setHour(h);
    setMinute(m);
    setPeriod(p);

    const formatted = `${h}:${m} ${p}`;
    onChange({
      target: {
        name,
        value: formatted,
      },
    });
    handleClose(); // close the menu
  };

  const handleOk = () => {
    const formatted = `${hour}:${minute} ${period}`;
    onChange({
      target: {
        name,
        value: formatted,
      },
    });
    handleClose();
  };

  const handleSelect = (type, val) => {
    if (type === "hour") setHour(val);
    if (type === "minute") setMinute(val);
    if (type === "period") setPeriod(val);
  };

  const renderItems = (type, range) =>
    range.map((val) => {
      const displayVal = String(val).padStart(2, "0");
      return (
        <MenuItem
          key={displayVal}
          selected={
            (type === "hour" && hour === displayVal) ||
            (type === "minute" && minute === displayVal) ||
            (type === "period" && period === val)
          }
          onClick={() => handleSelect(type, displayVal)}
        >
          {displayVal}
        </MenuItem>
      );
    });

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box >
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
             <Typography component="span" sx={{ color: "red", marginRight:language==="ar"? "4px" :0,marginLeft:language==="en"?"4px":0}}>
            *
          </Typography>
        </Typography>
        {/* 
        <TextField
          fullWidth
          value={value}
          onClick={handleOpen}
          placeholder="hh:mm aa"
          inputRef={inputRef}
          readOnly
        /> */}
        <TextField
          fullWidth
          value={value}
          onClick={handleOpen}
          placeholder="hh:mm aa"
          inputRef={inputRef}
          onBlur={() => {
            if (onBlur) onBlur({ target: { name } }); // Call Formik's blur handler
          }}
          error={touched && Boolean(error)}
          helperText={touched && error ? error : ""}
          readOnly
          InputProps={{
            sx: {
              "&::placeholder": {
                color: "#FFFFFF80", // placeholder color
                opacity: 1, // make sure opacity is applied
              },
              color: "#fff", // text color
            },
            endAdornment: (
              <InputAdornment position="end">
                {/* <AccessTimeIcon sx={{ color: "#FFFFFF80" }} />
                 */}
                <img
                  src={clockicon}
                  alt="clock"
                  style={{
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                    opacity: 0.5,
                  }}
                  onClick={handleOpen}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& input::placeholder": {
              color: "#FFFFFF80",
              opacity: 1,
            },
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          MenuListProps={{
            sx: {
              display: "flex",
              flexDirection: "column",
              padding: 0,
              width: "auto",
            },
          }}
          PaperProps={{
            sx: {
              px: 2,
              pt: 1,
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
            <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
              {renderItems(
                "hour",
                [...Array(12).keys()].map((i) => (i === 0 ? 12 : i))
              )}
            </Box>
            <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
              {renderItems("minute", [...Array(60).keys()])}
            </Box>
            <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
              {["AM", "PM"].map((p) => (
                <MenuItem
                  key={p}
                  selected={period === p}
                  onClick={() => handleSelect("period", p)}
                >
                  {p}
                </MenuItem>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              pb: 1,
              gap: 1,
            }}
          >
            <Button size="small" onClick={handleNow}   sx={{   px: 1,backgroundColor:"var(--secondary-bg-color)",color:"var(--white-color)",borderRadius:"5px", "&:hover": { backgroundColor: "var(--secondary-bg-color)", },}}>
              {t.Now}
            </Button>
            <Box>
              <Button size="small" onClick={handleClose}>
                {t.cancel}
              </Button>
              <Button
                size="small"
                // variant="contained"
                onClick={handleOk}
              
              // variant="contained"  
              >
                {t.Ok}
              </Button>
            </Box>
          </Box>
        </Menu>
      </Box>
    </ClickAwayListener>
  );
};

export default CustomTimePicker;
