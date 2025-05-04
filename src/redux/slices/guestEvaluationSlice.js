import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstancePromise from '../../api/axiosInstance'; // ✅ Import the promise

// Create an async thunk to fetch data
export const fetchGuestEvaluation = createAsyncThunk(
  'guestEvaluation/fetchGuestEvaluation',
  async (language) => {
    // console.log("language",language);
    const axios = await axiosInstancePromise; // ✅ Wait for Axios config to load

    const response = await axios.get('/api/CRM/LockUp/GetGuestEvaluationItem', {
      headers: {
        'Accept': '*/*',
        lang:language=== 'ar' ? 1: 2,
      
      },
    });
    // console.log(response,"response");
    
    return response.data.message;  
  }
);

// Create the slice
const guestEvaluationSlice = createSlice({
  name: 'guestEvaluation',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestEvaluation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGuestEvaluation.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;  // Set the sliced data
      })
      .addCase(fetchGuestEvaluation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default guestEvaluationSlice.reducer;
