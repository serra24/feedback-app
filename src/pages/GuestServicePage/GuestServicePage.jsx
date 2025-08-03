import React, { useContext, useEffect, useState } from "react";
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
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { MdCheckBox } from "react-icons/md";
import InputField from "../../components/InputField/InputField";
import CustomDatePicker from "../../components/InputField/CustomDatePicker";
import { LanguageContext } from "../../context/LanguageContext";
import FormTitle from "../../components/FormTitle/FormTitle";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchComplaintItems } from "../../redux/slices/complaintItemsSlice";
import { createComplaint } from "../../redux/slices/createComplaintSlice";
import { fetchRoomData } from "../../redux/slices/roomFeatures/roomDataSlice";
import Loading from "../../components/Loading/Loading";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import SuccessPopup from "../../components/SuccessPopup/SuccessPopup";
import { useNavigate } from "react-router-dom";
import LocationPopup from "../../components/LocationPopup/LocationPopup";
import {
  setLocationAsked,
  setLocationStatus,
} from "../../redux/slices/locationSlice";
const GuestServicePage = () => {
  const { translations: t, language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const { roomNum, roomData, complaintItems } = useSelector(
    (state) => ({
      roomNum: state.room.roomNum,
      roomData: state.roomData,
      complaintItems: state.complaintItems.items,
    }),
    shallowEqual
  );

  // console.log("roomData", roomData); // Check if roomData is defined
  useEffect(() => {
    // console.log("roomNum inside useEffect:", roomNum);  // Check if roomNum is defined
    if (roomNum) {
      dispatch(fetchRoomData({ roomId: roomNum, language }));
    } else {
      // console.error("roomNum is undefined or invalid");
    }
  }, [roomNum, dispatch, language]);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Form validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t.validation.titleRequired),
    priorityId: Yup.string().required(t.priorityRequired),
    guestName: Yup.string().required(t.validation.guestNameRequired),
    phone: Yup.string()
      // .required("رقم التواصل مطلوب")
      // .matches(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط"),
      .min(8, t.validation.phone.min),
    email: Yup.string().email(t.emailInvalid),
    // .required("البريد الإلكتروني مطلوب"),
    complaintDetails: Yup.string().required(
      t.validation.complaintDetailsRequired
    ),
    // expectedAction: Yup.string().required(t.expectedActionRequired),
    complaintTypes: Yup.array()
      .min(1, t.complaintTypesRequired)
      .required(t.complaintTypesRequired),
  });
  // console.log("roomData?.message?.floor?.building?.branch?.localizedName", roomData?.data?.message?.floor?.building?.branch?.localizedName);
  const hotelName =
    roomData?.data?.message?.floor?.building?.branch?.localizedName;
  const number = roomData?.data?.message?.number;
  if (!hotelName) {
    // console.warn("Localized Name is missing. Defaulting to 'Unknown Hotel'");
  }
  // Formik initialization

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      hotelName: hotelName || "Unknown Hotel",
      date: new Date().toISOString().split("T")[0],
      roomNumber: number || "Unknown Room",
      guestName: "",
      phone: "",
      email: "",
      complaintTypes: [],
      complaintDetails: "",
      expectedAction: "",
      priorityId: "",
    },
    validationSchema,

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

          const payload = {
            title: values.title,
            description: values.complaintDetails,
            expectedAction: values.expectedAction,
            email: values.email,
            phoneNumber: values.phone,
            name: values.guestName,
            roomId: roomNum,
            priorityId: values.priorityId,
            sourceId: 1,
            itemsIds: values.complaintTypes,
          };
          // console.log("payload", payload);

          // Dispatch the action and handle success/error
          dispatch(
            createComplaint({
              payload,
              language,
              coordinates: freshCoordinates,
            })
          )
            .then((response) => {
              // console.log("Response", response);
              if (response?.payload?.successtate === 200) {
                // Adjust according to your response structure
                setPopupMessage(t.sucessRequest);
                setPopupType("success");
                setPopupOpen(true);
                formik.resetForm();
              } else {
                // console.log("Error", response);

                setPopupMessage(
                  response?.payload?.errormessage || response?.payload
                );
                setPopupType("error");
                setPopupOpen(true);
              }
            })
            .catch((error) => {
              // console.error("Error", error);
              setIsSubmitting(false);
              setPopupMessage("An unexpected error occurred.");
              setPopupType("error");
              setPopupOpen(true);
            })
            .finally(() => {
              setIsSubmitting(false);
            });
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

  useEffect(() => {
    // Fetch guest evaluation data when the component mounts
    dispatch(fetchComplaintItems(language))
      .then(() => {
        // console.log("Guest evaluation data fetched successfully.");
      })
      .catch((error) => {
        console.error("Error fetching guest evaluation data:", error);
      });
  }, [dispatch, language]);

  // Transform API items to match the expected format
  const complaintTypes = (complaintItems || []).map((item) => ({
    id: item.id,
    label: language === "ar" ? item.nameAr : item.nameEn,
  }));
  const priorityOptions = [
    { id: 1, name: t.emergency },
    { id: 2, name: t.Nonemergency },
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
      required: true,
    },
    {
      name: "phone",
      label: t.Complaint.phone.label,
      placeholder: t.Complaint.phone.placeholder,
      required: false,
    },
    {
      name: "email",
      label: t.Complaint.email.label,
      placeholder: t.Complaint.email.placeholder,
      required: false,
    },
    // {
    //   name: "title",
    //   label: t.Complaint.title.label, // Make sure this translation exists
    //   placeholder: t.Complaint.title.placeholder,
    // },
  ];
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
      <Typography
        sx={{
          fontFamily: "Almarai, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "24px", sm: "30px" },
          textAlign: "right",
          mb: { md: 1.5, xs: 2 },
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
          display: {
            xs: "none",
            md: "block",
          },
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
                  required={field.required}
                />
              )}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "24px",
            justifyContent: "space-between", // Ensure fields are side by side
          }}
        >
          {/* Complaint Title */}
          <Box sx={{ flex: "1 1 calc(50% - 12px)", minWidth: "230px" }}>
            <InputField
              label={t.Complaint.title.label}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && formik.errors.title}
              touched={formik.touched.title}
              placeholder={t.Complaint.title.placeholder}
              required
            />
          </Box>

          {/* Priority */}
          <Box sx={{ flex: "1 1 calc(50% - 12px)", minWidth: "230px" }}>
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
                fontFamily: "Almarai",

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
                <MenuItem value="" disabled   sx={{
                fontSize: { md: "14px", xs: "12px" },
                fontFamily: "Almarai",

                minHeight: { md: "48px", xs: "36px" },
              }}>
                  {t.Select} {t.Maintenance.priority}
                </MenuItem>

                {priorityOptions?.map((option) => (
                  <MenuItem key={option.id} value={option.id} sx={{
                  fontSize: { md: "16px", xs: "14px" },
                  minHeight: { md: "48px", xs: "36px" },
                  fontFamily: "Almarai",

                  "&:hover": {
                    backgroundColor: "rgba(0, 61, 93, 0.1)",
                  },
                }}>
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

        {/* Complaint Types */}
        <Box sx={{ mt: "14px" }}>
          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: { md: "18px", xs: "14px" },

              color: "#fff",
              mb: "6px",
            }}
          >
            {t.Complaint.complaintTypesTitle}
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

          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 300,
              fontSize: { md: "16px", xs: "12px" },

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
              gap: { xs: 1, md: 0.5 },
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
                          width: { md: "240px", xs: "auto" },
                          fontSize: {
                            md: "16px !important",
                            xs: "14px !important",
                          },
                        },
                      }}
                    />
                  ))}
                </Box>
              ))}
          </FormGroup>
          {formik.touched.complaintTypes && formik.errors.complaintTypes && (
            <Typography color="error" variant="caption">
              {formik.errors.complaintTypes}
            </Typography>
          )}
        </Box>

        {/* Complaint Details */}
        <Box mt={4}>
          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: { md: "18px", xs: "14px" },

              color: "#fff",
              mb: 1,
            }}
          >
            {t.Complaint.complaintDetails.label}
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
              
              "@media (maxWidth: 600px)": {
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
              fontSize: { md: "18px", xs: "14px" },

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
              t.Complaint.submitButton
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

export default GuestServicePage;
