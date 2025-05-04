import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstancePromise from '../../api/axiosInstance'; // ✅ Import the promise

//  Thunk for creating a complaint
export const createComplaint = createAsyncThunk(
  'complaints/createComplaint',
  async (complaintData, { rejectWithValue }) => {
    try {
      const axios = await axiosInstancePromise;
      const response = await axios.post(
        '/api/CRM/Complaint/CreateComplaint',
        complaintData,
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const createComplaintSlice = createSlice({
    name: 'createComplaint',
    initialState: {
      success: false,
      loading: false,
      error: null,
    },
    reducers: {
      resetComplaintState: (state) => {
        state.success = false;
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createComplaint.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(createComplaint.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
        })
        .addCase(createComplaint.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Complaint submission failed';
        });
    },
  });
  
  export const { resetComplaintState } = createComplaintSlice.actions;
  
  export default createComplaintSlice.reducer;
  