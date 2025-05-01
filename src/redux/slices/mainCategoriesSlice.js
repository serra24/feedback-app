import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Define the async thunk to fetch main categories
export const fetchMainCategories = createAsyncThunk(
  'mainCategories/fetchMainCategories',
  async ({language}) => {
    try {
      // Use axios to fetch data
      const response = await axiosInstance.get('/api/Maintenance/GetAllMaincategories', {
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
