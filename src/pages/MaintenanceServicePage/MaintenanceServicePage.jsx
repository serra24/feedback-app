import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  Select,
  TextareaAutosize,
} from "@mui/material";
import uploadicon from "../../assets/icons/upload-icon.svg";
import { LanguageContext } from "../../context/LanguageContext";
import FormTitle from "../../components/FormTitle/FormTitle";


const MaintenanceServicePage = () => {
  const { translations: t } = useContext(LanguageContext);
  const formFields = [
    {
      label: t.mainMaintenanceRequest,
      options: ["كهرباء", "سباكة", "أخرى"],
    },
    {
      label: t.subMaintenanceRequest,
      options: ["الدور الأول", "الدور الثاني", "الدور الثالث"],
    },
    {
      label: t.jobTitle,
      options: ["كهرباء", "سباكة", "أخرى"],
    },
    {
      label: t.assignTo,
      options: ["الدور الأول", "الدور الثاني", "الدور الثالث"],
    },
  ];
  
  const [selectedValues, setSelectedValues] = useState(
    Array(formFields.length).fill("")
  );

  const handleChange = (index, value) => {
    const updated = [...selectedValues];
    updated[index] = value;
    setSelectedValues(updated);
  };
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        minHeight: { md: "70vh", xs: "auto" },
      }}
    >
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "24px", sm: "30px" },
          textAlign: "right",
          mb: 1.5,
          color: "var(--white-color)",
        }}
      >
        {t.Maintenance.title}
      </Typography>

      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "16px", sm: "24px" },
          textAlign: "center",
          mb: 4,
          color: "var(--white-color)",
        }}
      >
        {t.Maintenance.description}
      </Typography>

      <Box
        sx={{
          width: { xs: "90%", sm: "440px", md: "776px" },
          height: "auto",
          background: "linear-gradient(180deg, #00395D 0%, #13537C 100%)",
          borderRadius: 3,
          p: { xs: 2, sm: 3 }, 
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* <Typography
          sx={{
            fontFamily: "Almarai",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: "100%",
            mb: "27px",
            color: "var(--white-color)",
          }}
        >
          
        </Typography> */}
        <FormTitle title={t.Maintenance.form_title} />
        {/* Select Fields */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {formFields.map((field, index) => (
            <Box key={index} sx={{ flex: 1, minWidth: "calc(50% - 8px)" }}>
              <Typography
                sx={{
                  mb: 1,
                  fontFamily: "Almarai",
                  color: "var(--white-color)",
                  fontSize: 18,
                  fontWeight: 400,
                }}
              >
                {field.label}
              </Typography>

              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={selectedValues[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  sx={{
                    // border: "1px solid #FFFFFF80",
                    borderRadius: "4px",
                    height: "48px",
                    color: "#fff",
                    "& .MuiSelect-icon": {
                      color: "#fff",
                    },
                    "& .MuiSelect-select": {
                      color: selectedValues[index]
                        ? "#fff"
                        : "rgba(255, 255, 255, 0.5)",
                      fontSize: selectedValues[index] ? "16px" : "14px",
                      fontStyle: selectedValues[index] ? "normal" : "normal",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    {t.Select} {field.label}
                  </MenuItem>
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
        </Box>
        {/* Notes & Attachments */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", md: "row" },
            mb: 3,
          }}
        >
          {/* Notes */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                mb: 1,
                fontFamily: "Almarai",
                color: "var(--white-color)",
                fontSize: 18,
                fontWeight: 400,
              }}
            >
             {t.Maintenance.notes}
            </Typography>
            <TextareaAutosize
              name="Maintenancenotes"
              minRows={9.3}
              placeholder={t.Maintenance.notes_placeholder}
                className="styled-placeholder"
              style={{
                  border: "1px solid #FFFFFF80",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                  color: "#fff",
                  width:"98.6%"
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                mb: 1,
                fontFamily: "Almarai",
                color: "var(--white-color)",
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              {t.Maintenance.attachments}
            </Typography>
            {/* Attachments */}
            <Box
              sx={{
                flex: 1,
                border: "1px dashed #FFFFFF80",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 96,

                p: 3,
                textAlign: "center",
              }}
            >
              <img
                src={uploadicon}
                alt="Upload"
                style={{ marginBottom: "12px" }}
              />
              <Typography
                sx={{
                  fontFamily: "Almarai",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                 {t.Maintenance.drag_and_drop}{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    color: "var( --gold-color)",
                  }}
                >
                  {t.Maintenance.browse}
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              flex: 1,
              minWidth: 150,
              height: 48,
              borderRadius: "5px",
              backgroundColor: "#00395D",
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: 18,
            }}
          >
             {t.Maintenance.submit}
           
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              minWidth: 150,
              height: 48,
              borderRadius: "5px",
              backgroundColor: "#7C8A93",
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: 18,
            }}
          >
          {t.cancel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MaintenanceServicePage;
