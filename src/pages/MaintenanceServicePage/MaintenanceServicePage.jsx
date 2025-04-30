import React, { useContext, useEffect, useState } from "react";
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
import AnimatedHeader from "../../components/AnimatedHeader/AnimatedHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories } from "../../redux/slices/subCategoriesSlice";
import { fetchMainCategories } from "../../redux/slices/mainCategoriesSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchRoomData } from "../../redux/slices/roomFeatures/roomDataSlice";
import { createRequest } from "../../redux/slices/GeneralRequest/GeneralRequestSlice";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import SuccessPopup from "../../components/SuccessPopup/SuccessPopup";
import Loading from "../../components/Loading/Loading";
import InputField from "../../components/InputField/InputField";

const MaintenanceServicePage = () => {
  const { translations: t, language } = useContext(LanguageContext);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  // Redux state
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { roomNum, roomData } = useSelector((state) => ({
    roomNum: state.room.roomNum,
    roomData: state.roomData,
  }));
  useEffect(() => {
    // console.log("roomNum inside useEffect:", roomNum);  // Check if roomNum is defined
    if (roomNum) {
      dispatch(fetchRoomData({ roomId: roomNum, language }));
    } else {
      // console.error("roomNum is undefined or invalid");
    }
  }, [roomNum, dispatch, language]);

  const mainCategories = useSelector(
    (state) => state.mainCategories.categories
  );
  const subCategories = useSelector((state) => state.subCategories.categories);

  // Local state
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedValues, setSelectedValues] = useState(Array(2).fill(""));
  console.log("selectedValues", selectedValues);

  // Fetch main categories when the component mounts
  useEffect(() => {
    dispatch(fetchMainCategories(language));
  }, [dispatch, language]);

  // Fetch subcategories whenever a main category is selected
  useEffect(() => {
    if (selectedMainCategory) {
      dispatch(fetchSubCategories({ selectedMainCategory, language }));
    }
  }, [selectedMainCategory, dispatch, language]);

  const handleMainCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedMainCategory(value);
    formik.setFieldValue("mainCategoryId", value);
    setSelectedSubCategory(""); // Reset subcategory
    formik.setFieldValue("subCategoryId", ""); // Reset subcategory in Formik
  };

  const handleSubCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedSubCategory(value);
    formik.setFieldValue("subCategoryId", value);
  };

  const hotelName =
    roomData?.data?.message?.floor?.building?.branch?.localizedName;
  const number = roomData?.data?.message?.number;
  if (!hotelName) {
    // console.warn("Localized Name is missing. Defaulting to 'Unknown Hotel'");
  }
  const formik = useFormik({
    initialValues: {
      mainCategoryId: "",
      subCategoryId: "",
      notes: "",
      fullName: "",
      priorityId: "",
    },
    validationSchema: Yup.object({
      mainCategoryId: Yup.string().required(t.validation.selectMainCategory),
      subCategoryId: Yup.string().required(t.validation.selectSubCategory),
      notes: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        const maintenanceData = {
          description: values.notes || "",
          title: "title",
          loggedInUserId: "", // Set if available
          from: new Date().toISOString(),
          to: new Date().toISOString(),
          mainMentananceCategoryId: parseInt(values.mainCategoryId),
          subMentananceCategoryId: parseInt(values.subCategoryId),
          assignToId: 0,
          roomId: roomNum || 0,
          publicAreaId: 0,
          priorityId: parseInt(values.priorityId || 0),
          jobId: 0,
          profitionaltype: 0,
        };

        const requestData = {
          name: values.fullName,
          roomId: roomNum,
          typeId: 1,
          items: null,
          description: null,
          email: null,
          phoneNumber: null,
          maintenanceData,
        };

        formData.append("request", JSON.stringify(requestData));
        if (uploadedFile) {
          formData.append("file", uploadedFile);
        }
console.log("uploadedFile",uploadedFile);
console.log("formData",formData);

        const response = await dispatch(createRequest(formData));
        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });
        if (response?.payload?.successtate === 200) {
          setPopupMessage("Request submitted successfully!");
          setPopupType("success");
        } else {
          setPopupMessage(
            response?.payload?.errormessage || "Submission failed."
          );
          setPopupType("error");
        }
        setPopupOpen(true);
      } catch (error) {
        console.error("Error", error);
        setPopupMessage("An unexpected error occurred.");
        setPopupType("error");
        setPopupOpen(true);
      }
    },
  });
  console.log("formik", formik);

  const formFields = [
    {
      label: t.mainMaintenanceRequest,
      options: mainCategories.map((category) => ({
        name: category.nameEn,
        id: category.id,
      })),
    },
    {
      label: t.subMaintenanceRequest,
      options: subCategories.map((category) => ({
        name: category.nameEn,
        id: category.id,
      })),
    },
  ];
  const priorityOptions = [
    { id: 1, name: t.Maintenance.priorityHigh },
    { id: 2, name: t.Maintenance.priorityMedium },
    { id: 3, name: t.Maintenance.priorityLow },
  ];

  const handleChange = (index, value) => {
    const updated = [...selectedValues];
    updated[index] = value;
    setSelectedValues(updated);
  };
  useEffect(() => {
    if (roomData?.data?.message?.floor?.building?.branch?.localizedName) {
      setIsDataLoaded(true);

      const hotelName =
        roomData?.data?.message?.floor?.building?.branch?.localizedName;
      const number = roomData?.data?.message?.number;

      // Only set values if they differ from the current formik values
      if (formik.values.hotelName !== hotelName) {
        formik.setFieldValue("hotelName", hotelName);
      }
      if (number && formik.values.roomNumber !== number) {
        formik.setFieldValue("roomNumber", number);
      }
    }
    // Exclude formik from the dependency array to avoid infinite loop
  }, [roomData]); // Now it only depends on roomData

  if (!isDataLoaded) return <Loading />;

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
      {/* Header Section */}
      <AnimatedHeader
        title={t.Maintenance.title}
        subtitle={t.Maintenance.description}
      />

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
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
        <FormTitle title={t.Maintenance.form_title} />
        {/* Select Fields */}
        {/* Full Name and Priority - Side by Side */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            // mb:1,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputField
              label={t.cleaningForm.fullNameLabel}
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.fullName}
              touched={formik.touched.fullName}
              placeholder={t.cleaningForm.fullNamePlaceholder}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                marginBottom: "3px",
                fontFamily: "Almarai",
                color: "var(--white-color)",
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              {t.Maintenance.priority}
            </Typography>
            <FormControl
              fullWidth
              error={Boolean(
                formik.errors.priorityId && formik.touched.priorityId
              )}
            >
              <Select
                value={formik.values.priorityId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="priorityId"
                sx={{
                  borderRadius: "4px",
                  height: "48px",
                  color: "#fff",
                  "& .MuiSelect-icon": {
                    color: "#fff",
                  },
                  "& .MuiSelect-select": {
                    color: formik.values.priorityId
                      ? "#fff"
                      : "rgba(255, 255, 255, 0.5)",
                    fontSize: formik.values.priorityId ? "16px" : "15px",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  {t.Select} {t.Maintenance.priority}
                </MenuItem>
                {priorityOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Main Category and Sub Category - Side by Side */}
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

              <FormControl
                fullWidth
                error={
                  index === 0
                    ? Boolean(
                        formik.touched.mainCategoryId &&
                          formik.errors.mainCategoryId
                      )
                    : Boolean(
                        formik.touched.subCategoryId &&
                          formik.errors.subCategoryId
                      )
                }
              >
                <Select
                  displayEmpty
                  value={
                    index === 0
                      ? formik.values.mainCategoryId
                      : formik.values.subCategoryId
                  }
                  onChange={(e) =>
                    index === 0
                      ? handleMainCategoryChange(e)
                      : handleSubCategoryChange(e)
                  }
                  onBlur={() => {
                    index === 0
                      ? formik.setFieldTouched("mainCategoryId", true)
                      : formik.setFieldTouched("subCategoryId", true);
                  }}
                  sx={{
                    borderRadius: "4px",
                    height: "48px",
                    color: "#fff",
                    "& .MuiSelect-icon": {
                      color: "#fff",
                    },
                    "& .MuiSelect-select": {
                      color: (
                        index === 0 ? selectedMainCategory : selectedSubCategory
                      )
                        ? "#fff"
                        : "rgba(255, 255, 255, 0.5)",
                      fontSize: (
                        index === 0 ? selectedMainCategory : selectedSubCategory
                      )
                        ? "16px"
                        : "15px",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    {t.Select} {field.label}
                  </MenuItem>
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option.id}>
                      {option.name}
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
              name="notes"
              minRows={7}
              placeholder={t.Maintenance.notes_placeholder}
              className="complaint-textarea"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                width: "352px",
                padding: "12px",
                backgroundColor: "transparent",
                borderRadius: "5px",
                fontFamily: "Almarai",
                fontSize: "16px",
                color: "#fff",
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
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("fileInput").click()}
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
              <input
                id="fileInput"
                type="file"
                accept="image/*,application/pdf"
                style={{ display: "none" }}
                onChange={(e) => setUploadedFile(e.target.files[0])}
              />
            </Box>
            {uploadedFile && (
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 14,
                  fontFamily: "Almarai",
                  color: "white",
                  wordBreak: "break-word",
                }}
              >
                {uploadedFile.name}
              </Typography>
            )}
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
            type="submit"
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
            onClick={() => formik.resetForm()}
          >
            {t.cancel}
          </Button>
        </Box>
      </Box>
      <SuccessPopup
        open={popupOpen && popupType === "success"}
        message={popupMessage}
        onClose={() => setPopupOpen(false)}
      />
      <ErrorPopup
        open={popupOpen && popupType === "error"}
        message={popupMessage}
        onClose={() => setPopupOpen(false)}
      />
    </Box>
  );
};

export default MaintenanceServicePage;
