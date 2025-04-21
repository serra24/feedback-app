import React from "react";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import uploadicon from "../../assets/icons/upload-icon.svg";
const formFields = [
  {
    label: "طلب الصيانة الرئيسي",
    options: ["كهرباء", "سباكة", "أخرى"],
  },
  {
    label: "طلب الصيانة الفرعي",
    options: ["الدور الأول", "الدور الثاني", "الدور الثالث"],
  },
  {
    label: "الوظيفه",
    options: ["كهرباء", "سباكة", "أخرى"],
  },
  {
    label: "تعيين ل",
    options: ["الدور الأول", "الدور الثاني", "الدور الثالث"],
  },
];

const MaintenanceServicePage = () => {
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
        خدمة الصيانه
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
        نقدّم لك خدمة صيانة سريعة وآمنة على مدار الساعة لتلبية أي احتياج داخل الغرف أو المرافق.
      </Typography>

      <Box
        sx={{
          width: { xs: "90%", sm: "440px", md: "776px" },
          height: "auto",
          background: "linear-gradient(180deg, #00395D 0%, #13537C 100%)",
          borderRadius: 3,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Almarai",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: "100%",
            mb: "27px",
            color: "var(--white-color)",
          }}
        >
          يرجي ملء النموذج التالي لتقديم طلب صيانه .
        </Typography>

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
                sx={{ mb: 1, fontFamily: "Almarai", color: "var(--white-color)" }}
              >
                {field.label}
              </Typography>
              <TextField
                fullWidth
                select
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "1px solid #FFFFFF80",
                    borderRadius: "4px",
                    // backgroundColor: "#fff1", 
                    color: "#fff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#fff",
                  },
                }}
              >
                {field.options.map((option, idx) => (
                  <MenuItem key={idx} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
            <Typography sx={{ mb: 1, fontFamily: "Almarai", color: "var(--white-color)" }}>
              ملاحظات
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="أدخل أي تفاصيل إضافية..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  border: "1px solid #FFFFFF80",
                  borderRadius: "4px",
                  // backgroundColor: "#fff1",
                  color: "#fff",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                },
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
          <Typography
                sx={{ mb: 1, fontFamily: "Almarai", color: "var(--white-color)" }}
              >
                المرفقات
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
              height: 112,
              p: 3,
              textAlign: "center",
            }}
          >
           
            <img
              src={uploadicon}
              alt="Upload"
              style={{  marginBottom: "12px"}}
            />
            <Typography
              sx={{
                fontFamily: "Almarai",
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Drag & drop files or <span style={{ textDecoration: "underline" }}>Browse</span>
            </Typography>
          </Box>
          </Box>
          </Box>
        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, flexWrap: "wrap", gap: 2 }}>
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
            إلغاء
          </Button>
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
            إرسال طلب الصيانه
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MaintenanceServicePage;
