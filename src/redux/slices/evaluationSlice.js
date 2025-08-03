import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstancePromise from "../../api/axiosInstance"; // ✅ Import the promise


// Async thunk to fetch evaluation sources
export const fetchEvaluationSources = createAsyncThunk(
  "evaluation/fetchSources",
  async (language, { rejectWithValue }) => {
    try {
      const axios = await axiosInstancePromise;
      const response = await axios.get("/api/CRM/LockUp/GetGuestEvaluationSources",
          { headers: {
            "Content-Type": "application/json-patch+json",
           lang: language === "ar" ? 1 : 2,
            Accept: "*/*",
          },}
      );
      return response.data.message.item1;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch branches
export const fetchBranches = createAsyncThunk(
  "evaluation/fetchBranches",
  async (language, { rejectWithValue }) => {
    try {
      const axios = await axiosInstancePromise;
      const response = await axios.get("/api/Lockup/GetBranches",
        { headers: {
            "Content-Type": "application/json-patch+json",
            lang: language === "ar" ? 1 : 2,
            Accept: "*/*",
          },}
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Async thunk to post evaluation
export const addEvaluation = createAsyncThunk(
  "evaluation/addEvaluation",
  async ({ evaluationData, coordinates }, { rejectWithValue, getState }) => {
    try {
      const axios = await axiosInstancePromise;
      // Access state from the thunkAPI
      const state = getState();

      const roomNum = state.room.roomNum;
      // const bookingNumber = state.room.bookingNumber;
      // const locationStatus = state.location.locationStatus;
      // console.log("coordinates", coordinates, roomNum);
      const response = await axios.post(
        "/api/CRM/Evaluation/AddEvaluation",
        evaluationData,
        {
          headers: {
            "Content-Type": "application/json-patch+json",
            lang: evaluationData.language,
            Accept: "*/*",

            RoomId: roomNum ?? "",
            Latitude: coordinates?.lat ?? "",
            Longitude: coordinates?.lng ?? "",
          },
        }
      );
      return response.data;
    } catch (error) {
      // console.log("err", error);

      return rejectWithValue({
        status: error?.status,
        payload: error.response?.data || error.message,
      });
    }
  }
);

const evaluationSlice = createSlice({
  name: "evaluation",
  initialState: {
    loading: false,
    successState: null,
    errorMessage: null,
    message: null,
     // For data fetching
    evaluationSources: [],
    branches: [],
    fetchLoading: false,
    fetchError: null,
  },
  reducers: {
    resetEvaluationState: (state) => {
      state.loading = false;
      state.successState = null;
      state.errorMessage = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEvaluation.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(addEvaluation.fulfilled, (state, action) => {
        state.loading = false;
        state.successState = action.payload.successtate;
        state.errorMessage = action.payload.errormessage;
        state.message = action.payload.message;
      })
      .addCase(addEvaluation.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || "Something went wrong";
      })
      // Evaluation sources cases
      .addCase(fetchEvaluationSources.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchEvaluationSources.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.evaluationSources = action.payload;
      })
      .addCase(fetchEvaluationSources.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      })
      
      // Branches cases
      .addCase(fetchBranches.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      });
  },
});
// Export selectors
export const selectEvaluationSources = (state) => state.evaluation.evaluationSources;
export const selectBranches = (state) => state.evaluation.branches;
export const selectFetchLoading = (state) => state.evaluation.fetchLoading;
export const selectFetchError = (state) => state.evaluation.fetchError;
export const { resetEvaluationState } = evaluationSlice.actions;

export default evaluationSlice.reducer;
