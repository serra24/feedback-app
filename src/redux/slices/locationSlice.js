// redux/slices/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

let savedState = null;

try {
  const stored = sessionStorage.getItem("locationState");
  if (stored) {
    savedState = JSON.parse(stored);
  }
} catch (e) {
  console.error("Error reading location state from sessionStorage", e);
}

const initialState = savedState || {
  locationAsked: false,
  locationStatus: null,
};

// redux/slices/locationSlice.js

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationAsked(state, action) {
      state.locationAsked = action.payload;
    },
    setLocationStatus(state, action) {
      // Prevent overwriting 'allowed' with 'denied'
      if (state.locationStatus !== 'allowed') {
        state.locationStatus = action.payload;
      }
    },
  },
});

export const { setLocationAsked, setLocationStatus } = locationSlice.actions;
export default locationSlice.reducer;
