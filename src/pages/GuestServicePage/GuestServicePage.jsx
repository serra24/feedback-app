import React from "react";
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
const GuestServicePage = () => {
  // Form validation schema
  const validationSchema = Yup.object().shape({
    hotelName: Yup.string().required("اسم الفندق مطلوب"),
    date: Yup.string().required("التاريخ مطلوب"),
    roomNumber: Yup.string().required("رقم الغرفة مطلوب"),
    guestName: Yup.string().required("اسم الضيف مطلوب"),
    phone: Yup.string()
      .required("رقم التواصل مطلوب")
      .matches(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط"),
    email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
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
    { name: "hotelName", label: "اسم الفندق", placeholder: "أدخل اسم الفندق" },
    { name: "startDate", label: "التاريخ", placeholder: "اختر التاريخ" }, // Custom date field
    { name: "roomNumber", label: "رقم الغرفة", placeholder: "أدخل رقم الغرفة" },
    { name: "guestName", label: "اسم الضيف", placeholder: "أدخل اسم الضيف" },
    { name: "phone", label: "رقم التواصل", placeholder: "أدخل رقم الهاتف" },
    {
      name: "email",
      label: "البريد الإلكتروني",
      placeholder: "أدخل البريد الإلكتروني",
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
        شكوي
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
        "نوازي تهتم برأيك... أرسل شكواك وسنعمل على معالجتها بعناية."
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: { xs: "100%", md: "776px" },
          background: "linear-gradient(180deg, #00395D 0%, #13537C 100%)",
          padding: "32px",
          fontFamily: "Almarai",
          mx: "auto",
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Almarai, sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            color: "#fff",
            mb: 3,
          }}
        >
          يرجي ملء النموذج التالي لتقديم الشكوي.
        </Typography>

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
                minWidth: "300px",
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
            طبيعة الشكوى (يرجى تحديد جميع ما ينطبق)
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
            يمكنك اختيار أكثر من خيار
          </Typography>

          <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
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
                    // gap: 2,
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
                   checked={formik.values.complaintTypes.includes(type.id)}
                   onChange={() => {
                     const newTypes =
                       formik.values.complaintTypes.includes(type.id)
                         ? formik.values.complaintTypes.filter((id) => id !== type.id)
                         : [...formik.values.complaintTypes, type.id];
                     formik.setFieldValue("complaintTypes", newTypes);
                   }}
                   sx={{
                     '& .MuiSvgIcon-root': {
                       color: "#CFAE78", // Icon color for unchecked state
                     },
                     '&.Mui-checked .MuiSvgIcon-root': {
                       color: "#CFAE78", // Icon color for checked state
                     },
                   }}
                 />
               }
               label={type.label}
               sx={{
                '& .MuiFormControlLabel-label': {
                  color: "#fff", // Label text color
                  width: "200px",
                  fontSize: "14px !important",
                 
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
            تفاصيل الشكوي
          </Typography>
          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 300,
              fontSize: "16px",
              color: "var(--gold-color)",
             
              borderRadius: "5px",
              mb: 2,
            }}
          >
            يرجي وصف المشكله بالتفصيل بما في ذلك التاريخ و الوقت و أي موظفين
            مشاركين (إن وجد).
          </Typography>
          <TextareaAutosize
  name="complaintDetails"
  value={formik.values.complaintDetails}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  placeholder="اكتب وصفاً تفصيلياً للمشكله..."
  minRows={5}
  className="styled-placeholder"
  style={{
    width: "352px",
    backgroundColor: "transparent",
    border:
      formik.touched.complaintDetails && formik.errors.complaintDetails
        ? "1px solid #f44336"
        : "1px solid #FFFFFF80",
    borderRadius: "5px",
    padding: "12px",
    fontFamily: "Almarai",
    fontSize: "16px",
    color: "#000",
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
            الإجراء المتوقع أو المطلوب
          </Typography>
          <TextareaAutosize
            name="expectedAction"
            value={formik.values.expectedAction}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="اكتب وصفاً تفصيلياً للإجراء المطلوب..."
            minRows={5}
            style={{
              width: "352px",
              backgroundColor: "transparent",
              border:
                formik.touched.expectedAction && formik.errors.expectedAction
                  ? "1px solid #f44336"
                  : "1px solid #FFFFFF80",
              borderRadius: "5px",
              padding: "12px",
              fontFamily: "Almarai",
              fontSize: "16px",
              color: "#000",
            }}
          />
          {formik.touched.expectedAction && formik.errors.expectedAction && (
            <Typography color="error" variant="caption">
              {formik.errors.expectedAction}
            </Typography>
          )}
        </Box>

        {/* Submit Button */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#CFAE78",
              color: "#000",
              fontFamily: "Almarai",
              fontWeight: 700,
              fontSize: "16px",
              px: 4,
              py: 1.5,
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#b8996a",
              },
            }}
          >
            إرسال الشكوى
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GuestServicePage;
