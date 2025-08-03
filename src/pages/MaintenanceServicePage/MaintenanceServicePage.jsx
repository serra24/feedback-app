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
  IconButton,
  FormHelperText,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import uploadicon from "../../assets/icons/upload-icon.svg";
import { LanguageContext } from "../../context/LanguageContext";
import FormTitle from "../../components/FormTitle/FormTitle";
import AnimatedHeader from "../../components/AnimatedHeader/AnimatedHeader";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import LocationPopup from "../../components/LocationPopup/LocationPopup";
import {
  setLocationAsked,
  setLocationStatus,
} from "../../redux/slices/locationSlice";
const MaintenanceServicePage = () => {
  const { translations: t, language } = useContext(LanguageContext);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationPopupOpen, setLocationPopupOpen] = useState(false);
  const locationAsked = useSelector((state) => state.location.locationAsked);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const locationStatus = useSelector((state) => state.location.locationStatus);
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
  const truncateFileName = (name, maxLength = 30) => {
    if (name.length <= maxLength) return name;
    const ext = name.slice(name.lastIndexOf("."));
    return name.slice(0, maxLength - ext.length - 3) + "..." + ext;
  };

  // Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { roomNum, roomData } = useSelector(
    (state) => ({
      roomNum: state.room.roomNum,
      roomData: state.roomData,
    }),
    shallowEqual
  );

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
  const handleFileUpload = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null); // Clear the uploaded file when the user clicks the close icon
  };
  const hotelName =
    roomData?.data?.message?.floor?.building?.branch?.localizedName;

  if (!hotelName) {
    // console.warn("Localized Name is missing. Defaulting to 'Unknown Hotel'");
  }

  const formik = useFormik({
    initialValues: {
      mainCategoryId: "",
      subCategoryId: "",
      notes: "",
      phone: "",
      email: "",
      fullName: "",
      priorityId: "",
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(t.Maintenance.titleRequired),
      fullName: Yup.string().required(t.fullNameRequired),
      priorityId: Yup.string().required(t.priorityRequired),
      mainCategoryId: Yup.string().required(t.validation.selectMainCategory),
      subCategoryId: Yup.string().required(t.validation.selectSubCategory),
      notes: Yup.string().optional(),
      phone: Yup.string()
        // .required("رقم الهاتف مطلوب")
        .min(8, t.validation.phone.min),
      email: Yup.string().email(t.emailInvalid),
    }),
    onSubmit: async (values) => {
      if (
        locationAsked &&
        locationStatus === "allowed" &&
        "geolocation" in navigator
      ) {
        try {
          const position = await getLocation();
          // console.log("User location:", position);

          const freshCoordinates = {
            lat: position?.latitude,
            lng: position?.longitude,
          };

          setCoordinates(freshCoordinates);
          setIsSubmitting(true);
          try {
            const formData = new FormData();

            const normalize = (val) =>
              val !== undefined && val !== "" ? val : null;
            // 🧩 MaintenanceData fields
            const maintenanceData = {
              Description: normalize(values.notes),
              Title: normalize(values.title),
              From: new Date().toISOString(),
              To: new Date().toISOString(),
              MainMentananceCategoryId: normalize(
                parseInt(values.mainCategoryId)
              ),
              SubMentananceCategoryId: normalize(
                parseInt(values.subCategoryId)
              ),
              RoomId: normalize(parseInt(roomNum)),
              PriorityId: normalize(parseInt(values.priorityId)),
            };

            // 📎 Main request fields
            formData.append("Name", normalize(values.fullName));
            formData.append("Items", normalize(null));
            formData.append("RoomId", normalize(parseInt(roomNum)));
            formData.append("TypeId", normalize(2)); // Set type accordingly
            formData.append("Description", normalize(values.notes));
            formData.append("Title", normalize(values.title));
            // formData.append("PreferredTime", normalize(new Date().toISOString()));
            formData.append("Email", normalize(values.email));
            formData.append("PhoneNumber", normalize(values.phone));
            // 📎 MaintenanceData fields
            Object.entries(maintenanceData).forEach(([key, val]) => {
              formData.append(`MaintenanceData.${key}`, normalize(val));
            });

            // 📎 File
            if (uploadedFile) {
              formData.append("MaintenanceData.Attachment", uploadedFile);
            } else {
              formData.append("MaintenanceData.Attachment", null); // Explicitly null if no file
            }

            // 📨 Send
            const response = await dispatch(
              createRequest({
                formData,
                language,
                coordinates: freshCoordinates,
              })
            );

            // ✅ Debug
            for (let [key, val] of formData.entries()) {
              // console.log(`${key}:`, val);
            }

            // 🎯 Response handling
            if (response?.payload?.successtate === 200) {
              setPopupMessage(t.sucessRequest);
              setPopupType("success");
              formik.resetForm();
              setUploadedFile(null);
            } else {
              setPopupMessage(
                response?.payload?.errormessage || response?.payload
              );
              setPopupType("error");
            }

            setPopupOpen(true);
          } catch (error) {
            // console.error("Error", error);
            setIsSubmitting(false);
            setPopupMessage("An unexpected error occurred.");
            setPopupType("error");
            setPopupOpen(true);
          } finally {
            setIsSubmitting(false);
          }
          return; // ✅ prevent further execution
        } catch (error) {
          console.error("Location access failed:", error.message);
          setLocationPopupOpen(true);
          return;
        }
      } else {
        setLocationPopupOpen(true);
        return;
      }
    },
  });
  const handleAllowLocation = () => {
    dispatch(setLocationAsked(true));
    dispatch(setLocationStatus("allowed"));
    setLocationPopupOpen(false);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          // console.log("Latitude:", latitude, "Longitude:", longitude);
          formik.submitForm();
          setIsSubmitting(true);
        },
        (error) => {
          console.error("Location access denied:", error.message);
        }
      );
    }
  };
  const handleDeny = () => {
    dispatch(setLocationAsked(true));
    setLocationPopupOpen(false);
    // console.log("Location access denied by user.");
  };
  const formFields = [
    {
      label: t.mainMaintenanceRequest,
      options: mainCategories?.map((category) => ({
        name: category.localizedName,
        id: category.id,
      })),
    },
    {
      label: t.subMaintenanceRequest,
      options: subCategories?.map((category) => ({
        name: category.localizedName,
        id: category.id,
      })),
    },
  ];
  const priorityOptions = [
    { id: 1, name: t.Maintenance.priorityHigh },
    { id: 2, name: t.Maintenance.priorityLow },
  ];

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
        p: 2,
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

        {/* Row 1: Full Name, Title, Phone */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
            // mb: 2,
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
              required
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputField
              label={t.cleaningForm.phoneLabel}
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.phone}
              touched={formik.touched.phone}
              placeholder={t.cleaningForm.phonePlaceholder}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <InputField
              label={t.Complaint.email.label}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
              placeholder={t.Complaint.email.placeholder}
            />
          </Box>
        </Box>

        {/* Row 2: Email, Priority */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
            // mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputField
              label={t.Complaint.roomNumber.label}
              name="roomNumber"
              value={formik.values.roomNumber}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={formik.errors.title}
              // touched={formik.touched.title}
              // placeholder={t.Complaint.roomNumber.placeholder}
              disabled
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <InputField
              label={t.Maintenance.titlefeild}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.title}
              touched={formik.touched.title}
              placeholder={t.Maintenance.titlePlaceholder}
              required
            />
          </Box>
          <Box
            sx={{ flex: 1, mt: { xs: 0, md: 0 }, mb: { xs: "14px", md: 0 } }}
          >
            <Typography
              sx={{
                marginBottom: "3px",
                fontFamily: "Almarai",
                color: "var(--white-color)",
                fontSize: { md: "18px", xs: "14px" },
                fontWeight: 400,
              }}
            >
              {t.Maintenance.priority}
              <Typography
                component="span"
                sx={{
                  color: "red",
                  marginRight: language === "ar" ? "4px" : 0,
                  marginLeft: language === "en" ? "4px" : 0,
                }}
              >
                *
              </Typography>
            </Typography>
            <FormControl
              fullWidth
              error={Boolean(
                formik.errors.priorityId && formik.touched.priorityId
              )}
            >
              <Select
                displayEmpty
                value={formik.values.priorityId}
                onChange={formik.handleChange}
                name="priorityId"
                onBlur={() => formik.setFieldTouched("priorityId", true)}
                sx={{
                  borderRadius: "4px",
                  height: "48px",
                  color: "#fff",
                  "& .MuiSelect-icon": {
                    color: "#fff",
                  },
                  "& .css-1ll44ll-MuiOutlinedInput-notchedOutline, .css-lqwr9g-MuiPickersOutlinedInput-notchedOutline, .css-5v2ak0, .css-1l1mqzp":
                    {
                      border:
                        formik.touched.priorityId && formik.errors.priorityId
                          ? "1px solid #f44336 !important" // Error border color (red)
                          : "1px solid #FFFFFF80 !important",
                    },
                  "& .MuiSelect-select": {
                    color: formik.values.priorityId
                      ? "#fff"
                      : "rgba(255, 255, 255, 0.5)",
                    fontSize: formik.values.priorityId ? "16px" : "14px",
                  },
                }}
              >
                <MenuItem
                  value=""
                  disabled
                  sx={{
                    fontSize: { md: "14px", xs: "12px" },
                    minHeight: { md: "48px", xs: "36px" },
                      fontFamily: "Almarai",

                  }}
                >
                  {t.Select} {t.Maintenance.priority}
                </MenuItem>

                {priorityOptions?.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                      fontSize: { md: "16px", xs: "14px" },
                      minHeight: { md: "48px", xs: "36px" },
                      fontFamily: "Almarai",

                      "&:hover": {
                        backgroundColor: "rgba(0, 61, 93, 0.1)",
                      },
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.priorityId && formik.errors.priorityId && (
                <FormHelperText>{formik.errors.priorityId}</FormHelperText>
              )}
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
          {formFields?.map((field, index) => (
            <Box key={index} sx={{ flex: 1, minWidth: "calc(50% - 8px)" }}>
              <Typography
                sx={{
                  mb: 1,
                  fontFamily: "Almarai",
                  color: "var(--white-color)",
                  fontSize: { md: "18px", xs: "14px" },
                  fontWeight: 400,
                }}
              >
                {field.label}
                <Typography
                  component="span"
                  sx={{
                    color: "red",
                    marginRight: language === "ar" ? "4px" : 0,
                    marginLeft: language === "en" ? "4px" : 0,
                  }}
                >
                  *
                </Typography>
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
                    "& .css-1ll44ll-MuiOutlinedInput-notchedOutline, .css-lqwr9g-MuiPickersOutlinedInput-notchedOutline, .css-5v2ak0, .css-1l1mqzp":
                      {
                        border:
                          index === 0
                            ? formik.touched.mainCategoryId &&
                              formik.errors.mainCategoryId
                              ? "1px solid #f44336 !important" // Error border for mainCategoryId
                              : "1px solid #FFFFFF80 !important" // Default border for mainCategoryId
                            : formik.touched.subCategoryId &&
                              formik.errors.subCategoryId
                            ? "1px solid #f44336 !important" // Error border for subCategoryId
                            : "1px solid #FFFFFF80 !important",
                      },
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
                        : "14px",
                    },
                  }}
                >
                  <MenuItem
                    value=""
                    disabled
                    sx={{
                      fontSize: { md: "14px", xs: "12px" },
                      fontFamily: "Almarai",
                      minHeight: { md: "48px", xs: "36px" },
                    }}
                  >
                    {t.Select} {field.label}
                  </MenuItem>
                  {field?.options?.map((option, idx) => (
                    <MenuItem
                      key={idx}
                      value={option.id}
                      sx={{
                        fontSize: { md: "16px", xs: "14px" },
                        minHeight: { md: "48px", xs: "36px" },
                        fontFamily: "Almarai",

                        "&:hover": {
                          backgroundColor: "rgba(0, 61, 93, 0.1)",
                        },
                      }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* Error Text */}
                {index === 0 &&
                  formik.touched.mainCategoryId &&
                  formik.errors.mainCategoryId && (
                    <FormHelperText>
                      {formik.errors.mainCategoryId}
                    </FormHelperText>
                  )}
                {index === 1 &&
                  formik.touched.subCategoryId &&
                  formik.errors.subCategoryId && (
                    <FormHelperText>
                      {formik.errors.subCategoryId}
                    </FormHelperText>
                  )}
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
                fontSize: { md: "18px", xs: "14px" },
                fontWeight: 400,
              }}
            >
              {t.Maintenance.notes}
            </Typography>
            <TextareaAutosize
              name="notes"
              value={formik.values.notes}
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
                fontSize: { md: "18px", xs: "14px" },
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
                height: 122,
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
                onChange={handleFileUpload}
              />
            </Box>
            {uploadedFile && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Tooltip title={uploadedFile.name}>
                  <Typography
                    sx={{
                      color: "white",
                      fontFamily: "Almarai",
                      wordBreak: "break-word",
                      maxWidth: "200px", // Adjust as needed
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {truncateFileName(uploadedFile.name)}
                  </Typography>
                </Tooltip>
                <IconButton onClick={handleRemoveFile} sx={{ color: "white" }}>
                  <IoIosClose />
                </IconButton>
              </Box>
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
            disabled={isSubmitting}
            sx={{
              flex: 1,
              minWidth: 150,
              height: { md: 48, xs: 40 },
              borderRadius: "5px",
              backgroundColor: "#00395D",
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: { md: "18px", xs: "14px" },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              t.Maintenance.submit
            )}
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              // minWidth: 150,
              height: { md: 48, xs: 40 },

              borderRadius: "5px",
              backgroundColor: "#7C8A93",
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: { md: "18px", xs: "14px" },
            }}
            onClick={() => {
              formik.resetForm();
              setUploadedFile(null);
            }}
          >
            {t.cancel}
          </Button>
        </Box>
      </Box>
      <SuccessPopup
        open={popupOpen && popupType === "success"}
        message={popupMessage}
        onClose={() => {
          setPopupOpen(false);
          navigate("/"); // Redirect to home
        }}
      />
      <ErrorPopup
        open={popupOpen && popupType === "error"}
        message={popupMessage}
        onClose={() => {
          setPopupOpen(false);
          setIsSubmitting(false);
        }}
      />
      {locationPopupOpen && (
        <LocationPopup
          title={t.locationPopup.requireAccess}
          onAllow={handleAllowLocation}
          onDeny={handleDeny}
        />
        //         <LocationPopup
        //   title="Would you like to enable location services?"
        //   onAllow={handleAllow}
        //   onDeny={handleDeny}
        // />
      )}
    </Box>
  );
};

export default MaintenanceServicePage;
