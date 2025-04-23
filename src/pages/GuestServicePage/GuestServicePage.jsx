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
} from "@mui/material";
import { MdCheckBox } from "react-icons/md";
import InputField from "../../components/InputField/InputField";
import CustomDatePicker from "../../components/InputField/CustomDatePicker";
import { LanguageContext } from "../../context/LanguageContext";
import FormTitle from "../../components/FormTitle/FormTitle";
const GuestServicePage = () => {
  const { translations: t } = useContext(LanguageContext);
  // Form validation schema
  const validationSchema = Yup.object().shape({
    // hotelName: Yup.string().required("اسم الفندق مطلوب"),
    // date: Yup.string().required("التاريخ مطلوب"),
    // roomNumber: Yup.string().required("رقم الغرفة مطلوب"),
    guestName: Yup.string().required("اسم الضيف مطلوب"),
    phone: Yup.string()
      // .required("رقم التواصل مطلوب")
      .matches(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط"),
    email: Yup.string().email("بريد إلكتروني غير صالح"),
    // .required("البريد الإلكتروني مطلوب"),
    complaintDetails: Yup.string().required("تفاصيل الشكوى مطلوبة"),
    expectedAction: Yup.string().required("الإجراء المتوقع مطلوب"),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      hotelName: "",
      date: "",
      roomNumber: "",
      guestName: "",
      phone: "",
      email: "",
      complaintTypes: [],
      complaintDetails: "",
      expectedAction: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Handle form submission here
    },
  });

  // Complaint types options
  const complaintTypes = [
    { id: 1, label: "نظافة الغرفه" },
    { id: 2, label: "المرافق (المصعد , الباص)" },
    { id: 3, label: "الإزعاج و الضوضاء" },
    { id: 4, label: "مشاكل في الفاتوره أو الدفع" },
    { id: 5, label: "سلوك الموظفين" },
    { id: 6, label: "مشاكل في الحجز أو الحجز المسبق" },
    { id: 7, label: "الطعام و الشراب" },
    { id: 8, label: "أخري " },
  ];

  // Input fields configuration
  const inputFields = [
    
    {
      name: "startDate",
      label: t.Complaint.startDate.label,
      placeholder: t.Complaint.startDate.placeholder,
    }, // Custom date field
    {
      name: "hotelName",
      label: t.Complaint.hotelName.label,
      placeholder: t.Complaint.hotelName.placeholder,
    },
    {
      name: "roomNumber",
      label: t.Complaint.roomNumber.label,
      placeholder: t.Complaint.roomNumber.placeholder,
    },
    {
      name: "guestName",
      label: t.Complaint.guestName.label,
      placeholder: t.Complaint.guestName.placeholder,
    },
    {
      name: "phone",
      label: t.Complaint.phone.label,
      placeholder: t.Complaint.phone.placeholder,
    },
    {
      name: "email",
      label: t.Complaint.email.label,
      placeholder: t.Complaint.email.placeholder,
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
          mb: 1.5,
          color: "var(--white-color)",
        }}
      >
        {t.Complaint.formTitle}
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
        {'"'} {t.Complaint.description} {'"'}
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
        <FormTitle title={t.Complaint.formInstructions} />

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
              {field.name === "startDate" ? (
                <CustomDatePicker
                  label={field.label}
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors[field.name]}
                  touched={formik.touched[field.name]}
                  disabled={index < 3}
                />
              ) : (
                <InputField
                  type={field.type}
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
                  disabled={index < 3}
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
            {t.Complaint.complaintTypesTitle}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 300,
              fontSize: "16px",
              color: "var(--gold-color)",
              mb: "12px",
            }}
          >
            {t.Complaint.complaintTypesDescription}
          </Typography>

          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1, md: .5 },
            }}
          >
            {complaintTypes
              .reduce((rows, type, index) => {
                // Group two checkboxes per row
                if (index % 2 === 0) rows.push([]);
                rows[rows.length - 1].push(type);
                return rows;
              }, [])
              .map((row, rowIndex) => (
                <Box
                  key={rowIndex}
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "flex-start",
                    flexDirection: "row", // Ensure checkboxes stay in rows
                    flexWrap: "wrap",
                  }}
                >
                  {row.map((type) => (
                    <FormControlLabel
                      key={type.id}
                      control={
                        <Checkbox
                          checked={formik.values.complaintTypes.includes(
                            type.id
                          )}
                          onChange={() => {
                            const newTypes =
                              formik.values.complaintTypes.includes(type.id)
                                ? formik.values.complaintTypes.filter(
                                    (id) => id !== type.id
                                  )
                                : [...formik.values.complaintTypes, type.id];
                            formik.setFieldValue("complaintTypes", newTypes);
                          }}
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
                          width: "200px",
                          fontSize: "16px !important",
                        },
                      }}
                    />
                  ))}
                </Box>
              ))}
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
            {t.Complaint.complaintDetails.label}
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
            placeholder={t.Complaint.complaintDetails.description}
            minRows={5}
            className="styled-placeholder2"
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
              "@media (max-width: 600px)": {
                width: "90% !important", // Adjust the width for small screens
              },
            }}
          />

          {formik.touched.complaintDetails &&
            formik.errors.complaintDetails && (
              <Typography color="error" variant="caption">
                {formik.errors.complaintDetails}
              </Typography>
            )}
        </Box>

        {/* Expected Action */}
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
            {t.Complaint.expectedAction.label}
          </Typography>
          <TextareaAutosize
            name="expectedAction"
            value={formik.values.expectedAction}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t.Complaint.expectedAction.placeholder}
            className="styled-placeholder2"
            minRows={5}
            style={{
              width: "352px",
              padding: "12px",
              backgroundColor: "transparent",
              border:
                formik.touched.expectedAction && formik.errors.expectedAction
                  ? "1px solid #f44336"
                  : "1px solid #FFFFFF80",
              borderRadius: "5px",

              fontFamily: "Almarai",
              fontSize: "16px",
              color: "#fff",
              "@media (max-width: 600px)": {
                width: "80%", // Adjust the width for small screens
              },
            }}
          />
          {formik.touched.expectedAction && formik.errors.expectedAction && (
            <Typography color="error" variant="caption">
              {formik.errors.expectedAction}
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
            {t.Complaint.submitButton}
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

export default GuestServicePage;
