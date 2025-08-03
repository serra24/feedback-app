import React, { lazy, useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { LanguageContext } from "../../context/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import FormTitle from "../../components/FormTitle/FormTitle";
import AnimatedHeader from "../../components/AnimatedHeader/AnimatedHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvaluationSources,
  fetchBranches,
  selectEvaluationSources,
  selectBranches,
  selectFetchLoading,
  selectFetchError,
} from "../../redux/slices/evaluationSlice";

const SelectEvaluationSource = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { translations: t, language } = useContext(LanguageContext);

  // Redux selectors
  const evaluationSources = useSelector(selectEvaluationSources);
  const branches = useSelector(selectBranches);
  const loading = useSelector(selectFetchLoading);
  const error = useSelector(selectFetchError);

  const {
    sourceId: prevSourceId = "",
    branchId: prevBranchId = "",
    ratings = [],
    comment = "",
    ...restState
  } = location.state || {};
  // Initialize state with previous values if they exist
  const [selectedSourceId, setSelectedSourceId] = useState(prevSourceId || "");
  const [selectedBranchId, setSelectedBranchId] = useState(prevBranchId || "");
  console.log(
    "selectedSourceId",
    selectedSourceId,
    prevSourceId,
    selectedBranchId
  );

  useEffect(() => {
    dispatch(fetchEvaluationSources(language));
    dispatch(fetchBranches(language));
  }, [dispatch, language]);

  // useEffect(() => {
  //   dispatch(fetchEvaluationSources());
  //   dispatch(fetchBranches());
  // }, [dispatch]);

  // useEffect(() => {

  //   if (prevSourceId) setSelectedSourceId(prevSourceId);
  //   if (prevBranchId) setSelectedBranchId(prevBranchId);
  // }, [prevSourceId, prevBranchId]);
  console.log("selectedSourceId", selectedSourceId);

  const handleSubmit = () => {
    if (selectedSourceId && selectedBranchId) {
      navigate("/rate-service", {
        state: {
          ...restState, // Preserve other state
          sourceId: selectedSourceId,
          branchId: selectedBranchId,
          ratings,
          comment,
        },
      });
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: { md: "70vh", xs: "auto" },
        p: 3,
        flexDirection: "column",
      }}
    >
      <AnimatedHeader
        title={t.selectEvaluationPage.header.mainTitle}
        subtitle={t.selectEvaluationPage.header.subTitle}
      />

      <Box
        sx={{
          width: { xs: "90%", sm: "400px" }, // Adjust width for small screens
          height: { xs: "auto", sm: "auto" }, // Adjust height for small screens
          p: { xs: 2, sm: 3 }, // Padding adjustment
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, var(--primary-bg-color) 0%, var(--secondary-bg-color) 100%)",
          borderRadius: "10px",
        }}
      >
        <FormTitle title={t.rateServicePage.form.bookingDetailsTitle} />
        <Typography
          sx={{
            fontFamily: "Almarai, sans-serif",
            fontWeight: 400,
            fontSize: { md: "18px", xs: "14px" },
            lineHeight: "100%",
            color: "var(--white-color)",
            marginBottom: "12px",
          }}
        >
          {t.selectEvaluationPage.form.evaluationSourcesTitle}
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

        <FormControl fullWidth sx={{ mb: { md: 3, xs: 2 } }}>
          <Select
            displayEmpty
            value={selectedSourceId}
            onChange={(e) => setSelectedSourceId(e.target.value)}
            sx={{
              borderRadius: "4px",
              height: { md: "48px", xs: "40px" },
                fontFamily: "Almarai",

              color: "#fff",
              "& .MuiSelect-icon": {
                color: "#fff",
              },
              backgroundColor: "transparent",

              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid rgba(255, 255, 255, 0.3) !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "1px solid var(--gold-color) !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid var(--gold-color) !important",
              },
              "& .MuiSelect-select": {
                color: selectedSourceId ? "#fff" : "rgba(255, 255, 255, 0.5)",
                fontSize: selectedSourceId ? "16px" : "14px",
                padding: "12px 14px",
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
              {t.selectEvaluationPage.form.selectSource}
            </MenuItem>
            {evaluationSources.map((source) => (
              <MenuItem
                key={source.id}
                value={source.id}
                sx={{
                  fontSize: { md: "16px", xs: "14px" },
                  minHeight: { md: "48px", xs: "36px" },
                  fontFamily: "Almarai",

                  "&:hover": {
                    backgroundColor: "rgba(0, 61, 93, 0.1)",
                  },
                }}
              >
                {source.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          sx={{
            fontFamily: "Almarai, sans-serif",
            fontWeight: 400,
            fontSize: { md: "18px", xs: "14px" },
            lineHeight: "100%",
            color: "var(--white-color)",
            marginBottom: "12px",
          }}
        >
          {t.selectEvaluationPage.form.branchesTitle}
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

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Select
            displayEmpty
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            sx={{
              borderRadius: "4px",
              height: { md: "48px", xs: "40px" },
                fontFamily: "Almarai",

              color: "#fff",
              "& .MuiSelect-icon": {
                color: "#fff",
              },
              backgroundColor: "transparent",

              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid rgba(255, 255, 255, 0.3) !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "1px solid var(--gold-color) !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid var(--gold-color) !important",
              },
              "& .MuiSelect-select": {
                color: selectedBranchId ? "#fff" : "rgba(255, 255, 255, 0.5)",
                fontSize: selectedBranchId ? "16px" : "14px",
                padding: "12px 14px",
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
              {t.selectEvaluationPage.form.selectBranch}
            </MenuItem>
            {branches.map((branch) => (
              <MenuItem
                key={branch.id}
                value={branch.id}
                sx={{
                  fontSize: { md: "16px", xs: "14px" },
                  minHeight: { md: "48px", xs: "36px" },
                  fontFamily: "Almarai",

                  "&:hover": {
                    backgroundColor: "rgba(0, 61, 93, 0.1)",
                  },
                }}
              >
                {branch.localizedName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          disabled={!selectedSourceId || !selectedBranchId}
          sx={{
            width: "100%",
            height: { md: "48px", xs: "38px" },
            borderRadius: "5px",
            backgroundColor: "#00395D",
            fontFamily: "Almarai, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#002d4d",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            },
            "&:disabled": {
              backgroundColor: "rgba(0, 61, 93, 0.5)",
              color: "rgba(255, 255, 255, 0.5)",
            },
          }}
          onClick={handleSubmit}
        >
          {t.selectEvaluationPage.form.submitButton}
        </Button>
      </Box>
    </Box>
  );
};

export default SelectEvaluationSource;
