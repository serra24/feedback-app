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
  CircularProgress,
} from "@mui/material";
import { MdCheckBox } from "react-icons/md";
import InputField from "../../components/InputField/InputField";
import CustomDatePicker from "../../components/InputField/CustomDatePicker";
import { LanguageContext } from "../../context/LanguageContext";
import FormTitle from "../../components/FormTitle/FormTitle";
import CustomTimePicker from "../../components/CustomTimePicker/CustomTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { createRequest } from "../../redux/slices/GeneralRequest/GeneralRequestSlice";
import SuccessPopup from "../../components/SuccessPopup/SuccessPopup";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { fetchRoomData } from "../../redux/slices/roomFeatures/roomDataSlice";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import LocationPopup from "../../components/LocationPopup/LocationPopup";
import {
  setLocationAsked,
  setLocationStatus,
} from "../../redux/slices/locationSlice";
const CleaningServicePage = () => {
  const { translations: t, language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
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
  const { loading, error } = useSelector((state) => state.generalRequest);
  // const { roomNum, roomData } = useSelector((state) => ({
  //   roomNum: state.room.roomNum,
  //   roomData: state.roomData,
  // }));
  const roomNum = useSelector((state) => state.room.roomNum);
  const roomData = useSelector((state) => state.roomData);

  useEffect(() => {
    // console.log("roomNum inside useEffect:", roomNum);  // Check if roomNum is defined
    if (roomNum) {
      dispatch(fetchRoomData({ roomId: roomNum, language }));
    } else {
      // console.error("roomNum is undefined or invalid");
    }
  }, [roomNum, dispatch, language]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  // Form validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(t.fullNameRequired),
    phone: Yup.string()
      // .required("رقم الهاتف مطلوب")
      .min(8, t.validation.phone.min),
      email: Yup.string().email(t.emailInvalid),
    roomNumber: Yup.string().required(t.roomNumberRequired),
    preferredTime: Yup.string().required(t.preferredTimeRequired),
    // complaintTypes: Yup.array().min(1, "يجب اختيار نوع واحد على الأقل"),
    complaintDetails: Yup.string(),
  });
  const hotelName =
    roomData?.data?.message?.floor?.building?.branch?.localizedName;
  const number = roomData?.data?.message?.number;
  if (!hotelName) {
    // console.warn("Localized Name is missing. Defaulting to 'Unknown Hotel'");
  }
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
        email: "",
      roomNumber: number || "Unknown Room",
      preferredTime: "",
      // complaintTypes: [], // ✅ this is the missing initialization
      complaintDetails: "",
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

      // Trigger the createRequest thunk here
      const requestData = {
        name: values.fullName,
        roomId: roomNum,
        typeId: 1, // Main : 2, HK :1, Supp : 3
        items: null,
        description: values.complaintDetails,
        email: null,
        phoneNumber: values.phone,
        preferredTime: values.preferredTime,
        maintenanceData: null,
      };
      const formData = new FormData();

      // Append fields to FormData
      formData.append("Name", values.fullName); 
      formData.append("RoomId", roomNum);
      formData.append("TypeId", 1); // Main : 2, HK : 1, Supp : 3
      formData.append("Email", values.email || null);
      formData.append("Description", values.complaintDetails || null);
      formData.append("PhoneNumber", values.phone || null);
      formData.append("PreferredTime", values.preferredTime || null);
      formData.append("MaintenanceData", null);

      dispatch(createRequest({formData, language, coordinates: freshCoordinates}))
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

            setPopupMessage(response?.payload?.errormessage || response?.payload);
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

  // Input fields configuration
  const inputFields = [
    {
      name: "fullName",
      label: t.cleaningForm.fullNameLabel,
      placeholder: t.cleaningForm.fullNamePlaceholder,
      required:true
    },
    {
      name: "phone",
      label: t.cleaningForm.phoneLabel,
      placeholder: t.cleaningForm.phonePlaceholder,
      required:false
    },
     {
      name: "email",
      label: t.Complaint.email.label,
      placeholder: t.Complaint.email.placeholder,
      required:false

    },
    {
      name: "roomNumber",
      label: t.Complaint.roomNumber.label,
      placeholder: t.Complaint.roomNumber.placeholder,
      required:false

    },
    {
      name: "preferredTime",
      label: t.cleaningForm.preferredTimeLabel,
      placeholder: "",
      type: "time",
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
        {t.cleaningForm.cleaningService}
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
        {'"'} {t.cleaningForm.guarantee} {'"'}
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
        <FormTitle title={t.cleaningForm.formInstruction} />

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
        {/* <Box sx={{ mt: "10px" }}>
          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: "18px",
              color: "#fff",
              mb: "6px",
            }}
          >
            {t.cleaningForm.cleaningOptionsLabel}
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
            {t.cleaningForm.multiSelectNote}
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
        </Box> */}

        {/* Complaint Details */}
        <Box mt={2}>
          <Typography
            sx={{
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: "18px",
              color: "#fff",
              mb: 1,
            }}
          >
            {t.cleaningForm.descriptionLabel}
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
            placeholder={t.cleaningForm.descriptionPlaceholder}
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
              height: 48,
              borderRadius: "5px",
              backgroundColor: "#00395D",
              fontFamily: "Almarai",
              fontWeight: 400,
              fontSize: 18,
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
        onClose={() => {
          setPopupOpen(false);
          navigate("/"); // Redirect to home
        }}
      />
      <ErrorPopup
        open={popupOpen && popupType === "error"}
        message={popupMessage}
        onClose={() => {setPopupOpen(false);
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

export default CleaningServicePage;
