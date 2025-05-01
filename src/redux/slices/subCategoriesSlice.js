import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Define the async thunk to fetch subcategories based on mainCategoryId
export const fetchSubCategories = createAsyncThunk(
  'subCategories/fetchSubCategories',
  async ({selectedMainCategory,language}) => {
    try {
      // Use axios to fetch subcategories
      const response = await axiosInstance.get(
        `/api/Maintenance/GetAllSubCategories?MainMentananceId=${selectedMainCategory}`,
        {
          headers: {
            accept: '*/*',
            lang: language === 'ar' ? 1 : 2, // Send Arabic or English lang code
          },
        }
      );      return response.data.message;  // Return the subcategories from the response
    } catch (error) {
      // Handle errors (if any)
      throw Error(error.response ? error.response.data.errormessage : error.message);
    }
  }
);

const subCategoriesSlice = createSlice({
  name: 'subCategories',
  initialState: {
    categories: [],
    status: 'idle',  // could be 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;  // Set subcategories to state
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default subCategoriesSlice.reducer;
