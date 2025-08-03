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
  RadioGroup,
  Radio,
  CircularProgress,
} from "@mui/material";
import { MdCheckBox } from "react-icons/md";
import InputField from "../../components/InputField/InputField";
import CustomDatePicker from "../../components/InputField/CustomDatePicker";
import { LanguageContext } from "../../context/LanguageContext";
import FormTitle from "../../components/FormTitle/FormTitle";
import CustomTimePicker from "../../components/CustomTimePicker/CustomTimePicker";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addBellBoyRequest } from "../../redux/slices/bellBoySlice";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { fetchRoomData } from "../../redux/slices/roomFeatures/roomDataSlice";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import SuccessPopup from "../../components/SuccessPopup/SuccessPopup";
import LocationPopup from "../../components/LocationPopup/LocationPopup";
import {
  setLocationAsked,
  setLocationStatus,
} from "../../redux/slices/locationSlice";
const LuggageServicePage = () => {
  const { translations: t, language } = useContext(LanguageContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationPopupOpen, setLocationPopupOpen] = useState(false);
  const locationAsked = useSelector((state) => state.location.locationAsked);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const locationStatus = useSelector((state) => state.location.locationStatus);

  // Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      setIsDataLoaded(true);
    } else {
      // console.error("roomNum is undefined or invalid");
    }
  }, [roomNum, dispatch, language]);
  // Form validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(t.fullNameRequired),
    phone: Yup.string().min(8, t.validation.phone.min),
    preferredTime: Yup.string().required(t.preferredTimeRequired),
    complaintType: Yup.mixed().required(t.complaintDetailsString),
    email: Yup.string().email(t.emailInvalid),
    complaintDetails: Yup.string(),
    numberOfBags: Yup.number()
      .required(t.numberOfBagsRequired)
      .min(1, t.numberOfBagsMustBeGreaterThanZero),
  });
  const number = roomData?.data?.message?.number;

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      roomNumber: number || "Unknown Room",
      preferredTime: "",
      complaintType: "", // changed from complaintTypes[]
      complaintDetails: "",
      numberOfBags: "", // add this if it’s used
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

          setCoordinates(freshCoordinates); // optional, if you want to show it in UI

          // Map luggage service type
          let mappedItems = null;
          const complaintType = parseInt(values.complaintType);

          if (complaintType === 1) {
            mappedItems = 1;
          } else if (complaintType === 3) {
            mappedItems = 2;
          }

          const requestData = {
            name: values.fullName,
            roomId: roomNum,
            serviceType: mappedItems,
            description: values.complaintDetails,
            email: values.email || null,
            phoneNumber: values.phone || null,
            perfectDate: values.preferredTime,
            bagNumber: values.numberOfBags,
          };

          setIsSubmitting(true);

          dispatch(
            addBellBoyRequest({
              requestData,
              language,
              coordinates: freshCoordinates,
            })
          )
            .then((response) => {
              if (response?.payload?.successtate === 200) {
                setPopupMessage(t.sucessRequest);
                setPopupType("success");
                setPopupOpen(true);
                formik.resetForm();
              } else {
                // console.log("Response error:", response);
                setPopupMessage(
                  response?.payload?.errormessage || response?.payload
                );
                setPopupType("error");
                setPopupOpen(true);
              }
            })
            .catch((error) => {
              // console.error("Request error:", error);
              setPopupMessage(t.unexpectedError || "حدث خطأ غير متوقع");
              setPopupType("error");
              setPopupOpen(true);
            })
            .finally(() => {
              setIsSubmitting(false);
            });

          return;
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
      required: true,
    },
    {
      name: "phone",
      label: t.cleaningForm.phoneLabel,
      placeholder: t.cleaningForm.phonePlaceholder,
      required: false,
    },

    {
      name: "email",
      label: t.Complaint.email.label,
      placeholder: t.Complaint.email.placeholder,
      required: false,
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
      required: true,
    },
    {
      name: "numberOfBags",
      label: t.cleaningForm.numberOfBagsLabel,
      placeholder: t.cleaningForm.numberOfBagsPlaceholder,
      type: "number",
      required: true,
    },
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
                <Box sx={{ mb: { md: "none", xs: 3 } }}>
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
                  disabled={index === 3}
                  required={field.required}
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
              fontSize: { md: "18px", xs: "14px" },

              color: "#fff",
              mb: "6px",
            }}
          >
            {t.luggageForm.typeofserviceLabel}
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
                        "& .css-1a6cdfp-MuiFormControlLabel-root":{
                          marginLeft: "0px",
                          marginRight: "0px"
                        }
                      }}
                    />
                  }
                  label={type.label}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      color: "#fff", // Label text color
                      fontSize: {md:"16px !important",xs:"14px !important"},
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormGroup>
          {formik.touched.complaintType && formik.errors.complaintType && (
            <Typography color="error" sx={{ mt: 1 }}>
              {formik.errors.complaintType}
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
              t.sendRequest
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
            onClick={() => formik.resetForm()}
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

export default LuggageServicePage;
