import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstancePromise from '../../api/axiosInstance'; // ✅ Import the promise
// Async thunk with language header
export const fetchSuppliesItems = createAsyncThunk(
  'supplies/fetchSuppliesItems',
  async (language, { getState }) => {
    // const state = getState();
    // const language = state.language.selectedLanguage || 'ar'; // assumes you store language in Redux
    const axios = await axiosInstancePromise;
    const response = await axios.get('/api/CRM/LockUp/GetSuppliesItems', {
      headers: {
        'accept': '*/*',
        lang:language=== 'ar' ? 1: 2,
      },
    });
// console.log("response",response);

    return response.data.message;
  }
);

const suppliesItemsSlice = createSlice({
  name: 'supplies',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliesItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuppliesItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSuppliesItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default suppliesItemsSlice.reducer;
