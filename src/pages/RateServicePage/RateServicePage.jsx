import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import InputField from "../../components/InputField/InputField";
import bookingNumberIcon from "../../assets/icons/booking-number.svg";
import secretNumberIcon from "../../assets/icons/secret-number.svg";
import { LanguageContext } from "../../context/LanguageContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormTitle from "../../components/FormTitle/FormTitle";
import AnimatedHeader from "../../components/AnimatedHeader/AnimatedHeader";
const RateServicePage = () => {
  const navigate = useNavigate(); // Initialize navigate hook
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
      navigate("/evaluation", { state: values });
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
        minHeight: { md: "70vh", xs: "auto" },
        p: 3,
        flexDirection: "column",
      }}
    >
      {/* Header Section */}

      <AnimatedHeader
        title={t.rateServicePage.header.mainTitle}
        subtitle={t.rateServicePage.header.subTitle}
      />

      {/* Form Section with Gradient Background */}
      <Box
        sx={{
          width: { xs: "90%", sm: "400px" }, // Adjust width for small screens
          height: { xs: "auto", sm: "auto" }, // Adjust height for small screens
          p: { xs: 2, sm: 3 }, // Padding adjustment
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, var(--primary-bg-color) 0%, var(--secondary-bg-color) 100%)",
          borderRadius: "10px",
        }}
      >
        <FormTitle title={t.rateServicePage.form.bookingDetailsTitle} />

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

        {!(formik.touched.secretNumber && formik.errors.secretNumber) && (
          <Typography
            sx={{
              fontFamily: "Almarai, sans-serif",
              fontWeight: 300,
              fontSize: { xs: "12px", sm: "14px" },
              lineHeight: "100%",
              color: "var(--gold-color)",
              mt: "-16px",
              mb: { xs: 2, sm: 3.7 },
            }}
          >
            {t.rateServicePage.form.description}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "48px",
            borderRadius: "5px",
            backgroundColor: "#00395D",
            fontFamily: "Almarai, sans-serif",
            fontWeight: 400,
            fontSize: { xs: "16px", sm: "18px" }, // Smaller font size for small screens
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
