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
import { MdFaceUnlock } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const RateServicePage = () => {
  const navigate = useNavigate();
  const { translations: t } = useContext(LanguageContext);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    guestName: Yup.string()
      .required(t.validation.guestName.required)
      .min(2, t.validation.guestName.min),
      email: Yup.string()
      .email(t.validation.email.invalid),
      // .required("Email is required"),
    phone: Yup.string()
      // .required(t.validation.phone.required)
      // .matches(/^[0-9]+$/, t.validation.phone.invalid)
      .min(8, t.validation.phone.min),
  });
  // Formik hook
  const formik = useFormik({
    initialValues: {
      guestName: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("Form values", values);
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
          label={t.Complaint.guestName.label}
          value={formik.values.guestName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="guestName"
          iconSrc={<MdFaceUnlock  style={{ color: 'var(--gold-color)',fontSize:20 }} />}
          placeholder={t.Complaint.guestName.placeholder}
          error={formik.errors.guestName}
          touched={formik.touched.guestName}
          required
        />

        <InputField
          label={t.Complaint.phone.label}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="phone"
          iconSrc={<MdPhone  style={{ color: 'var(--gold-color)',fontSize:20 }} />}
          placeholder={t.Complaint.phone.placeholder}
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />

        <InputField
          label={t.Complaint.email.label}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          iconSrc={<MdEmail  style={{ color: 'var(--gold-color)',fontSize:20 }} />}
          placeholder={t.Complaint.email.placeholder}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

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
