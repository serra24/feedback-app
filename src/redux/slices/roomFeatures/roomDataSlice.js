import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../api/axiosInstance';

export const fetchRoomData = createAsyncThunk(
  'roomData/fetchRoomData',
  async ({roomId,language}) => {
    console.log("Fetching room data for ID:", roomId); // Log the room ID to the console
    
    const response = await axiosInstance.get('/api/CRM/LockUp/GetRoomData', {
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
