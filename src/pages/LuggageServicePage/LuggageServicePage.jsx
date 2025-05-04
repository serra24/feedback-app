import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextareaAutosize,
  Grid,
  Button,
  RadioGroup,
  Radio,
} from "@mui/material";
import { MdCheckBox } from "react-icons/md";
import InputField from "../../components/InputField/InputField";
import CustomDatePicker from "../../components/InputField/CustomDatePicker";
import { LanguageContext } from "../../context/LanguageContext";
import FormTitle from "../../components/FormTitle/FormTitle";
import CustomTimePicker from "../../components/CustomTimePicker/CustomTimePicker";
const LuggageServicePage = () => {
  const { translations: t } = useContext(LanguageContext);
  // Form validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("الإسم بالكامل مطلوب"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^\d+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
    roomNumber: Yup.string().required("رقم الغرفة مطلوب"),
    preferredTime: Yup.string().required("الوقت المفضل مطلوب"),
    complaintTypes: Yup.array().min(1, "يجب اختيار نوع واحد على الأقل"),
    complaintDetails: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      roomNumber: "",
      preferredTime: "",
      complaintTypes: [], // ✅ this is the missing initialization
      complaintDetails: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
    },
  });

  // Complaint types options
  const complaintTypes = [
    { id: 1, label: t.cleaningForm.Receiveluggage },
    { id: 3, label: t.cleaningForm.Temporaryluggage },
  ];

  // Input fields configuration
  const inputFields = [
    {
      name: "fullName",
      label: t.cleaningForm.fullNameLabel,
      placeholder: t.cleaningForm.fullNamePlaceholder,
    },
    {
      name: "phone",
      label: t.cleaningForm.phoneLabel,
      placeholder: t.cleaningForm.phonePlaceholder,
    },
    {
      name: "roomNumber",
      label: t.Complaint.roomNumber.label,
      placeholder: t.Complaint.roomNumber.placeholder,
    },
    {
      name: "preferredTime",
      label: t.cleaningForm.preferredTimeLabel,
      placeholder: "",
      type: "time",
    },
    {
      name: "numberOfBags",
      label: t.cleaningForm.numberOfBagsLabel,
      placeholder: t.cleaningForm.numberOfBagsPlaceholder,
      type: "number",
    },
  ];

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
          mb: {md:1.5,xs:2},
          color: "var(--white-color)",
        }}
      >
        {t.luggageForm.title}
      </Typography>

      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 400,
          fontSize: { xs: "16px", sm: "24px" },
          textAlign: "center",
          mb: 4,
          color: "var(--white-color)",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {'"'} {t.luggageForm.description}
        {'"'}
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: { xs: "90%", sm: "440px", md: "776px" },
          height: "auto",
          background: "linear-gradient(180deg, #00395D 0%, #13537C 100%)",
          borderRadius: 3,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <FormTitle title={t.luggageForm.formInstruction} />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "24px",
          }}
        >
          {inputFields.map((field, index) => (
            <Box
              key={field.name}
              sx={{
                flex: "1 1 calc(50% - 16px)", // account for the 32px columnGap
                minWidth: "230px",
              }}
            >
              {field.name === "preferredTime" ? (
                <Box sx={{mb:{md:"none", xs:3}}}>
                   <CustomTimePicker
                  key={index}
                  label={field.label}
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors[field.name]}
                  touched={formik.touched[field.name]}
                />
                </Box>
               
              ) : (
                <InputField
                  type={field.type || "text"}
                  label={field.label}
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[field.name] && formik.errors[field.name]
                  }
                  touched={formik.touched[field.name]}
                  placeholder={field.placeholder}
                  iconSrc={field.iconSrc}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* Complaint Types */}
        <Box sx={{ mt: "10px" }}>
          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: "18px",
              color: "#fff",
              mb: "6px",
            }}
          >
            {t.luggageForm.typeofserviceLabel}
          </Typography>

          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1, md: 0 },
            }}
          >
            <RadioGroup
              value={formik.values.complaintType}
              onChange={(e) =>
                formik.setFieldValue("complaintType", e.target.value)
              }
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {complaintTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id}
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          color: "#CFAE78", // Icon color for unchecked state
                        },
                        "&.Mui-checked .MuiSvgIcon-root": {
                          color: "#CFAE78", // Icon color for checked state
                        },
                      }}
                    />
                  }
                  label={type.label}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      color: "#fff", // Label text color
                      fontSize: "16px !important",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormGroup>
        </Box>

        {/* Complaint Details */}
        <Box mt={4}>
          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: "18px",
              color: "#fff",
              mb: 1,
            }}
          >
            {t.luggageForm.luggageDetailsLabel}
          </Typography>
          {/* <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 300,
              fontSize: "16px",
              color: "var(--gold-color)",

              borderRadius: "5px",
              mb: 2,
            }}
          >
            {t.Complaint.complaintDetails.description}
          </Typography> */}

          <TextareaAutosize
            name="complaintDetails"
            value={formik.values.complaintDetails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // placeholder={t.Complaint.complaintDetails.placeholder}
            placeholder={t.luggageForm.luggageDetailsPlaceholder}
            minRows={5}
            className="complaint-textarea"
            style={{
              width: "352px",
              padding: "12px",
              backgroundColor: "transparent",
              border:
                formik.touched.complaintDetails &&
                formik.errors.complaintDetails
                  ? "1px solid #f44336"
                  : "1px solid #FFFFFF80",
              borderRadius: "5px",

              fontFamily: "Almarai",
              fontSize: "16px",
              color: "#fff",
            }}
          />

          {formik.touched.complaintDetails &&
            formik.errors.complaintDetails && (
              <Typography color="error" variant="caption">
                {formik.errors.complaintDetails}
              </Typography>
            )}
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
            {t.sendRequest}
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

export default LuggageServicePage;
