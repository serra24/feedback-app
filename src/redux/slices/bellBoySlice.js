import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstancePromise from '../../api/axiosInstance'; 


// Async thunk to handle the POST request
export const addBellBoyRequest = createAsyncThunk(
  'bellBoy/addRequest',
  async ({requestData,language}, { rejectWithValue }) => {
    try {
          const axios = await axiosInstancePromise; // ✅ Wait for Axios config to load
      const response = await axios.post(
        '/api/CRM/BellBoy/AddRequest',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
            Accept: '*/*',
             lang:language=== 'ar' ? 1: 2,

          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const bellBoySlice = createSlice({
  name: 'bellBoy',
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
        state.error = action.payload || 'Request failed';
      });
  },
});

export const { resetResponse } = bellBoySlice.actions;
export default bellBoySlice.reducer;
