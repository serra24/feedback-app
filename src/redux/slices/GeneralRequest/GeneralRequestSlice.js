import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstancePromise from '../../../api/axiosInstance'; // ✅ Import the promise
//type id 
// Define an async thunk to handle the POST request
export const createRequest = createAsyncThunk(
  'generalRequest/createRequest',
  async ({formData , language, coordinates }, { getState, rejectWithValue }) => {
    try {
      const axios = await axiosInstancePromise;
         // Access state from the thunkAPI
      const state = getState();

      const roomNum = state.room.roomNum;
      // const bookingNumber = state.room.bookingNumber;
      // const locationStatus = state.location.locationStatus;
      // console.log("coordinates", coordinates, roomNum);
      const response = await axios.post('/api/CRM/GeneralRequest/CreateRequest', formData, {
        headers: {
          // 'Content-Type': 'application/json-patch+json',
            lang: language === "ar" ? 1 : 2,

            RoomId: roomNum ?? "",
            Latitude: coordinates?.lat ?? "",
            Longitude: coordinates?.lng ?? "",
        },
      });

      return response.data;
    } catch (error) {
      // axios automatically throws errors on bad status codes, so you can just return the error message
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create the slice
const generalRequestSlice = createSlice({
  name: 'generalRequest',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer to use in the store
export default generalRequestSlice.reducer;
