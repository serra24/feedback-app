import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstancePromise from "../../api/axiosInstance";

// Async thunk to handle the POST request
export const addBellBoyRequest = createAsyncThunk(
  "bellBoy/addRequest",
  async ( { requestData, language, coordinates }, { getState, rejectWithValue }) => {
    try {
      const axios = await axiosInstancePromise; // ✅ Wait for Axios config to load

      // Access state from the thunkAPI
      const state = getState();

      const roomNum = state.room.roomNum;
      // const bookingNumber = state.room.bookingNumber;
      // const locationStatus = state.location.locationStatus;
      // console.log("coordinates", coordinates, roomNum);

      const response = await axios.post(
        "/api/CRM/BellBoy/AddRequest",
        requestData,
        {
          headers: {
            "Content-Type": "application/json-patch+json",
            Accept: "*/*",
            lang: language === "ar" ? 1 : 2,

            roomid: roomNum ?? "",
            latitude: coordinates?.lat ?? "",
            longitude: coordinates?.lng ?? "",
          },
        }
      );
      // console.log("response",response);

      return response.data;
      } catch (error) {
      const data = error.response?.data;

      if (data?.errors) {
        // Extract all error messages from each field and join with a separator
        const allErrors = Object.values(data.errors)
          .flat() // flatten arrays of error messages
          .join(" | "); // join into one string

        // Return just the combined error string
        return rejectWithValue(allErrors);
      }
      // fallback: if no structured errors, return the message string
      return rejectWithValue(data?.title ||error.response?.data|| error.response?.data?.message  || error.message);
    }
  }
);

const bellBoySlice = createSlice({
  name: "bellBoy",
  initialState: {
    loading: false,
    error: null,
    response: null,
  },
  reducers: {
    resetResponse: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBellBoyRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.response = null;
      })
      .addCase(addBellBoyRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(addBellBoyRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Request failed";
      });
  },
});

export const { resetResponse } = bellBoySlice.actions;
export default bellBoySlice.reducer;
