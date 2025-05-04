import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstancePromise from '../../api/axiosInstance'; // ✅ Import the promise

// Async thunk to fetch complaint items
export const fetchComplaintItems = createAsyncThunk(
  "complaintItems/fetchComplaintItems",
  async (language, { rejectWithValue }) => {
    try {
      const axios = await axiosInstancePromise; // ✅ Wait for Axios config to load

      const response = await axios.get(
        "/api/CRM/LockUp/GetComplaintItems",
        {
          headers: {
            Accept: "*/*",
            lang:language=== 'ar' ? 1: 2,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//  Slice definition
const complaintItemsSlice = createSlice({
  name: "complaintItems",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaintItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaintItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchComplaintItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch complaint items";
      });
  },
});

export default complaintItemsSlice.reducer;
