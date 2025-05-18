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
  TextField,
} from "@mui/material";
import { MdCheckBox } from "react-icons/md";
import InputField from "../../components/InputField/InputField";
import { LanguageContext } from "../../context/LanguageContext";
import FormTitle from "../../components/FormTitle/FormTitle";
import { createRequest } from "../../redux/slices/GeneralRequest/GeneralRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import SuccessPopup from "../../components/SuccessPopup/SuccessPopup";
import { fetchRoomData } from "../../redux/slices/roomFeatures/roomDataSlice";
import Loading from "../../components/Loading/Loading";
import { fetchSuppliesItems } from "../../redux/slices/suppliesItemsSlice";
import { useNavigate } from "react-router-dom";

const ResourcesServicePage = () => {
  const { translations: t, language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const {
    items: supplyItems,
    status,
    error,
  } = useSelector((state) => state.supplies);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  // const { roomNum, roomData } = useSelector((state) => ({
  //   roomNum: state.room.roomNum,
  //   roomData: state.roomData,
  // }));
  const roomNum = useSelector((state) => state.room.roomNum);
  const roomData = useSelector((state) => state.roomData);

  // console.log("roomData", roomData); // Check if roomData is defined
  useEffect(() => {
    // console.log("roomNum inside useEffect:", roomNum);  // Check if roomNum is defined
    if (roomNum) {
      dispatch(fetchRoomData({ roomId: roomNum, language }));
    } else {
      // console.error("roomNum is undefined or invalid");
    }
  }, [roomNum, dispatch, language]);
  // Form validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(t.fullNameRequired),
    phone: Yup.string()
      // .matches(/^(\+\d{1,2}\s?)?(\d{10})$/, "رقم الهاتف غير صالح")
      // .required("رقم الهاتف مطلوب"),
      .min(8, t.validation.phone.min),
    roomNumber: Yup.string().required(t.roomNumberRequired),
    complaintItems: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number().required(),
          quantity: Yup.number()
            .typeError(
              t.validation.quantity.mustBeNumber || "يجب أن تكون الكمية رقمًا"
            )
            .required(t.validation.quantity.required || "الكمية مطلوبة"),
          // .min(
          //   1,
          //   t.validation.quantity.positive || "الحد الأدنى للكمية هو 1"
          // ),
        })
      )
      .min(1, t.complaintDetailsString),
    complaintDetails: Yup.string().optional(),
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
      roomNumber: number || "Unknown Room",
      complaintItems: [],
      complaintDetails: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log("Form submitted with values: ", values);
      const requestData = {
        name: values.fullName,
        roomId: roomNum,
        typeId: 3, // Main : 2, HK :1, Supp : 3
        Items: values.complaintItems.map((item) => ({
          supplyId: item.id,
          quantity: item.quantity,
        })),
        Description: values.complaintDetails,
        email: null,
        phoneNumber: values.phone,
        maintenanceData: null,
      };
      // Create a new FormData instance
      const formData = new FormData();

      // Append text fields to FormData
      formData.append("Name", values.fullName || null);
      formData.append("RoomId", roomNum || null);
      formData.append("TypeId", 3); // Main : 2, HK : 1, Supp : 3
      formData.append("Description", values.complaintDetails || null);
      formData.append("Email", null); // Adjust as needed
      formData.append("PhoneNumber", values.phone || null);

      // Handling items: map each item and append it to FormData
      // if (values.complaintItems && values.complaintItems.length > 0) {
      //   values.complaintItems.forEach((item, index) => {
      //     formData.append(`items[${index}].supplyId`, item.id || null);
      //     formData.append(`items[${index}].quantity`, item.quantity || null);
      //   });
      // }
      if (values.complaintItems && values.complaintItems.length > 0) {
        let index = 0;
        values.complaintItems.forEach((item) => {
          if (item.quantity != null && item.quantity !== "") {
            formData.append(`Items[${index}].supplyId`, item.id);
            formData.append(`Items[${index}].quantity`, item.quantity);
            index++;
          }
        });
      }

      // Append maintenanceData as null (or adjust as needed)
      formData.append("MaintenanceData", null);
      dispatch(createRequest(formData))
        .then((response) => {
          if (response?.payload?.successtate === 200) {
            // Adjust according to your response structure
            setPopupMessage(t.sucessRequest);
            setPopupType("success");
            setPopupOpen(true);
            formik.resetForm();
          } else {
            // console.log("Error", response);

            setPopupMessage(response?.payload?.errormessage);
            setPopupType("error");
            setPopupOpen(true);
          }
        })
        .catch((error) => {
          console.error("Error", error); // Log any errors that occurred
          setPopupMessage("An unexpected error occurred.");
          setPopupType("error");
          setPopupOpen(true);
        });
    },
  });

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
  const hasSelectedItems = formik.values.complaintItems?.length > 0;
  useEffect(() => {
    dispatch(fetchSuppliesItems(language)).then((action) => {
      // console.log("Supplies fetch action:", action);
    });
  }, [dispatch, language]);

  // Complaint types options
  const complaintTypes =
    supplyItems?.map((item) => ({
      id: item.id,
      label: item.localizedName,
    })) || [];

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
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {'"'} {t.resourcesForm.description} {'"'}
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
        <FormTitle title={t.resourcesForm.formInstruction} />

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
                disabled={index === 2}
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
              gap: { xs: 1, md: hasSelectedItems ? 1 : 0.5 },
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
                  {row.map((type) => {
                    const selected = formik.values.complaintItems?.find(
                      (item) => item.id === type.id
                    );
                    return (
                      <Box
                        key={type.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          width: "240px",
                        }}
                      >
                        <FormControlLabel
                          key={type.id}
                          control={
                            <Checkbox
                              checked={!!selected}
                              onChange={() => {
                                const currentItems =
                                  formik.values.complaintItems || [];
                                const exists = currentItems.find(
                                  (item) => item.id === type.id
                                );
                                const updatedItems = exists
                                  ? currentItems.filter(
                                      (item) => item.id !== type.id
                                    )
                                  : [
                                      ...currentItems,
                                      {
                                        id: type.id,
                                        quantity:
                                          supplyItems.find(
                                            (s) => s.id === type.id
                                          )?.defaultQuantity ?? 1,
                                      },
                                    ];
                                formik.setFieldValue(
                                  "complaintItems",
                                  updatedItems
                                );
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
                              // width: "200px",
                              fontSize: "16px !important",
                            },
                          }}
                        />
                        {selected && (
                          <TextField
                            type="text"
                            name={`quantity_${type.id}`}
                            value={selected.quantity}
                            disabled
                            onChange={(e) => {
                              const newVal = e.target.value; // No parseInt here
                              const updatedItems =
                                formik.values.complaintItems.map((item) =>
                                  item.id === type.id
                                    ? { ...item, quantity: newVal }
                                    : item
                                );
                              formik.setFieldValue(
                                "complaintItems",
                                updatedItems
                              );
                            }}
                            placeholder="الكمية"
                            size="small"
                            sx={{
                              width: "50px",
                              height: "35px",
                              color: "var(--white-color)",
                              "& input": {
                                p: 0.5,
                                textAlign: "center",
                                color: "var(--white-color)",
                              },
                              "& .css-5v2ak0": {
                                height: "35px !important",
                              },
                              "& .css-1ll44ll-MuiOutlinedInput-notchedOutline":
                                {
                                  height: "35px !important",
                                },
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              ))}
          </FormGroup>
          {formik.touched.complaintItems && formik.errors.complaintItems && (
  <Typography color="error" sx={{ mt: 1 }}>
    {formik.errors.complaintItems}
  </Typography>
)}


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
        onClose={() => setPopupOpen(false)}
      />
    </Box>
  );
};

export default ResourcesServicePage;
