import axiosInstancePromise from '../../../api/axiosInstance'; // ✅ Import the promise
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkRoomOccupancy = createAsyncThunk(
  'room/checkRoomOccupancy',
  async (roomId, { rejectWithValue }) => {
    
    try {
          const axios = await axiosInstancePromise;    
      
      const response = await axios.get(
        `/api/Lockup/IsRoomOccupied?RoomId=${roomId}`
      );
      return response.data.message.isOccupied;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const roomOccupancySlice = createSlice({
  name: 'roomOccupancy',
  initialState: {
    isOccupied: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkRoomOccupancy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkRoomOccupancy.fulfilled, (state, action) => {
        state.loading = false;
        state.isOccupied = action.payload;
      })
      .addCase(checkRoomOccupancy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomOccupancySlice.reducer;
