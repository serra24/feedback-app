import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstancePromise from '../../api/axiosInstance'; // ✅ Import the promise

// Define the async thunk to fetch main categories
export const fetchMainCategories = createAsyncThunk(
  'mainCategories/fetchMainCategories',
  async ({language}) => {
    try {
      const axios = await axiosInstancePromise;
      // Use axios to fetch data
      const response = await axios.get('/api/Maintenance/GetAllMaincategories', {
        headers: {
          accept: '*/*',
          lang: language === 'ar' ? 1 : 2, // send 1 for Arabic, 2 for English
        },
      });
      return response.data.message; // Return the categories from the response
    } catch (error) {
      // Handle errors (if any)
      throw Error(error.response ? error.response.data.errormessage : error.message);
    }
  }
);

const mainCategoriesSlice = createSlice({
  name: 'mainCategories',
  initialState: {
    categories: [],
    status: 'idle', // could be 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMainCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchMainCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default mainCategoriesSlice.reducer;
