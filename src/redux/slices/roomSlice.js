

// const initialState = {
//   roomNum: null,
// };

// const roomSlice = createSlice({
//   name: "room",
//   initialState,
//   reducers: {
//     setRoomNumber: (state, action) => {
//       state.roomNum = action.payload;
//     },
//   },
// });

// export const { setRoomNumber } = roomSlice.actions;
// export default roomSlice.reducer;
// roomReducer.js
// src/redux/slices/roomSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  roomNum: null,  // Room number starts as null
};

// Create a slice
const roomSlice = createSlice({
  name: 'room',  // Name of the slice
  initialState,
  reducers: {
    // Define the action to set the room number
    setRoomNumber: (state, action) => {
      state.roomNum = action.payload;  // Update the state with the room number
    },
  },
});

// Export the action created by createSlice
export const { setRoomNumber } = roomSlice.actions;

// Export the reducer to be added to the store
export default roomSlice.reducer;

