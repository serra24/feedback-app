import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstancePromise from '../../api/axiosInstance'; // ✅ Import the promise

export const fetchRoomData = createAsyncThunk(
  'roomData/fetchRoomData',
  async ({roomId,language}) => {
    const axios = await axiosInstancePromise;    
    const response = await axios.get('/api/CRM/LockUp/GetRoomData', {
        params: { id: roomId },
        headers: {
            lang:language=== 'ar' ? 1: 2,
        }
      });
      
    console.log("response", response); // Log the response to the console
    return response.data;
  }
);

const roomDataSlice = createSlice({
  name: 'roomData',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRoomData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default roomDataSlice.reducer;
