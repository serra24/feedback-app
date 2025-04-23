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
import { LanguageContext } from "../../context/LanguageContext";
import FormTitle from "../../components/FormTitle/FormTitle";

const ResourcesServicePage = () => {
  const { translations: t } = useContext(LanguageContext);

  // Form validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("الاسم الكامل مطلوب"),
    phone: Yup.string()
      .matches(/^(\+\d{1,2}\s?)?(\d{10})$/, "رقم الهاتف غير صالح")
      .required("رقم الهاتف مطلوب"),
    roomNumber: Yup.string().required("رقم الغرفة مطلوب"),
    complaintTypes: Yup.array().min(1, "يرجى اختيار صنف واحد على الأقل"),
    quantity: Yup.number().required("الكمية مطلوبة").positive("يجب أن تكون الكمية إيجابية"),
    complaintDetails: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      roomNumber: "",
      complaintTypes: [],
      quantity: "",
      complaintDetails: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values: ", values);
      // Handle form submission here (e.g., API call)
    },
  });

  // Complaint types options
  const complaintTypes = [
    { id: 1, label: t.resourcesForm.items.bathSupplies },
    { id: 2, label:  t.resourcesForm.items.towels },
    { id: 3, label:  t.resourcesForm.items.extraPillows },
    { id: 4, label:  t.resourcesForm.items.bedSheets },
    { id: 5, label:  t.resourcesForm.items.teaCoffee },
    { id: 6, label:  t.resourcesForm.items.mineralWater },
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
      placeholder:  t.cleaningForm.phonePlaceholder,
    },
    {
      name: "roomNumber",
      label:  t.Complaint.roomNumber.label,
      placeholder:  t.Complaint.roomNumber.placeholder,
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
       {t.resourcesForm.title}
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
        {'"' } {t.resourcesForm.description} {'"'}
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
        <FormTitle title= {t.resourcesForm.formInstruction}/>

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
              />
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
           {t.resourcesForm.selectItemsLabel}
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
                          fontSize: "16px !important",
                        },
                      }}
                    />
                  ))}
                </Box>
              ))}
          </FormGroup>
        </Box>
        <Box mt={4}>
        {/* Quantity Field */}
        <InputField
          type={"number"}
          
          label={t.resourcesForm.quantityLabel}
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.quantity && formik.errors.quantity}
          touched={formik.touched.quantity}
          placeholder={t.resourcesForm.quantityNote}
        />
        </Box>

        {/* Complaint Details */}
        <Box mt={1}>
          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: "18px",
              color: "#fff",
              mb: 1,
            }}
          >
           {t.resourcesForm.additionalNotesLabel}
          </Typography>

          <TextareaAutosize
            name="complaintDetails"
            value={formik.values.complaintDetails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t.resourcesForm.additionalNotesPlaceholder}
            minRows={5}
            
           className="complaint-textarea"
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
            type="submit"
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
            {t.rateServicePage.form.submitButton}
          </Button>
          <Button
            type="button"
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

export default ResourcesServicePage;
