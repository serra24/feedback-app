import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstancePromise from '../../api/axiosInstance'; // ✅ Import the promise

// Async thunk to post evaluation
export const addEvaluation = createAsyncThunk(
  'evaluation/addEvaluation',
  async ({evaluationData, coordinates}, { rejectWithValue, getState }) => {
    try {
      const axios = await axiosInstancePromise;
         // Access state from the thunkAPI
      const state = getState();

      const roomNum = state.room.roomNum;
      // const bookingNumber = state.room.bookingNumber;
      // const locationStatus = state.location.locationStatus;
      console.log("coordinates", coordinates, roomNum);
      const response = await axios.post(
        '/api/CRM/Evaluation/AddEvaluation',
        evaluationData,
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
            lang: evaluationData.language,
            'Accept': '*/*',

            RoomId: roomNum ?? "",
            Latitude: coordinates?.lat ?? "",
            Longitude: coordinates?.lng ?? "",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState: {
    loading: false,
    successState: null,
    errorMessage: null,
    message: null,
  },
  reducers: {
    resetEvaluationState: (state) => {
      state.loading = false;
      state.successState = null;
      state.errorMessage = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEvaluation.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(addEvaluation.fulfilled, (state, action) => {
        state.loading = false;
        state.successState = action.payload.successtate;
        state.errorMessage = action.payload.errormessage;
        state.message = action.payload.message;
      })
      .addCase(addEvaluation.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || 'Something went wrong';
      });
  },
});

export const { resetEvaluationState } = evaluationSlice.actions;

export default evaluationSlice.reducer;