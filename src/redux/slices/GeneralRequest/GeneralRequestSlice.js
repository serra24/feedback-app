import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';
//type id 
// Define an async thunk to handle the POST request
export const createRequest = createAsyncThunk(
  'generalRequest/createRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/CRM/GeneralRequest/CreateRequest', requestData, {
        headers: {
          'Content-Type': 'application/json-patch+json',
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
