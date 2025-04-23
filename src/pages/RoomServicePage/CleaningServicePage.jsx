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
import CustomTimePicker from "../../components/CustomTimePicker/CustomTimePicker";
const CleaningServicePage = () => {
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
    { id: 1, label: "نظافة الشبابيك " },
    { id: 2, label: "ترتيب وتنظيف السرير" },
    { id: 3, label: "تنظيف الحمام" },
    { id: 4, label: "تنظيف الأرضيه " },
    { id: 5, label: "تفريغ سلة المهملات" },
    { id: 6, label: "جميع ما سبق" },
  ];

  // Input fields configuration
  const inputFields = [
    {
      name: "fullName",
      label: "الإسم بالكامل",
      placeholder: "الإسم بالكامل",
    },
    {
      name: "phone",
      label: t.Complaint.phone.label,
      placeholder: t.Complaint.phone.placeholder,
    },
    {
      name: "roomNumber",
      label: t.Complaint.roomNumber.label,
      placeholder: t.Complaint.roomNumber.placeholder,
    },
    {
        name: "preferredTime",
        label: "الوقت المفضل",
        placeholder: "",
        type: "time", 
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
        خدمة النظافه
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
        {'"'} نضمن لك نظافة يومية بمعايير عالية… لراحة لا تنقطع. {'"'}
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
        <FormTitle title="يرجي ملء النموذج التالي لتقديم طلب نظافه ." />

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
              ) : (
              <InputField
                  type={field.type || "text"}
                label={field.label}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field.name] && formik.errors[field.name]}
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
            اختر ما تريد تنظيفه:
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
              gap: { xs: 1, md: 0 },
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
            الوصف ( إختياري )
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
            placeholder="اكتب وصفاً تفصيلياً ..."
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
            إرسال الطلب
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

export default CleaningServicePage;
