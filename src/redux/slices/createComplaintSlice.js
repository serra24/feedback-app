import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstancePromise from '../../api/axiosInstance'; // ✅ Import the promise

//  Thunk for creating a complaint
export const createComplaint = createAsyncThunk(
  'complaints/createComplaint',
  async ({payload, language, coordinates}, { rejectWithValue, getState }) => {
    try {
      const axios = await axiosInstancePromise;

      const state = getState();
      const roomNum = state.room.roomNum;

      const response = await axios.post(
        '/api/CRM/Complaint/CreateComplaint',
        payload,
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
              lang: language === "ar" ? 1 : 2,

            RoomId: roomNum ?? "",
            Latitude: coordinates?.lat ?? "",
            Longitude: coordinates?.lng ?? "",
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
  