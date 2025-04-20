import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import InputField from "../../components/InputField/InputField";
import bookingNumberIcon from "../../assets/icons/booking-number.png";
import secretNumberIcon from "../../assets/icons/secret-number.png";
import { LanguageContext } from "../../context/LanguageContext";
import { useFormik } from "formik";
import * as Yup from "yup";
const RateServicePage = () => {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    bookingNumber: Yup.string()
      .required("Booking number is required")
      .min(6, "Booking number must be at least 6 characters"),
    secretNumber: Yup.string()
      .required("Secret number is required")
      .min(4, "Secret number must be at least 4 characters"),
  });
  const { translations: t } = useContext(LanguageContext);
  // Formik hook
  const formik = useFormik({
    initialValues: {
      bookingNumber: "",
      secretNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form values", values);
      // Handle form submission (e.g., API call)
    },
  });

  return (
    <Box
    sx={{
      position: "relative",
      zIndex: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Full viewport height
      p: 3,
      flexDirection: "column",
    }}
  >
    {/* Header Section */}
    <Typography
      sx={{
        fontFamily: "Almarai, sans-serif",
        fontWeight: 700,
        fontSize: { xs: "24px", sm: "30px" }, // Smaller font size on small screens
        // lineHeight: "100%",
        textAlign: "right",
        mb: 3,
        color: "var( --white-color)",
      }}
    >
      {t.rateServicePage.header.mainTitle}
    </Typography>

    <Typography
      sx={{
        fontFamily: "Almarai, sans-serif",
        fontWeight: 400,
        fontSize: { xs: "16px", sm: "24px" }, // Smaller font size on small screens
        // lineHeight: "100%",
        textAlign: "center",
        mb: 5,
        color: "var( --white-color)",
      }}
    >
      {t.rateServicePage.header.subTitle}
    </Typography>

    {/* Form Section with Gradient Background */}
    <Box
      sx={{
        width: { xs: "90%", sm: "400px" }, // Adjust width for small screens
        height: { xs: "auto", sm: "400px" }, // Adjust height for small screens
        p: { xs: 2, sm: 3.7 }, // Padding adjustment
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, var(--primary-bg-color) 0%, var(--secondary-bg-color) 100%)",
        borderRadius: "10px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "18px", sm: "24px" }, // Smaller font size for small screens
          lineHeight: "100%",
          mb: 3,
          color: "var( --white-color)",
        }}
      >
        {t.rateServicePage.form.bookingDetailsTitle}
      </Typography>

      <InputField
        label={t.rateServicePage.form.bookingNumber.label}
        value={formik.values.bookingNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="bookingNumber"
        iconSrc={bookingNumberIcon}
        placeholder={t.rateServicePage.form.bookingNumber.placeholder}
        error={formik.errors.bookingNumber}
        touched={formik.touched.bookingNumber}
      />

      <InputField
        label={t.rateServicePage.form.secretNumber.label}
        value={formik.values.secretNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="secretNumber"
        iconSrc={secretNumberIcon}
        placeholder={t.rateServicePage.form.secretNumber.placeholder}
        error={formik.errors.secretNumber}
        touched={formik.touched.secretNumber}
      />

      {/* Description Under Inputs */}
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 300,
          fontSize: { xs: "12px", sm: "14px" }, // Smaller font size for small screens
          lineHeight: "100%",
          color: "var(--gold-color)",
          mb: { xs: 2, sm: 3.7 }, // Adjust margin for small screens
        }}
      >
        {t.rateServicePage.form.description}
      </Typography>

      {/* Submit Button */}
      <Button
        variant="contained"
        sx={{
          width: "100%",
          height: "48px",
          borderRadius: "5px",
          backgroundColor: "#00395D",
          fontFamily: "Almarai, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "16px", sm: "20px" }, // Smaller font size for small screens
          textAlign: "center",
          "&:hover": {
            backgroundColor: "#002d4d",
          },
        }}
        onClick={formik.handleSubmit}
      >
        {t.rateServicePage.form.submitButton}
      </Button>
    </Box>
  </Box>
  );
};

export default RateServicePage;
